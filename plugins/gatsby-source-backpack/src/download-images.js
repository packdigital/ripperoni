const { createRemoteFileNode } = require('gatsby-source-filesystem');

const { formatMessage, downloadImageAndCreateRemoteFileNode } = require('@packdigital/ripperoni-utilities');

const { PLUGIN_NAME, TYPE_PREFIX, IMAGE } = require('./constants');


exports.downloadImages = async helpers => {
  const imageNodes = helpers
    .getNodes()
    .filter(
      node => (
        node.internal.owner === PLUGIN_NAME &&
        node.internal.type === `${TYPE_PREFIX}${IMAGE}`
      )
    );

  const downloadedImages = imageNodes.map(node =>
    downloadImageAndCreateRemoteFileNode(
      node,
      helpers,
      createRemoteFileNode,
      TYPE_PREFIX
    )
  );

  const images = await Promise.all(downloadedImages)
    .then(images => images.filter(image => image));

  const message = `🎒 Downloaded ${images.length} new image files.`;
  const asFormattedMessage = formatMessage(PLUGIN_NAME, 'magenta');

  console.log(asFormattedMessage(message));

  return images;
};
