define(["jimu-core","jimu-ui","jimu-ui/advanced/setting-components","jimu-arcgis","jimu-ui/advanced/data-source-selector","jimu-ui/advanced/sql-expression-builder"],(function(e,t,a,o,n,i){return function(e){var t={};function a(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,a),n.l=!0,n.exports}return a.m=e,a.c=t,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(o,n,function(t){return e[t]}.bind(null,n));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=191)}({0:function(t,a){t.exports=e},1:function(e,a){e.exports=t},191:function(e,t,a){"use strict";var o,n=this&&this.__extends||(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a])})(e,t)},function(e,t){function a(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}),i=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e};Object.defineProperty(t,"__esModule",{value:!0});var s,r=a(0),c=a(1),u=a(3),p=a(6),d=a(4),l=a(6),S=a(36),g=a(21),f=r.Immutable([l.AllDataSourceTypes.FeatureLayer,l.AllDataSourceTypes.FeatureQuery]),m=function(e){function t(t){var a=e.call(this,t)||this;return a.modalStyle={position:"absolute",top:"0",bottom:"0",width:"259px",height:"auto",borderRight:"",borderBottom:"",paddingBottom:"1px"},a.getInitConfig=function(){var e=a.props.messageWidgetId,t=r.getAppStore().getState().appStateInBuilder.appConfig,o=t.widgets[e],n=null,i=null;a.props.config.messageUseDataSource?n=a.checkAndGetInitUseDataSource(a.props.messageWidgetId,a.props.config.messageUseDataSource):o&&o.useDataSources&&o.useDataSources[0]&&1===o.useDataSources.length&&(n=!(s=t.dataSources[o.useDataSources[0].dataSourceId])||s.type!==d.ArcGISDataSourceTypes.WebMap&&s.type!==d.ArcGISDataSourceTypes.WebScene?r.Immutable({dataSourceId:o.useDataSources[0].dataSourceId,mainDataSourceId:o.useDataSources[0].mainDataSourceId,dataViewId:o.useDataSources[0].dataViewId,rootDataSourceId:o.useDataSources[0].rootDataSourceId}):null);var s,c=a.props.widgetId,u=t.widgets[c];a.props.config.actionUseDataSource?i=a.checkAndGetInitUseDataSource(a.props.widgetId,a.props.config.actionUseDataSource):u&&u.useDataSources&&u.useDataSources[0]&&1===u.useDataSources.length&&(i=!(s=t.dataSources[u.useDataSources[0].dataSourceId])||s.type!==d.ArcGISDataSourceTypes.WebMap&&s.type!==d.ArcGISDataSourceTypes.WebScene?r.Immutable({dataSourceId:u.useDataSources[0].dataSourceId,dataViewId:u.useDataSources[0].dataViewId,mainDataSourceId:u.useDataSources[0].mainDataSourceId,rootDataSourceId:u.useDataSources[0].rootDataSourceId}):null);var p=a.props.config.actionUseDataSource&&a.props.config.actionUseDataSource.dataSourceId;return(i&&i.dataSourceId)!==p?{messageUseDataSource:n,actionUseDataSource:i,sqlExprObj:null}:{messageUseDataSource:n,actionUseDataSource:i,sqlExprObj:a.props.config.sqlExprObj}},a.checkAndGetInitUseDataSource=function(e,t){var a=r.getAppStore().getState().appStateInBuilder.appConfig,o=a.widgets[e],n=null,i=!1,s=o.useDataSources&&o.useDataSources[0]&&o.useDataSources[0].dataSourceId;if(!s)return null;var c=a.dataSources[s];if(!c||c.type!==d.ArcGISDataSourceTypes.WebMap&&c.type!==d.ArcGISDataSourceTypes.WebScene||(i=!0),i){var u=!1;if(o&&o.useDataSources)for(var p=0;p<o.useDataSources.length;p++)if(o.useDataSources[p].dataSourceId===t.rootDataSourceId){u=!0;break}n=u?t:null}else{u=!1;if(o&&o.useDataSources)for(p=0;p<o.useDataSources.length;p++)if(o.useDataSources[p].dataSourceId===t.dataSourceId){u=!0;break}n=u?t:o&&o.useDataSources&&1===o.useDataSources.length?r.Immutable({dataSourceId:o.useDataSources[0].dataSourceId,mainDataSourceId:o.useDataSources[0].mainDataSourceId,dataViewId:o.useDataSources[0].dataViewId,rootDataSourceId:o.useDataSources[0].rootDataSourceId}):null}return n},a.handleTriggerLayerChange=function(e){e&&e.length>0?a.handleTriggerLayerSelected(e[0]):a.handleRemoveLayerForTriggerLayer()},a.handleActionLayerChange=function(e){e&&e.length>0?a.handleActionLayerSelected(e[0]):a.handleRemoveLayerForActionLayer()},a.handleTriggerLayerSelected=function(e){a.props.onSettingChange({actionId:a.props.actionId,config:a.props.config.set("messageUseDataSource",e)})},a.handleActionLayerSelected=function(e){a.props.onSettingChange({actionId:a.props.actionId,config:a.props.config.set("actionUseDataSource",e).set("sqlExprObj",null)})},a.handleRemoveLayerForTriggerLayer=function(){a.props.onSettingChange({actionId:a.props.actionId,config:a.props.config.set("messageUseDataSource",null)})},a.handleRemoveLayerForActionLayer=function(){a.props.onSettingChange({actionId:a.props.actionId,config:a.props.config.set("actionUseDataSource",null).set("sqlExprObj",null)})},a.showSqlExprPopup=function(){a.setState({isSqlExprShow:!0})},a.toggleSqlExprPopup=function(){a.setState({isSqlExprShow:!a.state.isSqlExprShow})},a.onSqlExprBuilderChange=function(e){a.props.onSettingChange({actionId:a.props.actionId,config:a.props.config.set("sqlExprObj",e)})},a.onMessageFieldSelected=function(e,t){a.props.onSettingChange({actionId:a.props.actionId,config:a.props.config.set("messageUseDataSource",{dataSourceId:a.props.config.messageUseDataSource.dataSourceId,mainDataSourceId:a.props.config.messageUseDataSource.mainDataSourceId,dataViewId:a.props.config.messageUseDataSource.dataViewId,rootDataSourceId:a.props.config.messageUseDataSource.rootDataSourceId,fields:e.map((function(e){return e.jimuName}))})})},a.onActionFieldSelected=function(e,t){a.props.onSettingChange({actionId:a.props.actionId,config:a.props.config.set("actionUseDataSource",{dataSourceId:a.props.config.actionUseDataSource.dataSourceId,mainDataSourceId:a.props.config.actionUseDataSource.mainDataSourceId,dataViewId:a.props.config.actionUseDataSource.dataViewId,rootDataSourceId:a.props.config.actionUseDataSource.rootDataSourceId,fields:e.map((function(e){return e.jimuName}))})})},a.swicthEnabledDataRelationShip=function(e){a.props.onSettingChange({actionId:a.props.actionId,config:a.props.config.set("enabledDataRelationShip",e)})},a.checkTrigerLayerIsSameToActionLayer=function(){return!(!a.props.config.messageUseDataSource||!a.props.config.actionUseDataSource)&&(a.props.config.messageUseDataSource.mainDataSourceId===a.props.config.actionUseDataSource.mainDataSourceId&&a.props.config.messageUseDataSource.rootDataSourceId===a.props.config.actionUseDataSource.rootDataSourceId)},a.getDsRootIdsByWidgetId=function(e){var t,a,o,n,i=null===(a=null===(t=r.getAppStore().getState())||void 0===t?void 0:t.appStateInBuilder)||void 0===a?void 0:a.appConfig,s=null===(o=null==i?void 0:i.widgets)||void 0===o?void 0:o[e],c=[],u=r.DataSourceManager.getInstance();return null===(n=null==s?void 0:s.useDataSources)||void 0===n||n.forEach((function(e){var t=u.getDataSource(e.dataSourceId);(null==t?void 0:t.type)!==d.ArcGISDataSourceTypes.WebMap&&(null==t?void 0:t.type)!==d.ArcGISDataSourceTypes.WebScene||c.push(e.dataSourceId)})),c.length>0?r.Immutable(c):void 0},a.getDsIdsByWidgetId=function(e){var t,a,o,n,i,s=null===(a=null===(t=r.getAppStore().getState())||void 0===t?void 0:t.appStateInBuilder)||void 0===a?void 0:a.appConfig,c=null===(o=null==s?void 0:s.widgets)||void 0===o?void 0:o[e];return r.Immutable(null!==(i=null===(n=null==c?void 0:c.useDataSources)||void 0===n?void 0:n.map((function(e){return e.dataSourceId})))&&void 0!==i?i:[])},a.getDsSelectorSourceData=function(e,t){var o,n,i,s=null===(n=null===(o=r.getAppStore().getState())||void 0===o?void 0:o.appStateInBuilder)||void 0===n?void 0:n.appConfig,c=null===(i=null==s?void 0:s.widgets)||void 0===i?void 0:i[e],u=!1,p=a.getDsRootIdsByWidgetId(e);return p&&0===p.length&&c&&c.useDataSources&&1===c.useDataSources.length&&(u=!0),!p&&c&&c.useDataSources&&1===c.useDataSources.length&&(u=!0),{isReadOnly:u,useDataSources:t&&t.dataSourceId?r.Immutable([t]):r.Immutable([]),fromRootDsIds:p,fromDsIds:p?void 0:a.getDsIdsByWidgetId(e)}},a.checkIsDisableDataView=function(e){var t,o,n,i;if(a.props.messageType===r.MessageType.DataRecordsSelectionChange)return!0;var s=null===(o=null===(t=r.getAppStore().getState())||void 0===t?void 0:t.appStateInBuilder)||void 0===o?void 0:o.appConfig,c=null===(n=null==s?void 0:s.widgets)||void 0===n?void 0:n[e];return!!c&&"Map"===(null===(i=null==c?void 0:c.manifest)||void 0===i?void 0:i.label)},a.modalStyle.borderRight="1px solid black",a.modalStyle.borderBottom="1px solid black",a.state={isShowLayerList:!1,currentLayerType:null,isSqlExprShow:!1},a}return n(t,e),t.prototype.componentDidMount=function(){var e=this.getInitConfig();this.props.onSettingChange({actionId:this.props.actionId,config:this.props.config.set("messageUseDataSource",e.messageUseDataSource).set("actionUseDataSource",e.actionUseDataSource).set("sqlExprObj",e.sqlExprObj)})},t.prototype.getStyle=function(e){return r.css(s||(s=i(["\n      .setting-header {\n        padding: "," "," "," ","\n      }\n\n      .deleteIcon {\n        cursor: pointer;\n        opacity: .8;\n      }\n\n      .deleteIcon:hover {\n        opacity: 1;\n      }\n\n      .sql-expr-display {\n        width: 100%;\n        height: auto;\n        min-height: 60px;\n        line-height: 25px;\n        padding: 3px 5px;\n        color: ",";\n        border: 1px solid ",";\n      }\n\n      .relate-panel-left {\n        flex: auto;\n        .action-select-chooser {\n          margin-top: ",";\n        }\n      }\n    "],["\n      .setting-header {\n        padding: "," "," "," ","\n      }\n\n      .deleteIcon {\n        cursor: pointer;\n        opacity: .8;\n      }\n\n      .deleteIcon:hover {\n        opacity: 1;\n      }\n\n      .sql-expr-display {\n        width: 100%;\n        height: auto;\n        min-height: 60px;\n        line-height: 25px;\n        padding: 3px 5px;\n        color: ",";\n        border: 1px solid ",";\n      }\n\n      .relate-panel-left {\n        flex: auto;\n        .action-select-chooser {\n          margin-top: ",";\n        }\n      }\n    "])),r.polished.rem(10),r.polished.rem(16),r.polished.rem(0),r.polished.rem(16),e.colors.palette.dark[300],e.colors.palette.light[500],r.polished.rem(12))},t.prototype.render=function(){var e,t,o=this,n=this.props.config.actionUseDataSource&&r.DataSourceManager.getInstance().getDataSource(this.props.config.actionUseDataSource.dataSourceId),i=this.props.theme,s=this.getDsSelectorSourceData(this.props.messageWidgetId,this.props.config.messageUseDataSource),d=this.getDsSelectorSourceData(this.props.widgetId,this.props.config.actionUseDataSource);return r.jsx("div",{css:this.getStyle(this.props.theme)},r.jsx(u.SettingSection,{title:this.props.intl.formatMessage({id:"mapAction_TriggerLayer",defaultMessage:g.default.mapAction_TriggerLayer})},r.jsx(l.DataSourceSelector,{types:f,useDataSources:s.useDataSources,fromRootDsIds:s.fromRootDsIds,fromDsIds:s.fromDsIds,closeDataSourceListOnChange:!0,disableRemove:function(){return s.isReadOnly},disableDataSourceList:s.isReadOnly,disableAddData:!0,hideTypeDropdown:!0,mustUseDataSource:!0,onChange:this.handleTriggerLayerChange,widgetId:this.props.messageWidgetId,disableDataView:!0,hideDataView:this.checkIsDisableDataView(this.props.messageWidgetId)})),r.jsx(u.SettingSection,{title:this.props.intl.formatMessage({id:"mapAction_ActionLayer",defaultMessage:g.default.mapAction_ActionLayer})},r.jsx(l.DataSourceSelector,{types:f,useDataSources:d.useDataSources,fromRootDsIds:d.fromRootDsIds,fromDsIds:d.fromDsIds,closeDataSourceListOnChange:!0,disableRemove:function(){return d.isReadOnly},disableDataSourceList:d.isReadOnly,disableAddData:!0,hideTypeDropdown:!0,mustUseDataSource:!0,onChange:this.handleActionLayerChange,widgetId:this.props.widgetId,hideDataView:!0})),this.props.config&&this.props.config.messageUseDataSource&&this.props.config.actionUseDataSource&&r.jsx(u.SettingSection,{title:this.props.intl.formatMessage({id:"mapAction_Conditions",defaultMessage:g.default.mapAction_Conditions})},r.jsx(u.SettingRow,{label:this.props.intl.formatMessage({id:"mapAction_RelateMessage",defaultMessage:g.default.mapAction_RelateMessage})},r.jsx(c.Switch,{checked:this.props.config.enabledDataRelationShip,onChange:function(e){o.swicthEnabledDataRelationShip(e.target.checked)}})),r.jsx(u.SettingRow,null,r.jsx(c.Collapse,{isOpen:this.props.config.enabledDataRelationShip,className:"w-100"},this.checkTrigerLayerIsSameToActionLayer()&&r.jsx("div",{className:"w-100 border p-1 mr-2"},this.props.intl.formatMessage({id:"mapAction_AutoBind",defaultMessage:g.default.mapAction_AutoBind})),!this.checkTrigerLayerIsSameToActionLayer()&&r.jsx("div",{className:"w-100 d-flex align-items-center"},r.jsx("div",{className:"d-flex flex-column relate-panel-left"},r.jsx(p.FieldSelector,{className:"w-100",useDataSources:r.Immutable([null===(e=this.props.config.messageUseDataSource)||void 0===e?void 0:e.asMutable({deep:!0})]),isDataSourceDropDownHidden:!0,placeHolder:this.props.intl.formatMessage({id:"mapAction_TriggerLayerField",defaultMessage:g.default.mapAction_TriggerLayerField}),onChange:this.onMessageFieldSelected,useDropdown:!0,isSearchInputHidden:!0,selectedFields:this.props.config.messageUseDataSource&&this.props.config.messageUseDataSource.fields?this.props.config.messageUseDataSource.fields:r.Immutable([])}),r.jsx(p.FieldSelector,{className:"w-100 action-select-chooser",placeHolder:this.props.intl.formatMessage({id:"mapAction_ActionLayerField",defaultMessage:g.default.mapAction_ActionLayerField}),useDataSources:r.Immutable([null===(t=this.props.config.actionUseDataSource)||void 0===t?void 0:t.asMutable({deep:!0})]),isDataSourceDropDownHidden:!0,onChange:this.onActionFieldSelected,useDropdown:!0,isSearchInputHidden:!0,selectedFields:this.props.config.actionUseDataSource&&this.props.config.actionUseDataSource.fields?this.props.config.actionUseDataSource.fields:r.Immutable([])})),r.jsx(c.Icon,{className:"flex-none",width:12,height:40,color:i.colors.dark[400],icon:a(76)})))),r.jsx(u.SettingRow,null,r.jsx(c.Button,{type:"link",disabled:!this.props.config.actionUseDataSource,className:"w-100 d-flex justify-content-start",onClick:this.showSqlExprPopup},r.jsx("div",{className:"w-100 text-truncate",style:{textAlign:"start"}},this.props.intl.formatMessage({id:"mapAction_MoreConditions",defaultMessage:g.default.mapAction_MoreConditions}))),this.props.config.actionUseDataSource&&r.jsx(r.DataSourceComponent,{useDataSource:this.props.config.actionUseDataSource},(function(e){return r.jsx(S.SqlExpressionBuilderPopup,{dataSource:e,mode:r.SqlExpressionMode.Simple,isOpen:o.state.isSqlExprShow,toggle:o.toggleSqlExprPopup,expression:o.props.config.sqlExprObj,onChange:function(e){o.onSqlExprBuilderChange(e)}})}))),r.jsx(u.SettingRow,null,r.jsx("div",{className:"sql-expr-display"},this.props.config.sqlExprObj&&n?r.dataSourceUtils.getArcGISSQL(this.props.config.sqlExprObj,n).displaySQL:this.props.intl.formatMessage({id:"mapAction_SetExpression",defaultMessage:g.default.mapAction_SetExpression})))))},t.defaultProps={config:r.Immutable({messageUseDataSource:null,actionUseDataSource:null,sqlExprObj:null,enabledDataRelationShip:!0})},t}(r.React.PureComponent);t.default=r.themeUtils.withTheme(m)},21:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={sourceLabel:"Source",sourceDescript:"A web map or web scene, or any combination of the two.",initialMap:"Initial map",initialMapView:"Initial view",selectMap:"Select map",setMapView:"Modify initial view",defaultView:"Default",defaultViewTip:"Initial position of the map inherited from the web map or web scene",customView:"Custom",customViewTip:"Create a new position of the map",customViewSet:"Modify",toolLabel:"Tools",options:"Options",disableScrollZoom:"Disable scroll zooming",disablePopUp:"Disable pop-up",chooseALayer:"Select a layer",dataRelationShip:"Data relationship",mapNone:"none",messageField:"Message field",mapLayout:"Tools layout",mapLayout_LargeAndMedium:"Large and medium size",mapLayout_Small:"Small size",mapAction_TriggerLayer:"Trigger data",mapAction_SetData:"Select data",mapAction_ActionLayer:"Action data",mapAction_Conditions:"Conditions",mapAction_RelateMessage:"Trigger / action connection",mapAction_TriggerLayerField:"Select a trigger field",mapAction_None:"none",mapAction_Equals:"equals",mapAction_ActionLayerField:"Select an action field",mapAction_MoreConditions:"More conditions",mapAction_SetExpression:"Please set your expression first.",mapAction_ChooseLayer:"Select data",mapAction_AutoBind:"Auto bound.",mapAction_NoLayer:"No data.",mapZoomToAction_ZoomScale:"Zoom scale",mapZoomToAction_Automatic:"Automatic",mapZoomToAction_Custom:"Custom",mapZoomToAction_TypeScale:"Type a scale"}},3:function(e,t){e.exports=a},36:function(e,t){e.exports=i},4:function(e,t){e.exports=o},6:function(e,t){e.exports=n},76:function(e,t){e.exports='<svg viewBox="0 0 12 40" xmlns="http://www.w3.org/2000/svg"><path d="M6 30v10H0v-1h5v-9h1zM3.162 18.582a.5.5 0 010 .71l-1.416 1.421a2.497 2.497 0 00-.003 3.545c.983.983 2.56.98 3.544-.003l1.42-1.42a.504.504 0 01.712.713L6 24.968a3.502 3.502 0 01-4.967 0 3.501 3.501 0 010-4.967l1.416-1.422a.504.504 0 01.713.003zm4.967-.71a.5.5 0 010 .71L4.58 22.129a.504.504 0 01-.713-.712l3.548-3.548a.504.504 0 01.713.003zm2.838-2.838a3.501 3.501 0 010 4.967l-1.42 1.419a.504.504 0 01-.713-.712l1.423-1.417a2.5 2.5 0 000-3.547 2.502 2.502 0 00-3.547 0l-1.42 1.419a.504.504 0 01-.713-.712l1.42-1.42a3.506 3.506 0 014.97.003zM6 0v10H5V1H0V0h6z" fill="#A8A8A8" fill-rule="evenodd"></path></svg>'}})}));