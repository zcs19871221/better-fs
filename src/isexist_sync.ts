import fs from 'graceful-fs';

export default function isExistSync(path: string): boolean {
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
