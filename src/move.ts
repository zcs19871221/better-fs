import path from 'path';
import { rename } from './promise_fs';
import isExist from './isexist';
import mkdir from './mkdir';
export default async function move(src: string, dest: string): Promise<void> {
  if (src === dest) {
    return;
  }
  if (!(await isExist(src))) {
    return;
  }
  await mkdir(path.dirname(dest));
  return rename(src, dest);
}
