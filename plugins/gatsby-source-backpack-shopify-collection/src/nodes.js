const { createNodeHelpers } = require('gatsby-node-helpers');

const {
  convertToGatsbyGraphQLId,
} = require('@packdigital/ripperoni-utilities');

const middlewares = require('./middlewares');
const { LOG_PREFIX, TYPE_PREFIX, COLLECTION, IMAGE } = require('./constants');

exports.touchUnchangedNodes = ({ unchangedNodes, helpers }) => {
  const {
    reporter,
    actions: { touchNode },
  } = helpers;
  const { format, success } = reporter;
  const collection = `${TYPE_PREFIX}${COLLECTION}`;
  const image = `${TYPE_PREFIX}${IMAGE}`;
  const unchangedImageNodes = unchangedNodes.filter((node) => node.image);
  const touchedCollections = unchangedNodes.length;
  const touchedImages = unchangedImageNodes.length;

  unchangedNodes.forEach(touchNode);
  unchangedImageNodes.forEach(touchNode);

  success(
    format`{${LOG_PREFIX}} Load {bold ${collection}} from cache - {bold ${touchedCollections} nodes}`
  );

  if (touchedImages > 0) {
    success(
      format`{${LOG_PREFIX}} Load {bold ${image}} from cache - {bold ${touchedImages} nodes}`
    );
  }
};

exports.deleteRemovedNodes = ({ removedNodes, helpers }) => {
  const { cache, getNode } = helpers;
  const { deleteNode } = helpers.actions;
  const { format, success } = helpers.reporter;
  const collection = `${TYPE_PREFIX}${COLLECTION}`;

  removedNodes.forEach((node) => {
    deleteNode(node);
    cache.set(node.id, undefined);

    if (node.image___NODE) {
      const imageNode = getNode(node.image___NODE);

      deleteNode(imageNode);
      cache.set(imageNode.id, undefined);
    }
  });

  if (removedNodes.length > 0) {
    success(
      format`{${LOG_PREFIX}} Delete {bold ${collection}} nodes - {bold ${removedNodes.length} nodes}`
    );
  }
};

exports.createCollectionNodes = async ({ collections, helpers }) => {
  const { cache, createNodeId, createContentDigest } = helpers;
  const { createNode } = helpers.actions;
  const { format, success } = helpers.reporter;

  const { createNodeFactory } = createNodeHelpers({
    typePrefix: `_${TYPE_PREFIX}`,
    createNodeId,
    createContentDigest,
  });

  const CollectionNode = createNodeFactory(COLLECTION);

  const collectionNodes = collections.map((data) => {
    const withMiddleware = middlewares.collection(data);
    const node = CollectionNode(withMiddleware);
    const id = convertToGatsbyGraphQLId(
      node._id || node.backpackId | node.id,
      COLLECTION,
      TYPE_PREFIX
    );
    createNode({ ...node, id });
    cache.set(id, { ...node, id });
    return { ...node, id };
  });

  if (collectionNodes.length > 0) {
    const createCollectionsMessage = format`{${LOG_PREFIX}} Create {bold BackpackCollection} nodes`;
    const createCollectionsResultMessage = format`{bold ${collectionNodes.length} nodes}`;
    success(`${createCollectionsMessage} - ${createCollectionsResultMessage}`);
  }
};

exports.createCollectionImageNodes = async ({ collections, helpers }) => {
  const {
    cache,
    createNodeId,
    createContentDigest,
    reporter: { format, success },
    actions: { createNode },
  } = helpers;

  const { createNodeFactory } = createNodeHelpers({
    typePrefix: `_${TYPE_PREFIX}`,
    createNodeId,
    createContentDigest,
  });

  const ImageNode = createNodeFactory(IMAGE);

  const imageNodes = collections
    .filter(({ image }) => image)
    .map((data) => {
      const withMiddleware = middlewares.image({ ...data.image, id: data.id });
      const node = ImageNode(withMiddleware);
      const id = convertToGatsbyGraphQLId(
        node._id || node.backpackId | node.id,
        IMAGE,
        TYPE_PREFIX
      );
      createNode({ ...node, id });
      cache.set(id, { ...node, id });
      return { ...node, id };
    });

  if (imageNodes.length > 0) {
    const createImagesMessage = format`{${LOG_PREFIX}} Create {bold BackpackCollectionImage} nodes`;
    const createImagesResultMessage = format`{bold ${imageNodes.length} nodes}`;

    success(`${createImagesMessage} - ${createImagesResultMessage}`);
  }
};
