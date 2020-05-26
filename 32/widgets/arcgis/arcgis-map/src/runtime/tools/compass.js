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
var Compass = /** @class */ (function (_super) {
    __extends(Compass, _super);
    function Compass(props) {
        var _this = _super.call(this, props) || this;
        _this.toolName = 'Compass';
        return _this;
    }
    Compass.prototype.getTitle = function () {
        return this.props.intl.formatMessage({ id: 'CompassLabel', defaultMessage: jimu_ui_1.defaultMessages['CompassLabel'] });
    };
    Compass.prototype.getIcon = function () {
        return null;
    };
    Compass.prototype.getExpandPanel = function () {
        return jimu_core_1.React.createElement(CompassInner, { jimuMapView: this.props.jimuMapView });
    };
    return Compass;
}(base_tool_1.BaseTool));
exports.default = Compass;
var CompassInner = /** @class */ (function (_super) {
    __extends(CompassInner, _super);
    function CompassInner(props) {
        var _this = _super.call(this, props) || this;
        _this.Compass = null;
        _this.state = {
            apiLoaded: false
        };
        return _this;
    }
    CompassInner.prototype.componentDidMount = function () {
        var _this = this;
        if (!this.state.apiLoaded) {
            jimu_arcgis_1.loadArcGISJSAPIModules(['esri/widgets/Compass']).then(function (modules) {
                _this.Compass = modules[0];
                _this.setState({
                    apiLoaded: true
                });
            });
        }
    };
    CompassInner.prototype.componentDidUpdate = function () {
        if (this.state.apiLoaded && this.container) {
            this.CompassBtn = new this.Compass({
                container: this.container,
                view: this.props.jimuMapView.view
            });
        }
    };
    CompassInner.prototype.componentWillUnmount = function () {
        if (this.CompassBtn) {
            this.CompassBtn.destroy();
            this.CompassBtn = null;
        }
    };
    CompassInner.prototype.render = function () {
        var _this = this;
        return jimu_core_1.React.createElement("div", { ref: function (ref) { _this.container = ref; } });
    };
    return CompassInner;
}(jimu_core_1.React.PureComponent));
//# sourceMappingURL=compass.js.map