import path from 'path';
import { readdirSync } from 'graceful-fs';
import { getFileStatSync, Filter } from './helper';

export default function readIncludesSync(
  dir: string,
  filter?: Filter['filter'],
): string[] {
  const type = getFileStatSync(dir);
  if (type === 'n') {
    return [];
  }
  const filtered = !filter || filter(dir, type) ? [dir] : [];
  if (type === 'd') {
    return readdirSync(dir)
      .map((target) => readIncludesSync(path.join(dir, target), filter))
      .reduce((acc, cur) => {
        return [...acc, ...cur];
      }, filtered);
  }
  return filtered;
}
