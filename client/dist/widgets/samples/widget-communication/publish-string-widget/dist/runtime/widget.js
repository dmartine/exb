define(["jimu-core"],function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=742)}({2:function(t,n){t.exports=e},742:function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(2),a=function(e){function t(t){var n=e.call(this,t)||this;return n.onStateChange=function(e){o.MessageManager.getInstance().publishMessage(new o.StringSelectionChangeMessage(n.props.id,e.currentTarget.value))},n}return r(t,e),t.prototype.render=function(){return o.React.createElement("div",{className:"widget-pub"},o.React.createElement("h5",null,"This widget will publish ",o.React.createElement("b",null,"STRING_SELECTION_CHANGE")," message"),o.React.createElement("label",null,"State:"),o.React.createElement("select",{onChange:this.onStateChange},o.React.createElement("option",{value:"California"},"California"),o.React.createElement("option",{value:"Colorado"},"Colorado")))},t}(o.BaseWidget);t.default=a}})});
//# sourceMappingURL=widget.js.map