module.exports = (api, options) => {
  api.cache(true);

  const plugins = [
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ];

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: '> 2.5%, not dead',
      },
    ],
  ];

  return {
    plugins,
    presets,
  };
};
