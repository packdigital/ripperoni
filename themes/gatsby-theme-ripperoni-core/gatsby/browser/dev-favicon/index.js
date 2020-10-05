const favicon = require('favicon.js');

const frames = require('./frames');

module.exports = {
  start: () => favicon.animate(frames, 100),
  stop: () => favicon.stopAnimate(),
}
