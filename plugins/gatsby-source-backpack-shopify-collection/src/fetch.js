const get = require('lodash.get');

const {
  formatMessage,
  flattenEdges,
  getLegacyShopifyId,
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
    const cachedValue = await cache.get(backpackCollectionId) || {};
    const hasChanged = cachedValue.updatedAt !== updatedAt;

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

const fetchAdditionalCollectionProducts = client => {
  let addtionalProductsCount = 0;

  return async collections => {
    const collectionsWithProducts = collections.map(async collection => {
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

      const productsWithLegacyId = products
        .map(product => ({ ...product, legacyId: getLegacyShopifyId(product.id) }));

      collection.products = productsWithLegacyId;

      return collection;
    });

    console.log(asFormattedMessage(`🛒 Fetched ${addtionalProductsCount} addtional products.`));

    return await Promise.all(collectionsWithProducts);
  };
};

const mapBackpackProductsToCollection = (getNode, getNodesByType) => {
  return collections => {
    const backpackProducts = getNodesByType('BackpackProduct');
    const shopifyBackpackProductsMap = backpackProducts
      .reduce((productsMap, { id, foreignIds }) => {
        const backpackProduct = getNode(id);
        const createProductMap = (map, shopifyId) =>
          ({ ...map, [getLegacyShopifyId(shopifyId)]: backpackProduct });
        const productMap = foreignIds.reduce(createProductMap, {});

        return { ...productsMap, ...productMap };
      }, {});

    const mapProducts = collection => collection.products
      .reduce((products, { legacyId }) => {
        const product = shopifyBackpackProductsMap[legacyId];

        return product ? [ ...products, product ] : products;
      }, []);

    const mapOptionValues = products => products
      .reduce((optionValues, product) => deepMerge(optionValues, product.optionValues), {});

    return collections.map(collection => {
      const products = mapProducts(collection);
      const optionValues = mapOptionValues(products);

      return { ...collection, products, optionValues };
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
      .then(fetchAdditionalCollectionProducts(client))
      .then(mapBackpackProductsToCollection(getNode, getNodesByType));

    return collectionsWithProducts;
  } catch (error) {
    reporter.panic('Something went wrong while sourcing collection data from Shopify: ', error);
  }
};
