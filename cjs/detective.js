"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uaParser = _interopRequireDefault(require("./ua-parser"));

var _browser = _interopRequireDefault(require("./browser"));

var _comparator = require("./lib/comparator");

var _miniBuiltIns = require("./lib/mini-built-ins");

var Detective =
/*#__PURE__*/
function () {
  function Detective() {}

  var _proto = Detective.prototype;

  /**
   * Detect if the userAgent satisfies requirement of target browsers.
   *
   * @param {string} userAgent
   * @param {string[]} targetBrowsers
   * @param {boolean} promptOnNonTargetBrowser
   * @param {boolean} promptOnUnknownBrowser
   * @returns {boolean}
   */
  _proto.detect = function detect(userAgent, targetBrowsers, promptOnNonTargetBrowser, promptOnUnknownBrowser) {
    var currentBrowsers = new _uaParser.default().parse(userAgent);

    if (!currentBrowsers.length) {
      return !promptOnUnknownBrowser;
    }

    var normalizedTargetBrowsers = this.normalizeTargetBrowsers(targetBrowsers);
    var normalizedTargetBrowsersOfTheSameName = (0, _miniBuiltIns.filter)(normalizedTargetBrowsers, function (targetBrowser) {
      return (0, _miniBuiltIns.includes)((0, _miniBuiltIns.map)(currentBrowsers, function (currentBrowser) {
        return currentBrowser.name;
      }), targetBrowser.name);
    });

    if (!normalizedTargetBrowsersOfTheSameName.length) {
      return !promptOnNonTargetBrowser;
    }

    return (0, _miniBuiltIns.some)(normalizedTargetBrowsersOfTheSameName, function (targetBrowser) {
      return (0, _miniBuiltIns.some)(currentBrowsers, function (currentBrowser) {
        return currentBrowser.name === targetBrowser.name && (0, _comparator.compareVersion)(currentBrowser.primaryVersion, targetBrowser.primaryVersion) !== _comparator.compareVersion.LT;
      });
    });
  }
  /**
   * Normalize target browsers to a group of `Browser` instances.
   *
   * @param {string[]} targetBrowsers
   * @returns {Browser[]}
   */
  ;

  _proto.normalizeTargetBrowsers = function normalizeTargetBrowsers(targetBrowsers) {
    var _this = this;

    var rBrowser = /(\w+) (([\d.]+)(?:-[\d.]+)?)/;
    var rawTargetBrowsers = (0, _miniBuiltIns.map)(targetBrowsers, function (browser) {
      var matches = rBrowser.exec(_this.mapAlias(browser));
      return new _browser.default(matches[1], matches[2], matches[3]);
    });
    return this.getLowestVersionBrowsers(rawTargetBrowsers);
  }
  /**
   * Normalize target browsers to a group of `Browser` instances.
   *
   * @param {string} targetBrowser
   * @returns {string}
   */
  ;

  _proto.mapAlias = function mapAlias(targetBrowser) {
    return {
      'op_mini all': 'op_mini 0',
      'safari TP': 'safari 99'
    }[targetBrowser] || targetBrowser;
  }
  /**
   * Get the lowest versrin browsers from the list.
   *
   * @param {Browser[]} browsers
   * @returns {Browser[]}
   */
  ;

  _proto.getLowestVersionBrowsers = function getLowestVersionBrowsers(browsers) {
    var lowestVersionMap = {};
    (0, _miniBuiltIns.forEach)(browsers, function (browser) {
      if (!lowestVersionMap[browser.name]) {
        lowestVersionMap[browser.name] = browser;
        return;
      }

      if ((0, _comparator.compareVersion)(browser.primaryVersion, lowestVersionMap[browser.name].primaryVersion) === _comparator.compareVersion.LT) {
        lowestVersionMap[browser.name] = browser;
      }
    });
    return (0, _miniBuiltIns.values)(lowestVersionMap);
  };

  return Detective;
}();

var _default = Detective;
exports.default = _default;