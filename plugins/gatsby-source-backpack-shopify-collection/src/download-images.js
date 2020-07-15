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

  const cachedNodes = images.filter(({ type }) => type === 'TOUCH_NODE');
  const downloadedNodes = images.filter(({ __typename }) => __typename === 'Image');

  if (cachedNodes.length) {
    console.log(asFormattedMessage(`🛒 Touched ${cachedNodes.length} image files from cache.`));
  }

  if (downloadedNodes.length) {
    console.log(asFormattedMessage(`🛒 Downloaded ${downloadedNodes.length} new image files.`));
  }

  return images;
};
