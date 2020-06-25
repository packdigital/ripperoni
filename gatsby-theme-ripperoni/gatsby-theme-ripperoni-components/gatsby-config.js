require('dotenv').config();


module.exports = () => {
  const plugins = [
    'gatsby-plugin-theme-ui',
    'gatsby-theme-style-guide',
    'gatsby-plugin-transition-link',
  ];

  return {
    plugins,
  };
};
