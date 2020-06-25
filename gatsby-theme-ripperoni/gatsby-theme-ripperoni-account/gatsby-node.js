exports.createPages = async ({ actions: { createPage }}) => {
  createPage({
    path: '/account/',
    component: require.resolve('./src/templates/account.jsx'),
    context: {}
  });
};
