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
      theme: 'gatsby-theme-ripperoni-backpack',
      resolve: '@packdigital/gatsby-source-backpack',
      enabled: backpackSource.enabled,
      options: backpackSource,
      requiredOptions: ['accessToken', 'backpackUri', 'shopId'],
      previewable: false,
    }),
    ...conditionallyIncludePlugin({
      theme: 'gatsby-theme-ripperoni-backpack',
      resolve: '@packdigital/gatsby-source-backpack-shopify-collection',
      enabled: backpackShopifyCollectionSource.enabled,
      options: backpackShopifyCollectionSource,
      requiredOptions: ['shopName', 'accessToken'],
      previewable: false,
    }),
  ];

  return {
    plugins,
  };
};
