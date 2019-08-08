"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./decorators/log");
class Demo {
    greet(msg) {
        return `Hello, ${msg}`;
    }
}
__decorate([
    log_1.log(log_1.LOGGER_LEVEL.INFO)
], Demo.prototype, "greet", null);
exports.Demo = Demo;
//# sourceMappingURL=DemoClass.js.map