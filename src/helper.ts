import { lstat } from './promiseFs';

interface Checker {
  (fileName: string, fileType: 'd' | 'f'): boolean;
}
const getFileStat = async (locate: string): Promise<'d' | 'f'> => {
  const destStat = await lstat(locate);
  if (destStat.isDirectory()) {
    return 'd';
  }
  return 'f';
};
export { Checker, getFileStat };
