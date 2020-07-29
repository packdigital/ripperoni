"use strict";

const {
  ApolloClient
} = require('apollo-client');

const {
  split
} = require('apollo-link');

const {
  HttpLink
} = require('apollo-link-http');

const {
  WebSocketLink
} = require('apollo-link-ws');

const {
  getMainDefinition
} = require('apollo-utilities');

const {
  InMemoryCache
} = require('apollo-cache-inmemory');

const WebSocket = require('ws');

const fetch = require('isomorphic-fetch');

const {
  isBrowser
} = require('@packdigital/ripperoni-utilities');

exports.createClient = ({
  accessToken,
  backpackUri: uri
}) => {
  const httpLink = new HttpLink({
    uri,
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': accessToken
    },
    fetch
  });
  const wsLink = new WebSocketLink({
    uri: uri.replace(/^https?/, 'wss'),
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: {
        headers: {
          'x-hasura-admin-secret': accessToken
        }
      }
    },
    webSocketImpl: !isBrowser && WebSocket
  });
  const link = split(({
    query
  }) => {
    const {
      kind,
      operation
    } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  }, wsLink, httpLink);
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    link,
    cache
  });
  return client;
};