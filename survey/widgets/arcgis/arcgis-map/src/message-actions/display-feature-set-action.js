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
var DisplayFeatureSetAction = /** @class */ (function (_super) {
    __extends(DisplayFeatureSetAction, _super);
    function DisplayFeatureSetAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DisplayFeatureSetAction.prototype.filterMessageType = function (messageType, messageWidgetId) {
        return messageType === jimu_core_1.MessageType.DataRecordSetUpdate || messageType === jimu_core_1.MessageType.DataRecordSetCreate;
    };
    DisplayFeatureSetAction.prototype.filterMessage = function (message) {
        return true;
    };
    DisplayFeatureSetAction.prototype.onExecute = function (message, actionConfig) {
        var _this = this;
        var dataRecordSetMessage = message;
        if (dataRecordSetMessage.dataRecordSet && dataRecordSetMessage.dataRecordSet.records) {
            var datasource_1 = dataRecordSetMessage.dataRecordSet.records[0]
                && dataRecordSetMessage.dataRecordSet.records[0].dataSource;
            if (datasource_1.type === jimu_core_1.DataSourceTypes.FeatureQuery) {
                return jimu_arcgis_1.loadArcGISJSAPIModules(['esri/renderers/support/jsonUtils', 'esri/layers/support/Field', 'esri/Graphic']).then(function (modules) {
                    var jsonUtils = null;
                    var Field = null;
                    var Graphic = null;
                    jsonUtils = modules[0], Field = modules[1], Graphic = modules[2];
                    var layer = {
                        title: datasource_1.label,
                        renderer: jsonUtils.fromJSON(datasource_1.getLayerDefinition().drawingInfo.renderer),
                        fields: datasource_1.getLayerDefinition().fields.map(function (field) { return Field.fromJSON(field); })
                    };
                    return _this.handleMessage(message, layer, Graphic);
                });
            }
            else {
                return this.handleMessage(message);
            }
        }
        else {
            return true;
        }
    };
    DisplayFeatureSetAction.prototype.handleMessage = function (message, layer, Graphic) {
        var _this = this;
        switch (message.type) {
            case jimu_core_1.MessageType.DataRecordSetCreate:
                var dataRecordSetCreateMessage = message;
                var createdLayerId = message.widgetId + "-" + dataRecordSetCreateMessage.dataRecordSetId;
                var newFeatureSetActionValue = jimu_core_1.MutableStoreManager.getInstance().getStateValue([this.widgetId,
                    'newFeatureSetActionValue', 'value', "" + createdLayerId]);
                if (!newFeatureSetActionValue) {
                    var featureSet_1 = {};
                    if (dataRecordSetCreateMessage.dataRecordSet && dataRecordSetCreateMessage.dataRecordSet.records) {
                        var features = [];
                        for (var i = 0; i < dataRecordSetCreateMessage.dataRecordSet.records.length; i++) {
                            var dataRecordFeature = dataRecordSetCreateMessage.dataRecordSet.records[i].feature;
                            if (dataRecordFeature) {
                                var tempFeature = null;
                                if (dataRecordFeature.clone) {
                                    tempFeature = dataRecordFeature.clone();
                                }
                                else {
                                    tempFeature = Graphic.fromJSON(Object.assign({}, dataRecordFeature));
                                    tempFeature.attributes = Object.assign({}, dataRecordFeature.attributes);
                                }
                                if (layer) {
                                    tempFeature.layer = layer;
                                }
                                features.push(tempFeature);
                            }
                        }
                        featureSet_1 = {
                            features: features
                        };
                    }
                    jimu_core_1.getAppStore().dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(this.widgetId, "newFeatureSetActionValue.value." + createdLayerId, featureSet_1));
                    var promise = jimu_core_1.MutableStoreManager.getInstance().getStateValue([this.widgetId,
                        'newFeatureSetActionValue', 'promise']);
                    return Promise.all([promise]).then(function () {
                        var tempPromise = jimu_core_1.MutableStoreManager.getInstance().getStateValue([_this.widgetId,
                            'newFeatureSetActionValue', 'promise']);
                        return Promise.all([tempPromise]).then(function () {
                            return true;
                        });
                    }, function () {
                        return true;
                    });
                }
            case jimu_core_1.MessageType.DataRecordSetUpdate:
                var dataRecordSetUpdateMessage = message;
                var changedLayerId = message.widgetId + "-" + dataRecordSetUpdateMessage.dataRecordSetId;
                var featureSet = {};
                if (dataRecordSetUpdateMessage.dataRecordSet && dataRecordSetUpdateMessage.dataRecordSet.records) {
                    var features = [];
                    for (var i = 0; i < dataRecordSetUpdateMessage.dataRecordSet.records.length; i++) {
                        var dataRecordFeature = dataRecordSetUpdateMessage.dataRecordSet.records[i].feature;
                        if (dataRecordFeature) {
                            var tempFeature = null;
                            if (dataRecordFeature.clone) {
                                tempFeature = dataRecordFeature.clone();
                            }
                            else {
                                tempFeature = Graphic.fromJSON(Object.assign({}, dataRecordFeature));
                                tempFeature.attributes = Object.assign({}, dataRecordFeature.attributes);
                            }
                            if (layer) {
                                tempFeature.layer = layer;
                            }
                            features.push(tempFeature);
                        }
                    }
                    featureSet = {
                        features: features
                    };
                }
                jimu_core_1.getAppStore().dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(this.widgetId, "changedFeatureSetActionValue." + changedLayerId, featureSet));
                break;
        }
        return true;
    };
    return DisplayFeatureSetAction;
}(jimu_core_1.AbstractMessageAction));
exports.default = DisplayFeatureSetAction;
//# sourceMappingURL=display-feature-set-action.js.map