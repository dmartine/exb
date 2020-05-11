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
var ui_component_1 = require("./ui-component");
var tool_modules_1 = require("../tool-modules");
var BaseToolShell = /** @class */ (function (_super) {
    __extends(BaseToolShell, _super);
    function BaseToolShell(props) {
        return _super.call(this, props) || this;
    }
    BaseToolShell.prototype.componentDidMount = function () {
        var baseToolInstance = this.refs.baseToolInstance;
        if (!tool_modules_1.default[this.props.toolName].getIsNeedSetting() || (this.props.toolConfig && this.props.toolConfig["can" + this.props.toolName])) {
            this.props.jimuMapView.view.ui.exbMapTools[this.props.toolName] = baseToolInstance;
        }
    };
    BaseToolShell.prototype.componentWillUnmount = function () {
        if (tool_modules_1.default[this.props.toolName].getIsNeedSetting()) {
            var tempInstance = this.props.jimuMapView && this.props.jimuMapView.view
                && this.props.jimuMapView.view.ui && this.props.jimuMapView.view.ui.exbMapTools[this.props.toolName];
            if (tempInstance && tempInstance.destroy) {
                tempInstance.destroy();
                delete this.props.jimuMapView.view.ui.exbMapTools[this.props.toolName];
            }
        }
    };
    BaseToolShell.prototype.render = function () {
        var ToolClass = tool_modules_1.default[this.props.toolName];
        if (ToolClass) {
            return jimu_core_1.jsx("div", { className: jimu_core_1.classNames(this.props.className + " exbmap-ui exbmap-ui-tool-shell divitem", this.props.layoutConfig.elements[this.props.toolName].className, {
                    'exbmap-ui-hidden-element': this.props.isHidden,
                    'mb-0 mr-0': this.props.isLastElement
                }) },
                jimu_core_1.jsx(ToolClass, { ref: "baseToolInstance", toolJson: this.props.layoutConfig.elements[this.props.toolName], toolName: this.props.toolName, isMobile: this.props.isMobile, jimuMapView: this.props.jimuMapView, activeToolName: this.props.activeToolName, onActiveToolNameChange: this.props.onActiveToolNameChange, intl: this.props.intl }));
        }
        else {
            if (this.props.isMobile) {
                return jimu_core_1.jsx("span", null);
            }
            else {
                return null;
            }
        }
    };
    return BaseToolShell;
}(ui_component_1.UIComponent));
exports.default = BaseToolShell;
//# sourceMappingURL=base-tool-shell.js.map