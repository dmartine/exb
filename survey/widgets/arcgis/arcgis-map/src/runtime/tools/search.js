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
var base_tool_1 = require("../layout/base/base-tool");
var jimu_arcgis_1 = require("jimu-arcgis");
var jimu_ui_1 = require("jimu-ui");
var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search(props) {
        var _this = _super.call(this, props) || this;
        _this.toolName = 'Search';
        return _this;
    }
    Search.prototype.getTitle = function () {
        return this.props.intl.formatMessage({ id: 'SearchLabel', defaultMessage: jimu_ui_1.defaultMessages['SearchLabel'] });
    };
    Search.prototype.getIcon = function () {
        return {
            icon: require('../assets/icons/search.svg')
        };
    };
    Search.prototype.getExpandPanel = function () {
        if (this.props.isMobile) {
            return jimu_core_1.jsx("div", { style: { minHeight: '32px', position: 'relative', width: '100%' } },
                jimu_core_1.jsx(SearchInner, { jimuMapView: this.props.jimuMapView }));
        }
        else {
            return jimu_core_1.jsx("div", { style: { minWidth: '250px', minHeight: '32px', position: 'relative' } },
                jimu_core_1.jsx(SearchInner, { jimuMapView: this.props.jimuMapView }));
        }
    };
    return Search;
}(base_tool_1.BaseTool));
exports.default = Search;
var SearchInner = /** @class */ (function (_super) {
    __extends(SearchInner, _super);
    function SearchInner(props) {
        var _this = _super.call(this, props) || this;
        _this.Search = null;
        _this.state = {
            apiLoaded: false
        };
        return _this;
    }
    SearchInner.prototype.getStyle = function () {
        return jimu_core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      border: solid 1px rgba(110,110,110,0.3);\n    "], ["\n      border: solid 1px rgba(110,110,110,0.3);\n    "])));
    };
    SearchInner.prototype.componentDidMount = function () {
        var _this = this;
        if (!this.state.apiLoaded) {
            jimu_arcgis_1.loadArcGISJSAPIModules(['esri/widgets/Search']).then(function (modules) {
                _this.Search = modules[0];
                _this.setState({
                    apiLoaded: true
                });
            });
        }
    };
    SearchInner.prototype.componentDidUpdate = function () {
        if (this.state.apiLoaded && this.container) {
            this.SearchBtn = new this.Search({
                container: this.container,
                view: this.props.jimuMapView.view
            });
        }
    };
    SearchInner.prototype.componentWillUnmount = function () {
        if (this.SearchBtn) {
            this.SearchBtn.destroy();
            this.SearchBtn = null;
        }
    };
    SearchInner.prototype.render = function () {
        var _this = this;
        return jimu_core_1.jsx("div", { css: this.getStyle(), className: "w-100", ref: function (ref) { _this.container = ref; } }, !this.state.apiLoaded && jimu_core_1.jsx("div", { className: "exbmap-basetool-loader" }));
    };
    return SearchInner;
}(jimu_core_1.React.PureComponent));
var templateObject_1;
//# sourceMappingURL=search.js.map