Object.defineProperty(exports,"__esModule",{value:true});exports.default=mapOnTopMarkerReducer;var _constants=require('../constants');function mapOnTopMarkerReducer(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var action=arguments[1];switch(action.type){case _constants.SET_MAP_ON_TOP_MARKER:return action.markerId;default:return state;}}