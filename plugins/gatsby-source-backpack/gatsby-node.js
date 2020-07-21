const { isShopifyGid } = require('@packdigital/ripperoni-utilities');

const { typeDefs } = require('./src/types');
const { createClient } = require('./src/client');
const { createContentNodes } = require('./src/nodes');
const { downloadImages } = require('./src/download-images');
const { LOG_PREFIX, PLUGIN_NAME } = require('./src/constants');


exports.createSchemaCustomization = ({ actions: { createTypes }}) => createTypes(typeDefs);

exports.sourceNodes = async (helpers, options) => {
  const { format, panic, activityTimer } = helpers.reporter;
  const { accessToken, shopId, backpackUri } = options;
  const timer = activityTimer(format`{${LOG_PREFIX}}`);

  if (!accessToken) {
    panic(`Please include a Backpack access token to ${PLUGIN_NAME}.`);
  }

  if (!backpackUri) {
    panic(`Please include a Backpack uri to ${PLUGIN_NAME}.`);
  }

  if (!shopId || !isShopifyGid(shopId)) {
    panic(`Please include a Shopify graphql shop id to ${PLUGIN_NAME}.`);
  }

  const client = createClient({ accessToken, backpackUri });

  timer.start();
  timer.setStatus(format`Fetching data and creating nodes`);

  await createContentNodes({ client, shopId, helpers });

  timer.setStatus('Downloading images');

  await downloadImages({ helpers });

  timer.setStatus(format`Sourced {bold Backpack} nodes from {red {bold Backpack}}`);
  timer.end();
};
