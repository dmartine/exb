"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var jimu_core_1 = require("jimu-core");
var jimu_ui_1 = require("jimu-ui");
var classnames = require("classnames");
var IconOrder = require('jimu-ui/lib/icons/order.svg');
var Widget = /** @class */ (function (_super) {
    __extends(Widget, _super);
    function Widget(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isOpen: false
        };
        return _this;
    }
    Widget.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, style = _a.style;
        var classes = classnames(className, 'widget-builder-list-sort');
        return jimu_core_1.React.createElement("div", { className: classes, style: style },
            jimu_core_1.React.createElement(jimu_ui_1.Dropdown, { size: "sm", isOpen: this.state.isOpen, onClick: function (evt) { return evt.stopPropagation(); }, toggle: function () { return _this.setState({ isOpen: !_this.state.isOpen }); } },
                jimu_core_1.React.createElement(jimu_ui_1.DropdownToggle, { className: "btn btn-light" },
                    jimu_core_1.React.createElement(jimu_ui_1.Icon, { width: 20, height: 16, icon: IconOrder, className: "app-list-iconfill" })),
                jimu_core_1.React.createElement(jimu_ui_1.DropdownMenu, { right: true },
                    jimu_core_1.React.createElement(jimu_ui_1.DropdownItem, { onClick: function () { _this.props.onChange('modified'); } }, "Last modified"),
                    jimu_core_1.React.createElement(jimu_ui_1.DropdownItem, { onClick: function () { _this.props.onChange('title'); } }, "Title"),
                    jimu_core_1.React.createElement(jimu_ui_1.DropdownItem, { onClick: function () { _this.props.onChange('numViews'); } }, "Most views"))));
    };
    return Widget;
}(jimu_core_1.React.PureComponent));
exports.default = Widget;
//# sourceMappingURL=app-list-sortappdropdown.js.map