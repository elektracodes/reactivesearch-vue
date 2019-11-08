Object.defineProperty(exports,"__esModule",{value:true});exports.constants=exports.Reducers=exports.polyfills=exports.storeKey=exports.Actions=exports.suggestions=exports.causes=exports.helper=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=configureStore;var _redux=require('redux');var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);var _reducers=require('./reducers');var _reducers2=_interopRequireDefault(_reducers);var _constants=require('./constants');var _actions=require('./actions');var Actions=_interopRequireWildcard(_actions);var _helper=require('./utils/helper');var helper=_interopRequireWildcard(_helper);var _suggestions=require('./utils/suggestions');var _suggestions2=_interopRequireDefault(_suggestions);var _constants2=require('./utils/constants');var _constants3=_interopRequireDefault(_constants2);var _polyfills=require('./utils/polyfills');var _polyfills2=_interopRequireDefault(_polyfills);var _causes=require('./utils/causes');var _causes2=_interopRequireDefault(_causes);var _valueReducer=require('./reducers/valueReducer');var _valueReducer2=_interopRequireDefault(_valueReducer);var _queryReducer=require('./reducers/queryReducer');var _queryReducer2=_interopRequireDefault(_queryReducer);var _queryOptionsReducer=require('./reducers/queryOptionsReducer');var _queryOptionsReducer2=_interopRequireDefault(_queryOptionsReducer);var _dependencyTreeReducer=require('./reducers/dependencyTreeReducer');var _dependencyTreeReducer2=_interopRequireDefault(_dependencyTreeReducer);var _propsReducer=require('./reducers/propsReducer');var _propsReducer2=_interopRequireDefault(_propsReducer);var _analytics=require('./utils/analytics');function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var storeKey=_constants.STORE_KEY;var suggestions=_suggestions2.default;var causes=_causes2.default;var Reducers={valueReducer:_valueReducer2.default,queryOptionsReducer:_queryOptionsReducer2.default,queryReducer:_queryReducer2.default,dependencyTreeReducer:_dependencyTreeReducer2.default,propsReducer:_propsReducer2.default};exports.helper=helper;exports.causes=causes;exports.suggestions=suggestions;exports.Actions=Actions;exports.storeKey=storeKey;exports.polyfills=_polyfills2.default;exports.Reducers=Reducers;exports.constants=_constants3.default;var composeEnhancers=typeof window==='object'&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):_redux.compose;var enhancer=composeEnhancers((0,_redux.applyMiddleware)(_reduxThunk2.default));function configureStore(initialState){var finalInitialState=_extends({},initialState,{config:_extends({},initialState.config,{analyticsConfig:initialState.config&&initialState.config.analyticsConfig?_extends({},_analytics.defaultAnalyticsConfig,initialState.config.analyticsConfig):_analytics.defaultAnalyticsConfig})});return(0,_redux.createStore)(_reducers2.default,finalInitialState,enhancer);}