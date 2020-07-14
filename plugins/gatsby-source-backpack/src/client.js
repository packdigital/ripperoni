const fetch = require('isomorphic-fetch');
const { ApolloClient } = require('apollo-client');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');


exports.createClient = (accessToken, uri) => {
  const headers = {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': accessToken,
  };

  const cache = new InMemoryCache();
  const link = new createHttpLink({ uri, headers, fetch });
  const client = new ApolloClient({ link, cache });

  return client;
};
