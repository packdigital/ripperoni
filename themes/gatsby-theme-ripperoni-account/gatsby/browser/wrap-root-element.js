/**
 * @prettier
 */
const React = require('react');

const {
  CustomerContextProvider,
} = require('../../src/context/CustomerContext');

const WrappedRoot = ({ element, props }) => {
  return (
    <CustomerContextProvider {...props}>{element}</CustomerContextProvider>
  );
};

module.exports = WrappedRoot;
