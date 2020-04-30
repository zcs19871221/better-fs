const copy = require('./copy');
const getStat = require('./getStat');
const mkdir = require('./mkdir');
const pipe = require('./pipe');
const readDir = require('./readDir');
const remove = require('./remove');
const writeFile = require('./writeFile');
const { readFile } = require('./utils/promiseFs');

module.exports = {
  copy,
  getStat,
  mkdir,
  pipe,
  readDir,
  remove,
  writeFile,
  readFile,
};
