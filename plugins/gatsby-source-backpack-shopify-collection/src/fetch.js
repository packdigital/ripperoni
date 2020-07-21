/* eslint-disable max-lines */
const get = require('lodash.get');
const { atob } = require('abab');

const {
  flattenEdges,
  deepMerge,
  convertToGatsbyGraphQLId,
} = require('@packdigital/ripperoni-utilities');

const { clients } = require('./client');
const { LOG_PREFIX, TYPE_PREFIX, COLLECTION, IMAGE } = require('./constants');
const {
  SHOPIFY_COLLECTIONS_QUERY,
  SHOPIFY_COLLECTIONS_UPDATED_AT_QUERY,
  SHOPIFY_COLLECTION_PRODUCTS_QUERY,
} = require('./queries');


const recursivelyRunQuery = async ({
  client,
  query,
  variables = {},
  results = [],
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
      results: [ ...results, ...edges ],
      variables: { ...variables, cursor },
      callback,
    });
  }

  return flattenEdges({ edges: [ ...results, ...edges ] });
};

const findOldestUpdatedCollection = async ({ collectionsMeta, helpers }) => {
  const { cache, reporter, actions: { touchNode }} = helpers;
  const { format, success } = reporter;
  const collection = `${TYPE_PREFIX}${COLLECTION}`;
  const image = `${TYPE_PREFIX}${IMAGE}`;
  let touchedCollections = 0;
  let touchedImages = 0;

  const oldestTimestamp = await collectionsMeta.reduce(async (oldestTimestamp, { id, image, updatedAt }) => {
    const backpackCollectionId = convertToGatsbyGraphQLId(id, COLLECTION, TYPE_PREFIX);
    const cachedData = await cache.get(backpackCollectionId) || {};
    const hasChanged = cachedData.updatedAt !== updatedAt;

    if (!hasChanged || updatedAt > oldestTimestamp) {
      touchNode({ nodeId: backpackCollectionId });
      touchedCollections++;

      if (image) {
        const collectionImageId = convertToGatsbyGraphQLId(image.id, IMAGE, TYPE_PREFIX);
        touchNode({ nodeId: collectionImageId });
        touchedImages++;
      }
    }

    return (!hasChanged || updatedAt > oldestTimestamp)
      ? oldestTimestamp
      : updatedAt;
  });

  if (touchedCollections > 0) {
    success(format`{${LOG_PREFIX}} Load {bold ${collection}} from cache - {bold ${touchedCollections} nodes}`);
  }

  if (touchedImages > 0) {
    success(format`{${LOG_PREFIX}} Load {bold ${image}} from cache - {bold ${touchedImages} nodes}`);
  }

  return oldestTimestamp;
};

const fetchUpdatedCollectionData = async ({ client, oldestTimestamp, oldestIndex, helpers, retries = 3 }) => {
  const { format, createProgress } = helpers.reporter;

  try {
    if (oldestIndex === -1) return;

    const collectionCount = oldestIndex + 1;
    const progressMessage = format`{${LOG_PREFIX}} Fetch collections from {green {bold Shopify}}`;
    const progress = createProgress(progressMessage, collectionCount, 0);

    progress.start();

    const collectionData = await recursivelyRunQuery({
      client,
      query: SHOPIFY_COLLECTIONS_QUERY,
      variables: { query: `updated_at:>=${oldestTimestamp}` },
      callback: result => progress.tick(result.length),
    });

    progress.setStatus(format`{bold ${collectionCount} collections}`);
    progress.end();

    return collectionData;
  } catch (error) {
    if (retries > 0) {
      return fetchUpdatedCollectionData({ client, oldestTimestamp, oldestIndex, helpers, retries: retries - 1 });
    }

    throw new Error(error);
  }
};

const fetchAdditionalCollectionVariants = async ({ client, collectionsData, helpers }) => {
  const { format, activityTimer } = helpers.reporter;

  if (!collectionsData) return;

  let addtionalProducts = 0;
  const timer = activityTimer(format`{${LOG_PREFIX}} Fetch collection products from {green {bold Shopify}}`);

  timer.start();

  const collectionsWithVariants = collectionsData.map(async collection => {
    let products = flattenEdges(collection.products);

    if (collection.products.pageInfo.hasNextPage) {
      const handle = collection.handle;
      const cursor = collection.products.edges.reverse()[0].cursor;
      const query = SHOPIFY_COLLECTION_PRODUCTS_QUERY;
      const variables = { cursor, handle };
      const results = collection.products.edges;
      const path = 'data.results.products';

      products = await recursivelyRunQuery({ client, query, variables, results, path });

      addtionalProducts += (products.length - 250);
    }

    collection.variants = products
      .map(product => atob(flattenEdges(product.variants)[0].id));

    return collection;
  });

  // eslint-disable-next-line no-undef
  const resolvedCollectionsWithVariants = await Promise.all(collectionsWithVariants);

  timer.setStatus(format`{bold ${addtionalProducts} products}`);
  timer.end();

  return resolvedCollectionsWithVariants;
};

const mapBackpackVariantsToCollection = ({ collectionsWithVariants = [], helpers }) => {
  const { getNode, getNodesByType } = helpers;

  const shopifyBackpackVariantsMap = getNodesByType('BackpackProductVariant')
    .reduce((productVariantsMap, { id, foreignId }) => ({
      ...productVariantsMap,
      [foreignId]: getNode(id)
    }), {});

  return collectionsWithVariants.map(collection => {
    const variants = collection.variants
      .reduce((nodes, id) => {
        return shopifyBackpackVariantsMap[id]
          ? [ ...nodes, shopifyBackpackVariantsMap[id] ]
          : nodes;
      }, []);

    const optionValues = new Set(variants.map(variant => getNode(variant.product___NODE).optionValues));

    return {
      ...collection,
      variants: variants.map(({ id }) => id),
      optionValues: deepMerge(...Array.from(optionValues))
    };
  });
};

exports.fetchAndTransformShopifyData = async ({ options, helpers }) => {
  const { reporter } = helpers;

  try {
    const client = clients.shopify(options);
    const query = SHOPIFY_COLLECTIONS_UPDATED_AT_QUERY;
    const collectionsMeta = await recursivelyRunQuery({ client, query });
    const oldestTimestamp = await findOldestUpdatedCollection({ collectionsMeta, helpers });
    const oldestIndex = collectionsMeta.findIndex(({ updatedAt }) => updatedAt === oldestTimestamp);
    const collectionsData = await fetchUpdatedCollectionData({ client, oldestTimestamp, oldestIndex, helpers });
    const collectionsWithVariants = await fetchAdditionalCollectionVariants({ client, collectionsData, helpers });
    const collectionsNodeData = mapBackpackVariantsToCollection({ collectionsWithVariants, helpers });

    return collectionsNodeData;
  } catch (error) {
    reporter.panic(`
      Something went wrong while sourcing collection data from Shopify.
      Make sure your Backpack products and Shopify collection data are coming from the same place.

      Error:`, error);
  }
};
