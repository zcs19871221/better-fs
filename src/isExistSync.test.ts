import path from 'path';
import isExist from './isExistSync';

const src = path.join(process.cwd(), 'src');
it('isExist', () => {
  expect(isExist(src)).toBe(true);
  expect(isExist(path.join(src, 'fucked'))).toBe(false);
  expect(isExist(path.join(src, 'isExist.test.ts'))).toBe(true);
});
