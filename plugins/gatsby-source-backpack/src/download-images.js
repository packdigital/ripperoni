const { createRemoteFileNode } = require('gatsby-source-filesystem');

const { downloadImageAndCreateRemoteFileNode } = require('@packdigital/ripperoni-utilities');

const { PLUGIN_NAME, TYPE_PREFIX, IMAGE } = require('./constants');


exports.downloadImages = async ({ helpers }) => {
  const { getNodes, reporter } = helpers;
  const imageNodes = getNodes()
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
    reporter.log(`🎒 Touched ${cachedNodes.length} image files from cache.`);
  }

  if (downloadedNodes.length) {
    reporter.log(`🎒 Downloaded ${downloadedNodes.length} new image files.`);
  }

  return images;
};
