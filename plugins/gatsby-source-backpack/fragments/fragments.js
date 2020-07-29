"use strict";

exports.__esModule = true;
exports.PRODUCT = exports.PRODUCT_VARIANT = exports.PRODUCT_OPTION = exports.PRODUCT_OPTION_VALUE = exports.VIDEO = exports.IMAGE = void 0;

/* eslint-disable max-lines */
const {
  graphql
} = require('gatsby');

const IMAGE = graphql`
  fragment Image on BackpackImage {
    position
    src
    altText
    updatedAt
    localFile {
      id
    }
  }
`;
exports.IMAGE = IMAGE;
const VIDEO = graphql`
  fragment Video on BackpackVideo {
    src
    updatedAt
  }
`;
exports.VIDEO = VIDEO;
const PRODUCT_OPTION_VALUE = graphql`
  fragment ProductOptionValue on BackpackProductOptionValue {
    position
    title
    productOptionId
    updatedAt
    option {
      position
      title
      productId
      updatedAt
    }
  }
`;
exports.PRODUCT_OPTION_VALUE = PRODUCT_OPTION_VALUE;
const PRODUCT_OPTION = graphql`
  fragment ProductOption on BackpackProductOption {
    position
    title
    productId
    updatedAt
    values {
      position
      title
      productOptionId
      updatedAt
      option {
        position
        title
        productId
        updatedAt
      }
    }
  }
`;
exports.PRODUCT_OPTION = PRODUCT_OPTION;
const PRODUCT_VARIANT = graphql`
  fragment ProductVariant on BackpackProductVariant {
    available
    foreignProductPublishedAt
    metadata
    selectedOptionsMap
    inventory
    price
    compareAtPrice
    position
    title
    productId
    foreignId
    productForeignId
    foreignProductHandle
    sku
    updatedAt
    product {
      available
      metadata
      optionValues
      title
      handle
      description
      type
      foreignIds
      updatedAt
      featuredImage {
        position
        src
        altText
        updatedAt
        localFile {
          id
        }
      }
      images {
        position
        src
        altText
        updatedAt
        localFile {
          id
        }
      }
      options {
        position
        title
        productId
        updatedAt
      }
    }
    image {
      position
      src
      altText
      updatedAt
      localFile {
        id
      }
    }
    hoverImage {
      position
      src
      altText
      updatedAt
      localFile {
        id
      }
    }
    images {
      position
      src
      altText
      updatedAt
      localFile {
        id
      }
    }
    selectedOptions {
      title
      productOptionId
      updatedAt
      option {
        position
        title
        productId
        updatedAt
      }
    }
  }
`;
exports.PRODUCT_VARIANT = PRODUCT_VARIANT;
const PRODUCT = graphql`
  fragment Product on BackpackProduct {
    available
    metadata
    optionValues
    title
    handle
    description
    type
    foreignIds
    updatedAt
    featuredImage {
      position
      src
      altText
      updatedAt
      localFile {
        id
      }
    }
    images {
      position
      src
      altText
      updatedAt
      localFile {
        id
      }
    }
    options {
      position
      title
      productId
      updatedAt
    }
    variants {
      available
      foreignProductPublishedAt
      metadata
      selectedOptionsMap
      inventory
      price
      compareAtPrice
      position
      title
      productId
      foreignId
      productForeignId
      foreignProductHandle
      sku
      updatedAt
      product {
        available
        metadata
        optionValues
        title
        handle
        description
        type
        foreignIds
        updatedAt
        featuredImage {
          position
          src
          altText
          updatedAt
          localFile {
            id
          }
        }
        images {
          position
          src
          altText
          updatedAt
          localFile {
            id
          }
        }
        options {
          position
          title
          productId
          updatedAt
        }
      }
      image {
        position
        src
        altText
        updatedAt
        localFile {
          id
        }
      }
      hoverImage {
        position
        src
        altText
        updatedAt
        localFile {
          id
        }
      }
      images {
        position
        src
        altText
        updatedAt
        localFile {
          id
        }
      }
      selectedOptions {
        title
        productOptionId
        updatedAt
        option {
          position
          title
          productId
          updatedAt
        }
      }
    }
  }
`;
exports.PRODUCT = PRODUCT;