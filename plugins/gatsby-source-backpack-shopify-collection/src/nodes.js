const createNodeHelpers = require('gatsby-node-helpers').default;

const { LOG_PREFIX, TYPE_PREFIX, COLLECTION, IMAGE } = require('./constants');
const middlewares = require('./middlewares');


const { createNodeFactory } = createNodeHelpers({ typePrefix: TYPE_PREFIX, conflictFieldPrefix: 'foreign' });
const ImageNode = createNodeFactory(IMAGE, middlewares.image);
const CollectionNode = createNodeFactory(COLLECTION, middlewares.collection);

exports.createContentNodes = async ({ collections, helpers }) => {
  const { cache, reporter, actions: { createNode }} = helpers;
  const { format, success } = reporter;

  const collectionNodes = collections.map(async collection => {
    const nodeData = CollectionNode(collection);

    await createNode(nodeData);

    return await cache.set(nodeData.id, nodeData);
  });

  const imageNodes = collections
    .filter(({ image }) => image)
    .map(async collection => {
      const collectionId = collection.id;
      const nodeData = ImageNode({ ...collection.image, collectionId });

      await createNode(nodeData);

      return await cache.set(nodeData.id, nodeData);
    });

  // eslint-disable-next-line no-undef
  await Promise.all([ ...imageNodes, ...collectionNodes ]);

  if (collectionNodes.length > 0) {
    const createCollectionsMessage = format`{${LOG_PREFIX}} Create {bold BackpackCollection} nodes`;
    const createCollectionsResultMessage = format`{bold ${collectionNodes.length} nodes}`;

    success(`${createCollectionsMessage} - ${createCollectionsResultMessage}`);
  }

  if (imageNodes.length > 0) {
    const createImagesMessage = format`{${LOG_PREFIX}} Create {bold BackpackCollectionImage} nodes`;
    const createImagesResultMessage = format`{bold ${imageNodes.length} nodes}`;

    success(`${createImagesMessage} - ${createImagesResultMessage}`);
  }

  return collectionNodes;
};
