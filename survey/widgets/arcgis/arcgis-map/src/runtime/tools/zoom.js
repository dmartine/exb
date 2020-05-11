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
var Zoom = /** @class */ (function (_super) {
    __extends(Zoom, _super);
    function Zoom(props) {
        var _this = _super.call(this, props) || this;
        _this.toolName = 'Zoom';
        return _this;
    }
    Zoom.prototype.getTitle = function () {
        return this.props.intl.formatMessage({ id: 'ZoomLabel', defaultMessage: jimu_ui_1.defaultMessages['ZoomLabel'] });
    };
    Zoom.prototype.getIcon = function () {
        return null;
    };
    Zoom.prototype.getExpandPanel = function () {
        return jimu_core_1.React.createElement(ZoomInner, { jimuMapView: this.props.jimuMapView });
    };
    return Zoom;
}(base_tool_1.BaseTool));
exports.default = Zoom;
var ZoomInner = /** @class */ (function (_super) {
    __extends(ZoomInner, _super);
    function ZoomInner(props) {
        var _this = _super.call(this, props) || this;
        _this.Zoom = null;
        _this.state = {
            apiLoaded: false
        };
        return _this;
    }
    ZoomInner.prototype.componentDidMount = function () {
        var _this = this;
        if (!this.state.apiLoaded) {
            jimu_arcgis_1.loadArcGISJSAPIModules(['esri/widgets/Zoom']).then(function (modules) {
                _this.Zoom = modules[0];
                _this.setState({
                    apiLoaded: true
                });
            });
        }
    };
    ZoomInner.prototype.componentDidUpdate = function () {
        if (this.state.apiLoaded && this.container) {
            this.ZoomBtn = new this.Zoom({
                container: this.container,
                view: this.props.jimuMapView.view
            });
        }
    };
    ZoomInner.prototype.componentWillUnmount = function () {
        if (this.ZoomBtn) {
            this.ZoomBtn.destroy();
            this.ZoomBtn = null;
        }
    };
    ZoomInner.prototype.render = function () {
        var _this = this;
        return jimu_core_1.React.createElement("div", { ref: function (ref) { _this.container = ref; } });
    };
    return ZoomInner;
}(jimu_core_1.React.PureComponent));
//# sourceMappingURL=zoom.js.map