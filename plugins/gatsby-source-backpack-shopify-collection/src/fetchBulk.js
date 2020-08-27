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

        console.log(`
          Current status: ${bulkOperation.status}
          Pooling bulk operation for: ${match}
          Object count: ${bulkOperation.objectCount}
        `);

        successState = checkStatus(bulkOperation.status);

        await pause(checkEvery * 1000);

      } while (Date.now() <= endTime && !successState);

      return { successState, bulkOperation };
    };


  const forQueueStatusTo = bulkPoolingFactory({ client, name: 'Generic pool..' });
  // seconds

  const maybeWaitForQueue = async ({ client, cancelExisting = false }) => {
    console.log('maybeWaitForQueue...');
    // check if we the bulk queue is available
    const { id, status } = await checkBulkQueryStatus({ client });

    const queueIsAvailable = status === 'COMPLETED' || status === 'CANCELED';

    // check if theres an active operation, and cancel it
    if (queueIsAvailable) {
      console.log('Lets go...');
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
        checkEvery: 5,
        maxWait: 60, // sec
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


exports.parseCollections = ({ allCollectionsJsonlStream }) => {
  /* eslint-disable no-undef */
  return new Promise((resolve, reject) => {
    if (!allCollectionsJsonlStream) reject('Missing JSONL stream');

    let nodes = [];
    let nodeIndex = 0;

    const addCollection = node => {
      if (nodeIndex > 1) {
        // console.log(nodeIndex, 'new collection created', node.title, 'last collection variants count', nodes[nodes.length - 1].variants.length);
      }

      // console.log('Node type is collection')
      node.variants = []; // this will bold the variants needed later in  .mapCollections
      // only collection lines create new parent nodes
      nodes = [...nodes, node];

      nodeIndex++;
      return;
    };

    const addProductToCollection = (node, collectionNode) => {
      if (!collectionNode) return;

      if (collectionNode && collectionNode.products) {
        collectionNode.products = [...collectionNode.products, node];
      } else {
        collectionNode.products = [node];
      }

      // overwrite the collection with the updated node
      nodes[nodeIndex - 1] = collectionNode;
      return;
    };

    const addProductVariantToProductAndCollection = (node, collectionNode) => {
      // if (!collectionNode) return;
      // console.log('Node type is collection.product.variant')
      // if (collectionNode && collectionNode.products) {
      //   const variantsProductIndex = collectionNode.products
      //     .findIndex(p => p.id === node.__parentId) || 0;

      //   const product = collectionNode.products[variantsProductIndex] || null;

      //   if (product && product.variants) {
      //     collectionNode.products[variantsProductIndex].variants = [
      //       ...collectionNode.products[variantsProductIndex].variants,
      //       node
      //     ];

      //   } else {
      //     collectionNode.products[variantsProductIndex].variants = [node];
      //   }
      // }

      // add the variants to the collection node
      // if (collectionNode & collectionNode.variants && collectionNode.variants.length) {
      //   collectionNode.variants = [...collectionNode.variants, node.id];
      // } else {
      //   collectionNode.variants = [node.id];
      // }

      // overwrite the collection with the updated node
      return [
        ...nodes[nodes.length - 1].variants,
        node.id
      ];
    };

    const parseLine = (node) => {
      const isCollection = typeof node.__parentId === 'undefined';
      const isProduct = node.id.includes('/Product/');
      const isProductVariant = node.id.includes('/ProductVariant/');

      if (isCollection) {
        return addCollection(node);
      }

      // json line is a nested node (Product or ProductVariant)

      // retrieve the last collection node so we can attach products to it
      let collectionNode = nodes[nodeIndex - 1] || nodes[0];

      // Product line
      if (isProduct) {
        return;
        // return addProductToCollection(node, collectionNode);
      }

      // ProductVariant line
      if (isProductVariant) {
        const updatedVariants = addProductVariantToProductAndCollection(node, collectionNode);
        nodes[nodes.length - 1].variants = updatedVariants;
        return;
      }

      reject('Unexpected jsonl line/node type. Failed to parse stream');
    };

    const returnParsedCollections = () => {
      console.log(`Finished parsing JsonL stream. Parsed [${nodes.length}] collection`);
      resolve(nodes);
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

exports.filterCollections = async ({ allCollections, excludeTerms, helpers }) => {
  const { reporter } = helpers;
  console.log('Filtering collections before count:', allCollections.length, 'first ', allCollections[0], 'excludeTerms', excludeTerms);

  const filterWithProductsNotExcluded = allCollections => new Promise((resolve) => {
    console.log('filterWithProductsNotExcluded....');
    let filtered = [];
    let collectionCount = allCollections.length;
    console.log('collectionCount', collectionCount);
    let collectionIndex = 0;

    const multiIncludes = (text, values = []) => {
      const result = new RegExp(values.join('|'));
      return result.test(text);
    };

    do {
      const collection = allCollections[collectionIndex];
      const hasProducts = collection.productsCount > 0;
      const matchesExcludeTermInHandle = multiIncludes(collection.handle, excludeTerms);
      const matchesExcludeTermInTitle = multiIncludes(collection.title.toLowerCase(), excludeTerms);

      if (collectionIndex < 3) {
        console.log(collectionIndex, 'filtered.count', filtered.length);
        console.log(collectionIndex, 'collection', collection);
        console.log(collectionIndex, 'hasProducts', hasProducts);
        console.log(collectionIndex, 'matchesExcludeTermInHandle', matchesExcludeTermInHandle);
        console.log(collectionIndex, 'matchesExcludeTermInTitle', matchesExcludeTermInTitle);
        console.log(collectionIndex, 'matchesExcludeTermInTitle', matchesExcludeTermInTitle);
      }

      let isExcluded = (!hasProducts || matchesExcludeTermInHandle || matchesExcludeTermInTitle);

      if (!isExcluded) {
        filtered = filtered.length
          ? [...filtered, collection]
          : [collection];
      }

      collectionIndex++;

    } while (collectionIndex < collectionCount);

    resolve(filtered);
  });

  const filteredCollections = await filterWithProductsNotExcluded(allCollections);

  console.log('Filtering collections after count:', filteredCollections.length, 'first ', filteredCollections[0]);

  return filteredCollections;
};

exports.sortCollections = async ({ filteredCollections, helpers }) => {
  console.log(`Sorting filtered collection nodes based on caching status... Nodes to sort: [${filteredCollections.length}]`);
  const { cache, getNodesByType } = helpers;
  const oldNodes = getNodesByType(`${TYPE_PREFIX}${COLLECTION}`);
  const currentNodeIds = filteredCollections.map(node => convertToGatsbyGraphQLId(node.id, COLLECTION, TYPE_PREFIX));
  const removedNodes = oldNodes
    .filter(oldNode => !currentNodeIds.includes(oldNode.id));

  return await filteredCollections
    .reduce(async (_nodes, node) => {
      const nodes = await _nodes;
      const backpackCollectionId = convertToGatsbyGraphQLId(node.id, COLLECTION, TYPE_PREFIX);
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
  const { getNode, getNodesByType, reporter } = helpers;
  const staleCollectionsCount = staleCollections.length;

  if (!staleCollectionsCount) return [];

  const shopifyBackpackVariantsMap = getNodesByType('BackpackProductVariant')
    .reduce((productVariantsMap, { id, foreignId }) => ({
      ...productVariantsMap,
      [foreignId]: getNode(id)
    }), {});

  const firstBpVariantId = Object.keys(shopifyBackpackVariantsMap)[0];

  if (!firstBpVariantId) {
    reporter.panic(`
      There are no backpack products available. Please make sure the
      backpackSource plugin option is configured and enabled.
    `);
  }

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
  const query = BULK_OPERATION_STATUS_QUERY;
  const response = await client.query({ query, fetchPolicy: 'network-only' });
  const { data } = response;
  const { currentBulkOperation } = data;
  return currentBulkOperation;
};

const cancelBulkQuery = async ({ client, id }) => {
  console.log('Cancelling bulk operation', id);
  const cancelMutation = BULK_OPERATION_CANCEL_MUTATION;
  const cancelVariables = { 'id': id };
  const cancelResponse = await client.mutate({
    mutation: cancelMutation,
    variables: cancelVariables
  });

  const { data } = cancelResponse;
  const { bulkOperationCancel } = data;
  return bulkOperationCancel;
};


/* eslint-disable no-undef */
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

