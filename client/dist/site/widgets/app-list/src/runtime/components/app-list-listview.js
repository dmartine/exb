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
var app_list_listview_item_1 = require("./app-list-listview-item");
var Widget = /** @class */ (function (_super) {
    __extends(Widget, _super);
    function Widget(props) {
        var _this = _super.call(this, props) || this;
        _this.toggle = function () {
            _this.setState({
                tooltipOpen: !_this.state.tooltipOpen
            });
        };
        _this.state = {
            tooltipOpen: false
        };
        return _this;
    }
    Widget.prototype.getViewContent = function () {
        var _this = this;
        var appLength = this.props.apps.length;
        if (appLength < 1) {
            return null;
        }
        else {
            var itemArr = null;
            var viewContent = null;
            itemArr = this.props.apps.map(function (appItem, idx) {
                return jimu_core_1.React.createElement(app_list_listview_item_1.default, { portalUrl: _this.props.portalUrl, folderUrl: _this.props.folderUrl, key: idx, itemIdx: idx, appItem: appItem });
            });
            viewContent = jimu_core_1.React.createElement(jimu_ui_1.Container, { className: "app-list-maxwidth" }, itemArr);
            return viewContent;
        }
    };
    Widget.prototype.render = function () {
        var viewContent = this.getViewContent();
        return jimu_core_1.React.createElement("div", { className: "app-list-listview w-100" }, viewContent);
    };
    return Widget;
}(jimu_core_1.React.PureComponent));
exports.default = Widget;
//# sourceMappingURL=app-list-listview.js.map