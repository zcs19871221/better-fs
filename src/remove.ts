import path from 'path';
import { getFileStat } from './helper';
import { readdir, unlink, rmdir } from './promise_fs';

export default async function remove(
  target: string,
  filter?: (fileName: string, fileType: 'd' | 'f') => Promise<boolean>,
): Promise<any> {
  const type = await getFileStat(target);
  if (type === 'n') {
    return;
  }
  if (filter && (await filter(target, type)) === false) {
    return;
  }
  if (type === 'f') {
    return unlink(target);
  }
  return Promise.all(
    (await readdir(target)).map((each) => remove(path.join(target, each))),
  ).then(() => rmdir(target));
}
