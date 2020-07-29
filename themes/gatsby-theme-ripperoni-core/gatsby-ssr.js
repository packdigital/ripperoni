const { AbortController } = require('abortcontroller-polyfill/dist/cjs-ponyfill');
const atob = require('btoa');
const btoa = require('btoa');


global.atob = atob;
global.btoa = btoa;
global.AbortController = AbortController;

// SSR API hooks
exports.wrapRootElement = require('./gatsby/ssr/wrap-root-element');
