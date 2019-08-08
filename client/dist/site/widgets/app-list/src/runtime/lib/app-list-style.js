"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jimu_core_1 = require("jimu-core");
function getStyle(theme) {
    var max_width = 1200;
    // with font_size_root theme variable can't be get, so define font_size_root temporarily
    var font_size_root = 14;
    return jimu_core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    .widget-builder-app-list {\n      overflow-y: auto;\n    \n      .app-list-h1 {\n        font-size: ", "rem;\n      }\n    \n      .app-list-h2 {\n        font-size: ", "rem;\n      }\n    \n      .app-list-maxwidth {\n        max-width: ", "rem;\n      }\n    \n      .app-list-banner {\n        overflow: hidden;\n        width: 100%;\n        max-width: ", "rem;\n        height: ", "rem;\n        margin-left: auto;\n        margin-right: auto;\n        margin-top: ", "rem;\n    \n        .app-list-searchbox {\n          padding-left: ", "rem !important;\n          width: 90%;\n          height: ", "rem;\n          font-family: 'AvenirNext-Medium';\n        }\n    \n        .app-list-searchboxicon {\n          margin-top: -5px;\n        }\n      }\n    \n      .app-list-filterbar {\n        max-width: ", "rem;\n        margin-left: auto;\n        margin-right: auto;\n        width: 100%;\n        margin-top: ", "rem;\n    \n        .filterbar-input {\n          width: ", "rem;\n          margin-top: 3px;\n          padding-top: 3px;\n        }\n      }\n    \n      .app-list-content {\n        margin-left: auto;\n        margin-right: auto;\n        width: 100%;\n        max-width: 1200px;\n        padding-bottom: ", "rem;\n      }\n    \n      .app-list-detailview {\n        width: 100%;\n    \n        .app-list-detailview-content {\n          width: 100%;\n          margin-top: ", "rem;\n    \n          .app-list-detailview-pic {\n            background-size: cover;\n            background-position: top center;\n          }\n    \n          .app-list-detailview-item {\n            padding-bottom: 110%;\n            background-size: cover;\n            background-position: center center;\n            background-color: ", ";\n            position: inherit;\n          }\n        }\n      }\n    \n      .app-list-listview {\n    \n        .app-list-listview-pic {\n          padding-bottom: 50%;\n          background-size: cover;\n          background-position: center center;\n          background-color: ", ";\n          position: inherit;\n        }\n      }\n    \n      .app-list-iconfill {\n          fill: #BCC4CD !important;\n      }\n    \n      .app-list-searchIconFill {\n        fill: ", " !important;\n      }\n    }\n  "], ["\n    .widget-builder-app-list {\n      overflow-y: auto;\n    \n      .app-list-h1 {\n        font-size: ", "rem;\n      }\n    \n      .app-list-h2 {\n        font-size: ", "rem;\n      }\n    \n      .app-list-maxwidth {\n        max-width: ", "rem;\n      }\n    \n      .app-list-banner {\n        overflow: hidden;\n        width: 100%;\n        max-width: ", "rem;\n        height: ", "rem;\n        margin-left: auto;\n        margin-right: auto;\n        margin-top: ", "rem;\n    \n        .app-list-searchbox {\n          padding-left: ", "rem !important;\n          width: 90%;\n          height: ", "rem;\n          font-family: 'AvenirNext-Medium';\n        }\n    \n        .app-list-searchboxicon {\n          margin-top: -5px;\n        }\n      }\n    \n      .app-list-filterbar {\n        max-width: ", "rem;\n        margin-left: auto;\n        margin-right: auto;\n        width: 100%;\n        margin-top: ", "rem;\n    \n        .filterbar-input {\n          width: ", "rem;\n          margin-top: 3px;\n          padding-top: 3px;\n        }\n      }\n    \n      .app-list-content {\n        margin-left: auto;\n        margin-right: auto;\n        width: 100%;\n        max-width: 1200px;\n        padding-bottom: ", "rem;\n      }\n    \n      .app-list-detailview {\n        width: 100%;\n    \n        .app-list-detailview-content {\n          width: 100%;\n          margin-top: ", "rem;\n    \n          .app-list-detailview-pic {\n            background-size: cover;\n            background-position: top center;\n          }\n    \n          .app-list-detailview-item {\n            padding-bottom: 110%;\n            background-size: cover;\n            background-position: center center;\n            background-color: ", ";\n            position: inherit;\n          }\n        }\n      }\n    \n      .app-list-listview {\n    \n        .app-list-listview-pic {\n          padding-bottom: 50%;\n          background-size: cover;\n          background-position: center center;\n          background-color: ", ";\n          position: inherit;\n        }\n      }\n    \n      .app-list-iconfill {\n          fill: #BCC4CD !important;\n      }\n    \n      .app-list-searchIconFill {\n        fill: ", " !important;\n      }\n    }\n  "])), 24 / font_size_root, 18 / font_size_root, max_width / font_size_root, max_width / font_size_root, 53 / font_size_root, 50 / font_size_root, 56 / font_size_root, 53 / font_size_root, max_width / font_size_root, 32 / font_size_root, 200 / font_size_root, 100 / font_size_root, 16 / font_size_root, theme.gray700, theme.gray700, theme.gray700);
}
exports.getStyle = getStyle;
var templateObject_1;
//# sourceMappingURL=app-list-style.js.map