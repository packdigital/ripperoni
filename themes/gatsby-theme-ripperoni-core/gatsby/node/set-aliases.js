const path = require("path");

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
  '@ripperoni/account/theme': '@packdigital/gatsby-theme-ripperoni-account/src/gatsby-plugin-theme-ui',
  '@ripperoni/cart/theme': '@packdigital/gatsby-theme-ripperoni-cart/src/gatsby-plugin-theme-ui',
  '@ripperoni/components/theme': '@packdigital/gatsby-theme-ripperoni-components/src/gatsby-plugin-theme-ui',
  '@ripperoni/core/theme': '@packdigital/gatsby-theme-ripperoni-core/src/gatsby-plugin-theme-ui',
  '@ripperoni/debug/theme': '@packdigital/gatsby-theme-ripperoni-debug/src/gatsby-plugin-theme-ui',
  '@ripperoni/marketing/theme': '@packdigital/gatsby-theme-ripperoni-marketing/src/gatsby-plugin-theme-ui',
  '@ripperoni/search/theme': '@packdigital/gatsby-theme-ripperoni-search/src/gatsby-plugin-theme-ui',
  '@ripperoni/store/theme': '@packdigital/gatsby-theme-ripperoni-store/src/gatsby-plugin-theme-ui',
  '@ripperoni/account': '@packdigital/gatsby-theme-ripperoni-account/src',
  '@ripperoni/bus': '@packdigital/gatsby-theme-ripperoni-bus',
  '@ripperoni/cart': '@packdigital/gatsby-theme-ripperoni-cart/src',
  '@ripperoni/cms': '@packdigital/gatsby-theme-ripperoni-cms/src',
  '@ripperoni/components/hooks': '@packdigital/gatsby-theme-ripperoni-components/src/hooks',
  '@ripperoni/components': '@packdigital/gatsby-theme-ripperoni-components/src/components',
  '@ripperoni/core': '@packdigital/gatsby-theme-ripperoni-core/src',
  '@ripperoni/debug': '@packdigital/gatsby-theme-ripperoni-debug/src',
  '@ripperoni/marketing': '@packdigital/gatsby-theme-ripperoni-marketing/src',
  '@ripperoni/search': '@packdigital/gatsby-theme-ripperoni-search/src',
  '@ripperoni/store': '@packdigital/gatsby-theme-ripperoni-store/src',
  '@ripperoni/utilities': '@packdigital/ripperoni-utilities',
}

module.exports = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias,
      extensions,
      modules: ["node_modules", getPath('./src')],
    },
  })
};
