import { lstat } from './promise_fs';
import isExist from './isExist';

interface Checker {
  (fileName: string, fileType: 'd' | 'f'): boolean;
}
const getFileStat = async (locate: string): Promise<'d' | 'f' | 'n'> => {
  if (!(await isExist(locate))) {
    return 'n';
  }
  const destStat = await lstat(locate);
  if (destStat.isDirectory()) {
    return 'd';
  }
  return 'f';
};
export { Checker, getFileStat };
