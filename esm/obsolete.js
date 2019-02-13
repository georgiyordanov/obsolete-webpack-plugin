import _extends from "@babel/runtime-corejs2/helpers/extends";
import _defineProperty from "@babel/runtime-corejs2/helpers/defineProperty";
import Detective from './detective';
import Alert from './alert';
import { requestIdleCallback } from './lib/scheduler';

var Obsolete =
/*#__PURE__*/
function () {
  /**
   * @param {Object} [options]
   * @param {string} [options.template] The prompt html template. It accepts any document fragment.
   * @param {string} [options.position='afterbegin'] If set 'afterbegin', the template will be injected
   * into the start of body. If set 'beforeend', the template will be injected into the end of body.
   * @param {boolean} [options.promptOnNonTargetBrowser=false] If the current browser useragent
   * doesn't match one of the target browsers, it's considered as unsupported. Thus, the prompt
   * will be shown. E.g, your browserslist configuration is `ie > 8`, by default, the prompt won't
   * be shown on Chrome or Safari browser.
   * @param {boolean} [options.promptOnUnknownBrowser=true] If the current browser useragent is
   * unknown, the prompt will be shown.
   */
  function Obsolete(options) {
    this.options = _extends({}, Obsolete.defaultOptions, options);
    this.detective = new Detective();
    this.alert = null;
  }
  /**
   * Test browser compatibility.
   *
   * @param {string[]} browsers Browser names in Can I Use.
   * @param {function} done Callback when the template is injected in finish.
   * @returns {boolean}
   */


  var _proto = Obsolete.prototype;

  _proto.test = function test(browsers, done) {
    var _this = this;

    if (!browsers.length) {
      throw new Error('Parameter `browsers` is empty.');
    }

    var passed = this.detective.detect(navigator.userAgent, browsers, this.options.promptOnNonTargetBrowser, this.options.promptOnUnknownBrowser);

    if (!passed) {
      requestIdleCallback(function () {
        if (_this.alert) {
          _this.alert.handleClose();
        } else {
          _this.alert = new Alert();
        }

        _this.alert.prompt(_this.options.template, _this.options.position);

        done && done();
      });
      return false;
    }

    return true;
  };

  return Obsolete;
}();

_defineProperty(Obsolete, "defaultOptions", {
  template: '<div>Your browser is not supported. <button id="obsoleteClose">&times;</button></div>',
  position: 'afterbegin',
  promptOnNonTargetBrowser: false,
  promptOnUnknownBrowser: true
});

export default Obsolete;