require('dotenv').config();


module.exports = () => {
  const plugins = [
    'gatsby-plugin-theme-ui',
    // 'gatsby-plugin-transition-link',
  ];

  return {
    plugins,
  };
};
