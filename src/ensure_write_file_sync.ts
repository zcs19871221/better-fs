import path from 'path';
import { WriteFileOptions } from 'graceful-fs';
import ensureMkdirSync from './ensure_mkdir_sync';
import { writeFileSync } from 'graceful-fs';

export default function ensureWriteFileSync(
  locate: string,
  data: any,
  options?: WriteFileOptions,
): void {
  ensureMkdirSync(path.dirname(locate));
  writeFileSync(locate, data, options);
}
