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
var Locate = /** @class */ (function (_super) {
    __extends(Locate, _super);
    function Locate(props) {
        var _this = _super.call(this, props) || this;
        _this.toolName = 'Locate';
        return _this;
    }
    Locate.prototype.getTitle = function () {
        return 'Locate';
    };
    Locate.prototype.getIcon = function () {
        return null;
    };
    Locate.prototype.getExpandPanel = function () {
        return jimu_core_1.React.createElement(LocateInner, { jimuMapView: this.props.jimuMapView });
    };
    return Locate;
}(base_tool_1.BaseTool));
exports.default = Locate;
var LocateInner = /** @class */ (function (_super) {
    __extends(LocateInner, _super);
    function LocateInner(props) {
        var _this = _super.call(this, props) || this;
        _this.Locate = null;
        _this.state = {
            apiLoaded: false
        };
        return _this;
    }
    LocateInner.prototype.componentDidMount = function () {
        var _this = this;
        if (!this.state.apiLoaded) {
            jimu_arcgis_1.loadArcGISJSAPIModules(['esri/widgets/Locate']).then(function (modules) {
                _this.Locate = modules[0];
                _this.setState({
                    apiLoaded: true
                });
            });
        }
    };
    LocateInner.prototype.componentDidUpdate = function () {
        if (this.state.apiLoaded && this.container) {
            this.LocateBtn = new this.Locate({
                container: this.container,
                view: this.props.jimuMapView.view
            });
        }
    };
    LocateInner.prototype.componentWillUnmount = function () {
        if (this.LocateBtn) {
            this.LocateBtn.destroy();
            this.LocateBtn = null;
        }
    };
    LocateInner.prototype.render = function () {
        var _this = this;
        return jimu_core_1.React.createElement("div", { className: "esri-widget--button", ref: function (ref) { _this.container = ref; } });
    };
    return LocateInner;
}(jimu_core_1.React.PureComponent));
//# sourceMappingURL=locate.js.map