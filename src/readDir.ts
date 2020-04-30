import path from 'path';
import isExist from './isExist';
import { readdir } from './promiseFs';
import { Checker, getFileStat } from './helper';

export default async function readDir(
  dir: string,
  options?: {
    filter?: Checker;
  },
): Promise<string[]> {
  if (!(await isExist(dir))) {
    return [];
  }
  const type = await getFileStat(dir);
  if (options && options.filter && options.filter(dir, type) === false) {
    return [];
  }
  if (type === 'd') {
    return (
      await Promise.all(
        (await readdir(dir)).map((target) =>
          readDir(path.join(dir, target), options),
        ),
      )
    ).reduce((acc, cur) => {
      return [...acc, ...cur];
    });
  }
  return [dir];
}
