/**
 * @prettier
 */
const utils = require('@packdigital/ripperoni-utilities');

// todo: make global util and put in ripperoni-utilities
const isEmptyObject = (arg) => !Object.keys(arg || 0).length;

module.exports = ({ search }) => {
  return {
    plugins: [
      ...utils.conditionallyIncludePlugin({
        resolve: '@gatsby-contrib/gatsby-plugin-elasticlunr-search',
        options: { ...search },
        enabled: !isEmptyObject(search),
      }),
    ],
  };
};
