import path from 'path';
import { renameSync } from 'graceful-fs';
import isExistSync from './isexist_sync';
import ensureMkdirSync from './ensure_mkdir_sync';

export default function moveSync(src: string, dest: string): void {
  if (src === dest) {
    return;
  }
  if (!isExistSync(src)) {
    return;
  }
  ensureMkdirSync(path.dirname(dest));
  return renameSync(src, dest);
}
