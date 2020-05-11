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
var ScrollContainer = /** @class */ (function (_super) {
    __extends(ScrollContainer, _super);
    function ScrollContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moveY = 0;
        _this.startY = 0;
        _this.isRegisted = false;
        _this.registerTouchEvent = function (ref) {
            if (ref && !_this.isRegisted) {
                ref.addEventListener('touchstart', function (event) {
                    _this.moveY = 0;
                    var touch = event.touches[0];
                    _this.startY = touch.clientY;
                }, { passive: false });
                ref.addEventListener('touchmove', function (event) {
                    var touch = event.touches[0];
                    _this.moveY = (touch.clientY - _this.startY) * -1;
                    _this.startY = touch.clientY;
                    ref.scrollTop = ref.scrollTop + _this.moveY;
                }, { passive: false });
                ref.addEventListener('touchend', function (event) {
                    _this.moveY = 0;
                    _this.startY = 0;
                }, { passive: false });
                _this.isRegisted = true;
            }
        };
        return _this;
    }
    ScrollContainer.prototype.getStyle = function () {
        return jimu_core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      overflow: auto;\n      pointer-events: auto;\n      "], ["\n      overflow: auto;\n      pointer-events: auto;\n      "])));
    };
    ScrollContainer.prototype.render = function () {
        var _this = this;
        return jimu_core_1.jsx("div", { css: this.getStyle(), className: this.props.className, style: this.props.style, ref: function (ref) {
                _this.registerTouchEvent(ref);
            } }, this.props.children);
    };
    return ScrollContainer;
}(jimu_core_1.React.PureComponent));
exports.default = ScrollContainer;
var templateObject_1;
//# sourceMappingURL=scroll-container.js.map