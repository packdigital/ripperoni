require('dotenv').config();


module.exports = () => {
  const plugins = [
    'gatsby-plugin-transition-link',
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: ['/account/*']
      },
    }
  ];

  return {
    plugins,
  };
};
