/**
 * @prettier
 */

module.exports = ({ contentful }) => {
  return {
    plugins: [
      {
        resolve: 'gatsby-source-contentful',
        options: {
          ...contentful,
        },
      },
    ],
  };
};
