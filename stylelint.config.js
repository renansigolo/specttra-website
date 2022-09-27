/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['stylelint-config-sass-guidelines', 'stylelint-config-prettier'],
  rules: {
    'selector-max-id': null,
    'selector-no-qualifying-type': null,
    'selector-class-pattern': null,
    'declaration-block-single-line-max-declarations': null,
  },
  ignoreFiles: ['node_modules/*', 'dist/*'],
};
