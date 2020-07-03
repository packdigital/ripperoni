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


module.exports = ({
  googleTagManager: {
    enabled: googleTagManagerEnabled = true,
    ...googleTagManagerOptions
  } = {},
  googleAnalytics: {
    enabled: googleAnalyticsEnabled = true,
    ...googleAnalyticsOptions
  } = {},
  facebookPixel: {
    enabled: facebookPixelEnabled = true,
    ...facebookPixelOptions
  } = {},
  robotsTxt: {
    enabled: robotsTxtEnabled = true,
    ...robotsTxtOptions
  } = {},
  sitemap: {
    enabled: sitemapEnabled = true,
    ...sitemapOptions
  } = {}
}) => {
  const plugins = [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    ...conditionallyIncludePlugin({
      enabled: googleTagManagerEnabled,
      theme: 'marketing',
      resolve: 'gatsby-plugin-google-tagmanager',
      options: googleTagManagerOptions,  // [1][2]
      requiredOptions: ['id'],
      defaultOptions: { includeInDevelopment: false }
    }),
    ...conditionallyIncludePlugin({
      enabled: googleAnalyticsEnabled,
      theme: 'marketing',
      resolve: 'gatsby-plugin-google-analytics',
      options: googleAnalyticsOptions,  // [3]
      requiredOptions: ['trackingId'],
      defaultOptions: { head: false }
    }),
    ...conditionallyIncludePlugin({
      enabled: facebookPixelEnabled,
      theme: 'marketing',
      resolve: 'gatsby-plugin-facebook-pixel',
      options: facebookPixelOptions,
      requiredOptions: ['pixelId'],
    }),
    ...conditionallyIncludePlugin({
      enabled: robotsTxtEnabled,
      theme: 'marketing',
      resolve: 'gatsby-plugin-robots-txt',
      options: robotsTxtOptions,
      defaultOptions: {
        resolveEnv: () => {
          const isNetlify = process.env.NETLIFY === 'true';
          const isPreview = process.env.PREVIEW === 'true';
          const isProduction = process.env.NODE_ENV === 'production';

          return (isProduction && isNetlify)
            ? 'production'
            : (isPreview)
              ? 'preview'
              : 'development';
        },
        env: {
          production: {
            policy: [{ userAgent: '*' }]
          },
          preview: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          },
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          }
        }
      }
    }),
    ...conditionallyIncludePlugin({
      enabled: sitemapEnabled,
      theme: 'marketing',
      resolve: 'gatsby-plugin-sitemap',
      options: sitemapOptions,
    }),
  ];

  return {
    plugins,
  };
};
