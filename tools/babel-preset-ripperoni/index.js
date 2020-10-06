module.exports = (api, options) => {
  api.cache(true);

  const plugins = [
    '@babel/plugin-proposal-optional-chaining'
  ];

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: '> 2.5%, not dead'
      }
    ]
  ];

  return {
    plugins,
    presets,
  }
};
