const isOnline = require('is-online');

const { PLUGIN_NAME } = require('./constants');


exports.shouldUseOfflineCache = async (getNodes, touchNode) => {
  const online = await isOnline();
  const isOffline = !online;
  const useCache = process.env.GATSBY_USE_CACHE_OFFLINE === 'true';
  const isProduction = process.env.NODE_ENV === 'production';

  if (isOffline && useCache && !isProduction) {
    getNodes()
      .filter(n => n.internal.owner === PLUGIN_NAME)
      .forEach(n => touchNode({ nodeId: n.id }));

    console.log(`Using ${PLUGIN_NAME} Offline cache⚠️`);
    console.log('Cache may be invalidated if you edit package.json, gatsby-node.js or gatsby-config.js files');

    return true;
  }

  return;
};
