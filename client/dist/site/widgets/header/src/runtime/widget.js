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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var jimu_core_1 = require("jimu-core");
var jimu_for_builder_1 = require("jimu-for-builder");
var jimu_ui_1 = require("jimu-ui");
var default_1 = require("./translations/default");
var IconAdd = require('jimu-ui/lib/icons/add.svg');
var IconAccount = require('jimu-ui/lib/icons/account.svg');
var Widget = /** @class */ (function (_super) {
    __extends(Widget, _super);
    function Widget(props) {
        var _this = _super.call(this, props) || this;
        _this.titleTextInput = jimu_core_1.React.createRef();
        // span is designed for textInput auto resize function 
        _this.spanTextInput = jimu_core_1.React.createRef();
        _this.focusEditTitle = function () {
            _this.titleTextInput.current.select();
        };
        _this.editTitle = function () {
            var currentTitle = _this.titleTextInput.current.value;
            jimu_for_builder_1.appServices.updateAppItem({
                id: _this.props.queryObject.id,
                title: currentTitle
            }).then(function () {
                _this.props.dispatch(jimu_for_builder_1.builderActions.refreshAppListAction(true));
            }, function (err) {
                console.error(err);
            });
        };
        _this.refreshTitle = function (id) {
            jimu_for_builder_1.appServices.searchAppById(id).then(function (appItem) {
                _this.setState({
                    titleText: appItem.title
                });
            }, function (err) {
                console.error(err);
            });
        };
        _this.titleTextChange = function (event) {
            var currentTitle = event.target.value;
            _this.setState({
                titleText: currentTitle
            });
        };
        _this.newApp = function () {
            jimu_core_1.jimuHistory.changePage('template');
        };
        _this.handleKeydown = function (e) {
            if (e.keyCode === 13) {
                _this.titleTextInput.current.blur();
            }
            else {
                return;
            }
        };
        _this.appTaskToggle = _this.appTaskToggle.bind(_this);
        _this.state = {
            appTaskDropdown: false,
            titleText: '',
            titleLength: 0
        };
        return _this;
    }
    Widget.prototype.getStyle = function () {
        // with font_size_root theme variable can't be get, so define font_size_root temporarily
        var font_size_root = 14;
        return jimu_core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      .widget-builder-header {\n        background-color: #F9F9FC;\n      \n        .header-logo {\n          .header-logo-item {\n            height: ", "rem;\n            width: ", "rem;\n          }\n      \n          .header-logo-label {\n            color: #3A4041;\n          }\n        }\n      \n        .header-title {\n          position: absolute;\n          left: 50%;\n          transform: translateX(-50%);\n          top: 0;\n          bottom: 0;\n          input {\n            background-color: transparent;\n            max-width: ", "rem;\n            &:focus {\n              background-color: white;\n            }\n          }\n        }\n      \n        .header-title-input {\n          border: none;\n          text-align: center;\n          min-width: ", "rem;\n          cursor: pointer;\n          border: 1px solid #F9F9FC;\n      \n          &:hover {\n            border: 1px solid #E0E5EF;\n          }\n        }\n      \n        .header-title-icon {\n          cursor: pointer;\n          height: ", "rem;\n          width: ", "rem;\n      \n          &:hover {\n            background-color: gray;\n          }\n        }\n      \n        .header-dropdown {\n          float: left;\n      \n          div {\n            background-color: #F9F9FC;\n          }\n        }\n      \n        .header-dropdowntoggle {\n          background-color: #F9F9FC !important;\n          color: #000000 !important;\n          border: none;\n          font-size: 18px;\n      \n          &:active {\n            background-color: #F9F9FC !important;\n            color: #000000 !important;\n          }\n        }\n      \n        .header-dropdown-label {\n          border-width: 0px;\n          border-right-style: solid;\n          font-size: 1rem;\n          margin-top: .1rem;\n        }\n      \n        .header-dropdown-selected {\n          color: #000;\n          background-color: #F9F9FC;\n      \n          &:hover {\n            color: #000;\n            background-color: #F9F9FC;\n          }\n        }\n      \n        .header-login {\n          height: ", "rem;\n          width: ", "rem;\n          cursor: pointer;\n        }\n      }"], ["\n      .widget-builder-header {\n        background-color: #F9F9FC;\n      \n        .header-logo {\n          .header-logo-item {\n            height: ", "rem;\n            width: ", "rem;\n          }\n      \n          .header-logo-label {\n            color: #3A4041;\n          }\n        }\n      \n        .header-title {\n          position: absolute;\n          left: 50%;\n          transform: translateX(-50%);\n          top: 0;\n          bottom: 0;\n          input {\n            background-color: transparent;\n            max-width: ", "rem;\n            &:focus {\n              background-color: white;\n            }\n          }\n        }\n      \n        .header-title-input {\n          border: none;\n          text-align: center;\n          min-width: ", "rem;\n          cursor: pointer;\n          border: 1px solid #F9F9FC;\n      \n          &:hover {\n            border: 1px solid #E0E5EF;\n          }\n        }\n      \n        .header-title-icon {\n          cursor: pointer;\n          height: ", "rem;\n          width: ", "rem;\n      \n          &:hover {\n            background-color: gray;\n          }\n        }\n      \n        .header-dropdown {\n          float: left;\n      \n          div {\n            background-color: #F9F9FC;\n          }\n        }\n      \n        .header-dropdowntoggle {\n          background-color: #F9F9FC !important;\n          color: #000000 !important;\n          border: none;\n          font-size: 18px;\n      \n          &:active {\n            background-color: #F9F9FC !important;\n            color: #000000 !important;\n          }\n        }\n      \n        .header-dropdown-label {\n          border-width: 0px;\n          border-right-style: solid;\n          font-size: 1rem;\n          margin-top: .1rem;\n        }\n      \n        .header-dropdown-selected {\n          color: #000;\n          background-color: #F9F9FC;\n      \n          &:hover {\n            color: #000;\n            background-color: #F9F9FC;\n          }\n        }\n      \n        .header-login {\n          height: ", "rem;\n          width: ", "rem;\n          cursor: pointer;\n        }\n      }"])), 20 / font_size_root, 20 / font_size_root, 240 / font_size_root, 50 / font_size_root, 16 / font_size_root, 16 / font_size_root, 20 / font_size_root, 20 / font_size_root);
    };
    Widget.prototype.componentDidMount = function () {
        if (this.props.queryObject.id) {
            this.refreshTitle(this.props.queryObject.id);
        }
    };
    Widget.prototype.componentWillReceiveProps = function (newProps) {
        // listen to queryObjectId change, so update the widget titleText timely
        if (newProps.queryObject.id && this.props.queryObject.id !== newProps.queryObject.id) {
            this.setState({
                titleText: ''
            });
            this.refreshTitle(newProps.queryObject.id);
        }
    };
    Widget.prototype.appTaskToggle = function () {
        this.setState(function (prevState) { return ({
            appTaskDropdown: !prevState.appTaskDropdown
        }); });
    };
    Widget.prototype.componentDidUpdate = function () {
        if (this.spanTextInput.current && this.state.titleLength !== this.spanTextInput.current.offsetWidth) {
            this.setState({
                titleLength: this.spanTextInput.current.offsetWidth + 2
            });
        }
    };
    Widget.prototype.render = function () {
        var _this = this;
        var urlInfo = jimu_core_1.urlUtils.getAppIdPageIdFromUrl();
        var pageId = urlInfo.pageId ? urlInfo.pageId : 'default';
        var showTitle = true;
        if (pageId === 'home' || pageId === 'template') {
            showTitle = false;
        }
        return jimu_core_1.jsx("div", { css: this.getStyle(), className: "h-100" },
            jimu_core_1.jsx("div", { className: "widget-builder-header d-flex justify-content-between h-100 px-4 " },
                jimu_core_1.jsx("div", { className: "header-logo d-flex align-items-center" },
                    jimu_core_1.jsx("img", { className: "header-logo-item mr-2 d-block", src: require('./assets/exb_logo.svg') }),
                    jimu_core_1.jsx("div", null,
                        jimu_core_1.jsx("h4", { className: "mb-0 font-weight-normal" },
                            jimu_core_1.jsx(jimu_ui_1.Link, { className: "header-logo-label", to: jimu_core_1.urlUtils.getPageLinkUrl('home') }, "Experience Studio")))),
                showTitle && jimu_core_1.jsx("div", { className: "header-title d-flex align-items-center", onClick: this.focusEditTitle },
                    jimu_core_1.jsx("input", { ref: this.titleTextInput, className: "header-title-input px-1 font-weight-normal", style: { width: this.state.titleLength + "px", fontSize: '16px' }, value: this.state.titleText, onBlur: this.editTitle, onChange: this.titleTextChange, onKeyDown: function (e) { _this.handleKeydown(e); } }),
                    jimu_core_1.jsx("img", { className: "ml-2 header-title-icon", src: require('./assets/edittext.svg') })),
                jimu_core_1.jsx("div", { className: "float-right" },
                    jimu_core_1.jsx("span", { className: "px-1 border font-weight-normal", style: { fontSize: '16px', position: 'absolute', opacity: 0, whiteSpace: 'pre' }, ref: this.spanTextInput }, this.state.titleText),
                    showTitle && jimu_core_1.jsx(jimu_ui_1.Dropdown, { className: "header-dropdown mt-1", isOpen: this.state.appTaskDropdown, toggle: this.appTaskToggle, size: "lg" },
                        jimu_core_1.jsx(jimu_ui_1.DropdownToggle, { caret: true, className: "header-dropdowntoggle" },
                            jimu_core_1.jsx("div", { className: "header-dropdown-label float-left mr-1" },
                                jimu_core_1.jsx(jimu_core_1.FormattedMessage, { id: "createNew", defaultMessage: default_1.default.createNew }))),
                        jimu_core_1.jsx(jimu_ui_1.DropdownMenu, { right: true },
                            jimu_core_1.jsx(jimu_ui_1.DropdownItem, { className: "header-dropdown-selected justify-content-end pl-1 pr-4 d-flex", onClick: this.newApp },
                                jimu_core_1.jsx(jimu_ui_1.Icon, { icon: IconAdd, className: "d-block float-left pl-1" }),
                                jimu_core_1.jsx("div", { className: "d-block float-left ml-1", style: { fontSize: '.8rem' } },
                                    jimu_core_1.jsx(jimu_core_1.FormattedMessage, { id: "newExperience", defaultMessage: default_1.default.newExperience }))))),
                    jimu_core_1.jsx(jimu_ui_1.Icon, { icon: IconAccount, className: "d-block float-left mt-2 header-login", color: '#000' }))));
    };
    return Widget;
}(jimu_core_1.BaseWidget));
exports.default = Widget;
var templateObject_1;
//# sourceMappingURL=widget.js.map