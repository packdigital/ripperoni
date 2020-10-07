const atob = require("atob");

const { _fieldResolvers } = require("./feed-item-field-resolver");

const getLegacyResourceId = (gId) => {
  const shopifyId = gId.split("/").pop();
  return shopifyId;
};
exports._buildFeedItem = ({ feedOptions, client, reporter }) => async (
  bpVariant,
  index
) => {
  const { verbose, feedItem } = feedOptions;

  try {
    // const legacyProductId = getLegacyResourceId(bpVariant.productForeignId);
    // const legacyVariantId = getLegacyResourceId(bpVariant.foreignId);
    // console.log('bpVariant.product.title', bpVariant.product.title, 'legacyProductId', legacyProductId)
    // const shopifyProduct = await client.product.get(legacyProductId)

    // if (!shopifyProduct) {
    //   reporter.panic(`Could not retrieve shopify product for handle ${bpVariant.foreignProductHandle}`)
    // }
    // if (!shopifyProduct.variants) {
    //   reporter.panic(`Fetched shopifyProduct is missing variants. shopifyProduct: ${shopifyProduct}`)
    // }

    // const shopifyVariant = shopifyProduct.variants
    //   .filter(({ id }) => id == legacyVariantId)[0];

    // if (!shopifyVariant) {
    //   reporter.warn(`
    //     Could not find a matching shopifyVariant: ${legacyVariantId} on ${shopifyProduct.title}
    //     shopifyProduct.variants:
    //   `);

    //   const shopifyVariantIds = shopifyProduct.variants.map(({id}) => id)
    //   reporter.panic(`shopifyVariantIds: ${shopifyVariantIds}`)
    // }

    // reporter.info(`Processing shopifyVariant.id ${shopifyVariant.id}`)

    // curry bpVariant, shopifyVariant, shopifyProduct and feedOptions
    const fieldResolvers = _fieldResolvers({ bpVariant, feedOptions });

    const feedItemData = feedItem.reduce((item, fieldConfig) => {
      const fieldResolver = fieldResolvers[fieldConfig.key];

      // if no getter defined for a field ignore it
      if (!fieldResolver) return item;

      const fieldValue = fieldResolver(fieldConfig);

      // if we couldnt resolve a field value we ignore it
      if (!fieldValue) return item;

      if (["options", "metadata"].includes(fieldConfig.key)) {
        // these fieldValue contain multiple subitems
        // we need to spread them as parent fields on the item
        Object.keys(fieldValue).forEach((subFieldKey) => {
          if (fieldValue[subFieldKey]) {
            const sanitizedKey = subFieldKey.replace(" ", "_").toLowerCase();
            item[sanitizedKey] = fieldValue[subFieldKey];
          }
        });
      } else {
        // 1:1 single field
        item[fieldConfig.key] = fieldValue;
      }

      return item;
    }, {});

    if (!feedItemData)
      reporter.panic(`Problem with feed Item data bpVariant: \n ${bpVariant}`);

    if (verbose) {
      reporter.info(`Added ${feedItemData.title} to the feed`);
    }

    return feedItemData;
  } catch (error) {
    reporter.panic("feedItemData ERROR", error);
  }
};
