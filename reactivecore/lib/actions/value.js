Object.defineProperty(exports,"__esModule",{value:true});exports.setValue=setValue;exports.patchValue=patchValue;exports.clearValues=clearValues;var _constants=require('../constants');function setValue(component, value, label, showFilter, URLParams, componentType, category){return{type:_constants.SET_VALUE,component:component,value:value,label:label,showFilter:showFilter,URLParams:URLParams,componentType:componentType,category:category};}function patchValue(component, payload){return{type:_constants.PATCH_VALUE,component:component,payload:payload};}function clearValues(){return{type:_constants.CLEAR_VALUES};}
