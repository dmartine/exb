"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
var LOGGER_LEVEL;
(function (LOGGER_LEVEL) {
    LOGGER_LEVEL[LOGGER_LEVEL["ERROR"] = 0] = "ERROR";
    LOGGER_LEVEL[LOGGER_LEVEL["WARN"] = 1] = "WARN";
    LOGGER_LEVEL[LOGGER_LEVEL["INFO"] = 2] = "INFO";
    LOGGER_LEVEL[LOGGER_LEVEL["VERBOSE"] = 3] = "VERBOSE";
    LOGGER_LEVEL[LOGGER_LEVEL["DEBUG"] = 4] = "DEBUG";
})(LOGGER_LEVEL = exports.LOGGER_LEVEL || (exports.LOGGER_LEVEL = {}));
exports.log = function (level, msg) {
    const levelStr = LOGGER_LEVEL[level].toLowerCase();
    return (target, name, descriptor) => {
        const method = descriptor.value;
        descriptor.value = (...args) => {
            logger_1.logger.log(levelStr, `before function execute: ${name}(${args}) = ?`);
            let ret;
            try {
                ret = method.apply(target, args);
                logger_1.logger.log(levelStr, `(after function execute success: ${name}(${args}) => ${ret}`);
            }
            catch (error) {
                logger_1.logger.error(`function execute error: ${name}(${args}) => ${error}`);
            }
            finally {
                logger_1.logger.log(levelStr, `function execute done: ${name}(${args}) => ${ret}`);
            }
            return ret;
        };
    };
};
//# sourceMappingURL=log.js.map