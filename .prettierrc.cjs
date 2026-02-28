module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  plugins: [],
  overrides: [
    {
      files: '*.{js,jsx,ts,tsx}',
      options: {
        parser: 'babel-ts',
      },
    },
  ],
};
