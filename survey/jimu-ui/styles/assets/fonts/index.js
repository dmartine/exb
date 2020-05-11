"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jimu_core_1 = require("jimu-core");
// By default, we are pulling the latest Avenir Next fonts from CDN
exports.getFontFaces = function () {
    return jimu_core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    @import url('//webapps-cdn.esri.com/CDN/fonts/v1.4.1/fonts.css');\n  "], ["\n    @import url('//webapps-cdn.esri.com/CDN/fonts/v1.4.1/fonts.css');\n  "])));
};
var templateObject_1;
//# sourceMappingURL=index.js.map