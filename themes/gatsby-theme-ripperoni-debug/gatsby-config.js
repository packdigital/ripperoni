require('dotenv').config();

const { conditionallyIncludePlugin } = require('@packdigital/ripperoni-utilities');

const withDefaults = require('./gatsby/config/default-options');


module.exports = themeOptions => {
  const { webpackSize, bundleAnalyser, schemaSnapshot } = withDefaults(themeOptions);

  const plugins = [
    ...conditionallyIncludePlugin({
      theme: 'debug',
      resolve: 'gatsby-plugin-webpack-size',
      enabled: webpackSize.enabled,
      options: webpackSize,
    }),
    ...conditionallyIncludePlugin({
      theme: 'debug',
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      enabled: bundleAnalyser.enabled,
      options: bundleAnalyser,
    }),
    ...conditionallyIncludePlugin({
      theme: 'debug',
      resolve: 'gatsby-plugin-schema-snapshot',
      enabled: schemaSnapshot.enabled,
      options: schemaSnapshot,
    }),
  ];

  return {
    plugins,
  };
};
