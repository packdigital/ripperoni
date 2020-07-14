const deepmerge = require('deepmerge');
const createNodeHelpers = require('gatsby-node-helpers').default;

const createTypes = require('./src/types');
const { clients } = require('./src/client');
const { titleCase, formatMessage } = require('./src/utils');
const { SHOPIFY_COLLECTIONS_QUERY } = require('./src/queries');
const { downloadImagesAndCreateFileNode } = require('./src/download-asset');
const { TYPE_PREFIX, COLLECTION, COLLECTION_META, COLLECTION_PRODUCTS } = require('./src/constants');


const { createNodeFactory } = createNodeHelpers({
  typePrefix: TYPE_PREFIX,
  conflictFieldPrefix: 'platform',
});

const cleanupRequestResults = ({ data: { collections }}) => {
  const flattenEdges = ({ edges }) => edges.map(({ node }) => node);
  const decodeIds = ({ id, ...product }) => ({ ...product, id: atob(id) });
  const atob = input => Buffer.from(input || '', 'base64').toString('utf8') || null;
  const tidyShopifyProducts = ({ products, ...collection }) => ({
    ...collection,
    products: flattenEdges(products).map(decodeIds),
  });

  return flattenEdges(collections)
    .map(tidyShopifyProducts);
};

const updateCollectionData = helpers => async collections => {
  const shopifyBackpackProductsMap = helpers.getNodesByType('BackpackProduct')
    .reduce((map, { id, foreignIds }) => ({
      ...map,
      ...(foreignIds.reduce((map, shopifyId) => ({ ...map, [shopifyId]: id }), {}))
    }), {});

  const collectionsWithNewProductData = collections.map(async collection => {
    const image = await downloadImagesAndCreateFileNode(collection.image, helpers);

    const products = collection.products.reduce((products, { id, tags = [] }) => {
      const product = shopifyBackpackProductsMap[id];

      if (!product) return products;

      const colorTag = tags.find(tag => tag.toLowerCase().startsWith('color::')) || '';
      const activeColor = titleCase(colorTag.split('::')[1]);

      return [ ...products, { product, activeColor } ];
    }, []);

    const optionValues = products.reduce((optionValues, product) => {
      return deepmerge(
        optionValues,
        product.optionValues || {},
        { arrayMerge: (destination, source) => ([ ...new Set([ ...destination, ...source ]) ]) });
    }, {});

    return { ...collection, image, optionValues, products };
  });

  return await Promise.all(collectionsWithNewProductData);
};

exports.sourceNodes = async (helpers, options) => {
  const { actions: { createNode }} = helpers;
  const CollectionNode = createNodeFactory(COLLECTION);
  const updateCollectionDataWithHelpers = updateCollectionData(helpers);
  const startMessage = formatMessage('Sourcing collection data from Shopify 🛒');
  const endMessage = formatMessage('Finished sourcing collection data in');

  console.log(startMessage);
  console.time(endMessage);

  const collections = await clients.shopify(options)
    .query({ query: SHOPIFY_COLLECTIONS_QUERY })
    .then(cleanupRequestResults)
    .then(updateCollectionDataWithHelpers);

  const collectionNodes = collections.map((collection, id) => createNode(CollectionNode({ id, ...collection })));

  const statusMessage = formatMessage(`Created ${collections.length} BackpackCollection Meta and Products nodes.`);

  console.log(statusMessage);
  console.timeEnd(endMessage);

  return await Promise.all(collectionNodes);
};

exports.createSchemaCustomization = createTypes;
