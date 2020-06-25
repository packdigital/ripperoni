require('dotenv').config();

const chalk = require('chalk');


const environments = {
  AWS: typeof process.env.AWS_REGION === 'string',
  Netlify: process.env.NETLIFY === 'true',
  GatsbyCloud: process.env.GATSBY_CLOUD === 'true',
  Preview: process.env.PREVIEW === 'true',
  Development: process.env.NODE_ENV === 'development',
  Production: process.env.NODE_ENV === 'production',
};

Object.entries(environments).forEach(([environment, enabled]) =>
  console.info(`${environment}:`, chalk`{${enabled ? 'green' : 'red'} ${enabled}}`));
