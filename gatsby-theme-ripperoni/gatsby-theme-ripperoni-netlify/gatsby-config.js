require('dotenv').config();

const { createProxyMiddleware } = require('http-proxy-middleware');
const { conditionallyIncludePlugin } = require('@packdigital/ripperoni-utilities');


const cacheNever = [
  'cache-control: public',
  'cache-control: max-age=0',
  'cache-control: must-revalidate',
];

const cacheOneYear = [
  'cache-control: public',
  'cache-control: max-age=31536000',
  'cache-control: immutable',
];

module.exports = ({
  netlify: {
    // enabled: netfliyEnabled = process.env.NETLIFY === 'true',
    enabled: netfliyEnabled = true,
    ...netlifyOptions
  } = {}
}) => {
  const developMiddleware = app => {
    app.use(
      '/api/*',
      createProxyMiddleware({
        target: 'http://localhost:34567/.netlify/functions/',
        changeOrigin: true,
      })
    );
  };

  const plugins = [
    ...conditionallyIncludePlugin({
      enabled: netfliyEnabled,
      theme: 'host',
      resolve: 'gatsby-plugin-netlify',
      options: netlifyOptions,
      defaultOptions: {
        headers: {
          '/public/**/*.html': cacheNever,
          '/public/page-data/*': cacheNever,
          '/public/**/*.js': cacheOneYear,
          '/*.js': cacheOneYear,
          '/public/**/*.css': cacheOneYear,
          '/public/third-parties/*': cacheOneYear,
          '/public/swiper/*': cacheOneYear,
          '/public/static/*': cacheOneYear,
          '/sw.js': cacheNever,
        },
      },
    }),
  ];

  return {
    developMiddleware,
    plugins,
  };
};
