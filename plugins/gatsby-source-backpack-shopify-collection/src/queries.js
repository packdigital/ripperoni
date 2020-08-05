const gql = require('graphql-tag');


const SHOPIFY_COLLECTIONS_UPDATED_AT_QUERY = gql`
  query GetShopifyCollectionsUpdatedAt ($cursor: String) {
    results: collections (first: 250, after: $cursor, sortKey: UPDATED_AT, reverse: true) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          image {
            id
          }
          updatedAt
        }
      }
    }
  }
`;


const SHOPIFY_COLLECTIONS_QUERY = gql`
  query GetShopifyCollections ($cursor: String, $query: String) {
    results: collections (first: 250, after: $cursor, query: $query) {
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
            src: transformedSrc (preferredContentType: WEBP)
            altText
          }
          products (first: 250) {
            pageInfo {
              hasNextPage
            }
            edges {
              cursor
              node {
                variants (first: 1){
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
            }
          }
          updatedAt
        }
      }
    }
  }
`;


const SHOPIFY_COLLECTION_PRODUCTS_QUERY = gql`
  query GetShopifyCollectionsUpdatedAt ($handle: String!, $cursor: String!) {
    results: collectionByHandle (handle: $handle) {
      products (first: 250, after: $cursor) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            variants (first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

module.exports = {
  SHOPIFY_COLLECTIONS_QUERY,
  SHOPIFY_COLLECTIONS_UPDATED_AT_QUERY,
  SHOPIFY_COLLECTION_PRODUCTS_QUERY,
};
