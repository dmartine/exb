define(["jimu-core"],function(e){return function(e){var t={};function o(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=18)}({0:function(t,o){t.exports=e},1:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.Map="MAP",e.WebMap="WEB_MAP",e.WebScene="WEB_SCENE",e.MapView="MAP_VIEW",e.SceneView="SCENE_VIEW",e.FeatureLayer="FEATURE_LAYER",e.FeatureLayerView="FEATURE_LAYER_VIEW"}(t.DataSourceTypes||(t.DataSourceTypes={}))},18:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(0),i=o(2),a=function(){function e(){this.id="arcgis-dependency-define"}return e.prototype.getDependencyKey=function(){return"jimu-arcgis"},e.prototype.getResources=function(){var e=window.arcgisApiUrl;if(!n.getAppStore().getState().queryObject.apiurl||(e=n.getAppStore().getState().queryObject.apiurl,this.checkApiUrl(e)))return/\/$/.test(e)||(e+="/"),window.dojoConfig={baseUrl:n.urlUtils.getFixedRootPath(),parseOnLoad:!1,async:!0,tlmSiblingOfDojo:!1,has:{"esri-featurelayer-webgl":1,"dojo-sniff":0,"dojo-cdn":0}},window.dojoConfig.packages=[{name:"dojo",location:e+"dojo"},{name:"dijit",location:e+"dijit"},{name:"dojox",location:e+"dojox"},{name:"dgrid",location:e+"dgrid"},{name:"esri",location:e+"esri"},{name:"moment",location:e+"moment"}],/src\/$/.test(e)?window.dojoConfig.packages=window.dojoConfig.packages.concat([{name:"@dojo",location:e+"node_modules/@dojo"},{name:"tslib",location:e+"node_modules/tslib",main:"tslib"},{name:"cldrjs",location:e+"node_modules/cldrjs",main:"dist/cldr"},{name:"globalize",location:e+"node_modules/globalize",main:"dist/globalize"},{name:"maquette",location:e+"node_modules/maquette",main:"dist/maquette.umd"},{name:"maquette-jsx",location:e+"node_modules/maquette-jsx",main:"dist/maquette-jsx.umd"},{name:"maquette-css-transitions",location:e+"node_modules/maquette-css-transitions",main:"dist/maquette-css-transitions.umd"}]):window.dojoConfig.packages=window.dojoConfig.packages.concat([{name:"@dojo",location:e+"@dojo"},{name:"tslib",location:e+"tslib",main:"tslib"},{name:"cldrjs",location:e+"cldrjs",main:"dist/cldr"},{name:"globalize",location:e+"globalize",main:"dist/globalize"},{name:"maquette",location:e+"maquette",main:"dist/maquette.umd"},{name:"maquette-jsx",location:e+"maquette-jsx",main:"dist/maquette-jsx.umd"},{name:"maquette-css-transitions",location:e+"maquette-css-transitions",main:"dist/maquette-css-transitions.umd"}]),[{url:"jimu-arcgis",dependencies:[{url:e+"dojo/dojo.js"},{url:e+"esri/css/main.css"}]}];console.log("Bad apiurl.",e)},e.prototype.checkApiUrl=function(e){return"development"===window.env||(!/^\/\//.test(e)&&!/^https?:\/\//.test(e)||/(?:[\w\-\_]+\.)+(?:esri|arcgis)\.com/.test(e))},e}();t.ArcGISDependencyDefineExtension=a;var r=function(){function e(){this.id="arcgis-ds-factory"}return e.prototype.getFactoryUri=function(e){if(Object.keys(i.ArcGISDataSourceTypes).map(function(e){return i.ArcGISDataSourceTypes[e]}).indexOf(e)>-1)return"jimu-arcgis/arcgis-data-source"},e}();t.ArcGISDataSourceFactoryUriExtension=r},2:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(1);t.ArcGISDataSourceTypes=n.DataSourceTypes}})});
//# sourceMappingURL=dependency-extension.js.map