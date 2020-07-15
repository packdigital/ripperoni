const { createRemoteFileNode } = require('gatsby-source-filesystem');

const { formatMessage, downloadImageAndCreateRemoteFileNode } = require('@packdigital/ripperoni-utilities');

const { PLUGIN_NAME, PLUGIN_COLOR, TYPE_PREFIX, IMAGE } = require('./constants');


const asFormattedMessage = formatMessage(PLUGIN_NAME, PLUGIN_COLOR);

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

  const message = `🛒 Downloaded ${images.length} new image files.`;

  console.log(asFormattedMessage(message));

  return images;
};
