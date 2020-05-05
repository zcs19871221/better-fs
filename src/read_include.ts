import path from 'path';
import { readdir } from './promise_fs';
import { getFileStat, Filter } from './helper';

export default async function readIncludes(
  dir: string,
  filter?: Filter['filter'],
): Promise<string[]> {
  const type = await getFileStat(dir);
  if (type === 'n') {
    return [];
  }
  const filtered = !filter || filter(dir, type) ? [dir] : [];
  if (type === 'd') {
    return Promise.all(
      (await readdir(dir)).map((target) =>
        readIncludes(path.join(dir, target), filter),
      ),
    ).then((results) => {
      return results.reduce((acc, cur) => {
        return [...acc, ...cur];
      }, filtered);
    });
  }
  return filtered;
}
