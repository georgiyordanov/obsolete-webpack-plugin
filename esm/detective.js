import UAParser from './ua-parser';
import Browser from './browser';
import { compareVersion } from './lib/comparator';
import { filter, map, some, includes, values, forEach } from './lib/mini-built-ins';

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
    var currentBrowsers = new UAParser().parse(userAgent);

    if (!currentBrowsers.length) {
      return !promptOnUnknownBrowser;
    }

    var normalizedTargetBrowsers = this.normalizeTargetBrowsers(targetBrowsers);
    var normalizedTargetBrowsersOfTheSameName = filter(normalizedTargetBrowsers, function (targetBrowser) {
      return includes(map(currentBrowsers, function (currentBrowser) {
        return currentBrowser.name;
      }), targetBrowser.name);
    });

    if (!normalizedTargetBrowsersOfTheSameName.length) {
      return !promptOnNonTargetBrowser;
    }

    return some(normalizedTargetBrowsersOfTheSameName, function (targetBrowser) {
      return some(currentBrowsers, function (currentBrowser) {
        return currentBrowser.name === targetBrowser.name && compareVersion(currentBrowser.primaryVersion, targetBrowser.primaryVersion) !== compareVersion.LT;
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
    var rawTargetBrowsers = map(targetBrowsers, function (browser) {
      var matches = rBrowser.exec(_this.mapAlias(browser));
      return new Browser(matches[1], matches[2], matches[3]);
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
    forEach(browsers, function (browser) {
      if (!lowestVersionMap[browser.name]) {
        lowestVersionMap[browser.name] = browser;
        return;
      }

      if (compareVersion(browser.primaryVersion, lowestVersionMap[browser.name].primaryVersion) === compareVersion.LT) {
        lowestVersionMap[browser.name] = browser;
      }
    });
    return values(lowestVersionMap);
  };

  return Detective;
}();

export default Detective;