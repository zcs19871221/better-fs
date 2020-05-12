"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const graceful_fs_1 = require("graceful-fs");
const helper_1 = require("./helper");
function removeSync(target, filter) {
    const type = helper_1.getFileStatSync(target);
    if (type === 'n') {
        return;
    }
    if (filter && filter(target, type) === false) {
        return;
    }
    if (type === 'f') {
        return graceful_fs_1.unlinkSync(target);
    }
    graceful_fs_1.readdirSync(target).map((each) => removeSync(path_1.default.join(target, each)));
    graceful_fs_1.rmdirSync(target);
}
exports.default = removeSync;
