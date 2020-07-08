require('dotenv').config();

const { conditionallyIncludePlugin } = require('@packdigital/ripperoni-utilities');

const withDefaults = require('./gatsby/config/default-options');


module.exports = themeOptions => {
  const { googleSpreadsheet, redirects } = withDefaults(themeOptions);

  const plugins = [
    ...conditionallyIncludePlugin({
      theme: '301-redirects',
      resolve: 'gatsby-source-google-spreadsheet',
      enabled: googleSpreadsheet.enabled,
      options: googleSpreadsheet,
      requiredOptions: [
        'spreadsheetId',
        'credentials.client_email',
        'credentials.private_key',
      ],
    }),
    ...conditionallyIncludePlugin({
      theme: '301-redirects',
      resolve: '@packdigital/gatsby-plugin-301-redirects',
      enabled: redirects.enabled,
      options: redirects,
    }),
  ];

  return {
    plugins,
  };
};
