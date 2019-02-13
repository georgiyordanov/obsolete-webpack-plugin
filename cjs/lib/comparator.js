"use strict";

exports.__esModule = true;
exports.compareVersion = compareVersion;

var _miniBuiltIns = require("./mini-built-ins");

/**
 * Validate if a string is semantic version.
 *
 * @param {string} version
 */
function validateSemantic(version) {
  var rValidator = /^(\d+)(\.\d+)*$/;

  if (!rValidator.test(version)) {
    throw new Error("Parameter `version` `" + version + "` isn't a semantic version.");
  }
}
/**
 * Compare two semantic versions.
 *
 * @param {string} version
 * @param {string} comparedVersion
 * @returns {number} Return `compareVersion.GT` if greater than, return `compareVersion.EQ`
 * if equal to, return `compareVersion.LT` if less than.
 */


function compareVersion(version, comparedVersion) {
  var rVersion = /\d+/g;
  var rComparedVersion = /\d+/g;
  (0, _miniBuiltIns.forEach)([version, comparedVersion], function (version) {
    validateSemantic(version);
  });

  while (true) {
    var matches = rVersion.exec(version);
    var comparedMatches = rComparedVersion.exec(comparedVersion);

    if (matches && !comparedMatches) {
      return Number(matches[0]) === 0 ? compareVersion.EQ : compareVersion.GT;
    }

    if (!matches && comparedMatches) {
      return Number(comparedMatches[0]) === 0 ? compareVersion.EQ : compareVersion.LT;
    }

    if (matches && comparedMatches) {
      if (Number(matches[0]) > Number(comparedMatches[0])) {
        return compareVersion.GT;
      }

      if (Number(matches[0]) < Number(comparedMatches[0])) {
        return compareVersion.LT;
      }
    }

    if (!matches && !comparedMatches) {
      return compareVersion.EQ;
    }
  }
}

compareVersion.GT = 1;
compareVersion.EQ = 0;
compareVersion.LT = -1;