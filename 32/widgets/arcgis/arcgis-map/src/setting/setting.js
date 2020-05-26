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
var data_source_selector_1 = require("jimu-ui/data-source-selector");
var jimu_arcgis_1 = require("jimu-arcgis");
var jimu_for_builder_1 = require("jimu-for-builder");
var setting_components_1 = require("jimu-ui/setting-components");
var default_1 = require("./translations/default");
var map_thumb_1 = require("../../src/runtime/components/map-thumb");
var tool_modules_1 = require("../../src/runtime/layout/tool-modules");
var Setting = /** @class */ (function (_super) {
    __extends(Setting, _super);
    function Setting(props) {
        var _this = _super.call(this, props) || this;
        _this.unmount = false;
        _this.dsManager = jimu_core_1.DataSourceManager.getInstance();
        _this.integratedDataSourceSetting = {};
        _this.supportedDsTypes = jimu_core_1.Immutable([jimu_arcgis_1.DataSourceTypes.WebMap, jimu_arcgis_1.DataSourceTypes.WebScene]);
        _this.getPortUrl = function () {
            var portUrl = jimu_core_1.getAppStore().getState().portalUrl;
            return portUrl;
        };
        _this.onDataSourceSelected = function (selectedDsJsons, dsJsonWithRootId) {
            if (!dsJsonWithRootId || !dsJsonWithRootId.dataSourceJson) {
                return;
            }
            var tempUseDataSources = [];
            tempUseDataSources = Object.assign(tempUseDataSources, _this.props.useDataSources);
            tempUseDataSources.push({
                dataSourceId: dsJsonWithRootId.dataSourceJson.id,
                rootDataSourceId: dsJsonWithRootId.rootDataSourceId
            });
            _this.integratedDataSourceSetting = {
                id: _this.props.id,
                useDataSources: jimu_core_1.Immutable(tempUseDataSources)
            };
            var settingOption = Object.assign({}, _this.integratedDataSourceSetting);
            settingOption.config = _this.props.config.set('initialMapDataSourceID', dsJsonWithRootId.dataSourceJson.id).set('isUseCustomMapState', false).set('initialMapState', null),
                _this.props.onSettingChange(settingOption);
        };
        _this.onDataSourceRemoved = function (dsJsons, dsJsonWithRootId) {
            if (!dsJsonWithRootId || !dsJsonWithRootId.dataSourceJson) {
                return;
            }
            var removedDatasourceId = dsJsonWithRootId.dataSourceJson.id;
            //remove related useDataSource
            var tempUseDataSources = [];
            tempUseDataSources = Object.assign(tempUseDataSources, _this.props.useDataSources);
            for (var i = 0; i < tempUseDataSources.length; i++) {
                if (tempUseDataSources[i].dataSourceId === removedDatasourceId) {
                    tempUseDataSources.splice(i, 1);
                    break;
                }
            }
            var settingChange = {
                id: _this.props.id,
                useDataSources: jimu_core_1.Immutable(tempUseDataSources)
            };
            var settingOption = {};
            _this.integratedDataSourceSetting = settingChange;
            settingOption = Object.assign({}, _this.integratedDataSourceSetting);
            if (tempUseDataSources.length > 0) {
                var initialMapDataSourceID = tempUseDataSources[0] && tempUseDataSources[0].dataSourceId;
                settingOption.config = _this.props.config.set('initialMapDataSourceID', initialMapDataSourceID).set('isUseCustomMapState', false).set('initialMapState', null);
            }
            else {
                settingOption.config = _this.props.config.set('initialMapDataSourceID', null).set('isUseCustomMapState', false).set('initialMapState', null);
            }
            _this.props.onSettingChange(Object.assign({}, settingOption));
        };
        _this.onMapToolsChanged = function (checked, name) {
            _this.props.onSettingChange({
                id: _this.props.id,
                config: _this.props.config.setIn(['toolConifg', name], checked)
            });
        };
        _this.onMapOptionsChanged = function (checked, name) {
            _this.props.onSettingChange({
                id: _this.props.id,
                config: _this.props.config.set(name, checked),
            });
        };
        _this.onDisableSelection = function (selectedDsJsons) {
            if (selectedDsJsons.length > 1) {
                return true;
            }
            else {
                return false;
            }
        };
        // use for dataSourceSetting cache
        _this.initDataSourceSettingOption = function () {
            var tempUseDataSources = [];
            tempUseDataSources = Object.assign(tempUseDataSources, _this.props.useDataSources);
            var dataSourceSettingOption = {
                widgetId: _this.props.id,
                useDataSources: jimu_core_1.Immutable(tempUseDataSources)
            };
            _this.integratedDataSourceSetting = dataSourceSettingOption;
        };
        _this.setInitialMap = function (dataSourceId) {
            _this.props.onSettingChange({
                id: _this.props.id,
                config: _this.props.config.set('initialMapDataSourceID', dataSourceId)
            });
            jimu_for_builder_1.builderAppSync.publishChangeWidgetStatePropToApp({ widgetId: _this.props.id, propKey: 'initialMapDataSourceID', value: dataSourceId });
        };
        _this.changeToolLaylout = function (index) {
            _this.props.onSettingChange({
                id: _this.props.id,
                config: _this.props.config.set('layoutIndex', index)
            });
        };
        _this.handleMapInitStateChanged = function (config) {
            _this.props.onSettingChange({
                id: _this.props.id,
                config: _this.props.config.set('initialMapDataSourceID', config.initialMapDataSourceID).set('initialMapState', config.initialMapState)
            });
        };
        _this.handleIsUseCustomMapState = function (isUseCustomMapState) {
            _this.props.onSettingChange({
                id: _this.props.id,
                config: _this.props.config.set('isUseCustomMapState', isUseCustomMapState).set('initialMapState', null)
            });
        };
        _this.initDataSourceSettingOption();
        return _this;
    }
    Setting.prototype.getStyle = function () {
        return jimu_core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      .widget-setting-map{\n        font-weight: lighter;\n        font-size: 13px;\n\n        .source-descript {\n          color: ", ";\t\n        }\n\n        .thumbnail-horizontal-revert {\n          -moz-transform:scaleX(-1);\n          -webkit-transform:scaleX(-1);\n          -o-transform:scaleX(-1);\n          transform:scaleX(-1);\n        }\n\n        .webmap-thumbnail{\n          cursor: pointer;\n          width: 100%;\n          height: 120px;\n          overflow: hidden;\n          padding: 1px;\n          border: ", " solid initial;\n          img, div{\n            width: 100%;\n            height: 100%;\n          }\n        }\n\n        .selected-item{\n          border: ", " solid ", " !important;\n        }\n\n        .webmap-thumbnail-multi{\n          cursor: pointer;\n          width: 48%;\n          height: 100px;\n          overflow: hidden;\n          padding: 1px;\n          border: ", " solid initial;\n          img, div{\n            width: 100%;\n            height: 100%;\n          }\n        }\n\n        .placeholder-container {\t\n          background-color: ", ";\t\n          width: 100%;\t\n          height: 120px;\t\n          position: relative;\t\n        }\t\n  \n        .placeholder-icon {\t\n          top: 40%;\t\n          left: 46%;\t\n          position: absolute;\t\n          fill: ", ";\t\n        }\n      \n        .choose-btn{\n          width: 100%;\n        }\n      \n        .webmap-tools{\n          .webmap-tools-item{\n            display: flex;\n            justify-content: space-between;\n            margin-bottom: 8px;\n          }\n        }\n\n        .uploadInput {\n          position: absolute;\n          opacity: 0;\n          left: 0;\n          top: 0;\n          cursor: pointer;\n        }\n      \n        .uploadInput-container {\n          position: relative;\n        }\n\n        .setting-map-button{\n          cursor: 'pointer';\n        }\n      }\n      .item-selector-popup {\n        width: 850px;\n        .modal-body {\n          max-height: 70vh;\n          overflow: auto;\n        }\n      }"], ["\n      .widget-setting-map{\n        font-weight: lighter;\n        font-size: 13px;\n\n        .source-descript {\n          color: ", ";\t\n        }\n\n        .thumbnail-horizontal-revert {\n          -moz-transform:scaleX(-1);\n          -webkit-transform:scaleX(-1);\n          -o-transform:scaleX(-1);\n          transform:scaleX(-1);\n        }\n\n        .webmap-thumbnail{\n          cursor: pointer;\n          width: 100%;\n          height: 120px;\n          overflow: hidden;\n          padding: 1px;\n          border: ", " solid initial;\n          img, div{\n            width: 100%;\n            height: 100%;\n          }\n        }\n\n        .selected-item{\n          border: ", " solid ", " !important;\n        }\n\n        .webmap-thumbnail-multi{\n          cursor: pointer;\n          width: 48%;\n          height: 100px;\n          overflow: hidden;\n          padding: 1px;\n          border: ", " solid initial;\n          img, div{\n            width: 100%;\n            height: 100%;\n          }\n        }\n\n        .placeholder-container {\t\n          background-color: ", ";\t\n          width: 100%;\t\n          height: 120px;\t\n          position: relative;\t\n        }\t\n  \n        .placeholder-icon {\t\n          top: 40%;\t\n          left: 46%;\t\n          position: absolute;\t\n          fill: ", ";\t\n        }\n      \n        .choose-btn{\n          width: 100%;\n        }\n      \n        .webmap-tools{\n          .webmap-tools-item{\n            display: flex;\n            justify-content: space-between;\n            margin-bottom: 8px;\n          }\n        }\n\n        .uploadInput {\n          position: absolute;\n          opacity: 0;\n          left: 0;\n          top: 0;\n          cursor: pointer;\n        }\n      \n        .uploadInput-container {\n          position: relative;\n        }\n\n        .setting-map-button{\n          cursor: 'pointer';\n        }\n      }\n      .item-selector-popup {\n        width: 850px;\n        .modal-body {\n          max-height: 70vh;\n          overflow: auto;\n        }\n      }"])), this.props.theme.colors.palette.dark[600], jimu_core_1.polished.rem(2), jimu_core_1.polished.rem(2), this.props.theme.colors.palette.primary[700], jimu_core_1.polished.rem(2), this.props.theme.colors.secondary, this.props.theme.colors.palette.dark[300]);
    };
    Setting.prototype.componentDidMount = function () {
        this.unmount = false;
    };
    Setting.prototype.componentWillUnmount = function () {
        this.unmount = true;
    };
    Setting.prototype.render = function () {
        var _this = this;
        var portalUrl = this.getPortUrl();
        var mapDsIds = [];
        if (this.props.useDataSources) {
            for (var i = 0; i < this.props.useDataSources.length; i++) {
                mapDsIds.push(this.props.useDataSources[i].dataSourceId);
            }
        }
        var isRTL = jimu_core_1.getAppStore().getState().appContext.isRTL;
        return jimu_core_1.jsx("div", { css: this.getStyle() },
            jimu_core_1.jsx("div", { className: "widget-setting-map" },
                jimu_core_1.jsx(setting_components_1.SettingSection, { title: this.props.intl.formatMessage({ id: 'sourceLabel', defaultMessage: default_1.default.sourceLabel }) },
                    jimu_core_1.jsx(setting_components_1.SettingRow, { flow: "wrap" },
                        jimu_core_1.jsx("div", { className: "source-descript text-break" }, this.props.intl.formatMessage({ id: 'sourceDescript', defaultMessage: default_1.default.sourceDescript }))),
                    jimu_core_1.jsx(setting_components_1.SettingRow, null,
                        jimu_core_1.jsx(data_source_selector_1.DataSourceSelector, { isMultiple: true, types: this.supportedDsTypes, buttonLabel: this.props.intl.formatMessage({ id: 'selectMap', defaultMessage: default_1.default.selectMap }), onSelect: this.onDataSourceSelected, selectedDataSourceIds: jimu_core_1.Immutable(mapDsIds), onRemove: this.onDataSourceRemoved, disableSelection: this.onDisableSelection, mustUseDataSource: true })),
                    portalUrl && this.props.dsJsons && this.props.useDataSources && this.props.useDataSources.length === 1 && jimu_core_1.jsx(setting_components_1.SettingRow, null,
                        jimu_core_1.jsx("div", { className: "w-100" },
                            jimu_core_1.jsx("div", { className: "webmap-thumbnail selected-item", title: this.props.dsJsons[this.props.useDataSources[0].dataSourceId].label, onClick: function () { _this.setInitialMap(_this.props.useDataSources[0].dataSourceId); } },
                                jimu_core_1.jsx(map_thumb_1.default, { mapItemId: this.props.dsJsons[this.props.useDataSources[0].dataSourceId] ?
                                        this.props.dsJsons[this.props.useDataSources[0].dataSourceId].itemId : null, portUrl: this.props.dsJsons[this.props.useDataSources[0].dataSourceId] ?
                                        this.props.dsJsons[this.props.useDataSources[0].dataSourceId].portalUrl : null })))),
                    portalUrl && this.props.dsJsons && this.props.useDataSources && this.props.useDataSources.length === 2 &&
                        jimu_core_1.jsx(setting_components_1.SettingRow, null, jimu_core_1.jsx("div", { className: "w-100 d-flex justify-content-between" },
                            jimu_core_1.jsx("div", { onClick: function () { _this.setInitialMap(_this.props.useDataSources[0].dataSourceId); }, title: this.props.dsJsons[this.props.useDataSources[0].dataSourceId].label, className: jimu_core_1.classNames('webmap-thumbnail-multi', { 'selected-item': this.props.config.initialMapDataSourceID === this.props.useDataSources[0].dataSourceId }) },
                                jimu_core_1.jsx(map_thumb_1.default, { mapItemId: this.props.dsJsons[this.props.useDataSources[0].dataSourceId] ?
                                        this.props.dsJsons[this.props.useDataSources[0].dataSourceId].itemId : null, portUrl: this.props.dsJsons[this.props.useDataSources[0].dataSourceId] ?
                                        this.props.dsJsons[this.props.useDataSources[0].dataSourceId].portalUrl : null })),
                            jimu_core_1.jsx("div", { onClick: function () { _this.setInitialMap(_this.props.useDataSources[1].dataSourceId); }, title: this.props.dsJsons[this.props.useDataSources[1].dataSourceId].label, className: jimu_core_1.classNames('webmap-thumbnail-multi', { 'selected-item': this.props.config.initialMapDataSourceID === this.props.useDataSources[1].dataSourceId }) },
                                jimu_core_1.jsx(map_thumb_1.default, { mapItemId: this.props.dsJsons[this.props.useDataSources[1].dataSourceId] ?
                                        this.props.dsJsons[this.props.useDataSources[1].dataSourceId].itemId : null, portUrl: this.props.dsJsons[this.props.useDataSources[1].dataSourceId] ?
                                        this.props.dsJsons[this.props.useDataSources[1].dataSourceId].portalUrl : null }))))),
                jimu_core_1.jsx(setting_components_1.SettingSection, { title: this.props.intl.formatMessage({ id: 'initialMapView', defaultMessage: default_1.default.initialMapView }) },
                    jimu_core_1.jsx(setting_components_1.SettingRow, { flow: "wrap" },
                        jimu_core_1.jsx("div", { className: "source-descript text-break" }, this.props.intl.formatMessage({ id: 'initialMapViewContent', defaultMessage: default_1.default.initialMapViewContent }))),
                    jimu_core_1.jsx(setting_components_1.SettingRow, null,
                        jimu_core_1.jsx("div", { className: "d-flex justify-content-between w-100 align-items-center" },
                            jimu_core_1.jsx("div", { className: "align-items-center d-flex" },
                                jimu_core_1.jsx(jimu_ui_1.Radio, { style: { cursor: 'pointer' }, onChange: function () { return _this.handleIsUseCustomMapState(false); }, checked: !this.props.config.isUseCustomMapState }),
                                jimu_core_1.jsx("label", { className: "m-0 ml-2", style: { cursor: 'pointer' }, onClick: function () { return _this.handleIsUseCustomMapState(false); } }, this.props.intl.formatMessage({ id: 'respectsTheSource', defaultMessage: default_1.default.respectsTheSource }))))),
                    jimu_core_1.jsx(setting_components_1.SettingRow, null,
                        jimu_core_1.jsx("div", { className: "d-flex justify-content-between w-100 align-items-center" },
                            jimu_core_1.jsx("div", { className: "align-items-center d-flex" },
                                jimu_core_1.jsx(jimu_ui_1.Radio, { style: { cursor: 'pointer' }, onChange: function () { return _this.handleIsUseCustomMapState(true); }, checked: this.props.config.isUseCustomMapState }),
                                jimu_core_1.jsx("label", { className: "m-0 ml-2", style: { cursor: 'pointer' }, onClick: function () { return _this.handleIsUseCustomMapState(true); } }, this.props.intl.formatMessage({ id: 'usesCustomView', defaultMessage: default_1.default.usesCustomView }))))),
                    this.props.config.isUseCustomMapState && jimu_core_1.jsx(setting_components_1.SettingRow, null,
                        jimu_core_1.jsx("div", { className: "ml-4" },
                            jimu_core_1.jsx(setting_components_1.MapStatesEditor, { title: this.props.intl.formatMessage({ id: 'setMapView', defaultMessage: default_1.default.setMapView }), buttonLabel: this.props.intl.formatMessage({ id: 'customViewSet', defaultMessage: default_1.default.customViewSet }), useDataSources: this.props.useDataSources, jimuMapConfig: this.props.config, id: this.props.id, onConfigChanged: this.handleMapInitStateChanged, isUseWidgetSize: true })))),
                jimu_core_1.jsx(setting_components_1.SettingSection, { title: this.props.intl.formatMessage({ id: 'toolLabel', defaultMessage: default_1.default.toolLabel }) },
                    jimu_core_1.jsx(setting_components_1.SettingRow, null,
                        jimu_core_1.jsx("div", { className: "w-100 webmap-tools" }, Object.keys(tool_modules_1.default).map(function (key, index) {
                            if (tool_modules_1.default[key].getIsNeedSetting()) {
                                return jimu_core_1.jsx("div", { className: "webmap-tools-item", key: index },
                                    jimu_core_1.jsx("span", { className: "text-break", style: { width: '80%' } }, _this.props.intl.formatMessage({ id: key + 'Label', defaultMessage: jimu_ui_1.defaultMessages[key + 'Label'] })),
                                    jimu_core_1.jsx(jimu_ui_1.Switch, { className: "can-x-switch", checked: (_this.props.config.toolConifg && _this.props.config.toolConifg["can" + key]) || false, onChange: function (evt) { _this.onMapToolsChanged(evt.target.checked, "can" + key); } }));
                            }
                            else {
                                return null;
                            }
                        })))),
                jimu_core_1.jsx(setting_components_1.SettingSection, { title: this.props.intl.formatMessage({ id: 'mapLayout', defaultMessage: default_1.default.mapLayout }) },
                    jimu_core_1.jsx(setting_components_1.SettingRow, null,
                        jimu_core_1.jsx("div", { className: "source-descript" }, this.props.intl.formatMessage({ id: 'mapLayout_LargeAndMedium', defaultMessage: default_1.default.mapLayout_LargeAndMedium }))),
                    jimu_core_1.jsx(setting_components_1.SettingRow, null,
                        jimu_core_1.jsx("div", { className: "w-100 d-flex justify-content-between" },
                            jimu_core_1.jsx("div", { onClick: function () { _this.changeToolLaylout(0); }, className: jimu_core_1.classNames('webmap-thumbnail-multi border d-flex justify-content-center align-items-center', {
                                    'selected-item': !this.props.config.layoutIndex,
                                    'thumbnail-horizontal-revert': isRTL
                                }) },
                                jimu_core_1.jsx(jimu_ui_1.ImageWithParam, { imageParam: { url: require('./assets/pc-layout-0.svg') } })),
                            jimu_core_1.jsx("div", { onClick: function () { _this.changeToolLaylout(1); }, className: jimu_core_1.classNames('webmap-thumbnail-multi border d-flex justify-content-center align-items-center', {
                                    'selected-item': this.props.config.layoutIndex === 1,
                                    'thumbnail-horizontal-revert': isRTL
                                }) },
                                jimu_core_1.jsx(jimu_ui_1.ImageWithParam, { imageParam: { url: require('./assets/pc-layout-1.svg') } })))),
                    jimu_core_1.jsx(setting_components_1.SettingRow, null,
                        jimu_core_1.jsx("div", { className: "source-descript" }, this.props.intl.formatMessage({ id: 'mapLayout_Small', defaultMessage: default_1.default.mapLayout_Small }))),
                    jimu_core_1.jsx(setting_components_1.SettingRow, null,
                        jimu_core_1.jsx("div", { className: "w-100 d-flex justify-content-between" },
                            jimu_core_1.jsx("div", { className: jimu_core_1.classNames('webmap-thumbnail-multi border d-flex justify-content-center align-items-center', {
                                    'selected-item': true,
                                    'thumbnail-horizontal-revert': isRTL
                                }) },
                                jimu_core_1.jsx(jimu_ui_1.ImageWithParam, { imageParam: { url: require('./assets/mobile-layout-0.svg') } })),
                            jimu_core_1.jsx("div", null)))),
                jimu_core_1.jsx(setting_components_1.SettingSection, { title: this.props.intl.formatMessage({ id: 'options', defaultMessage: default_1.default.options }) },
                    jimu_core_1.jsx(setting_components_1.SettingRow, null,
                        jimu_core_1.jsx("div", { className: "w-100 webmap-tools" },
                            jimu_core_1.jsx("div", { className: "webmap-tools-item" },
                                jimu_core_1.jsx("label", null,
                                    jimu_core_1.jsx(jimu_core_1.FormattedMessage, { id: "disableScrollZoom", defaultMessage: default_1.default.disableScrollZoom })),
                                jimu_core_1.jsx(jimu_ui_1.Switch, { className: "can-x-switch", checked: (this.props.config && this.props.config.disableScroll) || false, "data-key": "disableScroll", onChange: function (evt) { _this.onMapOptionsChanged(evt.target.checked, 'disableScroll'); } })),
                            jimu_core_1.jsx("div", { className: "webmap-tools-item" },
                                jimu_core_1.jsx("span", { className: "text-break", style: { width: '80%' } },
                                    jimu_core_1.jsx(jimu_core_1.FormattedMessage, { id: "disablePopUp", defaultMessage: default_1.default.disablePopUp })),
                                jimu_core_1.jsx(jimu_ui_1.Switch, { className: "can-x-switch", checked: (this.props.config && this.props.config.disablePopUp) || false, "data-key": "disablePopUp", onChange: function (evt) { _this.onMapOptionsChanged(evt.target.checked, 'disablePopUp'); } })))))));
    };
    Setting.mapExtraStateProps = function (state) {
        return {
            dsJsons: state.appStateInBuilder.appConfig.dataSources
        };
    };
    return Setting;
}(jimu_for_builder_1.BaseWidgetSetting));
exports.default = Setting;
var templateObject_1;
//# sourceMappingURL=setting.js.map