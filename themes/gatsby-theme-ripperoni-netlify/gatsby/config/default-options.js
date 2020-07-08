const { getPluginOptions } = require('@packdigital/ripperoni-utilities');


module.exports = themeOptions => {
  const cacheNever = [
    'cache-control: public',
    'cache-control: max-age=0',
    'cache-control: must-revalidate',
  ];

  const cacheOneYear = [
    'cache-control: public',
    'cache-control: max-age=31536000',
    'cache-control: immutable',
  ];

  const defaults = {
    netlify: {
      enabled: true,
      headers: {
        '/sw.js': cacheNever,
        '/public/**/*.html': cacheNever,
        '/public/page-data/*': cacheNever,
        '/*.js': cacheOneYear,
        '/public/**/*.js': cacheOneYear,
        '/public/**/*.css': cacheOneYear,
        '/public/swiper/*': cacheOneYear,
        '/public/static/*': cacheOneYear,
        '/public/third-parties/*': cacheOneYear,
      },
    }
  };

  const getOptionsFor = getPluginOptions(defaults, themeOptions);

  return {
    netlify: getOptionsFor('netlify'),
  };
};
