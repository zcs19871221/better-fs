import { readdirSync, readFileSync } from 'graceful-fs';
import path from 'path';
import ensureMkdirSync from './ensure_mkdir_sync';
import ensureWriteFileSync from './ensure_write_file_sync';
import { Filter, getFileStatSync } from './helper';

interface Options extends Filter {
  overwrite?: boolean;
  inner?: boolean;
}
export default function copySync(
  src: string,
  dest: string,
  options: Options = {},
): void {
  options = {
    overwrite: false,
    inner: false,
    ...options,
  };
  const srcType = getFileStatSync(src);
  if (srcType === 'n') {
    return;
  }
  if (options.filter && options.filter(src, srcType) === false) {
    return;
  }
  const destType = getFileStatSync(dest);
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
      return ensureWriteFileSync(dest, readFileSync(src));
    }
    case 'df':
      return;
    case 'dn':
    case 'dd': {
      const child = readdirSync(src);
      if (destType === 'd' && !options.inner) {
        return copySync(src, path.join(dest, path.basename(src)), options);
      }
      if (destType === 'n') {
        ensureMkdirSync(dest);
      }
      const isInner = options.inner;
      delete options.inner;
      child.map((target) =>
        copySync(
          path.join(src, target),
          isInner ? dest : path.join(dest, target),
          options,
        ),
      );
      return;
    }
    default:
      throw new Error('参数错误');
  }
}
