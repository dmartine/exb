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
var config_1 = require("./config");
var VersionManager = /** @class */ (function (_super) {
    __extends(VersionManager, _super);
    function VersionManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.versions = [{
                version: '1.0.0',
                description: 'The first release.',
                upgrader: function (oldConfig) {
                    var _a, _b, _c, _d;
                    var embedType = (_b = (_a = oldConfig) === null || _a === void 0 ? void 0 : _a.functionConfig) === null || _b === void 0 ? void 0 : _b.embedType;
                    var content = (_d = (_c = oldConfig) === null || _c === void 0 ? void 0 : _c.functionConfig) === null || _d === void 0 ? void 0 : _d.content;
                    if (embedType) {
                        oldConfig = oldConfig.set('embedType', embedType);
                        if (embedType === config_1.EmbedType.Url) {
                            oldConfig = oldConfig.set('staticUrl', content);
                        }
                        else {
                            oldConfig = oldConfig.set('embedCode', content);
                        }
                    }
                    else {
                        oldConfig = oldConfig.set('embedType', config_1.EmbedType.Url);
                    }
                    oldConfig = oldConfig.without('functionConfig');
                    return oldConfig;
                }
            }];
        return _this;
    }
    return VersionManager;
}(jimu_core_1.BaseVersionManager));
exports.versionManager = new VersionManager();
//# sourceMappingURL=embed-version-manager.js.map