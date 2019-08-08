define(["jimu-core","jimu-ui","jimu-for-builder"],function(e,t,n){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=297)}({1:function(t,n){t.exports=e},2:function(e,n){e.exports=t},297:function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),o=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e};Object.defineProperty(t,"__esModule",{value:!0});var i,u=n(1),a=n(298),l=n(2),s=function(e){function t(t){var n=e.call(this,t)||this;return n.themeManager=u.ThemeManager.getInstance(),n.defaultTheme="calcite",n.getStyle=function(){return u.css(i||(i=o(["\n      overflow: auto;\n      .jimu-builder-theme-chooser {\n        ul {\n          display: grid;\n          grid-template-columns: repeat(2, 1fr);\n        }\n      }\n    "],["\n      overflow: auto;\n      .jimu-builder-theme-chooser {\n        ul {\n          display: grid;\n          grid-template-columns: repeat(2, 1fr);\n        }\n      }\n    "])))},n.handleOnChange=function(e,t){console.log("SELECTED THEME IS: "+e);var r=e;a.getAppConfigAction().editTheme(r).exec(),t&&n.setState({themeInfo:u.Immutable(t)})},n.handleOnUpdate=function(e){e&&a.getAppConfigAction().editCustomTheme(u.Immutable(e)).exec()},n.handleOnThemeGroupChange=function(e){e.target&&e.target.checked?(n.themeManager.setThemeFolderPath("builder/themes/"),n.setState({selectedThemeName:"builder/dark",isBuilder:!0})):(n.themeManager.setThemeFolderPath("themes/"),n.setState({selectedThemeName:"default",isBuilder:!1})),n.forceUpdate()},n.state={themeInfo:null,selectedThemeName:n.defaultTheme,isBuilder:!1},n}return r(t,e),t.prototype.render=function(){return u.jsx("div",{css:this.getStyle()},u.jsx("h5",null,"Theme Tester: "),u.jsx("div",{className:"d-flex justify-content-end"}," Builder Themes:",u.jsx(l.Switch,{className:"ml-2",onChange:this.handleOnThemeGroupChange})),u.jsx("hr",null),u.jsx(a.ThemeEditor,{themeName:this.state.selectedThemeName,onThemeChange:this.handleOnChange,auto:!0,isBuilder:this.state.isBuilder}),u.jsx("hr",null),u.jsx(a.ThemeConfigurator,{themeInfo:this.state.themeInfo,onThemeUpdate:this.handleOnUpdate}))},t}(u.BaseWidget);t.default=s},298:function(e,t){e.exports=n}})});
//# sourceMappingURL=widget.js.map