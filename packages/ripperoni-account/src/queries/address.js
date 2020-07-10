const gql = require('graphql-tag');


const ADDRESS_FRAGMENT = gql`
  fragment address on MailingAddress {
    id
    firstName
    lastName
    address1
    address2
    company
    city
    province
    provinceCode
    zip
    country
    phone
  }
`;

const ADDRESS_CREATE_MUTATION = gql`
  mutation customerAddressCreate($accessToken: String!, $address: MailingAddressInput!) {
    create: customerAddressCreate(customerAccessToken: $accessToken, address: $address) {
      address: customerAddress {
        ...address
      }
      errors: customerUserErrors {
        code
        field
        message
      }
    }
  }
  ${ADDRESS_FRAGMENT}
`;

const ADDRESS_DELETE_MUTATION = gql`
  mutation customerAddressDelete($accessToken: String!, $id: ID!) {
    delete: customerAddressDelete(id: $id, customerAccessToken: $accessToken) {
      id: deletedCustomerAddressId
      errors: customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const ADDRESS_UPDATE_MUTATION = gql`
  mutation customerAddressUpdate($accessToken: String!, $address: MailingAddressInput!, $id: ID!) {
    update: customerAddressUpdate(customerAccessToken: $accessToken, id: $id, address: $address) {
      address: customerAddress {
        ...address
      }
      errors: customerUserErrors {
        code
        field
        message
      }
    }
  }
  ${ADDRESS_FRAGMENT}
`;

const ADDRESS_SET_DEFAULT_MUTATION = gql`
  mutation customerDefaultAddressUpdate($accessToken: String!, $id: ID!) {
    default: customerDefaultAddressUpdate(customerAccessToken: $accessToken, addressId: $id) {
      customer {
        defaultAddress {
          ...address
        }
      }
      errors: customerUserErrors {
        code
        field
        message
      }
    }
  }
  ${ADDRESS_FRAGMENT}
`;

module.exports = {
  create: ADDRESS_CREATE_MUTATION,
  delete: ADDRESS_DELETE_MUTATION,
  update: ADDRESS_UPDATE_MUTATION,
  default: ADDRESS_SET_DEFAULT_MUTATION,
  fragments: {
    address: ADDRESS_FRAGMENT
  }
};
