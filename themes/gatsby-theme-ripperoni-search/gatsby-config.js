require('dotenv').config();

const { conditionallyIncludePlugin } = require('@packdigital/ripperoni-utilities');


module.exports = ({
  elasticlunr: {
    enabled: elasticlunarEnabled = true,
    ...elasticlunarOptions
  } = {}
}) => {
  const plugins = [
    ...conditionallyIncludePlugin({
      enabled: elasticlunarEnabled,
      theme: 'search',
      resolve: '@gatsby-contrib/gatsby-plugin-elasticlunr-search',
      options: elasticlunarOptions,
      requiredOptions: [
        'fields',
        'resolvers'
      ]
    }),
  ];

  return {
    plugins,
  };
};
