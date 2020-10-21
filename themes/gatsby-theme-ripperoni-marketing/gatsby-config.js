/**
 * @prettier
 */
const { trackCustomEvent } = require('gatsby-plugin-google-analytics');

const utils = require('@packdigital/ripperoni-utilities');

module.exports = ({
  metadata,
  googleTagManager,
  googleAnalytics,
  facebookPixel,
}) => {
  return {
    siteMetadata: {
      siteUrl: metadata.site.url || '',
    },
    plugins: [
      ...utils.conditionallyIncludePlugin({
        resolve: 'gatsby-plugin-google-marketing-platform',
        options: {
          includeInDevelopment: false,
          tagmanager: {
            ...googleTagManager,
          },
        },
      }),
      ...utils.conditionallyIncludePlugin({
        // [3]
        resolve: 'gatsby-plugin-google-analytics',
        options: {
          head: false,
          ...googleAnalytics,
        },
      }),
      ...utils.conditionallyIncludePlugin({
        resolve: 'gatsby-plugin-facebook-pixel',
        options: { ...facebookPixel },
      }),
      ...utils.conditionallyIncludePlugin({
        // [4]
        resolve: 'gatsby-plugin-sitemap',
        options: {},
      }),
      ...utils.conditionallyIncludePlugin({
        // [4]
        resolve: 'gatsby-plugin-robots-txt',
        options: {
          env: {
            production: {
              policy: [{ userAgent: '*' }],
            },
            development: {
              policy: [{ userAgent: '*', disallow: ['/'] }],
              sitemap: null,
              host: null,
            },
          },
        },
      }),
    ],
  };
};

/**
 * [3] Read more about plugin options here:
 *     https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-analytics
 *
 * [4] These plugins need site.siteMetadata.siteUrl to be present in order to work. The siteUrl metadata is
 *     added through themeOptions.siteUrl
 */
