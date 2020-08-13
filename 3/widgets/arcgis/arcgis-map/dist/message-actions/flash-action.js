define(["jimu-core"],(function(e){return function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=190)}({0:function(t,r){t.exports=e},190:function(e,t,r){"use strict";var a,n=this&&this.__extends||(a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),u=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.filterMessageType=function(e,t){return e===o.MessageType.DataRecordsSelectionChange},t.prototype.filterMessage=function(e){return!0},t.prototype.getSettingComponentUri=function(e,t){return"message-actions/flash-action-setting"},t.prototype.onExecute=function(e,t){switch(e.type){case o.MessageType.DataRecordsSelectionChange:if(0===e.records.length)break;var r=null;if(t)if(t.messageUseDataSource&&t.actionUseDataSource){if(e.records.length>0&&e.records[0].dataSource.getMainDataSource().id!==t.messageUseDataSource.mainDataSourceId){o.getAppStore().dispatch(o.appActions.widgetMutableStatePropChange(this.widgetId,"flashActionValue",null));break}var a=o.DataSourceManager.getInstance().getDataSource(t.messageUseDataSource.mainDataSourceId),n=o.DataSourceManager.getInstance().getDataSource(t.actionUseDataSource.mainDataSourceId);if(a&&n)if(t.enabledDataRelationShip){var u=null,i=null;if(t.messageUseDataSource.mainDataSourceId===t.actionUseDataSource.mainDataSourceId&&t.messageUseDataSource.rootDataSourceId===t.actionUseDataSource.rootDataSourceId){var s=a.getSchema(),c=s&&s.fields&&Object.keys(s.fields).find((function(e){return"esriFieldTypeOID"===s.fields[e].esriType}));i=u=s&&s.fields&&s.fields[c]}else{var l=t.messageUseDataSource.fields[0],f=t.actionUseDataSource.fields[0];u=a.getSchema().fields[l],i=n.getSchema().fields[f]}var d="";if(u&&i){for(var p=u.name,g=u.type,S=e,y=[],h=0;h<S.records.length;h++){var D=S.records[h].getData()[p];y.indexOf(""+this.formatValue(D,g))>-1||y.push(""+this.formatValue(S.records[h].getData()[p],g))}d=i.name+" IN ",d=y.length>0?d+"("+y.join(", ")+")":""}if(e.records.length>0)(v=t.sqlExprObj?o.dataSourceUtils.getArcGISSQL(t.sqlExprObj,n).sql:null)&&(d=d?d+" AND "+v:v);else d="";var m={outFields:["*"],where:d,returnGeometry:!0},b=n.getRealQueryParams(m,"query");r={layerDataSourceId:n&&n.id,querySQL:b&&b.where}}else{var v;d="";if(e.records.length>0)(v=t.sqlExprObj?o.dataSourceUtils.getArcGISSQL(t.sqlExprObj,n).sql:null)&&(d=v);else d="";m={outFields:["*"],where:d,returnGeometry:!0},b=n.getRealQueryParams(m,"query");r={layerDataSourceId:n&&n.id,querySQL:b&&b.where}}else r=null}else r=null;o.getAppStore().dispatch(o.appActions.widgetMutableStatePropChange(this.widgetId,"flashActionValue",r))}return!0},t.prototype.getLayerIdFromLayerDs=function(e){return e.layerId?e.layerId:e.layer?e.layer.id:null},t.prototype.formatValue=function(e,t){return"STRING"===t?"'"+e+"'":"NUMBER"===t?""+e:"DATE"===t?"'"+e+"'":void 0},t}(o.AbstractMessageAction);t.default=u}})}));