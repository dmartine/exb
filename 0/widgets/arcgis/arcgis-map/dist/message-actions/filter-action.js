System.register(["jimu-core"], function(__WEBPACK_DYNAMIC_EXPORT__) {
	var __WEBPACK_EXTERNAL_MODULE_jimu_core__;
	return {
		setters: [
			function(module) {
				__WEBPACK_EXTERNAL_MODULE_jimu_core__ = module;
			}
		],
		execute: function() {
			__WEBPACK_DYNAMIC_EXPORT__(
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./extensions/widgets/arcgis/arcgis-map/src/message-actions/filter-action.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./extensions/widgets/arcgis/arcgis-map/src/message-actions/filter-action.ts":
/*!***********************************************************************************!*\
  !*** ./extensions/widgets/arcgis/arcgis-map/src/message-actions/filter-action.ts ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ \"jimu-core\");\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jimu_core__WEBPACK_IMPORTED_MODULE_0__);\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar FilterAction = /** @class */ (function (_super) {\n    __extends(FilterAction, _super);\n    function FilterAction() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    FilterAction.prototype.filterMessageType = function (messageType, messageWidgetId) {\n        return messageType === jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"MessageType\"].DataRecordsSelectionChange;\n    };\n    FilterAction.prototype.filterMessage = function (message) {\n        return true;\n    };\n    FilterAction.prototype.getSettingComponentUri = function (messageType, messageWidgetId) {\n        return 'message-actions/filter-action-setting';\n    };\n    FilterAction.prototype.onRemoveListen = function (messageType, messageWidgetId) {\n        if (!this.lastMessage) {\n            return;\n        }\n        if (this.lastMessage.type === messageType && this.lastMessage.widgetId === messageWidgetId) {\n            if (this.lastFilterActionValue && this.lastFilterActionValue.querySQL) {\n                this.lastFilterActionValue.querySQL = '';\n            }\n            Object(jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"getAppStore\"])().dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"appActions\"].widgetMutableStatePropChange(this.widgetId, 'filterActionValue', this.lastFilterActionValue));\n            this.lastMessage = null;\n            this.lastFilterActionValue = null;\n        }\n    };\n    FilterAction.prototype.onExecute = function (message, actionConfig) {\n        this.lastMessage = message;\n        switch (message.type) {\n            case jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"MessageType\"].DataRecordsSelectionChange:\n                var filterActionValue = null;\n                if (actionConfig) {\n                    if (actionConfig.messageUseDataSource && actionConfig.actionUseDataSource) {\n                        if (message.records.length > 0\n                            && message.records[0].dataSource.getMainDataSource().id !== actionConfig.messageUseDataSource.mainDataSourceId) {\n                            Object(jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"getAppStore\"])().dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"appActions\"].widgetMutableStatePropChange(this.widgetId, 'filterActionValue', null));\n                            break;\n                        }\n                        var messageDataSource = jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"DataSourceManager\"].getInstance().getDataSource(actionConfig.messageUseDataSource.mainDataSourceId);\n                        var actionDataSource = jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"DataSourceManager\"].getInstance().getDataSource(actionConfig.actionUseDataSource.mainDataSourceId);\n                        if (messageDataSource && actionDataSource) {\n                            // when ds instances exit\n                            if (actionConfig.enabledDataRelationShip) {\n                                // use DataRelationShip\n                                var messageField = null;\n                                var actionField = null;\n                                if (actionConfig.messageUseDataSource.mainDataSourceId === actionConfig.actionUseDataSource.mainDataSourceId &&\n                                    actionConfig.messageUseDataSource.rootDataSourceId === actionConfig.actionUseDataSource.rootDataSourceId) {\n                                    // if trigger ds is same to action ds\n                                    var messageDsSchema_1 = messageDataSource.getSchema();\n                                    var objectIdJimuFieldName = messageDsSchema_1 && messageDsSchema_1.fields\n                                        && Object.keys(messageDsSchema_1.fields).find(function (jimuFieldName) { return messageDsSchema_1.fields[jimuFieldName].esriType === 'esriFieldTypeOID'; });\n                                    messageField = messageDsSchema_1 && messageDsSchema_1.fields && messageDsSchema_1.fields[objectIdJimuFieldName];\n                                    actionField = messageField;\n                                }\n                                else {\n                                    // if trigger ds isn't same to action ds\n                                    var messageJimuFieldName = actionConfig.messageUseDataSource.fields[0];\n                                    var actionJimuFieldName = actionConfig.actionUseDataSource.fields[0];\n                                    messageField = messageDataSource.getSchema().fields[messageJimuFieldName];\n                                    actionField = actionDataSource.getSchema().fields[actionJimuFieldName];\n                                }\n                                var whereSql = '';\n                                if (messageField && actionField) {\n                                    var messageFieldName = messageField.name;\n                                    var messageFieldType = messageField.type;\n                                    var tempMessage = message;\n                                    var messageFieldValues = [];\n                                    for (var i = 0; i < tempMessage.records.length; i++) {\n                                        var tempFieldValue = tempMessage.records[i].getData()[messageFieldName];\n                                        if (messageFieldValues.indexOf(\"\" + this.formatValue(tempFieldValue, messageFieldType)) > -1) {\n                                            continue;\n                                        }\n                                        else {\n                                            messageFieldValues.push(\"\" + this.formatValue(tempMessage.records[i].getData()[messageFieldName], messageFieldType));\n                                        }\n                                    }\n                                    whereSql = actionField.name + \" IN \";\n                                    if (messageFieldValues.length > 0) {\n                                        whereSql = whereSql + (\"(\" + messageFieldValues.join(', ') + \")\");\n                                    }\n                                    else {\n                                        whereSql = '';\n                                    }\n                                }\n                                if (message.records.length > 0) {\n                                    var moreAditionSQL = actionConfig.sqlExprObj ? jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"dataSourceUtils\"].getArcGISSQL(actionConfig.sqlExprObj, actionDataSource).sql : null;\n                                    if (moreAditionSQL) {\n                                        if (whereSql) {\n                                            whereSql = whereSql + ' AND ' + moreAditionSQL;\n                                        }\n                                        else {\n                                            whereSql = moreAditionSQL;\n                                        }\n                                    }\n                                }\n                                else {\n                                    whereSql = '';\n                                }\n                                filterActionValue = {\n                                    layerDataSourceId: actionDataSource && actionDataSource.id,\n                                    querySQL: whereSql\n                                };\n                            }\n                            else {\n                                // not use DataRelationShip\n                                var whereSql = '';\n                                if (message.records.length > 0) {\n                                    var moreAditionSQL = actionConfig.sqlExprObj ? jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"dataSourceUtils\"].getArcGISSQL(actionConfig.sqlExprObj, actionDataSource).sql : null;\n                                    if (moreAditionSQL) {\n                                        whereSql = moreAditionSQL;\n                                    }\n                                }\n                                else {\n                                    whereSql = '';\n                                }\n                                filterActionValue = {\n                                    layerDataSourceId: actionDataSource && actionDataSource.id,\n                                    querySQL: whereSql\n                                };\n                            }\n                        }\n                        else {\n                            // when ds instances don't exist\n                            filterActionValue = null;\n                        }\n                    }\n                    else {\n                        filterActionValue = null;\n                    }\n                }\n                this.lastFilterActionValue = filterActionValue;\n                Object(jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"getAppStore\"])().dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"appActions\"].widgetMutableStatePropChange(this.widgetId, 'filterActionValue', filterActionValue));\n                break;\n        }\n        return true;\n    };\n    FilterAction.prototype.getLayerIdFromLayerDs = function (ds) {\n        if (ds.layerId) {\n            return ds.layerId;\n        }\n        else if (ds.layer) {\n            return ds.layer.id;\n        }\n        else {\n            return null;\n        }\n    };\n    FilterAction.prototype.formatValue = function (value, type) {\n        if (type === 'STRING') {\n            return \"'\" + value + \"'\";\n        }\n        else if (type === 'NUMBER') {\n            return \"\" + value;\n        }\n        else if (type === 'DATE') {\n            return \"'\" + value + \"'\";\n        }\n    };\n    return FilterAction;\n}(jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"AbstractMessageAction\"]));\n/* harmony default export */ __webpack_exports__[\"default\"] = (FilterAction);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9leHRlbnNpb25zL3dpZGdldHMvYXJjZ2lzL2FyY2dpcy1tYXAvc3JjL21lc3NhZ2UtYWN0aW9ucy9maWx0ZXItYWN0aW9uLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZXh0ZW5zaW9ucy93aWRnZXRzL2FyY2dpcy9hcmNnaXMtbWFwL3NyYy9tZXNzYWdlLWFjdGlvbnMvZmlsdGVyLWFjdGlvbi50cz9jNDI4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0TWVzc2FnZUFjdGlvbiwgTWVzc2FnZVR5cGUsIE1lc3NhZ2UsIGdldEFwcFN0b3JlLCBhcHBBY3Rpb25zLCBGaWVsZFNjaGVtYSxcbiAgRGF0YVJlY29yZHNTZWxlY3Rpb25DaGFuZ2VNZXNzYWdlLCBEYXRhU291cmNlTWFuYWdlciwgRmVhdHVyZVF1ZXJ5RGF0YVNvdXJjZSwgSW1tdXRhYmxlT2JqZWN0LCBkYXRhU291cmNlVXRpbHMgfSBmcm9tICdqaW11LWNvcmUnO1xuaW1wb3J0IHsgRmVhdHVyZUxheWVyRGF0YVNvdXJjZSB9IGZyb20gJ2ppbXUtYXJjZ2lzJztcbmltcG9ydCB7SU1Db25maWd9IGZyb20gJy4uL21lc3NhZ2UtYWN0aW9ucy9maWx0ZXItYWN0aW9uLXNldHRpbmcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWx0ZXJBY3Rpb24gZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VBY3Rpb257XG4gIHByaXZhdGUgbGFzdE1lc3NhZ2U6IE1lc3NhZ2U7XG4gIHByaXZhdGUgbGFzdEZpbHRlckFjdGlvblZhbHVlOiB7XG4gICAgbGF5ZXJEYXRhU291cmNlSWQ6IHN0cmluZztcbiAgICBxdWVyeVNRTDogc3RyaW5nO1xuICB9O1xuXG4gIGZpbHRlck1lc3NhZ2VUeXBlKG1lc3NhZ2VUeXBlOiBNZXNzYWdlVHlwZSwgbWVzc2FnZVdpZGdldElkPzogc3RyaW5nKTogYm9vbGVhbntcbiAgICByZXR1cm4gbWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkRhdGFSZWNvcmRzU2VsZWN0aW9uQ2hhbmdlO1xuICB9XG5cbiAgZmlsdGVyTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKTogYm9vbGVhbntcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldFNldHRpbmdDb21wb25lbnRVcmkobWVzc2FnZVR5cGU6IE1lc3NhZ2VUeXBlLCBtZXNzYWdlV2lkZ2V0SWQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiAnbWVzc2FnZS1hY3Rpb25zL2ZpbHRlci1hY3Rpb24tc2V0dGluZyc7XG4gIH1cblxuICBvblJlbW92ZUxpc3RlbihtZXNzYWdlVHlwZTogTWVzc2FnZVR5cGUsIG1lc3NhZ2VXaWRnZXRJZD86IHN0cmluZyl7XG4gICAgaWYoIXRoaXMubGFzdE1lc3NhZ2Upe1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmKHRoaXMubGFzdE1lc3NhZ2UudHlwZSA9PT0gbWVzc2FnZVR5cGUgJiYgdGhpcy5sYXN0TWVzc2FnZS53aWRnZXRJZCA9PT0gbWVzc2FnZVdpZGdldElkKXtcbiAgICAgIGlmICh0aGlzLmxhc3RGaWx0ZXJBY3Rpb25WYWx1ZSAmJiB0aGlzLmxhc3RGaWx0ZXJBY3Rpb25WYWx1ZS5xdWVyeVNRTCkge1xuICAgICAgICB0aGlzLmxhc3RGaWx0ZXJBY3Rpb25WYWx1ZS5xdWVyeVNRTCA9ICcnO1xuICAgICAgfVxuXG4gICAgICBnZXRBcHBTdG9yZSgpLmRpc3BhdGNoKGFwcEFjdGlvbnMud2lkZ2V0TXV0YWJsZVN0YXRlUHJvcENoYW5nZSh0aGlzLndpZGdldElkLCAnZmlsdGVyQWN0aW9uVmFsdWUnLCB0aGlzLmxhc3RGaWx0ZXJBY3Rpb25WYWx1ZSkpO1xuICAgICAgdGhpcy5sYXN0TWVzc2FnZSA9IG51bGw7XG4gICAgICB0aGlzLmxhc3RGaWx0ZXJBY3Rpb25WYWx1ZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgb25FeGVjdXRlKG1lc3NhZ2U6IE1lc3NhZ2UsIGFjdGlvbkNvbmZpZz86IElNQ29uZmlnKTogUHJvbWlzZTxib29sZWFuPiB8IGJvb2xlYW57XG4gICAgdGhpcy5sYXN0TWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgICBzd2l0Y2gobWVzc2FnZS50eXBlKSB7XG4gICAgICBjYXNlIE1lc3NhZ2VUeXBlLkRhdGFSZWNvcmRzU2VsZWN0aW9uQ2hhbmdlOlxuICAgICAgICBsZXQgZmlsdGVyQWN0aW9uVmFsdWU6IHtsYXllckRhdGFTb3VyY2VJZDogc3RyaW5nLCBxdWVyeVNRTDogc3RyaW5nfSA9IG51bGw7XG4gICAgICAgIGlmIChhY3Rpb25Db25maWcpIHtcbiAgICAgICAgICBpZiAoYWN0aW9uQ29uZmlnLm1lc3NhZ2VVc2VEYXRhU291cmNlICYmIGFjdGlvbkNvbmZpZy5hY3Rpb25Vc2VEYXRhU291cmNlKSB7XG4gICAgICAgICAgICBpZiAoKG1lc3NhZ2UgYXMgRGF0YVJlY29yZHNTZWxlY3Rpb25DaGFuZ2VNZXNzYWdlKS5yZWNvcmRzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgJiYgKG1lc3NhZ2UgYXMgRGF0YVJlY29yZHNTZWxlY3Rpb25DaGFuZ2VNZXNzYWdlKS5yZWNvcmRzWzBdLmRhdGFTb3VyY2UuZ2V0TWFpbkRhdGFTb3VyY2UoKS5pZCAhPT0gYWN0aW9uQ29uZmlnLm1lc3NhZ2VVc2VEYXRhU291cmNlLm1haW5EYXRhU291cmNlSWQpIHtcbiAgICAgICAgICAgICAgZ2V0QXBwU3RvcmUoKS5kaXNwYXRjaChhcHBBY3Rpb25zLndpZGdldE11dGFibGVTdGF0ZVByb3BDaGFuZ2UodGhpcy53aWRnZXRJZCwgJ2ZpbHRlckFjdGlvblZhbHVlJywgbnVsbCkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZURhdGFTb3VyY2UgPSBEYXRhU291cmNlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhdGFTb3VyY2UoYWN0aW9uQ29uZmlnLm1lc3NhZ2VVc2VEYXRhU291cmNlLm1haW5EYXRhU291cmNlSWQpO1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uRGF0YVNvdXJjZSA9IERhdGFTb3VyY2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGF0YVNvdXJjZShhY3Rpb25Db25maWcuYWN0aW9uVXNlRGF0YVNvdXJjZS5tYWluRGF0YVNvdXJjZUlkKTtcblxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VEYXRhU291cmNlICYmIGFjdGlvbkRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgICAgLy8gd2hlbiBkcyBpbnN0YW5jZXMgZXhpdFxuICAgICAgICAgICAgICBpZiAoYWN0aW9uQ29uZmlnLmVuYWJsZWREYXRhUmVsYXRpb25TaGlwKSB7XG4gICAgICAgICAgICAgICAgLy8gdXNlIERhdGFSZWxhdGlvblNoaXBcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUZpZWxkOiBJbW11dGFibGVPYmplY3Q8RmllbGRTY2hlbWE+ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uRmllbGQ6IEltbXV0YWJsZU9iamVjdDxGaWVsZFNjaGVtYT4gPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbkNvbmZpZy5tZXNzYWdlVXNlRGF0YVNvdXJjZS5tYWluRGF0YVNvdXJjZUlkID09PSBhY3Rpb25Db25maWcuYWN0aW9uVXNlRGF0YVNvdXJjZS5tYWluRGF0YVNvdXJjZUlkICYmXG4gICAgICAgICAgICAgICAgICBhY3Rpb25Db25maWcubWVzc2FnZVVzZURhdGFTb3VyY2Uucm9vdERhdGFTb3VyY2VJZCA9PT0gYWN0aW9uQ29uZmlnLmFjdGlvblVzZURhdGFTb3VyY2Uucm9vdERhdGFTb3VyY2VJZCkge1xuICAgICAgICAgICAgICAgICAgLy8gaWYgdHJpZ2dlciBkcyBpcyBzYW1lIHRvIGFjdGlvbiBkc1xuICAgICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZURzU2NoZW1hID0gbWVzc2FnZURhdGFTb3VyY2UuZ2V0U2NoZW1hKCk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBvYmplY3RJZEppbXVGaWVsZE5hbWUgPSBtZXNzYWdlRHNTY2hlbWEgJiYgbWVzc2FnZURzU2NoZW1hLmZpZWxkc1xuICAgICAgICAgICAgICAgICAgICAmJiBPYmplY3Qua2V5cyhtZXNzYWdlRHNTY2hlbWEuZmllbGRzKS5maW5kKGppbXVGaWVsZE5hbWUgPT4gbWVzc2FnZURzU2NoZW1hLmZpZWxkc1tqaW11RmllbGROYW1lXS5lc3JpVHlwZSA9PT0gJ2VzcmlGaWVsZFR5cGVPSUQnKTtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2VGaWVsZCA9IG1lc3NhZ2VEc1NjaGVtYSAmJiBtZXNzYWdlRHNTY2hlbWEuZmllbGRzICYmIG1lc3NhZ2VEc1NjaGVtYS5maWVsZHNbb2JqZWN0SWRKaW11RmllbGROYW1lXTtcbiAgICAgICAgICAgICAgICAgIGFjdGlvbkZpZWxkID0gbWVzc2FnZUZpZWxkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBpZiB0cmlnZ2VyIGRzIGlzbid0IHNhbWUgdG8gYWN0aW9uIGRzXG4gICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlSmltdUZpZWxkTmFtZSA9IGFjdGlvbkNvbmZpZy5tZXNzYWdlVXNlRGF0YVNvdXJjZS5maWVsZHNbMF07XG4gICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25KaW11RmllbGROYW1lID0gYWN0aW9uQ29uZmlnLmFjdGlvblVzZURhdGFTb3VyY2UuZmllbGRzWzBdO1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZUZpZWxkID0gbWVzc2FnZURhdGFTb3VyY2UuZ2V0U2NoZW1hKCkuZmllbGRzW21lc3NhZ2VKaW11RmllbGROYW1lXTtcbiAgICAgICAgICAgICAgICAgIGFjdGlvbkZpZWxkID0gYWN0aW9uRGF0YVNvdXJjZS5nZXRTY2hlbWEoKS5maWVsZHNbYWN0aW9uSmltdUZpZWxkTmFtZV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHdoZXJlU3FsID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2VGaWVsZCAmJiBhY3Rpb25GaWVsZCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZUZpZWxkTmFtZSA9IG1lc3NhZ2VGaWVsZC5uYW1lO1xuICAgICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZUZpZWxkVHlwZSA9IG1lc3NhZ2VGaWVsZC50eXBlO1xuXG4gICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wTWVzc2FnZTogRGF0YVJlY29yZHNTZWxlY3Rpb25DaGFuZ2VNZXNzYWdlID0gbWVzc2FnZSBhcyBEYXRhUmVjb3Jkc1NlbGVjdGlvbkNoYW5nZU1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlRmllbGRWYWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZW1wTWVzc2FnZS5yZWNvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBGaWVsZFZhbHVlID0gdGVtcE1lc3NhZ2UucmVjb3Jkc1tpXS5nZXREYXRhKClbbWVzc2FnZUZpZWxkTmFtZV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlRmllbGRWYWx1ZXMuaW5kZXhPZihgJHt0aGlzLmZvcm1hdFZhbHVlKHRlbXBGaWVsZFZhbHVlLCBtZXNzYWdlRmllbGRUeXBlKX1gKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUZpZWxkVmFsdWVzLnB1c2goYCR7dGhpcy5mb3JtYXRWYWx1ZSh0ZW1wTWVzc2FnZS5yZWNvcmRzW2ldLmdldERhdGEoKVttZXNzYWdlRmllbGROYW1lXSwgbWVzc2FnZUZpZWxkVHlwZSl9YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgd2hlcmVTcWwgPSBgJHthY3Rpb25GaWVsZC5uYW1lfSBJTiBgO1xuXG4gICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZUZpZWxkVmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgd2hlcmVTcWwgPSB3aGVyZVNxbCArIGAoJHttZXNzYWdlRmllbGRWYWx1ZXMuam9pbignLCAnKX0pYDtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlU3FsID0gJyc7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKChtZXNzYWdlIGFzIERhdGFSZWNvcmRzU2VsZWN0aW9uQ2hhbmdlTWVzc2FnZSkucmVjb3Jkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBtb3JlQWRpdGlvblNRTCA9IGFjdGlvbkNvbmZpZy5zcWxFeHByT2JqID8gZGF0YVNvdXJjZVV0aWxzLmdldEFyY0dJU1NRTChhY3Rpb25Db25maWcuc3FsRXhwck9iaiwgYWN0aW9uRGF0YVNvdXJjZSkuc3FsIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgIGlmIChtb3JlQWRpdGlvblNRTCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAod2hlcmVTcWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aGVyZVNxbCA9IHdoZXJlU3FsICsgJyBBTkQgJyArIG1vcmVBZGl0aW9uU1FMO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHdoZXJlU3FsID0gbW9yZUFkaXRpb25TUUw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgd2hlcmVTcWwgPSAnJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmaWx0ZXJBY3Rpb25WYWx1ZSA9IHtcbiAgICAgICAgICAgICAgICAgIGxheWVyRGF0YVNvdXJjZUlkOiBhY3Rpb25EYXRhU291cmNlICYmIGFjdGlvbkRhdGFTb3VyY2UuaWQsXG4gICAgICAgICAgICAgICAgICBxdWVyeVNRTDogd2hlcmVTcWxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbm90IHVzZSBEYXRhUmVsYXRpb25TaGlwXG4gICAgICAgICAgICAgICAgbGV0IHdoZXJlU3FsID0gJyc7XG5cbiAgICAgICAgICAgICAgICBpZiAoKG1lc3NhZ2UgYXMgRGF0YVJlY29yZHNTZWxlY3Rpb25DaGFuZ2VNZXNzYWdlKS5yZWNvcmRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG1vcmVBZGl0aW9uU1FMID0gYWN0aW9uQ29uZmlnLnNxbEV4cHJPYmogPyBkYXRhU291cmNlVXRpbHMuZ2V0QXJjR0lTU1FMKGFjdGlvbkNvbmZpZy5zcWxFeHByT2JqLCBhY3Rpb25EYXRhU291cmNlKS5zcWwgOiBudWxsO1xuICAgICAgICAgICAgICAgICAgaWYgKG1vcmVBZGl0aW9uU1FMKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlU3FsID0gbW9yZUFkaXRpb25TUUw7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHdoZXJlU3FsID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZmlsdGVyQWN0aW9uVmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgICBsYXllckRhdGFTb3VyY2VJZDogYWN0aW9uRGF0YVNvdXJjZSAmJiBhY3Rpb25EYXRhU291cmNlLmlkLFxuICAgICAgICAgICAgICAgICAgcXVlcnlTUUw6IHdoZXJlU3FsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyB3aGVuIGRzIGluc3RhbmNlcyBkb24ndCBleGlzdFxuICAgICAgICAgICAgICBmaWx0ZXJBY3Rpb25WYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpbHRlckFjdGlvblZhbHVlID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhc3RGaWx0ZXJBY3Rpb25WYWx1ZSA9IGZpbHRlckFjdGlvblZhbHVlO1xuICAgICAgICBnZXRBcHBTdG9yZSgpLmRpc3BhdGNoKGFwcEFjdGlvbnMud2lkZ2V0TXV0YWJsZVN0YXRlUHJvcENoYW5nZSh0aGlzLndpZGdldElkLCAnZmlsdGVyQWN0aW9uVmFsdWUnLCBmaWx0ZXJBY3Rpb25WYWx1ZSkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldExheWVySWRGcm9tTGF5ZXJEcyhkczogRmVhdHVyZUxheWVyRGF0YVNvdXJjZSB8IEZlYXR1cmVRdWVyeURhdGFTb3VyY2UpIHtcbiAgICBpZiAoKGRzIGFzIGFueSkubGF5ZXJJZCkge1xuICAgICAgcmV0dXJuIChkcyBhcyBGZWF0dXJlUXVlcnlEYXRhU291cmNlKS5sYXllcklkO1xuICAgIH0gZWxzZSBpZiAoKGRzIGFzIGFueSkubGF5ZXIpIHtcbiAgICAgIHJldHVybiAoZHMgYXMgRmVhdHVyZUxheWVyRGF0YVNvdXJjZSkubGF5ZXIuaWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdFZhbHVlICh2YWx1ZSwgdHlwZTogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGUgPT09ICdTVFJJTkcnKSB7XG4gICAgICByZXR1cm4gYCcke3ZhbHVlfSdgO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ05VTUJFUicpIHtcbiAgICAgIHJldHVybiBgJHt2YWx1ZX1gO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ0RBVEUnKSB7XG4gICAgICByZXR1cm4gYCcke3ZhbHVlfSdgO1xuICAgIH1cbiAgfVxufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBS0E7QUFBQTtBQUFBOztBQTRLQTtBQXJLQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./extensions/widgets/arcgis/arcgis-map/src/message-actions/filter-action.ts\n");

/***/ }),

/***/ "jimu-core":
/*!****************************!*\
  !*** external "jimu-core" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_core__;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamltdS1jb3JlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiamltdS1jb3JlXCI/YzY5NSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfamltdV9jb3JlX187Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///jimu-core\n");

/***/ })

/******/ })
			);
		}
	};
});