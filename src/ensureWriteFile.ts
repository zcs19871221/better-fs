import path from 'path';
import { WriteFileOptions } from 'graceful-fs';
import mkdir from './mkdir';
import { writeFile } from './promiseFs';

export default async function ensureWriteFile(
  locate: string,
  data: any,
  options: WriteFileOptions,
) {
  await mkdir(path.dirname(locate));
  await writeFile(locate, data, options);
}
