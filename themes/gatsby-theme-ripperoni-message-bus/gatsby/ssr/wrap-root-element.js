/**
 * @prettier
 */
const React = require('react');

const {
  MessageBusContextProvider,
} = require('../../src/context/MessageBusContext');

const WrappedRoot = ({ element, props }) => {
  return (
    <MessageBusContextProvider {...props}>{element}</MessageBusContextProvider>
  );
};

module.exports = WrappedRoot;
