import readIncludes from './read_includes';
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
it('readIncludes', async () => {
  const emptyDir = path.join(workdir, 'empty');
  const hasDir = path.join(workdir, 'has');
  const rootFile = path.join(workdir, 'something.txt');
  const hasFile = path.join(hasDir, 'hasFile.txt');
  const hasSubDir = path.join(hasDir, 'hasSubDir');
  const hasSubFile = path.join(hasDir, 'hasSubFile.text');
  fs.mkdirSync(emptyDir);
  fs.mkdirSync(hasDir);
  fs.writeFileSync(rootFile, 'rootFile');
  fs.writeFileSync(hasFile, 'hasFile');
  fs.mkdirSync(hasSubDir);
  fs.writeFileSync(hasSubFile, 'hasSubFile');
  const dirs = await readIncludes(workdir);
  expect(dirs.sort()).toEqual(
    [
      emptyDir,
      hasDir,
      rootFile,
      hasFile,
      hasSubDir,
      hasSubFile,
      workdir,
    ].sort(),
  );
});
