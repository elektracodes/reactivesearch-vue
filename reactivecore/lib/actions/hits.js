Object.defineProperty(exports,"__esModule",{value:true});exports.updateAggs=updateAggs;exports.updateHits=updateHits;exports.pushToStreamHits=pushToStreamHits;var _constants=require('../constants');function updateAggs(component, aggregations){var append=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;return{type:_constants.UPDATE_AGGS,component:component,aggregations:aggregations,append:append};}function updateHits(component, hits, time){var append=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;return{type:_constants.UPDATE_HITS,component:component,hits:hits.hits,total:typeof hits.total==='object'?hits.total.value:hits.total,time:time,append:append};}function pushToStreamHits(component,hit){return{type:_constants.PUSH_TO_STREAM_HITS,component:component,hit:hit};}
