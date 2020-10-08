/**
 * @prettier
 */
const messageBus = require('@packdigital/gatsby-theme-ripperoni-message-bus');

module.exports = ({ location }) => {
  const { publish, topics } = messageBus;

  publish(topics.ROUTE_CHANGE, location);

  if (location.pathname.includes('/products/')) {
    publish(topics.VIEW_PRODUCT, location);
    return;
  }

  if (location.pathname.includes('/collections/')) {
    publish(topics.VIEW_COLLECTION, location);
    return;
  }
};
