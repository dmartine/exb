define(["jimu-core/react","jimu-core","jimu-ui","jimu-for-builder"],function(e,t,n,o){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=529)}({0:function(t,n){t.exports=e},2:function(e,n){e.exports=t},28:function(e,t,n){function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var i=n(0),s=i.createElement("path",{d:"M7.42 8.84a.502.502 0 0 1 0 .71L6 10.97A3.515 3.515 0 1 1 1.03 6l1.42-1.42a.502.502 0 1 1 .71.71L1.74 6.71a2.51 2.51 0 1 0 3.55 3.55l1.42-1.42a.502.502 0 0 1 .71 0zm1.42-2.13l1.42-1.42a2.51 2.51 0 1 0-3.55-3.55L5.29 3.16a.502.502 0 1 1-.71-.71L6 1.03A3.515 3.515 0 1 1 10.97 6L9.55 7.42a.502.502 0 1 1-.71-.71zm-4.97.71l3.55-3.55a.502.502 0 0 1 .71.71L4.58 8.13a.502.502 0 0 1-.71-.71z",fill:"currentColor",fillRule:"nonzero"});function r(e){return i.createElement("svg",o({width:12,height:12,viewBox:"0 0 12 12"},e),s)}e.exports=r,r.default=r},371:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.ByUpload="BYUPLOAD",e.ByStaticUrl="BYSTATICURL",e.ByDynamicUrl="BYDYNAMICURL"}(t.ImgSourceType||(t.ImgSourceType={})),t.ScaleType={Fill:{backgroundSize:"100% 100%"},Fit:{backgroundSize:"cover",backgroundPosition:"center center"},Contain:{backgroundSize:"contain"}}},4:function(e,t){e.exports=n},529:function(e,t,n){"use strict";var o=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),i=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e};Object.defineProperty(t,"__esModule",{value:!0});var s,r=n(2),a=n(6),p=n(4),g=n(371),u=n(530),c=n(534),l=n(28),d=function(e){function t(t){var n=e.call(this,t)||this;return n.supportedTypes=r.Immutable([a.AllDataSourceTypes.FeatureLayer,a.AllDataSourceTypes.FeatureQuery]),n.settingLinkConfirm=function(e){n.props.onSettingChange({widgetId:n.props.id,config:n.props.config.setIn(["functionConfig","linkParam"],e)}),n.setState({isShowLinkSetting:!1})},n.updateStyle=function(e,t){n.props.onSettingChange({widgetId:n.props.id,config:n.props.config.setIn(["styleConfig",e],t)})},n.shapeChange=function(e){var t=r.Immutable(n.props.config.styleConfig);t=(t=t.set("shape",e)).set("borderRadius",n.props.preDefinedConfigs.shapes[e].borderRadius),n.props.onSettingChange({widgetId:n.props.id,config:n.props.config.setIn(["styleConfig"],t)})},n.altTextConfigChange=function(){var e={widgetId:n.props.id,config:n.props.config.setIn(["functionConfig","altText"],n.state.currentAltTextInput).setIn(["functionConfig","altTextExpression"],null),useDataSources:n.getUseDataSourcesWithoutFields()};n.props.onSettingChange(e)},n.toolTipConfigChange=function(){var e={widgetId:n.props.id,config:n.props.config.setIn(["functionConfig","toolTip"],n.state.currentTipInput).setIn(["functionConfig","toolTipExpression"],null),useDataSources:n.getUseDataSourcesWithoutFields()};n.props.onSettingChange(e)},n.imgSourceTypeChanged=function(e){var t=r.Immutable(n.props.config.functionConfig);t=(t=(t=t.set("imgSourceType",e)).set("srcExpression",null)).set("imageParam",n.resetImageParam(n.props.config.functionConfig.imageParam)),n.props.onSettingChange({widgetId:n.props.id,config:n.props.config.set("functionConfig",t)})},n.openSrcPopup=function(){n.setState({isSrcPopupOpen:!0,isAltTextPopupOpen:!1,isToolTipPopupOpen:!1})},n.closeSrcPopup=function(){n.setState({isSrcPopupOpen:!1})},n.openToolTipPopup=function(){n.setState({isSrcPopupOpen:!1,isAltTextPopupOpen:!1,isToolTipPopupOpen:!0})},n.closeToolTipPopup=function(){n.setState({isToolTipPopupOpen:!1})},n.openAltTextPopup=function(){n.setState({isSrcPopupOpen:!1,isAltTextPopupOpen:!0,isToolTipPopupOpen:!1})},n.closeAltTextPopup=function(){n.setState({isAltTextPopupOpen:!1})},n.getUseDataSourcesWithoutFields=function(){return n.props.useDataSources&&n.props.useDataSources[0]&&n.props.useDataSources[0].dataSourceId?r.Immutable([n.props.useDataSources[0].without("fields")]):r.Immutable([])},n.getSrcExpression=function(){var e=n.props.config&&n.props.config.functionConfig&&n.props.config.functionConfig.srcExpression&&n.props.config.functionConfig.srcExpression;return e&&e.asMutable({deep:!0})||null},n.getToolTipExpression=function(){var e=n.props.config&&n.props.config.functionConfig&&n.props.config.functionConfig.toolTipExpression&&n.props.config.functionConfig.toolTipExpression;return e&&e.asMutable({deep:!0})||null},n.getAltTextExpression=function(){var e=n.props.config&&n.props.config.functionConfig&&n.props.config.functionConfig.altTextExpression&&n.props.config.functionConfig.altTextExpression;return e&&e.asMutable({deep:!0})||null},n.onToolTipExpChange=function(e){if(e){var t=n.getSrcExpression(),o=n.getAltTextExpression(),i=n.mergeUseDataSources(t,e,o);n.props.onSettingChange({widgetId:n.props.id,config:n.props.config.setIn(["functionConfig","toolTipExpression"],e).setIn(["functionConfig","toolTip"],""),useDataSources:i}),n.setState({isToolTipPopupOpen:!1})}},n.onAltTextExpChange=function(e){if(e){var t=n.getSrcExpression(),o=n.getToolTipExpression(),i=n.mergeUseDataSources(t,o,e);n.props.onSettingChange({widgetId:n.props.id,config:n.props.config.setIn(["functionConfig","altTextExpression"],e).setIn(["functionConfig","altText"],""),useDataSources:i}),n.setState({isAltTextPopupOpen:!1})}},n.onSrcExpChange=function(e){if(e){var t=n.getToolTipExpression(),o=n.getAltTextExpression(),i=n.mergeUseDataSources(e,t,o);n.props.onSettingChange({widgetId:n.props.id,config:n.props.config.setIn(["functionConfig","srcExpression"],e).setIn(["functionConfig","imageParam"],n.resetImageParam(n.props.config.functionConfig.imageParam)),useDataSources:i}),n.setState({isSrcPopupOpen:!1})}},n.mergeUseDataSources=function(e,t,o){var i=a.expressionUtils.getUseDataSourceFromExpParts(e&&e.parts),s=a.expressionUtils.getUseDataSourceFromExpParts(t&&t.parts),r=a.expressionUtils.getUseDataSourceFromExpParts(o&&o.parts);return n.mergeUseDataSourcesByDss(i,s,r)},n.mergeUseDataSourcesByDss=function(e,t,o){var i=n.getUseDataSourcesWithoutFields(),s=a.expressionUtils.mergeUseDataSources(i,t);return s=a.expressionUtils.mergeUseDataSources(s,o),s=a.expressionUtils.mergeUseDataSources(s,e)},n.onResourceChange=function(e){var t=e;t||(t={});var o=r.Immutable(n.props.config.functionConfig);o.imageParam&&o.imageParam.cropParam&&(t.cropParam={svgViewBox:o.imageParam.cropParam.svgViewBox,svgPath:o.imageParam.cropParam.svgPath,cropShape:o.imageParam.cropParam.cropShape}),o=(o=(o=o.set("imageParam",t)).set("imgSourceType","")).set("srcExpression",null),n.props.onSettingChange({widgetId:n.props.id,config:n.props.config.set("functionConfig",o)})},n.resetImageParam=function(e){return e&&e.cropParam?{cropParam:e.cropParam}:null},n}return o(t,e),t.prototype.getStyle=function(e){return r.css(s||(s=i(["\n      .widget-setting-image {\n        font-size: 13px;\n        font-weight: lighter;\n        overflow-y: auto;\n      \n        .setting-function {\n      \n          .setting-function-item {\n            overflow: hidden;\n      \n            .setting-function-item-input {\n              width: 200px;\n            }\n          }\n        }\n\n        .border-selected {\n          border: 2px solid "," !important;\n        }\n      \n        .uploadInput {\n          position: absolute;\n          opacity: 0;\n          left: 0;\n          top: 0;\n          cursor: pointer;\n        }\n\n        .uploadFileName {\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n          opacity: 0.5;\n        }\n      \n        .uploadInput-container {\n          position: relative;\n        }\n        \n        .setting-exterior {\n      \n          .exterior-shape-item {\n            padding-bottom: 100%;\n            cursor: pointer;\n          }\n        }\n      \n        .setting-stylepicker-selected {\n          border-width: 2px !important;\n        }\n\n        .set-link-btn{\n          background-color: ",";\n        }\n        .set-link-btn:hover, .set-link-btn:hover.set-link-btn:active{\n          background-color: ",";\n        }\n\n        .set-clear-image {\n          &:focus {\n            outline: none;\n            box-shadow: none !important;\n            text-decoration: none;\n          }\n        }\n      }\n    "],["\n      .widget-setting-image {\n        font-size: 13px;\n        font-weight: lighter;\n        overflow-y: auto;\n      \n        .setting-function {\n      \n          .setting-function-item {\n            overflow: hidden;\n      \n            .setting-function-item-input {\n              width: 200px;\n            }\n          }\n        }\n\n        .border-selected {\n          border: 2px solid "," !important;\n        }\n      \n        .uploadInput {\n          position: absolute;\n          opacity: 0;\n          left: 0;\n          top: 0;\n          cursor: pointer;\n        }\n\n        .uploadFileName {\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n          opacity: 0.5;\n        }\n      \n        .uploadInput-container {\n          position: relative;\n        }\n        \n        .setting-exterior {\n      \n          .exterior-shape-item {\n            padding-bottom: 100%;\n            cursor: pointer;\n          }\n        }\n      \n        .setting-stylepicker-selected {\n          border-width: 2px !important;\n        }\n\n        .set-link-btn{\n          background-color: ",";\n        }\n        .set-link-btn:hover, .set-link-btn:hover.set-link-btn:active{\n          background-color: ",";\n        }\n\n        .set-clear-image {\n          &:focus {\n            outline: none;\n            box-shadow: none !important;\n            text-decoration: none;\n          }\n        }\n      }\n    "])),e.colors.cyans.cyan500,e.colors.grays.gray300,e.colors.grays.gray200)},t.prototype.componentWillMount=function(){this.setState({currentTipInput:this.props.config.functionConfig.toolTip,currentAltTextInput:this.props.config.functionConfig.altText,shadowOpen:!!this.props.config.styleConfig.boxShadow,isSrcPopupOpen:!1,isToolTipPopupOpen:!1,isAltTextPopupOpen:!1})},t.prototype.componentDidUpdate=function(e){if(this.props.useDataSourcesEnabled!==e.useDataSourcesEnabled){var t=this.props.useDataSourcesEnabled,n=r.Immutable(this.props.config.functionConfig);t?this.props.config.functionConfig.imgSourceType===g.ImgSourceType.ByStaticUrl&&(n=n.set("imgSourceType",g.ImgSourceType.ByDynamicUrl)):this.props.config.functionConfig.imgSourceType===g.ImgSourceType.ByDynamicUrl&&(n=n.set("imgSourceType",g.ImgSourceType.ByStaticUrl)),this.props.onSettingChange({widgetId:this.props.id,config:this.props.config.set("functionConfig",n)})}},t.prototype.render=function(){var e=this,t=null;this.props.useDataSources&&this.props.useDataSources[0]&&(t=this.props.useDataSources[0].dataSourceId);var n=this.props.useDataSources||[],o=n[0]?r.Immutable([n[0].dataSourceId]):r.Immutable([]),i=this.props.config.functionConfig.imageParam&&this.props.config.functionConfig.imageParam.originalName;return r.jsx("div",{css:this.getStyle(this.props.theme),className:"jimu-widget"},r.jsx("div",{className:"widget-setting-image"},r.jsx(a.SettingSection,null,r.jsx(a.SettingRow,null,r.jsx("div",{className:"choose-ds w-100"},r.jsx(a.DataSourceChooser,{types:this.supportedTypes,selectedDataSourceIds:r.Immutable([t]),widgetId:this.props.id})))),!this.props.useDataSourcesEnabled&&r.jsx(a.SettingSection,null,r.jsx(a.SettingRow,null,r.jsx("div",{className:"d-flex justify-content-between w-100 align-items-center"},r.jsx("label",{className:"m-0"},this.props.intl.formatMessage({id:"source",defaultMessage:c.default.source})),r.jsx("div",{style:{width:"70px"},className:"uploadFileName",title:i||this.props.intl.formatMessage({id:"noneSource",defaultMessage:c.default.noneSource})},i||this.props.intl.formatMessage({id:"noneSource",defaultMessage:c.default.noneSource})),r.jsx("div",{style:{width:"60px"}},r.jsx(a.ImageChooser,{className:"text-dark uploadInput-container d-flex justify-content-center set-link-btn",color:"secondary",widgetId:this.props.id,label:this.props.intl.formatMessage({id:"set",defaultMessage:c.default.set}),size:"sm",onChange:this.onResourceChange,imageParam:this.props.config.functionConfig.imageParam}))))),this.props.useDataSourcesEnabled&&r.jsx(a.SettingSection,null,r.jsx(a.SettingRow,null,r.jsx("div",{className:"d-flex justify-content-between w-100 align-items-start"},r.jsx("label",null,this.props.intl.formatMessage({id:"source",defaultMessage:c.default.source})))),r.jsx(a.SettingRow,null,r.jsx("div",{className:"d-flex justify-content-between w-100 align-items-center"},r.jsx("div",{className:"align-items-center d-flex"},r.jsx(p.Input,{type:"radio",onChange:function(){return e.imgSourceTypeChanged(g.ImgSourceType.ByUpload)},style:{cursor:"pointer"},checked:!this.props.config.functionConfig.imgSourceType||this.props.config.functionConfig.imgSourceType===g.ImgSourceType.ByUpload}),r.jsx("label",{className:"m-0 ml-2",style:{cursor:"pointer"},onClick:function(){return e.imgSourceTypeChanged(g.ImgSourceType.ByUpload)}},this.props.intl.formatMessage({id:"staticSource",defaultMessage:c.default.staticSource}))),r.jsx("div",{style:{width:"70px"},className:"uploadFileName",title:i||this.props.intl.formatMessage({id:"noneSource",defaultMessage:c.default.noneSource})},i||this.props.intl.formatMessage({id:"noneSource",defaultMessage:c.default.noneSource})),r.jsx("div",{style:{width:"80px",height:"30px"}},(!this.props.config.functionConfig.imgSourceType||this.props.config.functionConfig.imgSourceType===g.ImgSourceType.ByUpload)&&r.jsx(a.ImageChooser,{className:"text-dark uploadInput-container d-flex justify-content-center set-link-btn",color:"secondary",widgetId:this.props.id,label:this.props.intl.formatMessage({id:"set",defaultMessage:c.default.set}),size:"sm",disabled:this.props.config.functionConfig.imgSourceType===g.ImgSourceType.ByStaticUrl||this.props.config.functionConfig.imgSourceType===g.ImgSourceType.ByDynamicUrl,onChange:this.onResourceChange,imageParam:this.props.config.functionConfig.imageParam})))),r.jsx(a.SettingRow,null,r.jsx("div",{className:"d-flex justify-content-between w-100"},r.jsx("div",{className:"align-items-center d-flex"},r.jsx(p.Input,{type:"radio",style:{cursor:"pointer"},onChange:function(){return e.imgSourceTypeChanged(e.props.useDataSourcesEnabled?g.ImgSourceType.ByDynamicUrl:g.ImgSourceType.ByStaticUrl)},checked:this.props.config.functionConfig.imgSourceType===g.ImgSourceType.ByStaticUrl||this.props.config.functionConfig.imgSourceType===g.ImgSourceType.ByDynamicUrl}),r.jsx("label",{className:"m-0 ml-2",style:{cursor:"pointer"},onClick:function(){return e.imgSourceTypeChanged(e.props.useDataSourcesEnabled?g.ImgSourceType.ByDynamicUrl:g.ImgSourceType.ByStaticUrl)}},this.props.intl.formatMessage({id:"dynamicSource",defaultMessage:c.default.dynamicSource})))),this.props.config.functionConfig.imgSourceType===g.ImgSourceType.ByStaticUrl||this.props.config.functionConfig.imgSourceType===g.ImgSourceType.ByDynamicUrl&&r.jsx("div",{className:"d-flex justify-content-between w-100 pt-2"},r.jsx("div",null),this.props.config.functionConfig.srcExpression||this.props.config.functionConfig.imgSourceType===g.ImgSourceType.ByDynamicUrl?r.jsx("div",{style:{width:"90%",position:"relative"}},r.jsx(a.ExpressionInput,{dataSourceIds:o,onChange:this.onSrcExpChange,openExpPopup:this.openSrcPopup,expression:this.getSrcExpression(),isExpPopupOpen:this.state.isSrcPopupOpen,closeExpPopup:this.closeSrcPopup,from:[a.ExpressionInputFrom.Attribute,a.ExpressionInputFrom.Statistics,a.ExpressionInputFrom.Expression]})):r.jsx("div",{style:{width:"90%",position:"relative"}},r.jsx("div",{className:"w-100 h-100",style:{position:"absolute",opacity:.5,backgroundColor:"gray",zIndex:100}}),r.jsx(a.ExpressionInput,{dataSourceIds:o,onChange:this.onSrcExpChange,openExpPopup:this.openSrcPopup,expression:this.getSrcExpression(),isExpPopupOpen:this.state.isSrcPopupOpen,closeExpPopup:this.closeSrcPopup,from:[a.ExpressionInputFrom.Attribute,a.ExpressionInputFrom.Statistics,a.ExpressionInputFrom.Expression]}))))),r.jsx(a.SettingSection,null,r.jsx(a.SettingRow,{label:this.props.intl.formatMessage({id:"toolTip",defaultMessage:c.default.toolTip})},this.props.useDataSourcesEnabled?r.jsx("div",{style:{width:"70%",position:"relative"}},r.jsx(a.ExpressionInput,{dataSourceIds:o,onChange:this.onToolTipExpChange,openExpPopup:this.openToolTipPopup,expression:this.getToolTipExpression(),isExpPopupOpen:this.state.isToolTipPopupOpen,closeExpPopup:this.closeToolTipPopup,from:[a.ExpressionInputFrom.Static,a.ExpressionInputFrom.Attribute,a.ExpressionInputFrom.Statistics,a.ExpressionInputFrom.Expression]})):r.jsx("div",{style:{width:"70%",position:"relative"}},r.jsx(p.Input,{style:{width:"100%"},className:"float-right",value:this.state.currentTipInput,onChange:function(t){e.setState({currentTipInput:t.target.value})},onBlur:function(){e.toolTipConfigChange()},onKeyUp:function(){e.toolTipConfigChange()}}))),r.jsx(a.SettingRow,{label:this.props.intl.formatMessage({id:"altText",defaultMessage:c.default.altText})},this.props.useDataSourcesEnabled?r.jsx("div",{style:{width:"70%",position:"relative"}},r.jsx(a.ExpressionInput,{dataSourceIds:o,onChange:this.onAltTextExpChange,openExpPopup:this.openAltTextPopup,expression:this.getAltTextExpression(),isExpPopupOpen:this.state.isAltTextPopupOpen,closeExpPopup:this.closeAltTextPopup,from:[a.ExpressionInputFrom.Static,a.ExpressionInputFrom.Attribute,a.ExpressionInputFrom.Statistics,a.ExpressionInputFrom.Expression]})):r.jsx("div",{style:{width:"70%",position:"relative"}},r.jsx(p.Input,{style:{width:"100%"},className:"float-right",value:this.state.currentAltTextInput,onChange:function(t){e.setState({currentAltTextInput:t.target.value})},onBlur:function(){e.altTextConfigChange()},onKeyUp:function(){e.altTextConfigChange()}}))),r.jsx(a.SettingRow,null,r.jsx(p.Button,{className:"w-100 text-dark",color:"primary",onClick:function(){e.setState({isShowLinkSetting:!e.state.isShowLinkSetting})}},r.jsx(p.Icon,{icon:l,className:"mr-3"}),"Set link"))),r.jsx(a.SettingSection,{title:this.props.intl.formatMessage({id:"frame",defaultMessage:c.default.frame})},r.jsx(a.SettingRow,null,Object.keys(this.props.preDefinedConfigs.shapes).map(function(t,n){var o=e.props.preDefinedConfigs.shapes[t].thumbUrl;return r.jsx(p.Col,{xs:"2",key:n,className:"pl-0 pr-2 mr-1"},r.jsx("div",{className:r.classNames("border",{"border-selected setting-stylepicker-selected":!e.props.config.styleConfig.shape&&"square"===t||e.props.config.styleConfig.shape&&e.props.config.styleConfig.shape===t}),style:{position:"relative",paddingBottom:"95%",cursor:"pointer",height:"30px",width:"30px"},onClick:function(){return e.shapeChange(t)}},r.jsx("div",{className:"w-100 h-100 p-1",style:{position:"absolute"}},r.jsx("div",{className:"w-100 h-100",style:{backgroundImage:"url("+o+")",backgroundSize:"100% 100%",backgroundPosition:"center center"}}))))})),r.jsx(a.SettingRow,{label:this.props.intl.formatMessage({id:"background",defaultMessage:c.default.background})},r.jsx(a.ColorChooser,{className:"d-flex",style:{width:"40px",height:"20px"},color:this.props.config.styleConfig.backgroundColor,onChange:function(t){e.updateStyle("backgroundColor",t)}})),r.jsx(a.SettingRow,{label:this.props.intl.formatMessage({id:"border",defaultMessage:c.default.border})},r.jsx(a.BorderSetting,{value:this.props.config.styleConfig.border,onChange:function(t){e.updateStyle("border",t)}})),r.jsx(a.SettingRow,{label:this.props.intl.formatMessage({id:"corner",defaultMessage:c.default.corner})},r.jsx(a.FourSides,{sides:[p.BorderSides.TL,p.BorderSides.TR,p.BorderSides.BR,p.BorderSides.BL],value:this.props.config.styleConfig.borderRadius,onChange:function(t){return e.updateStyle("borderRadius",t)}})),r.jsx(a.SettingRow,{label:this.props.intl.formatMessage({id:"shadow",defaultMessage:c.default.shadow})},r.jsx(p.Switch,{checked:this.state.shadowOpen,onChange:function(){e.setState({shadowOpen:!e.state.shadowOpen})}})),r.jsx(p.Collapse,{isOpen:this.state.shadowOpen},r.jsx(a.BoxShadowSetting,{value:this.props.config.styleConfig.boxShadow,onChange:function(t){return e.updateStyle("boxShadow",t)}}))),this.state.isShowLinkSetting&&!r.urlUtils.getAppIdPageIdFromUrl().pageId&&r.jsx(a.LinkSettingPopup,{showDialog:this.state.isShowLinkSetting,onSettingCancel:function(){e.setState({isShowLinkSetting:!1})},onSettingConfirm:this.settingLinkConfirm,linkParam:this.props.config.functionConfig.linkParam})))},t.mapExtraStateProps=function(e){return{preDefinedConfigs:u.PreDefinedConfigs}},t}(a.BaseWidgetSetting);t.default=d},530:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={shapes:{square:{borderRadius:{number:[0],unit:"px"},thumbUrl:n(531)},capsule:{borderRadius:{number:[10,10,10,10],unit:"%"},thumbUrl:n(532)},round:{borderRadius:{number:[50,50,50,50],unit:"%"},thumbUrl:n(533)}}};t.PreDefinedConfigs=o},531:function(e,t){e.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDIwIDE0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTIuNCAoNjczNzgpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICAgIDx0aXRsZT5SZWN0YW5nbGU8L3RpdGxlPg0KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPg0KICAgIDxnIGlkPSJTeW1ib2xzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGcgaWQ9IkNvbmZpZ3VyZS1MaW5rIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjUuMDAwMDAwLCAtNjQ4LjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjRTZFQkYwIj4NCiAgICAgICAgICAgIDxnIGlkPSJTZXR0aW5nUGFuZWwiPg0KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAuMDAwMDAwLCA2MTEuMDAwMDAwKSI+DQogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDI5LjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeD0iNS41IiB5PSI4LjUiIHdpZHRoPSIxOSIgaGVpZ2h0PSIxMyI+PC9yZWN0Pg0KICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+"},532:function(e,t){e.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgdmlld0JveD0iMCAwIDIwIDIwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTIuNCAoNjczNzgpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICAgIDx0aXRsZT5SZWN0YW5nbGU8L3RpdGxlPg0KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPg0KICAgIDxnIGlkPSJTeW1ib2xzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGcgaWQ9IkNvbmZpZ3VyZS1MaW5rIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjUuMDAwMDAwLCAtNjQ1LjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjRTZFQkYwIj4NCiAgICAgICAgICAgIDxnIGlkPSJTZXR0aW5nUGFuZWwiPg0KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAuMDAwMDAwLCA2MTEuMDAwMDAwKSI+DQogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDI5LjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeD0iNDUuNSIgeT0iNS41IiB3aWR0aD0iMTkiIGhlaWdodD0iMTkiIHJ4PSI2Ij48L3JlY3Q+DQogICAgICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICA8L2c+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4="},533:function(e,t){e.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjIycHgiIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDIyIDE4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTIuNCAoNjczNzgpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICAgIDx0aXRsZT5PdmFsPC90aXRsZT4NCiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4NCiAgICA8ZyBpZD0iU3ltYm9scyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+DQogICAgICAgIDxnIGlkPSJDb25maWd1cmUtTGluayIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwNC4wMDAwMDAsIC02NDYuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNFNkVCRjAiPg0KICAgICAgICAgICAgPGcgaWQ9IlNldHRpbmdQYW5lbCI+DQogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTE2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDYxMS4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTE1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgMjkuMDAwMDAwKSI+DQogICAgICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBpZD0iT3ZhbCIgY3g9Ijk1IiBjeT0iMTUiIHJ4PSIxMCIgcnk9IjgiPjwvZWxsaXBzZT4NCiAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg=="},534:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={source:"Source",noneSource:"None",staticSource:"Static",dynamicSource:"Dynamic",set:"Set",toolTip:"Tooltip",altText:"Alt text",setLink:"Set link",frame:"Frame",background:"Background",border:"Border",corner:"Corner",shadow:"Shadow"}},6:function(e,t){e.exports=o}})});
//# sourceMappingURL=setting.js.map