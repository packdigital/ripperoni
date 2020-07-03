require('dotenv').config();


module.exports = ({
  format: {
    money: {
      string: moneyString = '${price}',
      trimTralingZeros = false,
    },
    date: {
      string: dateString = 'mm-dd-yyyy',
    },
  }
}) => {
  const siteMetadata = {
    format: {
      money: {
        string: moneyString,
        trimTralingZeros,
      },
      date: {
        string: dateString
      },
    }
  };

  const plugins = [
    'gatsby-plugin-theme-ui',
    // 'gatsby-theme-style-guide',
    // 'gatsby-plugin-transition-link',
  ];

  return {
    siteMetadata,
    plugins,
  };
};
