/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:all', 'airbnb-base', 'prettier'],
  overrides: [],
  ignorePatterns: [
    'node_modules',
    'dist',
    'assets/js/vendors/**/*.js',
    'scripts',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
  },
}
