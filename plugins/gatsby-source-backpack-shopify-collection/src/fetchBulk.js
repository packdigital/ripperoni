/* eslint-disable max-lines */
const get = require('lodash.get');
const split = require('split');
const fetch = require('isomorphic-fetch');

const { deepMerge, convertToGatsbyGraphQLId } = require('@packdigital/ripperoni-utilities');

const { LOG_PREFIX, TYPE_PREFIX, COLLECTION } = require('./constants');
const {
  BULK_SHOPIFY_COLLECTIONS_QUERY,
  BULK_OPERATION_MUTATION,
  BULK_OPERATION_STATUS_QUERY,
  BULK_OPERATION_CANCEL_MUTATION,
} = require('./queriesBulk');


exports.fetchCollections = async({ client, helpers }) => {
  const { reporter } = helpers;

  const bulkPoolingFactory = ({ name, client }) =>
    async ({
      match = ['COMPLETED'],
      checkEvery = 5,
      maxWait = 0
    }) => {
      console.log(`${name}`, 'config: match ', match, 'checkEvery', checkEvery, 'maxWait', maxWait, 'seconds');
      const startTime = new Date();
      const fiveMinutes = 60 * 1000 * 5; // safeguard
      const duration = maxWait === 0 ? fiveMinutes : maxWait * 1000;
      const endTime = startTime.setSeconds(startTime.getSeconds() + duration);

      const checkStatus = currentStatus => match.includes(currentStatus);
      let successState = false;
      let bulkOperation = null;

      do {
        bulkOperation = await checkBulkQueryStatus({ client });
        console.log(`Current status: ${bulkOperation.status} \n Pooling bulk operation for: ${match} \n Object count: ${bulkOperation.objectCount}`);
        successState = checkStatus(bulkOperation.status);
        await pause(checkEvery * 1000);
      } while (Date.now() <= endTime && !successState);

      return { successState, bulkOperation };
    };


  const forQueueStatusTo = bulkPoolingFactory({ client, name: 'Generic pool..' });


  const maybeWaitForQueue = async ({ client, cancelExisting = false }) => {
    console.log('Maybe wait for queue to clear...');
    // check if we the bulk queue is available
    const { id, status } = await checkBulkQueryStatus({ client });

    const queueIsAvailable = (status === 'COMPLETED' || status === 'CANCELED');

    // check if theres an active operation, and cancel it
    if (queueIsAvailable) {
      console.log('Bulk operation queue is available');
      return true;
    } else {
      console.log('Bulk operation queue not available');
    }

    // Theres a bulk operation running
    if (cancelExisting) {
      console.log('Canceling running bulk operation..');
      // cancel it
      await cancelBulkQuery({ client, id });
      await forQueueStatusTo({
        match: ['CANCELED'],
        checkEvery: 5, // in sec
        maxWait: 60, // in sec
      });

    } else {
      console.log('Waiting for running bulk operation to complete..');
      await forQueueStatusTo({
        match: ['COMPLETED', 'CANCELED'],
        checkEvery: 5, // seconds
        maxWait: 60, // seconds
      });
    }
  };

  const runAndWaitBulkCollectionsQuery = async ({ client, query, reporter }) => {
    console.log('Running bulk operation...');

    const queueAvailable = await maybeWaitForQueue({ client, cancelExisting: true });

    if (!queueAvailable) reporter.panic('Could not run bulk operation. Queue is busy.');

    try {
      const queryVariables = { sortKey: 'UPDATED_AT', reverse: true };
      const mutation = BULK_OPERATION_MUTATION;
      const variables = { 'query': `{ ${query(queryVariables)} }` };

      // run bulk operation
      const response = await client.mutate({
        mutation,
        variables,
        // fetchPolicy: 'no-cache'
      });

      const { data } =  response;
      const { bulkOperationRunQuery } = data;
      const { bulkOperation, userErrors } = bulkOperationRunQuery;
      const { id: bulkQueryId, status: bulkQueryStatus } = bulkOperation;

      if (bulkQueryStatus !== 'CREATED' || userErrors.length > 0) {
        reporter.panic(`
          There was a problem creating a bulk operation for BULK_SHOPIFY_COLLECTIONS_QUERY',
          bulkQueryStatus: ${bulkQueryStatus}
          userErrors: ${userErrors}
        `);
      }

      console.log('New bulk operation query', bulkQueryStatus, 'with id', bulkQueryId);

      let bulkDataUrl = null;

      const { bulkOperation: bulkOperationPoll } = await forQueueStatusTo({
        match: ['COMPLETED'],
        checkEvery: 5,
        maxWait: 0 // wait indefinitely i.e until status === 'COMPLETED'
      });

      if (!bulkOperationPoll.url) {
        reporter.panic(`
          There was a problem with the bulk operation query.
          Could not retrieve jsonl url.
          bulkOperationPoll: ${bulkOperationPoll}
        `);
      }

      // jsonl file url
      bulkDataUrl = bulkOperationPoll.url;

      if (bulkDataUrl) {
        // fetch the jsonl file provided by shopify
        const bulkData = await fetch(bulkDataUrl);

        // extract readable stream from the file
        const bulkDataStream = bulkData.body;

        return bulkDataStream;

      } else {
        reporter.panic('Missing bulk operation JsonL file url');
      }

    } catch (error) {
      reporter.panic(error);
    }
  };

  return await runAndWaitBulkCollectionsQuery({
    client,
    query: BULK_SHOPIFY_COLLECTIONS_QUERY,
    reporter
  });
};

exports.parseIncludedCollections = ({ allCollectionsJsonlStream, excludeTerms }) => {
  /* eslint-disable no-undef */
  return new Promise((resolve, reject) => {
    if (!allCollectionsJsonlStream) reject('Missing JSONL stream');

    let nodes = [];
    let nodeIndex = 0;
    let collectionExcluded = false;
    let isFirstProductVariant = true;

    const checkIsExcluded = ({ collection, excludeTerms }) => {
      // Exclude collection based on passed terms in both (title and handle)
      const multiIncludes = (text, values = []) => {
        const result = new RegExp(values.join('|'));
        return result.test(text);
      };
      const hasProducts = collection.productsCount > 0;
      const matchesExcludeTermInHandle = excludeTerms.length
        ? multiIncludes(collection.handle, excludeTerms)
        : false;
      const matchesExcludeTermInTitle = excludeTerms.length
        ? multiIncludes(collection.title.toLowerCase(), excludeTerms)
        : false;
      return (!hasProducts || matchesExcludeTermInHandle || matchesExcludeTermInTitle);
    };

    const addCollection = node => {
      // this will bold the variants needed later in  .mapCollections
      node.variants = [];

      // only collection lines create new parent nodes
      nodes = [...nodes, node];

      nodeIndex++;
      return;
    };


    const addVariantToCollection = node => {
      // overwrite the collection with the updated node
      return [
        ...nodes[nodes.length - 1].variants,
        node.id
      ];
    };

    const parseLine = node => {
      const isCollection = typeof node.__parentId === 'undefined';
      const isProduct = node.id.includes('/Product/');
      const isProductVariant = node.id.includes('/ProductVariant/');

      if (isCollection) {
        collectionExcluded = checkIsExcluded({ collection:node, excludeTerms });
        if (collectionExcluded) return;
        return addCollection(node);
      }

      // json line is a nested node (Product or ProductVariant)
      // Product line
      if (isProduct) {
        // we don't need to parse products but use it as marker to detect the first productVariant
        if (collectionExcluded) return;

        // collection is included
        isFirstProductVariant = true;
        return;
      }

      // ProductVariant line
      if (isProductVariant) {
        if (collectionExcluded) return;

        if (isFirstProductVariant) {
          // parse it
          const updatedVariants = addVariantToCollection(node);
          nodes[nodes.length - 1].variants = updatedVariants;
          isFirstProductVariant = false;
        } else {
          // ignore non-first variants all together
        }

        return;
      }

      reject('Unexpected jsonl line/node type. Failed to parse stream');
    };

    // read each line in the stream and parse it as json
    allCollectionsJsonlStream
      .pipe(split(JSON.parse, null, { trailing: false }))
      .on('data', parseLine)
      .on('end', () => {
        console.log(`Finished parsing JsonL stream. Parsed [${nodes.length}] collection`);
        resolve(nodes);
      });
  });
};

exports.sortCollections = async ({ filteredCollections, helpers }) => {
  const { cache, getNodesByType } = helpers;
  const oldNodes = getNodesByType(`${TYPE_PREFIX}${COLLECTION}`);
  const currentNodeIds = filteredCollections
    .map(node => convertToGatsbyGraphQLId(node.id.split('/').pop(), COLLECTION, TYPE_PREFIX));
  const removedNodes = oldNodes
    .filter(oldNode => !currentNodeIds.includes(oldNode.id));

  return await filteredCollections
    .reduce(async (_nodes, node) => {
      const nodes = await _nodes;
      const backpackCollectionId = convertToGatsbyGraphQLId(node.id.split('/').pop(), COLLECTION, TYPE_PREFIX);
      const cachedData = await cache.get(backpackCollectionId) || {};
      const hasChanged = cachedData.updatedAt !== node.updatedAt;

      if (hasChanged) {
        return {
          ...nodes,
          staleNodes: [ node, ...nodes.staleNodes ],
        };
      }

      return {
        ...nodes,
        unchangedNodes: [ node, ...nodes.unchangedNodes ],
      };
    }, Promise.resolve({ unchangedNodes: [], removedNodes, staleNodes: [] }));
};


exports.mapCollections = ({ staleCollections = [], helpers }) => {
  const { getNode, getNodesByType } = helpers;
  const staleCollectionsCount = staleCollections.length;

  if (!staleCollectionsCount) return [];

  const shopifyBackpackVariantsMap = getNodesByType('BackpackProductVariant')
    .reduce((productVariantsMap, { id, foreignId }) => ({
      ...productVariantsMap,
      [foreignId]: getNode(id)
    }), {});


  return staleCollections
    .map(collection => {
      const variants = collection.variants
        .reduce((nodes, id) => {
          return shopifyBackpackVariantsMap[id]
            ? [ ...nodes, shopifyBackpackVariantsMap[id] ]
            : nodes;
        }, []);

      /* eslint-disable no-undef */
      const optionValues = new Set(variants.map(variant => getNode(variant.product___NODE).optionValues));

      return {
        ...collection,
        variants: variants.map(({ id }) => id),
        optionValues: deepMerge(...Array.from(optionValues))
      };
    });
};


const checkBulkQueryStatus = async ({ client }) => {
  const response = await client.query({
    query: BULK_OPERATION_STATUS_QUERY,
    fetchPolicy: 'network-only' // important
  });
  const { data } = response;
  const { currentBulkOperation } = data;
  return currentBulkOperation;
};

const cancelBulkQuery = async ({ client, id }) => {
  console.log('Cancelling bulk operation', id);
  const cancelResponse = await client.mutate({
    mutation: BULK_OPERATION_CANCEL_MUTATION,
    variables: { 'id': id }
  });

  const { data } = cancelResponse;
  const { bulkOperationCancel } = data;
  return bulkOperationCancel;
};


/* eslint-disable no-undef */
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

