"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var jimu_core_1 = require("jimu-core");
var jimu_arcgis_1 = require("jimu-arcgis");
var utils_1 = require("../runtime/utils");
var PanToAction = /** @class */ (function (_super) {
    __extends(PanToAction, _super);
    function PanToAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanToAction.prototype.filterMessageType = function (messageType, messageWidgetId) {
        return messageType === jimu_core_1.MessageType.DataRecordSetCreate || messageType === jimu_core_1.MessageType.DataRecordSetUpdate
            || messageType === jimu_core_1.MessageType.DataRecordsSelectionChange || messageType === jimu_core_1.MessageType.ExtentChange;
    };
    PanToAction.prototype.filterMessage = function (message) {
        return true;
    };
    PanToAction.prototype.getSettingComponentUri = function (messageType, messageWidgetId) {
        var config = jimu_core_1.getAppStore().getState().appStateInBuilder ? jimu_core_1.getAppStore().getState().appStateInBuilder.appConfig : jimu_core_1.getAppStore().getState().appConfig;
        var messageWidgetJson = config.widgets[messageWidgetId];
        if (messageWidgetJson.manifest.label === 'Map') {
            if (messageType === jimu_core_1.MessageType.DataRecordsSelectionChange) {
                return 'message-actions/pan-to-action-setting';
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    PanToAction.prototype.onExecute = function (message, actionConfig) {
        var _this = this;
        return jimu_arcgis_1.loadArcGISJSAPIModules(['esri/Graphic']).then(function (modules) {
            var Graphic = null;
            Graphic = modules[0];
            switch (message.type) {
                case jimu_core_1.MessageType.DataRecordSetCreate:
                    var dataRecordSetCreateMessage = message;
                    var newFeatureSet = {};
                    if (dataRecordSetCreateMessage.dataRecordSet && dataRecordSetCreateMessage.dataRecordSet.records) {
                        var features = [];
                        for (var i = 0; i < dataRecordSetCreateMessage.dataRecordSet.records.length; i++) {
                            var dataRecordFeature = dataRecordSetCreateMessage.dataRecordSet.records[i].feature;
                            if (dataRecordFeature) {
                                features.push(utils_1.handleFeature(dataRecordFeature, Graphic).geometry);
                            }
                        }
                        newFeatureSet = {
                            features: features
                        };
                    }
                    jimu_core_1.getAppStore().dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(_this.widgetId, 'panToActionValue.value', newFeatureSet));
                    break;
                case jimu_core_1.MessageType.DataRecordSetUpdate:
                    var dataRecordSetUpdateMessage = message;
                    var updateFeatureSet = {};
                    if (dataRecordSetUpdateMessage.dataRecordSet && dataRecordSetUpdateMessage.dataRecordSet.records) {
                        var features = [];
                        for (var i = 0; i < dataRecordSetUpdateMessage.dataRecordSet.records.length; i++) {
                            var dataRecordFeature = dataRecordSetUpdateMessage.dataRecordSet.records[i].feature;
                            if (dataRecordFeature) {
                                features.push(utils_1.handleFeature(dataRecordFeature, Graphic).geometry);
                            }
                        }
                        updateFeatureSet = {
                            features: features
                        };
                    }
                    jimu_core_1.getAppStore().dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(_this.widgetId, 'panToActionValue.value', updateFeatureSet));
                    break;
                case jimu_core_1.MessageType.DataRecordsSelectionChange:
                    if (actionConfig) {
                        var dataRecordsSelectionChangeMessage = message;
                        var selectionFeatureSet = {};
                        var selectFeatures = [];
                        if (dataRecordsSelectionChangeMessage.records) {
                            if (dataRecordsSelectionChangeMessage.records[0]) {
                                if (!actionConfig.useDataSource || (dataRecordsSelectionChangeMessage.records[0].dataSource.id !== actionConfig.useDataSource.dataSourceId)) {
                                    break;
                                }
                            }
                            for (var i = 0; i < dataRecordsSelectionChangeMessage.records.length; i++) {
                                var dataRecordFeature = dataRecordsSelectionChangeMessage.records[i].feature;
                                if (dataRecordFeature) {
                                    selectFeatures.push(utils_1.handleFeature(dataRecordFeature, Graphic).geometry);
                                }
                            }
                        }
                        selectionFeatureSet = {
                            features: selectFeatures
                        };
                        jimu_core_1.getAppStore().dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(_this.widgetId, 'panToActionValue.value', selectionFeatureSet));
                        break;
                    }
                    else {
                        var dataRecordsSelectionChangeMessage = message;
                        var selectionFeatureSet = {};
                        var selectFeatures = [];
                        if (dataRecordsSelectionChangeMessage.records) {
                            for (var i = 0; i < dataRecordsSelectionChangeMessage.records.length; i++) {
                                var dataRecordFeature = dataRecordsSelectionChangeMessage.records[i].feature;
                                if (dataRecordFeature) {
                                    selectFeatures.push(utils_1.handleFeature(dataRecordFeature, Graphic).geometry);
                                }
                            }
                        }
                        selectionFeatureSet = {
                            features: selectFeatures
                        };
                        jimu_core_1.getAppStore().dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(_this.widgetId, 'panToActionValue.value', selectionFeatureSet));
                        break;
                    }
                case jimu_core_1.MessageType.ExtentChange:
                    var extentChangeMessage = message;
                    if (extentChangeMessage.getRelatedWidgetIds().indexOf(_this.widgetId) > -1) {
                        break;
                    }
                    var extentValue = {
                        features: [extentChangeMessage.extent]
                    };
                    var panToFeatureActionValue = {
                        value: extentValue,
                        relatedWidgets: extentChangeMessage.getRelatedWidgetIds()
                    };
                    jimu_core_1.getAppStore().dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(_this.widgetId, 'panToActionValue', panToFeatureActionValue));
                    break;
            }
            return true;
        });
    };
    return PanToAction;
}(jimu_core_1.AbstractMessageAction));
exports.default = PanToAction;
//# sourceMappingURL=pan-to-action.js.map