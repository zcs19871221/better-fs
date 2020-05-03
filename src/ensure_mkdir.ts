import path from 'path';
import { mkdir } from './promise_fs';
import isExist from './isexist';

export default async function ensureMkdir(dir: string): Promise<void> {
  const paths: string[] = path
    .normalize(dir)
    .split(path.sep)
    .filter((each) => each.trim());
  const toMkdir: string[] = [];
  while (paths.length > 0 && (await isExist(paths.join(path.sep))) === false) {
    toMkdir.unshift(<string>paths.pop());
  }
  for (const toMk of toMkdir) {
    paths.push(toMk);
    await mkdir(paths.join(path.sep));
  }
}
