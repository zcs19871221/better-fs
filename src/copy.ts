import path from 'path';
import mkdir from './mkdir';
import pipe from './pipe';
import { Checker, getFileStat } from './helper';
import { readdir } from './promise_fs';

interface Options {
  filter?: Checker;
  overwrite?: boolean;
  inner?: boolean;
}
export default async function copy(
  src: string,
  dest: string,
  options: Options = {},
): Promise<any> {
  options = {
    overwrite: false,
    inner: false,
    ...options,
  };

  const srcType = await getFileStat(src);
  if (srcType === 'n') {
    return;
  }
  if (options.filter && options.filter(src, srcType) === false) {
    return;
  }
  const destType = await getFileStat(dest);
  switch (srcType + destType) {
    case 'fd':
    case 'ff':
    case 'fn': {
      if (destType === 'd') {
        dest = path.join(dest, path.basename(src));
      }
      if (options.overwrite === false && destType === 'f') {
        return;
      }
      return pipe(src, dest);
    }
    case 'dn':
    case 'df':
    case 'dd': {
      if (destType === 'n') {
        await mkdir(dest);
      } else if (destType === 'f') {
        dest = path.dirname(dest);
      }
      const child = await readdir(src);
      const isInner = options.inner;
      delete options.inner;
      return Promise.all(
        child.map((target) =>
          copy(
            path.join(src, target),
            isInner ? dest : path.join(dest, target),
            options,
          ),
        ),
      );
    }
    default:
      throw new Error('参数错误');
  }
}
