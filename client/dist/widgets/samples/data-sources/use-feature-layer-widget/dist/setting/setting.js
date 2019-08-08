define(["jimu-core","jimu-for-builder"],function(e,t){return function(e){var t={};function r(o){if(t[o])return t[o].exports;var u=t[o]={i:o,l:!1,exports:{}};return e[o].call(u.exports,u,u.exports,r),u.l=!0,u.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var u in e)r.d(o,u,function(t){return e[t]}.bind(null,u));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=719)}({2:function(t,r){t.exports=e},337:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(338);t.ArcGISDataSourceTypes=o.DataSourceTypes},338:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.Map="MAP",e.WebMap="WEB_MAP",e.WebScene="WEB_SCENE",e.MapView="MAP_VIEW",e.SceneView="SCENE_VIEW",e.FeatureLayer="FEATURE_LAYER",e.FeatureLayerView="FEATURE_LAYER_VIEW"}(t.DataSourceTypes||(t.DataSourceTypes={}))},6:function(e,r){e.exports=t},719:function(e,t,r){"use strict";var o=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function o(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();Object.defineProperty(t,"__esModule",{value:!0});var u=r(2),n=r(6),a=r(337),s=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.supportedTypes=u.Immutable([a.ArcGISDataSourceTypes.FeatureLayer,u.DataSourceTypes.FeatureQuery]),t.onFieldSelected=function(e,r){t.props.onSettingChange({widgetId:t.props.id,useDataSources:u.Immutable([{dataSourceId:t.props.useDataSources[0].dataSourceId,rootDataSourceId:t.props.useDataSources[0].rootDataSourceId,fields:[e.jimuName]}])})},t}return o(t,e),t.prototype.render=function(){return u.React.createElement("div",{className:"use-feature-layer-setting p-2"},u.React.createElement(n.DataSourceChooser,{types:this.supportedTypes,selectedDataSourceIds:this.props.useDataSources&&u.Immutable(this.props.useDataSources.map(function(e){return e.dataSourceId})),widgetId:this.props.id}),this.props.useDataSources&&this.props.useDataSources.length>0&&u.React.createElement("div",{className:"mt-2"},"Please choose a Field to query:",u.React.createElement(n.FieldChooser,{dataSourceIds:u.Immutable(this.props.useDataSources.map(function(e){return e.dataSourceId})),onSelect:this.onFieldSelected,selectedFields:this.props.useDataSources[0].fields||u.Immutable([])})))},t}(n.BaseWidgetSetting);t.default=s}})});
//# sourceMappingURL=setting.js.map