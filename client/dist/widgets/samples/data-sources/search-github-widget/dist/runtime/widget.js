define(["jimu-core"],function(e){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=714)}({2:function(t,r){t.exports=e},714:function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var a=r(2),u=r(2),o=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.searchRepoNameRef=a.React.createRef(),t.addRepoNameRef=a.React.createRef(),t.state={query:null},t.thisQuery=function(){t.searchRepoNameRef.current&&t.searchRepoNameRef.current.value&&t.setState({query:t.searchRepoNameRef.current.value})},t.createOutputDs=function(e){t.outputDataSource?t.outputDataSource.then(function(t){t.updateAllRecoreds(e.slice())}):t.outputDataSource=u.DataSourceManager.getInstance().createDataSource(t.props.outputDataSources[0]).then(function(t){return t.setRecords(e.slice()),t})},t.add=function(){t.ds.addRecord(new a.SimpleDataRecord({full_name:t.addRepoNameRef.current.value},t.ds))},t.dsRender=function(e,r){t.updateOutputDs();var n=e?e.getRecords().map(function(e,t){return a.React.createElement("div",{key:t},e.getData().full_name)}):null;return a.React.createElement(a.React.Fragment,null,a.React.createElement("div",null,a.React.createElement("div",null,a.React.createElement("input",{placeholder:"Repository Name",defaultValue:t.props.preloadQueryString,ref:t.searchRepoNameRef}),a.React.createElement("button",{onClick:t.thisQuery},"Query")),a.React.createElement("div",null,"query state: ",r.status)),a.React.createElement("div",{style:{marginTop:"20px"}},a.React.createElement("div",null,a.React.createElement("input",{placeholder:"Repository Name",ref:t.addRepoNameRef}),a.React.createElement("button",{onClick:t.add},"Add")),a.React.createElement("div",null,"add state: ",r.saveStatus)),a.React.createElement("div",{className:"repo-list",style:{width:"100%",marginTop:"20px",height:"calc(100% - 80px)",overflow:"auto"}},n))},t.onDsCreate=function(e){t.ds=e},t}return n(t,e),t.prototype.updateOutputDs=function(){this.ds&&this.ds.getStatus()===a.DataSourceStatus.Loaded&&this.createOutputDs(this.ds.getRecords())},t.prototype.render=function(){return t.isDsConfigured(this.props)?a.React.createElement("div",{className:"widget-github-repo",style:{width:"100%",height:"100%",overflow:"hidden"}},a.React.createElement("h3",null,"This widget will show:",a.React.createElement("br",null),"* how to create custom data source type",a.React.createElement("br",null),"* how to output data source so other widget can use",a.React.createElement("br",null),"* how to edit the data source and the consumer widget can reflect the update.",a.React.createElement("br",null),"* how to preload props.",a.React.createElement("br",null)),a.React.createElement(a.DataSourceComponent,{useDataSource:this.props.useDataSources[0],query:this.state.query,onDataSourceCreated:this.onDsCreate},this.dsRender)):"No data source"},t.preloadData=function(e,r,n){return t.query(r,"react",n).then(function(e){return{preloadQueryString:"react"}})},t.isDsConfigured=function(e){return!(!e.useDataSources||1!==e.useDataSources.length)},t.query=function(e,r,n){if(!t.isDsConfigured(e))return Promise.resolve([]);var a=n&&n[e.useDataSources[0].dataSourceId];return a?a.load(r).then(function(e){return e.map(function(e){return e.getData()})}):Promise.resolve([])},t}(u.BaseWidget);t.default=o}})});
//# sourceMappingURL=widget.js.map