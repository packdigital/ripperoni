const getProductsFeedCollectionQuery = collectionHandle => `
  query {
    productFeedCollection: backpackCollection(handle: { eq: "${collectionHandle}"}) {
      id
      handle
      title
      description
      variants {
        id
        images {
          src
        }
        metadata
        available
        price
        compareAtPrice
        selectedOptionsMap
        foreignProductHandle
        foreignId
        foreignProductPublishedAt
        updatedAt
        productForeignId
        sku
        product {
          type
          description
          title
          handle
        }
      }
    }
  }
`;


exports.getProductsFeedCollectionQuery = getProductsFeedCollectionQuery;