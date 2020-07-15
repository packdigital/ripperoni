const createNodeHelpers = require('gatsby-node-helpers').default;

const { formatMessage } = require('@packdigital/ripperoni-utilities');

const { PLUGIN_NAME, PLUGIN_COLOR, TYPE_PREFIX, COLLECTION } = require('./constants');


const asFormattedMessage = formatMessage(PLUGIN_NAME, PLUGIN_COLOR);

const { createNodeFactory } = createNodeHelpers({
  typePrefix: TYPE_PREFIX,
  conflictFieldPrefix: 'backpack',
});

const CollectionNode = createNodeFactory(COLLECTION);

exports.createContentNodes = async (collections, { actions: { createNode }}) => {
  const collectionNodes = collections.map((collection, id) => {
    const nodeData = CollectionNode({ id, ...collection });

    return createNode(nodeData);
  });

  await Promise.all(collectionNodes);

  const statusMessage = `Created ${collectionNodes.length} BackpackCollection nodes.`;

  console.log(asFormattedMessage(statusMessage));

  return collectionNodes;
};
