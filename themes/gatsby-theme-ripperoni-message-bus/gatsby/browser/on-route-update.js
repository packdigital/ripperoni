/**
 * @prettier
 */
const messageBus = require('@packdigital/gatsby-theme-ripperoni-message-bus');

module.exports = ({ location }) => {
  const { publish, topics } = messageBus;

  publish(topics.ROUTE_CHANGE, location);
};
