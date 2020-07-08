require('./gatsby/config/log-environments');

const path = require('path');

const { conditionallyIncludePlugin } = require('@packdigital/ripperoni-utilities');

const withDefaults = require('./gatsby/config/default-options');


module.exports = themeOptions => {
  const { manifest, site, social, date, money } = withDefaults(themeOptions);

  const plugins = [
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
    // 'gatsby-plugin-loadable-components-ssr',
    'gatsby-plugin-theme-ui',
    '@lekoarts/gatsby-theme-styleguide',
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        exclude: /(node_modules|.cache|public|ripperoni-utilities)/,
        options: {
          emitWarning: true,
          failOnError: false
        }
      }
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        'src': path.join(process.cwd(), 'src'),
        '@assets': path.join(process.cwd(), 'src/assets'),
        '@components': path.join(process.cwd(), 'src/components'),
        '@images': path.join(process.cwd(), 'src/assets/images'),
        '@layouts': path.join(process.cwd(), 'src/layouts'),
        '@static': path.join(process.cwd(), 'static'),
        '@ripperoni/account/theme': '@packdigital/gatsby-theme-ripperoni-account/src/gatsby-plugin-theme-ui',
        '@ripperoni/account': '@packdigital/gatsby-theme-ripperoni-account/src',
        '@ripperoni/cart': '@packdigital/gatsby-theme-ripperoni-cart/src',
        '@ripperoni/components/theme': '@packdigital/gatsby-theme-ripperoni-components/src/gatsby-plugin-theme-ui',
        '@ripperoni/components': '@packdigital/gatsby-theme-ripperoni-components/src/components',
        '@ripperoni/core/theme': '@packdigital/gatsby-theme-ripperoni-core/src/gatsby-plugin-theme-ui',
        '@ripperoni/core': '@packdigital/gatsby-theme-ripperoni-core/src',
        '@ripperoni/debug': '@packdigital/gatsby-theme-ripperoni-debug/src',
        '@ripperoni/hooks': '@packdigital/gatsby-theme-ripperoni-components/src/hooks',
        '@ripperoni/marketing': '@packdigital/gatsby-theme-ripperoni-marketing/src',
        '@ripperoni/search': '@packdigital/gatsby-theme-ripperoni-search/src',
        '@ripperoni/store': '@packdigital/gatsby-theme-ripperoni-store/src',
        '@ripperoni/utilities': '@packdigital/ripperoni-utilities',
      },
    },
    ...conditionallyIncludePlugin({
      theme: 'core',
      resolve: 'gatsby-plugin-manifest',
      enabled: manifest.enabled,
      options: manifest,
      requiredOptions: ['icon'],
    }),
  ];

  const siteMetadata = {
    site,
    social,
    date,
    money,
  };

  return {
    plugins,
    siteMetadata,
  };
};
