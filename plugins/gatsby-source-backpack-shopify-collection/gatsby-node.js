const { formatMessage } = require('@packdigital/ripperoni-utilities');

const { typeDefs } = require('./src/types');
const { PLUGIN_NAME, PLUGIN_COLOR } = require('./src/constants');
const { createContentNodes } = require('./src/nodes');
const { downloadImages } = require('./src/download-images');
const { fetchAndTransformShopifyData } = require('./src/fetch');


const asFormattedMessage = formatMessage(PLUGIN_NAME, PLUGIN_COLOR);

exports.createSchemaCustomization = ({ actions: { createTypes }}) => {
  createTypes(typeDefs);
};

exports.sourceNodes = async (helpers, options) => {
  const { actions: { createNode }} = helpers;
  const startMessage = '🛒 Sourcing collection data from Shopify 🛒';
  const endMessage = '🛒 Finished sourcing collection data in';

  console.log(asFormattedMessage(startMessage));
  console.time(asFormattedMessage(endMessage));

  const collections = await fetchAndTransformShopifyData(options, helpers);

  await createContentNodes(collections, helpers);

  return downloadImages(helpers)
    .then(() => console.timeEnd(asFormattedMessage(endMessage)));
};
