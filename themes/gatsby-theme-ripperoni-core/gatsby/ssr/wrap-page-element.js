/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
const React = require('react');

const { Main: Layout } = require('../../src/layouts/Main');


module.exports = ({ element, props }) => {
  return (
    <Layout {...props}>
      {element}
    </Layout>
  );
};
