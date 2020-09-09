const { productsFeed } = require('./products-feed');


exports.createPagesStatefully = async (helpers, pluginOptions) => {
  await productsFeed(helpers, pluginOptions);
};

