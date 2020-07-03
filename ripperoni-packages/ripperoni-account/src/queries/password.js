const gql = require('graphql-tag');


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
`;

module.exports = {
  recover: RECOVER_PASSWORD_MUTATION,
  reset: RESET_PASSWORD_MUTATION,
};
