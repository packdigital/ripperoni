/**
 * @prettier
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

const utils = require('@packdigital/ripperoni-utilities');

// todo: make global util and put in ripperoni-utilities
const isEmptyObject = (arg) => !Object.keys(arg || 0).length;

module.exports = ({ netlify }) => {
  return {
    developMiddleware: (app) => {
      app.use(
        '/api/*',
        createProxyMiddleware({
          target: 'http://localhost:34567/.netlify/functions/',
          changeOrigin: true,
        })
      );
    },
    plugins: [
      ...utils.conditionallyIncludePlugin({
        resolve: 'gatsby-plugin-netlify',
        enabled: !isEmptyObject(netlify),
        options: {
          headers: {
            '/sw.js': [
              'cache-control: public',
              'cache-control: max-age=0',
              'cache-control: must-revalidate',
            ],
            '/public/**/*.html': [
              'cache-control: public',
              'cache-control: max-age=0',
              'cache-control: must-revalidate',
            ],
            '/public/page-data/*': [
              'cache-control: public',
              'cache-control: max-age=0',
              'cache-control: must-revalidate',
            ],
            '/*.js': [
              'cache-control: public',
              'cache-control: max-age=31536000',
              'cache-control: immutable',
            ],
            '/public/**/*.js': [
              'cache-control: public',
              'cache-control: max-age=31536000',
              'cache-control: immutable',
            ],
            '/public/**/*.css': [
              'cache-control: public',
              'cache-control: max-age=31536000',
              'cache-control: immutable',
            ],
            '/public/swiper/*': [
              'cache-control: public',
              'cache-control: max-age=31536000',
              'cache-control: immutable',
            ],
            '/public/static/*': [
              'cache-control: public',
              'cache-control: max-age=31536000',
              'cache-control: immutable',
            ],
            '/public/third-parties/*': [
              'cache-control: public',
              'cache-control: max-age=31536000',
              'cache-control: immutable',
            ],
          },
        },
      }),
    ],
  };
};
