import uaParse from 'ua-parser-js';

class Doctor {
  detect(userAgent, targetBrowsers) {
    const { browser: currentBrowser } = uaParse(userAgent);
    const normalizedTargetBrowsers = this.normalizeTargetBrowsers(
      targetBrowsers
    );
    const passed = normalizedTargetBrowsers.some(
      targetBrowser =>
        currentBrowser.name.toLowerCase() === targetBrowser.name &&
        currentBrowser.major >= targetBrowser.major
    );

    return passed;
  }
  normalizeTargetBrowsers(targetBrowsers) {
    return targetBrowsers
      .map(browser => {
        const [name, version] = browser.split(' ');

        return {
          major: version === 'all' ? 'all' : /\d+/.exec(version)[0],
          name,
          version,
        };
      })
      .reduce((ret, browser) => {
        const found = ret.find(item => item.name === browser.name);

        if (!found) {
          ret.push(browser);
          return ret;
        }
        if (browser.major < found.major) {
          ret.splice(ret.indexOf(found), 1, browser);
          return ret;
        }
        return ret;
      }, []);
  }
}
