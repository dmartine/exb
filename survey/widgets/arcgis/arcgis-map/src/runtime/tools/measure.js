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
var jimu_ui_1 = require("jimu-ui");
var base_tool_1 = require("../layout/base/base-tool");
var jimu_arcgis_1 = require("jimu-arcgis");
var jimu_ui_2 = require("jimu-ui");
var Measure = /** @class */ (function (_super) {
    __extends(Measure, _super);
    function Measure(props) {
        var _this = _super.call(this, props) || this;
        _this.toolName = 'Measure';
        _this.measureModules2D = [{
                name: 'Line',
                title: 'Line',
                path: 'DistanceMeasurement2D',
                src: require('../assets/icons/measure-distance.svg')
            }, {
                name: 'Polygon',
                title: 'Polygon',
                path: 'AreaMeasurement2D',
                src: require('../assets/icons/measure-area.svg')
            }];
        _this.measureModules3D = [{
                name: 'Line',
                title: 'Line',
                path: 'DirectLineMeasurement3D',
                src: require('../assets/icons/measure-distance.svg')
            }, {
                name: 'Polygon',
                title: 'Polygon',
                path: 'AreaMeasurement3D',
                src: require('../assets/icons/measure-area.svg')
            }];
        _this.handleMeasurceInstanceCreated = function (measurceInstance, activeTabIndex) {
            var measureInstances = _this.state.measureInstances;
            measureInstances[activeTabIndex] = measurceInstance;
            _this.setState({
                measureInstances: measureInstances
            });
        };
        _this.onTabClick = function (index) {
            if (_this.state.activeTabIndex === index) {
                return;
            }
            else {
                _this.setState({ activeTabIndex: index });
                for (var i = 0; i < _this.state.measureInstances.length; i++) {
                    if (i !== index && _this.state.measureInstances[i]) {
                        _this.state.measureInstances[i].visible = false;
                    }
                    if (i === index && _this.state.measureInstances[i]) {
                        _this.state.measureInstances[i].visible = true;
                    }
                }
            }
        };
        _this.onClosePanel = function () {
            for (var i = 0; i < _this.state.measureInstances.length; i++) {
                if (_this.state.measureInstances[i]) {
                    _this.state.measureInstances[i].visible = false;
                }
            }
        };
        _this.onShowPanel = function () {
            for (var i = 0; i < _this.state.measureInstances.length; i++) {
                if (i !== _this.state.activeTabIndex && _this.state.measureInstances[i]) {
                    _this.state.measureInstances[i].visible = false;
                }
                if (i === _this.state.activeTabIndex && _this.state.measureInstances[i]) {
                    _this.state.measureInstances[i].visible = true;
                }
            }
        };
        _this.state = {
            activeTabIndex: 0,
            measureInstances: [null, null]
        };
        return _this;
    }
    Measure.prototype.getTitle = function () {
        return this.props.intl.formatMessage({ id: 'MeasureLabel', defaultMessage: jimu_ui_2.defaultMessages['MeasureLabel'] });
    };
    Measure.prototype.getIcon = function () {
        return {
            icon: require('../assets/icons/measure.svg')
        };
    };
    Measure.prototype.destroy = function () {
        for (var i = 0; i < this.state.measureInstances.length; i++) {
            if (this.state.measureInstances[i] && !this.state.measureInstances[i].destroyed) {
                this.state.measureInstances[i].destroy();
            }
        }
    };
    Measure.prototype.getExpandPanel = function () {
        var _this = this;
        if (this.props.jimuMapView.view.type === '2d') {
            return jimu_core_1.React.createElement("div", { style: { width: this.props.isMobile ? '100%' : '250px', position: 'relative' }, className: jimu_core_1.classNames({ 'exbmap-ui-pc-expand-maxheight': !this.props.isMobile }) },
                jimu_core_1.React.createElement(jimu_ui_2.Nav, { tabs: true }, this.measureModules2D.map(function (module, index) {
                    return jimu_core_1.React.createElement(jimu_ui_2.NavItem, { key: index },
                        jimu_core_1.React.createElement(jimu_ui_2.NavLink, { active: _this.state.activeTabIndex === index, onClick: function () { _this.onTabClick(index); } },
                            jimu_core_1.React.createElement(jimu_ui_1.Icon, { width: 16, height: 16, className: "", icon: module.src })));
                })),
                jimu_core_1.React.createElement(MeasureInner, { activeTabIndex: this.state.activeTabIndex, jimuMapView: this.props.jimuMapView, measureModule: this.measureModules2D[this.state.activeTabIndex], measureInstance: this.state.measureInstances[this.state.activeTabIndex], onMeasurceInstanceCreated: this.handleMeasurceInstanceCreated }));
        }
        else if (this.props.jimuMapView.view.type === '3d') {
            return jimu_core_1.React.createElement("div", { style: { width: this.props.isMobile ? '100%' : '250px', position: 'relative' }, className: jimu_core_1.classNames({ 'exbmap-ui-pc-expand-maxheight': !this.props.isMobile }) },
                jimu_core_1.React.createElement(jimu_ui_2.Nav, { tabs: true }, this.measureModules3D.map(function (module, index) {
                    return jimu_core_1.React.createElement(jimu_ui_2.NavItem, { key: index },
                        jimu_core_1.React.createElement(jimu_ui_2.NavLink, { active: _this.state.activeTabIndex === index, onClick: function () { _this.onTabClick(index); } },
                            jimu_core_1.React.createElement(jimu_ui_1.Icon, { width: 16, height: 16, className: "", icon: module.src })));
                })),
                jimu_core_1.React.createElement(MeasureInner, { activeTabIndex: this.state.activeTabIndex, jimuMapView: this.props.jimuMapView, measureModule: this.measureModules3D[this.state.activeTabIndex], measureInstance: this.state.measureInstances[this.state.activeTabIndex], onMeasurceInstanceCreated: this.handleMeasurceInstanceCreated }));
        }
        else {
            return null;
        }
    };
    return Measure;
}(base_tool_1.BaseTool));
exports.default = Measure;
var MeasureInner = /** @class */ (function (_super) {
    __extends(MeasureInner, _super);
    function MeasureInner(props) {
        var _this = _super.call(this, props) || this;
        _this.MeasureInstance = null;
        _this.state = {
            apiLoaded: false
        };
        return _this;
    }
    MeasureInner.prototype.componentDidMount = function () {
        var _this = this;
        if (!this.state.apiLoaded) {
            jimu_arcgis_1.loadArcGISJSAPIModules(['esri/widgets/' + this.props.measureModule.path]).then(function (modules) {
                _this.MeasureClass = modules[0];
                _this.setState({
                    apiLoaded: true
                });
            });
        }
    };
    MeasureInner.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.activeTabIndex !== this.props.activeTabIndex || prevProps.measureModule !== this.props.measureModule) {
            this.reload();
            return;
        }
        if (this.state.apiLoaded && this.parentContainer && this.container) {
            if (!this.props.measureInstance) {
                var tempInstance = new this.MeasureClass({
                    container: this.container,
                    view: this.props.jimuMapView.view
                });
                tempInstance.viewModel.newMeasurement();
                this.props.onMeasurceInstanceCreated(tempInstance, this.props.activeTabIndex);
            }
            else {
                this.parentContainer.innerHTML = '';
                this.parentContainer.appendChild(this.props.measureInstance.container);
                if (this.props.measureInstance.viewModel.state !== 'measured' && this.props.measureInstance.viewModel.state !== 'measuring') {
                    this.props.measureInstance.viewModel.newMeasurement();
                }
            }
        }
    };
    MeasureInner.prototype.reload = function () {
        var _this = this;
        this.setState({
            apiLoaded: false
        }, function () {
            jimu_arcgis_1.loadArcGISJSAPIModules(['esri/widgets/' + _this.props.measureModule.path]).then(function (modules) {
                _this.MeasureClass = modules[0];
                _this.setState({
                    apiLoaded: true
                });
            });
        });
    };
    MeasureInner.prototype.render = function () {
        var _this = this;
        return jimu_core_1.React.createElement("div", { className: "w-100", style: { width: '250px', position: 'relative', minHeight: '32px' }, ref: function (ref) { _this.parentContainer = ref; } },
            jimu_core_1.React.createElement("div", { ref: function (ref) { _this.container = ref; } }, !this.state.apiLoaded && jimu_core_1.React.createElement("div", { className: "exbmap-basetool-loader" })));
    };
    return MeasureInner;
}(jimu_core_1.React.PureComponent));
//# sourceMappingURL=measure.js.map