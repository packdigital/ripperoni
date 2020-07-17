/* eslint-disable max-lines */
const createNodeHelpers = require('gatsby-node-helpers').default;

const { convertToGatsbyGraphQLId } = require('@packdigital/ripperoni-utilities');

const queries = require('./queries');
const middleware = require('./middlewares');
const {
  LOG_PREFIX,
  TYPE_PREFIX,
  PRODUCT,
  PRODUCT_OPTION,
  PRODUCT_OPTION_VALUE,
  PRODUCT_VARIANT,
  IMAGE,
} = require('./constants');


const types = {
  [PRODUCT]: {
    query: queries.query.product,
    subscription: queries.subscription.product,
    middleware: middleware.product,
  },
  [PRODUCT_VARIANT]: {
    query: queries.query.productVariant,
    subscription: queries.subscription.productVariant,
    middleware: middleware.productVariant,
  },
  [PRODUCT_OPTION]: {
    query: queries.query.productOption,
    subscription: queries.subscription.productOption,
    middleware: middleware.productOption,
  },
  [PRODUCT_OPTION_VALUE]: {
    query: queries.query.productOptionValue,
    subscription: queries.subscription.productOptionValue,
    middleware: middleware.productOptionValue,
  },
  [IMAGE]: {
    query: queries.query.image,
    subscription: queries.subscription.image,
    middleware: middleware.image,
  },
};

const { createNodeFactory } = createNodeHelpers({ typePrefix: TYPE_PREFIX, conflictFieldPrefix: 'platform' });

const getFactory = type => {
  const { middleware, factory } = types[type];

  if (factory) return factory;

  types[type].factory = createNodeFactory(type, middleware);

  return types[type].factory;
};

const createAndCacheNode = (type, helpers) => data => {
  const { cache, actions: { createNode }} = helpers;
  const factory = getFactory(type);
  const nodeData = factory(data);

  createNode(nodeData);
  cache.set(nodeData.id, nodeData);
  return nodeData;
};

const deleteAndUncacheNode = helpers => node => {
  const { cache, actions: { deleteNode }} = helpers;
  deleteNode({ node: node });
  cache.set(node.id, undefined);
  return node;
};

const getDeletedNodes = (freshData, type, helpers) => {
  const { getNodesByType } = helpers;
  const oldNodes = getNodesByType(`${TYPE_PREFIX}${type}`);
  const freshNodeIds = freshData.map(({ id }) => convertToGatsbyGraphQLId(id, type, TYPE_PREFIX));

  return oldNodes
    .filter(oldNode => !freshNodeIds.includes(oldNode.id));
};

const getNewData = (freshData, type, helpers) => {
  const { getNodesByType } = helpers;
  const oldNodes = getNodesByType(`${TYPE_PREFIX}${type}`) || [];
  const oldNodeIds = oldNodes.map(({ id }) => id) || [];

  return freshData
    .filter(data => !oldNodeIds.includes(convertToGatsbyGraphQLId(data.id, type, TYPE_PREFIX)));
};

const getUpdatedData = (freshData, type, helpers) => {
  const { getNode } = helpers;

  return freshData
    .filter(data => {
      const backpackId = convertToGatsbyGraphQLId(data.id, type, TYPE_PREFIX);
      const oldNode = getNode(backpackId);

      return oldNode && oldNode.updatedAt < data.updatedAt;
    });
};

const diffAndUpdateNodes = ({ type, helpers }) => {
  return ({ data }) => {
    const { getNodesByType, reporter, actions: { touchNode }} = helpers;
    const { format, success } = reporter;
    const prefixedType = `${TYPE_PREFIX}${type}`;

    getNodesByType(prefixedType)
      .forEach(node => touchNode({ nodeId: node.id }));

    const newNodes = getNewData(data.result, type, helpers)
      .map(createAndCacheNode(type, helpers));

    const updatedNodes = getUpdatedData(data.result, type, helpers)
      .map(createAndCacheNode(type, helpers));

    const deletedNodes = getDeletedNodes(data.result, type, helpers)
      .map(deleteAndUncacheNode(helpers));

    if (newNodes.length > 0) {
      success(format`{${LOG_PREFIX}} Create {bold ${prefixedType}} nodes - {bold ${newNodes.length} nodes}`);
    }

    if (updatedNodes.length > 0) {
      success(format`{${LOG_PREFIX}} Updated {bold ${prefixedType}} nodes - {bold ${updatedNodes.length} nodes}`);
    }

    if (deletedNodes.length > 0) {
      success(format`{${LOG_PREFIX}} Deleted {bold ${prefixedType}} nodes - {bold ${deletedNodes.length} nodes}`);
    }
  };
};

const touchUnchangedCachedData = async ({ client, shopId, helpers }) => {
  const { cache, reporter, actions: { touchNode }} = helpers;
  const { format, success } = reporter;
  const query = queries.query.meta;
  const variables = { shopId, ciShopId: shopId };
  const backpackMeta = await client.query({ query, variables });

  const touchedTypes = Object.entries(backpackMeta.data).map(async ([type, data]) => {
    let touchedNodes = 0;

    const nodes = data.map(async data => {
      const backpackId = convertToGatsbyGraphQLId(data.id, type, TYPE_PREFIX);
      const cachedNode = await cache.get(backpackId) || {};
      const isChanged = cachedNode.updatedAt !== data.updatedAt;

      if (!isChanged) {
        touchNode({ nodeId: backpackId });
        touchedNodes++;
      }
    });

    const results = await Promise.all(nodes);

    if (touchedNodes > 0) {
      success(format`{${LOG_PREFIX}} Load {bold ${TYPE_PREFIX}${type}} from cache - {bold ${touchedNodes} nodes}`);
    }

    return results;
  });

  return await Promise.all(touchedTypes);
};

const setupSubscriptions = async ({ client, shopId, helpers }) => {
  const variables = { shopId };

  Object.entries(types).map(([type, { subscription: query }]) => {
    return client
      .subscribe({ query, variables })
      .subscribe({
        next: diffAndUpdateNodes({ type, helpers }),
        error: () => {}
      });
  });
};

const queryForNewNodes = async ({ client, shopId, helpers }) => {
  const { format, activityTimer } = helpers.reporter;
  const query = queries.query.newNodes;
  const variables = { shopId, ciShopId: shopId };
  const timer = activityTimer(format`{${LOG_PREFIX}} Fetch new node data from {red {bold Backpack}}`);

  timer.start();

  const { data } = await client.query({ query, variables });

  timer.end();

  Object.entries(data).map(([type, result]) =>
    diffAndUpdateNodes({ type, helpers })({ data: { result }}));
};

exports.createContentNodes = async ({ client, shopId, helpers }) => {
  try {
    await touchUnchangedCachedData({ client, shopId, helpers });
    await queryForNewNodes({ client, shopId, helpers });
    await setupSubscriptions({ client, shopId, helpers });

    return Promise.resolve();
  } catch (error) {
    helpers.reporter.panic('Something went wrong while creating Backpack Nodes: ', error);
  }
};
