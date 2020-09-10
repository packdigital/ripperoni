const Client = require('shopify-buy');
const Shopify = require('shopify-api-node');

const { _buildFeedItem } = require('./feed-item');

const sleep = forMs => new Promise((resolve) => setTimeout(() => resolve(true), forMs))
exports.buildFeedItems = ({feedOptions , reporter}) => variants => {
  const {  storefrontAccessToken, shopifyDomain } = feedOptions;

  // const client = new Shopify({
  //   shopName: shopifyDomain,
  //   apiKey: '679f7608807fde393521700df7b058b7',
  //   password: '248c92bad1bb20fae097e1cd45d1d7b9',
  //   autoLimit: {
  //     calls: 4, // Shopify Plus  2 for normal shopify Stores
  //     interval: 1000,
  //     bucketSize: 40
  //   }
  // });

  // client.on('callLimits', (limits) => {
  //   console.log(limits)
  //   console.log('client.callLimits', limits)
  //   if (limits) {
  //     if (limits.remaining < 10) {
  //       reporter.warn('Throttling shopify product call for 500ms...')
  //       // await sleep(100);
  //     }
  //   }
  // });


  reporter.info('Created shopify storefront client..')

  // curry feedOptions and client
  reporter.info('Building feed items...')
  try {
    const buildFeedItem = _buildFeedItem({ feedOptions, reporter });

    return Promise.all(variants.map(buildFeedItem));

  } catch (error) {
    reporter.panic('buildFeedItems:::ERROR:', error)
  }

};
