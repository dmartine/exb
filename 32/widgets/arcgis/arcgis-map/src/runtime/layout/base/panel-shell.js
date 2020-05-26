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
var PanelShell = /** @class */ (function (_super) {
    __extends(PanelShell, _super);
    function PanelShell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelShell.prototype.componentWillUnmount = function () {
        if (this.props.onDestroyed) {
            this.props.onDestroyed();
        }
    };
    PanelShell.prototype.render = function () {
        return jimu_core_1.React.createElement(jimu_core_1.React.Fragment, null, this.props.children);
    };
    return PanelShell;
}(jimu_core_1.React.PureComponent));
exports.default = PanelShell;
//# sourceMappingURL=panel-shell.js.map