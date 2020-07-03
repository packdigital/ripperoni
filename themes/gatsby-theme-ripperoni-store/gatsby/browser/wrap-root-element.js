const React = require('react');
const { ApolloProvider } = require('@apollo/react-hooks');

const backpack = require('./src/api/backpack');


module.exports = ({ element }) => (
  <ApolloProvider client={backpack.client}>
    {element}
  </ApolloProvider>
);
