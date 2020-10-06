const React = require('react');

const { BusContextProvider } = require('./src/context/BusContext');

const WrappedRoot = ({ element, props }) => {
  return (
    <BusContextProvider {...props}>
      {element}
    </BusContextProvider>
  );
};

exports.wrapRootElement = WrappedRoot;
