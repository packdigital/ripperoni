// Stylesheets
require('./src/assets/styles/global.css');
require('./src/assets/styles/third-party-overwrites.css');

// Browser API hooks
exports.replaceHydrateFunction = require('./gatsby/browser/replace-hydrate-function');
exports.onClientEntry = require('./gatsby/browser/on-client-entry');
