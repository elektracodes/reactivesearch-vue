Object.defineProperty(exports,"__esModule",{value:true});exports.setSuggestionsSearchValue=setSuggestionsSearchValue;exports.clearSuggestionsSearchValue=clearSuggestionsSearchValue;exports.updateAnalyticsConfig=updateAnalyticsConfig;var _constants=require('../constants');function setSuggestionsSearchValue(value){return{type:_constants.SET_SUGGESTIONS_SEARCH_VALUE,value:value};}function clearSuggestionsSearchValue(){return{type:_constants.CLEAR_SUGGESTIONS_SEARCH_VALUE};}function updateAnalyticsConfig(analyticsConfig){return{type:_constants.UPDATE_ANALYTICS_CONFIG,analyticsConfig:analyticsConfig};}