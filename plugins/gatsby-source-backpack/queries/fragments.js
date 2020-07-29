"use strict";

/* eslint-disable max-lines */
const gql = require('graphql-tag');

const PRODUCT_FRAGMENT = gql`
  fragment product on products {
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
    updatedAt
  }
`;
const PRODUCT_VARIANT_FRAGMENT = gql`
  fragment productVariant on productVariants {
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
    updatedAt
  }
`;
const PRODUCT_OPTION_FRAGMENT = gql`
  fragment productOption on productOptions {
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
    updatedAt
  }
`;
const PRODUCT_OPTION_VALUE_FRAGMENT = gql`
  fragment productOptionValue on productOptionValues {
    id
    productOptionId
    position
    title
    updatedAt
  }
`;
const IMAGE_FRAGMENT = gql`
  fragment image on images {
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
      updatedAt
  }
`;
module.exports = {
  PRODUCT_FRAGMENT,
  PRODUCT_VARIANT_FRAGMENT,
  PRODUCT_OPTION_FRAGMENT,
  PRODUCT_OPTION_VALUE_FRAGMENT,
  IMAGE_FRAGMENT
};