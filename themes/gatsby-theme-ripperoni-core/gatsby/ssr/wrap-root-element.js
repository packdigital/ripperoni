/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
const React = require('react');

const { UIContextProvider } = require('../../src/context/UIContext');


module.exports = ({ element, props }) => {
  return (
    <UIContextProvider {...props}>
      {element}
    </UIContextProvider>
  );
};
