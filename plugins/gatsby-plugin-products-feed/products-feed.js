const { queryBackpackCollection: _queryBackpackCollection } = require('./lib/query-backpack-collection');
const { buildFeedItems: _buildFeedItems } = require('./lib/build-feed-items');
const { buildXML: _buildXML } = require('./lib/build-xml');
const { writeFeed: _writeFeed  } = require('./lib/write-feed');
const { feedOptions: _mergeOptions }  = require('./lib/options');

const productsFeed = async ({ graphql, reporter }, pluginOptions) => {
   // Merge plugin and default options
  const feedOptions = _mergeOptions({ pluginOptions, reporter });

  // Curry merged feedOptions
  const queryBackpackCollection = _queryBackpackCollection({feedOptions, reporter});
  const buildFeedItems = _buildFeedItems({feedOptions, reporter});
  const buildXML = _buildXML({feedOptions, reporter});
  const writeFeed = _writeFeed({feedOptions, reporter});

  reporter.info(`Generating product feed based on [${feedOptions.collectionHandle}] collection...`);

  const feedCollection = await queryBackpackCollection({ graphql });

  let collectionVariants = feedCollection.variants;

  const feedItems = await buildFeedItems(collectionVariants);
  reporter.info(`Generated product feed with ${collectionVariants.length} items.`);

  reporter.info('Generating XML feed...');
  const feedXML = await buildXML({ feedCollection, feedItems });
  reporter.info('Generated XML feed.');

  reporter.info('Writing XML feed...');
  await writeFeed(feedXML);
  reporter.info(`Wrote XML feed to public/${feedOptions.feedEndpoint}`);

  reporter.info(`Product feed will be available at: ${feedOptions.publicUrl}/${feedOptions.feedEndpoint}.xml`);
};

exports.productsFeed = productsFeed;