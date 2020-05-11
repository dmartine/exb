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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var jimu_core_1 = require("jimu-core");
var jimu_ui_1 = require("jimu-ui");
var setting_components_1 = require("jimu-ui/setting-components");
var data_source_selector_1 = require("jimu-ui/data-source-selector");
var jimu_arcgis_1 = require("jimu-arcgis");
var data_source_selector_2 = require("jimu-ui/data-source-selector");
var sql_expression_builder_1 = require("jimu-ui/sql-expression-builder");
var sql_expression_runtime_1 = require("jimu-ui/sql-expression-runtime");
var default_1 = require("../setting/translations/default");
var DSSelectorTypes = jimu_core_1.Immutable([data_source_selector_2.AllDataSourceTypes.FeatureLayer, data_source_selector_2.AllDataSourceTypes.FeatureQuery]);
var _FlashActionSetting = /** @class */ (function (_super) {
    __extends(_FlashActionSetting, _super);
    function _FlashActionSetting(props) {
        var _this = _super.call(this, props) || this;
        _this.modalStyle = { position: 'absolute', top: '0', bottom: '0', width: '259px',
            height: 'auto', borderRight: '', borderBottom: '', paddingBottom: '1px' };
        _this.getInitConfig = function () {
            var messageWidgetId = _this.props.messageWidgetId;
            var config = jimu_core_1.getAppStore().getState().appStateInBuilder.appConfig;
            var messageWidgetJson = config.widgets[messageWidgetId];
            var messageUseDataSource = null;
            var actionUseDataSource = null;
            if (!_this.props.config.messageUseDataSource) {
                if (messageWidgetJson && messageWidgetJson.useDataSources && messageWidgetJson.useDataSources[0] && messageWidgetJson.useDataSources.length === 1) {
                    var dsJson = config.dataSources[messageWidgetJson.useDataSources[0].dataSourceId];
                    if (dsJson && ((dsJson.type === jimu_arcgis_1.ArcGISDataSourceTypes.WebMap) || (dsJson.type === jimu_arcgis_1.ArcGISDataSourceTypes.WebScene))) {
                        messageUseDataSource = null;
                    }
                    else {
                        messageUseDataSource = jimu_core_1.Immutable({
                            dataSourceId: messageWidgetJson.useDataSources[0].dataSourceId,
                            rootDataSourceId: messageWidgetJson.useDataSources[0].rootDataSourceId
                        });
                    }
                }
            }
            else {
                messageUseDataSource = _this.checkAndGetInitUseDataSource(_this.props.messageWidgetId, _this.props.config.messageUseDataSource);
            }
            var actionWidgetId = _this.props.widgetId;
            var actionWidgetJson = config.widgets[actionWidgetId];
            if (!_this.props.config.actionUseDataSource) {
                if (actionWidgetJson && actionWidgetJson.useDataSources && actionWidgetJson.useDataSources[0] && actionWidgetJson.useDataSources.length === 1) {
                    var dsJson = config.dataSources[actionWidgetJson.useDataSources[0].dataSourceId];
                    if (dsJson && ((dsJson.type === jimu_arcgis_1.ArcGISDataSourceTypes.WebMap) || (dsJson.type === jimu_arcgis_1.ArcGISDataSourceTypes.WebScene))) {
                        actionUseDataSource = null;
                    }
                    else {
                        actionUseDataSource = jimu_core_1.Immutable({
                            dataSourceId: actionWidgetJson.useDataSources[0].dataSourceId,
                            rootDataSourceId: actionWidgetJson.useDataSources[0].rootDataSourceId
                        });
                    }
                }
            }
            else {
                actionUseDataSource = _this.checkAndGetInitUseDataSource(_this.props.widgetId, _this.props.config.actionUseDataSource);
            }
            var oldActionUseDataSourceId = _this.props.config.actionUseDataSource && _this.props.config.actionUseDataSource.dataSourceId;
            var newActionUseDataSourceId = actionUseDataSource && actionUseDataSource.dataSourceId;
            if (newActionUseDataSourceId !== oldActionUseDataSourceId) {
                return {
                    messageUseDataSource: messageUseDataSource,
                    actionUseDataSource: actionUseDataSource,
                    sqlExprObj: null
                };
            }
            else {
                return {
                    messageUseDataSource: messageUseDataSource,
                    actionUseDataSource: actionUseDataSource,
                    sqlExprObj: _this.props.config.sqlExprObj
                };
            }
        };
        _this.checkAndGetInitUseDataSource = function (widgetId, oldUseDataSource) {
            var config = jimu_core_1.getAppStore().getState().appStateInBuilder.appConfig;
            var widgetJson = config.widgets[widgetId];
            var initUseDataSource = null;
            var isMapDs = false;
            var dsId = widgetJson.useDataSources && widgetJson.useDataSources[0] && widgetJson.useDataSources[0].dataSourceId;
            if (!dsId) {
                return null;
            }
            var dsJson = config.dataSources[dsId];
            if (dsJson && ((dsJson.type === jimu_arcgis_1.ArcGISDataSourceTypes.WebMap) || (dsJson.type === jimu_arcgis_1.ArcGISDataSourceTypes.WebScene))) {
                isMapDs = true;
            }
            if (isMapDs) {
                // webmap or webscene ds
                var isUseOldDs = false;
                if (widgetJson && widgetJson.useDataSources) {
                    for (var i = 0; i < widgetJson.useDataSources.length; i++) {
                        if (widgetJson.useDataSources[i].dataSourceId === oldUseDataSource.rootDataSourceId) {
                            isUseOldDs = true;
                            break;
                        }
                    }
                }
                if (isUseOldDs) {
                    initUseDataSource = oldUseDataSource;
                }
                else {
                    initUseDataSource = null;
                }
            }
            else {
                // featurelayer ds
                var isUseOldDs = false;
                if (widgetJson && widgetJson.useDataSources) {
                    for (var i = 0; i < widgetJson.useDataSources.length; i++) {
                        if (widgetJson.useDataSources[i].dataSourceId === oldUseDataSource.dataSourceId) {
                            isUseOldDs = true;
                            break;
                        }
                    }
                }
                if (isUseOldDs) {
                    initUseDataSource = oldUseDataSource;
                }
                else {
                    if (widgetJson && widgetJson.useDataSources && widgetJson.useDataSources.length === 1) {
                        initUseDataSource = jimu_core_1.Immutable({
                            dataSourceId: widgetJson.useDataSources[0].dataSourceId,
                            rootDataSourceId: widgetJson.useDataSources[0].rootDataSourceId
                        });
                    }
                    else {
                        initUseDataSource = null;
                    }
                }
            }
            return initUseDataSource;
        };
        _this.handleTriggerLayerSelected = function (allSelectedDss, currentSelectedDs) {
            var useDataSource = {
                dataSourceId: currentSelectedDs.dataSourceJson.id,
                rootDataSourceId: currentSelectedDs.rootDataSourceId
            };
            _this.props.onSettingChange({
                actionId: _this.props.actionId,
                config: _this.props.config.set('messageUseDataSource', useDataSource)
            });
        };
        _this.handleActionLayerSelected = function (allSelectedDss, currentSelectedDs) {
            var useDataSource = {
                dataSourceId: currentSelectedDs.dataSourceJson.id,
                rootDataSourceId: currentSelectedDs.rootDataSourceId
            };
            _this.props.onSettingChange({
                actionId: _this.props.actionId,
                config: _this.props.config.set('actionUseDataSource', useDataSource).set('sqlExprObj', null)
            });
        };
        _this.handleRemoveLayerForTriggerLayer = function () {
            _this.props.onSettingChange({
                actionId: _this.props.actionId,
                config: _this.props.config.set('messageUseDataSource', null)
            });
        };
        _this.handleRemoveLayerForActionLayer = function () {
            _this.props.onSettingChange({
                actionId: _this.props.actionId,
                config: _this.props.config.set('actionUseDataSource', null).set('sqlExprObj', null)
            });
        };
        _this.showSqlExprPopup = function () {
            _this.setState({ isSqlExprShow: true });
        };
        _this.toggleSqlExprPopup = function () {
            _this.setState({ isSqlExprShow: !_this.state.isSqlExprShow });
        };
        _this.onSqlExprBuilderChange = function (sqlExprObj) {
            _this.props.onSettingChange({
                actionId: _this.props.actionId,
                config: _this.props.config.set('sqlExprObj', sqlExprObj)
            });
        };
        _this.onMessageFieldSelected = function (allSelectedFields, field, ds) {
            _this.props.onSettingChange({
                actionId: _this.props.actionId,
                config: _this.props.config.set('messageUseDataSource', {
                    dataSourceId: _this.props.config.messageUseDataSource.dataSourceId,
                    rootDataSourceId: _this.props.config.messageUseDataSource.rootDataSourceId,
                    fields: [field.jimuName]
                })
            });
        };
        _this.onActionFieldSelected = function (allSelectedFields, field, ds) {
            _this.props.onSettingChange({
                actionId: _this.props.actionId,
                config: _this.props.config.set('actionUseDataSource', {
                    dataSourceId: _this.props.config.actionUseDataSource.dataSourceId,
                    rootDataSourceId: _this.props.config.actionUseDataSource.rootDataSourceId,
                    fields: [field.jimuName]
                })
            });
        };
        _this.swicthEnabledDataRelationShip = function (checked) {
            _this.props.onSettingChange({
                actionId: _this.props.actionId,
                config: _this.props.config.set('enabledDataRelationShip', checked)
            });
        };
        _this.checkTrigerLayerIsSameToActionLayer = function () {
            if (_this.props.config.messageUseDataSource && _this.props.config.actionUseDataSource) {
                if (_this.props.config.messageUseDataSource.dataSourceId === _this.props.config.actionUseDataSource.dataSourceId &&
                    _this.props.config.messageUseDataSource.rootDataSourceId === _this.props.config.actionUseDataSource.rootDataSourceId) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };
        _this.getDsRootIdsByWidgetId = function (wId) {
            var _a, _b, _c, _d, _e, _f;
            var appConfig = (_b = (_a = jimu_core_1.getAppStore().getState()) === null || _a === void 0 ? void 0 : _a.appStateInBuilder) === null || _b === void 0 ? void 0 : _b.appConfig;
            var widgetJson = (_d = (_c = appConfig) === null || _c === void 0 ? void 0 : _c.widgets) === null || _d === void 0 ? void 0 : _d[wId];
            var rootIds = [];
            var dsM = jimu_core_1.DataSourceManager.getInstance();
            (_f = (_e = widgetJson) === null || _e === void 0 ? void 0 : _e.useDataSources) === null || _f === void 0 ? void 0 : _f.forEach(function (useDS) {
                var _a, _b;
                var ds = dsM.getDataSource(useDS.dataSourceId);
                if (((_a = ds) === null || _a === void 0 ? void 0 : _a.type) === jimu_arcgis_1.ArcGISDataSourceTypes.WebMap || ((_b = ds) === null || _b === void 0 ? void 0 : _b.type) === jimu_arcgis_1.ArcGISDataSourceTypes.WebScene) { //is root ds
                    rootIds.push(useDS.dataSourceId);
                }
            });
            return rootIds.length > 0 ? jimu_core_1.Immutable(rootIds) : undefined;
        };
        _this.getDsIdsByWidgetId = function (wId) {
            var _a, _b, _c, _d, _e, _f, _g;
            var appConfig = (_b = (_a = jimu_core_1.getAppStore().getState()) === null || _a === void 0 ? void 0 : _a.appStateInBuilder) === null || _b === void 0 ? void 0 : _b.appConfig;
            var widgetJson = (_d = (_c = appConfig) === null || _c === void 0 ? void 0 : _c.widgets) === null || _d === void 0 ? void 0 : _d[wId];
            return jimu_core_1.Immutable((_g = (_f = (_e = widgetJson) === null || _e === void 0 ? void 0 : _e.useDataSources) === null || _f === void 0 ? void 0 : _f.map(function (useDS) { return useDS.dataSourceId; }), (_g !== null && _g !== void 0 ? _g : [])));
        };
        _this.getDsSelectorSourceData = function (widgetId, useDataSource) {
            var _a, _b, _c, _d;
            var appConfig = (_b = (_a = jimu_core_1.getAppStore().getState()) === null || _a === void 0 ? void 0 : _a.appStateInBuilder) === null || _b === void 0 ? void 0 : _b.appConfig;
            var widgetJson = (_d = (_c = appConfig) === null || _c === void 0 ? void 0 : _c.widgets) === null || _d === void 0 ? void 0 : _d[widgetId];
            var isReadOnly = false;
            var dsRootIds = _this.getDsRootIdsByWidgetId(widgetId);
            if (dsRootIds && dsRootIds.length === 0 && (widgetJson && widgetJson.useDataSources && widgetJson.useDataSources.length === 1)) {
                isReadOnly = true;
            }
            if (!dsRootIds && (widgetJson && widgetJson.useDataSources && widgetJson.useDataSources.length === 1)) {
                isReadOnly = true;
            }
            var selectedDataSourceIds = (useDataSource && useDataSource.dataSourceId)
                ? jimu_core_1.Immutable([useDataSource.dataSourceId]) : jimu_core_1.Immutable([]);
            var fromDsIds = dsRootIds ? undefined : _this.getDsIdsByWidgetId(widgetId);
            var dsSelectorSource = {
                isReadOnly: isReadOnly,
                selectedDataSourceIds: selectedDataSourceIds,
                fromRootDsIds: dsRootIds,
                fromDsIds: fromDsIds
            };
            return dsSelectorSource;
        };
        _this.modalStyle.borderRight = '1px solid black';
        _this.modalStyle.borderBottom = '1px solid black';
        _this.state = {
            isShowLayerList: false,
            currentLayerType: null,
            isSqlExprShow: false
        };
        return _this;
    }
    _FlashActionSetting.prototype.componentDidMount = function () {
        var initConfig = this.getInitConfig();
        this.props.onSettingChange({
            actionId: this.props.actionId,
            config: this.props.config.set('messageUseDataSource', initConfig.messageUseDataSource)
                .set('actionUseDataSource', initConfig.actionUseDataSource).set('sqlExprObj', initConfig.sqlExprObj)
        });
    };
    _FlashActionSetting.prototype.getStyle = function (theme) {
        return jimu_core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      .setting-header {\n        padding: ", " ", " ", " ", "\n      }\n\n      .deleteIcon {\n        cursor: pointer;\n        opacity: .8;\n      }\n\n      .deleteIcon:hover {\n        opacity: 1;\n      }\n\n      .sql-expr-display {\n        width: 100%;\n        height: auto;\n        min-height: 60px;\n        line-height: 25px;\n        padding: 3px 5px;\n        color: ", ";\n        border: 1px solid ", ";\n      }\n\n      .relate-panel-left {\n        flex: auto;\n        .action-select-chooser {\n          margin-top: ", ";\n        }\n      }\n    "], ["\n      .setting-header {\n        padding: ", " ", " ", " ", "\n      }\n\n      .deleteIcon {\n        cursor: pointer;\n        opacity: .8;\n      }\n\n      .deleteIcon:hover {\n        opacity: 1;\n      }\n\n      .sql-expr-display {\n        width: 100%;\n        height: auto;\n        min-height: 60px;\n        line-height: 25px;\n        padding: 3px 5px;\n        color: ", ";\n        border: 1px solid ", ";\n      }\n\n      .relate-panel-left {\n        flex: auto;\n        .action-select-chooser {\n          margin-top: ", ";\n        }\n      }\n    "])), jimu_core_1.polished.rem(10), jimu_core_1.polished.rem(16), jimu_core_1.polished.rem(0), jimu_core_1.polished.rem(16), theme.colors.palette.dark[300], theme.colors.palette.light[500], jimu_core_1.polished.rem(12));
    };
    _FlashActionSetting.prototype.render = function () {
        var _this = this;
        var actionUseDataSourceInstance = this.props.config.actionUseDataSource
            && jimu_core_1.DataSourceManager.getInstance().getDataSource(this.props.config.actionUseDataSource.dataSourceId);
        var theme = this.props.theme;
        var triggerDsSelectorSourceData = this.getDsSelectorSourceData(this.props.messageWidgetId, this.props.config.messageUseDataSource);
        var actionDsSelectorSourceData = this.getDsSelectorSourceData(this.props.widgetId, this.props.config.actionUseDataSource);
        return jimu_core_1.jsx("div", { css: this.getStyle(this.props.theme) },
            jimu_core_1.jsx(setting_components_1.SettingSection, { title: this.props.intl.formatMessage({ id: 'mapAction_TriggerLayer', defaultMessage: default_1.default.mapAction_TriggerLayer }) }, jimu_core_1.jsx(data_source_selector_2.DataSourceSelector, { types: DSSelectorTypes, selectedDataSourceIds: triggerDsSelectorSourceData.selectedDataSourceIds, fromRootDsIds: triggerDsSelectorSourceData.fromRootDsIds, fromDsIds: triggerDsSelectorSourceData.fromDsIds, closeDataSourceListOnSelect: true, disableRemove: function () { return triggerDsSelectorSourceData.isReadOnly; }, disableDsList: triggerDsSelectorSourceData.isReadOnly, hideAddData: true, hideTypeDropdown: true, mustUseDataSource: true, onSelect: this.handleTriggerLayerSelected, onRemove: this.handleRemoveLayerForTriggerLayer })),
            jimu_core_1.jsx(setting_components_1.SettingSection, { title: this.props.intl.formatMessage({ id: 'mapAction_ActionLayer', defaultMessage: default_1.default.mapAction_ActionLayer }) }, jimu_core_1.jsx(data_source_selector_2.DataSourceSelector, { types: DSSelectorTypes, selectedDataSourceIds: actionDsSelectorSourceData.selectedDataSourceIds, fromRootDsIds: actionDsSelectorSourceData.fromRootDsIds, fromDsIds: actionDsSelectorSourceData.fromDsIds, closeDataSourceListOnSelect: true, disableRemove: function () { return actionDsSelectorSourceData.isReadOnly; }, disableDsList: actionDsSelectorSourceData.isReadOnly, hideAddData: true, hideTypeDropdown: true, mustUseDataSource: true, onSelect: this.handleActionLayerSelected, onRemove: this.handleRemoveLayerForActionLayer })),
            this.props.config && this.props.config.messageUseDataSource && this.props.config.actionUseDataSource
                && jimu_core_1.jsx(setting_components_1.SettingSection, { title: this.props.intl.formatMessage({ id: 'mapAction_Conditions', defaultMessage: default_1.default.mapAction_Conditions }) },
                    jimu_core_1.jsx(setting_components_1.SettingRow, { label: this.props.intl.formatMessage({ id: 'mapAction_RelateMessage', defaultMessage: default_1.default.mapAction_RelateMessage }) },
                        jimu_core_1.jsx(jimu_ui_1.Switch, { checked: this.props.config.enabledDataRelationShip, onChange: function (evt) { _this.swicthEnabledDataRelationShip(evt.target.checked); } })),
                    jimu_core_1.jsx(setting_components_1.SettingRow, null,
                        jimu_core_1.jsx(jimu_ui_1.Collapse, { isOpen: this.props.config.enabledDataRelationShip, className: "w-100" },
                            this.checkTrigerLayerIsSameToActionLayer() &&
                                jimu_core_1.jsx("div", { className: "w-100 border p-1 mr-2" }, this.props.intl.formatMessage({ id: 'mapAction_AutoBind', defaultMessage: default_1.default.mapAction_AutoBind })),
                            !this.checkTrigerLayerIsSameToActionLayer() && jimu_core_1.jsx("div", { className: "w-100 d-flex align-items-center" },
                                jimu_core_1.jsx("div", { className: "d-flex flex-column relate-panel-left" },
                                    jimu_core_1.jsx(jimu_core_1.DataSourceComponent, { useDataSource: this.props.config.messageUseDataSource }, function (ds) {
                                        return jimu_core_1.jsx(data_source_selector_1.FieldSelector, { className: "w-100", dataSources: [ds], isDataSourceDropDownHidden: true, placeHolder: _this.props.intl.formatMessage({ id: 'mapAction_TriggerLayerField', defaultMessage: default_1.default.mapAction_TriggerLayerField }), onSelect: _this.onMessageFieldSelected, useDropdown: true, isSearchInputHidden: true, selectedFields: _this.props.config.messageUseDataSource && _this.props.config.messageUseDataSource.fields
                                                ? _this.props.config.messageUseDataSource.fields : jimu_core_1.Immutable([]) });
                                    }),
                                    jimu_core_1.jsx(jimu_core_1.DataSourceComponent, { useDataSource: this.props.config.actionUseDataSource }, function (ds) {
                                        return jimu_core_1.jsx(data_source_selector_1.FieldSelector, { className: "w-100 action-select-chooser", placeHolder: _this.props.intl.formatMessage({ id: 'mapAction_ActionLayerField', defaultMessage: default_1.default.mapAction_ActionLayerField }), dataSources: [ds], isDataSourceDropDownHidden: true, onSelect: _this.onActionFieldSelected, useDropdown: true, isSearchInputHidden: true, selectedFields: _this.props.config.actionUseDataSource && _this.props.config.actionUseDataSource.fields
                                                ? _this.props.config.actionUseDataSource.fields : jimu_core_1.Immutable([]) });
                                    })),
                                jimu_core_1.jsx(jimu_ui_1.Icon, { className: "flex-none", width: 12, height: 40, color: theme.colors.dark[400], icon: require('jimu-ui/lib/icons/link-combined.svg') })))),
                    jimu_core_1.jsx(setting_components_1.SettingRow, null,
                        jimu_core_1.jsx(jimu_ui_1.Button, { type: "link", disabled: !this.props.config.actionUseDataSource, className: "w-100 d-flex justify-content-start", onClick: this.showSqlExprPopup },
                            jimu_core_1.jsx("div", { className: "w-100 text-truncate", style: { textAlign: 'start' } }, this.props.intl.formatMessage({ id: 'mapAction_MoreConditions', defaultMessage: default_1.default.mapAction_MoreConditions }))),
                        this.props.config.actionUseDataSource && jimu_core_1.jsx(jimu_core_1.DataSourceComponent, { useDataSource: this.props.config.actionUseDataSource }, function (ds) {
                            return jimu_core_1.jsx(sql_expression_builder_1.SqlExpressionBuilderPopup, { selectedDs: ds, mode: sql_expression_runtime_1.SqlExpressionMode.Simple, isOpen: _this.state.isSqlExprShow, toggle: _this.toggleSqlExprPopup, config: _this.props.config.sqlExprObj, onChange: function (sqlExprObj) { _this.onSqlExprBuilderChange(sqlExprObj); }, id: "filter-widget-sql-expression-builder-popup" });
                        })),
                    jimu_core_1.jsx(setting_components_1.SettingRow, null,
                        jimu_core_1.jsx("div", { className: "sql-expr-display" }, this.props.config.sqlExprObj && actionUseDataSourceInstance
                            ? jimu_core_1.dataSourceUtils.getArcGISSQL(this.props.config.sqlExprObj, actionUseDataSourceInstance, this.props.intl).displaySQL
                            : this.props.intl.formatMessage({ id: 'mapAction_SetExpression', defaultMessage: default_1.default.mapAction_SetExpression })))));
    };
    _FlashActionSetting.defaultProps = {
        config: jimu_core_1.Immutable({
            messageUseDataSource: null,
            actionUseDataSource: null,
            sqlExprObj: null,
            enabledDataRelationShip: true
        })
    };
    return _FlashActionSetting;
}(jimu_core_1.React.PureComponent));
exports.default = jimu_core_1.themeUtils.withTheme(_FlashActionSetting);
var templateObject_1;
//# sourceMappingURL=flash-action-setting.js.map