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
var Attribution = /** @class */ (function (_super) {
    __extends(Attribution, _super);
    function Attribution(props) {
        var _this = _super.call(this, props) || this;
        _this.toolName = 'Attribution';
        return _this;
    }
    Attribution.getIsNeedSetting = function () {
        return false;
    };
    Attribution.prototype.getTitle = function () {
        return 'Attribution';
    };
    Attribution.prototype.getIcon = function () {
        return null;
    };
    Attribution.prototype.getExpandPanel = function () {
        return jimu_core_1.React.createElement(AttributionInner, { jimuMapView: this.props.jimuMapView });
    };
    return Attribution;
}(base_tool_1.BaseTool));
exports.default = Attribution;
var AttributionInner = /** @class */ (function (_super) {
    __extends(AttributionInner, _super);
    function AttributionInner(props) {
        var _this = _super.call(this, props) || this;
        _this.Attribution = null;
        _this.state = {
            apiLoaded: false
        };
        return _this;
    }
    AttributionInner.prototype.componentDidMount = function () {
        var _this = this;
        if (!this.state.apiLoaded) {
            jimu_arcgis_1.loadArcGISJSAPIModules(['esri/widgets/Attribution']).then(function (modules) {
                _this.Attribution = modules[0];
                _this.setState({
                    apiLoaded: true
                });
            });
        }
    };
    AttributionInner.prototype.componentDidUpdate = function () {
        if (this.state.apiLoaded && this.container) {
            this.AttributionBtn = new this.Attribution({
                container: this.container,
                view: this.props.jimuMapView.view
            });
        }
    };
    AttributionInner.prototype.componentWillUnmount = function () {
        if (this.AttributionBtn) {
            this.AttributionBtn.destroy();
            this.AttributionBtn = null;
        }
    };
    AttributionInner.prototype.render = function () {
        var _this = this;
        return jimu_core_1.React.createElement("div", { style: { position: 'relative' }, ref: function (ref) { _this.container = ref; } });
    };
    return AttributionInner;
}(jimu_core_1.React.PureComponent));
//# sourceMappingURL=attribution.js.map