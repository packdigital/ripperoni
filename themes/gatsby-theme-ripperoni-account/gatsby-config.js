/**
 * @prettier
 */
const utils = require('@packdigital/ripperoni-utilities');

module.exports = ({ metadata }) => {
  return {
    siteMetadata: {
      supportEmail: metadata.site.supportEmail || '',
    },
    plugins: [
      'gatsby-plugin-theme-ui',
      ...utils.conditionallyIncludePlugin({
        resolve: 'gatsby-plugin-create-client-paths',
        options: {
          prefixes: ['/account/*'],
        },
      }),
    ],
  };
};
