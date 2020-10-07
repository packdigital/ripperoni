/**
 * @prettier
 */
const utils = require('@packdigital/ripperoni-utilities');

// previewable: false,
// previewable: false,

module.exports = ({ backpack, shopify }) => {
  return {
    plugins: [
      ...utils.conditionallyIncludePlugin({
        resolve: '@packdigital/gatsby-source-backpack',
        options: {
          ...backpack,
          downloadLocal: backpack.downloadLocal,
        },
      }),
      ...utils.conditionallyIncludePlugin({
        resolve: '@packdigital/gatsby-source-backpack-shopify-collection',
        options: {
          ...shopify,
          downloadLocal: shopify.downloadLocal,
        },
      }),
    ],
  };
};
