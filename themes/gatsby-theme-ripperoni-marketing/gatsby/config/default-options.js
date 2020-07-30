const { getPluginOptions } = require('@packdigital/ripperoni-utilities');


module.exports = themeOptions => {
  const env = {
    production: {
      policy: [{ userAgent: '*' }]
    },
    preview: {
      policy: [{ userAgent: '*', disallow: ['/'] }],
      sitemap: null,
      host: null
    },
    development: {
      policy: [{ userAgent: '*', disallow: ['/'] }],
      sitemap: null,
      host: null
    }
  };

  const resolveEnv = () => {
    const isNetlify = process.env.NETLIFY === 'true';
    const isPreview = process.env.PREVIEW === 'true';
    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction && isNetlify) {
      return 'production';
    }

    if (isPreview) {
      return 'preview';
    }

    return 'development';
  };

  const defaults = {
    meta: {
      site: {
        url: '',
      },
      seo: {
        title: '',
        author: '',
        description: '',
      },
    },
    facebookPixel: {
      enabled: true,
    },
    googleAnalytics: {
      enabled: true,
      head: false
    },
    googleTagManager: {
      enabled: true,
      includeInDevelopment: false,
    },
    robotsTxt: {
      enabled: true,
      env,
      resolveEnv,
    },
    sitemap: {
      enabled: true,
    },
  };

  const getOptionsFor = getPluginOptions(defaults, themeOptions);

  return {
    meta: getOptionsFor('meta'),
    facebookPixel: getOptionsFor('facebookPixel'),
    googleAnalytics: getOptionsFor('googleAnalytics'),
    googleTagManager: getOptionsFor('googleTagManager'),
    robotsTxt: getOptionsFor('robotsTxt'),
    sitemap: getOptionsFor('sitemap'),
  };
};
