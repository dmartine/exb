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
var multisourcemap_1 = require("./components/multisourcemap");
var utils_1 = require("./utils");
var map_fixed_layout_1 = require("./layout/map-fixed-layout");
var jimu_arcgis_1 = require("jimu-arcgis");
var IconMap = require('./assets/icon.svg');
var Widget = /** @class */ (function (_super) {
    __extends(Widget, _super);
    function Widget(props) {
        var _this = _super.call(this, props) || this;
        _this.startRenderMap = function () {
            setTimeout(function () {
                _this.setState({
                    startLoadModules: true
                });
                _this.props.dispatch(jimu_core_1.appActions.setWidgetReadyInjectDataSource(_this.props.id));
            }, 100);
        };
        _this.getPlaceHolderImage = function () {
            var placeHolderImage = _this.props.config.placeholderImage;
            var session = jimu_core_1.SessionManager.getInstance().getMainSession();
            if (placeHolderImage) {
                var isPortalThumbExp = new RegExp('^(.)+/sharing/rest/content/items/(.)+/info/(.)+');
                if (isPortalThumbExp.test(placeHolderImage)) {
                    if (session) {
                        placeHolderImage = placeHolderImage + ("?token=" + session.token);
                    }
                    else {
                        // eslint-disable-next-line no-self-assign
                        placeHolderImage = placeHolderImage;
                    }
                }
            }
            return placeHolderImage;
        };
        _this.fullScreenMap = function () {
            if (jimu_core_1.utils.isTouchDevice()) {
                // is touch device
                if (_this.container.style.position === 'fixed') {
                    _this.container.style.height = _this.containerClientRect.height + "px";
                    _this.container.style.width = _this.containerClientRect.width + "px";
                    _this.container.style.top = _this.containerClientRect.top + "px";
                    _this.container.style.left = _this.containerClientRect.left + "px";
                    setTimeout(function () {
                        _this.container.style.transition = null;
                        _this.container.style.position = 'relative';
                        _this.container.style.zIndex = '0';
                        _this.container.style.height = '100%';
                        _this.container.style.width = '100%';
                        _this.container.style.top = '0';
                        _this.container.style.left = '0';
                        _this.container.style.backgroundColor = 'none';
                        _this.parentContainer.appendChild(_this.container);
                    }, 100);
                }
                else {
                    var clientRect = _this.container.getBoundingClientRect();
                    _this.containerClientRect = clientRect;
                    _this.container.style.height = clientRect.height + "px";
                    _this.container.style.width = clientRect.width + "px";
                    _this.container.style.position = 'fixed';
                    _this.container.style.top = clientRect.top + "px";
                    _this.container.style.left = clientRect.left + "px";
                    if (jimu_ui_1.MobilePanelManager.getInstance().checkDomIsContained(_this.container)) {
                        _this.container.style.zIndex = '502';
                    }
                    else {
                        _this.container.style.zIndex = '105';
                    }
                    document && document.body.appendChild(_this.container);
                    setTimeout(function () {
                        _this.container.style.transition = 'top 0.3s, bottom 0.3s, left 0.3s, right 0.3s, height 0.3s, width 0.3s';
                        _this.container.style.top = '0px';
                        _this.container.style.left = '0px';
                        _this.container.style.right = '0px';
                        _this.container.style.bottom = '0px';
                        _this.container.style.height = null;
                        _this.container.style.width = null;
                        _this.container.style.backgroundColor = '#fff';
                    }, 100);
                }
            }
            else {
                var element = _this.container;
                if (!document) {
                    return;
                }
                if (document.fullscreenElement === element) {
                    document.exitFullscreen();
                    return;
                }
                if (document.webkitFullscreenElement === element) {
                    document.webkitCancelFullScreen();
                    return;
                }
                var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
                if (requestMethod) {
                    requestMethod.call(element);
                }
                else if (typeof window.ActiveXObject !== 'undefined') {
                    var wscript = new ActiveXObject('WScript.Shell');
                    if (wscript !== null) {
                        wscript.SendKeys('{F11}');
                    }
                }
            }
        };
        _this.state = {};
        return _this;
    }
    Widget.prototype.getStyle = function () {
        var theme = this.props.theme;
        return jimu_core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      position: relative;\n\n      .map-is-live-mode {\n        .is-widget {\n          pointer-events: auto !important;\n        }\n      }\n\n      .widget-map-usemask {\n        pointer-events: auto !important;\n      }\n\n      .map-is-design-mode {\n        .exbmap-ui {\n          pointer-events: none !important;\n        }\n\n        .is-widget {\n          pointer-events: auto !important;\n        }\n      }\n\n      .widget-map{\n        padding: 0;\n        margin: 0;\n        height: 100%;\n        width: 100%;\n        z-index: -1;\n        .overview-container{\n          position: absolute;\n          top: 12px;\n          right: 12px;\n          width: 300px;\n          height: 200px;\n          border: 1px solid black;\n          z-index: 1;\n        }\n      \n        .extent-container{\n          background-color: rgba(0, 0, 0, 0.5);\n          position: absolute;\n          z-index: 2;\n        }\n      \n        .extent-btn-container{\n          button{\n            outline: none;\n          }\n          .previous-extent-btn{\n            color: #111;\n          }\n          .next-extent-btn{\n            color: #222;\n          }\n        }\n      }\n\n      .exbmap-ui-layout{\n        z-index: 0;\n      }\n\n      .mapswitch-container {\n        position: absolute;\n        z-index: 7;\n        width: 32px;\n        height: 32px;\n        bottom: 10px;\n        left: 10px;\n        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3)\n      }\n\n      .mapswitch-icon {\n        fill: black;\n        left: 8px;\n        top: 8px;\n        position: absolute;\n        display: block;\n      }\n\n      .widget-map-background {\n        background-color: ", ";\n        position: absolute;\n        z-index: 1;\n      }\n\n      @keyframes appear {\n        0%{opacity:0}\n        25%{opacity:.25}\n        50%{opacity:.5;}\n        75%{opacity:.75}\n        100%{opacity:1;}\n      }\n\n      @keyframes disappear {\n        0%{opacity:1}\n        25%{opacity:.75}\n        50%{opacity:.5;}\n        75%{opacity:.25}\n        100%{opacity:0;}\n      }\n\n      .multisourcemap-item-appear {\n        animation: appear 300ms;\n        -webkit-animation: appear 300ms;\n        -moz-animation: appear 300ms;\n        animation-fill-mode: forwards;\n        -webkit-animation-fill-mode: forwards;\n        -moz-animation-fill-mode: forwards;\n        animation-timing-function: ease-in;\n        -webkit-animation-timing-function: ease-in;\n        -moz-animation-timing-function: ease-in;\n      }\n\n      .multisourcemap-item-disappear {\n        animation: disappear 300ms;\n        -webkit-animation: disappear 300ms;\n        -moz-animation: disappear 300ms;\n        animation-fill-mode: forwards;\n        -webkit-animation-fill-mode: forwards;\n        -moz-animation-fill-mode: forwards;\n        animation-timing-function: ease-in;\n        -webkit-animation-timing-function: ease-in;\n        -moz-animation-timing-function: ease-in;\n      }\n\n      .multisourcemap-item-appear-noanimate {\n        opacity: 1;\n      }\n\n      .multisourcemap-item-disappear-noanimate {\n        opacity: 0;\n      }\n      "], ["\n      position: relative;\n\n      .map-is-live-mode {\n        .is-widget {\n          pointer-events: auto !important;\n        }\n      }\n\n      .widget-map-usemask {\n        pointer-events: auto !important;\n      }\n\n      .map-is-design-mode {\n        .exbmap-ui {\n          pointer-events: none !important;\n        }\n\n        .is-widget {\n          pointer-events: auto !important;\n        }\n      }\n\n      .widget-map{\n        padding: 0;\n        margin: 0;\n        height: 100%;\n        width: 100%;\n        z-index: -1;\n        .overview-container{\n          position: absolute;\n          top: 12px;\n          right: 12px;\n          width: 300px;\n          height: 200px;\n          border: 1px solid black;\n          z-index: 1;\n        }\n      \n        .extent-container{\n          background-color: rgba(0, 0, 0, 0.5);\n          position: absolute;\n          z-index: 2;\n        }\n      \n        .extent-btn-container{\n          button{\n            outline: none;\n          }\n          .previous-extent-btn{\n            color: #111;\n          }\n          .next-extent-btn{\n            color: #222;\n          }\n        }\n      }\n\n      .exbmap-ui-layout{\n        z-index: 0;\n      }\n\n      .mapswitch-container {\n        position: absolute;\n        z-index: 7;\n        width: 32px;\n        height: 32px;\n        bottom: 10px;\n        left: 10px;\n        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3)\n      }\n\n      .mapswitch-icon {\n        fill: black;\n        left: 8px;\n        top: 8px;\n        position: absolute;\n        display: block;\n      }\n\n      .widget-map-background {\n        background-color: ", ";\n        position: absolute;\n        z-index: 1;\n      }\n\n      @keyframes appear {\n        0%{opacity:0}\n        25%{opacity:.25}\n        50%{opacity:.5;}\n        75%{opacity:.75}\n        100%{opacity:1;}\n      }\n\n      @keyframes disappear {\n        0%{opacity:1}\n        25%{opacity:.75}\n        50%{opacity:.5;}\n        75%{opacity:.25}\n        100%{opacity:0;}\n      }\n\n      .multisourcemap-item-appear {\n        animation: appear 300ms;\n        -webkit-animation: appear 300ms;\n        -moz-animation: appear 300ms;\n        animation-fill-mode: forwards;\n        -webkit-animation-fill-mode: forwards;\n        -moz-animation-fill-mode: forwards;\n        animation-timing-function: ease-in;\n        -webkit-animation-timing-function: ease-in;\n        -moz-animation-timing-function: ease-in;\n      }\n\n      .multisourcemap-item-disappear {\n        animation: disappear 300ms;\n        -webkit-animation: disappear 300ms;\n        -moz-animation: disappear 300ms;\n        animation-fill-mode: forwards;\n        -webkit-animation-fill-mode: forwards;\n        -moz-animation-fill-mode: forwards;\n        animation-timing-function: ease-in;\n        -webkit-animation-timing-function: ease-in;\n        -moz-animation-timing-function: ease-in;\n      }\n\n      .multisourcemap-item-appear-noanimate {\n        opacity: 1;\n      }\n\n      .multisourcemap-item-disappear-noanimate {\n        opacity: 0;\n      }\n      "])), theme.colors.white);
    };
    Widget.prototype.componentDidMount = function () {
        if (!this.state.startLoadModules) {
            if (window.jimuConfig.isInBuilder || !this.props.config.canPlaceHolder) {
                this.startRenderMap();
            }
            return;
        }
    };
    Widget.prototype.componentWillUnmount = function () {
        var widgets = jimu_core_1.getAppStore().getState().appConfig.widgets;
        if (!widgets[this.props.id]) {
            this.props.dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(this.props.id, 'restoreData', null));
        }
    };
    Widget.prototype.render = function () {
        var _this = this;
        if (!this.state.startLoadModules) {
            return jimu_core_1.jsx("div", { css: this.getStyle(), className: "jimu-widget" },
                jimu_core_1.jsx("div", { className: "widget-map jimu-widget" },
                    jimu_core_1.jsx("div", { style: { position: 'absolute', left: '50%', top: '50%' }, className: "jimu-secondary-loading" })));
        }
        else {
            if (!(this.props.useDataSources && this.props.useDataSources[0] && this.props.useDataSources[0].dataSourceId)) {
                if (jimu_arcgis_1.portalUtils.checkDefaultBaseMapIsExist()) {
                    // when there is default basemap source
                    return jimu_core_1.jsx("div", { className: "jimu-widget", ref: function (ref) { _this.parentContainer = ref; } },
                        jimu_core_1.jsx("div", { css: this.getStyle(), className: 'jimu-widget', ref: function (ref) { _this.container = ref; } },
                            jimu_core_1.jsx("div", { className: jimu_core_1.classNames('jimu-widget', { 'map-is-design-mode': !utils_1.checkIsLive(this.props.appMode) }) }, jimu_core_1.jsx(multisourcemap_1.default, { fullScreenMap: this.fullScreenMap, baseWidgetProps: this.props, startLoadModules: this.state.startLoadModules, isDefaultMap: true }))));
                }
                else {
                    // when there is not default basemap source
                    return jimu_core_1.jsx("div", { css: this.getStyle(), className: "jimu-widget" },
                        jimu_core_1.jsx("div", { className: "w-100 h-100", style: { position: 'absolute', zIndex: 10, pointerEvents: (utils_1.checkIsLive(this.props.appMode) ? 'none' : 'auto') } },
                            jimu_core_1.jsx(map_fixed_layout_1.default, { appMode: this.props.appMode, layouts: this.props.layouts, LayoutEntry: this.props.builderSupportModules && this.props.builderSupportModules.LayoutEntry, widgetManifestName: this.props.manifest.name })),
                        jimu_core_1.jsx(jimu_ui_1.WidgetPlaceholder, { icon: IconMap, message: "Map", widgetId: this.props.id }));
                }
            }
            else {
                return jimu_core_1.jsx("div", { className: "jimu-widget", ref: function (ref) { _this.parentContainer = ref; } },
                    jimu_core_1.jsx("div", { css: this.getStyle(), className: 'jimu-widget', ref: function (ref) { _this.container = ref; } },
                        jimu_core_1.jsx("div", { className: jimu_core_1.classNames('jimu-widget', { 'map-is-design-mode': !utils_1.checkIsLive(this.props.appMode) }) }, jimu_core_1.jsx(multisourcemap_1.default, { fullScreenMap: this.fullScreenMap, baseWidgetProps: this.props, startLoadModules: this.state.startLoadModules }))));
            }
        }
    };
    Widget.mapExtraStateProps = function (state) {
        return {
            appMode: state && state.appRuntimeInfo && state.appRuntimeInfo.appMode
        };
    };
    return Widget;
}(jimu_core_1.BaseWidget));
exports.default = Widget;
var templateObject_1;
//# sourceMappingURL=widget.js.map