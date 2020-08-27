const { getClient } = require('./src/client');
const { typeDefs } = require('./src/types');
const { LOG_PREFIX, PLUGIN_NAME } = require('./src/constants');
const { sourceRecursively, sourceWithBulkOperation } = require('./src/sources');


exports.sourceNodes = async (helpers, options) => {
  const {
    shopName,
    accessToken,
    downloadLocal,
    apiVersion = '2020-04',
    fetchInBulk = false,
    excludeTerms = []
  } = options;

  const { format, panic, activityTimer } = helpers.reporter;
  const timer = activityTimer(format`{${LOG_PREFIX}}`);

  timer.start();

  timer.setStatus(format`Checking required options`);
    checkRequiredOptions({ shopName, accessToken, fetchInBulk }, { panic });

  timer.setStatus(format`Creating client`);
    const client = getClient({ shopName, accessToken, apiVersion, fetchInBulk }, { timer, format });

  if (fetchInBulk) {
    await sourceWithBulkOperation({ client, downloadLocal, excludeTerms }, { helpers, timer, format });
  } else {
    await sourceRecursively({ client, downloadLocal }, { helpers, timer, format });
  }

  timer.setStatus(format`Sourced {bold BackpackCollection} nodes from {green {bold Shopify}}`);

  timer.end();

  return;
};

exports.createSchemaCustomization = ({ getNodesByType, actions: { createTypes }}) => {
  const requiredTypes = ['BackpackProductVariant'];
  const hasRequiredTypes = requiredTypes.every(requiredType => getNodesByType(requiredType).length > 0);

  if (hasRequiredTypes) {
    createTypes(typeDefs);
  }
};


const checkRequiredOptions = (options, log) => {
  const { shopName, accessToken, fetchInBulk } = options;
  const { panic } = log;

  if (!accessToken) {
    if (fetchInBulk) {
      panic(`Please include an Shopify Admin API access token to ${PLUGIN_NAME}.`);
    } else {
      panic(`Please include an Shopify StoreFront API access token to ${PLUGIN_NAME}.`);
    }
  }

  if (!shopName) {
    panic(`Please include a Shopify shop name to ${PLUGIN_NAME}.`);
  }
};