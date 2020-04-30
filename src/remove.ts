import path from 'path';
import { Checker } from './index.d';
import isExist from './isExist';
import { lstat, readdir, unlink } from './promiseFs';

export default async function remove(
  target: string,
  options?: { keeper?: Checker },
): Promise<any> {
  if (!(await isExist(target))) {
    return;
  }
  const type = (await lstat(target)).isDirectory ? 'd' : 'f';
  if (options && options.keeper && options.keeper(target, type)) {
    return;
  }
  if (type === 'd') {
    return unlink(target);
  }
  return Promise.all(
    (await readdir(target)).map((each) => remove(path.join(target, each))),
  );
}
