"use strict";

exports.__esModule = true;
exports.PRODUCT_TEMPLATE = exports.PRODUCT_VARIANT_TEMPLATE = exports.PRODUCT_OPTION_TEMPLATE = exports.PRODUCT_OPTION_VALUE_TEMPLATE = exports.VIDEO_TEMPLATE = exports.IMAGE_TEMPLATE = void 0;

/* eslint-disable max-lines */
const IMAGE_TEMPLATE = `
  position
  src
  altText
  updatedAt
  localFile {
    id
  }
`;
exports.IMAGE_TEMPLATE = IMAGE_TEMPLATE;
const VIDEO_TEMPLATE = `
  src
  updatedAt
`;
exports.VIDEO_TEMPLATE = VIDEO_TEMPLATE;
const PRODUCT_OPTION_VALUE_TEMPLATE = `
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
`;
exports.PRODUCT_OPTION_VALUE_TEMPLATE = PRODUCT_OPTION_VALUE_TEMPLATE;
const PRODUCT_OPTION_TEMPLATE = `
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
`;
exports.PRODUCT_OPTION_TEMPLATE = PRODUCT_OPTION_TEMPLATE;
const PRODUCT_VARIANT_TEMPLATE = `
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
`;
exports.PRODUCT_VARIANT_TEMPLATE = PRODUCT_VARIANT_TEMPLATE;
const PRODUCT_TEMPLATE = `
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
`;
exports.PRODUCT_TEMPLATE = PRODUCT_TEMPLATE;