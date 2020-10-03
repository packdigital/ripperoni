const { AbortController } = require('abortcontroller-polyfill/dist/cjs-ponyfill');
const { atob, btoa } = require('abab');

global.atob = atob;
global.btoa = btoa;
global.AbortController = AbortController;

// SSR API hooks
exports.wrapRootElement = require('./gatsby/ssr/wrap-root-element');
exports.wrapPageElement = require('./gatsby/ssr/wrap-page-element');
