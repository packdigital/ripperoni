// Browser API hooks
const onRouteUpdate = require('./gatsby/browser/on-route-update').onRouteUpdate;
const wrapRootElement = require('./gatsby/browser/wrap-root-element').wrapRootElement;

exports.onRouteUpdate = onRouteUpdate;
exports.wrapRootElement = wrapRootElement;
