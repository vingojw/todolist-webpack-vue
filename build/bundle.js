/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	var Vue = __webpack_require__(1);

	__webpack_require__(68);
	__webpack_require__(77);

	new Vue({
		el:'#app',
		data:{
			newTask: {title:'',completed:false},
			editingTask: false,
			tasks:[
				{title: 'Go to grocery store', completed: false },
	            { title: 'Do the dishes', completed: false },
	            { title: 'Call John', completed: true }
	        ]
		},
		methods:{
			removeTask: function(task,index){
				 
				//this.tasks.$remove(index);  删除下标
				this.tasks.$remove(task);//删除对象
			},
			addTask:function(){
				if(!this.newTask.title){
					return;
				}
		 		this.tasks.push({
		            title: this.newTask.title,
		            completed: false
		        });

		        this.newTask = { title: '', completed: false};
			},
			startEditingTask:function(task){
				 this.newTask = task;
	             this.editingTask = true;
			},
			pressedEnter:function(){
				if(this.editingTask){
					this.removeIfEmpty();
				}else{
					this.addTask();
				}
				this.newTask = { title: '', completed: false};
	            this.editingTask = false;
			},
			removeIfEmpty:function(){
				if(!this.newTask.title){
					this.removeTask(this.newTask);
				}
			}
		}
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var extend = _.extend

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefiexed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue (options) {
	  this._init(options)
	}

	/**
	 * Mixin global API
	 */

	extend(Vue, __webpack_require__(11))

	/**
	 * Vue and every constructor that extends Vue has an
	 * associated options object, which can be accessed during
	 * compilation steps as `this.constructor.options`.
	 *
	 * These can be seen as the default options of every
	 * Vue instance.
	 */

	Vue.options = {
	  replace: true,
	  directives: __webpack_require__(27),
	  elementDirectives: __webpack_require__(49),
	  filters: __webpack_require__(52),
	  transitions: {},
	  components: {},
	  partials: {}
	}

	/**
	 * Build up the prototype
	 */

	var p = Vue.prototype

	/**
	 * $data has a setter which does a bunch of
	 * teardown/setup work
	 */

	Object.defineProperty(p, '$data', {
	  get: function () {
	    return this._data
	  },
	  set: function (newData) {
	    if (newData !== this._data) {
	      this._setData(newData)
	    }
	  }
	})

	/**
	 * Mixin internal instance methods
	 */

	extend(p, __webpack_require__(54))
	extend(p, __webpack_require__(55))
	extend(p, __webpack_require__(56))
	extend(p, __webpack_require__(60))
	extend(p, __webpack_require__(62))

	/**
	 * Mixin public API methods
	 */

	extend(p, __webpack_require__(63))
	extend(p, __webpack_require__(64))
	extend(p, __webpack_require__(65))
	extend(p, __webpack_require__(66))
	extend(p, __webpack_require__(67))

	module.exports = _.Vue = Vue


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var lang = __webpack_require__(3)
	var extend = lang.extend

	extend(exports, lang)
	extend(exports, __webpack_require__(4))
	extend(exports, __webpack_require__(5))
	extend(exports, __webpack_require__(8))
	extend(exports, __webpack_require__(9))
	extend(exports, __webpack_require__(10))


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Check is a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	exports.isReserved = function (str) {
	  var c = (str + '').charCodeAt(0)
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	exports.toString = function (value) {
	  return value == null
	    ? ''
	    : value.toString()
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	exports.toNumber = function (value) {
	  if (typeof value !== 'string') {
	    return value
	  } else {
	    var parsed = Number(value)
	    return isNaN(parsed)
	      ? value
	      : parsed
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	exports.toBoolean = function (value) {
	  return value === 'true'
	    ? true
	    : value === 'false'
	      ? false
	      : value
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	exports.stripQuotes = function (str) {
	  var a = str.charCodeAt(0)
	  var b = str.charCodeAt(str.length - 1)
	  return a === b && (a === 0x22 || a === 0x27)
	    ? str.slice(1, -1)
	    : false
	}

	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	exports.camelize = function (str) {
	  return str.replace(/-(\w)/g, toUpper)
	}

	function toUpper (_, c) {
	  return c ? c.toUpperCase() : ''
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	exports.hyphenate = function (str) {
	  return str
	    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
	    .toLowerCase()
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g
	exports.classify = function (str) {
	  return str.replace(classifyRE, toUpper)
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	exports.bind = function (fn, ctx) {
	  return function (a) {
	    var l = arguments.length
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	exports.toArray = function (list, start) {
	  start = start || 0
	  var i = list.length - start
	  var ret = new Array(i)
	  while (i--) {
	    ret[i] = list[i + start]
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	exports.extend = function (to, from) {
	  for (var key in from) {
	    to[key] = from[key]
	  }
	  return to
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	exports.isObject = function (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString
	exports.isPlainObject = function (obj) {
	  return toString.call(obj) === '[object Object]'
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	exports.isArray = Array.isArray

	/**
	 * Define a non-enumerable property
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	exports.define = function (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  })
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	exports.debounce = function (func, wait) {
	  var timeout, args, context, timestamp, result
	  var later = function () {
	    var last = Date.now() - timestamp
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last)
	    } else {
	      timeout = null
	      result = func.apply(context, args)
	      if (!timeout) context = args = null
	    }
	  }
	  return function () {
	    context = this
	    args = arguments
	    timestamp = Date.now()
	    if (!timeout) {
	      timeout = setTimeout(later, wait)
	    }
	    return result
	  }
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	exports.indexOf = function (arr, obj) {
	  for (var i = 0, l = arr.length; i < l; i++) {
	    if (arr[i] === obj) return i
	  }
	  return -1
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	exports.cancellable = function (fn) {
	  var cb = function () {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments)
	    }
	  }
	  cb.cancel = function () {
	    cb.cancelled = true
	  }
	  return cb
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	// can we use __proto__?
	exports.hasProto = '__proto__' in {}

	// Browser environment sniffing
	var inBrowser = exports.inBrowser =
	  typeof window !== 'undefined' &&
	  Object.prototype.toString.call(window) !== '[object Object]'

	exports.isIE9 =
	  inBrowser &&
	  navigator.userAgent.toLowerCase().indexOf('msie 9.0') > 0

	exports.isAndroid =
	  inBrowser &&
	  navigator.userAgent.toLowerCase().indexOf('android') > 0

	// Transition property/event sniffing
	if (inBrowser && !exports.isIE9) {
	  var isWebkitTrans =
	    window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined
	  var isWebkitAnim =
	    window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined
	  exports.transitionProp = isWebkitTrans
	    ? 'WebkitTransition'
	    : 'transition'
	  exports.transitionEndEvent = isWebkitTrans
	    ? 'webkitTransitionEnd'
	    : 'transitionend'
	  exports.animationProp = isWebkitAnim
	    ? 'WebkitAnimation'
	    : 'animation'
	  exports.animationEndEvent = isWebkitAnim
	    ? 'webkitAnimationEnd'
	    : 'animationend'
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	exports.nextTick = (function () {
	  var callbacks = []
	  var pending = false
	  var timerFunc
	  function handle () {
	    pending = false
	    var copies = callbacks.slice(0)
	    callbacks = []
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]()
	    }
	  }
	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined') {
	    var counter = 1
	    var observer = new MutationObserver(handle)
	    var textNode = document.createTextNode(counter)
	    observer.observe(textNode, {
	      characterData: true
	    })
	    timerFunc = function () {
	      counter = (counter + 1) % 2
	      textNode.data = counter
	    }
	  } else {
	    timerFunc = setTimeout
	  }
	  return function (cb, ctx) {
	    var func = ctx
	      ? function () { cb.call(ctx) }
	      : cb
	    callbacks.push(func)
	    if (pending) return
	    pending = true
	    timerFunc(handle, 0)
	  }
	})()


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var config = __webpack_require__(7)

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	exports.query = function (el) {
	  if (typeof el === 'string') {
	    var selector = el
	    el = document.querySelector(el)
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Cannot find element: ' + selector
	      )
	    }
	  }
	  return el
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed byy doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	exports.inDoc = function (node) {
	  var doc = document.documentElement
	  var parent = node && node.parentNode
	  return doc === node ||
	    doc === parent ||
	    !!(parent && parent.nodeType === 1 && (doc.contains(parent)))
	}

	/**
	 * Extract an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} attr
	 */

	exports.attr = function (node, attr) {
	  attr = config.prefix + attr
	  var val = node.getAttribute(attr)
	  if (val !== null) {
	    node.removeAttribute(attr)
	  }
	  return val
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	exports.before = function (el, target) {
	  target.parentNode.insertBefore(el, target)
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	exports.after = function (el, target) {
	  if (target.nextSibling) {
	    exports.before(el, target.nextSibling)
	  } else {
	    target.parentNode.appendChild(el)
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	exports.remove = function (el) {
	  el.parentNode.removeChild(el)
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	exports.prepend = function (el, target) {
	  if (target.firstChild) {
	    exports.before(el, target.firstChild)
	  } else {
	    target.appendChild(el)
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	exports.replace = function (target, el) {
	  var parent = target.parentNode
	  if (parent) {
	    parent.replaceChild(el, target)
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	exports.on = function (el, event, cb) {
	  el.addEventListener(event, cb)
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	exports.off = function (el, event, cb) {
	  el.removeEventListener(event, cb)
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {Strong} cls
	 */

	exports.addClass = function (el, cls) {
	  if (el.classList) {
	    el.classList.add(cls)
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' '
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim())
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {Strong} cls
	 */

	exports.removeClass = function (el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls)
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' '
	    var tar = ' ' + cls + ' '
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ')
	    }
	    el.setAttribute('class', cur.trim())
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element}
	 */

	exports.extractContent = function (el, asFragment) {
	  var child
	  var rawContent
	  /* istanbul ignore if */
	  if (
	    exports.isTemplate(el) &&
	    el.content instanceof DocumentFragment
	  ) {
	    el = el.content
	  }
	  if (el.hasChildNodes()) {
	    exports.trimNode(el)
	    rawContent = asFragment
	      ? document.createDocumentFragment()
	      : document.createElement('div')
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	    /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child)
	    }
	  }
	  return rawContent
	}

	/**
	 * Trim possible empty head/tail textNodes inside a parent.
	 *
	 * @param {Node} node
	 */

	exports.trimNode = function (node) {
	  trim(node, node.firstChild)
	  trim(node, node.lastChild)
	}

	function trim (parent, node) {
	  if (node && node.nodeType === 3 && !node.data.trim()) {
	    parent.removeChild(node)
	  }
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	exports.isTemplate = function (el) {
	  return el.tagName &&
	    el.tagName.toLowerCase() === 'template'
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - component
	 * - repeat
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	exports.createAnchor = function (content, persist) {
	  return config.debug
	    ? document.createComment(content)
	    : document.createTextNode(persist ? ' ' : '')
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {

	  /**
	   * The prefix to look for when parsing directives.
	   *
	   * @type {String}
	   */

	  prefix: 'v-',

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Strict mode.
	   * Disables asset lookup in the view parent chain.
	   */

	  strict: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether allow observer to alter data objects'
	   * __proto__.
	   *
	   * @type {Boolean}
	   */

	  proto: true,

	  /**
	   * Whether to parse mustache tags in templates.
	   *
	   * @type {Boolean}
	   */

	  interpolate: true,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: [
	    'component',
	    'directive',
	    'elementDirective',
	    'filter',
	    'transition',
	    'partial'
	  ],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}

	/**
	 * Interpolation delimiters.
	 * We need to mark the changed flag so that the text parser
	 * knows it needs to recompile the regex.
	 *
	 * @type {Array<String>}
	 */

	var delimiters = ['{{', '}}']
	Object.defineProperty(module.exports, 'delimiters', {
	  get: function () {
	    return delimiters
	  },
	  set: function (val) {
	    delimiters = val
	    this._delimitersChanged = true
	  }
	})


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var config = __webpack_require__(7)
	var extend = _.extend

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = Object.create(null)

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData (to, from) {
	  var key, toVal, fromVal
	  for (key in from) {
	    toVal = to[key]
	    fromVal = from[key]
	    if (!to.hasOwnProperty(key)) {
	      to.$add(key, fromVal)
	    } else if (_.isObject(toVal) && _.isObject(fromVal)) {
	      mergeData(toVal, fromVal)
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.'
	      )
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	}

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'The "el" option should be a function ' +
	      'that returns a per-instance value in component ' +
	      'definitions.'
	    )
	    return
	  }
	  var ret = childVal || parentVal
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function'
	    ? ret.call(vm)
	    : ret
	}

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.created =
	strats.ready =
	strats.attached =
	strats.detached =
	strats.beforeCompile =
	strats.compiled =
	strats.beforeDestroy =
	strats.destroyed =
	strats.props = function (parentVal, childVal) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : _.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	/**
	 * 0.11 deprecation warning
	 */

	strats.paramAttributes = function () {
	  /* istanbul ignore next */
	  process.env.NODE_ENV !== 'production' && _.warn(
	    '"paramAttributes" option has been deprecated in 0.12. ' +
	    'Use "props" instead.'
	  )
	}

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal)
	  return childVal
	    ? extend(res, guardArrayAssets(childVal))
	    : res
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets
	})

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch =
	strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal
	  if (!parentVal) return childVal
	  var ret = {}
	  extend(ret, parentVal)
	  for (var key in childVal) {
	    var parent = ret[key]
	    var child = childVal[key]
	    if (parent && !_.isArray(parent)) {
	      parent = [parent]
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child]
	  }
	  return ret
	}

	/**
	 * Other object hashes.
	 */

	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal
	  if (!parentVal) return childVal
	  var ret = Object.create(parentVal)
	  extend(ret, childVal)
	  return ret
	}

	/**
	 * Default strategy.
	 */

	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	}

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents (options) {
	  if (options.components) {
	    var components = options.components =
	      guardArrayAssets(options.components)
	    var def
	    var ids = Object.keys(components)
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i]
	      if (_.commonTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'Do not use built-in HTML elements as component ' +
	          'id: ' + key
	        )
	        continue
	      }
	      def = components[key]
	      if (_.isPlainObject(def)) {
	        def.id = def.id || key
	        components[key] = def._Ctor || (def._Ctor = _.Vue.extend(def))
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps (options) {
	  var props = options.props
	  if (_.isPlainObject(props)) {
	    options.props = Object.keys(props).map(function (key) {
	      var val = props[key]
	      if (!_.isPlainObject(val)) {
	        val = { type: val }
	      }
	      val.name = key
	      return val
	    })
	  } else if (_.isArray(props)) {
	    options.props = props.map(function (prop) {
	      return typeof prop === 'string'
	        ? { name: prop }
	        : prop
	    })
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets (assets) {
	  if (_.isArray(assets)) {
	    var res = {}
	    var i = assets.length
	    var asset
	    while (i--) {
	      asset = assets[i]
	      var id = asset.id || (asset.options && asset.options.id)
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'Array-syntax assets must provide an id field.'
	        )
	      } else {
	        res[id] = asset
	      }
	    }
	    return res
	  }
	  return assets
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	exports.mergeOptions = function merge (parent, child, vm) {
	  guardComponents(child)
	  guardProps(child)
	  var options = {}
	  var key
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = merge(parent, child.mixins[i], vm)
	    }
	  }
	  for (key in parent) {
	    mergeField(key)
	  }
	  for (key in child) {
	    if (!(parent.hasOwnProperty(key))) {
	      mergeField(key)
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat
	    options[key] = strat(parent[key], child[key], vm, key)
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @return {Object|Function}
	 */

	exports.resolveAsset = function resolve (options, type, id) {
	  var camelizedId = _.camelize(id)
	  var asset = options[type][id] || options[type][camelizedId]
	  while (
	    !asset && options._parent &&
	    (!config.strict || options._repeat)
	  ) {
	    options = options._parent.$options
	    asset = options[type][id] || options[type][camelizedId]
	  }
	  return asset
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {String|undefined}
	 */

	exports.commonTagRE = /^(div|p|span|img|a|br|ul|ol|li|h1|h2|h3|h4|h5|code|pre)$/
	exports.checkComponent = function (el, options) {
	  var tag = el.tagName.toLowerCase()
	  if (tag === 'component') {
	    // dynamic syntax
	    var exp = el.getAttribute('is')
	    el.removeAttribute('is')
	    return exp
	  } else if (
	    !exports.commonTagRE.test(tag) &&
	    _.resolveAsset(options, 'components', tag)
	  ) {
	    return tag
	  /* eslint-disable no-cond-assign */
	  } else if (tag = _.attr(el, 'component')) {
	  /* eslint-enable no-cond-assign */
	    return tag
	  }
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 * The vm may have inherit:true so we need to make sure
	 * we don't accidentally overwrite parent value.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	exports.initProp = function (vm, prop, value) {
	  if (exports.assertProp(prop, value)) {
	    var key = prop.path
	    if (key in vm) {
	      _.define(vm, key, value, true)
	    } else {
	      vm[key] = value
	    }
	    vm._data[key] = value
	  }
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 */

	exports.assertProp = function (prop, value) {
	  // if a prop is not provided and is not required,
	  // skip the check.
	  if (prop.raw === null && !prop.required) {
	    return true
	  }
	  var options = prop.options
	  var type = options.type
	  var valid = true
	  var expectedType
	  if (type) {
	    if (type === String) {
	      expectedType = 'string'
	      valid = typeof value === expectedType
	    } else if (type === Number) {
	      expectedType = 'number'
	      valid = typeof value === 'number'
	    } else if (type === Boolean) {
	      expectedType = 'boolean'
	      valid = typeof value === 'boolean'
	    } else if (type === Function) {
	      expectedType = 'function'
	      valid = typeof value === 'function'
	    } else if (type === Object) {
	      expectedType = 'object'
	      valid = _.isPlainObject(value)
	    } else if (type === Array) {
	      expectedType = 'array'
	      valid = _.isArray(value)
	    } else {
	      valid = value instanceof type
	    }
	  }
	  if (!valid) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Invalid prop: type check failed for ' +
	      prop.path + '="' + prop.raw + '".' +
	      ' Expected ' + formatType(expectedType) +
	      ', got ' + formatValue(value) + '.'
	    )
	    return false
	  }
	  var validator = options.validator
	  if (validator) {
	    if (!validator.call(null, value)) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Invalid prop: custom validator check failed for ' +
	        prop.path + '="' + prop.raw + '"'
	      )
	      return false
	    }
	  }
	  return true
	}

	function formatType (val) {
	  return val
	    ? val.charAt(0).toUpperCase() + val.slice(1)
	    : 'custom type'
	}

	function formatValue (val) {
	  return Object.prototype.toString.call(val).slice(8, -1)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Enable debug utilities.
	 */

	if (process.env.NODE_ENV !== 'production') {

	  var config = __webpack_require__(7)
	  var hasConsole = typeof console !== 'undefined'

	  /**
	   * Log a message.
	   *
	   * @param {String} msg
	   */

	  exports.log = function (msg) {
	    if (hasConsole && config.debug) {
	      console.log('[Vue info]: ' + msg)
	    }
	  }

	  /**
	   * We've got a problem here.
	   *
	   * @param {String} msg
	   */

	  exports.warn = function (msg, e) {
	    if (hasConsole && (!config.silent || config.debug)) {
	      console.warn('[Vue warn]: ' + msg)
	      /* istanbul ignore if */
	      if (config.debug) {
	        console.warn((e || new Error('Warning Stack Trace')).stack)
	      }
	    }
	  }

	  /**
	   * Assert asset exists
	   */

	  exports.assertAsset = function (val, type, id) {
	    /* istanbul ignore if */
	    if (type === 'directive') {
	      if (id === 'with') {
	        exports.warn(
	          'v-with has been deprecated in ^0.12.0. ' +
	          'Use props instead.'
	        )
	        return
	      }
	      if (id === 'events') {
	        exports.warn(
	          'v-events has been deprecated in ^0.12.0. ' +
	          'Pass down methods as callback props instead.'
	        )
	        return
	      }
	    }
	    if (!val) {
	      exports.warn('Failed to resolve ' + type + ': ' + id)
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var config = __webpack_require__(7)

	/**
	 * Expose useful internals
	 */

	exports.util = _
	exports.config = config
	exports.nextTick = _.nextTick
	exports.compiler = __webpack_require__(12)

	exports.parsers = {
	  path: __webpack_require__(22),
	  text: __webpack_require__(15),
	  template: __webpack_require__(24),
	  directive: __webpack_require__(17),
	  expression: __webpack_require__(21)
	}

	/**
	 * Each instance constructor, including Vue, has a unique
	 * cid. This enables us to create wrapped "child
	 * constructors" for prototypal inheritance and cache them.
	 */

	exports.cid = 0
	var cid = 1

	/**
	 * Class inheritance
	 *
	 * @param {Object} extendOptions
	 */

	exports.extend = function (extendOptions) {
	  extendOptions = extendOptions || {}
	  var Super = this
	  var Sub = createClass(
	    extendOptions.name ||
	    Super.options.name ||
	    'VueComponent'
	  )
	  Sub.prototype = Object.create(Super.prototype)
	  Sub.prototype.constructor = Sub
	  Sub.cid = cid++
	  Sub.options = _.mergeOptions(
	    Super.options,
	    extendOptions
	  )
	  Sub['super'] = Super
	  // allow further extension
	  Sub.extend = Super.extend
	  // create asset registers, so extended classes
	  // can have their private assets too.
	  config._assetTypes.forEach(function (type) {
	    Sub[type] = Super[type]
	  })
	  return Sub
	}

	/**
	 * A function that returns a sub-class constructor with the
	 * given name. This gives us much nicer output when
	 * logging instances in the console.
	 *
	 * @param {String} name
	 * @return {Function}
	 */

	function createClass (name) {
	  return new Function(
	    'return function ' + _.classify(name) +
	    ' (options) { this._init(options) }'
	  )()
	}

	/**
	 * Plugin system
	 *
	 * @param {Object} plugin
	 */

	exports.use = function (plugin) {
	  // additional parameters
	  var args = _.toArray(arguments, 1)
	  args.unshift(this)
	  if (typeof plugin.install === 'function') {
	    plugin.install.apply(plugin, args)
	  } else {
	    plugin.apply(null, args)
	  }
	  return this
	}

	/**
	 * Create asset registration methods with the following
	 * signature:
	 *
	 * @param {String} id
	 * @param {*} definition
	 */

	config._assetTypes.forEach(function (type) {
	  exports[type] = function (id, definition) {
	    if (!definition) {
	      return this.options[type + 's'][id]
	    } else {
	      if (
	        type === 'component' &&
	        _.isPlainObject(definition)
	      ) {
	        definition.name = id
	        definition = _.Vue.extend(definition)
	      }
	      this.options[type + 's'][id] = definition
	    }
	  }
	})


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)

	_.extend(exports, __webpack_require__(13))
	_.extend(exports, __webpack_require__(26))


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var compileProps = __webpack_require__(14)
	var config = __webpack_require__(7)
	var textParser = __webpack_require__(15)
	var dirParser = __webpack_require__(17)
	var templateParser = __webpack_require__(24)
	var resolveAsset = _.resolveAsset
	var componentDef = __webpack_require__(25)

	// terminal directives
	var terminalDirectives = [
	  'repeat',
	  'if'
	]

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @param {Vue} [host] - host vm of transcluded content
	 * @return {Function}
	 */

	exports.compile = function (el, options, partial, host) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent
	    ? compileNode(el, options)
	    : null
	  // link function for the childNodes
	  var childLinkFn =
	    !(nodeLinkFn && nodeLinkFn.terminal) &&
	    el.tagName !== 'SCRIPT' &&
	    el.hasChildNodes()
	      ? compileNodeList(el.childNodes, options)
	      : null

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn (vm, el) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = _.toArray(el.childNodes)
	    // link
	    var dirs = linkAndCapture(function () {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host)
	      if (childLinkFn) childLinkFn(vm, childNodes, host)
	    }, vm)
	    return makeUnlinkFn(vm, dirs)
	  }
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture (linker, vm) {
	  var originalDirCount = vm._directives.length
	  linker()
	  return vm._directives.slice(originalDirCount)
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn (vm, dirs, context, contextDirs) {
	  return function unlink (destroying) {
	    teardownDirs(vm, dirs, destroying)
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs)
	    }
	  }
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs (vm, dirs, destroying) {
	  var i = dirs.length
	  while (i--) {
	    dirs[i]._teardown()
	    if (!destroying) {
	      vm._directives.$remove(dirs[i])
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function}
	 */

	exports.compileAndLinkProps = function (vm, el, props) {
	  var propsLinkFn = compileProps(el, props)
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, null)
	  }, vm)
	  return makeUnlinkFn(vm, propDirs)
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function}
	 */

	exports.compileRoot = function (el, options) {
	  var containerAttrs = options._containerAttrs
	  var replacerAttrs = options._replacerAttrs
	  var contextLinkFn, replacerLinkFn

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs) {
	        contextLinkFn = compileDirectives(containerAttrs, options)
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options)
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options)
	    }
	  }

	  return function rootLinkFn (vm, el) {
	    // link context scope dirs
	    var context = vm._context
	    var contextDirs
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el)
	      }, context)
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el)
	    }, vm)

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs)
	  }
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode (node, options) {
	  var type = node.nodeType
	  if (type === 1 && node.tagName !== 'SCRIPT') {
	    return compileElement(node, options)
	  } else if (type === 3 && config.interpolate && node.data.trim()) {
	    return compileTextNode(node, options)
	  } else {
	    return null
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement (el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as a v-attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    if (textParser.parse(el.value)) {
	      el.setAttribute('value', el.value)
	    }
	  }
	  var linkFn
	  var hasAttrs = el.hasAttributes()
	  // check terminal directives (repeat & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, options)
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options)
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options)
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(el.attributes, options)
	  }
	  return linkFn
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode (node, options) {
	  var tokens = textParser.parse(node.data)
	  if (!tokens) {
	    return null
	  }
	  var frag = document.createDocumentFragment()
	  var el, token
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i]
	    el = token.tag
	      ? processTextToken(token, options)
	      : document.createTextNode(token.value)
	    frag.appendChild(el)
	  }
	  return makeTextNodeLinkFn(tokens, frag, options)
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken (token, options) {
	  var el
	  if (token.oneTime) {
	    el = document.createTextNode(token.value)
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html')
	      setTokenType('html')
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ')
	      setTokenType('text')
	    }
	  }
	  function setTokenType (type) {
	    token.type = type
	    token.def = resolveAsset(options, 'directives', type)
	    token.descriptor = dirParser.parse(token.value)[0]
	  }
	  return el
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn (tokens, frag) {
	  return function textNodeLinkFn (vm, el) {
	    var fragClone = frag.cloneNode(true)
	    var childNodes = _.toArray(fragClone.childNodes)
	    var token, value, node
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i]
	      value = token.value
	      if (token.tag) {
	        node = childNodes[i]
	        if (token.oneTime) {
	          value = vm.$eval(value)
	          if (token.html) {
	            _.replace(node, templateParser.parse(value, true))
	          } else {
	            node.data = value
	          }
	        } else {
	          vm._bindDir(token.type, node,
	                      token.descriptor, token.def)
	        }
	      }
	    }
	    _.replace(el, fragClone)
	  }
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList (nodeList, options) {
	  var linkFns = []
	  var nodeLinkFn, childLinkFn, node
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i]
	    nodeLinkFn = compileNode(node, options)
	    childLinkFn =
	      !(nodeLinkFn && nodeLinkFn.terminal) &&
	      node.tagName !== 'SCRIPT' &&
	      node.hasChildNodes()
	        ? compileNodeList(node.childNodes, options)
	        : null
	    linkFns.push(nodeLinkFn, childLinkFn)
	  }
	  return linkFns.length
	    ? makeChildLinkFn(linkFns)
	    : null
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn (linkFns) {
	  return function childLinkFn (vm, nodes, host) {
	    var node, nodeLinkFn, childrenLinkFn
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n]
	      nodeLinkFn = linkFns[i++]
	      childrenLinkFn = linkFns[i++]
	      // cache childNodes before linking parent, fix #657
	      var childNodes = _.toArray(node.childNodes)
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host)
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host)
	      }
	    }
	  }
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives (el, options) {
	  var tag = el.tagName.toLowerCase()
	  if (_.commonTagRE.test(tag)) return
	  var def = resolveAsset(options, 'elementDirectives', tag)
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def)
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Boolean} hasAttrs
	 * @return {Function|undefined}
	 */

	function checkComponent (el, options, hasAttrs) {
	  var componentId = _.checkComponent(el, options, hasAttrs)
	  if (componentId) {
	    var componentLinkFn = function (vm, el, host) {
	      vm._bindDir('component', el, {
	        expression: componentId
	      }, componentDef, host)
	    }
	    componentLinkFn.terminal = true
	    return componentLinkFn
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives (el, options) {
	  if (_.attr(el, 'pre') !== null) {
	    return skip
	  }
	  var value, dirName
	  for (var i = 0, l = terminalDirectives.length; i < l; i++) {
	    dirName = terminalDirectives[i]
	    if ((value = _.attr(el, dirName)) !== null) {
	      return makeTerminalNodeLinkFn(el, dirName, value, options)
	    }
	  }
	}

	function skip () {}
	skip.terminal = true

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} [def]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn (el, dirName, value, options, def) {
	  var descriptor = dirParser.parse(value)[0]
	  // no need to call resolveAsset since terminal directives
	  // are always internal
	  def = def || options.directives[dirName]
	  var fn = function terminalNodeLinkFn (vm, el, host) {
	    vm._bindDir(dirName, el, descriptor, def, host)
	  }
	  fn.terminal = true
	  return fn
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives (attrs, options) {
	  var i = attrs.length
	  var dirs = []
	  var attr, name, value, dir, dirName, dirDef
	  while (i--) {
	    attr = attrs[i]
	    name = attr.name
	    value = attr.value
	    if (name.indexOf(config.prefix) === 0) {
	      dirName = name.slice(config.prefix.length)
	      dirDef = resolveAsset(options, 'directives', dirName)
	      if (process.env.NODE_ENV !== 'production') {
	        _.assertAsset(dirDef, 'directive', dirName)
	      }
	      if (dirDef) {
	        dirs.push({
	          name: dirName,
	          descriptors: dirParser.parse(value),
	          def: dirDef
	        })
	      }
	    } else if (config.interpolate) {
	      dir = collectAttrDirective(name, value, options)
	      if (dir) {
	        dirs.push(dir)
	      }
	    }
	  }
	  // sort by priority, LOW to HIGH
	  if (dirs.length) {
	    dirs.sort(directiveComparator)
	    return makeNodeLinkFn(dirs)
	  }
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn (directives) {
	  return function nodeLinkFn (vm, el, host) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length
	    var dir, j, k
	    while (i--) {
	      dir = directives[i]
	      if (dir._link) {
	        // custom link fn
	        dir._link(vm, el)
	      } else {
	        k = dir.descriptors.length
	        for (j = 0; j < k; j++) {
	          vm._bindDir(dir.name, el,
	            dir.descriptors[j], dir.def, host)
	        }
	      }
	    }
	  }
	}

	/**
	 * Check an attribute for potential dynamic bindings,
	 * and return a directive object.
	 *
	 * Special case: class interpolations are translated into
	 * v-class instead v-attr, so that it can work with user
	 * provided v-class bindings.
	 *
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} options
	 * @return {Object}
	 */

	function collectAttrDirective (name, value, options) {
	  var tokens = textParser.parse(value)
	  var isClass = name === 'class'
	  if (tokens) {
	    var dirName = isClass ? 'class' : 'attr'
	    var def = options.directives[dirName]
	    var i = tokens.length
	    var allOneTime = true
	    while (i--) {
	      var token = tokens[i]
	      if (token.tag && !token.oneTime) {
	        allOneTime = false
	      }
	    }
	    return {
	      def: def,
	      _link: allOneTime
	        ? function (vm, el) {
	            el.setAttribute(name, vm.$interpolate(value))
	          }
	        : function (vm, el) {
	            var exp = textParser.tokensToExp(tokens, vm)
	            var desc = isClass
	              ? dirParser.parse(exp)[0]
	              : dirParser.parse(name + ':' + exp)[0]
	            if (isClass) {
	              desc._rawClass = value
	            }
	            vm._bindDir(dirName, el, desc, def)
	          }
	    }
	  }
	}

	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */

	function directiveComparator (a, b) {
	  a = a.def.priority || 0
	  b = b.def.priority || 0
	  return a > b ? 1 : -1
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var textParser = __webpack_require__(15)
	var propDef = __webpack_require__(18)
	var propBindingModes = __webpack_require__(7)._propBindingModes

	// regexes
	var identRE = __webpack_require__(22).identRE
	var dataAttrRE = /^data-/
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/
	var literalValueRE = /^(true|false)$|^\d.*/

	/**
	 * Compile param attributes on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @return {Function} propsLinkFn
	 */

	module.exports = function compileProps (el, propOptions) {
	  var props = []
	  var i = propOptions.length
	  var options, name, attr, value, path, prop, literal, single
	  while (i--) {
	    options = propOptions[i]
	    name = options.name
	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = _.camelize(name.replace(dataAttrRE, ''))
	    if (!identRE.test(path)) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Invalid prop key: "' + name + '". Prop keys ' +
	        'must be valid identifiers.'
	      )
	      continue
	    }
	    attr = _.hyphenate(name)
	    value = el.getAttribute(attr)
	    if (value === null) {
	      attr = 'data-' + attr
	      value = el.getAttribute(attr)
	    }
	    // create a prop descriptor
	    prop = {
	      name: name,
	      raw: value,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY
	    }
	    if (value !== null) {
	      // important so that this doesn't get compiled
	      // again as a normal attribute binding
	      el.removeAttribute(attr)
	      var tokens = textParser.parse(value)
	      if (tokens) {
	        prop.dynamic = true
	        prop.parentPath = textParser.tokensToExp(tokens)
	        // check prop binding type.
	        single = tokens.length === 1
	        literal = literalValueRE.test(prop.parentPath)
	        // one time: {{* prop}}
	        if (literal || (single && tokens[0].oneTime)) {
	          prop.mode = propBindingModes.ONE_TIME
	        } else if (
	          !literal &&
	          (single && tokens[0].twoWay)
	        ) {
	          if (settablePathRE.test(prop.parentPath)) {
	            prop.mode = propBindingModes.TWO_WAY
	          } else {
	            process.env.NODE_ENV !== 'production' && _.warn(
	              'Cannot bind two-way prop with non-settable ' +
	              'parent path: ' + prop.parentPath
	            )
	          }
	        }
	        if (
	          process.env.NODE_ENV !== 'production' &&
	          options.twoWay &&
	          prop.mode !== propBindingModes.TWO_WAY
	        ) {
	          _.warn(
	            'Prop "' + name + '" expects a two-way binding type.'
	          )
	        }
	      }
	    } else if (options && options.required) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Missing required prop: ' + name
	      )
	    }
	    props.push(prop)
	  }
	  return makePropsLinkFn(props)
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn (props) {
	  return function propsLinkFn (vm, el) {
	    // store resolved props info
	    vm._props = {}
	    var i = props.length
	    var prop, path, options, value
	    while (i--) {
	      prop = props[i]
	      path = prop.path
	      vm._props[path] = prop
	      options = prop.options
	      if (prop.raw === null) {
	        // initialize absent prop
	        _.initProp(vm, prop, getDefault(options))
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (vm._context) {
	          if (prop.mode === propBindingModes.ONE_TIME) {
	            // one time binding
	            value = vm._context.$get(prop.parentPath)
	            _.initProp(vm, prop, value)
	          } else {
	            // dynamic binding
	            vm._bindDir('prop', el, prop, propDef)
	          }
	        } else {
	          process.env.NODE_ENV !== 'production' && _.warn(
	            'Cannot bind dynamic prop on a root instance' +
	            ' with no parent: ' + prop.name + '="' +
	            prop.raw + '"'
	          )
	        }
	      } else {
	        // literal, cast it and just set once
	        var raw = prop.raw
	        value = options.type === Boolean && raw === ''
	          ? true
	          // do not cast emptry string.
	          // _.toNumber casts empty string to 0.
	          : raw.trim()
	            ? _.toBoolean(_.toNumber(raw))
	            : raw
	        _.initProp(vm, prop, value)
	      }
	    }
	  }
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Object} options
	 * @return {*}
	 */

	function getDefault (options) {
	  // no default, return undefined
	  if (!options.hasOwnProperty('default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean
	      ? false
	      : undefined
	  }
	  var def = options.default
	  // warn against non-factory defaults for Object & Array
	  if (_.isObject(def)) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Object/Array as default prop values will be shared ' +
	      'across multiple instances. Use a factory function ' +
	      'to return the default value instead.'
	    )
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function
	    ? def()
	    : def
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Cache = __webpack_require__(16)
	var config = __webpack_require__(7)
	var dirParser = __webpack_require__(17)
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g
	var cache, tagRE, htmlRE, firstChar, lastChar

	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex (str) {
	  return str.replace(regexEscapeRE, '\\$&')
	}

	/**
	 * Compile the interpolation tag regex.
	 *
	 * @return {RegExp}
	 */

	function compileRegex () {
	  config._delimitersChanged = false
	  var open = config.delimiters[0]
	  var close = config.delimiters[1]
	  firstChar = open.charAt(0)
	  lastChar = close.charAt(close.length - 1)
	  var firstCharRE = escapeRegex(firstChar)
	  var lastCharRE = escapeRegex(lastChar)
	  var openRE = escapeRegex(open)
	  var closeRE = escapeRegex(close)
	  tagRE = new RegExp(
	    firstCharRE + '?' + openRE +
	    '(.+?)' +
	    closeRE + lastCharRE + '?',
	    'g'
	  )
	  htmlRE = new RegExp(
	    '^' + firstCharRE + openRE +
	    '.*' +
	    closeRE + lastCharRE + '$'
	  )
	  // reset cache
	  cache = new Cache(1000)
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	exports.parse = function (text) {
	  if (config._delimitersChanged) {
	    compileRegex()
	  }
	  var hit = cache.get(text)
	  if (hit) {
	    return hit
	  }
	  text = text.replace(/\n/g, '')
	  if (!tagRE.test(text)) {
	    return null
	  }
	  var tokens = []
	  var lastIndex = tagRE.lastIndex = 0
	  var match, index, value, first, oneTime, twoWay
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	  /* eslint-enable no-cond-assign */
	    index = match.index
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      })
	    }
	    // tag token
	    first = match[1].charCodeAt(0)
	    oneTime = first === 42 // *
	    twoWay = first === 64  // @
	    value = oneTime || twoWay
	      ? match[1].slice(1)
	      : match[1]
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: htmlRE.test(match[0]),
	      oneTime: oneTime,
	      twoWay: twoWay
	    })
	    lastIndex = index + match[0].length
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    })
	  }
	  cache.put(text, tokens)
	  return tokens
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */

	exports.tokensToExp = function (tokens, vm) {
	  return tokens.length > 1
	    ? tokens.map(function (token) {
	        return formatToken(token, vm)
	      }).join('+')
	    : formatToken(tokens[0], vm, true)
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} single
	 * @return {String}
	 */

	function formatToken (token, vm, single) {
	  return token.tag
	    ? vm && token.oneTime
	      ? '"' + vm.$eval(token.value) + '"'
	      : inlineFilters(token.value, single)
	    : '"' + token.value + '"'
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE = /[^|]\|[^|]/
	function inlineFilters (exp, single) {
	  if (!filterRE.test(exp)) {
	    return single
	      ? exp
	      : '(' + exp + ')'
	  } else {
	    var dir = dirParser.parse(exp)[0]
	    if (!dir.filters) {
	      return '(' + exp + ')'
	    } else {
	      return 'this._applyFilters(' +
	        dir.expression + // value
	        ',null,' +       // oldValue (null for read)
	        JSON.stringify(dir.filters) + // filter descriptors
	        ',false)'        // write?
	    }
	  }
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * A doubly linked list-based Least Recently Used (LRU)
	 * cache. Will keep most recently used items while
	 * discarding least recently used items when its limit is
	 * reached. This is a bare-bone version of
	 * Rasmus Andersson's js-lru:
	 *
	 *   https://github.com/rsms/js-lru
	 *
	 * @param {Number} limit
	 * @constructor
	 */

	function Cache (limit) {
	  this.size = 0
	  this.limit = limit
	  this.head = this.tail = undefined
	  this._keymap = Object.create(null)
	}

	var p = Cache.prototype

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var entry = {
	    key: key,
	    value: value
	  }
	  this._keymap[key] = entry
	  if (this.tail) {
	    this.tail.newer = entry
	    entry.older = this.tail
	  } else {
	    this.head = entry
	  }
	  this.tail = entry
	  if (this.size === this.limit) {
	    return this.shift()
	  } else {
	    this.size++
	  }
	}

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head
	  if (entry) {
	    this.head = this.head.newer
	    this.head.older = undefined
	    entry.newer = entry.older = undefined
	    this._keymap[entry.key] = undefined
	  }
	  return entry
	}

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key]
	  if (entry === undefined) return
	  if (entry === this.tail) {
	    return returnEntry
	      ? entry
	      : entry.value
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer
	    }
	    entry.newer.older = entry.older // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer // C. --> E
	  }
	  entry.newer = undefined // D --x
	  entry.older = this.tail // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry // E. <-- D
	  }
	  this.tail = entry
	  return returnEntry
	    ? entry
	    : entry.value
	}

	module.exports = Cache


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var Cache = __webpack_require__(16)
	var cache = new Cache(1000)
	var argRE = /^[^\{\?]+$|^'[^']*'$|^"[^"]*"$/
	var filterTokenRE = /[^\s'"]+|'[^']+'|"[^"]+"/g
	var reservedArgRE = /^in$|^-?\d+/

	/**
	 * Parser state
	 */

	var str
	var c, i, l
	var inSingle
	var inDouble
	var curly
	var square
	var paren
	var begin
	var argIndex
	var dirs
	var dir
	var lastFilterIndex
	var arg

	/**
	 * Push a directive object into the result Array
	 */

	function pushDir () {
	  dir.raw = str.slice(begin, i).trim()
	  if (dir.expression === undefined) {
	    dir.expression = str.slice(argIndex, i).trim()
	  } else if (lastFilterIndex !== begin) {
	    pushFilter()
	  }
	  if (i === 0 || dir.expression) {
	    dirs.push(dir)
	  }
	}

	/**
	 * Push a filter to the current directive object
	 */

	function pushFilter () {
	  var exp = str.slice(lastFilterIndex, i).trim()
	  var filter
	  if (exp) {
	    filter = {}
	    var tokens = exp.match(filterTokenRE)
	    filter.name = tokens[0]
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg)
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter)
	  }
	  lastFilterIndex = i + 1
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg (arg) {
	  var stripped = reservedArgRE.test(arg)
	    ? arg
	    : _.stripQuotes(arg)
	  return {
	    value: stripped || arg,
	    dynamic: !stripped
	  }
	}

	/**
	 * Parse a directive string into an Array of AST-like
	 * objects representing directives.
	 *
	 * Example:
	 *
	 * "click: a = a + 1 | uppercase" will yield:
	 * {
	 *   arg: 'click',
	 *   expression: 'a = a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} str
	 * @return {Array<Object>}
	 */

	exports.parse = function (s) {

	  var hit = cache.get(s)
	  if (hit) {
	    return hit
	  }

	  // reset parser state
	  str = s
	  inSingle = inDouble = false
	  curly = square = paren = begin = argIndex = 0
	  lastFilterIndex = 0
	  dirs = []
	  dir = {}
	  arg = null

	  for (i = 0, l = str.length; i < l; i++) {
	    c = str.charCodeAt(i)
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27) inSingle = !inSingle
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22) inDouble = !inDouble
	    } else if (
	      c === 0x2C && // comma
	      !paren && !curly && !square
	    ) {
	      // reached the end of a directive
	      pushDir()
	      // reset & skip the comma
	      dir = {}
	      begin = argIndex = lastFilterIndex = i + 1
	    } else if (
	      c === 0x3A && // colon
	      !dir.expression &&
	      !dir.arg
	    ) {
	      // argument
	      arg = str.slice(begin, i).trim()
	      // test for valid argument here
	      // since we may have caught stuff like first half of
	      // an object literal or a ternary expression.
	      if (argRE.test(arg)) {
	        argIndex = i + 1
	        dir.arg = _.stripQuotes(arg) || arg
	      }
	    } else if (
	      c === 0x7C && // pipe
	      str.charCodeAt(i + 1) !== 0x7C &&
	      str.charCodeAt(i - 1) !== 0x7C
	    ) {
	      if (dir.expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1
	        dir.expression = str.slice(argIndex, i).trim()
	      } else {
	        // already has filter
	        pushFilter()
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break // "
	        case 0x27: inSingle = true; break // '
	        case 0x28: paren++; break         // (
	        case 0x29: paren--; break         // )
	        case 0x5B: square++; break        // [
	        case 0x5D: square--; break        // ]
	        case 0x7B: curly++; break         // {
	        case 0x7D: curly--; break         // }
	      }
	    }
	  }

	  if (i === 0 || begin !== i) {
	    pushDir()
	  }

	  cache.put(s, dirs)
	  return dirs
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// NOTE: the prop internal directive is compiled and linked
	// during _initScope(), before the created hook is called.
	// The purpose is to make the initial prop values available
	// inside `created` hooks and `data` functions.

	var _ = __webpack_require__(2)
	var Watcher = __webpack_require__(19)
	var bindingModes = __webpack_require__(7)._propBindingModes

	module.exports = {

	  bind: function () {

	    var child = this.vm
	    var parent = child._context
	    // passed in from compiler directly
	    var prop = this._descriptor
	    var childKey = prop.path
	    var parentKey = prop.parentPath

	    this.parentWatcher = new Watcher(
	      parent,
	      parentKey,
	      function (val) {
	        if (_.assertProp(prop, val)) {
	          child[childKey] = val
	        }
	      }
	    )

	    // set the child initial value.
	    var value = this.parentWatcher.value
	    if (childKey === '$data') {
	      child._data = value
	    } else {
	      _.initProp(child, prop, value)
	    }

	    // setup two-way binding
	    if (prop.mode === bindingModes.TWO_WAY) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this
	      child.$once('hook:created', function () {
	        self.childWatcher = new Watcher(
	          child,
	          childKey,
	          function (val) {
	            parent.$set(parentKey, val)
	          }
	        )
	      })
	    }
	  },

	  unbind: function () {
	    this.parentWatcher.teardown()
	    if (this.childWatcher) {
	      this.childWatcher.teardown()
	    }
	  }
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var config = __webpack_require__(7)
	var Dep = __webpack_require__(20)
	var expParser = __webpack_require__(21)
	var batcher = __webpack_require__(23)
	var uid = 0

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String} expression
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 * @constructor
	 */

	function Watcher (vm, expOrFn, cb, options) {
	  var isFn = typeof expOrFn === 'function'
	  this.vm = vm
	  vm._watchers.push(this)
	  this.expression = isFn ? expOrFn.toString() : expOrFn
	  this.cb = cb
	  this.id = ++uid // uid for batching
	  this.active = true
	  options = options || {}
	  this.deep = !!options.deep
	  this.user = !!options.user
	  this.twoWay = !!options.twoWay
	  this.lazy = !!options.lazy
	  this.dirty = this.lazy
	  this.filters = options.filters
	  this.preProcess = options.preProcess
	  this.deps = []
	  this.newDeps = null
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn
	    this.setter = undefined
	  } else {
	    var res = expParser.parse(expOrFn, options.twoWay)
	    this.getter = res.get
	    this.setter = res.set
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get()
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false
	}

	var p = Watcher.prototype

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	p.addDep = function (dep) {
	  var newDeps = this.newDeps
	  var old = this.deps
	  if (_.indexOf(newDeps, dep) < 0) {
	    newDeps.push(dep)
	    var i = _.indexOf(old, dep)
	    if (i < 0) {
	      dep.addSub(this)
	    } else {
	      old[i] = null
	    }
	  }
	}

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	p.get = function () {
	  this.beforeGet()
	  var vm = this.vm
	  var value
	  try {
	    value = this.getter.call(vm, vm)
	  } catch (e) {
	    if (
	      process.env.NODE_ENV !== 'production' &&
	      config.warnExpressionErrors
	    ) {
	      _.warn(
	        'Error when evaluating expression "' +
	        this.expression + '". ' +
	        (config.debug
	          ? '' :
	          'Turn on debug mode to see stack trace.'
	        ), e
	      )
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value)
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value)
	  }
	  if (this.filters) {
	    value = vm._applyFilters(value, null, this.filters, false)
	  }
	  this.afterGet()
	  return value
	}

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	p.set = function (value) {
	  var vm = this.vm
	  if (this.filters) {
	    value = vm._applyFilters(
	      value, this.value, this.filters, true)
	  }
	  try {
	    this.setter.call(vm, vm, value)
	  } catch (e) {
	    if (
	      process.env.NODE_ENV !== 'production' &&
	      config.warnExpressionErrors
	    ) {
	      _.warn(
	        'Error when evaluating setter "' +
	        this.expression + '"', e
	      )
	    }
	  }
	}

	/**
	 * Prepare for dependency collection.
	 */

	p.beforeGet = function () {
	  Dep.target = this
	  this.newDeps = []
	}

	/**
	 * Clean up for dependency collection.
	 */

	p.afterGet = function () {
	  Dep.target = null
	  var i = this.deps.length
	  while (i--) {
	    var dep = this.deps[i]
	    if (dep) {
	      dep.removeSub(this)
	    }
	  }
	  this.deps = this.newDeps
	  this.newDeps = null
	}

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	p.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true
	  } else if (!config.async) {
	    this.run()
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued
	      ? shallow
	        ? this.shallow
	        : false
	      : !!shallow
	    this.queued = true
	    batcher.push(this)
	  }
	}

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	p.run = function () {
	  if (this.active) {
	    var value = this.get()
	    if (
	      value !== this.value ||
	      // Deep watchers and Array watchers should fire even
	      // when the value is the same, because the value may
	      // have mutated; but only do so if this is a
	      // non-shallow update (caused by a vm digest).
	      ((_.isArray(value) || this.deep) && !this.shallow)
	    ) {
	      var oldValue = this.value
	      this.value = value
	      this.cb(value, oldValue)
	    }
	    this.queued = this.shallow = false
	  }
	}

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	p.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target
	  this.value = this.get()
	  this.dirty = false
	  Dep.target = current
	}

	/**
	 * Depend on all deps collected by this watcher.
	 */

	p.depend = function () {
	  var i = this.deps.length
	  while (i--) {
	    this.deps[i].depend()
	  }
	}

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	p.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // we can skip this if the vm if being destroyed
	    // which can improve teardown performance.
	    if (!this.vm._isBeingDestroyed) {
	      this.vm._watchers.$remove(this)
	    }
	    var i = this.deps.length
	    while (i--) {
	      this.deps[i].removeSub(this)
	    }
	    this.active = false
	    this.vm = this.cb = this.value = null
	  }
	}

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {Object} obj
	 */

	function traverse (obj) {
	  var key, val, i
	  for (key in obj) {
	    val = obj[key]
	    if (_.isArray(val)) {
	      i = val.length
	      while (i--) traverse(val[i])
	    } else if (_.isObject(val)) {
	      traverse(val)
	    }
	  }
	}

	module.exports = Watcher

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */

	function Dep () {
	  this.subs = []
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null

	var p = Dep.prototype

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	p.addSub = function (sub) {
	  this.subs.push(sub)
	}

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	p.removeSub = function (sub) {
	  this.subs.$remove(sub)
	}

	/**
	 * Add self as a dependency to the target watcher.
	 */

	p.depend = function () {
	  Dep.target.addDep(this)
	}

	/**
	 * Notify all subscribers of a new value.
	 */

	p.notify = function () {
	  // stablize the subscriber list first
	  var subs = _.toArray(this.subs)
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update()
	  }
	}

	module.exports = Dep


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var Path = __webpack_require__(22)
	var Cache = __webpack_require__(16)
	var expressionCache = new Cache(1000)

	var allowedKeywords =
	  'Math,Date,this,true,false,null,undefined,Infinity,NaN,' +
	  'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' +
	  'encodeURIComponent,parseInt,parseFloat'
	var allowedKeywordsRE =
	  new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)')

	// keywords that don't make sense inside expressions
	var improperKeywords =
	  'break,case,class,catch,const,continue,debugger,default,' +
	  'delete,do,else,export,extends,finally,for,function,if,' +
	  'import,in,instanceof,let,return,super,switch,throw,try,' +
	  'var,while,with,yield,enum,await,implements,package,' +
	  'proctected,static,interface,private,public'
	var improperKeywordsRE =
	  new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)')

	var wsRE = /\s/g
	var newlineRE = /\n/g
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('[^']*'|"[^"]*")|new |typeof |void /g
	var restoreRE = /"(\d+)"/g
	var pathTestRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/
	var pathReplaceRE = /[^\w$\.]([A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\])*)/g
	var booleanLiteralRE = /^(true|false)$/

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = []

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save (str, isString) {
	  var i = saved.length
	  saved[i] = isString
	    ? str.replace(newlineRE, '\\n')
	    : str
	  return '"' + i + '"'
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite (raw) {
	  var c = raw.charAt(0)
	  var path = raw.slice(1)
	  if (allowedKeywordsRE.test(path)) {
	    return raw
	  } else {
	    path = path.indexOf('"') > -1
	      ? path.replace(restoreRE, restore)
	      : path
	    return c + 'scope.' + path
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore (str, i) {
	  return saved[i]
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function compileExpFns (exp, needSet) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Avoid using reserved keywords in expression: ' + exp
	    )
	  }
	  // reset state
	  saved.length = 0
	  // save strings and object literal keys
	  var body = exp
	    .replace(saveRE, save)
	    .replace(wsRE, '')
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body)
	    .replace(pathReplaceRE, rewrite)
	    .replace(restoreRE, restore)
	  var getter = makeGetter(body)
	  if (getter) {
	    return {
	      get: getter,
	      body: body,
	      set: needSet
	        ? makeSetter(body)
	        : null
	    }
	  }
	}

	/**
	 * Compile getter setters for a simple path.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compilePathFns (exp) {
	  var getter, path
	  if (exp.indexOf('[') < 0) {
	    // really simple path
	    path = exp.split('.')
	    path.raw = exp
	    getter = Path.compileGetter(path)
	  } else {
	    // do the real parsing
	    path = Path.parse(exp)
	    getter = path.get
	  }
	  return {
	    get: getter,
	    // always generate setter for simple paths
	    set: function (obj, val) {
	      Path.set(obj, path, val)
	    }
	  }
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetter (body) {
	  try {
	    return new Function('scope', 'return ' + body + ';')
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Invalid expression. ' +
	      'Generated function body: ' + body
	    )
	  }
	}

	/**
	 * Build a setter function.
	 *
	 * This is only needed in rare situations like "a[b]" where
	 * a settable path requires dynamic evaluation.
	 *
	 * This setter function may throw error when called if the
	 * expression body is not a valid left-hand expression in
	 * assignment.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeSetter (body) {
	  try {
	    return new Function('scope', 'value', body + '=value;')
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Invalid setter function body: ' + body
	    )
	  }
	}

	/**
	 * Check for setter existence on a cache hit.
	 *
	 * @param {Function} hit
	 */

	function checkSetter (hit) {
	  if (!hit.set) {
	    hit.set = makeSetter(hit.body)
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	exports.parse = function (exp, needSet) {
	  exp = exp.trim()
	  // try cache
	  var hit = expressionCache.get(exp)
	  if (hit) {
	    if (needSet) {
	      checkSetter(hit)
	    }
	    return hit
	  }
	  // we do a simple path check to optimize for them.
	  // the check fails valid paths with unusal whitespaces,
	  // but that's too rare and we don't care.
	  // also skip boolean literals and paths that start with
	  // global "Math"
	  var res = exports.isSimplePath(exp)
	    ? compilePathFns(exp)
	    : compileExpFns(exp, needSet)
	  expressionCache.put(exp, res)
	  return res
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	exports.isSimplePath = function (exp) {
	  return pathTestRE.test(exp) &&
	    // don't treat true/false as paths
	    !booleanLiteralRE.test(exp) &&
	    // Math constants e.g. Math.PI, Math.E etc.
	    exp.slice(0, 5) !== 'Math.'
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var Cache = __webpack_require__(16)
	var pathCache = new Cache(1000)
	var identRE = exports.identRE = /^[$_a-zA-Z]+[\w$]*$/

	// actions
	var APPEND = 0
	var PUSH = 1

	// states
	var BEFORE_PATH = 0
	var IN_PATH = 1
	var BEFORE_IDENT = 2
	var IN_IDENT = 3
	var BEFORE_ELEMENT = 4
	var AFTER_ZERO = 5
	var IN_INDEX = 6
	var IN_SINGLE_QUOTE = 7
	var IN_DOUBLE_QUOTE = 8
	var IN_SUB_PATH = 9
	var AFTER_ELEMENT = 10
	var AFTER_PATH = 11
	var ERROR = 12

	var pathStateMachine = []

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [BEFORE_ELEMENT],
	  'eof': [AFTER_PATH]
	}

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [BEFORE_ELEMENT],
	  'eof': [AFTER_PATH]
	}

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	}

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [BEFORE_ELEMENT, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	}

	pathStateMachine[BEFORE_ELEMENT] = {
	  'ws': [BEFORE_ELEMENT],
	  '0': [AFTER_ZERO, APPEND],
	  'number': [IN_INDEX, APPEND],
	  "'": [IN_SINGLE_QUOTE, APPEND, ''],
	  '"': [IN_DOUBLE_QUOTE, APPEND, ''],
	  'ident': [IN_SUB_PATH, APPEND, '*']
	}

	pathStateMachine[AFTER_ZERO] = {
	  'ws': [AFTER_ELEMENT, PUSH],
	  ']': [IN_PATH, PUSH]
	}

	pathStateMachine[IN_INDEX] = {
	  '0': [IN_INDEX, APPEND],
	  'number': [IN_INDEX, APPEND],
	  'ws': [AFTER_ELEMENT],
	  ']': [IN_PATH, PUSH]
	}

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [AFTER_ELEMENT],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	}

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [AFTER_ELEMENT],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	}

	pathStateMachine[IN_SUB_PATH] = {
	  'ident': [IN_SUB_PATH, APPEND],
	  '0': [IN_SUB_PATH, APPEND],
	  'number': [IN_SUB_PATH, APPEND],
	  'ws': [AFTER_ELEMENT],
	  ']': [IN_PATH, PUSH]
	}

	pathStateMachine[AFTER_ELEMENT] = {
	  'ws': [AFTER_ELEMENT],
	  ']': [IN_PATH, PUSH]
	}

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType (ch) {
	  if (ch === undefined) {
	    return 'eof'
	  }

	  var code = ch.charCodeAt(0)

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30: // 0
	      return ch

	    case 0x5F: // _
	    case 0x24: // $
	      return 'ident'

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0:  // No-break space
	    case 0xFEFF:  // Byte Order Mark
	    case 0x2028:  // Line Separator
	    case 0x2029:  // Paragraph Separator
	      return 'ws'
	  }

	  // a-z, A-Z
	  if (
	    (code >= 0x61 && code <= 0x7A) ||
	    (code >= 0x41 && code <= 0x5A)
	  ) {
	    return 'ident'
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number'
	  }

	  return 'else'
	}

	/**
	 * Parse a string path into an array of segments
	 * Todo implement cache
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath (path) {
	  var keys = []
	  var index = -1
	  var mode = BEFORE_PATH
	  var c, newChar, key, type, transition, action, typeMap

	  var actions = []
	  actions[PUSH] = function () {
	    if (key === undefined) {
	      return
	    }
	    keys.push(key)
	    key = undefined
	  }
	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar
	    } else {
	      key += newChar
	    }
	  }

	  function maybeUnescapeQuote () {
	    var nextChar = path[index + 1]
	    if ((mode === IN_SINGLE_QUOTE && nextChar === "'") ||
	        (mode === IN_DOUBLE_QUOTE && nextChar === '"')) {
	      index++
	      newChar = nextChar
	      actions[APPEND]()
	      return true
	    }
	  }

	  while (mode != null) {
	    index++
	    c = path[index]

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue
	    }

	    type = getPathCharType(c)
	    typeMap = pathStateMachine[mode]
	    transition = typeMap[type] || typeMap['else'] || ERROR

	    if (transition === ERROR) {
	      return // parse error
	    }

	    mode = transition[0]
	    action = actions[transition[1]]
	    if (action) {
	      newChar = transition[2]
	      newChar = newChar === undefined
	        ? c
	        : newChar === '*'
	          ? newChar + c
	          : newChar
	      action()
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path
	      return keys
	    }
	  }
	}

	/**
	 * Format a accessor segment based on its type.
	 *
	 * @param {String} key
	 * @return {Boolean}
	 */

	function formatAccessor (key) {
	  if (identRE.test(key)) { // identifier
	    return '.' + key
	  } else if (+key === key >>> 0) { // bracket index
	    return '[' + key + ']'
	  } else if (key.charAt(0) === '*') {
	    return '[o' + formatAccessor(key.slice(1)) + ']'
	  } else { // bracket string
	    return '["' + key.replace(/"/g, '\\"') + '"]'
	  }
	}

	/**
	 * Compiles a getter function with a fixed path.
	 * The fixed path getter supresses errors.
	 *
	 * @param {Array} path
	 * @return {Function}
	 */

	exports.compileGetter = function (path) {
	  var body = 'return o' + path.map(formatAccessor).join('')
	  return new Function('o', body)
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	exports.parse = function (path) {
	  var hit = pathCache.get(path)
	  if (!hit) {
	    hit = parsePath(path)
	    if (hit) {
	      hit.get = exports.compileGetter(hit)
	      pathCache.put(path, hit)
	    }
	  }
	  return hit
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	exports.get = function (obj, path) {
	  path = exports.parse(path)
	  if (path) {
	    return path.get(obj)
	  }
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	exports.set = function (obj, path, val) {
	  var original = obj
	  if (typeof path === 'string') {
	    path = exports.parse(path)
	  }
	  if (!path || !_.isObject(obj)) {
	    return false
	  }
	  var last, key
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj
	    key = path[i]
	    if (key.charAt(0) === '*') {
	      key = original[key.slice(1)]
	    }
	    if (i < l - 1) {
	      obj = obj[key]
	      if (!_.isObject(obj)) {
	        warnNonExistent(path)
	        obj = {}
	        last.$add(key, obj)
	      }
	    } else {
	      if (_.isArray(obj)) {
	        obj.$set(key, val)
	      } else if (key in obj) {
	        obj[key] = val
	      } else {
	        warnNonExistent(path)
	        obj.$add(key, val)
	      }
	    }
	  }
	  return true
	}

	function warnNonExistent (path) {
	  process.env.NODE_ENV !== 'production' && _.warn(
	    'You are setting a non-existent path "' + path.raw + '" ' +
	    'on a vm instance. Consider pre-initializing the property ' +
	    'with the "data" option for more reliable reactivity ' +
	    'and better performance.'
	  )
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var config = __webpack_require__(7)

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.
	var queue = []
	var userQueue = []
	var has = {}
	var circular = {}
	var waiting = false
	var internalQueueDepleted = false

	/**
	 * Reset the batcher's state.
	 */

	function reset () {
	  queue = []
	  userQueue = []
	  has = {}
	  circular = {}
	  waiting = internalQueueDepleted = false
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flush () {
	  run(queue)
	  internalQueueDepleted = true
	  run(userQueue)
	  reset()
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function run (queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i]
	    var id = watcher.id
	    has[id] = null
	    watcher.run()
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1
	      if (circular[id] > config._maxUpdateCount) {
	        queue.splice(has[id], 1)
	        _.warn(
	          'You may have an infinite update loop for watcher ' +
	          'with expression: ' + watcher.expression
	        )
	      }
	    }
	  }
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	exports.push = function (watcher) {
	  var id = watcher.id
	  if (has[id] == null) {
	    // if an internal watcher is pushed, but the internal
	    // queue is already depleted, we run it immediately.
	    if (internalQueueDepleted && !watcher.user) {
	      watcher.run()
	      return
	    }
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue
	    has[id] = q.length
	    q.push(watcher)
	    // queue the flush
	    if (!waiting) {
	      waiting = true
	      _.nextTick(flush)
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var Cache = __webpack_require__(16)
	var templateCache = new Cache(1000)
	var idSelectorCache = new Cache(1000)

	var map = {
	  _default: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [
	    2,
	    '<table><tbody></tbody><colgroup>',
	    '</colgroup></table>'
	  ]
	}

	map.td =
	map.th = [
	  3,
	  '<table><tbody><tr>',
	  '</tr></tbody></table>'
	]

	map.option =
	map.optgroup = [
	  1,
	  '<select multiple="multiple">',
	  '</select>'
	]

	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>']

	map.g =
	map.defs =
	map.symbol =
	map.use =
	map.image =
	map.text =
	map.circle =
	map.ellipse =
	map.line =
	map.path =
	map.polygon =
	map.polyline =
	map.rect = [
	  1,
	  '<svg ' +
	    'xmlns="http://www.w3.org/2000/svg" ' +
	    'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
	    'xmlns:ev="http://www.w3.org/2001/xml-events"' +
	    'version="1.1">',
	  '</svg>'
	]

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate (node) {
	  return _.isTemplate(node) &&
	    node.content instanceof DocumentFragment
	}

	var tagRE = /<([\w:]+)/
	var entityRE = /&\w+;/

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @return {DocumentFragment}
	 */

	function stringToFragment (templateString) {
	  // try a cache hit first
	  var hit = templateCache.get(templateString)
	  if (hit) {
	    return hit
	  }

	  var frag = document.createDocumentFragment()
	  var tagMatch = templateString.match(tagRE)
	  var entityMatch = entityRE.test(templateString)

	  if (!tagMatch && !entityMatch) {
	    // text only, return a single text node.
	    frag.appendChild(
	      document.createTextNode(templateString)
	    )
	  } else {

	    var tag = tagMatch && tagMatch[1]
	    var wrap = map[tag] || map._default
	    var depth = wrap[0]
	    var prefix = wrap[1]
	    var suffix = wrap[2]
	    var node = document.createElement('div')

	    node.innerHTML = prefix + templateString.trim() + suffix
	    while (depth--) {
	      node = node.lastChild
	    }

	    var child
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	    /* eslint-enable no-cond-assign */
	      frag.appendChild(child)
	    }
	  }

	  templateCache.put(templateString, frag)
	  return frag
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment (node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment.
	  if (isRealTemplate(node)) {
	    _.trimNode(node.content)
	    return node.content
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent)
	  }
	  // normal node, clone it to avoid mutating the original
	  var clone = exports.clone(node)
	  var frag = document.createDocumentFragment()
	  var child
	  /* eslint-disable no-cond-assign */
	  while (child = clone.firstChild) {
	  /* eslint-enable no-cond-assign */
	    frag.appendChild(child)
	  }
	  _.trimNode(frag)
	  return frag
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/show_bug.cgi?id=137755
	var hasBrokenTemplate = _.inBrowser
	  ? (function () {
	      var a = document.createElement('div')
	      a.innerHTML = '<template>1</template>'
	      return !a.cloneNode(true).firstChild.innerHTML
	    })()
	  : false

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = _.inBrowser
	  ? (function () {
	      var t = document.createElement('textarea')
	      t.placeholder = 't'
	      return t.cloneNode(true).value === 't'
	    })()
	  : false

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	exports.clone = function (node) {
	  if (!node.querySelectorAll) {
	    return node.cloneNode()
	  }
	  var res = node.cloneNode(true)
	  var i, original, cloned
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var clone = res
	    if (isRealTemplate(node)) {
	      node = node.content
	      clone = res.content
	    }
	    original = node.querySelectorAll('template')
	    if (original.length) {
	      cloned = clone.querySelectorAll('template')
	      i = cloned.length
	      while (i--) {
	        cloned[i].parentNode.replaceChild(
	          exports.clone(original[i]),
	          cloned[i]
	        )
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value
	    } else {
	      original = node.querySelectorAll('textarea')
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea')
	        i = cloned.length
	        while (i--) {
	          cloned[i].value = original[i].value
	        }
	      }
	    }
	  }
	  return res
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *    Possible values include:
	 *    - DocumentFragment object
	 *    - Node object of type Template
	 *    - id selector: '#some-template-id'
	 *    - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} clone
	 * @param {Boolean} noSelector
	 * @return {DocumentFragment|undefined}
	 */

	exports.parse = function (template, clone, noSelector) {
	  var node, frag

	  // if the template is already a document fragment,
	  // do nothing
	  if (template instanceof DocumentFragment) {
	    _.trimNode(template)
	    return clone
	      ? exports.clone(template)
	      : template
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!noSelector && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template)
	      if (!frag) {
	        node = document.getElementById(template.slice(1))
	        if (node) {
	          frag = nodeToFragment(node)
	          // save selector to cache
	          idSelectorCache.put(template, frag)
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template)
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template)
	  }

	  return frag && clone
	    ? exports.clone(frag)
	    : frag
	}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var config = __webpack_require__(7)
	var templateParser = __webpack_require__(24)

	module.exports = {

	  isLiteral: true,

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   v-component="comp"
	   *
	   * - dynamic:
	   *   v-component="{{currentView}}"
	   */

	  bind: function () {
	    if (!this.el.__vue__) {
	      // create a ref anchor
	      this.anchor = _.createAnchor('v-component')
	      _.replace(this.el, this.anchor)
	      // check keep-alive options.
	      // If yes, instead of destroying the active vm when
	      // hiding (v-if) or switching (dynamic literal) it,
	      // we simply remove it from the DOM and save it in a
	      // cache object, with its constructor id as the key.
	      this.keepAlive = this._checkParam('keep-alive') != null
	      // wait for event before insertion
	      this.waitForEvent = this._checkParam('wait-for')
	      // check ref
	      this.refID = this._checkParam(config.prefix + 'ref')
	      if (this.keepAlive) {
	        this.cache = {}
	      }
	      // check inline-template
	      if (this._checkParam('inline-template') !== null) {
	        // extract inline template as a DocumentFragment
	        this.template = _.extractContent(this.el, true)
	      }
	      // component resolution related state
	      this.pendingComponentCb =
	      this.Component = null
	      // transition related state
	      this.pendingRemovals = 0
	      this.pendingRemovalCb = null
	      // if static, build right now.
	      if (!this._isDynamicLiteral) {
	        this.resolveComponent(this.expression, _.bind(this.initStatic, this))
	      } else {
	        // check dynamic component params
	        this.transMode = this._checkParam('transition-mode')
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'cannot mount component "' + this.expression + '" ' +
	        'on already mounted element: ' + this.el
	      )
	    }
	  },

	  /**
	   * Initialize a static component.
	   */

	  initStatic: function () {
	    // wait-for
	    var anchor = this.anchor
	    var options
	    var waitFor = this.waitForEvent
	    if (waitFor) {
	      options = {
	        created: function () {
	          this.$once(waitFor, function () {
	            this.$before(anchor)
	          })
	        }
	      }
	    }
	    var child = this.build(options)
	    this.setCurrent(child)
	    if (!this.waitForEvent) {
	      child.$before(anchor)
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. v-component="{{view}}"
	   */

	  update: function (value) {
	    this.setComponent(value)
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function (value, cb) {
	    this.invalidatePending()
	    if (!value) {
	      // just remove current
	      this.unbuild(true)
	      this.remove(this.childVM, cb)
	      this.unsetCurrent()
	    } else {
	      this.resolveComponent(value, _.bind(function () {
	        this.unbuild(true)
	        var options
	        var self = this
	        var waitFor = this.waitForEvent
	        if (waitFor) {
	          options = {
	            created: function () {
	              this.$once(waitFor, function () {
	                self.transition(this, cb)
	              })
	            }
	          }
	        }
	        var newComponent = this.build(options)
	        if (!waitFor) {
	          this.transition(newComponent, cb)
	        }
	      }, this))
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   */

	  resolveComponent: function (id, cb) {
	    var self = this
	    this.pendingComponentCb = _.cancellable(function (Component) {
	      self.Component = Component
	      cb()
	    })
	    this.vm._resolveComponent(id, this.pendingComponentCb)
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function () {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel()
	      this.pendingComponentCb = null
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function (extraOptions) {
	    if (this.keepAlive) {
	      var cached = this.cache[this.Component.cid]
	      if (cached) {
	        return cached
	      }
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        el: templateParser.clone(this.el),
	        template: this.template,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.template,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        _context: this.vm
	      }
	      // extra options
	      if (extraOptions) {
	        _.extend(options, extraOptions)
	      }
	      var parent = this._host || this.vm
	      var child = parent.$addChild(options, this.Component)
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child
	      }
	      return child
	    }
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function (defer) {
	    var child = this.childVM
	    if (!child || this.keepAlive) {
	      return
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer)
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function (child, cb) {
	    var keepAlive = this.keepAlive
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++
	      this.pendingRemovalCb = cb
	      var self = this
	      child.$remove(function () {
	        self.pendingRemovals--
	        if (!keepAlive) child._cleanup()
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb()
	          self.pendingRemovalCb = null
	        }
	      })
	    } else if (cb) {
	      cb()
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function (target, cb) {
	    var self = this
	    var current = this.childVM
	    this.unsetCurrent()
	    this.setCurrent(target)
	    switch (self.transMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb)
	        })
	        break
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb)
	        })
	        break
	      default:
	        self.remove(current)
	        target.$before(self.anchor, cb)
	    }
	  },

	  /**
	   * Set childVM and parent ref
	   */

	  setCurrent: function (child) {
	    this.childVM = child
	    var refID = child._refID || this.refID
	    if (refID) {
	      this.vm.$[refID] = child
	    }
	  },

	  /**
	   * Unset childVM and parent ref
	   */

	  unsetCurrent: function () {
	    var child = this.childVM
	    this.childVM = null
	    var refID = (child && child._refID) || this.refID
	    if (refID) {
	      this.vm.$[refID] = null
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function () {
	    this.invalidatePending()
	    // Do not defer cleanup when unbinding
	    this.unbuild()
	    this.unsetCurrent()
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy()
	      }
	      this.cache = null
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var config = __webpack_require__(7)
	var templateParser = __webpack_require__(24)

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-repeat.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	exports.transclude = function (el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el)
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (_.isTemplate(el)) {
	    el = templateParser.parse(el)
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<content></content>'
	    }
	    if (options.template) {
	      options._content = _.extractContent(el)
	      el = transcludeTemplate(el, options)
	    }
	  }
	  if (el instanceof DocumentFragment) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    _.prepend(_.createAnchor('v-start', true), el)
	    el.appendChild(_.createAnchor('v-end', true))
	  }
	  return el
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate (el, options) {
	  var template = options.template
	  var frag = templateParser.parse(template, true)
	  if (frag) {
	    var replacer = frag.firstChild
	    var tag = replacer.tagName && replacer.tagName.toLowerCase()
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'You are mounting an instance with a template to ' +
	          '<body>. This will replace <body> entirely. You ' +
	          'should probably use `replace: false` here.'
	        )
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	        // multi-children template
	        frag.childNodes.length > 1 ||
	        // non-element template
	        replacer.nodeType !== 1 ||
	        // single nested component
	        tag === 'component' ||
	        _.resolveAsset(options, 'components', tag) ||
	        replacer.hasAttribute(config.prefix + 'component') ||
	        // element directive
	        _.resolveAsset(options, 'elementDirectives', tag) ||
	        // repeat block
	        replacer.hasAttribute(config.prefix + 'repeat')
	      ) {
	        return frag
	      } else {
	        options._replacerAttrs = extractAttrs(replacer)
	        mergeAttrs(el, replacer)
	        return replacer
	      }
	    } else {
	      el.appendChild(frag)
	      return el
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Invalid template option: ' + template
	    )
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs (el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return _.toArray(el.attributes)
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs (from, to) {
	  var attrs = from.attributes
	  var i = attrs.length
	  var name, value
	  while (i--) {
	    name = attrs[i].name
	    value = attrs[i].value
	    if (!to.hasAttribute(name)) {
	      to.setAttribute(name, value)
	    } else if (name === 'class') {
	      value = to.getAttribute(name) + ' ' + value
	      to.setAttribute(name, value)
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// manipulation directives
	exports.text = __webpack_require__(28)
	exports.html = __webpack_require__(29)
	exports.attr = __webpack_require__(30)
	exports.show = __webpack_require__(31)
	exports['class'] = __webpack_require__(33)
	exports.el = __webpack_require__(34)
	exports.ref = __webpack_require__(35)
	exports.cloak = __webpack_require__(36)
	exports.style = __webpack_require__(37)
	exports.transition = __webpack_require__(38)

	// event listener directives
	exports.on = __webpack_require__(41)
	exports.model = __webpack_require__(42)

	// logic control directives
	exports.repeat = __webpack_require__(47)
	exports['if'] = __webpack_require__(48)

	// internal directives that should not be used directly
	// but we still want to expose them for advanced usage.
	exports._component = __webpack_require__(25)
	exports._prop = __webpack_require__(18)


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)

	module.exports = {

	  bind: function () {
	    this.attr = this.el.nodeType === 3
	      ? 'data'
	      : 'textContent'
	  },

	  update: function (value) {
	    this.el[this.attr] = _.toString(value)
	  }
	}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var templateParser = __webpack_require__(24)

	module.exports = {

	  bind: function () {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = []
	      // replace the placeholder with proper anchor
	      this.anchor = _.createAnchor('v-html')
	      _.replace(this.el, this.anchor)
	    }
	  },

	  update: function (value) {
	    value = _.toString(value)
	    if (this.nodes) {
	      this.swap(value)
	    } else {
	      this.el.innerHTML = value
	    }
	  },

	  swap: function (value) {
	    // remove old nodes
	    var i = this.nodes.length
	    while (i--) {
	      _.remove(this.nodes[i])
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = templateParser.parse(value, true, true)
	    // save a reference to these nodes so we can remove later
	    this.nodes = _.toArray(frag.childNodes)
	    _.before(frag, this.anchor)
	  }
	}


/***/ },
/* 30 */
/***/ function(module, exports) {

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink'
	var xlinkRE = /^xlink:/

	module.exports = {

	  priority: 850,

	  update: function (value) {
	    if (this.arg) {
	      this.setAttr(this.arg, value)
	    } else if (typeof value === 'object') {
	      this.objectHandler(value)
	    }
	  },

	  objectHandler: function (value) {
	    // cache object attrs so that only changed attrs
	    // are actually updated.
	    var cache = this.cache || (this.cache = {})
	    var attr, val
	    for (attr in cache) {
	      if (!(attr in value)) {
	        this.setAttr(attr, null)
	        delete cache[attr]
	      }
	    }
	    for (attr in value) {
	      val = value[attr]
	      if (val !== cache[attr]) {
	        cache[attr] = val
	        this.setAttr(attr, val)
	      }
	    }
	  },

	  setAttr: function (attr, value) {
	    if (attr === 'value' && attr in this.el) {
	      if (!this.valueRemoved) {
	        this.el.removeAttribute(attr)
	        this.valueRemoved = true
	      }
	      this.el.value = value
	    } else if (value != null && value !== false) {
	      if (xlinkRE.test(attr)) {
	        this.el.setAttributeNS(xlinkNS, attr, value)
	      } else {
	        this.el.setAttribute(attr, value)
	      }
	    } else {
	      this.el.removeAttribute(attr)
	    }
	  }
	}


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var transition = __webpack_require__(32)

	module.exports = function (value) {
	  var el = this.el
	  transition.apply(el, value ? 1 : -1, function () {
	    el.style.display = value ? '' : 'none'
	  }, this.vm)
	}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	exports.append = function (el, target, vm, cb) {
	  apply(el, 1, function () {
	    target.appendChild(el)
	  }, vm, cb)
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	exports.before = function (el, target, vm, cb) {
	  apply(el, 1, function () {
	    _.before(el, target)
	  }, vm, cb)
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	exports.remove = function (el, vm, cb) {
	  apply(el, -1, function () {
	    _.remove(el)
	  }, vm, cb)
	}

	/**
	 * Remove by appending to another parent with transition.
	 * This is only used in block operations.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	exports.removeThenAppend = function (el, target, vm, cb) {
	  apply(el, -1, function () {
	    target.appendChild(el)
	  }, vm, cb)
	}

	/**
	 * Append the childNodes of a fragment to target.
	 *
	 * @param {DocumentFragment} block
	 * @param {Node} target
	 * @param {Vue} vm
	 */

	exports.blockAppend = function (block, target, vm) {
	  var nodes = _.toArray(block.childNodes)
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    exports.before(nodes[i], target, vm)
	  }
	}

	/**
	 * Remove a block of nodes between two edge nodes.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 */

	exports.blockRemove = function (start, end, vm) {
	  var node = start.nextSibling
	  var next
	  while (node !== end) {
	    next = node.nextSibling
	    exports.remove(node, vm)
	    node = next
	  }
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	var apply = exports.apply = function (el, direction, op, vm, cb) {
	  var transition = el.__v_trans
	  if (
	    !transition ||
	    // skip if there are no js hooks and CSS transition is
	    // not supported
	    (!transition.hooks && !_.transitionEndEvent) ||
	    // skip transitions for initial compile
	    !vm._isCompiled ||
	    // if the vm is being manipulated by a parent directive
	    // during the parent's compilation phase, skip the
	    // animation.
	    (vm.$parent && !vm.$parent._isCompiled)
	  ) {
	    op()
	    if (cb) cb()
	    return
	  }
	  var action = direction > 0 ? 'enter' : 'leave'
	  transition[action](op, cb)
	}


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var addClass = _.addClass
	var removeClass = _.removeClass

	module.exports = {

	  bind: function () {
	    // interpolations like class="{{abc}}" are converted
	    // to v-class, and we need to remove the raw,
	    // uninterpolated className at binding time.
	    var raw = this._descriptor._rawClass
	    if (raw) {
	      this.prevKeys = raw.trim().split(/\s+/)
	    }
	  },

	  update: function (value) {
	    if (this.arg) {
	      // single toggle
	      if (value) {
	        addClass(this.el, this.arg)
	      } else {
	        removeClass(this.el, this.arg)
	      }
	    } else {
	      if (value && typeof value === 'string') {
	        this.handleObject(stringToObject(value))
	      } else if (_.isPlainObject(value)) {
	        this.handleObject(value)
	      } else {
	        this.cleanup()
	      }
	    }
	  },

	  handleObject: function (value) {
	    this.cleanup(value)
	    var keys = this.prevKeys = Object.keys(value)
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i]
	      if (value[key]) {
	        addClass(this.el, key)
	      } else {
	        removeClass(this.el, key)
	      }
	    }
	  },

	  cleanup: function (value) {
	    if (this.prevKeys) {
	      var i = this.prevKeys.length
	      while (i--) {
	        var key = this.prevKeys[i]
	        if (!value || !value.hasOwnProperty(key)) {
	          removeClass(this.el, key)
	        }
	      }
	    }
	  }
	}

	function stringToObject (value) {
	  var res = {}
	  var keys = value.trim().split(/\s+/)
	  var i = keys.length
	  while (i--) {
	    res[keys[i]] = true
	  }
	  return res
	}


/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = {

	  isLiteral: true,

	  bind: function () {
	    this.vm.$$[this.expression] = this.el
	  },

	  unbind: function () {
	    delete this.vm.$$[this.expression]
	  }
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)

	module.exports = {

	  isLiteral: true,

	  bind: function () {
	    var vm = this.el.__vue__
	    if (!vm) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'v-ref should only be used on a component root element.'
	      )
	      return
	    }
	    // If we get here, it means this is a `v-ref` on a
	    // child, because parent scope `v-ref` is stripped in
	    // `v-component` already. So we just record our own ref
	    // here - it will overwrite parent ref in `v-component`,
	    // if any.
	    vm._refID = this.expression
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(7)

	module.exports = {
	  bind: function () {
	    var el = this.el
	    this.vm.$once('hook:compiled', function () {
	      el.removeAttribute(config.prefix + 'cloak')
	    })
	  }
	}


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var prefixes = ['-webkit-', '-moz-', '-ms-']
	var camelPrefixes = ['Webkit', 'Moz', 'ms']
	var importantRE = /!important;?$/
	var camelRE = /([a-z])([A-Z])/g
	var testEl = null
	var propCache = {}

	module.exports = {

	  deep: true,

	  update: function (value) {
	    if (this.arg) {
	      this.setProp(this.arg, value)
	    } else {
	      if (typeof value === 'object') {
	        this.objectHandler(value)
	      } else {
	        this.el.style.cssText = value
	      }
	    }
	  },

	  objectHandler: function (value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {})
	    var prop, val
	    for (prop in cache) {
	      if (!(prop in value)) {
	        this.setProp(prop, null)
	        delete cache[prop]
	      }
	    }
	    for (prop in value) {
	      val = value[prop]
	      if (val !== cache[prop]) {
	        cache[prop] = val
	        this.setProp(prop, val)
	      }
	    }
	  },

	  setProp: function (prop, value) {
	    prop = normalize(prop)
	    if (!prop) return // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += ''
	    if (value) {
	      var isImportant = importantRE.test(value)
	        ? 'important'
	        : ''
	      if (isImportant) {
	        value = value.replace(importantRE, '').trim()
	      }
	      this.el.style.setProperty(prop, value, isImportant)
	    } else {
	      this.el.style.removeProperty(prop)
	    }
	  }

	}

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize (prop) {
	  if (propCache[prop]) {
	    return propCache[prop]
	  }
	  var res = prefix(prop)
	  propCache[prop] = propCache[res] = res
	  return res
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix (prop) {
	  prop = prop.replace(camelRE, '$1-$2').toLowerCase()
	  var camel = _.camelize(prop)
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1)
	  if (!testEl) {
	    testEl = document.createElement('div')
	  }
	  if (camel in testEl.style) {
	    return prop
	  }
	  var i = prefixes.length
	  var prefixed
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper
	    if (prefixed in testEl.style) {
	      return prefixes[i] + prop
	    }
	  }
	}


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var Transition = __webpack_require__(39)

	module.exports = {

	  priority: 1000,
	  isLiteral: true,

	  bind: function () {
	    if (!this._isDynamicLiteral) {
	      this.update(this.expression)
	    }
	  },

	  update: function (id, oldId) {
	    var el = this.el
	    var vm = this.el.__vue__ || this.vm
	    var hooks = _.resolveAsset(vm.$options, 'transitions', id)
	    id = id || 'v'
	    el.__v_trans = new Transition(el, id, hooks, vm)
	    if (oldId) {
	      _.removeClass(el, oldId + '-transition')
	    }
	    _.addClass(el, id + '-transition')
	  }
	}


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var queue = __webpack_require__(40)
	var addClass = _.addClass
	var removeClass = _.removeClass
	var transitionEndEvent = _.transitionEndEvent
	var animationEndEvent = _.animationEndEvent
	var transDurationProp = _.transitionProp + 'Duration'
	var animDurationProp = _.animationProp + 'Duration'

	var TYPE_TRANSITION = 1
	var TYPE_ANIMATION = 2

	var uid = 0

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */

	function Transition (el, id, hooks, vm) {
	  this.id = uid++
	  this.el = el
	  this.enterClass = id + '-enter'
	  this.leaveClass = id + '-leave'
	  this.hooks = hooks
	  this.vm = vm
	  // async state
	  this.pendingCssEvent =
	  this.pendingCssCb =
	  this.cancel =
	  this.pendingJsCb =
	  this.op =
	  this.cb = null
	  this.justEntered = false
	  this.typeCache = {}
	  // bind
	  var self = this
	  ;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone']
	    .forEach(function (m) {
	      self[m] = _.bind(self[m], self)
	    })
	}

	var p = Transition.prototype

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p.enter = function (op, cb) {
	  this.cancelPending()
	  this.callHook('beforeEnter')
	  this.cb = cb
	  addClass(this.el, this.enterClass)
	  op()
	  this.callHookWithCb('enter')
	  this.cancel = this.hooks && this.hooks.enterCancelled
	  queue.push(this.enterNextTick)
	}

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p.enterNextTick = function () {
	  this.justEntered = true
	  _.nextTick(function () {
	    this.justEntered = false
	  }, this)
	  var type = this.getCssTransitionType(this.enterClass)
	  var enterDone = this.enterDone
	  if (type === TYPE_TRANSITION) {
	    // trigger transition by removing enter class now
	    removeClass(this.el, this.enterClass)
	    this.setupCssCb(transitionEndEvent, enterDone)
	  } else if (type === TYPE_ANIMATION) {
	    this.setupCssCb(animationEndEvent, enterDone)
	  } else if (!this.pendingJsCb) {
	    enterDone()
	  }
	}

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p.enterDone = function () {
	  this.cancel = this.pendingJsCb = null
	  removeClass(this.el, this.enterClass)
	  this.callHook('afterEnter')
	  if (this.cb) this.cb()
	}

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p.leave = function (op, cb) {
	  this.cancelPending()
	  this.callHook('beforeLeave')
	  this.op = op
	  this.cb = cb
	  addClass(this.el, this.leaveClass)
	  this.callHookWithCb('leave')
	  this.cancel = this.hooks && this.hooks.leaveCancelled
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone()
	    } else {
	      queue.push(this.leaveNextTick)
	    }
	  }
	}

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass)
	  if (type) {
	    var event = type === TYPE_TRANSITION
	      ? transitionEndEvent
	      : animationEndEvent
	    this.setupCssCb(event, this.leaveDone)
	  } else {
	    this.leaveDone()
	  }
	}

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p.leaveDone = function () {
	  this.cancel = this.pendingJsCb = null
	  this.op()
	  removeClass(this.el, this.leaveClass)
	  this.callHook('afterLeave')
	  if (this.cb) this.cb()
	  this.op = null
	}

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p.cancelPending = function () {
	  this.op = this.cb = null
	  var hasPending = false
	  if (this.pendingCssCb) {
	    hasPending = true
	    _.off(this.el, this.pendingCssEvent, this.pendingCssCb)
	    this.pendingCssEvent = this.pendingCssCb = null
	  }
	  if (this.pendingJsCb) {
	    hasPending = true
	    this.pendingJsCb.cancel()
	    this.pendingJsCb = null
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass)
	    removeClass(this.el, this.leaveClass)
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el)
	    this.cancel = null
	  }
	}

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el)
	  }
	}

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type]
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = _.cancellable(this[type + 'Done'])
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb)
	  }
	}

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (
	    !transitionEndEvent ||
	    // skip CSS transitions if page is not visible -
	    // this solves the issue of transitionend events not
	    // firing until the page is visible again.
	    // pageVisibility API is supported in IE10+, same as
	    // CSS transitions.
	    document.hidden ||
	    // explicit js-only transition
	    (this.hooks && this.hooks.css === false)
	  ) {
	    return
	  }
	  var type = this.typeCache[className]
	  if (type) return type
	  var inlineStyles = this.el.style
	  var computedStyles = window.getComputedStyle(this.el)
	  var transDuration =
	    inlineStyles[transDurationProp] ||
	    computedStyles[transDurationProp]
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION
	  } else {
	    var animDuration =
	      inlineStyles[animDurationProp] ||
	      computedStyles[animDurationProp]
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type
	  }
	  return type
	}

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event
	  var self = this
	  var el = this.el
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      _.off(el, event, onEnd)
	      self.pendingCssEvent = self.pendingCssCb = null
	      if (!self.pendingJsCb && cb) {
	        cb()
	      }
	    }
	  }
	  _.on(el, event, onEnd)
	}

	module.exports = Transition


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var queue = []
	var queued = false

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	exports.push = function (job) {
	  queue.push(job)
	  if (!queued) {
	    queued = true
	    _.nextTick(flush)
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush () {
	  // Force layout
	  var f = document.documentElement.offsetHeight
	  for (var i = 0; i < queue.length; i++) {
	    queue[i]()
	  }
	  queue = []
	  queued = false
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f
	}


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)

	module.exports = {

	  acceptStatement: true,
	  priority: 700,

	  bind: function () {
	    // deal with iframes
	    if (
	      this.el.tagName === 'IFRAME' &&
	      this.arg !== 'load'
	    ) {
	      var self = this
	      this.iframeBind = function () {
	        _.on(self.el.contentWindow, self.arg, self.handler)
	      }
	      _.on(this.el, 'load', this.iframeBind)
	    }
	  },

	  update: function (handler) {
	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Directive v-on="' + this.arg + ': ' +
	        this.expression + '" expects a function value, ' +
	        'got ' + handler
	      )
	      return
	    }
	    this.reset()
	    var vm = this.vm
	    this.handler = function (e) {
	      e.targetVM = vm
	      vm.$event = e
	      var res = handler(e)
	      vm.$event = null
	      return res
	    }
	    if (this.iframeBind) {
	      this.iframeBind()
	    } else {
	      _.on(this.el, this.arg, this.handler)
	    }
	  },

	  reset: function () {
	    var el = this.iframeBind
	      ? this.el.contentWindow
	      : this.el
	    if (this.handler) {
	      _.off(el, this.arg, this.handler)
	    }
	  },

	  unbind: function () {
	    this.reset()
	    _.off(this.el, 'load', this.iframeBind)
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)

	var handlers = {
	  text: __webpack_require__(43),
	  radio: __webpack_require__(44),
	  select: __webpack_require__(45),
	  checkbox: __webpack_require__(46)
	}

	module.exports = {

	  priority: 800,
	  twoWay: true,
	  handlers: handlers,

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   *     - TODO: more types may be supplied as a plugin
	   */

	  bind: function () {
	    // friendly warning...
	    this.checkFilters()
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'It seems you are using a read-only filter with ' +
	        'v-model. You might want to use a two-way filter ' +
	        'to ensure correct behavior.'
	      )
	    }
	    var el = this.el
	    var tag = el.tagName
	    var handler
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text
	    } else if (tag === 'SELECT') {
	      handler = handlers.select
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'v-model does not support element type: ' + tag
	      )
	      return
	    }
	    handler.bind.call(this)
	    this.update = handler.update
	    this.unbind = handler.unbind
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function () {
	    var filters = this.filters
	    if (!filters) return
	    var i = filters.length
	    while (i--) {
	      var filter = _.resolveAsset(this.vm.$options, 'filters', filters[i].name)
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true
	      }
	      if (filter.write) {
	        this.hasWrite = true
	      }
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)

	module.exports = {

	  bind: function () {
	    var self = this
	    var el = this.el

	    // check params
	    // - lazy: update model on "change" instead of "input"
	    var lazy = this._checkParam('lazy') != null
	    // - number: cast value into number when updating model.
	    var number = this._checkParam('number') != null
	    // - debounce: debounce the input listener
	    var debounce = parseInt(this._checkParam('debounce'), 10)

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false
	    if (!_.isAndroid) {
	      this.onComposeStart = function () {
	        composing = true
	      }
	      this.onComposeEnd = function () {
	        composing = false
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        self.listener()
	      }
	      _.on(el, 'compositionstart', this.onComposeStart)
	      _.on(el, 'compositionend', this.onComposeEnd)
	    }

	    function syncToModel () {
	      var val = number
	        ? _.toNumber(el.value)
	        : el.value
	      self.set(val)
	    }

	    // if the directive has filters, we need to
	    // record cursor position and restore it after updating
	    // the input with the filtered value.
	    // also force update for type="range" inputs to enable
	    // "lock in range" (see #506)
	    if (this.hasRead || el.type === 'range') {
	      this.listener = function () {
	        if (composing) return
	        var charsOffset
	        // some HTML5 input types throw error here
	        try {
	          // record how many chars from the end of input
	          // the cursor was at
	          charsOffset = el.value.length - el.selectionStart
	        } catch (e) {}
	        // Fix IE10/11 infinite update cycle
	        // https://github.com/yyx990803/vue/issues/592
	        /* istanbul ignore if */
	        if (charsOffset < 0) {
	          return
	        }
	        syncToModel()
	        _.nextTick(function () {
	          // force a value update, because in
	          // certain cases the write filters output the
	          // same result for different input values, and
	          // the Observer set events won't be triggered.
	          var newVal = self._watcher.value
	          self.update(newVal)
	          if (charsOffset != null) {
	            var cursorPos =
	              _.toString(newVal).length - charsOffset
	            el.setSelectionRange(cursorPos, cursorPos)
	          }
	        })
	      }
	    } else {
	      this.listener = function () {
	        if (composing) return
	        syncToModel()
	      }
	    }

	    if (debounce) {
	      this.listener = _.debounce(this.listener, debounce)
	    }

	    // Now attach the main listener

	    this.event = lazy ? 'change' : 'input'
	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function'
	    if (this.hasjQuery) {
	      jQuery(el).on(this.event, this.listener)
	    } else {
	      _.on(el, this.event, this.listener)
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && _.isIE9) {
	      this.onCut = function () {
	        _.nextTick(self.listener)
	      }
	      this.onDel = function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener()
	        }
	      }
	      _.on(el, 'cut', this.onCut)
	      _.on(el, 'keyup', this.onDel)
	    }

	    // set initial value if present
	    if (
	      el.hasAttribute('value') ||
	      (el.tagName === 'TEXTAREA' && el.value.trim())
	    ) {
	      this._initValue = number
	        ? _.toNumber(el.value)
	        : el.value
	    }
	  },

	  update: function (value) {
	    this.el.value = _.toString(value)
	  },

	  unbind: function () {
	    var el = this.el
	    if (this.hasjQuery) {
	      jQuery(el).off(this.event, this.listener)
	    } else {
	      _.off(el, this.event, this.listener)
	    }
	    if (this.onComposeStart) {
	      _.off(el, 'compositionstart', this.onComposeStart)
	      _.off(el, 'compositionend', this.onComposeEnd)
	    }
	    if (this.onCut) {
	      _.off(el, 'cut', this.onCut)
	      _.off(el, 'keyup', this.onDel)
	    }
	  }
	}


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)

	module.exports = {

	  bind: function () {
	    var self = this
	    var el = this.el
	    var number = this._checkParam('number') != null
	    function getValue () {
	      return number
	        ? _.toNumber(el.value)
	        : el.value
	    }
	    this.listener = function () {
	      self.set(getValue())
	    }
	    _.on(el, 'change', this.listener)
	    if (el.checked) {
	      this._initValue = getValue()
	    }
	  },

	  update: function (value) {
	    /* eslint-disable eqeqeq */
	    this.el.checked = value == this.el.value
	    /* eslint-enable eqeqeq */
	  },

	  unbind: function () {
	    _.off(this.el, 'change', this.listener)
	  }
	}


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var Watcher = __webpack_require__(19)
	var dirParser = __webpack_require__(17)

	module.exports = {

	  bind: function () {
	    var self = this
	    var el = this.el
	    // update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get())
	      }
	    }
	    // check options param
	    var optionsParam = this._checkParam('options')
	    if (optionsParam) {
	      initOptions.call(this, optionsParam)
	    }
	    this.number = this._checkParam('number') != null
	    this.multiple = el.hasAttribute('multiple')
	    this.listener = function () {
	      var value = self.multiple
	        ? getMultiValue(el)
	        : el.value
	      value = self.number
	        ? _.isArray(value)
	          ? value.map(_.toNumber)
	          : _.toNumber(value)
	        : value
	      self.set(value)
	    }
	    _.on(el, 'change', this.listener)
	    checkInitialValue.call(this)
	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate)
	  },

	  update: function (value) {
	    var el = this.el
	    el.selectedIndex = -1
	    if (!value && value !== 0) {
	      if (this.defaultOption) {
	        this.defaultOption.selected = true
	      }
	      return
	    }
	    var multi = this.multiple && _.isArray(value)
	    var options = el.options
	    var i = options.length
	    var option
	    while (i--) {
	      option = options[i]
	      /* eslint-disable eqeqeq */
	      option.selected = multi
	        ? indexOf(value, option.value) > -1
	        : value == option.value
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function () {
	    _.off(this.el, 'change', this.listener)
	    this.vm.$off('hook:attached', this.forceUpdate)
	    if (this.optionWatcher) {
	      this.optionWatcher.teardown()
	    }
	  }

	}

	/**
	 * Initialize the option list from the param.
	 *
	 * @param {String} expression
	 */

	function initOptions (expression) {
	  var self = this
	  var el = self.el
	  var defaultOption = self.defaultOption = self.el.options[0]
	  var descriptor = dirParser.parse(expression)[0]
	  function optionUpdateWatcher (value) {
	    if (_.isArray(value)) {
	      // clear old options.
	      // cannot reset innerHTML here because IE family get
	      // confused during compilation.
	      var i = el.options.length
	      while (i--) {
	        var option = el.options[i]
	        if (option !== defaultOption) {
	          el.removeChild(option)
	        }
	      }
	      buildOptions(el, value)
	      self.forceUpdate()
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Invalid options value for v-model: ' + value
	      )
	    }
	  }
	  this.optionWatcher = new Watcher(
	    this.vm,
	    descriptor.expression,
	    optionUpdateWatcher,
	    {
	      deep: true,
	      filters: descriptor.filters
	    }
	  )
	  // update with initial value
	  optionUpdateWatcher(this.optionWatcher.value)
	}

	/**
	 * Build up option elements. IE9 doesn't create options
	 * when setting innerHTML on <select> elements, so we have
	 * to use DOM API here.
	 *
	 * @param {Element} parent - a <select> or an <optgroup>
	 * @param {Array} options
	 */

	function buildOptions (parent, options) {
	  var op, el
	  for (var i = 0, l = options.length; i < l; i++) {
	    op = options[i]
	    if (!op.options) {
	      el = document.createElement('option')
	      if (typeof op === 'string') {
	        el.text = el.value = op
	      } else {
	        if (op.value != null) {
	          el.value = op.value
	        }
	        el.text = op.text || op.value || ''
	        if (op.disabled) {
	          el.disabled = true
	        }
	      }
	    } else {
	      el = document.createElement('optgroup')
	      el.label = op.label
	      buildOptions(el, op.options)
	    }
	    parent.appendChild(el)
	  }
	}

	/**
	 * Check the initial value for selected options.
	 */

	function checkInitialValue () {
	  var initValue
	  var options = this.el.options
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (options[i].hasAttribute('selected')) {
	      if (this.multiple) {
	        (initValue || (initValue = []))
	          .push(options[i].value)
	      } else {
	        initValue = options[i].value
	      }
	    }
	  }
	  if (typeof initValue !== 'undefined') {
	    this._initValue = this.number
	      ? _.toNumber(initValue)
	      : initValue
	  }
	}

	/**
	 * Helper to extract a value array for select[multiple]
	 *
	 * @param {SelectElement} el
	 * @return {Array}
	 */

	function getMultiValue (el) {
	  return Array.prototype.filter
	    .call(el.options, filterSelected)
	    .map(getOptionValue)
	}

	function filterSelected (op) {
	  return op.selected
	}

	function getOptionValue (op) {
	  return op.value || op.text
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with soft equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf (arr, val) {
	  var i = arr.length
	  while (i--) {
	    /* eslint-disable eqeqeq */
	    if (arr[i] == val) return i
	    /* eslint-enable eqeqeq */
	  }
	  return -1
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)

	module.exports = {

	  bind: function () {
	    var self = this
	    var el = this.el
	    this.listener = function () {
	      self.set(el.checked)
	    }
	    _.on(el, 'change', this.listener)
	    if (el.checked) {
	      this._initValue = el.checked
	    }
	  },

	  update: function (value) {
	    this.el.checked = !!value
	  },

	  unbind: function () {
	    _.off(this.el, 'change', this.listener)
	  }
	}


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var config = __webpack_require__(7)
	var isObject = _.isObject
	var isPlainObject = _.isPlainObject
	var textParser = __webpack_require__(15)
	var expParser = __webpack_require__(21)
	var templateParser = __webpack_require__(24)
	var compiler = __webpack_require__(12)
	var uid = 0

	// async component resolution states
	var UNRESOLVED = 0
	var PENDING = 1
	var RESOLVED = 2
	var ABORTED = 3

	module.exports = {

	  /**
	   * Setup.
	   */

	  bind: function () {
	    // support for item in array syntax
	    var inMatch = this.expression.match(/(.*) in (.*)/)
	    if (inMatch) {
	      this.arg = inMatch[1]
	      this._watcherExp = inMatch[2]
	    }
	    // uid as a cache identifier
	    this.id = '__v_repeat_' + (++uid)

	    // setup anchor nodes
	    this.start = _.createAnchor('v-repeat-start')
	    this.end = _.createAnchor('v-repeat-end')
	    _.replace(this.el, this.end)
	    _.before(this.start, this.end)

	    // check if this is a block repeat
	    this.template = _.isTemplate(this.el)
	      ? templateParser.parse(this.el, true)
	      : this.el

	    // check for trackby param
	    this.idKey = this._checkParam('track-by')
	    // check for transition stagger
	    var stagger = +this._checkParam('stagger')
	    this.enterStagger = +this._checkParam('enter-stagger') || stagger
	    this.leaveStagger = +this._checkParam('leave-stagger') || stagger

	    // check for v-ref/v-el
	    this.refID = this._checkParam(config.prefix + 'ref')
	    this.elID = this._checkParam(config.prefix + 'el')

	    // check other directives that need to be handled
	    // at v-repeat level
	    this.checkIf()
	    this.checkComponent()

	    // create cache object
	    this.cache = Object.create(null)

	    // some helpful tips...
	    /* istanbul ignore if */
	    if (
	      process.env.NODE_ENV !== 'production' &&
	      this.el.tagName === 'OPTION'
	    ) {
	      _.warn(
	        'Don\'t use v-repeat for v-model options; ' +
	        'use the `options` param instead: ' +
	        'http://vuejs.org/guide/forms.html#Dynamic_Select_Options'
	      )
	    }
	  },

	  /**
	   * Warn against v-if usage.
	   */

	  checkIf: function () {
	    if (_.attr(this.el, 'if') !== null) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Don\'t use v-if with v-repeat. ' +
	        'Use v-show or the "filterBy" filter instead.'
	      )
	    }
	  },

	  /**
	   * Check the component constructor to use for repeated
	   * instances. If static we resolve it now, otherwise it
	   * needs to be resolved at build time with actual data.
	   */

	  checkComponent: function () {
	    this.componentState = UNRESOLVED
	    var options = this.vm.$options
	    var id = _.checkComponent(this.el, options)
	    if (!id) {
	      // default constructor
	      this.Component = _.Vue
	      // inline repeats should inherit
	      this.inline = true
	      // important: transclude with no options, just
	      // to ensure block start and block end
	      this.template = compiler.transclude(this.template)
	      var copy = _.extend({}, options)
	      copy._asComponent = false
	      this._linkFn = compiler.compile(this.template, copy)
	    } else {
	      this.Component = null
	      this.asComponent = true
	      // check inline-template
	      if (this._checkParam('inline-template') !== null) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = _.extractContent(this.el, true)
	      }
	      var tokens = textParser.parse(id)
	      if (tokens) {
	        // dynamic component to be resolved later
	        var componentExp = textParser.tokensToExp(tokens)
	        this.componentGetter = expParser.parse(componentExp).get
	      } else {
	        // static
	        this.componentId = id
	        this.pendingData = null
	      }
	    }
	  },

	  resolveComponent: function () {
	    this.componentState = PENDING
	    this.vm._resolveComponent(this.componentId, _.bind(function (Component) {
	      if (this.componentState === ABORTED) {
	        return
	      }
	      this.Component = Component
	      this.componentState = RESOLVED
	      this.realUpdate(this.pendingData)
	      this.pendingData = null
	    }, this))
	  },

	    /**
	   * Resolve a dynamic component to use for an instance.
	   * The tricky part here is that there could be dynamic
	   * components depending on instance data.
	   *
	   * @param {Object} data
	   * @param {Object} meta
	   * @return {Function}
	   */

	  resolveDynamicComponent: function (data, meta) {
	    // create a temporary context object and copy data
	    // and meta properties onto it.
	    // use _.define to avoid accidentally overwriting scope
	    // properties.
	    var context = Object.create(this.vm)
	    var key
	    for (key in data) {
	      _.define(context, key, data[key])
	    }
	    for (key in meta) {
	      _.define(context, key, meta[key])
	    }
	    var id = this.componentGetter.call(context, context)
	    var Component = _.resolveAsset(this.vm.$options, 'components', id)
	    if (process.env.NODE_ENV !== 'production') {
	      _.assertAsset(Component, 'component', id)
	    }
	    if (!Component.options) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Async resolution is not supported for v-repeat ' +
	        '+ dynamic component. (component: ' + id + ')'
	      )
	      return _.Vue
	    }
	    return Component
	  },

	  /**
	   * Update.
	   * This is called whenever the Array mutates. If we have
	   * a component, we might need to wait for it to resolve
	   * asynchronously.
	   *
	   * @param {Array|Number|String} data
	   */

	  update: function (data) {
	    if (this.componentId) {
	      var state = this.componentState
	      if (state === UNRESOLVED) {
	        this.pendingData = data
	        // once resolved, it will call realUpdate
	        this.resolveComponent()
	      } else if (state === PENDING) {
	        this.pendingData = data
	      } else if (state === RESOLVED) {
	        this.realUpdate(data)
	      }
	    } else {
	      this.realUpdate(data)
	    }
	  },

	  /**
	   * The real update that actually modifies the DOM.
	   *
	   * @param {Array|Number|String} data
	   */

	  realUpdate: function (data) {
	    this.vms = this.diff(data, this.vms)
	    // update v-ref
	    if (this.refID) {
	      this.vm.$[this.refID] = this.converted
	        ? toRefObject(this.vms)
	        : this.vms
	    }
	    if (this.elID) {
	      this.vm.$$[this.elID] = this.vms.map(function (vm) {
	        return vm.$el
	      })
	    }
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   * @param {Array} oldVms
	   * @return {Array}
	   */

	  diff: function (data, oldVms) {
	    var idKey = this.idKey
	    var converted = this.converted
	    var start = this.start
	    var end = this.end
	    var inDoc = _.inDoc(start)
	    var alias = this.arg
	    var init = !oldVms
	    var vms = new Array(data.length)
	    var obj, raw, vm, i, l, primitive
	    // First pass, go through the new Array and fill up
	    // the new vms array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      obj = data[i]
	      raw = converted ? obj.$value : obj
	      primitive = !isObject(raw)
	      vm = !init && this.getVm(raw, i, converted ? obj.$key : null)
	      if (vm) { // reusable instance
	        vm._reused = true
	        vm.$index = i // update $index
	        // update data for track-by or object repeat,
	        // since in these two cases the data is replaced
	        // rather than mutated.
	        if (idKey || converted || primitive) {
	          if (alias) {
	            vm[alias] = raw
	          } else if (_.isPlainObject(raw)) {
	            vm.$data = raw
	          } else {
	            vm.$value = raw
	          }
	        }
	      } else { // new instance
	        vm = this.build(obj, i, true)
	        vm._reused = false
	      }
	      vms[i] = vm
	      // insert if this is first run
	      if (init) {
	        vm.$before(end)
	      }
	    }
	    // if this is the first run, we're done.
	    if (init) {
	      return vms
	    }
	    // Second pass, go through the old vm instances and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0
	    var totalRemoved = oldVms.length - vms.length
	    for (i = 0, l = oldVms.length; i < l; i++) {
	      vm = oldVms[i]
	      if (!vm._reused) {
	        this.uncacheVm(vm)
	        vm.$destroy(false, true) // defer cleanup until removal
	        this.remove(vm, removalIndex++, totalRemoved, inDoc)
	      }
	    }
	    // final pass, move/insert new instances into the
	    // right place.
	    var targetPrev, prevEl, currentPrev
	    var insertionIndex = 0
	    for (i = 0, l = vms.length; i < l; i++) {
	      vm = vms[i]
	      // this is the vm that we should be after
	      targetPrev = vms[i - 1]
	      prevEl = targetPrev
	        ? targetPrev._staggerCb
	          ? targetPrev._staggerAnchor
	          : targetPrev._fragmentEnd || targetPrev.$el
	        : start
	      if (vm._reused && !vm._staggerCb) {
	        currentPrev = findPrevVm(vm, start, this.id)
	        if (currentPrev !== targetPrev) {
	          this.move(vm, prevEl)
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(vm, insertionIndex++, prevEl, inDoc)
	      }
	      vm._reused = false
	    }
	    return vms
	  },

	  /**
	   * Build a new instance and cache it.
	   *
	   * @param {Object} data
	   * @param {Number} index
	   * @param {Boolean} needCache
	   */

	  build: function (data, index, needCache) {
	    var meta = { $index: index }
	    if (this.converted) {
	      meta.$key = data.$key
	    }
	    var raw = this.converted ? data.$value : data
	    var alias = this.arg
	    if (alias) {
	      data = {}
	      data[alias] = raw
	    } else if (!isPlainObject(raw)) {
	      // non-object values
	      data = {}
	      meta.$value = raw
	    } else {
	      // default
	      data = raw
	    }
	    // resolve constructor
	    var Component = this.Component || this.resolveDynamicComponent(data, meta)
	    var parent = this._host || this.vm
	    var vm = parent.$addChild({
	      el: templateParser.clone(this.template),
	      data: data,
	      inherit: this.inline,
	      template: this.inlineTemplate,
	      // repeater meta, e.g. $index, $key
	      _meta: meta,
	      // mark this as an inline-repeat instance
	      _repeat: this.inline,
	      // is this a component?
	      _asComponent: this.asComponent,
	      // linker cachable if no inline-template
	      _linkerCachable: !this.inlineTemplate && Component !== _.Vue,
	      // pre-compiled linker for simple repeats
	      _linkFn: this._linkFn,
	      // identifier, shows that this vm belongs to this collection
	      _repeatId: this.id,
	      // transclusion content owner
	      _context: this.vm
	    }, Component)
	    // cache instance
	    if (needCache) {
	      this.cacheVm(raw, vm, index, this.converted ? meta.$key : null)
	    }
	    // sync back changes for two-way bindings of primitive values
	    var dir = this
	    if (this.rawType === 'object' && isPrimitive(raw)) {
	      vm.$watch(alias || '$value', function (val) {
	        if (dir.filters) {
	          process.env.NODE_ENV !== 'production' && _.warn(
	            'You seem to be mutating the $value reference of ' +
	            'a v-repeat instance (likely through v-model) ' +
	            'and filtering the v-repeat at the same time. ' +
	            'This will not work properly with an Array of ' +
	            'primitive values. Please use an Array of ' +
	            'Objects instead.'
	          )
	        }
	        dir._withLock(function () {
	          if (dir.converted) {
	            dir.rawValue[vm.$key] = val
	          } else {
	            dir.rawValue.$set(vm.$index, val)
	          }
	        })
	      })
	    }
	    return vm
	  },

	  /**
	   * Unbind, teardown everything
	   */

	  unbind: function () {
	    this.componentState = ABORTED
	    if (this.refID) {
	      this.vm.$[this.refID] = null
	    }
	    if (this.vms) {
	      var i = this.vms.length
	      var vm
	      while (i--) {
	        vm = this.vms[i]
	        this.uncacheVm(vm)
	        vm.$destroy()
	      }
	    }
	  },

	  /**
	   * Cache a vm instance based on its data.
	   *
	   * If the data is an object, we save the vm's reference on
	   * the data object as a hidden property. Otherwise we
	   * cache them in an object and for each primitive value
	   * there is an array in case there are duplicates.
	   *
	   * @param {Object} data
	   * @param {Vue} vm
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheVm: function (data, vm, index, key) {
	    var idKey = this.idKey
	    var cache = this.cache
	    var primitive = !isObject(data)
	    var id
	    if (key || idKey || primitive) {
	      id = idKey
	        ? idKey === '$index'
	          ? index
	          : data[idKey]
	        : (key || index)
	      if (!cache[id]) {
	        cache[id] = vm
	      } else if (!primitive && idKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'Duplicate track-by key in v-repeat: ' + id
	        )
	      }
	    } else {
	      id = this.id
	      if (data.hasOwnProperty(id)) {
	        if (data[id] === null) {
	          data[id] = vm
	        } else {
	          process.env.NODE_ENV !== 'production' && _.warn(
	            'Duplicate objects are not supported in v-repeat ' +
	            'when using components or transitions.'
	          )
	        }
	      } else {
	        _.define(data, id, vm)
	      }
	    }
	    vm._raw = data
	  },

	  /**
	   * Try to get a cached instance from a piece of data.
	   *
	   * @param {Object} data
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Vue|undefined}
	   */

	  getVm: function (data, index, key) {
	    var idKey = this.idKey
	    var primitive = !isObject(data)
	    if (key || idKey || primitive) {
	      var id = idKey
	        ? idKey === '$index'
	          ? index
	          : data[idKey]
	        : (key || index)
	      return this.cache[id]
	    } else {
	      return data[this.id]
	    }
	  },

	  /**
	   * Delete a cached vm instance.
	   *
	   * @param {Vue} vm
	   */

	  uncacheVm: function (vm) {
	    var data = vm._raw
	    var idKey = this.idKey
	    var index = vm.$index
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = vm.hasOwnProperty('$key') && vm.$key
	    var primitive = !isObject(data)
	    if (idKey || key || primitive) {
	      var id = idKey
	        ? idKey === '$index'
	          ? index
	          : data[idKey]
	        : (key || index)
	      this.cache[id] = null
	    } else {
	      data[this.id] = null
	      vm._raw = null
	    }
	  },

	  /**
	   * Insert an instance.
	   *
	   * @param {Vue} vm
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDoc
	   */

	  insert: function (vm, index, prevEl, inDoc) {
	    if (vm._staggerCb) {
	      vm._staggerCb.cancel()
	      vm._staggerCb = null
	    }
	    var staggerAmount = this.getStagger(vm, index, null, 'enter')
	    if (inDoc && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = vm._staggerAnchor
	      if (!anchor) {
	        anchor = vm._staggerAnchor = _.createAnchor('stagger-anchor')
	        anchor.__vue__ = vm
	      }
	      _.after(anchor, prevEl)
	      var op = vm._staggerCb = _.cancellable(function () {
	        vm._staggerCb = null
	        vm.$before(anchor)
	        _.remove(anchor)
	      })
	      setTimeout(op, staggerAmount)
	    } else {
	      vm.$after(prevEl)
	    }
	  },

	  /**
	   * Move an already inserted instance.
	   *
	   * @param {Vue} vm
	   * @param {Node} prevEl
	   */

	  move: function (vm, prevEl) {
	    vm.$after(prevEl, null, false)
	  },

	  /**
	   * Remove an instance.
	   *
	   * @param {Vue} vm
	   * @param {Number} index
	   * @param {Boolean} inDoc
	   */

	  remove: function (vm, index, total, inDoc) {
	    if (vm._staggerCb) {
	      vm._staggerCb.cancel()
	      vm._staggerCb = null
	      // it's not possible for the same vm to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this vm is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return
	    }
	    var staggerAmount = this.getStagger(vm, index, total, 'leave')
	    if (inDoc && staggerAmount) {
	      var op = vm._staggerCb = _.cancellable(function () {
	        vm._staggerCb = null
	        remove()
	      })
	      setTimeout(op, staggerAmount)
	    } else {
	      remove()
	    }
	    function remove () {
	      vm.$remove(function () {
	        vm._cleanup()
	      })
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Vue} vm
	   * @param {Number} index
	   * @param {String} type
	   * @param {Number} total
	   */

	  getStagger: function (vm, index, total, type) {
	    type = type + 'Stagger'
	    var transition = vm.$el.__v_trans
	    var hooks = transition && transition.hooks
	    var hook = hooks && (hooks[type] || hooks.stagger)
	    return hook
	      ? hook.call(vm, index, total)
	      : index * this[type]
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters, and convert non-Array objects to arrays.
	   *
	   * This function will be bound to this directive instance
	   * and passed into the watcher.
	   *
	   * @param {*} value
	   * @return {Array}
	   * @private
	   */

	  _preProcess: function (value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value
	    var type = this.rawType = typeof value
	    if (!isPlainObject(value)) {
	      this.converted = false
	      if (type === 'number') {
	        value = range(value)
	      } else if (type === 'string') {
	        value = _.toArray(value)
	      }
	      return value || []
	    } else {
	      // convert plain object to array.
	      var keys = Object.keys(value)
	      var i = keys.length
	      var res = new Array(i)
	      var key
	      while (i--) {
	        key = keys[i]
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        }
	      }
	      this.converted = true
	      return res
	    }
	  }
	}

	/**
	 * Helper to find the previous element that is an instance
	 * root node. This is necessary because a destroyed vm's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its __vue__ reference
	 * should have been removed so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return vm that is bound to this v-repeat. (see #929)
	 *
	 * @param {Vue} vm
	 * @param {Comment|Text} anchor
	 * @return {Vue}
	 */

	function findPrevVm (vm, anchor, id) {
	  var el = vm.$el.previousSibling
	  /* istanbul ignore if */
	  if (!el) return
	  while (
	    (!el.__vue__ || el.__vue__.$options._repeatId !== id) &&
	    el !== anchor
	  ) {
	    el = el.previousSibling
	  }
	  return el.__vue__
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range (n) {
	  var i = -1
	  var ret = new Array(n)
	  while (++i < n) {
	    ret[i] = i
	  }
	  return ret
	}

	/**
	 * Convert a vms array to an object ref for v-ref on an
	 * Object value.
	 *
	 * @param {Array} vms
	 * @return {Object}
	 */

	function toRefObject (vms) {
	  var ref = {}
	  for (var i = 0, l = vms.length; i < l; i++) {
	    ref[vms[i].$key] = vms[i]
	  }
	  return ref
	}

	/**
	 * Check if a value is a primitive one:
	 * String, Number, Boolean, null or undefined.
	 *
	 * @param {*} value
	 * @return {Boolean}
	 */

	function isPrimitive (value) {
	  var type = typeof value
	  return value == null ||
	    type === 'string' ||
	    type === 'number' ||
	    type === 'boolean'
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var compiler = __webpack_require__(12)
	var templateParser = __webpack_require__(24)
	var transition = __webpack_require__(32)
	var Cache = __webpack_require__(16)
	var cache = new Cache(1000)

	module.exports = {

	  bind: function () {
	    var el = this.el
	    if (!el.__vue__) {
	      this.start = _.createAnchor('v-if-start')
	      this.end = _.createAnchor('v-if-end')
	      _.replace(el, this.end)
	      _.before(this.start, this.end)
	      if (_.isTemplate(el)) {
	        this.template = templateParser.parse(el, true)
	      } else {
	        this.template = document.createDocumentFragment()
	        this.template.appendChild(templateParser.clone(el))
	      }
	      // compile the nested partial
	      var cacheId = (this.vm.constructor.cid || '') + el.outerHTML
	      this.linker = cache.get(cacheId)
	      if (!this.linker) {
	        this.linker = compiler.compile(
	          this.template,
	          this.vm.$options,
	          true, // partial
	          this._host // important
	        )
	        cache.put(cacheId, this.linker)
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'v-if="' + this.expression + '" cannot be ' +
	        'used on an instance root element.'
	      )
	      this.invalid = true
	    }
	  },

	  update: function (value) {
	    if (this.invalid) return
	    if (value) {
	      // avoid duplicate compiles, since update() can be
	      // called with different truthy values
	      if (!this.unlink) {
	        this.link(
	          templateParser.clone(this.template),
	          this.linker
	        )
	      }
	    } else {
	      this.teardown()
	    }
	  },

	  link: function (frag, linker) {
	    var vm = this.vm
	    this.unlink = linker(vm, frag)
	    transition.blockAppend(frag, this.end, vm)
	    // call attached for all the child components created
	    // during the compilation
	    if (_.inDoc(vm.$el)) {
	      var children = this.getContainedComponents()
	      if (children) children.forEach(callAttach)
	    }
	  },

	  teardown: function () {
	    if (!this.unlink) return
	    // collect children beforehand
	    var children
	    if (_.inDoc(this.vm.$el)) {
	      children = this.getContainedComponents()
	    }
	    transition.blockRemove(this.start, this.end, this.vm)
	    if (children) children.forEach(callDetach)
	    this.unlink()
	    this.unlink = null
	  },

	  getContainedComponents: function () {
	    var vm = this.vm
	    var start = this.start.nextSibling
	    var end = this.end

	    function contains (c) {
	      var cur = start
	      var next
	      while (next !== end) {
	        next = cur.nextSibling
	        if (
	          cur === c.$el ||
	          cur.contains && cur.contains(c.$el)
	        ) {
	          return true
	        }
	        cur = next
	      }
	      return false
	    }

	    return vm.$children.length &&
	      vm.$children.filter(contains)
	  },

	  unbind: function () {
	    if (this.unlink) this.unlink()
	  }

	}

	function callAttach (child) {
	  if (!child._isAttached) {
	    child._callHook('attached')
	  }
	}

	function callDetach (child) {
	  if (child._isAttached) {
	    child._callHook('detached')
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	exports.content = __webpack_require__(50)
	exports.partial = __webpack_require__(51)


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var clone = __webpack_require__(24).clone

	// This is the elementDirective that handles <content>
	// transclusions. It relies on the raw content of an
	// instance being stored as `$options._content` during
	// the transclude phase.

	module.exports = {

	  bind: function () {
	    var vm = this.vm
	    var host = vm
	    // we need find the content context, which is the
	    // closest non-inline-repeater instance.
	    while (host.$options._repeat) {
	      host = host.$parent
	    }
	    var raw = host.$options._content
	    var content
	    if (!raw) {
	      this.fallback()
	      return
	    }
	    var context = host._context
	    var selector = this._checkParam('select')
	    if (!selector) {
	      // Default content
	      var self = this
	      var compileDefaultContent = function () {
	        self.compile(
	          extractFragment(raw.childNodes, raw, true),
	          context,
	          vm
	        )
	      }
	      if (!host._isCompiled) {
	        // defer until the end of instance compilation,
	        // because the default outlet must wait until all
	        // other possible outlets with selectors have picked
	        // out their contents.
	        host.$once('hook:compiled', compileDefaultContent)
	      } else {
	        compileDefaultContent()
	      }
	    } else {
	      // select content
	      var nodes = raw.querySelectorAll(selector)
	      if (nodes.length) {
	        content = extractFragment(nodes, raw)
	        if (content.hasChildNodes()) {
	          this.compile(content, context, vm)
	        } else {
	          this.fallback()
	        }
	      } else {
	        this.fallback()
	      }
	    }
	  },

	  fallback: function () {
	    this.compile(_.extractContent(this.el, true), this.vm)
	  },

	  compile: function (content, context, host) {
	    if (content && context) {
	      this.unlink = context.$compile(content, host)
	    }
	    if (content) {
	      _.replace(this.el, content)
	    } else {
	      _.remove(this.el)
	    }
	  },

	  unbind: function () {
	    if (this.unlink) {
	      this.unlink()
	    }
	  }
	}

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @param {Element} parent
	 * @param {Boolean} main
	 * @return {DocumentFragment}
	 */

	function extractFragment (nodes, parent, main) {
	  var frag = document.createDocumentFragment()
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i]
	    // if this is the main outlet, we want to skip all
	    // previously selected nodes;
	    // otherwise, we want to mark the node as selected.
	    // clone the node so the original raw content remains
	    // intact. this ensures proper re-compilation in cases
	    // where the outlet is inside a conditional block
	    if (main && !node.__v_selected) {
	      frag.appendChild(clone(node))
	    } else if (!main && node.parentNode === parent) {
	      node.__v_selected = true
	      frag.appendChild(clone(node))
	    }
	  }
	  return frag
	}


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var templateParser = __webpack_require__(24)
	var textParser = __webpack_require__(15)
	var compiler = __webpack_require__(12)
	var Cache = __webpack_require__(16)
	var cache = new Cache(1000)

	// v-partial reuses logic from v-if
	var vIf = __webpack_require__(48)

	module.exports = {

	  link: vIf.link,
	  teardown: vIf.teardown,
	  getContainedComponents: vIf.getContainedComponents,

	  bind: function () {
	    var el = this.el
	    this.start = _.createAnchor('v-partial-start')
	    this.end = _.createAnchor('v-partial-end')
	    _.replace(el, this.end)
	    _.before(this.start, this.end)
	    var id = el.getAttribute('name')
	    var tokens = textParser.parse(id)
	    if (tokens) {
	      // dynamic partial
	      this.setupDynamic(tokens)
	    } else {
	      // static partial
	      this.insert(id)
	    }
	  },

	  setupDynamic: function (tokens) {
	    var self = this
	    var exp = textParser.tokensToExp(tokens)
	    this.unwatch = this.vm.$watch(exp, function (value) {
	      self.teardown()
	      self.insert(value)
	    }, {
	      immediate: true,
	      user: false
	    })
	  },

	  insert: function (id) {
	    var partial = _.resolveAsset(this.vm.$options, 'partials', id)
	    if (process.env.NODE_ENV !== 'production') {
	      _.assertAsset(partial, 'partial', id)
	    }
	    if (partial) {
	      var frag = templateParser.parse(partial, true)
	      // cache partials based on constructor id.
	      var cacheId = (this.vm.constructor.cid || '') + partial
	      var linker = this.compile(frag, cacheId)
	      // this is provided by v-if
	      this.link(frag, linker)
	    }
	  },

	  compile: function (frag, cacheId) {
	    var hit = cache.get(cacheId)
	    if (hit) return hit
	    var linker = compiler.compile(frag, this.vm.$options, true)
	    cache.put(cacheId, linker)
	    return linker
	  },

	  unbind: function () {
	    if (this.unlink) this.unlink()
	    if (this.unwatch) this.unwatch()
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)

	/**
	 * Stringify value.
	 *
	 * @param {Number} indent
	 */

	exports.json = {
	  read: function (value, indent) {
	    return typeof value === 'string'
	      ? value
	      : JSON.stringify(value, null, Number(indent) || 2)
	  },
	  write: function (value) {
	    try {
	      return JSON.parse(value)
	    } catch (e) {
	      return value
	    }
	  }
	}

	/**
	 * 'abc' => 'Abc'
	 */

	exports.capitalize = function (value) {
	  if (!value && value !== 0) return ''
	  value = value.toString()
	  return value.charAt(0).toUpperCase() + value.slice(1)
	}

	/**
	 * 'abc' => 'ABC'
	 */

	exports.uppercase = function (value) {
	  return (value || value === 0)
	    ? value.toString().toUpperCase()
	    : ''
	}

	/**
	 * 'AbC' => 'abc'
	 */

	exports.lowercase = function (value) {
	  return (value || value === 0)
	    ? value.toString().toLowerCase()
	    : ''
	}

	/**
	 * 12345 => $12,345.00
	 *
	 * @param {String} sign
	 */

	var digitsRE = /(\d{3})(?=\d)/g
	exports.currency = function (value, currency) {
	  value = parseFloat(value)
	  if (!isFinite(value) || (!value && value !== 0)) return ''
	  currency = currency || '$'
	  var stringified = Math.abs(value).toFixed(2)
	  var _int = stringified.slice(0, -3)
	  var i = _int.length % 3
	  var head = i > 0
	    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
	    : ''
	  var _float = stringified.slice(-3)
	  var sign = value < 0 ? '-' : ''
	  return currency + sign + head +
	    _int.slice(i).replace(digitsRE, '$1,') +
	    _float
	}

	/**
	 * 'item' => 'items'
	 *
	 * @params
	 *  an array of strings corresponding to
	 *  the single, double, triple ... forms of the word to
	 *  be pluralized. When the number to be pluralized
	 *  exceeds the length of the args, it will use the last
	 *  entry in the array.
	 *
	 *  e.g. ['single', 'double', 'triple', 'multiple']
	 */

	exports.pluralize = function (value) {
	  var args = _.toArray(arguments, 1)
	  return args.length > 1
	    ? (args[value % 10 - 1] || args[args.length - 1])
	    : (args[0] + (value === 1 ? '' : 's'))
	}

	/**
	 * A special filter that takes a handler function,
	 * wraps it so it only gets triggered on specific
	 * keypresses. v-on only.
	 *
	 * @param {String} key
	 */

	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  'delete': 46,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	}

	exports.key = function (handler, key) {
	  if (!handler) return
	  var code = keyCodes[key]
	  if (!code) {
	    code = parseInt(key, 10)
	  }
	  return function (e) {
	    if (e.keyCode === code) {
	      return handler.call(this, e)
	    }
	  }
	}

	// expose keycode hash
	exports.key.keyCodes = keyCodes

	/**
	 * Install special array filters
	 */

	_.extend(exports, __webpack_require__(53))


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var Path = __webpack_require__(22)

	/**
	 * Filter filter for v-repeat
	 *
	 * @param {String} searchKey
	 * @param {String} [delimiter]
	 * @param {String} dataKey
	 */

	exports.filterBy = function (arr, search, delimiter, dataKey) {
	  // allow optional `in` delimiter
	  // because why not
	  if (delimiter && delimiter !== 'in') {
	    dataKey = delimiter
	  }
	  if (search == null) {
	    return arr
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase()
	  return arr.filter(function (item) {
	    return dataKey
	      ? contains(Path.get(item, dataKey), search)
	      : contains(item, search)
	  })
	}

	/**
	 * Filter filter for v-repeat
	 *
	 * @param {String} sortKey
	 * @param {String} reverse
	 */

	exports.orderBy = function (arr, sortKey, reverse) {
	  if (!sortKey) {
	    return arr
	  }
	  var order = 1
	  if (arguments.length > 2) {
	    if (reverse === '-1') {
	      order = -1
	    } else {
	      order = reverse ? -1 : 1
	    }
	  }
	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(function (a, b) {
	    if (sortKey !== '$key' && sortKey !== '$value') {
	      if (a && '$value' in a) a = a.$value
	      if (b && '$value' in b) b = b.$value
	    }
	    a = _.isObject(a) ? Path.get(a, sortKey) : a
	    b = _.isObject(b) ? Path.get(b, sortKey) : b
	    return a === b ? 0 : a > b ? order : -order
	  })
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains (val, search) {
	  if (_.isPlainObject(val)) {
	    for (var key in val) {
	      if (contains(val[key], search)) {
	        return true
	      }
	    }
	  } else if (_.isArray(val)) {
	    var i = val.length
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1
	  }
	}


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var mergeOptions = __webpack_require__(2).mergeOptions

	/**
	 * The main init sequence. This is called for every
	 * instance, including ones that are created from extended
	 * constructors.
	 *
	 * @param {Object} options - this options object should be
	 *                           the result of merging class
	 *                           options and the options passed
	 *                           in to the constructor.
	 */

	exports._init = function (options) {

	  options = options || {}

	  this.$el = null
	  this.$parent = options._parent
	  this.$root = options._root || this
	  this.$children = []
	  this.$ = {}           // child vm references
	  this.$$ = {}          // element references
	  this._watchers = []   // all watchers as an array
	  this._directives = [] // all directives
	  this._childCtors = {} // inherit:true constructors

	  // a flag to avoid this being observed
	  this._isVue = true

	  // events bookkeeping
	  this._events = {}            // registered callbacks
	  this._eventsCount = {}       // for $broadcast optimization
	  this._eventCancelled = false // for event cancellation

	  // fragment instance properties
	  this._isFragment = false
	  this._fragmentStart =    // @type {CommentNode}
	  this._fragmentEnd = null // @type {CommentNode}

	  // lifecycle state
	  this._isCompiled =
	  this._isDestroyed =
	  this._isReady =
	  this._isAttached =
	  this._isBeingDestroyed = false
	  this._unlinkFn = null

	  // context: the scope in which the component was used,
	  // and the scope in which props and contents of this
	  // instance should be compiled in.
	  this._context =
	    options._context ||
	    options._parent

	  // push self into parent / transclusion host
	  if (this.$parent) {
	    this.$parent.$children.push(this)
	  }

	  // props used in v-repeat diffing
	  this._reused = false
	  this._staggerOp = null

	  // merge options.
	  options = this.$options = mergeOptions(
	    this.constructor.options,
	    options,
	    this
	  )

	  // initialize data as empty object.
	  // it will be filled up in _initScope().
	  this._data = {}

	  // initialize data observation and scope inheritance.
	  this._initScope()

	  // setup event system and option events.
	  this._initEvents()

	  // call created hook
	  this._callHook('created')

	  // if `el` option is passed, start compilation.
	  if (options.el) {
	    this.$mount(options.el)
	  }
	}


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var inDoc = _.inDoc

	/**
	 * Setup the instance's option events & watchers.
	 * If the value is a string, we pull it from the
	 * instance's methods by name.
	 */

	exports._initEvents = function () {
	  var options = this.$options
	  registerCallbacks(this, '$on', options.events)
	  registerCallbacks(this, '$watch', options.watch)
	}

	/**
	 * Register callbacks for option events and watchers.
	 *
	 * @param {Vue} vm
	 * @param {String} action
	 * @param {Object} hash
	 */

	function registerCallbacks (vm, action, hash) {
	  if (!hash) return
	  var handlers, key, i, j
	  for (key in hash) {
	    handlers = hash[key]
	    if (_.isArray(handlers)) {
	      for (i = 0, j = handlers.length; i < j; i++) {
	        register(vm, action, key, handlers[i])
	      }
	    } else {
	      register(vm, action, key, handlers)
	    }
	  }
	}

	/**
	 * Helper to register an event/watch callback.
	 *
	 * @param {Vue} vm
	 * @param {String} action
	 * @param {String} key
	 * @param {Function|String|Object} handler
	 * @param {Object} [options]
	 */

	function register (vm, action, key, handler, options) {
	  var type = typeof handler
	  if (type === 'function') {
	    vm[action](key, handler, options)
	  } else if (type === 'string') {
	    var methods = vm.$options.methods
	    var method = methods && methods[handler]
	    if (method) {
	      vm[action](key, method, options)
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Unknown method: "' + handler + '" when ' +
	        'registering callback for ' + action +
	        ': "' + key + '".'
	      )
	    }
	  } else if (handler && type === 'object') {
	    register(vm, action, key, handler.handler, handler)
	  }
	}

	/**
	 * Setup recursive attached/detached calls
	 */

	exports._initDOMHooks = function () {
	  this.$on('hook:attached', onAttached)
	  this.$on('hook:detached', onDetached)
	}

	/**
	 * Callback to recursively call attached hook on children
	 */

	function onAttached () {
	  if (!this._isAttached) {
	    this._isAttached = true
	    this.$children.forEach(callAttach)
	  }
	}

	/**
	 * Iterator to call attached hook
	 *
	 * @param {Vue} child
	 */

	function callAttach (child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached')
	  }
	}

	/**
	 * Callback to recursively call detached hook on children
	 */

	function onDetached () {
	  if (this._isAttached) {
	    this._isAttached = false
	    this.$children.forEach(callDetach)
	  }
	}

	/**
	 * Iterator to call detached hook
	 *
	 * @param {Vue} child
	 */

	function callDetach (child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached')
	  }
	}

	/**
	 * Trigger all handlers for a hook
	 *
	 * @param {String} hook
	 */

	exports._callHook = function (hook) {
	  var handlers = this.$options[hook]
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(this)
	    }
	  }
	  this.$emit('hook:' + hook)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var compiler = __webpack_require__(12)
	var Observer = __webpack_require__(57)
	var Dep = __webpack_require__(20)
	var Watcher = __webpack_require__(19)

	/**
	 * Setup the scope of an instance, which contains:
	 * - observed data
	 * - computed properties
	 * - user methods
	 * - meta properties
	 */

	exports._initScope = function () {
	  this._initProps()
	  this._initMeta()
	  this._initMethods()
	  this._initData()
	  this._initComputed()
	}

	/**
	 * Initialize props.
	 */

	exports._initProps = function () {
	  var options = this.$options
	  var el = options.el
	  var props = options.props
	  if (props && !el) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Props will not be compiled if no `el` option is ' +
	      'provided at instantiation.'
	    )
	  }
	  // make sure to convert string selectors into element now
	  el = options.el = _.query(el)
	  this._propsUnlinkFn = el && props
	    ? compiler.compileAndLinkProps(
	        this, el, props
	      )
	    : null
	}

	/**
	 * Initialize the data.
	 */

	exports._initData = function () {
	  var propsData = this._data
	  var optionsDataFn = this.$options.data
	  var optionsData = optionsDataFn && optionsDataFn()
	  if (optionsData) {
	    this._data = optionsData
	    for (var prop in propsData) {
	      if (
	        this._props[prop].raw !== null ||
	        !optionsData.hasOwnProperty(prop)
	      ) {
	        optionsData.$set(prop, propsData[prop])
	      }
	    }
	  }
	  var data = this._data
	  // proxy data on instance
	  var keys = Object.keys(data)
	  var i, key
	  i = keys.length
	  while (i--) {
	    key = keys[i]
	    if (!_.isReserved(key)) {
	      this._proxy(key)
	    }
	  }
	  // observe data
	  Observer.create(data, this)
	}

	/**
	 * Swap the isntance's $data. Called in $data's setter.
	 *
	 * @param {Object} newData
	 */

	exports._setData = function (newData) {
	  newData = newData || {}
	  var oldData = this._data
	  this._data = newData
	  var keys, key, i
	  // copy props.
	  // this should only happen during a v-repeat of component
	  // that also happens to have compiled props.
	  var props = this.$options.props
	  if (props) {
	    i = props.length
	    while (i--) {
	      key = props[i].name
	      if (key !== '$data' && !newData.hasOwnProperty(key)) {
	        newData.$set(key, oldData[key])
	      }
	    }
	  }
	  // unproxy keys not present in new data
	  keys = Object.keys(oldData)
	  i = keys.length
	  while (i--) {
	    key = keys[i]
	    if (!_.isReserved(key) && !(key in newData)) {
	      this._unproxy(key)
	    }
	  }
	  // proxy keys not already proxied,
	  // and trigger change for changed values
	  keys = Object.keys(newData)
	  i = keys.length
	  while (i--) {
	    key = keys[i]
	    if (!this.hasOwnProperty(key) && !_.isReserved(key)) {
	      // new property
	      this._proxy(key)
	    }
	  }
	  oldData.__ob__.removeVm(this)
	  Observer.create(newData, this)
	  this._digest()
	}

	/**
	 * Proxy a property, so that
	 * vm.prop === vm._data.prop
	 *
	 * @param {String} key
	 */

	exports._proxy = function (key) {
	  // need to store ref to self here
	  // because these getter/setters might
	  // be called by child instances!
	  var self = this
	  Object.defineProperty(self, key, {
	    configurable: true,
	    enumerable: true,
	    get: function proxyGetter () {
	      return self._data[key]
	    },
	    set: function proxySetter (val) {
	      self._data[key] = val
	    }
	  })
	}

	/**
	 * Unproxy a property.
	 *
	 * @param {String} key
	 */

	exports._unproxy = function (key) {
	  delete this[key]
	}

	/**
	 * Force update on every watcher in scope.
	 */

	exports._digest = function () {
	  var i = this._watchers.length
	  while (i--) {
	    this._watchers[i].update(true) // shallow updates
	  }
	  var children = this.$children
	  i = children.length
	  while (i--) {
	    var child = children[i]
	    if (child.$options.inherit) {
	      child._digest()
	    }
	  }
	}

	/**
	 * Setup computed properties. They are essentially
	 * special getter/setters
	 */

	function noop () {}
	exports._initComputed = function () {
	  var computed = this.$options.computed
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key]
	      var def = {
	        enumerable: true,
	        configurable: true
	      }
	      if (typeof userDef === 'function') {
	        def.get = makeComputedGetter(userDef, this)
	        def.set = noop
	      } else {
	        def.get = userDef.get
	          ? makeComputedGetter(userDef.get, this)
	          : noop
	        def.set = userDef.set
	          ? _.bind(userDef.set, this)
	          : noop
	      }
	      Object.defineProperty(this, key, def)
	    }
	  }
	}

	function makeComputedGetter (getter, owner) {
	  var watcher = new Watcher(owner, getter, null, {
	    lazy: true
	  })
	  return function computedGetter () {
	    if (watcher.dirty) {
	      watcher.evaluate()
	    }
	    if (Dep.target) {
	      watcher.depend()
	    }
	    return watcher.value
	  }
	}

	/**
	 * Setup instance methods. Methods must be bound to the
	 * instance since they might be called by children
	 * inheriting them.
	 */

	exports._initMethods = function () {
	  var methods = this.$options.methods
	  if (methods) {
	    for (var key in methods) {
	      this[key] = _.bind(methods[key], this)
	    }
	  }
	}

	/**
	 * Initialize meta information like $index, $key & $value.
	 */

	exports._initMeta = function () {
	  var metas = this.$options._meta
	  if (metas) {
	    for (var key in metas) {
	      this._defineMeta(key, metas[key])
	    }
	  }
	}

	/**
	 * Define a meta property, e.g $index, $key, $value
	 * which only exists on the vm instance but not in $data.
	 *
	 * @param {String} key
	 * @param {*} value
	 */

	exports._defineMeta = function (key, value) {
	  var dep = new Dep()
	  Object.defineProperty(this, key, {
	    enumerable: true,
	    configurable: true,
	    get: function metaGetter () {
	      if (Dep.target) {
	        dep.depend()
	      }
	      return value
	    },
	    set: function metaSetter (val) {
	      if (val !== value) {
	        value = val
	        dep.notify()
	      }
	    }
	  })
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var config = __webpack_require__(7)
	var Dep = __webpack_require__(20)
	var arrayMethods = __webpack_require__(58)
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods)
	__webpack_require__(59)

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer (value) {
	  this.value = value
	  this.dep = new Dep()
	  _.define(value, '__ob__', this)
	  if (_.isArray(value)) {
	    var augment = config.proto && _.hasProto
	      ? protoAugment
	      : copyAugment
	    augment(value, arrayMethods, arrayKeys)
	    this.observeArray(value)
	  } else {
	    this.walk(value)
	  }
	}

	// Static methods

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	Observer.create = function (value, vm) {
	  var ob
	  if (
	    value &&
	    value.hasOwnProperty('__ob__') &&
	    value.__ob__ instanceof Observer
	  ) {
	    ob = value.__ob__
	  } else if (
	    _.isObject(value) &&
	    !Object.isFrozen(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value)
	  }
	  if (ob && vm) {
	    ob.addVm(vm)
	  }
	  return ob
	}

	// Instance methods

	var p = Observer.prototype

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object. Properties prefixed with `$` or `_`
	 * and accessor properties are ignored.
	 *
	 * @param {Object} obj
	 */

	p.walk = function (obj) {
	  var keys = Object.keys(obj)
	  var i = keys.length
	  var key, prefix
	  while (i--) {
	    key = keys[i]
	    prefix = key.charCodeAt(0)
	    if (prefix !== 0x24 && prefix !== 0x5F) { // skip $ or _
	      this.convert(key, obj[key])
	    }
	  }
	}

	/**
	 * Try to carete an observer for a child value,
	 * and if value is array, link dep to the array.
	 *
	 * @param {*} val
	 * @return {Dep|undefined}
	 */

	p.observe = function (val) {
	  return Observer.create(val)
	}

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	p.observeArray = function (items) {
	  var i = items.length
	  while (i--) {
	    this.observe(items[i])
	  }
	}

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	p.convert = function (key, val) {
	  var ob = this
	  var childOb = ob.observe(val)
	  var dep = new Dep()
	  Object.defineProperty(ob.value, key, {
	    enumerable: true,
	    configurable: true,
	    get: function () {
	      if (Dep.target) {
	        dep.depend()
	        if (childOb) {
	          childOb.dep.depend()
	        }
	        if (_.isArray(val)) {
	          for (var e, i = 0, l = val.length; i < l; i++) {
	            e = val[i]
	            e && e.__ob__ && e.__ob__.dep.depend()
	          }
	        }
	      }
	      return val
	    },
	    set: function (newVal) {
	      if (newVal === val) return
	      val = newVal
	      childOb = ob.observe(newVal)
	      dep.notify()
	    }
	  })
	}

	/**
	 * Add an owner vm, so that when $add/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	p.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm)
	}

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	p.removeVm = function (vm) {
	  this.vms.$remove(vm)
	}

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function protoAugment (target, src) {
	  target.__proto__ = src
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment (target, src, keys) {
	  var i = keys.length
	  var key
	  while (i--) {
	    key = keys[i]
	    _.define(target, key, src[key])
	  }
	}

	module.exports = Observer


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var arrayProto = Array.prototype
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method]
	  _.define(arrayMethods, method, function mutator () {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length
	    var args = new Array(i)
	    while (i--) {
	      args[i] = arguments[i]
	    }
	    var result = original.apply(this, args)
	    var ob = this.__ob__
	    var inserted
	    switch (method) {
	      case 'push':
	        inserted = args
	        break
	      case 'unshift':
	        inserted = args
	        break
	      case 'splice':
	        inserted = args.slice(2)
	        break
	    }
	    if (inserted) ob.observeArray(inserted)
	    // notify change
	    ob.dep.notify()
	    return result
	  })
	})

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	_.define(
	  arrayProto,
	  '$set',
	  function $set (index, val) {
	    if (index >= this.length) {
	      this.length = index + 1
	    }
	    return this.splice(index, 1, val)[0]
	  }
	)

	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */

	_.define(
	  arrayProto,
	  '$remove',
	  function $remove (index) {
	    /* istanbul ignore if */
	    if (!this.length) return
	    if (typeof index !== 'number') {
	      index = _.indexOf(this, index)
	    }
	    if (index > -1) {
	      return this.splice(index, 1)
	    }
	  }
	)

	module.exports = arrayMethods


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var objProto = Object.prototype

	/**
	 * Add a new property to an observed object
	 * and emits corresponding event
	 *
	 * @param {String} key
	 * @param {*} val
	 * @public
	 */

	_.define(
	  objProto,
	  '$add',
	  function $add (key, val) {
	    if (this.hasOwnProperty(key)) return
	    var ob = this.__ob__
	    if (!ob || _.isReserved(key)) {
	      this[key] = val
	      return
	    }
	    ob.convert(key, val)
	    ob.dep.notify()
	    if (ob.vms) {
	      var i = ob.vms.length
	      while (i--) {
	        var vm = ob.vms[i]
	        vm._proxy(key)
	        vm._digest()
	      }
	    }
	  }
	)

	/**
	 * Set a property on an observed object, calling add to
	 * ensure the property is observed.
	 *
	 * @param {String} key
	 * @param {*} val
	 * @public
	 */

	_.define(
	  objProto,
	  '$set',
	  function $set (key, val) {
	    this.$add(key, val)
	    this[key] = val
	  }
	)

	/**
	 * Deletes a property from an observed object
	 * and emits corresponding event
	 *
	 * @param {String} key
	 * @public
	 */

	_.define(
	  objProto,
	  '$delete',
	  function $delete (key) {
	    if (!this.hasOwnProperty(key)) return
	    delete this[key]
	    var ob = this.__ob__
	    if (!ob || _.isReserved(key)) {
	      return
	    }
	    ob.dep.notify()
	    if (ob.vms) {
	      var i = ob.vms.length
	      while (i--) {
	        var vm = ob.vms[i]
	        vm._unproxy(key)
	        vm._digest()
	      }
	    }
	  }
	)


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var Directive = __webpack_require__(61)
	var compiler = __webpack_require__(12)

	/**
	 * Transclude, compile and link element.
	 *
	 * If a pre-compiled linker is available, that means the
	 * passed in element will be pre-transcluded and compiled
	 * as well - all we need to do is to call the linker.
	 *
	 * Otherwise we need to call transclude/compile/link here.
	 *
	 * @param {Element} el
	 * @return {Element}
	 */

	exports._compile = function (el) {
	  var options = this.$options
	  var host = this._host
	  if (options._linkFn) {
	    // pre-transcluded with linker, just use it
	    this._initElement(el)
	    this._unlinkFn = options._linkFn(this, el, host)
	  } else {
	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el
	    el = compiler.transclude(el, options)
	    this._initElement(el)

	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var rootLinker = compiler.compileRoot(el, options)

	    // compile and link the rest
	    var contentLinkFn
	    var ctor = this.constructor
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compiler.compile(el, options)
	      }
	    }

	    // link phase
	    var rootUnlinkFn = rootLinker(this, el)
	    var contentUnlinkFn = contentLinkFn
	      ? contentLinkFn(this, el)
	      : compiler.compile(el, options)(this, el, host)

	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn()
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true)
	    }

	    // finally replace original
	    if (options.replace) {
	      _.replace(original, el)
	    }
	  }
	  return el
	}

	/**
	 * Initialize instance element. Called in the public
	 * $mount() method.
	 *
	 * @param {Element} el
	 */

	exports._initElement = function (el) {
	  if (el instanceof DocumentFragment) {
	    this._isFragment = true
	    this.$el = this._fragmentStart = el.firstChild
	    this._fragmentEnd = el.lastChild
	    // set persisted text anchors to empty
	    if (this._fragmentStart.nodeType === 3) {
	      this._fragmentStart.data = this._fragmentEnd.data = ''
	    }
	    this._blockFragment = el
	  } else {
	    this.$el = el
	  }
	  this.$el.__vue__ = this
	  this._callHook('beforeCompile')
	}

	/**
	 * Create and bind a directive to an element.
	 *
	 * @param {String} name - directive name
	 * @param {Node} node   - target node
	 * @param {Object} desc - parsed directive descriptor
	 * @param {Object} def  - directive definition object
	 * @param {Vue|undefined} host - transclusion host component
	 */

	exports._bindDir = function (name, node, desc, def, host) {
	  this._directives.push(
	    new Directive(name, node, this, desc, def, host)
	  )
	}

	/**
	 * Teardown an instance, unobserves the data, unbind all the
	 * directives, turn off all the event listeners, etc.
	 *
	 * @param {Boolean} remove - whether to remove the DOM node.
	 * @param {Boolean} deferCleanup - if true, defer cleanup to
	 *                                 be called later
	 */

	exports._destroy = function (remove, deferCleanup) {
	  if (this._isBeingDestroyed) {
	    return
	  }
	  this._callHook('beforeDestroy')
	  this._isBeingDestroyed = true
	  var i
	  // remove self from parent. only necessary
	  // if parent is not being destroyed as well.
	  var parent = this.$parent
	  if (parent && !parent._isBeingDestroyed) {
	    parent.$children.$remove(this)
	  }
	  // destroy all children.
	  i = this.$children.length
	  while (i--) {
	    this.$children[i].$destroy()
	  }
	  // teardown props
	  if (this._propsUnlinkFn) {
	    this._propsUnlinkFn()
	  }
	  // teardown all directives. this also tearsdown all
	  // directive-owned watchers.
	  if (this._unlinkFn) {
	    this._unlinkFn()
	  }
	  i = this._watchers.length
	  while (i--) {
	    this._watchers[i].teardown()
	  }
	  // remove reference to self on $el
	  if (this.$el) {
	    this.$el.__vue__ = null
	  }
	  // remove DOM element
	  var self = this
	  if (remove && this.$el) {
	    this.$remove(function () {
	      self._cleanup()
	    })
	  } else if (!deferCleanup) {
	    this._cleanup()
	  }
	}

	/**
	 * Clean up to ensure garbage collection.
	 * This is called after the leave transition if there
	 * is any.
	 */

	exports._cleanup = function () {
	  // remove reference from data ob
	  // frozen object may not have observer.
	  if (this._data.__ob__) {
	    this._data.__ob__.removeVm(this)
	  }
	  // Clean up references to private properties and other
	  // instances. preserve reference to _data so that proxy
	  // accessors still work. The only potential side effect
	  // here is that mutating the instance after it's destroyed
	  // may affect the state of other components that are still
	  // observing the same object, but that seems to be a
	  // reasonable responsibility for the user rather than
	  // always throwing an error on them.
	  this.$el =
	  this.$parent =
	  this.$root =
	  this.$children =
	  this._watchers =
	  this._directives = null
	  // call the last hook...
	  this._isDestroyed = true
	  this._callHook('destroyed')
	  // turn off all instance listeners.
	  this.$off()
	}


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var config = __webpack_require__(7)
	var Watcher = __webpack_require__(19)
	var textParser = __webpack_require__(15)
	var expParser = __webpack_require__(21)

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {String} name
	 * @param {Node} el
	 * @param {Vue} vm
	 * @param {Object} descriptor
	 *                 - {String} expression
	 *                 - {String} [arg]
	 *                 - {Array<Object>} [filters]
	 * @param {Object} def - directive definition object
	 * @param {Vue|undefined} host - transclusion host target
	 * @constructor
	 */

	function Directive (name, el, vm, descriptor, def, host) {
	  // public
	  this.name = name
	  this.el = el
	  this.vm = vm
	  // copy descriptor props
	  this.raw = descriptor.raw
	  this.expression = descriptor.expression
	  this.arg = descriptor.arg
	  this.filters = descriptor.filters
	  // private
	  this._descriptor = descriptor
	  this._host = host
	  this._locked = false
	  this._bound = false
	  // init
	  this._bind(def)
	}

	var p = Directive.prototype

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 *
	 * @param {Object} def
	 */

	p._bind = function (def) {
	  if (
	    (this.name !== 'cloak' || this.vm._isCompiled) &&
	    this.el && this.el.removeAttribute
	  ) {
	    this.el.removeAttribute(config.prefix + this.name)
	  }
	  if (typeof def === 'function') {
	    this.update = def
	  } else {
	    _.extend(this, def)
	  }
	  this._watcherExp = this.expression
	  this._checkDynamicLiteral()
	  if (this.bind) {
	    this.bind()
	  }
	  if (this._watcherExp &&
	      (this.update || this.twoWay) &&
	      (!this.isLiteral || this._isDynamicLiteral) &&
	      !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this
	    var update = this._update = this.update
	      ? function (val, oldVal) {
	          if (!dir._locked) {
	            dir.update(val, oldVal)
	          }
	        }
	      : function () {} // noop if no update is provided
	    // pre-process hook called before the value is piped
	    // through the filters. used in v-repeat.
	    var preProcess = this._preProcess
	      ? _.bind(this._preProcess, this)
	      : null
	    var watcher = this._watcher = new Watcher(
	      this.vm,
	      this._watcherExp,
	      update, // callback
	      {
	        filters: this.filters,
	        twoWay: this.twoWay,
	        deep: this.deep,
	        preProcess: preProcess
	      }
	    )
	    if (this._initValue != null) {
	      watcher.set(this._initValue)
	    } else if (this.update) {
	      this.update(watcher.value)
	    }
	  }
	  this._bound = true
	}

	/**
	 * check if this is a dynamic literal binding.
	 *
	 * e.g. v-component="{{currentView}}"
	 */

	p._checkDynamicLiteral = function () {
	  var expression = this.expression
	  if (expression && this.isLiteral) {
	    var tokens = textParser.parse(expression)
	    if (tokens) {
	      var exp = textParser.tokensToExp(tokens)
	      this.expression = this.vm.$get(exp)
	      this._watcherExp = exp
	      this._isDynamicLiteral = true
	    }
	  }
	}

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. v-on="click: a++"
	 *
	 * @return {Boolean}
	 */

	p._checkStatement = function () {
	  var expression = this.expression
	  if (
	    expression && this.acceptStatement &&
	    !expParser.isSimplePath(expression)
	  ) {
	    var fn = expParser.parse(expression).get
	    var vm = this.vm
	    var handler = function () {
	      fn.call(vm, vm)
	    }
	    if (this.filters) {
	      handler = vm._applyFilters(handler, null, this.filters)
	    }
	    this.update(handler)
	    return true
	  }
	}

	/**
	 * Check for an attribute directive param, e.g. lazy
	 *
	 * @param {String} name
	 * @return {String}
	 */

	p._checkParam = function (name) {
	  var param = this.el.getAttribute(name)
	  if (param !== null) {
	    this.el.removeAttribute(name)
	    param = this.vm.$interpolate(param)
	  }
	  return param
	}

	/**
	 * Teardown the watcher and call unbind.
	 */

	p._teardown = function () {
	  if (this._bound) {
	    this._bound = false
	    if (this.unbind) {
	      this.unbind()
	    }
	    if (this._watcher) {
	      this._watcher.teardown()
	    }
	    this.vm = this.el = this._watcher = null
	  }
	}

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	p.set = function (value) {
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value)
	    })
	  }
	}

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	p._withLock = function (fn) {
	  var self = this
	  self._locked = true
	  fn.call(self)
	  _.nextTick(function () {
	    self._locked = false
	  })
	}

	module.exports = Directive


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)

	/**
	 * Apply a list of filter (descriptors) to a value.
	 * Using plain for loops here because this will be called in
	 * the getter of any watcher with filters so it is very
	 * performance sensitive.
	 *
	 * @param {*} value
	 * @param {*} [oldValue]
	 * @param {Array} filters
	 * @param {Boolean} write
	 * @return {*}
	 */

	exports._applyFilters = function (value, oldValue, filters, write) {
	  var filter, fn, args, arg, offset, i, l, j, k
	  for (i = 0, l = filters.length; i < l; i++) {
	    filter = filters[i]
	    fn = _.resolveAsset(this.$options, 'filters', filter.name)
	    if (process.env.NODE_ENV !== 'production') {
	      _.assertAsset(fn, 'filter', filter.name)
	    }
	    if (!fn) continue
	    fn = write ? fn.write : (fn.read || fn)
	    if (typeof fn !== 'function') continue
	    args = write ? [value, oldValue] : [value]
	    offset = write ? 2 : 1
	    if (filter.args) {
	      for (j = 0, k = filter.args.length; j < k; j++) {
	        arg = filter.args[j]
	        args[j + offset] = arg.dynamic
	          ? this.$get(arg.value)
	          : arg.value
	      }
	    }
	    value = fn.apply(this, args)
	  }
	  return value
	}

	/**
	 * Resolve a component, depending on whether the component
	 * is defined normally or using an async factory function.
	 * Resolves synchronously if already resolved, otherwise
	 * resolves asynchronously and caches the resolved
	 * constructor on the factory.
	 *
	 * @param {String} id
	 * @param {Function} cb
	 */

	exports._resolveComponent = function (id, cb) {
	  var factory = _.resolveAsset(this.$options, 'components', id)
	  if (process.env.NODE_ENV !== 'production') {
	    _.assertAsset(factory, 'component', id)
	  }
	  if (!factory) {
	    return
	  }
	  // async component factory
	  if (!factory.options) {
	    if (factory.resolved) {
	      // cached
	      cb(factory.resolved)
	    } else if (factory.requested) {
	      // pool callbacks
	      factory.pendingCallbacks.push(cb)
	    } else {
	      factory.requested = true
	      var cbs = factory.pendingCallbacks = [cb]
	      factory(function resolve (res) {
	        if (_.isPlainObject(res)) {
	          res = _.Vue.extend(res)
	        }
	        // cache resolved
	        factory.resolved = res
	        // invoke callbacks
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res)
	        }
	      }, function reject (reason) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'Failed to resolve async component: ' + id + '. ' +
	          (reason ? '\nReason: ' + reason : '')
	        )
	      })
	    }
	  } else {
	    // normal component
	    cb(factory)
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var Watcher = __webpack_require__(19)
	var Path = __webpack_require__(22)
	var textParser = __webpack_require__(15)
	var dirParser = __webpack_require__(17)
	var expParser = __webpack_require__(21)
	var filterRE = /[^|]\|[^|]/

	/**
	 * Get the value from an expression on this vm.
	 *
	 * @param {String} exp
	 * @return {*}
	 */

	exports.$get = function (exp) {
	  var res = expParser.parse(exp)
	  if (res) {
	    try {
	      return res.get.call(this, this)
	    } catch (e) {}
	  }
	}

	/**
	 * Set the value from an expression on this vm.
	 * The expression must be a valid left-hand
	 * expression in an assignment.
	 *
	 * @param {String} exp
	 * @param {*} val
	 */

	exports.$set = function (exp, val) {
	  var res = expParser.parse(exp, true)
	  if (res && res.set) {
	    res.set.call(this, this, val)
	  }
	}

	/**
	 * Add a property on the VM
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	exports.$add = function (key, val) {
	  this._data.$add(key, val)
	}

	/**
	 * Delete a property on the VM
	 *
	 * @param {String} key
	 */

	exports.$delete = function (key) {
	  this._data.$delete(key)
	}

	/**
	 * Watch an expression, trigger callback when its
	 * value changes.
	 *
	 * @param {String} exp
	 * @param {Function} cb
	 * @param {Object} [options]
	 *                 - {Boolean} deep
	 *                 - {Boolean} immediate
	 *                 - {Boolean} user
	 * @return {Function} - unwatchFn
	 */

	exports.$watch = function (exp, cb, options) {
	  var vm = this
	  var wrappedCb = function (val, oldVal) {
	    cb.call(vm, val, oldVal)
	  }
	  var watcher = new Watcher(vm, exp, wrappedCb, {
	    deep: options && options.deep,
	    user: !options || options.user !== false
	  })
	  if (options && options.immediate) {
	    wrappedCb(watcher.value)
	  }
	  return function unwatchFn () {
	    watcher.teardown()
	  }
	}

	/**
	 * Evaluate a text directive, including filters.
	 *
	 * @param {String} text
	 * @return {String}
	 */

	exports.$eval = function (text) {
	  // check for filters.
	  if (filterRE.test(text)) {
	    var dir = dirParser.parse(text)[0]
	    // the filter regex check might give false positive
	    // for pipes inside strings, so it's possible that
	    // we don't get any filters here
	    var val = this.$get(dir.expression)
	    return dir.filters
	      ? this._applyFilters(val, null, dir.filters)
	      : val
	  } else {
	    // no filter
	    return this.$get(text)
	  }
	}

	/**
	 * Interpolate a piece of template text.
	 *
	 * @param {String} text
	 * @return {String}
	 */

	exports.$interpolate = function (text) {
	  var tokens = textParser.parse(text)
	  var vm = this
	  if (tokens) {
	    return tokens.length === 1
	      ? vm.$eval(tokens[0].value)
	      : tokens.map(function (token) {
	          return token.tag
	            ? vm.$eval(token.value)
	            : token.value
	        }).join('')
	  } else {
	    return text
	  }
	}

	/**
	 * Log instance data as a plain JS object
	 * so that it is easier to inspect in console.
	 * This method assumes console is available.
	 *
	 * @param {String} [path]
	 */

	exports.$log = function (path) {
	  var data = path
	    ? Path.get(this._data, path)
	    : this._data
	  if (data) {
	    data = JSON.parse(JSON.stringify(data))
	  }
	  console.log(data)
	}


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)
	var transition = __webpack_require__(32)

	/**
	 * Convenience on-instance nextTick. The callback is
	 * auto-bound to the instance, and this avoids component
	 * modules having to rely on the global Vue.
	 *
	 * @param {Function} fn
	 */

	exports.$nextTick = function (fn) {
	  _.nextTick(fn, this)
	}

	/**
	 * Append instance to target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$appendTo = function (target, cb, withTransition) {
	  return insert(
	    this, target, cb, withTransition,
	    append, transition.append
	  )
	}

	/**
	 * Prepend instance to target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$prependTo = function (target, cb, withTransition) {
	  target = query(target)
	  if (target.hasChildNodes()) {
	    this.$before(target.firstChild, cb, withTransition)
	  } else {
	    this.$appendTo(target, cb, withTransition)
	  }
	  return this
	}

	/**
	 * Insert instance before target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$before = function (target, cb, withTransition) {
	  return insert(
	    this, target, cb, withTransition,
	    before, transition.before
	  )
	}

	/**
	 * Insert instance after target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$after = function (target, cb, withTransition) {
	  target = query(target)
	  if (target.nextSibling) {
	    this.$before(target.nextSibling, cb, withTransition)
	  } else {
	    this.$appendTo(target.parentNode, cb, withTransition)
	  }
	  return this
	}

	/**
	 * Remove instance from DOM
	 *
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$remove = function (cb, withTransition) {
	  if (!this.$el.parentNode) {
	    return cb && cb()
	  }
	  var inDoc = this._isAttached && _.inDoc(this.$el)
	  // if we are not in document, no need to check
	  // for transitions
	  if (!inDoc) withTransition = false
	  var op
	  var self = this
	  var realCb = function () {
	    if (inDoc) self._callHook('detached')
	    if (cb) cb()
	  }
	  if (
	    this._isFragment &&
	    !this._blockFragment.hasChildNodes()
	  ) {
	    op = withTransition === false
	      ? append
	      : transition.removeThenAppend
	    blockOp(this, this._blockFragment, op, realCb)
	  } else {
	    op = withTransition === false
	      ? remove
	      : transition.remove
	    op(this.$el, this, realCb)
	  }
	  return this
	}

	/**
	 * Shared DOM insertion function.
	 *
	 * @param {Vue} vm
	 * @param {Element} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition]
	 * @param {Function} op1 - op for non-transition insert
	 * @param {Function} op2 - op for transition insert
	 * @return vm
	 */

	function insert (vm, target, cb, withTransition, op1, op2) {
	  target = query(target)
	  var targetIsDetached = !_.inDoc(target)
	  var op = withTransition === false || targetIsDetached
	    ? op1
	    : op2
	  var shouldCallHook =
	    !targetIsDetached &&
	    !vm._isAttached &&
	    !_.inDoc(vm.$el)
	  if (vm._isFragment) {
	    blockOp(vm, target, op, cb)
	  } else {
	    op(vm.$el, target, vm, cb)
	  }
	  if (shouldCallHook) {
	    vm._callHook('attached')
	  }
	  return vm
	}

	/**
	 * Execute a transition operation on a fragment instance,
	 * iterating through all its block nodes.
	 *
	 * @param {Vue} vm
	 * @param {Node} target
	 * @param {Function} op
	 * @param {Function} cb
	 */

	function blockOp (vm, target, op, cb) {
	  var current = vm._fragmentStart
	  var end = vm._fragmentEnd
	  var next
	  while (next !== end) {
	    next = current.nextSibling
	    op(current, target, vm)
	    current = next
	  }
	  op(end, target, vm, cb)
	}

	/**
	 * Check for selectors
	 *
	 * @param {String|Element} el
	 */

	function query (el) {
	  return typeof el === 'string'
	    ? document.querySelector(el)
	    : el
	}

	/**
	 * Append operation that takes a callback.
	 *
	 * @param {Node} el
	 * @param {Node} target
	 * @param {Vue} vm - unused
	 * @param {Function} [cb]
	 */

	function append (el, target, vm, cb) {
	  target.appendChild(el)
	  if (cb) cb()
	}

	/**
	 * InsertBefore operation that takes a callback.
	 *
	 * @param {Node} el
	 * @param {Node} target
	 * @param {Vue} vm - unused
	 * @param {Function} [cb]
	 */

	function before (el, target, vm, cb) {
	  _.before(el, target)
	  if (cb) cb()
	}

	/**
	 * Remove operation that takes a callback.
	 *
	 * @param {Node} el
	 * @param {Vue} vm - unused
	 * @param {Function} [cb]
	 */

	function remove (el, vm, cb) {
	  _.remove(el)
	  if (cb) cb()
	}


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 */

	exports.$on = function (event, fn) {
	  (this._events[event] || (this._events[event] = []))
	    .push(fn)
	  modifyListenerCount(this, event, 1)
	  return this
	}

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 */

	exports.$once = function (event, fn) {
	  var self = this
	  function on () {
	    self.$off(event, on)
	    fn.apply(this, arguments)
	  }
	  on.fn = fn
	  this.$on(event, on)
	  return this
	}

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 */

	exports.$off = function (event, fn) {
	  var cbs
	  // all
	  if (!arguments.length) {
	    if (this.$parent) {
	      for (event in this._events) {
	        cbs = this._events[event]
	        if (cbs) {
	          modifyListenerCount(this, event, -cbs.length)
	        }
	      }
	    }
	    this._events = {}
	    return this
	  }
	  // specific event
	  cbs = this._events[event]
	  if (!cbs) {
	    return this
	  }
	  if (arguments.length === 1) {
	    modifyListenerCount(this, event, -cbs.length)
	    this._events[event] = null
	    return this
	  }
	  // specific handler
	  var cb
	  var i = cbs.length
	  while (i--) {
	    cb = cbs[i]
	    if (cb === fn || cb.fn === fn) {
	      modifyListenerCount(this, event, -1)
	      cbs.splice(i, 1)
	      break
	    }
	  }
	  return this
	}

	/**
	 * Trigger an event on self.
	 *
	 * @param {String} event
	 */

	exports.$emit = function (event) {
	  this._eventCancelled = false
	  var cbs = this._events[event]
	  if (cbs) {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length - 1
	    var args = new Array(i)
	    while (i--) {
	      args[i] = arguments[i + 1]
	    }
	    i = 0
	    cbs = cbs.length > 1
	      ? _.toArray(cbs)
	      : cbs
	    for (var l = cbs.length; i < l; i++) {
	      if (cbs[i].apply(this, args) === false) {
	        this._eventCancelled = true
	      }
	    }
	  }
	  return this
	}

	/**
	 * Recursively broadcast an event to all children instances.
	 *
	 * @param {String} event
	 * @param {...*} additional arguments
	 */

	exports.$broadcast = function (event) {
	  // if no child has registered for this event,
	  // then there's no need to broadcast.
	  if (!this._eventsCount[event]) return
	  var children = this.$children
	  for (var i = 0, l = children.length; i < l; i++) {
	    var child = children[i]
	    child.$emit.apply(child, arguments)
	    if (!child._eventCancelled) {
	      child.$broadcast.apply(child, arguments)
	    }
	  }
	  return this
	}

	/**
	 * Recursively propagate an event up the parent chain.
	 *
	 * @param {String} event
	 * @param {...*} additional arguments
	 */

	exports.$dispatch = function () {
	  var parent = this.$parent
	  while (parent) {
	    parent.$emit.apply(parent, arguments)
	    parent = parent._eventCancelled
	      ? null
	      : parent.$parent
	  }
	  return this
	}

	/**
	 * Modify the listener counts on all parents.
	 * This bookkeeping allows $broadcast to return early when
	 * no child has listened to a certain event.
	 *
	 * @param {Vue} vm
	 * @param {String} event
	 * @param {Number} count
	 */

	var hookRE = /^hook:/
	function modifyListenerCount (vm, event, count) {
	  var parent = vm.$parent
	  // hooks do not get broadcasted so no need
	  // to do bookkeeping for them
	  if (!parent || !count || hookRE.test(event)) return
	  while (parent) {
	    parent._eventsCount[event] =
	      (parent._eventsCount[event] || 0) + count
	    parent = parent.$parent
	  }
	}


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2)

	/**
	 * Create a child instance that prototypally inherits
	 * data on parent. To achieve that we create an intermediate
	 * constructor with its prototype pointing to parent.
	 *
	 * @param {Object} opts
	 * @param {Function} [BaseCtor]
	 * @return {Vue}
	 * @public
	 */

	exports.$addChild = function (opts, BaseCtor) {
	  BaseCtor = BaseCtor || _.Vue
	  opts = opts || {}
	  var parent = this
	  var ChildVue
	  var inherit = opts.inherit !== undefined
	    ? opts.inherit
	    : BaseCtor.options.inherit
	  if (inherit) {
	    var ctors = parent._childCtors
	    ChildVue = ctors[BaseCtor.cid]
	    if (!ChildVue) {
	      var optionName = BaseCtor.options.name
	      var className = optionName
	        ? _.classify(optionName)
	        : 'VueComponent'
	      ChildVue = new Function(
	        'return function ' + className + ' (options) {' +
	        'this.constructor = ' + className + ';' +
	        'this._init(options) }'
	      )()
	      ChildVue.options = BaseCtor.options
	      ChildVue.linker = BaseCtor.linker
	      // important: transcluded inline repeaters should
	      // inherit from outer scope rather than host
	      ChildVue.prototype = opts._context || this
	      ctors[BaseCtor.cid] = ChildVue
	    }
	  } else {
	    ChildVue = BaseCtor
	  }
	  opts._parent = parent
	  opts._root = parent.$root
	  var child = new ChildVue(opts)
	  return child
	}


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(2)
	var compiler = __webpack_require__(12)

	/**
	 * Set instance target element and kick off the compilation
	 * process. The passed in `el` can be a selector string, an
	 * existing Element, or a DocumentFragment (for block
	 * instances).
	 *
	 * @param {Element|DocumentFragment|string} el
	 * @public
	 */

	exports.$mount = function (el) {
	  if (this._isCompiled) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      '$mount() should be called only once.'
	    )
	    return
	  }
	  el = _.query(el)
	  if (!el) {
	    el = document.createElement('div')
	  }
	  this._compile(el)
	  this._isCompiled = true
	  this._callHook('compiled')
	  this._initDOMHooks()
	  if (_.inDoc(this.$el)) {
	    this._callHook('attached')
	    ready.call(this)
	  } else {
	    this.$once('hook:attached', ready)
	  }
	  return this
	}

	/**
	 * Mark an instance as ready.
	 */

	function ready () {
	  this._isAttached = true
	  this._isReady = true
	  this._callHook('ready')
	}

	/**
	 * Teardown the instance, simply delegate to the internal
	 * _destroy.
	 */

	exports.$destroy = function (remove, deferCleanup) {
	  this._destroy(remove, deferCleanup)
	}

	/**
	 * Partially compile a piece of DOM and return a
	 * decompile function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Vue} [host]
	 * @return {Function}
	 */

	exports.$compile = function (el, host) {
	  return compiler.compile(el, this.$options, true, host)(this, el)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(69);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(76)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./bootstrap.min.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./bootstrap.min.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(70)();
	// imports


	// module
	exports.push([module.id, "/*!\n * Bootstrap v3.3.5 (http://getbootstrap.com)\n * Copyright 2011-2015 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n *//*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}h1{margin:.67em 0;font-size:2em}mark{color:#000;background:#ff0}small{font-size:80%}sub,sup{position:relative;font-size:75%;line-height:0;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{height:0;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}button,input,optgroup,select,textarea{margin:0;font:inherit;color:inherit}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}input{line-height:normal}input[type=checkbox],input[type=radio]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-appearance:textfield}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}fieldset{padding:.35em .625em .75em;margin:0 2px;border:1px solid silver}legend{padding:0;border:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-spacing:0;border-collapse:collapse}td,th{padding:0}/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */@media print{*,:after,:before{color:#000!important;text-shadow:none!important;background:0 0!important;-webkit-box-shadow:none!important;box-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:\" (\" attr(href) \")\"}abbr[title]:after{content:\" (\" attr(title) \")\"}a[href^=\"javascript:\"]:after,a[href^=\"#\"]:after{content:\"\"}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}.navbar{display:none}.btn>.caret,.dropup>.btn>.caret{border-top-color:#000!important}.label{border:1px solid #000}.table{border-collapse:collapse!important}.table td,.table th{background-color:#fff!important}.table-bordered td,.table-bordered th{border:1px solid #ddd!important}}@font-face{font-family:'Glyphicons Halflings';src:url(" + __webpack_require__(71) + ");src:url(" + __webpack_require__(71) + "?#iefix) format('embedded-opentype'),url(" + __webpack_require__(72) + ") format('woff2'),url(" + __webpack_require__(73) + ") format('woff'),url(" + __webpack_require__(74) + ") format('truetype'),url(" + __webpack_require__(75) + "#glyphicons_halflingsregular) format('svg')}.glyphicon{position:relative;top:1px;display:inline-block;font-family:'Glyphicons Halflings';font-style:normal;font-weight:400;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.glyphicon-asterisk:before{content:\"*\"}.glyphicon-plus:before{content:\"+\"}.glyphicon-eur:before,.glyphicon-euro:before{content:\"\\20AC\"}.glyphicon-minus:before{content:\"\\2212\"}.glyphicon-cloud:before{content:\"\\2601\"}.glyphicon-envelope:before{content:\"\\2709\"}.glyphicon-pencil:before{content:\"\\270F\"}.glyphicon-glass:before{content:\"\\E001\"}.glyphicon-music:before{content:\"\\E002\"}.glyphicon-search:before{content:\"\\E003\"}.glyphicon-heart:before{content:\"\\E005\"}.glyphicon-star:before{content:\"\\E006\"}.glyphicon-star-empty:before{content:\"\\E007\"}.glyphicon-user:before{content:\"\\E008\"}.glyphicon-film:before{content:\"\\E009\"}.glyphicon-th-large:before{content:\"\\E010\"}.glyphicon-th:before{content:\"\\E011\"}.glyphicon-th-list:before{content:\"\\E012\"}.glyphicon-ok:before{content:\"\\E013\"}.glyphicon-remove:before{content:\"\\E014\"}.glyphicon-zoom-in:before{content:\"\\E015\"}.glyphicon-zoom-out:before{content:\"\\E016\"}.glyphicon-off:before{content:\"\\E017\"}.glyphicon-signal:before{content:\"\\E018\"}.glyphicon-cog:before{content:\"\\E019\"}.glyphicon-trash:before{content:\"\\E020\"}.glyphicon-home:before{content:\"\\E021\"}.glyphicon-file:before{content:\"\\E022\"}.glyphicon-time:before{content:\"\\E023\"}.glyphicon-road:before{content:\"\\E024\"}.glyphicon-download-alt:before{content:\"\\E025\"}.glyphicon-download:before{content:\"\\E026\"}.glyphicon-upload:before{content:\"\\E027\"}.glyphicon-inbox:before{content:\"\\E028\"}.glyphicon-play-circle:before{content:\"\\E029\"}.glyphicon-repeat:before{content:\"\\E030\"}.glyphicon-refresh:before{content:\"\\E031\"}.glyphicon-list-alt:before{content:\"\\E032\"}.glyphicon-lock:before{content:\"\\E033\"}.glyphicon-flag:before{content:\"\\E034\"}.glyphicon-headphones:before{content:\"\\E035\"}.glyphicon-volume-off:before{content:\"\\E036\"}.glyphicon-volume-down:before{content:\"\\E037\"}.glyphicon-volume-up:before{content:\"\\E038\"}.glyphicon-qrcode:before{content:\"\\E039\"}.glyphicon-barcode:before{content:\"\\E040\"}.glyphicon-tag:before{content:\"\\E041\"}.glyphicon-tags:before{content:\"\\E042\"}.glyphicon-book:before{content:\"\\E043\"}.glyphicon-bookmark:before{content:\"\\E044\"}.glyphicon-print:before{content:\"\\E045\"}.glyphicon-camera:before{content:\"\\E046\"}.glyphicon-font:before{content:\"\\E047\"}.glyphicon-bold:before{content:\"\\E048\"}.glyphicon-italic:before{content:\"\\E049\"}.glyphicon-text-height:before{content:\"\\E050\"}.glyphicon-text-width:before{content:\"\\E051\"}.glyphicon-align-left:before{content:\"\\E052\"}.glyphicon-align-center:before{content:\"\\E053\"}.glyphicon-align-right:before{content:\"\\E054\"}.glyphicon-align-justify:before{content:\"\\E055\"}.glyphicon-list:before{content:\"\\E056\"}.glyphicon-indent-left:before{content:\"\\E057\"}.glyphicon-indent-right:before{content:\"\\E058\"}.glyphicon-facetime-video:before{content:\"\\E059\"}.glyphicon-picture:before{content:\"\\E060\"}.glyphicon-map-marker:before{content:\"\\E062\"}.glyphicon-adjust:before{content:\"\\E063\"}.glyphicon-tint:before{content:\"\\E064\"}.glyphicon-edit:before{content:\"\\E065\"}.glyphicon-share:before{content:\"\\E066\"}.glyphicon-check:before{content:\"\\E067\"}.glyphicon-move:before{content:\"\\E068\"}.glyphicon-step-backward:before{content:\"\\E069\"}.glyphicon-fast-backward:before{content:\"\\E070\"}.glyphicon-backward:before{content:\"\\E071\"}.glyphicon-play:before{content:\"\\E072\"}.glyphicon-pause:before{content:\"\\E073\"}.glyphicon-stop:before{content:\"\\E074\"}.glyphicon-forward:before{content:\"\\E075\"}.glyphicon-fast-forward:before{content:\"\\E076\"}.glyphicon-step-forward:before{content:\"\\E077\"}.glyphicon-eject:before{content:\"\\E078\"}.glyphicon-chevron-left:before{content:\"\\E079\"}.glyphicon-chevron-right:before{content:\"\\E080\"}.glyphicon-plus-sign:before{content:\"\\E081\"}.glyphicon-minus-sign:before{content:\"\\E082\"}.glyphicon-remove-sign:before{content:\"\\E083\"}.glyphicon-ok-sign:before{content:\"\\E084\"}.glyphicon-question-sign:before{content:\"\\E085\"}.glyphicon-info-sign:before{content:\"\\E086\"}.glyphicon-screenshot:before{content:\"\\E087\"}.glyphicon-remove-circle:before{content:\"\\E088\"}.glyphicon-ok-circle:before{content:\"\\E089\"}.glyphicon-ban-circle:before{content:\"\\E090\"}.glyphicon-arrow-left:before{content:\"\\E091\"}.glyphicon-arrow-right:before{content:\"\\E092\"}.glyphicon-arrow-up:before{content:\"\\E093\"}.glyphicon-arrow-down:before{content:\"\\E094\"}.glyphicon-share-alt:before{content:\"\\E095\"}.glyphicon-resize-full:before{content:\"\\E096\"}.glyphicon-resize-small:before{content:\"\\E097\"}.glyphicon-exclamation-sign:before{content:\"\\E101\"}.glyphicon-gift:before{content:\"\\E102\"}.glyphicon-leaf:before{content:\"\\E103\"}.glyphicon-fire:before{content:\"\\E104\"}.glyphicon-eye-open:before{content:\"\\E105\"}.glyphicon-eye-close:before{content:\"\\E106\"}.glyphicon-warning-sign:before{content:\"\\E107\"}.glyphicon-plane:before{content:\"\\E108\"}.glyphicon-calendar:before{content:\"\\E109\"}.glyphicon-random:before{content:\"\\E110\"}.glyphicon-comment:before{content:\"\\E111\"}.glyphicon-magnet:before{content:\"\\E112\"}.glyphicon-chevron-up:before{content:\"\\E113\"}.glyphicon-chevron-down:before{content:\"\\E114\"}.glyphicon-retweet:before{content:\"\\E115\"}.glyphicon-shopping-cart:before{content:\"\\E116\"}.glyphicon-folder-close:before{content:\"\\E117\"}.glyphicon-folder-open:before{content:\"\\E118\"}.glyphicon-resize-vertical:before{content:\"\\E119\"}.glyphicon-resize-horizontal:before{content:\"\\E120\"}.glyphicon-hdd:before{content:\"\\E121\"}.glyphicon-bullhorn:before{content:\"\\E122\"}.glyphicon-bell:before{content:\"\\E123\"}.glyphicon-certificate:before{content:\"\\E124\"}.glyphicon-thumbs-up:before{content:\"\\E125\"}.glyphicon-thumbs-down:before{content:\"\\E126\"}.glyphicon-hand-right:before{content:\"\\E127\"}.glyphicon-hand-left:before{content:\"\\E128\"}.glyphicon-hand-up:before{content:\"\\E129\"}.glyphicon-hand-down:before{content:\"\\E130\"}.glyphicon-circle-arrow-right:before{content:\"\\E131\"}.glyphicon-circle-arrow-left:before{content:\"\\E132\"}.glyphicon-circle-arrow-up:before{content:\"\\E133\"}.glyphicon-circle-arrow-down:before{content:\"\\E134\"}.glyphicon-globe:before{content:\"\\E135\"}.glyphicon-wrench:before{content:\"\\E136\"}.glyphicon-tasks:before{content:\"\\E137\"}.glyphicon-filter:before{content:\"\\E138\"}.glyphicon-briefcase:before{content:\"\\E139\"}.glyphicon-fullscreen:before{content:\"\\E140\"}.glyphicon-dashboard:before{content:\"\\E141\"}.glyphicon-paperclip:before{content:\"\\E142\"}.glyphicon-heart-empty:before{content:\"\\E143\"}.glyphicon-link:before{content:\"\\E144\"}.glyphicon-phone:before{content:\"\\E145\"}.glyphicon-pushpin:before{content:\"\\E146\"}.glyphicon-usd:before{content:\"\\E148\"}.glyphicon-gbp:before{content:\"\\E149\"}.glyphicon-sort:before{content:\"\\E150\"}.glyphicon-sort-by-alphabet:before{content:\"\\E151\"}.glyphicon-sort-by-alphabet-alt:before{content:\"\\E152\"}.glyphicon-sort-by-order:before{content:\"\\E153\"}.glyphicon-sort-by-order-alt:before{content:\"\\E154\"}.glyphicon-sort-by-attributes:before{content:\"\\E155\"}.glyphicon-sort-by-attributes-alt:before{content:\"\\E156\"}.glyphicon-unchecked:before{content:\"\\E157\"}.glyphicon-expand:before{content:\"\\E158\"}.glyphicon-collapse-down:before{content:\"\\E159\"}.glyphicon-collapse-up:before{content:\"\\E160\"}.glyphicon-log-in:before{content:\"\\E161\"}.glyphicon-flash:before{content:\"\\E162\"}.glyphicon-log-out:before{content:\"\\E163\"}.glyphicon-new-window:before{content:\"\\E164\"}.glyphicon-record:before{content:\"\\E165\"}.glyphicon-save:before{content:\"\\E166\"}.glyphicon-open:before{content:\"\\E167\"}.glyphicon-saved:before{content:\"\\E168\"}.glyphicon-import:before{content:\"\\E169\"}.glyphicon-export:before{content:\"\\E170\"}.glyphicon-send:before{content:\"\\E171\"}.glyphicon-floppy-disk:before{content:\"\\E172\"}.glyphicon-floppy-saved:before{content:\"\\E173\"}.glyphicon-floppy-remove:before{content:\"\\E174\"}.glyphicon-floppy-save:before{content:\"\\E175\"}.glyphicon-floppy-open:before{content:\"\\E176\"}.glyphicon-credit-card:before{content:\"\\E177\"}.glyphicon-transfer:before{content:\"\\E178\"}.glyphicon-cutlery:before{content:\"\\E179\"}.glyphicon-header:before{content:\"\\E180\"}.glyphicon-compressed:before{content:\"\\E181\"}.glyphicon-earphone:before{content:\"\\E182\"}.glyphicon-phone-alt:before{content:\"\\E183\"}.glyphicon-tower:before{content:\"\\E184\"}.glyphicon-stats:before{content:\"\\E185\"}.glyphicon-sd-video:before{content:\"\\E186\"}.glyphicon-hd-video:before{content:\"\\E187\"}.glyphicon-subtitles:before{content:\"\\E188\"}.glyphicon-sound-stereo:before{content:\"\\E189\"}.glyphicon-sound-dolby:before{content:\"\\E190\"}.glyphicon-sound-5-1:before{content:\"\\E191\"}.glyphicon-sound-6-1:before{content:\"\\E192\"}.glyphicon-sound-7-1:before{content:\"\\E193\"}.glyphicon-copyright-mark:before{content:\"\\E194\"}.glyphicon-registration-mark:before{content:\"\\E195\"}.glyphicon-cloud-download:before{content:\"\\E197\"}.glyphicon-cloud-upload:before{content:\"\\E198\"}.glyphicon-tree-conifer:before{content:\"\\E199\"}.glyphicon-tree-deciduous:before{content:\"\\E200\"}.glyphicon-cd:before{content:\"\\E201\"}.glyphicon-save-file:before{content:\"\\E202\"}.glyphicon-open-file:before{content:\"\\E203\"}.glyphicon-level-up:before{content:\"\\E204\"}.glyphicon-copy:before{content:\"\\E205\"}.glyphicon-paste:before{content:\"\\E206\"}.glyphicon-alert:before{content:\"\\E209\"}.glyphicon-equalizer:before{content:\"\\E210\"}.glyphicon-king:before{content:\"\\E211\"}.glyphicon-queen:before{content:\"\\E212\"}.glyphicon-pawn:before{content:\"\\E213\"}.glyphicon-bishop:before{content:\"\\E214\"}.glyphicon-knight:before{content:\"\\E215\"}.glyphicon-baby-formula:before{content:\"\\E216\"}.glyphicon-tent:before{content:\"\\26FA\"}.glyphicon-blackboard:before{content:\"\\E218\"}.glyphicon-bed:before{content:\"\\E219\"}.glyphicon-apple:before{content:\"\\F8FF\"}.glyphicon-erase:before{content:\"\\E221\"}.glyphicon-hourglass:before{content:\"\\231B\"}.glyphicon-lamp:before{content:\"\\E223\"}.glyphicon-duplicate:before{content:\"\\E224\"}.glyphicon-piggy-bank:before{content:\"\\E225\"}.glyphicon-scissors:before{content:\"\\E226\"}.glyphicon-bitcoin:before{content:\"\\E227\"}.glyphicon-btc:before{content:\"\\E227\"}.glyphicon-xbt:before{content:\"\\E227\"}.glyphicon-yen:before{content:\"\\A5\"}.glyphicon-jpy:before{content:\"\\A5\"}.glyphicon-ruble:before{content:\"\\20BD\"}.glyphicon-rub:before{content:\"\\20BD\"}.glyphicon-scale:before{content:\"\\E230\"}.glyphicon-ice-lolly:before{content:\"\\E231\"}.glyphicon-ice-lolly-tasted:before{content:\"\\E232\"}.glyphicon-education:before{content:\"\\E233\"}.glyphicon-option-horizontal:before{content:\"\\E234\"}.glyphicon-option-vertical:before{content:\"\\E235\"}.glyphicon-menu-hamburger:before{content:\"\\E236\"}.glyphicon-modal-window:before{content:\"\\E237\"}.glyphicon-oil:before{content:\"\\E238\"}.glyphicon-grain:before{content:\"\\E239\"}.glyphicon-sunglasses:before{content:\"\\E240\"}.glyphicon-text-size:before{content:\"\\E241\"}.glyphicon-text-color:before{content:\"\\E242\"}.glyphicon-text-background:before{content:\"\\E243\"}.glyphicon-object-align-top:before{content:\"\\E244\"}.glyphicon-object-align-bottom:before{content:\"\\E245\"}.glyphicon-object-align-horizontal:before{content:\"\\E246\"}.glyphicon-object-align-left:before{content:\"\\E247\"}.glyphicon-object-align-vertical:before{content:\"\\E248\"}.glyphicon-object-align-right:before{content:\"\\E249\"}.glyphicon-triangle-right:before{content:\"\\E250\"}.glyphicon-triangle-left:before{content:\"\\E251\"}.glyphicon-triangle-bottom:before{content:\"\\E252\"}.glyphicon-triangle-top:before{content:\"\\E253\"}.glyphicon-console:before{content:\"\\E254\"}.glyphicon-superscript:before{content:\"\\E255\"}.glyphicon-subscript:before{content:\"\\E256\"}.glyphicon-menu-left:before{content:\"\\E257\"}.glyphicon-menu-right:before{content:\"\\E258\"}.glyphicon-menu-down:before{content:\"\\E259\"}.glyphicon-menu-up:before{content:\"\\E260\"}*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}:after,:before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}html{font-size:10px;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:14px;line-height:1.42857143;color:#333;background-color:#fff}button,input,select,textarea{font-family:inherit;font-size:inherit;line-height:inherit}a{color:#337ab7;text-decoration:none}a:focus,a:hover{color:#23527c;text-decoration:underline}a:focus{outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}figure{margin:0}img{vertical-align:middle}.carousel-inner>.item>a>img,.carousel-inner>.item>img,.img-responsive,.thumbnail a>img,.thumbnail>img{display:block;max-width:100%;height:auto}.img-rounded{border-radius:6px}.img-thumbnail{display:inline-block;max-width:100%;height:auto;padding:4px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:4px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out}.img-circle{border-radius:50%}hr{margin-top:20px;margin-bottom:20px;border:0;border-top:1px solid #eee}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}[role=button]{cursor:pointer}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{font-family:inherit;font-weight:500;line-height:1.1;color:inherit}.h1 .small,.h1 small,.h2 .small,.h2 small,.h3 .small,.h3 small,.h4 .small,.h4 small,.h5 .small,.h5 small,.h6 .small,.h6 small,h1 .small,h1 small,h2 .small,h2 small,h3 .small,h3 small,h4 .small,h4 small,h5 .small,h5 small,h6 .small,h6 small{font-weight:400;line-height:1;color:#777}.h1,.h2,.h3,h1,h2,h3{margin-top:20px;margin-bottom:10px}.h1 .small,.h1 small,.h2 .small,.h2 small,.h3 .small,.h3 small,h1 .small,h1 small,h2 .small,h2 small,h3 .small,h3 small{font-size:65%}.h4,.h5,.h6,h4,h5,h6{margin-top:10px;margin-bottom:10px}.h4 .small,.h4 small,.h5 .small,.h5 small,.h6 .small,.h6 small,h4 .small,h4 small,h5 .small,h5 small,h6 .small,h6 small{font-size:75%}.h1,h1{font-size:36px}.h2,h2{font-size:30px}.h3,h3{font-size:24px}.h4,h4{font-size:18px}.h5,h5{font-size:14px}.h6,h6{font-size:12px}p{margin:0 0 10px}.lead{margin-bottom:20px;font-size:16px;font-weight:300;line-height:1.4}@media (min-width:768px){.lead{font-size:21px}}.small,small{font-size:85%}.mark,mark{padding:.2em;background-color:#fcf8e3}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}.text-justify{text-align:justify}.text-nowrap{white-space:nowrap}.text-lowercase{text-transform:lowercase}.text-uppercase{text-transform:uppercase}.text-capitalize{text-transform:capitalize}.text-muted{color:#777}.text-primary{color:#337ab7}a.text-primary:focus,a.text-primary:hover{color:#286090}.text-success{color:#3c763d}a.text-success:focus,a.text-success:hover{color:#2b542c}.text-info{color:#31708f}a.text-info:focus,a.text-info:hover{color:#245269}.text-warning{color:#8a6d3b}a.text-warning:focus,a.text-warning:hover{color:#66512c}.text-danger{color:#a94442}a.text-danger:focus,a.text-danger:hover{color:#843534}.bg-primary{color:#fff;background-color:#337ab7}a.bg-primary:focus,a.bg-primary:hover{background-color:#286090}.bg-success{background-color:#dff0d8}a.bg-success:focus,a.bg-success:hover{background-color:#c1e2b3}.bg-info{background-color:#d9edf7}a.bg-info:focus,a.bg-info:hover{background-color:#afd9ee}.bg-warning{background-color:#fcf8e3}a.bg-warning:focus,a.bg-warning:hover{background-color:#f7ecb5}.bg-danger{background-color:#f2dede}a.bg-danger:focus,a.bg-danger:hover{background-color:#e4b9b9}.page-header{padding-bottom:9px;margin:40px 0 20px;border-bottom:1px solid #eee}ol,ul{margin-top:0;margin-bottom:10px}ol ol,ol ul,ul ol,ul ul{margin-bottom:0}.list-unstyled{padding-left:0;list-style:none}.list-inline{padding-left:0;margin-left:-5px;list-style:none}.list-inline>li{display:inline-block;padding-right:5px;padding-left:5px}dl{margin-top:0;margin-bottom:20px}dd,dt{line-height:1.42857143}dt{font-weight:700}dd{margin-left:0}@media (min-width:768px){.dl-horizontal dt{float:left;width:160px;overflow:hidden;clear:left;text-align:right;text-overflow:ellipsis;white-space:nowrap}.dl-horizontal dd{margin-left:180px}}abbr[data-original-title],abbr[title]{cursor:help;border-bottom:1px dotted #777}.initialism{font-size:90%;text-transform:uppercase}blockquote{padding:10px 20px;margin:0 0 20px;font-size:17.5px;border-left:5px solid #eee}blockquote ol:last-child,blockquote p:last-child,blockquote ul:last-child{margin-bottom:0}blockquote .small,blockquote footer,blockquote small{display:block;font-size:80%;line-height:1.42857143;color:#777}blockquote .small:before,blockquote footer:before,blockquote small:before{content:'\\2014   \\A0'}.blockquote-reverse,blockquote.pull-right{padding-right:15px;padding-left:0;text-align:right;border-right:5px solid #eee;border-left:0}.blockquote-reverse .small:before,.blockquote-reverse footer:before,.blockquote-reverse small:before,blockquote.pull-right .small:before,blockquote.pull-right footer:before,blockquote.pull-right small:before{content:''}.blockquote-reverse .small:after,.blockquote-reverse footer:after,.blockquote-reverse small:after,blockquote.pull-right .small:after,blockquote.pull-right footer:after,blockquote.pull-right small:after{content:'\\A0   \\2014'}address{margin-bottom:20px;font-style:normal;line-height:1.42857143}code,kbd,pre,samp{font-family:Menlo,Monaco,Consolas,\"Courier New\",monospace}code{padding:2px 4px;font-size:90%;color:#c7254e;background-color:#f9f2f4;border-radius:4px}kbd{padding:2px 4px;font-size:90%;color:#fff;background-color:#333;border-radius:3px;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,.25);box-shadow:inset 0 -1px 0 rgba(0,0,0,.25)}kbd kbd{padding:0;font-size:100%;font-weight:700;-webkit-box-shadow:none;box-shadow:none}pre{display:block;padding:9.5px;margin:0 0 10px;font-size:13px;line-height:1.42857143;color:#333;word-break:break-all;word-wrap:break-word;background-color:#f5f5f5;border:1px solid #ccc;border-radius:4px}pre code{padding:0;font-size:inherit;color:inherit;white-space:pre-wrap;background-color:transparent;border-radius:0}.pre-scrollable{max-height:340px;overflow-y:scroll}.container{padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width:768px){.container{width:750px}}@media (min-width:992px){.container{width:970px}}@media (min-width:1200px){.container{width:1170px}}.container-fluid{padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}.row{margin-right:-15px;margin-left:-15px}.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9{position:relative;min-height:1px;padding-right:15px;padding-left:15px}.col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9{float:left}.col-xs-12{width:100%}.col-xs-11{width:91.66666667%}.col-xs-10{width:83.33333333%}.col-xs-9{width:75%}.col-xs-8{width:66.66666667%}.col-xs-7{width:58.33333333%}.col-xs-6{width:50%}.col-xs-5{width:41.66666667%}.col-xs-4{width:33.33333333%}.col-xs-3{width:25%}.col-xs-2{width:16.66666667%}.col-xs-1{width:8.33333333%}.col-xs-pull-12{right:100%}.col-xs-pull-11{right:91.66666667%}.col-xs-pull-10{right:83.33333333%}.col-xs-pull-9{right:75%}.col-xs-pull-8{right:66.66666667%}.col-xs-pull-7{right:58.33333333%}.col-xs-pull-6{right:50%}.col-xs-pull-5{right:41.66666667%}.col-xs-pull-4{right:33.33333333%}.col-xs-pull-3{right:25%}.col-xs-pull-2{right:16.66666667%}.col-xs-pull-1{right:8.33333333%}.col-xs-pull-0{right:auto}.col-xs-push-12{left:100%}.col-xs-push-11{left:91.66666667%}.col-xs-push-10{left:83.33333333%}.col-xs-push-9{left:75%}.col-xs-push-8{left:66.66666667%}.col-xs-push-7{left:58.33333333%}.col-xs-push-6{left:50%}.col-xs-push-5{left:41.66666667%}.col-xs-push-4{left:33.33333333%}.col-xs-push-3{left:25%}.col-xs-push-2{left:16.66666667%}.col-xs-push-1{left:8.33333333%}.col-xs-push-0{left:auto}.col-xs-offset-12{margin-left:100%}.col-xs-offset-11{margin-left:91.66666667%}.col-xs-offset-10{margin-left:83.33333333%}.col-xs-offset-9{margin-left:75%}.col-xs-offset-8{margin-left:66.66666667%}.col-xs-offset-7{margin-left:58.33333333%}.col-xs-offset-6{margin-left:50%}.col-xs-offset-5{margin-left:41.66666667%}.col-xs-offset-4{margin-left:33.33333333%}.col-xs-offset-3{margin-left:25%}.col-xs-offset-2{margin-left:16.66666667%}.col-xs-offset-1{margin-left:8.33333333%}.col-xs-offset-0{margin-left:0}@media (min-width:768px){.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9{float:left}.col-sm-12{width:100%}.col-sm-11{width:91.66666667%}.col-sm-10{width:83.33333333%}.col-sm-9{width:75%}.col-sm-8{width:66.66666667%}.col-sm-7{width:58.33333333%}.col-sm-6{width:50%}.col-sm-5{width:41.66666667%}.col-sm-4{width:33.33333333%}.col-sm-3{width:25%}.col-sm-2{width:16.66666667%}.col-sm-1{width:8.33333333%}.col-sm-pull-12{right:100%}.col-sm-pull-11{right:91.66666667%}.col-sm-pull-10{right:83.33333333%}.col-sm-pull-9{right:75%}.col-sm-pull-8{right:66.66666667%}.col-sm-pull-7{right:58.33333333%}.col-sm-pull-6{right:50%}.col-sm-pull-5{right:41.66666667%}.col-sm-pull-4{right:33.33333333%}.col-sm-pull-3{right:25%}.col-sm-pull-2{right:16.66666667%}.col-sm-pull-1{right:8.33333333%}.col-sm-pull-0{right:auto}.col-sm-push-12{left:100%}.col-sm-push-11{left:91.66666667%}.col-sm-push-10{left:83.33333333%}.col-sm-push-9{left:75%}.col-sm-push-8{left:66.66666667%}.col-sm-push-7{left:58.33333333%}.col-sm-push-6{left:50%}.col-sm-push-5{left:41.66666667%}.col-sm-push-4{left:33.33333333%}.col-sm-push-3{left:25%}.col-sm-push-2{left:16.66666667%}.col-sm-push-1{left:8.33333333%}.col-sm-push-0{left:auto}.col-sm-offset-12{margin-left:100%}.col-sm-offset-11{margin-left:91.66666667%}.col-sm-offset-10{margin-left:83.33333333%}.col-sm-offset-9{margin-left:75%}.col-sm-offset-8{margin-left:66.66666667%}.col-sm-offset-7{margin-left:58.33333333%}.col-sm-offset-6{margin-left:50%}.col-sm-offset-5{margin-left:41.66666667%}.col-sm-offset-4{margin-left:33.33333333%}.col-sm-offset-3{margin-left:25%}.col-sm-offset-2{margin-left:16.66666667%}.col-sm-offset-1{margin-left:8.33333333%}.col-sm-offset-0{margin-left:0}}@media (min-width:992px){.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9{float:left}.col-md-12{width:100%}.col-md-11{width:91.66666667%}.col-md-10{width:83.33333333%}.col-md-9{width:75%}.col-md-8{width:66.66666667%}.col-md-7{width:58.33333333%}.col-md-6{width:50%}.col-md-5{width:41.66666667%}.col-md-4{width:33.33333333%}.col-md-3{width:25%}.col-md-2{width:16.66666667%}.col-md-1{width:8.33333333%}.col-md-pull-12{right:100%}.col-md-pull-11{right:91.66666667%}.col-md-pull-10{right:83.33333333%}.col-md-pull-9{right:75%}.col-md-pull-8{right:66.66666667%}.col-md-pull-7{right:58.33333333%}.col-md-pull-6{right:50%}.col-md-pull-5{right:41.66666667%}.col-md-pull-4{right:33.33333333%}.col-md-pull-3{right:25%}.col-md-pull-2{right:16.66666667%}.col-md-pull-1{right:8.33333333%}.col-md-pull-0{right:auto}.col-md-push-12{left:100%}.col-md-push-11{left:91.66666667%}.col-md-push-10{left:83.33333333%}.col-md-push-9{left:75%}.col-md-push-8{left:66.66666667%}.col-md-push-7{left:58.33333333%}.col-md-push-6{left:50%}.col-md-push-5{left:41.66666667%}.col-md-push-4{left:33.33333333%}.col-md-push-3{left:25%}.col-md-push-2{left:16.66666667%}.col-md-push-1{left:8.33333333%}.col-md-push-0{left:auto}.col-md-offset-12{margin-left:100%}.col-md-offset-11{margin-left:91.66666667%}.col-md-offset-10{margin-left:83.33333333%}.col-md-offset-9{margin-left:75%}.col-md-offset-8{margin-left:66.66666667%}.col-md-offset-7{margin-left:58.33333333%}.col-md-offset-6{margin-left:50%}.col-md-offset-5{margin-left:41.66666667%}.col-md-offset-4{margin-left:33.33333333%}.col-md-offset-3{margin-left:25%}.col-md-offset-2{margin-left:16.66666667%}.col-md-offset-1{margin-left:8.33333333%}.col-md-offset-0{margin-left:0}}@media (min-width:1200px){.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9{float:left}.col-lg-12{width:100%}.col-lg-11{width:91.66666667%}.col-lg-10{width:83.33333333%}.col-lg-9{width:75%}.col-lg-8{width:66.66666667%}.col-lg-7{width:58.33333333%}.col-lg-6{width:50%}.col-lg-5{width:41.66666667%}.col-lg-4{width:33.33333333%}.col-lg-3{width:25%}.col-lg-2{width:16.66666667%}.col-lg-1{width:8.33333333%}.col-lg-pull-12{right:100%}.col-lg-pull-11{right:91.66666667%}.col-lg-pull-10{right:83.33333333%}.col-lg-pull-9{right:75%}.col-lg-pull-8{right:66.66666667%}.col-lg-pull-7{right:58.33333333%}.col-lg-pull-6{right:50%}.col-lg-pull-5{right:41.66666667%}.col-lg-pull-4{right:33.33333333%}.col-lg-pull-3{right:25%}.col-lg-pull-2{right:16.66666667%}.col-lg-pull-1{right:8.33333333%}.col-lg-pull-0{right:auto}.col-lg-push-12{left:100%}.col-lg-push-11{left:91.66666667%}.col-lg-push-10{left:83.33333333%}.col-lg-push-9{left:75%}.col-lg-push-8{left:66.66666667%}.col-lg-push-7{left:58.33333333%}.col-lg-push-6{left:50%}.col-lg-push-5{left:41.66666667%}.col-lg-push-4{left:33.33333333%}.col-lg-push-3{left:25%}.col-lg-push-2{left:16.66666667%}.col-lg-push-1{left:8.33333333%}.col-lg-push-0{left:auto}.col-lg-offset-12{margin-left:100%}.col-lg-offset-11{margin-left:91.66666667%}.col-lg-offset-10{margin-left:83.33333333%}.col-lg-offset-9{margin-left:75%}.col-lg-offset-8{margin-left:66.66666667%}.col-lg-offset-7{margin-left:58.33333333%}.col-lg-offset-6{margin-left:50%}.col-lg-offset-5{margin-left:41.66666667%}.col-lg-offset-4{margin-left:33.33333333%}.col-lg-offset-3{margin-left:25%}.col-lg-offset-2{margin-left:16.66666667%}.col-lg-offset-1{margin-left:8.33333333%}.col-lg-offset-0{margin-left:0}}table{background-color:transparent}caption{padding-top:8px;padding-bottom:8px;color:#777;text-align:left}th{text-align:left}.table{width:100%;max-width:100%;margin-bottom:20px}.table>tbody>tr>td,.table>tbody>tr>th,.table>tfoot>tr>td,.table>tfoot>tr>th,.table>thead>tr>td,.table>thead>tr>th{padding:8px;line-height:1.42857143;vertical-align:top;border-top:1px solid #ddd}.table>thead>tr>th{vertical-align:bottom;border-bottom:2px solid #ddd}.table>caption+thead>tr:first-child>td,.table>caption+thead>tr:first-child>th,.table>colgroup+thead>tr:first-child>td,.table>colgroup+thead>tr:first-child>th,.table>thead:first-child>tr:first-child>td,.table>thead:first-child>tr:first-child>th{border-top:0}.table>tbody+tbody{border-top:2px solid #ddd}.table .table{background-color:#fff}.table-condensed>tbody>tr>td,.table-condensed>tbody>tr>th,.table-condensed>tfoot>tr>td,.table-condensed>tfoot>tr>th,.table-condensed>thead>tr>td,.table-condensed>thead>tr>th{padding:5px}.table-bordered{border:1px solid #ddd}.table-bordered>tbody>tr>td,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>td,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border:1px solid #ddd}.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border-bottom-width:2px}.table-striped>tbody>tr:nth-of-type(odd){background-color:#f9f9f9}.table-hover>tbody>tr:hover{background-color:#f5f5f5}table col[class*=col-]{position:static;display:table-column;float:none}table td[class*=col-],table th[class*=col-]{position:static;display:table-cell;float:none}.table>tbody>tr.active>td,.table>tbody>tr.active>th,.table>tbody>tr>td.active,.table>tbody>tr>th.active,.table>tfoot>tr.active>td,.table>tfoot>tr.active>th,.table>tfoot>tr>td.active,.table>tfoot>tr>th.active,.table>thead>tr.active>td,.table>thead>tr.active>th,.table>thead>tr>td.active,.table>thead>tr>th.active{background-color:#f5f5f5}.table-hover>tbody>tr.active:hover>td,.table-hover>tbody>tr.active:hover>th,.table-hover>tbody>tr:hover>.active,.table-hover>tbody>tr>td.active:hover,.table-hover>tbody>tr>th.active:hover{background-color:#e8e8e8}.table>tbody>tr.success>td,.table>tbody>tr.success>th,.table>tbody>tr>td.success,.table>tbody>tr>th.success,.table>tfoot>tr.success>td,.table>tfoot>tr.success>th,.table>tfoot>tr>td.success,.table>tfoot>tr>th.success,.table>thead>tr.success>td,.table>thead>tr.success>th,.table>thead>tr>td.success,.table>thead>tr>th.success{background-color:#dff0d8}.table-hover>tbody>tr.success:hover>td,.table-hover>tbody>tr.success:hover>th,.table-hover>tbody>tr:hover>.success,.table-hover>tbody>tr>td.success:hover,.table-hover>tbody>tr>th.success:hover{background-color:#d0e9c6}.table>tbody>tr.info>td,.table>tbody>tr.info>th,.table>tbody>tr>td.info,.table>tbody>tr>th.info,.table>tfoot>tr.info>td,.table>tfoot>tr.info>th,.table>tfoot>tr>td.info,.table>tfoot>tr>th.info,.table>thead>tr.info>td,.table>thead>tr.info>th,.table>thead>tr>td.info,.table>thead>tr>th.info{background-color:#d9edf7}.table-hover>tbody>tr.info:hover>td,.table-hover>tbody>tr.info:hover>th,.table-hover>tbody>tr:hover>.info,.table-hover>tbody>tr>td.info:hover,.table-hover>tbody>tr>th.info:hover{background-color:#c4e3f3}.table>tbody>tr.warning>td,.table>tbody>tr.warning>th,.table>tbody>tr>td.warning,.table>tbody>tr>th.warning,.table>tfoot>tr.warning>td,.table>tfoot>tr.warning>th,.table>tfoot>tr>td.warning,.table>tfoot>tr>th.warning,.table>thead>tr.warning>td,.table>thead>tr.warning>th,.table>thead>tr>td.warning,.table>thead>tr>th.warning{background-color:#fcf8e3}.table-hover>tbody>tr.warning:hover>td,.table-hover>tbody>tr.warning:hover>th,.table-hover>tbody>tr:hover>.warning,.table-hover>tbody>tr>td.warning:hover,.table-hover>tbody>tr>th.warning:hover{background-color:#faf2cc}.table>tbody>tr.danger>td,.table>tbody>tr.danger>th,.table>tbody>tr>td.danger,.table>tbody>tr>th.danger,.table>tfoot>tr.danger>td,.table>tfoot>tr.danger>th,.table>tfoot>tr>td.danger,.table>tfoot>tr>th.danger,.table>thead>tr.danger>td,.table>thead>tr.danger>th,.table>thead>tr>td.danger,.table>thead>tr>th.danger{background-color:#f2dede}.table-hover>tbody>tr.danger:hover>td,.table-hover>tbody>tr.danger:hover>th,.table-hover>tbody>tr:hover>.danger,.table-hover>tbody>tr>td.danger:hover,.table-hover>tbody>tr>th.danger:hover{background-color:#ebcccc}.table-responsive{min-height:.01%;overflow-x:auto}@media screen and (max-width:767px){.table-responsive{width:100%;margin-bottom:15px;overflow-y:hidden;-ms-overflow-style:-ms-autohiding-scrollbar;border:1px solid #ddd}.table-responsive>.table{margin-bottom:0}.table-responsive>.table>tbody>tr>td,.table-responsive>.table>tbody>tr>th,.table-responsive>.table>tfoot>tr>td,.table-responsive>.table>tfoot>tr>th,.table-responsive>.table>thead>tr>td,.table-responsive>.table>thead>tr>th{white-space:nowrap}.table-responsive>.table-bordered{border:0}.table-responsive>.table-bordered>tbody>tr>td:first-child,.table-responsive>.table-bordered>tbody>tr>th:first-child,.table-responsive>.table-bordered>tfoot>tr>td:first-child,.table-responsive>.table-bordered>tfoot>tr>th:first-child,.table-responsive>.table-bordered>thead>tr>td:first-child,.table-responsive>.table-bordered>thead>tr>th:first-child{border-left:0}.table-responsive>.table-bordered>tbody>tr>td:last-child,.table-responsive>.table-bordered>tbody>tr>th:last-child,.table-responsive>.table-bordered>tfoot>tr>td:last-child,.table-responsive>.table-bordered>tfoot>tr>th:last-child,.table-responsive>.table-bordered>thead>tr>td:last-child,.table-responsive>.table-bordered>thead>tr>th:last-child{border-right:0}.table-responsive>.table-bordered>tbody>tr:last-child>td,.table-responsive>.table-bordered>tbody>tr:last-child>th,.table-responsive>.table-bordered>tfoot>tr:last-child>td,.table-responsive>.table-bordered>tfoot>tr:last-child>th{border-bottom:0}}fieldset{min-width:0;padding:0;margin:0;border:0}legend{display:block;width:100%;padding:0;margin-bottom:20px;font-size:21px;line-height:inherit;color:#333;border:0;border-bottom:1px solid #e5e5e5}label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:700}input[type=search]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}input[type=checkbox],input[type=radio]{margin:4px 0 0;margin-top:1px\\9;line-height:normal}input[type=file]{display:block}input[type=range]{display:block;width:100%}select[multiple],select[size]{height:auto}input[type=file]:focus,input[type=checkbox]:focus,input[type=radio]:focus{outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}output{display:block;padding-top:7px;font-size:14px;line-height:1.42857143;color:#555}.form-control{display:block;width:100%;height:34px;padding:6px 12px;font-size:14px;line-height:1.42857143;color:#555;background-color:#fff;background-image:none;border:1px solid #ccc;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}.form-control:focus{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.form-control::-moz-placeholder{color:#999;opacity:1}.form-control:-ms-input-placeholder{color:#999}.form-control::-webkit-input-placeholder{color:#999}.form-control[disabled],.form-control[readonly],fieldset[disabled] .form-control{background-color:#eee;opacity:1}.form-control[disabled],fieldset[disabled] .form-control{cursor:not-allowed}textarea.form-control{height:auto}input[type=search]{-webkit-appearance:none}@media screen and (-webkit-min-device-pixel-ratio:0){input[type=date].form-control,input[type=time].form-control,input[type=datetime-local].form-control,input[type=month].form-control{line-height:34px}.input-group-sm input[type=date],.input-group-sm input[type=time],.input-group-sm input[type=datetime-local],.input-group-sm input[type=month],input[type=date].input-sm,input[type=time].input-sm,input[type=datetime-local].input-sm,input[type=month].input-sm{line-height:30px}.input-group-lg input[type=date],.input-group-lg input[type=time],.input-group-lg input[type=datetime-local],.input-group-lg input[type=month],input[type=date].input-lg,input[type=time].input-lg,input[type=datetime-local].input-lg,input[type=month].input-lg{line-height:46px}}.form-group{margin-bottom:15px}.checkbox,.radio{position:relative;display:block;margin-top:10px;margin-bottom:10px}.checkbox label,.radio label{min-height:20px;padding-left:20px;margin-bottom:0;font-weight:400;cursor:pointer}.checkbox input[type=checkbox],.checkbox-inline input[type=checkbox],.radio input[type=radio],.radio-inline input[type=radio]{position:absolute;margin-top:4px\\9;margin-left:-20px}.checkbox+.checkbox,.radio+.radio{margin-top:-5px}.checkbox-inline,.radio-inline{position:relative;display:inline-block;padding-left:20px;margin-bottom:0;font-weight:400;vertical-align:middle;cursor:pointer}.checkbox-inline+.checkbox-inline,.radio-inline+.radio-inline{margin-top:0;margin-left:10px}fieldset[disabled] input[type=checkbox],fieldset[disabled] input[type=radio],input[type=checkbox].disabled,input[type=checkbox][disabled],input[type=radio].disabled,input[type=radio][disabled]{cursor:not-allowed}.checkbox-inline.disabled,.radio-inline.disabled,fieldset[disabled] .checkbox-inline,fieldset[disabled] .radio-inline{cursor:not-allowed}.checkbox.disabled label,.radio.disabled label,fieldset[disabled] .checkbox label,fieldset[disabled] .radio label{cursor:not-allowed}.form-control-static{min-height:34px;padding-top:7px;padding-bottom:7px;margin-bottom:0}.form-control-static.input-lg,.form-control-static.input-sm{padding-right:0;padding-left:0}.input-sm{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}select.input-sm{height:30px;line-height:30px}select[multiple].input-sm,textarea.input-sm{height:auto}.form-group-sm .form-control{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}.form-group-sm select.form-control{height:30px;line-height:30px}.form-group-sm select[multiple].form-control,.form-group-sm textarea.form-control{height:auto}.form-group-sm .form-control-static{height:30px;min-height:32px;padding:6px 10px;font-size:12px;line-height:1.5}.input-lg{height:46px;padding:10px 16px;font-size:18px;line-height:1.3333333;border-radius:6px}select.input-lg{height:46px;line-height:46px}select[multiple].input-lg,textarea.input-lg{height:auto}.form-group-lg .form-control{height:46px;padding:10px 16px;font-size:18px;line-height:1.3333333;border-radius:6px}.form-group-lg select.form-control{height:46px;line-height:46px}.form-group-lg select[multiple].form-control,.form-group-lg textarea.form-control{height:auto}.form-group-lg .form-control-static{height:46px;min-height:38px;padding:11px 16px;font-size:18px;line-height:1.3333333}.has-feedback{position:relative}.has-feedback .form-control{padding-right:42.5px}.form-control-feedback{position:absolute;top:0;right:0;z-index:2;display:block;width:34px;height:34px;line-height:34px;text-align:center;pointer-events:none}.form-group-lg .form-control+.form-control-feedback,.input-group-lg+.form-control-feedback,.input-lg+.form-control-feedback{width:46px;height:46px;line-height:46px}.form-group-sm .form-control+.form-control-feedback,.input-group-sm+.form-control-feedback,.input-sm+.form-control-feedback{width:30px;height:30px;line-height:30px}.has-success .checkbox,.has-success .checkbox-inline,.has-success .control-label,.has-success .help-block,.has-success .radio,.has-success .radio-inline,.has-success.checkbox label,.has-success.checkbox-inline label,.has-success.radio label,.has-success.radio-inline label{color:#3c763d}.has-success .form-control{border-color:#3c763d;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-success .form-control:focus{border-color:#2b542c;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168}.has-success .input-group-addon{color:#3c763d;background-color:#dff0d8;border-color:#3c763d}.has-success .form-control-feedback{color:#3c763d}.has-warning .checkbox,.has-warning .checkbox-inline,.has-warning .control-label,.has-warning .help-block,.has-warning .radio,.has-warning .radio-inline,.has-warning.checkbox label,.has-warning.checkbox-inline label,.has-warning.radio label,.has-warning.radio-inline label{color:#8a6d3b}.has-warning .form-control{border-color:#8a6d3b;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-warning .form-control:focus{border-color:#66512c;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b}.has-warning .input-group-addon{color:#8a6d3b;background-color:#fcf8e3;border-color:#8a6d3b}.has-warning .form-control-feedback{color:#8a6d3b}.has-error .checkbox,.has-error .checkbox-inline,.has-error .control-label,.has-error .help-block,.has-error .radio,.has-error .radio-inline,.has-error.checkbox label,.has-error.checkbox-inline label,.has-error.radio label,.has-error.radio-inline label{color:#a94442}.has-error .form-control{border-color:#a94442;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-error .form-control:focus{border-color:#843534;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483}.has-error .input-group-addon{color:#a94442;background-color:#f2dede;border-color:#a94442}.has-error .form-control-feedback{color:#a94442}.has-feedback label~.form-control-feedback{top:25px}.has-feedback label.sr-only~.form-control-feedback{top:0}.help-block{display:block;margin-top:5px;margin-bottom:10px;color:#737373}@media (min-width:768px){.form-inline .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.form-inline .form-control{display:inline-block;width:auto;vertical-align:middle}.form-inline .form-control-static{display:inline-block}.form-inline .input-group{display:inline-table;vertical-align:middle}.form-inline .input-group .form-control,.form-inline .input-group .input-group-addon,.form-inline .input-group .input-group-btn{width:auto}.form-inline .input-group>.form-control{width:100%}.form-inline .control-label{margin-bottom:0;vertical-align:middle}.form-inline .checkbox,.form-inline .radio{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.form-inline .checkbox label,.form-inline .radio label{padding-left:0}.form-inline .checkbox input[type=checkbox],.form-inline .radio input[type=radio]{position:relative;margin-left:0}.form-inline .has-feedback .form-control-feedback{top:0}}.form-horizontal .checkbox,.form-horizontal .checkbox-inline,.form-horizontal .radio,.form-horizontal .radio-inline{padding-top:7px;margin-top:0;margin-bottom:0}.form-horizontal .checkbox,.form-horizontal .radio{min-height:27px}.form-horizontal .form-group{margin-right:-15px;margin-left:-15px}@media (min-width:768px){.form-horizontal .control-label{padding-top:7px;margin-bottom:0;text-align:right}}.form-horizontal .has-feedback .form-control-feedback{right:15px}@media (min-width:768px){.form-horizontal .form-group-lg .control-label{padding-top:14.33px;font-size:18px}}@media (min-width:768px){.form-horizontal .form-group-sm .control-label{padding-top:6px;font-size:12px}}.btn{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-image:none;border:1px solid transparent;border-radius:4px}.btn.active.focus,.btn.active:focus,.btn.focus,.btn:active.focus,.btn:active:focus,.btn:focus{outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.btn.focus,.btn:focus,.btn:hover{color:#333;text-decoration:none}.btn.active,.btn:active{background-image:none;outline:0;-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}.btn.disabled,.btn[disabled],fieldset[disabled] .btn{cursor:not-allowed;filter:alpha(opacity=65);-webkit-box-shadow:none;box-shadow:none;opacity:.65}a.btn.disabled,fieldset[disabled] a.btn{pointer-events:none}.btn-default{color:#333;background-color:#fff;border-color:#ccc}.btn-default.focus,.btn-default:focus{color:#333;background-color:#e6e6e6;border-color:#8c8c8c}.btn-default:hover{color:#333;background-color:#e6e6e6;border-color:#adadad}.btn-default.active,.btn-default:active,.open>.dropdown-toggle.btn-default{color:#333;background-color:#e6e6e6;border-color:#adadad}.btn-default.active.focus,.btn-default.active:focus,.btn-default.active:hover,.btn-default:active.focus,.btn-default:active:focus,.btn-default:active:hover,.open>.dropdown-toggle.btn-default.focus,.open>.dropdown-toggle.btn-default:focus,.open>.dropdown-toggle.btn-default:hover{color:#333;background-color:#d4d4d4;border-color:#8c8c8c}.btn-default.active,.btn-default:active,.open>.dropdown-toggle.btn-default{background-image:none}.btn-default.disabled,.btn-default.disabled.active,.btn-default.disabled.focus,.btn-default.disabled:active,.btn-default.disabled:focus,.btn-default.disabled:hover,.btn-default[disabled],.btn-default[disabled].active,.btn-default[disabled].focus,.btn-default[disabled]:active,.btn-default[disabled]:focus,.btn-default[disabled]:hover,fieldset[disabled] .btn-default,fieldset[disabled] .btn-default.active,fieldset[disabled] .btn-default.focus,fieldset[disabled] .btn-default:active,fieldset[disabled] .btn-default:focus,fieldset[disabled] .btn-default:hover{background-color:#fff;border-color:#ccc}.btn-default .badge{color:#fff;background-color:#333}.btn-primary{color:#fff;background-color:#337ab7;border-color:#2e6da4}.btn-primary.focus,.btn-primary:focus{color:#fff;background-color:#286090;border-color:#122b40}.btn-primary:hover{color:#fff;background-color:#286090;border-color:#204d74}.btn-primary.active,.btn-primary:active,.open>.dropdown-toggle.btn-primary{color:#fff;background-color:#286090;border-color:#204d74}.btn-primary.active.focus,.btn-primary.active:focus,.btn-primary.active:hover,.btn-primary:active.focus,.btn-primary:active:focus,.btn-primary:active:hover,.open>.dropdown-toggle.btn-primary.focus,.open>.dropdown-toggle.btn-primary:focus,.open>.dropdown-toggle.btn-primary:hover{color:#fff;background-color:#204d74;border-color:#122b40}.btn-primary.active,.btn-primary:active,.open>.dropdown-toggle.btn-primary{background-image:none}.btn-primary.disabled,.btn-primary.disabled.active,.btn-primary.disabled.focus,.btn-primary.disabled:active,.btn-primary.disabled:focus,.btn-primary.disabled:hover,.btn-primary[disabled],.btn-primary[disabled].active,.btn-primary[disabled].focus,.btn-primary[disabled]:active,.btn-primary[disabled]:focus,.btn-primary[disabled]:hover,fieldset[disabled] .btn-primary,fieldset[disabled] .btn-primary.active,fieldset[disabled] .btn-primary.focus,fieldset[disabled] .btn-primary:active,fieldset[disabled] .btn-primary:focus,fieldset[disabled] .btn-primary:hover{background-color:#337ab7;border-color:#2e6da4}.btn-primary .badge{color:#337ab7;background-color:#fff}.btn-success{color:#fff;background-color:#5cb85c;border-color:#4cae4c}.btn-success.focus,.btn-success:focus{color:#fff;background-color:#449d44;border-color:#255625}.btn-success:hover{color:#fff;background-color:#449d44;border-color:#398439}.btn-success.active,.btn-success:active,.open>.dropdown-toggle.btn-success{color:#fff;background-color:#449d44;border-color:#398439}.btn-success.active.focus,.btn-success.active:focus,.btn-success.active:hover,.btn-success:active.focus,.btn-success:active:focus,.btn-success:active:hover,.open>.dropdown-toggle.btn-success.focus,.open>.dropdown-toggle.btn-success:focus,.open>.dropdown-toggle.btn-success:hover{color:#fff;background-color:#398439;border-color:#255625}.btn-success.active,.btn-success:active,.open>.dropdown-toggle.btn-success{background-image:none}.btn-success.disabled,.btn-success.disabled.active,.btn-success.disabled.focus,.btn-success.disabled:active,.btn-success.disabled:focus,.btn-success.disabled:hover,.btn-success[disabled],.btn-success[disabled].active,.btn-success[disabled].focus,.btn-success[disabled]:active,.btn-success[disabled]:focus,.btn-success[disabled]:hover,fieldset[disabled] .btn-success,fieldset[disabled] .btn-success.active,fieldset[disabled] .btn-success.focus,fieldset[disabled] .btn-success:active,fieldset[disabled] .btn-success:focus,fieldset[disabled] .btn-success:hover{background-color:#5cb85c;border-color:#4cae4c}.btn-success .badge{color:#5cb85c;background-color:#fff}.btn-info{color:#fff;background-color:#5bc0de;border-color:#46b8da}.btn-info.focus,.btn-info:focus{color:#fff;background-color:#31b0d5;border-color:#1b6d85}.btn-info:hover{color:#fff;background-color:#31b0d5;border-color:#269abc}.btn-info.active,.btn-info:active,.open>.dropdown-toggle.btn-info{color:#fff;background-color:#31b0d5;border-color:#269abc}.btn-info.active.focus,.btn-info.active:focus,.btn-info.active:hover,.btn-info:active.focus,.btn-info:active:focus,.btn-info:active:hover,.open>.dropdown-toggle.btn-info.focus,.open>.dropdown-toggle.btn-info:focus,.open>.dropdown-toggle.btn-info:hover{color:#fff;background-color:#269abc;border-color:#1b6d85}.btn-info.active,.btn-info:active,.open>.dropdown-toggle.btn-info{background-image:none}.btn-info.disabled,.btn-info.disabled.active,.btn-info.disabled.focus,.btn-info.disabled:active,.btn-info.disabled:focus,.btn-info.disabled:hover,.btn-info[disabled],.btn-info[disabled].active,.btn-info[disabled].focus,.btn-info[disabled]:active,.btn-info[disabled]:focus,.btn-info[disabled]:hover,fieldset[disabled] .btn-info,fieldset[disabled] .btn-info.active,fieldset[disabled] .btn-info.focus,fieldset[disabled] .btn-info:active,fieldset[disabled] .btn-info:focus,fieldset[disabled] .btn-info:hover{background-color:#5bc0de;border-color:#46b8da}.btn-info .badge{color:#5bc0de;background-color:#fff}.btn-warning{color:#fff;background-color:#f0ad4e;border-color:#eea236}.btn-warning.focus,.btn-warning:focus{color:#fff;background-color:#ec971f;border-color:#985f0d}.btn-warning:hover{color:#fff;background-color:#ec971f;border-color:#d58512}.btn-warning.active,.btn-warning:active,.open>.dropdown-toggle.btn-warning{color:#fff;background-color:#ec971f;border-color:#d58512}.btn-warning.active.focus,.btn-warning.active:focus,.btn-warning.active:hover,.btn-warning:active.focus,.btn-warning:active:focus,.btn-warning:active:hover,.open>.dropdown-toggle.btn-warning.focus,.open>.dropdown-toggle.btn-warning:focus,.open>.dropdown-toggle.btn-warning:hover{color:#fff;background-color:#d58512;border-color:#985f0d}.btn-warning.active,.btn-warning:active,.open>.dropdown-toggle.btn-warning{background-image:none}.btn-warning.disabled,.btn-warning.disabled.active,.btn-warning.disabled.focus,.btn-warning.disabled:active,.btn-warning.disabled:focus,.btn-warning.disabled:hover,.btn-warning[disabled],.btn-warning[disabled].active,.btn-warning[disabled].focus,.btn-warning[disabled]:active,.btn-warning[disabled]:focus,.btn-warning[disabled]:hover,fieldset[disabled] .btn-warning,fieldset[disabled] .btn-warning.active,fieldset[disabled] .btn-warning.focus,fieldset[disabled] .btn-warning:active,fieldset[disabled] .btn-warning:focus,fieldset[disabled] .btn-warning:hover{background-color:#f0ad4e;border-color:#eea236}.btn-warning .badge{color:#f0ad4e;background-color:#fff}.btn-danger{color:#fff;background-color:#d9534f;border-color:#d43f3a}.btn-danger.focus,.btn-danger:focus{color:#fff;background-color:#c9302c;border-color:#761c19}.btn-danger:hover{color:#fff;background-color:#c9302c;border-color:#ac2925}.btn-danger.active,.btn-danger:active,.open>.dropdown-toggle.btn-danger{color:#fff;background-color:#c9302c;border-color:#ac2925}.btn-danger.active.focus,.btn-danger.active:focus,.btn-danger.active:hover,.btn-danger:active.focus,.btn-danger:active:focus,.btn-danger:active:hover,.open>.dropdown-toggle.btn-danger.focus,.open>.dropdown-toggle.btn-danger:focus,.open>.dropdown-toggle.btn-danger:hover{color:#fff;background-color:#ac2925;border-color:#761c19}.btn-danger.active,.btn-danger:active,.open>.dropdown-toggle.btn-danger{background-image:none}.btn-danger.disabled,.btn-danger.disabled.active,.btn-danger.disabled.focus,.btn-danger.disabled:active,.btn-danger.disabled:focus,.btn-danger.disabled:hover,.btn-danger[disabled],.btn-danger[disabled].active,.btn-danger[disabled].focus,.btn-danger[disabled]:active,.btn-danger[disabled]:focus,.btn-danger[disabled]:hover,fieldset[disabled] .btn-danger,fieldset[disabled] .btn-danger.active,fieldset[disabled] .btn-danger.focus,fieldset[disabled] .btn-danger:active,fieldset[disabled] .btn-danger:focus,fieldset[disabled] .btn-danger:hover{background-color:#d9534f;border-color:#d43f3a}.btn-danger .badge{color:#d9534f;background-color:#fff}.btn-link{font-weight:400;color:#337ab7;border-radius:0}.btn-link,.btn-link.active,.btn-link:active,.btn-link[disabled],fieldset[disabled] .btn-link{background-color:transparent;-webkit-box-shadow:none;box-shadow:none}.btn-link,.btn-link:active,.btn-link:focus,.btn-link:hover{border-color:transparent}.btn-link:focus,.btn-link:hover{color:#23527c;text-decoration:underline;background-color:transparent}.btn-link[disabled]:focus,.btn-link[disabled]:hover,fieldset[disabled] .btn-link:focus,fieldset[disabled] .btn-link:hover{color:#777;text-decoration:none}.btn-group-lg>.btn,.btn-lg{padding:10px 16px;font-size:18px;line-height:1.3333333;border-radius:6px}.btn-group-sm>.btn,.btn-sm{padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}.btn-group-xs>.btn,.btn-xs{padding:1px 5px;font-size:12px;line-height:1.5;border-radius:3px}.btn-block{display:block;width:100%}.btn-block+.btn-block{margin-top:5px}input[type=button].btn-block,input[type=reset].btn-block,input[type=submit].btn-block{width:100%}.fade{opacity:0;-webkit-transition:opacity .15s linear;-o-transition:opacity .15s linear;transition:opacity .15s linear}.fade.in{opacity:1}.collapse{display:none}.collapse.in{display:block}tr.collapse.in{display:table-row}tbody.collapse.in{display:table-row-group}.collapsing{position:relative;height:0;overflow:hidden;-webkit-transition-timing-function:ease;-o-transition-timing-function:ease;transition-timing-function:ease;-webkit-transition-duration:.35s;-o-transition-duration:.35s;transition-duration:.35s;-webkit-transition-property:height,visibility;-o-transition-property:height,visibility;transition-property:height,visibility}.caret{display:inline-block;width:0;height:0;margin-left:2px;vertical-align:middle;border-top:4px dashed;border-top:4px solid\\9;border-right:4px solid transparent;border-left:4px solid transparent}.dropdown,.dropup{position:relative}.dropdown-toggle:focus{outline:0}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;font-size:14px;text-align:left;list-style:none;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #ccc;border:1px solid rgba(0,0,0,.15);border-radius:4px;-webkit-box-shadow:0 6px 12px rgba(0,0,0,.175);box-shadow:0 6px 12px rgba(0,0,0,.175)}.dropdown-menu.pull-right{right:0;left:auto}.dropdown-menu .divider{height:1px;margin:9px 0;overflow:hidden;background-color:#e5e5e5}.dropdown-menu>li>a{display:block;padding:3px 20px;clear:both;font-weight:400;line-height:1.42857143;color:#333;white-space:nowrap}.dropdown-menu>li>a:focus,.dropdown-menu>li>a:hover{color:#262626;text-decoration:none;background-color:#f5f5f5}.dropdown-menu>.active>a,.dropdown-menu>.active>a:focus,.dropdown-menu>.active>a:hover{color:#fff;text-decoration:none;background-color:#337ab7;outline:0}.dropdown-menu>.disabled>a,.dropdown-menu>.disabled>a:focus,.dropdown-menu>.disabled>a:hover{color:#777}.dropdown-menu>.disabled>a:focus,.dropdown-menu>.disabled>a:hover{text-decoration:none;cursor:not-allowed;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.open>.dropdown-menu{display:block}.open>a{outline:0}.dropdown-menu-right{right:0;left:auto}.dropdown-menu-left{right:auto;left:0}.dropdown-header{display:block;padding:3px 20px;font-size:12px;line-height:1.42857143;color:#777;white-space:nowrap}.dropdown-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:990}.pull-right>.dropdown-menu{right:0;left:auto}.dropup .caret,.navbar-fixed-bottom .dropdown .caret{content:\"\";border-top:0;border-bottom:4px dashed;border-bottom:4px solid\\9}.dropup .dropdown-menu,.navbar-fixed-bottom .dropdown .dropdown-menu{top:auto;bottom:100%;margin-bottom:2px}@media (min-width:768px){.navbar-right .dropdown-menu{right:0;left:auto}.navbar-right .dropdown-menu-left{right:auto;left:0}}.btn-group,.btn-group-vertical{position:relative;display:inline-block;vertical-align:middle}.btn-group-vertical>.btn,.btn-group>.btn{position:relative;float:left}.btn-group-vertical>.btn.active,.btn-group-vertical>.btn:active,.btn-group-vertical>.btn:focus,.btn-group-vertical>.btn:hover,.btn-group>.btn.active,.btn-group>.btn:active,.btn-group>.btn:focus,.btn-group>.btn:hover{z-index:2}.btn-group .btn+.btn,.btn-group .btn+.btn-group,.btn-group .btn-group+.btn,.btn-group .btn-group+.btn-group{margin-left:-1px}.btn-toolbar{margin-left:-5px}.btn-toolbar .btn,.btn-toolbar .btn-group,.btn-toolbar .input-group{float:left}.btn-toolbar>.btn,.btn-toolbar>.btn-group,.btn-toolbar>.input-group{margin-left:5px}.btn-group>.btn:not(:first-child):not(:last-child):not(.dropdown-toggle){border-radius:0}.btn-group>.btn:first-child{margin-left:0}.btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle){border-top-right-radius:0;border-bottom-right-radius:0}.btn-group>.btn:last-child:not(:first-child),.btn-group>.dropdown-toggle:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.btn-group>.btn-group{float:left}.btn-group>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-top-right-radius:0;border-bottom-right-radius:0}.btn-group>.btn-group:last-child:not(:first-child)>.btn:first-child{border-top-left-radius:0;border-bottom-left-radius:0}.btn-group .dropdown-toggle:active,.btn-group.open .dropdown-toggle{outline:0}.btn-group>.btn+.dropdown-toggle{padding-right:8px;padding-left:8px}.btn-group>.btn-lg+.dropdown-toggle{padding-right:12px;padding-left:12px}.btn-group.open .dropdown-toggle{-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}.btn-group.open .dropdown-toggle.btn-link{-webkit-box-shadow:none;box-shadow:none}.btn .caret{margin-left:0}.btn-lg .caret{border-width:5px 5px 0;border-bottom-width:0}.dropup .btn-lg .caret{border-width:0 5px 5px}.btn-group-vertical>.btn,.btn-group-vertical>.btn-group,.btn-group-vertical>.btn-group>.btn{display:block;float:none;width:100%;max-width:100%}.btn-group-vertical>.btn-group>.btn{float:none}.btn-group-vertical>.btn+.btn,.btn-group-vertical>.btn+.btn-group,.btn-group-vertical>.btn-group+.btn,.btn-group-vertical>.btn-group+.btn-group{margin-top:-1px;margin-left:0}.btn-group-vertical>.btn:not(:first-child):not(:last-child){border-radius:0}.btn-group-vertical>.btn:first-child:not(:last-child){border-top-right-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn:last-child:not(:first-child){border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:4px}.btn-group-vertical>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group-vertical>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group-vertical>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn-group:last-child:not(:first-child)>.btn:first-child{border-top-left-radius:0;border-top-right-radius:0}.btn-group-justified{display:table;width:100%;table-layout:fixed;border-collapse:separate}.btn-group-justified>.btn,.btn-group-justified>.btn-group{display:table-cell;float:none;width:1%}.btn-group-justified>.btn-group .btn{width:100%}.btn-group-justified>.btn-group .dropdown-menu{left:auto}[data-toggle=buttons]>.btn input[type=checkbox],[data-toggle=buttons]>.btn input[type=radio],[data-toggle=buttons]>.btn-group>.btn input[type=checkbox],[data-toggle=buttons]>.btn-group>.btn input[type=radio]{position:absolute;clip:rect(0,0,0,0);pointer-events:none}.input-group{position:relative;display:table;border-collapse:separate}.input-group[class*=col-]{float:none;padding-right:0;padding-left:0}.input-group .form-control{position:relative;z-index:2;float:left;width:100%;margin-bottom:0}.input-group-lg>.form-control,.input-group-lg>.input-group-addon,.input-group-lg>.input-group-btn>.btn{height:46px;padding:10px 16px;font-size:18px;line-height:1.3333333;border-radius:6px}select.input-group-lg>.form-control,select.input-group-lg>.input-group-addon,select.input-group-lg>.input-group-btn>.btn{height:46px;line-height:46px}select[multiple].input-group-lg>.form-control,select[multiple].input-group-lg>.input-group-addon,select[multiple].input-group-lg>.input-group-btn>.btn,textarea.input-group-lg>.form-control,textarea.input-group-lg>.input-group-addon,textarea.input-group-lg>.input-group-btn>.btn{height:auto}.input-group-sm>.form-control,.input-group-sm>.input-group-addon,.input-group-sm>.input-group-btn>.btn{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}select.input-group-sm>.form-control,select.input-group-sm>.input-group-addon,select.input-group-sm>.input-group-btn>.btn{height:30px;line-height:30px}select[multiple].input-group-sm>.form-control,select[multiple].input-group-sm>.input-group-addon,select[multiple].input-group-sm>.input-group-btn>.btn,textarea.input-group-sm>.form-control,textarea.input-group-sm>.input-group-addon,textarea.input-group-sm>.input-group-btn>.btn{height:auto}.input-group .form-control,.input-group-addon,.input-group-btn{display:table-cell}.input-group .form-control:not(:first-child):not(:last-child),.input-group-addon:not(:first-child):not(:last-child),.input-group-btn:not(:first-child):not(:last-child){border-radius:0}.input-group-addon,.input-group-btn{width:1%;white-space:nowrap;vertical-align:middle}.input-group-addon{padding:6px 12px;font-size:14px;font-weight:400;line-height:1;color:#555;text-align:center;background-color:#eee;border:1px solid #ccc;border-radius:4px}.input-group-addon.input-sm{padding:5px 10px;font-size:12px;border-radius:3px}.input-group-addon.input-lg{padding:10px 16px;font-size:18px;border-radius:6px}.input-group-addon input[type=checkbox],.input-group-addon input[type=radio]{margin-top:0}.input-group .form-control:first-child,.input-group-addon:first-child,.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group>.btn,.input-group-btn:first-child>.dropdown-toggle,.input-group-btn:last-child>.btn-group:not(:last-child)>.btn,.input-group-btn:last-child>.btn:not(:last-child):not(.dropdown-toggle){border-top-right-radius:0;border-bottom-right-radius:0}.input-group-addon:first-child{border-right:0}.input-group .form-control:last-child,.input-group-addon:last-child,.input-group-btn:first-child>.btn-group:not(:first-child)>.btn,.input-group-btn:first-child>.btn:not(:first-child),.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group>.btn,.input-group-btn:last-child>.dropdown-toggle{border-top-left-radius:0;border-bottom-left-radius:0}.input-group-addon:last-child{border-left:0}.input-group-btn{position:relative;font-size:0;white-space:nowrap}.input-group-btn>.btn{position:relative}.input-group-btn>.btn+.btn{margin-left:-1px}.input-group-btn>.btn:active,.input-group-btn>.btn:focus,.input-group-btn>.btn:hover{z-index:2}.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group{margin-right:-1px}.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group{z-index:2;margin-left:-1px}.nav{padding-left:0;margin-bottom:0;list-style:none}.nav>li{position:relative;display:block}.nav>li>a{position:relative;display:block;padding:10px 15px}.nav>li>a:focus,.nav>li>a:hover{text-decoration:none;background-color:#eee}.nav>li.disabled>a{color:#777}.nav>li.disabled>a:focus,.nav>li.disabled>a:hover{color:#777;text-decoration:none;cursor:not-allowed;background-color:transparent}.nav .open>a,.nav .open>a:focus,.nav .open>a:hover{background-color:#eee;border-color:#337ab7}.nav .nav-divider{height:1px;margin:9px 0;overflow:hidden;background-color:#e5e5e5}.nav>li>a>img{max-width:none}.nav-tabs{border-bottom:1px solid #ddd}.nav-tabs>li{float:left;margin-bottom:-1px}.nav-tabs>li>a{margin-right:2px;line-height:1.42857143;border:1px solid transparent;border-radius:4px 4px 0 0}.nav-tabs>li>a:hover{border-color:#eee #eee #ddd}.nav-tabs>li.active>a,.nav-tabs>li.active>a:focus,.nav-tabs>li.active>a:hover{color:#555;cursor:default;background-color:#fff;border:1px solid #ddd;border-bottom-color:transparent}.nav-tabs.nav-justified{width:100%;border-bottom:0}.nav-tabs.nav-justified>li{float:none}.nav-tabs.nav-justified>li>a{margin-bottom:5px;text-align:center}.nav-tabs.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}@media (min-width:768px){.nav-tabs.nav-justified>li{display:table-cell;width:1%}.nav-tabs.nav-justified>li>a{margin-bottom:0}}.nav-tabs.nav-justified>li>a{margin-right:0;border-radius:4px}.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:focus,.nav-tabs.nav-justified>.active>a:hover{border:1px solid #ddd}@media (min-width:768px){.nav-tabs.nav-justified>li>a{border-bottom:1px solid #ddd;border-radius:4px 4px 0 0}.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:focus,.nav-tabs.nav-justified>.active>a:hover{border-bottom-color:#fff}}.nav-pills>li{float:left}.nav-pills>li>a{border-radius:4px}.nav-pills>li+li{margin-left:2px}.nav-pills>li.active>a,.nav-pills>li.active>a:focus,.nav-pills>li.active>a:hover{color:#fff;background-color:#337ab7}.nav-stacked>li{float:none}.nav-stacked>li+li{margin-top:2px;margin-left:0}.nav-justified{width:100%}.nav-justified>li{float:none}.nav-justified>li>a{margin-bottom:5px;text-align:center}.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}@media (min-width:768px){.nav-justified>li{display:table-cell;width:1%}.nav-justified>li>a{margin-bottom:0}}.nav-tabs-justified{border-bottom:0}.nav-tabs-justified>li>a{margin-right:0;border-radius:4px}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:focus,.nav-tabs-justified>.active>a:hover{border:1px solid #ddd}@media (min-width:768px){.nav-tabs-justified>li>a{border-bottom:1px solid #ddd;border-radius:4px 4px 0 0}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:focus,.nav-tabs-justified>.active>a:hover{border-bottom-color:#fff}}.tab-content>.tab-pane{display:none}.tab-content>.active{display:block}.nav-tabs .dropdown-menu{margin-top:-1px;border-top-left-radius:0;border-top-right-radius:0}.navbar{position:relative;min-height:50px;margin-bottom:20px;border:1px solid transparent}@media (min-width:768px){.navbar{border-radius:4px}}@media (min-width:768px){.navbar-header{float:left}}.navbar-collapse{padding-right:15px;padding-left:15px;overflow-x:visible;-webkit-overflow-scrolling:touch;border-top:1px solid transparent;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,.1);box-shadow:inset 0 1px 0 rgba(255,255,255,.1)}.navbar-collapse.in{overflow-y:auto}@media (min-width:768px){.navbar-collapse{width:auto;border-top:0;-webkit-box-shadow:none;box-shadow:none}.navbar-collapse.collapse{display:block!important;height:auto!important;padding-bottom:0;overflow:visible!important}.navbar-collapse.in{overflow-y:visible}.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse,.navbar-static-top .navbar-collapse{padding-right:0;padding-left:0}}.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse{max-height:340px}@media (max-device-width:480px) and (orientation:landscape){.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse{max-height:200px}}.container-fluid>.navbar-collapse,.container-fluid>.navbar-header,.container>.navbar-collapse,.container>.navbar-header{margin-right:-15px;margin-left:-15px}@media (min-width:768px){.container-fluid>.navbar-collapse,.container-fluid>.navbar-header,.container>.navbar-collapse,.container>.navbar-header{margin-right:0;margin-left:0}}.navbar-static-top{z-index:1000;border-width:0 0 1px}@media (min-width:768px){.navbar-static-top{border-radius:0}}.navbar-fixed-bottom,.navbar-fixed-top{position:fixed;right:0;left:0;z-index:1030}@media (min-width:768px){.navbar-fixed-bottom,.navbar-fixed-top{border-radius:0}}.navbar-fixed-top{top:0;border-width:0 0 1px}.navbar-fixed-bottom{bottom:0;margin-bottom:0;border-width:1px 0 0}.navbar-brand{float:left;height:50px;padding:15px 15px;font-size:18px;line-height:20px}.navbar-brand:focus,.navbar-brand:hover{text-decoration:none}.navbar-brand>img{display:block}@media (min-width:768px){.navbar>.container .navbar-brand,.navbar>.container-fluid .navbar-brand{margin-left:-15px}}.navbar-toggle{position:relative;float:right;padding:9px 10px;margin-top:8px;margin-right:15px;margin-bottom:8px;background-color:transparent;background-image:none;border:1px solid transparent;border-radius:4px}.navbar-toggle:focus{outline:0}.navbar-toggle .icon-bar{display:block;width:22px;height:2px;border-radius:1px}.navbar-toggle .icon-bar+.icon-bar{margin-top:4px}@media (min-width:768px){.navbar-toggle{display:none}}.navbar-nav{margin:7.5px -15px}.navbar-nav>li>a{padding-top:10px;padding-bottom:10px;line-height:20px}@media (max-width:767px){.navbar-nav .open .dropdown-menu{position:static;float:none;width:auto;margin-top:0;background-color:transparent;border:0;-webkit-box-shadow:none;box-shadow:none}.navbar-nav .open .dropdown-menu .dropdown-header,.navbar-nav .open .dropdown-menu>li>a{padding:5px 15px 5px 25px}.navbar-nav .open .dropdown-menu>li>a{line-height:20px}.navbar-nav .open .dropdown-menu>li>a:focus,.navbar-nav .open .dropdown-menu>li>a:hover{background-image:none}}@media (min-width:768px){.navbar-nav{float:left;margin:0}.navbar-nav>li{float:left}.navbar-nav>li>a{padding-top:15px;padding-bottom:15px}}.navbar-form{padding:10px 15px;margin-top:8px;margin-right:-15px;margin-bottom:8px;margin-left:-15px;border-top:1px solid transparent;border-bottom:1px solid transparent;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 1px 0 rgba(255,255,255,.1);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 1px 0 rgba(255,255,255,.1)}@media (min-width:768px){.navbar-form .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.navbar-form .form-control{display:inline-block;width:auto;vertical-align:middle}.navbar-form .form-control-static{display:inline-block}.navbar-form .input-group{display:inline-table;vertical-align:middle}.navbar-form .input-group .form-control,.navbar-form .input-group .input-group-addon,.navbar-form .input-group .input-group-btn{width:auto}.navbar-form .input-group>.form-control{width:100%}.navbar-form .control-label{margin-bottom:0;vertical-align:middle}.navbar-form .checkbox,.navbar-form .radio{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.navbar-form .checkbox label,.navbar-form .radio label{padding-left:0}.navbar-form .checkbox input[type=checkbox],.navbar-form .radio input[type=radio]{position:relative;margin-left:0}.navbar-form .has-feedback .form-control-feedback{top:0}}@media (max-width:767px){.navbar-form .form-group{margin-bottom:5px}.navbar-form .form-group:last-child{margin-bottom:0}}@media (min-width:768px){.navbar-form{width:auto;padding-top:0;padding-bottom:0;margin-right:0;margin-left:0;border:0;-webkit-box-shadow:none;box-shadow:none}}.navbar-nav>li>.dropdown-menu{margin-top:0;border-top-left-radius:0;border-top-right-radius:0}.navbar-fixed-bottom .navbar-nav>li>.dropdown-menu{margin-bottom:0;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}.navbar-btn{margin-top:8px;margin-bottom:8px}.navbar-btn.btn-sm{margin-top:10px;margin-bottom:10px}.navbar-btn.btn-xs{margin-top:14px;margin-bottom:14px}.navbar-text{margin-top:15px;margin-bottom:15px}@media (min-width:768px){.navbar-text{float:left;margin-right:15px;margin-left:15px}}@media (min-width:768px){.navbar-left{float:left!important}.navbar-right{float:right!important;margin-right:-15px}.navbar-right~.navbar-right{margin-right:0}}.navbar-default{background-color:#f8f8f8;border-color:#e7e7e7}.navbar-default .navbar-brand{color:#777}.navbar-default .navbar-brand:focus,.navbar-default .navbar-brand:hover{color:#5e5e5e;background-color:transparent}.navbar-default .navbar-text{color:#777}.navbar-default .navbar-nav>li>a{color:#777}.navbar-default .navbar-nav>li>a:focus,.navbar-default .navbar-nav>li>a:hover{color:#333;background-color:transparent}.navbar-default .navbar-nav>.active>a,.navbar-default .navbar-nav>.active>a:focus,.navbar-default .navbar-nav>.active>a:hover{color:#555;background-color:#e7e7e7}.navbar-default .navbar-nav>.disabled>a,.navbar-default .navbar-nav>.disabled>a:focus,.navbar-default .navbar-nav>.disabled>a:hover{color:#ccc;background-color:transparent}.navbar-default .navbar-toggle{border-color:#ddd}.navbar-default .navbar-toggle:focus,.navbar-default .navbar-toggle:hover{background-color:#ddd}.navbar-default .navbar-toggle .icon-bar{background-color:#888}.navbar-default .navbar-collapse,.navbar-default .navbar-form{border-color:#e7e7e7}.navbar-default .navbar-nav>.open>a,.navbar-default .navbar-nav>.open>a:focus,.navbar-default .navbar-nav>.open>a:hover{color:#555;background-color:#e7e7e7}@media (max-width:767px){.navbar-default .navbar-nav .open .dropdown-menu>li>a{color:#777}.navbar-default .navbar-nav .open .dropdown-menu>li>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>li>a:hover{color:#333;background-color:transparent}.navbar-default .navbar-nav .open .dropdown-menu>.active>a,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:hover{color:#555;background-color:#e7e7e7}.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:hover{color:#ccc;background-color:transparent}}.navbar-default .navbar-link{color:#777}.navbar-default .navbar-link:hover{color:#333}.navbar-default .btn-link{color:#777}.navbar-default .btn-link:focus,.navbar-default .btn-link:hover{color:#333}.navbar-default .btn-link[disabled]:focus,.navbar-default .btn-link[disabled]:hover,fieldset[disabled] .navbar-default .btn-link:focus,fieldset[disabled] .navbar-default .btn-link:hover{color:#ccc}.navbar-inverse{background-color:#222;border-color:#080808}.navbar-inverse .navbar-brand{color:#9d9d9d}.navbar-inverse .navbar-brand:focus,.navbar-inverse .navbar-brand:hover{color:#fff;background-color:transparent}.navbar-inverse .navbar-text{color:#9d9d9d}.navbar-inverse .navbar-nav>li>a{color:#9d9d9d}.navbar-inverse .navbar-nav>li>a:focus,.navbar-inverse .navbar-nav>li>a:hover{color:#fff;background-color:transparent}.navbar-inverse .navbar-nav>.active>a,.navbar-inverse .navbar-nav>.active>a:focus,.navbar-inverse .navbar-nav>.active>a:hover{color:#fff;background-color:#080808}.navbar-inverse .navbar-nav>.disabled>a,.navbar-inverse .navbar-nav>.disabled>a:focus,.navbar-inverse .navbar-nav>.disabled>a:hover{color:#444;background-color:transparent}.navbar-inverse .navbar-toggle{border-color:#333}.navbar-inverse .navbar-toggle:focus,.navbar-inverse .navbar-toggle:hover{background-color:#333}.navbar-inverse .navbar-toggle .icon-bar{background-color:#fff}.navbar-inverse .navbar-collapse,.navbar-inverse .navbar-form{border-color:#101010}.navbar-inverse .navbar-nav>.open>a,.navbar-inverse .navbar-nav>.open>a:focus,.navbar-inverse .navbar-nav>.open>a:hover{color:#fff;background-color:#080808}@media (max-width:767px){.navbar-inverse .navbar-nav .open .dropdown-menu>.dropdown-header{border-color:#080808}.navbar-inverse .navbar-nav .open .dropdown-menu .divider{background-color:#080808}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a{color:#9d9d9d}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:hover{color:#fff;background-color:transparent}.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:hover{color:#fff;background-color:#080808}.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:hover{color:#444;background-color:transparent}}.navbar-inverse .navbar-link{color:#9d9d9d}.navbar-inverse .navbar-link:hover{color:#fff}.navbar-inverse .btn-link{color:#9d9d9d}.navbar-inverse .btn-link:focus,.navbar-inverse .btn-link:hover{color:#fff}.navbar-inverse .btn-link[disabled]:focus,.navbar-inverse .btn-link[disabled]:hover,fieldset[disabled] .navbar-inverse .btn-link:focus,fieldset[disabled] .navbar-inverse .btn-link:hover{color:#444}.breadcrumb{padding:8px 15px;margin-bottom:20px;list-style:none;background-color:#f5f5f5;border-radius:4px}.breadcrumb>li{display:inline-block}.breadcrumb>li+li:before{padding:0 5px;color:#ccc;content:\"/\\A0\"}.breadcrumb>.active{color:#777}.pagination{display:inline-block;padding-left:0;margin:20px 0;border-radius:4px}.pagination>li{display:inline}.pagination>li>a,.pagination>li>span{position:relative;float:left;padding:6px 12px;margin-left:-1px;line-height:1.42857143;color:#337ab7;text-decoration:none;background-color:#fff;border:1px solid #ddd}.pagination>li:first-child>a,.pagination>li:first-child>span{margin-left:0;border-top-left-radius:4px;border-bottom-left-radius:4px}.pagination>li:last-child>a,.pagination>li:last-child>span{border-top-right-radius:4px;border-bottom-right-radius:4px}.pagination>li>a:focus,.pagination>li>a:hover,.pagination>li>span:focus,.pagination>li>span:hover{z-index:3;color:#23527c;background-color:#eee;border-color:#ddd}.pagination>.active>a,.pagination>.active>a:focus,.pagination>.active>a:hover,.pagination>.active>span,.pagination>.active>span:focus,.pagination>.active>span:hover{z-index:2;color:#fff;cursor:default;background-color:#337ab7;border-color:#337ab7}.pagination>.disabled>a,.pagination>.disabled>a:focus,.pagination>.disabled>a:hover,.pagination>.disabled>span,.pagination>.disabled>span:focus,.pagination>.disabled>span:hover{color:#777;cursor:not-allowed;background-color:#fff;border-color:#ddd}.pagination-lg>li>a,.pagination-lg>li>span{padding:10px 16px;font-size:18px;line-height:1.3333333}.pagination-lg>li:first-child>a,.pagination-lg>li:first-child>span{border-top-left-radius:6px;border-bottom-left-radius:6px}.pagination-lg>li:last-child>a,.pagination-lg>li:last-child>span{border-top-right-radius:6px;border-bottom-right-radius:6px}.pagination-sm>li>a,.pagination-sm>li>span{padding:5px 10px;font-size:12px;line-height:1.5}.pagination-sm>li:first-child>a,.pagination-sm>li:first-child>span{border-top-left-radius:3px;border-bottom-left-radius:3px}.pagination-sm>li:last-child>a,.pagination-sm>li:last-child>span{border-top-right-radius:3px;border-bottom-right-radius:3px}.pager{padding-left:0;margin:20px 0;text-align:center;list-style:none}.pager li{display:inline}.pager li>a,.pager li>span{display:inline-block;padding:5px 14px;background-color:#fff;border:1px solid #ddd;border-radius:15px}.pager li>a:focus,.pager li>a:hover{text-decoration:none;background-color:#eee}.pager .next>a,.pager .next>span{float:right}.pager .previous>a,.pager .previous>span{float:left}.pager .disabled>a,.pager .disabled>a:focus,.pager .disabled>a:hover,.pager .disabled>span{color:#777;cursor:not-allowed;background-color:#fff}.label{display:inline;padding:.2em .6em .3em;font-size:75%;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em}a.label:focus,a.label:hover{color:#fff;text-decoration:none;cursor:pointer}.label:empty{display:none}.btn .label{position:relative;top:-1px}.label-default{background-color:#777}.label-default[href]:focus,.label-default[href]:hover{background-color:#5e5e5e}.label-primary{background-color:#337ab7}.label-primary[href]:focus,.label-primary[href]:hover{background-color:#286090}.label-success{background-color:#5cb85c}.label-success[href]:focus,.label-success[href]:hover{background-color:#449d44}.label-info{background-color:#5bc0de}.label-info[href]:focus,.label-info[href]:hover{background-color:#31b0d5}.label-warning{background-color:#f0ad4e}.label-warning[href]:focus,.label-warning[href]:hover{background-color:#ec971f}.label-danger{background-color:#d9534f}.label-danger[href]:focus,.label-danger[href]:hover{background-color:#c9302c}.badge{display:inline-block;min-width:10px;padding:3px 7px;font-size:12px;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:middle;background-color:#777;border-radius:10px}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.btn-group-xs>.btn .badge,.btn-xs .badge{top:0;padding:1px 5px}a.badge:focus,a.badge:hover{color:#fff;text-decoration:none;cursor:pointer}.list-group-item.active>.badge,.nav-pills>.active>a>.badge{color:#337ab7;background-color:#fff}.list-group-item>.badge{float:right}.list-group-item>.badge+.badge{margin-right:5px}.nav-pills>li>a>.badge{margin-left:3px}.jumbotron{padding-top:30px;padding-bottom:30px;margin-bottom:30px;color:inherit;background-color:#eee}.jumbotron .h1,.jumbotron h1{color:inherit}.jumbotron p{margin-bottom:15px;font-size:21px;font-weight:200}.jumbotron>hr{border-top-color:#d5d5d5}.container .jumbotron,.container-fluid .jumbotron{border-radius:6px}.jumbotron .container{max-width:100%}@media screen and (min-width:768px){.jumbotron{padding-top:48px;padding-bottom:48px}.container .jumbotron,.container-fluid .jumbotron{padding-right:60px;padding-left:60px}.jumbotron .h1,.jumbotron h1{font-size:63px}}.thumbnail{display:block;padding:4px;margin-bottom:20px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:4px;-webkit-transition:border .2s ease-in-out;-o-transition:border .2s ease-in-out;transition:border .2s ease-in-out}.thumbnail a>img,.thumbnail>img{margin-right:auto;margin-left:auto}a.thumbnail.active,a.thumbnail:focus,a.thumbnail:hover{border-color:#337ab7}.thumbnail .caption{padding:9px;color:#333}.alert{padding:15px;margin-bottom:20px;border:1px solid transparent;border-radius:4px}.alert h4{margin-top:0;color:inherit}.alert .alert-link{font-weight:700}.alert>p,.alert>ul{margin-bottom:0}.alert>p+p{margin-top:5px}.alert-dismissable,.alert-dismissible{padding-right:35px}.alert-dismissable .close,.alert-dismissible .close{position:relative;top:-2px;right:-21px;color:inherit}.alert-success{color:#3c763d;background-color:#dff0d8;border-color:#d6e9c6}.alert-success hr{border-top-color:#c9e2b3}.alert-success .alert-link{color:#2b542c}.alert-info{color:#31708f;background-color:#d9edf7;border-color:#bce8f1}.alert-info hr{border-top-color:#a6e1ec}.alert-info .alert-link{color:#245269}.alert-warning{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc}.alert-warning hr{border-top-color:#f7e1b5}.alert-warning .alert-link{color:#66512c}.alert-danger{color:#a94442;background-color:#f2dede;border-color:#ebccd1}.alert-danger hr{border-top-color:#e4b9c0}.alert-danger .alert-link{color:#843534}@-webkit-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@-o-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}.progress{height:20px;margin-bottom:20px;overflow:hidden;background-color:#f5f5f5;border-radius:4px;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.1);box-shadow:inset 0 1px 2px rgba(0,0,0,.1)}.progress-bar{float:left;width:0;height:100%;font-size:12px;line-height:20px;color:#fff;text-align:center;background-color:#337ab7;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);-webkit-transition:width .6s ease;-o-transition:width .6s ease;transition:width .6s ease}.progress-bar-striped,.progress-striped .progress-bar{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);-webkit-background-size:40px 40px;background-size:40px 40px}.progress-bar.active,.progress.active .progress-bar{-webkit-animation:progress-bar-stripes 2s linear infinite;-o-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}.progress-bar-success{background-color:#5cb85c}.progress-striped .progress-bar-success{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-info{background-color:#5bc0de}.progress-striped .progress-bar-info{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-warning{background-color:#f0ad4e}.progress-striped .progress-bar-warning{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-danger{background-color:#d9534f}.progress-striped .progress-bar-danger{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.media{margin-top:15px}.media:first-child{margin-top:0}.media,.media-body{overflow:hidden;zoom:1}.media-body{width:10000px}.media-object{display:block}.media-object.img-thumbnail{max-width:none}.media-right,.media>.pull-right{padding-left:10px}.media-left,.media>.pull-left{padding-right:10px}.media-body,.media-left,.media-right{display:table-cell;vertical-align:top}.media-middle{vertical-align:middle}.media-bottom{vertical-align:bottom}.media-heading{margin-top:0;margin-bottom:5px}.media-list{padding-left:0;list-style:none}.list-group{padding-left:0;margin-bottom:20px}.list-group-item{position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#fff;border:1px solid #ddd}.list-group-item:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.list-group-item:last-child{margin-bottom:0;border-bottom-right-radius:4px;border-bottom-left-radius:4px}a.list-group-item,button.list-group-item{color:#555}a.list-group-item .list-group-item-heading,button.list-group-item .list-group-item-heading{color:#333}a.list-group-item:focus,a.list-group-item:hover,button.list-group-item:focus,button.list-group-item:hover{color:#555;text-decoration:none;background-color:#f5f5f5}button.list-group-item{width:100%;text-align:left}.list-group-item.disabled,.list-group-item.disabled:focus,.list-group-item.disabled:hover{color:#777;cursor:not-allowed;background-color:#eee}.list-group-item.disabled .list-group-item-heading,.list-group-item.disabled:focus .list-group-item-heading,.list-group-item.disabled:hover .list-group-item-heading{color:inherit}.list-group-item.disabled .list-group-item-text,.list-group-item.disabled:focus .list-group-item-text,.list-group-item.disabled:hover .list-group-item-text{color:#777}.list-group-item.active,.list-group-item.active:focus,.list-group-item.active:hover{z-index:2;color:#fff;background-color:#337ab7;border-color:#337ab7}.list-group-item.active .list-group-item-heading,.list-group-item.active .list-group-item-heading>.small,.list-group-item.active .list-group-item-heading>small,.list-group-item.active:focus .list-group-item-heading,.list-group-item.active:focus .list-group-item-heading>.small,.list-group-item.active:focus .list-group-item-heading>small,.list-group-item.active:hover .list-group-item-heading,.list-group-item.active:hover .list-group-item-heading>.small,.list-group-item.active:hover .list-group-item-heading>small{color:inherit}.list-group-item.active .list-group-item-text,.list-group-item.active:focus .list-group-item-text,.list-group-item.active:hover .list-group-item-text{color:#c7ddef}.list-group-item-success{color:#3c763d;background-color:#dff0d8}a.list-group-item-success,button.list-group-item-success{color:#3c763d}a.list-group-item-success .list-group-item-heading,button.list-group-item-success .list-group-item-heading{color:inherit}a.list-group-item-success:focus,a.list-group-item-success:hover,button.list-group-item-success:focus,button.list-group-item-success:hover{color:#3c763d;background-color:#d0e9c6}a.list-group-item-success.active,a.list-group-item-success.active:focus,a.list-group-item-success.active:hover,button.list-group-item-success.active,button.list-group-item-success.active:focus,button.list-group-item-success.active:hover{color:#fff;background-color:#3c763d;border-color:#3c763d}.list-group-item-info{color:#31708f;background-color:#d9edf7}a.list-group-item-info,button.list-group-item-info{color:#31708f}a.list-group-item-info .list-group-item-heading,button.list-group-item-info .list-group-item-heading{color:inherit}a.list-group-item-info:focus,a.list-group-item-info:hover,button.list-group-item-info:focus,button.list-group-item-info:hover{color:#31708f;background-color:#c4e3f3}a.list-group-item-info.active,a.list-group-item-info.active:focus,a.list-group-item-info.active:hover,button.list-group-item-info.active,button.list-group-item-info.active:focus,button.list-group-item-info.active:hover{color:#fff;background-color:#31708f;border-color:#31708f}.list-group-item-warning{color:#8a6d3b;background-color:#fcf8e3}a.list-group-item-warning,button.list-group-item-warning{color:#8a6d3b}a.list-group-item-warning .list-group-item-heading,button.list-group-item-warning .list-group-item-heading{color:inherit}a.list-group-item-warning:focus,a.list-group-item-warning:hover,button.list-group-item-warning:focus,button.list-group-item-warning:hover{color:#8a6d3b;background-color:#faf2cc}a.list-group-item-warning.active,a.list-group-item-warning.active:focus,a.list-group-item-warning.active:hover,button.list-group-item-warning.active,button.list-group-item-warning.active:focus,button.list-group-item-warning.active:hover{color:#fff;background-color:#8a6d3b;border-color:#8a6d3b}.list-group-item-danger{color:#a94442;background-color:#f2dede}a.list-group-item-danger,button.list-group-item-danger{color:#a94442}a.list-group-item-danger .list-group-item-heading,button.list-group-item-danger .list-group-item-heading{color:inherit}a.list-group-item-danger:focus,a.list-group-item-danger:hover,button.list-group-item-danger:focus,button.list-group-item-danger:hover{color:#a94442;background-color:#ebcccc}a.list-group-item-danger.active,a.list-group-item-danger.active:focus,a.list-group-item-danger.active:hover,button.list-group-item-danger.active,button.list-group-item-danger.active:focus,button.list-group-item-danger.active:hover{color:#fff;background-color:#a94442;border-color:#a94442}.list-group-item-heading{margin-top:0;margin-bottom:5px}.list-group-item-text{margin-bottom:0;line-height:1.3}.panel{margin-bottom:20px;background-color:#fff;border:1px solid transparent;border-radius:4px;-webkit-box-shadow:0 1px 1px rgba(0,0,0,.05);box-shadow:0 1px 1px rgba(0,0,0,.05)}.panel-body{padding:15px}.panel-heading{padding:10px 15px;border-bottom:1px solid transparent;border-top-left-radius:3px;border-top-right-radius:3px}.panel-heading>.dropdown .dropdown-toggle{color:inherit}.panel-title{margin-top:0;margin-bottom:0;font-size:16px;color:inherit}.panel-title>.small,.panel-title>.small>a,.panel-title>a,.panel-title>small,.panel-title>small>a{color:inherit}.panel-footer{padding:10px 15px;background-color:#f5f5f5;border-top:1px solid #ddd;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.list-group,.panel>.panel-collapse>.list-group{margin-bottom:0}.panel>.list-group .list-group-item,.panel>.panel-collapse>.list-group .list-group-item{border-width:1px 0;border-radius:0}.panel>.list-group:first-child .list-group-item:first-child,.panel>.panel-collapse>.list-group:first-child .list-group-item:first-child{border-top:0;border-top-left-radius:3px;border-top-right-radius:3px}.panel>.list-group:last-child .list-group-item:last-child,.panel>.panel-collapse>.list-group:last-child .list-group-item:last-child{border-bottom:0;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.panel-heading+.panel-collapse>.list-group .list-group-item:first-child{border-top-left-radius:0;border-top-right-radius:0}.panel-heading+.list-group .list-group-item:first-child{border-top-width:0}.list-group+.panel-footer{border-top-width:0}.panel>.panel-collapse>.table,.panel>.table,.panel>.table-responsive>.table{margin-bottom:0}.panel>.panel-collapse>.table caption,.panel>.table caption,.panel>.table-responsive>.table caption{padding-right:15px;padding-left:15px}.panel>.table-responsive:first-child>.table:first-child,.panel>.table:first-child{border-top-left-radius:3px;border-top-right-radius:3px}.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child,.panel>.table:first-child>thead:first-child>tr:first-child{border-top-left-radius:3px;border-top-right-radius:3px}.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:first-child,.panel>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table:first-child>thead:first-child>tr:first-child th:first-child{border-top-left-radius:3px}.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:last-child,.panel>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table:first-child>thead:first-child>tr:first-child th:last-child{border-top-right-radius:3px}.panel>.table-responsive:last-child>.table:last-child,.panel>.table:last-child{border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child{border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:first-child,.panel>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:first-child{border-bottom-left-radius:3px}.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:last-child{border-bottom-right-radius:3px}.panel>.panel-body+.table,.panel>.panel-body+.table-responsive,.panel>.table+.panel-body,.panel>.table-responsive+.panel-body{border-top:1px solid #ddd}.panel>.table>tbody:first-child>tr:first-child td,.panel>.table>tbody:first-child>tr:first-child th{border-top:0}.panel>.table-bordered,.panel>.table-responsive>.table-bordered{border:0}.panel>.table-bordered>tbody>tr>td:first-child,.panel>.table-bordered>tbody>tr>th:first-child,.panel>.table-bordered>tfoot>tr>td:first-child,.panel>.table-bordered>tfoot>tr>th:first-child,.panel>.table-bordered>thead>tr>td:first-child,.panel>.table-bordered>thead>tr>th:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:first-child,.panel>.table-responsive>.table-bordered>thead>tr>td:first-child,.panel>.table-responsive>.table-bordered>thead>tr>th:first-child{border-left:0}.panel>.table-bordered>tbody>tr>td:last-child,.panel>.table-bordered>tbody>tr>th:last-child,.panel>.table-bordered>tfoot>tr>td:last-child,.panel>.table-bordered>tfoot>tr>th:last-child,.panel>.table-bordered>thead>tr>td:last-child,.panel>.table-bordered>thead>tr>th:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:last-child,.panel>.table-responsive>.table-bordered>thead>tr>td:last-child,.panel>.table-responsive>.table-bordered>thead>tr>th:last-child{border-right:0}.panel>.table-bordered>tbody>tr:first-child>td,.panel>.table-bordered>tbody>tr:first-child>th,.panel>.table-bordered>thead>tr:first-child>td,.panel>.table-bordered>thead>tr:first-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>th,.panel>.table-responsive>.table-bordered>thead>tr:first-child>td,.panel>.table-responsive>.table-bordered>thead>tr:first-child>th{border-bottom:0}.panel>.table-bordered>tbody>tr:last-child>td,.panel>.table-bordered>tbody>tr:last-child>th,.panel>.table-bordered>tfoot>tr:last-child>td,.panel>.table-bordered>tfoot>tr:last-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>th,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>td,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>th{border-bottom:0}.panel>.table-responsive{margin-bottom:0;border:0}.panel-group{margin-bottom:20px}.panel-group .panel{margin-bottom:0;border-radius:4px}.panel-group .panel+.panel{margin-top:5px}.panel-group .panel-heading{border-bottom:0}.panel-group .panel-heading+.panel-collapse>.list-group,.panel-group .panel-heading+.panel-collapse>.panel-body{border-top:1px solid #ddd}.panel-group .panel-footer{border-top:0}.panel-group .panel-footer+.panel-collapse .panel-body{border-bottom:1px solid #ddd}.panel-default{border-color:#ddd}.panel-default>.panel-heading{color:#333;background-color:#f5f5f5;border-color:#ddd}.panel-default>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ddd}.panel-default>.panel-heading .badge{color:#f5f5f5;background-color:#333}.panel-default>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ddd}.panel-primary{border-color:#337ab7}.panel-primary>.panel-heading{color:#fff;background-color:#337ab7;border-color:#337ab7}.panel-primary>.panel-heading+.panel-collapse>.panel-body{border-top-color:#337ab7}.panel-primary>.panel-heading .badge{color:#337ab7;background-color:#fff}.panel-primary>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#337ab7}.panel-success{border-color:#d6e9c6}.panel-success>.panel-heading{color:#3c763d;background-color:#dff0d8;border-color:#d6e9c6}.panel-success>.panel-heading+.panel-collapse>.panel-body{border-top-color:#d6e9c6}.panel-success>.panel-heading .badge{color:#dff0d8;background-color:#3c763d}.panel-success>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#d6e9c6}.panel-info{border-color:#bce8f1}.panel-info>.panel-heading{color:#31708f;background-color:#d9edf7;border-color:#bce8f1}.panel-info>.panel-heading+.panel-collapse>.panel-body{border-top-color:#bce8f1}.panel-info>.panel-heading .badge{color:#d9edf7;background-color:#31708f}.panel-info>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#bce8f1}.panel-warning{border-color:#faebcc}.panel-warning>.panel-heading{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc}.panel-warning>.panel-heading+.panel-collapse>.panel-body{border-top-color:#faebcc}.panel-warning>.panel-heading .badge{color:#fcf8e3;background-color:#8a6d3b}.panel-warning>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#faebcc}.panel-danger{border-color:#ebccd1}.panel-danger>.panel-heading{color:#a94442;background-color:#f2dede;border-color:#ebccd1}.panel-danger>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ebccd1}.panel-danger>.panel-heading .badge{color:#f2dede;background-color:#a94442}.panel-danger>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ebccd1}.embed-responsive{position:relative;display:block;height:0;padding:0;overflow:hidden}.embed-responsive .embed-responsive-item,.embed-responsive embed,.embed-responsive iframe,.embed-responsive object,.embed-responsive video{position:absolute;top:0;bottom:0;left:0;width:100%;height:100%;border:0}.embed-responsive-16by9{padding-bottom:56.25%}.embed-responsive-4by3{padding-bottom:75%}.well{min-height:20px;padding:19px;margin-bottom:20px;background-color:#f5f5f5;border:1px solid #e3e3e3;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.05);box-shadow:inset 0 1px 1px rgba(0,0,0,.05)}.well blockquote{border-color:#ddd;border-color:rgba(0,0,0,.15)}.well-lg{padding:24px;border-radius:6px}.well-sm{padding:9px;border-radius:3px}.close{float:right;font-size:21px;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.2}.close:focus,.close:hover{color:#000;text-decoration:none;cursor:pointer;filter:alpha(opacity=50);opacity:.5}button.close{-webkit-appearance:none;padding:0;cursor:pointer;background:0 0;border:0}.modal-open{overflow:hidden}.modal{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;display:none;overflow:hidden;-webkit-overflow-scrolling:touch;outline:0}.modal.fade .modal-dialog{-webkit-transition:-webkit-transform .3s ease-out;-o-transition:-o-transform .3s ease-out;transition:transform .3s ease-out;-webkit-transform:translate(0,-25%);-ms-transform:translate(0,-25%);-o-transform:translate(0,-25%);transform:translate(0,-25%)}.modal.in .modal-dialog{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);-o-transform:translate(0,0);transform:translate(0,0)}.modal-open .modal{overflow-x:hidden;overflow-y:auto}.modal-dialog{position:relative;width:auto;margin:10px}.modal-content{position:relative;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #999;border:1px solid rgba(0,0,0,.2);border-radius:6px;outline:0;-webkit-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5)}.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000}.modal-backdrop.fade{filter:alpha(opacity=0);opacity:0}.modal-backdrop.in{filter:alpha(opacity=50);opacity:.5}.modal-header{min-height:16.43px;padding:15px;border-bottom:1px solid #e5e5e5}.modal-header .close{margin-top:-2px}.modal-title{margin:0;line-height:1.42857143}.modal-body{position:relative;padding:15px}.modal-footer{padding:15px;text-align:right;border-top:1px solid #e5e5e5}.modal-footer .btn+.btn{margin-bottom:0;margin-left:5px}.modal-footer .btn-group .btn+.btn{margin-left:-1px}.modal-footer .btn-block+.btn-block{margin-left:0}.modal-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}@media (min-width:768px){.modal-dialog{width:600px;margin:30px auto}.modal-content{-webkit-box-shadow:0 5px 15px rgba(0,0,0,.5);box-shadow:0 5px 15px rgba(0,0,0,.5)}.modal-sm{width:300px}}@media (min-width:992px){.modal-lg{width:900px}}.tooltip{position:absolute;z-index:1070;display:block;font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:12px;font-style:normal;font-weight:400;line-height:1.42857143;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;letter-spacing:normal;word-break:normal;word-spacing:normal;word-wrap:normal;white-space:normal;filter:alpha(opacity=0);opacity:0;line-break:auto}.tooltip.in{filter:alpha(opacity=90);opacity:.9}.tooltip.top{padding:5px 0;margin-top:-3px}.tooltip.right{padding:0 5px;margin-left:3px}.tooltip.bottom{padding:5px 0;margin-top:3px}.tooltip.left{padding:0 5px;margin-left:-3px}.tooltip-inner{max-width:200px;padding:3px 8px;color:#fff;text-align:center;background-color:#000;border-radius:4px}.tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.tooltip.top .tooltip-arrow{bottom:0;left:50%;margin-left:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.top-left .tooltip-arrow{right:5px;bottom:0;margin-bottom:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.top-right .tooltip-arrow{bottom:0;left:5px;margin-bottom:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.right .tooltip-arrow{top:50%;left:0;margin-top:-5px;border-width:5px 5px 5px 0;border-right-color:#000}.tooltip.left .tooltip-arrow{top:50%;right:0;margin-top:-5px;border-width:5px 0 5px 5px;border-left-color:#000}.tooltip.bottom .tooltip-arrow{top:0;left:50%;margin-left:-5px;border-width:0 5px 5px;border-bottom-color:#000}.tooltip.bottom-left .tooltip-arrow{top:0;right:5px;margin-top:-5px;border-width:0 5px 5px;border-bottom-color:#000}.tooltip.bottom-right .tooltip-arrow{top:0;left:5px;margin-top:-5px;border-width:0 5px 5px;border-bottom-color:#000}.popover{position:absolute;top:0;left:0;z-index:1060;display:none;max-width:276px;padding:1px;font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:14px;font-style:normal;font-weight:400;line-height:1.42857143;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;letter-spacing:normal;word-break:normal;word-spacing:normal;word-wrap:normal;white-space:normal;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #ccc;border:1px solid rgba(0,0,0,.2);border-radius:6px;-webkit-box-shadow:0 5px 10px rgba(0,0,0,.2);box-shadow:0 5px 10px rgba(0,0,0,.2);line-break:auto}.popover.top{margin-top:-10px}.popover.right{margin-left:10px}.popover.bottom{margin-top:10px}.popover.left{margin-left:-10px}.popover-title{padding:8px 14px;margin:0;font-size:14px;background-color:#f7f7f7;border-bottom:1px solid #ebebeb;border-radius:5px 5px 0 0}.popover-content{padding:9px 14px}.popover>.arrow,.popover>.arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.popover>.arrow{border-width:11px}.popover>.arrow:after{content:\"\";border-width:10px}.popover.top>.arrow{bottom:-11px;left:50%;margin-left:-11px;border-top-color:#999;border-top-color:rgba(0,0,0,.25);border-bottom-width:0}.popover.top>.arrow:after{bottom:1px;margin-left:-10px;content:\" \";border-top-color:#fff;border-bottom-width:0}.popover.right>.arrow{top:50%;left:-11px;margin-top:-11px;border-right-color:#999;border-right-color:rgba(0,0,0,.25);border-left-width:0}.popover.right>.arrow:after{bottom:-10px;left:1px;content:\" \";border-right-color:#fff;border-left-width:0}.popover.bottom>.arrow{top:-11px;left:50%;margin-left:-11px;border-top-width:0;border-bottom-color:#999;border-bottom-color:rgba(0,0,0,.25)}.popover.bottom>.arrow:after{top:1px;margin-left:-10px;content:\" \";border-top-width:0;border-bottom-color:#fff}.popover.left>.arrow{top:50%;right:-11px;margin-top:-11px;border-right-width:0;border-left-color:#999;border-left-color:rgba(0,0,0,.25)}.popover.left>.arrow:after{right:1px;bottom:-10px;content:\" \";border-right-width:0;border-left-color:#fff}.carousel{position:relative}.carousel-inner{position:relative;width:100%;overflow:hidden}.carousel-inner>.item{position:relative;display:none;-webkit-transition:.6s ease-in-out left;-o-transition:.6s ease-in-out left;transition:.6s ease-in-out left}.carousel-inner>.item>a>img,.carousel-inner>.item>img{line-height:1}@media all and (transform-3d),(-webkit-transform-3d){.carousel-inner>.item{-webkit-transition:-webkit-transform .6s ease-in-out;-o-transition:-o-transform .6s ease-in-out;transition:transform .6s ease-in-out;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000px;perspective:1000px}.carousel-inner>.item.active.right,.carousel-inner>.item.next{left:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.carousel-inner>.item.active.left,.carousel-inner>.item.prev{left:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.carousel-inner>.item.active,.carousel-inner>.item.next.left,.carousel-inner>.item.prev.right{left:0;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.carousel-inner>.active,.carousel-inner>.next,.carousel-inner>.prev{display:block}.carousel-inner>.active{left:0}.carousel-inner>.next,.carousel-inner>.prev{position:absolute;top:0;width:100%}.carousel-inner>.next{left:100%}.carousel-inner>.prev{left:-100%}.carousel-inner>.next.left,.carousel-inner>.prev.right{left:0}.carousel-inner>.active.left{left:-100%}.carousel-inner>.active.right{left:100%}.carousel-control{position:absolute;top:0;bottom:0;left:0;width:15%;font-size:20px;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.6);filter:alpha(opacity=50);opacity:.5}.carousel-control.left{background-image:-webkit-linear-gradient(left,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);background-image:-o-linear-gradient(left,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,.0001)));background-image:linear-gradient(to right,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);background-repeat:repeat-x}.carousel-control.right{right:0;left:auto;background-image:-webkit-linear-gradient(left,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);background-image:-o-linear-gradient(left,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.0001)),to(rgba(0,0,0,.5)));background-image:linear-gradient(to right,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);background-repeat:repeat-x}.carousel-control:focus,.carousel-control:hover{color:#fff;text-decoration:none;filter:alpha(opacity=90);outline:0;opacity:.9}.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next,.carousel-control .icon-prev{position:absolute;top:50%;z-index:5;display:inline-block;margin-top:-10px}.carousel-control .glyphicon-chevron-left,.carousel-control .icon-prev{left:50%;margin-left:-10px}.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next{right:50%;margin-right:-10px}.carousel-control .icon-next,.carousel-control .icon-prev{width:20px;height:20px;font-family:serif;line-height:1}.carousel-control .icon-prev:before{content:'\\2039'}.carousel-control .icon-next:before{content:'\\203A'}.carousel-indicators{position:absolute;bottom:10px;left:50%;z-index:15;width:60%;padding-left:0;margin-left:-30%;text-align:center;list-style:none}.carousel-indicators li{display:inline-block;width:10px;height:10px;margin:1px;text-indent:-999px;cursor:pointer;background-color:#000\\9;background-color:rgba(0,0,0,0);border:1px solid #fff;border-radius:10px}.carousel-indicators .active{width:12px;height:12px;margin:0;background-color:#fff}.carousel-caption{position:absolute;right:15%;bottom:20px;left:15%;z-index:10;padding-top:20px;padding-bottom:20px;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.6)}.carousel-caption .btn{text-shadow:none}@media screen and (min-width:768px){.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next,.carousel-control .icon-prev{width:30px;height:30px;margin-top:-15px;font-size:30px}.carousel-control .glyphicon-chevron-left,.carousel-control .icon-prev{margin-left:-15px}.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next{margin-right:-15px}.carousel-caption{right:20%;left:20%;padding-bottom:30px}.carousel-indicators{bottom:20px}}.btn-group-vertical>.btn-group:after,.btn-group-vertical>.btn-group:before,.btn-toolbar:after,.btn-toolbar:before,.clearfix:after,.clearfix:before,.container-fluid:after,.container-fluid:before,.container:after,.container:before,.dl-horizontal dd:after,.dl-horizontal dd:before,.form-horizontal .form-group:after,.form-horizontal .form-group:before,.modal-footer:after,.modal-footer:before,.nav:after,.nav:before,.navbar-collapse:after,.navbar-collapse:before,.navbar-header:after,.navbar-header:before,.navbar:after,.navbar:before,.pager:after,.pager:before,.panel-body:after,.panel-body:before,.row:after,.row:before{display:table;content:\" \"}.btn-group-vertical>.btn-group:after,.btn-toolbar:after,.clearfix:after,.container-fluid:after,.container:after,.dl-horizontal dd:after,.form-horizontal .form-group:after,.modal-footer:after,.nav:after,.navbar-collapse:after,.navbar-header:after,.navbar:after,.pager:after,.panel-body:after,.row:after{clear:both}.center-block{display:block;margin-right:auto;margin-left:auto}.pull-right{float:right!important}.pull-left{float:left!important}.hide{display:none!important}.show{display:block!important}.invisible{visibility:hidden}.text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.hidden{display:none!important}.affix{position:fixed}@-ms-viewport{width:device-width}.visible-lg,.visible-md,.visible-sm,.visible-xs{display:none!important}.visible-lg-block,.visible-lg-inline,.visible-lg-inline-block,.visible-md-block,.visible-md-inline,.visible-md-inline-block,.visible-sm-block,.visible-sm-inline,.visible-sm-inline-block,.visible-xs-block,.visible-xs-inline,.visible-xs-inline-block{display:none!important}@media (max-width:767px){.visible-xs{display:block!important}table.visible-xs{display:table!important}tr.visible-xs{display:table-row!important}td.visible-xs,th.visible-xs{display:table-cell!important}}@media (max-width:767px){.visible-xs-block{display:block!important}}@media (max-width:767px){.visible-xs-inline{display:inline!important}}@media (max-width:767px){.visible-xs-inline-block{display:inline-block!important}}@media (min-width:768px) and (max-width:991px){.visible-sm{display:block!important}table.visible-sm{display:table!important}tr.visible-sm{display:table-row!important}td.visible-sm,th.visible-sm{display:table-cell!important}}@media (min-width:768px) and (max-width:991px){.visible-sm-block{display:block!important}}@media (min-width:768px) and (max-width:991px){.visible-sm-inline{display:inline!important}}@media (min-width:768px) and (max-width:991px){.visible-sm-inline-block{display:inline-block!important}}@media (min-width:992px) and (max-width:1199px){.visible-md{display:block!important}table.visible-md{display:table!important}tr.visible-md{display:table-row!important}td.visible-md,th.visible-md{display:table-cell!important}}@media (min-width:992px) and (max-width:1199px){.visible-md-block{display:block!important}}@media (min-width:992px) and (max-width:1199px){.visible-md-inline{display:inline!important}}@media (min-width:992px) and (max-width:1199px){.visible-md-inline-block{display:inline-block!important}}@media (min-width:1200px){.visible-lg{display:block!important}table.visible-lg{display:table!important}tr.visible-lg{display:table-row!important}td.visible-lg,th.visible-lg{display:table-cell!important}}@media (min-width:1200px){.visible-lg-block{display:block!important}}@media (min-width:1200px){.visible-lg-inline{display:inline!important}}@media (min-width:1200px){.visible-lg-inline-block{display:inline-block!important}}@media (max-width:767px){.hidden-xs{display:none!important}}@media (min-width:768px) and (max-width:991px){.hidden-sm{display:none!important}}@media (min-width:992px) and (max-width:1199px){.hidden-md{display:none!important}}@media (min-width:1200px){.hidden-lg{display:none!important}}.visible-print{display:none!important}@media print{.visible-print{display:block!important}table.visible-print{display:table!important}tr.visible-print{display:table-row!important}td.visible-print,th.visible-print{display:table-cell!important}}.visible-print-block{display:none!important}@media print{.visible-print-block{display:block!important}}.visible-print-inline{display:none!important}@media print{.visible-print-inline{display:inline!important}}.visible-print-inline-block{display:none!important}@media print{.visible-print-inline-block{display:inline-block!important}}@media print{.hidden-print{display:none!important}}", ""]);

	// exports


/***/ },
/* 70 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f4769f9bdb7466be65088239c12046d1.eot"

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "448c34a56d699c29117adc64c43affeb.woff2"

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fa2772327f55d8198301fdb8bcfc8158.woff"

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "e18bbf611f2a2e43afc071aa2f4e1512.ttf"

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "89889688147bd7575d6327160d64e760.svg"

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(78);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(76)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./app.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./app.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(70)();
	// imports


	// module
	exports.push([module.id, "#app {\n    padding: 2em;\n}\n\n#app input[type=text] {\n    margin-bottom: 1em\n}\n\n#app h1 {\n    margin-bottom: 0.5em;\n}\n\n.task:hover .remove-btn {\n    display: block;\n}\n\n.remove-btn {\n    display: none;\n    background: transparent;\n    border: 0;\n    color: darkred;\n}\n\n.completed {\n    color: silver;\n    text-decoration: line-through;\n}", ""]);

	// exports


/***/ }
/******/ ]);