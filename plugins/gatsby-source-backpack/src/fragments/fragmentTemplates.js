/* eslint-disable max-lines */
export const IMAGE_TEMPLATE = `
  position
  src
  altText
  updatedAt
  localFile {
    id
  }
`;

export const VIDEO_TEMPLATE = `
  src
  updatedAt
`;

export const PRODUCT_OPTION_VALUE_TEMPLATE = `
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

export const PRODUCT_OPTION_TEMPLATE = `
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

export const PRODUCT_VARIANT_TEMPLATE = `
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

export const PRODUCT_TEMPLATE = `
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
