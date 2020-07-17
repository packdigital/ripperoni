/* eslint-disable max-lines */
const get = require('lodash.get');
const { atob } = require('abab');

const {
  formatMessage,
  flattenEdges,
  deepMerge,
  convertToGatsbyGraphQLId,
} = require('@packdigital/ripperoni-utilities');

const { clients } = require('./client');
const { PLUGIN_NAME, PLUGIN_COLOR, TYPE_PREFIX, COLLECTION, IMAGE } = require('./constants');
const {
  SHOPIFY_COLLECTIONS_QUERY,
  SHOPIFY_COLLECTIONS_UPDATED_AT_QUERY,
  SHOPIFY_COLLECTION_PRODUCTS_QUERY,
} = require('./queries');


const asFormattedMessage = formatMessage(PLUGIN_NAME, PLUGIN_COLOR);

const recursivelyRunQuery = async ({ client, query, variables = {}, results = [], path = 'data.results' }) => {
  const response = await client.query({ query, variables });
  const { pageInfo, edges } = get(response, path);

  if (pageInfo.hasNextPage) {
    const cursor = edges.reverse()[0].cursor;

    return recursivelyRunQuery({
      path,
      client,
      query,
      results: [ ...edges, ...results ],
      variables: { ...variables, cursor },
    });
  }

  return flattenEdges({ edges: [...results, ...edges] });
};

const findOldestUpdatedCollectionTimestamp = async (cache, touchNode, collectionsMeta) => {
  let touchedCollectionNodes = 0;
  let touchedCollectionImageNodes = 0;

  const oldestTimestamp = await collectionsMeta.reduce(async (oldestTimestamp, { id, image, updatedAt }) => {
    const backpackCollectionId = convertToGatsbyGraphQLId(id, COLLECTION, TYPE_PREFIX);
    const cachedData = await cache.get(backpackCollectionId) || {};
    const hasChanged = cachedData.updatedAt !== updatedAt;

    if (!hasChanged || updatedAt > oldestTimestamp) {
      touchNode({ nodeId: backpackCollectionId });
      touchedCollectionNodes++;

      if (image) {
        const collectionImageId = convertToGatsbyGraphQLId(image.id, IMAGE, TYPE_PREFIX);
        touchNode({ nodeId: collectionImageId });
        touchedCollectionImageNodes++;
      }
    }

    return (!hasChanged || updatedAt > oldestTimestamp) ? oldestTimestamp : updatedAt;
  });

  const oldestIndex = collectionsMeta.findIndex(({ updatedAt }) => updatedAt === oldestTimestamp);

  console.log(asFormattedMessage(`🛒 Touched ${touchedCollectionNodes} BackpackCollection nodes from cache.`));
  console.log(asFormattedMessage(`🛒 Touched ${touchedCollectionImageNodes} BackpackCollectionImage nodes from cache.`));
  console.log(asFormattedMessage(`🛒 Fetching ${oldestIndex + 1} new collections.`));

  return oldestTimestamp;
};

const fetchUpdatedCollectionData = client => {
  return timestamp => recursivelyRunQuery({
    client,
    query: SHOPIFY_COLLECTIONS_QUERY,
    variables: { query: `updated_at:>=${timestamp}` },
  });
};

const fetchAdditionalCollectionProductVariants = client => {
  return async collections => {
    let addtionalProductsCount = 0;

    const collectionsWithProductVariants = collections.map(async collection => {
      let products = flattenEdges(collection.products);

      if (collection.products.pageInfo.hasNextPage) {
        const handle = collection.handle;
        const cursor = collection.products.edges.reverse()[0].cursor;
        const query = SHOPIFY_COLLECTION_PRODUCTS_QUERY;
        const variables = { cursor, handle };
        const results = collection.products.edges;
        const path = 'data.results.products';

        products = await recursivelyRunQuery({ client, query, variables, results, path });

        addtionalProductsCount += (products.length - 250);
      }

      collection.variants = products
        .map(product => atob(flattenEdges(product.variants)[0].id));

      return collection;
    });

    const resolvedCollectionsWithProductVariants = await Promise.all(collectionsWithProductVariants);

    console.log(asFormattedMessage(`🛒 Fetched ${addtionalProductsCount} addtional products.`));

    return resolvedCollectionsWithProductVariants;
  };
};

const mapBackpackProductVariantsToCollection = (getNode, getNodesByType) => {
  return collections => {
    const backpackProductVariants = getNodesByType('BackpackProductVariant');

    const shopifyBackpackProductVariantsMap = backpackProductVariants
      .reduce((productVariantsMap, { id, foreignId }) => ({
        ...productVariantsMap,
        [foreignId]: getNode(id)
      }), {});

    return collections.map(collection => {
      const variants = collection.variants
        .map(id => shopifyBackpackProductVariantsMap[id]);
      const optionValues = new Set(variants.map(variant => getNode(variant.product___NODE).optionValues));

      return {
        ...collection,
        variants: variants.map(({ id }) => id),
        optionValues: deepMerge(...Array.from(optionValues))
      };
    });
  };
};

exports.fetchAndTransformShopifyData = async (options, helpers) => {
  const { actions: { touchNode }, cache, getNode, getNodesByType, reporter } = helpers;

  try {
    const client = clients.shopify(options);
    const query = SHOPIFY_COLLECTIONS_UPDATED_AT_QUERY;
    const collectionsMeta = await recursivelyRunQuery({ client, query });

    const collectionsWithProducts = await findOldestUpdatedCollectionTimestamp(cache, touchNode, collectionsMeta)
      .then(fetchUpdatedCollectionData(client))
      .then(fetchAdditionalCollectionProductVariants(client))
      .then(mapBackpackProductVariantsToCollection(getNode, getNodesByType));

    return collectionsWithProducts;
  } catch (error) {
    reporter.panic('Something went wrong while sourcing collection data from Shopify: ', error);
  }
};
