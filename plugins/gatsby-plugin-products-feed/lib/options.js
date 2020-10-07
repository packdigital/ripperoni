const _merge = require("lodash.merge");
const _uniqBy = require("lodash.uniqby");

// @see: README for option and field options information
const defaultOptions = {
  verbose: false,
  storefrontAccessToken: null,
  shopifyDomain: null,
  publicUrl: null,
  feedEndpoint: "products-feed",
  collectionHandle: "frontpage",
  exludeSoldout: true,
  feedItem: [
    { key: "id", type: "legacyVariantId" },
    { key: "title", type: "seoTitle" },
    { key: "description", type: "seoDescription" },
    { key: "product_type" },
    { key: "link", type: "shopifyUrl" },
    { key: "image_link" },
    // { key: 'options', values: [] },
    // { key: 'metadata', values: [] },
    { key: "brand", type: "vendor" },
    { key: "condition" },
    { key: "availability" },
    { key: "price", type: "noCurrencyCode" },
    { key: "gtin", type: "barcode" },
    { key: "item_group_id", type: "legacyProductId" },
  ],
};

exports.feedOptions = ({ pluginOptions, reporter }) => {
  // validate required options
  if (!pluginOptions.storefrontAccessToken) {
    reporter.panic("You must provide a [storefrontAccessToken] option");
  }
  if (!pluginOptions.shopifyDomain) {
    reporter.panic(
      'You must provide a [shopifyDomain] option. i.e "public-rec-headless.myshopify.com"'
    );
  }
  if (!pluginOptions.publicUrl) {
    reporter.panic(
      'You must provide a [publicUrl] option. i.e "https://publicrec.com"'
    );
  }

  // Merge feedItem arrays
  const mergedFeedItems = [
    ...pluginOptions.feedItem,
    ...defaultOptions.feedItem,
  ];

  delete pluginOptions.feedItem;
  delete defaultOptions.feedItem;

  let mergedOptions = _merge(defaultOptions, pluginOptions);

  // overwrite merged feedItem
  mergedOptions.feedItem = _uniqBy(mergedFeedItems, "key");
  return mergedOptions;
};
