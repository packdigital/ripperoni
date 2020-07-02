/* eslint-disable react/display-name */
const React = require('react');

const { CustomerContextProvider } = require('./src/context/CustomerContext');


exports.wrapRootElement = ({ element, props }) => {
  return (
    <CustomerContextProvider {...props}>
      {element}
    </CustomerContextProvider>
  );
};
