const gql = require('graphql-tag');

const SHOPIFY_COLLECTIONS_QUERY = gql`
  query GetShopifyCollections {
    collections (first: 250) {
      edges {
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
        }
      }
    }
  }
`;

module.exports = {
  SHOPIFY_COLLECTIONS_QUERY
};
