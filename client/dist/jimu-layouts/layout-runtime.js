define(["jimu-core","jimu-layouts/common","jimu-ui","jimu-for-builder"],function(t,e,n,o){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=361)}({1:function(e,n){e.exports=t},11:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(17);e.removeItemFromParent=function(t,e,n){var r=t.layoutId,i=t.layoutItemId;if(!n[r])return n;if(!n[r].content[i])return n;var a=n[r],s=o.Immutable(n);if(a.order&&a.order.indexOf(i)>=0){var u=[];a.order.forEach(function(t){t!==i&&u.push(t)}),s=s.setIn([r,"order"],u)}return e&&(s=s.setIn([r,"content"],s[r].content.without(i))),s},e.selectLayoutItem=function(t,e){var n=t&&t.layoutId&&t.layoutItemId?t:null;return o.lodash.defer(function(){o.getAppStore().dispatch(o.appActions.selectionChanged(n))}),e},e.disableSelectMode=function(t){o.lodash.defer(function(){o.getAppStore().dispatch(o.appActions.setSelectMode(!1))})},e.createEmptyLayoutItem=function(t,e){var n=r.getMaximumId(e[t])+1,i=o.Immutable(e),a={id:""+n};return i=i.setIn([t,"content",a.id],a),{layoutInfo:{layoutId:t,layoutItemId:a.id},layouts:i}},e.findLayoutItem=function(t,e){if(!e)return null;var n=e.layoutId,r=e.layoutItemId;return o.lodash.getValue(t,"layouts."+n+".content."+r,null)},e.getMaximumLayoutItemId=function(t){return r.getMaximumId(t)}},12:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(48);e.DEFAULT_FIX_LAYOUT_SETTING=o.lodash.assign({},{gridSize:1}),e.DEFAULT_FIX_LAYOUT_ITEM_SETTING=o.lodash.assign({},r.DEFAULT_LAYOUT_ITEM_SETTING,{lockParent:!1,autoProps:{}})},13:function(t,e,n){"use strict";var o;Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.Select="GLOBAL_SELECT_ELEMENT",t.DisableSelectMode="GLOBAL_DISABLE_SELECT_MODE"}(o=e.GlobalLayoutActions||(e.GlobalLayoutActions={})),e.selectItem=function(t){return{selection:t,type:o.Select}},e.disableSelectMode=function(){return{type:o.DisableSelectMode}}},15:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3);e.DEFAULT_FLOW_SETTING={gutter:0,style:{padding:{number:[0],unit:"px"},justifyContent:"flex-start",alignItems:"stretch",borderRadius:{number:[0],unit:o.UnitTypes.PIXEL}}},e.DEFAULT_FLOW_ITEM_SETTING={lockParent:!0,autoHeight:!0,offsetX:0,offsetY:0}},17:function(t,e,n){"use strict";var o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var r=n(1);function i(t){return"string"==typeof t&&t.length>1&&"%"===t[t.length-1]&&a(+t.slice(0,t.length-1))}function a(t){return!isNaN(parseFloat(t))&&isFinite(t)}function s(t,e){var n=e.layoutId,o=t.appConfig.layouts;if(!o[n])return{selected:!1,layoutItem:null,appMode:t.appRuntimeInfo.appMode,inSelectMode:t.appRuntimeInfo.inSelectMode,browserSizeMode:t.browserSizeMode};var i,a=o[n],s=e.layoutItemId,u=t.appRuntimeInfo.selection||{},c=a.content[s],l=!1,p=!1,d=!1;if(c&&(p=n===u.layoutId&&c.id===u.layoutItemId,d=Boolean(c.isPending),c.type===r.LayoutItemType.Widget)){var f=t.appConfig.widgets[c.widgetId];i=r.lodash.getValue(f,"manifest.name"),f&&f.manifest&&f.manifest.properties&&(l=f.manifest.properties.type===r.WidgetType.Layout||f.manifest.properties.type===r.WidgetType.Controller||f.manifest.properties.hasEmbeddedLayout)}return{selected:p,isLayoutWidget:l,widgetName:i,layoutItem:d?null:c,appMode:t.appRuntimeInfo.appMode,inSelectMode:t.appRuntimeInfo.inSelectMode,theme:t.theme,browserSizeMode:t.browserSizeMode}}function u(t,e,n,o){if(null==e[t]||"auto"===e[t])return e;return i(e[t])?"left"===t||"right"===t||"width"===t?i(n)?e.set(t,n):e.set(t,(100*+n/o.width).toFixed(4)+"%"):i(n)?e.set(t,n):e.set(t,(100*+n/o.height).toFixed(4)+"%"):i(n)?"left"===t||"right"===t||"width"===t?e.set(t,Math.round(parseFloat(""+n)*o.width/100)):e.set(t,Math.round(parseFloat(""+n)*o.height/100)):e.set(t,Math.round(+n)+"px")}e.emptyFunc=function(){},e.autoBindHandlers=function(t,e){e.forEach(function(e){t[e]&&(t[e]=t[e].bind(t))})},e.toPixelUnit=function(t){if(a(t))return t;if("string"==typeof t){var e=parseFloat(t)/100;if(/\d+vh$/.test(t))return e*(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight);if(/\d+vw$/.test(t))return e*(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)}return 0},e.getSectionInfo=function(t,e){var n=t.appConfig.sections[e];if(!n||!n.views)return null;var o=t.appRuntimeInfo.currentViewIds&&t.appRuntimeInfo.currentViewIds.find(function(t){return n.views.indexOf(t)>-1})||n.views[0];return{views:n.views,activeView:o}},e.getMaximumId=function(t){var e=-1;return t.content&&Object.keys(t.content).forEach(function(t){var n=parseInt(t,10);n>e&&(e=n)}),e},e.isPercentage=i,e.isNumber=a,e.toRatio=function(t,e){return(100*t/e).toFixed(4)+"%"},e.fromRatio=function(t,e){return parseFloat(""+t)*e/100},e.mapStateToLayoutProps=function(t,e){var n=r.utils.findLayoutId(e.layouts,t.browserSizeMode,t.appConfig.mainSizeMode),o=t.appConfig.layouts,i=!0;if(!o[n])return{layout:null,theme:t.theme,appMode:t.appRuntimeInfo.appMode,inSelectMode:t.appRuntimeInfo.inSelectMode,mainSizeMode:t.appConfig.mainSizeMode,browserSizeMode:t.browserSizeMode};if(!t.appRuntimeInfo.draggingWidget&&t.appRuntimeInfo.selection||t.appRuntimeInfo.draggingWidget&&t.appRuntimeInfo.draggingWidget.layoutInfo){var a=t.appRuntimeInfo.draggingWidget&&t.appRuntimeInfo.draggingWidget.layoutInfo||t.appRuntimeInfo.selection,s=o[a.layoutId];if(s){var u=r.lodash.getValue(s,"content."+a.layoutItemId),c=r.lodash.getValue(u,"setting.lockParent",!1);(s.type===r.LayoutType.FlowLayout||c)&&(i=a.layoutId===n);var l=r.appConfigUtils.getWidgetIdThatUseTheLayoutId(t.appConfig,n);l&&t.appConfig.widgets[l].manifest.properties.type!==r.WidgetType.Layout&&(i=Object.keys(e.layouts).some(function(t){return e.layouts[t]===s.id}))}}return{canDrop:i,appMode:t.appRuntimeInfo.appMode,inSelectMode:t.appRuntimeInfo.inSelectMode,layout:o[n],theme:t.theme,draggingWidgetInfo:t.appRuntimeInfo.draggingWidget,mainSizeMode:t.appConfig.mainSizeMode,browserSizeMode:t.browserSizeMode}},e.mapStateToLayoutItemProps=s,e.getActiveLayout=function(t){var e,n;t||(t=r.getAppStore().getState().appStateInBuilder),e=t.appRuntimeInfo,n=t.appConfig;var o=e.activeLayout,i=e.currentDialogId,a=e.currentPageId;if(o)return o;var s=void 0;if(a)if(n.pages[a])s=n.pages[a].layout;else{var u=Object.keys(n.pages);s=n.pages[u[0]].layout}else s=i?n.dialogs[i].layout:n.pages.default.layout;return s},e.mapStateToWidgetProps=function(t,e){var n,i,a=s(t,e),u=!1,c=!1;if(a.layoutItem&&a.layoutItem.widgetId){var l=t.appConfig.widgets[a.layoutItem.widgetId];u=!0===r.lodash.getValue(l,"manifest.properties.supportInlineEditing"),c=!0===r.lodash.getValue(l,"manifest.properties.supportRepeat"),n=t.widgetsRuntimeInfo[a.layoutItem.widgetId],i=t.widgetsState[a.layoutItem.widgetId]}return o({},a,{supportInlineEditing:u,supportRepeat:c,runtimeInfo:n,widgetState:i})},e.snapToGridSize=function(t,e){return Math.round(t/e)*e},e.removePositionRelatedStyle=function(t){return["height","width","order","flexGrow","flexShrink","alignSelf"].forEach(function(e){t[e]&&delete t[e]}),t},e.replaceBoundingBox=function(t,e,n){if(!t)return r.Immutable({left:i(e.left)?e.left:Math.round(e.left)+"px",top:i(e.top)?e.top:Math.round(e.top)+"px",width:i(e.width)?e.width:Math.round(e.width)+"px",height:i(e.height)?e.height:Math.round(e.height)+"px"});var o=t;return["left","right","top","bottom","width","height"].forEach(function(t){null!=o[t]&&(o=u(t,o,e[t],n))}),o},e.updateBoundingBoxProp=u,e.generateBBoxStyle=function(t,e){var n={},o=e&&e.autoProps||{};return["left","right","top","bottom","width","height"].forEach(function(e){void 0!==t[e]&&!0!==o[e]&&(n[e]=t[e])}),n},e.generateResizingBBoxStyle=function(t,e,n){var o={};o.left=t.left+n.dx,o.width=t.width+n.dw;var r=e.right-t.right;0===n.dw?o.right=r-n.dx:0===n.dx?o.right=r-n.dw:o.right=r,o.top=t.top+n.dy,o.height=t.height+n.dh;var i=e.bottom-t.bottom;return 0===n.dh?o.bottom=i-n.dy:0===n.dy?o.bottom=i-n.dh:o.bottom=i,o},e.relativeClientRect=function(t,e){return{left:t.left-e.left,top:t.top-e.top,right:t.right,bottom:t.bottom,width:t.width,height:t.height,id:null}},e.findContainerWidgetId=function(t,e){var n,o=t.widgets||{};return Object.keys(o).some(function(o){var r=t.widgets[o];return Object.keys(r.layouts||[]).some(function(t){var i=r.layouts[t];return Object.keys(i).some(function(t){if(i[t]===e)return n=o,!0})})}),n},e.getBuilderThemeVariables=function(){var t=window.parent;if(t&&t.jimuConfig&&t.jimuConfig.isBuilder)return t._appState.theme},e.parseTranslateCoords=function(t){var e=0,n=0;if(t&&0===t.indexOf("translate(")){var o=t.substring("translate(".length).split(",");o.length>1&&(e=parseFloat(o[0]),n=parseFloat(o[1]))}return{x:e,y:n}};var c={SMALL:54,MEDIUM:69,LARGE:84};e.getIconSize=function(t){return c[t]}},2:function(t,n){t.exports=e},3:function(t,e){t.exports=n},328:function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),a=n(3),s=n(362),u=n(55),c=n(12),l=function(t){function e(e){var n=t.call(this,e)||this,o=i.ExtensionManager.getInstance().getExtensions(""+i.extensionSpec.ExtensionPoints.LayoutTransformer);if(o&&o.length>0){var r=o.find(function(t){return t.layoutType===n.props.layout.type});n.layoutTransform=i.lodash.getValue(r,"transformLayout")}return n}return o(e,t),e.prototype.render=function(){var t=this,e=this.props,n=e.layout,o=e.layouts,u=e.browserSizeMode,l=e.ignoreMinHeight,p=e.minHeight,d=e.className,f=e.style;if(n){var y,h=n,g=!1;if(o[u]!==n.id&&this.layoutTransform)Object.keys(o).some(function(t){if(o[t]===n.id)return y=t,!0}),h=this.layoutTransform(n,y,u),g=!0;var m=i.lodash.assign({},c.DEFAULT_FIX_LAYOUT_SETTING,h.setting),v=h.order||[],x=i.classNames("fixed-layout d-flex",d);return i.React.createElement("div",{className:x,style:r({position:"relative",height:"auto",minHeight:l?"none":p},f,a.styleUtils.toCSSStyle(m.style),{width:"100%"}),"data-layoutid":h.id},v.map(function(e,n){return i.React.createElement(s.default,{key:n,index:n,layoutId:h.id,layoutItemId:e,onClick:t.props.onItemClick,transformedBBox:g?h.content[e].bbox:null})}))}},e}(i.React.PureComponent);e.default=i.ReactRedux.connect(u.mapStateToFixedLayoutProps)(l)},361:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(328);e.LayoutViewer=o.default;var r=n(63);e.WidgetRenderer=r.default;var i=n(56);e.WidgetIconRenderer=i.default;var a=n(64);e.SectionRenderer=a.default;var s=n(363);e.PageRenderer=s.default;var u=n(65);e.LayoutEntry=u.default},362:function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),a=n(3),s=n(12),u=n(2),c=n(63),l=n(64),p=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.render=function(){var t=this.props,e=t.layoutItem,n=t.layoutId,o=t.transformedBBox,p=t.widgetName,d=t.index;if(!e)return null;var f,y=i.lodash.assign({},s.DEFAULT_FIX_LAYOUT_ITEM_SETTING,e.setting),h="row"===p;if(e.type===i.LayoutItemType.Widget)f=c.default;else{if(e.type!==i.LayoutItemType.Section)return null;f=l.default}var g=o||e.bbox,m=u.generateBBoxStyle(g,y);return i.React.createElement(f,{style:r({position:"absolute"},a.styleUtils.toCSSStyle(y.style),m,{height:h?"auto":m.height,zIndex:d}),onClick:this.props.onClick,layoutId:n,layoutItemId:e.id})},e}(i.React.PureComponent);e.default=i.ReactRedux.connect(u.mapStateToLayoutItemProps)(p)},363:function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),i=n(58),a=n(328),s=n(61),u=n(364),c=n(2),l=n(65);c.registerLayoutViewer(r.LayoutType.FixedLayout,a.default),c.registerLayoutViewer(r.LayoutType.FlowLayout,u.default);var p=function(t){function e(e){var n=t.call(this,e)||this;return r.ExtensionManager.getInstance().registerExtension({epName:r.extensionSpec.ExtensionPoints.ReduxStore,extension:new i.default}),r.ExtensionManager.getInstance().registerExtension({epName:r.extensionSpec.ExtensionPoints.LayoutTransformer,extension:new s.FixedLayoutTransformer}),n}return o(e,t),e.prototype.render=function(){var t,e=this,n=this.props,o=n.renderedPages,i=n.pages,a=n.theme,s="100%";Object.keys(o).some(function(e){if(o[e])return t=e,!0});var u=i[t]||{};u&&!isNaN(+u.width)&&(s=+u.width);var c={width:s,margin:"0 auto",minHeight:"100%",height:u&&u.height,backgroundColor:u&&u.backgroundColor};return r.jsx("div",{className:"page-renderer d-flex flex-column",css:c},this.renderHeader(),Object.keys(o).map(function(t){return e.renderPageBody(t,a)}),this.renderFooter())},e.prototype.renderHeader=function(){if(!this.props.header)return null;var t=this.props,e=t.header,n=t.headerVisible,o=t.browserSizeMode,i=t.mainSizeMode,a=e.height[o]||e.height[i]||50,s=d(e),u={display:n?"flex":"none",width:"100%",height:+a,overflow:"hidden",backgroundColor:e.backgroundColor||"transparent"};return r.jsx("div",{className:"header",style:u},r.jsx(l.default,{layouts:s,className:"w-100 flex-grow-1"}))},e.prototype.renderFooter=function(){if(!this.props.footer)return null;var t=this.props,e=t.footer,n=t.footerVisible,o=t.browserSizeMode,i=t.mainSizeMode,a=e.height[o]||e.height[i]||50,s=d(e),u={display:n?"flex":"none",width:"100%",height:+a,overflow:"hidden",backgroundColor:e.backgroundColor||"transparent"};return r.jsx("div",{className:"footer",css:u},r.jsx(l.default,{layouts:s,className:"w-100 flex-grow-1"}))},e.prototype.renderPageBody=function(t,e){var n=this.props,o=n.renderedPages,i=n.pages[t];if(i){var a,s=d(i),u=!!o[t];return i.mode!==r.PageMode.FitWindow&&i.maxWidth>0&&(a=i.maxWidth),r.jsx(c.PageContext.Provider,{key:i.id,value:{maxWidth:a,viewOnly:!0}},r.jsx("div",{key:t,id:i.id,"data-pageid":i.id,className:"page flex-grow-1",style:{display:u?"flex":"none",backgroundColor:i.bodyBackgroundColor||"transparent"}},r.jsx(l.default,{layouts:s,className:"w-100 flex-grow-1",style:{margin:"0 auto",backgroundColor:"transparent"}})))}},e.displayName="RuntimePageRenderer",e}(r.React.PureComponent);function d(t){return t?t.layout:null}e.default=r.ReactRedux.connect(function(t,e){return{pages:t.appConfig.pages,header:t.appConfig.header,headerVisible:!!t.appConfig.pages[e.pageId].header,footer:t.appConfig.footer,footerVisible:!!t.appConfig.pages[e.pageId].footer,appMode:t.appRuntimeInfo.appMode,browserSizeMode:t.browserSizeMode,mainSizeMode:t.appConfig.mainSizeMode,theme:t.theme}})(p)},364:function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),a=n(3),s=n(365),u=n(15),c=n(2),l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype._createItem=function(t,e,n){var o=this.props.layout;return i.React.createElement(s.default,{key:e,index:e,gutter:n.gutter,layoutId:o.id,layoutItemId:t,onClick:this.props.onItemClick})},e.prototype.render=function(){var t=this,e=this.props,n=e.layout,o=e.className,s=e.style,c=n.order||[],l=i.lodash.assign({},u.DEFAULT_FLOW_SETTING,n.setting),p=r({},s,a.styleUtils.toCSSStyle(l.style),{position:"relative",overflow:"auto"}),d=i.classNames("layout flow-layout d-flex flex-column align-items-center w-100",o);return i.React.createElement("div",{className:d,style:p,"data-layoutid":n.id},c.map(function(e,n){return t._createItem(e,n,l)}))},e}(i.React.PureComponent);e.default=i.ReactRedux.connect(c.mapStateToLayoutProps)(l)},365:function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),a=n(3),s=n(63),u=n(64),c=n(15),l=n(62),p=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.render=function(){var t=this.props,e=t.layoutId,n=t.index,o=t.gutter,l=t.layoutItem,p=t.onClick,d=t.isEmpty;if(!l||d)return null;var f,y=l.bbox||{},h=i.classNames("flow-layout-item","d-flex"),g=i.lodash.assign({},c.DEFAULT_FLOW_ITEM_SETTING,l.setting),m=g.autoHeight,v=r({},a.styleUtils.toCSSStyle(g.style),{marginTop:n>0?o:"unset",height:m?"auto":y.height,width:(g.width||100)+"%",flexShrink:0});if((g.offsetX||g.offsetY)&&(v.transform="translate("+(g.offsetX||0)+"px, "+(g.offsetY||0)+"px)"),l.type===i.LayoutItemType.Widget)f=s.default;else{if(l.type!==i.LayoutItemType.Section)return null;f=u.default}return i.React.createElement(f,{style:v,layoutId:e,layoutItemId:l.id,isInSection:l.type===i.LayoutItemType.Section,onClick:p,className:h})},e}(i.React.PureComponent);e.default=i.ReactRedux.connect(l.mapStateToFlowItemProps)(p)},48:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.DEFAULT_LAYOUT_ITEM_SETTING={order:0}},5:function(t,e){t.exports=o},55:function(t,e,n){"use strict";var o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(1),a=n(12),s=n(11);function u(t,e){var n=e,a=t.order;if(!a||0===a.length)return t;var s=i.Immutable(t),u=[];a.forEach(function(e){u.push(o({id:e},d(t.content[e].bbox,n,800)))}),u.sort(l);for(var f=[u[0]],y=function(t){var e=u[t];f.some(function(t){if(p(t,e))return t.content||(t.content=[]),t.content.push(o({},e)),!0})||f.push(e)},h=1;h<u.length;h++)y(h);var g=0,m=[];return f.forEach(function(t){var e=0;c(t,n),t.y<g&&(e=g-t.y,t.y=g),g=t.y+t.h,s=s.setIn(["content",t.id,"bbox"],{left:r.toRatio(t.x,n),top:t.y+"px",width:r.toRatio(t.w,n),height:t.h+"px"}).setIn(["content",t.id,"setting","autoProps","width"],!1),m.push(t.id),t.content&&t.content.forEach(function(o){c(o,n),e>0&&(o.y+=e),s=s.setIn(["content",t.id,"bbox"],{left:r.toRatio(t.x,n),top:t.y+"px",width:r.toRatio(t.w,n),height:t.h+"px"}).setIn(["content",t.id,"setting","autoProps","width"],!1),m.push(o.id)})}),s=s.set("order",m)}function c(t,e,n){t.x>e&&(n?t.x=e-t.w:(t.x=0,t.y+=t.h)),t.x<0&&(t.x=0),t.x+t.w>e&&(t.w<e?t.x=e-t.w:(t.w=e,t.x=0))}function l(t,e){return t.y!==e.y?t.y>e.y?1:-1:t.x!==e.x?t.x>e.x?1:-1:0}function p(t,e){return t.x<=e.x&&t.x+t.w>e.x+e.w&&t.y<=e.y&&t.y+t.h>e.y+e.h}function d(t,e,n){var o={},i=0,a=0,s=e,u=.2*n;return t&&(["left","right","top","bottom","width","height"].forEach(function(i){if(void 0!==t[i]&&"auto"!==t[i]){var a=["left","right","width"].indexOf(i)>=0?e:n;o[i]=r.isPercentage(t[i])?r.fromRatio(t[i],a):parseFloat(t[i])}}),void 0!==o.left&&(i=o.left),void 0!==o.width?(s=o.width,void 0===o.left&&void 0!==o.right&&(i=e-o.right-s)):s=e-(o.left||0)-(o.right||0),void 0!==o.top&&(a=o.top),void 0!==o.height?(u=o.height,void 0===o.top&&void 0!==o.bottom&&(a=n-o.bottom-u)):void 0!==o.top&&void 0!==o.bottom&&(u=n-o.top-o.bottom)),{x:i,y:a,w:s,h:u}}e.mapStateToFixedLayoutProps=function(t,e){var n=r.mapStateToLayoutProps(t,e),u=n.layout,c=0;return u.order&&u.order.length>0&&u.order.forEach(function(e){var n=s.findLayoutItem(t.appConfig,{layoutId:u.id,layoutItemId:e}),o=n.bbox,l=i.lodash.assign({},a.DEFAULT_FIX_LAYOUT_ITEM_SETTING,n.setting).autoProps;if(!r.isPercentage(o.top)&&!0!==l.top&&!r.isPercentage(o.height)&&!0!==l.height){var p=parseFloat(o.top),d=parseFloat(o.height);if(!isNaN(p)&&!isNaN(d)){var f=p+d;c=c<f?f:c}}}),o({minHeight:c},n)},e.fixedLayoutTransform=function(t,e,n){var o=i.utils.getSizeModeWidth(e),r=i.utils.getSizeModeWidth(n);return o<r?t:u(t,r)},e.autoResponseToDevice=u,e.intersects=function(t,e){var n=Math.max(t.x,e.x),o=Math.min(t.x+t.w,e.x+e.w),r=Math.max(t.y,e.y),i=Math.min(t.y+t.h,e.y+e.h);return n<o&&r<i},e.contains=p,e.mergePos=function(t,e){var n=Math.min(t.x,e.x),o=Math.min(t.y,e.y);return{x:n,y:o,w:Math.max(t.x+t.w,e.x+e.w)-n,h:Math.max(t.y+t.h,e.y+e.h)-o}},e.getAbsolutePos=d},56:function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),a=n(8),s=n(57),u=n(3),c={displayMode:a.WidgetDisplayMode.Icon,icon:{size:a.IconTextSize.Medium,shape:"rectangle",showText:!1}},l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._onClick=function(t){t.stopPropagation(),e.props.onClick&&e.props.onClick(t,e.props.layoutItem.widgetId)},e.genarateIconTextProps=function(){var t=e.props,n=t.widgetJson,o=t.style,r=t.className,a=t.itemDisplaySetting,s=t.active,u=t.appMode,l=window.jimuConfig.isInBuilder&&u===i.AppMode.Design&&s,p=(a||c).icon||c.icon,d=p.size,f=p.shape,y=p.showText;return{style:o,className:i.classNames("layout-widget d-flex flex-column align-items-center",r),active:!l&&s,selected:l,size:d,iconText:{text:{show:y,text:n.label},image:{src:n.icon,shape:f}}}},e}return o(e,t),e.prototype.render=function(){return this.props.widgetJson?i.React.createElement(s.IconText,r({},this.genarateIconTextProps(),{onMouseEnter:this.props.onMouseEnter,onMouseLeave:this.props.onMouseLeave,onClick:this._onClick})):i.React.createElement(u.Loading,null)},e.defaultProps={onMouseEnter:function(){},onMouseLeave:function(){},onClick:function(){}},e}(i.React.PureComponent);e.default=i.ReactRedux.connect(function(t,e){var n=e.layoutItem;return{widgetJson:t.appConfig.widgets[n.widgetId],appMode:t.appRuntimeInfo.appMode}})(l)},57:function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),r=this&&this.__makeTemplateObject||function(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t};Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),a=n(8),s=n(2),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.getStyle=function(){var t=e.props,n=t.size,o=t.theme,u=t.iconText.text.show,l=o?o.colors.cyans.cyan100:"",p=s.getIconSize(n),d=23;n===a.IconTextSize.Medium?d=28:n===a.IconTextSize.Large&&(d=29);var f=u?p:p-d,y=14;return n===a.IconTextSize.Medium?y=16:n===a.IconTextSize.Large&&(y=18),i.css(c||(c=r(["\n      margin: 2px;\n      display: flex;\n      align-items:center;\n      flex-direction: column;\n      justify-content: center;\n      min-width: ","!important;\n      height:  ",";\n      cursor: pointer;\n      &.select {\n        outline: 2px "," dashed;\n      }\n      .text-truncate {\n        width: ",";\n        > span {\n          font-size: ",";\n        }\n      }\n    "],["\n      margin: 2px;\n      display: flex;\n      align-items:center;\n      flex-direction: column;\n      justify-content: center;\n      min-width: ","!important;\n      height:  ",";\n      cursor: pointer;\n      &.select {\n        outline: 2px "," dashed;\n      }\n      .text-truncate {\n        width: ",";\n        > span {\n          font-size: ",";\n        }\n      }\n    "])),i.polished.rem(p),i.polished.rem(f),l,i.polished.rem(p),i.polished.rem(y))},e}return o(e,t),e.prototype.render=function(){var t=this.props,e=t.size,n=t.iconText,o=n.text,r=o.show,a=o.text,u=n.image,c=u.src,l=u.shape,d=t.onClick,f=t.style,y=t.className,h=t.active,g=t.selected,m=t.onMouseEnter,v=t.onMouseLeave,x=t.theme,_=s.getIconSize(e),I=.55*_,w=.55*_,b=x?x.colors.primary:"",M=x?x.colors.indigos.indigo500:"";return i.jsx("div",{style:f,css:this.getStyle(),onClick:d,className:i.classNames({select:g},y),onMouseEnter:m,onMouseLeave:v},i.jsx(p,{width:w,height:I,src:c,shape:l,color:b,active:h,activeColor:M}),r&&i.jsx("div",{className:"mt-1 text-center text-truncate widget-card-name",title:a},i.jsx("span",{className:"text-capitalize",title:a},a)))},e.defaultProps={size:a.IconTextSize.Medium,iconText:{text:{text:""},image:{}},onClick:function(){},onMouseEnter:function(){},onMouseLeave:function(){}},e}(i.React.PureComponent);e._IconText=u,e.IconText=i.themeUtils.withTheme(u);var c,l,p=function(t){var e=t.src,n=t.shape,o=t.color,a=t.activeColor,s=t.width,u=t.height,c=t.className,p=t.active;return i.jsx("div",{css:function(t,e){return i.css(l||(l=r(["\n  width: 100%;\n  height: 100%;\n  background-color: ",";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  box-shadow: 0 1px 0.5px rgba(0,0,0,0.3), 0 2px 2px rgba(0,0,0,0.2);\n  transition: margin ease-in 0.1s;\n  user-select: none;\n  position: relative;\n  text-align: center;\n  cursor: pointer;\n  &.rectangle {\n    border-radius: 3px;\n  }\n  &.circle {\n    border-radius: 50%;\n  }\n  &.active {\n    background-color: ",";\n  }\n  &:hover {\n    background-color: ",";\n  }\n  img {\n    width: 60%;\n    height: 60%;\n  }\n"],["\n  width: 100%;\n  height: 100%;\n  background-color: ",";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  box-shadow: 0 1px 0.5px rgba(0,0,0,0.3), 0 2px 2px rgba(0,0,0,0.2);\n  transition: margin ease-in 0.1s;\n  user-select: none;\n  position: relative;\n  text-align: center;\n  cursor: pointer;\n  &.rectangle {\n    border-radius: 3px;\n  }\n  &.circle {\n    border-radius: 50%;\n  }\n  &.active {\n    background-color: ",";\n  }\n  &:hover {\n    background-color: ",";\n  }\n  img {\n    width: 60%;\n    height: 60%;\n  }\n"])),t,e,e)}(o,a),className:i.classNames({rectangle:"rectangle"===n},{circle:"circle"===n},{active:p},"shape-image",c),style:{width:s,height:u}},i.jsx("img",{src:e}))}},58:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(59),r=n(13),i=function(){function t(){this.id="global-layout-redux-store-extension"}return t.prototype.getActions=function(){return[r.GlobalLayoutActions.Select,r.GlobalLayoutActions.DisableSelectMode]},t.prototype.getInitLocalState=function(){return{default:{0:{id:"0",pos:{x:0,y:0,w:100,h:100},type:0}}}},t.prototype.getReducer=function(){return o.globalLayoutReducer},t.prototype.getStoreKey=function(){return"appConfig.layouts"},t}();e.default=i},59:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(60),i=n(13),a=o.Immutable({default:{}});e.globalLayoutReducer=function(t,e){switch(void 0===t&&(t=a),e.type){case i.GlobalLayoutActions.Select:return r.selectElement(e.selection,t);case i.GlobalLayoutActions.DisableSelectMode:return r.disableSelectMode(t);default:return t}}},60:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(11);e.selectElement=function(t,e){return o.selectLayoutItem(t,e)},e.disableSelectMode=function(t){return o.disableSelectMode(t)}},61:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(5),i=n(2),a=function(){function t(){this.id="fixed-layout-transformer",this.layoutType=o.LayoutType.FixedLayout}return t.prototype.transformLayout=function(t,e,n){return t},t.prototype.transformLayoutItem=function(t,e,n,a,s,u){var c=r.getAppConfigAction().appConfig.layouts[a],l=t;if(u===o.BrowserSizeMode.Small&&c.order&&c.order.length>0){var p=c.content[c.order[c.order.length-1]],d=o.Immutable(p.bbox),f=50;i.isPercentage(d.width)?i.isPercentage(d.height)||(f=parseFloat(d.height)/2):f=parseFloat(d.width)/2,d=i.isPercentage(d.left)?d.set("left",parseFloat(d.left)+5+"%"):d.set("left",parseFloat(d.left)+f+"px"),l=l.set("bbox",d).setIn(["setting","autoProps"],o.lodash.getValue(p,"setting.autoProps",{}))}return{index:e,item:l}},t}();e.FixedLayoutTransformer=a},62:function(t,e,n){"use strict";var o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),i=n(2);e.mapStateToFlowItemProps=function(t,e){var n=i.mapStateToLayoutItemProps(t,e),a=!0,s=n.layoutItem,u=n.browserSizeMode,c=s.widgetId,l=t.appConfig.widgets[c],p=r.utils.findLayoutId(l.layouts[r.DEFAULT_EMBED_LAYOUT_NAME],u,t.appConfig.mainSizeMode),d=t.appConfig.layouts[p];return d&&Object.keys(d.content||[]).length>0&&Object.keys(d.content||[]).some(function(t){if(!d.content[t].isPending)return a=!1,!0}),o({isEmpty:a},n)}},63:function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),r=this&&this.__makeTemplateObject||function(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t},i=this&&this.__assign||function(){return(i=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var a,s,u=n(1),c=n(2),l=n(3),p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._onClick=function(t){e.props.onClick&&e.props.onClick(t,e.props.layoutItem.widgetId)},e}return o(e,t),e.prototype.componentDidMount=function(){this.props.layoutItem.widgetId&&u.WidgetManager.getInstance().loadWidgetClass(this.props.layoutItem.widgetId)},e.prototype.componentDidUpdate=function(){this.props.layoutItem.widgetId&&(!this.props.runtimeInfo||!this.props.runtimeInfo.isClassLoaded)&&u.WidgetManager.getInstance().loadWidgetClass(this.props.layoutItem.widgetId)},e.prototype.render=function(){var t=this.props,e=t.appMode,n=t.layoutItem,o=t.style,c=t.className,p={};n.setting&&n.setting.style&&(p=l.styleUtils.toCSSStyle(n.setting.style));var d=u.css(a||(a=r(["-webkit-overflow-scrolling: touch;"],["-webkit-overflow-scrolling: touch;"])));if(n.widgetId){var f=u.WidgetManager.getInstance().getWidgetClass(n.widgetId);return f?u.jsx("div",{className:u.classNames("layout-widget",c),css:u.css(s||(s=r(["\n              ","\n            "],["\n              ","\n            "])),"app-loader"===n.widgetId?d:""),style:i({},p,o),"data-widgetid":n.widgetId,onClick:this._onClick},u.jsx(u.ErrorBoundary,null,u.jsx(f,null))):u.jsx("div",{className:u.classNames("layout-widget",c),style:i({},p,o)})}return e!==u.AppMode.Run?u.jsx("div",{className:"layout-widget w-100 d-flex justify-content-center align-items-center"}):null},e}(u.React.PureComponent);e.default=u.ReactRedux.connect(c.mapStateToWidgetProps)(p)},64:function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),a=n(2),s=n(3),u=n(65),c=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.render=function(){var t=this.props,e=t.layoutId,n=t.layoutItem,o=t.layoutsOfActiveView,a=t.className,c=t.style,l=n.sectionId;if(!o)return null;var p={};return n.setting&&n.setting.style&&(p=s.styleUtils.toCSSStyle(n.setting.style)),i.jsx("div",{className:i.classNames("section-layout d-flex",a),"data-sectionid":l,"data-layoutitemid":n.id,"data-layoutid":e,style:r({},p,c)},i.jsx(u.default,{layouts:o,isInSection:!0,className:"w-100"}))},e}(i.React.PureComponent);e.SectionRenderer=c;e.default=i.ReactRedux.connect(function(t,e){var n=a.mapStateToLayoutItemProps(t,e),o=a.getSectionInfo(t,n.layoutItem.sectionId),i=o.activeView,s=t.appConfig.views[i].layout;return r({},n,o,{layoutsOfActiveView:s})})(c)},65:function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),a=n(2),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.render=function(){var t=this.props.layout;if(!t)return null;var e=a.findLayoutViewer(t.type||i.LayoutType.FlowLayout);return e?i.React.createElement(e,r({},this.props)):null},e}(i.React.PureComponent);e.default=i.ReactRedux.connect(a.mapStateToLayoutProps)(s)},8:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.Small="SMALL",t.Medium="MEDIUM",t.Large="LARGE"}(e.IconTextSize||(e.IconTextSize={})),function(t){t.Normal="NORMAL",t.Icon="ICON",t.IconText="ICON_TEXT",t.Custom="CUSTOM"}(e.WidgetDisplayMode||(e.WidgetDisplayMode={})),function(t){t[t.BringForward=0]="BringForward",t[t.SendBackward=1]="SendBackward",t[t.BringToFront=2]="BringToFront",t[t.SendToBack=3]="SendToBack"}(e.OrderAdjustType||(e.OrderAdjustType={}))}})});
//# sourceMappingURL=layout-runtime.js.map