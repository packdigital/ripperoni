const React = require('react');

const { PubSub } = require('@packdigital/gatsby-theme-ripperoni-message-bus');
const { useCustomer } = require('@packdigital/gatsby-theme-ripperoni-account');

const { CartContextProvider } = require('./src/context/CartContext');

const RoolElement = ({ children, ...props }) => {
  const customer = useCustomer();

  return (
    <CartContextProvider messageBus={PubSub} customer={customer} {...props}>
      {children}
    </CartContextProvider>
  );
};

const WrappedElement = ({ element, props }) => {
  return <RoolElement {...props}>{element}</RoolElement>;
};

exports.wrapRootElement = WrappedElement;
