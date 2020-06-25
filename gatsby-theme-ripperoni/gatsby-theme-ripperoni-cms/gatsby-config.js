require('dotenv').config();

const { conditionallyIncludePlugin } = require('@packdigital/ripperoni-utilities');


module.exports = ({
  contentful: {
    enabled: contentfulEnabled = true,
    ...contentfulOptions
  } = {}
}) => {
  const plugins = [
    ...conditionallyIncludePlugin({
      enabled: contentfulEnabled,
      theme: 'cms',
      resolve: 'gatsby-source-contentful',
      options: contentfulOptions,
      requiredOptions: [
        'spaceId',
        'accessToken'
      ]
    }),
  ];

  return {
    plugins,
  };
};
