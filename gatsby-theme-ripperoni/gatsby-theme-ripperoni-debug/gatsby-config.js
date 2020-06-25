require('dotenv').config();

const { conditionallyIncludePlugin } = require('@packdigital/ripperoni-utilities');


module.exports = ({
  webpackSize: {
    enabled: webpackSizeEnabled = process.env.ENABLE_BUNDLE_ANALYZER === 'true',
    ...webpackSizeOptions
  } = {},
  bundleAnalyser: {
    enabled: bundleAnalyserEnabled = process.env.ENABLE_BUNDLE_ANALYZER === 'true',
    ...bundleAnalyserOptions
  } = {},
  schemaSnapshot: {
    enabled: schemaSnapshotEnabled = false,
    ...schemaSnapshotOptions
  } = {},
}) => {
  const plugins = [
    ...conditionallyIncludePlugin({
      enabled: webpackSizeEnabled,
      theme: 'debug',
      resolve: 'gatsby-plugin-webpack-size',
      options: webpackSizeOptions,
      defaultOptions: { development: true }
    }),
    ...conditionallyIncludePlugin({
      enabled: bundleAnalyserEnabled,
      theme: 'debug',
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: bundleAnalyserOptions,
      defaultOptions: {
        devMode: false,
        analyzerPort: 3000,
        production: true,
        openAnalyzer: false,
        defaultSizes: 'gzip',
        analyzerMode: 'static',
        logLevel: 'info',
      }
    }),
    ...conditionallyIncludePlugin({
      enabled: schemaSnapshotEnabled,
      theme: 'debug',
      resolve: 'gatsby-plugin-schema-snapshot',
      options: schemaSnapshotOptions,
    }),
  ];

  return {
    plugins,
  };
};
