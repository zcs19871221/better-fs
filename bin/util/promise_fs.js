"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("graceful-fs"));
const util_1 = require("util");
exports.lstat = util_1.promisify(fs.lstat);
exports.readdir = util_1.promisify(fs.readdir);
exports.rename = util_1.promisify(fs.rename);
exports.unlink = util_1.promisify(fs.unlink);
exports.writeFile = util_1.promisify(fs.writeFile);
exports.readFile = util_1.promisify(fs.readFile);
exports.rmdir = util_1.promisify(fs.rmdir);
exports.mkdir = util_1.promisify(fs.mkdir);
