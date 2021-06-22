/* eslint-disable max-lines */
const get = require('lodash.get');
const abab = require('abab');

const utils = require('@packdigital/ripperoni-utilities');

const queries = require('./queries');
const constants = require('./constants');

const { LOG_PREFIX, TYPE_PREFIX, COLLECTION } = constants;

const recursivelyRunQuery = async ({
  client,
  query,
  results = [],
  variables = {},
  path = 'data.results',
  callback = () => {},
}) => {
  const response = await client.query({ query, variables });
  const { pageInfo, edges } = get(response, path);

  callback(edges);

  if (pageInfo.hasNextPage) {
    const { cursor } = edges[edges.length - 1];

    return recursivelyRunQuery({
      path,
      client,
      query,
      results: [...results, ...edges],
      variables: { ...variables, cursor },
      callback,
    });
  }

  return utils.flattenEdges({ edges: [...results, ...edges] });
};

exports.sortUnchangedRemovedAndStaleNodes = async ({ client, helpers }) => {
  const { cache, getNodesByType } = helpers;
  const query = queries.SHOPIFY_COLLECTIONS_UPDATED_AT_QUERY;
  const collectionsMeta = await recursivelyRunQuery({ client, query });

  const oldNodes = getNodesByType(`${TYPE_PREFIX}${COLLECTION}`);
  const currentNodeIds = collectionsMeta.map((node) =>
    utils.convertToGatsbyGraphQLId(node.id, COLLECTION, TYPE_PREFIX)
  );
  const removedNodes = oldNodes.filter(
    (oldNode) => !currentNodeIds.includes(oldNode.id)
  );

  return await collectionsMeta.reduce(async (_nodes, node) => {
    const nodes = await _nodes;
    const backpackCollectionId = utils.convertToGatsbyGraphQLId(
      node.id,
      COLLECTION,
      TYPE_PREFIX
    );
    const cachedData = (await cache.get(backpackCollectionId)) || {};
    const hasChanged = cachedData.updatedAt !== node.updatedAt;

    if (hasChanged) {
      return {
        ...nodes,
        staleNodes: [node, ...nodes.staleNodes],
      };
    }

    return {
      ...nodes,
      unchangedNodes: [node, ...nodes.unchangedNodes],
    };
  }, Promise.resolve({ unchangedNodes: [], removedNodes, staleNodes: [] }));
};

const fetchUpdatedCollectionData = async ({
  staleNodes,
  client,
  helpers,
  retryCount = 0,
}) => {
  const { format, createProgress, info } = helpers.reporter;
  const collectionCount = staleNodes.length;
  const oldestTimestamp = staleNodes[0].updatedAt;
  const progressMessage = format`{${LOG_PREFIX}} Fetch collections from {green {bold Shopify}}`;
  const progress = createProgress(progressMessage, collectionCount, 0);
  const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    progress.start();

    const collectionData = await recursivelyRunQuery({
      client,
      query: queries.SHOPIFY_COLLECTIONS_QUERY,
      variables: { query: `updated_at:>=${oldestTimestamp}` },
      callback: (result) => progress.tick(result.length),
    });

    progress.setStatus(format`{bold ${collectionCount} collections}`);

    progress.end();

    return collectionData;
  } catch (error) {
    console.error('error', error);

    if (retryCount < 3) {
      const newCount = retryCount + 1;
      const waitForMs = newCount * newCount * 1000;

      info(
        format`{${LOG_PREFIX}} Retrying collections fetch...waiting ${waitForMs}ms`
      );

      await pause(waitForMs);

      return fetchUpdatedCollectionData({
        staleNodes,
        client,
        helpers,
        retryCount: retryCount - 1,
      });
    }

    throw new Error(error);
  }
};

const fetchAdditionalCollectionVariants = async ({
  collectionsData,
  client,
  helpers,
}) => {
  const { format, activityTimer } = helpers.reporter;

  let addtionalProducts = 0;

  const timer = activityTimer(
    format`{${LOG_PREFIX}} Fetch collection products from {green {bold Shopify}}`
  );

  timer.start();

  const collectionsWithVariants = collectionsData.map(async (collection) => {
    let products = utils.flattenEdges(collection.products);

    if (collection.products.pageInfo.hasNextPage) {
      const handle = collection.handle;
      const cursor = collection.products.edges.reverse()[0].cursor;
      const query = queries.SHOPIFY_COLLECTION_PRODUCTS_QUERY;
      const variables = { cursor, handle };
      const results = collection.products.edges;
      const path = 'data.results.products';

      products = await recursivelyRunQuery({
        client,
        query,
        variables,
        results,
        path,
      });

      addtionalProducts += products.length - 250;
    }

    collection.variants = products.map((product) =>
      abab.atob(utils.flattenEdges(product.variants)[0].id)
    );

    return collection;
  });

  // eslint-disable-next-line no-undef
  const resolvedCollectionsWithVariants = await Promise.all(
    collectionsWithVariants
  );

  timer.setStatus(format`{bold ${addtionalProducts} products}`);

  timer.end();

  return resolvedCollectionsWithVariants;
};

const mapBackpackVariantsToCollections = ({ helpers, collections = [] }) => {
  const { getNode, getNodesByType } = helpers;

  const backpackVariants = getNodesByType('BackpackProductVariant');

  const getBackpackVariant = (gid) =>
    backpackVariants.find(({ foreignId }) => foreignId === gid) || [];

  return collections.map((collection) => {
    const variants = collection.variants.flatMap(getBackpackVariant);
    const optionValues = variants
      .map(({ product___NODE }) => getNode(product___NODE))
      .map(({ optionValues }) => optionValues);

    return {
      ...collection,
      variants: variants.map(({ id }) => id),
      optionValues: utils.deepMerge(...Array.from(optionValues)),
    };
  });
};

exports.fetchFreshCollectionData = async ({ staleNodes, client, helpers }) => {
  const { reporter } = helpers;

  try {
    const collectionsData = await fetchUpdatedCollectionData({
      staleNodes,
      client,
      helpers,
    });

    const collections = await fetchAdditionalCollectionVariants({
      collectionsData,
      client,
      helpers,
    });

    const collectionsNodeData = mapBackpackVariantsToCollections({
      collections,
      helpers,
    });

    return collectionsNodeData;
  } catch (error) {
    reporter.panic(
      `
      Something went wrong while sourcing collection data from Shopify.
      Make sure your Backpack products and Shopify collection data are coming from the same place.

      Error:`,
      error
    );
  }
};
