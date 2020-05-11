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
var setting_components_1 = require("jimu-ui/setting-components");
var jimu_arcgis_1 = require("jimu-arcgis");
var data_source_selector_1 = require("jimu-ui/data-source-selector");
var default_1 = require("../setting/translations/default");
var DSSelectorTypes = jimu_core_1.Immutable([data_source_selector_1.AllDataSourceTypes.FeatureLayer, data_source_selector_1.AllDataSourceTypes.FeatureQuery]);
var _PanToActionSetting = /** @class */ (function (_super) {
    __extends(_PanToActionSetting, _super);
    function _PanToActionSetting(props) {
        var _this = _super.call(this, props) || this;
        _this.modalStyle = { position: 'absolute', top: '0', bottom: '0', width: '259px',
            height: 'auto', borderRight: '', borderBottom: '', paddingBottom: '1px' };
        _this.getInitConfig = function () {
            var useDataSource = null;
            if (!_this.props.config.useDataSource) {
                useDataSource = null;
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
                initUseDataSource = null;
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
        _this.modalStyle.borderRight = '1px solid black';
        _this.modalStyle.borderBottom = '1px solid black';
        _this.state = {
            isShowLayerList: false
        };
        return _this;
    }
    _PanToActionSetting.prototype.componentDidMount = function () {
        var initConfig = this.getInitConfig();
        this.props.onSettingChange({
            actionId: this.props.actionId,
            config: this.props.config.set('useDataSource', initConfig.useDataSource)
        });
    };
    _PanToActionSetting.prototype.getStyle = function (theme) {
        return jimu_core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      .setting-header {\n        padding: ", " ", " ", " ", "\n      }\n\n      .deleteIcon {\n        cursor: pointer;\n        opacity: .8;\n      }\n\n      .deleteIcon:hover {\n        opacity: 1;\n      }\n    "], ["\n      .setting-header {\n        padding: ", " ", " ", " ", "\n      }\n\n      .deleteIcon {\n        cursor: pointer;\n        opacity: .8;\n      }\n\n      .deleteIcon:hover {\n        opacity: 1;\n      }\n    "])), jimu_core_1.polished.rem(10), jimu_core_1.polished.rem(16), jimu_core_1.polished.rem(0), jimu_core_1.polished.rem(16));
    };
    _PanToActionSetting.prototype.render = function () {
        var triggerRootIds = this.getDsRootIdsByWidgetId(this.props.messageWidgetId);
        return jimu_core_1.jsx("div", { css: this.getStyle(this.props.theme) },
            jimu_core_1.jsx(setting_components_1.SettingSection, { title: this.props.intl.formatMessage({ id: 'mapAction_TriggerLayer', defaultMessage: default_1.default.mapAction_TriggerLayer }) }, jimu_core_1.jsx(data_source_selector_1.DataSourceSelector, { types: DSSelectorTypes, selectedDataSourceIds: (this.props.config.useDataSource && this.props.config.useDataSource.dataSourceId)
                    ? jimu_core_1.Immutable([this.props.config.useDataSource.dataSourceId]) : jimu_core_1.Immutable([]), fromRootDsIds: triggerRootIds, fromDsIds: triggerRootIds ? undefined : this.getDsIdsByWidgetId(this.props.messageWidgetId), closeDataSourceListOnSelect: true, hideAddData: true, hideTypeDropdown: true, mustUseDataSource: true, onSelect: this.handleTriggerLayerSelected, onRemove: this.handleRemoveLayerForTriggerLayer })));
    };
    _PanToActionSetting.defaultProps = {
        config: jimu_core_1.Immutable({
            useDataSource: null
        })
    };
    return _PanToActionSetting;
}(jimu_core_1.React.PureComponent));
exports.default = jimu_core_1.themeUtils.withTheme(_PanToActionSetting);
var templateObject_1;
//# sourceMappingURL=pan-to-action-setting.js.map