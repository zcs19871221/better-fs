import fs from 'graceful-fs';
import path from 'path';
import mkdir from './mkdir';

export default function pipe(src: string, dest: string) {
  return new Promise((resolve, reject) => {
    try {
      const srcStream = fs.createReadStream(src);
      mkdir(path.dirname(dest)).then(() => {
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
