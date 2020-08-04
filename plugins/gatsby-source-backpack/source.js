"use strict";

const {
  convertToGatsbyGraphQLId
} = require('@packdigital/ripperoni-utilities');

const {
  diffAndUpdateNodes
} = require('./nodes');

const {
  queries,
  subscriptions
} = require('./graphql');

const {
  LOG_PREFIX,
  TYPE_PREFIX,
  TYPES
} = require('./constants');

exports.touchUnchangedCachedData = async ({
  client,
  shopId,
  helpers
}) => {
  try {
    const {
      cache,
      reporter,
      actions: {
        touchNode
      }
    } = helpers;
    const {
      format,
      success
    } = reporter;
    const query = queries.meta;
    const variables = {
      shopId,
      ciShopId: shopId
    };
    const backpackMeta = await client.query({
      query,
      variables
    });
    const touchedTypes = Object.entries(backpackMeta.data).map(async ([type, data]) => {
      let touchedNodes = 0;
      const nodes = data.map(async data => {
        const backpackId = convertToGatsbyGraphQLId(data.id, type, TYPE_PREFIX);
        const cachedNode = (await cache.get(backpackId)) || {};
        const isChanged = cachedNode.updatedAt !== data.updatedAt;

        if (!isChanged) {
          touchNode({
            nodeId: backpackId
          });
          touchedNodes++;
        }
      }); // eslint-disable-next-line no-undef

      const results = await Promise.all(nodes);

      if (touchedNodes > 0) {
        success(format`{${LOG_PREFIX}} Load {bold ${TYPE_PREFIX}${type}} from cache - {bold ${touchedNodes} nodes}`);
      }

      return results;
    }); // eslint-disable-next-line no-undef

    return await Promise.all(touchedTypes);
  } catch (error) {
    helpers.reporter.panic('Something went wrong while touching cached Backpack Nodes: ', error);
  }
};

exports.queryAndCreateNewNodes = async ({
  client,
  shopId,
  helpers
}) => {
  try {
    const {
      format,
      activityTimer
    } = helpers.reporter;
    const query = queries.newNodes;
    const variables = {
      shopId,
      ciShopId: shopId
    };
    const timer = activityTimer(format`{${LOG_PREFIX}} Fetch new node data from {red {bold Backpack}}`);
    timer.start();
    const {
      data
    } = await client.query({
      query,
      variables
    });
    timer.end();
    const result = Object.entries(data).map(([type, result]) => diffAndUpdateNodes({
      type,
      helpers
    })({
      data: {
        result
      }
    }));
    return Promise.resolve(result);
  } catch (error) {
    helpers.reporter.panic('Something went wrong while sourcing and creating new Backpack Nodes: ', error);
  }
};

exports.setupSubscriptions = async ({
  client,
  shopId,
  helpers
}) => {
  try {
    TYPES.map(type => {
      return client.subscribe({
        query: subscriptions[type],
        variables: {
          shopId
        }
      }).subscribe({
        next: diffAndUpdateNodes({
          type,
          helpers
        }),
        error: error => helpers.reporter.error('Something went wrong while recieving data from Backpack Subscription', error)
      });
    });
  } catch (error) {
    helpers.reporter.panic('Something went wrong while setting up subscriptions for Backpack Nodes: ', error);
  }
};