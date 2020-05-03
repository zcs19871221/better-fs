import pipe from './pipe';
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
it('pipe', async () => {
  const file = path.join(workdir, 'target.txt');
  const target = path.join(workdir, 'a', 'b', 'c.txt');
  fs.writeFileSync(file, 'this is pipe');
  await pipe(file, target);
  expect(fs.readFileSync(target, 'utf-8')).toBe('this is pipe');
});
