const path = require('path');
const pathToInlineSvg = path.resolve(__dirname, '../src/assets/images');

module.exports = ({config}) => {
  // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];

  // / use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve("babel-loader");
  // Extend defaultConfig as you need.
  config.resolve.alias = {
    '@src': path.resolve(__dirname, '..', 'src'),
    '@assets': path.resolve(__dirname, '..', 'src/assets'),
    '@components': path.resolve(__dirname, '..', 'src/components'),
    '@hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '@ui': path.resolve(__dirname, '..', 'src/ui'),
    '@utility': path.resolve(__dirname, '..', 'src/utility'),
  };

  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve("@babel/preset-react"),
    require.resolve("@babel/preset-env"),
  ];

  config.module.rules[0].use[0].options.plugins = [
    // use @babel/plugin-proposal-class-properties for class arrow functions
    require.resolve("@babel/plugin-proposal-class-properties"),
    // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    require.resolve("babel-plugin-remove-graphql-queries"),
  ];

  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  config.resolve.mainFields = ["browser", "module", "main"];

  /**
   * SVG loader support
   */
  const rules = config.module.rules;
  // modify storybook's file-loader rule to avoid conflicts with svgr
  const fileLoaderRule = rules.find(rule => rule.test.test('.svg'));
  fileLoaderRule.exclude = pathToInlineSvg;

  rules.push({
    test: /\.svg$/,
    include: pathToInlineSvg,
    use: [{
      loader: '@svgr/webpack',
      options: {
        icon: true,
      },
    }],
  });

  return config;

};