"use strict";

const createNodeHelpers = require('gatsby-node-helpers').default;

const {
  convertToGatsbyGraphQLId
} = require('@packdigital/ripperoni-utilities');

const middlewares = require('./middlewares');

const {
  LOG_PREFIX,
  TYPE_PREFIX
} = require('./constants');

const {
  createNodeFactory
} = createNodeHelpers({
  typePrefix: TYPE_PREFIX,
  conflictFieldPrefix: 'platform'
});

const _createAndCacheNode = (type, helpers) => data => {
  const {
    cache,
    actions: {
      createNode
    }
  } = helpers;
  const middleware = middlewares[type];
  const factory = createNodeFactory(type, middleware);
  const nodeData = factory(data);
  createNode(nodeData);
  cache.set(nodeData.id, nodeData);
  return nodeData;
};

const _deleteAndUncacheNode = helpers => node => {
  const {
    cache,
    actions: {
      deleteNode
    }
  } = helpers;
  deleteNode({
    node: node
  });
  cache.set(node.id, undefined);
  return node;
};

const _getDeletedNodes = (freshData, type, helpers) => {
  const {
    getNodesByType
  } = helpers;
  const oldNodes = getNodesByType(`${TYPE_PREFIX}${type}`);
  const freshNodeIds = freshData.map(({
    id
  }) => convertToGatsbyGraphQLId(id, type, TYPE_PREFIX));
  return oldNodes.filter(oldNode => !freshNodeIds.includes(oldNode.id));
};

const _getNewData = (freshData, type, helpers) => {
  const {
    getNodesByType
  } = helpers;
  const oldNodes = getNodesByType(`${TYPE_PREFIX}${type}`) || [];
  const oldNodeIds = oldNodes.map(({
    id
  }) => id) || [];
  return freshData.filter(data => !oldNodeIds.includes(convertToGatsbyGraphQLId(data.id, type, TYPE_PREFIX)));
};

const _getUpdatedData = (freshData, type, helpers) => {
  const {
    getNode
  } = helpers;
  return freshData.filter(data => {
    const backpackId = convertToGatsbyGraphQLId(data.id, type, TYPE_PREFIX);
    const oldNode = getNode(backpackId);
    return oldNode && oldNode.updatedAt < data.updatedAt;
  });
};

exports.diffAndUpdateNodes = ({
  type,
  helpers
}) => {
  return ({
    data
  }) => {
    const {
      getNodesByType,
      reporter,
      actions: {
        touchNode
      }
    } = helpers;
    const {
      format,
      success
    } = reporter;
    const prefixedType = `${TYPE_PREFIX}${type}`;
    getNodesByType(prefixedType).forEach(node => touchNode({
      nodeId: node.id
    }));

    const newNodes = _getNewData(data.result, type, helpers).map(_createAndCacheNode(type, helpers));

    const updatedNodes = _getUpdatedData(data.result, type, helpers).map(_createAndCacheNode(type, helpers));

    const deletedNodes = _getDeletedNodes(data.result, type, helpers).map(_deleteAndUncacheNode(helpers));

    if (newNodes.length > 0) {
      success(format`{${LOG_PREFIX}} Create {bold ${prefixedType}} nodes - {bold ${newNodes.length} nodes}`);
    }

    if (updatedNodes.length > 0) {
      success(format`{${LOG_PREFIX}} Update {bold ${prefixedType}} nodes - {bold ${updatedNodes.length} nodes}`);
    }

    if (deletedNodes.length > 0) {
      success(format`{${LOG_PREFIX}} Delete {bold ${prefixedType}} nodes - {bold ${deletedNodes.length} nodes}`);
    }
  };
};