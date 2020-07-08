const fetch = require('isomorphic-fetch');
const { ApolloClient } = require('apollo-client');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');


exports.createClient = (accessToken, apiVersion = 'v1', backpackUri) => {
  const uri = backpackUri || `https://platform-hasura.onrender.com/${apiVersion}/graphql`;

  const headers = {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': accessToken,
  };

  const cache = new InMemoryCache();
  const link = new createHttpLink({ uri, headers, fetch });
  const client = new ApolloClient({ link, cache });

  return client;
};
