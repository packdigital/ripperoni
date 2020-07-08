const createNodeHelpers = require('gatsby-node-helpers').default;

const { formatMessage } = require('@packdigital/ripperoni-utilities');

const Queries = require('./queries');
const Middlewares = require('./middlewares');
const { TYPE_PREFIX, PLUGIN_NAME, types } = require('./constants');


const { createNodeFactory } = createNodeHelpers({
  typePrefix: TYPE_PREFIX,
  conflictFieldPrefix: 'platform',
});

const createFactories = () => {
  return types.reduce((factories, type) => {
    const middleware = Middlewares[type];
    const factory = createNodeFactory(type, middleware);

    return {
      ...factories,
      [type]: factory,
    };
  }, {});
};

const runQueries = async (client, shopId, reporter) => {
  const queryPromises = types.map(type => {
    const query = Queries[type];
    const variables = { shopId };

    if (!query) {
      reporter.warn(`No query found for type: ${type}.`);
      return;
    }

    return client.query({ query, variables })
      .then(({ data }) => ({ [type]: data.result }));
  });

  return await Promise.all(queryPromises)
    .then(queries =>
      queries
      // .filter(result => result)
      .reduce((results, result) => ({
        ...results,
        ...result,
      }), {}));
};

const getNodeData = (factories, results) => {
  return types.reduce((nodeData, type) => {
    const factory = factories[type];
    const data = results[type];

    if (!data) return nodeData;

    const nodes = data.map(item => factory(item));

    return {
      ...nodeData,
      [type]: nodes,
    };
  }, {});
};

const createNodes = (nodeData, createNode) => {
  return Object.entries(nodeData)
    .map(([type, nodes]) => {
      const message = `🎒 Created ${nodes.length} ${TYPE_PREFIX}${type} nodes.`;
      const asFormattedMessage = formatMessage(PLUGIN_NAME, 'magenta');

      console.log(asFormattedMessage(message));

      return nodes.map(node => createNode(node));
    });
};

exports.createContentNodes = async (client, shopId, helpers) => {
  try {
    const { reporter, actions: { createNode }} = helpers;
    const factories = createFactories();
    const results = await runQueries(client, shopId, reporter);
    const nodeData = getNodeData(factories, results);
    const createdNodes = createNodes(nodeData, createNode);

    await Promise.all(createdNodes);

    return nodeData;
  } catch (error) {
    console.log('error', error);
  }
};
