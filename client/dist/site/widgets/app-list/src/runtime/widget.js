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
/** @jsx jsx */
var jimu_core_1 = require("jimu-core");
var jimu_for_builder_1 = require("jimu-for-builder");
var jimu_ui_1 = require("jimu-ui");
var app_list_detailview_1 = require("./components/app-list-detailview");
var app_list_listview_1 = require("./components/app-list-listview");
var app_list_context_1 = require("./lib/app-list-context");
var app_list_sortappdropdown_1 = require("./components/app-list-sortappdropdown");
var app_list_style_1 = require("./lib/app-list-style");
var AccessType;
(function (AccessType) {
    AccessType["ME"] = "me";
    AccessType["ANYONE"] = "anyone";
    AccessType["NOTME"] = "notme";
})(AccessType || (AccessType = {}));
var FilterField;
(function (FilterField) {
    FilterField["Modified"] = "modified";
    FilterField["Title"] = "title";
    FilterField["NumViews"] = "numViews";
})(FilterField || (FilterField = {}));
var IconSearch = require('jimu-ui/lib/icons/search.svg');
var IconAdd = require('jimu-ui/lib/icons/add.svg');
var IconViewList = require('jimu-ui/lib/icons/view-list.svg');
var IconViewCard = require('jimu-ui/lib/icons/view-card.svg');
var Widget = /** @class */ (function (_super) {
    __extends(Widget, _super);
    function Widget(props) {
        var _this = _super.call(this, props) || this;
        _this.getRequestOption = function (accessType, filterField) {
            var session = jimu_core_1.SessionManager.getInstance().getSession();
            var requestOption = jimu_core_1.Immutable({});
            switch (accessType) {
                case AccessType.ME:
                    requestOption = requestOption.merge({
                        q: "typekeywords: \"EXB Experience\" AND owner:" + session.username
                    });
                    break;
                case AccessType.ANYONE:
                    requestOption = requestOption.merge({
                        q: "typekeywords: \"EXB Experience\""
                    });
                    break;
                case AccessType.NOTME:
                    requestOption = requestOption.merge({
                        q: "typekeywords: \"EXB Experience\" NOT owner:" + session.username
                    });
                    break;
            }
            if (filterField) {
                requestOption = requestOption.merge({
                    sortField: filterField,
                    sortOrder: 'desc',
                });
            }
            return requestOption;
        };
        _this.newApp = function () {
            jimu_core_1.jimuHistory.changePage('template');
        };
        _this.deleteApp = function (appId) {
            jimu_for_builder_1.appServices.deleteApp(appId).then(function () {
                var self = _this;
                // since deleteApp api can not update resultdata timely, so add timeout function to fresh
                setTimeout(function () {
                    self.refresh();
                }, 500);
            });
        };
        _this.switchListView = function () {
            _this.setState({
                isDetailContent: !_this.state.isDetailContent
            });
        };
        _this.accessChange = function (e) {
            var accessType = e.target.value;
            var requestOption = _this.getRequestOption(accessType, _this.state.filterField);
            _this.refresh(requestOption);
            _this.setState({
                accessType: accessType
            });
        };
        _this.filterFieldChange = function (filterField) {
            var requestOption = _this.getRequestOption(_this.state.accessType, filterField);
            _this.refresh(requestOption);
            var filterLabel = '';
            if (filterField == FilterField.Title) {
                filterLabel = 'Experiences by title';
            }
            else if (filterField == FilterField.NumViews) {
                filterLabel = 'Experiences by views';
            }
            else if (filterField == FilterField.Modified) {
                filterLabel = 'Recent experiences';
            }
            _this.setState({
                filterField: filterField,
                filterTitle: filterLabel
            });
        };
        _this.handleKeydown = function (e) {
            if (e.keyCode === 13) {
                _this.searchExperiences(e.target.value);
            }
            else {
                return;
            }
        };
        _this.searchExperiences = function (content) {
            var requestOption = _this.getRequestOption(_this.state.accessType, _this.state.filterField);
            var q = requestOption.q + " AND title:\"" + content + "\"";
            requestOption = requestOption.set('q', q);
            _this.refresh(requestOption);
        };
        _this.searchTextChange = function (e) {
            _this.setState({
                searchText: e.target.value
            });
        };
        _this.state = {
            apps: [],
            isDetailContent: true,
            accessType: AccessType.ME,
            filterTitle: 'Recent experiences',
            filterField: FilterField.Modified,
            searchText: ''
        };
        return _this;
    }
    Widget.prototype.componentDidMount = function () {
        var requestOption = this.getRequestOption(this.state.accessType, this.state.filterField);
        this.refresh(requestOption);
    };
    Widget.prototype.refresh = function (requestOption) {
        var _this = this;
        jimu_for_builder_1.appServices.searchApp(requestOption).then(function (apps) {
            _this.setState({ apps: apps });
        });
    };
    Widget.prototype.componentWillReceiveProps = function (newProps) {
        if (this.props.refreshAppList !== newProps.refreshAppList && newProps.refreshAppList) {
            var self_1 = this;
            this.setState({
                filterField: FilterField.Modified,
                accessType: AccessType.ME,
                filterTitle: 'Recent experiences',
                searchText: ''
            });
            // since updateApp api can not update resultdata timely, so add timeout function to fresh
            setTimeout(function () {
                var requestOption = self_1.getRequestOption(self_1.state.accessType, self_1.state.filterField);
                self_1.refresh(requestOption);
                self_1.props.dispatch(jimu_for_builder_1.builderActions.refreshAppListAction(false));
            }, 1000);
        }
    };
    Widget.prototype.render = function () {
        var _this = this;
        var appListContent = null;
        if (this.state.isDetailContent) {
            appListContent = jimu_core_1.jsx(app_list_detailview_1.default, { portalUrl: this.props.portalUrl, folderUrl: this.props.context.folderUrl, apps: this.state.apps, switchListView: this.switchListView });
        }
        else {
            appListContent = jimu_core_1.jsx(app_list_listview_1.default, { portalUrl: this.props.portalUrl, folderUrl: this.props.context.folderUrl, apps: this.state.apps, switchListView: this.switchListView });
        }
        return jimu_core_1.jsx(app_list_context_1.AppListContext.Provider, { value: { deleteApp: this.deleteApp } },
            jimu_core_1.jsx("div", { css: app_list_style_1.getStyle(this.props.theme) },
                jimu_core_1.jsx("div", { className: "widget-builder-app-list bg-gray-100 h-100" },
                    jimu_core_1.jsx("div", { style: { overflow: 'hidden' } },
                        jimu_core_1.jsx("div", { style: { overflow: 'hidden' } },
                            jimu_core_1.jsx("div", { className: "app-list-banner d-flex justify-content-between px-4", style: { position: 'relative' } },
                                jimu_core_1.jsx(jimu_ui_1.Button, { color: "light", className: "mt-2 ml-2 mr-2 pl-2 pr-2 btn bg-white border-0", style: { position: 'absolute' }, onClick: function () { _this.searchExperiences(_this.state.searchText); } },
                                    jimu_core_1.jsx(jimu_ui_1.Icon, { width: 24, height: 24, icon: IconSearch, className: "app-list-searchIconFill" })),
                                jimu_core_1.jsx(jimu_ui_1.Input, { className: "float-left pt-2 pb-2 app-list-searchbox app-list-h1", placeholder: "Search", onChange: this.searchTextChange, value: this.state.searchText, onKeyDown: function (e) { _this.handleKeydown(e); } }),
                                jimu_core_1.jsx(jimu_ui_1.Button, { className: "float-left btn-lg", color: "primary ml-2 pt-0 pb-0", onClick: this.newApp },
                                    jimu_core_1.jsx(jimu_ui_1.Icon, { className: "mr-3 app-list-searchboxicon", icon: IconAdd }),
                                    "New experience"))),
                        jimu_core_1.jsx("div", { className: "bg-gray-100 app-list-filterbar" },
                            jimu_core_1.jsx("div", { className: "d-flex justify-content-between align-items-center px-4" },
                                jimu_core_1.jsx("h2", { className: "app-list-h2" }, this.state.filterTitle),
                                jimu_core_1.jsx("div", null,
                                    jimu_core_1.jsx(jimu_ui_1.Button, { color: "light pl-1 pr-1", className: "float-right", onClick: this.switchListView },
                                        jimu_core_1.jsx(jimu_ui_1.Icon, { icon: this.state.isDetailContent ? IconViewList : IconViewCard, className: "app-list-iconfill" })),
                                    jimu_core_1.jsx(app_list_sortappdropdown_1.default, { onChange: this.filterFieldChange, className: "float-right mr-2 ml-2", style: { paddingTop: '2px' } }),
                                    jimu_core_1.jsx(jimu_ui_1.Input, { type: "select", onChange: this.accessChange, value: this.state.accessType, className: "float-right filterbar-input" },
                                        jimu_core_1.jsx("option", { value: AccessType.ME }, "Owned by me"),
                                        jimu_core_1.jsx("option", { value: AccessType.ANYONE }, "Owned by anyone"),
                                        jimu_core_1.jsx("option", { value: AccessType.NOTME }, "Not owned by me"))))),
                        jimu_core_1.jsx("div", { style: { overflow: 'hidden' }, className: "bg-gray-100" },
                            jimu_core_1.jsx("div", { className: "app-list-content px-4" }, appListContent))))));
    };
    Widget.mapExtraStateProps = function (state) {
        return {
            refreshAppList: state.builder.refreshAppList
        };
    };
    return Widget;
}(jimu_core_1.BaseWidget));
exports.default = Widget;
//# sourceMappingURL=widget.js.map