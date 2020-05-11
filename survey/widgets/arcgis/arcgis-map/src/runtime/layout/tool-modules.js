"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zoom_1 = require("../tools/zoom");
var home_1 = require("../tools/home");
var compass_1 = require("../tools/compass");
var locate_1 = require("../tools/locate");
var navigation_1 = require("../tools/navigation");
var search_1 = require("../tools/search");
var layers_1 = require("../tools/layers");
var basemap_1 = require("../tools/basemap");
var mapswitch_1 = require("../tools/mapswitch");
var fullscreen_1 = require("../tools/fullscreen");
var scalebar_1 = require("../tools/scalebar");
var attribution_1 = require("../tools/attribution");
var measure_1 = require("../tools/measure");
var ToolModules = {
    Zoom: zoom_1.default,
    Home: home_1.default,
    Navigation: navigation_1.default,
    Locate: locate_1.default,
    Compass: compass_1.default,
    Search: search_1.default,
    Layers: layers_1.default,
    BaseMap: basemap_1.default,
    Measure: measure_1.default,
    MapSwitch: mapswitch_1.default,
    FullScreen: fullscreen_1.default,
    ScaleBar: scalebar_1.default,
    Attribution: attribution_1.default
};
exports.default = ToolModules;
//# sourceMappingURL=tool-modules.js.map