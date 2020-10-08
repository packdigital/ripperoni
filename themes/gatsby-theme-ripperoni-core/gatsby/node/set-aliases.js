const path = require('path');

const getPath = p => path.join(process.cwd(), p);

const extensions = [
  '.jsx',
  '.json',
  '.js',
  '.css',
  '.scss',
  '.svg',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
];

const alias = {
  'src': getPath('src'),
  '@assets': getPath('src/assets'),
  '@components': getPath('src/components'),
  '@context': getPath('src/context'),
  '@hooks': getPath('src/hooks'),
  '@images': getPath('src/assets/images'),
  '@layouts': getPath('src/layouts'),
  '@static': getPath('static'),
  '@ripperoni/account': '@packdigital/gatsby-theme-ripperoni-account/src',
  '@ripperoni/cart': '@packdigital/gatsby-theme-ripperoni-cart/src',
  '@ripperoni/cms': '@packdigital/gatsby-theme-ripperoni-cms/src',
  '@ripperoni/components': '@packdigital/gatsby-theme-ripperoni-components/src',
  '@ripperoni/core': '@packdigital/gatsby-theme-ripperoni-core/src',
  '@ripperoni/dev': '@packdigital/gatsby-theme-ripperoni-dev/src',
  '@ripperoni/marketing': '@packdigital/gatsby-theme-ripperoni-marketing/src',
  '@ripperoni/message-bus': '@packdigital/gatsby-theme-ripperoni-message-bus/src',
  '@ripperoni/search': '@packdigital/gatsby-theme-ripperoni-search/src',
  '@ripperoni/store': '@packdigital/gatsby-theme-ripperoni-store/src',
  '@ripperoni/utilities': '@packdigital/ripperoni-utilities',
}

module.exports = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias,
      extensions,
      modules: ['node_modules', getPath('./src')],
    },
  })
};
