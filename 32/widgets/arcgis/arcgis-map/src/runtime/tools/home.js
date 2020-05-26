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
var multisourcemap_context_1 = require("../components/multisourcemap-context");
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = _super.call(this, props) || this;
        _this.toolName = 'Home';
        _this.getHomeContent = function (initialMapState) {
            return jimu_core_1.React.createElement(HomeInner, { jimuMapView: _this.props.jimuMapView, initialMapState: initialMapState });
        };
        return _this;
    }
    Home.prototype.getTitle = function () {
        return this.props.intl.formatMessage({ id: 'HomeLabel', defaultMessage: jimu_ui_1.defaultMessages['HomeLabel'] });
    };
    Home.prototype.getIcon = function () {
        return null;
    };
    Home.prototype.getExpandPanel = function () {
        var _this = this;
        //return <HomeInner jimuMapView={this.props.jimuMapView}></HomeInner>;
        return jimu_core_1.React.createElement(multisourcemap_context_1.MultiSourceMapContext.Consumer, null, function (_a) {
            var initialMapState = _a.initialMapState;
            return (_this.getHomeContent(initialMapState));
        });
    };
    return Home;
}(base_tool_1.BaseTool));
exports.default = Home;
var HomeInner = /** @class */ (function (_super) {
    __extends(HomeInner, _super);
    function HomeInner(props) {
        var _this = _super.call(this, props) || this;
        _this.Home = null;
        _this.generateViewPointFromInitialMapState = function (initialMapState) {
            if (initialMapState.viewType === '2d') {
                return new _this.Viewpoint({
                    targetGeometry: _this.Extent.fromJSON(initialMapState.extent),
                    rotation: initialMapState.rotation
                });
            }
            else {
                return _this.Viewpoint.fromJSON(initialMapState.viewPoint);
            }
        };
        _this.state = {
            apiLoaded: false
        };
        return _this;
    }
    HomeInner.prototype.componentDidMount = function () {
        var _this = this;
        if (!this.state.apiLoaded) {
            jimu_arcgis_1.loadArcGISJSAPIModules(['esri/widgets/Home',
                'esri/geometry/Extent',
                'esri/Viewpoint']).then(function (modules) {
                _this.Home = modules[0], _this.Extent = modules[1], _this.Viewpoint = modules[2];
                _this.setState({
                    apiLoaded: true
                });
            });
        }
    };
    HomeInner.prototype.componentDidUpdate = function (prevProps) {
        if (this.state.apiLoaded && this.container) {
            if (this.homeBtn) {
                this.container.innerHTML = '';
            }
            this.homeBtn = new this.Home({
                container: this.container,
                view: this.props.jimuMapView.view,
                viewpoint: this.props.initialMapState ? this.generateViewPointFromInitialMapState(this.props.initialMapState)
                    : this.props.jimuMapView.view.map.initialViewProperties.viewpoint
            });
            if (prevProps.initialMapState !== this.props.initialMapState) {
                this.props.jimuMapView.view.goTo(this.homeBtn.viewpoint, {
                    animate: false
                });
            }
        }
    };
    HomeInner.prototype.componentWillUnmount = function () {
        if (this.homeBtn) {
            this.homeBtn.destroy();
            this.homeBtn = null;
        }
    };
    HomeInner.prototype.render = function () {
        var _this = this;
        return jimu_core_1.React.createElement("div", { className: "esri-widget--button", ref: function (ref) { if (!_this.container) {
                _this.container = ref;
            } } });
    };
    return HomeInner;
}(jimu_core_1.React.PureComponent));
//# sourceMappingURL=home.js.map