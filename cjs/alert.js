"use strict";

exports.__esModule = true;
exports.default = void 0;

var _miniBuiltIns = require("./lib/mini-built-ins");

var Alert =
/*#__PURE__*/
function () {
  function Alert() {
    this.refs = [];
  }
  /**
   * Prompt message to user.
   *
   * @param {string} template
   * @param {string} position
   */


  var _proto = Alert.prototype;

  _proto.prompt = function prompt(template, position) {
    var fragment = document.createDocumentFragment();
    var placeholderElement = this.createElement('div');
    placeholderElement.innerHTML = template;

    while (true) {
      var firstChild = placeholderElement.firstChild;

      if (!firstChild) {
        break;
      }

      if (firstChild.nodeType === 1 && firstChild.nodeName === 'SCRIPT') {
        var script = this.createElement('script');
        script.innerHTML = firstChild.innerHTML;
        fragment.appendChild(script);
        this.refs.push(script);
        placeholderElement.removeChild(firstChild);
      } else {
        fragment.appendChild(firstChild);
        this.refs.push(firstChild);
      }
    }

    this.bindEvents(fragment);

    if (position === 'afterbegin') {
      document.body.insertBefore(fragment, document.body.firstChild);
    }

    if (position === 'beforeend') {
      document.body.appendChild(fragment);
    }
  }
  /**
   * Bind events for close button.
   *
   * @param {DocumentFragment} fragment
   */
  ;

  _proto.bindEvents = function bindEvents(fragment) {
    var close;

    if (fragment.querySelector) {
      close = fragment.querySelector('#obsoleteClose');
    } else if (fragment.getElementById) {
      close = fragment.getElementById('obsoleteClose');
    }

    if (!close) {
      return;
    }

    if (close.addEventListener) {
      close.addEventListener('click', (0, _miniBuiltIns.bind)(this.handleClose, this));
    } else if (close.attachEvent) {
      close.attachEvent('onclick', (0, _miniBuiltIns.bind)(this.handleClose, this));
    }
  }
  /**
   * Close event handler.
   *
   */
  ;

  _proto.handleClose = function handleClose() {
    (0, _miniBuiltIns.forEach)(this.refs, function (node) {
      node.parentNode.removeChild(node);
    });
  }
  /**
   * Create DOM element.
   *
   * @param {string} tag
   * @param {Object<string, string>} [attributes]
   * @returns {HTMLElement}
   */
  ;

  _proto.createElement = function createElement(tag, attributes) {
    var element = document.createElement(tag);

    if (attributes) {
      (0, _miniBuiltIns.forEach)((0, _miniBuiltIns.entries)(attributes), function (_ref) {
        var key = _ref[0],
            value = _ref[1];
        element.setAttribute(key, value);
      });
    }

    return element;
  };

  return Alert;
}();

var _default = Alert;
exports.default = _default;