const gql = require('graphql-tag');


const CREATE_ACCESS_TOKEN_MUTATION = gql`
  mutation customerAccessTokenCreate ($input: CustomerAccessTokenCreateInput!) {
    createToken: customerAccessTokenCreate (input: $input) {
      accessToken: customerAccessToken {
        token: accessToken
        expires: expiresAt
      }
      errors: customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

module.exports = {
  create: CREATE_ACCESS_TOKEN_MUTATION,
};
