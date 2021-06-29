const { isShopifyGid } = require('@packdigital/ripperoni-utilities');

const { typeDefs } = require('./types');
const { createClient } = require('./client');
const {
  touchUnchangedCachedData,
  queryAndCreateNewNodes,
  setupSubscriptions,
} = require('./source');
const { downloadImages } = require('./download-images');
const { LOG_PREFIX, PLUGIN_NAME } = require('./constants');

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(typeDefs);
};

exports.sourceNodes = async (helpers, options) => {
  const { format, panic, activityTimer } = helpers.reporter;
  const { accessToken, shopId, backpackUri, downloadLocal } = options;
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

  timer.start();

  timer.setStatus(format`Creating graphql client`);
  const client = createClient({ accessToken, backpackUri });

  timer.setStatus(format`Restoring cached data`);
  await touchUnchangedCachedData({ client, shopId, helpers });

  timer.setStatus(format`Fetching and creating new nodes`);
  await queryAndCreateNewNodes({ client, shopId, helpers });

  if (downloadLocal === true) {
    timer.setStatus('Downloading images');
    await downloadImages({ helpers });
  }

  timer.setStatus(
    format`Sourced {bold Backpack} nodes from {red {bold Backpack}}`
  );

  timer.end();

  return;
};

exports.onPostBootstrap = async (helpers, options) => {
  const {
    accessToken,
    shopId,
    backpackUri,
    enableSubscriptions = true,
  } = options;
  const { format, activityTimer } = helpers.reporter;
  const timer = activityTimer(format`{${LOG_PREFIX}}`);

  if (process.env.NODE_ENV !== 'production' && enableSubscriptions) {
    timer.start();

    timer.setStatus(format`Creating graphql client`);
    const client = createClient({ accessToken, backpackUri });

    timer.setStatus('Creating graphql subscriptions to {red {bold Backpack}}');
    await setupSubscriptions({ client, shopId, helpers });

    timer.setStatus(
      format`Created graphql subscriptions to {red {bold Backpack}}`
    );

    timer.end();
  }

  return;
};
