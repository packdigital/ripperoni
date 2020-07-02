require('dotenv').config();

const siteMetadata = require('./gatsby/config/site-metadata');


const plugins = [
  {
    resolve: '@packdigital/gatsby-theme-ripperoni-core',
    options: {
      manifest: {},
      alias: {},
      format: {
        money: {
          string: '${price}',
          trimTralingZeros: false,
        },
        date: {
          string: 'mm.dd.yy',
        },
      }
    },
  },
  'gatsby-plugin-theme-ui',
  // {
  //   resolve: '@packdigital/gatsby-theme-ripperoni-netlify',
  //   options: {
  //     netlify: {}
  //   },
  // },
  {
    resolve: '@packdigital/gatsby-theme-ripperoni-account',
    options: {},
  },
  // {
  //   resolve: '@packdigital/gatsby-theme-ripperoni-backpack',
  //   options: {
  //     backpackSource: {
  //       accessToken: process.env.BACKPACK_SECRET_KEY,
  //     },
  //     backpackShopifyCollectionSource: {
  //       shopName: process.env.GATSBY_SHOPIFY_SHOP_NAME,
  //       accessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  //     }
  //   },
  // },
  // {
  //   resolve: '@packdigital/gatsby-theme-ripperoni-marketing',
  //   options: {
  //     googleTagManager: {
  //       id: process.env.GOOGLE_TAG_MANAGER_ID,
  //     },
  //     googleAnalytics: {
  //       trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
  //     },
  //     facebookPixel: {
  //       pixelId: process.env.FACEBOOK_PIXEL_ID,
  //     },
  //     robotsTxt: {},
  //     sitemap: {},
  //   },
  // },
  // {
  //   resolve: '@packdigital/gatsby-theme-ripperoni-debug',
  //   options: {
  //     webpackSize: {},
  //     bundleAnalyser: {},
  //     schemaSnapshot: {},
  //   },
  // },
  // {
  //   resolve: '@packdigital/gatsby-theme-ripperoni-cms',
  //   options: {
  //     contentful: {
  //       spaceId: process.env.CONTENTFUL_SPACE_ID,
  //       accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  //       downloadLocal: true,
  //     }
  //   },
  // },
  // {
  //   resolve: '@packdigital/gatsby-theme-ripperoni-search',
  //   options: {
  //     elasticlunr: {}
  //   },
  // },
  // {
  //   resolve: '@packdigital/gatsby-theme-ripperoni-components',
  //   options: {},
  // },
  // {
  //   resolve: '@packdigital/gatsby-theme-ripperoni-301-redirects',
  //   options: {
  //     googleSpreadsheet: {
  //       spreadsheetId: ''
  //     },
  //     redirects: {}
  //   },
  // },
  // {
  //   resolve: '@packdigital/gatsby-theme-ripperoni-store',
  //   options: {},
  // },
];

module.exports = {
  siteMetadata,
  plugins,
};
