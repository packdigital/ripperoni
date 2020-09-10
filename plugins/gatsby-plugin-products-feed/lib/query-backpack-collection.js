const { getProductsFeedCollectionQuery } = require('./queries');


exports.queryBackpackCollection = ({ feedOptions, reporter }) => async ({ graphql }) => {

  const  { collectionHandle, exludeSoldout } = feedOptions;

  const query = getProductsFeedCollectionQuery(collectionHandle);

  const queryResult = await graphql(query);

  if (!queryResult) {
    reporter.panic(`\n
      Query for ${collectionHandle} collection is invalid. \n
      Failed to generate products feed. \n
    `);
  }

  const { data: { productFeedCollection }} = queryResult;

  // validate required plugin options
  if (!productFeedCollection) {
    reporter.panic(`\n
      ${collectionHandle} is not a valid collection handle. \n
      Failed to generate products feed. \n
    `);
  }

  if (!productFeedCollection.variants || productFeedCollection.variants.length === 0) {
    reporter.panic(`\n
      ${collectionHandle} does not have any product variants. \n
      Please choose a collection handle which has product variants. \n
      Failed to generate products feed. \n
    `);
  }

   // Have a valid collection with variants to use for the product feed
  let collectionVariants = productFeedCollection.variants;

  if (exludeSoldout) {
    // Remove sold out
    collectionVariants = excludeSoldout({ collectionVariants, reporter });

    return {
      ...productFeedCollection,
      variants: collectionVariants
    };
  }

  return productFeedCollection;
};


const excludeSoldout = ({ collectionVariants, reporter }) => {
  let allCount = collectionVariants.length;
  let available = collectionVariants.filter(({ available }) => available);
  let availableCount = available.length;
  let excludedCount = allCount - availableCount;

  if (availableCount === 0) {
    reporter.panic(`\n
      Excluding unavailable variants results in no variants to build the feed. \n
      i.e All variants on this collection are soldout \n
      Please choose a collection handle which has available product variants or remove the soldout exclusion \n
      Failed to generate products feed. \n
    `);
  } else {
    reporter.info(`
      Excluding ${excludedCount} unavailable variants from product feed. \n
      Product feed will include ${availableCount} items
    `);
  }

  return available;
};