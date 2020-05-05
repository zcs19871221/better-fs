import remove from './remove_sync';
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
it('remove', async () => {
  const emptyDir = path.join(workdir, 'empty');
  const emptySubDir = path.join(emptyDir, 'emptydSub');
  const hasDir = path.join(workdir, 'has');
  const rootFile = path.join(workdir, 'something.txt');
  const hasFile = path.join(hasDir, 'hasFile.txt');
  const hasSubDir = path.join(hasDir, 'hasSubDir');
  const hasSubFile = path.join(hasDir, 'hasSubFile.text');
  fs.mkdirSync(emptyDir);
  fs.mkdirSync(emptySubDir);
  fs.mkdirSync(hasDir);
  fs.writeFileSync(rootFile, 'rootFile');
  fs.writeFileSync(hasFile, 'hasFile');
  fs.mkdirSync(hasSubDir);
  fs.writeFileSync(hasSubFile, 'hasSubFile');

  expect(fs.existsSync(emptyDir)).toBe(true);
  expect(fs.existsSync(emptySubDir)).toBe(true);
  await remove(emptyDir);
  expect(fs.existsSync(emptyDir)).toBe(false);
  expect(fs.existsSync(emptySubDir)).toBe(false);

  expect(fs.existsSync(hasFile)).toBe(true);
  expect(fs.existsSync(hasDir)).toBe(true);
  expect(fs.existsSync(hasSubDir)).toBe(true);
  expect(fs.existsSync(hasSubFile)).toBe(true);
  await remove(hasDir);
  expect(fs.existsSync(hasFile)).toBe(false);
  expect(fs.existsSync(hasDir)).toBe(false);
  expect(fs.existsSync(hasSubDir)).toBe(false);
  expect(fs.existsSync(hasSubFile)).toBe(false);

  expect(fs.existsSync(workdir)).toBe(true);
  await remove(workdir);
  expect(fs.existsSync(workdir)).toBe(false);
});
