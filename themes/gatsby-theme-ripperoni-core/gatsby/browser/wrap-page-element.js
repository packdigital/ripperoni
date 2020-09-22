/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
const React = require('react');

const { Layout } = require('@layouts/Main');
// const { Layout } = require('../../src/layouts/Main');


module.exports = ({ element, props }) => {
  return (
    <Layout {...props}>
      {element}
    </Layout>
  );
};


// const transitionDelay = 500;

// export const shouldUpdateScroll = ({
//   routerProps: { location },
//   getSavedScrollPosition
// }) => {
//   if (location.action === "PUSH") {
//     window.setTimeout(() => window.scrollTo(0, 0), transitionDelay);
//   } else {
//     const savedPosition = getSavedScrollPosition(location);
//     window.setTimeout(
//       () => window.scrollTo(...(savedPosition || [0, 0])),
//       transitionDelay
//     );
//   }
//   return false;
// };
