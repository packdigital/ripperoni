require('abortcontroller-polyfill/dist/polyfill-patch-fetch');

// SSR API hooks
exports.wrapRootElement = require('./gatsby/ssr/wrap-root-element');
