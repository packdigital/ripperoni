/**
 * [1] Read more about plugin options here:
 *     https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-tagmanager
 *
 * [2] Read more about event tracking here:
 *     https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-tagmanager#tracking-routes
 *
 * [3] Read more about plugin options here:
 *     https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-analytics
 *
 * [4] These plugins need site.siteMetadata.siteUrl to be present in order to work. The siteUrl metadata is
 *     added through themeOptions.siteUrl. If this option is missing, we don't want these plugins to run so
 *     we make siteUrl a required option and pass it in the value of themeOption.siteUrl
 *
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
    ...conditionallyIncludePlugin({
      theme: 'gatsby-theme-ripperoni-marketing',
      resolve: 'gatsby-plugin-google-tagmanager',
      enabled: googleTagManager.enabled,
      options: googleTagManager,  // [1][2]
      requiredOptions: ['id'],
    }),
    ...conditionallyIncludePlugin({
      theme: 'gatsby-theme-ripperoni-marketing',
      resolve: 'gatsby-plugin-google-analytics',
      enabled: googleAnalytics.enabled,
      options: googleAnalytics,  // [3]
      requiredOptions: ['trackingId'],
    }),
    ...conditionallyIncludePlugin({
      theme: 'gatsby-theme-ripperoni-marketing',
      resolve: 'gatsby-plugin-facebook-pixel',
      enabled: facebookPixel.enabled,
      options: facebookPixel,
      requiredOptions: ['pixelId'],
    }),
    ...conditionallyIncludePlugin({
      theme: 'gatsby-theme-ripperoni-marketing',
      resolve: 'gatsby-plugin-sitemap',
      enabled: sitemap.enabled,
      options: sitemap,
      requiredOptions: [{ 'site.siteMetadata.siteUrl': themeOptions.siteUrl }],  // [4]
    }),
    ...conditionallyIncludePlugin({
      theme: 'gatsby-theme-ripperoni-marketing',
      resolve: 'gatsby-plugin-robots-txt',
      enabled: robotsTxt.enabled,
      options: robotsTxt,
      requiredOptions: [{ 'site.siteMetadata.siteUrl': themeOptions.siteUrl }],  // [4]
    }),
  ];

  const siteMetadata = {
    seo,
    siteUrl: themeOptions.siteUrl,
  };

  return {
    plugins,
    siteMetadata
  };
};
