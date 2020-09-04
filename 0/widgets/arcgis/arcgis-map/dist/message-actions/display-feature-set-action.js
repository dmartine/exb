System.register(["jimu-arcgis","jimu-core"], function(__WEBPACK_DYNAMIC_EXPORT__) {
	var __WEBPACK_EXTERNAL_MODULE_jimu_arcgis__, __WEBPACK_EXTERNAL_MODULE_jimu_core__;
	return {
		setters: [
			function(module) {
				__WEBPACK_EXTERNAL_MODULE_jimu_arcgis__ = module;
			},
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./extensions/widgets/arcgis/arcgis-map/src/message-actions/display-feature-set-action.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./extensions/widgets/arcgis/arcgis-map/src/message-actions/display-feature-set-action.ts":
/*!************************************************************************************************!*\
  !*** ./extensions/widgets/arcgis/arcgis-map/src/message-actions/display-feature-set-action.ts ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ \"jimu-core\");\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jimu_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jimu-arcgis */ \"jimu-arcgis\");\n/* harmony import */ var jimu_arcgis__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__);\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar DisplayFeatureSetAction = /** @class */ (function (_super) {\n    __extends(DisplayFeatureSetAction, _super);\n    function DisplayFeatureSetAction() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    DisplayFeatureSetAction.prototype.filterMessageType = function (messageType, messageWidgetId) {\n        return messageType === jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"MessageType\"].DataRecordSetUpdate || messageType === jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"MessageType\"].DataRecordSetCreate;\n    };\n    DisplayFeatureSetAction.prototype.filterMessage = function (message) {\n        return true;\n    };\n    DisplayFeatureSetAction.prototype.onExecute = function (message, actionConfig) {\n        var _this = this;\n        var dataRecordSetMessage = message;\n        if (dataRecordSetMessage.dataRecordSet && dataRecordSetMessage.dataRecordSet.records) {\n            var datasource_1 = dataRecordSetMessage.dataRecordSet.records[0]\n                && dataRecordSetMessage.dataRecordSet.records[0].dataSource;\n            if (datasource_1.type === jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"DataSourceTypes\"].FeatureQuery) {\n                return Object(jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__[\"loadArcGISJSAPIModules\"])(['esri/renderers/support/jsonUtils', 'esri/layers/support/Field', 'esri/Graphic']).then(function (modules) {\n                    var jsonUtils = null;\n                    var Field = null;\n                    var Graphic = null;\n                    jsonUtils = modules[0], Field = modules[1], Graphic = modules[2];\n                    var layer = {\n                        title: datasource_1.getLabel(),\n                        renderer: jsonUtils.fromJSON(datasource_1.getLayerDefinition().drawingInfo.renderer),\n                        fields: datasource_1.getLayerDefinition().fields.map(function (field) { return Field.fromJSON(field); })\n                    };\n                    return _this.handleMessage(message, layer, Graphic);\n                });\n            }\n            else {\n                return this.handleMessage(message);\n            }\n        }\n        else {\n            return true;\n        }\n    };\n    DisplayFeatureSetAction.prototype.handleMessage = function (message, layer, Graphic) {\n        var _this = this;\n        switch (message.type) {\n            case jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"MessageType\"].DataRecordSetCreate:\n                var dataRecordSetCreateMessage = message;\n                var createdLayerId = message.widgetId + \"-\" + dataRecordSetCreateMessage.dataRecordSetId;\n                var newFeatureSetActionValue = jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"MutableStoreManager\"].getInstance().getStateValue([this.widgetId,\n                    'newFeatureSetActionValue', 'value', \"\" + createdLayerId]);\n                if (!newFeatureSetActionValue) {\n                    var featureSet_1 = {};\n                    if (dataRecordSetCreateMessage.dataRecordSet && dataRecordSetCreateMessage.dataRecordSet.records) {\n                        var features = [];\n                        for (var i = 0; i < dataRecordSetCreateMessage.dataRecordSet.records.length; i++) {\n                            var dataRecordFeature = dataRecordSetCreateMessage.dataRecordSet.records[i].feature;\n                            if (dataRecordFeature) {\n                                var tempFeature = null;\n                                if (dataRecordFeature.clone) {\n                                    tempFeature = dataRecordFeature.clone();\n                                }\n                                else {\n                                    tempFeature = Graphic.fromJSON(Object.assign({}, dataRecordFeature));\n                                    tempFeature.attributes = Object.assign({}, dataRecordFeature.attributes);\n                                }\n                                if (layer) {\n                                    tempFeature.layer = layer;\n                                }\n                                features.push(tempFeature);\n                            }\n                        }\n                        featureSet_1 = {\n                            features: features\n                        };\n                    }\n                    Object(jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"getAppStore\"])().dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"appActions\"].widgetMutableStatePropChange(this.widgetId, \"newFeatureSetActionValue.value.\" + createdLayerId, featureSet_1));\n                    var promise = jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"MutableStoreManager\"].getInstance().getStateValue([this.widgetId,\n                        'newFeatureSetActionValue', 'promise']);\n                    return Promise.all([promise]).then(function () {\n                        var tempPromise = jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"MutableStoreManager\"].getInstance().getStateValue([_this.widgetId,\n                            'newFeatureSetActionValue', 'promise']);\n                        return Promise.all([tempPromise]).then(function () {\n                            return true;\n                        });\n                    }, function () {\n                        return true;\n                    });\n                }\n            case jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"MessageType\"].DataRecordSetUpdate:\n                var dataRecordSetUpdateMessage = message;\n                var changedLayerId = message.widgetId + \"-\" + dataRecordSetUpdateMessage.dataRecordSetId;\n                var featureSet = {};\n                if (dataRecordSetUpdateMessage.dataRecordSet && dataRecordSetUpdateMessage.dataRecordSet.records) {\n                    var features = [];\n                    for (var i = 0; i < dataRecordSetUpdateMessage.dataRecordSet.records.length; i++) {\n                        var dataRecordFeature = dataRecordSetUpdateMessage.dataRecordSet.records[i].feature;\n                        if (dataRecordFeature) {\n                            var tempFeature = null;\n                            if (dataRecordFeature.clone) {\n                                tempFeature = dataRecordFeature.clone();\n                            }\n                            else {\n                                tempFeature = Graphic.fromJSON(Object.assign({}, dataRecordFeature));\n                                tempFeature.attributes = Object.assign({}, dataRecordFeature.attributes);\n                            }\n                            if (layer) {\n                                tempFeature.layer = layer;\n                            }\n                            features.push(tempFeature);\n                        }\n                    }\n                    featureSet = {\n                        features: features\n                    };\n                }\n                Object(jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"getAppStore\"])().dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"appActions\"].widgetMutableStatePropChange(this.widgetId, \"changedFeatureSetActionValue.\" + changedLayerId, featureSet));\n                break;\n        }\n        return true;\n    };\n    return DisplayFeatureSetAction;\n}(jimu_core__WEBPACK_IMPORTED_MODULE_0__[\"AbstractMessageAction\"]));\n/* harmony default export */ __webpack_exports__[\"default\"] = (DisplayFeatureSetAction);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9leHRlbnNpb25zL3dpZGdldHMvYXJjZ2lzL2FyY2dpcy1tYXAvc3JjL21lc3NhZ2UtYWN0aW9ucy9kaXNwbGF5LWZlYXR1cmUtc2V0LWFjdGlvbi50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2V4dGVuc2lvbnMvd2lkZ2V0cy9hcmNnaXMvYXJjZ2lzLW1hcC9zcmMvbWVzc2FnZS1hY3Rpb25zL2Rpc3BsYXktZmVhdHVyZS1zZXQtYWN0aW9uLnRzPzc2MzAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RNZXNzYWdlQWN0aW9uLCBNZXNzYWdlVHlwZSwgTWVzc2FnZSwgZ2V0QXBwU3RvcmUsIGFwcEFjdGlvbnMsIERhdGFSZWNvcmRTZXRVcGRhdGVNZXNzYWdlLCBEYXRhUmVjb3JkU2V0Q3JlYXRlTWVzc2FnZSxcbiAgTXV0YWJsZVN0b3JlTWFuYWdlciwgRmVhdHVyZURhdGFSZWNvcmQgYXMgRmVhdHVyZVF1ZXJ5RGF0YVJlY29yZCwgRGF0YVNvdXJjZVR5cGVzLCBEYXRhU291cmNlLCBGZWF0dXJlUXVlcnlEYXRhU291cmNlIH0gZnJvbSAnamltdS1jb3JlJztcbmltcG9ydCB7IEZlYXR1cmVEYXRhUmVjb3JkIGFzIEZlYXR1cmVMYXllckRhdGFSZWNvcmQsIGxvYWRBcmNHSVNKU0FQSU1vZHVsZXMgfSBmcm9tICdqaW11LWFyY2dpcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc3BsYXlGZWF0dXJlU2V0QWN0aW9uIGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlQWN0aW9ue1xuICBmaWx0ZXJNZXNzYWdlVHlwZShtZXNzYWdlVHlwZTogTWVzc2FnZVR5cGUsIG1lc3NhZ2VXaWRnZXRJZD86IHN0cmluZyk6IGJvb2xlYW57XG4gICAgcmV0dXJuIG1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5EYXRhUmVjb3JkU2V0VXBkYXRlIHx8IG1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5EYXRhUmVjb3JkU2V0Q3JlYXRlO1xuICB9XG5cbiAgZmlsdGVyTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKTogYm9vbGVhbntcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG9uRXhlY3V0ZShtZXNzYWdlOiBNZXNzYWdlLCBhY3Rpb25Db25maWc/OiBhbnkpOiBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbntcbiAgICBjb25zdCBkYXRhUmVjb3JkU2V0TWVzc2FnZTogRGF0YVJlY29yZFNldENyZWF0ZU1lc3NhZ2UgfCBEYXRhUmVjb3JkU2V0VXBkYXRlTWVzc2FnZSA9XG4gICAgICBtZXNzYWdlIGFzIERhdGFSZWNvcmRTZXRDcmVhdGVNZXNzYWdlIHwgRGF0YVJlY29yZFNldFVwZGF0ZU1lc3NhZ2U7XG5cbiAgICBpZiAoZGF0YVJlY29yZFNldE1lc3NhZ2UuZGF0YVJlY29yZFNldCAmJiBkYXRhUmVjb3JkU2V0TWVzc2FnZS5kYXRhUmVjb3JkU2V0LnJlY29yZHMpIHtcbiAgICAgIGNvbnN0IGRhdGFzb3VyY2U6IERhdGFTb3VyY2UgPSBkYXRhUmVjb3JkU2V0TWVzc2FnZS5kYXRhUmVjb3JkU2V0LnJlY29yZHNbMF1cbiAgICAgICAgJiYgZGF0YVJlY29yZFNldE1lc3NhZ2UuZGF0YVJlY29yZFNldC5yZWNvcmRzWzBdLmRhdGFTb3VyY2U7XG4gICAgICBpZiAoZGF0YXNvdXJjZS50eXBlID09PSBEYXRhU291cmNlVHlwZXMuRmVhdHVyZVF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBsb2FkQXJjR0lTSlNBUElNb2R1bGVzKFsnZXNyaS9yZW5kZXJlcnMvc3VwcG9ydC9qc29uVXRpbHMnLCAnZXNyaS9sYXllcnMvc3VwcG9ydC9GaWVsZCcsICdlc3JpL0dyYXBoaWMnXSkudGhlbihtb2R1bGVzID0+IHtcbiAgICAgICAgICBsZXQganNvblV0aWxzOiBfX2VzcmkuanNvblV0aWxzID0gbnVsbDtcbiAgICAgICAgICBsZXQgRmllbGQ6IF9fZXNyaS5GaWVsZENvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgICAgICBsZXQgR3JhcGhpYzogX19lc3JpLkdyYXBoaWNDb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgICAgICAgW2pzb25VdGlscywgRmllbGQsIEdyYXBoaWNdID0gbW9kdWxlcztcbiAgICAgICAgICBjb25zdCBsYXllciA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBkYXRhc291cmNlLmdldExhYmVsKCksXG4gICAgICAgICAgICByZW5kZXJlcjoganNvblV0aWxzLmZyb21KU09OKChkYXRhc291cmNlIGFzIEZlYXR1cmVRdWVyeURhdGFTb3VyY2UpLmdldExheWVyRGVmaW5pdGlvbigpLmRyYXdpbmdJbmZvLnJlbmRlcmVyKSxcbiAgICAgICAgICAgIGZpZWxkczogKGRhdGFzb3VyY2UgYXMgRmVhdHVyZVF1ZXJ5RGF0YVNvdXJjZSkuZ2V0TGF5ZXJEZWZpbml0aW9uKCkuZmllbGRzLm1hcCgoZmllbGQpID0+IHtyZXR1cm4gRmllbGQuZnJvbUpTT04oZmllbGQpfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlTWVzc2FnZShtZXNzYWdlLCBsYXllciwgR3JhcGhpYyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlLCBsYXllcj86IGFueSwgR3JhcGhpYz86IF9fZXNyaS5HcmFwaGljQ29uc3RydWN0b3IpOiBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbiB7XG4gICAgc3dpdGNoKG1lc3NhZ2UudHlwZSl7XG4gICAgICBjYXNlIE1lc3NhZ2VUeXBlLkRhdGFSZWNvcmRTZXRDcmVhdGU6XG4gICAgICAgIGNvbnN0IGRhdGFSZWNvcmRTZXRDcmVhdGVNZXNzYWdlID0gbWVzc2FnZSBhcyBEYXRhUmVjb3JkU2V0Q3JlYXRlTWVzc2FnZTtcbiAgICAgICAgY29uc3QgY3JlYXRlZExheWVySWQgPSBgJHttZXNzYWdlLndpZGdldElkfS0ke2RhdGFSZWNvcmRTZXRDcmVhdGVNZXNzYWdlLmRhdGFSZWNvcmRTZXRJZH1gO1xuICAgICAgICBjb25zdCBuZXdGZWF0dXJlU2V0QWN0aW9uVmFsdWUgPSBNdXRhYmxlU3RvcmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhdGVWYWx1ZShbdGhpcy53aWRnZXRJZCxcbiAgICAgICAgICAnbmV3RmVhdHVyZVNldEFjdGlvblZhbHVlJywgJ3ZhbHVlJywgYCR7Y3JlYXRlZExheWVySWR9YF0pO1xuXG4gICAgICAgIGlmICghbmV3RmVhdHVyZVNldEFjdGlvblZhbHVlKSB7XG4gICAgICAgICAgbGV0IGZlYXR1cmVTZXQgPSB7fTtcblxuICAgICAgICAgIGlmIChkYXRhUmVjb3JkU2V0Q3JlYXRlTWVzc2FnZS5kYXRhUmVjb3JkU2V0ICYmIGRhdGFSZWNvcmRTZXRDcmVhdGVNZXNzYWdlLmRhdGFSZWNvcmRTZXQucmVjb3Jkcykge1xuICAgICAgICAgICAgY29uc3QgZmVhdHVyZXMgPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhUmVjb3JkU2V0Q3JlYXRlTWVzc2FnZS5kYXRhUmVjb3JkU2V0LnJlY29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgY29uc3QgZGF0YVJlY29yZEZlYXR1cmUgPSAoZGF0YVJlY29yZFNldENyZWF0ZU1lc3NhZ2UuZGF0YVJlY29yZFNldC5yZWNvcmRzW2ldIGFzXG4gICAgICAgICAgICAgICAgKEZlYXR1cmVRdWVyeURhdGFSZWNvcmQgfCBGZWF0dXJlTGF5ZXJEYXRhUmVjb3JkKSkuZmVhdHVyZTtcbiAgICAgICAgICAgICAgaWYgKGRhdGFSZWNvcmRGZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBGZWF0dXJlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoKGRhdGFSZWNvcmRGZWF0dXJlIGFzIGFueSkuY2xvbmUpIHtcbiAgICAgICAgICAgICAgICAgIHRlbXBGZWF0dXJlID0gKGRhdGFSZWNvcmRGZWF0dXJlIGFzIGFueSkuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGVtcEZlYXR1cmUgPSBHcmFwaGljLmZyb21KU09OKE9iamVjdC5hc3NpZ24oe30sIGRhdGFSZWNvcmRGZWF0dXJlKSk7XG4gICAgICAgICAgICAgICAgICB0ZW1wRmVhdHVyZS5hdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YVJlY29yZEZlYXR1cmUuYXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAodGVtcEZlYXR1cmUgYXMgYW55KS5sYXllciA9IGxheWVyO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZlYXR1cmVzLnB1c2godGVtcEZlYXR1cmUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZlYXR1cmVTZXQgPSB7XG4gICAgICAgICAgICAgIGZlYXR1cmVzOiBmZWF0dXJlc1xuICAgICAgICAgICAgfSBhcyBfX2VzcmkuRmVhdHVyZVNldFxuICAgICAgICAgIH1cblxuICAgICAgICAgIGdldEFwcFN0b3JlKCkuZGlzcGF0Y2goYXBwQWN0aW9ucy53aWRnZXRNdXRhYmxlU3RhdGVQcm9wQ2hhbmdlKHRoaXMud2lkZ2V0SWQsXG4gICAgICAgICAgICBgbmV3RmVhdHVyZVNldEFjdGlvblZhbHVlLnZhbHVlLiR7Y3JlYXRlZExheWVySWR9YCwgZmVhdHVyZVNldCkpO1xuXG4gICAgICAgICAgY29uc3QgcHJvbWlzZTogUHJvbWlzZTxhbnk+ID0gTXV0YWJsZVN0b3JlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YXRlVmFsdWUoW3RoaXMud2lkZ2V0SWQsXG4gICAgICAgICAgICAnbmV3RmVhdHVyZVNldEFjdGlvblZhbHVlJywgJ3Byb21pc2UnXSk7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtwcm9taXNlXSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wUHJvbWlzZTogUHJvbWlzZTxhbnk+ID0gTXV0YWJsZVN0b3JlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YXRlVmFsdWUoW3RoaXMud2lkZ2V0SWQsXG4gICAgICAgICAgICAgICduZXdGZWF0dXJlU2V0QWN0aW9uVmFsdWUnLCAncHJvbWlzZSddKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbdGVtcFByb21pc2VdKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIGNhc2UgTWVzc2FnZVR5cGUuRGF0YVJlY29yZFNldFVwZGF0ZTpcbiAgICAgICAgY29uc3QgZGF0YVJlY29yZFNldFVwZGF0ZU1lc3NhZ2UgPSBtZXNzYWdlIGFzIERhdGFSZWNvcmRTZXRVcGRhdGVNZXNzYWdlO1xuICAgICAgICBjb25zdCBjaGFuZ2VkTGF5ZXJJZCA9IGAke21lc3NhZ2Uud2lkZ2V0SWR9LSR7ZGF0YVJlY29yZFNldFVwZGF0ZU1lc3NhZ2UuZGF0YVJlY29yZFNldElkfWA7XG5cbiAgICAgICAgbGV0IGZlYXR1cmVTZXQgPSB7fTtcblxuICAgICAgICBpZiAoZGF0YVJlY29yZFNldFVwZGF0ZU1lc3NhZ2UuZGF0YVJlY29yZFNldCAmJiBkYXRhUmVjb3JkU2V0VXBkYXRlTWVzc2FnZS5kYXRhUmVjb3JkU2V0LnJlY29yZHMpIHtcbiAgICAgICAgICBjb25zdCBmZWF0dXJlcyA9IFtdO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhUmVjb3JkU2V0VXBkYXRlTWVzc2FnZS5kYXRhUmVjb3JkU2V0LnJlY29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFSZWNvcmRGZWF0dXJlID0gKGRhdGFSZWNvcmRTZXRVcGRhdGVNZXNzYWdlLmRhdGFSZWNvcmRTZXQucmVjb3Jkc1tpXSBhc1xuICAgICAgICAgICAgICAoRmVhdHVyZVF1ZXJ5RGF0YVJlY29yZCB8IEZlYXR1cmVMYXllckRhdGFSZWNvcmQpKS5mZWF0dXJlO1xuICAgICAgICAgICAgaWYgKGRhdGFSZWNvcmRGZWF0dXJlKSB7XG4gICAgICAgICAgICAgIGxldCB0ZW1wRmVhdHVyZSA9IG51bGw7XG4gICAgICAgICAgICAgIGlmICgoZGF0YVJlY29yZEZlYXR1cmUgYXMgYW55KS5jbG9uZSkge1xuICAgICAgICAgICAgICAgIHRlbXBGZWF0dXJlID0gKGRhdGFSZWNvcmRGZWF0dXJlIGFzIGFueSkuY2xvbmUoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ZW1wRmVhdHVyZSA9IEdyYXBoaWMuZnJvbUpTT04oT2JqZWN0LmFzc2lnbih7fSwgZGF0YVJlY29yZEZlYXR1cmUpKTtcbiAgICAgICAgICAgICAgICB0ZW1wRmVhdHVyZS5hdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YVJlY29yZEZlYXR1cmUuYXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAodGVtcEZlYXR1cmUgYXMgYW55KS5sYXllciA9IGxheWVyO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZmVhdHVyZXMucHVzaCh0ZW1wRmVhdHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmVhdHVyZVNldCA9IHtcbiAgICAgICAgICAgIGZlYXR1cmVzOiBmZWF0dXJlc1xuICAgICAgICAgIH0gYXMgX19lc3JpLkZlYXR1cmVTZXRcbiAgICAgICAgfVxuXG4gICAgICAgIGdldEFwcFN0b3JlKCkuZGlzcGF0Y2goYXBwQWN0aW9ucy53aWRnZXRNdXRhYmxlU3RhdGVQcm9wQ2hhbmdlKHRoaXMud2lkZ2V0SWQsXG4gICAgICAgICAgYGNoYW5nZWRGZWF0dXJlU2V0QWN0aW9uVmFsdWUuJHtjaGFuZ2VkTGF5ZXJJZH1gLCBmZWF0dXJlU2V0KSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUVBO0FBQUE7QUFBQTs7QUFtSUE7QUFsSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOzsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./extensions/widgets/arcgis/arcgis-map/src/message-actions/display-feature-set-action.ts\n");

/***/ }),

/***/ "jimu-arcgis":
/*!******************************!*\
  !*** external "jimu-arcgis" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_arcgis__;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamltdS1hcmNnaXMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqaW11LWFyY2dpc1wiPzlmMWMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2ppbXVfYXJjZ2lzX187Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///jimu-arcgis\n");

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