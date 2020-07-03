/**
 * [1] The `icon` option should:
 *       - be a square
 *       - at least 512x512
 *       - a .jpeg or .png
 *     You can provide this image by shadowing the file
 *     in the theme's src/gatsby-theme-ripperoni-core/assets/images/logo.png
 */
require('./gatsby/config/log-environments');

const path = require('path');

const { conditionallyIncludePlugin } = require('@packdigital/ripperoni-utilities');


module.exports = ({
  manifest: {
    enabled: manifestEnabled = true,
    title = '',
    description = '',
    color = '#252525',
    backgroundColor = '#00f7bb',
    ...manifestOptions
  } = {},
  alias: {
    root = process.cwd(),
    ...aliasOptions
  } = {},
  format: {
    money: {
      string: moneyString = '${price}',
      trimTralingZeros = false,
    },
    date: {
      string: dateString = 'mm-dd-yyyy',
    },
  }
}) => {
  const siteMetadata = {
    format: {
      money: {
        string: moneyString,
        trimTralingZeros,
      },
      date: {
        string: dateString
      },
    }
  };

  const plugins = [
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
    'gatsby-plugin-loadable-components-ssr',
    ...conditionallyIncludePlugin({
      enabled: manifestEnabled,
      theme: 'core',
      resolve: 'gatsby-plugin-manifest',
      options: manifestOptions,
      defaultOptions: {
        start_url: '/',
        display: 'minimal-ui',
        name: title,
        short_name: title,
        description: description,
        background_color: color,
        theme_color: backgroundColor,
        icon: 'src/assets/images/logo.png',  // [1]
      },
      requiredOptions: ['icon']
    }),
    ...conditionallyIncludePlugin({
      resolve: 'gatsby-plugin-root-import',
      options: aliasOptions,
      defaultOptions: {
        'src': path.join(root, 'src'),
        '@assets': path.join(root, 'src/assets'),
        '@components': path.join(root, 'src/components'),
        '@images': path.join(root, 'src/assets/images'),
        '@layouts': path.join(root, 'src/layouts'),
        '@static': path.join(root, 'static'),
        '@ripperoni/account': '@packdigital/gatsby-theme-ripperoni-account/src',
        '@ripperoni/cart': '@packdigital/gatsby-theme-ripperoni-cart/src',
        '@ripperoni/components': '@packdigital/gatsby-theme-ripperoni-components/src/components',
        '@ripperoni/hooks': '@packdigital/gatsby-theme-ripperoni-components/src/hooks',
        '@ripperoni/core': '@packdigital/gatsby-theme-ripperoni-core/src',
        '@ripperoni/debug': '@packdigital/gatsby-theme-ripperoni-debug/src',
        '@ripperoni/marketing': '@packdigital/gatsby-theme-ripperoni-marketing/src',
        '@ripperoni/search': '@packdigital/gatsby-theme-ripperoni-search/src',
        '@ripperoni/store': '@packdigital/gatsby-theme-ripperoni-store/src',
        '@ripperoni/utilities': '@packdigital/ripperoni-utilities',
      },
    }),
    'gatsby-plugin-theme-ui',
    '@lekoarts/gatsby-theme-styleguide',
  ];

  return {
    siteMetadata,
    plugins,
  };
};
