"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const utils = require("util");
const exb_path_util_1 = require("exb-path-util");
const readFile = utils.promisify(fs.readFile);
function default_1(options) {
    return function (ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let optionUrlPath = options.urlPath;
            let optionPath = options.path;
            let ctxPath = ctx.path;
            if (optionUrlPath === '/site/') {
                if (ctxPath === '/') {
                    ctxPath = '/site';
                }
                optionPath = optionPath.substr(0, optionPath.length - 'site/'.length);
            }
            if (!new RegExp(`^${optionUrlPath}`).test(exb_path_util_1.fixPath(ctxPath))) {
                yield next();
                return;
            }
            if (ctx.response.status !== 404) {
                yield next();
                return;
            }
            if (exb_path_util_1.isIndexPath(ctxPath, optionUrlPath) && !options.ssr) {
                ctx.response.body = yield readIndexHtml(optionPath);
                return;
            }
            yield next();
        });
    };
}
exports.default = default_1;
function readIndexHtml(appPath) {
    return __awaiter(this, void 0, void 0, function* () {
        let content = yield readFile(path.join(appPath, 'index.html'), 'utf-8');
        return exb_path_util_1.replaceContent(content);
    });
}
//# sourceMappingURL=index.js.map