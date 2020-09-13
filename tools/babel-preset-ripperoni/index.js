module.exports = (api, options) => {
  api.cache(true);

  const plugins = [
    '@babel/plugin-proposal-optional-chaining',
  ];

  const presets = [];

  return {
    plugins,
    presets,
  }
};
