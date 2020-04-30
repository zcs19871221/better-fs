import copy from './copy';
import path from 'path';
import fs from 'fs';
import random from '../utils/random';
import readDir from './readDir';
import remove from './remove';
import mkdir from './mkdir';
import writeFile from './writeFile';

const src = path.join(__dirname, '../testDir');
const file = path.join(src, 'dir1', 'dir3', 'file3');

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

describe('copy ', () => {
  it('src not exists', () => {
    expect(copy('fff://whatisfuck', __dirname)).resolves.toBe(undefined);
  });

  it('file to file', async () => {
    const dest = path.join(targetDir, 'file', 'file', 'sub2', 'a.js');
    await copy(file, dest);
    const content = fs.readFileSync(dest, 'utf-8');
    expect(content).toBe('// some thing');
  });

  it('copy file when target is dir', async () => {
    const dest = path.join(targetDir, 'filetodir', 'sub', 'sub2');
    await mkdir(dest);
    await copy(file, dest);
    const content = fs.readFileSync(path.join(dest, 'file3'), 'utf-8');
    expect(content).toBe('// some thing');
  });

  it('file to file no overwrite', async () => {
    const dest = path.join(targetDir, 'filetofileNoOverwriteFile.txt');
    fs.writeFileSync(dest, 'origin');
    await copy(file, dest);
    const content = fs.readFileSync(dest, 'utf-8');
    expect(content).toBe('origin');
  });

  it('file to dir no overwrite', async () => {
    const dest = path.join(targetDir, 'filetodirNoOverwrite', 'dir');
    await mkdir(dest);
    fs.writeFileSync(path.join(dest, 'file3'), 'origin');
    await copy(file, dest);
    const content = fs.readFileSync(path.join(dest, 'file3'), 'utf-8');
    expect(content).toBe('origin');
  });

  it('file to file overwrite', async () => {
    const dest = path.join(targetDir, 'filetofileOverwrite.txt');
    fs.writeFileSync(dest, 'origin');
    await copy(file, dest, { overwrite: true });
    const content = fs.readFileSync(dest, 'utf-8');
    expect(content).toBe('// some thing');
  });

  it('file to dir  overwrite', async () => {
    const dest = path.join(targetDir, 'filetodirOverwrite', 'file3');
    await mkdir(dest);
    fs.writeFileSync(path.join(dest, 'file3'), 'origin');
    await copy(file, dest, { overwrite: true });
    const content = fs.readFileSync(path.join(dest, 'file3'), 'utf-8');
    expect(content).toBe('// some thing');
  });

  it('dir to dir', async () => {
    const dest = path.join(targetDir, 'dirtodir', 'subDIr', 'sub2');
    const target = path.join(dest, 'testDir');
    await copy(src, dest);
    const [, tree] = await readDir(target);
    tree.child.sort((a, b) => (a.locate < b.locate ? 1 : -1));
    const _tree = tree.child.find((each) => each.child);
    _tree.child.sort((a, b) => (a.locate < b.locate ? 1 : -1));
    expect(tree).toEqual({
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
          ].sort((a, b) => (a.locate < b.locate ? 1 : -1)),
        },
      ].sort((a, b) => (a.locate < b.locate ? 1 : -1)),
    });
  });

  it('dir to dir filter', async () => {
    const dest = path.join(targetDir, 'dirtodir', 'filterDir', 'sub2');
    const target = path.join(dest, 'testDir');
    await copy(src, dest, {
      filter: (name, type) => {
        if (
          type === 'd' &&
          name.endsWith('dir2') === false &&
          name.endsWith('dir4') === false
        ) {
          return true;
        }
        if (name.endsWith('file3')) {
          return true;
        }
        return false;
      },
    });
    const [, tree] = await readDir(target);
    tree.child.sort((a, b) => (a.locate < b.locate ? 1 : -1));
    expect(tree).toEqual({
      locate: target,
      child: [
        {
          locate: path.join(target, 'dir1'),
          child: [
            {
              locate: path.join(target, 'dir1', 'dir3'),
              child: [
                {
                  locate: path.join(target, 'dir1', 'dir3', 'file3'),
                },
              ],
            },
          ],
        },
      ].sort((a, b) => (a.locate < b.locate ? 1 : -1)),
    });
  });

  it('dir to dir inner', async () => {
    const target = path.join(targetDir, 'innerDirSrc');
    await copy(src, target, {
      inner: true,
    });
    const [, tree] = await readDir(target);
    tree.child.sort((a, b) => (a.locate < b.locate ? 1 : -1));
    const _tree = tree.child.find((each) => each.child);
    _tree.child.sort((a, b) => (a.locate < b.locate ? 1 : -1));
    expect(tree).toEqual({
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
          ].sort((a, b) => (a.locate < b.locate ? 1 : -1)),
        },
      ].sort((a, b) => (a.locate < b.locate ? 1 : -1)),
    });
  });

  it('copy dir when target is a file', async () => {
    const targetFile = path.join(targetDir, 'dirtofile', 'sub', 'sub2', 'f.js');
    await writeFile(targetFile, 'nosense');
    await copy(src, targetFile);
    const target = path.join(targetDir, 'dirtofile', 'sub', 'sub2', 'testDir');
    const [, tree] = await readDir(target);
    tree.child.sort((a, b) => (a.locate < b.locate ? 1 : -1));
    const _tree = tree.child.find((each) => each.child);
    _tree.child.sort((a, b) => (a.locate < b.locate ? 1 : -1));
    expect(tree).toEqual({
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
          ].sort((a, b) => (a.locate < b.locate ? 1 : -1)),
        },
      ].sort((a, b) => (a.locate < b.locate ? 1 : -1)),
    });
  });
});
