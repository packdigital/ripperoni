const { clients } = require('./src/client');
const { typeDefs } = require('./src/types');
const { downloadImages } = require('./src/download-images');
const { LOG_PREFIX, PLUGIN_NAME } = require('./src/constants');
const { fetchFreshCollectionData, sortUnchangedRemovedAndStaleNodes } = require('./src/fetch');
const { touchUnchangedNodes, deleteRemovedNodes, createCollectionNodes, createCollectionImageNodes } = require('./src/nodes');


exports.sourceNodes = async (helpers, options) => {
  const { shopName, accessToken, downloadLocal } = options;
  const { format, panic, activityTimer } = helpers.reporter;
  const timer = activityTimer(format`{${LOG_PREFIX}}`);

  if (!accessToken) {
    panic(`Please include an Shopify storefront access token to ${PLUGIN_NAME}.`);
  }

  if (!shopName) {
    panic(`Please include a Shopify shop name to ${PLUGIN_NAME}.`);
  }

  timer.start();

  timer.setStatus(format`Creating graphql client`);
    const client = clients.shopify({ shopName, accessToken });

  timer.setStatus(format`Fetching unchanged, removed, and stale nodes`);
    const { unchangedNodes, removedNodes, staleNodes } = await sortUnchangedRemovedAndStaleNodes({ client, helpers });

  if (unchangedNodes.length > 0) {
    timer.setStatus(format`Loading unchanged nodes from cache`);
      touchUnchangedNodes({ unchangedNodes, helpers });
  }

  if (removedNodes.length > 0) {
    timer.setStatus(format`Deleting removed nodes`);
      deleteRemovedNodes({ removedNodes, helpers });
  }

  if (staleNodes.length > 0) {
    timer.setStatus(format`Fetching fresh colleciton data`);
      const collections = await fetchFreshCollectionData({ staleNodes, client, helpers });

    timer.setStatus('Creating collection nodes');
      await createCollectionNodes({ collections, helpers });

    timer.setStatus('Creating collection image nodes');
      await createCollectionImageNodes({ collections, helpers });

    if (downloadLocal === true) {
      timer.setStatus('Downloading images');
        await downloadImages({ helpers });
    }
  }

  timer.setStatus(format`Sourced {bold BackpackCollection} nodes from {green {bold Shopify}}`);

  timer.end();

  return;
};

exports.createSchemaCustomization = ({ getNodesByType, actions: { createTypes }}) => {
  const requiredTypes = ['BackpackProductVariant'];
  const hasRequiredTypes = requiredTypes.every(requiredType => getNodesByType(requiredType).length > 0);

  if (hasRequiredTypes) {
    createTypes(typeDefs);
  }
};
