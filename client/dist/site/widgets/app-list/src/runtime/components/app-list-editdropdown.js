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
var app_list_context_1 = require("../lib/app-list-context");
var IconMoreHorizontal = require('jimu-ui/lib/icons/more-horizontal.svg');
var Widget = /** @class */ (function (_super) {
    __extends(Widget, _super);
    function Widget(props) {
        var _this = _super.call(this, props) || this;
        _this.appLaunch = function () {
            var appUrl = window.jimuConfig.useStructuralUrl ? "../stemapp/" + _this.props.appId + "/" : "../stemapp/?id=" + _this.props.appId;
            window.open(appUrl);
        };
        _this.viewDetails = function () {
            // let detailUrl = `https://esridevbeijing.maps.arcgis.com/home/item.html?id=${this.props.appId}`;
            // window.open(detailUrl);
        };
        _this.state = {
            isOpen: false
        };
        return _this;
    }
    Widget.prototype.render = function () {
        var _this = this;
        return jimu_core_1.React.createElement(app_list_context_1.AppListContext.Consumer, null, function (_a) {
            var deleteApp = _a.deleteApp;
            return (jimu_core_1.React.createElement(jimu_ui_1.Dropdown, { className: _this.props.className, direction: "right", size: "sm", isOpen: _this.state.isOpen, onClick: function (evt) { return evt.stopPropagation(); }, toggle: function () { return _this.setState({ isOpen: !_this.state.isOpen }); } },
                jimu_core_1.React.createElement(jimu_ui_1.DropdownToggle, { color: "link" },
                    jimu_core_1.React.createElement(jimu_ui_1.Icon, { icon: IconMoreHorizontal, className: "app-list-iconfill" })),
                jimu_core_1.React.createElement(jimu_ui_1.DropdownMenu, null,
                    jimu_core_1.React.createElement(jimu_ui_1.DropdownItem, { onClick: function () { return deleteApp(_this.props.appId); } }, "Remove"),
                    jimu_core_1.React.createElement(jimu_ui_1.DropdownItem, null, "Rename"),
                    jimu_core_1.React.createElement(jimu_ui_1.DropdownItem, null, "Duplicate"),
                    jimu_core_1.React.createElement(jimu_ui_1.DropdownItem, { onClick: _this.viewDetails }, "View details"))));
        });
    };
    return Widget;
}(jimu_core_1.React.PureComponent));
exports.default = Widget;
//# sourceMappingURL=app-list-editdropdown.js.map