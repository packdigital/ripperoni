import debug from 'debug';

import LogConfig from './logger.config';


debug.log = console.log.bind(console);
debug.info = console.info.bind(console);
debug.warn = console.warn.bind(console);
debug.error = console.error.bind(console);

// TODO: Fix alias currently forced to disable prg.log
// debug level set in gatsby node config
if (typeof __DEBUG__ === 'undefined') {
  // storybook
  debug.enable(JSON.stringify('prg.error:*,-prg.log:*,prg.info:*,prg.warn:*'));
} else {
  // gatsby should be able to read __DEBUG__ webpack define
  debug.enable(JSON.stringify('prg.error:*,-prg.log:*,prg.info:*,prg.warn:*'));
}

const dlog = debug('prg.log');
const dError = debug('prg.error');
const dWarn = debug('prg.warn');
const dInfo = debug('prg.info');

const log = (context, msg) => {
  dlog.extend(context)('%o', msg);

  if ( LogConfig.log ) {
    LogConfig.log(context, msg);
  }
};

const error = (context, msg) => {
  dError.extend(context)('%o', msg);

  if ( LogConfig.error ) {
    LogConfig.error(context, msg);
  }
};

const warn = (context, msg) => {
  dWarn.extend(context)('%o', msg);

  if ( LogConfig.warn ) {
    LogConfig.warn(context, msg);
  }
};

const info = (context, msg) => {
  dInfo.extend(context)('%o', msg);

  if ( LogConfig.info ) {
    LogConfig.info(context, msg);
  }
};

export const logger = {
  log,
  error,
  warn,
  info
};
