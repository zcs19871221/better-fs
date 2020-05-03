import path from 'path';
import { rename } from './promise_fs';
import isExist from './isexist';
import ensureMkdir from './ensure_mkdir';

export default async function move(src: string, dest: string): Promise<void> {
  if (src === dest) {
    return;
  }
  if (!(await isExist(src))) {
    return;
  }
  await ensureMkdir(path.dirname(dest));
  return rename(src, dest);
}
