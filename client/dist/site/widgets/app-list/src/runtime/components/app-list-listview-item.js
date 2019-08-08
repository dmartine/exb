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
var app_list_editdropdown_1 = require("./app-list-editdropdown");
var IconPlay = require('jimu-ui/lib/icons/play.svg');
var IconPeople = require('jimu-ui/lib/icons/people.svg');
var Widget = /** @class */ (function (_super) {
    __extends(Widget, _super);
    function Widget(props) {
        var _this = _super.call(this, props) || this;
        _this.toggle = function () {
            _this.setState({
                tooltipOpen: !_this.state.tooltipOpen
            });
        };
        _this.handleItemClick = function () {
            var to = window.jimuConfig.rootPath + '?id=' + _this.props.appItem.id;
            jimu_core_1.jimuHistory.browserHistory.push(to);
        };
        _this.appLaunch = function (e) {
            e.stopPropagation();
            var appUrl = window.jimuConfig.useStructuralUrl ? "../stemapp/" + _this.props.appItem.id + "/" : "../stemapp/?id=" + _this.props.appItem.id;
            window.open(appUrl);
        };
        _this.state = {
            tooltipOpen: false,
            itemSelected: false
        };
        return _this;
    }
    Widget.prototype.render = function () {
        var _this = this;
        var thumbnail = this.props.appItem.thumbnail;
        if (thumbnail) {
            thumbnail = this.props.portalUrl + '/sharing/rest/content/items/' + this.props.appItem.id + '/info/'
                + thumbnail + '?token=' + jimu_core_1.SessionManager.getInstance().getSession().token;
        }
        else {
            thumbnail = this.props.folderUrl + './dist/runtime/assets/defaultthumb.svg';
        }
        return jimu_core_1.React.createElement(jimu_ui_1.Row, { onClick: this.handleItemClick, style: { cursor: 'pointer' }, className: jimu_core_1.classNames('mt-3 mb-3 bg-white border', { 'border-primary': this.state.itemSelected }), onMouseEnter: function () { _this.setState({ itemSelected: true }); }, onMouseLeave: function () { _this.setState({ itemSelected: false }); } },
            jimu_core_1.React.createElement(jimu_ui_1.Col, { className: "p-0", sm: "2" },
                jimu_core_1.React.createElement("div", { className: "app-list-listview-pic", style: { backgroundImage: 'url(' + thumbnail + ')' } })),
            jimu_core_1.React.createElement(jimu_ui_1.Col, { sm: "3", className: "d-flex align-items-center" },
                jimu_core_1.React.createElement("div", { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, this.props.appItem.title)),
            jimu_core_1.React.createElement(jimu_ui_1.Col, { sm: "2", className: "d-flex align-items-center" },
                jimu_core_1.React.createElement("div", null, new Date(this.props.appItem.created).toLocaleDateString())),
            jimu_core_1.React.createElement(jimu_ui_1.Col, { sm: "2", className: "d-flex align-items-center" },
                jimu_core_1.React.createElement("div", null, this.props.appItem.owner)),
            jimu_core_1.React.createElement(jimu_ui_1.Col, { sm: "1", className: "d-flex align-items-center" },
                jimu_core_1.React.createElement("div", null, this.props.appItem.numViews + ' Views')),
            jimu_core_1.React.createElement(jimu_ui_1.Col, { sm: "2", className: "d-flex align-items-center justify-content-end" },
                jimu_core_1.React.createElement("div", null,
                    jimu_core_1.React.createElement(app_list_editdropdown_1.default, { className: "float-right", appId: this.props.appItem.id }),
                    jimu_core_1.React.createElement(jimu_ui_1.Button, { className: "float-right pl-1 pr-1 ml-1 mr-1 btn bg-white border-0", onClick: this.appLaunch },
                        jimu_core_1.React.createElement(jimu_ui_1.Icon, { className: "app-list-iconfill", icon: IconPlay })),
                    jimu_core_1.React.createElement(jimu_ui_1.Button, { className: "float-right pl-1 pr-1 ml-1 mr-1 btn bg-white border-0", id: 'Tooltip' + this.props.itemIdx },
                        jimu_core_1.React.createElement(jimu_ui_1.Icon, { className: "app-list-iconfill", icon: IconPeople })),
                    jimu_core_1.React.createElement(jimu_ui_1.Tooltip, { placement: "bottom", isOpen: this.state.tooltipOpen, target: 'Tooltip' + this.props.itemIdx, toggle: function () { return _this.toggle(); }, style: { textAlign: 'left' } },
                        "Access",
                        jimu_core_1.React.createElement("br", null),
                        "Access and update capabilities"))));
    };
    return Widget;
}(jimu_core_1.React.PureComponent));
exports.default = Widget;
//# sourceMappingURL=app-list-listview-item.js.map