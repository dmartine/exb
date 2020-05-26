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
/** @jsx jsx */
var jimu_core_1 = require("jimu-core");
var layout_runtime_1 = require("jimu-layouts/layout-runtime");
var utils_1 = require("../utils");
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout(props) {
        var _this = _super.call(this, props) || this;
        //this item is used to solve the flash issue when swith mulitimap
        _this.cloneLayoutRef = null;
        _this.insertFixedDom = function (container, insertedDom) {
            if (!container || !insertedDom) {
                return;
            }
            var toolLayoutDoms = container.getElementsByClassName('exbmap-ui-layout');
            if (toolLayoutDoms && toolLayoutDoms[0]) {
                container.insertBefore(insertedDom, toolLayoutDoms[0]);
            }
            else {
                container.appendChild(insertedDom);
            }
        };
        _this.isItemAccepted = function (item, isReplacePlaceholder) {
            var _a, _b, _c, _d, _e;
            var itemType = (_a = item) === null || _a === void 0 ? void 0 : _a.itemType;
            var type = (_c = (_b = item) === null || _b === void 0 ? void 0 : _b.manifest) === null || _c === void 0 ? void 0 : _c.widgetType;
            return itemType !== jimu_core_1.LayoutItemType.Section && type !== jimu_core_1.WidgetType.Layout && ((_e = (_d = item) === null || _d === void 0 ? void 0 : _d.manifest) === null || _e === void 0 ? void 0 : _e.name) !== _this.props.widgetManifestName;
        };
        _this.getMapFixedLayout = function () {
            if (window.jimuConfig.isInBuilder) {
                var LayoutEntry = _this.props.LayoutEntry;
                var layout = _this.props.layouts && _this.props.layouts['MapFixedLayout'];
                return jimu_core_1.jsx(LayoutEntry, { layouts: layout ? layout : null, isInWidget: true, className: jimu_core_1.classNames('w-100 h-100', { 'widget-map-usemask': !utils_1.checkIsLive(_this.props.appMode), 'map-is-live-mode': utils_1.checkIsLive(_this.props.appMode) }), isItemAccepted: _this.isItemAccepted });
            }
            else {
                var layout = _this.props.layouts && _this.props.layouts['MapFixedLayout'];
                return jimu_core_1.jsx(layout_runtime_1.LayoutViewer, { layouts: layout ? jimu_core_1.Immutable(layout) : null, className: "w-100 h-100 map-is-live-mode" });
            }
        };
        _this.state = {};
        _this.fixedLayoutRef = document.createElement('div');
        _this.fixedLayoutRef.className = 'w-100 h-100';
        _this.fixedLayoutRef.style.position = 'absolute';
        _this.fixedLayoutRef.style.zIndex = '0';
        return _this;
    }
    Layout.prototype.componentDidMount = function () {
        if ((this.props.jimuMapView && this.props.jimuMapView.view && this.props.jimuMapView.view.ui && this.props.jimuMapView.view.ui.container)) {
            this.insertFixedDom(this.props.jimuMapView.view.ui.container, this.fixedLayoutRef);
        }
    };
    Layout.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;
        if (!prevProps.jimuMapView || !this.props.jimuMapView) {
            return;
        }
        if (prevProps.jimuMapView && prevProps.jimuMapView.view && prevProps.jimuMapView.view.ui) {
            var cloneDoms = prevProps.jimuMapView.view.ui.container.getElementsByClassName('layout-clone');
            if (cloneDoms && cloneDoms.length > 0) {
                for (var i = 0; i < cloneDoms.length; i++) {
                    cloneDoms[i].remove();
                }
            }
        }
        if (prevProps.jimuMapView.id !== this.props.jimuMapView.id) {
            if (prevProps.jimuMapView && prevProps.jimuMapView.view && prevProps.jimuMapView.view.ui) {
                this.cloneLayoutRef = this.fixedLayoutRef.cloneNode(true);
                this.cloneLayoutRef.classList.add('layout-clone');
                this.insertFixedDom(prevProps.jimuMapView.view.ui.container, this.cloneLayoutRef);
                setTimeout(function () {
                    if (_this.cloneLayoutRef && _this.cloneLayoutRef.parentNode) {
                        _this.cloneLayoutRef.parentNode.removeChild(_this.cloneLayoutRef);
                    }
                    _this.cloneLayoutRef = null;
                }, 500);
                prevProps.jimuMapView.view.ui.container.removeChild(this.fixedLayoutRef);
            }
            this.props.jimuMapView && this.props.jimuMapView.view && this.insertFixedDom(this.props.jimuMapView.view.ui.container, this.fixedLayoutRef);
        }
    };
    Layout.prototype.render = function () {
        if (this.props.jimuMapView && this.props.jimuMapView.view && this.props.jimuMapView.view.ui && this.props.jimuMapView.view.ui.container) {
            return jimu_core_1.jsx("div", null, jimu_core_1.ReactDOM.createPortal(this.getMapFixedLayout(), this.fixedLayoutRef));
        }
        else {
            return this.getMapFixedLayout();
        }
    };
    return Layout;
}(jimu_core_1.React.PureComponent));
exports.default = Layout;
//# sourceMappingURL=map-fixed-layout.js.map