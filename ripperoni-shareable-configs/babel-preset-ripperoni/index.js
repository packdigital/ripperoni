module.exports = (api, options) => {
  api.cache(true);

  const plugins = [
    '@babel/plugin-proposal-optional-chaining',
  ];

  const presets = [
    [
      'babel-preset-gatsby',
      {
        'targets': {
          'browsers': [
            '>0.25%',
            'not dead'
          ]
        }
      }
    ],
  ];

  return {
    plugins,
    presets,
  }
};
