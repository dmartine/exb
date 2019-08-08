"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readonly_1 = require("../../src/decorators/readonly");
class Foo {
    constructor() {
        this.second = 'second';
    }
    first() { }
}
__decorate([
    readonly_1.default
], Foo.prototype, "first", null);
describe('@readonly', () => {
    it('marks descriptor as writable === false', function () {
        expect(Object.getOwnPropertyDescriptor(Foo.prototype, 'first').writable).toBe(false);
    });
    it('makes setting property error', function () {
        const foo = new Foo();
        expect((function () {
            foo.first = 'I will error';
        })).toThrow(TypeError('Cannot assign to read only property \'first\' of object \'#<Foo>\''));
        expect(function () {
            foo.second = 'I will also error';
        }).not.toThrow(TypeError('Cannot assign to read only property \'second\' of object \'#<Foo>\''));
    });
});
//# sourceMappingURL=readonly.test.js.map