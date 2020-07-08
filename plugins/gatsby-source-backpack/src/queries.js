/* eslint-disable max-lines */
const gql = require('graphql-tag');

const {
  PRODUCT,
  PRODUCT_VARIANT,
  PRODUCT_OPTION,
  PRODUCT_OPTION_VALUE,
  IMAGE,
} = require('./constants');

/**
 *
 * When adding a new query, make sure you alias the root field of the result to `data`
 *
 * e.g. result: products
 *      result: productOptionValues
 *
*/
const PRODUCTS_QUERY = gql`
  query GetProducts ($shopId: String) {
    result: products (
      where: {
        shop: {shopifyAccount: {id: {_eq: $shopId}}},
        variants: {foreignProductPublishedAt: {_is_null: false}},
      }
    ) {
      id
      title
      handle
      description
      available
      metadata
      type
      images (order_by: {position: asc}) {
        id
        position
      }
      options (
        order_by: {position: asc},
        where: {product: {variants: {foreignProductPublishedAt: {_is_null: false}}}},
      ) {
        id
        title
        values (
          order_by: {position: asc},
          where: {variantOptionValues: {variant: {foreignProductPublishedAt: {_is_null: false}}}},
        ) {
          id
          title
        }
      }
      variants (
        order_by: {position: asc},
        where: {foreignProductPublishedAt: {_is_null: false}},
      ) {
        id
        selectedOptions (order_by: {optionPosition: asc}) {
          id
          title
          value
        }
        images (order_by: {position: asc}) {
          id
          foreignId
          productVariantId
          position
        }
      }
      foreignIds: variants(distinct_on: productForeignId) {
        id: productForeignId
      }
    }
  }
`;

const PRODUCT_VARIANTS_QUERY = gql`
  query GetProductVariants ($shopId: String) {
    result: productVariants (
      order_by: {id: asc},
      where: {
        shop: {shopifyAccount: {id: {_eq: $shopId}}},
        foreignProductPublishedAt: {_is_null: false}
      }
    ) {
      id
      foreignId
      productId
      productForeignId
      foreignProductHandle
      foreignProductPublishedAt
      available
      inventory
      price
      compareAtPrice
      metadata
      sku
      images (order_by: {position: asc}) {
        id
        position
      }
      selectedOptions (order_by: {optionPosition: asc}) {
        id
        title
        value
      }
    }
  }
`;

const PRODUCT_OPTIONS_QUERY = gql`
  query GetProductOptions ($shopId: String) {
    result: productOptions (
      order_by: {id: asc},
      where: {
        shop: {shopifyAccount: {id: {_eq: $shopId}}}
        product: {variants: {foreignProductPublishedAt: {_is_null: false}}}
      }
    ) {
      id
      productId
      position
      title
      values (
        order_by: {position: asc},
        where: {variantOptionValues: {variant: {foreignProductPublishedAt: {_is_null: false}}}}
      ) {
        id
        title
        position
      }
    }
  }
`;

const PRODUCT_OPTION_VALUES_QUERY = gql`
  query GetProductOptionValues ($shopId: citext) {
    result: productOptionValues (
      order_by: {id: asc},
      where: {
        title: {_neq: $shopId},
        variantOptionValues: {variant: {foreignProductPublishedAt: {_is_null: false}}},
      }
    ) {
      id
      productOptionId
      position
      title
    }
  }
`;

const IMAGES_QUERY = gql`
  query GetImages ($shopId: String) {
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
      id
      src
      altText
      product {
        id: productId
        position
      }
      variants: joinVariantImages {
        id: productVariantId
        variant: productVariant {
          id
          productId
          images (order_by: {position: asc}) {
            id
            position
          }
        }
      }
    }
  }
`;

module.exports = {
  PRODUCTS_QUERY,
  PRODUCT_VARIANTS_QUERY,
  PRODUCT_OPTIONS_QUERY,
  PRODUCT_OPTION_VALUES_QUERY,
  IMAGES_QUERY,
  [PRODUCT]: PRODUCTS_QUERY,
  [PRODUCT_VARIANT]: PRODUCT_VARIANTS_QUERY,
  [PRODUCT_OPTION]: PRODUCT_OPTIONS_QUERY,
  [PRODUCT_OPTION_VALUE]: PRODUCT_OPTION_VALUES_QUERY,
  [IMAGE]: IMAGES_QUERY,
};
