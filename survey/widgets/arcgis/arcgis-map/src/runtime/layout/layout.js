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
var group_1 = require("./base/group");
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout(props) {
        var _this = _super.call(this, props) || this;
        _this.getMaxHeightForPcExpand = function (widgetHeight) {
            if (!widgetHeight) {
                return null;
            }
            else {
                if (widgetHeight < 65) {
                    return null;
                }
                else {
                    var resultHeight = widgetHeight - 65;
                    if (resultHeight < 300) {
                        return resultHeight;
                    }
                    else {
                        return 300;
                    }
                }
            }
        };
        _this.handleActiveNameChange = function (activeToolName) {
            _this.setState({
                activeToolName: activeToolName
            });
        };
        _this.handSetHiddenElementNames = function (elementNames) {
            _this.setState({
                hiddenElementNames: elementNames
            });
        };
        _this.getLayoutContent = function (layoutJson) {
            if (!layoutJson || !_this.props.toolConfig) {
                return null;
            }
            else {
                return jimu_core_1.jsx("div", { css: _this.getStyle() }, Object.keys(layoutJson.layout).map(function (key, index) {
                    if (!layoutJson.elements[key] || layoutJson.elements[key].type !== 'GROUP' || !layoutJson.layout[key].position) {
                        return null;
                    }
                    return jimu_core_1.jsx(group_1.default, { className: layoutJson.elements[key].className, style: layoutJson.elements[key].style, isResponsive: layoutJson.elements[key].isResponsive, isMobile: _this.props.isMobile, isMainGroup: true, key: index, layoutConfig: layoutJson, toolConfig: _this.props.toolConfig, onActiveToolNameChange: _this.handleActiveNameChange, jimuMapView: _this.props.jimuMapView, groupName: key, activeToolName: _this.state.activeToolName, hiddenElementNames: layoutJson.mobileResponsiveStrategy && _this.state.hiddenElementNames, intl: _this.props.intl, onSetHiddenElementNames: _this.handSetHiddenElementNames });
                }));
            }
        };
        _this.state = {
            activeToolName: null,
            toolsContentInMobileExpandPanel: null,
            hiddenElementNames: []
        };
        _this.contentRef = document.createElement('div');
        _this.contentRef.className = 'exbmap-ui esri-ui-inner-container exbmap-ui-layout';
        return _this;
    }
    Layout.prototype.getStyle = function () {
        return jimu_core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      z-index: 0;\n\n      .expand-panel-transition {\n        transition: opacity 0.3s, right 0.3s;\n      }\n\n      .scale-attribution-xy-group {\n        > div:first-of-type:nth-last-of-type(1) {\n          width: 100%;\n          max-width: 100% !important;\n        }\n      }\n\n      .exbmap-ui-hidden-element {\n        display: none !important;\n      }\n\n      .exbmap-basetool-loader {\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        height: 2px;\n        width: 100%;\n        animation: esri-fade-in 500ms ease-in-out;\n      }\n\n      .exbmap-basetool-loader:before {\n        background-color: rgba(110,110,110,0.3);\n        width: 100%;\n        z-index: 0;\n        content: \"\";\n        opacity: 1;\n        position: absolute;\n        height: 2px;\n        top: 0;\n        transition: opacity 500ms ease-in-out;\n      }\n\n      .exbmap-basetool-loader:after {\n        background-color: #6e6e6e;\n        width: 20%;\n        z-index: 0;\n        animation: looping-progresss-bar-ani 1500ms linear infinite;\n        content: \"\";\n        opacity: 1;\n        position: absolute;\n        height: 2px;\n        top: 0;\n        transition: opacity 500ms ease-in-out;\n      }\n\n      .exbmap-ui-pc-expand-maxheight {\n        max-height: ", "px;\n        overflow: auto\n      }\n      "], ["\n      z-index: 0;\n\n      .expand-panel-transition {\n        transition: opacity 0.3s, right 0.3s;\n      }\n\n      .scale-attribution-xy-group {\n        > div:first-of-type:nth-last-of-type(1) {\n          width: 100%;\n          max-width: 100% !important;\n        }\n      }\n\n      .exbmap-ui-hidden-element {\n        display: none !important;\n      }\n\n      .exbmap-basetool-loader {\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        height: 2px;\n        width: 100%;\n        animation: esri-fade-in 500ms ease-in-out;\n      }\n\n      .exbmap-basetool-loader:before {\n        background-color: rgba(110,110,110,0.3);\n        width: 100%;\n        z-index: 0;\n        content: \"\";\n        opacity: 1;\n        position: absolute;\n        height: 2px;\n        top: 0;\n        transition: opacity 500ms ease-in-out;\n      }\n\n      .exbmap-basetool-loader:after {\n        background-color: #6e6e6e;\n        width: 20%;\n        z-index: 0;\n        animation: looping-progresss-bar-ani 1500ms linear infinite;\n        content: \"\";\n        opacity: 1;\n        position: absolute;\n        height: 2px;\n        top: 0;\n        transition: opacity 500ms ease-in-out;\n      }\n\n      .exbmap-ui-pc-expand-maxheight {\n        max-height: ", "px;\n        overflow: auto\n      }\n      "])), this.getMaxHeightForPcExpand(this.props.widgetHeight));
    };
    Layout.prototype.componentDidMount = function () {
        if ((this.props.jimuMapView && this.props.jimuMapView.view && this.props.jimuMapView.view.ui && this.props.jimuMapView.view.ui.container)) {
            this.props.jimuMapView.view.ui.container.appendChild(this.contentRef);
        }
    };
    Layout.prototype.render = function () {
        if (this.props.jimuMapView && this.props.jimuMapView.view && this.props.jimuMapView.view.ui && this.props.jimuMapView.view.ui.container) {
            return jimu_core_1.jsx("div", null, jimu_core_1.ReactDOM.createPortal(this.getLayoutContent(this.props.layoutConfig), this.contentRef));
        }
        else {
            return null;
        }
    };
    return Layout;
}(jimu_core_1.React.PureComponent));
exports.default = Layout;
var templateObject_1;
//# sourceMappingURL=layout.js.map