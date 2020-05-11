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
var multisourcemap_context_1 = require("../components/multisourcemap-context");
var jimu_ui_1 = require("jimu-ui");
var Fullscreen = /** @class */ (function (_super) {
    __extends(Fullscreen, _super);
    function Fullscreen(props) {
        var _this = _super.call(this, props) || this;
        _this.toolName = 'Fullscreen';
        _this.fullScreenMap = function () { };
        _this.getContent = function (fullScreenMap) {
            _this.fullScreenMap = fullScreenMap;
            return _super.prototype.render.call(_this);
        };
        return _this;
    }
    Fullscreen.prototype.getTitle = function () {
        return this.props.intl.formatMessage({ id: 'FullScreenLabel', defaultMessage: jimu_ui_1.defaultMessages['FullScreenLabel'] });
    };
    Fullscreen.prototype.getIcon = function () {
        var _this = this;
        return {
            icon: require('../assets/icons/full-screen.svg'),
            onIconClick: function (evt) {
                _this.fullScreenMap();
            }
        };
    };
    Fullscreen.prototype.getExpandPanel = function () {
        return null;
    };
    Fullscreen.prototype.render = function () {
        var _this = this;
        return jimu_core_1.React.createElement(multisourcemap_context_1.MultiSourceMapContext.Consumer, null, function (_a) {
            var fullScreenMap = _a.fullScreenMap;
            return (_this.getContent(fullScreenMap));
        });
    };
    return Fullscreen;
}(base_tool_1.BaseTool));
exports.default = Fullscreen;
//# sourceMappingURL=fullscreen.js.map