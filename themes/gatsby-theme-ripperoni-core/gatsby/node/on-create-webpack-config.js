/* read more here: https://webpack.js.org/configuration/devtool/ */
const webpackSourcemap = 'eval-source-map';

module.exports = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: webpackSourcemap,
  })
};
