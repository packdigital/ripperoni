import { formatMessage } from '@packdigital/ripperoni-utilities';

import { createClient } from './client';
import { PLUGIN_NAME } from './constants';
import { createContentNodes } from './nodes';
import { downloadImages } from './download-images';

import typeDefs from './types.graphql';

exports.createSchemaCustomization = ({ actions: { createTypes }}) => {
  createTypes(typeDefs);
};

exports.sourceNodes = async (helpers, options) => {
  const { accessToken, shopId, backpackUri, apiVersion } = options;

  // If the user knows they are offline, serve them cached result
  // For prod builds though always fail if we can't get the latest data
  // if (shouldUseOfflineCache(getNodes)) return;

  try {
    const startMessage = `🎒 Sourcing data from Backpack 🎒`;
    const endMessage = `Finished in`;
    const asFormattedMessage = formatMessage(PLUGIN_NAME, 'magenta');

    console.log(asFormattedMessage(startMessage));
    console.time(asFormattedMessage(endMessage));

    // Throw an error early if the API key is missing
    // Gatsby provides an API for that, too: https://www.gatsbyjs.org/docs/node-api-helpers/#reporter
    if (!accessToken) {
      helpers.reporter.panic(`Please include an access token to ${PLUGIN_NAME}.`)
    }

    const client = createClient(accessToken, apiVersion, backpackUri);

    // query for data from the platform and create nodes
    await createContentNodes(client, shopId, helpers);

    // create remoteFileNodes from image data nodes
    return downloadImages(helpers)
      .then(() => console.timeEnd(asFormattedMessage(endMessage)));
  } catch (e) {
    helpers.reporter.panicOnBuild(`An error occurred in ${PLUGIN_NAME}.`, e)

    // If not a GraphQL request error, let Gatsby print the error.
    if (!e.hasOwnProperty(`request`)) throw e;

    return Promse.resolve();
  }
};
