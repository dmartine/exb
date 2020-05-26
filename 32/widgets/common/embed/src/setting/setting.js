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
/** @jsx jsx */
var jimu_core_1 = require("jimu-core");
var jimu_for_builder_1 = require("jimu-for-builder");
var setting_components_1 = require("jimu-ui/setting-components");
var jimu_ui_1 = require("jimu-ui");
var default_1 = require("./translations/default");
var config_1 = require("../config");
var style_1 = require("./style");
var data_source_selector_1 = require("jimu-ui/data-source-selector");
var expression_builder_1 = require("jimu-ui/expression-builder");
var Setting = /** @class */ (function (_super) {
    __extends(Setting, _super);
    function Setting(props) {
        var _this = _super.call(this, props) || this;
        _this.supportedDsTypes = jimu_core_1.Immutable([data_source_selector_1.AllDataSourceTypes.FeatureLayer, data_source_selector_1.AllDataSourceTypes.FeatureQuery]);
        _this.embedTypeChange = function (type) {
            var config = _this.props.config;
            if (_this.props.config.embedType !== type) {
                _this.props.onSettingChange({
                    id: _this.props.id,
                    config: config.set('embedType', type)
                });
            }
        };
        _this.checkURL = function (str) {
            if (!str || str === '')
                return false;
            var httpsRex = '^(([h][t]{2}[p][s])?://)';
            var re = new RegExp(httpsRex);
            if (!re.test(str)) {
                _this.setState({
                    urlError: _this.formatMessage('httpsUrlMessage')
                });
                return false;
            }
            var index = str.indexOf('.');
            if (index < 0 || index === str.length - 1) {
                _this.setState({
                    urlError: _this.formatMessage('invalidUrlMessage')
                });
                return false;
            }
            return true;
        };
        _this.embedCodeChangeRightAway = function (value) {
            var _a = _this.props, config = _a.config, id = _a.id;
            _this.props.onSettingChange({
                config: config.set('embedCode', value),
                id: id
            });
        };
        _this.formatMessage = function (id) {
            return _this.props.intl.formatMessage({ id: id, defaultMessage: default_1.default[id] });
        };
        _this.onDataSourceSelected = function (allSelectedDss, currentSelectedDs) {
            if (!allSelectedDss) {
                return;
            }
            var useDataSources = allSelectedDss.map(function (ds) { return ({
                dataSourceId: ds.dataSourceJson && ds.dataSourceJson.id,
                rootDataSourceId: ds.rootDataSourceId
            }); });
            _this.props.onSettingChange({
                id: _this.props.id,
                useDataSources: useDataSources
            });
        };
        _this.onDataSourceRemoved = function () {
            _this.props.onSettingChange({
                id: _this.props.id,
                useDataSources: []
            });
        };
        _this.onToggleUseDataEnabled = function (useDataSourcesEnabled) {
            _this.props.onSettingChange({
                id: _this.props.id,
                useDataSourcesEnabled: useDataSourcesEnabled
            });
        };
        _this.openExpPopup = function () { return _this.setState({ isExpPopupOpen: true }); };
        _this.closeExpPopup = function () { return _this.setState({ isExpPopupOpen: false }); };
        _this.webAddressExpressionChange = function (e) {
            var _a = _this.props, config = _a.config, onSettingChange = _a.onSettingChange, id = _a.id;
            onSettingChange({
                id: id,
                config: config.set('expression', e),
            });
            _this.closeExpPopup();
        };
        _this.staticUrlChange = function (event) {
            var value;
            if (!event || !event.target || !event.target.value) {
                value = '';
            }
            else {
                value = event.target.value.trim();
            }
            if (!_this.checkURL(value)) {
                _this.setState({
                    showUrlError: true
                });
            }
            else {
                _this.setState({
                    showUrlError: false
                });
            }
        };
        _this.staticUrlSubmit = function (value) {
            if (!value)
                return;
            if (!_this.checkURL(value)) {
                _this.setState({
                    showUrlError: true
                });
                return;
            }
            var _a = _this.props, config = _a.config, onSettingChange = _a.onSettingChange, id = _a.id;
            onSettingChange({
                id: id,
                config: config.set('staticUrl', value),
            });
        };
        _this.isUsedDataSource = function () {
            var _a = _this.props, useDataSources = _a.useDataSources, useDataSourcesEnabled = _a.useDataSourcesEnabled;
            return useDataSourcesEnabled && useDataSources && useDataSources.length > 0;
        };
        _this.state = {
            showUrlError: false,
            urlError: '',
            isExpPopupOpen: false
        };
        return _this;
    }
    Setting.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, theme = _b.theme, config = _b.config, useDataSourcesEnabled = _b.useDataSourcesEnabled;
        var embedType = config.embedType;
        var useDataSources = this.props.useDataSources || [];
        var dataSourceIds = useDataSources[0] ? jimu_core_1.Immutable([useDataSources[0].dataSourceId]) : jimu_core_1.Immutable([]);
        return (jimu_core_1.jsx("div", { css: style_1.getStyle(this.props.theme) },
            jimu_core_1.jsx("div", { className: "widget-iframe jimu-widget" },
                jimu_core_1.jsx("div", null,
                    jimu_core_1.jsx(setting_components_1.SettingSection, null,
                        jimu_core_1.jsx(setting_components_1.SettingRow, { label: this.formatMessage('embedBy') }),
                        jimu_core_1.jsx(setting_components_1.SettingRow, null,
                            jimu_core_1.jsx(jimu_ui_1.Radio, { onChange: function () { return _this.embedTypeChange(config_1.EmbedType.Url); }, checked: embedType === config_1.EmbedType.Url }),
                            jimu_core_1.jsx(jimu_ui_1.Label, { className: "ml-2 ", onClick: function (evt) { return _this.embedTypeChange(config_1.EmbedType.Url); } }, this.formatMessage('websiteAddress'))),
                        jimu_core_1.jsx(setting_components_1.SettingRow, null,
                            jimu_core_1.jsx(jimu_ui_1.Radio, { onChange: function () { return _this.embedTypeChange(config_1.EmbedType.Code); }, checked: embedType === config_1.EmbedType.Code }),
                            jimu_core_1.jsx(jimu_ui_1.Label, { className: "ml-2 ", onClick: function (evt) { return _this.embedTypeChange(config_1.EmbedType.Code); } }, this.formatMessage('code'))),
                        jimu_core_1.jsx(setting_components_1.SettingRow, null, embedType === config_1.EmbedType.Url ?
                            jimu_core_1.jsx("div", { className: "d-flex flex-column w-100", style: { zIndex: 3 } },
                                this.isUsedDataSource() ?
                                    jimu_core_1.jsx(expression_builder_1.ExpressionInput, { dataSourceIds: dataSourceIds, attributeTypes: [jimu_core_1.JimuFieldType.String], onChange: this.webAddressExpressionChange, expression: config.expression && config.expression.asMutable({ deep: true }), placeHolders: (_a = {},
                                            _a[expression_builder_1.ExpressionInputFrom.Attribute] = this.formatMessage('attributeHint'),
                                            _a[expression_builder_1.ExpressionInputFrom.Expression] = this.formatMessage('expressionHint'),
                                            _a), closeExpPopup: this.closeExpPopup, openExpPopup: this.openExpPopup, isExpPopupOpen: this.state.isExpPopupOpen, from: [expression_builder_1.ExpressionInputFrom.Attribute, expression_builder_1.ExpressionInputFrom.Expression] }) :
                                    jimu_core_1.jsx(jimu_ui_1.TextInput, { type: "text", className: "w-100", placeholder: this.formatMessage('websitePlaceholder'), value: config.staticUrl, onChange: this.staticUrlChange, onAcceptValue: this.staticUrlSubmit, spellCheck: false }),
                                this.state.showUrlError && jimu_core_1.jsx("div", { className: "d-flex w-100 align-items-center justify-content-between", style: { marginTop: '5px' } },
                                    jimu_core_1.jsx(jimu_ui_1.Icon, { size: 16, icon: require('jimu-ui/lib/icons/warning.svg'), color: theme.colors.danger }),
                                    jimu_core_1.jsx("div", { style: {
                                            width: 'calc(100% - 20px)',
                                            marginLeft: '4px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color: theme.colors.danger
                                        } }, this.state.urlError))) :
                            jimu_core_1.jsx(jimu_ui_1.TextInput, { type: "textarea", style: { height: '300px' }, className: "w-100", spellCheck: false, placeholder: this.formatMessage('codePlaceholder'), value: config.embedCode || '', onAcceptValue: this.embedCodeChangeRightAway })),
                        embedType === config_1.EmbedType.Url &&
                            // <SettingSection>
                            jimu_core_1.jsx(setting_components_1.SettingRow, null,
                                jimu_core_1.jsx("div", { className: "choose-ds w-100" },
                                    jimu_core_1.jsx(data_source_selector_1.DataSourceSelector, { types: this.supportedDsTypes, selectedDataSourceIds: dataSourceIds, useDataSourcesEnabled: useDataSourcesEnabled, onToggleUseDataEnabled: this.onToggleUseDataEnabled, onSelect: this.onDataSourceSelected, onRemove: this.onDataSourceRemoved })))
                    // </SettingSection>
                    )))));
    };
    Setting.mapExtraStateProps = function (state, props) {
        return {
            appConfig: state && state.appStateInBuilder && state.appStateInBuilder.appConfig,
            appTheme: state && state.appStateInBuilder && state.appStateInBuilder.theme
        };
    };
    return Setting;
}(jimu_for_builder_1.BaseWidgetSetting));
exports.default = Setting;
//# sourceMappingURL=setting.js.map