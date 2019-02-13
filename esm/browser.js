var Browser =
/**
 * @param {string} name
 * @param {string} version
 * @param {string} primaryVersion
 */
function Browser(name, version, primaryVersion) {
  this.name = name;
  this.version = version;
  this.primaryVersion = primaryVersion;
};

export default Browser;