const { isBrowser } = require('@packdigital/ripperoni-utilities');

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
  console.log('The beginning of it all. React is not ready here..');
  loadPolyfillsDynamically();
};
