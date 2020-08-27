const { ApolloClient } = require('apollo-client');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const fetch = require('isomorphic-fetch');


const shopifyClient = ({ uri, headers }) => {
  const cache = new InMemoryCache();
  const link = new createHttpLink({ uri, headers, fetch });
  const client = new ApolloClient({ link, cache });

  return client;
};

const getClient = (options, logging) => {
  const { shopName, fetchInBulk, accessToken, apiVersion } = options;
  const { timer, format } = logging;

  const requiresAdminAPI = fetchInBulk ? true : false;

  let uri = '';
  let headers = {};

  if (requiresAdminAPI) {
    uri = `https://${shopName}.myshopify.com/admin/api/${apiVersion}/graphql.json`;
    headers = {
      'X-Shopify-Access-Token': accessToken,
    };

  } else {
    uri = `https://${shopName}.myshopify.com/api/${apiVersion}/graphql.json`;
    headers = {
      'X-Shopify-Storefront-Access-Token': accessToken,
    };
  }

  timer.setStatus(format`Created graphql ${requiresAdminAPI ? 'Admin API' : 'Storefront'} client`);

  return shopifyClient({ uri, headers });
};

module.exports = {
  getClient
};

