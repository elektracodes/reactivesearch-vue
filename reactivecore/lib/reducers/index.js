Object.defineProperty(exports,"__esModule",{value:true});var _redux=require('redux');var _componentsReducer=require('./componentsReducer');var _componentsReducer2=_interopRequireDefault(_componentsReducer);var _watchManReducer=require('./watchManReducer');var _watchManReducer2=_interopRequireDefault(_watchManReducer);var _dependencyTreeReducer=require('./dependencyTreeReducer');var _dependencyTreeReducer2=_interopRequireDefault(_dependencyTreeReducer);var _queryReducer=require('./queryReducer');var _queryReducer2=_interopRequireDefault(_queryReducer);var _queryOptionsReducer=require('./queryOptionsReducer');var _queryOptionsReducer2=_interopRequireDefault(_queryOptionsReducer);var _configReducer=require('./configReducer');var _configReducer2=_interopRequireDefault(_configReducer);var _appbaseRefReducer=require('./appbaseRefReducer');var _appbaseRefReducer2=_interopRequireDefault(_appbaseRefReducer);var _hitsReducer=require('./hitsReducer');var _hitsReducer2=_interopRequireDefault(_hitsReducer);var _aggsReducer=require('./aggsReducer');var _aggsReducer2=_interopRequireDefault(_aggsReducer);var _logsReducer=require('./logsReducer');var _logsReducer2=_interopRequireDefault(_logsReducer);var _combinedLogsReducer=require('./combinedLogsReducer');var _combinedLogsReducer2=_interopRequireDefault(_combinedLogsReducer);var _valueReducer=require('./valueReducer');var _valueReducer2=_interopRequireDefault(_valueReducer);var _loadingReducer=require('./loadingReducer');var _loadingReducer2=_interopRequireDefault(_loadingReducer);var _errorReducer=require('./errorReducer');var _errorReducer2=_interopRequireDefault(_errorReducer);var _streamingReducer=require('./streamingReducer');var _streamingReducer2=_interopRequireDefault(_streamingReducer);var _streamHitsReducer=require('./streamHitsReducer');var _streamHitsReducer2=_interopRequireDefault(_streamHitsReducer);var _timestampReducer=require('./timestampReducer');var _timestampReducer2=_interopRequireDefault(_timestampReducer);var _headersReducer=require('./headersReducer');var _headersReducer2=_interopRequireDefault(_headersReducer);var _mapDataReducer=require('./mapDataReducer');var _mapDataReducer2=_interopRequireDefault(_mapDataReducer);var _queryListenerReducer=require('./queryListenerReducer');var _queryListenerReducer2=_interopRequireDefault(_queryListenerReducer);var _analyticsReducer=require('./analyticsReducer');var _analyticsReducer2=_interopRequireDefault(_analyticsReducer);var _promotedResultsReducer=require('./promotedResultsReducer');var _promotedResultsReducer2=_interopRequireDefault(_promotedResultsReducer);var _propsReducer=require('./propsReducer');var _propsReducer2=_interopRequireDefault(_propsReducer);var _mapOnTopMarkerReducer=require('./mapOnTopMarkerReducer');var _mapOnTopMarkerReducer2=_interopRequireDefault(_mapOnTopMarkerReducer);var _mapOpenMarkerReducer=require('./mapOpenMarkerReducer');var _mapOpenMarkerReducer2=_interopRequireDefault(_mapOpenMarkerReducer);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default=(0,_redux.combineReducers)({components:_componentsReducer2.default,watchMan:_watchManReducer2.default,queryList:_queryReducer2.default,queryOptions:_queryOptionsReducer2.default,dependencyTree:_dependencyTreeReducer2.default,appbaseRef:_appbaseRefReducer2.default,config:_configReducer2.default,hits:_hitsReducer2.default,promotedResults:_promotedResultsReducer2.default,aggregations:_aggsReducer2.default,queryLog:_logsReducer2.default,combinedLog:_combinedLogsReducer2.default,selectedValues:_valueReducer2.default,isLoading:_loadingReducer2.default,error:_errorReducer2.default,stream:_streamingReducer2.default,streamHits:_streamHitsReducer2.default,timestamp:_timestampReducer2.default,headers:_headersReducer2.default,mapData:_mapDataReducer2.default,queryListener:_queryListenerReducer2.default,analytics:_analyticsReducer2.default,markerOnTop:_mapOnTopMarkerReducer2.default,openMarkers:_mapOpenMarkerReducer2.default,props:_propsReducer2.default});