/**
 * @type {import('prettier').Options}
 */
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: true,
  plugins: [],
  importOrder: ["^[a-z0-9@][^/]*$", "^@plasmohq/(.*)$", "^~(.*)$", "", "^[./]"],
  importOrderSeparation: false,
  importOrderSortSpecifiers: false,
  endOfLine: "lf",
  requirePragma: false,
  proseWrap: "preserve",
  overrides: [
    {
      files: "*.{md,markdown,mdown,mkd,mkdown,mdwn}",
      options: {
        parser: "markdown",
      },
    },
    {
      files: "*.scss",
      options: {
        parser: "scss",
        tabWidth: 2,
      },
    },
  ],
};
