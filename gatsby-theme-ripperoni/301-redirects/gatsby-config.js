require('dotenv').config();

const { conditionallyIncludePlugin } = require('@packdigital/ripperoni-utilities');


module.exports = ({
  googleSpreadsheet: {
    enabled: googleSpreadsheetEnabled = true,
    ...googleSpreadsheetOptions
  } = {},
  redirects: {
    enabled: redirectsEnabled = true,
    ...redirectsOptions
  } = {}
}) => {
  const plugins = [
    ...conditionallyIncludePlugin({
      enabled: googleSpreadsheetEnabled,
      theme: '301-redirects',
      resolve: 'gatsby-source-google-spreadsheet',
      options: googleSpreadsheetOptions,
      requiredOptions: [
        'spreadsheetId',
        'credentials.client_email',
        'credentials.private_key',
      ],
      defaultOptions: {
        spreadsheetName: 'redirects',
        credentials: {
          client_email: process.env.REDIRECTS_CLIENT_EMAIL,
          private_key: (process.env.REDIRECTS_PRIVATE_KEY || '').replace(/\\n/gm, '\n'),
        }
      }
    }),
    ...conditionallyIncludePlugin({
      enabled: redirectsEnabled,
      theme: '301-redirects',
      resolve: '@packdigital/gatsby-plugin-301-redirects',
      options: redirectsOptions,
      defaultOptions: {
        redirectsFilePath: './static/_redirects',
        redirectsOutputPath: './public/_redirects',
      },
    }),
  ];

  return {
    plugins,
  };
};
