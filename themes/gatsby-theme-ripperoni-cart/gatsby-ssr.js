const React = require('react');

const { CartContextProvider } = require('./src/context/CartContext');

const WrappedElement = ({ element, props }) => {
  // prettier-ignore
  return (
    <CartContextProvider {...props}>
      {element}
    </CartContextProvider>
  );
};

exports.wrapRootElement = WrappedElement;
