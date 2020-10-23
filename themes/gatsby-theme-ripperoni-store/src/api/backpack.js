import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import WebSocket from 'ws';
import fetch from 'isomorphic-fetch';

import { isBrowser } from '@packdigital/ripperoni-utilities';

const httpLink = new HttpLink({
  uri: process.env.GATSBY_BACKPACK_URL,
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': process.env.GATSBY_BACKPACK_SECRET_KEY,
  },
  fetch,
});

const wsLink = new WebSocketLink({
  uri: process.env.GATSBY_BACKPACK_URL.replace(/^https?/, 'wss'),
  options: {
    lazy: true,
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': process.env.GATSBY_BACKPACK_SECRET_KEY
      }
    }
  },
  webSocketImpl: !isBrowser && WebSocket,
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
