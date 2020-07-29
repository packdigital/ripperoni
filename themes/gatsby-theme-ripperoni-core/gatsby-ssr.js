const { AbortController } = require('abortcontroller-polyfill/dist/cjs-ponyfill');


global.AbortController = AbortController;

// SSR API hooks
exports.wrapRootElement = require('./gatsby/ssr/wrap-root-element');
