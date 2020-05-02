import fs from 'graceful-fs';

export default function isExist(path: string): boolean {
  try {
    fs.statSync(path);
    return true;
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return false;
    }
    return true;
  }
}
