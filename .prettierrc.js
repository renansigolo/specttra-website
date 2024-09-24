/** @type {import('prettier').Config} */
module.exports = {
  plugins: ['prettier-plugin-go-template', 'prettier-plugin-tailwindcss'],
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
