const { formatMessage } = require('@packdigital/ripperoni-utilities');

const { typeDefs } = require('./src/types');
const { createClient } = require('./src/client');
const { createContentNodes } = require('./src/nodes');
const { downloadImages } = require('./src/download-images');
const { PLUGIN_NAME, PLUGIN_COLOR } = require('./src/constants');


exports.createSchemaCustomization = ({ actions: { createTypes }}) => {
  createTypes(typeDefs);
};

exports.sourceNodes = async (helpers, options) => {
  const { reporter } = helpers;
  const { accessToken, shopId, backpackUri } = options;
  const asFormattedMessage = formatMessage(PLUGIN_NAME, PLUGIN_COLOR);

  helpers.reporter._log = message => console.log(asFormattedMessage(message));

  // If the user knows they are offline, serve them cached result
  // For prod builds though always fail if we can't get the latest data
  // if (shouldUseOfflineCache(helpers.getNodes, helpers.touchNode)) return;

  try {
    reporter._log('🎒 Sourcing product data from Backpack 🎒');
    const endMessage = '🎒 Finished in';

    console.time(asFormattedMessage(endMessage));

    // Throw an error early if the API key is missing
    // Gatsby provides an API for that, too: https://www.gatsbyjs.org/docs/node-api-helpers/#reporter
    if (!accessToken || !backpackUri) {
      reporter.panic(`Please include an access token to ${PLUGIN_NAME}.`);
    }

    const client = createClient({ accessToken, backpackUri });

    // setup graphql subscriptions for create, update, or deleting nodes in realtime
    await createContentNodes({ client, shopId, helpers });

    // create remoteFileNodes from image data nodes
    return downloadImages({ helpers })
      .then(() => console.timeEnd(asFormattedMessage(endMessage)));
  } catch (e) {
    reporter.panicOnBuild(`An error occurred in ${PLUGIN_NAME}.`, e);

    // If not a GraphQL request error, let Gatsby print the error.
    if (!e.hasOwnProperty('request')) throw e;

    return Promise.resolve();
  }
};
