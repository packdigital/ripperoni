/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
const React = require('react');

const { CartContextProvider } = require('./src/context/CartContext');


exports.wrapRootElement = ({ element, props }) => {
  return (
    <CartContextProvider {...props}>
      {element}
    </CartContextProvider>
  );
};
