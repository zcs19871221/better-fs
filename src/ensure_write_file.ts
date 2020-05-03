import path from 'path';
import { WriteFileOptions } from 'graceful-fs';
import ensureMkdir from './ensure_mkdir';
import { writeFile } from './promise_fs';

export default async function ensureWriteFile(
  locate: string,
  data: any,
  options: WriteFileOptions,
) {
  await ensureMkdir(path.dirname(locate));
  await writeFile(locate, data, options);
}
