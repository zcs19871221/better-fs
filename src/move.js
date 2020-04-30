const { promisify } = require('util');
const path = require('path');
const fs = require('graceful-fs');
const getStat = require('./getStat');
const mkdir = require('./mkdir');

const rename = promisify(fs.rename);
const move = async (src, dest) => {
  if (!src || !dest || src === dest) {
    return;
  }
  const srcStat = await getStat(src);
  const destStat = await getStat(dest);
  if (!srcStat || destStat) {
    return;
  }
  if (srcStat.isDirectory()) {
    await mkdir(path.dirname(dest));
  }
  await rename(src, dest);
};

module.exports = move;
