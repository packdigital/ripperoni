const { conditionallyIncludePlugin } = require('@packdigital/ripperoni-utilities');

const withDefaults = require('./gatsby/config/default-options');

require('./gatsby/config/log-environments');


module.exports = themeOptions => {
  const { meta, manifest } = withDefaults(themeOptions);

  const plugins = [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-theme-ui',
    '@lekoarts/gatsby-theme-styleguide',
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
