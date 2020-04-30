const fsStat = require('./getStat');
const recursiveRemove = require('./utils/recursiveRemove');
const promiseFs = require('./utils/promiseFs');

module.exports = async function remove(target, { keeper } = {}) {
  if (
    typeof target !== 'string' ||
    !target.trim() ||
    (keeper && typeof keeper !== 'function')
  ) {
    throw new Error('remove参数错误');
  }
  const stat = await fsStat(target);
  if (!stat) {
    return;
  }
  if (!stat) {
    return;
  }
  if (stat.isDirectory()) {
    await recursiveRemove({ target, keeper });
  } else {
    await promiseFs.unlink(target);
  }
};
