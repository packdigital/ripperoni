const gql = require('graphql-tag');

const { customer } = require('./customer');


const RECOVER_PASSWORD_MUTATION = gql`
  mutation customerRecover($email: String!) {
    recover: customerRecover(email: $email) {
      errors: customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const RESET_PASSWORD_MUTATION = gql`
  mutation customerResetByUrl($resetUrl: URL!, $password: String!) {
    reset: customerResetByUrl(resetUrl: $resetUrl, password: $password) {
      customer {
        ...customer
      }
      accessToken: customerAccessToken {
        token: accessToken
        expiresAt
      }
      errors: customerUserErrors {
        code
        field
        message
      }
    }
  }
  ${customer}
`;

module.exports = {
  recover: RECOVER_PASSWORD_MUTATION,
  reset: RESET_PASSWORD_MUTATION,
};
