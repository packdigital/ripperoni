require('dotenv').config();

const withDefaults = require('./gatsby/config/default-options');


module.exports = themeOptions => {
  const { meta } = withDefaults(themeOptions);

  const plugins = [
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: ['/account/*']
      },
    }
  ];

  const siteMetadata = meta;

  return {
    plugins,
    siteMetadata,
  };
};
