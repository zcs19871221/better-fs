import path from 'path';
import { rename } from './promiseFs';
import isExist from './isExist';
import mkdir from './mkdir';
export default async function move(src: string, dest: string) {
  if (src === dest) {
    return;
  }
  if (!(await isExist(src))) {
    return;
  }
  await mkdir(path.dirname(dest));
  await rename(src, dest);
}
