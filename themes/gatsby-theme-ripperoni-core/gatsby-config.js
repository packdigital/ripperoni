const path = require('path');

const { conditionallyIncludePlugin, parseJsConfigPaths } = require('@packdigital/ripperoni-utilities');

const withDefaults = require('./gatsby/config/default-options');
// const jsconfig = require(path.join(process.cwd() + '/jsconfig.json')) || {};

require('./gatsby/config/log-environments');


module.exports = themeOptions => {
  const { meta, manifest } = withDefaults(themeOptions);

  const plugins = [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-theme-ui',
    '@lekoarts/gatsby-theme-styleguide',
    {
      resolve: 'gatsby-plugin-root-import',
      // options: parseJsConfigPaths(jsconfig) || {},
      options: {
        'src': path.join(process.cwd(), 'src'),
        '@assets': path.join(process.cwd(), 'src/assets'),
        '@components': path.join(process.cwd(), 'src/components'),
        '@context': path.join(process.cwd(), 'src/context'),
        '@hooks': path.join(process.cwd(), 'src/hooks'),
        '@images': path.join(process.cwd(), 'src/assets/images'),
        '@layouts': path.join(process.cwd(), 'src/layouts'),
        '@static': path.join(process.cwd(), 'static'),
        '@ripperoni/account/theme': '@packdigital/gatsby-theme-ripperoni-account/src/gatsby-plugin-theme-ui',
        '@ripperoni/cart/theme': '@packdigital/gatsby-theme-ripperoni-cart/src/gatsby-plugin-theme-ui',
        '@ripperoni/components/theme': '@packdigital/gatsby-theme-ripperoni-components/src/gatsby-plugin-theme-ui',
        '@ripperoni/core/theme': '@packdigital/gatsby-theme-ripperoni-core/src/gatsby-plugin-theme-ui',
        '@ripperoni/debug/theme': '@packdigital/gatsby-theme-ripperoni-debug/src/gatsby-plugin-theme-ui',
        '@ripperoni/marketing/theme': '@packdigital/gatsby-theme-ripperoni-marketing/src/gatsby-plugin-theme-ui',
        '@ripperoni/search/theme': '@packdigital/gatsby-theme-ripperoni-search/src/gatsby-plugin-theme-ui',
        '@ripperoni/store/theme': '@packdigital/gatsby-theme-ripperoni-store/src/gatsby-plugin-theme-ui',
        '@ripperoni/account': '@packdigital/gatsby-theme-ripperoni-account/src',
        '@ripperoni/bus': '@packdigital/gatsby-theme-ripperoni-bus',
        '@ripperoni/cart': '@packdigital/gatsby-theme-ripperoni-cart/src',
        '@ripperoni/cms': '@packdigital/gatsby-theme-ripperoni-cms/src',
        '@ripperoni/components/hooks': '@packdigital/gatsby-theme-ripperoni-components/src/hooks',
        '@ripperoni/components': '@packdigital/gatsby-theme-ripperoni-components/src/components',
        '@ripperoni/core': '@packdigital/gatsby-theme-ripperoni-core/src',
        '@ripperoni/debug': '@packdigital/gatsby-theme-ripperoni-debug/src',
        '@ripperoni/marketing': '@packdigital/gatsby-theme-ripperoni-marketing/src',
        '@ripperoni/search': '@packdigital/gatsby-theme-ripperoni-search/src',
        '@ripperoni/store': '@packdigital/gatsby-theme-ripperoni-store/src',
        '@ripperoni/utilities': '@packdigital/ripperoni-utilities',
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/assets/images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    ...conditionallyIncludePlugin({
      resolve: 'gatsby-plugin-manifest',
      enabled: manifest.enabled,
      options: manifest,
      requiredOptions: ['icon'],
      theme: 'gatsby-theme-ripperoni-core',
    }),
  ];

  const siteMetadata = meta;

  return {
    plugins,
    siteMetadata,
  };
};
