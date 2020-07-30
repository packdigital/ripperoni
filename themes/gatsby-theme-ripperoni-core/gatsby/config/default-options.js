/**
* [1] The `icon` option should:
*       - be a square
*       - at least 512x512
*       - a .jpeg or .png
*     You can provide this image by shadowing the file
*     in the theme's src/gatsby-theme-ripperoni-core/assets/images/logo.png
*/
const fs = require('fs');

const { getPluginOptions } = require('@packdigital/ripperoni-utilities');


const fileExists = path => {
  try {
    fs.accessSync(path);

    return true;
  } catch {
    return false;
  }
};


module.exports = themeOptions => {
  const { meta } = themeOptions;
  const logoPath = meta.site.logo || 'src/assets/images/logo.png';
  const logo = fileExists(logoPath) ? logoPath : undefined;

  const defaults = {
    meta: {
      site: {
        name: '',
        description: '',
        color: '#333333',
        bgColor: '#ffffff',
        logo,
      },
      social: {
        facebook: '',
        instagram: '',
        twitter: '',
      },
      date: {
        format: 'mm.dd.yy',
      },
      money: {
        format: '${price}',
        trimTrailingZeros: false,
      },
    },
    manifest: {
      enabled: true,
      start_url: '/',
      display: 'minimal-ui',
      name: meta.site.name || '',
      short_name: meta.site.name || '',
      description: meta.site.description || '',
      theme_color: meta.site.color || '#333333',
      background_color: meta.site.bgColor || '#ffffff',
      icon: logo,  // [1]
    },
  };

  const getOptionsFor = getPluginOptions(defaults, themeOptions);

  return {
    meta: getOptionsFor('meta'),
    manifest: getOptionsFor('manifest'),
  };
};
