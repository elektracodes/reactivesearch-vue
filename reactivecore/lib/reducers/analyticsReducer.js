Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=analyticsReducer;var _constants=require('../constants');var _constants2=require('../utils/constants');var initialState={searchValue:null,searchId:null,suggestionsSearchId:null,suggestionsSearchValue:null};var searchComponents=[_constants2.componentTypes.dataSearch,_constants2.componentTypes.categorySearch];function analyticsReducer(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];switch(action.type){case _constants.SET_VALUE:if(searchComponents.includes(action.componentType)){return{searchValue:action.value,searchId:null};}return state;case _constants.SET_SEARCH_ID:return _extends({},state,{searchId:action.searchId});case _constants.SET_SUGGESTIONS_SEARCH_VALUE:return _extends({},state,{suggestionsSearchValue:action.value,suggestionsSearchId:null});case _constants.SET_SUGGESTIONS_SEARCH_ID:return _extends({},state,{suggestionsSearchId:action.searchId});case _constants.CLEAR_SUGGESTIONS_SEARCH_VALUE:return _extends({},state,{suggestionsSearchValue:null,suggestionsSearchId:null});default:return state;}}