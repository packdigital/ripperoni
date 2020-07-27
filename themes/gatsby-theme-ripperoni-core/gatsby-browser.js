// Shims
require('./src/shims/requestTimeoutAndInterval')();

// Stylesheets
require('./src/assets/styles/global.css');
require('./src/assets/styles/third-party-overwrites.css');

// Browser API hooks
exports.wrapPageElement = require('./gatsby/browser/wrap-page-element');
exports.onClientEntry = require('./gatsby/browser/on-client-entry');
// exports.replaceHydrateFunction = require('./gatsby/browser/replace-hydrate-function');
