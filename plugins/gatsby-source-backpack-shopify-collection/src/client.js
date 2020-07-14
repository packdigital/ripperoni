const { ApolloClient } = require('apollo-client');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const fetch = require('isomorphic-fetch');


const shopifyClient = ({ shopName, accessToken, version = '2020-04' }) => {
  const uri = `https://${shopName}.myshopify.com/api/${version}/graphql.json`;

  const headers = {
    'X-Shopify-Storefront-Access-Token': accessToken,
  };

  const cache = new InMemoryCache();
  const link = new createHttpLink({ uri, headers, fetch });
  const client = new ApolloClient({ link, cache });

  return client;
};

module.exports = {
  clients: {
    shopify: shopifyClient
  }
};
