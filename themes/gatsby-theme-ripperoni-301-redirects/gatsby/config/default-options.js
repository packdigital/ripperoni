const { getPluginOptions } = require('@packdigital/ripperoni-utilities');


module.exports = themeOptions => {
  const redirectsPrivateKey = process.env.REDIRECTS_PRIVATE_KEY;

  const defaults = {
    redirects: {
      enabled: true,
      redirectsFilePath: './static/_redirects',
      redirectsOutputPath: './public/_redirects',
    },
    googleSpreadsheet: {
      enabled: true,
      spreadsheetName: 'redirects',
      credentials: {
        client_email: process.env.REDIRECTS_CLIENT_EMAIL,
        private_key: redirectsPrivateKey && redirectsPrivateKey.replace(/\\n/gm, '\n'),
      }
    },
  };

  const getOptionsFor = getPluginOptions(defaults, themeOptions);

  return {
    redirects: getOptionsFor('redirects'),
    googleSpreadsheet: getOptionsFor('googleSpreadsheet'),
  };
};