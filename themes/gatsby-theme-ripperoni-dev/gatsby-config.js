/**
 * @prettier
 */
const utils = require('@packdigital/ripperoni-utilities');

module.exports = ({ dev }) => {
  return {
    plugins: [
      ...utils.conditionallyIncludePlugin({
        resolve: 'gatsby-plugin-webpack-size',
        options: {
          development: true,
        },
        enabled: dev.webpackSize || false,
      }),
      ...utils.conditionallyIncludePlugin({
        resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
        options: {
          devMode: false,
          analyzerPort: 3000,
          production: true,
          openAnalyzer: false,
          defaultSizes: 'gzip',
          analyzerMode: 'static',
          logLevel: 'info',
        },
        enabled: dev.bundleAnalyser || false,
      }),
      ...utils.conditionallyIncludePlugin({
        resolve: 'gatsby-plugin-schema-snapshot',
        options: {},
        enabled: dev.schemaSnapshot || false,
      }),
    ],
  };
};
