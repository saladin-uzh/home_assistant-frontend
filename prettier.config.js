export default {
  tabWidth: 2,
  arrowParens: 'avoid',
  objectWrap: 'preserve',
  semi: false,
  trailingComma: 'es5',
  singleAttributePerLine: true,
  singleQuote: true,
  useTabs: false,
  overrides: [
    {
      files: '*.globals.ts',
      options: {
        printWidth: 9999, // Effectively disables line wrapping for these files
      },
    },
  ],
}
