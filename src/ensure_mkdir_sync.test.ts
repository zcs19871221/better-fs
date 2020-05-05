import ensureMkdir from './ensure_mkdir_sync';
import remove from './remove';
import fs from 'fs';
import path from 'path';

const workdir = path.join(
  process.cwd(),
  Array.from({ length: 5 }, () => {
    return String.fromCharCode(
      'a'.charCodeAt(0) + Math.floor(Math.random() * 26),
    );
  }).join(''),
);
beforeAll(async () => {
  await remove(workdir);
  fs.mkdirSync(workdir);
});
afterAll(async () => {
  await remove(workdir);
});
it('ensureMkdir', async () => {
  await ensureMkdir(__dirname);
  await ensureMkdir(path.join(workdir, 'onelevel'));
  await ensureMkdir(path.join(workdir, 'a', 'b', 'c', 'd'));
  await ensureMkdir(workdir + '/e' + '\\f' + '//g/');
  expect(fs.existsSync(path.join(workdir, 'onelevel'))).toBe(true);
  expect(fs.existsSync(path.join(workdir, 'a/b/c/d'))).toBe(true);
  expect(fs.existsSync(path.join(workdir, 'e/f/g'))).toBe(true);
});
