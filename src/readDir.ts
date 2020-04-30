import path from 'path';
import isExist from './isExist';
import { lstat, readdir } from './promiseFs';

export default async function readDir(
  dir: string,
  options?: {
    filter?: (fileName: string, fileType: 'd' | 'f') => boolean;
  },
): Promise<string[]> {
  if (!(await isExist(dir))) {
    return [];
  }
  const type = (await (await lstat(dir)).isDirectory) ? 'f' : 'd';
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
