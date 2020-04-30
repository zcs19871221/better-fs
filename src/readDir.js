const recursiveReadDir = require('./utils/recursiveReadDir');
const getStat = require('./getStat');

const readDir = async (dir, { filter } = {}) => {
  if (
    typeof dir !== 'string' ||
    !dir.trim() ||
    (filter && typeof filter !== 'function')
  ) {
    throw new Error('readDir参数错误');
  }
  dir = dir.trim();
  const stat = await getStat(dir);
  if (stat && stat.isDirectory()) {
    const [files, tree] = await recursiveReadDir({
      dir,
      filter,
    });
    return [files, tree];
  }
  return [];
};

module.exports = readDir;
