import fs from 'fs';
import path from 'path';
import pipe from './pipe';
import mkdir from './mkdir';
import remove from './remove';
import random from '../utils/random';

const targetDir = (function createRandomDir() {
  const testRoot = path.join(__dirname, '../test');
  const randomDir = () => {
    let name = '';
    // eslint-disable-next-line no-plusplus,id-length
    for (let i = 0; i < 30; i++) {
      name += String.fromCharCode(
        random('[', ']', 'a'.charCodeAt(0), 'z'.charCodeAt(0)),
      );
    }
    return name + random('[', ']', 1, 1000);
  };
  return path.join(testRoot, randomDir());
})();
beforeAll(async () => {
  await remove(targetDir);
  await mkdir(targetDir);
});

afterAll(async () => {
  await remove(targetDir);
});

describe('pipe', () => {
  it('pipe', () => {
    const srcFile = path.join(targetDir, 'srcFile');
    const destFile = path.join(targetDir, 'destFile');
    fs.writeFileSync(srcFile, 'my name is zcs');
    pipe(srcFile, destFile).then(() => {
      const value = fs.readFileSync(destFile, 'utf-8');
      expect(value).toBe('my name is zcs');
    });
  });
});
