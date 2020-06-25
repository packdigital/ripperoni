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
  siteMetadata = {},
  manifest: {
    enabled: manifestEnabled = true,
    ...manifestOptions
  } = {},
  alias: {
    root,
    ...aliasOptions
  } = {},
}) => {
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
        '@theme': path.join(root, 'node_modules/@packdigital/gatsby-theme-ripperoni-components/src'),
        '@utils': path.join(root, 'node_modules/@packdigital/ripperoni-utilities'),
      },
    }),
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
        name: siteMetadata.title || '',
        short_name: siteMetadata.title || '',
        description: siteMetadata.description,
        background_color: siteMetadata.color || '#252525',
        theme_color: siteMetadata.backgroundColor || '#00f7bb',
        icon: 'src/assets/images/logo.png',  // [1]
      },
      requiredOptions: ['icon']
    }),
  ];

  return {
    plugins,
  };
};
