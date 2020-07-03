const chalk = require('chalk');
const startCase = require('lodash.startcase');
const camelCase = require('lodash.camelcase');

const titleCase = string => startCase(camelCase(string));

const formatMessage = message => chalk`{magenta gatsby-source-whatever-collections} 🙄  ${message}`;


module.exports = {
  titleCase,
  formatMessage,
};
