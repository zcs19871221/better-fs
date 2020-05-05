import path from 'path';
import { mkdirSync } from 'graceful-fs';
import isExistSync from './isexist_sync';

export default function ensureMkdirSync(dir: string): void {
  const paths: string[] = path
    .normalize(dir)
    .split(path.sep)
    .filter((each) => each.trim());
  const toMkdir: string[] = [];
  while (paths.length > 0 && isExistSync(paths.join(path.sep)) === false) {
    toMkdir.unshift(<string>paths.pop());
  }
  for (const toMk of toMkdir) {
    paths.push(toMk);
    mkdirSync(paths.join(path.sep));
  }
}
