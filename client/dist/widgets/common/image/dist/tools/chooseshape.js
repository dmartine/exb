define(["jimu-core/react","jimu-core","jimu-ui"],function(e,t,n){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=526)}({0:function(t,n){t.exports=e},2:function(e,n){e.exports=t},4:function(e,t){e.exports=n},52:function(e,t,n){function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var o=n(0),i=o.createElement("path",{d:"M28 14c0 7.732-6.268 14-14 14S0 21.732 0 14 6.268 0 14 0s14 6.268 14 14z"});function a(e){return o.createElement("svg",r({width:28,height:28,viewBox:"0 0 28 28"},e),i)}e.exports=a,a.default=a},526:function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),o=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e};Object.defineProperty(t,"__esModule",{value:!0});var i,a=n(2),c=n(4),u=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.cropShapeList=["rectangle","circle","hexagon","oval","pentagon","rhombus","triangle"],t.shapeClick=function(e,n){if(t.props.widgetConfig.functionConfig.imageParam&&t.props.widgetConfig.functionConfig.imageParam.cropParam&&t.props.widgetConfig.functionConfig.imageParam.cropParam.cropShape===t.cropShapeList[n]){var r=a.moduleLoader.getAppInBuilderModules().getAppConfigAction(),o=a.Immutable(t.props.widgetConfig);return(c=a.Immutable(o.functionConfig.imageParam.cropParam))||(c=a.Immutable({})),c=(c=(c=c.set("svgViewBox",null)).set("svgPath",null)).set("cropShape",null),o=o.setIn(["functionConfig","imageParam","cropParam"],c),void r.editWidgetConfig(t.props.id,o).exec()}var i=e.currentTarget.getElementsByTagName("svg")&&e.currentTarget.getElementsByTagName("svg")[0];if(i){var c;r=a.moduleLoader.getAppInBuilderModules().getAppConfigAction(),o=a.Immutable(t.props.widgetConfig);(c=a.Immutable(o.functionConfig.imageParam?o.functionConfig.imageParam.cropParam:null))||(c=a.Immutable({})),c=(c=(c=c.set("svgViewBox",i.getAttribute("viewBox"))).set("svgPath",i.getElementsByTagName("path")[0].getAttribute("d"))).set("cropShape",t.cropShapeList[n]),o=o.setIn(["functionConfig","imageParam","cropParam"],c),r.editWidgetConfig(t.props.id,o).exec()}},t}return r(t,e),t.prototype.getStyle=function(){var e=this.props.theme;return a.css(i||(i=o(["\n      .widget-image-chooseshape-item {\n      }\n\n      .widget-image-chooseshape-item:hover {\n        cursor: 'pointer';\n        background-color: ",";\n      }\n\n      .chooseshape-item-selected {\n        background-color: ",";\n      }\n      "],["\n      .widget-image-chooseshape-item {\n      }\n\n      .widget-image-chooseshape-item:hover {\n        cursor: 'pointer';\n        background-color: ",";\n      }\n\n      .chooseshape-item-selected {\n        background-color: ",";\n      }\n      "])),e.colors.grays.gray300,e.colors.grays.gray300)},t.prototype.render=function(){var e=this;return a.jsx("div",{style:{width:"50px"},css:this.getStyle()},this.cropShapeList.map(function(t,r){var o=n(527)("./"+t+".svg");return a.jsx("div",{key:r,className:a.classNames("w-100 d-flex justify-content-center align-items-center widget-image-chooseshape-item",{"chooseshape-item-selected":e.props.widgetConfig.functionConfig.imageParam&&e.props.widgetConfig.functionConfig.imageParam.cropParam&&e.props.widgetConfig.functionConfig.imageParam.cropParam.cropShape===t}),style:{height:"40px"},onClick:function(t){return e.shapeClick(t,r)}},a.jsx(c.Icon,{icon:o}))}))},t}(a.React.PureComponent),s=a.themeUtils.withTheme(u),p=function(){function e(){this.index=0,this.id="choose-shape",this.classes={},this.isEmptySource=function(e){return!(e.functionConfig.imageParam&&e.functionConfig.imageParam.url||e.functionConfig.srcExpression)}}return e.prototype.getGroupId=function(){return null},e.prototype.getTitle=function(){return"Shape"},e.prototype.getIcon=function(){return n(59)},e.prototype.onClick=function(e){return null},e.prototype.visible=function(e){var t=a.getAppStore().getState().appConfig.widgets[e.layoutItem.widgetId];if(t){var n=t.config;return!this.isEmptySource(n)}return!1},e.prototype.getSettingPanel=function(e){var t=e.layoutItem.widgetId;if(this.classes[t])return this.classes[t];return this.classes[t]=a.ReactRedux.connect(function(e){var n=a.Immutable(e.appConfig.widgets[t].config);return{id:t,theme:e.theme,appConfig:e.appConfig,queryObject:e.queryObject,widgetConfig:n}})(s),this.classes[t]},e}();t.default=p},527:function(e,t,n){var r={"./circle.svg":52,"./hexagon.svg":53,"./oval.svg":54,"./pentagon.svg":55,"./rectangle.svg":56,"./rhombus.svg":57,"./triangle.svg":58};function o(e){var t=i(e);return n(t)}function i(e){var t=r[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}o.keys=function(){return Object.keys(r)},o.resolve=i,e.exports=o,o.id=527},53:function(e,t,n){function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var o=n(0),i=o.createElement("path",{d:"M14.124 0l12.124 7v14l-12.124 7L2 21V7z"});function a(e){return o.createElement("svg",r({width:28,height:28,viewBox:"0 0 28 28"},e),i)}e.exports=a,a.default=a},54:function(e,t,n){function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var o=n(0),i=o.createElement("path",{d:"M28 14c0 5.523-6.268 10-14 10S0 19.523 0 14 6.268 4 14 4s14 4.477 14 10z"});function a(e){return o.createElement("svg",r({width:28,height:28,viewBox:"0 0 28 28"},e),i)}e.exports=a,a.default=a},55:function(e,t,n){function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var o=n(0),i=o.createElement("path",{d:"M14 1l14 10.172-5.348 16.458H5.347L-.001 11.172z"});function a(e){return o.createElement("svg",r({width:28,height:28,viewBox:"0 0 28 28"},e),i)}e.exports=a,a.default=a},56:function(e,t,n){function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var o=n(0),i=o.createElement("path",{d:"M0 0v28h28V0H0z"});function a(e){return o.createElement("svg",r({width:28,height:28,viewBox:"0 0 28 28"},e),i)}e.exports=a,a.default=a},57:function(e,t,n){function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var o=n(0),i=o.createElement("path",{d:"M14 0l14 14-14 14L0 14z"});function a(e){return o.createElement("svg",r({width:28,height:28,viewBox:"0 0 28 28"},e),i)}e.exports=a,a.default=a},58:function(e,t,n){function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var o=n(0),i=o.createElement("path",{d:"M14 0l14 28H0z"});function a(e){return o.createElement("svg",r({width:28,height:28,viewBox:"0 0 28 28"},e),i)}e.exports=a,a.default=a},59:function(e,t,n){function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var o=n(0),i=o.createElement("path",{d:"M5.022 11H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v4.022A5.5 5.5 0 1 1 5.022 11zm0-1A5.502 5.502 0 0 1 10 5.022V1H1v9h4.022zm5.478 5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z",fill:"currentColor",fillRule:"nonzero"});function a(e){return o.createElement("svg",r({width:16,height:16,viewBox:"0 0 16 16"},e),i)}e.exports=a,a.default=a}})});
//# sourceMappingURL=chooseshape.js.map