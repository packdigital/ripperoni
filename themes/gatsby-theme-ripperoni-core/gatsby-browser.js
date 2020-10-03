// Shims
require('./src/shims/requestTimeoutAndInterval')();

// Stylesheets
require('./src/assets/styles/global.css');
require('./src/assets/styles/third-party-overwrites.css');

// Browser API hooks
exports.onClientEntry = require('./gatsby/browser/on-client-entry');
exports.wrapPageElement = require('./gatsby/browser/wrap-page-element');
exports.wrapRootElement = require('./gatsby/browser/wrap-root-element');
