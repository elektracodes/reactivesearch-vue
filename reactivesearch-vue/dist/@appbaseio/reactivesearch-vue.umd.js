(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
	typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
	(global = global || self, factory(global.ReactiveSearchVue = {}, global.Vue));
}(this, function (exports, Vue) { 'use strict';

	Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	function getCjsExportFromNamespace (n) {
		return n && n['default'] || n;
	}

	var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

	function symbolObservablePonyfill(root) {
	  var result;
	  var Symbol = root.Symbol;

	  if (typeof Symbol === 'function') {
	    if (Symbol.observable) {
	      result = Symbol.observable;
	    } else {
	      result = Symbol('observable');
	      Symbol.observable = result;
	    }
	  } else {
	    result = '@@observable';
	  }

	  return result;
	}

	var root;

	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global$1 !== 'undefined') {
	  root = global$1;
	} else if (typeof module !== 'undefined') {
	  root = module;
	} else {
	  root = Function('return this')();
	}

	var result = symbolObservablePonyfill(root);

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */

	var randomString = function randomString() {
	  return Math.random().toString(36).substring(7).split('').join('.');
	};

	var ActionTypes = {
	  INIT: "@@redux/INIT" + randomString(),
	  REPLACE: "@@redux/REPLACE" + randomString(),
	  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
	    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
	  }
	};
	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */

	function isPlainObject(obj) {
	  if (typeof obj !== 'object' || obj === null) return false;
	  var proto = obj;

	  while (Object.getPrototypeOf(proto) !== null) {
	    proto = Object.getPrototypeOf(proto);
	  }

	  return Object.getPrototypeOf(obj) === proto;
	}
	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [preloadedState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */


	function createStore(reducer, preloadedState, enhancer) {
	  var _ref2;

	  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
	    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function');
	  }

	  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = preloadedState;
	    preloadedState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, preloadedState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = preloadedState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }
	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */


	  function getState() {
	    if (isDispatching) {
	      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
	    }

	    return currentState;
	  }
	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */


	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected the listener to be a function.');
	    }

	    if (isDispatching) {
	      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
	    }

	    var isSubscribed = true;
	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);
	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      if (isDispatching) {
	        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
	      }

	      isSubscribed = false;
	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }
	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */


	  function dispatch(action) {
	    if (!isPlainObject(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;

	    for (var i = 0; i < listeners.length; i++) {
	      var listener = listeners[i];
	      listener();
	    }

	    return action;
	  }
	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */


	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({
	      type: ActionTypes.REPLACE
	    });
	  }
	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/tc39/proposal-observable
	   */


	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object' || observer === null) {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return {
	          unsubscribe: unsubscribe
	        };
	      }
	    }, _ref[result] = function () {
	      return this;
	    }, _ref;
	  } // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.


	  dispatch({
	    type: ActionTypes.INIT
	  });
	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[result] = observable, _ref2;
	}
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */


	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */


	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	  } catch (e) {} // eslint-disable-line no-empty

	}

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
	  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
	}

	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!isPlainObject(inputState)) {
	    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
	  });
	  unexpectedKeys.forEach(function (key) {
	    unexpectedKeyCache[key] = true;
	  });
	  if (action && action.type === ActionTypes.REPLACE) return;

	  if (unexpectedKeys.length > 0) {
	    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
	  }
	}

	function assertReducerShape(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, {
	      type: ActionTypes.INIT
	    });

	    if (typeof initialState === 'undefined') {
	      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
	    }

	    if (typeof reducer(undefined, {
	      type: ActionTypes.PROBE_UNKNOWN_ACTION()
	    }) === 'undefined') {
	      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
	    }
	  });
	}
	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */


	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};

	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];

	    {
	      if (typeof reducers[key] === 'undefined') {
	        warning("No reducer provided for key \"" + key + "\"");
	      }
	    }

	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }

	  var finalReducerKeys = Object.keys(finalReducers);
	  var unexpectedKeyCache;

	  {
	    unexpectedKeyCache = {};
	  }

	  var shapeAssertionError;

	  try {
	    assertReducerShape(finalReducers);
	  } catch (e) {
	    shapeAssertionError = e;
	  }

	  return function combination(state, action) {
	    if (state === void 0) {
	      state = {};
	    }

	    if (shapeAssertionError) {
	      throw shapeAssertionError;
	    }

	    {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

	      if (warningMessage) {
	        warning(warningMessage);
	      }
	    }

	    var hasChanged = false;
	    var nextState = {};

	    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
	      var _key = finalReducerKeys[_i];
	      var reducer = finalReducers[_key];
	      var previousStateForKey = state[_key];
	      var nextStateForKey = reducer(previousStateForKey, action);

	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(_key, action);
	        throw new Error(errorMessage);
	      }

	      nextState[_key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }

	    return hasChanged ? nextState : state;
	  };
	}

	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(this, arguments));
	  };
	}
	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */


	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];

	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }

	  return boundActionCreators;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
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

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */


	function compose() {
	  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  }

	  if (funcs.length === 1) {
	    return funcs[0];
	  }

	  return funcs.reduce(function (a, b) {
	    return function () {
	      return a(b.apply(void 0, arguments));
	    };
	  });
	}
	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */


	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function () {
	      var store = createStore.apply(void 0, arguments);

	      var _dispatch = function dispatch() {
	        throw new Error("Dispatching while constructing your middleware is not allowed. " + "Other middleware would not be applied to this dispatch.");
	      };

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch() {
	          return _dispatch.apply(void 0, arguments);
	        }
	      };
	      var chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = compose.apply(void 0, chain)(store.dispatch);
	      return _objectSpread({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}
	/*
	 * This is a dummy function to check if the function name has been altered by minification.
	 * If the function has been minified and NODE_ENV !== 'production', warn the user.
	 */


	function isCrushed() {}

	if ( typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
	}

	var redux = /*#__PURE__*/Object.freeze({
		__proto__: null,
		createStore: createStore,
		combineReducers: combineReducers,
		bindActionCreators: bindActionCreators,
		applyMiddleware: applyMiddleware,
		compose: compose,
		__DO_NOT_USE__ActionTypes: ActionTypes
	});

	function createThunkMiddleware(extraArgument) {
	  return function (_ref) {
	    var dispatch = _ref.dispatch,
	        getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        if (typeof action === 'function') {
	          return action(dispatch, getState, extraArgument);
	        }

	        return next(action);
	      };
	    };
	  };
	}

	var thunk = createThunkMiddleware();
	thunk.withExtraArgument = createThunkMiddleware;

	var constants = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  var ADD_COMPONENT = exports.ADD_COMPONENT = 'ADD_COMPONENT';
	  var REMOVE_COMPONENT = exports.REMOVE_COMPONENT = 'REMOVE_COMPONENT';
	  var WATCH_COMPONENT = exports.WATCH_COMPONENT = 'WATCH_COMPONENT';
	  var SET_QUERY = exports.SET_QUERY = 'SET_QUERY';
	  var SET_QUERY_OPTIONS = exports.SET_QUERY_OPTIONS = 'SET_QUERY_OPTIONS';
	  var EXECUTE_QUERY = exports.EXECUTE_QUERY = 'EXECUTE_QUERY';
	  var UPDATE_HITS = exports.UPDATE_HITS = 'UPDATE_HITS';
	  var UPDATE_AGGS = exports.UPDATE_AGGS = 'UPDATE_AGGS';
	  var ADD_CONFIG = exports.ADD_CONFIG = 'ADD_CONFIG';
	  var ADD_APPBASE_REF = exports.ADD_APPBASE_REF = 'ADD_APPBASE_REF';
	  var LOG_QUERY = exports.LOG_QUERY = 'LOG_QUERY';
	  var LOG_COMBINED_QUERY = exports.LOG_COMBINED_QUERY = 'LOG_COMBINED_QUERY';
	  var SET_VALUE = exports.SET_VALUE = 'SET_VALUE';
	  var PATCH_VALUE = exports.PATCH_VALUE = 'PATCH_VALUE';
	  var CLEAR_VALUES = exports.CLEAR_VALUES = 'CLEAR_VALUES';
	  var SET_LOADING = exports.SET_LOADING = 'SET_LOADING';
	  var SET_ERROR = exports.SET_ERROR = 'SET_ERROR';
	  var SET_STREAMING = exports.SET_STREAMING = 'SET_STREAMING';
	  var PUSH_TO_STREAM_HITS = exports.PUSH_TO_STREAM_HITS = 'PUSH_TO_STREAM_HITS';
	  var SET_TIMESTAMP = exports.SET_TIMESTAMP = 'SET_TIMESTAMP';
	  var SET_HEADERS = exports.SET_HEADERS = 'SET_HEADERS';
	  var SET_MAP_DATA = exports.SET_MAP_DATA = 'SET_MAP_DATA';
	  var SET_QUERY_LISTENER = exports.SET_QUERY_LISTENER = 'SET_QUERY_LISTENER';
	  var STORE_KEY = exports.STORE_KEY = '__REACTIVESEARCH__';
	  var SET_SEARCH_ID = exports.SET_SEARCH_ID = 'SET_SEARCH_ID';
	  var SET_PROMOTED_RESULTS = exports.SET_PROMOTED_RESULTS = 'SET_PROMOTED_RESULTS';
	  var SET_PROPS = exports.SET_PROPS = 'SET_PROPS';
	  var UPDATE_PROPS = exports.UPDATE_PROPS = 'UPDATE_PROPS';
	  var REMOVE_PROPS = exports.REMOVE_PROPS = 'REMOVE_PROPS';
	  var SET_MAP_ON_TOP_MARKER = exports.SET_MAP_ON_TOP_MARKER = 'SET_MAP_ON_TOP_MARKER';
	  var SET_MAP_OPEN_MARKERS = exports.SET_MAP_OPEN_MARKERS = 'SET_MAP_OPEN_MARKERS';
	  var SET_SUGGESTIONS_SEARCH_VALUE = exports.SET_SUGGESTIONS_SEARCH_VALUE = 'SET_SUGGESTIONS_SEARCH_VALUE';
	  var CLEAR_SUGGESTIONS_SEARCH_VALUE = exports.CLEAR_SUGGESTIONS_SEARCH_VALUE = 'CLEAR_SUGGESTIONS_SEARCH_VALUE';
	  var SET_SUGGESTIONS_SEARCH_ID = exports.SET_SUGGESTIONS_SEARCH_ID = 'SET_SUGGESTIONS_SEARCH_ID';
	  var UPDATE_ANALYTICS_CONFIG = exports.UPDATE_ANALYTICS_CONFIG = 'UPDATE_ANALYTICS_CONFIG';
	});
	unwrapExports(constants);
	var constants_1 = constants.ADD_COMPONENT;
	var constants_2 = constants.REMOVE_COMPONENT;
	var constants_3 = constants.WATCH_COMPONENT;
	var constants_4 = constants.SET_QUERY;
	var constants_5 = constants.SET_QUERY_OPTIONS;
	var constants_6 = constants.EXECUTE_QUERY;
	var constants_7 = constants.UPDATE_HITS;
	var constants_8 = constants.UPDATE_AGGS;
	var constants_9 = constants.ADD_CONFIG;
	var constants_10 = constants.ADD_APPBASE_REF;
	var constants_11 = constants.LOG_QUERY;
	var constants_12 = constants.LOG_COMBINED_QUERY;
	var constants_13 = constants.SET_VALUE;
	var constants_14 = constants.PATCH_VALUE;
	var constants_15 = constants.CLEAR_VALUES;
	var constants_16 = constants.SET_LOADING;
	var constants_17 = constants.SET_ERROR;
	var constants_18 = constants.SET_STREAMING;
	var constants_19 = constants.PUSH_TO_STREAM_HITS;
	var constants_20 = constants.SET_TIMESTAMP;
	var constants_21 = constants.SET_HEADERS;
	var constants_22 = constants.SET_MAP_DATA;
	var constants_23 = constants.SET_QUERY_LISTENER;
	var constants_24 = constants.STORE_KEY;
	var constants_25 = constants.SET_SEARCH_ID;
	var constants_26 = constants.SET_PROMOTED_RESULTS;
	var constants_27 = constants.SET_PROPS;
	var constants_28 = constants.UPDATE_PROPS;
	var constants_29 = constants.REMOVE_PROPS;
	var constants_30 = constants.SET_MAP_ON_TOP_MARKER;
	var constants_31 = constants.SET_MAP_OPEN_MARKERS;
	var constants_32 = constants.SET_SUGGESTIONS_SEARCH_VALUE;
	var constants_33 = constants.CLEAR_SUGGESTIONS_SEARCH_VALUE;
	var constants_34 = constants.SET_SUGGESTIONS_SEARCH_ID;
	var constants_35 = constants.UPDATE_ANALYTICS_CONFIG;

	var componentsReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = componentsReducer;

	  function _toConsumableArray(arr) {
	    if (Array.isArray(arr)) {
	      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	        arr2[i] = arr[i];
	      }

	      return arr2;
	    } else {
	      return Array.from(arr);
	    }
	  }

	  function componentsReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var action = arguments[1];

	    if (action.type === constants.ADD_COMPONENT) {
	      return [].concat(_toConsumableArray(state), [action.component]);
	    } else if (action.type === constants.REMOVE_COMPONENT) {
	      return state.filter(function (element) {
	        return element !== action.component;
	      });
	    }

	    return state;
	  }
	});
	unwrapExports(componentsReducer_1);

	var watchManReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = watchManReducer;

	  function _toConsumableArray(arr) {
	    if (Array.isArray(arr)) {
	      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	        arr2[i] = arr[i];
	      }

	      return arr2;
	    } else {
	      return Array.from(arr);
	    }
	  }

	  function getWatchList(depTree) {
	    var list = Object.values(depTree);
	    var components = [];
	    list.forEach(function (item) {
	      if (typeof item === 'string') {
	        components.push(item);
	      } else if (Array.isArray(item)) {
	        item.forEach(function (component) {
	          if (typeof component === 'string') {
	            components.push(component);
	          } else {
	            components.push.apply(components, _toConsumableArray(getWatchList(component)));
	          }
	        });
	      } else if (typeof item === 'object' && item !== null) {
	        components.push.apply(components, _toConsumableArray(getWatchList(item)));
	      }
	    });
	    return components.filter(function (value, index, array) {
	      return array.indexOf(value) === index;
	    });
	  }

	  function watchManReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.WATCH_COMPONENT) {
	      var watchList = getWatchList(action.react);

	      var newState = _extends({}, state);

	      Object.keys(newState).forEach(function (key) {
	        newState[key] = newState[key].filter(function (value) {
	          return value !== action.component;
	        });
	      });
	      watchList.forEach(function (item) {
	        if (Array.isArray(newState[item])) {
	          newState[item] = [].concat(_toConsumableArray(newState[item]), [action.component]);
	        } else {
	          newState[item] = [action.component];
	        }
	      });
	      return newState;
	    }

	    return state;
	  }
	});
	unwrapExports(watchManReducer_1);

	var dependencyTreeReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = dependencyTreeReducer;

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function dependencyTreeReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.WATCH_COMPONENT) {
	      return _extends({}, state, _defineProperty({}, action.component, action.react));
	    } else if (action.type === constants.REMOVE_COMPONENT) {
	      var del = state[action.component],
	          obj = _objectWithoutProperties(state, [action.component]);

	      return obj;
	    }

	    return state;
	  }
	});
	unwrapExports(dependencyTreeReducer_1);

	var queryReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = queryReducer;

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function queryReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.SET_QUERY) {
	      return _extends({}, state, _defineProperty({}, action.component, action.query));
	    } else if (action.type === constants.REMOVE_COMPONENT) {
	      var del = state[action.component],
	          obj = _objectWithoutProperties(state, [action.component]);

	      return obj;
	    }

	    return state;
	  }
	});
	unwrapExports(queryReducer_1);

	var queryOptionsReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = queryOptionsReducer;

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function queryOptionsReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.SET_QUERY_OPTIONS) {
	      return _extends({}, state, _defineProperty({}, action.component, action.options));
	    } else if (action.type === constants.REMOVE_COMPONENT) {
	      var del = state[action.component],
	          obj = _objectWithoutProperties(state, [action.component]);

	      return obj;
	    }

	    return state;
	  }
	});
	unwrapExports(queryOptionsReducer_1);

	var constants$1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  var componentTypes = exports.componentTypes = {
	    reactiveList: 'REACTIVELIST',
	    dataSearch: 'DATASEARCH',
	    categorySearch: 'CATEGORYSEARCH',
	    singleList: 'SINGLELIST',
	    multiList: 'MULTILIST',
	    singleDataList: 'SINGLEDATALIST',
	    singleDropdownList: 'SINGLEDROPDOWNLIST',
	    multiDataList: 'MULTIDATALIST',
	    multiDropdownList: 'MULTIDROPDOWNLIST',
	    singleDropdownRange: 'SINGLEDROPDOWNRANGE',
	    numberBox: 'NUMBERBOX',
	    tagCloud: 'TAGCLOUD',
	    toggleButton: 'TOGGLEBUTTON',
	    datePicker: 'DATEPICKER',
	    dateRange: 'DATERANGE',
	    dynamicRangeSlider: 'DYNAMICRANGESLIDER',
	    multiDropdownRange: 'MULTIDROPDOWNRANGE',
	    singleRange: 'SINGLERANGE',
	    multiRange: 'MULTIRANGE',
	    rangeSlider: 'RANGESLIDER',
	    ratingsFilter: 'RATINGSFILTER',
	    rangeInput: 'RANGEINPUT'
	  };
	  var validProps = exports.validProps = ['componentType', 'dataField', 'includeFields', 'excludeFields', 'size', 'sortBy', 'sortOptions', 'pagination', 'autoFocus', 'autosuggest', 'debounce', 'defaultValue', 'defaultSuggestions', 'fieldWeights', 'filterLabel', 'fuzziness', 'highlight', 'highlightField', 'nestedField', 'placeholder', 'queryFormat', 'categoryField', 'strictSelection', 'selectAllLabel', 'showCheckbox', 'showFilter', 'showSearch', 'showCount', 'showLoadMore', 'loadMoreLabel', 'showMissing', 'missingLabel', 'data', 'showRadio', 'multiSelect', 'interval', 'showHistogram', 'snap', 'stepValue', 'range', 'showSlider'];
	});
	unwrapExports(constants$1);
	var constants_1$1 = constants$1.componentTypes;
	var constants_2$1 = constants$1.validProps;

	var analytics = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.parseCustomEvents = exports.parseRangeObject = exports.parseFilterValue = exports.rangeObjectComponents = exports.rangeComponents = exports.filterComponents = exports.defaultAnalyticsConfig = undefined;

	  var _slicedToArray = function () {
	    function sliceIterator(arr, i) {
	      var _arr = [];
	      var _n = true;
	      var _d = false;
	      var _e = undefined;

	      try {
	        for (var _i = arr[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	          _arr.push(_s.value);

	          if (i && _arr.length === i) break;
	        }
	      } catch (err) {
	        _d = true;
	        _e = err;
	      } finally {
	        try {
	          if (!_n && _i["return"]) _i["return"]();
	        } finally {
	          if (_d) throw _e;
	        }
	      }

	      return _arr;
	    }

	    return function (arr, i) {
	      if (Array.isArray(arr)) {
	        return arr;
	      } else if ((typeof Symbol === 'function' ? Symbol.iterator : '@@iterator') in Object(arr)) {
	        return sliceIterator(arr, i);
	      } else {
	        throw new TypeError("Invalid attempt to destructure non-iterable instance");
	      }
	    };
	  }();

	  var filterComponents = [constants$1.componentTypes.numberBox, constants$1.componentTypes.tagCloud, constants$1.componentTypes.toggleButton, constants$1.componentTypes.datePicker, constants$1.componentTypes.dateRange, constants$1.componentTypes.multiDataList, constants$1.componentTypes.multiDropdownList, constants$1.componentTypes.multiList, constants$1.componentTypes.singleDataList, constants$1.componentTypes.singleDropdownList, constants$1.componentTypes.singleList, constants$1.componentTypes.dynamicRangeSlider, constants$1.componentTypes.multiDropdownRange, constants$1.componentTypes.multiRange, constants$1.componentTypes.rangeSlider, constants$1.componentTypes.ratingsFilter, constants$1.componentTypes.singleDropdownRange, constants$1.componentTypes.singleRange];
	  var rangeComponents = [constants$1.componentTypes.dateRange, constants$1.componentTypes.dynamicRangeSlider, constants$1.componentTypes.rangeSlider, constants$1.componentTypes.rangeInput, constants$1.componentTypes.ratingsFilter];
	  var rangeObjectComponents = [constants$1.componentTypes.singleRange, constants$1.componentTypes.singleDropdownRange, constants$1.componentTypes.multiRange, constants$1.componentTypes.multiDropdownRange];

	  function parseRangeObject(filterKey, rangeObject) {
	    return filterKey + '=' + rangeObject.start + '~' + rangeObject.end;
	  }

	  function parseFilterValue(componentId, componentValues) {
	    var label = componentValues.label,
	        value = componentValues.value,
	        componentType = componentValues.componentType;
	    var filterKey = label || componentId;

	    if (rangeComponents.includes(componentType)) {
	      return filterKey + '=' + value[0] + '~' + value[1];
	    } else if (rangeObjectComponents.includes(componentType)) {
	      if (Array.isArray(value)) {
	        return value.map(function (item) {
	          return parseRangeObject(filterKey, item);
	        }).join();
	      }

	      return parseRangeObject(filterKey, value);
	    } else if (Array.isArray(value)) {
	      var isObject = typeof value[0] === 'object' && value[0] !== null;
	      return isObject ? value.map(function (item) {
	        return filterKey + '=' + item.value;
	      }).join() : value.map(function (item) {
	        return filterKey + '=' + item;
	      }).join();
	    }

	    return filterKey + '=' + value;
	  }

	  function getFilterString(selectedValues) {
	    if (selectedValues && Object.keys(selectedValues).length) {
	      return Object.entries(selectedValues).filter(function (_ref) {
	        var _ref2 = _slicedToArray(_ref, 2),
	            componentValues = _ref2[1];

	        return filterComponents.includes(componentValues.componentType) && (componentValues.value && componentValues.value.length || componentValues.value && componentValues.value.start || componentValues.value && componentValues.value.end);
	      }).map(function (_ref3) {
	        var _ref4 = _slicedToArray(_ref3, 2),
	            componentId = _ref4[0],
	            componentValues = _ref4[1];

	        return parseFilterValue(componentId, componentValues);
	      }).join();
	    }

	    return null;
	  }

	  function parseCustomEvents(customEvents) {
	    var finalStr = '';
	    Object.keys(customEvents).forEach(function (key, index) {
	      finalStr += key + '=' + customEvents[key];

	      if (index < Object.keys(customEvents).length - 1) {
	        finalStr += ',';
	      }
	    });
	    return finalStr;
	  }

	  var defaultAnalyticsConfig = exports.defaultAnalyticsConfig = {
	    searchStateHeader: false,
	    emptyQuery: true,
	    suggestionAnalytics: true,
	    userId: null,
	    customEvents: null
	  };
	  exports.filterComponents = filterComponents;
	  exports.rangeComponents = rangeComponents;
	  exports.rangeObjectComponents = rangeObjectComponents;
	  exports.parseFilterValue = parseFilterValue;
	  exports.parseRangeObject = parseRangeObject;
	  exports.parseCustomEvents = parseCustomEvents;
	  exports["default"] = getFilterString;
	});
	unwrapExports(analytics);
	var analytics_1 = analytics.parseCustomEvents;
	var analytics_2 = analytics.parseRangeObject;
	var analytics_3 = analytics.parseFilterValue;
	var analytics_4 = analytics.rangeObjectComponents;
	var analytics_5 = analytics.rangeComponents;
	var analytics_6 = analytics.filterComponents;
	var analytics_7 = analytics.defaultAnalyticsConfig;

	var configReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = configReducer;

	  function configReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	      analyticsConfig: analytics.defaultAnalyticsConfig
	    };
	    var action = arguments[1];

	    if (action.type === constants.ADD_CONFIG) {
	      return _extends({}, state, {
	        analyticsConfig: _extends({}, analytics.defaultAnalyticsConfig, action.analyticsConfig)
	      });
	    } else if (action.type === constants.UPDATE_ANALYTICS_CONFIG) {
	      return _extends({}, state, {
	        analyticsConfig: _extends({}, state.analyticsConfig, action.analyticsConfig)
	      });
	    }

	    return state;
	  }
	});
	unwrapExports(configReducer_1);

	var appbaseRefReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = appbaseRefReducer;

	  function appbaseRefReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.ADD_APPBASE_REF) {
	      return action.appbaseRef;
	    }

	    return state;
	  }
	});
	unwrapExports(appbaseRefReducer_1);

	var hitsReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = hitsReducer;

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function _toConsumableArray(arr) {
	    if (Array.isArray(arr)) {
	      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	        arr2[i] = arr[i];
	      }

	      return arr2;
	    } else {
	      return Array.from(arr);
	    }
	  }

	  function hitsReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.UPDATE_HITS) {
	      if (action.append) {
	        return _extends({}, state, _defineProperty({}, action.component, {
	          hits: [].concat(_toConsumableArray(state[action.component].hits), _toConsumableArray(action.hits)),
	          total: action.total,
	          time: action.time
	        }));
	      }

	      return _extends({}, state, _defineProperty({}, action.component, {
	        hits: action.hits,
	        total: action.total,
	        time: action.time
	      }));
	    } else if (action.type === constants.PUSH_TO_STREAM_HITS) {
	      var total = state[action.component].total;

	      if (action.hit._deleted) {
	        total -= 1;
	      } else if (!action.hit._updated) {
	        total += 1;
	      }

	      return _extends({}, state, _defineProperty({}, action.component, _extends({}, state[action.component], {
	        total: total
	      })));
	    } else if (action.type === constants.REMOVE_COMPONENT) {
	      var del = state[action.component],
	          obj = _objectWithoutProperties(state, [action.component]);

	      return obj;
	    }

	    return state;
	  }
	});
	unwrapExports(hitsReducer_1);

	var aggsReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = aggsReducer;

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function _toConsumableArray(arr) {
	    if (Array.isArray(arr)) {
	      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	        arr2[i] = arr[i];
	      }

	      return arr2;
	    } else {
	      return Array.from(arr);
	    }
	  }

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function aggsReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.UPDATE_AGGS) {
	      if (action.append) {
	        var field = Object.keys(state[action.component])[0];

	        var _action$aggregations$ = action.aggregations[field],
	            newBuckets = _action$aggregations$.buckets,
	            aggsData = _objectWithoutProperties(_action$aggregations$, ['buckets']);

	        return _extends({}, state, _defineProperty({}, action.component, _defineProperty({}, field, _extends({
	          buckets: [].concat(_toConsumableArray(state[action.component][field].buckets), _toConsumableArray(newBuckets))
	        }, aggsData))));
	      }

	      return _extends({}, state, _defineProperty({}, action.component, action.aggregations));
	    } else if (action.type === constants.REMOVE_COMPONENT) {
	      var del = state[action.component],
	          obj = _objectWithoutProperties(state, [action.component]);

	      return obj;
	    }

	    return state;
	  }
	});
	unwrapExports(aggsReducer_1);

	var logsReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = logsReducer;

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function logsReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.LOG_QUERY) {
	      return _extends({}, state, _defineProperty({}, action.component, action.query));
	    } else if (action.type === constants.REMOVE_COMPONENT) {
	      var del = state[action.component],
	          obj = _objectWithoutProperties(state, [action.component]);

	      return obj;
	    }

	    return state;
	  }
	});
	unwrapExports(logsReducer_1);

	var combinedLogsReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = combinedLogsReducer;

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function combinedLogsReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.LOG_COMBINED_QUERY) {
	      return _extends({}, state, _defineProperty({}, action.component, action.query));
	    } else if (action.type === constants.REMOVE_COMPONENT) {
	      var del = state[action.component],
	          obj = _objectWithoutProperties(state, [action.component]);

	      return obj;
	    }

	    return state;
	  }
	});
	unwrapExports(combinedLogsReducer_1);

	var valueReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = valueReducer;

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function valueReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    switch (action.type) {
	      case constants.SET_VALUE:
	        return _extends({}, state, _defineProperty({}, action.component, {
	          value: action.value,
	          label: action.label || action.component,
	          showFilter: action.showFilter,
	          URLParams: action.URLParams,
	          componentType: action.componentType,
	          category: action.category
	        }));

	      case constants.PATCH_VALUE:
	        return _extends({}, state, _defineProperty({}, action.component, _extends({}, state[action.component], action.payload)));

	      case constants.CLEAR_VALUES:
	        return {};

	      case constants.REMOVE_COMPONENT:
	        {
	          var del = state[action.component],
	              obj = _objectWithoutProperties(state, [action.component]);

	          return obj;
	        }

	      default:
	        return state;
	    }
	  }
	});
	unwrapExports(valueReducer_1);

	var loadingReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = loadingReducer;

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function loadingReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.SET_LOADING) {
	      return _extends({}, state, _defineProperty({}, action.component, action.isLoading));
	    } else if (action.type === constants.REMOVE_COMPONENT) {
	      var del = state[action.component],
	          obj = _objectWithoutProperties(state, [action.component]);

	      return obj;
	    }

	    return state;
	  }
	});
	unwrapExports(loadingReducer_1);

	var errorReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = errorReducer;

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function errorReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.SET_ERROR) {
	      return _extends({}, state, _defineProperty({}, action.component, action.error));
	    } else if (action.type === constants.REMOVE_COMPONENT) {
	      var del = state[action.component],
	          obj = _objectWithoutProperties(state, [action.component]);

	      return obj;
	    }

	    return state;
	  }
	});
	unwrapExports(errorReducer_1);

	var streamingReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = streamingReducer;

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function streamingReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.SET_STREAMING) {
	      if (!action.status && state[action.component] && state[action.component].ref) {
	        state[action.component].ref.stop();
	      }

	      return _extends({}, state, _defineProperty({}, action.component, {
	        status: action.status,
	        ref: action.ref
	      }));
	    } else if (action.type === constants.REMOVE_COMPONENT) {
	      var del = state[action.component],
	          obj = _objectWithoutProperties(state, [action.component]);

	      return obj;
	    }

	    return state;
	  }
	});
	unwrapExports(streamingReducer_1);

	var streamHitsReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = streamHitsReducer;

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function _toConsumableArray(arr) {
	    if (Array.isArray(arr)) {
	      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	        arr2[i] = arr[i];
	      }

	      return arr2;
	    } else {
	      return Array.from(arr);
	    }
	  }

	  function streamHitsReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.PUSH_TO_STREAM_HITS) {
	      var currentHits = state[action.component] || [];
	      currentHits = currentHits.filter(function (item) {
	        return item._id !== action.hit._id;
	      });
	      return _extends({}, state, _defineProperty({}, action.component, [action.hit].concat(_toConsumableArray(currentHits))));
	    } else if (action.type === constants.SET_STREAMING) {
	      if (!action.status && state[action.component]) {
	        var del = state[action.component],
	            obj = _objectWithoutProperties(state, [action.component]);

	        return obj;
	      }
	    } else if (action.type === constants.REMOVE_COMPONENT) {
	      var _del = state[action.component],
	          _obj = _objectWithoutProperties(state, [action.component]);

	      return _obj;
	    }

	    return state;
	  }
	});
	unwrapExports(streamHitsReducer_1);

	var timestampReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = timestampReducer;

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function timestampReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.SET_TIMESTAMP) {
	      return _extends({}, state, _defineProperty({}, action.component, action.timestamp));
	    } else if (action.type === constants.REMOVE_COMPONENT) {
	      var del = state[action.component],
	          obj = _objectWithoutProperties(state, [action.component]);

	      return obj;
	    }

	    return state;
	  }
	});
	unwrapExports(timestampReducer_1);

	var headersReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = headersReducer;

	  function headersReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.SET_HEADERS) {
	      return action.headers;
	    }

	    return state;
	  }
	});
	unwrapExports(headersReducer_1);

	var mapDataReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = mapDataReducer;

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function mapDataReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.SET_MAP_DATA) {
	      return _defineProperty({}, action.componentId, {
	        query: action.query,
	        persistMapQuery: action.persistMapQuery
	      });
	    } else if (action.type === constants.REMOVE_COMPONENT) {
	      var del = state[action.component],
	          obj = _objectWithoutProperties(state, [action.component]);

	      return obj;
	    }

	    return state;
	  }
	});
	unwrapExports(mapDataReducer_1);

	var queryListenerReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = queryListenerReducer;

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function queryListenerReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (action.type === constants.SET_QUERY_LISTENER) {
	      return _extends({}, state, _defineProperty({}, action.component, {
	        onQueryChange: action.onQueryChange,
	        onError: action.onError
	      }));
	    } else if (action.type === constants.REMOVE_COMPONENT) {
	      var del = state[action.component],
	          obj = _objectWithoutProperties(state, [action.component]);

	      return obj;
	    }

	    return state;
	  }
	});
	unwrapExports(queryListenerReducer_1);

	var analyticsReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = analyticsReducer;
	  var initialState = {
	    searchValue: null,
	    searchId: null,
	    suggestionsSearchId: null,
	    suggestionsSearchValue: null
	  };
	  var searchComponents = [constants$1.componentTypes.dataSearch, constants$1.componentTypes.categorySearch];

	  function analyticsReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];

	    switch (action.type) {
	      case constants.SET_VALUE:
	        if (searchComponents.includes(action.componentType)) {
	          return {
	            searchValue: action.value,
	            searchId: null
	          };
	        }

	        return state;

	      case constants.SET_SEARCH_ID:
	        return _extends({}, state, {
	          searchId: action.searchId
	        });

	      case constants.SET_SUGGESTIONS_SEARCH_VALUE:
	        return _extends({}, state, {
	          suggestionsSearchValue: action.value,
	          suggestionsSearchId: null
	        });

	      case constants.SET_SUGGESTIONS_SEARCH_ID:
	        return _extends({}, state, {
	          suggestionsSearchId: action.searchId
	        });

	      case constants.CLEAR_SUGGESTIONS_SEARCH_VALUE:
	        return _extends({}, state, {
	          suggestionsSearchValue: null,
	          suggestionsSearchId: null
	        });

	      default:
	        return state;
	    }
	  }
	});
	unwrapExports(analyticsReducer_1);

	var promotedResultsReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = promotedResultsReducer;

	  function promotedResultsReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var action = arguments[1];

	    if (action.type === constants.SET_PROMOTED_RESULTS) {
	      var results = action.results.map(function (item) {
	        return _extends({}, item, {
	          _promoted: true
	        });
	      });
	      return results;
	    }

	    return state;
	  }
	});
	unwrapExports(promotedResultsReducer_1);

	var propsReducer = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = queryOptionsReducer;

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function queryOptionsReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    switch (action.type) {
	      case constants.SET_PROPS:
	        return _extends({}, state, _defineProperty({}, action.component, action.options));

	      case constants.UPDATE_PROPS:
	        return _extends({}, state, _defineProperty({}, action.component, _extends({}, state[action.component], action.options)));

	      case constants.REMOVE_PROPS:
	      case constants.REMOVE_COMPONENT:
	        {
	          var del = state[action.component],
	              obj = _objectWithoutProperties(state, [action.component]);

	          return obj;
	        }

	      default:
	        return state;
	    }
	  }
	});
	unwrapExports(propsReducer);

	var mapOnTopMarkerReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = mapOnTopMarkerReducer;

	  function mapOnTopMarkerReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	    var action = arguments[1];

	    switch (action.type) {
	      case constants.SET_MAP_ON_TOP_MARKER:
	        return action.markerId;

	      default:
	        return state;
	    }
	  }
	});
	unwrapExports(mapOnTopMarkerReducer_1);

	var mapOpenMarkerReducer_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = mapOpenMarkerReducer;

	  function mapOpenMarkerReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    switch (action.type) {
	      case constants.SET_MAP_OPEN_MARKERS:
	        return action.openMarkers;

	      default:
	        return state;
	    }
	  }
	});
	unwrapExports(mapOpenMarkerReducer_1);

	var _redux = getCjsExportFromNamespace(redux);

	var reducers = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _componentsReducer2 = _interopRequireDefault(componentsReducer_1);

	  var _watchManReducer2 = _interopRequireDefault(watchManReducer_1);

	  var _dependencyTreeReducer2 = _interopRequireDefault(dependencyTreeReducer_1);

	  var _queryReducer2 = _interopRequireDefault(queryReducer_1);

	  var _queryOptionsReducer2 = _interopRequireDefault(queryOptionsReducer_1);

	  var _configReducer2 = _interopRequireDefault(configReducer_1);

	  var _appbaseRefReducer2 = _interopRequireDefault(appbaseRefReducer_1);

	  var _hitsReducer2 = _interopRequireDefault(hitsReducer_1);

	  var _aggsReducer2 = _interopRequireDefault(aggsReducer_1);

	  var _logsReducer2 = _interopRequireDefault(logsReducer_1);

	  var _combinedLogsReducer2 = _interopRequireDefault(combinedLogsReducer_1);

	  var _valueReducer2 = _interopRequireDefault(valueReducer_1);

	  var _loadingReducer2 = _interopRequireDefault(loadingReducer_1);

	  var _errorReducer2 = _interopRequireDefault(errorReducer_1);

	  var _streamingReducer2 = _interopRequireDefault(streamingReducer_1);

	  var _streamHitsReducer2 = _interopRequireDefault(streamHitsReducer_1);

	  var _timestampReducer2 = _interopRequireDefault(timestampReducer_1);

	  var _headersReducer2 = _interopRequireDefault(headersReducer_1);

	  var _mapDataReducer2 = _interopRequireDefault(mapDataReducer_1);

	  var _queryListenerReducer2 = _interopRequireDefault(queryListenerReducer_1);

	  var _analyticsReducer2 = _interopRequireDefault(analyticsReducer_1);

	  var _promotedResultsReducer2 = _interopRequireDefault(promotedResultsReducer_1);

	  var _propsReducer2 = _interopRequireDefault(propsReducer);

	  var _mapOnTopMarkerReducer2 = _interopRequireDefault(mapOnTopMarkerReducer_1);

	  var _mapOpenMarkerReducer2 = _interopRequireDefault(mapOpenMarkerReducer_1);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  }

	  exports["default"] = (0, _redux.combineReducers)({
	    components: _componentsReducer2["default"],
	    watchMan: _watchManReducer2["default"],
	    queryList: _queryReducer2["default"],
	    queryOptions: _queryOptionsReducer2["default"],
	    dependencyTree: _dependencyTreeReducer2["default"],
	    appbaseRef: _appbaseRefReducer2["default"],
	    config: _configReducer2["default"],
	    hits: _hitsReducer2["default"],
	    promotedResults: _promotedResultsReducer2["default"],
	    aggregations: _aggsReducer2["default"],
	    queryLog: _logsReducer2["default"],
	    combinedLog: _combinedLogsReducer2["default"],
	    selectedValues: _valueReducer2["default"],
	    isLoading: _loadingReducer2["default"],
	    error: _errorReducer2["default"],
	    stream: _streamingReducer2["default"],
	    streamHits: _streamHitsReducer2["default"],
	    timestamp: _timestampReducer2["default"],
	    headers: _headersReducer2["default"],
	    mapData: _mapDataReducer2["default"],
	    queryListener: _queryListenerReducer2["default"],
	    analytics: _analyticsReducer2["default"],
	    markerOnTop: _mapOnTopMarkerReducer2["default"],
	    openMarkers: _mapOpenMarkerReducer2["default"],
	    props: _propsReducer2["default"]
	  });
	});
	unwrapExports(reducers);

	var value = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.setValue = setValue;
	  exports.patchValue = patchValue;
	  exports.clearValues = clearValues;

	  function setValue(component, value, label, showFilter, URLParams, componentType, category) {
	    return {
	      type: constants.SET_VALUE,
	      component: component,
	      value: value,
	      label: label,
	      showFilter: showFilter,
	      URLParams: URLParams,
	      componentType: componentType,
	      category: category
	    };
	  }

	  function patchValue(component, payload) {
	    return {
	      type: constants.PATCH_VALUE,
	      component: component,
	      payload: payload
	    };
	  }

	  function clearValues() {
	    return {
	      type: constants.CLEAR_VALUES
	    };
	  }
	});
	unwrapExports(value);
	var value_1 = value.setValue;
	var value_2 = value.patchValue;
	var value_3 = value.clearValues;

	var hits = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.updateAggs = updateAggs;
	  exports.updateHits = updateHits;
	  exports.pushToStreamHits = pushToStreamHits;

	  function updateAggs(component, aggregations) {
	    var append = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	    return {
	      type: constants.UPDATE_AGGS,
	      component: component,
	      aggregations: aggregations,
	      append: append
	    };
	  }

	  function updateHits(component, hits, time) {
	    var append = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	    return {
	      type: constants.UPDATE_HITS,
	      component: component,
	      hits: hits.hits,
	      total: typeof hits.total === 'object' ? hits.total.value : hits.total,
	      time: time,
	      append: append
	    };
	  }

	  function pushToStreamHits(component, hit) {
	    return {
	      type: constants.PUSH_TO_STREAM_HITS,
	      component: component,
	      hit: hit
	    };
	  }
	});
	unwrapExports(hits);
	var hits_1 = hits.updateAggs;
	var hits_2 = hits.updateHits;
	var hits_3 = hits.pushToStreamHits;

	var dateFormats_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  var dateFormats = {
	    date: 'yyyy-MM-dd',
	    basic_date: 'yyyyMMdd',
	    basic_date_time: "yyyyMMdd'T'HHmmss.fffzzz",
	    basic_date_time_no_millis: "yyyyMMdd'T'HHmmsszzz",
	    date_time_no_millis: "yyyy-MM-dd'T'HH:mm:sszzz",
	    basic_time: 'HHmmss.fffzzz',
	    basic_time_no_millis: 'HHmmsszzz',
	    epoch_millis: 'epoch_millis',
	    epoch_second: 'epoch_second'
	  };
	  exports["default"] = dateFormats;
	});
	unwrapExports(dateFormats_1);

	var helper = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.getSearchState = exports.getOptionsFromQuery = exports.parseHits = exports.handleA11yAction = exports.getInnerKey = exports.getClassName = exports.checkSomePropChange = exports.checkPropChange = undefined;

	  var _extends = Object.assign || function (target) {
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

	  exports.isEqual = isEqual;
	  exports.debounce = debounce;
	  exports.getQueryOptions = getQueryOptions;
	  exports.buildQuery = buildQuery;
	  exports.pushToAndClause = pushToAndClause;
	  exports.checkValueChange = checkValueChange;
	  exports.getAggsOrder = getAggsOrder;
	  exports.formatDate = formatDate;

	  var _dateFormats2 = _interopRequireDefault(dateFormats_1);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  }

	  function _objectWithoutProperties(obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  }

	  function _toConsumableArray(arr) {
	    if (Array.isArray(arr)) {
	      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	        arr2[i] = arr[i];
	      }

	      return arr2;
	    } else {
	      return Array.from(arr);
	    }
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  function isEqual(x, y) {
	    if (x === y) return true;
	    if (!(x instanceof Object) || !(y instanceof Object)) return false;
	    if (x.constructor !== y.constructor) return false;

	    for (var p in x) {
	      if (!x.hasOwnProperty(p)) continue;
	      if (!y.hasOwnProperty(p)) return false;
	      if (x[p] === y[p]) continue;
	      if (typeof x[p] !== 'object') return false;
	      if (!isEqual(x[p], y[p])) return false;
	    }

	    for (var _p in y) {
	      if (y.hasOwnProperty(_p) && !x.hasOwnProperty(_p)) return false;
	    }

	    return true;
	  }

	  function debounce(callback, wait) {
	    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
	    var timeout = null;
	    var callbackArgs = null;

	    var later = function later() {
	      return callback.apply(context, callbackArgs);
	    };

	    return function debouncedFunction() {
	      callbackArgs = arguments;
	      clearTimeout(timeout);
	      timeout = setTimeout(later, wait);
	    };
	  }

	  function getQueryOptions(props) {
	    var options = {};

	    if (props.size !== undefined) {
	      options.size = props.size;
	    }

	    if (props.includeFields || props.excludeFields) {
	      var source = {};

	      if (props.includeFields) {
	        source.includes = props.includeFields;
	      }

	      if (props.excludeFields) {
	        source.excludes = props.excludeFields;
	      }

	      options._source = source;
	    }

	    return options;
	  }

	  function getOperation(conjunction) {
	    if (conjunction === 'and') {
	      return 'must';
	    }

	    if (conjunction === 'or') {
	      return 'should';
	    }

	    return 'must_not';
	  }

	  function createBoolQuery(operation, query) {
	    var resultQuery = null;

	    if (Array.isArray(query) && query.length || !Array.isArray(query) && query) {
	      resultQuery = {
	        bool: _defineProperty({}, operation, query)
	      };
	    }

	    if (operation === 'should' && resultQuery) {
	      resultQuery = {
	        bool: _extends({}, resultQuery.bool, {
	          minimum_should_match: 1
	        })
	      };
	    }

	    return resultQuery;
	  }

	  function getQuery(react, queryList) {
	    var query = [];
	    Object.keys(react).forEach(function (conjunction) {
	      if (Array.isArray(react[conjunction])) {
	        var operation = getOperation(conjunction);
	        var queryArr = react[conjunction].map(function (comp) {
	          if (typeof comp !== 'string') {
	            return getQuery(comp, queryList);
	          } else if (comp in queryList) {
	            return queryList[comp];
	          }

	          return null;
	        }).filter(function (item) {
	          return !!item;
	        });
	        var boolQuery = createBoolQuery(operation, queryArr);

	        if (boolQuery) {
	          query = [].concat(_toConsumableArray(query), [boolQuery]);
	        }
	      } else if (typeof react[conjunction] === 'string') {
	        var _operation = getOperation(conjunction);

	        var _boolQuery = createBoolQuery(_operation, queryList[react[conjunction]]);

	        if (_boolQuery) {
	          query = [].concat(_toConsumableArray(query), [_boolQuery]);
	        }
	      } else if (typeof react[conjunction] === 'object' && react[conjunction] !== null) {
	        var _boolQuery2 = getQuery(react[conjunction], queryList);

	        if (_boolQuery2) {
	          query = [].concat(_toConsumableArray(query), [_boolQuery2]);
	        }
	      }
	    });

	    if (Array.isArray(query) && query.length) {
	      return {
	        bool: {
	          must: query
	        }
	      };
	    }

	    if (query && Object.keys(query).length) {
	      return query;
	    }

	    return null;
	  }

	  function getExternalQueryOptions(react, options, component) {
	    var queryOptions = {};
	    Object.keys(react).forEach(function (conjunction) {
	      if (Array.isArray(react[conjunction])) {
	        react[conjunction].forEach(function (comp) {
	          if (options[comp]) {
	            queryOptions = _extends({}, queryOptions, options[comp]);
	          }
	        });
	      } else if (typeof react[conjunction] === 'string') {
	        if (options[react[conjunction]]) {
	          queryOptions = _extends({}, queryOptions, options[react[conjunction]]);
	        }
	      } else if (typeof react[conjunction] === 'object' && react[conjunction] !== null && !Array.isArray(react[conjunction])) {
	        queryOptions = _extends({}, queryOptions, getExternalQueryOptions(react[conjunction], options));
	      }
	    });

	    if (options[component]) {
	      queryOptions = _extends({}, queryOptions, options[component]);
	    }

	    return queryOptions;
	  }

	  function buildQuery(component, dependencyTree, queryList, queryOptions) {
	    var queryObj = null;
	    var options = null;

	    if (component in dependencyTree) {
	      queryObj = getQuery(dependencyTree[component], queryList);
	      options = getExternalQueryOptions(dependencyTree[component], queryOptions, component);
	    }

	    return {
	      queryObj: queryObj,
	      options: options
	    };
	  }

	  function pushToAndClause(reactProp, component) {
	    var react = _extends({}, reactProp);

	    if (react.and) {
	      if (Array.isArray(react.and)) {
	        react.and = [].concat(_toConsumableArray(react.and), [component]);
	        return react;
	      } else if (typeof react.and === 'string') {
	        react.and = [react.and, component];
	        return react;
	      }

	      react.and = pushToAndClause(react.and, component);
	      return react;
	    }

	    return _extends({}, react, {
	      and: component
	    });
	  }

	  function checkValueChange(componentId, value, beforeValueChange, performUpdate) {
	    var selectedValue = value;

	    if (Array.isArray(value) && !value.length) {
	      selectedValue = null;
	    }

	    if (beforeValueChange) {
	      beforeValueChange(selectedValue).then(performUpdate)["catch"](function (e) {
	        console.warn(componentId + ' - beforeValueChange rejected the promise with ', e);
	      });
	    } else {
	      performUpdate();
	    }
	  }

	  function getAggsOrder(sortBy) {
	    if (sortBy === 'count') {
	      return {
	        _count: 'desc'
	      };
	    }

	    return {
	      _term: sortBy
	    };
	  }

	  var checkPropChange = exports.checkPropChange = function checkPropChange(prevProp, nextProp, callback) {
	    if (!isEqual(prevProp, nextProp)) {
	      callback();
	      return true;
	    }

	    return false;
	  };

	  var checkSomePropChange = exports.checkSomePropChange = function checkSomePropChange(prevProps, nextProps, propsList, callback) {
	    propsList.some(function (prop) {
	      return checkPropChange(prevProps[prop], nextProps[prop], callback);
	    });
	  };

	  var getClassName = exports.getClassName = function getClassName(classMap, component) {
	    return classMap && classMap[component] || '';
	  };

	  var getInnerKey = exports.getInnerKey = function getInnerKey(obj, key) {
	    return obj && obj[key] || {};
	  };

	  var handleA11yAction = exports.handleA11yAction = function handleA11yAction(e, callback) {
	    if (e.key === 'Enter' || e.key === ' ') {
	      e.preventDefault();
	      callback();
	    }
	  };

	  var highlightResults = function highlightResults(result) {
	    var data = _extends({}, result);

	    if (data.highlight) {
	      Object.keys(data.highlight).forEach(function (highlightItem) {
	        var highlightValue = data.highlight[highlightItem][0];
	        data._source = _extends({}, data._source, _defineProperty({}, highlightItem, highlightValue));
	      });
	    }

	    return data;
	  };

	  var parseHits = exports.parseHits = function parseHits(hits) {
	    var results = null;

	    if (hits) {
	      results = [].concat(_toConsumableArray(hits)).map(function (item) {
	        var streamProps = {};

	        if (item._updated) {
	          streamProps._updated = item._updated;
	        } else if (item._deleted) {
	          streamProps._deleted = item._deleted;
	        }

	        var data = highlightResults(item);
	        var result = Object.keys(data).filter(function (key) {
	          return key !== '_source';
	        }).reduce(function (obj, key) {
	          obj[key] = data[key];
	          return obj;
	        }, _extends({
	          highlight: data.highlight || {}
	        }, data._source, streamProps));
	        return result;
	      });
	    }

	    return results;
	  };

	  function formatDate(date, props) {
	    if (props.parseDate) {
	      return props.parseDate(date, props);
	    }

	    switch (props.queryFormat) {
	      case 'epoch_millis':
	        return date.getTime();

	      case 'epoch_seconds':
	        return Math.floor(date.getTime() / 1000);

	      default:
	        {
	          if (_dateFormats2["default"][props.queryFormat]) {
	            return date.toString(_dateFormats2["default"][props.queryFormat]);
	          }

	          return date.getTime();
	        }
	    }
	  }

	  var getOptionsFromQuery = function getOptionsFromQuery() {
	    var customQuery = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    if (customQuery) {
	      var query = customQuery.query,
	          rest = _objectWithoutProperties(customQuery, ['query']);

	      return Object.keys(rest).length ? rest : null;
	    }

	    return null;
	  };

	  exports.getOptionsFromQuery = getOptionsFromQuery;

	  var getSearchState = exports.getSearchState = function getSearchState() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var forHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    var selectedValues = state.selectedValues,
	        queryLog = state.queryLog,
	        dependencyTree = state.dependencyTree,
	        props = state.props,
	        hits = state.hits,
	        aggregations = state.aggregations,
	        isLoading = state.isLoading,
	        error = state.error;
	    var searchState = {};

	    var populateState = function populateState() {
	      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var key = arguments[1];
	      return Object.keys(obj).forEach(function (componentId) {
	        searchState[componentId] = _extends({}, searchState[componentId], key ? _defineProperty({}, key, obj[componentId]) : obj[componentId]);
	      });
	    };

	    populateState(props);
	    Object.keys(selectedValues).forEach(function (componentId) {
	      var componentState = searchState[componentId];
	      var selectedValue = selectedValues[componentId];

	      if (selectedValue) {
	        searchState[componentId] = _extends({}, componentState, _extends({
	          title: selectedValue.label,
	          componentType: selectedValue.componentType,
	          value: selectedValue.value
	        }, selectedValue.category && {
	          category: selectedValue.category
	        }, {
	          URLParams: selectedValue.URLParams
	        }));
	      }
	    });

	    if (!forHeaders) {
	      populateState(queryLog);
	      populateState(hits, 'hits');
	      populateState(aggregations, 'aggregations');
	      populateState(isLoading, 'isLoading');
	      populateState(error, 'error');
	    }

	    populateState(dependencyTree, 'react');
	    return searchState;
	  };
	});
	unwrapExports(helper);
	var helper_1 = helper.getSearchState;
	var helper_2 = helper.getOptionsFromQuery;
	var helper_3 = helper.parseHits;
	var helper_4 = helper.handleA11yAction;
	var helper_5 = helper.getInnerKey;
	var helper_6 = helper.getClassName;
	var helper_7 = helper.checkSomePropChange;
	var helper_8 = helper.checkPropChange;
	var helper_9 = helper.isEqual;
	var helper_10 = helper.debounce;
	var helper_11 = helper.getQueryOptions;
	var helper_12 = helper.buildQuery;
	var helper_13 = helper.pushToAndClause;
	var helper_14 = helper.checkValueChange;
	var helper_15 = helper.getAggsOrder;
	var helper_16 = helper.formatDate;

	var maps = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.updateMapData = updateMapData;
	  exports.setMapData = setMapData;
	  exports.setMarkerOnTop = setMarkerOnTop;
	  exports.setOpenMarkers = setOpenMarkers;

	  function updateMapData(componentId, query, persistMapQuery) {
	    return {
	      type: constants.SET_MAP_DATA,
	      componentId: componentId,
	      query: query,
	      persistMapQuery: persistMapQuery
	    };
	  }

	  function setMapData(componentId, query$1, persistMapQuery, forceExecute) {
	    return function (dispatch) {
	      dispatch(updateMapData(componentId, query$1, persistMapQuery));

	      if (forceExecute) {
	        var executeWatchList = false;
	        var mustExecuteMapQuery = true;
	        dispatch((0, query.executeQuery)(componentId, executeWatchList, mustExecuteMapQuery));
	      }
	    };
	  }

	  function setMarkerOnTop(markerId) {
	    return {
	      type: constants.SET_MAP_ON_TOP_MARKER,
	      markerId: markerId
	    };
	  }

	  function setOpenMarkers(openMarkers) {
	    return {
	      type: constants.SET_MAP_OPEN_MARKERS,
	      openMarkers: openMarkers
	    };
	  }
	});
	unwrapExports(maps);
	var maps_1 = maps.updateMapData;
	var maps_2 = maps.setMapData;
	var maps_3 = maps.setMarkerOnTop;
	var maps_4 = maps.setOpenMarkers;

	var browserPonyfill = createCommonjsModule(function (module, exports) {
	  var __self__ = function (root) {
	    function F() {
	      this.fetch = false;
	      this.DOMException = root.DOMException;
	    }

	    F.prototype = root;
	    return new F();
	  }(typeof self !== 'undefined' ? self : commonjsGlobal);

	  (function (self) {
	    var irrelevant = function (exports) {
	      var support = {
	        searchParams: 'URLSearchParams' in self,
	        iterable: 'Symbol' in self && 'iterator' in Symbol,
	        blob: 'FileReader' in self && 'Blob' in self && function () {
	          try {
	            new Blob();
	            return true;
	          } catch (e) {
	            return false;
	          }
	        }(),
	        formData: 'FormData' in self,
	        arrayBuffer: 'ArrayBuffer' in self
	      };

	      function isDataView(obj) {
	        return obj && DataView.prototype.isPrototypeOf(obj);
	      }

	      if (support.arrayBuffer) {
	        var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

	        var isArrayBufferView = ArrayBuffer.isView || function (obj) {
	          return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
	        };
	      }

	      function normalizeName(name) {
	        if (typeof name !== 'string') {
	          name = String(name);
	        }

	        if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
	          throw new TypeError('Invalid character in header field name');
	        }

	        return name.toLowerCase();
	      }

	      function normalizeValue(value) {
	        if (typeof value !== 'string') {
	          value = String(value);
	        }

	        return value;
	      } // Build a destructive iterator for the value list


	      function iteratorFor(items) {
	        var iterator = {
	          next: function next() {
	            var value = items.shift();
	            return {
	              done: value === undefined,
	              value: value
	            };
	          }
	        };

	        if (support.iterable) {
	          iterator[Symbol.iterator] = function () {
	            return iterator;
	          };
	        }

	        return iterator;
	      }

	      function Headers(headers) {
	        this.map = {};

	        if (headers instanceof Headers) {
	          headers.forEach(function (value, name) {
	            this.append(name, value);
	          }, this);
	        } else if (Array.isArray(headers)) {
	          headers.forEach(function (header) {
	            this.append(header[0], header[1]);
	          }, this);
	        } else if (headers) {
	          Object.getOwnPropertyNames(headers).forEach(function (name) {
	            this.append(name, headers[name]);
	          }, this);
	        }
	      }

	      Headers.prototype.append = function (name, value) {
	        name = normalizeName(name);
	        value = normalizeValue(value);
	        var oldValue = this.map[name];
	        this.map[name] = oldValue ? oldValue + ', ' + value : value;
	      };

	      Headers.prototype['delete'] = function (name) {
	        delete this.map[normalizeName(name)];
	      };

	      Headers.prototype.get = function (name) {
	        name = normalizeName(name);
	        return this.has(name) ? this.map[name] : null;
	      };

	      Headers.prototype.has = function (name) {
	        return this.map.hasOwnProperty(normalizeName(name));
	      };

	      Headers.prototype.set = function (name, value) {
	        this.map[normalizeName(name)] = normalizeValue(value);
	      };

	      Headers.prototype.forEach = function (callback, thisArg) {
	        for (var name in this.map) {
	          if (this.map.hasOwnProperty(name)) {
	            callback.call(thisArg, this.map[name], name, this);
	          }
	        }
	      };

	      Headers.prototype.keys = function () {
	        var items = [];
	        this.forEach(function (value, name) {
	          items.push(name);
	        });
	        return iteratorFor(items);
	      };

	      Headers.prototype.values = function () {
	        var items = [];
	        this.forEach(function (value) {
	          items.push(value);
	        });
	        return iteratorFor(items);
	      };

	      Headers.prototype.entries = function () {
	        var items = [];
	        this.forEach(function (value, name) {
	          items.push([name, value]);
	        });
	        return iteratorFor(items);
	      };

	      if (support.iterable) {
	        Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
	      }

	      function consumed(body) {
	        if (body.bodyUsed) {
	          return Promise.reject(new TypeError('Already read'));
	        }

	        body.bodyUsed = true;
	      }

	      function fileReaderReady(reader) {
	        return new Promise(function (resolve, reject) {
	          reader.onload = function () {
	            resolve(reader.result);
	          };

	          reader.onerror = function () {
	            reject(reader.error);
	          };
	        });
	      }

	      function readBlobAsArrayBuffer(blob) {
	        var reader = new FileReader();
	        var promise = fileReaderReady(reader);
	        reader.readAsArrayBuffer(blob);
	        return promise;
	      }

	      function readBlobAsText(blob) {
	        var reader = new FileReader();
	        var promise = fileReaderReady(reader);
	        reader.readAsText(blob);
	        return promise;
	      }

	      function readArrayBufferAsText(buf) {
	        var view = new Uint8Array(buf);
	        var chars = new Array(view.length);

	        for (var i = 0; i < view.length; i++) {
	          chars[i] = String.fromCharCode(view[i]);
	        }

	        return chars.join('');
	      }

	      function bufferClone(buf) {
	        if (buf.slice) {
	          return buf.slice(0);
	        } else {
	          var view = new Uint8Array(buf.byteLength);
	          view.set(new Uint8Array(buf));
	          return view.buffer;
	        }
	      }

	      function Body() {
	        this.bodyUsed = false;

	        this._initBody = function (body) {
	          this._bodyInit = body;

	          if (!body) {
	            this._bodyText = '';
	          } else if (typeof body === 'string') {
	            this._bodyText = body;
	          } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	            this._bodyBlob = body;
	          } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	            this._bodyFormData = body;
	          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	            this._bodyText = body.toString();
	          } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	            this._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.

	            this._bodyInit = new Blob([this._bodyArrayBuffer]);
	          } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	            this._bodyArrayBuffer = bufferClone(body);
	          } else {
	            this._bodyText = body = Object.prototype.toString.call(body);
	          }

	          if (!this.headers.get('content-type')) {
	            if (typeof body === 'string') {
	              this.headers.set('content-type', 'text/plain;charset=UTF-8');
	            } else if (this._bodyBlob && this._bodyBlob.type) {
	              this.headers.set('content-type', this._bodyBlob.type);
	            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	              this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	            }
	          }
	        };

	        if (support.blob) {
	          this.blob = function () {
	            var rejected = consumed(this);

	            if (rejected) {
	              return rejected;
	            }

	            if (this._bodyBlob) {
	              return Promise.resolve(this._bodyBlob);
	            } else if (this._bodyArrayBuffer) {
	              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
	            } else if (this._bodyFormData) {
	              throw new Error('could not read FormData body as blob');
	            } else {
	              return Promise.resolve(new Blob([this._bodyText]));
	            }
	          };

	          this.arrayBuffer = function () {
	            if (this._bodyArrayBuffer) {
	              return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
	            } else {
	              return this.blob().then(readBlobAsArrayBuffer);
	            }
	          };
	        }

	        this.text = function () {
	          var rejected = consumed(this);

	          if (rejected) {
	            return rejected;
	          }

	          if (this._bodyBlob) {
	            return readBlobAsText(this._bodyBlob);
	          } else if (this._bodyArrayBuffer) {
	            return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
	          } else if (this._bodyFormData) {
	            throw new Error('could not read FormData body as text');
	          } else {
	            return Promise.resolve(this._bodyText);
	          }
	        };

	        if (support.formData) {
	          this.formData = function () {
	            return this.text().then(decode);
	          };
	        }

	        this.json = function () {
	          return this.text().then(JSON.parse);
	        };

	        return this;
	      } // HTTP methods whose capitalization should be normalized


	      var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

	      function normalizeMethod(method) {
	        var upcased = method.toUpperCase();
	        return methods.indexOf(upcased) > -1 ? upcased : method;
	      }

	      function Request(input, options) {
	        options = options || {};
	        var body = options.body;

	        if (input instanceof Request) {
	          if (input.bodyUsed) {
	            throw new TypeError('Already read');
	          }

	          this.url = input.url;
	          this.credentials = input.credentials;

	          if (!options.headers) {
	            this.headers = new Headers(input.headers);
	          }

	          this.method = input.method;
	          this.mode = input.mode;
	          this.signal = input.signal;

	          if (!body && input._bodyInit != null) {
	            body = input._bodyInit;
	            input.bodyUsed = true;
	          }
	        } else {
	          this.url = String(input);
	        }

	        this.credentials = options.credentials || this.credentials || 'same-origin';

	        if (options.headers || !this.headers) {
	          this.headers = new Headers(options.headers);
	        }

	        this.method = normalizeMethod(options.method || this.method || 'GET');
	        this.mode = options.mode || this.mode || null;
	        this.signal = options.signal || this.signal;
	        this.referrer = null;

	        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	          throw new TypeError('Body not allowed for GET or HEAD requests');
	        }

	        this._initBody(body);
	      }

	      Request.prototype.clone = function () {
	        return new Request(this, {
	          body: this._bodyInit
	        });
	      };

	      function decode(body) {
	        var form = new FormData();
	        body.trim().split('&').forEach(function (bytes) {
	          if (bytes) {
	            var split = bytes.split('=');
	            var name = split.shift().replace(/\+/g, ' ');
	            var value = split.join('=').replace(/\+/g, ' ');
	            form.append(decodeURIComponent(name), decodeURIComponent(value));
	          }
	        });
	        return form;
	      }

	      function parseHeaders(rawHeaders) {
	        var headers = new Headers(); // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
	        // https://tools.ietf.org/html/rfc7230#section-3.2

	        var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
	        preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
	          var parts = line.split(':');
	          var key = parts.shift().trim();

	          if (key) {
	            var value = parts.join(':').trim();
	            headers.append(key, value);
	          }
	        });
	        return headers;
	      }

	      Body.call(Request.prototype);

	      function Response(bodyInit, options) {
	        if (!options) {
	          options = {};
	        }

	        this.type = 'default';
	        this.status = options.status === undefined ? 200 : options.status;
	        this.ok = this.status >= 200 && this.status < 300;
	        this.statusText = 'statusText' in options ? options.statusText : 'OK';
	        this.headers = new Headers(options.headers);
	        this.url = options.url || '';

	        this._initBody(bodyInit);
	      }

	      Body.call(Response.prototype);

	      Response.prototype.clone = function () {
	        return new Response(this._bodyInit, {
	          status: this.status,
	          statusText: this.statusText,
	          headers: new Headers(this.headers),
	          url: this.url
	        });
	      };

	      Response.error = function () {
	        var response = new Response(null, {
	          status: 0,
	          statusText: ''
	        });
	        response.type = 'error';
	        return response;
	      };

	      var redirectStatuses = [301, 302, 303, 307, 308];

	      Response.redirect = function (url, status) {
	        if (redirectStatuses.indexOf(status) === -1) {
	          throw new RangeError('Invalid status code');
	        }

	        return new Response(null, {
	          status: status,
	          headers: {
	            location: url
	          }
	        });
	      };

	      exports.DOMException = self.DOMException;

	      try {
	        new exports.DOMException();
	      } catch (err) {
	        exports.DOMException = function (message, name) {
	          this.message = message;
	          this.name = name;
	          var error = Error(message);
	          this.stack = error.stack;
	        };

	        exports.DOMException.prototype = Object.create(Error.prototype);
	        exports.DOMException.prototype.constructor = exports.DOMException;
	      }

	      function fetch(input, init) {
	        return new Promise(function (resolve, reject) {
	          var request = new Request(input, init);

	          if (request.signal && request.signal.aborted) {
	            return reject(new exports.DOMException('Aborted', 'AbortError'));
	          }

	          var xhr = new XMLHttpRequest();

	          function abortXhr() {
	            xhr.abort();
	          }

	          xhr.onload = function () {
	            var options = {
	              status: xhr.status,
	              statusText: xhr.statusText,
	              headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	            };
	            options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
	            var body = 'response' in xhr ? xhr.response : xhr.responseText;
	            resolve(new Response(body, options));
	          };

	          xhr.onerror = function () {
	            reject(new TypeError('Network request failed'));
	          };

	          xhr.ontimeout = function () {
	            reject(new TypeError('Network request failed'));
	          };

	          xhr.onabort = function () {
	            reject(new exports.DOMException('Aborted', 'AbortError'));
	          };

	          xhr.open(request.method, request.url, true);

	          if (request.credentials === 'include') {
	            xhr.withCredentials = true;
	          } else if (request.credentials === 'omit') {
	            xhr.withCredentials = false;
	          }

	          if ('responseType' in xhr && support.blob) {
	            xhr.responseType = 'blob';
	          }

	          request.headers.forEach(function (value, name) {
	            xhr.setRequestHeader(name, value);
	          });

	          if (request.signal) {
	            request.signal.addEventListener('abort', abortXhr);

	            xhr.onreadystatechange = function () {
	              // DONE (success or failure)
	              if (xhr.readyState === 4) {
	                request.signal.removeEventListener('abort', abortXhr);
	              }
	            };
	          }

	          xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	        });
	      }

	      fetch.polyfill = true;

	      if (!self.fetch) {
	        self.fetch = fetch;
	        self.Headers = Headers;
	        self.Request = Request;
	        self.Response = Response;
	      }

	      exports.Headers = Headers;
	      exports.Request = Request;
	      exports.Response = Response;
	      exports.fetch = fetch;
	      return exports;
	    }({});
	  })(__self__);

	  delete __self__.fetch.polyfill;
	  exports = __self__.fetch; // To enable: import fetch from 'cross-fetch'

	  exports["default"] = __self__.fetch; // For TypeScript consumers without esModuleInterop.

	  exports.fetch = __self__.fetch; // To enable: import {fetch} from 'cross-fetch'

	  exports.Headers = __self__.Headers;
	  exports.Request = __self__.Request;
	  exports.Response = __self__.Response;
	  module.exports = exports;
	});
	var browserPonyfill_1 = browserPonyfill.fetch;
	var browserPonyfill_2 = browserPonyfill.Headers;
	var browserPonyfill_3 = browserPonyfill.Request;
	var browserPonyfill_4 = browserPonyfill.Response;

	var graphQL = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _crossFetch2 = _interopRequireDefault(browserPonyfill);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  }

	  var fetchGraphQL = function fetchGraphQL(graphQLUrl, url, credentials, app, query) {
	    var fetchUrl = credentials ? url.replace('//', '//' + credentials + '@') : url;
	    return (0, _crossFetch2["default"])(graphQLUrl, {
	      method: 'POST',
	      body: '\n\t\t\tquery{\n\t\t\t\telastic50(host: "' + fetchUrl + '"){\n\t\t\t\t\tmsearch(\n\t\t\t\t\t\tindex: "' + app + '"\n\t\t\t\t\t\tbody: ' + JSON.stringify(query.map(function (item) {
	        return JSON.stringify(item);
	      })) + '\n\t\t\t\t\t)\n\t\t\t\t}\n\t\t\t}\n\t\t',
	      headers: {
	        'Content-Type': 'application/graphql'
	      }
	    }).then(function (res) {
	      return res.json();
	    }).then(function (jsonRes) {
	      return jsonRes.data.elastic50.msearch;
	    })["catch"](function (error) {
	      console.error(error);
	    });
	  };

	  exports["default"] = fetchGraphQL;
	});
	unwrapExports(graphQL);

	var query = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  exports.setQuery = setQuery;
	  exports.updateQueryOptions = updateQueryOptions;
	  exports.logQuery = logQuery;
	  exports.logCombinedQuery = logCombinedQuery;
	  exports.setStreaming = setStreaming;
	  exports.setHeaders = setHeaders;
	  exports.setPromotedResults = setPromotedResults;
	  exports.executeQuery = executeQuery;
	  exports.setQueryOptions = setQueryOptions;
	  exports.updateQuery = updateQuery;
	  exports.loadMore = loadMore;
	  exports.setQueryListener = setQueryListener;

	  var _analytics2 = _interopRequireDefault(analytics);

	  var _graphQL2 = _interopRequireDefault(graphQL);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  }

	  function _toConsumableArray(arr) {
	    if (Array.isArray(arr)) {
	      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	        arr2[i] = arr[i];
	      }

	      return arr2;
	    } else {
	      return Array.from(arr);
	    }
	  }

	  function setQuery(component, query) {
	    return {
	      type: constants.SET_QUERY,
	      component: component,
	      query: query
	    };
	  }

	  function updateQueryOptions(component, options) {
	    return {
	      type: constants.SET_QUERY_OPTIONS,
	      component: component,
	      options: options
	    };
	  }

	  function logQuery(component, query) {
	    return {
	      type: constants.LOG_QUERY,
	      component: component,
	      query: query
	    };
	  }

	  function logCombinedQuery(component, query) {
	    return {
	      type: constants.LOG_COMBINED_QUERY,
	      component: component,
	      query: query
	    };
	  }

	  function setLoading(component, isLoading) {
	    return {
	      type: constants.SET_LOADING,
	      component: component,
	      isLoading: isLoading
	    };
	  }

	  function setError(component, error) {
	    return {
	      type: constants.SET_ERROR,
	      component: component,
	      error: error
	    };
	  }

	  function setTimestamp(component, timestamp) {
	    return {
	      type: constants.SET_TIMESTAMP,
	      component: component,
	      timestamp: timestamp
	    };
	  }

	  function setStreaming(component) {
	    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    var ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	    return {
	      type: constants.SET_STREAMING,
	      component: component,
	      status: status,
	      ref: ref
	    };
	  }

	  function setHeaders(headers) {
	    return {
	      type: constants.SET_HEADERS,
	      headers: headers
	    };
	  }

	  function setPromotedResults() {
	    var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    return {
	      type: constants.SET_PROMOTED_RESULTS,
	      results: results
	    };
	  }

	  function setSearchId() {
	    var searchId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	    return {
	      type: constants.SET_SEARCH_ID,
	      searchId: searchId
	    };
	  }

	  function setSuggestionsSearchId() {
	    var searchId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	    return {
	      type: constants.SET_SUGGESTIONS_SEARCH_ID,
	      searchId: searchId
	    };
	  }

	  function msearch(query, orderOfQueries) {
	    var appendToHits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	    var isInternalComponent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	    var appendToAggs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
	    var componentType = arguments[5];
	    return function (dispatch, getState) {
	      var _getState = getState(),
	          appbaseRef = _getState.appbaseRef,
	          config = _getState.config,
	          headers = _getState.headers,
	          queryListener = _getState.queryListener,
	          analytics$1 = _getState.analytics,
	          selectedValues = _getState.selectedValues;

	      var searchHeaders = {};
	      var suggestionsComponents = [constants$1.componentTypes.dataSearch, constants$1.componentTypes.categorySearch];
	      var isSuggestionsQuery = isInternalComponent && suggestionsComponents.indexOf(componentType) !== -1;

	      if (config.analytics) {
	        if (config.analyticsConfig.suggestionAnalytics && isSuggestionsQuery) {
	          var suggestionsSearchValue = analytics$1.suggestionsSearchValue;
	          var shouldIncludeQuery = !!(config.analyticsConfig.emptyQuery || suggestionsSearchValue);

	          if (shouldIncludeQuery) {
	            searchHeaders = {
	              'X-Search-Query': suggestionsSearchValue || ''
	            };
	          }
	        } else {
	          var searchValue = analytics$1.searchValue,
	              searchId = analytics$1.searchId;
	          var filterString = (0, _analytics2["default"])(selectedValues);

	          if (searchId) {
	            searchHeaders = _extends({
	              'X-Search-Id': searchId,
	              'X-Search-Query': searchValue
	            }, filterString && {
	              'X-Search-Filters': filterString
	            });
	          } else {
	            var _shouldIncludeQuery = !!(config.analyticsConfig.emptyQuery || searchValue);

	            searchHeaders = _extends(_shouldIncludeQuery && {
	              'X-Search-Query': searchValue || ''
	            }, filterString && {
	              'X-Search-Filters': filterString
	            });
	          }
	        }

	        if (config.analyticsConfig.searchStateHeader) {
	          var searchState = (0, helper.getSearchState)(getState(), true);

	          if (searchState && Object.keys(searchState).length) {
	            searchHeaders['X-Search-State'] = JSON.stringify(searchState);
	          }
	        }

	        if (config.analyticsConfig.userId) {
	          searchHeaders['X-User-Id'] = config.analyticsConfig.userId;
	        }

	        if (config.analyticsConfig.customEvents) {
	          searchHeaders['X-Search-CustomEvent'] = (0, analytics.parseCustomEvents)(config.analyticsConfig.customEvents);
	        }
	      }

	      orderOfQueries.forEach(function (component) {
	        dispatch(setLoading(component, true));
	      });

	      var handleTransformResponse = function handleTransformResponse(res, component) {
	        if (config.transformResponse && typeof config.transformResponse === 'function') {
	          return config.transformResponse(res, component);
	        }

	        return new Promise(function (resolve) {
	          return resolve(res);
	        });
	      };

	      var handleError = function handleError(error) {
	        console.error(error);
	        orderOfQueries.forEach(function (component) {
	          if (queryListener[component] && queryListener[component].onError) {
	            queryListener[component].onError(error);
	          }

	          dispatch(setError(component, error));
	          dispatch(setLoading(component, false));
	        });
	      };

	      var handleResponse = function handleResponse(res) {
	        var searchId = res._headers ? res._headers.get('X-Search-Id') : null;

	        if (searchId) {
	          if (isSuggestionsQuery) {
	            dispatch(setSuggestionsSearchId(searchId));
	          } else {
	            dispatch(setSearchId(searchId));
	          }
	        }

	        orderOfQueries.forEach(function (component, index) {
	          handleTransformResponse(res.responses[index], component).then(function (response) {
	            var _getState2 = getState(),
	                timestamp = _getState2.timestamp;

	            if (timestamp[component] === undefined || timestamp[component] < res._timestamp) {
	              if (response.promoted) {
	                dispatch(setPromotedResults(response.promoted));
	              } else {
	                dispatch(setPromotedResults());
	              }

	              if (response.hits) {
	                dispatch(setTimestamp(component, res._timestamp));
	                dispatch((0, hits.updateHits)(component, response.hits, response.took, appendToHits));
	                dispatch(setLoading(component, false));
	              }

	              if (response.aggregations) {
	                dispatch((0, hits.updateAggs)(component, response.aggregations, appendToAggs));
	              }
	            }
	          })["catch"](function (err) {
	            handleError(err);
	          });
	        });
	      };

	      if (config.graphQLUrl) {
	        (0, _graphQL2["default"])(config.graphQLUrl, config.url, config.credentials, config.app, query).then(function (res) {
	          handleResponse(res);
	        })["catch"](function (err) {
	          handleError(err);
	        });
	      } else {
	        appbaseRef.setHeaders(_extends({}, headers, searchHeaders));
	        appbaseRef.msearch({
	          type: config.type === '*' ? '' : config.type,
	          body: query
	        }).then(function (res) {
	          handleResponse(res);
	        })["catch"](function (err) {
	          handleError(err);
	        });
	      }
	    };
	  }

	  function executeQueryListener(listener, oldQuery, newQuery) {
	    if (listener && listener.onQueryChange) {
	      listener.onQueryChange(oldQuery, newQuery);
	    }
	  }

	  function executeQuery(componentId) {
	    var executeWatchList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    var mustExecuteMapQuery = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	    var componentType = arguments[3];
	    return function (dispatch, getState) {
	      var _getState3 = getState(),
	          queryLog = _getState3.queryLog,
	          stream = _getState3.stream,
	          appbaseRef = _getState3.appbaseRef,
	          config = _getState3.config,
	          mapData = _getState3.mapData,
	          watchMan = _getState3.watchMan,
	          dependencyTree = _getState3.dependencyTree,
	          queryList = _getState3.queryList,
	          queryOptions = _getState3.queryOptions,
	          queryListener = _getState3.queryListener;

	      var orderOfQueries = [];
	      var finalQuery = [];
	      var matchAllQuery = {
	        match_all: {}
	      };
	      var componentList = [componentId];

	      if (executeWatchList) {
	        var watchList = watchMan[componentId] || [];
	        componentList = [].concat(_toConsumableArray(componentList), _toConsumableArray(watchList));
	      }

	      componentList.forEach(function (component) {
	        var _buildQuery = (0, helper.buildQuery)(component, dependencyTree, queryList, queryOptions),
	            queryObj = _buildQuery.queryObj,
	            options = _buildQuery.options;

	        var validOptions = ['aggs', 'from', 'sort'];

	        if (queryObj && !!Object.keys(queryObj).length || options && Object.keys(options).some(function (item) {
	          return validOptions.includes(item);
	        })) {
	          if (!queryObj || queryObj && !Object.keys(queryObj).length) {
	            queryObj = _extends({}, matchAllQuery);
	          }

	          var currentQuery = _extends({
	            query: _extends({}, queryObj)
	          }, options, queryOptions[component]);

	          var queryToLog = _extends({
	            query: _extends({}, queryObj)
	          }, options, queryOptions[component]);

	          var oldQuery = queryLog[component];

	          if (mustExecuteMapQuery || !(0, helper.isEqual)(currentQuery, oldQuery)) {
	            orderOfQueries = [].concat(_toConsumableArray(orderOfQueries), [component]);
	            dispatch(logQuery(component, queryToLog));
	            var isMapComponent = Object.keys(mapData).includes(component);

	            if (isMapComponent && mapData[component].query) {
	              var existingQuery = currentQuery.query;
	              currentQuery.query = {
	                bool: {
	                  must: [existingQuery, mapData[component].query]
	                }
	              };

	              if (!mapData[component].persistMapQuery) {
	                dispatch((0, maps.updateMapData)(componentId, null, false));
	              }

	              var _getState4 = getState(),
	                  combinedLog = _getState4.combinedLog;

	              if ((0, helper.isEqual)(combinedLog[component], currentQuery)) return;
	              dispatch(logCombinedQuery(component, currentQuery));
	            }

	            executeQueryListener(queryListener[component], oldQuery, currentQuery);

	            if (stream[component] && stream[component].status) {
	              if (stream[component].ref) {
	                stream[component].ref.stop();
	              }

	              var ref = appbaseRef.searchStream({
	                type: config.type === '*' ? '' : config.type,
	                body: currentQuery
	              }, function (response) {
	                if (response._id) {
	                  dispatch((0, hits.pushToStreamHits)(component, response));
	                }
	              }, function (error) {
	                if (queryListener[component] && queryListener[component].onError) {
	                  queryListener[component].onError(error);
	                }

	                console.warn(error);
	                dispatch(setError(component, error));
	                dispatch(setLoading(component, false));
	              });
	              dispatch(setStreaming(component, true, ref));
	            }

	            finalQuery = [].concat(_toConsumableArray(finalQuery), [{
	              preference: component
	            }, currentQuery]);
	          }
	        }
	      });

	      if (finalQuery.length) {
	        dispatch(msearch(finalQuery, orderOfQueries, false, componentId.endsWith('__internal'), undefined, componentType));
	      }
	    };
	  }

	  function setQueryOptions(component, queryOptions) {
	    var execute = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	    return function (dispatch) {
	      dispatch(updateQueryOptions(component, queryOptions));

	      if (execute) {
	        dispatch(executeQuery(component, true));
	      }
	    };
	  }

	  function updateQuery(_ref) {
	    var componentId = _ref.componentId,
	        query = _ref.query,
	        value$1 = _ref.value,
	        _ref$label = _ref.label,
	        label = _ref$label === undefined ? null : _ref$label,
	        _ref$showFilter = _ref.showFilter,
	        showFilter = _ref$showFilter === undefined ? true : _ref$showFilter,
	        _ref$URLParams = _ref.URLParams,
	        URLParams = _ref$URLParams === undefined ? false : _ref$URLParams,
	        _ref$componentType = _ref.componentType,
	        componentType = _ref$componentType === undefined ? null : _ref$componentType,
	        _ref$category = _ref.category,
	        category = _ref$category === undefined ? null : _ref$category;
	    var execute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    return function (dispatch) {
	      var queryToDispatch = query;

	      if (query && query.query) {
	        queryToDispatch = query.query;
	      }

	      if (!componentId.endsWith('__internal')) {
	        dispatch((0, value.setValue)(componentId, value$1, label, showFilter, URLParams, componentType, category));
	      }

	      dispatch(setQuery(componentId, queryToDispatch));
	      if (execute) dispatch(executeQuery(componentId, true, false, componentType));
	    };
	  }

	  function loadMore(component, newOptions) {
	    var appendToHits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	    var appendToAggs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	    return function (dispatch, getState) {
	      var store = getState();

	      var _buildQuery2 = (0, helper.buildQuery)(component, store.dependencyTree, store.queryList, store.queryOptions),
	          queryObj = _buildQuery2.queryObj,
	          options = _buildQuery2.options;

	      var queryLog = store.queryLog;
	      if (!options) options = {};
	      options = _extends({}, options, newOptions);

	      if (!queryObj || queryObj && !Object.keys(queryObj).length) {
	        queryObj = {
	          match_all: {}
	        };
	      }

	      var currentQuery = _extends({
	        query: _extends({}, queryObj)
	      }, options);

	      if ((0, helper.isEqual)(queryLog[component], currentQuery)) return;
	      dispatch(logQuery(component, currentQuery));
	      var finalQuery = [{
	        preference: component
	      }, currentQuery];
	      dispatch(msearch(finalQuery, [component], appendToHits, false, appendToAggs));
	    };
	  }

	  function setQueryListener(component, onQueryChange, onError) {
	    return {
	      type: constants.SET_QUERY_LISTENER,
	      component: component,
	      onQueryChange: onQueryChange,
	      onError: onError
	    };
	  }
	});
	unwrapExports(query);
	var query_1 = query.setQuery;
	var query_2 = query.updateQueryOptions;
	var query_3 = query.logQuery;
	var query_4 = query.logCombinedQuery;
	var query_5 = query.setStreaming;
	var query_6 = query.setHeaders;
	var query_7 = query.setPromotedResults;
	var query_8 = query.executeQuery;
	var query_9 = query.setQueryOptions;
	var query_10 = query.updateQuery;
	var query_11 = query.loadMore;
	var query_12 = query.setQueryListener;

	var component = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.addComponent = addComponent;
	  exports.removeComponent = removeComponent;
	  exports.watchComponent = watchComponent;

	  function addComponent(component) {
	    return {
	      type: constants.ADD_COMPONENT,
	      component: component
	    };
	  }

	  function removeComponent(component) {
	    return {
	      type: constants.REMOVE_COMPONENT,
	      component: component
	    };
	  }

	  function updateWatchman(component, react) {
	    return {
	      type: constants.WATCH_COMPONENT,
	      component: component,
	      react: react
	    };
	  }

	  function watchComponent(component, react) {
	    return function (dispatch) {
	      dispatch(updateWatchman(component, react));
	      dispatch((0, query.executeQuery)(component));
	    };
	  }
	});
	unwrapExports(component);
	var component_1 = component.addComponent;
	var component_2 = component.removeComponent;
	var component_3 = component.watchComponent;

	var props = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.setComponentProps = setComponentProps;
	  exports.updateComponentProps = updateComponentProps;
	  exports.removeComponentProps = removeComponentProps;

	  var getfilteredOptions = function getfilteredOptions() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var filteredOptions = {};
	    Object.keys(options).forEach(function (option) {
	      if (constants$1.validProps.includes(option)) {
	        filteredOptions[option] = options[option];
	      }
	    });
	    return filteredOptions;
	  };

	  function setComponentProps(component, options) {
	    return {
	      type: constants.SET_PROPS,
	      component: component,
	      options: getfilteredOptions(options)
	    };
	  }

	  function updateComponentProps(component, options) {
	    return {
	      type: constants.UPDATE_PROPS,
	      component: component,
	      options: getfilteredOptions(options)
	    };
	  }

	  function removeComponentProps(component) {
	    return {
	      type: constants.REMOVE_PROPS,
	      component: component
	    };
	  }
	});
	unwrapExports(props);
	var props_1 = props.setComponentProps;
	var props_2 = props.updateComponentProps;
	var props_3 = props.removeComponentProps;

	var analytics$1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.setSuggestionsSearchValue = setSuggestionsSearchValue;
	  exports.clearSuggestionsSearchValue = clearSuggestionsSearchValue;
	  exports.updateAnalyticsConfig = updateAnalyticsConfig;

	  function setSuggestionsSearchValue(value) {
	    return {
	      type: constants.SET_SUGGESTIONS_SEARCH_VALUE,
	      value: value
	    };
	  }

	  function clearSuggestionsSearchValue() {
	    return {
	      type: constants.CLEAR_SUGGESTIONS_SEARCH_VALUE
	    };
	  }

	  function updateAnalyticsConfig(analyticsConfig) {
	    return {
	      type: constants.UPDATE_ANALYTICS_CONFIG,
	      analyticsConfig: analyticsConfig
	    };
	  }
	});
	unwrapExports(analytics$1);
	var analytics_1$1 = analytics$1.setSuggestionsSearchValue;
	var analytics_2$1 = analytics$1.clearSuggestionsSearchValue;
	var analytics_3$1 = analytics$1.updateAnalyticsConfig;

	var actions = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  Object.keys(component).forEach(function (key) {
	    if (key === "default" || key === "__esModule") return;
	    Object.defineProperty(exports, key, {
	      enumerable: true,
	      get: function get() {
	        return component[key];
	      }
	    });
	  });
	  Object.keys(hits).forEach(function (key) {
	    if (key === "default" || key === "__esModule") return;
	    Object.defineProperty(exports, key, {
	      enumerable: true,
	      get: function get() {
	        return hits[key];
	      }
	    });
	  });
	  Object.keys(maps).forEach(function (key) {
	    if (key === "default" || key === "__esModule") return;
	    Object.defineProperty(exports, key, {
	      enumerable: true,
	      get: function get() {
	        return maps[key];
	      }
	    });
	  });
	  Object.keys(query).forEach(function (key) {
	    if (key === "default" || key === "__esModule") return;
	    Object.defineProperty(exports, key, {
	      enumerable: true,
	      get: function get() {
	        return query[key];
	      }
	    });
	  });
	  Object.keys(value).forEach(function (key) {
	    if (key === "default" || key === "__esModule") return;
	    Object.defineProperty(exports, key, {
	      enumerable: true,
	      get: function get() {
	        return value[key];
	      }
	    });
	  });
	  Object.keys(props).forEach(function (key) {
	    if (key === "default" || key === "__esModule") return;
	    Object.defineProperty(exports, key, {
	      enumerable: true,
	      get: function get() {
	        return props[key];
	      }
	    });
	  });
	  Object.keys(analytics$1).forEach(function (key) {
	    if (key === "default" || key === "__esModule") return;
	    Object.defineProperty(exports, key, {
	      enumerable: true,
	      get: function get() {
	        return analytics$1[key];
	      }
	    });
	  });
	});
	unwrapExports(actions);

	var suggestions = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
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

	  function _toConsumableArray(arr) {
	    if (Array.isArray(arr)) {
	      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	        arr2[i] = arr[i];
	      }

	      return arr2;
	    } else {
	      return Array.from(arr);
	    }
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
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

	  var flatten = function flatten(arr) {
	    return arr.reduce(function (flat, toFlatten) {
	      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	    }, []);
	  };

	  var extractSuggestion = function extractSuggestion(val) {
	    switch (typeof val) {
	      case 'string':
	        return val;

	      case 'object':
	        if (Array.isArray(val)) {
	          return flatten(val);
	        }

	        return null;

	      default:
	        return val;
	    }
	  };

	  var getSuggestions = function getSuggestions(fields, suggestions, currentValue) {
	    var suggestionProperties = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
	    var suggestionsList = [];
	    var labelsList = [];

	    var populateSuggestionsList = function populateSuggestionsList(val, parsedSource, source) {
	      var isWordMatch = currentValue.trim().split(' ').some(function (term) {
	        return String(val).toLowerCase().includes(term);
	      });

	      if (isWordMatch && !labelsList.includes(val)) {
	        var defaultOption = {
	          label: val,
	          value: val,
	          source: source
	        };
	        var additionalKeys = {};

	        if (Array.isArray(suggestionProperties) && suggestionProperties.length > 0) {
	          suggestionProperties.forEach(function (prop) {
	            if (parsedSource.hasOwnProperty(prop)) {
	              additionalKeys = _extends({}, additionalKeys, _defineProperty({}, prop, parsedSource[prop]));
	            }
	          });
	        }

	        var option = _extends({}, defaultOption, additionalKeys);

	        labelsList = [].concat(_toConsumableArray(labelsList), [val]);
	        suggestionsList = [].concat(_toConsumableArray(suggestionsList), [option]);
	      }
	    };

	    var parseField = function parseField(parsedSource, field) {
	      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : parsedSource;

	      if (typeof parsedSource === 'object') {
	        var fieldNodes = field.split('.');
	        var label = parsedSource[fieldNodes[0]];

	        if (label) {
	          if (fieldNodes.length > 1) {
	            var children = field.substring(fieldNodes[0].length + 1);

	            if (Array.isArray(label)) {
	              label.forEach(function (arrayItem) {
	                parseField(arrayItem, children, source);
	              });
	            } else {
	              parseField(label, children, source);
	            }
	          } else {
	            var val = extractSuggestion(label);

	            if (val) {
	              if (Array.isArray(val)) {
	                val.forEach(function (suggestion) {
	                  return populateSuggestionsList(suggestion, parsedSource, source);
	                });
	              } else {
	                populateSuggestionsList(val, parsedSource, source);
	              }
	            }
	          }
	        }
	      }
	    };

	    suggestions.forEach(function (item) {
	      var _score = item._score,
	          _index = item._index,
	          _type = item._type,
	          _id = item._id;

	      var source = _extends({}, item._source, {
	        _id: _id,
	        _index: _index,
	        _score: _score,
	        _type: _type
	      });

	      fields.forEach(function (field) {
	        parseField(source, field);
	      });
	    });
	    return suggestionsList;
	  };

	  exports["default"] = getSuggestions;
	});
	unwrapExports(suggestions);

	if (!Array.prototype.find) {
	  Object.defineProperty(Array.prototype, 'find', {
	    value: function value(predicate) {
	      if (this == null) {
	        throw new TypeError('"this" is null or not defined');
	      }

	      var o = Object(this);
	      var len = o.length >>> 0;

	      if (typeof predicate !== 'function') {
	        throw new TypeError('predicate must be a function');
	      }

	      var thisArg = arguments[1];
	      var k = 0;

	      while (k < len) {
	        var kValue = o[k];

	        if (predicate.call(thisArg, kValue, k, o)) {
	          return kValue;
	        }

	        k++;
	      }

	      return undefined;
	    },
	    configurable: true,
	    writable: true
	  });
	}

	if (!String.prototype.endsWith) {
	  String.prototype.endsWith = function (pattern) {
	    var d = this.length - pattern.length;
	    return d >= 0 && this.lastIndexOf(pattern) === d;
	  };
	}

	if (typeof Event !== 'function') {
	  var _Event = function _Event(event) {
	    var evt = document.createEvent('Event');
	    evt.initEvent(event, true, true);
	    return evt;
	  };

	  if (typeof window !== 'undefined') {
	    window.Event = _Event;
	  }
	}

	var polyfills = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	var causes_1 = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  var ENTER_PRESS = 'ENTER_PRESS';
	  var SUGGESTION_SELECT = 'SUGGESTION_SELECT';
	  var CLEAR_VALUE = 'CLEAR_VALUE';
	  var causes = {
	    ENTER_PRESS: ENTER_PRESS,
	    SUGGESTION_SELECT: SUGGESTION_SELECT,
	    CLEAR_VALUE: CLEAR_VALUE
	  };
	  exports["default"] = causes;
	});
	unwrapExports(causes_1);

	var lib = createCommonjsModule(function (module, exports) {
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.constants = exports.Reducers = exports.polyfills = exports.storeKey = exports.Actions = exports.suggestions = exports.causes = exports.helper = undefined;

	  var _extends = Object.assign || function (target) {
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

	  exports["default"] = configureStore;

	  var _reduxThunk2 = _interopRequireDefault(thunk);

	  var _reducers2 = _interopRequireDefault(reducers);

	  var Actions = _interopRequireWildcard(actions);

	  var helper$1 = _interopRequireWildcard(helper);

	  var _suggestions2 = _interopRequireDefault(suggestions);

	  var _constants3 = _interopRequireDefault(constants$1);

	  var _polyfills2 = _interopRequireDefault(polyfills);

	  var _causes2 = _interopRequireDefault(causes_1);

	  var _valueReducer2 = _interopRequireDefault(valueReducer_1);

	  var _queryReducer2 = _interopRequireDefault(queryReducer_1);

	  var _queryOptionsReducer2 = _interopRequireDefault(queryOptionsReducer_1);

	  var _dependencyTreeReducer2 = _interopRequireDefault(dependencyTreeReducer_1);

	  var _propsReducer2 = _interopRequireDefault(propsReducer);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj["default"] = obj;
	      return newObj;
	    }
	  }

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  }

	  var storeKey = constants.STORE_KEY;
	  var suggestions$1 = _suggestions2["default"];
	  var causes = _causes2["default"];
	  var Reducers = {
	    valueReducer: _valueReducer2["default"],
	    queryOptionsReducer: _queryOptionsReducer2["default"],
	    queryReducer: _queryReducer2["default"],
	    dependencyTreeReducer: _dependencyTreeReducer2["default"],
	    propsReducer: _propsReducer2["default"]
	  };
	  exports.helper = helper$1;
	  exports.causes = causes;
	  exports.suggestions = suggestions$1;
	  exports.Actions = Actions;
	  exports.storeKey = storeKey;
	  exports.polyfills = _polyfills2["default"];
	  exports.Reducers = Reducers;
	  exports.constants = _constants3["default"];
	  var composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : _redux.compose;
	  var enhancer = composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2["default"]));

	  function configureStore(initialState) {
	    var finalInitialState = _extends({}, initialState, {
	      config: _extends({}, initialState.config, {
	        analyticsConfig: initialState.config && initialState.config.analyticsConfig ? _extends({}, analytics.defaultAnalyticsConfig, initialState.config.analyticsConfig) : analytics.defaultAnalyticsConfig
	      })
	    });

	    return (0, _redux.createStore)(_reducers2["default"], finalInitialState, enhancer);
	  }
	});
	var configureStore = unwrapExports(lib);
	var lib_1 = lib.constants;
	var lib_2 = lib.Reducers;
	var lib_3 = lib.polyfills;
	var lib_4 = lib.storeKey;
	var lib_5 = lib.Actions;
	var lib_6 = lib.suggestions;
	var lib_7 = lib.causes;
	var lib_8 = lib.helper;

	function _extends() {
	  _extends = Object.assign || function (target) {
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

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	function _taggedTemplateLiteralLoose(strings, raw) {
	  if (!raw) {
	    raw = strings.slice(0);
	  }

	  strings.raw = raw;
	  return strings;
	}

	function _toPrimitive(input, hint) {
	  if (typeof input !== "object" || input === null) return input;
	  var prim = input[Symbol.toPrimitive];

	  if (prim !== undefined) {
	    var res = prim.call(input, hint || "default");
	    if (typeof res !== "object") return res;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }

	  return (hint === "string" ? String : Number)(input);
	}

	function _toPropertyKey(arg) {
	  var key = _toPrimitive(arg, "string");

	  return typeof key === "symbol" ? key : String(key);
	}

	/** Detect free variable `global` from Node.js. */

	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
	var _freeGlobal = freeGlobal;

	/** Detect free variable `self`. */

	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	/** Used as a reference to the global object. */

	var root$1 = _freeGlobal || freeSelf || Function('return this')();
	var _root = root$1;

	/** Built-in value references. */

	var Symbol$1 = _root.Symbol;
	var _Symbol = Symbol$1;

	/** Used for built-in method references. */

	var objectProto = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty = objectProto.hasOwnProperty;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var nativeObjectToString = objectProto.toString;
	/** Built-in value references. */

	var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */

	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);

	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }

	  return result;
	}

	var _getRawTag = getRawTag;

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var nativeObjectToString$1 = objectProto$1.toString;
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */

	function objectToString(value) {
	  return nativeObjectToString$1.call(value);
	}

	var _objectToString = objectToString;

	/** `Object#toString` result references. */

	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';
	/** Built-in value references. */

	var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */

	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }

	  return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
	}

	var _baseGetTag = baseGetTag;

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function (arg) {
	    return func(transform(arg));
	  };
	}

	var _overArg = overArg;

	/** Built-in value references. */

	var getPrototype = _overArg(Object.getPrototypeOf, Object);
	var _getPrototype = getPrototype;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	var isObjectLike_1 = isObjectLike;

	/** `Object#toString` result references. */

	var objectTag = '[object Object]';
	/** Used for built-in method references. */

	var funcProto = Function.prototype,
	    objectProto$2 = Object.prototype;
	/** Used to resolve the decompiled source of functions. */

	var funcToString = funcProto.toString;
	/** Used to check objects for own properties. */

	var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
	/** Used to infer the `Object` constructor. */

	var objectCtorString = funcToString.call(Object);
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */

	function isPlainObject$1(value) {
	  if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag) {
	    return false;
	  }

	  var proto = _getPrototype(value);

	  if (proto === null) {
	    return true;
	  }

	  var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
	}

	var isPlainObject_1 = isPlainObject$1;

	var ObjProto = Object.prototype;
	var toString = ObjProto.toString;
	var hasOwn = ObjProto.hasOwnProperty;
	var FN_MATCH_REGEXP = /^\s*function (\w+)/; // https://github.com/vuejs/vue/blob/dev/src/core/util/props.js#L177

	var getType = function getType(fn) {
	  var type = fn !== null && fn !== undefined ? fn.type ? fn.type : fn : null;
	  var match = type && type.toString().match(FN_MATCH_REGEXP);
	  return match && match[1];
	};
	var getNativeType = function getNativeType(value) {
	  if (value === null || value === undefined) return null;
	  var match = value.constructor.toString().match(FN_MATCH_REGEXP);
	  return match && match[1];
	};
	/**
	 * No-op function
	 */

	var noop = function noop() {};
	/**
	 * Determines whether the passed value is an integer. Uses `Number.isInteger` if available
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
	 * @param {*} value - The value to be tested for being an integer.
	 * @returns {boolean}
	 */

	var isInteger = Number.isInteger || function (value) {
	  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
	};
	/**
	 * Determines whether the passed value is an Array.
	 *
	 * @param {*} value - The value to be tested for being an array.
	 * @returns {boolean}
	 */

	var isArray = Array.isArray || function (value) {
	  return toString.call(value) === '[object Array]';
	};
	/**
	 * Checks if a value is a function
	 *
	 * @param {any} value - Value to check
	 * @returns {boolean}
	 */

	var isFunction = function isFunction(value) {
	  return toString.call(value) === '[object Function]';
	};
	/**
	 * Adds a `def` method to the object returning a new object with passed in argument as `default` property
	 *
	 * @param {object} type - Object to enhance
	 * @returns {object} the passed-in prop type
	 */

	var withDefault = function withDefault(type) {
	  return Object.defineProperty(type, 'def', {
	    value: function value(def) {
	      if (def === undefined && !this["default"]) {
	        return this;
	      }

	      if (!isFunction(def) && !validateType(this, def)) {
	        warn(this._vueTypes_name + " - invalid default value: \"" + def + "\"", def);
	        return this;
	      }

	      if (isArray(def)) {
	        this["default"] = function () {
	          return [].concat(def);
	        };
	      } else if (isPlainObject_1(def)) {
	        this["default"] = function () {
	          return Object.assign({}, def);
	        };
	      } else {
	        this["default"] = def;
	      }

	      return this;
	    },
	    enumerable: false,
	    writable: false
	  });
	};
	/**
	 * Adds a `isRequired` getter returning a new object with `required: true` key-value
	 *
	 * @param {object} type - Object to enhance
	 * @returns {object} the passed-in prop type
	 */

	var withRequired = function withRequired(type) {
	  return Object.defineProperty(type, 'isRequired', {
	    get: function get() {
	      this.required = true;
	      return this;
	    },
	    enumerable: false
	  });
	};
	/**
	 * Adds a validate method useful to set the prop `validator` function.
	 *
	 * @param {object} type Prop type to extend
	 * @returns {object} the passed-in prop type
	 */

	var withValidate = function withValidate(type) {
	  return Object.defineProperty(type, 'validate', {
	    value: function value(fn) {
	      this.validator = fn.bind(this);
	      return this;
	    },
	    enumerable: false
	  });
	};
	/**
	 * Adds `isRequired` and `def` modifiers to an object
	 *
	 * @param {string} name - Type internal name
	 * @param {object} obj - Object to enhance
	 * @returns {object}
	 */

	var toType = function toType(name, obj, validateFn) {
	  if (validateFn === void 0) {
	    validateFn = false;
	  }

	  Object.defineProperty(obj, '_vueTypes_name', {
	    enumerable: false,
	    writable: false,
	    value: name
	  });
	  withDefault(withRequired(obj));

	  if (validateFn) {
	    withValidate(obj);
	  }

	  if (isFunction(obj.validator)) {
	    obj.validator = obj.validator.bind(obj);
	  }

	  return obj;
	};
	/**
	 * Validates a given value against a prop type object
	 *
	 * @param {Object|*} type - Type to use for validation. Either a type object or a constructor
	 * @param {*} value - Value to check
	 * @param {boolean} silent - Silence warnings
	 * @returns {boolean}
	 */

	var validateType = function validateType(type, value, silent) {
	  if (silent === void 0) {
	    silent = false;
	  }

	  var typeToCheck = type;
	  var valid = true;
	  var expectedType;

	  if (!isPlainObject_1(type)) {
	    typeToCheck = {
	      type: type
	    };
	  }

	  var namePrefix = typeToCheck._vueTypes_name ? typeToCheck._vueTypes_name + ' - ' : '';

	  if (hasOwn.call(typeToCheck, 'type') && typeToCheck.type !== null) {
	    if (isArray(typeToCheck.type)) {
	      valid = typeToCheck.type.some(function (type) {
	        return validateType(type, value, true);
	      });
	      expectedType = typeToCheck.type.map(function (type) {
	        return getType(type);
	      }).join(' or ');
	    } else {
	      expectedType = getType(typeToCheck);

	      if (expectedType === 'Array') {
	        valid = isArray(value);
	      } else if (expectedType === 'Object') {
	        valid = isPlainObject_1(value);
	      } else if (expectedType === 'String' || expectedType === 'Number' || expectedType === 'Boolean' || expectedType === 'Function') {
	        valid = getNativeType(value) === expectedType;
	      } else {
	        valid = value instanceof typeToCheck.type;
	      }
	    }
	  }

	  if (!valid) {
	    silent === false && warn(namePrefix + "value \"" + value + "\" should be of type \"" + expectedType + "\"");
	    return false;
	  }

	  if (hasOwn.call(typeToCheck, 'validator') && isFunction(typeToCheck.validator)) {
	    // swallow warn
	    var oldWarn;

	    if (silent) {
	      oldWarn = warn;
	      warn = noop;
	    }

	    valid = typeToCheck.validator(value);
	    oldWarn && (warn = oldWarn);
	    if (!valid && silent === false) warn(namePrefix + "custom validation failed");
	    return valid;
	  }

	  return valid;
	};
	var warn = noop;

	{
	  var hasConsole = typeof console !== 'undefined';
	  warn = hasConsole ? function (msg) {
	    Vue.config.silent === false && console.warn("[VueTypes warn]: " + msg);
	  } : noop;
	}

	var typeDefaults = function typeDefaults() {
	  return {
	    func: function func() {},
	    bool: true,
	    string: '',
	    number: 0,
	    array: function array() {
	      return [];
	    },
	    object: function object() {
	      return {};
	    },
	    integer: 0
	  };
	};

	var setDefaults = function setDefaults(root) {
	  var currentDefaults = typeDefaults();
	  return Object.defineProperty(root, 'sensibleDefaults', {
	    enumerable: false,
	    set: function set(value) {
	      if (value === false) {
	        currentDefaults = {};
	      } else if (value === true) {
	        currentDefaults = typeDefaults();
	      } else {
	        currentDefaults = value;
	      }
	    },
	    get: function get() {
	      return currentDefaults;
	    }
	  });
	};

	function _objectWithoutPropertiesLoose$1(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}
	var VueTypes = {
	  get any() {
	    return toType('any', {
	      type: null
	    }, true);
	  },

	  get func() {
	    return toType('function', {
	      type: Function
	    }, true).def(VueTypes.sensibleDefaults.func);
	  },

	  get bool() {
	    return toType('boolean', {
	      type: Boolean
	    }, true).def(VueTypes.sensibleDefaults.bool);
	  },

	  get string() {
	    return toType('string', {
	      type: String
	    }, true).def(VueTypes.sensibleDefaults.string);
	  },

	  get number() {
	    return toType('number', {
	      type: Number
	    }, true).def(VueTypes.sensibleDefaults.number);
	  },

	  get array() {
	    return toType('array', {
	      type: Array
	    }, true).def(VueTypes.sensibleDefaults.array);
	  },

	  get object() {
	    return toType('object', {
	      type: Object
	    }, true).def(VueTypes.sensibleDefaults.object);
	  },

	  get integer() {
	    return toType('integer', {
	      type: Number,
	      validator: function validator(value) {
	        return isInteger(value);
	      }
	    }).def(VueTypes.sensibleDefaults.integer);
	  },

	  get symbol() {
	    return toType('symbol', {
	      type: null,
	      validator: function validator(value) {
	        return typeof value === 'symbol';
	      }
	    }, true);
	  },

	  extend: function extend(props) {
	    if (props === void 0) {
	      props = {};
	    }

	    var _props = props,
	        name = _props.name,
	        _props$validate = _props.validate,
	        validate = _props$validate === void 0 ? false : _props$validate,
	        _props$getter = _props.getter,
	        getter = _props$getter === void 0 ? false : _props$getter,
	        type = _objectWithoutPropertiesLoose$1(_props, ["name", "validate", "getter"]);

	    var descriptor;

	    if (getter) {
	      descriptor = {
	        get: function get() {
	          return toType(name, type, validate);
	        },
	        enumerable: true,
	        configurable: false
	      };
	    } else {
	      var validator = type.validator;
	      descriptor = {
	        value: function value() {
	          if (validator) {
	            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	              args[_key] = arguments[_key];
	            }

	            type.validator = validator.bind.apply(validator, [this].concat(args));
	          }

	          return toType(name, type, validate);
	        },
	        writable: false,
	        enumerable: true,
	        configurable: false
	      };
	    }

	    return Object.defineProperty(this, name, descriptor);
	  },
	  custom: function custom(validatorFn, warnMsg) {
	    if (warnMsg === void 0) {
	      warnMsg = 'custom validation failed';
	    }

	    if (typeof validatorFn !== 'function') {
	      throw new TypeError('[VueTypes error]: You must provide a function as argument');
	    }

	    return toType(validatorFn.name || '<<anonymous function>>', {
	      validator: function validator(value) {
	        var valid = validatorFn(value);
	        if (!valid) warn(this._vueTypes_name + " - " + warnMsg);
	        return valid;
	      }
	    });
	  },
	  oneOf: function oneOf(arr) {
	    if (!isArray(arr)) {
	      throw new TypeError('[VueTypes error]: You must provide an array as argument');
	    }

	    var msg = "oneOf - value should be one of \"" + arr.join('", "') + "\"";
	    var allowedTypes = arr.reduce(function (ret, v) {
	      if (v !== null && v !== undefined) {
	        ret.indexOf(v.constructor) === -1 && ret.push(v.constructor);
	      }

	      return ret;
	    }, []);
	    return toType('oneOf', {
	      type: allowedTypes.length > 0 ? allowedTypes : null,
	      validator: function validator(value) {
	        var valid = arr.indexOf(value) !== -1;
	        if (!valid) warn(msg);
	        return valid;
	      }
	    });
	  },
	  instanceOf: function instanceOf(instanceConstructor) {
	    return toType('instanceOf', {
	      type: instanceConstructor
	    });
	  },
	  oneOfType: function oneOfType(arr) {
	    if (!isArray(arr)) {
	      throw new TypeError('[VueTypes error]: You must provide an array as argument');
	    }

	    var hasCustomValidators = false;
	    var nativeChecks = arr.reduce(function (ret, type, i) {
	      if (isPlainObject_1(type)) {
	        if (type._vueTypes_name === 'oneOf') {
	          return ret.concat(type.type || []);
	        }

	        if (type.type && !isFunction(type.validator)) {
	          if (isArray(type.type)) return ret.concat(type.type);
	          ret.push(type.type);
	        } else if (isFunction(type.validator)) {
	          hasCustomValidators = true;
	        }

	        return ret;
	      }

	      ret.push(type);
	      return ret;
	    }, []);

	    if (!hasCustomValidators) {
	      // we got just native objects (ie: Array, Object)
	      // delegate to Vue native prop check
	      return toType('oneOfType', {
	        type: nativeChecks
	      });
	    }

	    var typesStr = arr.map(function (type) {
	      if (type && isArray(type.type)) {
	        return type.type.map(getType);
	      }

	      return getType(type);
	    }).reduce(function (ret, type) {
	      return ret.concat(isArray(type) ? type : [type]);
	    }, []).join('", "');
	    return this.custom(function oneOfType(value) {
	      var valid = arr.some(function (type) {
	        if (type._vueTypes_name === 'oneOf') {
	          return type.type ? validateType(type.type, value, true) : true;
	        }

	        return validateType(type, value, true);
	      });
	      if (!valid) warn("oneOfType - value type should be one of \"" + typesStr + "\"");
	      return valid;
	    });
	  },
	  arrayOf: function arrayOf(type) {
	    return toType('arrayOf', {
	      type: Array,
	      validator: function validator(values) {
	        var valid = values.every(function (value) {
	          return validateType(type, value);
	        });
	        if (!valid) warn("arrayOf - value must be an array of \"" + getType(type) + "\"");
	        return valid;
	      }
	    });
	  },
	  objectOf: function objectOf(type) {
	    return toType('objectOf', {
	      type: Object,
	      validator: function validator(obj) {
	        var valid = Object.keys(obj).every(function (key) {
	          return validateType(type, obj[key]);
	        });
	        if (!valid) warn("objectOf - value must be an object of \"" + getType(type) + "\"");
	        return valid;
	      }
	    });
	  },
	  shape: function shape(obj) {
	    var keys = Object.keys(obj);
	    var requiredKeys = keys.filter(function (key) {
	      return obj[key] && obj[key].required === true;
	    });
	    var type = toType('shape', {
	      type: Object,
	      validator: function validator(value) {
	        var _this = this;

	        if (!isPlainObject_1(value)) {
	          return false;
	        }

	        var valueKeys = Object.keys(value); // check for required keys (if any)

	        if (requiredKeys.length > 0 && requiredKeys.some(function (req) {
	          return valueKeys.indexOf(req) === -1;
	        })) {
	          warn("shape - at least one of required properties \"" + requiredKeys.join('", "') + "\" is not present");
	          return false;
	        }

	        return valueKeys.every(function (key) {
	          if (keys.indexOf(key) === -1) {
	            if (_this._vueTypes_isLoose === true) return true;
	            warn("shape - object is missing \"" + key + "\" property");
	            return false;
	          }

	          var type = obj[key];
	          return validateType(type, value[key]);
	        });
	      }
	    });
	    Object.defineProperty(type, '_vueTypes_isLoose', {
	      enumerable: false,
	      writable: true,
	      value: false
	    });
	    Object.defineProperty(type, 'loose', {
	      get: function get() {
	        this._vueTypes_isLoose = true;
	        return this;
	      },
	      enumerable: false
	    });
	    return type;
	  }
	};
	setDefaults(VueTypes);
	VueTypes.utils = {
	  validate: function validate(value, type) {
	    return validateType(type, value, true);
	  },
	  toType: toType
	};

	function memoize(fn) {
	  var cache = {};
	  return function (arg) {
	    if (cache[arg] === undefined) cache[arg] = fn(arg);
	    return cache[arg];
	  };
	}

	var unitlessKeys = {
	  animationIterationCount: 1,
	  borderImageOutset: 1,
	  borderImageSlice: 1,
	  borderImageWidth: 1,
	  boxFlex: 1,
	  boxFlexGroup: 1,
	  boxOrdinalGroup: 1,
	  columnCount: 1,
	  columns: 1,
	  flex: 1,
	  flexGrow: 1,
	  flexPositive: 1,
	  flexShrink: 1,
	  flexNegative: 1,
	  flexOrder: 1,
	  gridRow: 1,
	  gridRowEnd: 1,
	  gridRowSpan: 1,
	  gridRowStart: 1,
	  gridColumn: 1,
	  gridColumnEnd: 1,
	  gridColumnSpan: 1,
	  gridColumnStart: 1,
	  fontWeight: 1,
	  lineHeight: 1,
	  opacity: 1,
	  order: 1,
	  orphans: 1,
	  tabSize: 1,
	  widows: 1,
	  zIndex: 1,
	  zoom: 1,
	  WebkitLineClamp: 1,
	  // SVG-related properties
	  fillOpacity: 1,
	  floodOpacity: 1,
	  stopOpacity: 1,
	  strokeDasharray: 1,
	  strokeDashoffset: 1,
	  strokeMiterlimit: 1,
	  strokeOpacity: 1,
	  strokeWidth: 1
	};

	/* eslint-disable */
	// murmurhash2 via https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
	function murmurhash2_32_gc(str) {
	  var l = str.length,
	      h = l ^ l,
	      i = 0,
	      k;

	  while (l >= 4) {
	    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
	    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	    k ^= k >>> 24;
	    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;
	    l -= 4;
	    ++i;
	  }

	  switch (l) {
	    case 3:
	      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

	    case 2:
	      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

	    case 1:
	      h ^= str.charCodeAt(i) & 0xff;
	      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	  }

	  h ^= h >>> 13;
	  h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	  h ^= h >>> 15;
	  return (h >>> 0).toString(36);
	}

	function stylis_min(W) {
	  function M(d, c, e, h, a) {
	    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
	      g = e.charCodeAt(l);
	      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

	      if (0 === b + n + v + m) {
	        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
	          switch (g) {
	            case 32:
	            case 9:
	            case 59:
	            case 13:
	            case 10:
	              break;

	            default:
	              f += e.charAt(l);
	          }

	          g = 59;
	        }

	        switch (g) {
	          case 123:
	            f = f.trim();
	            q = f.charCodeAt(0);
	            k = 1;

	            for (t = ++l; l < B;) {
	              switch (g = e.charCodeAt(l)) {
	                case 123:
	                  k++;
	                  break;

	                case 125:
	                  k--;
	                  break;

	                case 47:
	                  switch (g = e.charCodeAt(l + 1)) {
	                    case 42:
	                    case 47:
	                      a: {
	                        for (u = l + 1; u < J; ++u) {
	                          switch (e.charCodeAt(u)) {
	                            case 47:
	                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
	                                l = u + 1;
	                                break a;
	                              }

	                              break;

	                            case 10:
	                              if (47 === g) {
	                                l = u + 1;
	                                break a;
	                              }

	                          }
	                        }

	                        l = u;
	                      }

	                  }

	                  break;

	                case 91:
	                  g++;

	                case 40:
	                  g++;

	                case 34:
	                case 39:
	                  for (; l++ < J && e.charCodeAt(l) !== g;) {}

	              }

	              if (0 === k) break;
	              l++;
	            }

	            k = e.substring(t, l);
	            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

	            switch (q) {
	              case 64:
	                0 < r && (f = f.replace(N, ''));
	                g = f.charCodeAt(1);

	                switch (g) {
	                  case 100:
	                  case 109:
	                  case 115:
	                  case 45:
	                    r = c;
	                    break;

	                  default:
	                    r = O;
	                }

	                k = M(c, r, k, g, a + 1);
	                t = k.length;
	                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
	                if (0 < t) switch (g) {
	                  case 115:
	                    f = f.replace(da, ea);

	                  case 100:
	                  case 109:
	                  case 45:
	                    k = f + '{' + k + '}';
	                    break;

	                  case 107:
	                    f = f.replace(fa, '$1 $2');
	                    k = f + '{' + k + '}';
	                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
	                    break;

	                  default:
	                    k = f + k, 112 === h && (k = (p += k, ''));
	                } else k = '';
	                break;

	              default:
	                k = M(c, X(c, f, I), k, h, a + 1);
	            }

	            F += k;
	            k = I = r = u = q = 0;
	            f = '';
	            g = e.charCodeAt(++l);
	            break;

	          case 125:
	          case 59:
	            f = (0 < r ? f.replace(N, '') : f).trim();
	            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
	              case 0:
	                break;

	              case 64:
	                if (105 === g || 99 === g) {
	                  G += f + e.charAt(l);
	                  break;
	                }

	              default:
	                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
	            }
	            I = r = u = q = 0;
	            f = '';
	            g = e.charCodeAt(++l);
	        }
	      }

	      switch (g) {
	        case 13:
	        case 10:
	          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
	          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
	          z = 1;
	          D++;
	          break;

	        case 59:
	        case 125:
	          if (0 === b + n + v + m) {
	            z++;
	            break;
	          }

	        default:
	          z++;
	          y = e.charAt(l);

	          switch (g) {
	            case 9:
	            case 32:
	              if (0 === n + m + b) switch (x) {
	                case 44:
	                case 58:
	                case 9:
	                case 32:
	                  y = '';
	                  break;

	                default:
	                  32 !== g && (y = ' ');
	              }
	              break;

	            case 0:
	              y = '\\0';
	              break;

	            case 12:
	              y = '\\f';
	              break;

	            case 11:
	              y = '\\v';
	              break;

	            case 38:
	              0 === n + b + m && (r = I = 1, y = '\f' + y);
	              break;

	            case 108:
	              if (0 === n + b + m + E && 0 < u) switch (l - u) {
	                case 2:
	                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

	                case 8:
	                  111 === K && (E = K);
	              }
	              break;

	            case 58:
	              0 === n + b + m && (u = l);
	              break;

	            case 44:
	              0 === b + v + n + m && (r = 1, y += '\r');
	              break;

	            case 34:
	            case 39:
	              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
	              break;

	            case 91:
	              0 === n + b + v && m++;
	              break;

	            case 93:
	              0 === n + b + v && m--;
	              break;

	            case 41:
	              0 === n + b + m && v--;
	              break;

	            case 40:
	              if (0 === n + b + m) {
	                if (0 === q) switch (2 * x + 3 * K) {
	                  case 533:
	                    break;

	                  default:
	                    q = 1;
	                }
	                v++;
	              }

	              break;

	            case 64:
	              0 === b + v + n + m + u + k && (k = 1);
	              break;

	            case 42:
	            case 47:
	              if (!(0 < n + m + v)) switch (b) {
	                case 0:
	                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
	                    case 235:
	                      b = 47;
	                      break;

	                    case 220:
	                      t = l, b = 42;
	                  }

	                  break;

	                case 42:
	                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
	              }
	          }

	          0 === b && (f += y);
	      }

	      K = x;
	      x = g;
	      l++;
	    }

	    t = p.length;

	    if (0 < t) {
	      r = c;
	      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
	      p = r.join(',') + '{' + p + '}';

	      if (0 !== w * E) {
	        2 !== w || L(p, 2) || (E = 0);

	        switch (E) {
	          case 111:
	            p = p.replace(ha, ':-moz-$1') + p;
	            break;

	          case 112:
	            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
	        }

	        E = 0;
	      }
	    }

	    return G + p + F;
	  }

	  function X(d, c, e) {
	    var h = c.trim().split(ia);
	    c = h;
	    var a = h.length,
	        m = d.length;

	    switch (m) {
	      case 0:
	      case 1:
	        var b = 0;

	        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
	          c[b] = Z(d, c[b], e).trim();
	        }

	        break;

	      default:
	        var v = b = 0;

	        for (c = []; b < a; ++b) {
	          for (var n = 0; n < m; ++n) {
	            c[v++] = Z(d[n] + ' ', h[b], e).trim();
	          }
	        }

	    }

	    return c;
	  }

	  function Z(d, c, e) {
	    var h = c.charCodeAt(0);
	    33 > h && (h = (c = c.trim()).charCodeAt(0));

	    switch (h) {
	      case 38:
	        return c.replace(F, '$1' + d.trim());

	      case 58:
	        return d.trim() + c.replace(F, '$1' + d.trim());

	      default:
	        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
	    }

	    return d + c;
	  }

	  function P(d, c, e, h) {
	    var a = d + ';',
	        m = 2 * c + 3 * e + 4 * h;

	    if (944 === m) {
	      d = a.indexOf(':', 9) + 1;
	      var b = a.substring(d, a.length - 1).trim();
	      b = a.substring(0, d).trim() + b + ';';
	      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
	    }

	    if (0 === w || 2 === w && !L(a, 1)) return a;

	    switch (m) {
	      case 1015:
	        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

	      case 951:
	        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

	      case 963:
	        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

	      case 1009:
	        if (100 !== a.charCodeAt(4)) break;

	      case 969:
	      case 942:
	        return '-webkit-' + a + a;

	      case 978:
	        return '-webkit-' + a + '-moz-' + a + a;

	      case 1019:
	      case 983:
	        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

	      case 883:
	        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
	        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
	        break;

	      case 932:
	        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
	          case 103:
	            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

	          case 115:
	            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

	          case 98:
	            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
	        }
	        return '-webkit-' + a + '-ms-' + a + a;

	      case 964:
	        return '-webkit-' + a + '-ms-flex-' + a + a;

	      case 1023:
	        if (99 !== a.charCodeAt(8)) break;
	        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
	        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

	      case 1005:
	        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

	      case 1e3:
	        b = a.substring(13).trim();
	        c = b.indexOf('-') + 1;

	        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
	          case 226:
	            b = a.replace(G, 'tb');
	            break;

	          case 232:
	            b = a.replace(G, 'tb-rl');
	            break;

	          case 220:
	            b = a.replace(G, 'lr');
	            break;

	          default:
	            return a;
	        }

	        return '-webkit-' + a + '-ms-' + b + a;

	      case 1017:
	        if (-1 === a.indexOf('sticky', 9)) break;

	      case 975:
	        c = (a = d).length - 10;
	        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

	        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
	          case 203:
	            if (111 > b.charCodeAt(8)) break;

	          case 115:
	            a = a.replace(b, '-webkit-' + b) + ';' + a;
	            break;

	          case 207:
	          case 102:
	            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
	        }

	        return a + ';';

	      case 938:
	        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
	          case 105:
	            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

	          case 115:
	            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

	          default:
	            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
	        }
	        break;

	      case 973:
	      case 989:
	        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

	      case 931:
	      case 953:
	        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
	        break;

	      case 962:
	        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
	    }

	    return a;
	  }

	  function L(d, c) {
	    var e = d.indexOf(1 === c ? ':' : '{'),
	        h = d.substring(0, 3 !== c ? e : 10);
	    e = d.substring(e + 1, d.length - 1);
	    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
	  }

	  function ea(d, c) {
	    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
	    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
	  }

	  function H(d, c, e, h, a, m, b, v, n, q) {
	    for (var g = 0, x = c, w; g < A; ++g) {
	      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
	        case void 0:
	        case !1:
	        case !0:
	        case null:
	          break;

	        default:
	          x = w;
	      }
	    }

	    if (x !== c) return x;
	  }

	  function T(d) {
	    switch (d) {
	      case void 0:
	      case null:
	        A = S.length = 0;
	        break;

	      default:
	        switch (d.constructor) {
	          case Array:
	            for (var c = 0, e = d.length; c < e; ++c) {
	              T(d[c]);
	            }

	            break;

	          case Function:
	            S[A++] = d;
	            break;

	          case Boolean:
	            Y = !!d | 0;
	        }

	    }

	    return T;
	  }

	  function U(d) {
	    d = d.prefix;
	    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
	    return U;
	  }

	  function B(d, c) {
	    var e = d;
	    33 > e.charCodeAt(0) && (e = e.trim());
	    V = e;
	    e = [V];

	    if (0 < A) {
	      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
	      void 0 !== h && 'string' === typeof h && (c = h);
	    }

	    var a = M(O, e, c, 0, 0);
	    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
	    V = '';
	    E = 0;
	    z = D = 1;
	    return a;
	  }

	  var ca = /^\0+/g,
	      N = /[\0\r\f]/g,
	      aa = /: */g,
	      ka = /zoo|gra/,
	      ma = /([,: ])(transform)/g,
	      ia = /,\r+?/g,
	      F = /([\t\r\n ])*\f?&/g,
	      fa = /@(k\w+)\s*(\S*)\s*/,
	      Q = /::(place)/g,
	      ha = /:(read-only)/g,
	      G = /[svh]\w+-[tblr]{2}/,
	      da = /\(\s*(.*)\s*\)/g,
	      oa = /([\s\S]*?);/g,
	      ba = /-self|flex-/g,
	      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
	      la = /stretch|:\s*\w+\-(?:conte|avail)/,
	      ja = /([^-])(image-set\()/,
	      z = 1,
	      D = 1,
	      E = 0,
	      w = 1,
	      O = [],
	      S = [],
	      A = 0,
	      R = null,
	      Y = 0,
	      V = '';
	  B.use = T;
	  B.set = U;
	  void 0 !== W && U(W);
	  return B;
	}

	var stylisRuleSheet = createCommonjsModule(function (module, exports) {
	  (function (factory) {
	     module['exports'] = factory() ;
	  })(function () {

	    return function (insertRule) {
	      var delimiter = '/*|*/';
	      var needle = delimiter + '}';

	      function toSheet(block) {
	        if (block) try {
	          insertRule(block + '}');
	        } catch (e) {}
	      }

	      return function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
	        switch (context) {
	          // property
	          case 1:
	            // @import
	            if (depth === 0 && content.charCodeAt(0) === 64) return insertRule(content + ';'), '';
	            break;
	          // selector

	          case 2:
	            if (ns === 0) return content + delimiter;
	            break;
	          // at-rule

	          case 3:
	            switch (ns) {
	              // @font-face, @page
	              case 102:
	              case 112:
	                return insertRule(selectors[0] + content), '';

	              default:
	                return content + (at === 0 ? delimiter : '');
	            }

	          case -2:
	            content.split(needle).forEach(toSheet);
	        }
	      };
	    };
	  });
	});

	var hyphenateRegex = /[A-Z]|^ms/g;
	var processStyleName = memoize(function (styleName) {
	  return styleName.replace(hyphenateRegex, '-$&').toLowerCase();
	});

	var processStyleValue = function processStyleValue(key, value) {
	  if (value == null || typeof value === 'boolean') {
	    return '';
	  }

	  if (unitlessKeys[key] !== 1 && key.charCodeAt(1) !== 45 && // custom properties
	  !isNaN(value) && value !== 0) {
	    return value + 'px';
	  }

	  return value;
	};

	{
	  var contentValuePattern = /(attr|calc|counters?|url)\(/;
	  var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit', 'unset'];
	  var oldProcessStyleValue = processStyleValue;

	  processStyleValue = function processStyleValue(key, value) {
	    if (key === 'content') {
	      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
	        console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
	      }
	    }

	    return oldProcessStyleValue(key, value);
	  };
	}

	var classnames = function classnames(args) {
	  var len = args.length;
	  var i = 0;
	  var cls = '';

	  for (; i < len; i++) {
	    var arg = args[i];
	    if (arg == null) continue;
	    var toAdd = void 0;

	    switch (typeof arg) {
	      case 'boolean':
	        break;

	      case 'function':
	        {
	          console.error('Passing functions to cx is deprecated and will be removed in the next major version of Emotion.\n' + 'Please call the function before passing it to cx.');
	        }

	        toAdd = classnames([arg()]);
	        break;

	      case 'object':
	        {
	          if (Array.isArray(arg)) {
	            toAdd = classnames(arg);
	          } else {
	            toAdd = '';

	            for (var k in arg) {
	              if (arg[k] && k) {
	                toAdd && (toAdd += ' ');
	                toAdd += k;
	              }
	            }
	          }

	          break;
	        }

	      default:
	        {
	          toAdd = arg;
	        }
	    }

	    if (toAdd) {
	      cls && (cls += ' ');
	      cls += toAdd;
	    }
	  }

	  return cls;
	};

	var isBrowser = typeof document !== 'undefined';
	/*

	high performance StyleSheet for css-in-js systems

	- uses multiple style tags behind the scenes for millions of rules
	- uses `insertRule` for appending in production for *much* faster performance
	- 'polyfills' on server side

	// usage

	import StyleSheet from 'glamor/lib/sheet'
	let styleSheet = new StyleSheet()

	styleSheet.inject()
	- 'injects' the stylesheet into the page (or into memory if on server)

	styleSheet.insert('#box { border: 1px solid red; }')
	- appends a css rule into the stylesheet

	styleSheet.flush()
	- empties the stylesheet of all its contents

	*/
	// $FlowFixMe

	function sheetForTag(tag) {
	  if (tag.sheet) {
	    // $FlowFixMe
	    return tag.sheet;
	  } // this weirdness brought to you by firefox


	  for (var i = 0; i < document.styleSheets.length; i++) {
	    if (document.styleSheets[i].ownerNode === tag) {
	      // $FlowFixMe
	      return document.styleSheets[i];
	    }
	  }
	}

	function makeStyleTag(opts) {
	  var tag = document.createElement('style');
	  tag.setAttribute('data-emotion', opts.key || '');

	  if (opts.nonce !== undefined) {
	    tag.setAttribute('nonce', opts.nonce);
	  }

	  tag.appendChild(document.createTextNode('')) // $FlowFixMe
	  ;
	  (opts.container !== undefined ? opts.container : document.head).appendChild(tag);
	  return tag;
	}

	var StyleSheet =
	/*#__PURE__*/
	function () {
	  function StyleSheet(options) {
	    this.isSpeedy = "development" === 'production'; // the big drawback here is that the css won't be editable in devtools

	    this.tags = [];
	    this.ctr = 0;
	    this.opts = options;
	  }

	  var _proto = StyleSheet.prototype;

	  _proto.inject = function inject() {
	    if (this.injected) {
	      throw new Error('already injected!');
	    }

	    this.tags[0] = makeStyleTag(this.opts);
	    this.injected = true;
	  };

	  _proto.speedy = function speedy(bool) {
	    if (this.ctr !== 0) {
	      // cannot change speedy mode after inserting any rule to sheet. Either call speedy(${bool}) earlier in your app, or call flush() before speedy(${bool})
	      throw new Error("cannot change speedy now");
	    }

	    this.isSpeedy = !!bool;
	  };

	  _proto.insert = function insert(rule, sourceMap) {
	    // this is the ultrafast version, works across browsers
	    if (this.isSpeedy) {
	      var tag = this.tags[this.tags.length - 1];
	      var sheet = sheetForTag(tag);

	      try {
	        sheet.insertRule(rule, sheet.cssRules.length);
	      } catch (e) {
	        {
	          console.warn('illegal rule', rule); // eslint-disable-line no-console
	        }
	      }
	    } else {
	      var _tag = makeStyleTag(this.opts);

	      this.tags.push(_tag);

	      _tag.appendChild(document.createTextNode(rule + (sourceMap || '')));
	    }

	    this.ctr++;

	    if (this.ctr % 65000 === 0) {
	      this.tags.push(makeStyleTag(this.opts));
	    }
	  };

	  _proto.flush = function flush() {
	    // $FlowFixMe
	    this.tags.forEach(function (tag) {
	      return tag.parentNode.removeChild(tag);
	    });
	    this.tags = [];
	    this.ctr = 0; // todo - look for remnants in document.styleSheets

	    this.injected = false;
	  };

	  return StyleSheet;
	}();

	function createEmotion(context, options) {
	  if (context.__SECRET_EMOTION__ !== undefined) {
	    return context.__SECRET_EMOTION__;
	  }

	  if (options === undefined) options = {};
	  var key = options.key || 'css';

	  {
	    if (/[^a-z-]/.test(key)) {
	      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
	    }
	  }

	  var current;

	  function insertRule(rule) {
	    current += rule;

	    if (isBrowser) {
	      sheet.insert(rule, currentSourceMap);
	    }
	  }

	  var insertionPlugin = stylisRuleSheet(insertRule);
	  var stylisOptions;

	  if (options.prefix !== undefined) {
	    stylisOptions = {
	      prefix: options.prefix
	    };
	  }

	  var caches = {
	    registered: {},
	    inserted: {},
	    nonce: options.nonce,
	    key: key
	  };
	  var sheet = new StyleSheet(options);

	  if (isBrowser) {
	    // 🚀
	    sheet.inject();
	  }

	  var stylis = new stylis_min(stylisOptions);
	  stylis.use(options.stylisPlugins)(insertionPlugin);
	  var currentSourceMap = '';

	  function handleInterpolation(interpolation, couldBeSelectorInterpolation) {
	    if (interpolation == null) {
	      return '';
	    }

	    switch (typeof interpolation) {
	      case 'boolean':
	        return '';

	      case 'function':
	        if (interpolation.__emotion_styles !== undefined) {
	          var selector = interpolation.toString();

	          if (selector === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
	            throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
	          }

	          return selector;
	        }

	        if (this === undefined && "development" !== 'production') {
	          console.error('Interpolating functions in css calls is deprecated and will be removed in the next major version of Emotion.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
	        }

	        return handleInterpolation.call(this, this === undefined ? interpolation() : // $FlowFixMe
	        interpolation(this.mergedProps, this.context), couldBeSelectorInterpolation);

	      case 'object':
	        return createStringFromObject.call(this, interpolation);

	      default:
	        var cached = caches.registered[interpolation];
	        return couldBeSelectorInterpolation === false && cached !== undefined ? cached : interpolation;
	    }
	  }

	  var objectToStringCache = new WeakMap();

	  function createStringFromObject(obj) {
	    if (objectToStringCache.has(obj)) {
	      // $FlowFixMe
	      return objectToStringCache.get(obj);
	    }

	    var string = '';

	    if (Array.isArray(obj)) {
	      obj.forEach(function (interpolation) {
	        string += handleInterpolation.call(this, interpolation, false);
	      }, this);
	    } else {
	      Object.keys(obj).forEach(function (key) {
	        if (typeof obj[key] !== 'object') {
	          if (caches.registered[obj[key]] !== undefined) {
	            string += key + "{" + caches.registered[obj[key]] + "}";
	          } else {
	            string += processStyleName(key) + ":" + processStyleValue(key, obj[key]) + ";";
	          }
	        } else {
	          if (key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
	            throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
	          }

	          if (Array.isArray(obj[key]) && typeof obj[key][0] === 'string' && caches.registered[obj[key][0]] === undefined) {
	            obj[key].forEach(function (value) {
	              string += processStyleName(key) + ":" + processStyleValue(key, value) + ";";
	            });
	          } else {
	            string += key + "{" + handleInterpolation.call(this, obj[key], false) + "}";
	          }
	        }
	      }, this);
	    }

	    objectToStringCache.set(obj, string);
	    return string;
	  }

	  var name;
	  var stylesWithLabel;
	  var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;

	  var createClassName = function createClassName(styles, identifierName) {
	    return murmurhash2_32_gc(styles + identifierName) + identifierName;
	  };

	  {
	    var oldCreateClassName = createClassName;
	    var sourceMappingUrlPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;

	    createClassName = function createClassName(styles, identifierName) {
	      return oldCreateClassName(styles.replace(sourceMappingUrlPattern, function (sourceMap) {
	        currentSourceMap = sourceMap;
	        return '';
	      }), identifierName);
	    };
	  }

	  var createStyles = function createStyles(strings) {
	    var stringMode = true;
	    var styles = '';
	    var identifierName = '';

	    if (strings == null || strings.raw === undefined) {
	      stringMode = false;
	      styles += handleInterpolation.call(this, strings, false);
	    } else {
	      styles += strings[0];
	    }

	    for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      interpolations[_key - 1] = arguments[_key];
	    }

	    interpolations.forEach(function (interpolation, i) {
	      styles += handleInterpolation.call(this, interpolation, styles.charCodeAt(styles.length - 1) === 46 // .
	      );

	      if (stringMode === true && strings[i + 1] !== undefined) {
	        styles += strings[i + 1];
	      }
	    }, this);
	    stylesWithLabel = styles;
	    styles = styles.replace(labelPattern, function (match, p1) {
	      identifierName += "-" + p1;
	      return '';
	    });
	    name = createClassName(styles, identifierName);
	    return styles;
	  };

	  {
	    var oldStylis = stylis;

	    stylis = function stylis(selector, styles) {
	      oldStylis(selector, styles);
	      currentSourceMap = '';
	    };
	  }

	  function insert(scope, styles) {
	    if (caches.inserted[name] === undefined) {
	      current = '';
	      stylis(scope, styles);
	      caches.inserted[name] = current;
	    }
	  }

	  var css = function css() {
	    var styles = createStyles.apply(this, arguments);
	    var selector = key + "-" + name;

	    if (caches.registered[selector] === undefined) {
	      caches.registered[selector] = stylesWithLabel;
	    }

	    insert("." + selector, styles);
	    return selector;
	  };

	  var keyframes = function keyframes() {
	    var styles = createStyles.apply(this, arguments);
	    var animation = "animation-" + name;
	    insert('', "@keyframes " + animation + "{" + styles + "}");
	    return animation;
	  };

	  var injectGlobal = function injectGlobal() {
	    var styles = createStyles.apply(this, arguments);
	    insert('', styles);
	  };

	  function getRegisteredStyles(registeredStyles, classNames) {
	    var rawClassName = '';
	    classNames.split(' ').forEach(function (className) {
	      if (caches.registered[className] !== undefined) {
	        registeredStyles.push(className);
	      } else {
	        rawClassName += className + " ";
	      }
	    });
	    return rawClassName;
	  }

	  function merge(className, sourceMap) {
	    var registeredStyles = [];
	    var rawClassName = getRegisteredStyles(registeredStyles, className);

	    if (registeredStyles.length < 2) {
	      return className;
	    }

	    return rawClassName + css(registeredStyles, sourceMap);
	  }

	  function cx() {
	    for (var _len2 = arguments.length, classNames = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      classNames[_key2] = arguments[_key2];
	    }

	    return merge(classnames(classNames));
	  }

	  function hydrateSingleId(id) {
	    caches.inserted[id] = true;
	  }

	  function hydrate(ids) {
	    ids.forEach(hydrateSingleId);
	  }

	  function flush() {
	    if (isBrowser) {
	      sheet.flush();
	      sheet.inject();
	    }

	    caches.inserted = {};
	    caches.registered = {};
	  }

	  if (isBrowser) {
	    var chunks = document.querySelectorAll("[data-emotion-" + key + "]");
	    Array.prototype.forEach.call(chunks, function (node) {
	      // $FlowFixMe
	      sheet.tags[0].parentNode.insertBefore(node, sheet.tags[0]); // $FlowFixMe

	      node.getAttribute("data-emotion-" + key).split(' ').forEach(hydrateSingleId);
	    });
	  }

	  var emotion = {
	    flush: flush,
	    hydrate: hydrate,
	    cx: cx,
	    merge: merge,
	    getRegisteredStyles: getRegisteredStyles,
	    injectGlobal: injectGlobal,
	    keyframes: keyframes,
	    css: css,
	    sheet: sheet,
	    caches: caches
	  };
	  context.__SECRET_EMOTION__ = emotion;
	  return emotion;
	}

	var context = typeof global$1 !== 'undefined' ? global$1 : {};

	var _createEmotion = createEmotion(context),
	    flush = _createEmotion.flush,
	    hydrate = _createEmotion.hydrate,
	    cx = _createEmotion.cx,
	    merge = _createEmotion.merge,
	    getRegisteredStyles = _createEmotion.getRegisteredStyles,
	    injectGlobal = _createEmotion.injectGlobal,
	    keyframes = _createEmotion.keyframes,
	    css = _createEmotion.css,
	    sheet = _createEmotion.sheet,
	    caches = _createEmotion.caches;

	/*!
	 * nano-assign v1.0.1
	 * (c) 2018-present egoist <0x142857@gmail.com>
	 * Released under the MIT License.
	 */

	var index = function index(obj) {
	  var arguments$1 = arguments;

	  for (var i = 1; i < arguments.length; i++) {
	    // eslint-disable-next-line guard-for-in, prefer-rest-params
	    for (var p in arguments[i]) {
	      obj[p] = arguments$1[i][p];
	    }
	  }

	  return obj;
	};

	var nanoAssign_common = index;

	/* eslint-disable */

	var STYLES_KEY = '__emotion_styles';

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function stringifyClass(klass) {
	  if (Array.isArray(klass)) {
	    return klass.join(' ');
	  }

	  if (_typeof(klass) === 'object') {
	    return Object.keys(klass).filter(function (key) {
	      return Boolean(klass[key]);
	    }).join(' ');
	  }

	  return klass;
	}

	var index$1 = function index(tag, options) {
	  var staticClassName;
	  var identifierName;
	  var stableClassName;
	  var propsDefinitions;

	  if (options !== undefined) {
	    staticClassName = options.e;
	    identifierName = options.label;
	    stableClassName = options.target;
	    propsDefinitions = options.props;
	  }

	  var isReal = tag.__emotion_real === tag;
	  var baseTag = staticClassName === undefined ? isReal && tag.__emotion_base || tag : tag;
	  return function () {
	    var styles = isReal && tag[STYLES_KEY] !== undefined ? tag[STYLES_KEY].slice(0) : [];

	    if (identifierName !== undefined) {
	      styles.push("label:".concat(identifierName, ";"));
	    }

	    if (staticClassName === undefined) {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      if (args[0] === null || args[0].raw === undefined) {
	        styles.push.apply(styles, args);
	      } else {
	        styles.push(args[0][0]);
	        var len = args.length;
	        var i = 1;

	        for (; i < len; i++) {
	          styles.push(args[i], args[0][i]);
	        }
	      }
	    }

	    var Styled = {
	      name: "Styled".concat(tag.name || identifierName || 'Component'),
	      functional: true,
	      inject: {
	        theme: {
	          from: 'theme_reactivesearch',
	          "default": null
	        }
	      },
	      props: propsDefinitions,
	      render: function render(h, _ref) {
	        var data = _ref.data,
	            children = _ref.children,
	            props = _ref.props,
	            injections = _ref.injections;
	        var className = '';
	        var classInterpolations = [];
	        var exisingClassName = stringifyClass(data["class"]);
	        var attrs = {};

	        for (var key in data.attrs) {
	          if (key[0] !== '$') {
	            attrs[key] = data.attrs[key];
	          }
	        }

	        if (exisingClassName) {
	          if (staticClassName === undefined) {
	            className += getRegisteredStyles(classInterpolations, exisingClassName);
	          } else {
	            className += "".concat(exisingClassName, " ");
	          }
	        }

	        if (staticClassName === undefined) {
	          var ctx = {
	            mergedProps: nanoAssign_common({
	              theme: injections.theme
	            }, props)
	          };
	          className += css.apply(ctx, styles.concat(classInterpolations));
	        } else {
	          className += staticClassName;
	        }

	        if (stableClassName !== undefined) {
	          className += " ".concat(stableClassName);
	        }

	        return h(tag, nanoAssign_common({}, data, {
	          attrs: attrs,
	          "class": className
	        }), children);
	      }
	    };
	    Styled[STYLES_KEY] = styles;
	    Styled.__emotion_base = baseTag;
	    Styled.__emotion_real = Styled;
	    Object.defineProperty(Styled, 'toString', {
	      enumerable: false,
	      value: function value() {
	        if ( stableClassName === undefined) {
	          return 'NO_COMPONENT_SELECTOR';
	        }

	        return ".".concat(stableClassName);
	      }
	    });
	    return Styled;
	  };
	};

	function _extends$1() {
	  _extends$1 = Object.assign || function (target) {
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

	  return _extends$1.apply(this, arguments);
	}

	function colorToInt(color) {
	  return Math.round(color * 255);
	}

	function convertToInt(red, green, blue) {
	  return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
	}

	function hslToRgb(hue, saturation, lightness, convert) {
	  if (convert === void 0) {
	    convert = convertToInt;
	  }

	  if (saturation === 0) {
	    // achromatic
	    return convert(lightness, lightness, lightness);
	  } // formular from https://en.wikipedia.org/wiki/HSL_and_HSV


	  var huePrime = hue % 360 / 60;
	  var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
	  var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
	  var red = 0;
	  var green = 0;
	  var blue = 0;

	  if (huePrime >= 0 && huePrime < 1) {
	    red = chroma;
	    green = secondComponent;
	  } else if (huePrime >= 1 && huePrime < 2) {
	    red = secondComponent;
	    green = chroma;
	  } else if (huePrime >= 2 && huePrime < 3) {
	    green = chroma;
	    blue = secondComponent;
	  } else if (huePrime >= 3 && huePrime < 4) {
	    green = secondComponent;
	    blue = chroma;
	  } else if (huePrime >= 4 && huePrime < 5) {
	    red = secondComponent;
	    blue = chroma;
	  } else if (huePrime >= 5 && huePrime < 6) {
	    red = chroma;
	    blue = secondComponent;
	  }

	  var lightnessModification = lightness - chroma / 2;
	  var finalRed = red + lightnessModification;
	  var finalGreen = green + lightnessModification;
	  var finalBlue = blue + lightnessModification;
	  return convert(finalRed, finalGreen, finalBlue);
	}

	var namedColorMap = {
	  aliceblue: 'f0f8ff',
	  antiquewhite: 'faebd7',
	  aqua: '00ffff',
	  aquamarine: '7fffd4',
	  azure: 'f0ffff',
	  beige: 'f5f5dc',
	  bisque: 'ffe4c4',
	  black: '000',
	  blanchedalmond: 'ffebcd',
	  blue: '0000ff',
	  blueviolet: '8a2be2',
	  brown: 'a52a2a',
	  burlywood: 'deb887',
	  cadetblue: '5f9ea0',
	  chartreuse: '7fff00',
	  chocolate: 'd2691e',
	  coral: 'ff7f50',
	  cornflowerblue: '6495ed',
	  cornsilk: 'fff8dc',
	  crimson: 'dc143c',
	  cyan: '00ffff',
	  darkblue: '00008b',
	  darkcyan: '008b8b',
	  darkgoldenrod: 'b8860b',
	  darkgray: 'a9a9a9',
	  darkgreen: '006400',
	  darkgrey: 'a9a9a9',
	  darkkhaki: 'bdb76b',
	  darkmagenta: '8b008b',
	  darkolivegreen: '556b2f',
	  darkorange: 'ff8c00',
	  darkorchid: '9932cc',
	  darkred: '8b0000',
	  darksalmon: 'e9967a',
	  darkseagreen: '8fbc8f',
	  darkslateblue: '483d8b',
	  darkslategray: '2f4f4f',
	  darkslategrey: '2f4f4f',
	  darkturquoise: '00ced1',
	  darkviolet: '9400d3',
	  deeppink: 'ff1493',
	  deepskyblue: '00bfff',
	  dimgray: '696969',
	  dimgrey: '696969',
	  dodgerblue: '1e90ff',
	  firebrick: 'b22222',
	  floralwhite: 'fffaf0',
	  forestgreen: '228b22',
	  fuchsia: 'ff00ff',
	  gainsboro: 'dcdcdc',
	  ghostwhite: 'f8f8ff',
	  gold: 'ffd700',
	  goldenrod: 'daa520',
	  gray: '808080',
	  green: '008000',
	  greenyellow: 'adff2f',
	  grey: '808080',
	  honeydew: 'f0fff0',
	  hotpink: 'ff69b4',
	  indianred: 'cd5c5c',
	  indigo: '4b0082',
	  ivory: 'fffff0',
	  khaki: 'f0e68c',
	  lavender: 'e6e6fa',
	  lavenderblush: 'fff0f5',
	  lawngreen: '7cfc00',
	  lemonchiffon: 'fffacd',
	  lightblue: 'add8e6',
	  lightcoral: 'f08080',
	  lightcyan: 'e0ffff',
	  lightgoldenrodyellow: 'fafad2',
	  lightgray: 'd3d3d3',
	  lightgreen: '90ee90',
	  lightgrey: 'd3d3d3',
	  lightpink: 'ffb6c1',
	  lightsalmon: 'ffa07a',
	  lightseagreen: '20b2aa',
	  lightskyblue: '87cefa',
	  lightslategray: '789',
	  lightslategrey: '789',
	  lightsteelblue: 'b0c4de',
	  lightyellow: 'ffffe0',
	  lime: '0f0',
	  limegreen: '32cd32',
	  linen: 'faf0e6',
	  magenta: 'f0f',
	  maroon: '800000',
	  mediumaquamarine: '66cdaa',
	  mediumblue: '0000cd',
	  mediumorchid: 'ba55d3',
	  mediumpurple: '9370db',
	  mediumseagreen: '3cb371',
	  mediumslateblue: '7b68ee',
	  mediumspringgreen: '00fa9a',
	  mediumturquoise: '48d1cc',
	  mediumvioletred: 'c71585',
	  midnightblue: '191970',
	  mintcream: 'f5fffa',
	  mistyrose: 'ffe4e1',
	  moccasin: 'ffe4b5',
	  navajowhite: 'ffdead',
	  navy: '000080',
	  oldlace: 'fdf5e6',
	  olive: '808000',
	  olivedrab: '6b8e23',
	  orange: 'ffa500',
	  orangered: 'ff4500',
	  orchid: 'da70d6',
	  palegoldenrod: 'eee8aa',
	  palegreen: '98fb98',
	  paleturquoise: 'afeeee',
	  palevioletred: 'db7093',
	  papayawhip: 'ffefd5',
	  peachpuff: 'ffdab9',
	  peru: 'cd853f',
	  pink: 'ffc0cb',
	  plum: 'dda0dd',
	  powderblue: 'b0e0e6',
	  purple: '800080',
	  rebeccapurple: '639',
	  red: 'f00',
	  rosybrown: 'bc8f8f',
	  royalblue: '4169e1',
	  saddlebrown: '8b4513',
	  salmon: 'fa8072',
	  sandybrown: 'f4a460',
	  seagreen: '2e8b57',
	  seashell: 'fff5ee',
	  sienna: 'a0522d',
	  silver: 'c0c0c0',
	  skyblue: '87ceeb',
	  slateblue: '6a5acd',
	  slategray: '708090',
	  slategrey: '708090',
	  snow: 'fffafa',
	  springgreen: '00ff7f',
	  steelblue: '4682b4',
	  tan: 'd2b48c',
	  teal: '008080',
	  thistle: 'd8bfd8',
	  tomato: 'ff6347',
	  turquoise: '40e0d0',
	  violet: 'ee82ee',
	  wheat: 'f5deb3',
	  white: 'fff',
	  whitesmoke: 'f5f5f5',
	  yellow: 'ff0',
	  yellowgreen: '9acd32'
	  /**
	   * Checks if a string is a CSS named color and returns its equivalent hex value, otherwise returns the original color.
	   * @private
	   */

	};

	function nameToHex(color) {
	  if (typeof color !== 'string') return color;
	  var normalizedColorName = color.toLowerCase();
	  return namedColorMap[normalizedColorName] ? "#" + namedColorMap[normalizedColorName] : color;
	}

	var hexRegex = /^#[a-fA-F0-9]{6}$/;
	var hexRgbaRegex = /^#[a-fA-F0-9]{8}$/;
	var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
	var reducedRgbaHexRegex = /^#[a-fA-F0-9]{4}$/;
	var rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
	var rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/;
	var hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
	var hslaRegex = /^hsla\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/;
	/**
	 * Returns an RgbColor or RgbaColor object. This utility function is only useful
	 * if want to extract a color component. With the color util `toColorString` you
	 * can convert a RgbColor or RgbaColor object back to a string.
	 *
	 * @example
	 * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
	 * const color1 = parseToRgb('rgb(255, 0, 0)');
	 * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
	 * const color2 = parseToRgb('hsla(210, 10%, 40%, 0.75)');
	 */

	function parseToRgb(color) {
	  if (typeof color !== 'string') {
	    throw new Error('Passed an incorrect argument to a color function, please pass a string representation of a color.');
	  }

	  var normalizedColor = nameToHex(color);

	  if (normalizedColor.match(hexRegex)) {
	    return {
	      red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
	      green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
	      blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16)
	    };
	  }

	  if (normalizedColor.match(hexRgbaRegex)) {
	    var alpha = parseFloat((parseInt("" + normalizedColor[7] + normalizedColor[8], 16) / 255).toFixed(2));
	    return {
	      red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
	      green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
	      blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16),
	      alpha: alpha
	    };
	  }

	  if (normalizedColor.match(reducedHexRegex)) {
	    return {
	      red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
	      green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
	      blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16)
	    };
	  }

	  if (normalizedColor.match(reducedRgbaHexRegex)) {
	    var _alpha = parseFloat((parseInt("" + normalizedColor[4] + normalizedColor[4], 16) / 255).toFixed(2));

	    return {
	      red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
	      green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
	      blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16),
	      alpha: _alpha
	    };
	  }

	  var rgbMatched = rgbRegex.exec(normalizedColor);

	  if (rgbMatched) {
	    return {
	      red: parseInt("" + rgbMatched[1], 10),
	      green: parseInt("" + rgbMatched[2], 10),
	      blue: parseInt("" + rgbMatched[3], 10)
	    };
	  }

	  var rgbaMatched = rgbaRegex.exec(normalizedColor);

	  if (rgbaMatched) {
	    return {
	      red: parseInt("" + rgbaMatched[1], 10),
	      green: parseInt("" + rgbaMatched[2], 10),
	      blue: parseInt("" + rgbaMatched[3], 10),
	      alpha: parseFloat("" + rgbaMatched[4])
	    };
	  }

	  var hslMatched = hslRegex.exec(normalizedColor);

	  if (hslMatched) {
	    var hue = parseInt("" + hslMatched[1], 10);
	    var saturation = parseInt("" + hslMatched[2], 10) / 100;
	    var lightness = parseInt("" + hslMatched[3], 10) / 100;
	    var rgbColorString = "rgb(" + hslToRgb(hue, saturation, lightness) + ")";
	    var hslRgbMatched = rgbRegex.exec(rgbColorString);

	    if (!hslRgbMatched) {
	      throw new Error("Couldn't generate valid rgb string from " + normalizedColor + ", it returned " + rgbColorString + ".");
	    }

	    return {
	      red: parseInt("" + hslRgbMatched[1], 10),
	      green: parseInt("" + hslRgbMatched[2], 10),
	      blue: parseInt("" + hslRgbMatched[3], 10)
	    };
	  }

	  var hslaMatched = hslaRegex.exec(normalizedColor);

	  if (hslaMatched) {
	    var _hue = parseInt("" + hslaMatched[1], 10);

	    var _saturation = parseInt("" + hslaMatched[2], 10) / 100;

	    var _lightness = parseInt("" + hslaMatched[3], 10) / 100;

	    var _rgbColorString = "rgb(" + hslToRgb(_hue, _saturation, _lightness) + ")";

	    var _hslRgbMatched = rgbRegex.exec(_rgbColorString);

	    if (!_hslRgbMatched) {
	      throw new Error("Couldn't generate valid rgb string from " + normalizedColor + ", it returned " + _rgbColorString + ".");
	    }

	    return {
	      red: parseInt("" + _hslRgbMatched[1], 10),
	      green: parseInt("" + _hslRgbMatched[2], 10),
	      blue: parseInt("" + _hslRgbMatched[3], 10),
	      alpha: parseFloat("" + hslaMatched[4])
	    };
	  }

	  throw new Error("Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.");
	}

	function rgbToHsl(color) {
	  // make sure rgb are contained in a set of [0, 255]
	  var red = color.red / 255;
	  var green = color.green / 255;
	  var blue = color.blue / 255;
	  var max = Math.max(red, green, blue);
	  var min = Math.min(red, green, blue);
	  var lightness = (max + min) / 2;

	  if (max === min) {
	    // achromatic
	    if (color.alpha !== undefined) {
	      return {
	        hue: 0,
	        saturation: 0,
	        lightness: lightness,
	        alpha: color.alpha
	      };
	    } else {
	      return {
	        hue: 0,
	        saturation: 0,
	        lightness: lightness
	      };
	    }
	  }

	  var hue;
	  var delta = max - min;
	  var saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

	  switch (max) {
	    case red:
	      hue = (green - blue) / delta + (green < blue ? 6 : 0);
	      break;

	    case green:
	      hue = (blue - red) / delta + 2;
	      break;

	    default:
	      // blue case
	      hue = (red - green) / delta + 4;
	      break;
	  }

	  hue *= 60;

	  if (color.alpha !== undefined) {
	    return {
	      hue: hue,
	      saturation: saturation,
	      lightness: lightness,
	      alpha: color.alpha
	    };
	  }

	  return {
	    hue: hue,
	    saturation: saturation,
	    lightness: lightness
	  };
	}
	/**
	 * Returns an HslColor or HslaColor object. This utility function is only useful
	 * if want to extract a color component. With the color util `toColorString` you
	 * can convert a HslColor or HslaColor object back to a string.
	 *
	 * @example
	 * // Assigns `{ hue: 0, saturation: 1, lightness: 0.5 }` to color1
	 * const color1 = parseToHsl('rgb(255, 0, 0)');
	 * // Assigns `{ hue: 128, saturation: 1, lightness: 0.5, alpha: 0.75 }` to color2
	 * const color2 = parseToHsl('hsla(128, 100%, 50%, 0.75)');
	 */


	function parseToHsl(color) {
	  // Note: At a later stage we can optimize this function as right now a hsl
	  // color would be parsed converted to rgb values and converted back to hsl.
	  return rgbToHsl(parseToRgb(color));
	}
	/**
	 * Reduces hex values if possible e.g. #ff8866 to #f86
	 * @private
	 */


	var reduceHexValue = function reduceHexValue(value) {
	  if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
	    return "#" + value[1] + value[3] + value[5];
	  }

	  return value;
	};

	function numberToHex(value) {
	  var hex = value.toString(16);
	  return hex.length === 1 ? "0" + hex : hex;
	}

	function colorToHex(color) {
	  return numberToHex(Math.round(color * 255));
	}

	function convertToHex(red, green, blue) {
	  return reduceHexValue("#" + colorToHex(red) + colorToHex(green) + colorToHex(blue));
	}

	function hslToHex(hue, saturation, lightness) {
	  return hslToRgb(hue, saturation, lightness, convertToHex);
	}
	/**
	 * Returns a string value for the color. The returned result is the smallest possible hex notation.
	 *
	 * @example
	 * // Styles as object usage
	 * const styles = {
	 *   background: hsl(359, 0.75, 0.4),
	 *   background: hsl({ hue: 360, saturation: 0.75, lightness: 0.4 }),
	 * }
	 *
	 * // styled-components usage
	 * const div = styled.div`
	 *   background: ${hsl(359, 0.75, 0.4)};
	 *   background: ${hsl({ hue: 360, saturation: 0.75, lightness: 0.4 })};
	 * `
	 *
	 * // CSS in JS Output
	 *
	 * element {
	 *   background: "#b3191c";
	 *   background: "#b3191c";
	 * }
	 */


	function hsl(value, saturation, lightness) {
	  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number') {
	    return hslToHex(value, saturation, lightness);
	  } else if (typeof value === 'object' && saturation === undefined && lightness === undefined) {
	    return hslToHex(value.hue, value.saturation, value.lightness);
	  }

	  throw new Error('Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).');
	}
	/**
	 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
	 *
	 * @example
	 * // Styles as object usage
	 * const styles = {
	 *   background: hsla(359, 0.75, 0.4, 0.7),
	 *   background: hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 }),
	 *   background: hsla(359, 0.75, 0.4, 1),
	 * }
	 *
	 * // styled-components usage
	 * const div = styled.div`
	 *   background: ${hsla(359, 0.75, 0.4, 0.7)};
	 *   background: ${hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 })};
	 *   background: ${hsla(359, 0.75, 0.4, 1)};
	 * `
	 *
	 * // CSS in JS Output
	 *
	 * element {
	 *   background: "rgba(179,25,28,0.7)";
	 *   background: "rgba(179,25,28,0.7)";
	 *   background: "#b3191c";
	 * }
	 */


	function hsla(value, saturation, lightness, alpha) {
	  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number' && typeof alpha === 'number') {
	    return alpha >= 1 ? hslToHex(value, saturation, lightness) : "rgba(" + hslToRgb(value, saturation, lightness) + "," + alpha + ")";
	  } else if (typeof value === 'object' && saturation === undefined && lightness === undefined && alpha === undefined) {
	    return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : "rgba(" + hslToRgb(value.hue, value.saturation, value.lightness) + "," + value.alpha + ")";
	  }

	  throw new Error('Passed invalid arguments to hsla, please pass multiple numbers e.g. hsl(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).');
	}
	/**
	 * Returns a string value for the color. The returned result is the smallest possible hex notation.
	 *
	 * @example
	 * // Styles as object usage
	 * const styles = {
	 *   background: rgb(255, 205, 100),
	 *   background: rgb({ red: 255, green: 205, blue: 100 }),
	 * }
	 *
	 * // styled-components usage
	 * const div = styled.div`
	 *   background: ${rgb(255, 205, 100)};
	 *   background: ${rgb({ red: 255, green: 205, blue: 100 })};
	 * `
	 *
	 * // CSS in JS Output
	 *
	 * element {
	 *   background: "#ffcd64";
	 *   background: "#ffcd64";
	 * }
	 */


	function rgb(value, green, blue) {
	  if (typeof value === 'number' && typeof green === 'number' && typeof blue === 'number') {
	    return reduceHexValue("#" + numberToHex(value) + numberToHex(green) + numberToHex(blue));
	  } else if (typeof value === 'object' && green === undefined && blue === undefined) {
	    return reduceHexValue("#" + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
	  }

	  throw new Error('Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).');
	}
	/**
	 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
	 *
	 * Can also be used to fade a color by passing a hex value or named CSS color along with an alpha value.
	 *
	 * @example
	 * // Styles as object usage
	 * const styles = {
	 *   background: rgba(255, 205, 100, 0.7),
	 *   background: rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 }),
	 *   background: rgba(255, 205, 100, 1),
	 *   background: rgba('#ffffff', 0.4),
	 *   background: rgba('black', 0.7),
	 * }
	 *
	 * // styled-components usage
	 * const div = styled.div`
	 *   background: ${rgba(255, 205, 100, 0.7)};
	 *   background: ${rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 })};
	 *   background: ${rgba(255, 205, 100, 1)};
	 *   background: ${rgba('#ffffff', 0.4)};
	 *   background: ${rgba('black', 0.7)};
	 * `
	 *
	 * // CSS in JS Output
	 *
	 * element {
	 *   background: "rgba(255,205,100,0.7)";
	 *   background: "rgba(255,205,100,0.7)";
	 *   background: "#ffcd64";
	 *   background: "rgba(255,255,255,0.4)";
	 *   background: "rgba(0,0,0,0.7)";
	 * }
	 */


	function rgba(firstValue, secondValue, thirdValue, fourthValue) {
	  if (typeof firstValue === 'string' && typeof secondValue === 'number') {
	    var rgbValue = parseToRgb(firstValue);
	    return "rgba(" + rgbValue.red + "," + rgbValue.green + "," + rgbValue.blue + "," + secondValue + ")";
	  } else if (typeof firstValue === 'number' && typeof secondValue === 'number' && typeof thirdValue === 'number' && typeof fourthValue === 'number') {
	    return fourthValue >= 1 ? rgb(firstValue, secondValue, thirdValue) : "rgba(" + firstValue + "," + secondValue + "," + thirdValue + "," + fourthValue + ")";
	  } else if (typeof firstValue === 'object' && secondValue === undefined && thirdValue === undefined && fourthValue === undefined) {
	    return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : "rgba(" + firstValue.red + "," + firstValue.green + "," + firstValue.blue + "," + firstValue.alpha + ")";
	  }

	  throw new Error('Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).');
	}

	var isRgb = function isRgb(color) {
	  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
	};

	var isRgba = function isRgba(color) {
	  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && typeof color.alpha === 'number';
	};

	var isHsl = function isHsl(color) {
	  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
	};

	var isHsla = function isHsla(color) {
	  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && typeof color.alpha === 'number';
	};

	var errMsg = 'Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.';
	/**
	 * Converts a RgbColor, RgbaColor, HslColor or HslaColor object to a color string.
	 * This util is useful in case you only know on runtime which color object is
	 * used. Otherwise we recommend to rely on `rgb`, `rgba`, `hsl` or `hsla`.
	 *
	 * @example
	 * // Styles as object usage
	 * const styles = {
	 *   background: toColorString({ red: 255, green: 205, blue: 100 }),
	 *   background: toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 }),
	 *   background: toColorString({ hue: 240, saturation: 1, lightness: 0.5 }),
	 *   background: toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 }),
	 * }
	 *
	 * // styled-components usage
	 * const div = styled.div`
	 *   background: ${toColorString({ red: 255, green: 205, blue: 100 })};
	 *   background: ${toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 })};
	 *   background: ${toColorString({ hue: 240, saturation: 1, lightness: 0.5 })};
	 *   background: ${toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 })};
	 * `
	 *
	 * // CSS in JS Output
	 * element {
	 *   background: "#ffcd64";
	 *   background: "rgba(255,205,100,0.72)";
	 *   background: "#00f";
	 *   background: "rgba(179,25,25,0.72)";
	 * }
	 */

	function toColorString(color) {
	  if (typeof color !== 'object') throw new Error(errMsg);
	  if (isRgba(color)) return rgba(color);
	  if (isRgb(color)) return rgb(color);
	  if (isHsla(color)) return hsla(color);
	  if (isHsl(color)) return hsl(color);
	  throw new Error(errMsg);
	} // Type definitions taken from https://github.com/gcanti/flow-static-land/blob/master/src/Fun.js
	// eslint-disable-next-line no-unused-vars
	// eslint-disable-next-line no-unused-vars
	// eslint-disable-next-line no-redeclare


	function curried(f, length, acc) {
	  return function fn() {
	    // eslint-disable-next-line prefer-rest-params
	    var combined = acc.concat(Array.prototype.slice.call(arguments));
	    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
	  };
	} // eslint-disable-next-line no-redeclare


	function curry(f) {
	  // eslint-disable-line no-redeclare
	  return curried(f, f.length, []);
	}

	function guard(lowerBoundary, upperBoundary, value) {
	  return Math.max(lowerBoundary, Math.min(upperBoundary, value));
	}
	/**
	 * Returns a string value for the darkened color.
	 *
	 * @example
	 * // Styles as object usage
	 * const styles = {
	 *   background: darken(0.2, '#FFCD64'),
	 *   background: darken('0.2', 'rgba(255,205,100,0.7)'),
	 * }
	 *
	 * // styled-components usage
	 * const div = styled.div`
	 *   background: ${darken(0.2, '#FFCD64')};
	 *   background: ${darken('0.2', 'rgba(255,205,100,0.7)')};
	 * `
	 *
	 * // CSS in JS Output
	 *
	 * element {
	 *   background: "#ffbd31";
	 *   background: "rgba(255,189,49,0.7)";
	 * }
	 */


	function darken(amount, color) {
	  var hslColor = parseToHsl(color);
	  return toColorString(_extends$1({}, hslColor, {
	    lightness: guard(0, 1, hslColor.lightness - parseFloat(amount))
	  }));
	} // prettier-ignore


	var curriedDarken =
	/*#__PURE__*/
	curry
	/* ::<number | string, string, string> */
	(darken);
	/**
	 * Returns a string value for the lightened color.
	 *
	 * @example
	 * // Styles as object usage
	 * const styles = {
	 *   background: lighten(0.2, '#CCCD64'),
	 *   background: lighten('0.2', 'rgba(204,205,100,0.7)'),
	 * }
	 *
	 * // styled-components usage
	 * const div = styled.div`
	 *   background: ${lighten(0.2, '#FFCD64')};
	 *   background: ${lighten('0.2', 'rgba(204,205,100,0.7)')};
	 * `
	 *
	 * // CSS in JS Output
	 *
	 * element {
	 *   background: "#e5e6b1";
	 *   background: "rgba(229,230,177,0.7)";
	 * }
	 */


	function lighten(amount, color) {
	  var hslColor = parseToHsl(color);
	  return toColorString(_extends$1({}, hslColor, {
	    lightness: guard(0, 1, hslColor.lightness + parseFloat(amount))
	  }));
	} // prettier-ignore


	var curriedLighten =
	/*#__PURE__*/
	curry
	/* ::<number | string, string, string> */
	(lighten);

	function _templateObject8() {
	  var data = _taggedTemplateLiteralLoose(["\n\tdisplay: inline-flex;\n\tjustify-content: center;\n\talign-items: center;\n\tborder-radius: 3px;\n\tborder: 1px solid transparent;\n\tmin-height: 30px;\n\tword-wrap: break-word;\n\tpadding: 5px 12px;\n\tline-height: 1.2rem;\n\tbackground-color: ", ";\n\tcolor: ", ";\n\tcursor: pointer;\n\tuser-select: none;\n\ttransition: all 0.3s ease;\n\n\t&:hover,\n\t&:focus {\n\t\tbackground-color: ", ";\n\t}\n\n\t&:focus {\n\t\toutline: 0;\n\t\tborder-color: ", ";\n\t\tbox-shadow: ", ";\n\t}\n\n\t", ";\n\t", ";\n\t", ";\n"]);

	  _templateObject8 = function _templateObject8() {
	    return data;
	  };

	  return data;
	}

	function _templateObject7() {
	  var data = _taggedTemplateLiteralLoose(["\n\tbackground-color: ", ";\n\tcolor: #ccc;\n\tcursor: not-allowed;\n\n\t&:hover,\n\t&:focus {\n\t\tbackground-color: ", ";\n\t}\n"]);

	  _templateObject7 = function _templateObject7() {
	    return data;
	  };

	  return data;
	}

	function _templateObject6() {
	  var data = _taggedTemplateLiteralLoose(["\n\tmin-height: 40px;\n\tpadding: 10px 20px;\n"]);

	  _templateObject6 = function _templateObject6() {
	    return data;
	  };

	  return data;
	}

	function _templateObject5() {
	  var data = _taggedTemplateLiteralLoose(["\n\tbackground-color: ", ";\n\tcolor: ", ";\n\n\t&:hover,\n\t&:focus {\n\t\tbackground-color: ", ";\n\t}\n"]);

	  _templateObject5 = function _templateObject5() {
	    return data;
	  };

	  return data;
	}

	function _templateObject4() {
	  var data = _taggedTemplateLiteralLoose(["\n\tmargin: 0 -5px;\n\ta {\n\t\tmargin: 5px;\n\t}\n\tspan {\n\t\tmargin: 0 5px;\n\t}\n"]);

	  _templateObject4 = function _templateObject4() {
	    return data;
	  };

	  return data;
	}

	function _templateObject3() {
	  var data = _taggedTemplateLiteralLoose(["\n\tmargin: 0 -3px;\n\tmax-width: 100%;\n\n\ta {\n\t\tmargin: 3px 3px;\n\t}\n"]);

	  _templateObject3 = function _templateObject3() {
	    return data;
	  };

	  return data;
	}

	function _templateObject2() {
	  var data = _taggedTemplateLiteralLoose(["\n\tmargin: 10px -3px;\n\tmax-width: 100%;\n\ttext-align: center;\n\n\ta {\n\t\tmargin: 0 3px;\n\t}\n"]);

	  _templateObject2 = function _templateObject2() {
	    return data;
	  };

	  return data;
	}

	function _templateObject() {
	  var data = _taggedTemplateLiteralLoose(["\n\tmargin: 0 -3px;\n\tmax-width: 100%;\n\n\ta {\n\t\tmargin: 2px 3px;\n\t\tpadding: 5px 8px;\n\t\tfont-size: 0.85rem;\n\t\tposition: relative;\n\n\t\tspan:first-child {\n\t\t\tmax-width: 260px;\n\t\t\twhite-space: nowrap;\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t\tmargin-right: 26px;\n\t\t}\n\n\t\tspan:last-child {\n\t\t\tdisplay: flex;\n\t\t\theight: 100%;\n\t\t\ttop: 0;\n\t\t\tright: 8px;\n\t\t\tposition: absolute;\n\t\t\talign-items: center;\n\t\t\tborder-left: 1px solid ", ";\n\t\t\tpadding-left: 8px;\n\t\t\tmargin-left: 8px;\n\t\t}\n\n\t\t&:hover,\n\t\t&:focus {\n\t\t\tspan:first-child {\n\t\t\t\ttext-decoration: line-through;\n\t\t\t}\n\t\t}\n\t}\n"]);

	  _templateObject = function _templateObject() {
	    return data;
	  };

	  return data;
	}

	var filters = function filters(_ref) {
	  var borderColor = _ref.colors.borderColor;
	  return css(_templateObject(), borderColor || '#fff');
	};

	var pagination = css(_templateObject2());
	var toggleButtons = css(_templateObject3());
	var numberBoxContainer = css(_templateObject4());

	var primary = function primary(_ref2) {
	  var theme = _ref2.theme;
	  return css(_templateObject5(), theme.colors.primaryColor, theme.colors.primaryTextColor, curriedDarken(0.1, theme.colors.primaryColor));
	};

	var large = function large() {
	  return css(_templateObject6());
	};

	var disabled = function disabled(_ref3) {
	  var theme = _ref3.theme;
	  return css(_templateObject7(), theme.colors.backgroundColor ? curriedLighten(0.1, theme.colors.backgroundColor) : '#fafafa', theme.colors.backgroundColor ? curriedLighten(0.2, theme.colors.backgroundColor) : '#fafafa');
	};

	var Button = index$1('a')(_templateObject8(), function (_ref4) {
	  var theme = _ref4.theme;
	  return theme.colors.backgroundColor || '#eee';
	}, function (_ref5) {
	  var theme = _ref5.theme;
	  return theme.colors.textColor;
	}, function (_ref6) {
	  var theme = _ref6.theme;
	  return theme.colors.backgroundColor ? curriedDarken(0.1, theme.colors.backgroundColor) : '#ccc';
	}, function (_ref7) {
	  var theme = _ref7.theme;
	  return rgba(theme.colors.primaryColor, 0.6);
	}, function (_ref8) {
	  var theme = _ref8.theme;
	  return "0 0 0 2px " + rgba(theme.colors.primaryColor, 0.3);
	}, function (props) {
	  return props.primary ? primary : null;
	}, function (props) {
	  return props.disabled ? disabled : null;
	}, function (props) {
	  return props.large && large;
	});
	var loadMoreContainer = css({
	  margin: '5px 0',
	  display: 'flex',
	  justifyContent: 'center'
	});

	var _types;

	VueTypes.sensibleDefaults = false;
	var reactKeyType = VueTypes.oneOfType([VueTypes.string, VueTypes.arrayOf(VueTypes.string), VueTypes.object, VueTypes.arrayOf(VueTypes.object)]);

	function validateLocation(props, propName) {
	  // eslint-disable-next-line
	  if (isNaN(props[propName])) {
	    return new Error(propName + " value must be a VueTypes.number");
	  }

	  if (propName === 'lat' && (props[propName] < -90 || props[propName] > 90)) {
	    return new Error(propName + " value should be between -90 and 90.");
	  }

	  if (propName === 'lng' && (props[propName] < -180 || props[propName] > 180)) {
	    return new Error(propName + " value should be between -180 and 180.");
	  }

	  return null;
	}

	var types = (_types = {
	  any: VueTypes.any,
	  bool: VueTypes.bool,
	  boolRequired: VueTypes.bool.isRequired,
	  components: VueTypes.arrayOf(VueTypes.string),
	  children: VueTypes.any,
	  data: VueTypes.arrayOf(VueTypes.object),
	  dataFieldArray: VueTypes.oneOfType([VueTypes.string, VueTypes.arrayOf(VueTypes.string)]).isRequired,
	  dataNumberBox: VueTypes.shape({
	    label: VueTypes.string,
	    start: VueTypes.number.isRequired,
	    end: VueTypes.number.isRequired
	  }).isRequired,
	  date: VueTypes.oneOfType([VueTypes.string, VueTypes.arrayOf(VueTypes.string)]),
	  dateObject: VueTypes.object,
	  excludeFields: VueTypes.arrayOf(VueTypes.string),
	  fieldWeights: VueTypes.arrayOf(VueTypes.number),
	  filterLabel: VueTypes.string,
	  func: VueTypes.func,
	  funcRequired: VueTypes.func.isRequired,
	  fuzziness: VueTypes.oneOf([0, 1, 2, 'AUTO']),
	  headers: VueTypes.object,
	  hits: VueTypes.arrayOf(VueTypes.object),
	  iconPosition: VueTypes.oneOf(['left', 'right']),
	  includeFields: VueTypes.arrayOf(VueTypes.string),
	  labelPosition: VueTypes.oneOf(['left', 'right', 'top', 'bottom']),
	  number: VueTypes.number,
	  options: VueTypes.oneOfType([VueTypes.arrayOf(VueTypes.object), VueTypes.object]),
	  paginationAt: VueTypes.oneOf(['top', 'bottom', 'both']),
	  range: VueTypes.shape({
	    start: VueTypes.number.isRequired,
	    end: VueTypes.number.isRequired
	  }),
	  rangeLabels: VueTypes.shape({
	    start: VueTypes.string.isRequired,
	    end: VueTypes.string.isRequired
	  }),
	  react: VueTypes.shape({
	    and: reactKeyType,
	    or: reactKeyType,
	    not: reactKeyType
	  }),
	  selectedValues: VueTypes.object,
	  selectedValue: VueTypes.oneOfType([VueTypes.string, VueTypes.arrayOf(VueTypes.string), VueTypes.arrayOf(VueTypes.object), VueTypes.object, Number, VueTypes.arrayOf(Number)]),
	  suggestions: VueTypes.arrayOf(VueTypes.object),
	  supportedOrientations: VueTypes.oneOf(['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']),
	  sortBy: VueTypes.oneOf(['asc', 'desc']),
	  sortOptions: VueTypes.arrayOf(VueTypes.shape({
	    label: VueTypes.string,
	    dataField: VueTypes.string,
	    sortBy: VueTypes.string
	  })),
	  sortByWithCount: VueTypes.oneOf(['asc', 'desc', 'count']),
	  stats: VueTypes.arrayOf(VueTypes.object),
	  string: VueTypes.string,
	  stringArray: VueTypes.arrayOf(VueTypes.string),
	  stringOrArray: VueTypes.oneOfType([VueTypes.string, VueTypes.arrayOf(VueTypes.string)]),
	  stringRequired: VueTypes.string.isRequired,
	  style: VueTypes.object,
	  themePreset: VueTypes.oneOf(['light', 'dark']),
	  // queryFormatDate: VueTypes.oneOf(VueTypes.object.keys(dateFormats)),
	  queryFormatSearch: VueTypes.oneOf(['and', 'or']),
	  queryFormatNumberBox: VueTypes.oneOf(['exact', 'lte', 'gte']),
	  params: VueTypes.object.isRequired,
	  props: VueTypes.object
	}, _types["rangeLabels"] = VueTypes.shape({
	  start: VueTypes.string,
	  end: VueTypes.string
	}), _types.rangeLabelsAlign = VueTypes.oneOf(['left', 'right']), _types.title = VueTypes.oneOfType([VueTypes.string, VueTypes.any]), _types.tooltipTrigger = VueTypes.oneOf(['always', 'none', 'hover']), _types.location = VueTypes.shape({
	  lat: validateLocation,
	  lng: validateLocation
	}), _types.unit = VueTypes.oneOf(['mi', 'miles', 'yd', 'yards', 'ft', 'feet', 'in', 'inch', 'km', 'kilometers', 'm', 'meters', 'cm', 'centimeters', 'mm', 'millimeters', 'NM', 'nmi', 'nauticalmiles']), _types.value = VueTypes.string.def(undefined), _types);

	var getClassName = lib_8.getClassName,
	    handleA11yAction = lib_8.handleA11yAction;

	function getStartPage(totalPages, currentPage, showEndPage) {
	  var midValue = parseInt(totalPages / 2, 10);
	  var start = currentPage - (showEndPage ? Math.ceil(midValue / 2) - 1 : midValue);
	  return start > 1 ? start : 2;
	}

	var Pagination = {
	  name: 'Pagination',
	  functional: true,
	  props: {
	    currentPage: types.number,
	    innerClass: types.style,
	    pages: types.number,
	    setPage: types.func,
	    totalPages: types.number,
	    showEndPage: types.bool
	  },
	  render: function render(createElement, context) {
	    var h = arguments[0];
	    var props = context.props;

	    var onPrevPage = function onPrevPage() {
	      if (props.currentPage) {
	        props.setPage(props.currentPage - 1);
	      }
	    };

	    var onNextPage = function onNextPage() {
	      if (props.currentPage < props.totalPages - 1) {
	        props.setPage(props.currentPage + 1);
	      }
	    };

	    if (!props.totalPages) {
	      return null;
	    }

	    var innerClassName = getClassName(props.innerClass, 'button');
	    var primary = props.currentPage === 0;
	    var className = innerClassName || primary ? innerClassName + " " + (primary ? 'active' : '') : '';

	    var buildPaginationDOM = function buildPaginationDOM(position) {
	      var pages = props.pages,
	          currentPage = props.currentPage,
	          totalPages = props.totalPages,
	          setPage = props.setPage,
	          showEndPage = props.showEndPage;
	      var start = position === 'start' ? getStartPage(pages, currentPage, showEndPage) : Math.ceil(totalPages - (pages - 1) / 2) + 1;
	      var paginationButtons = [];

	      if (start <= totalPages) {
	        var totalPagesToShow = pages < totalPages ? start + (pages - 1) : totalPages + 1;

	        if (showEndPage) {
	          totalPagesToShow = position === 'start' ? start + (Math.ceil(pages / 2) - pages % 2) : totalPages + 1;
	        }

	        if (currentPage > totalPages - pages + 2) {
	          start = totalPages - pages + 2;
	        }

	        if (totalPages <= pages) start = 2;

	        var _loop = function _loop(i) {
	          var activeButton = currentPage === i - 1;
	          var classNameBtn = innerClassName || activeButton ? innerClassName + " " + (activeButton ? 'active' : '') : '';
	          var pageBtn = h(Button, {
	            "class": classNameBtn,
	            "attrs": {
	              "primary": activeButton,
	              "tabIndex": "0",
	              "alt": "page-" + i
	            },
	            "on": {
	              "keyPress": function keyPress(event) {
	                return handleA11yAction(event, function () {
	                  return setPage(i - 1);
	                });
	              },
	              "click": function click() {
	                return setPage(i - 1);
	              }
	            }
	          }, [i]);

	          if (i <= totalPages + 1) {
	            paginationButtons.push(pageBtn);
	          }
	        };

	        for (var i = start; i < totalPagesToShow; i += 1) {
	          _loop(i);
	        }
	      }

	      return paginationButtons;
	    };

	    return h("div", {
	      "class": pagination + " " + getClassName(props.innerClass, 'pagination')
	    }, [h(Button, {
	      "class": getClassName(props.innerClass, 'button') || '',
	      "attrs": {
	        "disabled": props.currentPage === 0,
	        "tabIndex": "0"
	      },
	      "on": {
	        "keyPress": function keyPress(event) {
	          return handleA11yAction(event, onPrevPage);
	        },
	        "click": onPrevPage
	      }
	    }, ["Prev"]), h(Button, {
	      "class": className,
	      "attrs": {
	        "primary": primary,
	        "tabIndex": "0"
	      },
	      "on": {
	        "keyPress": function keyPress(event) {
	          return handleA11yAction(event, function () {
	            return props.setPage(0);
	          });
	        },
	        "click": function click() {
	          return props.setPage(0);
	        }
	      }
	    }, ["1"]), props.showEndPage && props.currentPage >= Math.floor(props.pages / 2) + !!(props.pages % 2) ? h("span", ["..."]) : null, (props.currentPage <= props.totalPages - props.pages + 2 || props.totalPages <= props.pages) && buildPaginationDOM('start'), props.showEndPage && props.pages > 2 && props.currentPage <= props.totalPages - Math.ceil(props.pages * 0.75) ? h("span", ["..."]) : null, props.showEndPage && buildPaginationDOM('end'), h(Button, {
	      "class": getClassName(props.innerClass, 'button') || '',
	      "attrs": {
	        "disabled": props.currentPage >= props.totalPages - 1,
	        "tabIndex": "0"
	      },
	      "on": {
	        "keyPress": function keyPress(event) {
	          return handleA11yAction(event, onNextPage);
	        },
	        "click": onNextPage
	      }
	    }, ["Next"])]);
	  }
	};

	Pagination.install = function (Vue) {
	  Vue.component(Pagination.name, Pagination);
	};

	function _templateObject$1() {
	  var data = _taggedTemplateLiteralLoose(["\n\twidth: 110px;\n"]);

	  _templateObject$1 = function _templateObject() {
	    return data;
	  };

	  return data;
	}
	var PoweredByImage = index$1('img')(_templateObject$1());

	var PoweredBy = {
	  functional: true,
	  render: function render(h) {
	    return h("a", {
	      "attrs": {
	        "href": "https://appbase.io/",
	        "target": "_blank",
	        "rel": "noopener noreferrer"
	      }
	    }, [h(PoweredByImage, {
	      "attrs": {
	        "src": "https://cdn.jsdelivr.net/gh/appbaseio/cdn@d2ec210045e59104ee5485841fa17b23fc83f097/appbase/logos/rbc-logo.svg"
	      }
	    })]);
	  }
	};

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */

	var randomString$1 = function randomString() {
	  return Math.random().toString(36).substring(7).split('').join('.');
	};

	var ActionTypes$1 = {
	  INIT: "@@redux/INIT" + randomString$1(),
	  REPLACE: "@@redux/REPLACE" + randomString$1(),
	  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
	    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString$1();
	  }
	};
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */


	function warning$1(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */


	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	  } catch (e) {} // eslint-disable-line no-empty

	}

	function bindActionCreator$1(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(this, arguments));
	  };
	}
	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */


	function bindActionCreators$1(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator$1(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];

	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator$1(actionCreator, dispatch);
	    }
	  }

	  return boundActionCreators;
	}
	/*
	 * This is a dummy function to check if the function name has been altered by minification.
	 * If the function has been minified and NODE_ENV !== 'production', warn the user.
	 */


	function isCrushed$1() {}

	if ( typeof isCrushed$1.name === 'string' && isCrushed$1.name !== 'isCrushed') {
	  warning$1('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
	}

	// Credit to React-Redux for this util function
	// https://github.com/reactjs/react-redux/blob/573db0bfc8d1d50fdb6e2a98bd8a7d4675fecf11/src/utils/shallowEqual.js
	var hasOwn$1 = Object.prototype.hasOwnProperty;

	function is(x, y) {
	  if (x === y) {
	    return x !== 0 || y !== 0 || 1 / x === 1 / y;
	  } // eslint-disable-next-line


	  return x !== x && y !== y;
	}

	function shallowEqual(objA, objB) {
	  if (is(objA, objB)) return true;

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	  if (keysA.length !== keysB.length) return false;

	  for (var i = 0; i < keysA.length; i += 1) {
	    if (!hasOwn$1.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }

	  return true;
	}

	var defaultMapState = function defaultMapState() {
	  return {};
	};

	var defaultMapDispatch = {};

	var normalizeMapState = function normalizeMapState(mapState) {
	  if (typeof mapState === 'function') return mapState;

	  if (mapState === Object(mapState)) {
	    return function (state, ownProps) {
	      return Object.keys(mapState).filter(function (key) {
	        return typeof mapState[key] === 'function';
	      }).reduce(function (map, key) {
	        var _extends2;

	        return _extends({}, map, (_extends2 = {}, _extends2[key] = mapState[key](state, ownProps), _extends2));
	      }, {});
	    };
	  }

	  throw new Error('[revux] - mapState provided to connect is invalid');
	}; // eslint-disable-next-line


	var connector = function connector(_mapState, mapDispatch) {
	  if (_mapState === void 0) {
	    _mapState = defaultMapState;
	  }

	  if (mapDispatch === void 0) {
	    mapDispatch = defaultMapDispatch;
	  }

	  return function (component) {
	    var mapState = normalizeMapState(_mapState);
	    return {
	      name: "connect-" + component.name,
	      mixins: [component],
	      inject: ['$$store'],
	      data: function data() {
	        var merged = _extends({}, mapState(this.$$store.getState(), this.$props || {}), {}, bindActionCreators$1(mapDispatch, this.$$store.dispatch));

	        return Object.keys(merged).reduce(function (data, key) {
	          var _extends3;

	          return _extends({}, data, (_extends3 = {}, _extends3[key] = merged[key], _extends3));
	        }, {});
	      },
	      created: function created() {
	        var _this = this;

	        var getMappedState = function getMappedState(state) {
	          return mapState(state, _this.$props || {});
	        };

	        var observeStore = function observeStore(store, select, onChange) {
	          var currentState = select(store.getState());
	          return store.subscribe(function () {
	            var nextState = select(store.getState());

	            if (!shallowEqual(currentState, nextState)) {
	              var previousState = currentState;
	              currentState = nextState;
	              onChange(currentState, previousState);
	            }
	          });
	        };

	        this._unsubscribe = observeStore(this.$$store, getMappedState, function (newState) {
	          Object.keys(newState).forEach(function (key) {
	            _this.$set(_this, key, newState[key]);
	          });
	        });
	      },
	      beforeDestroy: function beforeDestroy() {
	        this._unsubscribe();
	      }
	    };
	  };
	};

	// import { storeKey } from '@appbaseio/reactivecore';

	var connect = function connect() {
	  return connector.apply(void 0, arguments);
	}; // connectToStore(...args, null, {
	//   storeKey,
	// });

	var composeThemeObject = function composeThemeObject(ownTheme, userTheme) {
	  if (ownTheme === void 0) {
	    ownTheme = {};
	  }

	  if (userTheme === void 0) {
	    userTheme = {};
	  }

	  return {
	    typography: _extends({}, ownTheme.typography, {}, userTheme.typography),
	    colors: _extends({}, ownTheme.colors, {}, userTheme.colors),
	    component: _extends({}, ownTheme.component, {}, userTheme.component)
	  };
	};
	/**
	 * To determine wether an element is a function
	 * @param {any} element
	 */

	var isFunction$1 = function isFunction(element) {
	  return typeof element === 'function';
	}; // parses current array (i.e. this.props.value) for `onChange` callback for multi-* components

	function parseValueArray(objectValues, currentValue) {
	  var keys = Object.keys(objectValues);
	  var selectedValues = keys.map(function (key) {
	    return objectValues[key] ? key : null;
	  });

	  if (selectedValues.includes(currentValue)) {
	    return selectedValues.filter(function (item) {
	      return item !== currentValue;
	    });
	  }

	  return [].concat(selectedValues, [currentValue]);
	}

	function _templateObject11() {
	  var data = _taggedTemplateLiteralLoose(["\n\t\t\tflex-basis: ", ";\n\t\t"]);

	  _templateObject11 = function _templateObject11() {
	    return data;
	  };

	  return data;
	}

	function _templateObject10() {
	  var data = _taggedTemplateLiteralLoose(["\n\t\t\tflex-direction: ", ";\n\t\t"]);

	  _templateObject10 = function _templateObject10() {
	    return data;
	  };

	  return data;
	}

	function _templateObject9() {
	  var data = _taggedTemplateLiteralLoose(["\n\t\t\tflex: ", ";\n\t\t"]);

	  _templateObject9 = function _templateObject9() {
	    return data;
	  };

	  return data;
	}

	function _templateObject8$1() {
	  var data = _taggedTemplateLiteralLoose(["\n\t\t\talign-items: ", ";\n\t\t"]);

	  _templateObject8$1 = function _templateObject8() {
	    return data;
	  };

	  return data;
	}

	function _templateObject7$1() {
	  var data = _taggedTemplateLiteralLoose(["\n\t\t\tjustify-content: ", ";\n\t\t"]);

	  _templateObject7$1 = function _templateObject7() {
	    return data;
	  };

	  return data;
	}

	function _templateObject6$1() {
	  var data = _taggedTemplateLiteralLoose(["\n\tdisplay: ", ";\n\t", ";\n\t", ";\n\t", ";\n\t", ";\n\t", ";\n\n\t", ";\n\t", ";\n\n\t", ";\n\t", ";\n\t", ";\n\n\tsvg.cancel-icon {\n\t\tcursor: pointer;\n\t\tfill: ", ";\n\t\tflex-basis: 30px;\n\n\t\t&:hover {\n\t\t\tfill: ", ";\n\t\t}\n\t}\n"]);

	  _templateObject6$1 = function _templateObject6() {
	    return data;
	  };

	  return data;
	}

	function _templateObject5$1() {
	  var data = _taggedTemplateLiteralLoose(["\n\tborder: 1px solid ", ";\n"]);

	  _templateObject5$1 = function _templateObject5() {
	    return data;
	  };

	  return data;
	}

	function _templateObject4$1() {
	  var data = _taggedTemplateLiteralLoose(["\n\tflex-direction: column-reverse;\n"]);

	  _templateObject4$1 = function _templateObject4() {
	    return data;
	  };

	  return data;
	}

	function _templateObject3$1() {
	  var data = _taggedTemplateLiteralLoose(["\n\tflex-direction: column;\n"]);

	  _templateObject3$1 = function _templateObject3() {
	    return data;
	  };

	  return data;
	}

	function _templateObject2$1() {
	  var data = _taggedTemplateLiteralLoose(["\n\tflex-direction: row-reverse;\n\talign-items: center;\n"]);

	  _templateObject2$1 = function _templateObject2() {
	    return data;
	  };

	  return data;
	}

	function _templateObject$2() {
	  var data = _taggedTemplateLiteralLoose(["\n\tflex-direction: row;\n\talign-items: center;\n"]);

	  _templateObject$2 = function _templateObject() {
	    return data;
	  };

	  return data;
	}
	var leftLabel = css(_templateObject$2());
	var rightLabel = css(_templateObject2$1());
	var topLabel = css(_templateObject3$1());
	var bottomLabel = css(_templateObject4$1());

	var border = function border(_ref) {
	  var colors = _ref.theme.colors;
	  return css(_templateObject5$1(), colors.borderColor || '#ccc');
	};

	var Flex = index$1('div')(_templateObject6$1(), function (props) {
	  return props.inline ? 'inline-flex' : 'flex';
	}, function (props) {
	  return (props.labelPosition === 'left' || props.iconPosition === 'right') && leftLabel;
	}, function (props) {
	  return (props.labelPosition === 'right' || props.iconPosition === 'left') && rightLabel;
	}, function (props) {
	  return props.labelPosition === 'top' && topLabel;
	}, function (props) {
	  return props.labelPosition === 'bottom' && bottomLabel;
	}, function (props) {
	  return props.showBorder && border;
	}, function (props) {
	  return props.justifyContent && css(_templateObject7$1(), props.justifyContent);
	}, function (props) {
	  return props.alignItems && css(_templateObject8$1(), props.alignItems);
	}, function (props) {
	  return props.flex && css(_templateObject9(), props.flex);
	}, function (props) {
	  return props.direction && css(_templateObject10(), props.direction);
	}, function (props) {
	  return props.basis && css(_templateObject11(), props.basis);
	}, function (_ref2) {
	  var colors = _ref2.theme.colors;
	  return colors.borderColor || curriedLighten(0.3, colors.textColor);
	}, function (_ref3) {
	  var theme = _ref3.theme;
	  return theme.colors.textColor;
	});

	function _templateObject2$2() {
	  var data = _taggedTemplateLiteralLoose(["\n\tcolor: #424242;\n\theight: 32px;\n\tfont-size: 0.82rem;\n\tpadding: 0 25px 0 10px;\n\tbackground: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+)\n\t\tno-repeat 95% 50%;\n\tbackground-color: #fff;\n\t-moz-appearance: none;\n\t-webkit-appearance: none;\n\tappearance: none;\n\t-webkit-border-radius: 0;\n\tborder-radius: 0;\n\tborder: 0;\n\toutline: 1px solid #ddd;\n\toutline-offset: -1px;\n"]);

	  _templateObject2$2 = function _templateObject2() {
	    return data;
	  };

	  return data;
	}

	function _templateObject$3() {
	  var data = _taggedTemplateLiteralLoose(["\n\tflex-grow: 1;\n\tfont-size: 0.82rem;\n"]);

	  _templateObject$3 = function _templateObject() {
	    return data;
	  };

	  return data;
	}
	var resultStats = css(_templateObject$3());
	var sortOptions = css(_templateObject2$2());

	var addComponent = lib_5.addComponent,
	    removeComponent = lib_5.removeComponent,
	    setStreaming = lib_5.setStreaming,
	    watchComponent = lib_5.watchComponent,
	    setQueryOptions = lib_5.setQueryOptions,
	    updateQuery = lib_5.updateQuery,
	    loadMore = lib_5.loadMore,
	    setValue = lib_5.setValue,
	    setQueryListener = lib_5.setQueryListener;
	var isEqual = lib_8.isEqual,
	    getQueryOptions = lib_8.getQueryOptions,
	    pushToAndClause = lib_8.pushToAndClause,
	    getClassName$1 = lib_8.getClassName,
	    parseHits = lib_8.parseHits,
	    getOptionsFromQuery = lib_8.getOptionsFromQuery;
	var ReactiveList = {
	  name: 'ReactiveList',
	  data: function data() {
	    var props = this.$props;
	    var $currentPage = 0;

	    if (props.currentPage) {
	      $currentPage = Math.max(props.currentPage - 1, 0);
	    }

	    this.__state = {
	      from: $currentPage * props.size,
	      isLoading: true,
	      $currentPage: $currentPage
	    };
	    return this.__state;
	  },
	  created: function created() {
	    var _this = this;

	    if (this.defaultPage >= 0) {
	      this.$currentPage = this.defaultPage;
	      this.from = this.$currentPage * this.$props.size;
	    }

	    this.isLoading = true;
	    this.internalComponent = this.$props.componentId + "__internal";

	    var onQueryChange = function onQueryChange() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      _this.$emit.apply(_this, ['queryChange'].concat(args));
	    };

	    var onError = function onError(e) {
	      _this.$emit('error', e);
	    };

	    this.setQueryListener(this.$props.componentId, onQueryChange, onError);
	  },
	  props: {
	    currentPage: VueTypes.number.def(0),
	    includeFields: types.includeFields.def(['*']),
	    // component props
	    className: types.string,
	    componentId: types.stringRequired,
	    dataField: types.stringRequired,
	    defaultQuery: types.func,
	    excludeFields: types.excludeFields.def([]),
	    innerClass: types.style,
	    listClass: VueTypes.string.def(''),
	    loader: types.title,
	    renderAllData: types.func,
	    renderData: types.func,
	    renderNoResults: VueTypes.any.def('No Results found.'),
	    renderError: types.title,
	    renderResultStats: types.func,
	    pages: VueTypes.number.def(5),
	    pagination: VueTypes.bool.def(false),
	    paginationAt: types.paginationAt.def('bottom'),
	    react: types.react,
	    showResultStats: VueTypes.bool.def(true),
	    showEndPage: VueTypes.bool.def(false),
	    size: VueTypes.number.def(10),
	    sortBy: types.sortBy,
	    sortOptions: types.sortOptions,
	    stream: types.bool,
	    URLParams: VueTypes.bool.def(false)
	  },
	  computed: {
	    totalPages: function totalPages() {
	      return Math.ceil(this.total / this.$props.size) || 0;
	    },
	    hasPageChangeListener: function hasPageChangeListener() {
	      return this.$listeners && this.$listeners.pageChange;
	    },
	    hasResultStatsListener: function hasResultStatsListener() {
	      return this.$listeners && this.$listeners.resultStats;
	    },
	    stats: function stats() {
	      var results = parseHits(this.$data.hits) || [];
	      var streamResults = parseHits(this.$data.streamHits) || [];
	      var filteredResults = results;

	      if (streamResults.length) {
	        var ids = streamResults.map(function (item) {
	          return item._id;
	        });
	        filteredResults = filteredResults.filter(function (item) {
	          return !ids.includes(item._id);
	        });
	      }

	      return {
	        totalResults: this.$data.total,
	        totalPages: Math.ceil(this.$data.total / this.$props.size),
	        displayedResults: [].concat(streamResults, filteredResults).length,
	        time: this.$data.time,
	        currentPage: this.$data.currentPage
	      };
	    }
	  },
	  watch: {
	    sortOptions: function sortOptions(newVal, oldVal) {
	      if (!isEqual(oldVal, newVal)) {
	        this.updateQueryOptions(this.$props);
	      }
	    },
	    sortBy: function sortBy(newVal, oldVal) {
	      if (oldVal !== newVal) {
	        this.updateQueryOptions(this.$props);
	      }
	    },
	    size: function size(newVal, oldVal) {
	      if (oldVal !== newVal) {
	        this.updateQueryOptions(this.$props);
	      }
	    },
	    dataField: function dataField(newVal, oldVal) {
	      if (oldVal !== newVal) {
	        this.updateQueryOptions(this.$props);
	      }
	    },
	    includeFields: function includeFields(newVal, oldVal) {
	      if (oldVal !== newVal) {
	        this.updateQueryOptions(this.$props);
	      }
	    },
	    excludeFields: function excludeFields(newVal, oldVal) {
	      if (oldVal !== newVal) {
	        this.updateQueryOptions(this.$props);
	      }
	    },
	    defaultQuery: function defaultQuery(newVal, oldVal) {
	      if (newVal && !isEqual(newVal(), oldVal)) {
	        var options = getQueryOptions(this.$props);
	        options.from = 0;
	        this.$defaultQuery = newVal();

	        var _this$$defaultQuery = this.$defaultQuery,
	            sort = _this$$defaultQuery.sort,
	            query = _objectWithoutPropertiesLoose(_this$$defaultQuery, ["sort"]);

	        if (sort) {
	          options.sort = this.$defaultQuery.sort;
	        }

	        var queryOptions = getOptionsFromQuery(this.$defaultQuery);

	        if (queryOptions) {
	          options = _extends({}, options, {}, getOptionsFromQuery(this.$defaultQuery));
	        }

	        this.setQueryOptions(this.$props.componentId, options, !query);
	        this.updateQuery({
	          componentId: this.internalComponent,
	          query: query
	        }, true); // reset page because of query change

	        this.$currentPage = 0;
	        this.from = 0;
	      }
	    },
	    stream: function stream(newVal, oldVal) {
	      if (oldVal !== newVal) {
	        this.setStreaming(this.$props.componentId, newVal);
	      }
	    },
	    react: function react(newVal, oldVal) {
	      if (!isEqual(newVal, oldVal)) {
	        this.setReact(this.$props);
	      }
	    },
	    streamHits: function streamHits() {
	      this.$emit('data', this.getAllData());
	    },
	    hits: function hits(newVal, oldVal) {
	      this.$emit('data', this.getAllData());
	      this.$emit('resultStats', this.stats);

	      if (this.$props.pagination) {
	        // called when page is changed
	        if (this.isLoading && (oldVal || newVal)) {
	          if (this.hasPageChangeListener) {
	            this.$emit('pageChange', this.$currentPage + 1, this.totalPages);
	          } else {
	            window.scrollTo(0, 0);
	          }

	          this.isLoading = false;
	        }
	      } else if (oldVal && newVal) {
	        if (oldVal.length !== newVal.length || newVal.length === this.$props.total) {
	          this.isLoading = false;

	          if (newVal.length < oldVal.length) {
	            // query has changed
	            window.scrollTo(0, 0);
	            this.from = 0;
	          }
	        }
	      } else if ((!oldVal || !oldVal.length) && newVal) {
	        this.isLoading = false;
	      }
	    },
	    total: function total(newVal, oldVal) {
	      if (this.$props.pagination && newVal !== oldVal) {
	        var currentPage = this.$data.total ? 0 : this.$currentPage;
	        this.$currentPage = currentPage;
	        this.$emit('pageChange', currentPage + 1, this.totalPages);
	      }
	    },
	    currentPage: function currentPage(newVal, oldVal) {
	      if (oldVal !== newVal && newVal > 0 && newVal <= this.totalPages) {
	        this.setPage(newVal - 1);
	      }
	    },
	    pagination: function pagination(newVal, oldVal) {
	      if (newVal !== oldVal) {
	        if (newVal) {
	          window.addEventListener('scroll', this.scrollHandler);
	        } else {
	          window.removeEventListener('scroll', this.scrollHandler);
	        }
	      } // handle window url history change (on native back and forth interactions)

	    },
	    defaultPage: function defaultPage(newVal) {
	      if (this.$currentPage !== newVal && this.defaultPage !== newVal) {
	        this.setPage(newVal >= 0 ? newVal : 0);
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.addComponent(this.internalComponent);
	    this.addComponent(this.$props.componentId);

	    if (this.$props.stream) {
	      this.setStreaming(this.$props.componentId, true);
	    }

	    var options = getQueryOptions(this.$props);
	    options.from = this.$data.from;

	    if (this.$props.sortOptions) {
	      var _ref;

	      options.sort = [(_ref = {}, _ref[this.$props.sortOptions[0].dataField] = {
	        order: this.$props.sortOptions[0].sortBy
	      }, _ref)];
	    } else if (this.$props.sortBy) {
	      var _ref2;

	      options.sort = [(_ref2 = {}, _ref2[this.$props.dataField] = {
	        order: this.$props.sortBy
	      }, _ref2)];
	    } // Override sort query with defaultQuery's sort if defined


	    this.$defaultQuery = null;

	    if (this.$props.defaultQuery) {
	      this.$defaultQuery = this.$props.defaultQuery();
	      options = _extends({}, options, {}, getOptionsFromQuery(this.$defaultQuery));

	      if (this.$defaultQuery.sort) {
	        options.sort = this.$defaultQuery.sort;
	      }
	    } // execute is set to false at the time of mount


	    var _ref3 = this.$defaultQuery || {},
	        sort = _ref3.sort,
	        query = _objectWithoutPropertiesLoose(_ref3, ["sort"]); // to avoid firing (multiple) partial queries.
	    // Hence we are building the query in parts here
	    // and only executing it with setReact() at core


	    var execute = false;
	    this.setQueryOptions(this.$props.componentId, options, execute);

	    if (this.$defaultQuery) {
	      this.updateQuery({
	        componentId: this.internalComponent,
	        query: query
	      }, execute);
	    } else {
	      this.updateQuery({
	        componentId: this.internalComponent,
	        query: null
	      }, execute);
	    } // query will be executed here


	    this.setReact(this.$props);

	    if (!this.$props.pagination) {
	      window.addEventListener('scroll', this.scrollHandler);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.removeComponent(this.$props.componentId);
	    this.removeComponent(this.internalComponent);
	    window.removeEventListener('scroll', this.scrollHandler);
	  },
	  render: function render() {
	    var _this2 = this;

	    var h = arguments[0];
	    var size = this.$props.size;
	    var hits = this.$data.hits;
	    var results = parseHits(hits) || [];
	    var streamResults = parseHits(this.$data.streamHits) || [];
	    var filteredResults = results;
	    var renderData = this.$scopedSlots.renderData || this.$props.renderData;

	    if (streamResults.length) {
	      var ids = streamResults.map(function (item) {
	        return item._id;
	      });
	      filteredResults = filteredResults.filter(function (item) {
	        return !ids.includes(item._id);
	      });
	    }

	    return h("div", {
	      "style": this.$props.style,
	      "class": this.$props.className
	    }, [this.isLoading && this.$props.pagination && (this.$scopedSlots.loader || this.$props.loader), this.renderErrorComponent(), h(Flex, {
	      "attrs": {
	        "labelPosition": this.$props.sortOptions ? 'right' : 'left'
	      },
	      "class": getClassName$1(this.$props.innerClass, 'resultsInfo')
	    }, [this.$props.sortOptions ? this.renderSortOptions() : null, this.$props.showResultStats ? this.renderStats() : null]), !this.isLoading && results.length === 0 && streamResults.length === 0 ? this.renderNoResult() : null, this.$props.pagination && (this.$props.paginationAt === 'top' || this.$props.paginationAt === 'both') ? h(Pagination, {
	      "attrs": {
	        "pages": this.$props.pages,
	        "totalPages": this.totalPages,
	        "currentPage": this.$currentPage,
	        "setPage": this.setPage,
	        "innerClass": this.$props.innerClass
	      }
	    }) : null, this.$scopedSlots.renderAllData ? this.$scopedSlots.renderAllData(this.getAllData()) : h("div", {
	      "class": this.$props.listClass + " " + getClassName$1(this.$props.innerClass, 'list')
	    }, [[].concat(streamResults, filteredResults).map(function (item, index) {
	      return renderData({
	        item: item,
	        triggerClickAnalytics: function triggerClickAnalytics() {
	          return _this2.triggerClickAnalytics(_this2.$currentPage * size + index);
	        }
	      });
	    })]), this.isLoading && !this.$props.pagination ? this.$props.loader || h("div", {
	      "style": {
	        textAlign: 'center',
	        margin: '20px 0',
	        color: '#666'
	      }
	    }, ["Loading..."]) : null, this.$props.pagination && (this.$props.paginationAt === 'bottom' || this.$props.paginationAt === 'both') ? h(Pagination, {
	      "attrs": {
	        "pages": this.$props.pages,
	        "totalPages": Math.ceil(this.$data.total / this.$props.size),
	        "currentPage": this.$currentPage,
	        "setPage": this.setPage,
	        "showEndPage": this.$props.showEndPage,
	        "innerClass": this.$props.innerClass
	      }
	    }) : null, this.config.url.endsWith('appbase.io') && results.length ? h(Flex, {
	      "attrs": {
	        "direction": "row-reverse"
	      },
	      "class": getClassName$1(this.$props.innerClass, 'poweredBy')
	    }, [h(PoweredBy)]) : null]);
	  },
	  methods: {
	    renderErrorComponent: function renderErrorComponent() {
	      var renderError = this.$scopedSlots.renderError || this.$props.renderError;

	      if (renderError && this.error && !this.isLoading) {
	        return isFunction$1(renderError) ? renderError(this.error) : renderError;
	      }

	      return null;
	    },
	    updateQueryOptions: function updateQueryOptions(props) {
	      var options = getQueryOptions(props);
	      options.from = this.$data.from;

	      if (props.sortOptions) {
	        var _ref4;

	        options.sort = [(_ref4 = {}, _ref4[props.sortOptions[0].dataField] = {
	          order: props.sortOptions[0].sortBy
	        }, _ref4)];
	      } else if (props.sortBy) {
	        var _ref5;

	        options.sort = [(_ref5 = {}, _ref5[props.dataField] = {
	          order: props.sortBy
	        }, _ref5)];
	      }

	      this.setQueryOptions(this.$props.componentId, options, true);
	    },
	    setReact: function setReact(props) {
	      var react = props.react;

	      if (react) {
	        var newReact = pushToAndClause(react, this.internalComponent);
	        this.watchComponent(props.componentId, newReact);
	      } else {
	        this.watchComponent(props.componentId, {
	          and: this.internalComponent
	        });
	      }
	    },
	    scrollHandler: function scrollHandler() {
	      if (!this.isLoading && window.innerHeight + window.pageYOffset + 300 >= document.body.offsetHeight) {
	        this.loadMore();
	      }
	    },
	    loadMore: function loadMore() {
	      if (this.hits && !this.$props.pagination && this.total !== this.hits.length) {
	        var value = this.$data.from + this.$props.size;
	        var options = getQueryOptions(this.$props);
	        this.from = value;
	        this.isLoading = true;
	        this.loadMoreAction(this.$props.componentId, _extends({}, options, {
	          from: value
	        }), true);
	      } else if (this.isLoading) {
	        this.isLoading = false;
	      }
	    },
	    setPage: function setPage(page) {
	      // pageClick will be called everytime a pagination button is clicked
	      if (page !== this.$currentPage) {
	        this.$emit('pageClick', page + 1);
	        var value = this.$props.size * page;
	        var options = getQueryOptions(this.$props);
	        options.from = this.$data.from;
	        this.from = value;
	        this.isLoading = true;
	        this.$currentPage = page;
	        this.loadMoreAction(this.$props.componentId, _extends({}, options, {
	          from: value
	        }), false);

	        if (this.$props.URLParams) {
	          this.setPageURL(this.$props.componentId, page + 1, this.$props.componentId, false, true);
	        }
	      }
	    },
	    renderStats: function renderStats() {
	      var h = this.$createElement;
	      var renderResultStats = this.$scopedSlots.renderResultStats || this.$props.renderResultStats;

	      if (renderResultStats && this.$data.total) {
	        return renderResultStats(this.stats);
	      } else if (this.$data.total) {
	        return h("p", {
	          "class": resultStats + " " + getClassName$1(this.$props.innerClass, 'resultStats')
	        }, [this.$data.total, " results found in ", this.$data.time, "ms"]);
	      }

	      return null;
	    },
	    renderNoResult: function renderNoResult() {
	      var h = this.$createElement;
	      var renderNoResults = this.$scopedSlots.renderNoResults || this.$props.renderNoResults;
	      return h("p", {
	        "class": getClassName$1(this.$props.innerClass, 'noResults') || null
	      }, [isFunction$1(renderNoResults) ? renderNoResults() : renderNoResults]);
	    },
	    handleSortChange: function handleSortChange(e) {
	      var _ref6;

	      var index = e.target.value; // This fixes issue #371 (where sorting a multi-result page with infinite loader breaks)

	      var options = getQueryOptions(this.$props);
	      options.from = 0;
	      options.sort = [(_ref6 = {}, _ref6[this.$props.sortOptions[index].dataField] = {
	        order: this.$props.sortOptions[index].sortBy
	      }, _ref6)];
	      this.setQueryOptions(this.$props.componentId, options, true);
	      this.$currentPage = 0;
	      this.from = 0;
	    },
	    triggerClickAnalytics: function triggerClickAnalytics(searchPosition) {
	      // click analytics would only work client side and after javascript loads
	      var config = this.config,
	          searchId = this.analytics.searchId;
	      var url = config.url,
	          app = config.app,
	          credentials = config.credentials;

	      if (config.analytics && searchId) {
	        fetch(url + "/" + app + "/_analytics", {
	          method: 'POST',
	          headers: {
	            'Content-Type': 'application/json',
	            Authorization: "Basic " + btoa(credentials),
	            'X-Search-Id': searchId,
	            'X-Search-Click': true,
	            'X-Search-ClickPosition': searchPosition + 1
	          }
	        });
	      }
	    },
	    renderSortOptions: function renderSortOptions() {
	      var h = this.$createElement;
	      return h("select", {
	        "class": sortOptions + " " + getClassName$1(this.$props.innerClass, 'sortOptions'),
	        "attrs": {
	          "name": "sort-options"
	        },
	        "on": {
	          "change": this.handleSortChange
	        }
	      }, [this.$props.sortOptions.map(function (sort, index) {
	        return h("option", {
	          "key": sort.label,
	          "domProps": {
	            "value": index
	          }
	        }, [sort.label]);
	      })]);
	    },
	    // Shape of the object to be returned in onData & renderAllData
	    getAllData: function getAllData() {
	      var size = this.$props.size;
	      var _this$$data = this.$data,
	          hits = _this$$data.hits,
	          streamHits = _this$$data.streamHits;
	      var results = parseHits(hits) || [];
	      var streamResults = parseHits(streamHits) || [];
	      return {
	        results: results,
	        streamResults: streamResults,
	        loadMore: this.loadMore,
	        base: this.$currentPage * size,
	        triggerClickAnalytics: this.triggerClickAnalytics
	      };
	    }
	  }
	};

	var mapStateToProps = function mapStateToProps(state, props) {
	  return {
	    defaultPage: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value - 1 || -1,
	    hits: state.hits[props.componentId] && state.hits[props.componentId].hits,
	    streamHits: state.streamHits[props.componentId],
	    time: state.hits[props.componentId] && state.hits[props.componentId].time || 0,
	    total: state.hits[props.componentId] && state.hits[props.componentId].total,
	    analytics: state.analytics,
	    config: state.config,
	    error: state.error[props.componentId]
	  };
	};

	var mapDispatchtoProps = {
	  addComponent: addComponent,
	  loadMoreAction: loadMore,
	  removeComponent: removeComponent,
	  setPageURL: setValue,
	  setQueryOptions: setQueryOptions,
	  setQueryListener: setQueryListener,
	  setStreaming: setStreaming,
	  updateQuery: updateQuery,
	  watchComponent: watchComponent
	}; // Only used for SSR

	ReactiveList.generateQueryOptions = function (props) {
	  // simulate default (includeFields and excludeFields) props to generate consistent query
	  var options = getQueryOptions(_extends({
	    includeFields: ['*'],
	    excludeFields: []
	  }, props));
	  options.from = props.currentPage ? (props.currentPage - 1) * (props.size || 10) : 0;
	  options.size = props.size || 10;

	  if (props.sortOptions) {
	    var _ref7;

	    options.sort = [(_ref7 = {}, _ref7[props.sortOptions[0].dataField] = {
	      order: props.sortOptions[0].sortBy
	    }, _ref7)];
	  } else if (props.sortBy) {
	    var _ref8;

	    options.sort = [(_ref8 = {}, _ref8[props.dataField] = {
	      order: props.sortBy
	    }, _ref8)];
	  }

	  return options;
	};

	var RLConnected = connect(mapStateToProps, mapDispatchtoProps)(ReactiveList);

	ReactiveList.install = function (Vue) {
	  Vue.component(ReactiveList.name, RLConnected);
	};

	function URL(url) {
	  var pattern = RegExp("^(([^:/?#]*)?://)?(((.*)?@)?([^/?#]*)?)([^?#]*)(\\?([^#]*))?(#(.*))?");
	  var matches = url.match(pattern);
	  return {
	    protocol: matches[2],
	    auth: matches[5],
	    host: matches[6],
	    path: matches[7],
	    query: matches[9],
	    hash: matches[11]
	  };
	}

	var urlParserLite = URL;

	// Copyright Joyent, Inc. and other Node contributors.
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707

	function hasOwnProperty$2(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	var decode = function decode(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);
	  var maxKeys = 1000;

	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length; // maxKeys <= 0 means that we should not limit keys count

	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr,
	        vstr,
	        k,
	        v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty$2(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};

	// Copyright Joyent, Inc. and other Node contributors.

	var stringifyPrimitive = function stringifyPrimitive(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	var encode = function encode(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';

	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function (k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;

	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function (v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
	};

	var querystring = createCommonjsModule(function (module, exports) {

	  exports.decode = exports.parse = decode;
	  exports.encode = exports.stringify = encode;
	});
	var querystring_1 = querystring.decode;
	var querystring_2 = querystring.parse;
	var querystring_3 = querystring.encode;
	var querystring_4 = querystring.stringify;

	var browserPonyfill$1 = createCommonjsModule(function (module) {
	  var __root__ = function (root) {
	    function F() {
	      this.fetch = false;
	    }

	    F.prototype = root;
	    return new F();
	  }(typeof self !== 'undefined' ? self : commonjsGlobal);

	  (function (self) {
	    (function (self) {
	      if (self.fetch) {
	        return;
	      }

	      var support = {
	        searchParams: 'URLSearchParams' in self,
	        iterable: 'Symbol' in self && 'iterator' in Symbol,
	        blob: 'FileReader' in self && 'Blob' in self && function () {
	          try {
	            new Blob();
	            return true;
	          } catch (e) {
	            return false;
	          }
	        }(),
	        formData: 'FormData' in self,
	        arrayBuffer: 'ArrayBuffer' in self
	      };

	      if (support.arrayBuffer) {
	        var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

	        var isDataView = function isDataView(obj) {
	          return obj && DataView.prototype.isPrototypeOf(obj);
	        };

	        var isArrayBufferView = ArrayBuffer.isView || function (obj) {
	          return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
	        };
	      }

	      function normalizeName(name) {
	        if (typeof name !== 'string') {
	          name = String(name);
	        }

	        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	          throw new TypeError('Invalid character in header field name');
	        }

	        return name.toLowerCase();
	      }

	      function normalizeValue(value) {
	        if (typeof value !== 'string') {
	          value = String(value);
	        }

	        return value;
	      } // Build a destructive iterator for the value list


	      function iteratorFor(items) {
	        var iterator = {
	          next: function next() {
	            var value = items.shift();
	            return {
	              done: value === undefined,
	              value: value
	            };
	          }
	        };

	        if (support.iterable) {
	          iterator[Symbol.iterator] = function () {
	            return iterator;
	          };
	        }

	        return iterator;
	      }

	      function Headers(headers) {
	        this.map = {};

	        if (headers instanceof Headers) {
	          headers.forEach(function (value, name) {
	            this.append(name, value);
	          }, this);
	        } else if (Array.isArray(headers)) {
	          headers.forEach(function (header) {
	            this.append(header[0], header[1]);
	          }, this);
	        } else if (headers) {
	          Object.getOwnPropertyNames(headers).forEach(function (name) {
	            this.append(name, headers[name]);
	          }, this);
	        }
	      }

	      Headers.prototype.append = function (name, value) {
	        name = normalizeName(name);
	        value = normalizeValue(value);
	        var oldValue = this.map[name];
	        this.map[name] = oldValue ? oldValue + ',' + value : value;
	      };

	      Headers.prototype['delete'] = function (name) {
	        delete this.map[normalizeName(name)];
	      };

	      Headers.prototype.get = function (name) {
	        name = normalizeName(name);
	        return this.has(name) ? this.map[name] : null;
	      };

	      Headers.prototype.has = function (name) {
	        return this.map.hasOwnProperty(normalizeName(name));
	      };

	      Headers.prototype.set = function (name, value) {
	        this.map[normalizeName(name)] = normalizeValue(value);
	      };

	      Headers.prototype.forEach = function (callback, thisArg) {
	        for (var name in this.map) {
	          if (this.map.hasOwnProperty(name)) {
	            callback.call(thisArg, this.map[name], name, this);
	          }
	        }
	      };

	      Headers.prototype.keys = function () {
	        var items = [];
	        this.forEach(function (value, name) {
	          items.push(name);
	        });
	        return iteratorFor(items);
	      };

	      Headers.prototype.values = function () {
	        var items = [];
	        this.forEach(function (value) {
	          items.push(value);
	        });
	        return iteratorFor(items);
	      };

	      Headers.prototype.entries = function () {
	        var items = [];
	        this.forEach(function (value, name) {
	          items.push([name, value]);
	        });
	        return iteratorFor(items);
	      };

	      if (support.iterable) {
	        Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
	      }

	      function consumed(body) {
	        if (body.bodyUsed) {
	          return Promise.reject(new TypeError('Already read'));
	        }

	        body.bodyUsed = true;
	      }

	      function fileReaderReady(reader) {
	        return new Promise(function (resolve, reject) {
	          reader.onload = function () {
	            resolve(reader.result);
	          };

	          reader.onerror = function () {
	            reject(reader.error);
	          };
	        });
	      }

	      function readBlobAsArrayBuffer(blob) {
	        var reader = new FileReader();
	        var promise = fileReaderReady(reader);
	        reader.readAsArrayBuffer(blob);
	        return promise;
	      }

	      function readBlobAsText(blob) {
	        var reader = new FileReader();
	        var promise = fileReaderReady(reader);
	        reader.readAsText(blob);
	        return promise;
	      }

	      function readArrayBufferAsText(buf) {
	        var view = new Uint8Array(buf);
	        var chars = new Array(view.length);

	        for (var i = 0; i < view.length; i++) {
	          chars[i] = String.fromCharCode(view[i]);
	        }

	        return chars.join('');
	      }

	      function bufferClone(buf) {
	        if (buf.slice) {
	          return buf.slice(0);
	        } else {
	          var view = new Uint8Array(buf.byteLength);
	          view.set(new Uint8Array(buf));
	          return view.buffer;
	        }
	      }

	      function Body() {
	        this.bodyUsed = false;

	        this._initBody = function (body) {
	          this._bodyInit = body;

	          if (!body) {
	            this._bodyText = '';
	          } else if (typeof body === 'string') {
	            this._bodyText = body;
	          } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	            this._bodyBlob = body;
	          } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	            this._bodyFormData = body;
	          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	            this._bodyText = body.toString();
	          } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	            this._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.

	            this._bodyInit = new Blob([this._bodyArrayBuffer]);
	          } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	            this._bodyArrayBuffer = bufferClone(body);
	          } else {
	            throw new Error('unsupported BodyInit type');
	          }

	          if (!this.headers.get('content-type')) {
	            if (typeof body === 'string') {
	              this.headers.set('content-type', 'text/plain;charset=UTF-8');
	            } else if (this._bodyBlob && this._bodyBlob.type) {
	              this.headers.set('content-type', this._bodyBlob.type);
	            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	              this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	            }
	          }
	        };

	        if (support.blob) {
	          this.blob = function () {
	            var rejected = consumed(this);

	            if (rejected) {
	              return rejected;
	            }

	            if (this._bodyBlob) {
	              return Promise.resolve(this._bodyBlob);
	            } else if (this._bodyArrayBuffer) {
	              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
	            } else if (this._bodyFormData) {
	              throw new Error('could not read FormData body as blob');
	            } else {
	              return Promise.resolve(new Blob([this._bodyText]));
	            }
	          };

	          this.arrayBuffer = function () {
	            if (this._bodyArrayBuffer) {
	              return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
	            } else {
	              return this.blob().then(readBlobAsArrayBuffer);
	            }
	          };
	        }

	        this.text = function () {
	          var rejected = consumed(this);

	          if (rejected) {
	            return rejected;
	          }

	          if (this._bodyBlob) {
	            return readBlobAsText(this._bodyBlob);
	          } else if (this._bodyArrayBuffer) {
	            return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
	          } else if (this._bodyFormData) {
	            throw new Error('could not read FormData body as text');
	          } else {
	            return Promise.resolve(this._bodyText);
	          }
	        };

	        if (support.formData) {
	          this.formData = function () {
	            return this.text().then(decode);
	          };
	        }

	        this.json = function () {
	          return this.text().then(JSON.parse);
	        };

	        return this;
	      } // HTTP methods whose capitalization should be normalized


	      var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

	      function normalizeMethod(method) {
	        var upcased = method.toUpperCase();
	        return methods.indexOf(upcased) > -1 ? upcased : method;
	      }

	      function Request(input, options) {
	        options = options || {};
	        var body = options.body;

	        if (input instanceof Request) {
	          if (input.bodyUsed) {
	            throw new TypeError('Already read');
	          }

	          this.url = input.url;
	          this.credentials = input.credentials;

	          if (!options.headers) {
	            this.headers = new Headers(input.headers);
	          }

	          this.method = input.method;
	          this.mode = input.mode;

	          if (!body && input._bodyInit != null) {
	            body = input._bodyInit;
	            input.bodyUsed = true;
	          }
	        } else {
	          this.url = String(input);
	        }

	        this.credentials = options.credentials || this.credentials || 'omit';

	        if (options.headers || !this.headers) {
	          this.headers = new Headers(options.headers);
	        }

	        this.method = normalizeMethod(options.method || this.method || 'GET');
	        this.mode = options.mode || this.mode || null;
	        this.referrer = null;

	        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	          throw new TypeError('Body not allowed for GET or HEAD requests');
	        }

	        this._initBody(body);
	      }

	      Request.prototype.clone = function () {
	        return new Request(this, {
	          body: this._bodyInit
	        });
	      };

	      function decode(body) {
	        var form = new FormData();
	        body.trim().split('&').forEach(function (bytes) {
	          if (bytes) {
	            var split = bytes.split('=');
	            var name = split.shift().replace(/\+/g, ' ');
	            var value = split.join('=').replace(/\+/g, ' ');
	            form.append(decodeURIComponent(name), decodeURIComponent(value));
	          }
	        });
	        return form;
	      }

	      function parseHeaders(rawHeaders) {
	        var headers = new Headers(); // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
	        // https://tools.ietf.org/html/rfc7230#section-3.2

	        var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
	        preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
	          var parts = line.split(':');
	          var key = parts.shift().trim();

	          if (key) {
	            var value = parts.join(':').trim();
	            headers.append(key, value);
	          }
	        });
	        return headers;
	      }

	      Body.call(Request.prototype);

	      function Response(bodyInit, options) {
	        if (!options) {
	          options = {};
	        }

	        this.type = 'default';
	        this.status = options.status === undefined ? 200 : options.status;
	        this.ok = this.status >= 200 && this.status < 300;
	        this.statusText = 'statusText' in options ? options.statusText : 'OK';
	        this.headers = new Headers(options.headers);
	        this.url = options.url || '';

	        this._initBody(bodyInit);
	      }

	      Body.call(Response.prototype);

	      Response.prototype.clone = function () {
	        return new Response(this._bodyInit, {
	          status: this.status,
	          statusText: this.statusText,
	          headers: new Headers(this.headers),
	          url: this.url
	        });
	      };

	      Response.error = function () {
	        var response = new Response(null, {
	          status: 0,
	          statusText: ''
	        });
	        response.type = 'error';
	        return response;
	      };

	      var redirectStatuses = [301, 302, 303, 307, 308];

	      Response.redirect = function (url, status) {
	        if (redirectStatuses.indexOf(status) === -1) {
	          throw new RangeError('Invalid status code');
	        }

	        return new Response(null, {
	          status: status,
	          headers: {
	            location: url
	          }
	        });
	      };

	      self.Headers = Headers;
	      self.Request = Request;
	      self.Response = Response;

	      self.fetch = function (input, init) {
	        return new Promise(function (resolve, reject) {
	          var request = new Request(input, init);
	          var xhr = new XMLHttpRequest();

	          xhr.onload = function () {
	            var options = {
	              status: xhr.status,
	              statusText: xhr.statusText,
	              headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	            };
	            options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
	            var body = 'response' in xhr ? xhr.response : xhr.responseText;
	            resolve(new Response(body, options));
	          };

	          xhr.onerror = function () {
	            reject(new TypeError('Network request failed'));
	          };

	          xhr.ontimeout = function () {
	            reject(new TypeError('Network request failed'));
	          };

	          xhr.open(request.method, request.url, true);

	          if (request.credentials === 'include') {
	            xhr.withCredentials = true;
	          } else if (request.credentials === 'omit') {
	            xhr.withCredentials = false;
	          }

	          if ('responseType' in xhr && support.blob) {
	            xhr.responseType = 'blob';
	          }

	          request.headers.forEach(function (value, name) {
	            xhr.setRequestHeader(name, value);
	          });
	          xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	        });
	      };

	      self.fetch.polyfill = true;
	    })(typeof self !== 'undefined' ? self : this);
	  }).call(__root__, void 0);
	  var fetch = __root__.fetch;
	  var Response = fetch.Response = __root__.Response;
	  var Request = fetch.Request = __root__.Request;
	  var Headers = fetch.Headers = __root__.Headers;

	  if ( module.exports) {
	    module.exports = fetch; // Needed for TypeScript consumers without esModuleInterop.

	    module.exports["default"] = fetch;
	  }
	});

	var at,
	    // The index of the current character
	ch,
	    // The current character
	escapee = {
	  '"': '"',
	  '\\': '\\',
	  '/': '/',
	  b: '\b',
	  f: '\f',
	  n: '\n',
	  r: '\r',
	  t: '\t'
	},
	    text,
	    error = function error(m) {
	  // Call error when something is wrong.
	  throw {
	    name: 'SyntaxError',
	    message: m,
	    at: at,
	    text: text
	  };
	},
	    next = function next(c) {
	  // If a c parameter is provided, verify that it matches the current character.
	  if (c && c !== ch) {
	    error("Expected '" + c + "' instead of '" + ch + "'");
	  } // Get the next character. When there are no more characters,
	  // return the empty string.


	  ch = text.charAt(at);
	  at += 1;
	  return ch;
	},
	    number = function number() {
	  // Parse a number value.
	  var number,
	      string = '';

	  if (ch === '-') {
	    string = '-';
	    next('-');
	  }

	  while (ch >= '0' && ch <= '9') {
	    string += ch;
	    next();
	  }

	  if (ch === '.') {
	    string += '.';

	    while (next() && ch >= '0' && ch <= '9') {
	      string += ch;
	    }
	  }

	  if (ch === 'e' || ch === 'E') {
	    string += ch;
	    next();

	    if (ch === '-' || ch === '+') {
	      string += ch;
	      next();
	    }

	    while (ch >= '0' && ch <= '9') {
	      string += ch;
	      next();
	    }
	  }

	  number = +string;

	  if (!isFinite(number)) {
	    error("Bad number");
	  } else {
	    return number;
	  }
	},
	    string = function string() {
	  // Parse a string value.
	  var hex,
	      i,
	      string = '',
	      uffff; // When parsing for string values, we must look for " and \ characters.

	  if (ch === '"') {
	    while (next()) {
	      if (ch === '"') {
	        next();
	        return string;
	      } else if (ch === '\\') {
	        next();

	        if (ch === 'u') {
	          uffff = 0;

	          for (i = 0; i < 4; i += 1) {
	            hex = parseInt(next(), 16);

	            if (!isFinite(hex)) {
	              break;
	            }

	            uffff = uffff * 16 + hex;
	          }

	          string += String.fromCharCode(uffff);
	        } else if (typeof escapee[ch] === 'string') {
	          string += escapee[ch];
	        } else {
	          break;
	        }
	      } else {
	        string += ch;
	      }
	    }
	  }

	  error("Bad string");
	},
	    white = function white() {
	  // Skip whitespace.
	  while (ch && ch <= ' ') {
	    next();
	  }
	},
	    word = function word() {
	  // true, false, or null.
	  switch (ch) {
	    case 't':
	      next('t');
	      next('r');
	      next('u');
	      next('e');
	      return true;

	    case 'f':
	      next('f');
	      next('a');
	      next('l');
	      next('s');
	      next('e');
	      return false;

	    case 'n':
	      next('n');
	      next('u');
	      next('l');
	      next('l');
	      return null;
	  }

	  error("Unexpected '" + ch + "'");
	},
	    value$1,
	    // Place holder for the value function.
	array = function array() {
	  // Parse an array value.
	  var array = [];

	  if (ch === '[') {
	    next('[');
	    white();

	    if (ch === ']') {
	      next(']');
	      return array; // empty array
	    }

	    while (ch) {
	      array.push(value$1());
	      white();

	      if (ch === ']') {
	        next(']');
	        return array;
	      }

	      next(',');
	      white();
	    }
	  }

	  error("Bad array");
	},
	    object = function object() {
	  // Parse an object value.
	  var key,
	      object = {};

	  if (ch === '{') {
	    next('{');
	    white();

	    if (ch === '}') {
	      next('}');
	      return object; // empty object
	    }

	    while (ch) {
	      key = string();
	      white();
	      next(':');

	      if (Object.hasOwnProperty.call(object, key)) {
	        error('Duplicate key "' + key + '"');
	      }

	      object[key] = value$1();
	      white();

	      if (ch === '}') {
	        next('}');
	        return object;
	      }

	      next(',');
	      white();
	    }
	  }

	  error("Bad object");
	};

	value$1 = function value() {
	  // Parse a JSON value. It could be an object, an array, a string, a number,
	  // or a word.
	  white();

	  switch (ch) {
	    case '{':
	      return object();

	    case '[':
	      return array();

	    case '"':
	      return string();

	    case '-':
	      return number();

	    default:
	      return ch >= '0' && ch <= '9' ? number() : word();
	  }
	}; // Return the json_parse function. It will have access to all of the above
	// functions and variables.


	var parse = function parse(source, reviver) {
	  var result;
	  text = source;
	  at = 0;
	  ch = ' ';
	  result = value$1();
	  white();

	  if (ch) {
	    error("Syntax error");
	  } // If there is a reviver function, we recursively walk the new structure,
	  // passing each name/value pair to the reviver function for possible
	  // transformation, starting with a temporary root object that holds the result
	  // in an empty key. If there is not a reviver function, we simply return the
	  // result.


	  return typeof reviver === 'function' ? function walk(holder, key) {
	    var k,
	        v,
	        value = holder[key];

	    if (value && typeof value === 'object') {
	      for (k in value) {
	        if (Object.prototype.hasOwnProperty.call(value, k)) {
	          v = walk(value, k);

	          if (v !== undefined) {
	            value[k] = v;
	          } else {
	            delete value[k];
	          }
	        }
	      }
	    }

	    return reviver.call(holder, key, value);
	  }({
	    '': result
	  }, '') : result;
	};

	var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	    gap,
	    indent,
	    meta = {
	  // table of character substitutions
	  '\b': '\\b',
	  '\t': '\\t',
	  '\n': '\\n',
	  '\f': '\\f',
	  '\r': '\\r',
	  '"': '\\"',
	  '\\': '\\\\'
	},
	    rep;

	function quote(string) {
	  // If the string contains no control characters, no quote characters, and no
	  // backslash characters, then we can safely slap some quotes around it.
	  // Otherwise we must also replace the offending characters with safe escape
	  // sequences.
	  escapable.lastIndex = 0;
	  return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
	    var c = meta[a];
	    return typeof c === 'string' ? c : "\\u" + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	  }) + '"' : '"' + string + '"';
	}

	function str(key, holder) {
	  // Produce a string from holder[key].
	  var i,
	      // The loop counter.
	  k,
	      // The member key.
	  v,
	      // The member value.
	  length,
	      mind = gap,
	      partial,
	      value = holder[key]; // If the value has a toJSON method, call it to obtain a replacement value.

	  if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
	    value = value.toJSON(key);
	  } // If we were called with a replacer function, then call the replacer to
	  // obtain a replacement value.


	  if (typeof rep === 'function') {
	    value = rep.call(holder, key, value);
	  } // What happens next depends on the value's type.


	  switch (typeof value) {
	    case 'string':
	      return quote(value);

	    case 'number':
	      // JSON numbers must be finite. Encode non-finite numbers as null.
	      return isFinite(value) ? String(value) : 'null';

	    case 'boolean':
	    case 'null':
	      // If the value is a boolean or null, convert it to a string. Note:
	      // typeof null does not produce 'null'. The case is included here in
	      // the remote chance that this gets fixed someday.
	      return String(value);

	    case 'object':
	      if (!value) return 'null';
	      gap += indent;
	      partial = []; // Array.isArray

	      if (Object.prototype.toString.apply(value) === '[object Array]') {
	        length = value.length;

	        for (i = 0; i < length; i += 1) {
	          partial[i] = str(i, value) || 'null';
	        } // Join all of the elements together, separated with commas, and
	        // wrap them in brackets.


	        v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
	        gap = mind;
	        return v;
	      } // If the replacer is an array, use it to select the members to be
	      // stringified.


	      if (rep && typeof rep === 'object') {
	        length = rep.length;

	        for (i = 0; i < length; i += 1) {
	          k = rep[i];

	          if (typeof k === 'string') {
	            v = str(k, value);

	            if (v) {
	              partial.push(quote(k) + (gap ? ': ' : ':') + v);
	            }
	          }
	        }
	      } else {
	        // Otherwise, iterate through all of the keys in the object.
	        for (k in value) {
	          if (Object.prototype.hasOwnProperty.call(value, k)) {
	            v = str(k, value);

	            if (v) {
	              partial.push(quote(k) + (gap ? ': ' : ':') + v);
	            }
	          }
	        }
	      } // Join all of the member texts together, separated with commas,
	      // and wrap them in braces.


	      v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
	      gap = mind;
	      return v;
	  }
	}

	var stringify = function stringify(value, replacer, space) {
	  var i;
	  gap = '';
	  indent = ''; // If the space parameter is a number, make an indent string containing that
	  // many spaces.

	  if (typeof space === 'number') {
	    for (i = 0; i < space; i += 1) {
	      indent += ' ';
	    }
	  } // If the space parameter is a string, it will be used as the indent string.
	  else if (typeof space === 'string') {
	      indent = space;
	    } // If there is a replacer, it must be a function or an array.
	  // Otherwise, throw an error.


	  rep = replacer;

	  if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
	    throw new Error('JSON.stringify');
	  } // Make a fake root object containing our value under the key of ''.
	  // Return the result of stringifying the value.


	  return str('', {
	    '': value
	  });
	};

	var parse$1 = parse;
	var stringify$1 = stringify;
	var jsonify = {
	  parse: parse$1,
	  stringify: stringify$1
	};

	var json = typeof JSON !== 'undefined' ? JSON : jsonify;

	var jsonStableStringify = function jsonStableStringify(obj, opts) {
	  if (!opts) opts = {};
	  if (typeof opts === 'function') opts = {
	    cmp: opts
	  };
	  var space = opts.space || '';
	  if (typeof space === 'number') space = Array(space + 1).join(' ');
	  var cycles = typeof opts.cycles === 'boolean' ? opts.cycles : false;

	  var replacer = opts.replacer || function (key, value) {
	    return value;
	  };

	  var cmp = opts.cmp && function (f) {
	    return function (node) {
	      return function (a, b) {
	        var aobj = {
	          key: a,
	          value: node[a]
	        };
	        var bobj = {
	          key: b,
	          value: node[b]
	        };
	        return f(aobj, bobj);
	      };
	    };
	  }(opts.cmp);

	  var seen = [];
	  return function stringify(parent, key, node, level) {
	    var indent = space ? '\n' + new Array(level + 1).join(space) : '';
	    var colonSeparator = space ? ': ' : ':';

	    if (node && node.toJSON && typeof node.toJSON === 'function') {
	      node = node.toJSON();
	    }

	    node = replacer.call(parent, key, node);

	    if (node === undefined) {
	      return;
	    }

	    if (typeof node !== 'object' || node === null) {
	      return json.stringify(node);
	    }

	    if (isArray$1(node)) {
	      var out = [];

	      for (var i = 0; i < node.length; i++) {
	        var item = stringify(node, i, node[i], level + 1) || json.stringify(null);
	        out.push(indent + space + item);
	      }

	      return '[' + out.join(',') + indent + ']';
	    } else {
	      if (seen.indexOf(node) !== -1) {
	        if (cycles) return json.stringify('__cycle__');
	        throw new TypeError('Converting circular structure to JSON');
	      } else seen.push(node);

	      var keys = objectKeys(node).sort(cmp && cmp(node));
	      var out = [];

	      for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var value = stringify(node, key, node[key], level + 1);
	        if (!value) continue;
	        var keyValue = json.stringify(key) + colonSeparator + value;
	        out.push(indent + space + keyValue);
	      }

	      seen.splice(seen.indexOf(node), 1);
	      return '{' + out.join(',') + indent + '}';
	    }
	  }({
	    '': obj
	  }, '', obj, 0);
	};

	var isArray$1 = Array.isArray || function (x) {
	  return {}.toString.call(x) === '[object Array]';
	};

	var objectKeys = Object.keys || function (obj) {
	  var has = Object.prototype.hasOwnProperty || function () {
	    return true;
	  };

	  var keys = [];

	  for (var key in obj) {
	    if (has.call(obj, key)) keys.push(key);
	  }

	  return keys;
	};

	var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	function contains(string, substring) {
	  return string.indexOf(substring) !== -1;
	}

	function isAppbase(url) {
	  return contains(url, 'scalr.api.appbase.io');
	}

	function btoa$1() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	  var str = input;
	  var output = ''; // eslint-disable-next-line

	  for (var block = 0, charCode, i = 0, map = chars; str.charAt(i | 0) || (map = '=', i % 1); // eslint-disable-line no-bitwise
	  output += map.charAt(63 & block >> 8 - i % 1 * 8) // eslint-disable-line no-bitwise
	  ) {
	    charCode = str.charCodeAt(i += 3 / 4);

	    if (charCode > 0xff) {
	      throw new Error('"btoa" failed: The string to be encoded contains characters outside of the Latin1 range.');
	    }

	    block = block << 8 | charCode; // eslint-disable-line no-bitwise
	  }

	  return output;
	}

	function uuidv4() {
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	    var r = Math.random() * 16 | 0; // eslint-disable-line no-bitwise

	    var v = c === 'x' ? r : r & 0x3 | 0x8; // eslint-disable-line no-bitwise

	    return v.toString(16);
	  });
	}

	function validate(object, fields) {
	  var invalid = [];
	  var emptyFor = {
	    object: null,
	    string: ''
	  };
	  var keys = Object.keys(fields);
	  keys.forEach(function (key) {
	    var type = fields[key]; // eslint-disable-next-line

	    if (_typeof$1(object[key]) !== type || object[key] === emptyFor[type]) {
	      invalid.push(key);
	    }
	  });
	  var missing = '';

	  for (var i = 0; i < invalid.length; i += 1) {
	    missing += invalid[i] + ', ';
	  }

	  if (invalid.length > 0) {
	    return new Error('fields missing: ' + missing);
	  }

	  return true;
	}

	function removeUndefined(value) {
	  if (value || !(Object.keys(value).length === 0 && value.constructor === Object)) {
	    return JSON.parse(JSON.stringify(value));
	  }

	  return null;
	}
	/**
	 * Send only when a connection is opened
	 * @param {Object} socket
	 * @param {Function} callback
	 */


	function waitForSocketConnection(socket, callback) {
	  setTimeout(function () {
	    if (socket.readyState === 1) {
	      if (callback != null) {
	        callback();
	      }
	    } else {
	      waitForSocketConnection(socket, callback);
	    }
	  }, 5); // wait 5 ms for the connection...
	}

	function encodeHeaders() {
	  var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var shouldEncode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true; // Encode headers

	  var encodedHeaders = {};

	  if (shouldEncode) {
	    Object.keys(headers).forEach(function (header) {
	      encodedHeaders[header] = encodeURI(headers[header]);
	    });
	  } else {
	    encodedHeaders = headers;
	  }

	  return encodedHeaders;
	}
	/**
	 * Returns an instance of Appbase client
	 * @param {Object} config To configure properties
	 * @param {String} config.url
	 * @param {String} config.app
	 * @param {String} config.credentials
	 * @param {String} config.username
	 * @param {String} config.password
	 * A callback function which will be invoked before a fetch request made
	 */


	function AppBase(config) {
	  var _URL = urlParserLite(config.url || ''),
	      _URL$auth = _URL.auth,
	      auth = _URL$auth === undefined ? null : _URL$auth,
	      _URL$host = _URL.host,
	      host = _URL$host === undefined ? '' : _URL$host,
	      _URL$path = _URL.path,
	      path = _URL$path === undefined ? '' : _URL$path,
	      _URL$protocol = _URL.protocol,
	      protocol = _URL$protocol === undefined ? '' : _URL$protocol;

	  var url = host + path; // Validate config and throw appropriate error

	  if (typeof url !== 'string' || url === '') {
	    throw new Error('URL not present in options.');
	  }

	  if (typeof config.app !== 'string' || config.app === '') {
	    throw new Error('App name is not present in options.');
	  }

	  if (typeof protocol !== 'string' || protocol === '') {
	    throw new Error('Protocol is not present in url. URL should be of the form https://scalr.api.appbase.io');
	  } // Parse url


	  if (url.slice(-1) === '/') {
	    url = url.slice(0, -1);
	  }

	  var credentials = auth || null;
	  /**
	   * Credentials can be provided as a part of the URL,
	   * as username, password args or as a credentials argument directly */

	  if (typeof config.credentials === 'string' && config.credentials !== '') {
	    // eslint-disable-next-line
	    credentials = config.credentials;
	  } else if (typeof config.username === 'string' && config.username !== '' && typeof config.password === 'string' && config.password !== '') {
	    credentials = config.username + ':' + config.password;
	  }

	  if (isAppbase(url) && credentials === null) {
	    throw new Error('Authentication information is not present. Did you add credentials?');
	  }

	  this.url = url;
	  this.protocol = protocol;
	  this.app = config.app;
	  this.credentials = credentials;
	  this.headers = {};
	}
	/**
	 * To perform fetch request
	 * @param {Object} args
	 * @param {String} args.method
	 * @param {String} args.path
	 * @param {Object} args.params
	 * @param {Object} args.body
	 */


	function fetchRequest(args) {
	  var _this = this;

	  return new Promise(function (resolve, reject) {
	    var parsedArgs = removeUndefined(args);

	    try {
	      var method = parsedArgs.method,
	          path = parsedArgs.path,
	          params = parsedArgs.params,
	          body = parsedArgs.body;
	      var bodyCopy = body;
	      var contentType = path.endsWith('msearch') || path.endsWith('bulk') ? 'application/x-ndjson' : 'application/json';
	      var headers = Object.assign({}, {
	        Accept: 'application/json',
	        'Content-Type': contentType
	      }, _this.headers);
	      var timestamp = Date.now();

	      if (_this.credentials) {
	        headers.Authorization = 'Basic ' + btoa$1(_this.credentials);
	      }

	      var requestOptions = {
	        method: method,
	        headers: headers
	      };

	      if (Array.isArray(bodyCopy)) {
	        var arrayBody = '';
	        bodyCopy.forEach(function (item) {
	          arrayBody += JSON.stringify(item);
	          arrayBody += '\n';
	        });
	        bodyCopy = arrayBody;
	      } else {
	        bodyCopy = JSON.stringify(bodyCopy) || {};
	      }

	      if (Object.keys(bodyCopy).length !== 0) {
	        requestOptions.body = bodyCopy;
	      }

	      var handleTransformRequest = function handleTransformRequest(res) {
	        if (_this.transformRequest && typeof _this.transformRequest === 'function') {
	          var tarnsformRequestPromise = _this.transformRequest(res);

	          return tarnsformRequestPromise instanceof Promise ? tarnsformRequestPromise : Promise.resolve(tarnsformRequestPromise);
	        }

	        return Promise.resolve(res);
	      };

	      var responseHeaders = {};
	      var finalURL = _this.protocol + '://' + _this.url + '/' + _this.app + '/' + path + '?' + querystring.stringify(params);
	      return handleTransformRequest(Object.assign({}, {
	        url: finalURL
	      }, requestOptions)).then(function (ts) {
	        var transformedRequest = Object.assign({}, ts);
	        var url = transformedRequest.url;
	        delete transformedRequest.url;
	        return browserPonyfill$1(url || finalURL, transformedRequest).then(function (res) {
	          if (res.status >= 500) {
	            return reject(res);
	          }

	          responseHeaders = res.headers;
	          return res.json().then(function (data) {
	            if (res.status >= 400) {
	              return reject(res);
	            }

	            if (data && data.responses instanceof Array) {
	              var allResponses = data.responses.length;
	              var errorResponses = data.responses.filter(function (entry) {
	                return Object.prototype.hasOwnProperty.call(entry, 'error');
	              }).length; // reject only when all responses has error

	              if (allResponses === errorResponses) {
	                return reject(data);
	              }
	            }

	            var response = Object.assign({}, data, {
	              _timestamp: timestamp,
	              _headers: responseHeaders
	            });
	            return resolve(response);
	          });
	        })["catch"](function (e) {
	          return reject(e);
	        });
	      })["catch"](function (err) {
	        return reject(err);
	      });
	    } catch (e) {
	      return reject(e);
	    }
	  });
	}

	var WebSocket = typeof window !== 'undefined' ? window.WebSocket : require('ws');
	/**
	 * To connect a web socket
	 * @param {Object} args
	 * @param {String} args.method
	 * @param {String} args.path
	 * @param {Object} args.params
	 * @param {Object} args.body
	 */

	function wsRequest(args, onData, onError, onClose) {
	  var _this = this;

	  try {
	    var parsedArgs = removeUndefined(args);
	    var method = parsedArgs.method,
	        path = parsedArgs.path,
	        params = parsedArgs.params;
	    var bodyCopy = args.body;

	    if (!bodyCopy || (typeof bodyCopy === 'undefined' ? 'undefined' : _typeof$1(bodyCopy)) !== 'object') {
	      bodyCopy = {};
	    }

	    var init = function init() {
	      _this.ws = new WebSocket('wss://' + _this.url + '/' + _this.app);
	      _this.id = uuidv4();
	      _this.request = {
	        id: _this.id,
	        path: _this.app + '/' + path + '?' + querystring.stringify(params),
	        method: method,
	        body: bodyCopy
	      };

	      if (_this.credentials) {
	        _this.request.authorization = 'Basic ' + btoa$1(_this.credentials);
	      }

	      _this.result = {};

	      _this.closeHandler = function () {
	        _this.wsClosed();
	      };

	      _this.errorHandler = function (err) {
	        _this.processError.apply(_this, [err]);
	      };

	      _this.messageHandler = function (message) {
	        var dataObj = JSON.parse(message.data);

	        if (dataObj.body && dataObj.body.status >= 400) {
	          _this.processError.apply(_this, [dataObj]);
	        } else {
	          _this.processMessage.apply(_this, [dataObj]);
	        }
	      };

	      _this.send = function (request) {
	        waitForSocketConnection(_this.ws, function () {
	          try {
	            _this.ws.send(JSON.stringify(request));
	          } catch (e) {
	            console.warn(e);
	          }
	        });
	      };

	      _this.ws.onmessage = _this.messageHandler;
	      _this.ws.onerror = _this.errorHandler;
	      _this.ws.onclose = _this.closeHandler;

	      _this.send(_this.request);

	      _this.result.stop = _this.stop;
	      _this.result.reconnect = _this.reconnect;
	      return _this.result;
	    };

	    this.wsClosed = function () {
	      if (onClose) {
	        onClose();
	      }
	    };

	    this.stop = function () {
	      _this.ws.onmessage = undefined;
	      _this.ws.onclose = undefined;
	      _this.ws.onerror = undefined;

	      _this.wsClosed();

	      var unsubRequest = JSON.parse(JSON.stringify(_this.request));
	      unsubRequest.unsubscribe = true;

	      if (_this.unsubscribed !== true) {
	        _this.send(unsubRequest);
	      }

	      _this.unsubscribed = true;
	    };

	    this.reconnect = function () {
	      _this.stop();

	      return wsRequest(args, onData, onError, onClose);
	    };

	    this.processError = function (err) {
	      if (onError) {
	        onError(err);
	      } else {
	        console.warn(err);
	      }
	    };

	    this.processMessage = function (origDataObj) {
	      var dataObj = JSON.parse(JSON.stringify(origDataObj));

	      if (!dataObj.id && dataObj.message) {
	        if (onError) {
	          onError(dataObj);
	        }

	        return;
	      }

	      if (dataObj.id === _this.id) {
	        if (dataObj.message) {
	          delete dataObj.id;

	          if (onError) {
	            onError(dataObj);
	          }

	          return;
	        }

	        if (dataObj.query_id) {
	          _this.query_id = dataObj.query_id;
	        }

	        if (dataObj.channel) {
	          _this.channel = dataObj.channel;
	        }

	        if (dataObj.body && dataObj.body !== '') {
	          if (onData) {
	            onData(dataObj.body);
	          }
	        }

	        return;
	      }

	      if (!dataObj.id && dataObj.channel && dataObj.channel === _this.channel) {
	        if (onData) {
	          onData(dataObj.event);
	        }
	      }
	    };

	    return init();
	  } catch (e) {
	    if (onError) {
	      onError(e);
	    } else {
	      console.warn(e);
	    }

	    return null;
	  }
	}
	/**
	 * Index Service
	 * @param {Object} args
	 * @param {String} args.type
	 * @param {Object} args.body
	 * @param {String} args.id
	 */


	function indexApi(args) {
	  var parsedArgs = removeUndefined(args); // Validate arguments

	  var valid = validate(parsedArgs, {
	    type: 'string',
	    body: 'object'
	  });

	  if (valid !== true) {
	    throw valid;
	  }

	  var type = parsedArgs.type,
	      id = parsedArgs.id,
	      body = parsedArgs.body;
	  delete parsedArgs.type;
	  delete parsedArgs.body;
	  delete parsedArgs.id;
	  var path = void 0;

	  if (id) {
	    path = type + '/' + encodeURIComponent(id);
	  } else {
	    path = type;
	  }

	  return this.performFetchRequest({
	    method: 'POST',
	    path: path,
	    params: parsedArgs,
	    body: body
	  });
	}
	/**
	 * Get Service
	 * @param {Object} args
	 * @param {String} args.type
	 * @param {String} args.id
	 */


	function getApi(args) {
	  var parsedArgs = removeUndefined(args); // Validate arguments

	  var valid = validate(parsedArgs, {
	    type: 'string',
	    id: 'string'
	  });

	  if (valid !== true) {
	    throw valid;
	  }

	  var type = parsedArgs.type,
	      id = parsedArgs.id;
	  delete parsedArgs.type;
	  delete parsedArgs.id;
	  var path = type + '/' + encodeURIComponent(id);
	  return this.performFetchRequest({
	    method: 'GET',
	    path: path,
	    params: parsedArgs
	  });
	}
	/**
	 * Update Service
	 * @param {Object} args
	 * @param {String} args.type
	 * @param {Object} args.body
	 * @param {String} args.id
	 */


	function updateApi(args) {
	  var parsedArgs = removeUndefined(args); // Validate arguments

	  var valid = validate(parsedArgs, {
	    type: 'string',
	    id: 'string',
	    body: 'object'
	  });

	  if (valid !== true) {
	    throw valid;
	  }

	  var type = parsedArgs.type,
	      id = parsedArgs.id,
	      body = parsedArgs.body;
	  delete parsedArgs.type;
	  delete parsedArgs.id;
	  delete parsedArgs.body;
	  var path = type + '/' + encodeURIComponent(id) + '/_update';
	  return this.performFetchRequest({
	    method: 'POST',
	    path: path,
	    params: parsedArgs,
	    body: body
	  });
	}
	/**
	 * Delete Service
	 * @param {Object} args
	 * @param {String} args.type
	 * @param {String} args.id
	 */


	function deleteApi(args) {
	  var parsedArgs = removeUndefined(args); // Validate arguments

	  var valid = validate(parsedArgs, {
	    type: 'string',
	    id: 'string'
	  });

	  if (valid !== true) {
	    throw valid;
	  }

	  var type = parsedArgs.type,
	      id = parsedArgs.id;
	  delete parsedArgs.type;
	  delete parsedArgs.id;
	  var path = type + '/' + encodeURIComponent(id);
	  return this.performFetchRequest({
	    method: 'DELETE',
	    path: path,
	    params: parsedArgs
	  });
	}
	/**
	 * Bulk Service
	 * @param {Object} args
	 * @param {String} args.type
	 * @param {Object} args.body
	 */


	function bulkApi(args) {
	  var parsedArgs = removeUndefined(args); // Validate arguments

	  var valid = validate(parsedArgs, {
	    body: 'object'
	  });

	  if (valid !== true) {
	    throw valid;
	  }

	  var type = parsedArgs.type,
	      body = parsedArgs.body;
	  delete parsedArgs.type;
	  delete parsedArgs.body;
	  var path = void 0;

	  if (type) {
	    path = type + '/_bulk';
	  } else {
	    path = '/_bulk';
	  }

	  return this.performFetchRequest({
	    method: 'POST',
	    path: path,
	    params: parsedArgs,
	    body: body
	  });
	}
	/**
	 * Search Service
	 * @param {Object} args
	 * @param {String} args.type
	 * @param {Object} args.body
	 */


	function searchApi(args) {
	  var parsedArgs = removeUndefined(args); // Validate arguments

	  var valid = validate(parsedArgs, {
	    body: 'object'
	  });

	  if (valid !== true) {
	    throw valid;
	  }

	  var type = void 0;

	  if (Array.isArray(parsedArgs.type)) {
	    type = parsedArgs.type.join();
	  } else {
	    // eslint-disable-next-line
	    type = parsedArgs.type;
	  }

	  var body = parsedArgs.body;
	  delete parsedArgs.type;
	  delete parsedArgs.body;
	  var path = void 0;

	  if (type) {
	    path = type + '/_search';
	  } else {
	    path = '_search';
	  }

	  return this.performFetchRequest({
	    method: 'POST',
	    path: path,
	    params: parsedArgs,
	    body: body
	  });
	}
	/**
	 * Msearch Service
	 * @param {Object} args
	 * @param {String} args.type
	 * @param {Object} args.body
	 */


	function msearchApi(args) {
	  var parsedArgs = removeUndefined(args); // Validate arguments

	  var valid = validate(parsedArgs, {
	    body: 'object'
	  });

	  if (valid !== true) {
	    throw valid;
	  }

	  var type = void 0;

	  if (Array.isArray(parsedArgs.type)) {
	    type = parsedArgs.type.join();
	  } else {
	    type = parsedArgs.type;
	  }

	  var body = parsedArgs.body;
	  delete parsedArgs.type;
	  delete parsedArgs.body;
	  var path = void 0;

	  if (type) {
	    path = type + '/_msearch';
	  } else {
	    path = '_msearch';
	  }

	  return this.performFetchRequest({
	    method: 'POST',
	    path: path,
	    params: parsedArgs,
	    body: body
	  });
	}
	/**
	 * Stream Service
	 * @param {Object} args
	 * @param {String} args.type
	 * @param {Boolean} args.stream
	 * @param {String} args.id
	 * @param {Function} onData
	 * @param {Function} onError
	 * @param {Function} onClose
	 */


	function getStream(args) {
	  var parsedArgs = removeUndefined(args); // Validate arguments

	  var valid = validate(parsedArgs, {
	    type: 'string',
	    id: 'string'
	  });

	  if (valid !== true) {
	    throw valid;
	  }

	  var type = parsedArgs.type,
	      id = parsedArgs.id;
	  delete parsedArgs.type;
	  delete parsedArgs.id;
	  delete parsedArgs.stream;

	  if (parsedArgs.stream === true) {
	    parsedArgs.stream = 'true';
	  } else {
	    delete parsedArgs.stream;
	    parsedArgs.streamonly = 'true';
	  }

	  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    rest[_key - 1] = arguments[_key];
	  }

	  return this.performWsRequest.apply(this, [{
	    method: 'GET',
	    path: type + '/' + encodeURIComponent(id),
	    params: parsedArgs
	  }].concat(rest));
	}
	/**
	 * Search Stream
	 * @param {Object} args
	 * @param {String} args.type
	 * @param {Object} args.body
	 * @param {Boolean} args.stream
	 * @param {Function} onData
	 * @param {Function} onError
	 * @param {Function} onClose
	 */


	function searchStreamApi(args) {
	  var parsedArgs = removeUndefined(args); // Validate arguments

	  var valid = validate(parsedArgs, {
	    body: 'object'
	  });

	  if (valid !== true) {
	    throw valid;
	  }

	  if (parsedArgs.type === undefined || Array.isArray(parsedArgs.type) && parsedArgs.type.length === 0) {
	    throw new Error('Missing fields: type');
	  }

	  var type = void 0;

	  if (Array.isArray(parsedArgs.type)) {
	    type = parsedArgs.type.join();
	  } else {
	    type = parsedArgs.type;
	  }

	  var body = parsedArgs.body;
	  delete parsedArgs.type;
	  delete parsedArgs.body;
	  delete parsedArgs.stream;
	  parsedArgs.streamonly = 'true';

	  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    rest[_key - 1] = arguments[_key];
	  }

	  return this.performWsRequest.apply(this, [{
	    method: 'POST',
	    path: type + '/_search',
	    params: parsedArgs,
	    body: body
	  }].concat(rest));
	}
	/**
	 * Webhook Service
	 * @param {Object} args
	 * @param {String} args.type
	 * @param {Object} args.body
	 * @param {Object} webhook
	 * @param {Function} onData
	 * @param {Function} onError
	 * @param {Function} onClose
	 */


	function searchStreamToURLApi(args, webhook) {
	  for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    rest[_key - 2] = arguments[_key];
	  }

	  var _this = this;

	  var parsedArgs = removeUndefined(args);
	  var bodyCopy = parsedArgs.body;
	  var type = void 0;
	  var typeString = void 0; // Validate arguments

	  var valid = validate(parsedArgs, {
	    body: 'object'
	  });

	  if (valid !== true) {
	    throw valid;
	  }

	  if (parsedArgs.type === undefined || !(typeof parsedArgs.type === 'string' || Array.isArray(parsedArgs.type)) || parsedArgs.type === '' || parsedArgs.type.length === 0) {
	    throw new Error('fields missing: type');
	  }

	  valid = validate(parsedArgs.body, {
	    query: 'object'
	  });

	  if (valid !== true) {
	    throw valid;
	  }

	  if (Array.isArray(parsedArgs.type)) {
	    type = parsedArgs.type;
	    typeString = parsedArgs.type.join();
	  } else {
	    type = [parsedArgs.type];
	    typeString = parsedArgs.type;
	  }

	  var webhooks = [];
	  var _bodyCopy = bodyCopy,
	      query = _bodyCopy.query;

	  if (typeof webhook === 'string') {
	    var webHookObj = {};
	    webHookObj.url = webhook;
	    webHookObj.method = 'GET';
	    webhooks.push(webHookObj);
	  } else if (webhook.constructor === Array) {
	    webhooks = webhook;
	  } else if (webhook === Object(webhook)) {
	    webhooks.push(webhook);
	  } else {
	    throw new Error('fields missing: second argument(webhook) is necessary');
	  }

	  var populateBody = function populateBody() {
	    bodyCopy = {};
	    bodyCopy.webhooks = webhooks;
	    bodyCopy.query = query;
	    bodyCopy.type = type;
	  };

	  populateBody();
	  var encode64 = btoa$1(jsonStableStringify(query));
	  var path = '.percolator/webhooks-0-' + typeString + '-0-' + encode64;

	  this.change = function () {
	    webhooks = [];

	    if (typeof parsedArgs === 'string') {
	      var webhook2 = {};
	      webhook2.url = parsedArgs;
	      webhook2.method = 'POST';
	      webhooks.push(webhook2);
	    } else if (parsedArgs.constructor === Array) {
	      webhooks = parsedArgs;
	    } else if (parsedArgs === Object(parsedArgs)) {
	      webhooks.push(parsedArgs);
	    } else {
	      throw new Error('fields missing: one of webhook or url fields is required');
	    }

	    populateBody();
	    return _this.performRequest('POST');
	  };

	  this.stop = function () {
	    bodyCopy = undefined;
	    return _this.performRequest('DELETE');
	  };

	  this.performRequest = function (method) {
	    var res = _this.performWsRequest.apply(_this, [{
	      method: method,
	      path: path,
	      body: bodyCopy
	    }].concat(rest));

	    res.change = _this.change;
	    res.stop = _this.stop;
	    return res;
	  };

	  return this.performRequest('POST');
	}
	/**
	 * To get types
	 */


	function getTypesService() {
	  var _this = this;

	  return new Promise(function (resolve, reject) {
	    try {
	      return _this.performFetchRequest({
	        method: 'GET',
	        path: '_mapping'
	      }).then(function (data) {
	        var types = Object.keys(data[_this.app].mappings).filter(function (type) {
	          return type !== '_default_';
	        });
	        return resolve(types);
	      });
	    } catch (e) {
	      return reject(e);
	    }
	  });
	}
	/**
	 * To get mappings
	 */


	function getMappings() {
	  return this.performFetchRequest({
	    method: 'GET',
	    path: '_mapping'
	  });
	}

	function index$2(config) {
	  var client = new AppBase(config);
	  AppBase.prototype.performFetchRequest = fetchRequest;
	  AppBase.prototype.performWsRequest = wsRequest;
	  AppBase.prototype.index = indexApi;
	  AppBase.prototype.get = getApi;
	  AppBase.prototype.update = updateApi;
	  AppBase.prototype["delete"] = deleteApi;
	  AppBase.prototype.bulk = bulkApi;
	  AppBase.prototype.search = searchApi;
	  AppBase.prototype.msearch = msearchApi;
	  AppBase.prototype.getStream = getStream;
	  AppBase.prototype.searchStream = searchStreamApi;
	  AppBase.prototype.searchStreamToURL = searchStreamToURLApi;
	  AppBase.prototype.getTypes = getTypesService;
	  AppBase.prototype.getMappings = getMappings;

	  AppBase.prototype.setHeaders = function () {
	    var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var shouldEncode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true; // Encode headers

	    if (shouldEncode) {
	      this.headers = encodeHeaders(headers);
	    } else {
	      this.headers = headers;
	    }
	  };

	  if (typeof window !== 'undefined') {
	    window.Appbase = client;
	  }

	  return client;
	}

	var Provider = {
	  name: 'Provider',
	  props: {
	    store: {
	      type: Object,
	      required: true,
	      validator: function validator(store) {
	        if (!store.dispatch && !store.subscribe && !store.getState) {
	          throw new Error('[reactivesearch-vue] - store provided is not a valid redux store');
	        }

	        return true;
	      }
	    }
	  },
	  provide: function provide() {
	    return {
	      $$store: this.store
	    };
	  },
	  render: function render(h) {
	    if (this.$slots["default"].length > 1) {
	      return h('div', this.$slots["default"]);
	    }

	    return this.$slots["default"][0];
	  }
	};

	function _templateObject$4() {
	  var data = _taggedTemplateLiteralLoose(["\n\tfont-family: ", ";\n\tfont-size: ", ";\n\tcolor: ", ";\n\twidth: 100%;\n\n\tinput,\n\tbutton,\n\ttextarea,\n\tselect {\n\t\tfont-family: ", ";\n\t}\n\n\t*,\n\t*:before,\n\t*:after {\n\t\tbox-sizing: border-box;\n\t}\n"]);

	  _templateObject$4 = function _templateObject() {
	    return data;
	  };

	  return data;
	}
	var Base = index$1('div')(_templateObject$4(), function (_ref) {
	  var theme = _ref.theme;
	  return theme.typography.fontFamily;
	}, function (_ref2) {
	  var theme = _ref2.theme;
	  return theme.typography.fontSize;
	}, function (_ref3) {
	  var theme = _ref3.theme;
	  return theme.colors.textColor;
	}, function (_ref4) {
	  var theme = _ref4.theme;
	  return theme.typography.fontFamily;
	});

	var setHeaders = lib_5.setHeaders,
	    setValue$1 = lib_5.setValue;
	var isEqual$1 = lib_8.isEqual;
	var URLParamsProvider = {
	  name: 'URLParamsProvider',
	  props: {
	    className: types.string,
	    headers: types.headers,
	    getSearchParams: types.func,
	    setSearchParams: types.func
	  },
	  mounted: function mounted() {
	    var _this = this;

	    this.init();

	    window.onpopstate = function () {
	      _this.init();

	      var activeComponents = Array.from(_this.params.keys()); // remove inactive components from selectedValues

	      Object.keys(_this.currentSelectedState).filter(function (item) {
	        return !activeComponents.includes(item);
	      }).forEach(function (component) {
	        _this.setValue(component, null);
	      }); // update active components in selectedValues

	      Array.from(_this.params.entries()).forEach(function (item) {
	        try {
	          var component = item[0],
	              value = item[1];

	          var _ref = _this.selectedValues[component] || {
	            label: component
	          },
	              label = _ref.label,
	              showFilter = _ref.showFilter,
	              URLParams = _ref.URLParams;

	          _this.setValue(component, JSON.parse(value), label, showFilter, URLParams);
	        } catch (e) {
	          // Do not set value if JSON parsing fails.
	          console.error(e);
	        }
	      });
	    };
	  },
	  watch: {
	    $route: function $route() {
	      // this ensures the url params change are handled
	      // when the url changes, which enables us to
	      // make `onpopstate` event handler work with history.pushState updates
	      this.checkForURLParamsChange();
	    },
	    selectedValues: function selectedValues(newVal, oldVal) {
	      var _this2 = this;

	      this.currentSelectedState = newVal;

	      if (!isEqual$1(newVal, oldVal)) {
	        this.searchString = this.$props.getSearchParams ? this.$props.getSearchParams() : window.location.search;
	        this.params = new URLSearchParams(this.searchString);
	        var currentComponents = Object.keys(newVal);
	        var urlComponents = Array.from(this.params.keys());
	        currentComponents.filter(function (component) {
	          return newVal[component].URLParams;
	        }).forEach(function (component) {
	          // prevents empty history pollution on initial load
	          if (_this2.hasValidValue(newVal[component]) || _this2.hasValidValue(oldVal[component])) {
	            var selectedValues = newVal[component];

	            if (selectedValues.URLParams) {
	              if (selectedValues.category) {
	                _this2.setURL(component, _this2.getValue({
	                  category: selectedValues.category,
	                  value: selectedValues.value
	                }));
	              } else {
	                _this2.setURL(component, _this2.getValue(selectedValues.value));
	              }
	            } else {
	              _this2.params["delete"](component);

	              _this2.pushToHistory();
	            }
	          } else if (!_this2.hasValidValue(newVal[component]) && urlComponents.includes(component)) {
	            // doesn't have a valid value, but the url has a (stale) valid value set
	            _this2.params["delete"](component);

	            _this2.pushToHistory();
	          }
	        }); // remove unmounted components

	        Object.keys(newVal).filter(function (component) {
	          return !currentComponents.includes(component);
	        }).forEach(function (component) {
	          _this2.params["delete"](component);

	          _this2.pushToHistory();
	        });

	        if (!currentComponents.length) {
	          Array.from(this.params.keys()).forEach(function (item) {
	            _this2.params["delete"](item);
	          });
	          this.pushToHistory();
	        }
	      }
	    },
	    headers: function headers(newVal, oldVal) {
	      if (!isEqual$1(oldVal, newVal)) {
	        this.setHeaders(newVal);
	      }
	    }
	  },
	  methods: {
	    init: function init() {
	      this.searchString = this.$props.getSearchParams ? this.$props.getSearchParams() : window.location.search;
	      this.params = new URLSearchParams(this.searchString);
	      this.currentSelectedState = this.selectedValues || {};
	    },
	    checkForURLParamsChange: function checkForURLParamsChange() {
	      // we only compare the search string (window.location.search by default)
	      // to see if the route has changed (or) not. This handles the following usecase:
	      // search on homepage -> route changes -> search results page with same search query
	      if (window) {
	        var searchString = this.$props.getSearchParams ? this.$props.getSearchParams() : window.location.search;

	        if (searchString !== this.searchString) {
	          var event;

	          if (typeof Event === 'function') {
	            event = new Event('popstate');
	          } else {
	            // Correctly fire popstate event on IE11 to prevent app crash.
	            event = document.createEvent('Event');
	            event.initEvent('popstate', true, true);
	          }

	          window.dispatchEvent(event);
	        }
	      }
	    },
	    hasValidValue: function hasValidValue(component) {
	      if (!component) return false;
	      if (Array.isArray(component.value)) return !!component.value.length;
	      return !!component.value;
	    },
	    getValue: function getValue(value) {
	      var _this3 = this;

	      if (Array.isArray(value) && value.length) {
	        return value.map(function (item) {
	          return _this3.getValue(item);
	        });
	      } else if (value && typeof value === 'object') {
	        // TODO: support for NestedList
	        if (value.location) return value;
	        if (value.category) return value;
	        return value.label || value.key || null;
	      }

	      return value;
	    },
	    setURL: function setURL(component, value) {
	      this.searchString = this.$props.getSearchParams ? this.$props.getSearchParams() : window.location.search;
	      this.params = new URLSearchParams(this.searchString);

	      if (!value || typeof value === 'string' && value.trim() === '' || Array.isArray(value) && value.length === 0) {
	        this.params["delete"](component);
	        this.pushToHistory();
	      } else {
	        var data = JSON.stringify(this.getValue(value));

	        if (data !== this.params.get(component)) {
	          this.params.set(component, data);
	          this.pushToHistory();
	        }
	      }
	    },
	    pushToHistory: function pushToHistory() {
	      var paramsSting = this.params.toString() ? "?" + this.params.toString() : '';
	      var base = window.location.href.split('?')[0];
	      var newURL = "" + base + paramsSting;

	      if (this.$props.setSearchParams) {
	        this.$props.setSearchParams(newURL);
	      } else if (window.history.pushState) {
	        window.history.pushState({
	          path: newURL
	        }, '', newURL);
	      }

	      this.init();
	    }
	  },
	  render: function render() {
	    var h = arguments[0];
	    var children = this.$slots["default"];
	    return h(Base, {
	      "class": this.$props.className
	    }, [children]);
	  }
	};

	var mapStateToProps$1 = function mapStateToProps(state) {
	  return {
	    selectedValues: state.selectedValues
	  };
	};

	var mapDispatchtoProps$1 = {
	  setHeaders: setHeaders,
	  setValue: setValue$1
	};

	URLParamsProvider.install = function (Vue) {
	  Vue.component(URLParamsProvider.name, URLParamsProvider);
	};

	var URLParamsProvider$1 = connect(mapStateToProps$1, mapDispatchtoProps$1)(URLParamsProvider);

	var typography = {
	  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif',
	  fontSize: '16px'
	};
	var light = {
	  typography: typography,
	  colors: {
	    textColor: '#424242',
	    primaryTextColor: '#fff',
	    primaryColor: '#0B6AFF',
	    titleColor: '#424242',
	    alertColor: '#d9534f'
	  }
	};
	var dark = {
	  typography: typography,
	  colors: {
	    textColor: '#fff',
	    backgroundColor: '#212121',
	    primaryTextColor: '#fff',
	    primaryColor: '#2196F3',
	    titleColor: '#fff',
	    alertColor: '#d9534f',
	    borderColor: '#666'
	  }
	};
	function getTheme(preset) {
	  if (preset === 'light') {
	    return light;
	  }

	  return dark;
	}

	/**
	 *
	 *
	 * @author Jerry Bendy <jerry@icewingcc.com>
	 * @licence MIT
	 *
	 */

	(function (self) {

	  var nativeURLSearchParams = self.URLSearchParams && self.URLSearchParams.prototype.get ? self.URLSearchParams : null,
	      isSupportObjectConstructor = nativeURLSearchParams && new nativeURLSearchParams({
	    a: 1
	  }).toString() === 'a=1',
	      // There is a bug in safari 10.1 (and earlier) that incorrectly decodes `%2B` as an empty space and not a plus.
	  decodesPlusesCorrectly = nativeURLSearchParams && new nativeURLSearchParams('s=%2B').get('s') === '+',
	      __URLSearchParams__ = "__URLSearchParams__",
	      // Fix bug in Edge which cannot encode ' &' correctly
	  encodesAmpersandsCorrectly = nativeURLSearchParams ? function () {
	    var ampersandTest = new nativeURLSearchParams();
	    ampersandTest.append('s', ' &');
	    return ampersandTest.toString() === 's=+%26';
	  }() : true,
	      prototype = URLSearchParamsPolyfill.prototype,
	      iterable = !!(self.Symbol && self.Symbol.iterator);

	  if (nativeURLSearchParams && isSupportObjectConstructor && decodesPlusesCorrectly && encodesAmpersandsCorrectly) {
	    return;
	  }
	  /**
	   * Make a URLSearchParams instance
	   *
	   * @param {object|string|URLSearchParams} search
	   * @constructor
	   */


	  function URLSearchParamsPolyfill(search) {
	    search = search || ""; // support construct object with another URLSearchParams instance

	    if (search instanceof URLSearchParams || search instanceof URLSearchParamsPolyfill) {
	      search = search.toString();
	    }

	    this[__URLSearchParams__] = parseToDict(search);
	  }
	  /**
	   * Appends a specified key/value pair as a new search parameter.
	   *
	   * @param {string} name
	   * @param {string} value
	   */


	  prototype.append = function (name, value) {
	    appendTo(this[__URLSearchParams__], name, value);
	  };
	  /**
	   * Deletes the given search parameter, and its associated value,
	   * from the list of all search parameters.
	   *
	   * @param {string} name
	   */


	  prototype['delete'] = function (name) {
	    delete this[__URLSearchParams__][name];
	  };
	  /**
	   * Returns the first value associated to the given search parameter.
	   *
	   * @param {string} name
	   * @returns {string|null}
	   */


	  prototype.get = function (name) {
	    var dict = this[__URLSearchParams__];
	    return name in dict ? dict[name][0] : null;
	  };
	  /**
	   * Returns all the values association with a given search parameter.
	   *
	   * @param {string} name
	   * @returns {Array}
	   */


	  prototype.getAll = function (name) {
	    var dict = this[__URLSearchParams__];
	    return name in dict ? dict[name].slice(0) : [];
	  };
	  /**
	   * Returns a Boolean indicating if such a search parameter exists.
	   *
	   * @param {string} name
	   * @returns {boolean}
	   */


	  prototype.has = function (name) {
	    return name in this[__URLSearchParams__];
	  };
	  /**
	   * Sets the value associated to a given search parameter to
	   * the given value. If there were several values, delete the
	   * others.
	   *
	   * @param {string} name
	   * @param {string} value
	   */


	  prototype.set = function set(name, value) {
	    this[__URLSearchParams__][name] = ['' + value];
	  };
	  /**
	   * Returns a string containg a query string suitable for use in a URL.
	   *
	   * @returns {string}
	   */


	  prototype.toString = function () {
	    var dict = this[__URLSearchParams__],
	        query = [],
	        i,
	        key,
	        name,
	        value;

	    for (key in dict) {
	      name = encode(key);

	      for (i = 0, value = dict[key]; i < value.length; i++) {
	        query.push(name + '=' + encode(value[i]));
	      }
	    }

	    return query.join('&');
	  }; // There is a bug in Safari 10.1 and `Proxy`ing it is not enough.


	  var forSureUsePolyfill = !decodesPlusesCorrectly;
	  var useProxy = !forSureUsePolyfill && nativeURLSearchParams && !isSupportObjectConstructor && self.Proxy;
	  /*
	   * Apply polifill to global object and append other prototype into it
	   */

	  Object.defineProperty(self, 'URLSearchParams', {
	    value: useProxy ? // Safari 10.0 doesn't support Proxy, so it won't extend URLSearchParams on safari 10.0
	    new Proxy(nativeURLSearchParams, {
	      construct: function construct(target, args) {
	        return new target(new URLSearchParamsPolyfill(args[0]).toString());
	      }
	    }) : URLSearchParamsPolyfill
	  });
	  var USPProto = self.URLSearchParams.prototype;
	  USPProto.polyfill = true;
	  /**
	   *
	   * @param {function} callback
	   * @param {object} thisArg
	   */

	  USPProto.forEach = USPProto.forEach || function (callback, thisArg) {
	    var dict = parseToDict(this.toString());
	    Object.getOwnPropertyNames(dict).forEach(function (name) {
	      dict[name].forEach(function (value) {
	        callback.call(thisArg, value, name, this);
	      }, this);
	    }, this);
	  };
	  /**
	   * Sort all name-value pairs
	   */


	  USPProto.sort = USPProto.sort || function () {
	    var dict = parseToDict(this.toString()),
	        keys = [],
	        k,
	        i,
	        j;

	    for (k in dict) {
	      keys.push(k);
	    }

	    keys.sort();

	    for (i = 0; i < keys.length; i++) {
	      this['delete'](keys[i]);
	    }

	    for (i = 0; i < keys.length; i++) {
	      var key = keys[i],
	          values = dict[key];

	      for (j = 0; j < values.length; j++) {
	        this.append(key, values[j]);
	      }
	    }
	  };
	  /**
	   * Returns an iterator allowing to go through all keys of
	   * the key/value pairs contained in this object.
	   *
	   * @returns {function}
	   */


	  USPProto.keys = USPProto.keys || function () {
	    var items = [];
	    this.forEach(function (item, name) {
	      items.push(name);
	    });
	    return makeIterator(items);
	  };
	  /**
	   * Returns an iterator allowing to go through all values of
	   * the key/value pairs contained in this object.
	   *
	   * @returns {function}
	   */


	  USPProto.values = USPProto.values || function () {
	    var items = [];
	    this.forEach(function (item) {
	      items.push(item);
	    });
	    return makeIterator(items);
	  };
	  /**
	   * Returns an iterator allowing to go through all key/value
	   * pairs contained in this object.
	   *
	   * @returns {function}
	   */


	  USPProto.entries = USPProto.entries || function () {
	    var items = [];
	    this.forEach(function (item, name) {
	      items.push([name, item]);
	    });
	    return makeIterator(items);
	  };

	  if (iterable) {
	    USPProto[self.Symbol.iterator] = USPProto[self.Symbol.iterator] || USPProto.entries;
	  }

	  function encode(str) {
	    var replace = {
	      '!': '%21',
	      "'": '%27',
	      '(': '%28',
	      ')': '%29',
	      '~': '%7E',
	      '%20': '+',
	      '%00': '\x00'
	    };
	    return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, function (match) {
	      return replace[match];
	    });
	  }

	  function decode(str) {
	    return str.replace(/[ +]/g, '%20').replace(/(%[a-f0-9]{2})+/ig, function (match) {
	      return decodeURIComponent(match);
	    });
	  }

	  function makeIterator(arr) {
	    var iterator = {
	      next: function next() {
	        var value = arr.shift();
	        return {
	          done: value === undefined,
	          value: value
	        };
	      }
	    };

	    if (iterable) {
	      iterator[self.Symbol.iterator] = function () {
	        return iterator;
	      };
	    }

	    return iterator;
	  }

	  function parseToDict(search) {
	    var dict = {};

	    if (typeof search === "object") {
	      // if `search` is an array, treat it as a sequence
	      if (isArray(search)) {
	        for (var i = 0; i < search.length; i++) {
	          var item = search[i];

	          if (isArray(item) && item.length === 2) {
	            appendTo(dict, item[0], item[1]);
	          } else {
	            throw new TypeError("Failed to construct 'URLSearchParams': Sequence initializer must only contain pair elements");
	          }
	        }
	      } else {
	        for (var key in search) {
	          if (search.hasOwnProperty(key)) {
	            appendTo(dict, key, search[key]);
	          }
	        }
	      }
	    } else {
	      // remove first '?'
	      if (search.indexOf("?") === 0) {
	        search = search.slice(1);
	      }

	      var pairs = search.split("&");

	      for (var j = 0; j < pairs.length; j++) {
	        var value = pairs[j],
	            index = value.indexOf('=');

	        if (-1 < index) {
	          appendTo(dict, decode(value.slice(0, index)), decode(value.slice(index + 1)));
	        } else {
	          if (value) {
	            appendTo(dict, decode(value), '');
	          }
	        }
	      }
	    }

	    return dict;
	  }

	  function appendTo(dict, name, value) {
	    var val = typeof value === 'string' ? value : value !== null && value !== undefined && typeof value.toString === 'function' ? value.toString() : JSON.stringify(value);

	    if (name in dict) {
	      dict[name].push(val);
	    } else {
	      dict[name] = [val];
	    }
	  }

	  function isArray(val) {
	    return !!val && '[object Array]' === Object.prototype.toString.call(val);
	  }
	})(typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof window !== 'undefined' ? window : commonjsGlobal);

	var ReactiveBase = {
	  name: 'ReactiveBase',
	  data: function data() {
	    this.state = {
	      key: '__REACTIVE_BASE__'
	    };
	    return this.state;
	  },
	  created: function created() {
	    this.setStore(this.$props);
	  },
	  props: {
	    app: types.stringRequired,
	    analytics: VueTypes.bool.def(false),
	    credentials: types.string,
	    headers: types.headers,
	    queryParams: types.string,
	    theme: VueTypes.object.def({}),
	    themePreset: VueTypes.string.def('light'),
	    type: types.string,
	    url: types.string,
	    mapKey: types.string,
	    className: types.string,
	    initialState: VueTypes.object.def({}),
	    transformRequest: types.func,
	    transformResponse: types.func
	  },
	  provide: function provide() {
	    return {
	      theme_reactivesearch: composeThemeObject(getTheme(this.$props.themePreset), this.$props.theme),
	      store: this.store
	    };
	  },
	  watch: {
	    app: function app() {
	      this.updateState(this.$props);
	    },
	    url: function url() {
	      this.updateState(this.$props);
	    },
	    type: function type() {
	      this.updateState(this.$props);
	    },
	    credentials: function credentials() {
	      this.updateState(this.$props);
	    },
	    mapKey: function mapKey() {
	      this.updateState(this.$props);
	    },
	    headers: function headers() {
	      this.updateState(this.$props);
	    }
	  },
	  methods: {
	    updateState: function updateState(props) {
	      this.setStore(props);
	      this.key = state.key + "-0";
	    },
	    setStore: function setStore(props) {
	      var credentials = props.url && props.url.trim() !== '' && !props.credentials ? null : props.credentials;
	      var config = {
	        url: props.url && props.url.trim() !== '' ? props.url : 'https://scalr.api.appbase.io',
	        app: props.app,
	        credentials: credentials,
	        type: props.type ? props.type : '*',
	        transformRequest: props.transformRequest,
	        transformResponse: props.transformResponse,
	        analytics: props.analytics
	      };
	      var queryParams = '';

	      if (typeof window !== 'undefined') {
	        queryParams = window.location.search;
	      } else {
	        queryParams = props.queryParams || '';
	      }

	      var params = new URLSearchParams(queryParams);
	      var selectedValues = {};
	      Array.from(params.keys()).forEach(function (key) {
	        try {
	          var _extends2;

	          var parsedParams = JSON.parse(params.get(key));
	          var selectedValue = {};

	          if (parsedParams.value) {
	            selectedValue.value = parsedParams.value;
	          } else {
	            selectedValue.value = parsedParams;
	          }

	          if (parsedParams.category) selectedValue.category = parsedParams.category;
	          selectedValues = _extends({}, selectedValues, (_extends2 = {}, _extends2[key] = selectedValue, _extends2));
	        } catch (e) {// Do not add to selectedValues if JSON parsing fails.
	        }
	      });
	      var _props$headers = props.headers,
	          headers = _props$headers === void 0 ? {} : _props$headers,
	          themePreset = props.themePreset;
	      var appbaseRef = index$2(config);

	      if (this.$props.transformRequest) {
	        appbaseRef.transformRequest = this.$props.transformRequest;
	      }

	      if (this.$props.transformResponse) {
	        appbaseRef.transformResponse = this.$props.transformResponse;
	      }

	      var initialState = _extends({
	        config: _extends({}, config, {
	          mapKey: props.mapKey,
	          themePreset: themePreset
	        }),
	        appbaseRef: appbaseRef,
	        selectedValues: selectedValues,
	        headers: headers
	      }, this.$props.initialState);

	      this.store = configureStore(initialState);
	    }
	  },
	  render: function render() {
	    var h = arguments[0];
	    var children = this.$slots["default"];
	    var _this$$props = this.$props,
	        headers = _this$$props.headers,
	        style = _this$$props.style,
	        className = _this$$props.className;
	    return h(Provider, {
	      "attrs": {
	        "store": this.store
	      }
	    }, [h(URLParamsProvider$1, {
	      "attrs": {
	        "headers": headers,
	        "className": className
	      },
	      "style": style
	    }, [children])]);
	  }
	};

	ReactiveBase.install = function (Vue) {
	  Vue.component(ReactiveBase.name, ReactiveBase);
	};

	function _templateObject$5() {
	  var data = _taggedTemplateLiteralLoose(["\n\tmargin: 0 0 8px;\n\tfont-size: 1rem;\n\tcolor: ", ";\n"]);

	  _templateObject$5 = function _templateObject() {
	    return data;
	  };

	  return data;
	}
	var Title = index$1('h2')(_templateObject$5(), function (_ref) {
	  var theme = _ref.theme;
	  return theme.colors.titleColor;
	});

	function _templateObject12() {
	  var data = _taggedTemplateLiteralLoose(["\n\tdisplay: block;\n\twidth: 100%;\n\tborder: 1px solid #ccc;\n\tbackground-color: #fff;\n\tfont-size: 0.9rem;\n\tz-index: 3;\n\tposition: absolute;\n\ttop: 41px;\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n\tmax-height: 260px;\n\toverflow-y: auto;\n\n\t&.small {\n\t\ttop: 30px;\n\t}\n\n\tli {\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\tpadding: 10px;\n\t\tuser-select: none;\n\n\t\t& > .trim {\n\t\t\tdisplay: block;\n\t\t\tdisplay: -webkit-box;\n\t\t\twidth: 100%;\n\t\t\tmax-height: 2.3rem;\n\t\t\tline-height: 1.2rem;\n\t\t\t-webkit-line-clamp: 2;\n\t\t\t-webkit-box-orient: vertical;\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t}\n\t}\n\n\t", "\n"]);

	  _templateObject12 = function _templateObject12() {
	    return data;
	  };

	  return data;
	}

	function _templateObject11$1() {
	  var data = _taggedTemplateLiteralLoose(["\n\tposition: relative;\n\t.cancel-icon {\n\t\tcursor: pointer;\n\t}\n"]);

	  _templateObject11$1 = function _templateObject11() {
	    return data;
	  };

	  return data;
	}

	function _templateObject10$1() {
	  var data = _taggedTemplateLiteralLoose(["\n\tdisplay: block;\n\twidth: 100%;\n\tborder: 1px solid #ccc;\n\tbackground-color: #fff;\n\tfont-size: 0.9rem;\n\tz-index: 3;\n\tposition: absolute;\n\ttop: 41px;\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n\tmax-height: 260px;\n\toverflow-y: auto;\n\n\t&.small {\n\t\ttop: 30px;\n\t}\n\n\tli {\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\tcursor: pointer;\n\t\tpadding: 10px;\n\t\tuser-select: none;\n\n\t\t& > .trim {\n\t\t\tdisplay: block;\n\t\t\tdisplay: -webkit-box;\n\t\t\twidth: 100%;\n\t\t\tmax-height: 2.3rem;\n\t\t\tline-height: 1.2rem;\n\t\t\t-webkit-line-clamp: 2;\n\t\t\t-webkit-box-orient: vertical;\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t}\n\n\t\t&:hover,\n\t\t&:focus {\n\t\t\tbackground-color: #eee;\n\t\t}\n\t}\n\n\t", ";\n"]);

	  _templateObject10$1 = function _templateObject10() {
	    return data;
	  };

	  return data;
	}

	function _templateObject9$1() {
	  var data = _taggedTemplateLiteralLoose(["\n\t\t\tpadding-right: 48px;\n\t\t"]);

	  _templateObject9$1 = function _templateObject9() {
	    return data;
	  };

	  return data;
	}

	function _templateObject8$2() {
	  var data = _taggedTemplateLiteralLoose(["\n\t\t\tpadding-right: 32px;\n\t\t"]);

	  _templateObject8$2 = function _templateObject8() {
	    return data;
	  };

	  return data;
	}

	function _templateObject7$2() {
	  var data = _taggedTemplateLiteralLoose(["\n\t\t\tpadding-right: 32px;\n\t\t"]);

	  _templateObject7$2 = function _templateObject7() {
	    return data;
	  };

	  return data;
	}

	function _templateObject6$2() {
	  var data = _taggedTemplateLiteralLoose(["\n\t\t\tpadding-left: 32px;\n\t\t"]);

	  _templateObject6$2 = function _templateObject6() {
	    return data;
	  };

	  return data;
	}

	function _templateObject5$2() {
	  var data = _taggedTemplateLiteralLoose(["\n\t", ";\n\t", ";\n\n\t", ";\n\n\t", ";\n\n\t", ";\n\n\t", ";\n\n\t", ";\n"]);

	  _templateObject5$2 = function _templateObject5() {
	    return data;
	  };

	  return data;
	}

	function _templateObject4$2() {
	  var data = _taggedTemplateLiteralLoose(["\n\tbackground-color: ", ";\n\tcolor: ", ";\n\t", ";\n\n\t&:focus {\n\t\tbackground-color: ", ";\n\t}\n"]);

	  _templateObject4$2 = function _templateObject4() {
	    return data;
	  };

	  return data;
	}

	function _templateObject3$2() {
	  var data = _taggedTemplateLiteralLoose(["\n\tborder-color: ", ";\n"]);

	  _templateObject3$2 = function _templateObject3() {
	    return data;
	  };

	  return data;
	}

	function _templateObject2$3() {
	  var data = _taggedTemplateLiteralLoose(["\n\twidth: 100%;\n\theight: 42px;\n\tpadding: 8px 12px;\n\tborder: 1px solid #ccc;\n\tbackground-color: #fafafa;\n\tfont-size: 0.9rem;\n\toutline: none;\n\n\t&:focus {\n\t\tbackground-color: #fff;\n\t}\n"]);

	  _templateObject2$3 = function _templateObject2() {
	    return data;
	  };

	  return data;
	}

	function _templateObject$6() {
	  var data = _taggedTemplateLiteralLoose(["\n\tborder: 1px solid ", ";\n"]);

	  _templateObject$6 = function _templateObject() {
	    return data;
	  };

	  return data;
	}

	var alertBorder = function alertBorder(_ref) {
	  var theme = _ref.theme;
	  return css(_templateObject$6(), theme.colors.alertColor);
	};

	var input = css(_templateObject2$3());

	var dark$1 = function dark(theme) {
	  return css(_templateObject3$2(), theme.colors.borderColor);
	};

	var darkInput = function darkInput(_ref2) {
	  var theme = _ref2.theme;
	  return css(_templateObject4$2(), theme.colors.backgroundColor, theme.colors.textColor, dark$1(theme), theme.colors.backgroundColor);
	};

	var Input = index$1('input')(_templateObject5$2(), input, function (_ref3) {
	  var themePreset = _ref3.themePreset;
	  return themePreset === 'dark' && darkInput;
	}, function (props) {
	  return props.showIcon && props.iconPosition === 'left' && css(_templateObject6$2());
	}, function (props) {
	  return props.showIcon && props.iconPosition === 'right' && css(_templateObject7$2());
	}, function (props) {
	  return (// for clear icon
	    props.showClear && css(_templateObject8$2())
	  );
	}, function (props) {
	  return (// for clear icon with search icon
	    props.showClear && props.showIcon && props.iconPosition === 'right' && css(_templateObject9$1())
	  );
	}, function (props) {
	  return props.alert && alertBorder;
	});

	var suggestions$1 = function suggestions(themePreset, theme) {
	  return css(_templateObject10$1(), themePreset === 'dark' && dark$1(theme));
	};

	var suggestionsContainer = css(_templateObject11$1());

	var noSuggestions = function noSuggestions(themePreset, theme) {
	  return css(_templateObject12(), themePreset === 'dark' && dark$1(theme));
	};

	function _templateObject4$3() {
	  var data = _taggedTemplateLiteralLoose(["\n\tposition: absolute;\n\ttop: calc(50%);\n\ttransform: translateY(-50%);\n\t", ";\n\t", "};\n\n\tsvg.search-icon {\n\t\tfill: ", ";\n\t}\n\n\tsvg.cancel-icon {\n\t\tfill: ", ";\n\t}\n"]);

	  _templateObject4$3 = function _templateObject4() {
	    return data;
	  };

	  return data;
	}

	function _templateObject3$3() {
	  var data = _taggedTemplateLiteralLoose(["\n\tpadding-right: 32px;\n\tright: 0;\n\ttop: calc(50% - 9px);\n"]);

	  _templateObject3$3 = function _templateObject3() {
	    return data;
	  };

	  return data;
	}

	function _templateObject2$4() {
	  var data = _taggedTemplateLiteralLoose(["\n\tpadding-right: 12px;\n\tright: 0;\n"]);

	  _templateObject2$4 = function _templateObject2() {
	    return data;
	  };

	  return data;
	}

	function _templateObject$7() {
	  var data = _taggedTemplateLiteralLoose(["\n\tpadding-left: 12px;\n\tleft: 0;\n"]);

	  _templateObject$7 = function _templateObject() {
	    return data;
	  };

	  return data;
	}
	var left = css(_templateObject$7());
	var right = css(_templateObject2$4());
	var clear = css(_templateObject3$3());
	var InputIcon = index$1('div')(_templateObject4$3(), function (_ref) {
	  var iconPosition = _ref.iconPosition;

	  if (iconPosition === 'left') {
	    return left;
	  }

	  if (iconPosition === 'right') {
	    return right;
	  }

	  return null;
	}, function (_ref2) {
	  var clearIcon = _ref2.clearIcon;
	  return clearIcon && clear;
	}, function (_ref3) {
	  var theme = _ref3.theme;
	  return theme.colors.primaryColor;
	}, function (_ref4) {
	  var theme = _ref4.theme;
	  return theme.colors.borderColor;
	});

	function isElement(el) {
	  return el != null && typeof el === 'object' && el.nodeType === 1;
	}

	function canOverflow(overflow, skipOverflowHiddenElements) {
	  if (skipOverflowHiddenElements && overflow === 'hidden') {
	    return false;
	  }

	  return overflow !== 'visible' && overflow !== 'clip';
	}

	function isScrollable(el, skipOverflowHiddenElements) {
	  if (el.clientHeight < el.scrollHeight || el.clientWidth < el.scrollWidth) {
	    var style = getComputedStyle(el, null);
	    return canOverflow(style.overflowY, skipOverflowHiddenElements) || canOverflow(style.overflowX, skipOverflowHiddenElements);
	  }

	  return false;
	}

	function alignNearest(scrollingEdgeStart, scrollingEdgeEnd, scrollingSize, scrollingBorderStart, scrollingBorderEnd, elementEdgeStart, elementEdgeEnd, elementSize) {
	  if (elementEdgeStart < scrollingEdgeStart && elementEdgeEnd > scrollingEdgeEnd || elementEdgeStart > scrollingEdgeStart && elementEdgeEnd < scrollingEdgeEnd) {
	    return 0;
	  }

	  if (elementEdgeStart <= scrollingEdgeStart && elementSize <= scrollingSize || elementEdgeEnd >= scrollingEdgeEnd && elementSize >= scrollingSize) {
	    return elementEdgeStart - scrollingEdgeStart - scrollingBorderStart;
	  }

	  if (elementEdgeEnd > scrollingEdgeEnd && elementSize < scrollingSize || elementEdgeStart < scrollingEdgeStart && elementSize > scrollingSize) {
	    return elementEdgeEnd - scrollingEdgeEnd + scrollingBorderEnd;
	  }

	  return 0;
	}

	var computeScrollIntoView = (function (target, options) {
	  var scrollMode = options.scrollMode,
	      block = options.block,
	      inline = options.inline,
	      boundary = options.boundary,
	      skipOverflowHiddenElements = options.skipOverflowHiddenElements;
	  var checkBoundary = typeof boundary === 'function' ? boundary : function (node) {
	    return node !== boundary;
	  };

	  if (!isElement(target)) {
	    throw new TypeError('Invalid target');
	  }

	  var scrollingElement = document.scrollingElement || document.documentElement;
	  var frames = [];
	  var cursor = target;

	  while (isElement(cursor) && checkBoundary(cursor)) {
	    cursor = cursor.parentNode;

	    if (cursor === scrollingElement) {
	      frames.push(cursor);
	      break;
	    }

	    if (cursor === document.body && isScrollable(cursor) && !isScrollable(document.documentElement)) {
	      continue;
	    }

	    if (isScrollable(cursor, skipOverflowHiddenElements)) {
	      frames.push(cursor);
	    }
	  }

	  var viewportWidth = window.visualViewport ? visualViewport.width : innerWidth;
	  var viewportHeight = window.visualViewport ? visualViewport.height : innerHeight;
	  var viewportX = window.scrollX || pageXOffset;
	  var viewportY = window.scrollY || pageYOffset;

	  var _target$getBoundingCl = target.getBoundingClientRect(),
	      targetHeight = _target$getBoundingCl.height,
	      targetWidth = _target$getBoundingCl.width,
	      targetTop = _target$getBoundingCl.top,
	      targetRight = _target$getBoundingCl.right,
	      targetBottom = _target$getBoundingCl.bottom,
	      targetLeft = _target$getBoundingCl.left;

	  var targetBlock = block === 'start' || block === 'nearest' ? targetTop : block === 'end' ? targetBottom : targetTop + targetHeight / 2;
	  var targetInline = inline === 'center' ? targetLeft + targetWidth / 2 : inline === 'end' ? targetRight : targetLeft;
	  var computations = [];

	  for (var index = 0; index < frames.length; index++) {
	    var frame = frames[index];

	    var _frame$getBoundingCli = frame.getBoundingClientRect(),
	        _height = _frame$getBoundingCli.height,
	        _width = _frame$getBoundingCli.width,
	        _top = _frame$getBoundingCli.top,
	        right = _frame$getBoundingCli.right,
	        bottom = _frame$getBoundingCli.bottom,
	        _left = _frame$getBoundingCli.left;

	    if (scrollMode === 'if-needed' && targetTop >= 0 && targetLeft >= 0 && targetBottom <= viewportHeight && targetRight <= viewportWidth && targetTop >= _top && targetBottom <= bottom && targetLeft >= _left && targetRight <= right) {
	      return computations;
	    }

	    var frameStyle = getComputedStyle(frame);
	    var borderLeft = parseInt(frameStyle.borderLeftWidth, 10);
	    var borderTop = parseInt(frameStyle.borderTopWidth, 10);
	    var borderRight = parseInt(frameStyle.borderRightWidth, 10);
	    var borderBottom = parseInt(frameStyle.borderBottomWidth, 10);
	    var blockScroll = 0;
	    var inlineScroll = 0;
	    var scrollbarWidth = 'offsetWidth' in frame ? frame.offsetWidth - frame.clientWidth - borderLeft - borderRight : 0;
	    var scrollbarHeight = 'offsetHeight' in frame ? frame.offsetHeight - frame.clientHeight - borderTop - borderBottom : 0;

	    if (scrollingElement === frame) {
	      if (block === 'start') {
	        blockScroll = targetBlock;
	      } else if (block === 'end') {
	        blockScroll = targetBlock - viewportHeight;
	      } else if (block === 'nearest') {
	        blockScroll = alignNearest(viewportY, viewportY + viewportHeight, viewportHeight, borderTop, borderBottom, viewportY + targetBlock, viewportY + targetBlock + targetHeight, targetHeight);
	      } else {
	        blockScroll = targetBlock - viewportHeight / 2;
	      }

	      if (inline === 'start') {
	        inlineScroll = targetInline;
	      } else if (inline === 'center') {
	        inlineScroll = targetInline - viewportWidth / 2;
	      } else if (inline === 'end') {
	        inlineScroll = targetInline - viewportWidth;
	      } else {
	        inlineScroll = alignNearest(viewportX, viewportX + viewportWidth, viewportWidth, borderLeft, borderRight, viewportX + targetInline, viewportX + targetInline + targetWidth, targetWidth);
	      }

	      blockScroll = Math.max(0, blockScroll + viewportY);
	      inlineScroll = Math.max(0, inlineScroll + viewportX);
	    } else {
	      if (block === 'start') {
	        blockScroll = targetBlock - _top - borderTop;
	      } else if (block === 'end') {
	        blockScroll = targetBlock - bottom + borderBottom + scrollbarHeight;
	      } else if (block === 'nearest') {
	        blockScroll = alignNearest(_top, bottom, _height, borderTop, borderBottom + scrollbarHeight, targetBlock, targetBlock + targetHeight, targetHeight);
	      } else {
	        blockScroll = targetBlock - (_top + _height / 2) + scrollbarHeight / 2;
	      }

	      if (inline === 'start') {
	        inlineScroll = targetInline - _left - borderLeft;
	      } else if (inline === 'center') {
	        inlineScroll = targetInline - (_left + _width / 2) + scrollbarWidth / 2;
	      } else if (inline === 'end') {
	        inlineScroll = targetInline - right + borderRight + scrollbarWidth;
	      } else {
	        inlineScroll = alignNearest(_left, right, _width, borderLeft, borderRight + scrollbarWidth, targetInline, targetInline + targetWidth, targetWidth);
	      }

	      var scrollLeft = frame.scrollLeft,
	          scrollTop = frame.scrollTop;
	      blockScroll = Math.max(0, Math.min(scrollTop + blockScroll, frame.scrollHeight - _height + scrollbarHeight));
	      inlineScroll = Math.max(0, Math.min(scrollLeft + inlineScroll, frame.scrollWidth - _width + scrollbarWidth));
	      targetBlock += scrollTop - blockScroll;
	      targetInline += scrollLeft - inlineScroll;
	    }

	    computations.push({
	      el: frame,
	      top: blockScroll,
	      left: inlineScroll
	    });
	  }

	  return computations;
	});

	/**
	 * Scroll node into view if necessary
	 * @param {HTMLElement} node the element that should scroll into view
	 * @param {HTMLElement} rootNode the root element of the component
	 */
	// eslint-disable-next-line

	var scrollIntoView = function scrollIntoView(node, rootNode) {
	  if (node === null) {
	    return;
	  }

	  var actions = computeScrollIntoView(node, {
	    boundary: rootNode,
	    block: 'nearest',
	    scrollMode: 'if-needed'
	  });
	  actions.forEach(function (_ref) {
	    var el = _ref.el,
	        top = _ref.top,
	        left = _ref.left;
	    el.scrollTop = top;
	    el.scrollLeft = left;
	  });
	};

	var Downshift = {
	  // eslint-disable-next-line
	  props: ['isOpen', 'inputValue', 'selectedItem', 'highlightedIndex', 'handleChange', 'itemToString', 'handleMouseup'],
	  data: function data() {
	    return {
	      isMouseDown: false,
	      internal_isOpen: false,
	      internal_inputValue: '',
	      internal_selectedItem: null,
	      internal_highlightedIndex: null
	    };
	  },
	  computed: {
	    mergedState: function mergedState() {
	      var _this = this;

	      return Object.keys(this.$props).reduce(function (state, key) {
	        var _extends2;

	        return _extends({}, state, (_extends2 = {}, _extends2[key] = _this.isControlledProp(key) ? _this.$props[key] : _this["internal_" + key], _extends2));
	      }, {});
	    },
	    internalItemCount: function internalItemCount() {
	      return this.items.length;
	    }
	  },
	  mounted: function mounted() {
	    window.addEventListener('mousedown', this.handleWindowMousedown);
	    window.addEventListener('mouseup', this.handleWindowMouseup);
	  },
	  beforeDestroy: function beforeDestroy() {
	    window.removeEventListener('mousedown', this.handleWindowMousedown);
	    window.removeEventListener('mouseup', this.handleWindowMouseup);
	  },
	  methods: {
	    handleWindowMousedown: function handleWindowMousedown() {
	      this.isMouseDown = true;
	    },
	    handleWindowMouseup: function handleWindowMouseup(event) {
	      this.isMouseDown = false;

	      if ((event.target === this.$refs.rootNode || !this.$refs.rootNode.contains(event.target)) && this.mergedState.isOpen) {
	        // TODO: handle on outer click here
	        if (!this.isMouseDown) {
	          this.reset();

	          if (this.$props.handleMouseup) {
	            this.$props.handleMouseup({
	              isOpen: false
	            });
	          }
	        }
	      }
	    },
	    keyDownArrowDown: function keyDownArrowDown(event) {
	      event.preventDefault();
	      var amount = event.shiftKey ? 5 : 1;

	      if (this.mergedState.isOpen) {
	        this.changeHighlightedIndex(amount);
	      } else {
	        this.setState({
	          isOpen: true
	        });
	        this.setHighlightedIndex();
	      }
	    },
	    keyDownArrowUp: function keyDownArrowUp(event) {
	      event.preventDefault();
	      var amount = event.shiftKey ? -5 : -1;

	      if (this.mergedState.isOpen) {
	        this.changeHighlightedIndex(amount);
	      } else {
	        this.setState({
	          isOpen: true
	        });
	        this.setHighlightedIndex();
	      }
	    },
	    keyDownEnter: function keyDownEnter(event) {
	      if (this.mergedState.isOpen) {
	        event.preventDefault();
	        this.selectHighlightedItem();
	      }
	    },
	    keyDownEscape: function keyDownEscape(event) {
	      event.preventDefault();
	      this.reset();
	    },
	    selectHighlightedItem: function selectHighlightedItem() {
	      return this.selectItemAtIndex(this.mergedState.highlightedIndex);
	    },
	    selectItemAtIndex: function selectItemAtIndex(itemIndex) {
	      var item = this.items[itemIndex];

	      if (item == null) {
	        return;
	      }

	      this.selectItem(item);
	    },
	    selectItem: function selectItem(item) {
	      if (this.$props.handleChange) {
	        this.$props.handleChange(item);
	      }

	      this.setState({
	        isOpen: false,
	        highlightedIndex: null,
	        selectedItem: item,
	        inputValue: this.isControlledProp('selectedItem') ? '' : item
	      });
	    },
	    changeHighlightedIndex: function changeHighlightedIndex(moveAmount) {
	      if (this.internalItemCount < 0) {
	        return;
	      }

	      var highlightedIndex = this.mergedState.highlightedIndex;
	      var baseIndex = highlightedIndex;

	      if (baseIndex === null) {
	        baseIndex = moveAmount > 0 ? -1 : this.internalItemCount + 1;
	      }

	      var newIndex = baseIndex + moveAmount;

	      if (newIndex < 0) {
	        newIndex = this.internalItemCount;
	      } else if (newIndex > this.internalItemCount) {
	        newIndex = 0;
	      }

	      this.setHighlightedIndex(newIndex);
	    },
	    setHighlightedIndex: function setHighlightedIndex(highlightedIndex) {
	      if (highlightedIndex === void 0) {
	        highlightedIndex = null;
	      }

	      this.setState({
	        highlightedIndex: highlightedIndex
	      });
	      var element = document.getElementById("Downshift" + highlightedIndex);
	      scrollIntoView(element, this.rootNode); // Implement scrollIntroView thingy
	    },
	    reset: function reset() {
	      var selectedItem = this.mergedState.selectedItem;
	      this.setState({
	        isOpen: false,
	        highlightedIndex: null,
	        inputValue: selectedItem
	      });
	    },
	    getItemProps: function getItemProps(_ref) {
	      var index = _ref.index,
	          item = _ref.item;
	      var newIndex = index;

	      if (index === undefined) {
	        if (this.$props.itemToString) {
	          this.items.push(this.$props.itemToString(item));
	        } else {
	          this.items.push(item);
	        }

	        newIndex = this.items.indexOf(item);
	      } else {
	        this.items[newIndex] = item;
	      }

	      return {
	        id: "Downshift" + newIndex
	      };
	    },
	    getItemEvents: function getItemEvents(_ref2) {
	      var index = _ref2.index,
	          item = _ref2.item;
	      var newIndex = index;

	      if (index === undefined) {
	        newIndex = this.items.indexOf(item);
	      }

	      var vm = this;
	      return {
	        mouseenter: function mouseenter() {
	          vm.setHighlightedIndex(newIndex);
	        },
	        click: function click(event) {
	          event.stopPropagation();
	          vm.selectItemAtIndex(newIndex);
	        }
	      };
	    },
	    getInputProps: function getInputProps(_ref3) {
	      var value = _ref3.value;
	      var inputValue = this.mergedState.inputValue;

	      if (value !== inputValue) {
	        this.setState({
	          inputValue: value
	        });
	      }

	      return {
	        value: inputValue
	      };
	    },
	    getButtonProps: function getButtonProps(_ref4) {
	      var _this2 = this;

	      var onClick = _ref4.onClick,
	          onKeyDown = _ref4.onKeyDown,
	          onKeyUp = _ref4.onKeyUp,
	          onBlur = _ref4.onBlur;
	      return {
	        click: function click(event) {
	          _this2.setState({
	            isOpen: true,
	            inputValue: event.target.value
	          });

	          if (onClick) {
	            onClick(event);
	          }
	        },
	        keydown: function keydown(event) {
	          if (event.key && _this2["keyDown" + event.key]) {
	            _this2["keyDown" + event.key].call(_this2, event);
	          }

	          if (onKeyDown) {
	            onKeyDown(event);
	          }
	        },
	        keyup: function keyup(event) {
	          if (onKeyUp) {
	            onKeyUp(event);
	          }
	        },
	        blur: function blur(event) {
	          if (onBlur) {
	            onBlur(event);
	          }
	        }
	      };
	    },
	    getInputEvents: function getInputEvents(_ref5) {
	      var _this3 = this;

	      var onInput = _ref5.onInput,
	          onBlur = _ref5.onBlur,
	          onFocus = _ref5.onFocus,
	          onKeyPress = _ref5.onKeyPress,
	          onKeyDown = _ref5.onKeyDown,
	          onKeyUp = _ref5.onKeyUp;
	      return {
	        input: function input(event) {
	          _this3.setState({
	            isOpen: true,
	            inputValue: event.target.value
	          });

	          if (onInput) {
	            onInput(event);
	          }
	        },
	        focus: function focus(event) {
	          if (onFocus) {
	            onFocus(event);
	          }
	        },
	        keydown: function keydown(event) {
	          if (event.key && _this3["keyDown" + event.key]) {
	            _this3["keyDown" + event.key].call(_this3, event);
	          }

	          if (onKeyDown) {
	            onKeyDown(event);
	          }
	        },
	        keypress: function keypress(event) {
	          if (onKeyPress) {
	            onKeyPress(event);
	          }
	        },
	        keyup: function keyup(event) {
	          if (onKeyUp) {
	            onKeyUp(event);
	          }
	        },
	        blur: function blur(event) {
	          if (onBlur) {
	            onBlur(event);
	          } // TODO: implement isMouseDown
	          // this.reset()

	        }
	      };
	    },
	    getHelpersAndState: function getHelpersAndState() {
	      var getItemProps = this.getItemProps,
	          getItemEvents = this.getItemEvents,
	          getInputProps = this.getInputProps,
	          getInputEvents = this.getInputEvents,
	          getButtonProps = this.getButtonProps;
	      return _extends({
	        getItemProps: getItemProps,
	        getItemEvents: getItemEvents,
	        getInputProps: getInputProps,
	        getInputEvents: getInputEvents,
	        getButtonProps: getButtonProps
	      }, this.mergedState);
	    },
	    isControlledProp: function isControlledProp(prop) {
	      return this.$props[prop] !== undefined;
	    },
	    setState: function setState(stateToSet) {
	      var _this4 = this;

	      // eslint-disable-next-line
	      Object.keys(stateToSet).map(function (key) {
	        // eslint-disable-next-line
	        _this4.isControlledProp(key) ? _this4.$emit(key + "Change", stateToSet[key]) : _this4["internal_" + key] = stateToSet[key];
	      });
	      this.$emit('stateChange', this.mergedState);
	    }
	  },
	  render: function render() {
	    var h = arguments[0];
	    this.items = [];
	    return h("div", {
	      "ref": "rootNode"
	    }, [this.$scopedSlots["default"] && this.$scopedSlots["default"](_extends({}, this.getHelpersAndState()))]);
	  }
	};

	function _templateObject$8() {
	  var data = _taggedTemplateLiteralLoose(["\n\t", ";\n"]);

	  _templateObject$8 = function _templateObject() {
	    return data;
	  };

	  return data;
	}
	var Container = index$1('div')(_templateObject$8(), function (_ref) {
	  var theme = _ref.theme;
	  return theme.component;
	});

	var getClassName$2 = lib_8.getClassName;
	var SuggestionWrapper = {
	  name: 'SuggestionWrapper',
	  props: {
	    innerClassName: types.string,
	    themePreset: types.themePreset,
	    innerClass: types.style
	  },
	  render: function render() {
	    var h = arguments[0];
	    var _this$$props = this.$props,
	        themePreset = _this$$props.themePreset,
	        innerClass = _this$$props.innerClass,
	        innerClassName = _this$$props.innerClassName;
	    return h("div", {
	      "class": noSuggestions(themePreset) + " " + getClassName$2(innerClass, innerClassName || '')
	    }, [h("li", [this.$scopedSlots["default"]()])]);
	  }
	};

	var dist = createCommonjsModule(function (module) {
	  module.exports =
	  /******/
	  function (modules) {
	    // webpackBootstrap

	    /******/
	    // The module cache

	    /******/
	    var installedModules = {};
	    /******/

	    /******/
	    // The require function

	    /******/

	    function __webpack_require__(moduleId) {
	      /******/

	      /******/
	      // Check if module is in cache

	      /******/
	      if (installedModules[moduleId])
	        /******/
	        return installedModules[moduleId].exports;
	      /******/

	      /******/
	      // Create a new module (and put it into the cache)

	      /******/

	      var module = installedModules[moduleId] = {
	        /******/
	        exports: {},

	        /******/
	        id: moduleId,

	        /******/
	        loaded: false
	        /******/

	      };
	      /******/

	      /******/
	      // Execute the module function

	      /******/

	      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	      /******/

	      /******/
	      // Flag the module as loaded

	      /******/

	      module.loaded = true;
	      /******/

	      /******/
	      // Return the exports of the module

	      /******/

	      return module.exports;
	      /******/
	    }
	    /******/

	    /******/

	    /******/
	    // expose the modules object (__webpack_modules__)

	    /******/


	    __webpack_require__.m = modules;
	    /******/

	    /******/
	    // expose the module cache

	    /******/

	    __webpack_require__.c = installedModules;
	    /******/

	    /******/
	    // __webpack_public_path__

	    /******/

	    __webpack_require__.p = "";
	    /******/

	    /******/
	    // Load entry module and return exports

	    /******/

	    return __webpack_require__(0);
	    /******/
	  }(
	  /************************************************************************/

	  /******/
	  [
	  /* 0 */

	  /***/
	  function (module, exports, __webpack_require__) {
	    module.exports = __webpack_require__(1);
	    /***/
	  },
	  /* 1 */

	  /***/
	  function (module, exports, __webpack_require__) {

	    Object.defineProperty(exports, "__esModule", {
	      value: true
	    });

	    var _utils = __webpack_require__(2);

	    Object.defineProperty(exports, 'combineChunks', {
	      enumerable: true,
	      get: function get() {
	        return _utils.combineChunks;
	      }
	    });
	    Object.defineProperty(exports, 'fillInChunks', {
	      enumerable: true,
	      get: function get() {
	        return _utils.fillInChunks;
	      }
	    });
	    Object.defineProperty(exports, 'findAll', {
	      enumerable: true,
	      get: function get() {
	        return _utils.findAll;
	      }
	    });
	    Object.defineProperty(exports, 'findChunks', {
	      enumerable: true,
	      get: function get() {
	        return _utils.findChunks;
	      }
	    });
	    /***/
	  },
	  /* 2 */

	  /***/
	  function (module, exports) {

	    Object.defineProperty(exports, "__esModule", {
	      value: true
	    });
	    /**
	     * Creates an array of chunk objects representing both higlightable and non highlightable pieces of text that match each search word.
	     * @return Array of "chunks" (where a Chunk is { start:number, end:number, highlight:boolean })
	     */

	    var findAll = exports.findAll = function findAll(_ref) {
	      var autoEscape = _ref.autoEscape,
	          _ref$caseSensitive = _ref.caseSensitive,
	          caseSensitive = _ref$caseSensitive === undefined ? false : _ref$caseSensitive,
	          _ref$findChunks = _ref.findChunks,
	          findChunks = _ref$findChunks === undefined ? defaultFindChunks : _ref$findChunks,
	          sanitize = _ref.sanitize,
	          searchWords = _ref.searchWords,
	          textToHighlight = _ref.textToHighlight;
	      return fillInChunks({
	        chunksToHighlight: combineChunks({
	          chunks: findChunks({
	            autoEscape: autoEscape,
	            caseSensitive: caseSensitive,
	            sanitize: sanitize,
	            searchWords: searchWords,
	            textToHighlight: textToHighlight
	          })
	        }),
	        totalLength: textToHighlight ? textToHighlight.length : 0
	      });
	    };
	    /**
	     * Takes an array of {start:number, end:number} objects and combines chunks that overlap into single chunks.
	     * @return {start:number, end:number}[]
	     */


	    var combineChunks = exports.combineChunks = function combineChunks(_ref2) {
	      var chunks = _ref2.chunks;
	      chunks = chunks.sort(function (first, second) {
	        return first.start - second.start;
	      }).reduce(function (processedChunks, nextChunk) {
	        // First chunk just goes straight in the array...
	        if (processedChunks.length === 0) {
	          return [nextChunk];
	        } else {
	          // ... subsequent chunks get checked to see if they overlap...
	          var prevChunk = processedChunks.pop();

	          if (nextChunk.start <= prevChunk.end) {
	            // It may be the case that prevChunk completely surrounds nextChunk, so take the
	            // largest of the end indeces.
	            var endIndex = Math.max(prevChunk.end, nextChunk.end);
	            processedChunks.push({
	              highlight: false,
	              start: prevChunk.start,
	              end: endIndex
	            });
	          } else {
	            processedChunks.push(prevChunk, nextChunk);
	          }

	          return processedChunks;
	        }
	      }, []);
	      return chunks;
	    };
	    /**
	     * Examine text for any matches.
	     * If we find matches, add them to the returned array as a "chunk" object ({start:number, end:number}).
	     * @return {start:number, end:number}[]
	     */


	    var defaultFindChunks = function defaultFindChunks(_ref3) {
	      var autoEscape = _ref3.autoEscape,
	          caseSensitive = _ref3.caseSensitive,
	          _ref3$sanitize = _ref3.sanitize,
	          sanitize = _ref3$sanitize === undefined ? defaultSanitize : _ref3$sanitize,
	          searchWords = _ref3.searchWords,
	          textToHighlight = _ref3.textToHighlight;
	      textToHighlight = sanitize(textToHighlight);
	      return searchWords.filter(function (searchWord) {
	        return searchWord;
	      }) // Remove empty words
	      .reduce(function (chunks, searchWord) {
	        searchWord = sanitize(searchWord);

	        if (autoEscape) {
	          searchWord = escapeRegExpFn(searchWord);
	        }

	        var regex = new RegExp(searchWord, caseSensitive ? 'g' : 'gi');
	        var match = void 0;

	        while (match = regex.exec(textToHighlight)) {
	          var _start = match.index;
	          var _end = regex.lastIndex; // We do not return zero-length matches

	          if (_end > _start) {
	            chunks.push({
	              highlight: false,
	              start: _start,
	              end: _end
	            });
	          } // Prevent browsers like Firefox from getting stuck in an infinite loop
	          // See http://www.regexguru.com/2008/04/watch-out-for-zero-length-matches/


	          if (match.index === regex.lastIndex) {
	            regex.lastIndex++;
	          }
	        }

	        return chunks;
	      }, []);
	    }; // Allow the findChunks to be overridden in findAll,
	    // but for backwards compatibility we export as the old name


	    exports.findChunks = defaultFindChunks;
	    /**
	     * Given a set of chunks to highlight, create an additional set of chunks
	     * to represent the bits of text between the highlighted text.
	     * @param chunksToHighlight {start:number, end:number}[]
	     * @param totalLength number
	     * @return {start:number, end:number, highlight:boolean}[]
	     */

	    var fillInChunks = exports.fillInChunks = function fillInChunks(_ref4) {
	      var chunksToHighlight = _ref4.chunksToHighlight,
	          totalLength = _ref4.totalLength;
	      var allChunks = [];

	      var append = function append(start, end, highlight) {
	        if (end - start > 0) {
	          allChunks.push({
	            start: start,
	            end: end,
	            highlight: highlight
	          });
	        }
	      };

	      if (chunksToHighlight.length === 0) {
	        append(0, totalLength, false);
	      } else {
	        var lastIndex = 0;
	        chunksToHighlight.forEach(function (chunk) {
	          append(lastIndex, chunk.start, false);
	          append(chunk.start, chunk.end, true);
	          lastIndex = chunk.end;
	        });
	        append(lastIndex, totalLength, false);
	      }

	      return allChunks;
	    };

	    function defaultSanitize(string) {
	      return string;
	    }

	    function escapeRegExpFn(string) {
	      return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	    }
	    /***/

	  }]);
	});
	unwrapExports(dist);
	var dist_1 = dist.findAll;

	/*!
	 * vue-highlight-words © Yichang Liu, 2019
	 *
	 * Version: 1.2.0
	 *
	 * LICENCE: MIT
	 *
	 * https://github.com/Astray-git/vue-highlight-words
	 *
	*/

	function _defineProperty$1(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
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

	function _objectSpread$1(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty$1(target, key, source[key]);
	    });
	  }

	  return target;
	}

	var VueHighlightWords = {
	  functional: true,
	  props: {
	    activeClassName: String,
	    activeIndex: Number,
	    activeStyle: Object,
	    autoEscape: Boolean,
	    findChunks: Function,
	    highlightClassName: String,
	    highlightStyle: Object,
	    highlightTag: [Object, Function, String],
	    sanitize: Function,
	    searchWords: {
	      type: Array,
	      // Array<string>
	      validator: function validator(value) {
	        return value.every(function (word) {
	          return typeof word === 'string';
	        });
	      },
	      required: true
	    },
	    textToHighlight: {
	      type: String,
	      required: true
	    },
	    unhighlightClassName: String,
	    unhighlightStyle: Object
	  },
	  render: function render(h, context) {
	    var _context$props = context.props,
	        _context$props$active = _context$props.activeClassName,
	        activeClassName = _context$props$active === void 0 ? '' : _context$props$active,
	        _context$props$active2 = _context$props.activeIndex,
	        activeIndex = _context$props$active2 === void 0 ? -1 : _context$props$active2,
	        activeStyle = _context$props.activeStyle,
	        autoEscape = _context$props.autoEscape,
	        _context$props$caseSe = _context$props.caseSensitive,
	        caseSensitive = _context$props$caseSe === void 0 ? false : _context$props$caseSe,
	        findChunks = _context$props.findChunks,
	        _context$props$highli = _context$props.highlightClassName,
	        highlightClassName = _context$props$highli === void 0 ? '' : _context$props$highli,
	        _context$props$highli2 = _context$props.highlightStyle,
	        highlightStyle = _context$props$highli2 === void 0 ? {} : _context$props$highli2,
	        _context$props$highli3 = _context$props.highlightTag,
	        highlightTag = _context$props$highli3 === void 0 ? 'mark' : _context$props$highli3,
	        sanitize = _context$props.sanitize,
	        searchWords = _context$props.searchWords,
	        textToHighlight = _context$props.textToHighlight,
	        _context$props$unhigh = _context$props.unhighlightClassName,
	        unhighlightClassName = _context$props$unhigh === void 0 ? '' : _context$props$unhigh,
	        unhighlightStyle = _context$props.unhighlightStyle;
	    var contextData = context.data;
	    var chunks = dist_1({
	      autoEscape: autoEscape,
	      caseSensitive: caseSensitive,
	      findChunks: findChunks,
	      sanitize: sanitize,
	      searchWords: searchWords,
	      textToHighlight: textToHighlight
	    });
	    var HighlightTag = highlightTag;
	    var highlightCount = -1;
	    var highlightClassNames = '';
	    var highlightStyles;
	    return h('span', _objectSpread$1({}, contextData), chunks.map(function (chunk, index) {
	      var text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);

	      if (chunk.highlight) {
	        highlightCount++;
	        var isActive = highlightCount === +activeIndex;
	        highlightClassNames = "".concat(highlightClassName, " ").concat(isActive ? activeClassName : '');
	        highlightStyles = isActive === true && activeStyle != null ? Object.assign({}, highlightStyle, activeStyle) : highlightStyle;
	        var data = {
	          "class": highlightClassNames,
	          key: index,
	          style: highlightStyles
	        };

	        if (typeof HighlightTag !== 'string') {
	          // not plain html tag, add props for compoent
	          data.props = {
	            highlightIndex: highlightCount
	          };
	        }

	        if (contextData.scopedSlots) {
	          return h(HighlightTag, data, [contextData.scopedSlots["default"]({
	            children: text,
	            highlightIndex: highlightCount
	          })]);
	        }

	        return h(HighlightTag, data, text);
	      } else {
	        return h('span', {
	          "class": unhighlightClassName,
	          key: index,
	          style: unhighlightStyle
	        }, text);
	      }
	    }));
	  }
	};

	var highlightStyle = {
	  fontWeight: 600,
	  padding: 0,
	  backgroundColor: 'transparent',
	  color: 'inherit'
	};
	var SuggestionItem = {
	  name: 'SuggestionItem',
	  props: {
	    currentValue: types.string,
	    suggestion: types.any
	  },
	  render: function render() {
	    var h = arguments[0];
	    var _this$suggestion = this.suggestion,
	        label = _this$suggestion.label,
	        value = _this$suggestion.value,
	        title = _this$suggestion.title,
	        description = _this$suggestion.description,
	        image = _this$suggestion.image;

	    if (label) {
	      // label has highest precedence
	      return typeof label === 'string' ? h("div", {
	        "class": "trim"
	      }, [h(VueHighlightWords, {
	        "attrs": {
	          "searchWords": this.currentValue.split(' '),
	          "textToHighlight": label,
	          "autoEscape": true,
	          "highlightStyle": highlightStyle
	        }
	      })]) : label;
	    }

	    if (title || image || description) {
	      return h(Flex, {
	        "attrs": {
	          "alignItems": "center",
	          "css": {
	            width: '100%'
	          }
	        }
	      }, [image && h("div", {
	        "attrs": {
	          "css": {
	            margin: 'auto',
	            marginRight: 10
	          }
	        }
	      }, [h("img", {
	        "attrs": {
	          "src": image,
	          "alt": " ",
	          "height": "50px",
	          "width": "50px",
	          "css": {
	            objectFit: 'contain'
	          }
	        }
	      })]), h(Flex, {
	        "attrs": {
	          "direction": "column",
	          "css": {
	            width: image ? 'calc(100% - 60px)' : '100%'
	          }
	        }
	      }, [title && h("div", {
	        "class": "trim"
	      }, [h(VueHighlightWords, {
	        "attrs": {
	          "searchWords": this.currentValue.split(' '),
	          "textToHighlight": title,
	          "highlightStyle": highlightStyle
	        },
	        "class": css({
	          fontSize: '1rem'
	        })
	      })]), description && h("div", {
	        "class": cx('trim', css({
	          marginTop: 3
	        }))
	      }, [h(VueHighlightWords, {
	        "attrs": {
	          "searchWords": this.currentValue.split(' '),
	          "textToHighlight": description,
	          "highlightStyle": highlightStyle
	        }
	      })])])]);
	    }

	    return value;
	  }
	};

	var SearchSvg = {
	  functional: true,
	  render: function render(h) {
	    return h("svg", {
	      "attrs": {
	        "alt": "Search",
	        "height": "14",
	        "xmlns": "http://www.w3.org/2000/svg",
	        "viewBox": "0 0 15 15"
	      },
	      "class": "search-icon"
	    }, [h("title", ["Search"]), h("path", {
	      "attrs": {
	        "d": 'M6.02945,10.20327a4.17382,4.17382,0,1,1,4.17382-4.17382A4.15609,4.15609,0,0,1,6.02945,10.20327Zm9.69195,4.2199L10.8989,9.59979A5.88021,5.88021,0,0,0,12.058,6.02856,6.00467,6.00467,0,1,0,9.59979,10.8989l4.82338,4.82338a.89729.89729,0,0,0,1.29912,0,.89749.89749,0,0,0-.00087-1.29909Z'
	      }
	    })]);
	  }
	};

	var CancelSvg = {
	  functional: true,
	  render: function render(h) {
	    return h("svg", {
	      "attrs": {
	        "alt": "Clear",
	        "height": "10",
	        "xmlns": "http://www.w3.org/2000/svg",
	        "viewBox": "0 0 212.982 212.982"
	      },
	      "class": "cancel-icon"
	    }, [h("title", ["Clear"]), h("path", {
	      "attrs": {
	        "d": 'M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z'
	      }
	    })]);
	  }
	};

	var addComponent$1 = lib_5.addComponent,
	    removeComponent$1 = lib_5.removeComponent,
	    watchComponent$1 = lib_5.watchComponent,
	    updateQuery$1 = lib_5.updateQuery,
	    setQueryOptions$1 = lib_5.setQueryOptions,
	    setQueryListener$1 = lib_5.setQueryListener;
	var debounce = lib_8.debounce,
	    pushToAndClause$1 = lib_8.pushToAndClause,
	    checkValueChange = lib_8.checkValueChange,
	    getClassName$3 = lib_8.getClassName,
	    getOptionsFromQuery$1 = lib_8.getOptionsFromQuery;
	var DataSearch = {
	  name: 'DataSearch',
	  data: function data() {
	    var props = this.$props;
	    this.__state = {
	      currentValue: '',
	      isOpen: false,
	      normalizedSuggestions: []
	    };
	    this.internalComponent = props.componentId + "__internal";
	    this.locked = false;
	    return this.__state;
	  },
	  inject: {
	    theme: {
	      from: 'theme_reactivesearch'
	    }
	  },
	  created: function created() {
	    var _this = this;

	    this.currentValue = this.selectedValue || '';
	    this.handleTextChange = debounce(function (value) {
	      if (_this.$props.autosuggest) {
	        _this.updateQueryHandler(_this.internalComponent, value, _this.$props);
	      } else {
	        _this.updateQueryHandler(_this.$props.componentId, value, _this.$props);
	      }
	    }, this.$props.debounce);

	    var onQueryChange = function onQueryChange() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      _this.$emit.apply(_this, ['queryChange'].concat(args));
	    };

	    this.setQueryListener(this.$props.componentId, onQueryChange, function (e) {
	      _this.$emit('error', e);
	    });
	  },
	  computed: {
	    suggestionsList: function suggestionsList() {
	      var suggestionsList = [];

	      if (!this.$data.currentValue && this.$props.defaultSuggestions && this.$props.defaultSuggestions.length) {
	        suggestionsList = this.$props.defaultSuggestions;
	      } else if (this.$data.currentValue) {
	        suggestionsList = this.normalizedSuggestions;
	      }

	      return suggestionsList;
	    }
	  },
	  props: {
	    options: types.options,
	    autoFocus: types.bool,
	    autosuggest: VueTypes.bool.def(true),
	    beforeValueChange: types.func,
	    className: VueTypes.string.def(''),
	    clearIcon: types.children,
	    componentId: types.stringRequired,
	    customHighlight: types.func,
	    customQuery: types.func,
	    dataField: types.dataFieldArray,
	    debounce: VueTypes.number.def(0),
	    defaultSelected: types.string,
	    defaultSuggestions: types.suggestions,
	    fieldWeights: types.fieldWeights,
	    filterLabel: types.string,
	    fuzziness: types.fuzziness,
	    highlight: types.bool,
	    highlightField: types.stringOrArray,
	    icon: types.children,
	    iconPosition: VueTypes.oneOf(['left', 'right']).def('left'),
	    innerClass: types.style,
	    innerRef: types.func,
	    renderAllSuggestions: types.func,
	    renderSuggestion: types.func,
	    renderNoSuggestion: types.title,
	    renderError: types.title,
	    placeholder: VueTypes.string.def('Search'),
	    queryFormat: VueTypes.oneOf(['and', 'or']).def('or'),
	    react: types.react,
	    showClear: VueTypes.bool.def(true),
	    showFilter: VueTypes.bool.def(true),
	    showIcon: VueTypes.bool.def(true),
	    title: types.title,
	    theme: types.style,
	    URLParams: VueTypes.bool.def(false),
	    strictSelection: VueTypes.bool.def(false),
	    nestedField: types.string
	  },
	  beforeMount: function beforeMount() {
	    this.addComponent(this.$props.componentId, 'DATASEARCH');
	    this.addComponent(this.internalComponent);

	    if (this.$props.highlight) {
	      var queryOptions = DataSearch.highlightQuery(this.$props) || {};
	      queryOptions.size = 20;
	      this.queryOptions = queryOptions;
	      this.setQueryOptions(this.$props.componentId, this.queryOptions);
	    } else {
	      this.queryOptions = {
	        size: 20
	      };
	      this.setQueryOptions(this.$props.componentId, this.queryOptions);
	    }

	    this.setReact(this.$props);

	    if (this.selectedValue) {
	      this.setValue(this.selectedValue, true);
	    } else if (this.$props.defaultSelected) {
	      this.setValue(this.$props.defaultSelected, true);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.removeComponent(this.$props.componentId);
	    this.removeComponent(this.internalComponent);
	  },
	  watch: {
	    highlight: function highlight() {
	      this.updateQueryOptions();
	    },
	    dataField: function dataField() {
	      this.updateQueryOptions();
	      this.updateQueryHandler(this.$props.componentId, this.$data.currentValue, this.$props);
	    },
	    highlightField: function highlightField() {
	      this.updateQueryOptions();
	    },
	    react: function react() {
	      this.setReact(this.$props);
	    },
	    fieldWeights: function fieldWeights() {
	      this.updateQueryHandler(this.$props.componentId, this.$data.currentValue, this.$props);
	    },
	    fuzziness: function fuzziness() {
	      this.updateQueryHandler(this.$props.componentId, this.$data.currentValue, this.$props);
	    },
	    queryFormat: function queryFormat() {
	      this.updateQueryHandler(this.$props.componentId, this.$data.currentValue, this.$props);
	    },
	    defaultSelected: function defaultSelected(newVal) {
	      this.setValue(newVal, true, this.$props);
	    },
	    suggestions: function suggestions(newVal) {
	      if (Array.isArray(newVal) && this.$data.currentValue.trim().length) {
	        // shallow check allows us to set suggestions even if the next set
	        // of suggestions are same as the current one
	        this.$emit('suggestions', newVal);
	        this.normalizedSuggestions = this.onSuggestions(newVal);
	      }
	    },
	    selectedValue: function selectedValue(newVal, oldVal) {
	      if (oldVal !== newVal && this.$data.currentValue !== newVal) {
	        this.setValue(newVal || '', true, this.$props);
	      }
	    }
	  },
	  methods: {
	    updateQueryOptions: function updateQueryOptions() {
	      var queryOptions = DataSearch.highlightQuery(this.$props) || {};
	      queryOptions.size = 20;
	      this.queryOptions = queryOptions;
	      this.setQueryOptions(this.$props.componentId, this.queryOptions);
	    },
	    setReact: function setReact(props) {
	      var react = this.$props.react;

	      if (react) {
	        var newReact = pushToAndClause$1(react, this.internalComponent);
	        this.watchComponent(props.componentId, newReact);
	      } else {
	        this.watchComponent(props.componentId, {
	          and: this.internalComponent
	        });
	      }
	    },
	    onSuggestions: function onSuggestions(results) {
	      var renderSuggestion = this.$props.renderSuggestion;
	      var fields = Array.isArray(this.$props.dataField) ? this.$props.dataField : [this.$props.dataField];
	      var parsedSuggestions = lib_6(fields, results, this.$data.currentValue.toLowerCase());

	      if (renderSuggestion) {
	        return parsedSuggestions.map(function (suggestion) {
	          return renderSuggestion(suggestion);
	        });
	      }

	      return parsedSuggestions;
	    },
	    setValue: function setValue(value, isDefaultValue, props, cause) {
	      var _this2 = this;

	      if (isDefaultValue === void 0) {
	        isDefaultValue = false;
	      }

	      if (props === void 0) {
	        props = this.$props;
	      }

	      // ignore state updates when component is locked
	      if (props.beforeValueChange && this.locked) {
	        return;
	      }

	      this.locked = true;

	      var performUpdate = function performUpdate() {
	        _this2.currentValue = value;
	        _this2.normalizedSuggestions = [];

	        if (isDefaultValue) {
	          if (_this2.$props.autosuggest) {
	            _this2.isOpen = false;

	            _this2.updateQueryHandler(_this2.internalComponent, value, props);
	          } // in case of strict selection only SUGGESTION_SELECT should be able
	          // to set the query otherwise the value should reset


	          if (props.strictSelection) {
	            if (cause === lib_7.SUGGESTION_SELECT || value === '') {
	              _this2.updateQueryHandler(props.componentId, value, props);
	            } else {
	              _this2.setValue('', true);
	            }
	          } else {
	            _this2.updateQueryHandler(props.componentId, value, props);
	          }
	        } else {
	          // debounce for handling text while typing
	          _this2.handleTextChange(value);
	        }

	        _this2.locked = false;

	        _this2.$emit('valueChange', value);
	      };

	      checkValueChange(props.componentId, value, props.beforeValueChange, performUpdate);
	    },
	    updateQueryHandler: function updateQueryHandler(componentId, value, props) {
	      var customQuery = props.customQuery,
	          filterLabel = props.filterLabel,
	          showFilter = props.showFilter,
	          URLParams = props.URLParams;
	      var customQueryOptions;
	      var defaultQueryTobeSet = DataSearch.defaultQuery(value, props);
	      var query = defaultQueryTobeSet;

	      if (customQuery) {
	        var customQueryTobeSet = customQuery(value, props);
	        var queryTobeSet = customQueryTobeSet.query;

	        if (queryTobeSet) {
	          query = [queryTobeSet];
	        }

	        customQueryOptions = getOptionsFromQuery$1(customQueryTobeSet);
	        this.setQueryOptions(componentId, _extends({}, this.queryOptions, {}, customQueryOptions));
	      }

	      this.updateQuery({
	        componentId: componentId,
	        query: query,
	        value: value,
	        label: filterLabel,
	        showFilter: showFilter,
	        URLParams: URLParams,
	        componentType: 'DATASEARCH'
	      });
	    },
	    // need to review
	    handleFocus: function handleFocus(event) {
	      this.isOpen = true;

	      if (this.$props.onFocus) {
	        this.$emit('focus', event);
	      }
	    },
	    clearValue: function clearValue() {
	      this.setValue('', true);
	      this.onValueSelectedHandler(null, lib_7.CLEAR_VALUE);
	    },
	    handleKeyDown: function handleKeyDown(event, highlightedIndex) {
	      // if a suggestion was selected, delegate the handling to suggestion handler
	      if (event.key === 'Enter' && highlightedIndex === null) {
	        this.setValue(event.target.value, true);
	        this.onValueSelectedHandler(event.target.value, lib_7.ENTER_PRESS);
	      } // Need to review


	      if (this.$props.onKeyDown) {
	        this.$emit('keyDown', event);
	      }
	    },
	    onInputChange: function onInputChange(e) {
	      var value = e.target.value;

	      if (!this.$data.isOpen) {
	        this.isOpen = true;
	      }

	      this.setValue(value);
	    },
	    onSuggestionSelected: function onSuggestionSelected(suggestion) {
	      this.setValue(suggestion.value, true, this.$props, lib_7.SUGGESTION_SELECT);
	      this.onValueSelectedHandler(suggestion.value, lib_7.SUGGESTION_SELECT, suggestion.source);
	    },
	    onValueSelectedHandler: function onValueSelectedHandler(currentValue) {
	      if (currentValue === void 0) {
	        currentValue = this.$data.currentValue;
	      }

	      for (var _len2 = arguments.length, cause = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        cause[_key2 - 1] = arguments[_key2];
	      }

	      this.$emit.apply(this, ['valueSelected', currentValue].concat(cause));
	    },
	    handleStateChange: function handleStateChange(changes) {
	      var isOpen = changes.isOpen;
	      this.isOpen = isOpen;
	    },
	    getBackgroundColor: function getBackgroundColor(highlightedIndex, index) {
	      var isDark = this.themePreset === 'dark';

	      if (isDark) {
	        return highlightedIndex === index ? '#555' : '#424242';
	      }

	      return highlightedIndex === index ? '#eee' : '#fff';
	    },
	    renderIcon: function renderIcon() {
	      var h = this.$createElement;

	      if (this.$props.showIcon) {
	        return this.$props.icon || h(SearchSvg);
	      }

	      return null;
	    },
	    renderErrorComponent: function renderErrorComponent() {
	      var h = this.$createElement;
	      var renderError = this.$scopedSlots.renderError || this.$props.renderError;

	      if (this.error && renderError && this.$data.currentValue && !this.isLoading) {
	        return h(SuggestionWrapper, {
	          "attrs": {
	            "innerClass": this.$props.innerClass,
	            "innerClassName": "error",
	            "theme": this.theme,
	            "themePreset": this.themePreset
	          }
	        }, [isFunction$1(renderError) ? renderError(this.error) : renderError]);
	      }

	      return null;
	    },
	    renderCancelIcon: function renderCancelIcon() {
	      var h = this.$createElement;

	      if (this.$props.showClear) {
	        return this.$props.clearIcon || h(CancelSvg);
	      }

	      return null;
	    },
	    renderNoSuggestions: function renderNoSuggestions(finalSuggestionsList) {
	      if (finalSuggestionsList === void 0) {
	        finalSuggestionsList = [];
	      }

	      var h = this.$createElement;
	      var _this$$props = this.$props,
	          theme = _this$$props.theme,
	          innerClass = _this$$props.innerClass;
	      var renderNoSuggestion = this.$scopedSlots.renderNoSuggestion || this.$props.renderNoSuggestion;
	      var renderError = this.$scopedSlots.renderError || this.$props.renderError;
	      var _this$$data = this.$data,
	          isOpen = _this$$data.isOpen,
	          currentValue = _this$$data.currentValue;

	      if (renderNoSuggestion && isOpen && !finalSuggestionsList.length && !this.isLoading && currentValue && !(renderError && this.error)) {
	        return h(SuggestionWrapper, {
	          "attrs": {
	            "innerClass": innerClass,
	            "themePreset": this.themePreset,
	            "theme": theme,
	            "innerClassName": "noSuggestion"
	          },
	          "scopedSlots": {
	            "default": function _default() {
	              return typeof renderNoSuggestion === 'function' ? renderNoSuggestion(currentValue) : renderNoSuggestion;
	            }
	          }
	        });
	      }

	      return null;
	    },
	    renderIcons: function renderIcons() {
	      var h = this.$createElement;
	      return h("div", [this.$data.currentValue && this.$props.showClear && h(InputIcon, {
	        "on": {
	          "click": this.clearValue
	        },
	        "attrs": {
	          "iconPosition": "right",
	          "clearIcon": this.$props.iconPosition === 'right'
	        }
	      }, [this.renderCancelIcon()]), h(InputIcon, {
	        "attrs": {
	          "iconPosition": this.$props.iconPosition
	        }
	      }, [this.renderIcon()])]);
	    }
	  },
	  render: function render() {
	    var _this3 = this;

	    var h = arguments[0];
	    var theme = this.$props.theme;
	    var renderAllSuggestions = this.$scopedSlots.renderAllSuggestions || this.$props.renderAllSuggestions;
	    return h(Container, {
	      "class": this.$props.className
	    }, [this.$props.title && h(Title, {
	      "class": getClassName$3(this.$props.innerClass, 'title') || ''
	    }, [this.$props.title]), this.$props.defaultSuggestions || this.$props.autosuggest ? h(Downshift, {
	      "attrs": {
	        "id": this.$props.componentId + "-downshift",
	        "handleChange": this.onSuggestionSelected,
	        "handleMouseup": this.handleStateChange,
	        "isOpen": this.$data.isOpen
	      },
	      "scopedSlots": {
	        "default": function _default(_ref) {
	          var getInputEvents = _ref.getInputEvents,
	              getInputProps = _ref.getInputProps,
	              getItemProps = _ref.getItemProps,
	              getItemEvents = _ref.getItemEvents,
	              isOpen = _ref.isOpen,
	              highlightedIndex = _ref.highlightedIndex;
	          return h("div", {
	            "class": suggestionsContainer
	          }, [h(Input, {
	            "attrs": {
	              "id": _this3.$props.componentId + "-input",
	              "showIcon": _this3.$props.showIcon,
	              "showClear": _this3.$props.showClear,
	              "iconPosition": _this3.$props.iconPosition,
	              "innerRef": _this3.$props.innerRef,
	              "placeholder": _this3.$props.placeholder,
	              "themePreset": _this3.themePreset
	            },
	            "class": getClassName$3(_this3.$props.innerClass, 'input'),
	            "on": _extends({}, getInputEvents({
	              onInput: _this3.onInputChange,
	              onBlur: function onBlur(e) {
	                _this3.$emit('blur', e);
	              },
	              onFocus: _this3.handleFocus,
	              onKeyPress: function onKeyPress(e) {
	                _this3.$emit('keyPress', e);
	              },
	              onKeyDown: function onKeyDown(e) {
	                return _this3.handleKeyDown(e, highlightedIndex);
	              },
	              onKeyUp: function onKeyUp(e) {
	                _this3.$emit('keyUp', e);
	              }
	            })),
	            "domProps": _extends({}, getInputProps({
	              value: _this3.$data.currentValue === null ? '' : _this3.$data.currentValue
	            }))
	          }), _this3.renderIcons(), renderAllSuggestions && renderAllSuggestions({
	            currentValue: _this3.$data.currentValue,
	            isOpen: isOpen,
	            getItemProps: getItemProps,
	            getItemEvents: getItemEvents,
	            highlightedIndex: highlightedIndex,
	            suggestions: _this3.suggestions,
	            parsedSuggestions: _this3.suggestionsList
	          }), _this3.renderErrorComponent(), !renderAllSuggestions && isOpen && _this3.suggestionsList.length ? h("ul", {
	            "class": suggestions$1(_this3.themePreset, theme) + " " + getClassName$3(_this3.$props.innerClass, 'list')
	          }, [_this3.suggestionsList.slice(0, 10).map(function (item, index) {
	            return h("li", {
	              "domProps": _extends({}, getItemProps({
	                item: item
	              })),
	              "on": _extends({}, getItemEvents({
	                item: item
	              })),
	              "key": index + 1 + "-" + item.value,
	              "style": {
	                backgroundColor: _this3.getBackgroundColor(highlightedIndex, index)
	              }
	            }, [h(SuggestionItem, {
	              "attrs": {
	                "currentValue": _this3.currentValue,
	                "suggestion": item
	              }
	            })]);
	          })]) : _this3.renderNoSuggestions(_this3.suggestionsList), ' ']);
	        }
	      }
	    }) : h("div", {
	      "class": suggestionsContainer
	    }, [h(Input, {
	      "class": getClassName$3(this.$props.innerClass, 'input') || '',
	      "attrs": {
	        "placeholder": this.$props.placeholder,
	        "iconPosition": this.$props.iconPosition,
	        "showIcon": this.$props.showIcon,
	        "showClear": this.$props.showClear,
	        "innerRef": this.$props.innerRef,
	        "themePreset": this.themePreset
	      },
	      "on": _extends({}, {
	        blur: function blur(e) {
	          _this3.$emit('blur', e);
	        },
	        keypress: function keypress(e) {
	          _this3.$emit('keyPress', e);
	        },
	        input: this.onInputChange,
	        focus: function focus(e) {
	          _this3.$emit('focus', e);
	        },
	        keydown: function keydown(e) {
	          _this3.$emit('keyDown', e);
	        },
	        keyup: function keyup(e) {
	          _this3.$emit('keyUp', e);
	        }
	      }),
	      "domProps": _extends({}, {
	        autofocus: this.$props.autoFocus,
	        value: this.$data.currentValue ? this.$data.currentValue : ''
	      })
	    }), this.renderIcons()])]);
	  }
	};

	DataSearch.defaultQuery = function (value, props) {
	  var finalQuery = null;
	  var fields;

	  if (value) {
	    if (Array.isArray(props.dataField)) {
	      fields = props.dataField;
	    } else {
	      fields = [props.dataField];
	    }

	    finalQuery = {
	      bool: {
	        should: DataSearch.shouldQuery(value, fields, props),
	        minimum_should_match: '1'
	      }
	    };
	  }

	  if (value === '') {
	    finalQuery = null;
	  }

	  if (finalQuery && props.nestedField) {
	    return {
	      query: {
	        nested: {
	          path: props.nestedField,
	          query: finalQuery
	        }
	      }
	    };
	  }

	  return finalQuery;
	};

	DataSearch.shouldQuery = function (value, dataFields, props) {
	  var fields = dataFields.map(function (field, index) {
	    return "" + field + (Array.isArray(props.fieldWeights) && props.fieldWeights[index] ? "^" + props.fieldWeights[index] : '');
	  });

	  if (props.queryFormat === 'and') {
	    return [{
	      multi_match: {
	        query: value,
	        fields: fields,
	        type: 'cross_fields',
	        operator: 'and'
	      }
	    }, {
	      multi_match: {
	        query: value,
	        fields: fields,
	        type: 'phrase_prefix',
	        operator: 'and'
	      }
	    }];
	  }

	  return [{
	    multi_match: {
	      query: value,
	      fields: fields,
	      type: 'best_fields',
	      operator: 'or',
	      fuzziness: props.fuzziness ? props.fuzziness : 0
	    }
	  }, {
	    multi_match: {
	      query: value,
	      fields: fields,
	      type: 'phrase_prefix',
	      operator: 'or'
	    }
	  }];
	};

	DataSearch.highlightQuery = function (props) {
	  if (props.customHighlight) {
	    return props.customHighlight(props);
	  }

	  if (!props.highlight) {
	    return null;
	  }

	  var fields = {};
	  var highlightField = props.highlightField ? props.highlightField : props.dataField;

	  if (typeof highlightField === 'string') {
	    fields[highlightField] = {};
	  } else if (Array.isArray(highlightField)) {
	    highlightField.forEach(function (item) {
	      fields[item] = {};
	    });
	  }

	  return {
	    highlight: _extends({
	      pre_tags: ['<mark>'],
	      post_tags: ['</mark>'],
	      fields: fields
	    }, props.highlightField && {
	      require_field_match: false
	    })
	  };
	};

	var mapStateToProps$2 = function mapStateToProps(state, props) {
	  return {
	    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null,
	    suggestions: state.hits[props.componentId] && state.hits[props.componentId].hits,
	    isLoading: state.isLoading[props.componentId],
	    themePreset: state.config.themePreset,
	    error: state.error[props.componentId]
	  };
	};

	var mapDispatchtoProps$2 = {
	  addComponent: addComponent$1,
	  removeComponent: removeComponent$1,
	  setQueryOptions: setQueryOptions$1,
	  updateQuery: updateQuery$1,
	  watchComponent: watchComponent$1,
	  setQueryListener: setQueryListener$1
	};
	var DSConnected = connect(mapStateToProps$2, mapDispatchtoProps$2)(DataSearch);

	DataSearch.install = function (Vue) {
	  Vue.component(DataSearch.name, DSConnected);
	};

	function _templateObject6$3() {
	  var data = _taggedTemplateLiteralLoose(["\n\tlist-style: none;\n\tpadding: 0;\n\tmargin: 0;\n\tmax-height: 240px;\n\tposition: relative;\n\toverflow-y: auto;\n\tpadding-bottom: 12px;\n\n\tli {\n\t\theight 30px;\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t\talign-items: center;\n\t\tpadding-left: 2px;\n\t}\n"]);

	  _templateObject6$3 = function _templateObject6() {
	    return data;
	  };

	  return data;
	}

	function _templateObject5$3() {
	  var data = _taggedTemplateLiteralLoose(["\n\t", ";\n\t", ";\n\n\t+ label {\n\t\t&::before,\n\t\t&::after {\n\t\t\tborder-radius: 0;\n\t\t}\n\n\t\t&::after {\n\t\t\tbackground-color: transparent;\n\t\t\ttop: 50%;\n\t\t\tleft: calc(1px + ", " / 5);\n\t\t\twidth: calc(", " / 2);\n\t\t\theight: calc(", " / 5);\n\t\t\tmargin-top: calc(", " / -2 / 2 * 0.8);\n\t\t\tborder-style: solid;\n\t\t\tborder-color: ", ";\n\t\t\tborder-width: 0 0 2px 2px;\n\t\t\tborder-radius: 0;\n\t\t\tborder-image: none;\n\t\t\ttransform: rotate(-45deg) scale(0);\n\t\t\ttransition: none;\n\t\t}\n\t}\n\n\t&:checked {\n\t\t+ label {\n\t\t\t&::before {\n\t\t\t\tborder-color: ", ";\n\t\t\t}\n\n\t\t\t&::after {\n\t\t\t\tcontent: '';\n\t\t\t\ttransform: rotate(-45deg) scale(1);\n\t\t\t\ttransition: transform 200ms ease-out;\n\t\t\t}\n\t\t}\n\t}\n"]);

	  _templateObject5$3 = function _templateObject5() {
	    return data;
	  };

	  return data;
	}

	function _templateObject4$4() {
	  var data = _taggedTemplateLiteralLoose(["\n\t", ";\n\t", ";\n\n\t+ label {\n\t\t&::before,\n\t\t&::after {\n\t\t\tborder-radius: 50%;\n\t\t}\n\t}\n\n\t&:checked {\n\t\t&:active,\n\t\t&:focus {\n\t\t\t+ label {\n\t\t\t\tcolor: ", ";\n\n\t\t\t\t&::before {\n\t\t\t\t\tanimation: none;\n\t\t\t\t\tfilter: none;\n\t\t\t\t\ttransition: none;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t+ label {\n\t\t\t&::before {\n\t\t\t\tanimation: none;\n\t\t\t\tbackground-color: #fff;\n\t\t\t\tborder-color: ", ";\n\t\t}\n\n\t\t&::after {\n\t\t\ttransform: scale(1);\n\t\t}\n\t}\n"]);

	  _templateObject4$4 = function _templateObject4() {
	    return data;
	  };

	  return data;
	}

	function _templateObject3$4() {
	  var data = _taggedTemplateLiteralLoose(["\n\t", ";\n\n\t&:focus {\n\t\t+ label {\n\t\t\t&::before {\n\t\t\t\tbox-shadow: 0 0 0 2px ", ";\n\t\t\t}\n\t\t}\n\t}\n\n\t&:hover {\n\t\t+ label {\n\t\t\t&::before {\n\t\t\t\tborder-color: ", ";\n\t\t\t}\n\t\t}\n\t}\n\n\t&:active {\n\t\t+ label {\n\t\t\t&::before {\n\t\t\t\ttransition-duration: 0;\n\t\t\t}\n\t\t}\n\t}\n\n\t+ label {\n\t\tposition: relative;\n\t\tuser-select: none;\n\t\tdisplay: flex;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\talign-items: center;\n\t\tcursor: pointer;\n\n\t\t&::before {\n\t\t\tbackground-color: #fff;\n\t\t\tborder: 1px solid ", ";\n\t\t\tbox-sizing: content-box;\n\t\t\tcontent: '';\n\t\t\tcolor: ", ";\n\t\t\tmargin-right: calc(", " * 0.5);\n\t\t\ttop: 50%;\n\t\t\tleft: 0;\n\t\t\twidth: ", ";\n\t\t\theight: ", ";\n\t\t\tdisplay: inline-block;\n\t\t\tvertical-align: middle;\n\t\t}\n\n\t\t&::after {\n\t\t\tbox-sizing: content-box;\n\t\t\tcontent: '';\n\t\t\tbackground-color: ", ";\n\t\t\tposition: absolute;\n\t\t\ttop: 50%;\n\t\t\tleft: calc(1px + ", " / 2);\n\t\t\twidth: calc(", " - ", ");\n\t\t\theight: calc(", " - ", ");\n\t\t\tmargin-top: calc(", " / -2 - ", " / -2);\n\t\t\ttransform: scale(0);\n\t\t\ttransform-origin: 50%;\n\t\t\ttransition: transform 200ms ease-out;\n\t\t}\n\t}\n"]);

	  _templateObject3$4 = function _templateObject3() {
	    return data;
	  };

	  return data;
	}

	function _templateObject2$5() {
	  var data = _taggedTemplateLiteralLoose(["\n\t+ label {\n\t\tpadding-left: 0;\n\n\t\t&::before,\n\t\t&::after {\n\t\t\twidth: 0;\n\t\t\theight: 0;\n\t\t\tborder: 0;\n\t\t\tmargin: 0;\n\t\t\tvisibility: hidden;\n\t\t}\n\t}\n\n\t&:checked {\n\t\t+ label {\n\t\t\tfont-weight: bold;\n\t\t}\n\t}\n"]);

	  _templateObject2$5 = function _templateObject2() {
	    return data;
	  };

	  return data;
	}

	function _templateObject$9() {
	  var data = _taggedTemplateLiteralLoose(["\n\tborder: 0;\n\tclip: rect(1px, 1px, 1px, 1px);\n\tclip-path: inset(50%);\n\theight: 1px;\n\toverflow: hidden;\n\tpadding: 0;\n\tposition: absolute;\n\twidth: 1px;\n\twhite-space: nowrap;\n"]);

	  _templateObject$9 = function _templateObject() {
	    return data;
	  };

	  return data;
	}
	var item = {
	  width: '15px',
	  height: '15px',
	  scale: '4px'
	};
	var vh = css(_templateObject$9());
	var hideInputControl = css(_templateObject2$5());

	var formItem = function formItem(_ref) {
	  var theme = _ref.theme;
	  return css(_templateObject3$4(), vh, curriedLighten(0.4, theme.colors.primaryColor), theme.colors.primaryColor, theme.colors.borderColor || curriedLighten(0.1, theme.colors.textColor), theme.colors.primaryColor, item.width, item.width, item.height, theme.colors.primaryColor, item.scale, item.width, item.scale, item.height, item.scale, item.height, item.scale);
	};

	var Radio = index$1('input')(_templateObject4$4(), formItem, function (props) {
	  return props.show ? null : hideInputControl;
	}, function (_ref2) {
	  var theme = _ref2.theme;
	  return theme.colors.primaryColor;
	}, function (_ref3) {
	  var theme = _ref3.theme;
	  return theme.colors.primaryColor;
	});
	var Checkbox = index$1('input')(_templateObject5$3(), formItem, function (props) {
	  return props.show ? null : hideInputControl;
	}, item.width, item.width, item.width, item.height, function (_ref4) {
	  var theme = _ref4.theme;
	  return theme.colors.primaryColor;
	}, function (_ref5) {
	  var theme = _ref5.theme;
	  return theme.colors.primaryColor;
	});
	var UL = index$1('ul')(_templateObject6$3());

	var getAggsOrder = lib_8.getAggsOrder;

	var extractQuery = function extractQuery(defaultQuery) {
	  var queryToBeReturned = {};

	  if (defaultQuery) {
	    var evaluateQuery = defaultQuery();

	    if (evaluateQuery) {
	      if (evaluateQuery.query) {
	        queryToBeReturned.query = evaluateQuery.query;
	      }

	      if (evaluateQuery.aggs) {
	        queryToBeReturned.aggs = evaluateQuery.aggs;
	      }
	    }
	  }

	  return queryToBeReturned;
	};

	var getAggsQuery = function getAggsQuery(query, props) {
	  var _clonedQuery$aggs;

	  var clonedQuery = query;
	  var dataField = props.dataField,
	      size = props.size,
	      sortBy = props.sortBy,
	      showMissing = props.showMissing,
	      missingLabel = props.missingLabel;
	  clonedQuery.size = 0;
	  clonedQuery.aggs = (_clonedQuery$aggs = {}, _clonedQuery$aggs[dataField] = {
	    terms: _extends({
	      field: dataField,
	      size: size,
	      order: getAggsOrder(sortBy || 'count')
	    }, showMissing ? {
	      missing: missingLabel
	    } : {})
	  }, _clonedQuery$aggs);

	  if (props.nestedField) {
	    clonedQuery.aggs = {
	      reactivesearch_nested: {
	        nested: {
	          path: props.nestedField
	        },
	        aggs: clonedQuery.aggs,
	        size: clonedQuery.size
	      }
	    };
	  }

	  return _extends({}, clonedQuery, {}, extractQuery(props.defaultQuery));
	};

	var getCompositeAggsQuery = function getCompositeAggsQuery(query, props, after) {
	  var _ref, _clonedQuery$aggs2;

	  var clonedQuery = query; // missing label not available in composite aggs

	  var dataField = props.dataField,
	      size = props.size,
	      sortBy = props.sortBy,
	      showMissing = props.showMissing; // composite aggs only allows asc and desc

	  var order = sortBy === 'count' ? {} : {
	    order: sortBy
	  };
	  clonedQuery.aggs = (_clonedQuery$aggs2 = {}, _clonedQuery$aggs2[dataField] = {
	    composite: _extends({
	      sources: [(_ref = {}, _ref[dataField] = {
	        terms: _extends({
	          field: dataField
	        }, order, {}, showMissing ? {
	          missing_bucket: true
	        } : {})
	      }, _ref)],
	      size: size
	    }, after)
	  }, _clonedQuery$aggs2);
	  clonedQuery.size = 0;

	  if (props.nestedField) {
	    clonedQuery.aggs = {
	      reactivesearch_nested: {
	        nested: {
	          path: props.nestedField
	        },
	        aggs: clonedQuery.aggs,
	        size: clonedQuery.size
	      }
	    };
	  }

	  return _extends({}, clonedQuery, {}, extractQuery(props.defaultQuery));
	};

	var deprecatePropWarning = function deprecatePropWarning(propName, replaceWith) {
	  console.warn(propName + " prop will be deprecated in the next release. Please replace it with " + replaceWith + " before upgrading to the next major version.");
	};

	var addComponent$2 = lib_5.addComponent,
	    removeComponent$2 = lib_5.removeComponent,
	    watchComponent$2 = lib_5.watchComponent,
	    updateQuery$2 = lib_5.updateQuery,
	    setQueryOptions$2 = lib_5.setQueryOptions,
	    setQueryListener$2 = lib_5.setQueryListener;
	var getQueryOptions$1 = lib_8.getQueryOptions,
	    pushToAndClause$2 = lib_8.pushToAndClause,
	    checkValueChange$1 = lib_8.checkValueChange,
	    getClassName$4 = lib_8.getClassName,
	    getOptionsFromQuery$2 = lib_8.getOptionsFromQuery;
	var SingleList = {
	  name: 'SingleList',
	  props: {
	    beforeValueChange: types.func,
	    className: types.string.def(''),
	    componentId: types.stringRequired,
	    customQuery: types.func,
	    dataField: types.stringRequired,
	    defaultSelected: types.string,
	    defaultValue: types.string,
	    value: types.value,
	    defaultQuery: types.func,
	    filterLabel: types.string,
	    innerClass: types.style,
	    placeholder: VueTypes.string.def('Search'),
	    react: types.react,
	    renderItem: types.func,
	    transformData: types.func,
	    selectAllLabel: types.string,
	    showCount: VueTypes.bool.def(true),
	    showFilter: VueTypes.bool.def(true),
	    showRadio: VueTypes.bool.def(true),
	    showSearch: VueTypes.bool.def(true),
	    size: VueTypes.number.def(100),
	    sortBy: VueTypes.oneOf(['asc', 'desc', 'count']).def('count'),
	    title: types.title,
	    URLParams: VueTypes.bool.def(false),
	    showMissing: VueTypes.bool.def(false),
	    missingLabel: VueTypes.string.def('N/A'),
	    nestedField: types.string
	  },
	  data: function data() {
	    var props = this.$props;
	    this.__state = {
	      currentValue: '',
	      modifiedOptions: props.options && props.options[props.dataField] ? props.options[props.dataField].buckets : [],
	      searchTerm: ''
	    };
	    this.locked = false;
	    this.internalComponent = props.componentId + "__internal";
	    return this.__state;
	  },
	  created: function created() {
	    var _this = this;

	    var onQueryChange = function onQueryChange() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      _this.$emit.apply(_this, ['queryChange'].concat(args));
	    };

	    this.setQueryListener(this.$props.componentId, onQueryChange, function (e) {
	      _this.$emit('error', e);
	    });
	  },
	  beforeMount: function beforeMount() {
	    this.addComponent(this.internalComponent);
	    this.addComponent(this.$props.componentId);
	    this.updateQueryHandlerOptions(this.$props);
	    this.setReact(this.$props);

	    if (this.selectedValue) {
	      this.setValue(this.selectedValue);
	    } else if (this.$props.value) {
	      this.setValue(this.$props.value);
	    } else if (this.$props.defaultValue) {
	      this.setValue(this.$props.defaultValue);
	    } else if (this.$props.defaultSelected) {
	      /* TODO: Remove this before next release */
	      deprecatePropWarning('defaultSelected', 'defaultValue');
	      this.setValue(this.$props.defaultSelected);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.removeComponent(this.$props.componentId);
	    this.removeComponent(this.internalComponent);
	  },
	  watch: {
	    react: function react() {
	      this.setReact(this.$props);
	    },
	    options: function options(newVal) {
	      this.modifiedOptions = newVal[this.$props.dataField] ? newVal[this.$props.dataField].buckets : [];
	    },
	    size: function size() {
	      this.updateQueryHandlerOptions(this.$props);
	    },
	    sortBy: function sortBy() {
	      this.updateQueryHandlerOptions(this.$props);
	    },
	    dataField: function dataField() {
	      this.updateQueryHandlerOptions(this.$props);
	      this.updateQueryHandler(this.$data.currentValue, this.$props);
	    },
	    defaultSelected: function defaultSelected(newVal) {
	      this.setValue(newVal);
	    },
	    defaultValue: function defaultValue(newVal) {
	      this.setValue(newVal);
	    },
	    value: function value(newVal, oldVal) {
	      if (!helper_9(newVal, oldVal)) {
	        this.setValue(newVal);
	      }
	    },
	    selectedValue: function selectedValue(newVal) {
	      if (this.$data.currentValue !== newVal) {
	        this.setValue(newVal || '');
	      }
	    }
	  },
	  render: function render() {
	    var _this2 = this;

	    var h = arguments[0];
	    var _this$$props = this.$props,
	        selectAllLabel = _this$$props.selectAllLabel,
	        renderItem = _this$$props.renderItem,
	        renderError = _this$$props.renderError;
	    var renderItemCalc = this.$scopedSlots.renderItem || renderItem;
	    var renderErrorCalc = this.$scopedSlots.renderError || renderError;

	    if (renderErrorCalc && this.error) {
	      return isFunction$1(renderErrorCalc) ? renderErrorCalc(this.error) : renderErrorCalc;
	    }

	    if (this.modifiedOptions.length === 0) {
	      return null;
	    }

	    var itemsToRender = this.$data.modifiedOptions;

	    if (this.$props.transformData) {
	      itemsToRender = this.$props.transformData(itemsToRender);
	    }

	    return h(Container, {
	      "class": this.$props.className
	    }, [this.$props.title && h(Title, {
	      "class": getClassName$4(this.$props.innerClass, 'title') || ''
	    }, [this.$props.title]), this.renderSearch(), h(UL, {
	      "class": getClassName$4(this.$props.innerClass, 'list') || ''
	    }, [selectAllLabel ? h("li", {
	      "key": selectAllLabel,
	      "class": "" + (this.$data.currentValue === selectAllLabel ? 'active' : '')
	    }, [h(Radio, {
	      "class": getClassName$4(this.$props.innerClass, 'radio'),
	      "attrs": {
	        "id": this.$props.componentId + "-" + selectAllLabel,
	        "name": this.$props.componentId,
	        "value": selectAllLabel,
	        "readOnly": true,
	        "show": this.$props.showRadio
	      },
	      "on": {
	        "click": this.handleClick
	      },
	      "domProps": _extends({}, {
	        checked: this.$data.currentValue === selectAllLabel
	      })
	    }), h("label", {
	      "class": getClassName$4(this.$props.innerClass, 'label') || null,
	      "attrs": {
	        "for": this.$props.componentId + "-" + selectAllLabel
	      }
	    }, [selectAllLabel])]) : null, itemsToRender.filter(function (item) {
	      if (String(item.key).length) {
	        if (_this2.$props.showSearch && _this2.$data.searchTerm) {
	          return String(item.key).toLowerCase().includes(_this2.$data.searchTerm.toLowerCase());
	        }

	        return true;
	      }

	      return false;
	    }).map(function (item) {
	      return h("li", {
	        "key": item.key,
	        "class": "" + (_this2.currentValue === String(item.key) ? 'active' : '')
	      }, [h(Radio, {
	        "class": getClassName$4(_this2.$props.innerClass, 'radio'),
	        "attrs": {
	          "id": _this2.$props.componentId + "-" + item.key,
	          "name": _this2.$props.componentId,
	          "value": item.key,
	          "readOnly": true,
	          "type": "radio",
	          "show": _this2.$props.showRadio
	        },
	        "on": {
	          "click": _this2.handleClick
	        },
	        "domProps": _extends({}, {
	          checked: _this2.currentValue === String(item.key)
	        })
	      }), h("label", {
	        "class": getClassName$4(_this2.$props.innerClass, 'label') || null,
	        "attrs": {
	          "for": _this2.$props.componentId + "-" + item.key
	        }
	      }, [renderItemCalc ? renderItemCalc({
	        label: item.key,
	        count: item.doc_count,
	        isChecked: _this2.currentValue === String(item.key)
	      }) : h("span", [item.key, _this2.$props.showCount && h("span", {
	        "class": getClassName$4(_this2.$props.innerClass, 'count') || null
	      }, ["\xA0(", item.doc_count, ")"])])])]);
	    })])]);
	  },
	  methods: {
	    setReact: function setReact(props) {
	      var react = props.react;

	      if (react) {
	        var newReact = pushToAndClause$2(react, this.internalComponent);
	        this.watchComponent(props.componentId, newReact);
	      } else {
	        this.watchComponent(props.componentId, {
	          and: this.internalComponent
	        });
	      }
	    },
	    setValue: function setValue(nextValue, props) {
	      var _this3 = this;

	      if (props === void 0) {
	        props = this.$props;
	      }

	      // ignore state updates when component is locked
	      if (props.beforeValueChange && this.locked) {
	        return;
	      }

	      this.locked = true;
	      var value = nextValue;

	      if (nextValue === this.$data.currentValue) {
	        value = '';
	      }

	      var performUpdate = function performUpdate() {
	        _this3.currentValue = value;

	        _this3.updateQueryHandler(value, props);

	        _this3.locked = false;

	        _this3.$emit('valueChange', value);
	      };

	      checkValueChange$1(props.componentId, value, props.beforeValueChange, performUpdate);
	    },
	    updateQueryHandler: function updateQueryHandler(value, props) {
	      var customQuery = props.customQuery;
	      var query = SingleList.defaultQuery(value, props);
	      var customQueryOptions;

	      if (customQuery) {
	        var _ref = customQuery(value, props) || {};

	        query = _ref.query;
	        customQueryOptions = getOptionsFromQuery$2(customQuery(value, props));
	      }

	      this.setQueryOptions(props.componentId, customQueryOptions);
	      this.updateQuery({
	        componentId: props.componentId,
	        query: query,
	        value: value,
	        label: props.filterLabel,
	        showFilter: props.showFilter,
	        URLParams: props.URLParams,
	        componentType: 'SINGLELIST'
	      });
	    },
	    generateQueryOptions: function generateQueryOptions(props) {
	      var queryOptions = getQueryOptions$1(props);
	      return getAggsQuery(queryOptions, props);
	    },
	    updateQueryHandlerOptions: function updateQueryHandlerOptions(props) {
	      var queryOptions = SingleList.generateQueryOptions(props);

	      if (props.defaultQuery) {
	        var value = this.$data.currentValue;
	        var defaultQueryOptions = getOptionsFromQuery$2(props.defaultQuery(value, props));
	        this.setQueryOptions(this.internalComponent, _extends({}, queryOptions, {}, defaultQueryOptions));
	      } else {
	        this.setQueryOptions(this.internalComponent, queryOptions);
	      }
	    },
	    handleInputChange: function handleInputChange(e) {
	      var value = e.target.value;
	      this.searchTerm = value;
	    },
	    renderSearch: function renderSearch() {
	      var h = this.$createElement;

	      if (this.$props.showSearch) {
	        return h(Input, {
	          "class": getClassName$4(this.$props.innerClass, 'input') || '',
	          "on": {
	            "input": this.handleInputChange
	          },
	          "attrs": {
	            "value": this.$data.searchTerm,
	            "placeholder": this.$props.placeholder,
	            "themePreset": this.$props.themePreset
	          },
	          "style": {
	            margin: '0 0 8px'
	          }
	        });
	      }

	      return null;
	    },
	    handleClick: function handleClick(e) {
	      var value = this.$props.value;

	      if (value === undefined) {
	        this.setValue(e.target.value);
	      } else {
	        this.$emit('change', e.target.value);
	      }
	    }
	  }
	};

	SingleList.generateQueryOptions = function (props) {
	  var queryOptions = getQueryOptions$1(props);
	  return getAggsQuery(queryOptions, props);
	};

	SingleList.defaultQuery = function (value, props) {
	  var query = null;

	  if (props.selectAllLabel && props.selectAllLabel === value) {
	    if (props.showMissing) {
	      query = {
	        match_all: {}
	      };
	    }

	    query = {
	      exists: {
	        field: props.dataField
	      }
	    };
	  }

	  if (value) {
	    var _term;

	    if (props.showMissing && props.missingLabel === value) {
	      query = {
	        bool: {
	          must_not: {
	            exists: {
	              field: props.dataField
	            }
	          }
	        }
	      };
	    }

	    query = {
	      term: (_term = {}, _term[props.dataField] = value, _term)
	    };
	  }

	  if (query && props.nestedField) {
	    return {
	      query: {
	        nested: {
	          path: props.nestedField,
	          query: query
	        }
	      }
	    };
	  }

	  return query;
	};

	var mapStateToProps$3 = function mapStateToProps(state, props) {
	  return {
	    options: props.nestedField && state.aggregations[props.componentId] ? state.aggregations[props.componentId].reactivesearch_nested : state.aggregations[props.componentId],
	    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || '',
	    themePreset: state.config.themePreset,
	    error: state.error[props.componentId]
	  };
	};

	var mapDispatchtoProps$3 = {
	  addComponent: addComponent$2,
	  removeComponent: removeComponent$2,
	  setQueryOptions: setQueryOptions$2,
	  setQueryListener: setQueryListener$2,
	  updateQuery: updateQuery$2,
	  watchComponent: watchComponent$2
	};
	var ListConnected = connect(mapStateToProps$3, mapDispatchtoProps$3)(SingleList);

	SingleList.install = function (Vue) {
	  Vue.component(SingleList.name, ListConnected);
	};

	var addComponent$3 = lib_5.addComponent,
	    removeComponent$3 = lib_5.removeComponent,
	    watchComponent$3 = lib_5.watchComponent,
	    updateQuery$3 = lib_5.updateQuery,
	    setQueryOptions$3 = lib_5.setQueryOptions,
	    setQueryListener$3 = lib_5.setQueryListener;
	var isEqual$2 = lib_8.isEqual,
	    getQueryOptions$2 = lib_8.getQueryOptions,
	    pushToAndClause$3 = lib_8.pushToAndClause,
	    checkValueChange$2 = lib_8.checkValueChange,
	    getClassName$5 = lib_8.getClassName,
	    getOptionsFromQuery$3 = lib_8.getOptionsFromQuery;
	var MultiList = {
	  name: 'MultiList',
	  props: {
	    defaultSelected: types.stringArray,
	    defaultValue: types.stringArray,
	    value: types.stringArray,
	    queryFormat: VueTypes.oneOf(['and', 'or']).def('or'),
	    showCheckbox: VueTypes.bool.def(true),
	    beforeValueChange: types.func,
	    className: types.string.def(''),
	    componentId: types.stringRequired,
	    customQuery: types.func,
	    dataField: types.stringRequired,
	    defaultQuery: types.func,
	    filterLabel: types.string,
	    innerClass: types.style,
	    placeholder: VueTypes.string.def('Search'),
	    react: types.react,
	    renderItem: types.func,
	    renderError: types.title,
	    transformData: types.func,
	    selectAllLabel: types.string,
	    showCount: VueTypes.bool.def(true),
	    showFilter: VueTypes.bool.def(true),
	    showSearch: VueTypes.bool.def(true),
	    size: VueTypes.number.def(100),
	    sortBy: VueTypes.oneOf(['asc', 'desc', 'count']).def('count'),
	    title: types.title,
	    URLParams: VueTypes.bool.def(false),
	    showMissing: VueTypes.bool.def(false),
	    missingLabel: VueTypes.string.def('N/A'),
	    nestedField: types.string
	  },
	  data: function data() {
	    var props = this.$props;
	    this.__state = {
	      currentValue: {},
	      modifiedOptions: props.options && props.options[props.dataField] ? props.options[props.dataField].buckets : [],
	      searchTerm: ''
	    };
	    this.locked = false;
	    this.internalComponent = props.componentId + "__internal";
	    return this.__state;
	  },
	  created: function created() {
	    var _this = this;

	    var onQueryChange = function onQueryChange() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      _this.$emit.apply(_this, ['queryChange'].concat(args));
	    };

	    this.setQueryListener(this.$props.componentId, onQueryChange, function (e) {
	      _this.$emit('error', e);
	    });
	  },
	  beforeMount: function beforeMount() {
	    this.addComponent(this.internalComponent);
	    this.addComponent(this.$props.componentId);
	    this.updateQueryHandlerOptions(this.$props);
	    this.setReact(this.$props);

	    if (this.selectedValue) {
	      this.setValue(this.selectedValue);
	    } else if (this.$props.value) {
	      this.setValue(this.$props.value, true);
	    } else if (this.$props.defaultValue) {
	      this.setValue(this.$props.defaultValue, true);
	    } else if (this.$props.defaultSelected) {
	      /* TODO: Remove this before next release */
	      deprecatePropWarning('defaultSelected', 'defaultValue');
	      this.setValue(this.$props.defaultSelected, true);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.removeComponent(this.$props.componentId);
	    this.removeComponent(this.internalComponent);
	  },
	  watch: {
	    react: function react() {
	      this.setReact(this.$props);
	    },
	    options: function options(newVal) {
	      this.modifiedOptions = newVal[this.$props.dataField] ? newVal[this.$props.dataField].buckets : [];
	    },
	    size: function size() {
	      this.updateQueryHandlerOptions(this.$props);
	    },
	    sortBy: function sortBy() {
	      this.updateQueryHandlerOptions(this.$props);
	    },
	    dataField: function dataField() {
	      this.updateQueryHandlerOptions(this.$props);
	      this.updateQueryHandler(this.$data.currentValue, this.$props);
	    },
	    defaultSelected: function defaultSelected(newVal, oldVal) {
	      if (!isEqual$2(oldVal, newVal)) {
	        this.setValue(newVal, true);
	      }
	    },
	    value: function value(newVal, oldVal) {
	      if (!isEqual$2(oldVal, newVal)) {
	        this.setValue(newVal, true);
	      }
	    },
	    defaultValue: function defaultValue(newVal, oldVal) {
	      if (!isEqual$2(oldVal, newVal)) {
	        this.setValue(newVal, true);
	      }
	    },
	    selectedValue: function selectedValue(newVal) {
	      var _this2 = this;

	      var selectedValue = Object.keys(this.$data.currentValue);

	      if (this.$props.selectAllLabel) {
	        selectedValue = selectedValue.filter(function (val) {
	          return val !== _this2.$props.selectAllLabel;
	        });

	        if (this.$data.currentValue[this.$props.selectAllLabel]) {
	          selectedValue = [this.$props.selectAllLabel];
	        }
	      }

	      if (!isEqual$2(selectedValue, newVal)) {
	        this.setValue(newVal || [], true);
	      }
	    }
	  },
	  render: function render() {
	    var _this3 = this;

	    var h = arguments[0];
	    var _this$$props = this.$props,
	        selectAllLabel = _this$$props.selectAllLabel,
	        renderItem = _this$$props.renderItem,
	        renderError = _this$$props.renderError;
	    var renderItemCalc = this.$scopedSlots.renderItem || renderItem;
	    var renderErrorCalc = this.$scopedSlots.renderError || renderError;

	    if (renderErrorCalc && this.error) {
	      return isFunction$1(renderErrorCalc) ? renderErrorCalc(this.error) : renderErrorCalc;
	    }

	    if (this.modifiedOptions.length === 0) {
	      return null;
	    }

	    var itemsToRender = this.$data.modifiedOptions;

	    if (this.$props.transformData) {
	      itemsToRender = this.$props.transformData(itemsToRender);
	    }

	    return h(Container, {
	      "class": this.$props.className
	    }, [this.$props.title && h(Title, {
	      "class": getClassName$5(this.$props.innerClass, 'title')
	    }, [this.$props.title]), this.renderSearch(), h(UL, {
	      "class": getClassName$5(this.$props.innerClass, 'list')
	    }, [selectAllLabel ? h("li", {
	      "key": selectAllLabel,
	      "class": "" + (this.currentValue[selectAllLabel] ? 'active' : '')
	    }, [h(Checkbox, {
	      "attrs": {
	        "type": "checkbox",
	        "id": this.$props.componentId + "-" + selectAllLabel,
	        "name": selectAllLabel,
	        "value": selectAllLabel,
	        "show": this.$props.showCheckbox
	      },
	      "class": getClassName$5(this.$props.innerClass, 'checkbox'),
	      "on": {
	        "click": this.handleClick
	      },
	      "domProps": _extends({}, {
	        checked: !!this.currentValue[selectAllLabel]
	      })
	    }), h("label", {
	      "class": getClassName$5(this.$props.innerClass, 'label'),
	      "attrs": {
	        "for": this.$props.componentId + "-" + selectAllLabel
	      }
	    }, [selectAllLabel])]) : null, itemsToRender.filter(function (item) {
	      if (String(item.key).length) {
	        if (_this3.$props.showSearch && _this3.$data.searchTerm) {
	          return String(item.key).toLowerCase().includes(_this3.$data.searchTerm.toLowerCase());
	        }

	        return true;
	      }

	      return false;
	    }).map(function (item) {
	      return h("li", {
	        "key": item.key,
	        "class": "" + (_this3.$data.currentValue[item.key] ? 'active' : '')
	      }, [h(Checkbox, {
	        "attrs": {
	          "type": "checkbox",
	          "id": _this3.$props.componentId + "-" + item.key,
	          "name": _this3.$props.componentId,
	          "value": item.key,
	          "show": _this3.$props.showCheckbox
	        },
	        "class": getClassName$5(_this3.$props.innerClass, 'checkbox'),
	        "on": {
	          "click": _this3.handleClick
	        },
	        "domProps": _extends({}, {
	          checked: !!_this3.$data.currentValue[item.key]
	        })
	      }), h("label", {
	        "class": getClassName$5(_this3.$props.innerClass, 'label'),
	        "attrs": {
	          "for": _this3.$props.componentId + "-" + item.key
	        }
	      }, [renderItemCalc ? renderItemCalc({
	        label: item.key,
	        count: item.doc_count,
	        isChecked: !!_this3.$data.currentValue[item.key]
	      }) : h("span", [item.key, _this3.$props.showCount && h("span", {
	        "class": getClassName$5(_this3.$props.innerClass, 'count')
	      }, ["\xA0(", item.doc_count, ")"])])])]);
	    })])]);
	  },
	  methods: {
	    setReact: function setReact(props) {
	      var react = props.react;

	      if (react) {
	        var newReact = pushToAndClause$3(react, this.internalComponent);
	        this.watchComponent(props.componentId, newReact);
	      } else {
	        this.watchComponent(props.componentId, {
	          and: this.internalComponent
	        });
	      }
	    },
	    setValue: function setValue(value, isDefaultValue, props) {
	      var _this4 = this;

	      if (isDefaultValue === void 0) {
	        isDefaultValue = false;
	      }

	      if (props === void 0) {
	        props = this.$props;
	      }

	      // ignore state updates when component is locked
	      if (props.beforeValueChange && this.locked) {
	        return;
	      }

	      this.locked = true;
	      var selectAllLabel = this.$props.selectAllLabel;
	      var currentValue = this.$data.currentValue;
	      var finalValues = null;

	      if (selectAllLabel && (Array.isArray(value) && value.includes(selectAllLabel) || typeof value === 'string' && value === selectAllLabel)) {
	        if (currentValue[selectAllLabel]) {
	          currentValue = {};
	          finalValues = [];
	        } else {
	          this.$data.modifiedOptions.forEach(function (item) {
	            currentValue[item.key] = true;
	          });
	          currentValue[selectAllLabel] = true;
	          finalValues = [selectAllLabel];
	        }
	      } else if (isDefaultValue) {
	        finalValues = value;
	        currentValue = {};

	        if (value && value.length) {
	          value.forEach(function (item) {
	            currentValue[item] = true;
	          });
	        }

	        if (selectAllLabel && selectAllLabel in currentValue) {
	          var _currentValue = currentValue,
	              del = _currentValue[selectAllLabel],
	              obj = _objectWithoutPropertiesLoose(_currentValue, [selectAllLabel].map(_toPropertyKey));

	          currentValue = _extends({}, obj);
	        }
	      } else {
	        if (currentValue[value]) {
	          var _currentValue2 = currentValue,
	              _del = _currentValue2[value],
	              rest = _objectWithoutPropertiesLoose(_currentValue2, [value].map(_toPropertyKey));

	          currentValue = _extends({}, rest);
	        } else {
	          currentValue[value] = true;
	        }

	        if (selectAllLabel && selectAllLabel in currentValue) {
	          var _currentValue3 = currentValue,
	              _del2 = _currentValue3[selectAllLabel],
	              _obj = _objectWithoutPropertiesLoose(_currentValue3, [selectAllLabel].map(_toPropertyKey));

	          currentValue = _extends({}, _obj);
	        }

	        finalValues = Object.keys(currentValue);
	      }

	      var performUpdate = function performUpdate() {
	        _this4.currentValue = Object.assign({}, currentValue);

	        _this4.updateQueryHandler(finalValues, props);

	        _this4.locked = false;

	        _this4.$emit('valueChange', finalValues);
	      };

	      checkValueChange$2(props.componentId, finalValues, props.beforeValueChange, performUpdate);
	    },
	    updateQueryHandler: function updateQueryHandler(value, props) {
	      var customQuery = props.customQuery;
	      var query = MultiList.defaultQuery(value, props);
	      var customQueryOptions;

	      if (customQuery) {
	        var _ref = customQuery(value, props) || {};

	        query = _ref.query;
	        customQueryOptions = getOptionsFromQuery$3(customQuery(value, props));
	      }

	      this.setQueryOptions(props.componentId, customQueryOptions);
	      this.updateQuery({
	        componentId: props.componentId,
	        query: query,
	        value: value,
	        label: props.filterLabel,
	        showFilter: props.showFilter,
	        URLParams: props.URLParams,
	        componentType: 'MULTILIST'
	      });
	    },
	    generateQueryOptions: function generateQueryOptions(props) {
	      var queryOptions = getQueryOptions$2(props);
	      return getAggsQuery(queryOptions, props);
	    },
	    updateQueryHandlerOptions: function updateQueryHandlerOptions(props) {
	      var queryOptions = MultiList.generateQueryOptions(props);

	      if (props.defaultQuery) {
	        var value = Object.keys(this.$data.currentValue);
	        var defaultQueryOptions = getOptionsFromQuery$3(props.defaultQuery(value, props));
	        this.setQueryOptions(this.internalComponent, _extends({}, queryOptions, {}, defaultQueryOptions));
	      } else {
	        this.setQueryOptions(this.internalComponent, queryOptions);
	      }
	    },
	    handleInputChange: function handleInputChange(e) {
	      var value = e.target.value;
	      this.searchTerm = value;
	    },
	    renderSearch: function renderSearch() {
	      var h = this.$createElement;

	      if (this.$props.showSearch) {
	        return h(Input, {
	          "class": getClassName$5(this.$props.innerClass, 'input') || '',
	          "on": {
	            "input": this.handleInputChange
	          },
	          "attrs": {
	            "value": this.$data.searchTerm,
	            "placeholder": this.$props.placeholder,
	            "themePreset": this.$props.themePreset
	          },
	          "style": {
	            margin: '0 0 8px'
	          }
	        });
	      }

	      return null;
	    },
	    handleClick: function handleClick(e) {
	      var value = this.$props.value;

	      if (value === undefined) {
	        this.setValue(e.target.value);
	      } else {
	        var values = parseValueArray(this.currentValue, e.target.value);
	        this.$emit('change', values);
	      }
	    }
	  }
	};

	MultiList.defaultQuery = function (value, props) {
	  var query = null;
	  var type = props.queryFormat === 'or' ? 'terms' : 'term';

	  if (!Array.isArray(value) || value.length === 0) {
	    return null;
	  }

	  if (props.selectAllLabel && value.includes(props.selectAllLabel)) {
	    if (props.showMissing) {
	      query = {
	        match_all: {}
	      };
	    } else {
	      query = {
	        exists: {
	          field: props.dataField
	        }
	      };
	    }
	  } else if (value) {
	    var listQuery;

	    if (props.queryFormat === 'or') {
	      if (props.showMissing) {
	        var _type, _ref2;

	        var hasMissingTerm = value.includes(props.missingLabel);
	        var should = [(_ref2 = {}, _ref2[type] = (_type = {}, _type[props.dataField] = value.filter(function (item) {
	          return item !== props.missingLabel;
	        }), _type), _ref2)];

	        if (hasMissingTerm) {
	          should = should.concat({
	            bool: {
	              must_not: {
	                exists: {
	                  field: props.dataField
	                }
	              }
	            }
	          });
	        }

	        listQuery = {
	          bool: {
	            should: should
	          }
	        };
	      } else {
	        var _type2, _listQuery;

	        listQuery = (_listQuery = {}, _listQuery[type] = (_type2 = {}, _type2[props.dataField] = value, _type2), _listQuery);
	      }
	    } else {
	      // adds a sub-query with must as an array of objects for each term/value
	      var queryArray = value.map(function (item) {
	        var _type3, _ref3;

	        return _ref3 = {}, _ref3[type] = (_type3 = {}, _type3[props.dataField] = item, _type3), _ref3;
	      });
	      listQuery = {
	        bool: {
	          must: queryArray
	        }
	      };
	    }

	    query = value.length ? listQuery : null;
	  }

	  if (query && props.nestedField) {
	    query = {
	      query: {
	        nested: {
	          path: props.nestedField,
	          query: query
	        }
	      }
	    };
	  }

	  return query;
	};

	MultiList.generateQueryOptions = function (props) {
	  var queryOptions = getQueryOptions$2(props);
	  return getAggsQuery(queryOptions, props);
	};

	var mapStateToProps$4 = function mapStateToProps(state, props) {
	  return {
	    options: props.nestedField && state.aggregations[props.componentId] ? state.aggregations[props.componentId].reactivesearch_nested : state.aggregations[props.componentId],
	    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null,
	    themePreset: state.config.themePreset,
	    error: state.error[props.componentId]
	  };
	};

	var mapDispatchtoProps$4 = {
	  addComponent: addComponent$3,
	  removeComponent: removeComponent$3,
	  setQueryOptions: setQueryOptions$3,
	  setQueryListener: setQueryListener$3,
	  updateQuery: updateQuery$3,
	  watchComponent: watchComponent$3
	};
	var ListConnected$1 = connect(mapStateToProps$4, mapDispatchtoProps$4)(MultiList);

	MultiList.install = function (Vue) {
	  Vue.component(MultiList.name, ListConnected$1);
	};

	function _templateObject4$5() {
	  var data = _taggedTemplateLiteralLoose(["\n\twidth: 16px;\n\theight: 16px;\n\tdisplay: inline-block;\n\tposition: relative;\n\tuser-select: none;\n\talign-items: center;\n\n\t&::after {\n\t\tbox-sizing: content-box;\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tbackground-color: transparent;\n\t\ttop: 50%;\n\t\tleft: 0;\n\t\twidth: 8px;\n\t\theight: 4px;\n\t\tmargin-top: -4px;\n\t\tborder-style: solid;\n\t\tborder-color: ", ";\n\t\tborder-width: 0 0 2px 2px;\n\t\tborder-radius: 0;\n\t\tborder-image: none;\n\t\ttransform: rotate(-45deg) scale(1);\n\t\ttransition: all 200ms ease-out;\n\t}\n"]);

	  _templateObject4$5 = function _templateObject4() {
	    return data;
	  };

	  return data;
	}

	function _templateObject3$5() {
	  var data = _taggedTemplateLiteralLoose(["\n\twidth: 100%;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tmin-height: 42px;\n\tborder-radius: 0;\n\toutline: none;\n\tpadding: 5px 12px;\n\tfont-size: 0.9rem;\n\tline-height: 1.2rem;\n\tbackground-color: #fff;\n\tborder: 1px solid #ccc;\n\tcolor: #424242;\n\tcursor: pointer;\n\tuser-select: none;\n\ttransition: all 0.3s ease;\n\n\t", ";\n\n\t& > div {\n\t\twidth: calc(100% - 24px);\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\ttext-align: left;\n\t}\n\n\t&:hover,\n\t&:focus {\n\t\tbackground-color: #fcfcfc;\n\t}\n\n\t", ";\n"]);

	  _templateObject3$5 = function _templateObject3() {
	    return data;
	  };

	  return data;
	}

	function _templateObject2$6() {
	  var data = _taggedTemplateLiteralLoose(["\n\tbackground-color: ", ";\n\tborder-color: ", ";\n\tcolor: ", ";\n\n\t&:hover,\n\t&:focus {\n\t\tbackground-color: ", ";\n\t}\n"]);

	  _templateObject2$6 = function _templateObject2() {
	    return data;
	  };

	  return data;
	}

	function _templateObject$a() {
	  var data = _taggedTemplateLiteralLoose(["\n\tmin-height: 0;\n\theight: 30px;\n\tborder: 0;\n\tbox-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;\n\tborder-radius: 2px;\n"]);

	  _templateObject$a = function _templateObject() {
	    return data;
	  };

	  return data;
	}
	var small = css(_templateObject$a());

	var dark$2 = function dark(_ref) {
	  var theme = _ref.theme;
	  return css(_templateObject2$6(), theme.colors.backgroundColor, theme.colors.borderColor, theme.colors.textColor, theme.colors.backgroundColor);
	};

	var Select = index$1('button')(_templateObject3$5(), function (props) {
	  return props.small ? small : null;
	}, function (_ref2) {
	  var themePreset = _ref2.themePreset;
	  return themePreset === 'dark' && dark$2;
	});
	var Tick = index$1('span')(_templateObject4$5(), function (_ref3) {
	  var theme = _ref3.theme;
	  return theme.colors.primaryColor;
	});

	function _templateObject2$7() {
	  var data = _taggedTemplateLiteralLoose(["\n\t&::before {\n\t\tcontent: '';\n\t\tborder-style: solid;\n\t\tborder-width: 0.15em 0.15em 0 0;\n\t\tdisplay: inline-block;\n\t\theight: 0.45em;\n\t\tposition: relative;\n\t\ttop: 0.35em;\n\t\tleft: 0;\n\t\ttransform: rotate(135deg);\n\t\tvertical-align: top;\n\t\twidth: 0.45em;\n\n\t\t", ";\n\t}\n"]);

	  _templateObject2$7 = function _templateObject2() {
	    return data;
	  };

	  return data;
	}

	function _templateObject$b() {
	  var data = _taggedTemplateLiteralLoose(["\n\ttop: 0.55em;\n\ttransform: rotate(-45deg);\n"]);

	  _templateObject$b = function _templateObject() {
	    return data;
	  };

	  return data;
	}
	var open = css(_templateObject$b());
	var Chevron = index$1('span')(_templateObject2$7(), function (props) {
	  return props.open ? open : null;
	});

	var getClassName$6 = lib_8.getClassName;
	var Dropdown = {
	  data: function data() {
	    this.__state = {
	      isOpen: false,
	      searchTerm: ''
	    };
	    return this.__state;
	  },
	  inject: {
	    theme: {
	      from: 'theme_reactivesearch'
	    }
	  },
	  props: {
	    innerClass: types.style,
	    items: types.data,
	    keyField: VueTypes.string.def('key'),
	    labelField: VueTypes.string.def('label'),
	    multi: types.bool,
	    // change event
	    placeholder: types.string,
	    returnsObject: types.bool,
	    renderItem: types.func,
	    handleChange: types.func,
	    transformData: types.func,
	    selectedItem: types.selectedValue,
	    showCount: types.bool,
	    single: types.bool,
	    small: VueTypes.bool.def(false),
	    themePreset: types.themePreset,
	    showSearch: types.bool
	  },
	  render: function render() {
	    var _this = this;

	    var h = arguments[0];
	    var _this$$props = this.$props,
	        items = _this$$props.items,
	        selectedItem = _this$$props.selectedItem,
	        placeholder = _this$$props.placeholder,
	        labelField = _this$$props.labelField,
	        keyField = _this$$props.keyField,
	        themePreset = _this$$props.themePreset,
	        renderItem = _this$$props.renderItem,
	        transformData = _this$$props.transformData,
	        footer = _this$$props.footer;
	    var itemsToRender = items;

	    if (transformData) {
	      itemsToRender = transformData(itemsToRender);
	    }

	    return h(Downshift, {
	      "attrs": {
	        "isOpen": this.$data.isOpen,
	        "selectedItem": selectedItem,
	        "handleChange": this.onChange,
	        "handleMouseup": this.handleStateChange
	      },
	      "scopedSlots": {
	        "default": function _default(_ref) {
	          var getItemProps = _ref.getItemProps,
	              isOpen = _ref.isOpen,
	              highlightedIndex = _ref.highlightedIndex,
	              getButtonProps = _ref.getButtonProps,
	              getItemEvents = _ref.getItemEvents;
	          return h("div", {
	            "class": suggestionsContainer
	          }, [h(Select, {
	            "on": _extends({}, _extends({}, getButtonProps({
	              onClick: _this.toggle
	            }))),
	            "class": getClassName$6(_this.$props.innerClass, 'select') || '',
	            "attrs": {
	              "title": selectedItem ? _this.renderToString(selectedItem) : placeholder,
	              "small": _this.$props.small,
	              "themePreset": _this.$props.themePreset
	            }
	          }, [h("div", [selectedItem ? _this.renderToString(selectedItem) : placeholder]), h(Chevron, {
	            "attrs": {
	              "open": isOpen
	            }
	          })]), isOpen && itemsToRender.length ? h("ul", {
	            "class": suggestions$1(themePreset, _this.theme) + " " + (_this.$props.small ? 'small' : '') + " " + getClassName$6(_this.$props.innerClass, 'list')
	          }, [_this.$props.showSearch ? h(Input, {
	            "attrs": {
	              "id": _this.$props.componentId + "-input",
	              "showIcon": false,
	              "placeholder": "Type here to search...",
	              "value": _this.$data.searchTerm,
	              "themePreset": themePreset
	            },
	            "style": {
	              border: 0,
	              borderBottom: '1px solid #ddd'
	            },
	            "class": getClassName$6(_this.$props.innerClass, 'input'),
	            "on": {
	              "change": _this.handleInputChange
	            }
	          }) : null, itemsToRender.filter(function (item) {
	            if (String(item[labelField]).length) {
	              if (_this.$props.showSearch && _this.$data.searchTerm) {
	                return String(item[labelField]).toLowerCase().includes(_this.$data.searchTerm.toLowerCase());
	              }

	              return true;
	            }

	            return false;
	          }).map(function (item, index) {
	            var selected = _this.$props.multi // MultiDropdownList
	            && (selectedItem && !!selectedItem[item[keyField]] || // MultiDropdownRange
	            Array.isArray(selectedItem) && selectedItem.find(function (value) {
	              return value[labelField] === item[labelField];
	            }));
	            if (!_this.$props.multi) selected = item.key === selectedItem;
	            return h("li", {
	              "domProps": _extends({}, getItemProps({
	                item: item
	              })),
	              "on": _extends({}, getItemEvents({
	                item: item
	              })),
	              "key": item[keyField],
	              "class": "" + (selected ? 'active' : ''),
	              "style": {
	                backgroundColor: _this.getBackgroundColor(highlightedIndex === index, selected)
	              }
	            }, [renderItem ? renderItem({
	              label: item[labelField],
	              count: item.doc_count,
	              isChecked: selected && _this.$props.multi
	            }) : h("div", [typeof item[labelField] === 'string' ? h("span", {
	              "domProps": {
	                "innerHTML": item[labelField]
	              }
	            }) : item[labelField], _this.$props.showCount && item.doc_count && h("span", {
	              "class": getClassName$6(_this.$props.innerClass, 'count') || ''
	            }, ["\xA0(", item.doc_count, ")"])]), selected && _this.$props.multi ? h(Tick, {
	              "class": getClassName$6(_this.$props.innerClass, 'icon') || ''
	            }) : null]);
	          }), footer]) : null]);
	        }
	      }
	    });
	  },
	  methods: {
	    toggle: function toggle() {
	      this.isOpen = !this.$data.isOpen;
	    },
	    close: function close() {
	      this.isOpen = false;
	    },
	    onChange: function onChange(item) {
	      if (this.$props.returnsObject) {
	        this.$props.handleChange(item);
	      } else {
	        this.$props.handleChange(item[this.$props.keyField]);
	      }

	      if (!this.$props.multi) {
	        this.isOpen = false;
	      }
	    },
	    handleStateChange: function handleStateChange(_ref2) {
	      var isOpen = _ref2.isOpen;
	      this.isOpen = isOpen;
	    },
	    getBackgroundColor: function getBackgroundColor(highlighted, selected) {
	      var isDark = this.$props.themePreset === 'dark';

	      if (highlighted) {
	        return isDark ? '#555' : '#eee';
	      }

	      if (selected) {
	        return isDark ? '#686868' : '#fafafa';
	      }

	      return isDark ? '#424242' : '#fff';
	    },
	    handleInputChange: function handleInputChange(e) {
	      var value = e.target.value;
	      this.searchTerm = value;
	    },
	    renderToString: function renderToString(value) {
	      var _this2 = this;

	      if (Array.isArray(value) && value.length) {
	        var arrayToRender = value.map(function (item) {
	          return _this2.renderToString(item);
	        });
	        return arrayToRender.join(', ');
	      }

	      if (value && typeof value === 'object') {
	        if (value[this.$props.labelField]) {
	          return value[this.$props.labelField];
	        }

	        if (Object.keys(value).length) {
	          return this.renderToString(Object.keys(value));
	        }

	        return this.$props.placeholder;
	      }

	      return value;
	    }
	  }
	};

	var addComponent$4 = lib_5.addComponent,
	    removeComponent$4 = lib_5.removeComponent,
	    watchComponent$4 = lib_5.watchComponent,
	    updateQuery$4 = lib_5.updateQuery,
	    setQueryOptions$4 = lib_5.setQueryOptions,
	    setQueryListener$4 = lib_5.setQueryListener;
	var getQueryOptions$3 = lib_8.getQueryOptions,
	    pushToAndClause$4 = lib_8.pushToAndClause,
	    checkValueChange$3 = lib_8.checkValueChange,
	    checkPropChange = lib_8.checkPropChange,
	    getClassName$7 = lib_8.getClassName,
	    getOptionsFromQuery$4 = lib_8.getOptionsFromQuery;
	var SingleDropdownList = {
	  name: 'SingleDropdownList',
	  data: function data() {
	    var props = this.$props;
	    this.__state = {
	      currentValue: '',
	      modifiedOptions: [],
	      after: {},
	      // for composite aggs
	      isLastBucket: false
	    };
	    this.locked = false;
	    this.internalComponent = props.componentId + "__internal";
	    return this.__state;
	  },
	  props: {
	    beforeValueChange: types.func,
	    className: VueTypes.string.def(''),
	    componentId: types.stringRequired,
	    customQuery: types.func,
	    dataField: types.stringRequired,
	    defaultQuery: types.func,
	    defaultSelected: types.string,
	    defaultValue: types.string,
	    value: types.value,
	    filterLabel: types.string,
	    innerClass: types.style,
	    placeholder: VueTypes.string.def('Select a value'),
	    react: types.react,
	    renderItem: types.func,
	    renderError: types.title,
	    transformData: types.func,
	    selectAllLabel: types.string,
	    showCount: VueTypes.bool.def(true),
	    showFilter: VueTypes.bool.def(true),
	    size: VueTypes.number.def(100),
	    sortBy: VueTypes.oneOf(['asc', 'desc', 'count']).def('count'),
	    title: types.title,
	    URLParams: VueTypes.bool.def(false),
	    showMissing: VueTypes.bool.def(false),
	    missingLabel: VueTypes.string.def('N/A'),
	    showSearch: VueTypes.bool.def(false),
	    showLoadMore: VueTypes.bool.def(false),
	    loadMoreLabel: VueTypes.oneOfType([VueTypes.string, VueTypes.any]).def('Load More'),
	    nestedField: types.string
	  },
	  created: function created() {
	    var _this = this;

	    var onQueryChange = function onQueryChange() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      _this.$emit.apply(_this, ['queryChange'].concat(args));
	    };

	    this.setQueryListener(this.$props.componentId, onQueryChange, function (e) {
	      _this.$emit('error', e);
	    });
	  },
	  beforeMount: function beforeMount() {
	    this.addComponent(this.internalComponent);
	    this.addComponent(this.$props.componentId);
	    this.updateQueryOptions(this.$props);
	    this.setReact(this.$props);

	    if (this.selectedValue) {
	      this.setValue(this.selectedValue);
	    } else if (this.$props.value) {
	      this.setValue(this.$props.value);
	    } else if (this.$props.defaultValue) {
	      this.setValue(this.$props.defaultValue);
	    } else if (this.$props.defaultSelected) {
	      /* TODO: Remove this before next release */
	      deprecatePropWarning('defaultSelected', 'defaultValue');
	      this.setValue(this.$props.defaultSelected);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.removeComponent(this.$props.componentId);
	    this.removeComponent(this.internalComponent);
	  },
	  watch: {
	    react: function react() {
	      this.setReact(this.$props);
	    },
	    options: function options(newVal, oldVal) {
	      var _this2 = this;

	      checkPropChange(oldVal, newVal, function () {
	        var _this2$$props = _this2.$props,
	            showLoadMore = _this2$$props.showLoadMore,
	            dataField = _this2$$props.dataField;
	        var modifiedOptions = _this2.$data.modifiedOptions;

	        if (showLoadMore) {
	          // append options with showLoadMore
	          var buckets = newVal[dataField].buckets;
	          var nextOptions = [].concat(modifiedOptions, buckets.map(function (bucket) {
	            return {
	              key: bucket.key[dataField],
	              doc_count: bucket.doc_count
	            };
	          }));
	          var after = newVal[dataField].after_key; // detect the last bucket by checking if the next set of buckets were empty

	          var isLastBucket = !buckets.length;
	          _this2.after = {
	            after: after
	          };
	          _this2.isLastBucket = isLastBucket;
	          _this2.modifiedOptions = nextOptions;
	        } else {
	          _this2.modifiedOptions = newVal[_this2.$props.dataField] ? newVal[_this2.$props.dataField].buckets : [];
	        }
	      });
	    },
	    size: function size() {
	      this.updateQueryOptions(this.$props);
	    },
	    dataField: function dataField() {
	      this.updateQueryOptions(this.$props);
	      this.updateQueryHandler(this.$data.currentValue, this.$props);
	    },
	    defaultSelected: function defaultSelected(newVal) {
	      this.setValue(newVal);
	    },
	    defaultValue: function defaultValue(newVal) {
	      this.setValue(newVal);
	    },
	    value: function value(newVal, oldVal) {
	      if (!helper_9(newVal, oldVal)) {
	        this.setValue(newVal);
	      }
	    },
	    selectedValue: function selectedValue(newVal) {
	      if (this.$data.currentValue !== newVal) {
	        this.setValue(newVal || '');
	      }
	    }
	  },
	  render: function render() {
	    var h = arguments[0];
	    var _this$$props = this.$props,
	        showLoadMore = _this$$props.showLoadMore,
	        loadMoreLabel = _this$$props.loadMoreLabel,
	        renderItem = _this$$props.renderItem,
	        renderError = _this$$props.renderError;
	    var isLastBucket = this.$data.isLastBucket;
	    var selectAll = [];
	    var renderItemCalc = this.$scopedSlots.renderItem || renderItem;
	    var renderErrorCalc = this.$scopedSlots.renderError || renderError;

	    if (renderErrorCalc && this.error) {
	      return isFunction$1(renderErrorCalc) ? renderErrorCalc(this.error) : renderErrorCalc;
	    }

	    if (this.$data.modifiedOptions.length === 0) {
	      return null;
	    }

	    if (this.$props.selectAllLabel) {
	      selectAll = [{
	        key: this.$props.selectAllLabel
	      }];
	    }

	    return h(Container, {
	      "class": this.$props.className
	    }, [this.$props.title && h(Title, {
	      "class": getClassName$7(this.$props.innerClass, 'title') || ''
	    }, [this.$props.title]), h(Dropdown, {
	      "attrs": {
	        "innerClass": this.$props.innerClass,
	        "items": [].concat(selectAll, this.$data.modifiedOptions.filter(function (item) {
	          return String(item.key).trim().length;
	        }).map(function (item) {
	          return _extends({}, item, {
	            key: String(item.key)
	          });
	        })),
	        "handleChange": this.handleChange,
	        "selectedItem": this.$data.currentValue,
	        "placeholder": this.$props.placeholder,
	        "labelField": "key",
	        "showCount": this.$props.showCount,
	        "renderItem": renderItemCalc,
	        "themePreset": this.themePreset,
	        "showSearch": this.$props.showSearch,
	        "transformData": this.$props.transformData,
	        "footer": showLoadMore && !isLastBucket && h("div", {
	          "attrs": {
	            "css": loadMoreContainer
	          }
	        }, [h(Button, {
	          "on": {
	            "click": this.handleLoadMore
	          }
	        }, [loadMoreLabel])])
	      }
	    })]);
	  },
	  methods: {
	    setReact: function setReact(props) {
	      var react = props.react;

	      if (react) {
	        var newReact = pushToAndClause$4(react, this.internalComponent);
	        this.watchComponent(props.componentId, newReact);
	      } else {
	        this.watchComponent(props.componentId, {
	          and: this.internalComponent
	        });
	      }
	    },
	    setValue: function setValue(value, props) {
	      var _this3 = this;

	      if (props === void 0) {
	        props = this.$props;
	      }

	      // ignore state updates when component is locked
	      if (props.beforeValueChange && this.locked) {
	        return;
	      }

	      this.locked = true;

	      var performUpdate = function performUpdate() {
	        _this3.currentValue = value;

	        _this3.updateQueryHandler(value, props);

	        _this3.locked = false;

	        _this3.$emit('valueChange', value);
	      };

	      checkValueChange$3(props.componentId, value, props.beforeValueChange, performUpdate);
	    },
	    handleChange: function handleChange(item) {
	      var value = this.$props.value;

	      if (value === undefined) {
	        this.setValue(item);
	      } else {
	        this.$emit('change', item);
	      }
	    },
	    updateQueryHandler: function updateQueryHandler(value, props) {
	      var customQuery = props.customQuery;
	      var query = SingleDropdownList.defaultQuery(value, props);
	      var customQueryOptions;

	      if (customQuery) {
	        var _ref = customQuery(value, props) || {};

	        query = _ref.query;
	        customQueryOptions = getOptionsFromQuery$4(customQuery(value, props));
	      }

	      this.setQueryOptions(props.componentId, customQueryOptions);
	      this.updateQuery({
	        componentId: props.componentId,
	        query: query,
	        value: value,
	        label: props.filterLabel,
	        showFilter: props.showFilter,
	        URLParams: props.URLParams,
	        componentType: 'SINGLEDROPDOWNLIST'
	      });
	    },
	    generateQueryOptions: function generateQueryOptions(props, after) {
	      var queryOptions = getQueryOptions$3(props);
	      return props.showLoadMore ? getCompositeAggsQuery(queryOptions, props, after) : getAggsQuery(queryOptions, props);
	    },
	    updateQueryOptions: function updateQueryOptions(props, addAfterKey) {
	      if (addAfterKey === void 0) {
	        addAfterKey = false;
	      }

	      // when using composite aggs flush the current options for a fresh query
	      if (props.showLoadMore && !addAfterKey) {
	        this.modifiedOptions = [];
	      } // for a new query due to other changes don't append after to get fresh results


	      var queryOptions = SingleDropdownList.generateQueryOptions(props, addAfterKey ? this.$data.after : {});

	      if (props.defaultQuery) {
	        var value = this.$data.currentValue;
	        var defaultQueryOptions = getOptionsFromQuery$4(props.defaultQuery(value, props));
	        this.setQueryOptions(this.internalComponent, _extends({}, queryOptions, {}, defaultQueryOptions));
	      } else {
	        this.setQueryOptions(this.internalComponent, queryOptions);
	      }
	    },
	    handleLoadMore: function handleLoadMore() {
	      this.updateQueryOptions(this.$props, true);
	    }
	  }
	};

	SingleDropdownList.defaultQuery = function (value, props) {
	  var query = null;

	  if (props.selectAllLabel && props.selectAllLabel === value) {
	    if (props.showMissing) {
	      query = {
	        match_all: {}
	      };
	    }

	    query = {
	      exists: {
	        field: props.dataField
	      }
	    };
	  } else if (value) {
	    var _term;

	    if (props.showMissing && props.missingLabel === value) {
	      query = {
	        bool: {
	          must_not: {
	            exists: {
	              field: props.dataField
	            }
	          }
	        }
	      };
	    }

	    query = {
	      term: (_term = {}, _term[props.dataField] = value, _term)
	    };
	  }

	  if (query && props.nestedField) {
	    return {
	      query: {
	        nested: {
	          path: props.nestedField,
	          query: query
	        }
	      }
	    };
	  }

	  return query;
	};

	SingleDropdownList.generateQueryOptions = function (props, after) {
	  var queryOptions = getQueryOptions$3(props);
	  return props.showLoadMore ? getCompositeAggsQuery(queryOptions, props, after) : getAggsQuery(queryOptions, props);
	};

	var mapStateToProps$5 = function mapStateToProps(state, props) {
	  return {
	    options: props.nestedField && state.aggregations[props.componentId] ? state.aggregations[props.componentId].reactivesearch_nested : state.aggregations[props.componentId],
	    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || '',
	    themePreset: state.config.themePreset,
	    error: state.error[props.componentId]
	  };
	};

	var mapDispatchtoProps$5 = {
	  addComponent: addComponent$4,
	  removeComponent: removeComponent$4,
	  setQueryOptions: setQueryOptions$4,
	  setQueryListener: setQueryListener$4,
	  updateQuery: updateQuery$4,
	  watchComponent: watchComponent$4
	};
	var ListConnected$2 = connect(mapStateToProps$5, mapDispatchtoProps$5)(SingleDropdownList);

	SingleDropdownList.install = function (Vue) {
	  Vue.component(SingleDropdownList.name, ListConnected$2);
	};

	var addComponent$5 = lib_5.addComponent,
	    removeComponent$5 = lib_5.removeComponent,
	    watchComponent$5 = lib_5.watchComponent,
	    updateQuery$5 = lib_5.updateQuery,
	    setQueryOptions$5 = lib_5.setQueryOptions,
	    setQueryListener$5 = lib_5.setQueryListener;
	var isEqual$3 = lib_8.isEqual,
	    getQueryOptions$4 = lib_8.getQueryOptions,
	    pushToAndClause$5 = lib_8.pushToAndClause,
	    checkValueChange$4 = lib_8.checkValueChange,
	    checkPropChange$1 = lib_8.checkPropChange,
	    getClassName$8 = lib_8.getClassName,
	    getOptionsFromQuery$5 = lib_8.getOptionsFromQuery;
	var MultiDropdownList = {
	  name: 'MultiDropdownList',
	  data: function data() {
	    var props = this.$props;
	    this.__state = {
	      currentValue: {},
	      modifiedOptions: [],
	      after: {},
	      // for composite aggs
	      isLastBucket: false
	    };
	    this.locked = false;
	    this.internalComponent = props.componentId + "__internal";
	    return this.__state;
	  },
	  props: {
	    beforeValueChange: types.func,
	    className: VueTypes.string.def(''),
	    componentId: types.stringRequired,
	    customQuery: types.func,
	    dataField: types.stringRequired,
	    defaultSelected: types.stringArray,
	    defaultValue: types.stringArray,
	    value: types.stringArray,
	    defaultQuery: types.func,
	    filterLabel: types.string,
	    innerClass: types.style,
	    placeholder: VueTypes.string.def('Select values'),
	    queryFormat: VueTypes.oneOf(['and', 'or']).def('or'),
	    react: types.react,
	    renderItem: types.func,
	    renderError: types.title,
	    transformData: types.func,
	    selectAllLabel: types.string,
	    showCount: VueTypes.bool.def(true),
	    showFilter: VueTypes.bool.def(true),
	    size: VueTypes.number.def(100),
	    sortBy: VueTypes.oneOf(['asc', 'desc', 'count']).def('count'),
	    title: types.title,
	    URLParams: VueTypes.bool.def(false),
	    showMissing: VueTypes.bool.def(false),
	    missingLabel: VueTypes.string.def('N/A'),
	    showSearch: VueTypes.bool.def(false),
	    showLoadMore: VueTypes.bool.def(false),
	    loadMoreLabel: VueTypes.oneOfType([VueTypes.string, VueTypes.any]).def('Load More'),
	    nestedField: types.string
	  },
	  created: function created() {
	    var _this = this;

	    var onQueryChange = function onQueryChange() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      _this.$emit.apply(_this, ['queryChange'].concat(args));
	    };

	    this.setQueryListener(this.$props.componentId, onQueryChange, function (e) {
	      _this.$emit('error', e);
	    });
	  },
	  beforeMount: function beforeMount() {
	    this.addComponent(this.internalComponent);
	    this.addComponent(this.$props.componentId);
	    this.updateQueryOptions(this.$props);
	    this.setReact(this.$props);

	    if (this.selectedValue) {
	      this.setValue(this.selectedValue, true);
	    } else if (this.$props.value) {
	      this.setValue(this.$props.value, true);
	    } else if (this.$props.defaultValue) {
	      this.setValue(this.$props.defaultValue, true);
	    } else if (this.$props.defaultSelected) {
	      /* TODO: Remove this before next release */
	      deprecatePropWarning('defaultSelected', 'defaultValue');
	      this.setValue(this.$props.defaultSelected, true);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.removeComponent(this.$props.componentId);
	    this.removeComponent(this.internalComponent);
	  },
	  watch: {
	    react: function react() {
	      this.setReact(this.$props);
	    },
	    selectedValue: function selectedValue(newVal) {
	      var _this2 = this;

	      var selectedValue = Object.keys(this.$data.currentValue);

	      if (this.$props.selectAllLabel) {
	        selectedValue = selectedValue.filter(function (val) {
	          return val !== _this2.$props.selectAllLabel;
	        });

	        if (this.$data.currentValue[this.$props.selectAllLabel]) {
	          selectedValue = [this.$props.selectAllLabel];
	        }
	      }

	      if (!isEqual$3(selectedValue, newVal)) {
	        this.setValue(newVal || [], true);
	      }
	    },
	    options: function options(newVal, oldVal) {
	      var _this3 = this;

	      checkPropChange$1(oldVal, newVal, function () {
	        var _this3$$props = _this3.$props,
	            showLoadMore = _this3$$props.showLoadMore,
	            dataField = _this3$$props.dataField;
	        var modifiedOptions = _this3.$data.modifiedOptions;

	        if (showLoadMore) {
	          // append options with showLoadMore
	          var buckets = newVal[dataField].buckets;
	          var nextOptions = [].concat(modifiedOptions, buckets.map(function (bucket) {
	            return {
	              key: bucket.key[dataField],
	              doc_count: bucket.doc_count
	            };
	          }));
	          var after = newVal[dataField].after_key; // detect the last bucket by checking if the next set of buckets were empty

	          var isLastBucket = !buckets.length;
	          _this3.after = {
	            after: after
	          };
	          _this3.isLastBucket = isLastBucket;
	          _this3.modifiedOptions = nextOptions;
	        } else {
	          _this3.modifiedOptions = newVal[_this3.$props.dataField] ? newVal[_this3.$props.dataField].buckets : [];
	        }
	      });
	    },
	    size: function size() {
	      this.updateQueryOptions(this.$props);
	    },
	    dataField: function dataField() {
	      this.updateQueryOptions(this.$props);
	      this.updateQueryHandler(this.$data.currentValue, this.$props);
	    },
	    defaultSelected: function defaultSelected(newVal) {
	      this.setValue(newVal, true);
	    },
	    defaultValue: function defaultValue(newVal) {
	      this.setValue(newVal, true);
	    },
	    value: function value(newVal, oldVal) {
	      if (!isEqual$3(newVal, oldVal)) {
	        this.setValue(newVal, true);
	      }
	    }
	  },
	  render: function render() {
	    var h = arguments[0];
	    var _this$$props = this.$props,
	        showLoadMore = _this$$props.showLoadMore,
	        loadMoreLabel = _this$$props.loadMoreLabel,
	        renderItem = _this$$props.renderItem,
	        renderError = _this$$props.renderError;
	    var renderItemCalc = this.$scopedSlots.renderItem || renderItem;
	    var renderErrorCalc = this.$scopedSlots.renderError || renderError;
	    var isLastBucket = this.$data.isLastBucket;
	    var selectAll = [];

	    if (renderErrorCalc && this.error) {
	      return isFunction$1(renderErrorCalc) ? renderErrorCalc(this.error) : renderErrorCalc;
	    }

	    if (this.$data.modifiedOptions.length === 0) {
	      return null;
	    }

	    if (this.$props.selectAllLabel) {
	      selectAll = [{
	        key: this.$props.selectAllLabel
	      }];
	    }

	    return h(Container, {
	      "class": this.$props.className
	    }, [this.$props.title && h(Title, {
	      "class": getClassName$8(this.$props.innerClass, 'title') || ''
	    }, [this.$props.title]), h(Dropdown, {
	      "attrs": {
	        "innerClass": this.$props.innerClass,
	        "items": [].concat(selectAll, this.$data.modifiedOptions.filter(function (item) {
	          return String(item.key).trim().length;
	        }).map(function (item) {
	          return _extends({}, item, {
	            key: String(item.key)
	          });
	        })),
	        "handleChange": this.handleChange,
	        "selectedItem": this.$data.currentValue,
	        "placeholder": this.$props.placeholder,
	        "labelField": "key",
	        "multi": true,
	        "showCount": this.$props.showCount,
	        "themePreset": this.themePreset,
	        "renderItem": renderItemCalc,
	        "showSearch": this.$props.showSearch,
	        "transformData": this.$props.transformData,
	        "footer": showLoadMore && !isLastBucket && h("div", {
	          "attrs": {
	            "css": loadMoreContainer
	          }
	        }, [h(Button, {
	          "on": {
	            "click": this.handleLoadMore
	          }
	        }, [loadMoreLabel])])
	      }
	    })]);
	  },
	  methods: {
	    setReact: function setReact(props) {
	      var react = props.react;

	      if (react) {
	        var newReact = pushToAndClause$5(react, this.internalComponent);
	        this.watchComponent(props.componentId, newReact);
	      } else {
	        this.watchComponent(props.componentId, {
	          and: this.internalComponent
	        });
	      }
	    },
	    handleChange: function handleChange(item) {
	      var value = this.$props.value;

	      if (value === undefined) {
	        this.setValue(item);
	      } else {
	        var values = parseValueArray(this.currentValue, item);
	        this.$emit('change', values);
	      }
	    },
	    setValue: function setValue(value, isDefaultValue, props) {
	      var _this4 = this;

	      if (isDefaultValue === void 0) {
	        isDefaultValue = false;
	      }

	      if (props === void 0) {
	        props = this.$props;
	      }

	      // ignore state updates when component is locked
	      if (props.beforeValueChange && this.locked) {
	        return;
	      }

	      this.locked = true;
	      var selectAllLabel = this.$props.selectAllLabel;
	      var currentValue = this.$data.currentValue;
	      var finalValues = null;

	      if (selectAllLabel && value.includes(selectAllLabel)) {
	        if (currentValue[selectAllLabel]) {
	          currentValue = {};
	          finalValues = [];
	        } else {
	          this.$data.modifiedOptions.forEach(function (item) {
	            currentValue[item.key] = true;
	          });
	          currentValue[selectAllLabel] = true;
	          finalValues = [selectAllLabel];
	        }
	      } else if (isDefaultValue) {
	        finalValues = value;
	        currentValue = {};

	        if (Array.isArray(value)) {
	          value.forEach(function (item) {
	            currentValue[item] = true;
	          });
	        }

	        if (selectAllLabel && selectAllLabel in currentValue) {
	          var _currentValue = currentValue,
	              del = _currentValue[selectAllLabel],
	              obj = _objectWithoutPropertiesLoose(_currentValue, [selectAllLabel].map(_toPropertyKey));

	          currentValue = _extends({}, obj);
	        }
	      } else {
	        if (currentValue[value]) {
	          var _currentValue2 = currentValue,
	              _del = _currentValue2[value],
	              rest = _objectWithoutPropertiesLoose(_currentValue2, [value].map(_toPropertyKey));

	          currentValue = _extends({}, rest);
	        } else {
	          currentValue[value] = true;
	        }

	        if (selectAllLabel && selectAllLabel in currentValue) {
	          var _currentValue3 = currentValue,
	              _del2 = _currentValue3[selectAllLabel],
	              _obj = _objectWithoutPropertiesLoose(_currentValue3, [selectAllLabel].map(_toPropertyKey));

	          currentValue = _extends({}, _obj);
	        }

	        finalValues = Object.keys(currentValue);
	      }

	      var performUpdate = function performUpdate() {
	        _this4.currentValue = currentValue;

	        _this4.updateQueryHandler(finalValues, props);

	        _this4.locked = false;

	        _this4.$emit('valueChange', finalValues);
	      };

	      checkValueChange$4(props.componentId, finalValues, props.beforeValueChange, performUpdate);
	    },
	    updateQueryHandler: function updateQueryHandler(value, props) {
	      var customQuery = props.customQuery;
	      var query = MultiDropdownList.defaultQuery(value, props);
	      var customQueryOptions;

	      if (customQuery) {
	        var _ref = customQuery(value, props) || {};

	        query = _ref.query;
	        customQueryOptions = getOptionsFromQuery$5(customQuery(value, props));
	      }

	      this.setQueryOptions(props.componentId, customQueryOptions);
	      this.updateQuery({
	        componentId: props.componentId,
	        query: query,
	        value: value,
	        label: props.filterLabel,
	        showFilter: props.showFilter,
	        URLParams: props.URLParams,
	        componentType: 'MULTIDROPDOWNLIST'
	      });
	    },
	    generateQueryOptions: function generateQueryOptions(props, after) {
	      var queryOptions = getQueryOptions$4(props);
	      return props.showLoadMore ? getCompositeAggsQuery(queryOptions, props, after) : getAggsQuery(queryOptions, props);
	    },
	    updateQueryOptions: function updateQueryOptions(props, addAfterKey) {
	      if (addAfterKey === void 0) {
	        addAfterKey = false;
	      }

	      // when using composite aggs flush the current options for a fresh query
	      if (props.showLoadMore && !addAfterKey) {
	        this.modifiedOptions = [];
	      } // for a new query due to other changes don't append after to get fresh results


	      var queryOptions = MultiDropdownList.generateQueryOptions(props, addAfterKey ? this.$data.after : {});

	      if (props.defaultQuery) {
	        var value = Object.keys(this.$data.currentValue);
	        var defaultQueryOptions = getOptionsFromQuery$5(props.defaultQuery(value, props));
	        this.setQueryOptions(this.internalComponent, _extends({}, queryOptions, {}, defaultQueryOptions));
	      } else {
	        this.setQueryOptions(this.internalComponent, queryOptions);
	      }
	    },
	    handleLoadMore: function handleLoadMore() {
	      this.updateQueryOptions(this.$props, true);
	    }
	  }
	};

	MultiDropdownList.defaultQuery = function (value, props) {
	  var query = null;
	  var type = props.queryFormat === 'or' ? 'terms' : 'term';

	  if (!Array.isArray(value) || value.length === 0) {
	    return null;
	  }

	  if (props.selectAllLabel && value.includes(props.selectAllLabel)) {
	    if (props.showMissing) {
	      query = {
	        match_all: {}
	      };
	    } else {
	      query = {
	        exists: {
	          field: props.dataField
	        }
	      };
	    }
	  } else if (value) {
	    var listQuery;

	    if (props.queryFormat === 'or') {
	      if (props.showMissing) {
	        var _type, _ref2;

	        var hasMissingTerm = value.includes(props.missingLabel);
	        var should = [(_ref2 = {}, _ref2[type] = (_type = {}, _type[props.dataField] = value.filter(function (item) {
	          return item !== props.missingLabel;
	        }), _type), _ref2)];

	        if (hasMissingTerm) {
	          should = should.concat({
	            bool: {
	              must_not: {
	                exists: {
	                  field: props.dataField
	                }
	              }
	            }
	          });
	        }

	        listQuery = {
	          bool: {
	            should: should
	          }
	        };
	      } else {
	        var _type2, _listQuery;

	        listQuery = (_listQuery = {}, _listQuery[type] = (_type2 = {}, _type2[props.dataField] = value, _type2), _listQuery);
	      }
	    } else {
	      // adds a sub-query with must as an array of objects for each term/value
	      var queryArray = value.map(function (item) {
	        var _type3, _ref3;

	        return _ref3 = {}, _ref3[type] = (_type3 = {}, _type3[props.dataField] = item, _type3), _ref3;
	      });
	      listQuery = {
	        bool: {
	          must: queryArray
	        }
	      };
	    }

	    query = value.length ? listQuery : null;
	  }

	  if (query && props.nestedField) {
	    return {
	      query: {
	        nested: {
	          path: props.nestedField,
	          query: query
	        }
	      }
	    };
	  }

	  return query;
	};

	MultiDropdownList.generateQueryOptions = function (props, after) {
	  var queryOptions = getQueryOptions$4(props);
	  return props.showLoadMore ? getCompositeAggsQuery(queryOptions, props, after) : getAggsQuery(queryOptions, props);
	};

	var mapStateToProps$6 = function mapStateToProps(state, props) {
	  return {
	    options: props.nestedField && state.aggregations[props.componentId] ? state.aggregations[props.componentId].reactivesearch_nested : state.aggregations[props.componentId],
	    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null,
	    themePreset: state.config.themePreset,
	    error: state.error[props.componentId]
	  };
	};

	var mapDispatchtoProps$6 = {
	  addComponent: addComponent$5,
	  removeComponent: removeComponent$5,
	  setQueryOptions: setQueryOptions$5,
	  setQueryListener: setQueryListener$5,
	  updateQuery: updateQuery$5,
	  watchComponent: watchComponent$5
	};
	var ListConnected$3 = connect(mapStateToProps$6, mapDispatchtoProps$6)(MultiDropdownList);

	MultiDropdownList.install = function (Vue) {
	  Vue.component(MultiDropdownList.name, ListConnected$3);
	};

	var addComponent$6 = lib_5.addComponent,
	    removeComponent$6 = lib_5.removeComponent,
	    updateQuery$6 = lib_5.updateQuery,
	    watchComponent$6 = lib_5.watchComponent,
	    setQueryListener$6 = lib_5.setQueryListener,
	    setQueryOptions$6 = lib_5.setQueryOptions;
	var isEqual$4 = lib_8.isEqual,
	    checkValueChange$5 = lib_8.checkValueChange,
	    getClassName$9 = lib_8.getClassName,
	    getOptionsFromQuery$6 = lib_8.getOptionsFromQuery,
	    handleA11yAction$1 = lib_8.handleA11yAction;
	var ToggleButton = {
	  name: 'ToggleButton',
	  props: {
	    componentId: types.stringRequired,
	    data: types.data,
	    dataField: types.stringRequired,
	    defaultSelected: types.stringOrArray,
	    defaultValue: types.stringOrArray,
	    value: types.stringOrArray,
	    filterLabel: types.string,
	    nestedField: types.string,
	    innerClass: types.style,
	    multiSelect: types.bool,
	    react: types.react,
	    showFilter: types.bool,
	    title: types.title,
	    URLParams: types.bool,
	    renderItem: types.func
	  },
	  data: function data() {
	    var props = this.$props;
	    var value = this.selectedValue || props.value || props.defaultValue || props.defaultSelected || [];

	    if (props.defaultSelected) {
	      /* TODO: Remove this before next release */
	      deprecatePropWarning('defaultSelected', 'defaultValue');
	    }

	    var currentValue = ToggleButton.parseValue(value, props);
	    this.__state = {
	      currentValue: currentValue
	    };
	    this.locked = false;
	    return this.__state;
	  },
	  beforeMount: function beforeMount() {
	    var props = this.$props;
	    var hasMounted = false;

	    if (this.$data.currentValue.length) {
	      this.handleToggle(this.$data.currentValue, true, props, hasMounted);
	    }

	    this.addComponent(props.componentId);
	    this.setReact(props);
	  },
	  created: function created() {
	    var _this = this;

	    var onQueryChange = function onQueryChange() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      _this.$emit.apply(_this, ['queryChange'].concat(args));
	    };

	    this.setQueryListener(this.$props.componentId, onQueryChange, function (e) {
	      _this.$emit('error', e);
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.removeComponent(this.$props.componentId);
	  },
	  watch: {
	    defaultSelected: function defaultSelected(newVal) {
	      this.setValue(ToggleButton.parseValue(newVal, this.$props));
	    },
	    defaultValue: function defaultValue(newVal) {
	      this.setValue(ToggleButton.parseValue(newVal, this.$props));
	    },
	    react: function react() {
	      this.setReact(this.$props);
	    },
	    dataField: function dataField() {
	      this.updateQuery(this.$data.currentValue, this.$props);
	    },
	    nestedField: function nestedField() {
	      this.updateQuery(this.$data.currentValue, this.$props);
	    },
	    value: function value(newVal, oldVal) {
	      if (!isEqual$4(newVal, oldVal)) {
	        this.handleToggle(newVal, true, this.$props);
	      }
	    },
	    selectedValue: function selectedValue(newVal, oldVal) {
	      if (this.$props.multiSelect) {
	        // for multiselect selectedValue will be an array
	        if (!isEqual$4(this.$data.currentValue, newVal) && !isEqual$4(oldVal, newVal)) {
	          this.handleToggle(newVal || [], true, this.$props);
	        }
	      } else {
	        // else selectedValue will be a string
	        var currentValue = this.$data.currentValue[0] ? this.$data.currentValue[0].value : null;

	        if (!isEqual$4(currentValue, this.selectedValue) && !isEqual$4(oldVal, this.selectedValue)) {
	          this.handleToggle(this.selectedValue || [], true, this.$props);
	        }
	      }
	    }
	  },
	  methods: {
	    handleToggle: function handleToggle(value, isDefaultValue, props, hasMounted) {
	      if (isDefaultValue === void 0) {
	        isDefaultValue = false;
	      }

	      if (props === void 0) {
	        props = this.$props;
	      }

	      if (hasMounted === void 0) {
	        hasMounted = true;
	      }

	      var currentValue = this.$data.currentValue;
	      var toggleValue = value;
	      var finalValue = [];

	      if (isDefaultValue) {
	        finalValue = ToggleButton.parseValue(toggleValue, props);
	      } else if (this.$props.multiSelect) {
	        finalValue = currentValue.some(function (item) {
	          return item.value === toggleValue.value;
	        }) ? currentValue.filter(function (item) {
	          return item.value !== toggleValue.value;
	        }) : currentValue.concat(toggleValue);
	      } else {
	        finalValue = currentValue.some(function (item) {
	          return item.value === toggleValue.value;
	        }) ? [] : [toggleValue];
	      }

	      this.setValue(finalValue, props, hasMounted);
	    },
	    setReact: function setReact(props) {
	      if (props.react) {
	        this.watchComponent(props.componentId, props.react);
	      }
	    },
	    setValue: function setValue(value, props, hasMounted) {
	      var _this2 = this;

	      if (props === void 0) {
	        props = this.$props;
	      }

	      if (hasMounted === void 0) {
	        hasMounted = true;
	      }

	      // ignore state updates when component is locked
	      if (props.beforeValueChange && this.locked) {
	        return;
	      }

	      this.locked = true;

	      var performUpdate = function performUpdate() {
	        var handleUpdates = function handleUpdates() {
	          _this2.updateQuery(value, props);

	          _this2.locked = false;

	          _this2.$emit('valueChange', value);
	        };

	        if (hasMounted) {
	          _this2.currentValue = value;
	          handleUpdates();
	        } else {
	          handleUpdates();
	        }
	      };

	      checkValueChange$5(props.componentId, props.multiSelect ? value : value[0], props.beforeValueChange, performUpdate);
	    },
	    updateQuery: function updateQuery(value, props) {
	      var filterValue = value;

	      if (!props.multiSelect) {
	        filterValue = value[0] ? value[0].value : null;
	      }

	      var customQuery = props.customQuery;
	      var query = ToggleButton.defaultQuery(value, props);

	      if (customQuery) {
	        var _ref = customQuery(value, props) || {};

	        query = _ref.query;
	        this.setQueryOptions(props.componentId, getOptionsFromQuery$6(customQuery(value, props)));
	      }

	      this.updateQueryHandler({
	        componentId: props.componentId,
	        query: query,
	        value: filterValue,
	        // sets a string in URL not array
	        label: props.filterLabel,
	        showFilter: props.showFilter,
	        URLParams: props.URLParams,
	        componentType: 'TOGGLEBUTTON'
	      });
	    },
	    handleClick: function handleClick(item) {
	      var value = this.$props.value;

	      if (value === undefined) {
	        this.handleToggle(item);
	      } else {
	        this.$emit('change', item.value);
	      }
	    },
	    renderButton: function renderButton(item) {
	      var _this3 = this;

	      var h = this.$createElement;
	      var renderItem = this.$scopedSlots.renderItem || this.renderItem;
	      var isSelected = this.$data.currentValue.some(function (value) {
	        return value.value === item.value;
	      });
	      return h(Button, {
	        "class": getClassName$9(this.$props.innerClass, 'button') + " " + (isSelected ? 'active' : ''),
	        "on": {
	          "click": function click() {
	            return _this3.handleClick(item);
	          },
	          "keypress": function keypress(e) {
	            return handleA11yAction$1(e, function () {
	              return _this3.handleClick(item);
	            });
	          }
	        },
	        "key": item.value,
	        "attrs": {
	          "primary": isSelected,
	          "large": true,
	          "tabIndex": isSelected ? "-1" : "0"
	        }
	      }, [renderItem ? renderItem({
	        item: item,
	        isSelected: isSelected
	      }) : item.label]);
	    }
	  },
	  render: function render() {
	    var _this4 = this;

	    var h = arguments[0];
	    return h(Container, {
	      "class": toggleButtons
	    }, [this.$props.title && h(Title, {
	      "class": getClassName$9(this.$props.innerClass, 'title')
	    }, [this.$props.title]), this.$props.data.map(function (item) {
	      return _this4.renderButton(item);
	    })]);
	  }
	};

	ToggleButton.parseValue = function (value, props) {
	  if (Array.isArray(value)) {
	    if (typeof value[0] === 'string') {
	      return props.data.filter(function (item) {
	        return value.includes(item.value);
	      });
	    }

	    return value;
	  }

	  return props.data.filter(function (item) {
	    return item.value === value;
	  });
	};

	ToggleButton.defaultQuery = function (value, props) {
	  var query = null;

	  if (value && value.length) {
	    query = {
	      bool: {
	        boost: 1.0,
	        minimum_should_match: 1,
	        should: value.map(function (item) {
	          var _term;

	          return {
	            term: (_term = {}, _term[props.dataField] = item.value, _term)
	          };
	        })
	      }
	    };
	  }

	  if (query && props.nestedField) {
	    return {
	      query: {
	        nested: {
	          path: props.nestedField,
	          query: query
	        }
	      }
	    };
	  }

	  return query;
	};

	var mapStateToProps$7 = function mapStateToProps(state, props) {
	  return {
	    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null
	  };
	};

	var mapDispatchtoProps$7 = {
	  addComponent: addComponent$6,
	  removeComponent: removeComponent$6,
	  updateQueryHandler: updateQuery$6,
	  watchComponent: watchComponent$6,
	  setQueryListener: setQueryListener$6,
	  setQueryOptions: setQueryOptions$6
	};
	var RcConnected = connect(mapStateToProps$7, mapDispatchtoProps$7)(ToggleButton);

	ToggleButton.install = function (Vue) {
	  Vue.component(ToggleButton.name, RcConnected);
	};

	var addComponent$7 = lib_5.addComponent,
	    removeComponent$7 = lib_5.removeComponent,
	    watchComponent$7 = lib_5.watchComponent,
	    updateQuery$7 = lib_5.updateQuery,
	    setQueryOptions$7 = lib_5.setQueryOptions,
	    setQueryListener$7 = lib_5.setQueryListener;
	var pushToAndClause$6 = lib_8.pushToAndClause,
	    parseHits$1 = lib_8.parseHits,
	    isEqual$5 = lib_8.isEqual;
	var ReactiveComponent = {
	  name: 'ReactiveComponent',
	  props: {
	    componentId: types.stringRequired,
	    defaultQuery: types.func,
	    filterLabel: types.string,
	    react: types.react,
	    showFilter: VueTypes.bool.def(true),
	    URLParams: VueTypes.bool.def(false)
	  },
	  created: function created() {
	    var _this = this;

	    var props = this.$props;
	    this.internalComponent = null;
	    this.$defaultQuery = null;

	    var onQueryChange = function onQueryChange() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      _this.$emit.apply(_this, ['queryChange'].concat(args));
	    };

	    this.setQueryListener(props.componentId, onQueryChange, function (e) {
	      _this.$emit('error', e);
	    });

	    this.setQuery = function (obj) {
	      _this.updateQuery(_extends({}, obj, {
	        componentId: props.componentId,
	        label: props.filterLabel,
	        showFilter: props.showFilter,
	        URLParams: props.URLParams
	      }));
	    };

	    if (props.defaultQuery) {
	      this.internalComponent = props.componentId + "__internal";
	    }
	  },
	  beforeMount: function beforeMount() {
	    this.addComponent(this.$props.componentId);

	    if (this.internalComponent) {
	      this.addComponent(this.internalComponent);
	    }

	    this.setReact(this.$props); // set query for internal component

	    if (this.internalComponent && this.$props.defaultQuery) {
	      this.$defaultQuery = this.$props.defaultQuery();

	      var _ref = this.$defaultQuery || {},
	          query = _ref.query,
	          queryOptions = _objectWithoutPropertiesLoose(_ref, ["query"]);

	      if (queryOptions) {
	        this.setQueryOptions(this.internalComponent, queryOptions, false);
	      }

	      this.updateQuery({
	        componentId: this.internalComponent,
	        query: query || null
	      });
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.removeComponent(this.$props.componentId);

	    if (this.internalComponent) {
	      this.removeComponent(this.internalComponent);
	    }
	  },
	  watch: {
	    hits: function hits(newVal, oldVal) {
	      if (!isEqual$5(newVal, oldVal)) {
	        this.$emit('allData', parseHits$1(newVal), oldVal);
	      }
	    },
	    aggregations: function aggregations(newVal, oldVal) {
	      if (!isEqual$5(newVal, oldVal)) {
	        this.$emit('allData', parseHits$1(newVal), oldVal);
	      }
	    },
	    defaultQuery: function defaultQuery(newVal, oldVal) {
	      if (newVal && !isEqual$5(newVal(), oldVal)) {
	        this.$defaultQuery = newVal();

	        var _ref2 = this.$defaultQuery || {},
	            query = _ref2.query,
	            queryOptions = _objectWithoutPropertiesLoose(_ref2, ["query"]);

	        if (queryOptions) {
	          this.setQueryOptions(this.internalComponent, queryOptions, false);
	        }

	        this.updateQuery({
	          componentId: this.internalComponent,
	          query: query || null
	        });
	      }
	    },
	    react: function react() {
	      this.setReact(this.$props);
	    }
	  },
	  render: function render() {
	    var h = arguments[0];

	    try {
	      var dom = this.$scopedSlots["default"];

	      var propsToBePassed = _extends({
	        aggregations: this.aggregations,
	        hits: this.hits,
	        selectedValue: this.selectedValue,
	        setQuery: this.setQuery,
	        error: this.error,
	        isLoading: this.isLoading
	      }, this.$props);

	      return h("div", [dom(propsToBePassed)]);
	    } catch (e) {
	      return null;
	    }
	  },
	  methods: {
	    setReact: function setReact(props) {
	      var react = props.react;

	      if (react) {
	        if (this.internalComponent) {
	          var newReact = pushToAndClause$6(react, this.internalComponent);
	          this.watchComponent(props.componentId, newReact);
	        } else {
	          this.watchComponent(props.componentId, react);
	        }
	      } else if (this.internalComponent) {
	        this.watchComponent(props.componentId, {
	          and: this.internalComponent
	        });
	      }
	    }
	  }
	};

	var mapStateToProps$8 = function mapStateToProps(state, props) {
	  return {
	    aggregations: state.aggregations[props.componentId] && state.aggregations[props.componentId] || null,
	    hits: state.hits[props.componentId] && state.hits[props.componentId].hits || [],
	    error: state.error[props.componentId],
	    isLoading: state.isLoading[props.componentId],
	    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null
	  };
	};

	var mapDispatchtoProps$8 = {
	  addComponent: addComponent$7,
	  removeComponent: removeComponent$7,
	  setQueryOptions: setQueryOptions$7,
	  setQueryListener: setQueryListener$7,
	  updateQuery: updateQuery$7,
	  watchComponent: watchComponent$7
	};
	var RcConnected$1 = connect(mapStateToProps$8, mapDispatchtoProps$8)(ReactiveComponent);

	ReactiveComponent.install = function (Vue) {
	  Vue.component(ReactiveComponent.name, RcConnected$1);
	};

	var patchValue = lib_5.patchValue,
	    clearValues = lib_5.clearValues;
	var getClassName$a = lib_8.getClassName,
	    handleA11yAction$2 = lib_8.handleA11yAction;
	var SelectedFilters = {
	  name: 'SelectedFilters',
	  props: {
	    className: VueTypes.string.def(''),
	    clearAllLabel: VueTypes.string.def('Clear All'),
	    innerClass: types.style,
	    showClearAll: VueTypes.bool.def(true),
	    title: types.title
	  },
	  inject: {
	    theme: {
	      from: 'theme_reactivesearch'
	    }
	  },
	  render: function render() {
	    var _this = this;

	    var h = arguments[0];

	    if (this.$scopedSlots["default"]) {
	      return this.$scopedSlots["default"](this.$props);
	    }

	    var filtersToRender = this.renderFilters();
	    var hasValues = !!filtersToRender.length;
	    return h(Container, {
	      "class": filters(this.theme) + " " + (this.$props.className || '')
	    }, [this.$props.title && hasValues && h(Title, {
	      "class": getClassName$a(this.$props.innerClass, 'title') || ''
	    }, [this.$props.title]), filtersToRender, this.$props.showClearAll && hasValues ? h(Button, {
	      "class": getClassName$a(this.$props.innerClass, 'button') || '',
	      "on": _extends({}, {
	        click: this.clearValues,
	        keypress: function keypress() {
	          return handleA11yAction$2(event, function () {
	            return _this.clearValues();
	          });
	        }
	      }),
	      "attrs": {
	        "tabIndex": "0"
	      }
	    }, [this.$props.clearAllLabel]) : null]);
	  },
	  methods: {
	    remove: function remove(component, value) {
	      if (value === void 0) {
	        value = null;
	      }

	      this.patchValue(component, {
	        value: null
	      });
	      this.$emit('clear', component, value);
	    },
	    clearValues: function clearValues() {
	      this.clearValuesAction();
	      this.$emit('clear', null);
	    },
	    renderValue: function renderValue(value, isArray) {
	      var _this2 = this;

	      if (isArray && value.length) {
	        var arrayToRender = value.map(function (item) {
	          return _this2.renderValue(item);
	        });
	        return arrayToRender.join(', ');
	      }

	      if (value && typeof value === 'object') {
	        // TODO: support for NestedList
	        var label = (typeof value.label === 'string' ? value.label : value.value) || value.key || value.distance || null;

	        if (value.location) {
	          label = value.location + " - " + label;
	        }

	        return label;
	      }

	      return value;
	    },
	    renderFilters: function renderFilters() {
	      var _this3 = this;

	      var h = this.$createElement;
	      var selectedValues = this.selectedValues;
	      return Object.keys(selectedValues).filter(function (id) {
	        return _this3.components.includes(id) && selectedValues[id].showFilter;
	      }).map(function (component, index) {
	        var _selectedValues$compo = selectedValues[component],
	            label = _selectedValues$compo.label,
	            value = _selectedValues$compo.value;
	        var isArray = Array.isArray(value);

	        if (label && (isArray && value.length || !isArray && value)) {
	          var valueToRender = _this3.renderValue(value, isArray);

	          return h(Button, {
	            "class": getClassName$a(_this3.$props.innerClass, 'button') || '',
	            "key": component + "-" + (index + 1),
	            "on": _extends({}, {
	              click: function click() {
	                return _this3.remove(component, value);
	              },
	              keypress: function keypress(event) {
	                return handleA11yAction$2(event, function () {
	                  return _this3.remove(component, value);
	                });
	              }
	            }),
	            "attrs": {
	              "tabIndex": "0"
	            }
	          }, [h("span", [selectedValues[component].label, ": ", valueToRender]), h("span", ["\u2715"])]);
	        }

	        return null;
	      }).filter(Boolean);
	    }
	  }
	};

	var mapStateToProps$9 = function mapStateToProps(state) {
	  return {
	    components: state.components,
	    selectedValues: state.selectedValues
	  };
	};

	var mapDispatchtoProps$9 = {
	  clearValuesAction: clearValues,
	  patchValue: patchValue
	};
	var RcConnected$2 = connect(mapStateToProps$9, mapDispatchtoProps$9)(SelectedFilters);

	SelectedFilters.install = function (Vue) {
	  Vue.component(SelectedFilters.name, RcConnected$2);
	};

	var addComponent$8 = lib_5.addComponent,
	    removeComponent$8 = lib_5.removeComponent,
	    watchComponent$8 = lib_5.watchComponent,
	    updateQuery$8 = lib_5.updateQuery,
	    setQueryListener$8 = lib_5.setQueryListener,
	    setQueryOptions$8 = lib_5.setQueryOptions;
	var isEqual$6 = lib_8.isEqual,
	    checkValueChange$6 = lib_8.checkValueChange,
	    getClassName$b = lib_8.getClassName,
	    getOptionsFromQuery$7 = lib_8.getOptionsFromQuery;
	var SingleRange = {
	  name: 'SingleRange',
	  data: function data() {
	    this.__state = {
	      currentValue: null
	    };
	    this.type = 'range';
	    this.locked = false;
	    return this.__state;
	  },
	  props: {
	    beforeValueChange: types.func,
	    className: VueTypes.string.def(''),
	    componentId: types.stringRequired,
	    customQuery: types.func,
	    data: types.data,
	    dataField: types.stringRequired,
	    defaultSelected: types.string,
	    defaultValue: types.string,
	    value: types.value,
	    filterLabel: types.string,
	    innerClass: types.style,
	    react: types.react,
	    showFilter: VueTypes.bool.def(true),
	    showRadio: VueTypes.bool.def(true),
	    title: types.title,
	    URLParams: VueTypes.bool.def(false),
	    nestedField: types.string
	  },
	  created: function created() {
	    var _this = this;

	    var onQueryChange = function onQueryChange() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      _this.$emit.apply(_this, ['queryChange'].concat(args));
	    };

	    this.setQueryListener(this.$props.componentId, onQueryChange, null);
	  },
	  beforeMount: function beforeMount() {
	    this.addComponent(this.$props.componentId);
	    this.setReact(this.$props);

	    if (this.selectedValue) {
	      this.setValue(this.selectedValue);
	    } else if (this.$props.value) {
	      this.setValue(this.$props.value);
	    } else if (this.$props.defaultValue) {
	      this.setValue(this.$props.defaultValue);
	    } else if (this.$props.defaultSelected) {
	      /* TODO: Remove this before next release */
	      deprecatePropWarning('defaultSelected', 'defaultValue');
	      this.setValue(this.$props.defaultSelected);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.removeComponent(this.$props.componentId);
	  },
	  watch: {
	    react: function react() {
	      this.setReact(this.$props);
	    },
	    dataField: function dataField() {
	      this.updateQueryHandler(this.$data.currentValue, this.$props);
	    },
	    defaultSelected: function defaultSelected(newVal) {
	      this.setValue(newVal);
	    },
	    defaultValue: function defaultValue(newVal) {
	      this.setValue(newVal);
	    },
	    value: function value(newVal, oldVal) {
	      if (!isEqual$6(newVal, oldVal)) {
	        this.setValue(newVal);
	      }
	    },
	    selectedValue: function selectedValue(newVal) {
	      if (!isEqual$6(this.$data.currentValue, newVal)) {
	        this.setValue(newVal);
	      }
	    }
	  },
	  render: function render() {
	    var _this2 = this;

	    var h = arguments[0];
	    return h(Container, {
	      "class": this.$props.className
	    }, [this.$props.title && h(Title, {
	      "class": getClassName$b(this.$props.innerClass, 'title')
	    }, [this.$props.title]), h(UL, {
	      "class": getClassName$b(this.$props.innerClass, 'list')
	    }, [this.$props.data.map(function (item) {
	      var selected = !!_this2.$data.currentValue && _this2.$data.currentValue.label === item.label;
	      return h("li", {
	        "key": item.label,
	        "class": "" + (selected ? 'active' : '')
	      }, [h(Radio, {
	        "class": getClassName$b(_this2.$props.innerClass, 'radio'),
	        "attrs": {
	          "id": _this2.$props.componentId + "-" + item.label,
	          "name": _this2.$props.componentId,
	          "value": item.label,
	          "type": "radio",
	          "checked": selected,
	          "show": _this2.$props.showRadio
	        },
	        "on": {
	          "change": _this2.handleChange
	        }
	      }), h("label", {
	        "class": getClassName$b(_this2.$props.innerClass, 'label'),
	        "attrs": {
	          "for": _this2.$props.componentId + "-" + item.label
	        }
	      }, [item.label])]);
	    })])]);
	  },
	  methods: {
	    setReact: function setReact(props) {
	      if (props.react) {
	        this.watchComponent(props.componentId, props.react);
	      }
	    },
	    setValue: function setValue(value, props) {
	      var _this3 = this;

	      if (props === void 0) {
	        props = this.$props;
	      }

	      // ignore state updates when component is locked
	      if (props.beforeValueChange && this.locked) {
	        return;
	      }

	      this.locked = true;
	      var currentValue = SingleRange.parseValue(value, props);

	      var performUpdate = function performUpdate() {
	        _this3.currentValue = currentValue;

	        _this3.updateQueryHandler(currentValue, props);

	        _this3.locked = false;

	        _this3.$emit('valueChange', currentValue);
	      };

	      checkValueChange$6(props.componentId, currentValue, props.beforeValueChange, performUpdate);
	    },
	    updateQueryHandler: function updateQueryHandler(value, props) {
	      var customQuery = props.customQuery;
	      var query = SingleRange.defaultQuery(value, props);
	      var customQueryOptions;

	      if (customQuery) {
	        var _ref = customQuery(value, props) || {};

	        query = _ref.query;
	        customQueryOptions = getOptionsFromQuery$7(customQuery(value, props));
	      }

	      this.setQueryOptions(props.componentId, customQueryOptions);
	      this.updateQuery({
	        componentId: props.componentId,
	        query: query,
	        value: value,
	        label: props.filterLabel,
	        showFilter: props.showFilter,
	        URLParams: props.URLParams,
	        componentType: 'SINGLERANGE'
	      });
	    },
	    handleChange: function handleChange(e) {
	      var value = this.$props.value;

	      if (value === undefined) {
	        this.setValue(e.target.value);
	      } else {
	        this.$emit('change', e.target.value);
	      }
	    }
	  }
	};

	SingleRange.parseValue = function (value, props) {
	  return props.data.find(function (item) {
	    return item.label === value;
	  }) || null;
	};

	SingleRange.defaultQuery = function (value, props) {
	  var query = null;

	  if (value) {
	    var _range;

	    query = {
	      range: (_range = {}, _range[props.dataField] = {
	        gte: value.start,
	        lte: value.end,
	        boost: 2.0
	      }, _range)
	    };
	  }

	  if (query && props.nestedField) {
	    return {
	      query: {
	        nested: {
	          path: props.nestedField,
	          query: query
	        }
	      }
	    };
	  }

	  return query;
	};

	var mapStateToProps$a = function mapStateToProps(state, props) {
	  return {
	    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null
	  };
	};

	var mapDispatchtoProps$a = {
	  addComponent: addComponent$8,
	  removeComponent: removeComponent$8,
	  updateQuery: updateQuery$8,
	  watchComponent: watchComponent$8,
	  setQueryListener: setQueryListener$8,
	  setQueryOptions: setQueryOptions$8
	};
	var RangeConnected = connect(mapStateToProps$a, mapDispatchtoProps$a)(SingleRange);

	SingleRange.install = function (Vue) {
	  Vue.component(SingleRange.name, RangeConnected);
	};

	var addComponent$9 = lib_5.addComponent,
	    removeComponent$9 = lib_5.removeComponent,
	    watchComponent$9 = lib_5.watchComponent,
	    updateQuery$9 = lib_5.updateQuery,
	    setQueryListener$9 = lib_5.setQueryListener,
	    setQueryOptions$9 = lib_5.setQueryOptions;
	var isEqual$7 = lib_8.isEqual,
	    checkValueChange$7 = lib_8.checkValueChange,
	    getClassName$c = lib_8.getClassName,
	    getOptionsFromQuery$8 = lib_8.getOptionsFromQuery;
	var MultiRange = {
	  name: 'MultiRange',
	  data: function data() {
	    this.state = {
	      currentValue: [],
	      showModal: false,
	      selectedValues: {}
	    };
	    this.type = 'range';
	    this.locked = false;
	    return this.state;
	  },
	  props: {
	    beforeValueChange: types.func,
	    className: VueTypes.string.def(''),
	    componentId: types.stringRequired,
	    customQuery: types.func,
	    data: types.data,
	    dataField: types.stringRequired,
	    defaultSelected: types.stringArray,
	    defaultValue: types.stringArray,
	    value: types.stringArray,
	    filterLabel: types.string,
	    innerClass: types.style,
	    react: types.react,
	    showFilter: VueTypes.bool.def(true),
	    showCheckbox: VueTypes.bool.def(true),
	    title: types.title,
	    URLParams: VueTypes.bool.def(false),
	    nestedField: types.string
	  },
	  methods: {
	    setReact: function setReact(props) {
	      if (props.react) {
	        this.watchComponent(props.componentId, props.react);
	      }
	    },
	    handleClick: function handleClick(e) {
	      var value = this.$props.value;

	      if (value === undefined) {
	        this.selectItem(e.target.value);
	      } else {
	        var values = parseValueArray(this.selectedValues, e.target.value);
	        this.$emit('change', values);
	      }
	    },
	    selectItem: function selectItem(item, isDefaultValue, props, reset) {
	      var _this = this;

	      if (isDefaultValue === void 0) {
	        isDefaultValue = false;
	      }

	      if (props === void 0) {
	        props = this.$props;
	      }

	      if (reset === void 0) {
	        reset = false;
	      }

	      // ignore state updates when component is locked
	      if (props.beforeValueChange && this.locked) {
	        return;
	      }

	      this.locked = true;
	      var currentValue = this.currentValue,
	          selectedValues = this.selectedValues;

	      if (!item) {
	        currentValue = [];
	        selectedValues = {};
	      } else if (isDefaultValue) {
	        currentValue = MultiRange.parseValue(item, props);
	        var values = {};
	        currentValue.forEach(function (value) {
	          values[[value.label]] = true;
	        });

	        if (reset) {
	          selectedValues = values;
	        } else {
	          selectedValues = _extends({}, selectedValues, {}, values);
	        }
	      } else if (selectedValues[item]) {
	        currentValue = currentValue.filter(function (value) {
	          return value.label !== item;
	        });

	        var _selectedValues = selectedValues,
	            del = _selectedValues[item],
	            selected = _objectWithoutPropertiesLoose(_selectedValues, [item].map(_toPropertyKey));

	        selectedValues = selected;
	      } else {
	        var _extends2;

	        var currentItem = props.data.find(function (value) {
	          return item === value.label;
	        });
	        currentValue = [].concat(currentValue, [currentItem]);
	        selectedValues = _extends({}, selectedValues, (_extends2 = {}, _extends2[item] = true, _extends2));
	      }

	      var performUpdate = function performUpdate() {
	        _this.currentValue = currentValue;
	        _this.selectedValues = selectedValues;

	        _this.updateQueryHandler(currentValue, props);

	        _this.locked = false;

	        _this.$emit('valueChange', Object.keys(selectedValues));
	      };

	      checkValueChange$7(props.componentId, currentValue, props.beforeValueChange, performUpdate);
	    },
	    updateQueryHandler: function updateQueryHandler(value, props) {
	      var customQuery = props.customQuery;
	      var query = MultiRange.defaultQuery(value, props);
	      var customQueryOptions;

	      if (customQuery) {
	        var _ref = customQuery(value, props) || {};

	        query = _ref.query;
	        customQueryOptions = getOptionsFromQuery$8(customQuery(value, props));
	      }

	      this.setQueryOptions(props.componentId, customQueryOptions);
	      this.updateQuery({
	        componentId: props.componentId,
	        query: query,
	        value: value,
	        label: props.filterLabel,
	        showFilter: props.showFilter,
	        URLParams: props.URLParams,
	        componentType: 'MULTIRANGE'
	      });
	    }
	  },
	  watch: {
	    react: function react() {
	      this.setReact(this.$props);
	    },
	    dataField: function dataField() {
	      this.updateQueryHandler(this.$data.currentValue, this.$props);
	    },
	    defaultSelected: function defaultSelected(newVal) {
	      this.selectItem(newVal, true, undefined, true);
	    },
	    defaultValue: function defaultValue(newVal) {
	      this.selectItem(newVal, true, undefined, true);
	    },
	    value: function value(newVal, oldVal) {
	      if (!isEqual$7(newVal, oldVal)) {
	        this.selectItem(newVal, true, undefined, true);
	      }
	    },
	    selectedValue: function selectedValue(newVal) {
	      if (!isEqual$7(this.$data.currentValue, newVal)) {
	        this.selectItem(newVal);
	      }
	    }
	  },
	  created: function created() {
	    var _this2 = this;

	    var onQueryChange = function onQueryChange() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      _this2.$emit.apply(_this2, ['queryChange'].concat(args));
	    };

	    this.setQueryListener(this.$props.componentId, onQueryChange, null);
	  },
	  beforeMount: function beforeMount() {
	    this.addComponent(this.$props.componentId);
	    this.setReact(this.$props);

	    if (this.selectedValue) {
	      this.selectItem(this.selectedValue, true);
	    } else if (this.$props.value) {
	      this.selectItem(this.$props.value, true);
	    } else if (this.$props.defaultValue) {
	      this.selectItem(this.$props.defaultValue, true);
	    } else if (this.$props.defaultSelected) {
	      /* TODO: Remove this before next release */
	      deprecatePropWarning('defaultSelected', 'defaultValue');
	      this.selectItem(this.$props.defaultSelected, true);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.removeComponent(this.$props.componentId);
	  },
	  render: function render() {
	    var _this3 = this;

	    var h = arguments[0];
	    return h(Container, {
	      "class": this.$props.className
	    }, [this.$props.title && h(Title, {
	      "class": getClassName$c(this.$props.innerClass, 'title')
	    }, [this.$props.title]), h(UL, {
	      "class": getClassName$c(this.$props.innerClass, 'list')
	    }, [this.$props.data.map(function (item) {
	      var selected = !!_this3.$data.currentValue && _this3.$data.currentValue.label === item.label;
	      return h("li", {
	        "key": item.label,
	        "class": "" + (selected ? 'active' : '')
	      }, [h(Checkbox, {
	        "class": getClassName$c(_this3.$props.innerClass, 'checkbox'),
	        "attrs": {
	          "id": _this3.$props.componentId + "-" + item.label,
	          "name": _this3.$props.componentId,
	          "value": item.label,
	          "type": "Checkbox",
	          "show": _this3.$props.showCheckbox
	        },
	        "domProps": _extends({}, {
	          checked: _this3.selectedValues[item.label]
	        }),
	        "on": _extends({}, {
	          click: _this3.handleClick
	        })
	      }), h("label", {
	        "class": getClassName$c(_this3.$props.innerClass, 'label'),
	        "attrs": {
	          "for": _this3.$props.componentId + "-" + item.label
	        }
	      }, [item.label])]);
	    })])]);
	  }
	};

	MultiRange.parseValue = function (value, props) {
	  return value ? props.data.filter(function (item) {
	    return value.includes(item.label);
	  }) : null;
	};

	MultiRange.defaultQuery = function (values, props) {
	  var generateRangeQuery = function generateRangeQuery(dataField, items) {
	    if (items.length > 0) {
	      return items.map(function (value) {
	        var _range;

	        return {
	          range: (_range = {}, _range[dataField] = {
	            gte: value.start,
	            lte: value.end,
	            boost: 2.0
	          }, _range)
	        };
	      });
	    }

	    return null;
	  };

	  var query = null;

	  if (values && values.length) {
	    query = {
	      bool: {
	        should: generateRangeQuery(props.dataField, values),
	        minimum_should_match: 1,
	        boost: 1.0
	      }
	    };
	  }

	  if (query && props.nestedField) {
	    return {
	      query: {
	        nested: {
	          path: props.nestedField,
	          query: query
	        }
	      }
	    };
	  }

	  return query;
	};

	var mapStateToProps$b = function mapStateToProps(state, props) {
	  return {
	    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null
	  };
	};

	var mapDispatchtoProps$b = {
	  addComponent: addComponent$9,
	  removeComponent: removeComponent$9,
	  updateQuery: updateQuery$9,
	  watchComponent: watchComponent$9,
	  setQueryListener: setQueryListener$9,
	  setQueryOptions: setQueryOptions$9
	};
	var RangeConnected$1 = connect(mapStateToProps$b, mapDispatchtoProps$b)(MultiRange);

	MultiRange.install = function (Vue) {
	  Vue.component(MultiRange.name, RangeConnected$1);
	};

	function _extends$2() {
	  return _extends$2 = Object.assign || function (a) {
	    for (var b, c = 1; c < arguments.length; c++) {
	      for (var d in b = arguments[c], b) {
	        Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
	      }
	    }

	    return a;
	  }, _extends$2.apply(this, arguments);
	}

	var normalMerge = ["attrs", "props", "domProps"],
	    toArrayMerge = ["class", "style", "directives"],
	    functionalMerge = ["on", "nativeOn"],
	    mergeJsxProps = function mergeJsxProps(a) {
	  return a.reduce(function (c, a) {
	    for (var b in a) {
	      if (!c[b]) c[b] = a[b];else if (-1 !== normalMerge.indexOf(b)) c[b] = _extends$2({}, c[b], a[b]);else if (-1 !== toArrayMerge.indexOf(b)) {
	        var d = c[b] instanceof Array ? c[b] : [c[b]],
	            e = a[b] instanceof Array ? a[b] : [a[b]];
	        c[b] = d.concat(e);
	      } else if (-1 !== functionalMerge.indexOf(b)) {
	        for (var f in a[b]) {
	          if (c[b][f]) {
	            var g = c[b][f] instanceof Array ? c[b][f] : [c[b][f]],
	                h = a[b][f] instanceof Array ? a[b][f] : [a[b][f]];
	            c[b][f] = g.concat(h);
	          } else c[b][f] = a[b][f];
	        }
	      } else if ("hook" == b) for (var i in a[b]) {
	        c[b][i] = c[b][i] ? mergeFn(c[b][i], a[b][i]) : a[b][i];
	      } else c[b] = a[b];
	    }

	    return c;
	  }, {});
	},
	    mergeFn = function mergeFn(a, b) {
	  return function () {
	    a && a.apply(this, arguments), b && b.apply(this, arguments);
	  };
	};

	var helper$1 = mergeJsxProps;

	function _templateObject3$6() {
	  var data = _taggedTemplateLiteralLoose(["\n\twidth: auto;\n\tflex-grow: 1;\n\toutline: none;\n\ttext-decoration: none;\n\tmin-width: 240px;\n\tmax-width: 250px;\n\tborder-radius: 0.25rem;\n\tbackground-color: ", ";\n\theight: 300px;\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: space-between;\n\tmargin: 8px;\n\tpadding: 10px;\n\toverflow: hidden;\n\tbox-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);\n\tcolor: ", ";\n\t", ";\n\ttransition: all 0.3s ease;\n\n\th2 {\n\t\twidth: 100%;\n\t\tfont-size: 0.9rem;\n\t\tline-height: 1.2rem;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmargin: 0;\n\t\tpadding: 10px 0 8px;\n\t}\n\n\tp {\n\t\tmargin: 0;\n\t}\n\n\tarticle {\n\t\tflex-grow: 1;\n\t\tfont-size: 0.9rem;\n\t}\n\n\t&:hover,\n\t&:focus {\n\t\tbox-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.3);\n\t}\n\n\t@media (max-width: 420px) {\n\t\twidth: 50%;\n\t\tmin-width: 0;\n\t\theight: 210px;\n\t\tmargin: 0;\n\t\tborder-radius: 0;\n\t\tbox-shadow: none;\n\t\tborder: 1px solid #eee;\n\n\t\t&:hover,\n\t\t&:focus {\n\t\t\tbox-shadow: 0;\n\t\t}\n\t}\n"]);

	  _templateObject3$6 = function _templateObject3() {
	    return data;
	  };

	  return data;
	}

	function _templateObject2$8() {
	  var data = _taggedTemplateLiteralLoose(["\n\twidth: calc(100% + 20px);\n\theight: 220px;\n\tmargin: -10px -10px 0;\n\tbackground-color: ", ";\n\tbackground-size: contain;\n\tbackground-position: center center;\n\tbackground-repeat: no-repeat;\n"]);

	  _templateObject2$8 = function _templateObject2() {
	    return data;
	  };

	  return data;
	}

	function _templateObject$c() {
	  var data = _taggedTemplateLiteralLoose(["\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: center;\n\tflex-wrap: wrap;\n\tmargin: 0 -8px;\n\n\t@media (max-width: 420px) {\n\t\tmargin: 0;\n\t}\n"]);

	  _templateObject$c = function _templateObject() {
	    return data;
	  };

	  return data;
	}
	var container = css(_templateObject$c());
	var Image = index$1('div')(_templateObject2$8(), function (_ref) {
	  var colors = _ref.theme.colors;
	  return colors.backgroundColor || '#fcfcfc';
	});
	var Card = index$1('a')(_templateObject3$6(), function (_ref2) {
	  var theme = _ref2.theme;
	  return theme.colors.backgroundColor ? curriedLighten(0.1, theme.colors.backgroundColor) : '#fff';
	}, function (_ref3) {
	  var theme = _ref3.theme;
	  return theme.colors.textColor;
	}, function (props) {
	  return props.href ? 'cursor: pointer' : null;
	});

	var getClassName$d = lib_8.getClassName;
	var ResultCard = {
	  name: 'ResultCard',
	  props: {
	    currentPage: VueTypes.number.def(0),
	    includeFields: types.includeFields.def(['*']),
	    // component props
	    className: types.string,
	    componentId: types.stringRequired,
	    dataField: types.stringRequired,
	    defaultQuery: types.func,
	    excludeFields: types.excludeFields.def([]),
	    innerClass: types.style,
	    listClass: VueTypes.string.def(''),
	    loader: types.title,
	    renderAllData: types.func,
	    renderData: types.func,
	    onResultStats: types.func,
	    onNoResults: VueTypes.string.def('No Results found.'),
	    pages: VueTypes.number.def(5),
	    pagination: VueTypes.bool.def(false),
	    paginationAt: types.paginationAt.def('bottom'),
	    react: types.react,
	    showResultStats: VueTypes.bool.def(true),
	    size: VueTypes.number.def(10),
	    sortBy: types.sortBy,
	    sortOptions: types.sortOptions,
	    stream: types.bool,
	    URLParams: VueTypes.bool.def(false),
	    target: VueTypes.string.def('_blank')
	  },
	  render: function render() {
	    var h = arguments[0];

	    var _this$$props = this.$props,
	        renderData = _this$$props.renderData,
	        props = _objectWithoutPropertiesLoose(_this$$props, ["renderData"]);

	    var onResultStats = this.$props.onResultStats || this.$scopedSlots.onResultStats;
	    return h(RLConnected, {
	      "props": _extends({}, _extends({}, props, {
	        renderData: this.renderAsCard,
	        onResultStats: onResultStats,
	        listClass: container
	      }))
	    });
	  },
	  methods: {
	    renderAsCard: function renderAsCard(_ref) {
	      var item = _ref.item,
	          triggerClickAnalytics = _ref.triggerClickAnalytics;
	      var h = this.$createElement;
	      var renderData = this.$props.renderData || this.$scopedSlots.renderData;
	      var result = renderData(item);

	      if (result) {
	        return h(Card, helper$1([{
	          "key": item._id,
	          "attrs": {
	            "href": result.url,
	            "className": getClassName$d(this.$props.innerClass, 'listItem'),
	            "target": this.$props.target,
	            "rel": this.$props.target === '_blank' ? 'noopener noreferrer' : null
	          },
	          "on": _extends({}, {
	            click: triggerClickAnalytics
	          })
	        }, result.containerProps]), [h(Image, {
	          "style": {
	            backgroundImage: "url(" + result.image + ")"
	          },
	          "attrs": {
	            "className": getClassName$d(this.$props.innerClass, 'image')
	          }
	        }), typeof result.title === 'string' ? h(Title, {
	          "domProps": _extends({}, {
	            innerHTML: result.title
	          }),
	          "attrs": {
	            "className": getClassName$d(this.$props.innerClass, 'title')
	          }
	        }) : h(Title, {
	          "attrs": {
	            "className": getClassName$d(this.$props.innerClass, 'title')
	          }
	        }, [result.title]), typeof result.description === 'string' ? h("article", {
	          "domProps": _extends({}, {
	            innerHTML: result.description
	          })
	        }) : h("article", [result.description])]);
	      }

	      return null;
	    }
	  }
	};

	ResultCard.generateQueryOptions = function (props) {
	  return ReactiveList.generateQueryOptions(props);
	};

	ResultCard.install = function (Vue) {
	  Vue.component(ResultCard.name, ResultCard);
	};

	function _templateObject4$6() {
	  var data = _taggedTemplateLiteralLoose(["\n\twidth: 100%;\n\theight: auto;\n\toutline: none;\n\ttext-decoration: none;\n\tborder-radius: 0;\n\tbackground-color: ", ";\n\tdisplay: flex;\n\tflex-direction: row;\n\tmargin: 0;\n\tpadding: 10px;\n\tborder-bottom: 1px solid ", ";\n\tcolor: ", ";\n\t", "; all 0.3s ease;\n\n\t&:hover, &:focus {\n\t\tbackground-color: ", ";\n\t}\n\n\t&:last-child {\n\t\tborder: 0;\n\t}\n\n\th2 {\n\t\twidth: 100%;\n\t\tline-height: 1.2rem;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmargin: 0;\n\t\tpadding: 0 0 8px;\n\t}\n\n\tp {\n\t\tmargin: 0;\n\t}\n\n\tarticle {\n\t\twidth: ", ";\n\t\tpadding-left: ", ";\n\t\tfont-size: 0.9rem;\n\t}\n\n\t&:hover, &:focus {\n\t\tbox-shadow: 0 0 0 0 rgba(0,0,0,0.10);\n\t}\n\n\t@media (max-width: 420px) {\n\t\tmin-width: 0;\n\t\tmargin: 0;\n\t\tborder-radius: 0;\n\t\tbox-shadow: none;\n\t\tborder: 1px solid #eee;\n\n\t\t&:hover, &:focus {\n\t\t\tbox-shadow: 0;\n\t\t}\n\t}\n"]);

	  _templateObject4$6 = function _templateObject4() {
	    return data;
	  };

	  return data;
	}

	function _templateObject3$7() {
	  var data = _taggedTemplateLiteralLoose(["\n\twidth: 160px;\n\theight: 160px;\n\t", ";\n\tmargin: 0;\n\tbackground-size: contain;\n\tbackground-position: center center;\n\tbackground-repeat: no-repeat;\n\tbackground-image: ", ";\n"]);

	  _templateObject3$7 = function _templateObject3() {
	    return data;
	  };

	  return data;
	}

	function _templateObject2$9() {
	  var data = _taggedTemplateLiteralLoose(["\n\twidth: 100px;\n\theight: 100px;\n"]);

	  _templateObject2$9 = function _templateObject2() {
	    return data;
	  };

	  return data;
	}

	function _templateObject$d() {
	  var data = _taggedTemplateLiteralLoose(["\n\tdisplay: flex;\n\tflex-direction: column;\n\tmargin: 0;\n\tborder-radius: 0.25rem;\n\toverflow: hidden;\n"]);

	  _templateObject$d = function _templateObject() {
	    return data;
	  };

	  return data;
	}
	var container$1 = css(_templateObject$d());
	var smallImage = css(_templateObject2$9());
	var Image$1 = index$1('div')(_templateObject3$7(), function (props) {
	  return props.small ? smallImage : null;
	}, function (props) {
	  return "url(" + props.src + ")";
	});
	var ListItem = index$1('a')(_templateObject4$6(), function (_ref) {
	  var theme = _ref.theme;
	  return theme.colors.backgroundColor ? curriedLighten(0.1, theme.colors.backgroundColor) : '#fff';
	}, function (_ref2) {
	  var theme = _ref2.theme;
	  return theme.colors.backgroundColor ? curriedLighten(0.3, theme.colors.backgroundColor) : curriedLighten(0.68, theme.colors.textColor);
	}, function (_ref3) {
	  var theme = _ref3.theme;
	  return theme.colors.textColor;
	}, function (props) {
	  return props.href ? 'cursor: pointer' : null;
	}, function (_ref4) {
	  var theme = _ref4.theme;
	  return theme.colors.backgroundColor ? curriedLighten(0.2, theme.colors.backgroundColor) : '#fdfefd';
	}, function (props) {
	  if (props.image) {
	    return props.small ? 'calc(100% - 100px)' : 'calc(100% - 160px)';
	  }

	  return '100%';
	}, function (props) {
	  return props.image ? '10px' : 0;
	});

	var getClassName$e = lib_8.getClassName;
	var ResultList = {
	  name: 'ResultList',
	  props: {
	    currentPage: VueTypes.number.def(0),
	    includeFields: types.includeFields.def(['*']),
	    // component props
	    className: types.string,
	    componentId: types.stringRequired,
	    dataField: types.stringRequired,
	    defaultQuery: types.func,
	    excludeFields: types.excludeFields.def([]),
	    innerClass: types.style,
	    listClass: VueTypes.string.def(''),
	    loader: types.title,
	    renderAllData: types.func,
	    renderData: types.func,
	    onResultStats: types.func,
	    onNoResults: VueTypes.string.def('No Results found.'),
	    pages: VueTypes.number.def(5),
	    pagination: VueTypes.bool.def(false),
	    paginationAt: types.paginationAt.def('bottom'),
	    react: types.react,
	    showResultStats: VueTypes.bool.def(true),
	    size: VueTypes.number.def(10),
	    sortBy: types.sortBy,
	    sortOptions: types.sortOptions,
	    stream: types.bool,
	    URLParams: VueTypes.bool.def(false),
	    target: VueTypes.string.def('_blank')
	  },
	  render: function render() {
	    var h = arguments[0];

	    var _this$$props = this.$props,
	        renderData = _this$$props.renderData,
	        props = _objectWithoutPropertiesLoose(_this$$props, ["renderData"]);

	    var onResultStats = this.$props.onResultStats || this.$scopedSlots.onResultStats;
	    return h(RLConnected, {
	      "props": _extends({}, _extends({}, props, {
	        renderData: this.renderAsList,
	        onResultStats: onResultStats,
	        listClass: container$1
	      }))
	    });
	  },
	  methods: {
	    renderAsList: function renderAsList(_ref) {
	      var item = _ref.item,
	          triggerClickAnalytics = _ref.triggerClickAnalytics;
	      var h = this.$createElement;
	      var renderData = this.$props.renderData || this.$scopedSlots.renderData;
	      var result = renderData(item);

	      if (result) {
	        return h(ListItem, helper$1([{
	          "key": item._id,
	          "attrs": {
	            "href": result.url,
	            "className": getClassName$e(this.$props.innerClass, 'listItem'),
	            "target": this.$props.target,
	            "rel": this.$props.target === '_blank' ? 'noopener noreferrer' : null
	          },
	          "on": _extends({}, {
	            click: triggerClickAnalytics
	          })
	        }, result.containerProps, {
	          "attrs": {
	            "image": !!result.image,
	            "small": result.image_size === 'small'
	          }
	        }]), [result.image ? h(Image$1, {
	          "attrs": {
	            "src": result.image,
	            "small": result.image_size === 'small',
	            "className": getClassName$e(this.$props.innerClass, 'image')
	          }
	        }) : null, h("article", [typeof result.title === 'string' ? h(Title, {
	          "domProps": _extends({}, {
	            innerHTML: result.title
	          }),
	          "attrs": {
	            "className": getClassName$e(this.$props.innerClass, 'title')
	          }
	        }) : h(Title, {
	          "attrs": {
	            "className": getClassName$e(this.$props.innerClass, 'title')
	          }
	        }, [result.title]), typeof result.description === 'string' ? h("div", {
	          "domProps": _extends({}, {
	            innerHTML: result.description
	          })
	        }) : h("div", [result.description])])]);
	      }

	      return null;
	    }
	  }
	};

	ResultList.generateQueryOptions = function (props) {
	  return ReactiveList.generateQueryOptions(props);
	};

	ResultList.install = function (Vue) {
	  Vue.component(ResultList.name, ResultList);
	};

	/*!
	 * vue-no-ssr v1.1.1
	 * (c) 2018-present egoist <0x142857@gmail.com>
	 * Released under the MIT License.
	 */

	var index$3 = {
	  name: 'NoSsr',
	  functional: true,
	  props: {
	    placeholder: String,
	    placeholderTag: {
	      type: String,
	      "default": 'div'
	    }
	  },
	  render: function render(h, ref) {
	    var parent = ref.parent;
	    var slots = ref.slots;
	    var props = ref.props;
	    var ref$1 = slots();
	    var defaultSlot = ref$1["default"];
	    if (defaultSlot === void 0) defaultSlot = [];
	    var placeholderSlot = ref$1.placeholder;

	    if (parent._isMounted) {
	      return defaultSlot;
	    }

	    parent.$once('hook:mounted', function () {
	      parent.$forceUpdate();
	    });

	    if (props.placeholderTag && (props.placeholder || placeholderSlot)) {
	      return h(props.placeholderTag, {
	        "class": ['no-ssr-placeholder']
	      }, props.placeholder || placeholderSlot);
	    } // Return a placeholder element for each child in the default slot
	    // Or if no children return a single placeholder


	    return defaultSlot.length > 0 ? defaultSlot.map(function () {
	      return h(false);
	    }) : h(false);
	  }
	};
	var vueNoSsr_common = index$3;

	function _templateObject$e() {
	  var data = _taggedTemplateLiteralLoose(["\n\tmargin-top: 30px;\n\tpadding: 10px;\n\n\t/* component style */\n\t.vue-slider-disabled {\n\t\topacity: 0.5;\n\t\tcursor: not-allowed;\n\t}\n\n\t/* rail style */\n\t.vue-slider-rail {\n\t\tbackground-color: #ccc;\n\t\tborder-radius: 15px;\n\t\theight: 4px;\n\t}\n\n\t/* process style */\n\t.vue-slider-process {\n\t\tbackground-color: #0b6aff;\n\t\tborder-radius: 15px;\n\t}\n\n\t/* mark style */\n\t.vue-slider-mark {\n\t\tz-index: 4;\n\t}\n\n\t.vue-slider-mark:first-child .vue-slider-mark-step,\n\t.vue-slider-mark:last-child .vue-slider-mark-step {\n\t\tdisplay: none;\n\t}\n\n\t.vue-slider-mark-step {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tborder-radius: 50%;\n\t\tbackground-color: rgba(0, 0, 0, 0.16);\n\t}\n\n\t.vue-slider-mark-label {\n\t\tfont-size: 14px;\n\t\twhite-space: nowrap;\n\t}\n\n\t/* dot style */\n\t.vue-slider-dot{\n\t\tz-index: 2;\n\t}\n\n\t.vue-slider-dot-handle {\n\t\tcursor: pointer;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tborder-radius: 50%;\n\t\tbackground-color: #fff;\n\t\tbox-sizing: border-box;\n\t\tborder: 1px solid #9a9a9a;\n\t\tz-index: 2;\n\t}\n\n\t.vue-slider-dot-handle-disabled {\n\t\tcursor: not-allowed;\n\t\tbackground-color: #ccc;\n\t}\n\n\t.vue-slider-dot-tooltip-inner {\n\t\tfont-size: 14px;\n\t\twhite-space: nowrap;\n\t\tpadding: 2px 5px;\n\t\tmin-width: 20px;\n\t\ttext-align: center;\n\t\tcolor: #fff;\n\t\tborder-radius: 5px;\n\t\tborder-color: #000;\n\t\tbackground-color: #000;\n\t\tbox-sizing: content-box;\n\t}\n\n\t.vue-slider-dot-tooltip-inner::after {\n\t\tcontent: \"\";\n\t\tposition: absolute;\n\t}\n\n\t.vue-slider-dot -tooltip-inner-top::after {\n\t\ttop: 100%;\n\t\tleft: 50%;\n\t\ttransform: translate(-50%, 0);\n\t\theight: 0;\n\t\twidth: 0;\n\t\tborder-color: transparent;\n\t\tborder-style: solid;\n\t\tborder-width: 5px;\n\t\tborder-top-color: inherit;\n\t}\n\n\t.vue-slider-dot-tooltip-inner-bottom::after {\n\t\tbottom: 100%;\n\t\tleft: 50%;\n\t\ttransform: translate(-50%, 0);\n\t\theight: 0;\n\t\twidth: 0;\n\t\tborder-color: transparent;\n\t\tborder-style: solid;\n\t\tborder-width: 5px;\n\t\tborder-bottom-color: inherit;\n\t}\n\n\t.vue-slider-dot-tooltip-inner-left::after {\n\t\tleft: 100%;\n\t\ttop: 50%;\n\t\ttransform: translate(0, -50%);\n\t\theight: 0;\n\t\twidth: 0;\n\t\tborder-color: transparent;\n\t\tborder-style: solid;\n\t\tborder-width: 5px;\n\t\tborder-left-color: inherit;\n\t}\n\n\t.vue-slider-dot-tooltip-inner-right::after {\n\t\tright: 100%;\n\t\ttop: 50%;\n\t\ttransform: translate(0, -50%);\n\t\theight: 0;\n\t\twidth: 0;\n\t\tborder-color: transparent;\n\t\tborder-style: solid;\n\t\tborder-width: 5px;\n\t\tborder-right-color: inherit;\n\t}\n\n\t.vue-slider-dot-tooltip-wrapper {\n\t\topacity: 0;\n\t\ttransition: all 0.3s;\n\t}\n\t.vue-slider-dot-tooltip-wrapper-show {\n\t\topacity: 1;\n\t}\n\n\t.label-container {\n\t\tmargin: 10px 0;\n\t\twidth: 100%;\n\t}\n\n\t.range-label-right {\n\t\tfloat: right;\n\t}\n"]);

	  _templateObject$e = function _templateObject() {
	    return data;
	  };

	  return data;
	}
	var Slider = index$1('div')(_templateObject$e());

	/**
	 * Caution: Please do not change this file without having a discussion with the Team.
	 * Any change may break the umd build, we're directly replacing the line no: 14
	 * `
						var s = document.createElement("script");
						s.setAttribute("src","https://cdn.jsdelivr.net/npm/vue-slider-component@2.8.2/dist/index.js");
						s.onload = function(){
							var VueSlider = global['vue-slider-component'];
							components['vue-slider-component'] = VueSlider;
						}
						document.head.appendChild(s);
					` in rollup umd build process with some script.
	 */
	// eslint-disable-next-line

	var getComponents = function getComponents() {
	  var components = {
	    NoSSR: vueNoSsr_common
	  };

	  {
	    try {
	      // in older versions of nuxt, it's process.BROWSER_BUILD
	      // eslint-disable-next-line
	      
						var s = document.createElement("script");
						s.setAttribute("src","https://cdn.jsdelivr.net/npm/vue-slider-component@2.8.2/dist/index.js");
						s.onload = function(){
							var VueSlider = global$1['vue-slider-component'];
							components['vue-slider-component'] = VueSlider;
						};
						document.head.appendChild(s);
					
	    } catch (e) {
	      console.error('Unable to load vue-slider', e);
	    }
	  }

	  return components;
	};

	var addComponent$a = lib_5.addComponent,
	    removeComponent$a = lib_5.removeComponent,
	    watchComponent$a = lib_5.watchComponent,
	    updateQuery$a = lib_5.updateQuery,
	    setQueryListener$a = lib_5.setQueryListener,
	    setQueryOptions$a = lib_5.setQueryOptions;
	var checkValueChange$8 = lib_8.checkValueChange,
	    getClassName$f = lib_8.getClassName,
	    getOptionsFromQuery$9 = lib_8.getOptionsFromQuery,
	    isEqual$8 = lib_8.isEqual;
	var RangeSlider = {
	  name: 'RangeSlider',
	  components: getComponents(),
	  inject: {
	    theme: {
	      from: 'theme_reactivesearch'
	    }
	  },
	  data: function data() {
	    var state = {
	      currentValue: this.$props.range ? [this.$props.range.start, this.$props.range.end] : [],
	      stats: []
	    };
	    this.locked = false;
	    return state;
	  },
	  props: {
	    beforeValueChange: types.func,
	    className: VueTypes.string.def(''),
	    range: VueTypes.shape({
	      start: VueTypes.integer.def(0),
	      end: VueTypes.integer.def(10)
	    }),
	    rangeLabels: types.rangeLabels,
	    componentId: types.stringRequired,
	    customQuery: types.func,
	    data: types.data,
	    dataField: types.stringRequired,
	    defaultSelected: types.range,
	    defaultValue: types.range,
	    value: types.range,
	    filterLabel: types.string,
	    innerClass: types.style,
	    react: types.react,
	    showFilter: VueTypes.bool.def(true),
	    showCheckbox: VueTypes.bool.def(true),
	    title: types.title,
	    URLParams: VueTypes.bool.def(false),
	    sliderOptions: VueTypes.object.def({}),
	    nestedField: types.string
	  },
	  methods: {
	    setReact: function setReact(props) {
	      if (props.react) {
	        this.watchComponent(props.componentId, props.react);
	      }
	    },
	    handleSlider: function handleSlider(values) {
	      var value = this.$props.value;

	      if (value === undefined) {
	        this.handleChange(values.currentValue);
	      } else {
	        this.$emit('change', {
	          start: values.currentValue[0],
	          end: values.currentValue[1]
	        });
	      }
	    },
	    handleChange: function handleChange(currentValue, props) {
	      var _this = this;

	      if (props === void 0) {
	        props = this.$props;
	      }

	      if (props.beforeValueChange && this.locked) {
	        return;
	      }

	      this.locked = true;

	      var performUpdate = function performUpdate() {
	        _this.currentValue = currentValue;

	        _this.updateQueryHandler([currentValue[0], currentValue[1]], props);

	        _this.locked = false;

	        _this.$emit('valueChange', {
	          start: currentValue[0],
	          end: currentValue[1]
	        });
	      };

	      checkValueChange$8(props.componentId, {
	        start: currentValue[0],
	        end: currentValue[1]
	      }, props.beforeValueChange, performUpdate);
	    },
	    updateQueryHandler: function updateQueryHandler(value, props) {
	      var customQuery = props.customQuery;
	      var query = RangeSlider.defaultQuery(value, props);
	      var customQueryOptions;

	      if (customQuery) {
	        var _ref = customQuery(value, props) || {};

	        query = _ref.query;
	        customQueryOptions = getOptionsFromQuery$9(customQuery(value, props));
	      }

	      var showFilter = props.showFilter,
	          _props$range = props.range,
	          start = _props$range.start,
	          end = _props$range.end;
	      var currentStart = value[0],
	          currentEnd = value[1]; // check if the slider is at its initial position

	      var isInitialValue = currentStart === start && currentEnd === end;
	      this.setQueryOptions(props.componentId, customQueryOptions);
	      this.updateQuery({
	        componentId: props.componentId,
	        query: query,
	        value: value,
	        label: props.filterLabel,
	        showFilter: showFilter && !isInitialValue,
	        URLParams: props.URLParams,
	        componentType: 'RANGESLIDER'
	      });
	    }
	  },
	  watch: {
	    react: function react() {
	      this.setReact(this.$props);
	    },
	    defaultSelected: function defaultSelected(newVal) {
	      this.handleChange(RangeSlider.parseValue(newVal, this.$props));
	    },
	    defaultValue: function defaultValue(newVal) {
	      this.handleChange(RangeSlider.parseValue(newVal, this.$props));
	    },
	    value: function value(newVal, oldVal) {
	      if (!isEqual$8(newVal, oldVal)) {
	        this.handleChange(RangeSlider.parseValue(newVal, this.$props));
	      }
	    },
	    selectedValue: function selectedValue(newVal) {
	      if (!isEqual$8(this.$data.currentValue, newVal)) {
	        this.handleChange(RangeSlider.parseValue(newVal, this.$props));
	      }
	    }
	  },
	  created: function created() {
	    var _this2 = this;

	    var onQueryChange = function onQueryChange() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      _this2.$emit.apply(_this2, ['queryChange'].concat(args));
	    };

	    if (!this.$props.range) {
	      console.error('%crange is not defined. Read more about this at https://opensource.appbase.io/reactive-manual/vue/range-components/rangeslider.html#props', 'font-size: 12.5px;');
	    }

	    this.setQueryListener(this.$props.componentId, onQueryChange, null);
	  },
	  beforeMount: function beforeMount() {
	    this.addComponent(this.$props.componentId);
	    this.setReact(this.$props);
	    var _this$$props = this.$props,
	        defaultSelected = _this$$props.defaultSelected,
	        value = _this$$props.value,
	        defaultValue = _this$$props.defaultValue;
	    var selectedValue = this.selectedValue;

	    if (this.$props.range) {
	      if (Array.isArray(selectedValue)) {
	        this.handleChange(selectedValue);
	      } else if (selectedValue) {
	        this.handleChange(RangeSlider.parseValue(selectedValue, this.$props));
	      } else if (value) {
	        this.handleChange(RangeSlider.parseValue(value, this.$props));
	      } else if (defaultValue) {
	        this.handleChange(RangeSlider.parseValue(defaultValue, this.$props));
	      } else if (defaultSelected) {
	        /* TODO: Remove this before next release */
	        deprecatePropWarning('defaultSelected', 'defaultValue');
	        this.handleChange(RangeSlider.parseValue(defaultSelected, this.$props));
	      }
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.removeComponent(this.$props.componentId);
	  },
	  render: function render() {
	    var h = arguments[0];
	    return h(Container, {
	      "class": this.$props.className
	    }, [this.$props.title && h(Title, {
	      "class": getClassName$f(this.$props.innerClass, 'title')
	    }, [this.$props.title]), this.$props.range ? h(vueNoSsr_common, [h(Slider, {
	      "class": getClassName$f(this.$props.innerClass, 'slider')
	    }, [h("vue-slider-component", {
	      "ref": "slider",
	      "attrs": {
	        "value": this.currentValue,
	        "min": this.$props.range.start,
	        "max": this.$props.range.end,
	        "dotSize": 20,
	        "height": 4,
	        "enable-cross": false
	      },
	      "on": {
	        "drag-end": this.handleSlider
	      },
	      "props": _extends({}, this.$props.sliderOptions)
	    }), this.$props.rangeLabels && h("div", {
	      "class": "label-container"
	    }, [h("label", {
	      "class": getClassName$f(this.$props.innerClass, 'label') || 'range-label-left'
	    }, [this.$props.rangeLabels.start]), h("label", {
	      "class": getClassName$f(this.$props.innerClass, 'label') || 'range-label-right'
	    }, [this.$props.rangeLabels.end])])])]) : null]);
	  }
	};

	RangeSlider.defaultQuery = function (values, props) {
	  var query = null;

	  if (Array.isArray(values) && values.length) {
	    var _range;

	    query = {
	      range: (_range = {}, _range[props.dataField] = {
	        gte: values[0],
	        lte: values[1],
	        boost: 2.0
	      }, _range)
	    };
	  }

	  if (query && props.nestedField) {
	    return {
	      query: {
	        nested: {
	          path: props.nestedField,
	          query: query
	        }
	      }
	    };
	  }

	  return query;
	};

	RangeSlider.parseValue = function (value, props) {
	  if (value) {
	    return [value.start, value.end];
	  }

	  if (props.range) {
	    return [props.range.start, props.range.end];
	  }

	  return [];
	};

	var mapStateToProps$c = function mapStateToProps(state, props) {
	  return {
	    options: state.aggregations[props.componentId] ? state.aggregations[props.componentId][props.dataField] && state.aggregations[props.componentId][props.dataField].buckets // eslint-disable-line
	    : [],
	    selectedValue: state.selectedValues[props.componentId] ? state.selectedValues[props.componentId].value : null
	  };
	};

	var mapDispatchtoProps$c = {
	  addComponent: addComponent$a,
	  removeComponent: removeComponent$a,
	  updateQuery: updateQuery$a,
	  watchComponent: watchComponent$a,
	  setQueryListener: setQueryListener$a,
	  setQueryOptions: setQueryOptions$a
	};
	var RangeConnected$2 = connect(mapStateToProps$c, mapDispatchtoProps$c)(RangeSlider);

	RangeSlider.install = function (Vue) {
	  Vue.component(RangeSlider.name, RangeConnected$2);
	};

	var addComponent$b = lib_5.addComponent,
	    removeComponent$b = lib_5.removeComponent,
	    watchComponent$b = lib_5.watchComponent,
	    updateQuery$b = lib_5.updateQuery,
	    setQueryListener$b = lib_5.setQueryListener,
	    setQueryOptions$b = lib_5.setQueryOptions;
	var checkValueChange$9 = lib_8.checkValueChange,
	    getClassName$g = lib_8.getClassName,
	    getOptionsFromQuery$a = lib_8.getOptionsFromQuery,
	    isEqual$9 = lib_8.isEqual;
	var DynamicRangeSlider = {
	  name: 'DynamicRangeSlider',
	  components: getComponents(),
	  props: {
	    beforeValueChange: types.func,
	    className: VueTypes.string.def(''),
	    rangeLabels: types.func,
	    componentId: types.stringRequired,
	    customQuery: types.func,
	    data: types.data,
	    dataField: types.stringRequired,
	    defaultSelected: types.func,
	    filterLabel: types.string,
	    innerClass: types.style,
	    react: types.react,
	    showFilter: VueTypes.bool.def(true),
	    showCheckbox: VueTypes.bool.def(true),
	    title: types.title,
	    URLParams: VueTypes.bool.def(false),
	    sliderOptions: VueTypes.object.def({}),
	    nestedField: types.string
	  },
	  data: function data() {
	    this.internalRangeComponent = this.$props.componentId + "__range__internal";
	    this.locked = false;
	    return {
	      currentValue: null,
	      stats: []
	    };
	  },
	  created: function created() {
	    var _this = this;

	    var onQueryChange = function onQueryChange() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      _this.$emit.apply(_this, ['queryChange'].concat(args));
	    };

	    this.setQueryListener(this.$props.componentId, onQueryChange, null);
	  },
	  beforeMount: function beforeMount() {
	    this.addComponent(this.$props.componentId);
	    this.addComponent(this.$props.internalRangeComponent);

	    if (Array.isArray(this.selectedValue)) {
	      this.handleChange(this.selectedValue);
	    } else if (this.selectedValue) {
	      this.handleChange(DynamicRangeSlider.parseValue(this.selectedValue, this.$props));
	    } // get range before executing other queries


	    this.updateRangeQueryOptions();
	    this.setReact();
	  },
	  beforeUpdate: function beforeUpdate() {
	    if (!this.currentValue) {
	      this.setDefaultValue(this.range);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.removeComponent(this.$props.componentId);
	    this.removeComponent(this.internalRangeComponent);
	  },
	  methods: {
	    setDefaultValue: function setDefaultValue(_ref) {
	      var start = _ref.start,
	          end = _ref.end;

	      if (this.$props.defaultSelected) {
	        var _this$$props$defaultS = this.$props.defaultSelected(start, end),
	            defaultStart = _this$$props$defaultS.start,
	            defaultEnd = _this$$props$defaultS.end;

	        this.handleChange([defaultStart, defaultEnd]);
	      } else {
	        this.currentValue = [start, end];
	      }
	    },
	    setReact: function setReact() {
	      if (this.$props.react) {
	        this.watchComponent(this.internalRangeComponent, this.$props.react);
	        this.watchComponent(this.$props.componentId, this.$props.react);
	      } else {
	        this.watchComponent(this.internalRangeComponent, {});
	        this.watchComponent(this.$props.componentId, {});
	      }
	    },
	    rangeQuery: function rangeQuery() {
	      return {
	        min: {
	          min: {
	            field: this.$props.dataField
	          }
	        },
	        max: {
	          max: {
	            field: this.$props.dataField
	          }
	        }
	      };
	    },
	    updateRangeQueryOptions: function updateRangeQueryOptions() {
	      var aggs = {};

	      if (this.$props.nestedField) {
	        var _aggs;

	        aggs = (_aggs = {}, _aggs[this.$props.nestedField] = {
	          nested: {
	            path: this.$props.nestedField
	          },
	          aggs: this.rangeQuery()
	        }, _aggs);
	      } else {
	        aggs = this.rangeQuery();
	      }

	      this.setQueryOptions(this.internalRangeComponent, {
	        aggs: aggs
	      });
	    },
	    handleSlider: function handleSlider(values) {
	      this.handleChange(values.currentValue);
	    },
	    handleChange: function handleChange(currentValue) {
	      var _this2 = this;

	      if (this.$props.beforeValueChange && this.locked) return; // Always keep the values within range

	      var normalizedValue = [this.range ? Math.max(this.range.start, currentValue[0]) : currentValue[0], this.range ? Math.min(this.range.end, currentValue[1]) : currentValue[1]];
	      this.locked = true;

	      var performUpdate = function performUpdate() {
	        _this2.currentValue = normalizedValue;

	        _this2.updateQueryHandler(normalizedValue, _this2.$props);

	        _this2.locked = false;

	        _this2.$emit('valueChange', {
	          start: normalizedValue[0],
	          end: normalizedValue[1]
	        });
	      };

	      checkValueChange$9(this.$props.componentId, {
	        start: normalizedValue[0],
	        end: normalizedValue[1]
	      }, this.$props.beforeValueChange, performUpdate);
	    },
	    updateQueryHandler: function updateQueryHandler(value) {
	      var query = DynamicRangeSlider.defaultQuery(value, this.$props);
	      var customQueryOptions;

	      if (this.$props.customQuery) {
	        var _ref2 = this.$props.customQuery(value, this.$props) || {};

	        query = _ref2.query;
	        customQueryOptions = getOptionsFromQuery$a(this.$props.customQuery(value, this.$props));
	      }

	      var _ref3 = this.range || {
	        start: value[0],
	        end: value[1]
	      },
	          start = _ref3.start,
	          end = _ref3.end;

	      var currentStart = value[0],
	          currentEnd = value[1]; // check if the slider is at its initial position

	      var isInitialValue = currentStart === start && currentEnd === end;
	      this.setQueryOptions(this.$props.componentId, customQueryOptions);
	      this.updateQuery({
	        componentId: this.$props.componentId,
	        query: query,
	        value: value,
	        label: this.$props.filterLabel,
	        showFilter: this.$props.showFilter && !isInitialValue,
	        URLParams: this.$props.URLParams,
	        componentType: 'DYNAMICRANGESLIDER'
	      });
	    }
	  },
	  computed: {
	    labels: function labels() {
	      if (!this.rangeLabels) return null;
	      return this.rangeLabels(this.range.start, this.range.end);
	    }
	  },
	  watch: {
	    react: function react() {
	      this.setReact();
	    },
	    selectedValue: function selectedValue(newValue) {
	      if (isEqual$9(newValue, this.currentValue)) return;
	      var value = newValue || {
	        start: this.range.start,
	        end: this.range.end
	      };
	      this.handleChange(DynamicRangeSlider.parseValue(value, this.$props));
	    },
	    range: function range(newValue, oldValue) {
	      if (isEqual$9(newValue, oldValue) || !this.currentValue) return;

	      var _ref4 = this.currentValue || [],
	          currentStart = _ref4[0],
	          currentEnd = _ref4[1];

	      var _ref5 = oldValue || {},
	          oldStart = _ref5.start,
	          oldEnd = _ref5.end;

	      var newStart = currentStart === oldStart ? newValue.start : currentStart;
	      var newEnd = currentEnd === oldEnd ? newValue.end : currentEnd;
	      this.handleChange([newStart, newEnd]);
	    }
	  },
	  render: function render() {
	    var h = arguments[0];

	    if (!this.range) {
	      return null;
	    }

	    var _this$range = this.range,
	        start = _this$range.start,
	        end = _this$range.end;
	    return h(Container, {
	      "class": this.$props.className
	    }, [this.$props.title && h(Title, {
	      "class": getClassName$g(this.$props.innerClass, 'title')
	    }, [this.$props.title]), h(vueNoSsr_common, [h(Slider, {
	      "class": getClassName$g(this.$props.innerClass, 'slider')
	    }, [h("vue-slider-component", {
	      "attrs": {
	        "value": [Math.max(start, this.currentValue[0]), Math.min(end, this.currentValue[1])],
	        "min": Math.min(start, this.currentValue[0]),
	        "max": Math.max(end, this.currentValue[1]),
	        "dotSize": 20,
	        "height": 4,
	        "enable-cross": false
	      },
	      "on": {
	        "drag-end": this.handleSlider
	      },
	      "props": _extends({}, this.$props.sliderOptions)
	    }), this.labels ? h("div", {
	      "class": "label-container"
	    }, [h("label", {
	      "class": getClassName$g(this.$props.innerClass, 'label') || 'range-label-left'
	    }, [this.labels.start]), h("label", {
	      "class": getClassName$g(this.$props.innerClass, 'label') || 'range-label-right'
	    }, [this.labels.end])]) : null])])]);
	  }
	};

	DynamicRangeSlider.defaultQuery = function (values, props) {
	  var query = null;

	  if (Array.isArray(values) && values.length) {
	    var _range;

	    query = {
	      range: (_range = {}, _range[props.dataField] = {
	        gte: values[0],
	        lte: values[1],
	        boost: 2.0
	      }, _range)
	    };
	  }

	  if (query && props.nestedField) {
	    return {
	      query: {
	        nested: {
	          path: props.nestedField,
	          query: query
	        }
	      }
	    };
	  }

	  return query;
	};

	DynamicRangeSlider.parseValue = function (value) {
	  return [value.start, value.end];
	};

	var mapStateToProps$d = function mapStateToProps(state, props) {
	  var componentId = state.aggregations[props.componentId];
	  var internalRange = state.aggregations[props.componentId + "__range__internal"];
	  var options = componentId && componentId[props.dataField];
	  var range = state.aggregations[props.componentId + "__range__internal"];

	  if (props.nestedField) {
	    options = options && componentId[props.dataField][props.nestedField] && componentId[props.dataField][props.nestedField].buckets ? componentId[props.dataField][props.nestedField].buckets : [];
	    range = range && internalRange[props.nestedField].min ? {
	      start: internalRange[props.nestedField].min.value,
	      end: internalRange[props.nestedField].max.value
	    } : null;
	  } else {
	    options = options && componentId[props.dataField].buckets ? componentId[props.dataField].buckets : [];
	    range = range && internalRange.min ? {
	      start: internalRange.min.value,
	      end: internalRange.max.value
	    } : null;
	  }

	  return {
	    options: options,
	    range: range,
	    selectedValue: state.selectedValues[props.componentId] ? state.selectedValues[props.componentId].value : null
	  };
	};

	var mapDispatchtoProps$d = {
	  addComponent: addComponent$b,
	  removeComponent: removeComponent$b,
	  updateQuery: updateQuery$b,
	  watchComponent: watchComponent$b,
	  setQueryListener: setQueryListener$b,
	  setQueryOptions: setQueryOptions$b
	};
	var RangeConnected$3 = connect(mapStateToProps$d, mapDispatchtoProps$d)(DynamicRangeSlider);

	DynamicRangeSlider.install = function (Vue) {
	  Vue.component(DynamicRangeSlider.name, RangeConnected$3);
	};

	var buildQuery = lib_8.buildQuery,
	    pushToAndClause$7 = lib_8.pushToAndClause;
	var valueReducer = lib_2.valueReducer,
	    queryReducer = lib_2.queryReducer,
	    queryOptionsReducer = lib_2.queryOptionsReducer,
	    dependencyTreeReducer = lib_2.dependencyTreeReducer;
	var componentsWithHighlightQuery = ['DataSearch', 'CategorySearch'];
	var componentsWithOptions = ['ReactiveList', 'ResultCard', 'ResultList', 'ReactiveMap', 'SingleList', 'MultiList', 'TagCloud'].concat(componentsWithHighlightQuery);
	var componentsWithoutFilters = ['NumberBox', 'RatingsFilter'];
	var resultComponents = ['ReactiveList', 'ReactiveMap', 'ResultCard', 'ResultList'];

	function getValue(state, id, defaultValue) {
	  if (!state) return defaultValue;

	  if (state[id]) {
	    try {
	      // parsing for next.js - since it uses extra set of quotes to wrap params
	      var parsedValue = JSON.parse(state[id]);
	      return parsedValue;
	    } catch (error) {
	      // using react-dom-server for ssr
	      return state[id] || defaultValue;
	    }
	  }

	  return defaultValue;
	}

	function parseValue(value, component) {
	  if (component.source && component.source.parseValue) {
	    return component.source.parseValue(value, component);
	  }

	  return value;
	}

	function getQuery(component, value, componentType) {
	  // get default query of result components
	  if (resultComponents.includes(componentType)) {
	    return component.defaultQuery ? component.defaultQuery() : {};
	  } // get custom or default query of sensor components


	  var currentValue = parseValue(value, component);

	  if (component.customQuery) {
	    return component.customQuery(currentValue, component);
	  }

	  return component.source.defaultQuery ? component.source.defaultQuery(currentValue, component) : {};
	}

	function initReactivesearch(componentCollection, searchState, settings) {
	  return new Promise(function (resolve, reject) {
	    var credentials = settings.url && settings.url.trim() !== '' && !settings.credentials ? null : settings.credentials;
	    var config = {
	      url: settings.url && settings.url.trim() !== '' ? settings.url : 'https://scalr.api.appbase.io',
	      app: settings.app,
	      credentials: credentials,
	      transformRequest: settings.transformRequest || null,
	      type: settings.type ? settings.type : '*'
	    };
	    var appbaseRef = index$2(config);
	    var components = [];
	    var selectedValues = {};
	    var queryList = {};
	    var queryLog = {};
	    var queryOptions = {};
	    var dependencyTree = {};
	    var finalQuery = [];
	    var orderOfQueries = [];
	    var hits = {};
	    var aggregations = {};
	    var state = {};
	    componentCollection.forEach(function (component) {
	      var componentType = component.source.name;
	      components = [].concat(components, [component.componentId]);
	      var isInternalComponentPresent = false;
	      var isResultComponent = resultComponents.includes(componentType);
	      var internalComponent = component.componentId + "__internal";
	      var label = component.filterLabel || component.componentId;
	      var value = getValue(searchState, label, component.defaultSelected); // [1] set selected values

	      var showFilter = component.showFilter !== undefined ? component.showFilter : true;

	      if (componentsWithoutFilters.includes(componentType)) {
	        showFilter = false;
	      }

	      selectedValues = valueReducer(selectedValues, {
	        type: 'SET_VALUE',
	        component: component.componentId,
	        label: label,
	        value: value,
	        showFilter: showFilter,
	        URLParams: component.URLParams || false
	      }); // [2] set query options - main component query (valid for result components)

	      if (componentsWithOptions.includes(componentType)) {
	        var options = component.source.generateQueryOptions ? component.source.generateQueryOptions(component) : null;
	        var highlightQuery = {};

	        if (componentsWithHighlightQuery.includes(componentType) && component.highlight) {
	          highlightQuery = component.source.highlightQuery(component);
	        }

	        if (options && Object.keys(options).length || highlightQuery && Object.keys(highlightQuery).length) {
	          // eslint-disable-next-line
	          var _ref = options || {},
	              aggs = _ref.aggs,
	              size = _ref.size,
	              otherQueryOptions = _objectWithoutPropertiesLoose(_ref, ["aggs", "size"]);

	          if (aggs && Object.keys(aggs).length) {
	            isInternalComponentPresent = true; // query should be applied on the internal component
	            // to enable feeding the data to parent component

	            queryOptions = queryOptionsReducer(queryOptions, {
	              type: 'SET_QUERY_OPTIONS',
	              component: internalComponent,
	              options: {
	                aggs: aggs,
	                size: size || 100
	              }
	            });
	          } // sort, highlight, size, from - query should be applied on the main component


	          if (otherQueryOptions && Object.keys(otherQueryOptions).length || highlightQuery && Object.keys(highlightQuery).length) {
	            if (!otherQueryOptions) otherQueryOptions = {};
	            if (!highlightQuery) highlightQuery = {};

	            var mainQueryOptions = _extends({}, otherQueryOptions, {}, highlightQuery, {
	              size: size
	            });

	            if (isInternalComponentPresent) {
	              mainQueryOptions = _extends({}, otherQueryOptions, {}, highlightQuery);
	            }

	            if (isResultComponent) {
	              var currentPage = component.currentPage ? component.currentPage - 1 : 0;

	              if (selectedValues[component.componentId] && selectedValues[component.componentId].value) {
	                currentPage = selectedValues[component.componentId].value - 1 || 0;
	              }

	              var resultSize = component.size || 10;
	              mainQueryOptions = _extends({}, mainQueryOptions, {}, highlightQuery, {
	                size: resultSize,
	                from: currentPage * resultSize
	              });
	            }

	            queryOptions = queryOptionsReducer(queryOptions, {
	              type: 'SET_QUERY_OPTIONS',
	              component: component.componentId,
	              options: _extends({}, mainQueryOptions)
	            });
	          }
	        }
	      } // [3] set dependency tree


	      if (component.react || isInternalComponentPresent || isResultComponent) {
	        var react = component.react;

	        if (isInternalComponentPresent || isResultComponent) {
	          react = pushToAndClause$7(react, internalComponent);
	        }

	        dependencyTree = dependencyTreeReducer(dependencyTree, {
	          type: 'WATCH_COMPONENT',
	          component: component.componentId,
	          react: react
	        });
	      } // [4] set query list


	      if (isResultComponent) {
	        var _getQuery = getQuery(component, null, componentType),
	            query = _getQuery.query;

	        queryList = queryReducer(queryList, {
	          type: 'SET_QUERY',
	          component: internalComponent,
	          query: query
	        });
	      } else {
	        queryList = queryReducer(queryList, {
	          type: 'SET_QUERY',
	          component: component.componentId,
	          query: getQuery(component, value, componentType)
	        });
	      }
	    }); // [5] Generate finalQuery for search

	    componentCollection.forEach(function (component) {
	      // eslint-disable-next-line
	      var _buildQuery = buildQuery(component.componentId, dependencyTree, queryList, queryOptions),
	          queryObj = _buildQuery.queryObj,
	          options = _buildQuery.options;

	      var validOptions = ['aggs', 'from', 'sort']; // check if query or options are valid - non-empty

	      if (queryObj && !!Object.keys(queryObj).length || options && Object.keys(options).some(function (item) {
	        return validOptions.includes(item);
	      })) {
	        var _extends2;

	        if (!queryObj || queryObj && !Object.keys(queryObj).length) {
	          queryObj = {
	            match_all: {}
	          };
	        }

	        orderOfQueries = [].concat(orderOfQueries, [component.componentId]);

	        var currentQuery = _extends({
	          query: _extends({}, queryObj)
	        }, options, {}, queryOptions[component.componentId]);

	        queryLog = _extends({}, queryLog, (_extends2 = {}, _extends2[component.componentId] = currentQuery, _extends2));
	        finalQuery = [].concat(finalQuery, [{
	          preference: component.componentId
	        }, currentQuery]);
	      }
	    });
	    state = {
	      components: components,
	      dependencyTree: dependencyTree,
	      queryList: queryList,
	      queryOptions: queryOptions,
	      selectedValues: selectedValues,
	      queryLog: queryLog
	    };
	    appbaseRef.msearch({
	      type: config.type === '*' ? '' : config.type,
	      body: finalQuery
	    }).then(function (res) {
	      orderOfQueries.forEach(function (component, index) {
	        var _extends4;

	        var response = res.responses[index];

	        if (response.aggregations) {
	          var _extends3;

	          aggregations = _extends({}, aggregations, (_extends3 = {}, _extends3[component] = response.aggregations, _extends3));
	        }

	        hits = _extends({}, hits, (_extends4 = {}, _extends4[component] = {
	          hits: response.hits.hits,
	          total: response.hits.total,
	          time: response.took
	        }, _extends4));
	      });
	      state = _extends({}, state, {
	        hits: hits,
	        aggregations: aggregations
	      });
	      resolve(state);
	    })["catch"](function (err) {
	      return reject(err);
	    });
	  });
	}

	var version = "1.0.0-beta.21";

	// Add polyfills to support in IE
	var components = [ReactiveList, ResultCard, ResultList, ReactiveBase, DataSearch, SingleList, MultiList, SingleRange, MultiRange, RangeSlider, DynamicRangeSlider, ReactiveComponent, SelectedFilters, ToggleButton, SingleDropdownList, MultiDropdownList];

	var install = function install(Vue) {
	  components.map(function (component) {
	    Vue.use(component);
	    return null;
	  });
	};

	if (typeof window !== 'undefined' && window.Vue) {
	  install(window.Vue);
	}
	var index$4 = {
	  version: version,
	  install: install
	};

	exports.DataSearch = DataSearch;
	exports.DynamicRangeSlider = DynamicRangeSlider;
	exports.MultiDropdownList = MultiDropdownList;
	exports.MultiList = MultiList;
	exports.MultiRange = MultiRange;
	exports.RangeSlider = RangeSlider;
	exports.ReactiveBase = ReactiveBase;
	exports.ReactiveComponent = ReactiveComponent;
	exports.ReactiveList = ReactiveList;
	exports.ResultCard = ResultCard;
	exports.ResultList = ResultList;
	exports.SelectedFilters = SelectedFilters;
	exports.SingleDropdownList = SingleDropdownList;
	exports.SingleList = SingleList;
	exports.SingleRange = SingleRange;
	exports.ToggleButton = ToggleButton;
	exports.default = index$4;
	exports.initReactivesearch = initReactivesearch;
	exports.install = install;
	exports.version = version;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=reactivesearch-vue.umd.js.map
