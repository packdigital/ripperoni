/**
 * @prettier
 */
module.exports = ({ redirects }) => {
  return {
    plugins: [
      {
        resolve: 'gatsby-source-google-spreadsheet',
        options: {
          ...redirects,
          credentials: {
            client_email: process.env.REDIRECTS_CLIENT_EMAIL,
            private_key:
              process.env.REDIRECTS_PRIVATE_KEY &&
              process.env.REDIRECTS_PRIVATE_KEY.replace(/\\n/gm, '\n'),
          },
        },
      },
      {
        resolve: '@packdigital/gatsby-plugin-301-redirects',
        options: {
          redirectsFilePath: './static/_redirects',
          redirectsOutputPath: './public/_redirects',
        },
      },
    ],
  };
};
