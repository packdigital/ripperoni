const { graphql } = require('gatsby');

const IMAGE = graphql`
  fragment Image on BackpackImage {
    position
    src
    altText
    updatedAt
    localFile
    product
    variants
  }
`;

const VIDEO = graphql`
  fragment Video on BackpackVideo {
    src: String
    updatedAt
  }
`;

const PRODUCT_OPTION_VALUE = graphql`
  fragment ProductOptionValue on BackpackProductOptionValue {
    position
    title
    productOptionId
    updatedAt
    option
  }
`;

const PRODUCT_OPTION = graphql`
  fragment ProductOption on BackpackProductOption {
    position
    title
    productId
    updatedAt
    product {
      title
    }
    values {
      title
    }
  }
`;

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
      title
    }
    image {
      src
    }
    hoverImage {
      src
    }
    images {
      src
    }
    selectedOptions {
      title
    }
  }
`;

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
      id
    }
    images {
      src
    }
    options {
      title
    }
    variants {
      title
    }
  }
`;

exports.IMAGE = IMAGE;
exports.VIDEO = VIDEO;
exports.PRODUCT_OPTION_VALUE = PRODUCT_OPTION_VALUE;
exports.PRODUCT_OPTION = PRODUCT_OPTION;
exports.PRODUCT_VARIANT = PRODUCT_VARIANT;
exports.PRODUCT = PRODUCT;