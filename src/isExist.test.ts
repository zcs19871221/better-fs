import path from 'path';
import isExist from './isexist';

const src = path.join(process.cwd(), 'src');
it('isExist', async () => {
  expect(await isExist(src)).toBe(true);
  expect(await isExist(path.join(src, 'fucked'))).toBe(false);
  expect(await isExist(path.join(src, 'isExist.test.ts'))).toBe(true);
});
