/** @type {import('prettier').Config} */
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  overrides: [
    {
      files: ['*.html'],
      options: {
        parser: 'go-template',
        printWidth: 120,
      },
    },
    {
      files: ['*.js'],
      options: {
        singleQuote: true,
        semi: false,
      },
    },
  ],
}
