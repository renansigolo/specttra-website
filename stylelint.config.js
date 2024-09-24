/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-sass-guidelines',
  ],
  rules: {
    'selector-max-id': null,
    'no-duplicate-selectors': null,
    'selector-no-qualifying-type': null,
    'selector-class-pattern': null,
    'no-invalid-position-at-import-rule': null,
    'max-nesting-depth': null,
    '@stylistic/string-quotes': null,
    // Ignore rules conflicting with Tailwind
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'no-descending-specificity': null,
  },
}
