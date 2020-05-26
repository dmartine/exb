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
var ScaleBar = /** @class */ (function (_super) {
    __extends(ScaleBar, _super);
    function ScaleBar(props) {
        var _this = _super.call(this, props) || this;
        _this.toolName = 'ScaleBar';
        return _this;
    }
    ScaleBar.prototype.getTitle = function () {
        return 'ScaleBar';
    };
    ScaleBar.prototype.getIcon = function () {
        return null;
    };
    ScaleBar.prototype.getExpandPanel = function () {
        return jimu_core_1.React.createElement(ScaleBarInner, { jimuMapView: this.props.jimuMapView });
    };
    return ScaleBar;
}(base_tool_1.BaseTool));
exports.default = ScaleBar;
var ScaleBarInner = /** @class */ (function (_super) {
    __extends(ScaleBarInner, _super);
    function ScaleBarInner(props) {
        var _this = _super.call(this, props) || this;
        _this.ScaleBar = null;
        _this.state = {
            apiLoaded: false
        };
        return _this;
    }
    ScaleBarInner.prototype.componentDidMount = function () {
        var _this = this;
        if (!this.state.apiLoaded) {
            jimu_arcgis_1.loadArcGISJSAPIModules(['esri/widgets/ScaleBar']).then(function (modules) {
                _this.ScaleBar = modules[0];
                _this.setState({
                    apiLoaded: true
                });
            });
        }
    };
    ScaleBarInner.prototype.componentDidUpdate = function () {
        if (this.state.apiLoaded && this.container) {
            this.ScaleBarBtn = new this.ScaleBar({
                container: this.container,
                view: this.props.jimuMapView.view,
                unit: 'metric'
            });
        }
    };
    ScaleBarInner.prototype.componentWillUnmount = function () {
        if (this.ScaleBarBtn) {
            this.ScaleBarBtn.destroy();
            this.ScaleBarBtn = null;
        }
    };
    ScaleBarInner.prototype.render = function () {
        var _this = this;
        return jimu_core_1.React.createElement("div", { ref: function (ref) { _this.container = ref; } });
    };
    return ScaleBarInner;
}(jimu_core_1.React.PureComponent));
//# sourceMappingURL=scalebar.js.map