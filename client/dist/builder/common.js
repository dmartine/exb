define(["jimu-core","jimu-for-builder"],function(e,t){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=52)}({0:function(t,n){t.exports=e},3:function(e,n){e.exports=t},52:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(53);t.appServices=r},53:function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=n(3),u=n(0),a=u.esri.restPortal,s=a.searchItems,c=a.removeItem,f=a.updateItem,p=a.createItem,l=a.getItem,g=a.getItemData;t.createApp=function(e){return Promise.all([function(e){return fetch("../templates/"+e.template+"/config.json").then(function(e){return e.json()}).then(function(e){return e})}(e)]).then(function(t){var n=t[0];return n.template=e.template,n.attributes?n.attributes.portalUrl=o.getAppStore().getState().portalUrl:n.attributes={portalUrl:o.getAppStore().getState().portalUrl},function(e){return e?fetch("../"+e+"/manifest.json").then(function(e){return e.json()}).then(function(e){return e}):Promise.resolve(null)}(n.theme).then(function(t){return t&&(n.themeManifest=o.Immutable(t).without("author","copyright","license","description")),function(e,t){var n={title:e.name,type:"Web Experience",typeKeywords:["EXB Experience","Ready To Use","JavaScript"],snippet:e.description,tags:e.tags,data:{__not_publish:!0}};return Promise.resolve(!1).then(function(e){return e?Promise.reject("app existed."):p({item:n,authentication:u.SessionManager.getInstance().getSession()})})}(e).then(function(e){return i.AppResourceManager.getInstance().uploadAppConfigFileToPortal(e.id,n).then(function(){return Promise.resolve(e)})})})}).catch(function(e){return console.error(e),Promise.reject(e)})},t.getAppItemData=function(e){var t=u.SessionManager.getInstance().getSession();return g(e,{authentication:t}).then(function(e){return Promise.resolve(e)},function(e){return Promise.reject(e)})},t.searchApp=function(e){var t=u.SessionManager.getInstance().getSession();return s(r({},e,{authentication:t})).then(function(e){return Promise.resolve(e.results)})},t.searchAppById=function(e){var t=u.SessionManager.getInstance().getSession();return l(e,{authentication:t}).then(function(e){return Promise.resolve(e)})},t.updateAppItem=function(e){var t=u.SessionManager.getInstance().getSession();return f({item:e,authentication:t}).then(function(){})},t.deleteApp=function(e){return c({id:e,authentication:u.SessionManager.getInstance().getSession()})},t.saveApp=function(e,t){var n=Object.assign({},i.appConfigUtils.getCleanAppConfig(t)),r=i.AppResourceManager.getInstance();return r.setAppConfigLocalFileToResource(n).then(function(t){return t?r.uploadAppConfigFileToPortal(e,t).then(function(){if(r.getResourcesInDraft().imageResources){var e={};Object.keys(r.getResourcesInDraft().imageResources).forEach(function(t){e[t]=Object.assign({},r.getResourcesInDraft().imageResources[t])});var n=u.appConfigUtils.cleanTokenFromResource(e);return r.uploadImageConfigFileToPortal(n,t)}return Promise.resolve()}):Promise.reject()},function(){return Promise.reject()}).catch(function(e){return Promise.reject(e)})},t.publishApp=function(e){var t=u.SessionManager.getInstance().getSession();return i.AppResourceManager.getInstance().getConfigFromItemResource(e).then(function(n){return n?f({item:{id:e,owner:t.username,data:n},authentication:u.SessionManager.getInstance().getSession()}).then(function(){return Promise.resolve()},function(){return Promise.reject()}):Promise.reject()},function(){return Promise.reject()}).catch(function(e){return Promise.reject(e)})}}})});
//# sourceMappingURL=common.js.map