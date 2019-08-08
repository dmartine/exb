define(["jimu-core","jimu-ui"],function(e,t){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=645)}({2:function(t,r){t.exports=e},393:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(2),o=/\<exp((?!\<exp).)*((?!\<exp).)*\<\/exp\>/gm;t.expressionRegular=o;var i=/\<a((?!\<a).)*((?!\<a).)*\<\/a\>/gm;t.linkRegular=i;var a=/expid="(((?!\<span).)*)\"\>/m;t.expressionIdRegular=a;var s=/id="(.*)\"\starget/m;t.linkIdRegular=s;t.linkHrefRegular=/href="((?!").)*"/m,t.getDataSourceIds=function(e){return void 0===e&&(e=n.Immutable([])),n.Immutable(e.map(function(e){return e.dataSourceId}))},t.getIdsFromHtml=function(e,t){var r="LINK"===t?i:o,n="LINK"===t?s:a,u=[];if(!e)return u;var c=e.match(r);return c?(c.forEach(function(e){var t=e.match(n),r=t&&t[1];r&&u.push(r)}),u):u}},4:function(e,r){e.exports=t},645:function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),o=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e};Object.defineProperty(t,"__esModule",{value:!0});var i,a=r(2),s=r(646);!function(e){e[e.None=0]="None",e[e.Main=1]="Main",e[e.Sub=2]="Sub"}(i||(i={}));var u,c=function(e){function t(t){var r=e.call(this,t)||this;return r.showExpressionTool=function(){var e=r.props,t=e.useDataSources;return!!(e.useDataSourcesEnabled&&t&&t.length)},r.hideQuillPluginPanel=function(){var e=r.props.id;r.props.dispatch(a.appActions.widgetStatePropChange(e,"showExpression",!1)),r.props.dispatch(a.appActions.widgetStatePropChange(e,"showFormats",!1))},r.setRepeatType=function(){var e,t=r.props.repeatedDataSource;e=t?0===t.recordIndex?i.Main:i.Sub:i.None,r.setState({repeat:e})},r.hasEditingAbility=function(){var e=r.state.repeat;return e===i.None||e===i.Main},r.getStyle=function(){return a.css(u||(u=o(["\n      overflow-x: hidden;\n      overflow-y: auto;\n      word-break: break-word;\n      .hidden {\n          display: none !important;\n      }\n      &.in-builder{\n        cursor: text;\n      }\n    "],["\n      overflow-x: hidden;\n      overflow-y: auto;\n      word-break: break-word;\n      .hidden {\n          display: none !important;\n      }\n      &.in-builder{\n        cursor: text;\n      }\n    "])))},r.isEditable=function(){var e=r.state.repeat,t=r.props,n=t.isInBuilder,o=t.isInlineEditing;return n&&(e===i.None||e===i.Main)&&o},r.widgetRenderer=function(){var e=r.props,t=e.repeatedDataSource,n=e.useDataSources,o=e.useDataSourcesEnabled,i=e.intl,u=e.config;return r.isEditable()?null:a.jsx(s.default,{config:u,repeatedDataSource:t,useDataSources:o?n:void 0,intl:i})},r.builderRenderer=function(){var e=r.props,t=e.config,n=e.builderSupportModules,o=e.id,i=e.useDataSources,s=e.useDataSourcesEnabled,u=e.intl,c=r.isEditable()?n.widgetModules.WidgetInBuilder:null;return c?a.jsx(c,{config:t,widgetId:o,useDataSources:s?i:void 0,intl:u}):null},r.state={repeat:0},r}return n(t,e),t.prototype.componentDidMount=function(){this.setRepeatType();var e=this.props.id;this.props.dispatch(a.appActions.widgetStatePropChange(e,"showExpressionTool",this.showExpressionTool()))},t.prototype.componentDidUpdate=function(e){var t=this.props,r=t.useDataSources,n=t.id,o=t.isInlineEditing,i=t.appMode,s=t.useDataSourcesEnabled,u=e.useDataSources,c=e.useDataSourcesEnabled,p=e.isInlineEditing,d=e.appMode;r===u&&s===c||this.props.dispatch(a.appActions.widgetStatePropChange(n,"showExpressionTool",this.showExpressionTool())),i!==d&&i===a.AppMode.Run&&this.props.dispatch(a.appActions.setWidgetIsInlineEditingState(n,!1)),o===p||o||this.hideQuillPluginPanel()},t.prototype.render=function(){var e=this.isEditable();return a.jsx("div",{css:this.getStyle(),className:a.classNames("widget-text jimu-widget p-1",{"run-time":!e,"in-builder":e})},this.builderRenderer(),this.widgetRenderer())},t.mapExtraStateProps=function(e){return{appMode:e.appRuntimeInfo.appMode,isInBuilder:e.appContext.isInBuilder}},t}(a.BaseWidget);t.default=c},646:function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=r(2),i=r(4),a=r(393),s=function(e){function t(t){var r=e.call(this,t)||this;return r.getRecords=function(e,t){if(void 0===e&&(e={}),e&&Object.keys(e).length){var n={};return Object.keys(e).forEach(function(t){var i,a=e[t],s=null;if(a.isInherited){var u=r.props.repeatedDataSource;s=u&&u.record}else s=a&&a.getSelectedRecords()[0];n=o.lodash.assign(n,((i={})[t]=s,i))}),n}},r.getDataSoruceIdsFromExpression=function(e){var t=[];return e.parts.filter(function(e){return!!e}).forEach(function(e){(e.dataSourceId&&t.push(e.dataSourceId),e.type===o.ExpressionPartType.Function)&&e.parts.filter(function(e){return!!e}).forEach(function(e){e.dataSourceId&&t.push(e.dataSourceId)})}),t},r.isValidExpression=function(e){if(!e||!e.parts||!e.parts.length)return!1;var t=a.getDataSourceIds(r.props.useDataSources);return r.getDataSoruceIdsFromExpression(e).every(function(e){return t.indexOf(e)>-1})},r.resolveExpressionValue=function(e,t){return r.isValidExpression(e)?o.resolveExpression(e,t,r.props.intl):Promise.resolve("")},r.resolveExpressionValues=function(e){var t=r.props.config,n=t.expression,o=void 0===n?{}:n,i=t.link,a=void 0===i?{}:i,s=Object.keys(o).map(function(t){var n=o[t];return new Promise(function(o,i){r.resolveExpressionValue(n,e).then(function(e){o({id:t,val:e})}).catch(function(e){i(e)})})}),u=Object.keys(a).map(function(t){var n=a[t],o=n&&n.expression;return new Promise(function(n,i){r.resolveExpressionValue(o,e).then(function(e){n({id:t,val:e})}).catch(function(e){i(e)})})}),c=s.concat(u);Promise.all(c).then(function(e){var t=r.state.expressionValueMap;e.forEach(function(e){e&&(t=t.set(e.id,e.val))}),r.state.expressionValueMap!==t&&r.setState({expressionValueMap:t})})},r.isLoading=function(e){return!!e&&Object.keys(e).some(function(t){return e[t].status===o.DataSourceStatus.Loading})},r.getExpressionById=function(e){var t=r.props.config.expression;return t&&t[e]},r.getLinkById=function(e){var t=r.props.config.link;return t&&t[e]},r.resolveExpression=function(){var e=r.props.config.text;return e?(e=r._resolveExpression(e),e=r.resolveLinkExpression(e)):""},r._resolveExpression=function(e){var t=r.state.expressionValueMap;return e.replace(a.expressionRegular,function(e){var n=e.match(a.expressionIdRegular),o=n&&n[1];if(!o)return e;if(!r.getExpressionById(o))return e;var i=t[o];return void 0!==i?i:""})},r.resolveLinkExpression=function(e){var t=r.props.queryObject,n=r.state.expressionValueMap;return e.replace(a.linkRegular,function(e){var i=e.match(a.linkIdRegular),s=i&&i[1];if(!s)return e;var u="",c=r.getLinkById(s);return u=c&&c.expression?n[s]||"":o.urlUtils.getHrefFromLinkTo(c,t),e=e.replace(a.linkHrefRegular,'href="'+u+'"')})},r.getUseDataSourceById=function(e){var t=r.props.useDataSources;return(void 0===t?[]:t).filter(function(t){return t.dataSourceId===e})[0]},r.getDataSources=function(e){void 0===e&&(e={});var t={},n=o.DataSourceManager.getInstance();return Object.keys(e).forEach(function(e){r.getUseDataSourceById(e).isInherited||(t[e]=n.getDataSource(e))}),t},r.widgetRenderer=function(){var e=r.state.loading,t=r.resolveExpression();return o.jsx(o.React.Fragment,null,o.jsx("div",{css:i.getQuillStyle(),className:"w-100 ql-runtime",dangerouslySetInnerHTML:{__html:t}}),e&&o.jsx("div",{className:"jimu-small-loading"}))},r.onDataSourceInfoChange=function(e){var t=r.getDataSources(e),n=r.getRecords(t);r.resolveExpressionValues(n);var o=r.isLoading(e);r.setState({loading:o})},r.state={loading:!1,infos:{},expressionValueMap:o.Immutable({})},r}return n(t,e),t.prototype.componentDidMount=function(){var e,t=this.props.repeatedDataSource;t&&t.dataSourceId&&this.resolveExpressionValues(((e={})[t.dataSourceId]=t.record,e))},t.prototype.componentDidUpdate=function(){var e,t=this.props.repeatedDataSource;t&&t.dataSourceId&&this.resolveExpressionValues(((e={})[t.dataSourceId]=t.record,e))},t.prototype.render=function(){var e=this.props.useDataSources,t=void 0===e?[]:e;return o.jsx(o.React.Fragment,null,!!t.length&&o.jsx(o.MultipleDataSourceComponent,{onDataSourceInfoChange:this.onDataSourceInfoChange,useDataSources:t}),this.widgetRenderer())},t}(o.React.PureComponent);t.default=o.ReactRedux.connect(function(e){return{queryObject:e.queryObject}})(s)}})});
//# sourceMappingURL=widget.js.map