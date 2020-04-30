/* eslint-disable no-plusplus,id-length,max-lines-per-function */
import path from 'path';
import fs from 'fs';
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

describe('mkdir', () => {
  it('mkdir recursive', async () => {
    const test = path.join(targetDir, 'a', 'b', 'c', 'd');
    await mkdir(test);
    expect(fs.existsSync(test)).toBe(true);
  });

  it('mkdir when exists', async () => {
    await mkdir(__dirname);
    expect(fs.existsSync(__dirname)).toBe(true);
  });

  it('mkdir when input is file', async () => {
    const target = path.join(targetDir, 'e', 'f', 'test.js');
    await mkdir(target);
    expect(fs.existsSync(target)).toBe(true);
  });
});
