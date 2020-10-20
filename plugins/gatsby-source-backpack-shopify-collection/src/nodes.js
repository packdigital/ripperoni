const createNodeHelpers = require('gatsby-node-helpers').default;

const { convertToGatsbyGraphQLId } = require('@packdigital/ripperoni-utilities');

const middlewares = require('./middlewares');
const { LOG_PREFIX, TYPE_PREFIX, COLLECTION, IMAGE } = require('./constants');


const { createNodeFactory } = createNodeHelpers({ typePrefix: TYPE_PREFIX, conflictFieldPrefix: 'foreign' });


exports.touchUnchangedNodes = ({ unchangedNodes, helpers }) => {
  const { reporter, actions: { touchNode }} = helpers;
  const { format, success } = reporter;
  const collection = `${TYPE_PREFIX}${COLLECTION}`;
  const image = `${TYPE_PREFIX}${IMAGE}`;
  const unchangedImageNodes = unchangedNodes.filter(node => node.image);
  const touchedCollections = unchangedNodes.length;
  const touchedImages = unchangedImageNodes.length;

  unchangedNodes.forEach(node => {
    const backpackCollectionId = convertToGatsbyGraphQLId(node.id, COLLECTION, TYPE_PREFIX);

    touchNode({ nodeId: backpackCollectionId });
  });

  unchangedImageNodes.forEach(node => {
    const backpackCollectionImageId = convertToGatsbyGraphQLId(node.image.id, IMAGE, TYPE_PREFIX);

    touchNode({ nodeId: backpackCollectionImageId });
  });

  success(format`{${LOG_PREFIX}} Load {bold ${collection}} from cache - {bold ${touchedCollections} nodes}`);

  if (touchedImages > 0) {
    success(format`{${LOG_PREFIX}} Load {bold ${image}} from cache - {bold ${touchedImages} nodes}`);
  }
};

exports.deleteRemovedNodes = ({ removedNodes, helpers }) => {
  const { cache, getNode } = helpers;
  const { deleteNode } = helpers.actions;
  const { format, success } = helpers.reporter
  const collection = `${TYPE_PREFIX}${COLLECTION}`;

  removedNodes.forEach(node => {
    deleteNode({ node: node });
    cache.set(node.id, undefined);

    if (node.image___NODE) {
      const imageNode = getNode(node.image___NODE);

      deleteNode({ node: imageNode });
      cache.set(imageNode.id, undefined);
    }
  });

  if (removedNodes.length > 0) {
    success(format`{${LOG_PREFIX}} Delete {bold ${collection}} nodes - {bold ${removedNodes.length} nodes}`);
  }
};

exports.createCollectionNodes = async ({ collections, helpers }) => {
  const { cache } = helpers;
  const { createNode } = helpers.actions;
  const { format, success } = helpers.reporter
  const CollectionNode = createNodeFactory(COLLECTION, middlewares.collection);

  const collectionNodes = collections
    .map(async collection => {
      const nodeData = CollectionNode(collection);

      await createNode(nodeData);

      return await cache.set(nodeData.id, nodeData);
    });

  // eslint-disable-next-line no-undef
  await Promise.all(collectionNodes);

  if (collectionNodes.length > 0) {
    const createCollectionsMessage = format`{${LOG_PREFIX}} Create {bold BackpackCollection} nodes`;
    const createCollectionsResultMessage = format`{bold ${collectionNodes.length} nodes}`;

    success(`${createCollectionsMessage} - ${createCollectionsResultMessage}`);
  }
};

exports.createCollectionImageNodes = async ({ collections, helpers }) => {
  const { cache, reporter: { format, success }, actions: { createNode }} = helpers;
  const ImageNode = createNodeFactory(IMAGE, middlewares.image);

  const imageNodes = collections
    .filter(({ image }) => image)
    .map(async collection => {
      const collectionId = collection.id;
      const nodeData = ImageNode({ ...collection.image, collectionId });

      await createNode(nodeData);

      return await cache.set(nodeData.id, nodeData);
    });

  // eslint-disable-next-line no-undef
  await Promise.all(imageNodes);

  if (imageNodes.length > 0) {
    const createImagesMessage = format`{${LOG_PREFIX}} Create {bold BackpackCollectionImage} nodes`;
    const createImagesResultMessage = format`{bold ${imageNodes.length} nodes}`;

    success(`${createImagesMessage} - ${createImagesResultMessage}`);
  }
};
