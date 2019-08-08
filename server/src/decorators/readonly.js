"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function handleDescriptor(target, key, descriptor) {
    descriptor.writable = false;
    return descriptor;
}
// Can only be added to methods.
function readonly(...args) {
    return utils_1.decorate(handleDescriptor, args);
}
exports.default = readonly;
//# sourceMappingURL=readonly.js.map