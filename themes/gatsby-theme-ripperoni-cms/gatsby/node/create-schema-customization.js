const contentfulTypes = require('../../src/contentful/types');


module.exports = async ({ actions: { createTypes }}, options) => {
  createTypes([
    contentfulTypes,
  ]);
};
