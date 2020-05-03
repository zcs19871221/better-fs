import { lstat } from './promise_fs';
import isExist from './isExist';

interface Filter {
  filter?: (fileName: string, fileType: 'd' | 'f') => Promise<boolean>;
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
export { Filter, getFileStat };
