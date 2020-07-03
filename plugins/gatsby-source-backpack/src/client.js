import fetch from 'isomorphic-fetch';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const createClient = (accessToken, apiVersion = `v1`, backpackUri) => {
  const uri = backpackUri || `https://platform-hasura.onrender.com/${apiVersion}/graphql`;

  const headers = {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': accessToken,
  };

  const cache = new InMemoryCache();
  const link = new createHttpLink({ uri, headers, fetch })
  const client = new ApolloClient({ link, cache });

  return client;
};
