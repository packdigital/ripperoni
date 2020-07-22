require('dotenv').config();

const { createProxyMiddleware } = require('http-proxy-middleware');

const { conditionallyIncludePlugin } = require('@packdigital/ripperoni-utilities');

const withDefaults = require('./gatsby/config/default-options');


module.exports = themeOptions => {
  const { netlify } = withDefaults(themeOptions);

  const plugins = [
    ...conditionallyIncludePlugin({
      theme: 'gatsby-theme-ripperoni-host',
      resolve: 'gatsby-plugin-netlify',
      enabled: netlify.enabled,
      options: netlify,
    }),
  ];

  const developMiddleware = app => {
    app.use(
      '/api/*',
      createProxyMiddleware({
        target: 'http://localhost:34567/.netlify/functions/',
        changeOrigin: true,
      })
    );
  };

  return {
    plugins,
    developMiddleware,
  };
};
