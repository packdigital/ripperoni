const uuid = require('uuid').v4;
const { createRemoteFileNode } = require('gatsby-source-filesystem');

const { TYPE_PREFIX, IMAGE } = require('./constants');

const downloadImagesAndCreateFileNode = async (node, helpers) => {
  try {
    if (!node) return node;
    if (!node.id) node.id = uuid();

    const {
      actions: { createNode, touchNode },
      createNodeId,
      store,
      cache,
      reporter,
    } = helpers;

    // const url = node.src.split('?')[0];
    const url = node.src;
    const imageDataCacheKey =  `${TYPE_PREFIX}__${IMAGE}__${url}`;
    const cacheRemoteData = await cache.get(imageDataCacheKey);

    // Avoid downloading the asset again if it's been cached
    if (cacheRemoteData) {
      touchNode({ nodeId: cacheRemoteData.fileNodeID });

      return {
        ...node,
        localFile___NODE: cacheRemoteData.fileNodeID,
      };
    }

    const fileNode = await createRemoteFileNode({
      url,
      parentNodeId: node.id,
      store,
      cache,
      createNode,
      createNodeId,
      reporter,
    });

    await cache.set(imageDataCacheKey, { fileNodeID: fileNode.id });

    if (fileNode) {
      node.localFile___NODE = fileNode.id;
    }

    return node;
  } catch (error) {
    console.log(`error`, error);
  }
};

module.exports = {
  downloadImagesAndCreateFileNode,
};
