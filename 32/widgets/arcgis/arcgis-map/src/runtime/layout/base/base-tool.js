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
var ui_component_1 = require("./ui-component");
var scroll_container_1 = require("./scroll-container");
var panel_shell_1 = require("./panel-shell");
var defaultIcon = require('jimu-ui/lib/icons/widgets.svg');
var closeIcon = require('../../assets/icons/close-12.svg');
var BaseTool = /** @class */ (function (_super) {
    __extends(BaseTool, _super);
    function BaseTool(props) {
        var _this = _super.call(this, props) || this;
        _this.toolName = null;
        _this.isContainedToMobilePanel = false;
        // this param is used to update pop position when pc content has changed
        _this.generation = 0;
        _this._getContent = function () {
            if (_this.props.toolJson.isOnlyExpanded) {
                return jimu_core_1.jsx("div", { css: _this._cssStyle(), className: "exbmap-ui exbmap-ui-tool-panel" },
                    jimu_core_1.jsx(jimu_core_1.ErrorBoundary, null, _this.getExpandPanel()));
            }
            else {
                if (_this.props.isMobile) {
                    return _this._renderMobileTool();
                }
                else {
                    return _this._renderPCTool();
                }
            }
        };
        _this.onResize = function (width, height) {
            if (!width || !height) {
                return;
            }
            _this.generation = height;
            _this.forceUpdate();
        };
        var mapContainer = _this.props.jimuMapView && _this.props.jimuMapView.view && _this.props.jimuMapView.view.container;
        if (jimu_ui_1.MobilePanelManager.getInstance().checkDomIsContained(mapContainer)) {
            _this.isContainedToMobilePanel = true;
        }
        return _this;
    }
    BaseTool.prototype._cssStyle = function () {
        return jimu_core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      pointer-events: auto;\n      box-shadow: 0 1px 2px rgba(0,0,0,0.3);\n      position: relative;\n\n      .exbmap-ui-tool-icon {\n        fill: black;\n        left: 8px;\n        top: 8px;\n        position: absolute;\n        display: block;\n      }\n\n      .exbmap-ui-tool-icon-selected {\n        color: #000;\n        background-color: #eee;\n      }\n\n      .exbmap-ui-tool-icon-selected:after {\n        width: 0;\n        height: 0;\n        border-top: 6px solid #000;\n        border-left: 6px solid transparent;\n        position: absolute;\n        top: 0;\n        right: 0;\n        content: \"\";\n        margin-top: 1px;\n        margin-right: 1px;\n      }\n\n      .exbmap-ui-expand-content {\n        transition: opacity 250ms ease-in-out, margin 250ms ease-in-out;\n        min-height: 10px;\n        min-width: 10px;\n        padding-top: ", ";\n        padding-bottom: ", ";\n        padding-left: ", ";\n        padding-right: ", ";\n\n        .exbmap-ui-expand-content-header {\n          margin-bottom: ", ";\n        }\n\n        .panel-title {\n          font-size: ", ";\n          color: #000000;\n        }\n\n        .panel-icon {\n          cursor: pointer;\n          color: #6e6e6e;\n        }\n\n        .panel-icon: hover {\n          color: #2e2e2e;\n        }\n      }\n\n      .expand-placement-bottom {\n        padding-top: 0.25rem !important;\n      }\n\n      .expand-placement-left {\n        padding-right: 0.25rem !important;\n      }\n\n      .expand-placement-right {\n        padding-left: 0.25rem !important;\n      }\n\n      .expand-placement-top {\n        padding-bottom: 0.25rem !important;\n      }\n      "], ["\n      pointer-events: auto;\n      box-shadow: 0 1px 2px rgba(0,0,0,0.3);\n      position: relative;\n\n      .exbmap-ui-tool-icon {\n        fill: black;\n        left: 8px;\n        top: 8px;\n        position: absolute;\n        display: block;\n      }\n\n      .exbmap-ui-tool-icon-selected {\n        color: #000;\n        background-color: #eee;\n      }\n\n      .exbmap-ui-tool-icon-selected:after {\n        width: 0;\n        height: 0;\n        border-top: 6px solid #000;\n        border-left: 6px solid transparent;\n        position: absolute;\n        top: 0;\n        right: 0;\n        content: \"\";\n        margin-top: 1px;\n        margin-right: 1px;\n      }\n\n      .exbmap-ui-expand-content {\n        transition: opacity 250ms ease-in-out, margin 250ms ease-in-out;\n        min-height: 10px;\n        min-width: 10px;\n        padding-top: ", ";\n        padding-bottom: ", ";\n        padding-left: ", ";\n        padding-right: ", ";\n\n        .exbmap-ui-expand-content-header {\n          margin-bottom: ", ";\n        }\n\n        .panel-title {\n          font-size: ", ";\n          color: #000000;\n        }\n\n        .panel-icon {\n          cursor: pointer;\n          color: #6e6e6e;\n        }\n\n        .panel-icon: hover {\n          color: #2e2e2e;\n        }\n      }\n\n      .expand-placement-bottom {\n        padding-top: 0.25rem !important;\n      }\n\n      .expand-placement-left {\n        padding-right: 0.25rem !important;\n      }\n\n      .expand-placement-right {\n        padding-left: 0.25rem !important;\n      }\n\n      .expand-placement-top {\n        padding-bottom: 0.25rem !important;\n      }\n      "])), jimu_core_1.polished.rem(10), jimu_core_1.polished.rem(10), jimu_core_1.polished.rem(20), jimu_core_1.polished.rem(20), jimu_core_1.polished.rem(10), jimu_core_1.polished.rem(16));
    };
    BaseTool.prototype.onShowPanel = function () { };
    BaseTool.prototype.onClosePanel = function () { };
    BaseTool.prototype.destroy = function () { };
    BaseTool.getIsNeedSetting = function () {
        return true;
    };
    BaseTool.prototype._onIconClick = function (e) {
        var onIconClick = this.getIcon() && this.getIcon().onIconClick;
        if (onIconClick) {
            onIconClick(e);
        }
        if (!this.getExpandPanel()) {
            return;
        }
        if (!this.isContainedToMobilePanel) {
            jimu_ui_1.MobilePanelManager.getInstance().closePanel();
        }
        if (this.props.activeToolName) {
            if (this.props.activeToolName === this.toolName) {
                this.props.onActiveToolNameChange(null);
            }
            else {
                this.props.onActiveToolNameChange(this.toolName);
                this.onShowPanel();
            }
        }
        else {
            this.props.onActiveToolNameChange(this.toolName);
            this.onShowPanel();
        }
    };
    BaseTool.prototype._initIconContainer = function (ref) {
        if (ref && !this.iconContainer) {
            this.iconContainer = ref;
            this.forceUpdate();
        }
    };
    BaseTool.prototype._renderPCTool = function () {
        var _this = this;
        var toolIcon = this.getIcon();
        if (!toolIcon) {
            toolIcon = {
                icon: defaultIcon,
                onIconClick: function () { }
            };
        }
        var expandPanel = this.getExpandPanel();
        return jimu_core_1.jsx("div", { className: "exbmap-ui exbmap-ui-tool", css: this._cssStyle(), style: { width: '32px', height: '32px' } },
            jimu_core_1.jsx("div", { style: {}, ref: function (ref) { _this._initIconContainer(ref); }, className: jimu_core_1.classNames('exbmap-ui-tool border-0 esri-widget--button', {
                    'exbmap-ui-tool-icon-selected': this.toolName === this.props.activeToolName && expandPanel
                }), title: this.props.toolJson.isShowIconTitle ? this.getTitle() : '', onClick: function (e) { _this._onIconClick(e); } },
                jimu_core_1.jsx(jimu_ui_1.Icon, { width: 16, height: 16, className: "exbmap-ui-tool-icon", icon: toolIcon.icon })),
            this.iconContainer && (this.toolName === this.props.activeToolName && expandPanel) && jimu_core_1.jsx(panel_shell_1.default, { onDestroyed: function () { _this.onClosePanel(); } },
                jimu_core_1.jsx(jimu_ui_1.Popper, { reference: this.iconContainer, open: !!(this.toolName === this.props.activeToolName && expandPanel), placement: this.props.toolJson.panelPlacement, modifiers: {
                        flip: { padding: 0 },
                        preventOverflow: {
                            padding: 15,
                            boundariesElement: this.props.jimuMapView.view.container
                        }
                    }, generation: this.generation },
                    jimu_core_1.jsx("div", { className: this.getExpandPanelPlacementClassName() },
                        jimu_core_1.jsx("div", { className: "exbmap-ui-expand-content", style: { backgroundColor: 'white' } },
                            jimu_core_1.jsx("div", { className: "w-100 justify-content-between d-flex exbmap-ui-expand-content-header" },
                                jimu_core_1.jsx("div", { className: "panel-title text-truncate", style: { width: '210px' }, title: this.getTitle() }, this.getTitle()),
                                jimu_core_1.jsx("div", { onClick: function () { _this.props.onActiveToolNameChange(null); } },
                                    jimu_core_1.jsx(jimu_ui_1.Icon, { className: "panel-icon", width: 20, height: 20, icon: closeIcon }))),
                            jimu_core_1.jsx(jimu_core_1.ErrorBoundary, null,
                                expandPanel,
                                jimu_core_1.jsx(jimu_core_1.ReactResizeDetector, { handleHeight: true, onResize: this.onResize })))))));
    };
    BaseTool.prototype._renderMobileTool = function () {
        var _this = this;
        var toolIcon = this.getIcon();
        if (!toolIcon) {
            toolIcon = {
                icon: defaultIcon,
                onIconClick: function () { }
            };
        }
        var expandPanel = this.getExpandPanel();
        return jimu_core_1.jsx("div", { className: "exbmap-ui exbmap-ui-tool", css: this._cssStyle() },
            jimu_core_1.jsx("div", { style: {}, ref: function (ref) { _this.iconContainer = ref; }, className: jimu_core_1.classNames('exbmap-ui-tool border-0 esri-widget--button', {
                    'exbmap-ui-tool-icon-selected': this.toolName === this.props.activeToolName && expandPanel
                }), title: this.props.toolJson.isShowIconTitle ? this.getTitle() : '', onClick: function (e) { _this._onIconClick(e); } },
                jimu_core_1.jsx(jimu_ui_1.Icon, { width: 16, height: 16, className: "exbmap-ui-tool-icon", icon: toolIcon.icon })),
            this.toolName === this.props.activeToolName && expandPanel &&
                jimu_core_1.ReactDOM.createPortal(jimu_core_1.jsx(panel_shell_1.default, { onDestroyed: function () { _this.onClosePanel(); } },
                    jimu_core_1.jsx("div", { className: "w-100 h-100 d-flex flex-column" },
                        jimu_core_1.jsx("div", { className: "w-100 justify-content-between d-flex exbmap-ui-expand-content-header", style: { padding: '10px', fontWeight: 'bold' } },
                            jimu_core_1.jsx("div", { className: "panel-title text-truncate w-100", title: this.getTitle() }, this.getTitle()),
                            jimu_core_1.jsx("div", { style: { zIndex: 1, pointerEvents: 'auto', width: '40px', height: '30px' }, onClick: function () { _this.props.onActiveToolNameChange(null); }, className: "d-flex justify-content-end align-items-start" },
                                jimu_core_1.jsx(jimu_ui_1.Icon, { className: "panel-icon", width: 20, height: 20, icon: closeIcon, color: '#6e6e6e' }))),
                        jimu_core_1.jsx("div", { className: "flex-grow-1 w-100", style: { position: 'relative' } },
                            jimu_core_1.jsx(scroll_container_1.default, { className: "w-100 h-100", style: { position: 'absolute', paddingLeft: '10px', paddingRight: '10px' } },
                                jimu_core_1.jsx(jimu_core_1.ErrorBoundary, null, this.getExpandPanel()))))), document.getElementById(this.props.jimuMapView.id + "-bottom-panel")));
    };
    BaseTool.prototype.getExpandPanelPlacementClassName = function () {
        if (!this.props.toolJson.panelPlacement) {
            return null;
        }
        else {
            return "expand-placement-" + this.props.toolJson.panelPlacement.split('-')[0];
        }
    };
    BaseTool.prototype.render = function () {
        return this._getContent();
    };
    return BaseTool;
}(ui_component_1.UIComponent));
exports.BaseTool = BaseTool;
var templateObject_1;
//# sourceMappingURL=base-tool.js.map