const { createNodeHelpers } = require('gatsby-node-helpers');

const {
  convertToGatsbyGraphQLId,
} = require('@packdigital/ripperoni-utilities');

const middlewares = require('./middlewares');
const { LOG_PREFIX, TYPE_PREFIX } = require('./constants');

const _createAndCacheNode = (type, helpers) => {
  const middleware = middlewares[type];

  const {
    cache,
    createNodeId,
    createContentDigest,
    actions: { createNode },
  } = helpers;

  const { createNodeFactory } = createNodeHelpers({
    typePrefix: `_${TYPE_PREFIX}`,
    createNodeId,
    createContentDigest,
  });

  const Node = createNodeFactory(type);

  return (data) => {
    const withMiddleware = middleware(data);
    const node = Node(withMiddleware);
    const id = convertToGatsbyGraphQLId(
      node._id || node.backpackId,
      type,
      TYPE_PREFIX
    );

    createNode({ ...node, id });
    cache.set(id, { ...node, id });
    return { ...node, id };
  };
};

const _deleteAndUncacheNode = (helpers) => (node) => {
  const {
    cache,
    actions: { deleteNode },
  } = helpers;
  deleteNode(node);
  cache.set(node.id, undefined);
  return node;
};

const _getRemovedData = (freshData, type, helpers) => {
  const { getNodesByType } = helpers;
  const oldNodes = getNodesByType(`${TYPE_PREFIX}${type}`);
  const freshNodeIds = freshData.map(({ id }) => {
    return convertToGatsbyGraphQLId(id, type, TYPE_PREFIX);
  });
  return oldNodes.filter((oldNode) => !freshNodeIds.includes(oldNode.id));
};

const _getNewData = (freshData, type, helpers) => {
  const { getNodesByType } = helpers;
  const oldNodes = getNodesByType(`${TYPE_PREFIX}${type}`) || [];
  const oldNodeIds = oldNodes.map(({ id }) => id) || [];

  return freshData.filter((data) => {
    const nodeId = convertToGatsbyGraphQLId(data.id, type, TYPE_PREFIX);
    return !oldNodeIds.includes(nodeId);
  });
};

const _getUpdatedData = (freshData, type, helpers) => {
  const { getNode } = helpers;
  return freshData.filter((data) => {
    const backpackId = convertToGatsbyGraphQLId(data.id, type, TYPE_PREFIX);
    const oldNode = getNode(backpackId);
    return oldNode && oldNode.updatedAt < data.updatedAt;
  });
};

exports.diffAndUpdateNodes = ({ type, helpers }) => {
  return ({ data: { result } }) => {
    const {
      reporter,
      getNodesByType,
      actions: { touchNode },
    } = helpers;

    const { format, success } = reporter;
    const prefixedType = `${TYPE_PREFIX}${type}`;

    const createOrUpdateNode = _createAndCacheNode(type, helpers);
    const deleteNode = _deleteAndUncacheNode(helpers);

    const newData = _getNewData(result, type, helpers);
    const updatedData = _getUpdatedData(result, type, helpers);
    const removedData = _getRemovedData(result, type, helpers);

    // touch nodes
    getNodesByType(prefixedType).forEach(touchNode);

    // create new nodes
    const newNodes = newData.map(createOrUpdateNode);

    // update changed nodes
    const updatedNodes = updatedData.map(createOrUpdateNode);

    // delete removed nodes
    const deletedNodes = removedData.map(deleteNode);

    if (newNodes.length > 0) {
      success(
        format`{${LOG_PREFIX}} Create {bold ${prefixedType}} nodes - {bold ${newNodes.length} nodes}`
      );
    }

    if (updatedNodes.length > 0) {
      success(
        format`{${LOG_PREFIX}} Update {bold ${prefixedType}} nodes - {bold ${updatedNodes.length} nodes}`
      );
    }

    if (deletedNodes.length > 0) {
      success(
        format`{${LOG_PREFIX}} Delete {bold ${prefixedType}} nodes - {bold ${deletedNodes.length} nodes}`
      );
    }
  };
};
