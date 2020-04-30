const path = require('path');
const mkdir = require('./mkdir');
const promiseFs = require('./utils/promiseFs');

const writeFile = async (...args) => {
  args = args.map(each => (typeof each === 'string' ? each.trim() : each));
  await mkdir(path.dirname(args[0]));
  await promiseFs.writeFile(...args);
};

module.exports = writeFile;
