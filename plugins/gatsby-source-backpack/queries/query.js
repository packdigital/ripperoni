"use strict";

/* eslint-disable max-lines */
const gql = require('graphql-tag');

const {
  PRODUCT_FRAGMENT,
  PRODUCT_VARIANT_FRAGMENT,
  PRODUCT_OPTION_FRAGMENT,
  PRODUCT_OPTION_VALUE_FRAGMENT,
  IMAGE_FRAGMENT
} = require('./fragments');

const META_QUERY = gql`
  query GetMeta ($shopId: String, $ciShopId: citext) {
    Product: products (where: {
      shop: {shopifyAccount: {id: {_eq: $shopId}}},
      variants: {foreignProductPublishedAt: {_is_null: false}},
    }) {
      id
      updatedAt
    }
    ProductVariant: productVariants (order_by: {id: asc}, where: {
      shop: {shopifyAccount: {id: {_eq: $shopId}}},
      foreignProductPublishedAt: {_is_null: false}
    }) {
      id
      updatedAt
    }
    ProductOption: productOptions (order_by: {id: asc}, where: {
      shop: {shopifyAccount: {id: {_eq: $shopId}}}
      product: {variants: {foreignProductPublishedAt: {_is_null: false}}}
    }) {
      id
      updatedAt
    }
    ProductOptionValue: productOptionValues (order_by: {id: asc}, where: {
      title: {_neq: $ciShopId},
      variantOptionValues: {variant: {foreignProductPublishedAt: {_is_null: false}}},
    }) {
      id
      updatedAt
    }
    Image: images (order_by: {id: asc}, where: {
      shop: {shopifyAccount: {id: {_eq: $shopId}}},
      _or: [
        {joinProductImages: {product: {variants: {foreignProductPublishedAt: {_is_null: false}}}}},
        {joinVariantImages: {productVariant: {foreignProductPublishedAt: {_is_null: false}}}}
      ]
    }) {
      id
      updatedAt
    }
  }
`;
/**
 * When adding a new query, make sure you alias the root field of the result to `data`
 *
 * e.g. result: products
 *      result: productOptionValues
*/

const NEW_NODES_QUERY = gql`
  query ProductsSubscription ($shopId: String, $ciShopId: citext) {
    Product: products (
      where: {
        shop: {shopifyAccount: {id: {_eq: $shopId}}},
        variants: {foreignProductPublishedAt: {_is_null: false}},
      }
    ) {
      ...product
    }
    ProductVariant: productVariants (
      order_by: {id: asc},
      where: {
        shop: {shopifyAccount: {id: {_eq: $shopId}}},
        foreignProductPublishedAt: {_is_null: false}
      }
    ) {
      ...productVariant
    }
    ProductOption: productOptions (
      order_by: {id: asc},
      where: {
        shop: {shopifyAccount: {id: {_eq: $shopId}}}
        product: {variants: {foreignProductPublishedAt: {_is_null: false}}}
      }
    ) {
      ...productOption
    }
    ProductOptionValue: productOptionValues (
      order_by: {id: asc},
      where: {
        title: {_neq: $ciShopId},
        variantOptionValues: {variant: {foreignProductPublishedAt: {_is_null: false}}},
      }
    ) {
      ...productOptionValue
    }
    Image: images (
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
  ${PRODUCT_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${PRODUCT_OPTION_FRAGMENT}
  ${PRODUCT_OPTION_VALUE_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;
module.exports = {
  meta: META_QUERY,
  newNodes: NEW_NODES_QUERY
};