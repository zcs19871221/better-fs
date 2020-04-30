import fs from 'graceful-fs';

export default function isExist(path: string): Promise<boolean> {
  return new Promise((resolve) => {
    fs.stat(path, (error) => {
      if (error && error.code === 'ENOENT') {
        resolve(false);
        return;
      }
      resolve(true);
    });
  });
}
