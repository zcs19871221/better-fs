import * as fs from 'graceful-fs';
import { promisify } from 'util';

export const lstat = promisify(fs.lstat);
export const readdir = promisify(fs.readdir);
export const rename = promisify(fs.rename);
export const unlink = promisify(fs.unlink);
export const writeFile = promisify(fs.writeFile);
