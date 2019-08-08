"use strict";
/* const { defineProperty, getOwnPropertyDescriptor,
  getOwnPropertyNames, getOwnPropertySymbols } = Object; */
Object.defineProperty(exports, "__esModule", { value: true });
function isDescriptor(desc) {
    if (!desc || !desc.hasOwnProperty) {
        return false;
    }
    const keys = ['value', 'initializer', 'get', 'set'];
    for (let i = 0, l = keys.length; i < l; i++) {
        if (desc.hasOwnProperty(keys[i])) {
            return true;
        }
    }
    return false;
}
exports.isDescriptor = isDescriptor;
function decorate(handleDescriptor, entryArgs) {
    if (isDescriptor(entryArgs[entryArgs.length - 1])) {
        return handleDescriptor(...entryArgs, []);
    }
    else {
        return function () {
            return handleDescriptor(...Array.prototype.slice.call(arguments), entryArgs);
        };
    }
}
exports.decorate = decorate;
//# sourceMappingURL=utils.js.map