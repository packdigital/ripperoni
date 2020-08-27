const gql = require('graphql-tag');


const BULK_SHOPIFY_COLLECTIONS_QUERY = ({ sortKey, reverse }, ) => `
  collections (sortKey: ${sortKey}, reverse: ${reverse}) {
    edges {
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
        products {
          edges {
            node {
              id
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
        updatedAt
        productsCount
      }
    }
  }
`;

const BULK_OPERATION_MUTATION = gql`
  mutation bulkOperationRunQuery($query: String!) {
    bulkOperationRunQuery(query: $query) {
      bulkOperation {
        id
        status
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const BULK_OPERATION_STATUS_QUERY = gql`
  query currentBulkOperation {
    currentBulkOperation {
      id
      status
      errorCode
      createdAt
      completedAt
      objectCount
      fileSize
      url
      partialDataUrl
    }
  }
`;

const BULK_OPERATION_CANCEL_MUTATION = gql`
  mutation bulkOperationCancel($id: ID!) {
    bulkOperationCancel(id: $id) {
      bulkOperation {
        status
      }
      userErrors {
        field
        message
      }
    }
  }
`;


module.exports = {
  // actual query
  BULK_SHOPIFY_COLLECTIONS_QUERY,

  // bulk operations
  BULK_OPERATION_MUTATION,
  BULK_OPERATION_STATUS_QUERY,
  BULK_OPERATION_CANCEL_MUTATION
};
