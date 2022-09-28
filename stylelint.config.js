/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-sass-guidelines',
    'stylelint-config-prettier',
  ],
  rules: {
    'selector-max-id': null,
    'no-duplicate-selectors': null,
    'selector-no-qualifying-type': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
  },
};
