/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-sass-guidelines',
    'stylelint-rscss/config',
    'stylelint-config-prettier',
  ],
  rules: {
    'selector-max-id': null,
    'no-duplicate-selectors': null,
    'selector-no-qualifying-type': null,
    'selector-class-pattern': null,
    'no-invalid-position-at-import-rule': null,
    'max-nesting-depth': null,
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
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
  },
}
