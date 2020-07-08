require('dotenv').config();

const { conditionallyIncludePlugin } = require('@packdigital/ripperoni-utilities');

const withDefaults = require('./gatsby/config/default-options');


module.exports = themeOptions => {
  const {
    backpackSource,
    backpackShopifyCollectionSource
  } = withDefaults(themeOptions);

  const plugins = [
    ...conditionallyIncludePlugin({
      theme: '🎒 backpack',
      resolve: '@packdigital/gatsby-source-backpack',
      enabled: backpackSource.enabled,
      options: backpackSource,
      requiredOptions: ['accessToken'],
      previewable: false,
    }),
    ...conditionallyIncludePlugin({
      theme: '🎒 backpack',
      resolve: '@packdigital/gatsby-source-backpack-shopify-collection',
      enabled: backpackShopifyCollectionSource.enabled,
      options: backpackShopifyCollectionSource,
      requiredOptions: ['shopName', 'accessToken', 'backpackAccessToken'],
      previewable: false,
    }),
  ];

  return {
    plugins,
  };
};
