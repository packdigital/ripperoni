const setAliases = require('./gatsby/node/set-aliases');

// Webpack Config
exports.onCreateWebpackConfig = setAliases;
