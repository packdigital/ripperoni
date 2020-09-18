const gql = require('graphql-tag');

const address = require('./address');


const CUSTOMER_FRAGMENT = gql`
  fragment customer on Customer {
    id
    firstName
    lastName
    acceptsMarketing
    email
    tags
    defaultAddress { ...address }
    addresses (first: 100) {
      edges {
        node {
          ...address
        }
      }
    }
    orders (first: 100) {
      edges {
        node {
          id
          name
          orderNumber
          statusUrl
          currencyCode
          date: processedAt
          status: financialStatus
          totalTax: totalTaxV2 { amount }
          totalPrice: totalPriceV2 { amount }
          subtotalPrice: subtotalPriceV2 { amount }
          shippingPrice: totalShippingPriceV2 { amount }
          shippingAddress { ...address }
          fulfillments: successfulFulfillments(first: 100) {
            company: trackingCompany
            tracking: trackingInfo (first: 100) { url }
          }
          discounts: discountApplications (first: 100) {
            edges {
              node {
                allocationMethod
                targetSelection
                targetType
              }
            }
          }
          lineItems (first: 100) {
            edges {
              node {
                title
                quantity
                fallbackCompareAtPrice: originalTotalPrice { amount }
                fallbackPrice: discountedTotalPrice { amount }
                variant {
                  id
                  title
                  price: priceV2 {
                    amount
                  }
                  compareAtPrice: compareAtPriceV2 {
                    amount
                  }
                  image {
                    altText
                    src: transformedSrc(maxHeight: 160)
                  }
                  product {
                    title
                    handle
                    url: onlineStoreUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${address.fragments.address}
`;

const CREATE_CUSTOMER_MUTATION = gql`
  mutation customerCreate ($input: CustomerCreateInput!) {
    customerCreate (input: $input) {
      customer { id }
      errors: customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const GET_CUSTOMER_QUERY = gql`
  query customerQuery ($customerAccessToken: String!) {
    customer (customerAccessToken: $customerAccessToken) {
      ...customer
    }
  }
  ${CUSTOMER_FRAGMENT}
`;

module.exports = {
  get: GET_CUSTOMER_QUERY,
  create: CREATE_CUSTOMER_MUTATION,
};
