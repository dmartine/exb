define(["jimu-core","jimu-arcgis"],(function(e,t){return function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=186)}({0:function(t,r){t.exports=e},186:function(e,t,r){"use strict";var a,n=this&&this.__extends||(a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),i=r(4),s=r(35),u=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.filterMessageType=function(e,t){return e===o.MessageType.DataRecordSetCreate||e===o.MessageType.DataRecordSetUpdate||e===o.MessageType.DataRecordsSelectionChange||e===o.MessageType.ExtentChange},t.prototype.filterMessage=function(e){return!0},t.prototype.getSettingComponentUri=function(e,t){return"Map"===(o.getAppStore().getState().appStateInBuilder?o.getAppStore().getState().appStateInBuilder.appConfig:o.getAppStore().getState().appConfig).widgets[t].manifest.label&&e===o.MessageType.DataRecordsSelectionChange?"message-actions/pan-to-action-setting":null},t.prototype.onExecute=function(e,t){var r=this;return i.loadArcGISJSAPIModules(["esri/Graphic"]).then((function(a){var n;switch(n=a[0],e.type){case o.MessageType.DataRecordSetCreate:var i=e,u={};if(i.dataRecordSet&&i.dataRecordSet.records){for(var l=[],c=0;c<i.dataRecordSet.records.length;c++){(h=i.dataRecordSet.records[c].feature)&&l.push(s.handleFeature(h,n).geometry)}u={features:l}}o.getAppStore().dispatch(o.appActions.widgetMutableStatePropChange(r.widgetId,"panToActionValue.value",u));break;case o.MessageType.DataRecordSetUpdate:var p=e,f={};if(p.dataRecordSet&&p.dataRecordSet.records){for(l=[],c=0;c<p.dataRecordSet.records.length;c++){(h=p.dataRecordSet.records[c].feature)&&l.push(s.handleFeature(h,n).geometry)}f={features:l}}o.getAppStore().dispatch(o.appActions.widgetMutableStatePropChange(r.widgetId,"panToActionValue.value",f));break;case o.MessageType.DataRecordsSelectionChange:if(t){var d={},y=[];if((g=e).records){if(g.records[0]&&(!t.useDataSource||g.records[0].dataSource.getMainDataSource().id!==t.useDataSource.mainDataSourceId))break;for(c=0;c<g.records.length;c++){(h=g.records[c].feature)&&y.push(s.handleFeature(h,n).geometry)}}d={features:y},o.getAppStore().dispatch(o.appActions.widgetMutableStatePropChange(r.widgetId,"panToActionValue.value",d));break}var g;d={},y=[];if((g=e).records)for(c=0;c<g.records.length;c++){var h;(h=g.records[c].feature)&&y.push(s.handleFeature(h,n).geometry)}d={features:y},o.getAppStore().dispatch(o.appActions.widgetMutableStatePropChange(r.widgetId,"panToActionValue.value",d));break;case o.MessageType.ExtentChange:var v=e;if(v.getRelatedWidgetIds().indexOf(r.widgetId)>-1)break;var m={value:{features:[v.extent]},relatedWidgets:v.getRelatedWidgetIds()};o.getAppStore().dispatch(o.appActions.widgetMutableStatePropChange(r.widgetId,"panToActionValue",m))}return!0}))},t}(o.AbstractMessageAction);t.default=u},35:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),n=r(4);function o(e,t,r){return new Promise((function(a,o){return n.loadArcGISJSAPIModules(["esri/layers/FeatureLayer"]).then((function(n){if(t.features.length<1)return a();var o=void 0;o=n[0];for(var i=t.features[0].layer,s=[],u={},l=0;l<i.fields.length;l++){var c=(y=i.fields[l],void 0,{name:y.name.replace(/\./g,"_").replace(/\(/g,"_").replace(/\)/g,"_"),alias:y.alias,type:y.type});u[i.fields[l].name]=c.name,s.push(c)}var p=[];for(var f in t.features[0].attributes)if(u[f]){c={fieldName:u[f],label:f};p.push(c)}var d=[];t.features.forEach((function(e,t){var r=e;if(r.attributes){for(var a in r.attributes)r.attributes[u[a]]=r.attributes[a];r.attributes.exbfid=t}else r.attributes={exbfid:t};d.push(r)}));var y,g=new o({id:r,title:i.title,source:d,fields:s,outFields:["*"],objectIdField:"exbfid",renderer:i.renderer,popupEnabled:!0,popupTemplate:{title:"information",content:[{type:"fields",fieldInfos:p}]}});e.map.add(g),g.on("layerview-create",(function(e){return a()}))}))}))}function i(e){return n.loadArcGISJSAPIModules(["esri/geometry/Extent"]).then((function(t){var r;if(r=t[0],!e||!e.length)return Promise.resolve(null);var a,n=null,o=e.length;for(a=0;a<o;a++){var i=e[a];if(i){var s=i.extent;if(!s&&"point"===i.type){var u=i;u.x&&u.y&&(s=new r({xmax:u.x,xmin:u.x,ymax:u.y,ymin:u.y,zmax:u.z,zmin:u.z,spatialReference:u.spatialReference}))}s&&(n=n?n.union(s):s)}}return n.width<0&&n.height<0?Promise.resolve(null):Promise.resolve(n)}))}function s(e,t,r,a){!function(t,n){for(var o=[],i=0,s=0;s<t.length;s++){var u=new a({geometry:t[s].geometry,symbol:r,attributes:t[s].attributes});o.push(u)}var l=function(){e.graphics.addMany(o),setTimeout((function(){e.graphics.removeMany(o),(i+=1)<n&&setTimeout((function(){l()}),500)}),500)};l()}(t,3)}function u(e){return["point","multipoint"].indexOf(e)>-1?{type:"simple-marker",style:"circle",color:[255,255,0,.8],size:"16px",outline:{color:[255,255,0,.8],width:3}}:["polyline"].indexOf(e)>-1?{type:"simple-line",color:[255,255,0,.8],width:3,style:"solid"}:["polygon","extent"].indexOf(e)>-1?{type:"simple-fill",color:[255,255,0,.5],style:"solid",outline:{color:[255,255,0,.8],width:3}}:["mesh"].indexOf(e)>-1?{type:"mesh-3d",symbolLayers:[{type:"fill",material:{color:[255,255,0,.8]}}]}:null}function l(e){switch(e.type){case"point":return e;case"extent":return e.center;case"polygon":return e.centroid;case"polyline":return e.extent.center;default:return e&&e.extent?e.extent.center:void 0}}t.controlUIWidget=function(e,t,r,a,n){var o=e.ui;r&&(t?(o.add(r,a),n&&-1===o.exbMapTools.indexOf(n)&&o.exbMapTools.push(n)):o.remove(r))},t.createNewFeaturelayer=function(e,t){var r=[];return t&&Object.keys(t).forEach((function(a){e.map.layers.find((function(e){return e.id===a}))?console.warn("the feature layer is already created"):r.push(o(e,t[a],a))})),0===r.length?null:Promise.all(r)},t.updateFeaturelayer=function(e,t){var r=[];return t&&Object.keys(t).forEach((function(a){var n=e.map.layers.find((function(e){return e.id===a}));n&&(e.map.remove(n),r.push(o(e,t[a],a)))})),0===r.length?null:Promise.all(r)},t.selectFeature=function(e,t,r){var a=r,n=null,o=null;if(a||(o=t instanceof Array?t[0]:t)&&(a=o.layer&&o.layer.id),a){for(var i=e.allLayerViews,s=0;s<i.length;s++)i.getItemAt(s).layer.id===a&&(n=i.getItemAt(s));return n?{layerId:a,handle:n.highlight(t)}:null}},t.mapPanto=function(e,t){var r=t,a=e;if(r instanceof Array){if(0===r.length)return Promise.resolve();if(r[0].geometry){for(var n=[],o=0;o<r.length;o++)n.push(r[o].geometry);return i(n).then((function(e){return a.goTo(e.center)}))}return i(r).then((function(e){return a.goTo(e.center)}))}if(r.geometry){var s=r.geometry;return a.goTo(l(s))}return a.goTo(l(r))},t.filterFeaturesByQuery=function(e,t,r){if(t)for(var a=e.jimuLayerViews,o=Object.keys(a),i=0;i<o.length;i++){var s=a[o[i]];s&&s.layer&&s.layerDataSourceId===t&&s.type===n.LayerTypes.FeatureLayer&&s.setLocalDefinitionExpression(r)}},t.flashFeaturesByQuery=function(e,t,r){if(t)for(var o=e.jimuLayerViews,i=Object.keys(o),l=function(l){var c=o[i[l]];if(c&&c.layer&&c.layerDataSourceId===t&&c.type===n.LayerTypes.FeatureLayer)if(c.view){var p=c.view;if(!p)return{value:null};n.loadArcGISJSAPIModules(["esri/tasks/support/Query","esri/Graphic"]).then((function(t){var a,n;a=t[0],n=t[1];var o=new a;o.where=r,o.outFields=["*"],o.returnGeometry=!0,p.layer.queryFeatures(o).then((function(t){if(t&&t.features&&t.features.length>0){var r=u(p.layer.geometryType);s(e.view,t.features,r,n)}}))}))}else n.loadArcGISJSAPIModules(["esri/tasks/support/Query","esri/layers/FeatureLayer","esri/Graphic"]).then((function(t){var n,o,i;n=t[0],o=t[1],i=t[2];var l=new n;l.where=r,l.outFields=["*"],l.returnGeometry=!0;var p=new o({url:a.dataSourceUtils.getUrlByLayer(c.layer)});p.load().then((function(){p.queryFeatures(l).then((function(t){if(t&&t.features&&t.features.length>0){var r=u(t.features[0].geometry.type);s(e.view,t.features,r,i)}}))}))}))},c=0;c<i.length;c++){var p=l(c);if("object"==typeof p)return p.value}},t.handleFeature=function(e,t){var r=null;return e.clone?r=e.clone():(r=t.fromJSON(Object.assign({},e))).attributes=Object.assign({},e.attributes),r},t.projectGeometries=function(e,t){return e&&0!==e.length&&e[0]&&t.wkid!==e[0].spatialReference.wkid&&!t.equals(e[0].spatialReference)?t.isWebMercator&&e[0].spatialReference.isWGS84||t.isWGS84&&e[0].spatialReference.isWebMercator?Promise.resolve(e):n.geometryUtils.projectToSpatialReference(e,t):Promise.resolve(e)},t.processZoomToFeatures=function(e,t,r){return e&&"3d"===e.type&&t&&t.queryFeatures&&r?n.loadArcGISJSAPIModules(["esri/tasks/support/Query"]).then((function(e){var a=new(0,e[0]);return a.returnGeometry=!0,a.outFields=["*"],a.objectIds=r.map((function(e){return e.attributes[t.objectIdField]})),t.queryFeatures(a).then((function(e){return e&&e.features&&e.features.length===r.length?Promise.resolve(e.features):Promise.resolve(r)}),(function(){return Promise.resolve(r)}))})):Promise.resolve(r)},t.checkIsLive=function(e){return!window.jimuConfig.isInBuilder||e!==a.AppMode.Design},t.getMapBaseRestoreData=function(e){return{mapContainer:e.mapContainer,state:e.state,MapView:e.MapView,SceneView:e.SceneView,Extent:e.Extent,Viewpoint:e.Viewpoint,mapView:e.mapView,sceneView:e.sceneView,extentWatch:e.extentWatch,fatalErrorWatch:e.fatalErrorWatch,dsManager:e.dsManager,highLightHandles:e.highLightHandles,mapBaseViewEventHandles:e.mapBaseViewEventHandles}},t.restoreMapBase=function(e,t){e.mapContainer=t.mapContainer,e.state=t.state,e.MapView=t.MapView,e.SceneView=t.SceneView,e.Extent=t.Extent,e.Viewpoint=t.Viewpoint,e.mapView=t.mapView,e.sceneView=t.sceneView,e.extentWatch=t.extentWatch,e.fatalErrorWatch=t.fatalErrorWatch,e.dsManager=t.dsManager,e.highLightHandles=t.highLightHandles,e.mapBaseViewEventHandles=t.mapBaseViewEventHandles}},4:function(e,r){e.exports=t}})}));