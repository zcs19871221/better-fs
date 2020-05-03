import path from 'path';
import { readdir } from './promise_fs';
import { getFileStat } from './helper';

export default async function readIncludes(dir: string): Promise<string[]> {
  const type = await getFileStat(dir);
  if (type === 'n') {
    return [];
  }
  if (type === 'd') {
    return Promise.all(
      (await readdir(dir)).map((target) =>
        readIncludes(path.join(dir, target)),
      ),
    ).then((results) => {
      return results.reduce((acc, cur) => {
        return [...acc, ...cur];
      });
    });
  }
  return [dir];
}
