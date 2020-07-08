const { getPluginOptions } = require('@packdigital/ripperoni-utilities');


module.exports = themeOptions => {
  const defaults = {
    contentful: {
      enabled: true,
    }
  };

  const getOptionsFor = getPluginOptions(defaults, themeOptions);

  return {
    contentful: getOptionsFor('contentful'),
  };
};
