import path from 'path';
import { Filter, getFileStat } from './helper';
import { readdir, unlink, rmdir } from './promise_fs';

export default async function remove(
  target: string,
  options?: Filter,
): Promise<any> {
  const type = await getFileStat(target);
  if (type === 'n') {
    return;
  }
  if (
    options &&
    options.filter &&
    (await options.filter(target, type)) === false
  ) {
    return;
  }
  if (type === 'f') {
    return unlink(target);
  }
  return Promise.all(
    (await readdir(target)).map((each) => remove(path.join(target, each))),
  ).then(() => rmdir(target));
}
