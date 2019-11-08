Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var flatten=function flatten(arr){return arr.reduce(function(flat,toFlatten){return flat.concat(Array.isArray(toFlatten)?flatten(toFlatten):toFlatten);},[]);};var extractSuggestion=function extractSuggestion(val){switch(typeof val){case'string':return val;case'object':if(Array.isArray(val)){return flatten(val);}return null;default:return val;}};var getSuggestions=function getSuggestions(fields,suggestions,currentValue){var suggestionProperties=arguments.length>3&&arguments[3]!==undefined?arguments[3]:[];var suggestionsList=[];var labelsList=[];var populateSuggestionsList=function populateSuggestionsList(val,parsedSource,source){var isWordMatch=currentValue.trim().split(' ').some(function(term){return String(val).toLowerCase().includes(term);});if(isWordMatch&&!labelsList.includes(val)){var defaultOption={label:val,value:val,source:source};var additionalKeys={};if(Array.isArray(suggestionProperties)&&suggestionProperties.length>0){suggestionProperties.forEach(function(prop){if(parsedSource.hasOwnProperty(prop)){additionalKeys=_extends({},additionalKeys,_defineProperty({},prop,parsedSource[prop]));}});}var option=_extends({},defaultOption,additionalKeys);labelsList=[].concat(_toConsumableArray(labelsList),[val]);suggestionsList=[].concat(_toConsumableArray(suggestionsList),[option]);}};var parseField=function parseField(parsedSource,field){var source=arguments.length>2&&arguments[2]!==undefined?arguments[2]:parsedSource;if(typeof parsedSource==='object'){var fieldNodes=field.split('.');var label=parsedSource[fieldNodes[0]];if(label){if(fieldNodes.length>1){var children=field.substring(fieldNodes[0].length+1);if(Array.isArray(label)){label.forEach(function(arrayItem){parseField(arrayItem,children,source);});}else{parseField(label,children,source);}}else{var val=extractSuggestion(label);if(val){if(Array.isArray(val)){val.forEach(function(suggestion){return populateSuggestionsList(suggestion,parsedSource,source);});}else{populateSuggestionsList(val,parsedSource,source);}}}}}};suggestions.forEach(function(item){var _score=item._score,_index=item._index,_type=item._type,_id=item._id;var source=_extends({},item._source,{_id:_id,_index:_index,_score:_score,_type:_type});fields.forEach(function(field){parseField(source,field);});});return suggestionsList;};exports.default=getSuggestions;