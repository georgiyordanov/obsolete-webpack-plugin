(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Obsolete = factory());
}(this, (function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
	: Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = {
	  version: '2.6.4'
	};
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding


	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;

	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };

	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };

	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }

	  return function ()
	  /* ...args */
	  {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var document$1 = _global.document; // typeof document.createElement is 'object' in old IE


	var is = _isObject(document$1) && _isObject(document$1.createElement);

	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])
	 // instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string


	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;
	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) {
	    /* empty */
	  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;

	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) continue; // export native or passed

	    out = own ? target[key] : source[key]; // prevent global pollution for namespaces

	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global) // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0:
	              return new C();

	            case 1:
	              return new C(a);

	            case 2:
	              return new C(a, b);
	          }

	          return new C(a, b, c);
	        }

	        return C.apply(this, arguments);
	      };

	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F; // make static versions for prototype methods
	    }(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out; // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%

	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out; // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%

	      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
	    }
	  }
	}; // type bitmap


	$export.F = 1; // forced

	$export.G = 2; // global

	$export.S = 4; // static

	$export.P = 8; // proto

	$export.B = 16; // bind

	$export.W = 32; // wrap

	$export.U = 64; // safe

	$export.R = 128; // real proto method for `library`

	var _export = $export;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	 // eslint-disable-next-line no-prototype-builtins


	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings




	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;

	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength


	var min = Math.min;

	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes






	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value; // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare

	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++]; // eslint-disable-next-line no-self-compare

	      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    }
	    return !IS_INCLUDES && -1;
	  };
	};

	var _library = true;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});
	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: _library ? 'pure' : 'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();

	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');



	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);

	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;

	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key); // Don't enum bug & hidden keys


	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }

	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)




	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$1 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	// 7.1.13 ToObject(argument)


	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	var $assign = Object.assign; // should work with symbols and should have deterministic property order (V8 bug)

	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {}; // eslint-disable-next-line no-undef

	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;

	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;

	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  }

	  return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', {
	  assign: _objectAssign
	});

	var assign = _core.Object.assign;

	var assign$1 = assign;

	var _extends_1 = createCommonjsModule(function (module) {
	function _extends() {
	  module.exports = _extends = assign$1 || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	module.exports = _extends;
	});

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)


	_export(_export.S + _export.F * !_descriptors, 'Object', {
	  defineProperty: _objectDp.f
	});

	var $Object = _core.Object;

	var defineProperty = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$1 = defineProperty;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    defineProperty$1(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var defineProperty$2 = _defineProperty;

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

	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
	var toString$1 = Object.prototype.toString;
	/**
	 * Execute a provided function once for each array element.
	 *
	 * @param {any[]} arr
	 * @param {function(any, number, any[])} callback
	 * @param {any} [thisArg]
	 */

	function forEach(arr, callback, thisArg) {
	  if (toString$1.call(arr) !== '[object Array]') {
	    throw new TypeError('Parameter `arr` is not an array.');
	  }

	  if (toString$1.call(callback) !== '[object Function]') {
	    throw new TypeError('Parameter `callback` is not an array.');
	  }

	  for (var i in arr) {
	    callback.call(thisArg, arr[i], i, arr);
	  }
	}
	/**
	 * Creates a new array with the results of calling a provided function on every
	 * element in the calling array.
	 *
	 * @param {any[]} arr
	 * @param {function(any, number, any[])} callback
	 * @param {any} [thisArg]
	 */


	function map(arr, callback, thisArg) {
	  if (toString$1.call(arr) !== '[object Array]') {
	    throw new TypeError('Parameter `arr` is not an array.');
	  }

	  if (toString$1.call(callback) !== '[object Function]') {
	    throw new TypeError('Parameter `callback` is not an array.');
	  }

	  var result = new Array(arr.length);

	  for (var i in arr) {
	    var item = callback.call(thisArg, arr[i], i, arr);
	    result[i] = item;
	  }

	  return result;
	}
	/**
	 * Create a new array with all elements that pass the test implemented by the provided function.
	 *
	 * @param {any[]} arr
	 * @param {function(any, number, any[])} callback
	 * @param {any} [thisArg]
	 */


	function filter(arr, callback, thisArg) {
	  if (toString$1.call(arr) !== '[object Array]') {
	    throw new TypeError('Parameter `arr` is not an array.');
	  }

	  if (toString$1.call(callback) !== '[object Function]') {
	    throw new TypeError('Parameter `callback` is not an array.');
	  }

	  var result = [];

	  for (var i in arr) {
	    if (callback.call(thisArg, arr[i], i, arr)) {
	      result.push(arr[i]);
	    }
	  }

	  return result;
	}
	/**
	 * Test whether at least one element in the array passes the test implemented
	 * by the provided function.
	 *
	 * @param {any[]} arr
	 * @param {function(any, number, any[])} callback
	 * @param {any} [thisArg]
	 */


	function some(arr, callback, thisArg) {
	  if (toString$1.call(arr) !== '[object Array]') {
	    throw new TypeError('Parameter `arr` is not an array.');
	  }

	  if (toString$1.call(callback) !== '[object Function]') {
	    throw new TypeError('Parameter `callback` is not an array.');
	  }

	  for (var i in arr) {
	    if (callback.call(thisArg, arr[i], i, arr)) {
	      return true;
	    }
	  }

	  return false;
	}
	/**
	 * Determine whether an array includes a certain item.
	 *
	 * @param {any[]} arr
	 * @param {any} item
	 * @param {number} [fromIndex]
	 */


	function includes(arr, item, fromIndex) {
	  if (fromIndex === void 0) {
	    fromIndex = 0;
	  }

	  if (toString$1.call(arr) !== '[object Array]') {
	    throw new TypeError('Parameter `arr` is not an array.');
	  }

	  for (var i = fromIndex; i < arr.length; i++) {
	    if (arr[i] === item) {
	      return true;
	    }
	  }

	  return false;
	}
	/**
	 * Get an array of a given object's own enumerable keys.
	 *
	 * @param {Object<string, any>} obj
	 */


	function keys(obj) {
	  if (!includes(['[object Object]', '[object Function]'], toString$1.call(obj))) {
	    throw new TypeError('Parameter `obj` is not a object.');
	  }

	  var result = [];

	  for (var key in obj) {
	    if (hasOwnProperty$1.call(obj, key)) {
	      result.push(key);
	    }
	  }

	  return result;
	}
	/**
	 * Get an array of a given object's own enumerable values.
	 *
	 * @param {Object<string, any>} obj
	 */


	function values(obj) {
	  if (!includes(['[object Object]', '[object Function]'], toString$1.call(obj))) {
	    throw new TypeError('Parameter `obj` is not a object.');
	  }

	  var result = [];

	  for (var key in obj) {
	    if (hasOwnProperty$1.call(obj, key)) {
	      result.push(obj[key]);
	    }
	  }

	  return result;
	}
	/**
	 * Get an array of a given object's own enumerable [key, value] pairs.
	 *
	 * @param {Object<string, any>} obj
	 */


	function entries(obj) {
	  if (!includes(['[object Object]', '[object Function]'], toString$1.call(obj))) {
	    throw new TypeError('Parameter `obj` is not a object.');
	  }

	  var ownKeys = keys(obj);
	  var pairs = new Array(ownKeys.length);

	  for (var i in ownKeys) {
	    pairs[i] = [ownKeys[i], obj[ownKeys[i]]];
	  }

	  return pairs;
	}
	/**
	 * Bind function to a specific context.
	 *
	 * @param {Object<string, any>} obj
	 */


	function bind(func, context) {
	  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  if (toString$1.call(func) !== '[object Function]') {
	    throw new TypeError('Parameter `func` is not a function.');
	  }

	  return function () {
	    for (var _len2 = arguments.length, boundArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      boundArgs[_key2] = arguments[_key2];
	    }

	    return func.apply(context, [].concat(args, boundArgs));
	  };
	}

	var UAParser =
	/*#__PURE__*/
	function () {
	  function UAParser() {
	    this.rBrowserMap = {
	      /**
	       * IE for desktop.
	       */
	      ie: {
	        includes: [/Trident\/[.\w]+.+?rv:((\d+)[.\w]*)/i, /MSIE ((\d+\.\d+)[.\w]*)/i],
	        excludes: [/Mobile/i]
	      },

	      /**
	       * Edge for desktop.
	       */
	      edge: {
	        includes: [/Edge\/((\d+)[.\w]*)/i],
	        excludes: [/Mobile/i]
	      },

	      /**
	       * Chrome for desktop.
	       */
	      chrome: {
	        includes: [/Chrome\/((\d+)[.\w]*)/i],
	        excludes: [/Mobile/i]
	      },

	      /**
	       * Safari for desktop.
	       */
	      safari: {
	        includes: [/Version\/((\d+\.\d+)[.\w]*).+Safari/i],
	        excludes: [/Mobile/i]
	      },

	      /**
	       * Firefox for desktop.
	       */
	      firefox: {
	        includes: [/Firefox\/((\d+\.\d+)[.\w]*)/i],
	        excludes: [/Mobile/i]
	      },

	      /**
	       * Opera for desktop.
	       *
	       */
	      opera: {
	        includes: [/OPR\/((\d+)[.\w]*)/i, /Presto\/[.\w]+.+Version\/((\d+\.\d)[.\w]*)/i, /Opera\/((\d+\.\d)[.\w]*)/i],
	        excludes: [/Mobile|Mobi|Tablet/i]
	      },

	      /**
	       * Android webview.
	       */
	      android: [/wv.+?Chrome\/((\d+)[.\w]*)/i],

	      /**
	       * iOS.
	       */
	      ios_saf: [/(iPad|iPhone).+OS ((\d+_\d+)\w*)/i],

	      /**
	       * Chrome for mobile.
	       */
	      and_chr: {
	        includes: [/Chrome\/((\d+)[.\w]*).+Mobile/i],
	        excludes: [/wv/i]
	      }
	    };
	  }
	  /**
	   * Convert userAgent to a group of matched `Browser` instances.
	   *
	   * @param {string} userAgent
	   * @returns {Browser[]}
	   */


	  var _proto = UAParser.prototype;

	  _proto.parse = function parse(userAgent) {
	    var browsers = [];
	    forEach(entries(this.rBrowserMap), function (_ref) {
	      var name = _ref[0],
	          rBrowsers = _ref[1];
	      var matches;

	      if (rBrowsers.excludes && some(rBrowsers.excludes, function (rBrowser) {
	        return rBrowser.exec(userAgent);
	      })) {
	        return;
	      }

	      if (Object.prototype.toString.call(rBrowsers) !== '[object Array]') {
	        rBrowsers = rBrowsers.includes;
	      }

	      for (var i in rBrowsers) {
	        matches = rBrowsers[i].exec(userAgent);

	        if (matches) {
	          browsers.push(new Browser(name, matches[1].replace(/_/g, '.'), matches[2].replace(/_/g, '.')));
	          break;
	        }
	      }
	    });
	    return browsers;
	  };

	  return UAParser;
	}();

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
	  forEach([version, comparedVersion], function (version) {
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
	      close.addEventListener('click', bind(this.handleClose, this));
	    } else if (close.attachEvent) {
	      close.attachEvent('onclick', bind(this.handleClose, this));
	    }
	  }
	  /**
	   * Close event handler.
	   *
	   */
	  ;

	  _proto.handleClose = function handleClose() {
	    forEach(this.refs, function (node) {
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
	      forEach(entries(attributes), function (_ref) {
	        var key = _ref[0],
	            value = _ref[1];
	        element.setAttribute(key, value);
	      });
	    }

	    return element;
	  };

	  return Alert;
	}();

	// 20.3.3.1 / 15.9.4.4 Date.now()


	_export(_export.S, 'Date', {
	  now: function () {
	    return new Date().getTime();
	  }
	});

	var now = _core.Date.now;

	var now$1 = now;

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
	    var elapsedTime = now$1() - start;
	    callback({
	      didTimeout: false,
	      timeRemaining: function timeRemaining() {
	        return Math.max(0, 50 - elapsedTime);
	      }
	    });
	  }, 1);
	}

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
	    this.options = _extends_1({}, Obsolete.defaultOptions, options);
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

	defineProperty$2(Obsolete, "defaultOptions", {
	  template: '<div>Your browser is not supported. <button id="obsoleteClose">&times;</button></div>',
	  position: 'afterbegin',
	  promptOnNonTargetBrowser: false,
	  promptOnUnknownBrowser: true
	});

	return Obsolete;

})));
