const { getPluginOptions } = require('@packdigital/ripperoni-utilities');


module.exports = themeOptions => {
  const defaults = {
    meta: {
      site: {
        supportEmail: 'support@domain.com',
      },
    }
  };

  const getOptionsFor = getPluginOptions(defaults, themeOptions);

  return {
    meta: getOptionsFor('meta'),
  };
};
