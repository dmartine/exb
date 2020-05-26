"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jimu_core_1 = require("jimu-core");
function getStyle(theme) {
    return jimu_core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    label {\n      cursor: pointer;\n    }\n  "], ["\n    label {\n      cursor: pointer;\n    }\n  "])));
}
exports.getStyle = getStyle;
var templateObject_1;
//# sourceMappingURL=style.js.map