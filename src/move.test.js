const fs = require('fs');
const path = require('path');
const move = require('./move');
const random = require('../utils/random');
const copy = require('./copy');
const remove = require('./remove');
const mkdir = require('./mkdir');

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
  await mkdir(targetDir);
});

afterAll(async () => {
  await remove(targetDir);
});

describe('move', () => {
  it('move', async () => {
    const toMove = path.join(targetDir, 'toMoveDir');
    const dest = path.join(targetDir, 'dest');
    await copy(path.join(__dirname, '../testDir'), toMove);
    await move(toMove, dest);
    expect(fs.existsSync(dest)).toBe(true);
  });
});
