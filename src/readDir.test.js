/* eslint-disable id-length */
/* eslint-disable max-lines-per-function */
const path = require('path');
const readDir = require('./readDir');
/* eslint-disable no-unused-vars */
const recursiveReadDir = require('./utils/recursiveReadDir');
const getStat = require('./getStat');
/* eslint-enable no-unused-vars */

const target = path.join(__dirname, '../testDir');
describe('readDir', () => {
  it('readDir', async () => {
    const [files, trees] = await readDir(target);
    expect(files.sort()).toEqual(
      [
        path.join(target, 'file.js'),
        path.join(target, 'file1.js'),
        path.join(target, 'dir1', 'dir3', 'file3'),
      ].sort(),
    );
    trees.child.sort((a, b) => a.locate < b.locate);
    const _tree = trees.child.find(each => each.child);
    _tree.child.sort((a, b) => a.locate < b.locate);
    expect(trees).toEqual({
      locate: target,
      child: [
        {
          locate: path.join(target, 'file.js'),
        },
        {
          locate: path.join(target, 'file1.js'),
        },
        {
          locate: path.join(target, 'dir1'),
          child: [
            {
              locate: path.join(target, 'dir1', 'dir2'),
              child: [],
            },
            {
              locate: path.join(target, 'dir1', 'dir3'),
              child: [
                {
                  locate: path.join(target, 'dir1', 'dir3', 'file3'),
                },
              ],
            },
            {
              locate: path.join(target, 'dir1', 'dir4'),
              child: [
                {
                  locate: path.join(target, 'dir1', 'dir4', 'dir5'),
                  child: [],
                },
              ],
            },
          ].sort((a, b) => a.locate < b.locate),
        },
      ].sort((a, b) => a.locate < b.locate),
    });
  });
});

describe('readDir with filter with name', () => {
  it('readDir', async () => {
    const [files] = await readDir(target, {
      filter: name => {
        return name.endsWith('.js');
      },
    });
    expect(files.sort()).toEqual(
      [path.join(target, 'file.js'), path.join(target, 'file1.js')].sort(),
    );
  });
});

describe('readDir with filter async', () => {
  it('readDir', async () => {
    const [files] = await readDir(target, {
      filter: async name => {
        // eslint-disable-next-line global-require
        const value = await require('fs').promises.readFile(name, 'utf-8');
        return value.includes('some thing');
      },
    });
    expect(files.sort()).toEqual(
      [path.join(target, 'dir1', 'dir3', 'file3')].sort(),
    );
  });
});
