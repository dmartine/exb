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
var ZoomToFeatureAction = /** @class */ (function (_super) {
    __extends(ZoomToFeatureAction, _super);
    function ZoomToFeatureAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.NoLockTriggerLayerWidgets = ['Map'];
        return _this;
    }
    ZoomToFeatureAction.prototype.filterMessageType = function (messageType, messageWidgetId) {
        return messageType === jimu_core_1.MessageType.DataRecordSetCreate || messageType === jimu_core_1.MessageType.DataRecordSetUpdate
            || messageType === jimu_core_1.MessageType.DataRecordsSelectionChange || messageType === jimu_core_1.MessageType.ExtentChange;
    };
    ZoomToFeatureAction.prototype.filterMessage = function (message) {
        return true;
    };
    ZoomToFeatureAction.prototype.getSettingComponentUri = function (messageType, messageWidgetId) {
        if (messageType === jimu_core_1.MessageType.DataRecordsSelectionChange) {
            return 'message-actions/zoom-to-feature-action-setting';
        }
        else {
            return null;
        }
    };
    ZoomToFeatureAction.prototype.onExecute = function (message, actionConfig) {
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
                            if (dataRecordSetCreateMessage.dataRecordSet.records[i].feature) {
                                features.push(utils_1.handleFeature(dataRecordSetCreateMessage.dataRecordSet.records[i].feature, Graphic));
                            }
                        }
                        newFeatureSet = {
                            features: features,
                            type: 'zoom-to-graphics'
                        };
                    }
                    jimu_core_1.getAppStore().dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(_this.widgetId, 'zoomToFeatureActionValue.value', newFeatureSet));
                    break;
                case jimu_core_1.MessageType.DataRecordSetUpdate:
                    var dataRecordSetUpdateMessage = message;
                    var updateFeatureSet = {};
                    if (dataRecordSetUpdateMessage.dataRecordSet && dataRecordSetUpdateMessage.dataRecordSet.records) {
                        var features = [];
                        for (var i = 0; i < dataRecordSetUpdateMessage.dataRecordSet.records.length; i++) {
                            if (dataRecordSetUpdateMessage.dataRecordSet.records[i].feature) {
                                features.push(utils_1.handleFeature(dataRecordSetUpdateMessage.dataRecordSet.records[i].feature, Graphic));
                            }
                        }
                        updateFeatureSet = {
                            features: features,
                            type: 'zoom-to-graphics'
                        };
                    }
                    jimu_core_1.getAppStore().dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(_this.widgetId, 'zoomToFeatureActionValue.value', updateFeatureSet));
                    break;
                case jimu_core_1.MessageType.DataRecordsSelectionChange:
                    var config = jimu_core_1.getAppStore().getState().appConfig;
                    var messageWidgetJson = config.widgets[message.widgetId];
                    var messageWidgetLabel = messageWidgetJson.manifest.label;
                    if (actionConfig) {
                        var dataRecordsSelectionChangeMessage = message;
                        var selectionFeatureSet = {};
                        var selectFeatures = [];
                        var layerId = null;
                        if (dataRecordsSelectionChangeMessage.records) {
                            if (dataRecordsSelectionChangeMessage.records[0]) {
                                if (dataRecordsSelectionChangeMessage.records[0].dataSource.layer) {
                                    layerId = dataRecordsSelectionChangeMessage.records[0].dataSource.layer.id;
                                }
                                if (_this.NoLockTriggerLayerWidgets.indexOf(messageWidgetLabel) > -1) {
                                    if (!actionConfig.useDataSource || (dataRecordsSelectionChangeMessage.records[0].dataSource.id !== actionConfig.useDataSource.dataSourceId)) {
                                        break;
                                    }
                                }
                            }
                            for (var i = 0; i < dataRecordsSelectionChangeMessage.records.length; i++) {
                                if (dataRecordsSelectionChangeMessage.records[i].feature) {
                                    selectFeatures.push(utils_1.handleFeature(dataRecordsSelectionChangeMessage.records[i].feature, Graphic));
                                }
                            }
                        }
                        selectionFeatureSet = {
                            features: selectFeatures,
                            layerId: layerId,
                            zoomToOption: actionConfig && actionConfig.isUseCustomZoomToOption && actionConfig.zoomToOption.scale ? actionConfig.zoomToOption : null,
                            type: 'zoom-to-graphics'
                        };
                        jimu_core_1.getAppStore().dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(_this.widgetId, 'zoomToFeatureActionValue.value', selectionFeatureSet));
                        break;
                    }
                    else {
                        var dataRecordsSelectionChangeMessage = message;
                        var selectionFeatureSet = {};
                        var selectFeatures = [];
                        var layerId = null;
                        if (dataRecordsSelectionChangeMessage.records) {
                            if (dataRecordsSelectionChangeMessage.records[0]) {
                                if (dataRecordsSelectionChangeMessage.records[0].dataSource.layer) {
                                    layerId = dataRecordsSelectionChangeMessage.records[0].dataSource.layer.id;
                                }
                                if (_this.NoLockTriggerLayerWidgets.indexOf(messageWidgetLabel) > -1) {
                                    if (!actionConfig.useDataSource || (dataRecordsSelectionChangeMessage.records[0].dataSource.id !== actionConfig.useDataSource.dataSourceId)) {
                                        break;
                                    }
                                }
                            }
                            for (var i = 0; i < dataRecordsSelectionChangeMessage.records.length; i++) {
                                if (dataRecordsSelectionChangeMessage.records[i].feature) {
                                    selectFeatures.push(utils_1.handleFeature(dataRecordsSelectionChangeMessage.records[i].feature, Graphic));
                                }
                            }
                        }
                        selectionFeatureSet = {
                            features: selectFeatures,
                            layerId: layerId,
                            zoomToOption: null,
                            type: 'zoom-to-graphics'
                        };
                        jimu_core_1.getAppStore().dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(_this.widgetId, 'zoomToFeatureActionValue.value', selectionFeatureSet));
                        break;
                    }
                case jimu_core_1.MessageType.ExtentChange:
                    var extentChangeMessage = message;
                    if (extentChangeMessage.getRelatedWidgetIds().indexOf(_this.widgetId) > -1) {
                        break;
                    }
                    var extentValue = {
                        features: [extentChangeMessage.extent],
                        type: 'zoom-to-extent'
                    };
                    var zoomToFeatureActionValue = {
                        value: extentValue,
                        relatedWidgets: extentChangeMessage.getRelatedWidgetIds()
                    };
                    jimu_core_1.getAppStore().dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(_this.widgetId, 'zoomToFeatureActionValue', zoomToFeatureActionValue));
                    break;
            }
            return true;
        });
    };
    return ZoomToFeatureAction;
}(jimu_core_1.AbstractMessageAction));
exports.default = ZoomToFeatureAction;
//# sourceMappingURL=zoom-to-feature-action.js.map