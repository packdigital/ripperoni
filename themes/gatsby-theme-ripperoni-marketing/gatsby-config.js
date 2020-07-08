/**
* [1] Read more about plugin options here:
*     https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-tagmanager
*
* [2] Read more about event tracking here:
*     https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-tagmanager#tracking-routes
*
* [3] Read more about plugin options here:
*     https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-analytics
*/
require('dotenv').config();

const { conditionallyIncludePlugin } = require('@packdigital/ripperoni-utilities');

const withDefaults = require('./gatsby/config/default-options');


module.exports = themeOptions => {
  const {
    googleTagManager,
    googleAnalytics,
    facebookPixel,
    robotsTxt,
    sitemap,
    seo,
  } = withDefaults(themeOptions);

  const plugins = [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    ...conditionallyIncludePlugin({
      theme: 'marketing',
      resolve: 'gatsby-plugin-google-tagmanager',
      enabled: googleTagManager.enabled,
      options: googleTagManager,  // [1][2]
      requiredOptions: ['id'],
    }),
    ...conditionallyIncludePlugin({
      theme: 'marketing',
      resolve: 'gatsby-plugin-google-analytics',
      enabled: googleAnalytics.enabled,
      options: googleAnalytics,  // [3]
      requiredOptions: ['trackingId'],
    }),
    ...conditionallyIncludePlugin({
      theme: 'marketing',
      resolve: 'gatsby-plugin-facebook-pixel',
      enabled: facebookPixel.enabled,
      options: facebookPixel,
      requiredOptions: ['pixelId'],
    }),
    ...conditionallyIncludePlugin({
      theme: 'marketing',
      resolve: 'gatsby-plugin-robots-txt',
      enabled: robotsTxt.enabled,
      options: robotsTxt,
    }),
    ...conditionallyIncludePlugin({
      theme: 'marketing',
      resolve: 'gatsby-plugin-sitemap',
      enabled: sitemap.enabled,
      options: sitemap,
    }),
  ];

  const siteMetadata = {
    seo,
  };

  return {
    plugins,
    siteMetadata
  };
};
