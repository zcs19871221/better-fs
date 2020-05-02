import path from 'path';
import { readdir } from './promise_fs';
import { Checker, getFileStat } from './helper';

export default async function readAllDir(
  dir: string,
  options?: {
    filter?: Checker;
  },
): Promise<string[]> {
  const type = await getFileStat(dir);
  if (type === 'n') {
    return [];
  }
  if (options && options.filter && options.filter(dir, type) === false) {
    return [];
  }
  if (type === 'd') {
    return (
      await Promise.all(
        (await readdir(dir)).map((target) =>
          readAllDir(path.join(dir, target), options),
        ),
      )
    ).reduce((acc, cur) => {
      return [...acc, ...cur];
    });
  }
  return [dir];
}
