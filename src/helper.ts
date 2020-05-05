import { lstatSync } from 'graceful-fs';
import { lstat } from './promise_fs';
import isExist from './isexist';
import isExistSync from './isexist_sync';

interface Filter {
  filter?: (
    fileName: string,
    fileType: 'd' | 'f',
  ) => Promise<boolean> | boolean;
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
const getFileStatSync = (locate: string): 'd' | 'f' | 'n' => {
  if (!isExistSync(locate)) {
    return 'n';
  }
  const destStat = lstatSync(locate);
  if (destStat.isDirectory()) {
    return 'd';
  }
  return 'f';
};
export { Filter, getFileStat, getFileStatSync };
