define(["jimu-core"],function(e){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(t,n){t.exports=e},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=n(2),a=n(5);o.init().then(function(){o.ExtensionManager.getInstance().registerExtension({epName:o.extensionSpec.ExtensionPoints.DependencyDefine,extension:new i.ArcGISDependencyDefineExtension}),o.ExtensionManager.getInstance().registerExtension({epName:o.extensionSpec.ExtensionPoints.DataSourceFactoryUri,extension:new i.ArcGISDataSourceFactoryUriExtension}),o.ExtensionManager.getInstance().registerExtension({epName:o.extensionSpec.ExtensionPoints.DataSourceFactoryUri,extension:new a.HubDataSourceFactoryUriExtension}),window.initStoreState?o.preloadModulesForSSR(window.initStoreState).then(function(){o.ReactDOM.hydrate(o.React.createElement(o.AppRoot,null),document.getElementById("app"))}):o.ReactDOM.render(o.React.createElement(o.AppRoot,null),document.getElementById("app"))},function(e){console.error(e)})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=n(3),a=function(){function e(){this.id="arcgis-dependency-define"}return e.prototype.getDependencyKey=function(){return"jimu-arcgis"},e.prototype.getResources=function(){var e=window.arcgisApiUrl;if(!o.getAppStore().getState().queryObject.apiurl||(e=o.getAppStore().getState().queryObject.apiurl,this.checkApiUrl(e)))return/\/$/.test(e)||(e+="/"),window.dojoConfig={baseUrl:o.urlUtils.getFixedRootPath(),parseOnLoad:!1,async:!0,tlmSiblingOfDojo:!1,has:{"esri-featurelayer-webgl":1,"dojo-sniff":0,"dojo-cdn":0}},window.dojoConfig.packages=[{name:"dojo",location:e+"dojo"},{name:"dijit",location:e+"dijit"},{name:"dojox",location:e+"dojox"},{name:"dgrid",location:e+"dgrid"},{name:"esri",location:e+"esri"},{name:"moment",location:e+"moment"}],/src\/$/.test(e)?window.dojoConfig.packages=window.dojoConfig.packages.concat([{name:"@dojo",location:e+"node_modules/@dojo"},{name:"tslib",location:e+"node_modules/tslib",main:"tslib"},{name:"cldrjs",location:e+"node_modules/cldrjs",main:"dist/cldr"},{name:"globalize",location:e+"node_modules/globalize",main:"dist/globalize"},{name:"maquette",location:e+"node_modules/maquette",main:"dist/maquette.umd"},{name:"maquette-jsx",location:e+"node_modules/maquette-jsx",main:"dist/maquette-jsx.umd"},{name:"maquette-css-transitions",location:e+"node_modules/maquette-css-transitions",main:"dist/maquette-css-transitions.umd"}]):window.dojoConfig.packages=window.dojoConfig.packages.concat([{name:"@dojo",location:e+"@dojo"},{name:"tslib",location:e+"tslib",main:"tslib"},{name:"cldrjs",location:e+"cldrjs",main:"dist/cldr"},{name:"globalize",location:e+"globalize",main:"dist/globalize"},{name:"maquette",location:e+"maquette",main:"dist/maquette.umd"},{name:"maquette-jsx",location:e+"maquette-jsx",main:"dist/maquette-jsx.umd"},{name:"maquette-css-transitions",location:e+"maquette-css-transitions",main:"dist/maquette-css-transitions.umd"}]),[{url:"jimu-arcgis",dependencies:[{url:e+"dojo/dojo.js"},{url:e+"esri/css/main.css"}]}];console.log("Bad apiurl.",e)},e.prototype.checkApiUrl=function(e){return"development"===window.env||(!/^\/\//.test(e)&&!/^https?:\/\//.test(e)||/(?:[\w\-\_]+\.)+(?:esri|arcgis)\.com/.test(e))},e}();t.ArcGISDependencyDefineExtension=a;var r=function(){function e(){this.id="arcgis-ds-factory"}return e.prototype.getFactoryUri=function(e){if(Object.keys(i.ArcGISDataSourceTypes).map(function(e){return i.ArcGISDataSourceTypes[e]}).indexOf(e)>-1)return"jimu-arcgis/arcgis-data-source"},e}();t.ArcGISDataSourceFactoryUriExtension=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(4);t.ArcGISDataSourceTypes=o.DataSourceTypes},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.Map="MAP",e.WebMap="WEB_MAP",e.WebScene="WEB_SCENE",e.MapView="MAP_VIEW",e.SceneView="SCENE_VIEW",e.FeatureLayer="FEATURE_LAYER",e.FeatureLayerView="FEATURE_LAYER_VIEW"}(t.DataSourceTypes||(t.DataSourceTypes={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(6),i=function(){function e(){this.id="hub-ds-factory"}return e.prototype.getFactoryUri=function(e){if(Object.keys(o.HubDataSourceTypes).map(function(e){return o.HubDataSourceTypes[e]}).indexOf(e)>-1)return"hub-common/hub-data-source"},e}();t.HubDataSourceFactoryUriExtension=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(7);t.HubDataSourceTypes=o.DataSourceTypes},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.HubAnnotations="HUB_ANNOTATIONS",e.HubEvents="HUB_EVENTS"}(t.DataSourceTypes||(t.DataSourceTypes={}))}])});
//# sourceMappingURL=index.js.map