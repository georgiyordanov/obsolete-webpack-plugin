"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports.requestIdleCallback = requestIdleCallback;

var _now = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/date/now"));

/**
 * Queue a function to be called during a browser's idle periods.
 *
 * @param {function(IdleDeadline} callback
 * @param {Object} options
 */
function requestIdleCallback(callback, options) {
  if (options === void 0) {
    options = {};
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, options);
    return;
  }

  var start = new Date().getTime();
  setTimeout(function () {
    var elapsedTime = (0, _now.default)() - start;
    callback({
      didTimeout: false,
      timeRemaining: function timeRemaining() {
        return Math.max(0, 50 - elapsedTime);
      }
    });
  }, 1);
}