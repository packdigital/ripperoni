const createNodeHelpers = require('gatsby-node-helpers').default;

const { formatMessage } = require('@packdigital/ripperoni-utilities');

const { PLUGIN_NAME, PLUGIN_COLOR, TYPE_PREFIX, COLLECTION, IMAGE } = require('./constants');
const middlewares = require('./middlewares');


const asFormattedMessage = formatMessage(PLUGIN_NAME, PLUGIN_COLOR);

const { createNodeFactory } = createNodeHelpers({
  typePrefix: TYPE_PREFIX,
  conflictFieldPrefix: 'foreign',
});

const ImageNode = createNodeFactory(IMAGE, middlewares.image);
const CollectionNode = createNodeFactory(COLLECTION, middlewares.collection);

exports.createContentNodes = async (collections, { actions: { createNode }, cache }) => {
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

  await Promise.all([...imageNodes, ...collectionNodes]);

  const collectionMessage = `🛒 Created ${collectionNodes.length} new BackpackCollection nodes.`;
  const imageMessage = `🛒 Created ${imageNodes.length} new BackpackCollectionImage nodes.`;

  console.log(asFormattedMessage(collectionMessage));
  console.log(asFormattedMessage(imageMessage));

  return collectionNodes;
};
