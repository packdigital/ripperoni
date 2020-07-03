require('dotenv').config();

const { conditionallyIncludePlugin } = require('@packdigital/ripperoni-utilities');


module.exports = ({
  backpackSource: {
    enabled: backpackSourceEnabled,
    ...backpackSourceOptions
  } = {},
  backpackShopifyCollectionSource: {
    enabled: backpackShopifyCollectionSourceEnabled,
    ...backpackShopifyCollectionSourceOptions
  } = {},
}) => {
  const plugins = [
    ...conditionallyIncludePlugin({
      enabled: backpackSourceEnabled,
      theme: '🎒 backpack',
      resolve: '@packdigital/gatsby-source-backpack',
      options: backpackSourceOptions,
      requiredOptions: ['accessToken'],
      defaultOptions: {
        apiVersion: 'v1',
        backpackUri: process.env.BACKPACK_URL,
      },
      previewable: false,
    }),
    ...conditionallyIncludePlugin({
      enabled: backpackShopifyCollectionSourceEnabled,
      theme: '🎒 backpack',
      resolve: '@packdigital/gatsby-source-backpack-shopify-collection',
      options: backpackShopifyCollectionSourceOptions,
      requiredOptions: [
        'shopName',
        'accessToken'
      ],
      previewable: false,
    })
  ];

  return {
    plugins,
  };
};
