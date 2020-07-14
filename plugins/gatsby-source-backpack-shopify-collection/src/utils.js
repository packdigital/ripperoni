const chalk = require('chalk');
const startCase = require('lodash.startcase');
const camelCase = require('lodash.camelcase');

const { PLUGIN_NAME } = require('./constants');


const titleCase = string => startCase(camelCase(string));

const formatMessage = message => chalk`{magenta ${PLUGIN_NAME}} 🛒 ${message}`;


module.exports = {
  titleCase,
  formatMessage,
};
