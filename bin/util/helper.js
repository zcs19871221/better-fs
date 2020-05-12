"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graceful_fs_1 = require("graceful-fs");
const promise_fs_1 = require("./promise_fs");
const isexist_1 = __importDefault(require("./isexist"));
const isexist_sync_1 = __importDefault(require("./isexist_sync"));
const getFileStat = async (locate) => {
    if (!(await isexist_1.default(locate))) {
        return 'n';
    }
    const destStat = await promise_fs_1.lstat(locate);
    if (destStat.isDirectory()) {
        return 'd';
    }
    return 'f';
};
exports.getFileStat = getFileStat;
const getFileStatSync = (locate) => {
    if (!isexist_sync_1.default(locate)) {
        return 'n';
    }
    const destStat = graceful_fs_1.lstatSync(locate);
    if (destStat.isDirectory()) {
        return 'd';
    }
    return 'f';
};
exports.getFileStatSync = getFileStatSync;
