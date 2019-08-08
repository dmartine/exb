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
var app_list_detailview_item_1 = require("./app-list-detailview-item");
var Widget = /** @class */ (function (_super) {
    __extends(Widget, _super);
    function Widget(props) {
        return _super.call(this, props) || this;
    }
    Widget.prototype.getViewContent = function () {
        var appLength = this.props.apps.length;
        if (appLength < 1) {
            return null;
        }
        else {
            var viewContent = null;
            var rowNum = Math.ceil(appLength / 4);
            var rowArr = new Array();
            for (var rowIdx = 0; rowIdx < rowNum; rowIdx++) {
                var itemArr = new Array();
                for (var itemIdx = rowIdx * 4; itemIdx < (rowIdx + 1) * 4; itemIdx++) {
                    if (itemIdx >= appLength) {
                        break;
                    }
                    itemArr.push(jimu_core_1.React.createElement(jimu_ui_1.Col, { sm: "3", key: itemIdx },
                        jimu_core_1.React.createElement(app_list_detailview_item_1.default, { portalUrl: this.props.portalUrl, folderUrl: this.props.folderUrl, appItem: this.props.apps[itemIdx], itemIdx: itemIdx })));
                }
                rowArr.push(jimu_core_1.React.createElement(jimu_ui_1.Row, { style: { marginBottom: '35px' }, key: rowIdx }, itemArr));
            }
            viewContent = (jimu_core_1.React.createElement("div", { className: "app-list-detailview-content" },
                jimu_core_1.React.createElement(jimu_ui_1.Container, { className: "p-0 app-list-maxwidth" }, rowArr)));
            return viewContent;
        }
    };
    Widget.prototype.render = function () {
        var viewContent = this.getViewContent();
        return jimu_core_1.React.createElement("div", { className: "app-list-detailview" }, viewContent);
    };
    return Widget;
}(jimu_core_1.React.PureComponent));
exports.default = Widget;
//# sourceMappingURL=app-list-detailview.js.map