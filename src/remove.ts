import path from 'path';
import { Checker, getFileStat } from './helper';
import isExist from './isexist';
import { readdir, unlink } from './promise_fs';

export default async function remove(
  target: string,
  options?: { keeper?: Checker },
): Promise<any> {
  if (!(await isExist(target))) {
    return;
  }
  const type = await getFileStat(target);
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
