import path from 'path';
import { Checker, getFileStat } from './helper';
import { readdir, unlink } from './promise_fs';

export default async function remove(
  target: string,
  options?: { keeper?: Checker },
): Promise<any> {
  const type = await getFileStat(target);
  if (type === 'n') {
    return;
  }
  if (options && options.keeper && options.keeper(target, type)) {
    return;
  }
  if (type === 'f') {
    return unlink(target);
  }
  return Promise.all(
    (await readdir(target)).map((each) => remove(path.join(target, each))),
  );
}
