const { typeDefs } = require('./src/types');
const { LOG_PREFIX } = require('./src/constants');
const { createContentNodes } = require('./src/nodes');
const { downloadImages } = require('./src/download-images');
const { fetchAndTransformShopifyData } = require('./src/fetch');


exports.createSchemaCustomization = ({ actions: { createTypes }}) => {
  createTypes(typeDefs);
};

exports.sourceNodes = async (helpers, options) => {
  const { format, activityTimer } = helpers.reporter;

  const timer = activityTimer(format`{${LOG_PREFIX}}`);

  timer.start();
  timer.setStatus(format`Fetching data`);

  const collections = await fetchAndTransformShopifyData({ options, helpers });

  timer.setStatus('Creating nodes');

  await createContentNodes({ collections, helpers });

  timer.setStatus('Downloading images');

  await downloadImages({ helpers });

  timer.setStatus(format`Sourced {bold BackpackCollection} nodes from {green {bold Shopify}}`);
  timer.end();
};
