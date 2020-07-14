const { getPluginOptions } = require('@packdigital/ripperoni-utilities');


module.exports = themeOptions => {
  const defaults = {
    backpackSource: {
      enable: true,
    },
    backpackShopifyCollectionSource: {
      enable: true,
    },
  };

  const getOptionsFor = getPluginOptions(defaults, themeOptions);

  return {
    backpackSource: getOptionsFor('backpackSource'),
    backpackShopifyCollectionSource: getOptionsFor('backpackShopifyCollectionSource'),
  };
};
