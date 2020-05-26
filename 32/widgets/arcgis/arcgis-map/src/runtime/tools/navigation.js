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
var Navigation = /** @class */ (function (_super) {
    __extends(Navigation, _super);
    function Navigation(props) {
        var _this = _super.call(this, props) || this;
        _this.toolName = 'Navigation';
        return _this;
    }
    Navigation.prototype.getTitle = function () {
        return 'Navigation';
    };
    Navigation.prototype.getIcon = function () {
        return null;
    };
    Navigation.prototype.getExpandPanel = function () {
        return jimu_core_1.React.createElement(NavigationInner, { jimuMapView: this.props.jimuMapView });
    };
    return Navigation;
}(base_tool_1.BaseTool));
exports.default = Navigation;
var NavigationInner = /** @class */ (function (_super) {
    __extends(NavigationInner, _super);
    function NavigationInner(props) {
        var _this = _super.call(this, props) || this;
        _this.Navigation = null;
        _this.state = {
            apiLoaded: false
        };
        return _this;
    }
    NavigationInner.prototype.componentDidMount = function () {
        var _this = this;
        if (!this.state.apiLoaded) {
            jimu_arcgis_1.loadArcGISJSAPIModules(['esri/widgets/NavigationToggle']).then(function (modules) {
                _this.Navigation = modules[0];
                _this.setState({
                    apiLoaded: true
                });
            });
        }
    };
    NavigationInner.prototype.componentDidUpdate = function () {
        if (this.state.apiLoaded && this.container) {
            this.NavigationBtn = new this.Navigation({
                container: this.container,
                view: this.props.jimuMapView.view
            });
        }
    };
    NavigationInner.prototype.componentWillUnmount = function () {
        if (this.NavigationBtn) {
            this.NavigationBtn.destroy();
            this.NavigationBtn = null;
        }
    };
    NavigationInner.prototype.render = function () {
        var _this = this;
        return jimu_core_1.React.createElement("div", { ref: function (ref) { _this.container = ref; } });
    };
    return NavigationInner;
}(jimu_core_1.React.PureComponent));
//# sourceMappingURL=navigation.js.map