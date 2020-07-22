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
      theme: 'gatsby-theme-ripperoni-search',
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
