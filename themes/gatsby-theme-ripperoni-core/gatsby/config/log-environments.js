/**
 * @prettier
 */
const chalk = require('chalk');

const environments = {
  AWS: typeof process.env.AWS_REGION === 'string',
  Netlify: process.env.NETLIFY === 'true',
  GatsbyCloud: process.env.GATSBY_CLOUD === 'true',
  Preview: process.env.PREVIEW === 'true',
  development: process.env.NODE_ENV === 'development',
  production: process.env.NODE_ENV === 'production',
};

Object.entries(environments).forEach(([environment, enabled]) =>
  console.info(
    `${environment}:`,
    chalk`{${enabled ? 'green' : 'red'} ${enabled}}`
  )
);
