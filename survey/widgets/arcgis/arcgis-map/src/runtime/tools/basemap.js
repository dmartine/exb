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
var BaseMap = /** @class */ (function (_super) {
    __extends(BaseMap, _super);
    function BaseMap(props) {
        var _this = _super.call(this, props) || this;
        _this.toolName = 'BaseMap';
        return _this;
    }
    BaseMap.prototype.getTitle = function () {
        return this.props.intl.formatMessage({ id: 'BaseMapLabel', defaultMessage: jimu_ui_1.defaultMessages['BaseMapLabel'] });
    };
    BaseMap.prototype.getIcon = function () {
        return {
            icon: require('../assets/icons/basemap.svg')
        };
    };
    BaseMap.prototype.getExpandPanel = function () {
        return jimu_core_1.React.createElement(BaseMapInner, { jimuMapView: this.props.jimuMapView, isMobile: this.props.isMobile });
    };
    return BaseMap;
}(base_tool_1.BaseTool));
exports.default = BaseMap;
var BaseMapInner = /** @class */ (function (_super) {
    __extends(BaseMapInner, _super);
    function BaseMapInner(props) {
        var _this = _super.call(this, props) || this;
        _this.BaseMap = null;
        _this.state = {
            apiLoaded: false
        };
        return _this;
    }
    BaseMapInner.prototype.componentDidMount = function () {
        var _this = this;
        if (!this.state.apiLoaded) {
            jimu_arcgis_1.loadArcGISJSAPIModules(['esri/widgets/BasemapGallery']).then(function (modules) {
                _this.BaseMap = modules[0];
                _this.setState({
                    apiLoaded: true
                });
            });
        }
    };
    BaseMapInner.prototype.componentDidUpdate = function () {
        if (this.state.apiLoaded && this.container) {
            this.BaseMapBtn = new this.BaseMap({
                container: this.container,
                view: this.props.jimuMapView.view
            });
        }
    };
    BaseMapInner.prototype.componentWillUnmount = function () {
        if (this.BaseMapBtn) {
            this.BaseMapBtn.destroy();
            this.BaseMapBtn = null;
        }
    };
    BaseMapInner.prototype.render = function () {
        var _this = this;
        if (this.props.isMobile) {
            return jimu_core_1.React.createElement("div", { ref: function (ref) { _this.container = ref; }, style: { width: '100%', minHeight: '32px', maxWidth: 'none', maxHeight: 'none', overflowY: 'auto', position: 'relative' } }, !this.state.apiLoaded && jimu_core_1.React.createElement("div", { className: "exbmap-basetool-loader" }));
        }
        else {
            return jimu_core_1.React.createElement("div", { ref: function (ref) { _this.container = ref; }, style: { width: '250px', minHeight: '32px', position: 'relative' }, className: "exbmap-ui-pc-expand-maxheight" }, !this.state.apiLoaded && jimu_core_1.React.createElement("div", { className: "exbmap-basetool-loader" }));
        }
    };
    return BaseMapInner;
}(jimu_core_1.React.PureComponent));
//# sourceMappingURL=basemap.js.map