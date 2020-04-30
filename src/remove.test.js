const path = require('path');
const fs = require('fs');
const remove = require('./remove');
/* eslint-disable no-unused-vars */
const random = require('../utils/random');
const mkdir = require('./mkdir');
/* eslint-enable no-unused-vars */

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

describe('remove', () => {
  it('remove when empty', () => {
    expect(remove('e:/whatisthefuck')).resolves.toBe(undefined);
  });

  it('remove file', async () => {
    const file = path.join(targetDir, 'file.js');
    fs.writeFileSync(file, 'onefile');
    await remove(file);
    expect(fs.existsSync(file)).toBe(false);
  });

  it('remove directory', async () => {
    const root = path.join(targetDir, 'root');
    fs.mkdirSync(root);
    const fileInRoot = path.join(root, 'oneFile.js');
    fs.writeFileSync(fileInRoot, 'onefile');
    const dirInRoot = path.join(root, 'subDir');
    fs.mkdirSync(dirInRoot);
    expect(fs.existsSync(root)).toBe(true);
    expect(fs.existsSync(fileInRoot)).toBe(true);
    expect(fs.existsSync(dirInRoot)).toBe(true);
    await remove(root);
    expect(fs.existsSync(root)).toBe(false);
    expect(fs.existsSync(fileInRoot)).toBe(false);
    expect(fs.existsSync(dirInRoot)).toBe(false);
  });
});
