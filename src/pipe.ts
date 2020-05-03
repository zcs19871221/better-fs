import fs from 'graceful-fs';
import path from 'path';
import ensureMkdir from './ensure_mkdir';

export default function pipe(src: string, dest: string) {
  return new Promise((resolve, reject) => {
    try {
      const srcStream = fs.createReadStream(src);
      ensureMkdir(path.dirname(dest)).then(() => {
        srcStream
          .pipe(fs.createWriteStream(dest))
          .on('error', (error) => {
            reject(error);
          })
          .on('finish', () => {
            resolve();
          });
      });
    } catch (error) {
      reject(error);
    }
  });
}
