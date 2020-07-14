const gql = require('graphql-tag');


const SHOPIFY_COLLECTIONS_QUERY = gql`
  query GetShopifyCollections ($cursor: String) {
    collections (first: 250, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title
          handle
          description
          image {
            id
            src: originalSrc
          }
          products (first: 250) {
            edges {
              node {
                id
                tags
              }
            }
          }
          updatedAt
        }
      }
    }
  }
`;

const SHOPIFY_COLLECTIONS_QUERY_2 = gql`
  query GetShopifyCollections ($cursor: String) {
    collections (first: 250, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          # title
          # handle
          # description
          # image {
          #   id
          #   src: originalSrc
          # }
          # products (first: 250) {
          #   edges {
          #     node {
          #       id
          #       tags
          #     }
          #   }
          # }
          updatedAt
        }
      }
    }
  }
`;

module.exports = {
  SHOPIFY_COLLECTIONS_QUERY,
  SHOPIFY_COLLECTIONS_QUERY_2
};
