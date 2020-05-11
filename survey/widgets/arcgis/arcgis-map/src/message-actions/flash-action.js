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
var FlashAction = /** @class */ (function (_super) {
    __extends(FlashAction, _super);
    function FlashAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlashAction.prototype.filterMessageType = function (messageType, messageWidgetId) {
        return messageType === jimu_core_1.MessageType.DataRecordsSelectionChange;
    };
    FlashAction.prototype.filterMessage = function (message) {
        return true;
    };
    FlashAction.prototype.getSettingComponentUri = function (messageType, messageWidgetId) {
        return 'message-actions/flash-action-setting';
    };
    FlashAction.prototype.onExecute = function (message, actionConfig) {
        switch (message.type) {
            case jimu_core_1.MessageType.DataRecordsSelectionChange:
                var flashActionValue = null;
                if (actionConfig) {
                    if (actionConfig.messageUseDataSource && actionConfig.actionUseDataSource) {
                        if (message.records.length > 0
                            && message.records[0].dataSource.id !== actionConfig.messageUseDataSource.dataSourceId) {
                            jimu_core_1.getAppStore().dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(this.widgetId, 'flashActionValue', null));
                            break;
                        }
                        var messageDataSource = jimu_core_1.DataSourceManager.getInstance().getDataSource(actionConfig.messageUseDataSource.dataSourceId);
                        var actionDataSource = jimu_core_1.DataSourceManager.getInstance().getDataSource(actionConfig.actionUseDataSource.dataSourceId);
                        if (messageDataSource && actionDataSource) {
                            // when ds instances exit
                            if (actionConfig.enabledDataRelationShip) {
                                // use DataRelationShip
                                var messageField = null;
                                var actionField = null;
                                if (actionConfig.messageUseDataSource.dataSourceId === actionConfig.actionUseDataSource.dataSourceId &&
                                    actionConfig.messageUseDataSource.rootDataSourceId === actionConfig.actionUseDataSource.rootDataSourceId) {
                                    // if trigger ds is same to action ds
                                    var messageDsSchema_1 = messageDataSource.getSchema();
                                    var objectIdJimuFieldName = messageDsSchema_1 && messageDsSchema_1.fields
                                        && Object.keys(messageDsSchema_1.fields).find(function (jimuFieldName) { return messageDsSchema_1.fields[jimuFieldName].esriType === 'esriFieldTypeOID'; });
                                    messageField = messageDsSchema_1 && messageDsSchema_1.fields && messageDsSchema_1.fields[objectIdJimuFieldName];
                                    actionField = messageField;
                                }
                                else {
                                    // if trigger ds isn't same to action ds
                                    var messageJimuFieldName = actionConfig.messageUseDataSource.fields[0];
                                    var actionJimuFieldName = actionConfig.actionUseDataSource.fields[0];
                                    messageField = messageDataSource.getSchema().fields[messageJimuFieldName];
                                    actionField = actionDataSource.getSchema().fields[actionJimuFieldName];
                                }
                                var whereSql = '';
                                if (messageField && actionField) {
                                    var messageFieldName = messageField.name;
                                    var messageFieldType = messageField.type;
                                    var tempMessage = message;
                                    var messageFieldValues = [];
                                    for (var i = 0; i < tempMessage.records.length; i++) {
                                        var tempFieldValue = tempMessage.records[i].getData()[messageFieldName];
                                        if (messageFieldValues.indexOf("" + this.formatValue(tempFieldValue, messageFieldType)) > -1) {
                                            continue;
                                        }
                                        else {
                                            messageFieldValues.push("" + this.formatValue(tempMessage.records[i].getData()[messageFieldName], messageFieldType));
                                        }
                                    }
                                    whereSql = actionField.name + " IN ";
                                    if (messageFieldValues.length > 0) {
                                        whereSql = whereSql + ("(" + messageFieldValues.join(', ') + ")");
                                    }
                                    else {
                                        whereSql = '';
                                    }
                                }
                                if (message.records.length > 0) {
                                    var moreAditionSQL = actionConfig.sqlExprObj ? jimu_core_1.dataSourceUtils.getArcGISSQL(actionConfig.sqlExprObj, actionDataSource).sql : null;
                                    if (moreAditionSQL) {
                                        if (whereSql) {
                                            whereSql = whereSql + ' AND ' + moreAditionSQL;
                                        }
                                        else {
                                            whereSql = moreAditionSQL;
                                        }
                                    }
                                }
                                else {
                                    whereSql = '';
                                }
                                var query = {
                                    outFields: ['*'],
                                    where: whereSql,
                                    returnGeometry: true
                                };
                                var realQuery = actionDataSource.getRealQueryParams(query, 'query');
                                flashActionValue = {
                                    layerId: this.getLayerIdFromLayerDs(actionDataSource),
                                    querySQL: realQuery && realQuery.where
                                };
                            }
                            else {
                                // not use DataRelationShip
                                var whereSql = '';
                                if (message.records.length > 0) {
                                    var moreAditionSQL = actionConfig.sqlExprObj ? jimu_core_1.dataSourceUtils.getArcGISSQL(actionConfig.sqlExprObj, actionDataSource).sql : null;
                                    if (moreAditionSQL) {
                                        whereSql = moreAditionSQL;
                                    }
                                }
                                else {
                                    whereSql = '';
                                }
                                var query = {
                                    outFields: ['*'],
                                    where: whereSql,
                                    returnGeometry: true
                                };
                                var realQuery = actionDataSource.getRealQueryParams(query, 'query');
                                flashActionValue = {
                                    layerId: this.getLayerIdFromLayerDs(actionDataSource),
                                    querySQL: realQuery && realQuery.where
                                };
                            }
                        }
                        else {
                            // when ds instances don't exist
                            flashActionValue = null;
                        }
                    }
                    else {
                        flashActionValue = null;
                    }
                }
                jimu_core_1.getAppStore().dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(this.widgetId, 'flashActionValue', flashActionValue));
                break;
        }
        return true;
    };
    FlashAction.prototype.getLayerIdFromLayerDs = function (ds) {
        if (ds.layerId) {
            return ds.layerId;
        }
        else if (ds.layer) {
            return ds.layer.id;
        }
        else {
            return null;
        }
    };
    FlashAction.prototype.formatValue = function (value, type) {
        if (type === 'STRING') {
            return "'" + value + "'";
        }
        else if (type === 'NUMBER') {
            return "" + value;
        }
        else if (type === 'DATE') {
            return "'" + value + "'";
        }
    };
    return FlashAction;
}(jimu_core_1.AbstractMessageAction));
exports.default = FlashAction;
//# sourceMappingURL=flash-action.js.map