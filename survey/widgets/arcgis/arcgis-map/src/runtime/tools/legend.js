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
var Legend = /** @class */ (function (_super) {
    __extends(Legend, _super);
    function Legend(props) {
        var _this = _super.call(this, props) || this;
        _this.toolName = 'Legend';
        return _this;
    }
    Legend.prototype.getTitle = function () {
        return this.props.intl.formatMessage({ id: 'LegendLabel', defaultMessage: jimu_ui_1.defaultMessages['LegendLabel'] });
    };
    Legend.prototype.getIcon = function () {
        return {
            icon: require('../assets/icons/legend.svg')
        };
    };
    Legend.prototype.getExpandPanel = function () {
        return jimu_core_1.React.createElement(LegendInner, { jimuMapView: this.props.jimuMapView });
    };
    return Legend;
}(base_tool_1.BaseTool));
exports.default = Legend;
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
            this.LegendBtn.destroy();
            this.LegendBtn = null;
        }
    };
    LegendInner.prototype.render = function () {
        var _this = this;
        return jimu_core_1.React.createElement("div", { ref: function (ref) { _this.container = ref; }, style: { width: '250px', minHeight: '32px', position: 'relative' } }, !this.state.apiLoaded && jimu_core_1.React.createElement("div", { className: "exbmap-basetool-loader" }));
    };
    return LegendInner;
}(jimu_core_1.React.PureComponent));
//# sourceMappingURL=legend.js.map