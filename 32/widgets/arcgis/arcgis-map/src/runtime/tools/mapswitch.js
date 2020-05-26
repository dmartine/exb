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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var jimu_core_1 = require("jimu-core");
var jimu_ui_1 = require("jimu-ui");
var base_tool_1 = require("../layout/base/base-tool");
var multisourcemap_context_1 = require("../components/multisourcemap-context");
var map_thumb_1 = require("../components/map-thumb");
var MapSwitch = /** @class */ (function (_super) {
    __extends(MapSwitch, _super);
    function MapSwitch(props) {
        var _this = _super.call(this, props) || this;
        _this.toolName = 'MapSwitch';
        _this.switchMap = function () { };
        _this.getContent = function (isShowMapSwitchBtn, dataSourceIds, activeDataSourceId, switchMap) {
            if (isShowMapSwitchBtn) {
                if (_this.props.isMobile) {
                    return jimu_core_1.jsx("div", { className: "exbmap-ui-tool border-0 esri-widget--button", onClick: switchMap, style: { marginTop: '10px' } },
                        jimu_core_1.jsx(jimu_ui_1.Icon, { width: 16, height: 16, className: "exbmap-ui-tool-icon", icon: _this.getIcon().icon }));
                }
                else {
                    var dsJsons = jimu_core_1.getAppStore().getState().appConfig.dataSources;
                    return jimu_core_1.jsx("div", { css: _this.getStyle(), onClick: switchMap },
                        jimu_core_1.jsx("div", { title: dsJsons[dataSourceIds[0]] ? dsJsons[dataSourceIds[0]].label : null, className: jimu_core_1.classNames('mapthumb-item', { front: dataSourceIds[0] !== activeDataSourceId }, { back: dataSourceIds[0] === activeDataSourceId }) },
                            jimu_core_1.jsx(map_thumb_1.default, { mapItemId: dsJsons[dataSourceIds[0]] ? dsJsons[dataSourceIds[0]].itemId : null, portUrl: dsJsons[dataSourceIds[0]] ? dsJsons[dataSourceIds[0]].portalUrl : null })),
                        jimu_core_1.jsx("div", { title: dsJsons[dataSourceIds[1]] ? dsJsons[dataSourceIds[1]].label : null, className: jimu_core_1.classNames('mapthumb-item', { front: dataSourceIds[1] !== activeDataSourceId }, { back: dataSourceIds[1] === activeDataSourceId }) },
                            jimu_core_1.jsx(map_thumb_1.default, { mapItemId: dsJsons[dataSourceIds[1]] ? dsJsons[dataSourceIds[1]].itemId : null, portUrl: dsJsons[dataSourceIds[1]] ? dsJsons[dataSourceIds[1]].portalUrl : null })));
                }
            }
            else {
                return null;
            }
        };
        _this.getIconContent = function (isShowMapSwitchBtn, dataSourceIds, activeDataSourceId, switchMap) {
            if (isShowMapSwitchBtn) {
                _this.switchMap = switchMap;
                return _super.prototype.render.call(_this);
            }
            else {
                return null;
            }
        };
        return _this;
    }
    MapSwitch.getIsNeedSetting = function () {
        return false;
    };
    MapSwitch.prototype.getStyle = function () {
        return jimu_core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      width: ", ";\n      height: ", ";\n      cursor: pointer;\n      position: relative;\n\n      .mapthumb-item {\n        position: absolute;\n        width: ", ";\n        height: ", ";\n        transition: bottom 0.5s, left 0.5s, top 0.5s, right 0.5s, z-index 0.5s;\n      }\n\n      .front {\n        z-index: 1;\n        bottom: 0;\n        left: 0;\n      }\n\n      .back {\n        z-index: 0;\n        top: 0;\n        right: 0;\n      }\n    "], ["\n      width: ", ";\n      height: ", ";\n      cursor: pointer;\n      position: relative;\n\n      .mapthumb-item {\n        position: absolute;\n        width: ", ";\n        height: ", ";\n        transition: bottom 0.5s, left 0.5s, top 0.5s, right 0.5s, z-index 0.5s;\n      }\n\n      .front {\n        z-index: 1;\n        bottom: 0;\n        left: 0;\n      }\n\n      .back {\n        z-index: 0;\n        top: 0;\n        right: 0;\n      }\n    "])), jimu_core_1.polished.rem(68), jimu_core_1.polished.rem(52), jimu_core_1.polished.rem(64), jimu_core_1.polished.rem(48));
    };
    MapSwitch.prototype.getTitle = function () {
        return 'MapSwitch';
    };
    MapSwitch.prototype.getIcon = function () {
        var _this = this;
        return {
            icon: require('../assets/icons/exchange.svg'),
            onIconClick: function () {
                _this.switchMap();
            }
        };
    };
    MapSwitch.prototype.getExpandPanel = function () {
        var _this = this;
        if (this.props.toolJson.isOnlyExpanded) {
            return jimu_core_1.jsx(multisourcemap_context_1.MultiSourceMapContext.Consumer, null, function (_a) {
                var isShowMapSwitchBtn = _a.isShowMapSwitchBtn, dataSourceIds = _a.dataSourceIds, activeDataSourceId = _a.activeDataSourceId, switchMap = _a.switchMap;
                return (_this.getContent(isShowMapSwitchBtn, dataSourceIds, activeDataSourceId, switchMap));
            });
        }
        else {
            return null;
        }
    };
    MapSwitch.prototype.render = function () {
        var _this = this;
        if (this.props.toolJson.isOnlyExpanded) {
            return _super.prototype.render.call(this);
        }
        else {
            return jimu_core_1.jsx(multisourcemap_context_1.MultiSourceMapContext.Consumer, null, function (_a) {
                var isShowMapSwitchBtn = _a.isShowMapSwitchBtn, dataSourceIds = _a.dataSourceIds, activeDataSourceId = _a.activeDataSourceId, switchMap = _a.switchMap;
                return (_this.getIconContent(isShowMapSwitchBtn, dataSourceIds, activeDataSourceId, switchMap));
            });
        }
    };
    return MapSwitch;
}(base_tool_1.BaseTool));
exports.default = MapSwitch;
var templateObject_1;
//# sourceMappingURL=mapswitch.js.map