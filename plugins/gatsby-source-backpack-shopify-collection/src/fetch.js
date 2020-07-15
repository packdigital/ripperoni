const get = require('lodash.get');

const { formatMessage, flattenEdges, getLegacyShopifyId, deepMerge } = require('@packdigital/ripperoni-utilities');

const { clients } = require('./client');
const { PLUGIN_NAME, PLUGIN_COLOR } = require('./constants');
const {
  SHOPIFY_COLLECTIONS_QUERY,
  SHOPIFY_COLLECTIONS_UPDATED_AT_QUERY,
  SHOPIFY_COLLECTION_PRODUCTS_QUERY,
} = require('./queries');


const asFormattedMessage = formatMessage(PLUGIN_NAME, PLUGIN_COLOR);

const recursivelyRunQuery = async ({
  client,
  query,
  variables = {},
  results = [],
  path = 'data.results'
}) => {
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

const findOldestUpdatedCollectionTimestamp = (cache, collectionsMeta) => {
  const oldestTimestamp = collectionsMeta.reduce((oldestTimestamp, { id, updatedAt }) => {
    const cachedValue = cache.get(id) || {};
    const hasChanged = cachedValue.updatedAt !== updatedAt;

    return (!hasChanged || updatedAt > oldestTimestamp)
      ? oldestTimestamp
      : updatedAt;
  });

  const oldestIndex = collectionsMeta.findIndex(({ updatedAt }) => updatedAt === oldestTimestamp);

  console.log(asFormattedMessage(`🛒 Fetching ${oldestIndex + 1} new collections.`));

  return Promise.resolve(oldestTimestamp);
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

const mapBackpackProductsToCollection = getNodesByType => {
  return collections => {
    const backpackProducts = getNodesByType('BackpackProduct');
    const createProductMap = id => (map, shopifyId) => ({ ...map, [shopifyId]: id });
    const shopifyBackpackProductsMap = backpackProducts
      .reduce((productsMap, { id, foreignIds }) => ({
        ...productsMap,
        ...(foreignIds.reduce(createProductMap(id), {})),
      }), {});

    const mapProducts = collection => collection.products
      .reduce((products, { legacyId }) => shopifyBackpackProductsMap[legacyId]
        ? [ ...products, { ...shopifyBackpackProductsMap[legacyId] } ]
        : products
      , []);

    const mapOptionValues = products => products
      .reduce((optionValues, product) => deepMerge(optionValues, product.optionValues), {});

    return collections.map(collection => {
      const products = mapProducts(collection);
      const optionValues = mapOptionValues(products);

      return { ...collection, products, optionValues };
    });
  };
};

const cacheAndMergeNewCollectionData = (cache, collectionsMeta) => {
  return async collections => {
    await Promise.all(collections.map(collection => cache.set(collection.id, collection)));

    const collectionDataFromCache = collectionsMeta.map(({ id }) => cache.get(id));

    return await Promise.all(collectionDataFromCache);
  };
};

exports.fetchAndTransformShopifyData = async (options, { cache, getNodesByType, reporter }) => {
  try {
    const client = clients.shopify(options);
    const query = SHOPIFY_COLLECTIONS_UPDATED_AT_QUERY;
    const collectionsMeta = await recursivelyRunQuery({ client, query });

    const collectionsWithProducts = await findOldestUpdatedCollectionTimestamp(cache, collectionsMeta)
      .then(fetchUpdatedCollectionData(client))
      .then(fetchAdditionalCollectionProducts(client))
      .then(mapBackpackProductsToCollection(getNodesByType));
      // .then(cacheAndMergeNewCollectionData(cache, collectionsMeta));

    return collectionsWithProducts;
  } catch (error) {
    reporter.panic('Something went wrong while sourcing collection data from Shopify: ', error);
  }
};


// 1. get all collections w/ updated_at only
// 2. compare updated_at against updated_at in cache
// 3. if no cache get all collections
// 4. if cache find oldest, changed/different updated_at and run query w/ query: "updated_at:>=YYYY-MM-DD"
// 5. after querying all collection data, inspect product field and check if pageInfo.hasNextPage === true
// 6. if true, run follow up query(s) using collectionByHandle w/ only product field and recursively request all products
// 7. once all the data has been fetched, update cache with new values
