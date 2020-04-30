module.exports = {
  extends: [
    'zcs/rules/best-practices',
    'zcs/rules/errors',
    'zcs/rules/node',
    'zcs/rules/style',
    'zcs/rules/variables',
    'zcs/rules/es6',
    'zcs/rules/imports',
    'prettier',
  ],
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    jest: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['^Src', './src'],
          ['^Common', './src/common'],
          ['^Domain', './src/domain'],
        ],
      },
    },
  },
};
