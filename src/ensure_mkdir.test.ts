import ensureMkdir from './ensure_mkdir';
import remove from './remove';
import read_includes from './read_includes';
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
  const dirs = await read_includes(workdir);
  expect(dirs.sort()).toEqual(
    [
      workdir,
      path.join(workdir, 'onelevel'),
      path.join(workdir, 'a'),
      path.join(workdir, 'a', 'b'),
      path.join(workdir, 'a', 'b', 'c'),
      path.join(workdir, 'a', 'b', 'c', 'd'),
      path.join(workdir, 'e'),
      path.join(workdir, 'e', 'f'),
      path.join(workdir, 'e', 'f', 'g'),
    ].sort(),
  );
});
