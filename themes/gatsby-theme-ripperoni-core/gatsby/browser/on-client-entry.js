const { isBrowser } = require('@packdigital/ripperoni-utilities');

// const devFavicon = require('./dev-favicon');

/*
 * Dynamically import polyfills for IE11 etc..
 */
const loadPolyfillsDynamically = async () => {
  if (!isBrowser && typeof window.IntersectionObserver === 'undefined') {
    await import('intersection-observer');
    console.log('Loaded intersection-observer polyfill...');
  }
  //... add more conditional polyfills here..
};

module.exports = async () => {
  console.log('The beginning of it all. React is not ready here. Rest in pepperoni.');

  // if (process.env.NODE_ENV === 'development') {
  //   devFavicon.start();

  //   window.__devFavicon = devFavicon;
  // }

  loadPolyfillsDynamically();
};
