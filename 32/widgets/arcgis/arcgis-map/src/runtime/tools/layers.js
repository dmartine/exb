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
var base_tool_1 = require("../layout/base/base-tool");
var jimu_arcgis_1 = require("jimu-arcgis");
var jimu_ui_1 = require("jimu-ui");
var jimu_ui_2 = require("jimu-ui");
var Layers = /** @class */ (function (_super) {
    __extends(Layers, _super);
    function Layers(props) {
        var _this = _super.call(this, props) || this;
        _this.toolName = 'Layers';
        _this.handleTabIndexChange = function (activeTabIndex) {
            _this.setState({
                activeTabIndex: activeTabIndex
            });
        };
        _this.state = {
            activeTabIndex: 0
        };
        return _this;
    }
    Layers.prototype.getTitle = function () {
        return this.props.intl.formatMessage({ id: 'LayersLabel', defaultMessage: jimu_ui_1.defaultMessages['LayersLabel'] });
    };
    Layers.prototype.getIcon = function () {
        return {
            icon: require('../assets/icons/layerlist.svg')
        };
    };
    Layers.prototype.getExpandPanel = function () {
        var _this = this;
        return jimu_core_1.React.createElement("div", { style: { width: this.props.isMobile ? '100%' : '250px', minHeight: '32px', position: 'relative' }, className: jimu_core_1.classNames({ 'exbmap-ui-pc-expand-maxheight': !this.props.isMobile }) },
            jimu_core_1.React.createElement(jimu_ui_2.Nav, { tabs: true },
                jimu_core_1.React.createElement(jimu_ui_2.NavItem, null,
                    jimu_core_1.React.createElement(jimu_ui_2.NavLink, { active: this.state.activeTabIndex === 0, onClick: function () { _this.handleTabIndexChange(0); } }, this.props.intl.formatMessage({ id: 'LayersLabelLayer', defaultMessage: jimu_ui_1.defaultMessages['LayersLabelLayer'] }))),
                jimu_core_1.React.createElement(jimu_ui_2.NavItem, null,
                    jimu_core_1.React.createElement(jimu_ui_2.NavLink, { active: this.state.activeTabIndex === 1, onClick: function () { _this.handleTabIndexChange(1); } }, this.props.intl.formatMessage({ id: 'LayersLabelLegend', defaultMessage: jimu_ui_1.defaultMessages['LayersLabelLegend'] })))),
            jimu_core_1.React.createElement("div", { className: "mt-1" }),
            this.state.activeTabIndex === 0 && jimu_core_1.React.createElement(LayerListInner, { jimuMapView: this.props.jimuMapView }),
            this.state.activeTabIndex === 1 && jimu_core_1.React.createElement(LegendInner, { jimuMapView: this.props.jimuMapView }));
    };
    return Layers;
}(base_tool_1.BaseTool));
exports.default = Layers;
var LayerListInner = /** @class */ (function (_super) {
    __extends(LayerListInner, _super);
    function LayerListInner(props) {
        var _this = _super.call(this, props) || this;
        _this.LayerList = null;
        _this.state = {
            apiLoaded: false
        };
        return _this;
    }
    LayerListInner.prototype.componentDidMount = function () {
        var _this = this;
        if (!this.state.apiLoaded) {
            jimu_arcgis_1.loadArcGISJSAPIModules(['esri/widgets/LayerList']).then(function (modules) {
                _this.LayerList = modules[0];
                _this.setState({
                    apiLoaded: true
                });
            });
        }
    };
    LayerListInner.prototype.componentDidUpdate = function () {
        if (this.state.apiLoaded && this.container) {
            this.LayerListBtn = new this.LayerList({
                container: this.container,
                view: this.props.jimuMapView.view
            });
        }
    };
    LayerListInner.prototype.componentWillUnmount = function () {
        if (this.LayerListBtn) {
            this.LayerListBtn = null;
        }
    };
    LayerListInner.prototype.render = function () {
        var _this = this;
        return jimu_core_1.React.createElement("div", { ref: function (ref) { _this.container = ref; }, style: { width: '100%', minHeight: '32px', position: 'relative' } }, !this.state.apiLoaded && jimu_core_1.React.createElement("div", { className: "exbmap-basetool-loader" }));
    };
    return LayerListInner;
}(jimu_core_1.React.PureComponent));
var LegendInner = /** @class */ (function (_super) {
    __extends(LegendInner, _super);
    function LegendInner(props) {
        var _this = _super.call(this, props) || this;
        _this.Legend = null;
        _this.state = {
            apiLoaded: false
        };
        return _this;
    }
    LegendInner.prototype.componentDidMount = function () {
        var _this = this;
        if (!this.state.apiLoaded) {
            jimu_arcgis_1.loadArcGISJSAPIModules(['esri/widgets/Legend']).then(function (modules) {
                _this.Legend = modules[0];
                _this.setState({
                    apiLoaded: true
                });
            });
        }
    };
    LegendInner.prototype.componentDidUpdate = function () {
        if (this.state.apiLoaded && this.container) {
            this.LegendBtn = new this.Legend({
                container: this.container,
                view: this.props.jimuMapView.view
            });
        }
    };
    LegendInner.prototype.componentWillUnmount = function () {
        if (this.LegendBtn) {
            this.LegendBtn = null;
        }
    };
    LegendInner.prototype.render = function () {
        var _this = this;
        return jimu_core_1.React.createElement("div", { ref: function (ref) { _this.container = ref; }, style: { width: '100%', minHeight: '32px', position: 'relative' } }, !this.state.apiLoaded && jimu_core_1.React.createElement("div", { className: "exbmap-basetool-loader" }));
    };
    return LegendInner;
}(jimu_core_1.React.PureComponent));
//# sourceMappingURL=layers.js.map