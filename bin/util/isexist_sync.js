"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graceful_fs_1 = __importDefault(require("graceful-fs"));
function isExistSync(path) {
    try {
        graceful_fs_1.default.statSync(path);
        return true;
    }
    catch (error) {
        if (error && error.code === 'ENOENT') {
            return false;
        }
        return true;
    }
}
exports.default = isExistSync;
