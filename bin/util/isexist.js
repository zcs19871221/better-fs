"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graceful_fs_1 = __importDefault(require("graceful-fs"));
function isExist(path) {
    return new Promise((resolve) => {
        graceful_fs_1.default.stat(path, (error) => {
            if (error && error.code === 'ENOENT') {
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
}
exports.default = isExist;
