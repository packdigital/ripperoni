"use strict";

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.split");

var _require = require('apollo-client'),
    ApolloClient = _require.ApolloClient;

var _require2 = require('apollo-link'),
    split = _require2.split;

var _require3 = require('apollo-link-http'),
    HttpLink = _require3.HttpLink;

var _require4 = require('apollo-link-ws'),
    WebSocketLink = _require4.WebSocketLink;

var _require5 = require('apollo-utilities'),
    getMainDefinition = _require5.getMainDefinition;

var _require6 = require('apollo-cache-inmemory'),
    InMemoryCache = _require6.InMemoryCache;

var WebSocket = require('ws');

var fetch = require('isomorphic-fetch');

var _require7 = require('@packdigital/ripperoni-utilities'),
    isBrowser = _require7.isBrowser;

exports.createClient = function (_ref) {
  var accessToken = _ref.accessToken,
      uri = _ref.backpackUri;
  var httpLink = new HttpLink({
    uri: uri,
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': accessToken
    },
    fetch: fetch
  });
  var wsLink = new WebSocketLink({
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
  var link = split(function (_ref2) {
    var query = _ref2.query;

    var _getMainDefinition = getMainDefinition(query),
        kind = _getMainDefinition.kind,
        operation = _getMainDefinition.operation;

    return kind === 'OperationDefinition' && operation === 'subscription';
  }, wsLink, httpLink);
  var cache = new InMemoryCache();
  var client = new ApolloClient({
    link: link,
    cache: cache
  });
  return client;
};