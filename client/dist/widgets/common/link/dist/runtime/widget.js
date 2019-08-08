define(["jimu-core","jimu-ui"],function(t,n){return function(t){var n={};function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(o,r,function(n){return t[n]}.bind(null,r));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=542)}({2:function(n,e){n.exports=t},4:function(t,e){t.exports=n},542:function(t,n,e){"use strict";var o=this&&this.__extends||function(){var t=function(n,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(n,e)};return function(n,e){function o(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}}();Object.defineProperty(n,"__esModule",{value:!0});var r=e(2),i=e(4),s=e(543),u=function(t){function n(n){var e=t.call(this,n)||this;return e.__unmount=!1,e.getAreRecordsSame=function(t,n){if(!(!e.props.useDataSources||!e.props.useDataSources[0])&&e.props.useDataSources[0].isInherited){var o=e.props.repeatedDataSource,r=o&&o.record,i=e.props.repeatedDataSource;return r===(i&&i.record)}return n.info===e.state.info},e.getAreInheritedSame=function(t,n){return(!(!e.props.useDataSources||!e.props.useDataSources[0])&&e.props.useDataSources[0].isInherited)===(!(!t.useDataSources||!t.useDataSources[0])&&t.useDataSources[0].isInherited)},e.getRecord=function(){var t;if(!(!e.props.useDataSources||!e.props.useDataSources[0])&&e.props.useDataSources[0].isInherited){var n=e.props.repeatedDataSource;t=n&&n.record}else t=e.getSelectedRecord(e.dataSource);return t},e.resolveText=function(){var t=e.getRecord(),n=e.getTextExpression();return r.resolveExpression(n,t,e.props.intl).then(function(t){return t||""})},e.resolveTooltip=function(){var t=e.getRecord(),n=e.getTipExpression();return r.resolveExpression(n,t,e.props.intl).then(function(t){return t||""})},e.resolveLinkSetting=function(){var t=e.getRecord(),n=e.getLinkSettingExpression();return r.resolveExpression(n,t,e.props.intl).then(function(t){return t||""})},e.getSelectedRecord=function(t){return t?t.getSelectedRecords()[0]:null},e.onDataSourceInfoChange=function(t){e.setState({info:t})},e.onDataSourceCreated=function(t){e.dataSource=t,e.setState({info:t&&t.getInfo()})},e.getTipExpression=function(){return e.props.config&&e.props.config.functionConfig&&e.props.config.functionConfig.toolTipExpression&&e.props.config.functionConfig.toolTipExpression.asMutable({deep:!0})||{name:"default expression",parts:[{type:r.ExpressionPartType.String,exp:'"'+(e.props.config&&e.props.config.functionConfig&&e.props.config.functionConfig.toolTip)+'"'}]}},e.getTextExpression=function(){return e.props.config&&e.props.config.functionConfig&&e.props.config.functionConfig.textExpression&&e.props.config.functionConfig.textExpression.asMutable({deep:!0})||{name:"default expression",parts:[{type:r.ExpressionPartType.String,exp:'"'+(e.props.config&&e.props.config.functionConfig&&e.props.config.functionConfig.text)+'"'}]}},e.getLinkSettingExpression=function(){var t=e.props.config&&e.props.config.functionConfig&&e.props.config.functionConfig.linkParam&&e.props.config.functionConfig.linkParam&&e.props.config.functionConfig.linkParam.expression;return t&&t.asMutable({deep:!0})||null},e.state={info:null,text:e.props.config&&e.props.config.functionConfig&&e.props.config.functionConfig.text||"button",toolTip:e.props.config&&e.props.config.functionConfig&&e.props.config.functionConfig.toolTip||"",url:e.props.config&&e.props.config.functionConfig&&e.props.config.functionConfig.linkParam&&e.props.config.functionConfig.linkParam.value||""},e}return o(n,t),n.prototype.componentDidMount=function(){var t=this;this.__unmount=!1,this.props.useDataSourcesEnabled&&(this.resolveText().then(function(n){return!t.__unmount&&t.setState({text:n})}),this.resolveTooltip().then(function(n){return!t.__unmount&&t.setState({toolTip:n})}),this.resolveLinkSetting().then(function(n){return!t.__unmount&&t.setState({url:n})}))},n.prototype.componentDidUpdate=function(t,n){var e=this;t.useDataSourcesEnabled===this.props.useDataSourcesEnabled||this.props.useDataSourcesEnabled||this.setState({info:null,text:this.props.config&&this.props.config.functionConfig&&this.props.config.functionConfig.text,toolTip:this.props.config&&this.props.config.functionConfig&&this.props.config.functionConfig.toolTip}),!this.props.useDataSourcesEnabled||this.props.config===t.config&&this.props.useDataSources===t.useDataSources&&this.props.repeatedDataSource===t.repeatedDataSource&&this.getAreRecordsSame(t,n)&&this.getAreInheritedSame(t,n)?this.props.useDataSourcesEnabled||this.props.config===t.config&&this.props.useDataSources===t.useDataSources||this.setState({text:this.props.config&&this.props.config.functionConfig&&this.props.config.functionConfig.text,toolTip:this.props.config&&this.props.config.functionConfig&&this.props.config.functionConfig.toolTip,url:this.props.config&&this.props.config.functionConfig&&this.props.config.functionConfig.linkParam&&this.props.config.functionConfig.linkParam.value}):(this.resolveText().then(function(t){return!e.__unmount&&e.setState({text:t})}),this.resolveTooltip().then(function(t){return!e.__unmount&&e.setState({toolTip:t})}),this.resolveLinkSetting().then(function(t){return!e.__unmount&&e.setState({url:t})}))},n.prototype.componentWillUnmount=function(){this.__unmount=!0},n.prototype.render=function(){var t,n=this.props.config,e=this.props.useDataSourcesEnabled,o=n.styleConfig.themeStyle.className+" widget-link text-truncate",u=n.functionConfig.linkParam,p=this.state.text,c=this.state.toolTip,a=u.linkType,l=i.styleUtils.toCSSStyle(n.styleConfig.customStyle.regular),f=i.styleUtils.toCSSStyle(n.styleConfig.customStyle.hover),g=i.styleUtils.toCSSStyle(n.styleConfig.customStyle.clicked),d=u.openType,h={style:l,hoverStyle:f,visitedStyle:g},S={color:n.styleConfig.themeStyle.color,size:n.styleConfig.themeStyle.size,outline:n.styleConfig.themeStyle.outline,rounded:n.styleConfig.themeStyle.rounded};if(u.linkType==r.LinkType.Page||u.linkType==r.LinkType.Dialog||u.linkType==r.LinkType.View)t=r.jsx(i.Link,{to:{linkType:a,value:u.value},className:o,queryObject:this.props.queryObject,target:d,title:c,customStyle:h,themeStyle:S},p);else if(u.linkType==r.LinkType.WebAddress){var y=this.state.url;t=r.jsx(i.Link,{to:y,className:o,themeStyle:S,target:d,customStyle:h,title:c},p)}else t=r.jsx(i.Link,{target:d,className:o,themeStyle:S,customStyle:h,title:c},p);return r.jsx("div",{className:"w-100 h-100 p-2",css:s.getStyle(this.props.theme)},t,r.jsx("div",{style:{display:"none"}},e&&r.jsx(r.DataSourceComponent,{useDataSource:this.props.useDataSources&&this.props.useDataSources[0],onDataSourceCreated:this.onDataSourceCreated,onDataSourceInfoChange:this.onDataSourceInfoChange})))},n}(r.BaseWidget);n.default=u},543:function(t,n,e){"use strict";var o=this&&this.__makeTemplateObject||function(t,n){return Object.defineProperty?Object.defineProperty(t,"raw",{value:n}):t.raw=n,t};Object.defineProperty(n,"__esModule",{value:!0});var r,i=e(2);n.getStyle=function(t){return i.css(r||(r=o(["\n    &>a {\n      text-align: center;\n    }\n    &>a:before {\n      content:'';\n      display:inline-block;\n      height:100%;\n      vertical-align:middle;\n    }\n    .btn-outline-primary{\n      border-color: "," !important;\n    }\n    .btn-outline-secondary{\n      border-color: "," !important;\n    }\n    .btn-outline-success{\n      border-color: "," !important;\n    }\n    .btn-outline-info{\n      border-color: "," !important;\n    }\n    .btn-outline-warning{\n      border-color: "," !important;\n    }\n    .btn-outline-danger{\n      border-color: "," !important;\n    }\n    .btn-outline-light{\n      border-color: "," !important;\n    }\n    .btn-outline-dark{\n      border-color: "," !important;\n    }\n\n  "],["\n    &>a {\n      text-align: center;\n    }\n    &>a:before {\n      content:'';\n      display:inline-block;\n      height:100%;\n      vertical-align:middle;\n    }\n    .btn-outline-primary{\n      border-color: "," !important;\n    }\n    .btn-outline-secondary{\n      border-color: "," !important;\n    }\n    .btn-outline-success{\n      border-color: "," !important;\n    }\n    .btn-outline-info{\n      border-color: "," !important;\n    }\n    .btn-outline-warning{\n      border-color: "," !important;\n    }\n    .btn-outline-danger{\n      border-color: "," !important;\n    }\n    .btn-outline-light{\n      border-color: "," !important;\n    }\n    .btn-outline-dark{\n      border-color: "," !important;\n    }\n\n  "])),t.colors.primary,t.colors.secondary,t.colors.success,t.colors.info,t.colors.warning,t.colors.danger,t.colors.light,t.colors.dark)}}})});
//# sourceMappingURL=widget.js.map