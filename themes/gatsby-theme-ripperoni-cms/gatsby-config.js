require('dotenv').config();

const { conditionallyIncludePlugin } = require('@packdigital/ripperoni-utilities');

const withDefaults = require('./gatsby/config/default-options');


module.exports = themeOptions => {
  const { contentful: { enabled: contentfulEnabled, ...contentful }} = withDefaults(themeOptions);

  const plugins = [
    ...conditionallyIncludePlugin({
      theme: 'cms',
      resolve: 'gatsby-source-contentful',
      enabled: contentfulEnabled,
      options: contentful,
      requiredOptions: ['spaceId', 'accessToken'],
    }),
  ];

  return {
    plugins,
  };
};
