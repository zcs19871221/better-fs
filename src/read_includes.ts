import path from 'path';
import { readdir } from './promise_fs';
import { Filter, getFileStat } from './helper';

export default async function readIncludes(
  dir: string,
  options?: Filter,
): Promise<string[]> {
  const type = await getFileStat(dir);
  if (type === 'n') {
    return [];
  }
  if (
    options &&
    options.filter &&
    (await options.filter(dir, type)) === false
  ) {
    return [];
  }
  if (type === 'd') {
    return Promise.all(
      (await readdir(dir)).map((target) =>
        readIncludes(path.join(dir, target), options),
      ),
    ).then((results) => {
      return results.reduce(
        (acc, cur) => {
          return [...acc, ...cur];
        },
        [dir],
      );
    });
  }
  return [dir];
}
