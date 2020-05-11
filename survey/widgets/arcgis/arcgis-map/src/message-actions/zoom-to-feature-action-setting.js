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
var jimu_arcgis_1 = require("jimu-arcgis");
var data_source_selector_1 = require("jimu-ui/data-source-selector");
var default_1 = require("../setting/translations/default");
var DSSelectorTypes = jimu_core_1.Immutable([data_source_selector_1.AllDataSourceTypes.FeatureLayer, data_source_selector_1.AllDataSourceTypes.FeatureQuery]);
var _ZoomToFeatureActionSetting = /** @class */ (function (_super) {
    __extends(_ZoomToFeatureActionSetting, _super);
    function _ZoomToFeatureActionSetting(props) {
        var _this = _super.call(this, props) || this;
        _this.NoLockTriggerLayerWidgets = ['Map'];
        _this.modalStyle = { position: 'absolute', top: '0', bottom: '0', width: '259px',
            height: 'auto', borderRight: '', borderBottom: '', paddingBottom: '1px' };
        _this.getInitConfig = function () {
            var messageWidgetId = _this.props.messageWidgetId;
            var config = jimu_core_1.getAppStore().getState().appStateInBuilder.appConfig;
            var messageWidgetJson = config.widgets[messageWidgetId];
            var useDataSource = null;
            if (!_this.props.config.useDataSource) {
                if (messageWidgetJson && messageWidgetJson.useDataSources && messageWidgetJson.useDataSources[0] && messageWidgetJson.useDataSources.length === 1) {
                    var dsJson = config.dataSources[messageWidgetJson.useDataSources[0].dataSourceId];
                    if (dsJson && ((dsJson.type === jimu_arcgis_1.ArcGISDataSourceTypes.WebMap) || (dsJson.type === jimu_arcgis_1.ArcGISDataSourceTypes.WebScene))) {
                        useDataSource = null;
                    }
                    else {
                        useDataSource = jimu_core_1.Immutable({
                            dataSourceId: messageWidgetJson.useDataSources[0].dataSourceId,
                            rootDataSourceId: messageWidgetJson.useDataSources[0].rootDataSourceId
                        });
                    }
                }
            }
            else {
                useDataSource = _this.checkAndGetInitUseDataSource(_this.props.messageWidgetId, _this.props.config.useDataSource);
            }
            return {
                useDataSource: useDataSource
            };
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
                config: _this.props.config.set('useDataSource', useDataSource)
            });
        };
        _this.handleRemoveLayerForTriggerLayer = function () {
            _this.props.onSettingChange({
                actionId: _this.props.actionId,
                config: _this.props.config.set('useDataSource', null)
            });
        };
        _this.handleIsUseCustomZoomToOption = function (isUseCustomZoomToOption) {
            if (isUseCustomZoomToOption) {
                if (!_this.props.config.zoomToOption || !_this.props.config.zoomToOption.scale) {
                    _this.props.onSettingChange({
                        actionId: _this.props.actionId,
                        config: _this.props.config.set('isUseCustomZoomToOption', isUseCustomZoomToOption).setIn(['zoomToOption', 'scale'], 5000)
                    });
                    return;
                }
            }
            _this.props.onSettingChange({
                actionId: _this.props.actionId,
                config: _this.props.config.set('isUseCustomZoomToOption', isUseCustomZoomToOption)
            });
        };
        _this.handleSetCustomZoomScale = function (value) {
            _this.props.onSettingChange({
                actionId: _this.props.actionId,
                config: _this.props.config.setIn(['zoomToOption', 'scale'], value)
            });
        };
        _this.getTriggerLayerContent = function () {
            var triggerDsSelectorSourceData = _this.getDsSelectorSourceData(_this.props.messageWidgetId, _this.props.config.useDataSource);
            return jimu_core_1.jsx(data_source_selector_1.DataSourceSelector, { types: DSSelectorTypes, selectedDataSourceIds: triggerDsSelectorSourceData.selectedDataSourceIds, fromRootDsIds: triggerDsSelectorSourceData.fromRootDsIds, fromDsIds: triggerDsSelectorSourceData.fromDsIds, closeDataSourceListOnSelect: true, hideAddData: true, hideTypeDropdown: true, mustUseDataSource: true, disableRemove: function () { return triggerDsSelectorSourceData.isReadOnly; }, disableDsList: triggerDsSelectorSourceData.isReadOnly, onSelect: _this.handleTriggerLayerSelected, onRemove: _this.handleRemoveLayerForTriggerLayer });
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
            isShowLayerList: false
        };
        return _this;
    }
    _ZoomToFeatureActionSetting.prototype.componentDidMount = function () {
        var initConfig = this.getInitConfig();
        this.props.onSettingChange({
            actionId: this.props.actionId,
            config: this.props.config.set('useDataSource', initConfig.useDataSource)
        });
    };
    _ZoomToFeatureActionSetting.prototype.getStyle = function (theme) {
        return jimu_core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      .setting-header {\n        padding: ", " ", " ", " ", "\n      }\n\n      .deleteIcon {\n        cursor: pointer;\n        opacity: .8;\n      }\n\n      .deleteIcon:hover {\n        opacity: 1;\n      }\n    "], ["\n      .setting-header {\n        padding: ", " ", " ", " ", "\n      }\n\n      .deleteIcon {\n        cursor: pointer;\n        opacity: .8;\n      }\n\n      .deleteIcon:hover {\n        opacity: 1;\n      }\n    "])), jimu_core_1.polished.rem(10), jimu_core_1.polished.rem(16), jimu_core_1.polished.rem(0), jimu_core_1.polished.rem(16));
    };
    _ZoomToFeatureActionSetting.prototype.render = function () {
        var _this = this;
        return jimu_core_1.jsx("div", { css: this.getStyle(this.props.theme) },
            jimu_core_1.jsx(setting_components_1.SettingSection, { title: this.props.intl.formatMessage({ id: 'mapAction_TriggerLayer', defaultMessage: default_1.default.mapAction_TriggerLayer }) }, this.getTriggerLayerContent()),
            jimu_core_1.jsx(setting_components_1.SettingSection, { title: this.props.intl.formatMessage({ id: 'mapZoomToAction_ZoomScale', defaultMessage: default_1.default.mapZoomToAction_ZoomScale }) },
                jimu_core_1.jsx(setting_components_1.SettingRow, null,
                    jimu_core_1.jsx("div", { className: "d-flex justify-content-between w-100 align-items-center" },
                        jimu_core_1.jsx("div", { className: "align-items-center d-flex" },
                            jimu_core_1.jsx(jimu_ui_1.Radio, { style: { cursor: 'pointer' }, checked: !this.props.config.isUseCustomZoomToOption, onChange: function () { return _this.handleIsUseCustomZoomToOption(false); } }),
                            jimu_core_1.jsx("label", { className: "m-0 ml-2", style: { cursor: 'pointer' } }, this.props.intl.formatMessage({ id: 'mapZoomToAction_Automatic', defaultMessage: default_1.default.mapZoomToAction_Automatic }))))),
                jimu_core_1.jsx(setting_components_1.SettingRow, null,
                    jimu_core_1.jsx("div", { className: "d-flex justify-content-between w-100 align-items-center" },
                        jimu_core_1.jsx("div", { className: "align-items-center d-flex" },
                            jimu_core_1.jsx(jimu_ui_1.Radio, { style: { cursor: 'pointer' }, checked: this.props.config.isUseCustomZoomToOption, onChange: function () { return _this.handleIsUseCustomZoomToOption(true); } }),
                            jimu_core_1.jsx("label", { className: "m-0 ml-2", style: { cursor: 'pointer' } }, this.props.intl.formatMessage({ id: 'mapZoomToAction_Custom', defaultMessage: default_1.default.mapZoomToAction_Custom }))))),
                this.props.config.isUseCustomZoomToOption && jimu_core_1.jsx(setting_components_1.SettingRow, null,
                    jimu_core_1.jsx(jimu_ui_1.TextInput, { className: "w-100", type: "number", placeholder: this.props.intl.formatMessage({ id: 'mapZoomToAction_TypeScale', defaultMessage: default_1.default.mapZoomToAction_TypeScale }), value: this.props.config.zoomToOption && this.props.config.zoomToOption.scale, onChange: function (e) { _this.handleSetCustomZoomScale(e.target.value); } }))));
    };
    _ZoomToFeatureActionSetting.defaultProps = {
        config: jimu_core_1.Immutable({
            useDataSource: null
        })
    };
    return _ZoomToFeatureActionSetting;
}(jimu_core_1.React.PureComponent));
exports.default = jimu_core_1.themeUtils.withTheme(_ZoomToFeatureActionSetting);
var templateObject_1;
//# sourceMappingURL=zoom-to-feature-action-setting.js.map