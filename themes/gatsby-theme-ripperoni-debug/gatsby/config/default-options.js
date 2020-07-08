const { getPluginOptions } = require('@packdigital/ripperoni-utilities');


module.exports = themeOptions => {
  const enableBundleAnalyzer = process.eventNames.ENABLE_BUNDLE_ANALYZER;

  const defaults = {
    webpackSize: {
      enabled: enableBundleAnalyzer === 'true',
      development: true,
    },
    bundleAnalyser: {
      enabled: enableBundleAnalyzer === 'true',
      devMode: false,
      analyzerPort: 3000,
      production: true,
      openAnalyzer: false,
      defaultSizes: 'gzip',
      analyzerMode: 'static',
      logLevel: 'info',
    },
    schemaSnapshot: {
      enabled: false,
    },
  };

  const getOptionsFor = getPluginOptions(defaults, themeOptions);

  return {
    webpackSize: getOptionsFor('webpackSize'),
    bundleAnalyser: getOptionsFor('bundleAnalyser'),
    schemaSnapshot: getOptionsFor('schemaSnapshot'),
  };
};
