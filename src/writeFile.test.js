/* eslint-disable no-plusplus,id-length,max-lines-per-function,import/order */
const writeFile = require('./writeFile');
/* eslint-disable no-unused-vars */
const path = require('path');
const fs = require('fs');
const mkdir = require('./mkdir');
const remove = require('./remove');
/* eslint-enable no-unused-vars */

const random = require('../utils/random');

const targetDir = (function createRandomDir() {
  const testRoot = path.join(__dirname, '../test');
  const randomDir = () => {
    let name = '';
    // eslint-disable-next-line no-plusplus,id-length
    for (let i = 0; i < 30; i++) {
      name += String.fromCharCode(
        random('[', ']', 'a'.charCodeAt(), 'z'.charCodeAt()),
      );
    }
    return name + random('[', ']', 1, 1000);
  };
  return path.join(testRoot, randomDir());
})();
beforeAll(async () => {
  await remove(targetDir);
});

afterAll(async () => {
  await remove(targetDir);
});

describe('writeFile', () => {
  it('writeFile when dir not exists', async () => {
    const target = path.join(targetDir, 'newFile');
    await writeFile(target, 'abcdef', 'utf-8');
    expect(fs.readFileSync(target, 'utf-8')).toBe('abcdef');
  });
});
