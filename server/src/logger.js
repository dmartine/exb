"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const fs = require("fs");
const path = require("path");
require('winston-daily-rotate-file');
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
exports.logger = new winston.Logger({
    level: 'info',
    transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
            name: 'info-file',
            datePattern: 'yyyy-MM-dd.',
            zippedArchive: true,
            prepend: true,
            maxDays: 30,
            filename: __dirname + '/../logs/server-info.log',
            level: process.env.ENV === 'development' ? 'debug' : 'info'
        }),
        new winston.transports.DailyRotateFile({
            name: 'error-file',
            datePattern: 'yyyy-MM-dd.',
            zippedArchive: true,
            prepend: true,
            maxDays: 30,
            filename: __dirname + '/../logs/server-info.log',
            level: 'error'
        })
    ]
});
//# sourceMappingURL=logger.js.map