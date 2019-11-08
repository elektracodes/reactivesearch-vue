Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=aggsReducer;var _constants=require('../constants');function _defineProperty(obj, key, value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length); i<arr.length; i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _objectWithoutProperties(obj, keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function aggsReducer(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var action=arguments[1];if(action.type===_constants.UPDATE_AGGS){if(action.append){var field=Object.keys(state[action.component])[0];var _action$aggregations$=action.aggregations[field],newBuckets=_action$aggregations$.buckets,aggsData=_objectWithoutProperties(_action$aggregations$,['buckets']);return _extends({},state,_defineProperty({},action.component,_defineProperty({},field,_extends({buckets:[].concat(_toConsumableArray(state[action.component][field].buckets),_toConsumableArray(newBuckets))},aggsData))));}return _extends({},state,_defineProperty({},action.component,action.aggregations));}else if(action.type===_constants.REMOVE_COMPONENT){var del=state[action.component],obj=_objectWithoutProperties(state,[action.component]);return obj;}return state;}
