import remove from './remove';
import move from './move';
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
it('move', async () => {
  const file1 = path.join(workdir, 'file1');
  const dir1 = path.join(workdir, 'dir1');
  const dirxx = path.join(workdir, 'dirxxs');
  const deepDir = path.join(workdir, 'dir2', 'dir3');
  fs.writeFileSync(file1, 'file1');
  fs.mkdirSync(dir1);
  fs.mkdirSync(dirxx);
  fs.writeFileSync(path.join(dirxx, 'xxfile'), 'xxfile');
  await move(file1, path.join(workdir, 'file2'));
  expect(fs.readFileSync(path.join(workdir, 'file2'), 'utf-8')).toBe('file1');
  await move(dir1, path.join(workdir, 'dir11'));
  expect(fs.existsSync(dir1)).toBe(false);
  expect(fs.existsSync(path.join(workdir, 'dir11'))).toBe(true);

  await move(dirxx, deepDir);
  expect(fs.existsSync(deepDir)).toBe(true);
  expect(fs.readFileSync(path.join(deepDir, 'xxfile'), 'utf-8')).toBe('xxfile');
});
