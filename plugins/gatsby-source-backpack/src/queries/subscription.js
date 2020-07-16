const gql = require('graphql-tag');

const {
  PRODUCT_FRAGMENT,
  PRODUCT_VARIANT_FRAGMENT,
  PRODUCT_OPTION_FRAGMENT,
  PRODUCT_OPTION_VALUE_FRAGMENT,
  IMAGE_FRAGMENT,
} = require('./fragments');

/**
 *
 * When adding a new query, make sure you alias the root field of the result to `data`
 *
 * e.g. result: products
 *      result: productOptionValues
 *
*/
const PRODUCTS_SUBSCRIPTION = gql`
  subscription ProductsSubscription ($shopId: String) {
    result: products (
      where: {
        shop: {shopifyAccount: {id: {_eq: $shopId}}},
        variants: {foreignProductPublishedAt: {_is_null: false}},
      }
    ) {
      ...product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const PRODUCT_VARIANTS_SUBSCRIPTION = gql`
  subscription ProductVariantsSubscription ($shopId: String) {
    result: productVariants (
      order_by: {id: asc},
      where: {
        shop: {shopifyAccount: {id: {_eq: $shopId}}},
        foreignProductPublishedAt: {_is_null: false}
      }
    ) {
      ...productVariant
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_OPTIONS_SUBSCRIPTION = gql`
  subscription ProductOptionsSubscription ($shopId: String) {
    result: productOptions (
      order_by: {id: asc},
      where: {
        shop: {shopifyAccount: {id: {_eq: $shopId}}}
        product: {variants: {foreignProductPublishedAt: {_is_null: false}}}
      }
    ) {
      ...productOption
    }
  }
  ${PRODUCT_OPTION_FRAGMENT}
`;

const PRODUCT_OPTION_VALUES_SUBSCRIPTION = gql`
  subscription ProductOptionValuesSubscription ($shopId: citext) {
    result: productOptionValues (
      order_by: {id: asc},
      where: {
        title: {_neq: $shopId},
        variantOptionValues: {variant: {foreignProductPublishedAt: {_is_null: false}}},
      }
    ) {
      ...productOptionValue
    }
  }
  ${PRODUCT_OPTION_VALUE_FRAGMENT}
`;

const IMAGES_SUBSCRIPTION = gql`
  subscription ImagesSubscription ($shopId: String) {
    result: images (
      order_by: {id: asc},
      where: {
        shop: {shopifyAccount: {id: {_eq: $shopId}}},
        _or: [
          {joinProductImages: {product: {variants: {foreignProductPublishedAt: {_is_null: false}}}}},
          {joinVariantImages: {productVariant: {foreignProductPublishedAt: {_is_null: false}}}}
        ]
      }
    ) {
      ...image
    }
  }
  ${IMAGE_FRAGMENT}
`;

module.exports = {
  product: PRODUCTS_SUBSCRIPTION,
  productVariant: PRODUCT_VARIANTS_SUBSCRIPTION,
  productOption: PRODUCT_OPTIONS_SUBSCRIPTION,
  productOptionValue: PRODUCT_OPTION_VALUES_SUBSCRIPTION,
  image: IMAGES_SUBSCRIPTION,
};
