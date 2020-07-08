/**
* [1] The `icon` option should:
*       - be a square
*       - at least 512x512
*       - a .jpeg or .png
*     You can provide this image by shadowing the file
*     in the theme's src/gatsby-theme-ripperoni-core/assets/images/logo.png
*/
const { getPluginOptions } = require('@packdigital/ripperoni-utilities');


module.exports = themeOptions => {
  const name = '';
  const author = '@packdigital';
  const description = 'Pack Digital made this site.';
  const color = '#00f7bb';
  const bgColor = '#252525';
  const url = 'https://packdigital.com';
  const logo = 'src/assets/images/logo.png';
  const favicon = 'src/assets/images/favicon.png';


  const defaults = {
    site: {
      name,
      author,
      description,
      color,
      bgColor,
      url,
      logo,
      favicon,
    },
    social: {
      facebook: 'https://www.facebook.com/packdig',
      instagram: 'https://www.instagram.com/packdig',
      twitter: 'https://twitter.com/packdig',
    },
    date: {
      format: 'mm.dd.yy',
    },
    money: {
      format: '${price}',
      trimTrailingZeros: false,
    },
    manifest: {
      enabled: true,
      start_url: '/',
      display: 'minimal-ui',
      name: name,
      short_name: name,
      description: description,
      theme_color: color,
      background_color: bgColor,
      icon: logo,  // [1]
    },
  };

  const getOptionsFor = getPluginOptions(defaults, themeOptions);

  return {
    manifest: getOptionsFor('manifest'),
    site: getOptionsFor('site'),
    social: getOptionsFor('social'),
    date: getOptionsFor('date'),
    money: getOptionsFor('money'),
  };
};
