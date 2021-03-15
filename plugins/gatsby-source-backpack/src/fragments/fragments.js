/* eslint-disable max-lines */
const { graphql } = require('gatsby');

export const IMAGE = graphql`
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

export const VIDEO = graphql`
  fragment Video on BackpackVideo {
    src
    updatedAt
  }
`;

export const PRODUCT_OPTION_VALUE = graphql`
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

export const PRODUCT_OPTION = graphql`
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

export const PRODUCT_VARIANT = graphql`
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
      descriptionHtml
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

export const PRODUCT = graphql`
  fragment Product on BackpackProduct {
    available
    metadata
    optionValues
    title
    handle
    description
    descriptionHtml
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
        descriptionHtml
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
