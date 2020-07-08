// See the links below for more information:
// http://creativejs.com/resources/requestanimationframe/
// https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
//
// Source:
// https://gist.github.com/joyrexus/7304146

const { isBrowser } = require('@packdigital/ripperoni-utilities');


module.exports = () => {
  if (!isBrowser) return;

  var requestAnimFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  /**
   * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
   * @param {function} fn The callback function
   * @param {int} delay The delay in milliseconds
   */
  var requestInterval = function(fn, delay) {
    if (
      !window.requestAnimationFrame &&
      !window.webkitRequestAnimationFrame &&
      // Firefox 5 ships without cancel support
      !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) &&
      !window.oRequestAnimationFrame    &&
      !window.msRequestAnimationFrame
    ) {
      return window.setInterval(fn, delay);
    }

    var start = new Date().getTime();
    var handle = new Object();

    function loop() {
      var current = new Date().getTime();
      var delta = current - start;

      if (delta >= delay) {
        fn.call();
        start = new Date().getTime();
      }

      handle.value = requestAnimFrame(loop);
    };

    handle.value = requestAnimFrame(loop);

    return handle;
  };

  /**
  * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
  * @param {function} fn The callback function
  * @param {int} delay The delay in milliseconds
  */
  var requestTimeout = function(fn, delay) {
    if (
      !window.requestAnimationFrame &&
      !window.webkitRequestAnimationFrame &&
      // Firefox 5 ships without cancelsupport
      !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) &&
      !window.oRequestAnimationFrame &&
      !window.msRequestAnimationFrame
    ) {
      return window.setTimeout(fn, delay);
    }

    var start = new Date().getTime();
    var handle = new Object();

    function loop(){
      var current = new Date().getTime();
      var delta = current - start;

      delta >= delay
        ? fn.call()
        : handle.value = requestAnimFrame(loop);
    };

    handle.value = requestAnimFrame(loop);

    return handle;
  };

  /**
  * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
  * @param {int|object} fn The callback function
  */
  var clearRequestInterval = function(handle) {
    window.cancelAnimationFrame
      ? window.cancelAnimationFrame(handle.value)
      : window.webkitCancelAnimationFrame
        ? window.webkitCancelAnimationFrame(handle.value)
        : window.webkitCancelRequestAnimationFrame
          ? window.webkitCancelRequestAnimationFrame(handle.value)
          : /* Support for legacy API */ window.mozCancelRequestAnimationFrame
            ? window.mozCancelRequestAnimationFrame(handle.value)
            : window.oCancelRequestAnimationFrame
              ? window.oCancelRequestAnimationFrame(handle.value)
              : window.msCancelRequestAnimationFrame
                ? window.msCancelRequestAnimationFrame(handle.value)
                : clearInterval(handle);
  };

  /**
   * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
   * @param {int|object} fn The callback function
   */
  var clearRequestTimeout = function(handle) {
    window.cancelAnimationFrame
      ? window.cancelAnimationFrame(handle.value)
      : window.webkitCancelAnimationFrame
        ? window.webkitCancelAnimationFrame(handle.value)
        : window.webkitCancelRequestAnimationFrame
          ? window.webkitCancelRequestAnimationFrame(handle.value)
          : /* Support for legacy API */ window.mozCancelRequestAnimationFrame
            ? window.mozCancelRequestAnimationFrame(handle.value)
            : window.oCancelRequestAnimationFrame
              ? window.oCancelRequestAnimationFrame(handle.value)
              : window.msCancelRequestAnimationFrame
                ? window.msCancelRequestAnimationFrame(handle.value)
                : clearTimeout(handle);
  };

  window.requestAnimFrame = requestAnimFrame;
  window.requestInterval = requestInterval;
  window.requestTimeout = requestTimeout;
  window.clearRequestInterval = clearRequestInterval;
  window.clearRequestTimeout = clearRequestTimeout;
};
