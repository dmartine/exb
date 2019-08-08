define(["jimu-core"],function(e){return function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=710)}({2:function(t,r){t.exports=e},710:function(e,t,r){"use strict";var a=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function a(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(a.prototype=r.prototype,new a)}}();Object.defineProperty(t,"__esModule",{value:!0});var n=r(2),o=r(2),u=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={dataSource:null,query:null,records:[],queryState:n.DataSourceStatus.Unloaded},t.cityNameRef=n.React.createRef(),t.query=function(){if(t.isDsConfigured()){var e=t.props.useDataSources[0].fields[0],r=t.cityNameRef.current&&t.cityNameRef.current.value?e+" like '%"+t.cityNameRef.current.value+"%'":"1=1",a=t.props.useDataSources.find(function(e){return e.isInherited}).dataSourceId;if(t.props.repeatedDataSource&&a){var n=(Array.isArray(t.props.repeatedDataSource)?t.props.repeatedDataSource:[t.props.repeatedDataSource]).find(function(e){return e.dataSourceId===a});n&&n.record&&(r=r+" and st = '"+n.record.getData().state_abbr+"'")}t.setState({query:{where:r,outFields:t.props.useDataSources[0].fields,resultRecordCount:3}})}},t.isDsConfigured=function(){return!(!t.props.useDataSources||2!==t.props.useDataSources.length||!t.props.useDataSources[0].fields||2!==t.props.useDataSources[0].fields.length)},t.dataRender=function(){var e=t.props.useDataSources[0].fields[0],r=t.props.useDataSources[0].fields[1];if(t.state.dataSource)return n.React.createElement("div",null,n.React.createElement("div",null,n.React.createElement("input",{placeholder:t.props.config.queryTip,ref:t.cityNameRef}),n.React.createElement("button",{onClick:t.query},"Query")),n.React.createElement("div",null,"Query state: ",t.state.dataSource.getInfo().status),n.React.createElement("div",{className:"record-list",style:{width:"100%",marginTop:"20px",height:"calc(100% - 80px)",overflow:"auto"}},t.state.records.map(function(a,o){return n.React.createElement(n.RepeatedDataSourceProvider,{key:o,data:{widgetId:t.props.id,dataSourceId:t.state.dataSource.id,recordIndex:o,record:a}},n.React.createElement("div",{style:{background:"#eee",margin:"2px"}},n.React.createElement("div",null,"Item: ",a.getData()[e],", ",a.getData()[r]),n.React.createElement("div",{style:{background:"#ddd",margin:"5px"}},t.props.config.innerWidgetIds.map(function(e){var t=n.WidgetManager.getInstance().getWidgetClass(e);return t?n.React.createElement("div",{style:{border:"1px solid red"},key:e},n.React.createElement(t,null)):n.React.createElement("div",{key:e},"...")}))))})))},t}return a(t,e),t.prototype.componentDidUpdate=function(e,t){var r=this;this.props.config.innerWidgetIds.forEach(function(e){n.WidgetManager.getInstance().getWidgetClass(e)||n.WidgetManager.getInstance().loadWidgetClass(e)}),this.state.dataSource&&this.state.query&&this.state.queryState!==n.DataSourceStatus.Loading&&(this.state.query&&t.query&&this.state.query.where===t.query.where||(this.setState({queryState:n.DataSourceStatus.Loading}),this.state.dataSource.query(this.state.query).then(function(e){r.setState({records:e,queryState:n.DataSourceStatus.Loaded})},function(e){return r.setState({queryState:n.DataSourceStatus.Error})})))},t.prototype.render=function(){var e=this;return this.isDsConfigured()?n.React.createElement("div",{className:"widget-data-provider",style:{width:"100%",height:"100%",maxHeight:"800px",overflow:"auto"}},n.React.createElement(o.DataSourceComponent,{useDataSource:this.props.useDataSources[0],onDataSourceCreated:function(t){return e.setState({dataSource:t})}}),this.dataRender()):n.React.createElement("h3",null,"This widget demostrates how to provide a data context.",n.React.createElement("br",null),"Please config data source.")},t}(o.BaseWidget);t.default=u}})});
//# sourceMappingURL=widget.js.map