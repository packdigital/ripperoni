/* eslint-disable no-fallthrough */
const { ApolloLink } = require('apollo-link');
const { onError } = require('apollo-link-error');
const { ApolloClient } = require('apollo-client');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache, IntrospectionFragmentMatcher } = require('apollo-cache-inmemory');
const fetch = require('isomorphic-fetch');


const getErrorCode = ({ message, path = [] }) => {
  switch (path[0]) {
    case 'createToken':
      if (message === 'Login attempt limit exceeded. Please try again later.') {
        return 'TOO_MANY_LOGIN_ATTEMPTS';
      }
    case 'customerCreate':
      if (message === 'Creating Customer Limit exceeded. Please try again later.') {
        return 'TOO_MANY_CREATE_ATTEMPTS';
      }
    default:
      return 'GRAPHQL_ERROR';
  }
};

const errorLink = onError(({ response, graphQLErrors }) => {
  if (graphQLErrors) {
    response.errors = graphQLErrors.map(error => ({
      code: getErrorCode(error),
      field: null,
      message: error.message
    }));
  }
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [], // no types provided
    },
  },
});

const httpLink = new createHttpLink({
  uri: `https://${process.env.GATSBY_SHOPIFY_SHOP_NAME}.myshopify.com/api/2020-04/graphql.json`,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  },
  fetch,
});

const link = ApolloLink.from([
  errorLink,
  httpLink,
]);

const client = new ApolloClient({
  link,
  // cache: new InMemoryCache({ fragmentMatcher }),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      // errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      // errorPolicy: 'all',
    },
  }
});

module.exports = client;
