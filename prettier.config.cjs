/** @type {import('prettier').Config} */
module.exports = {
  // Specify the line length that the printer will wrap on.
  printWidth: 80,
  // Specify the number of spaces per indentation-level.
  tabWidth: 2,
  // Print semicolons at the ends of statements.
  semi: true,
  // Use single quotes instead of double quotes.
  singleQuote: true,
  // Use single quotes in JSX.
  jsxSingleQuote: false,
  // Print trailing commas wherever possible.
  trailingComma: 'es5',
  // Print spaces between brackets in object literals.
  bracketSpacing: true,
  // Put the `>` of a tag at the next line.
  bracketSameLine: false,
  // By default, Prettier will wrap markdown text as-is since some services use
  // a linebreak-sensitive renderer. In some cases you may want to rely on
  // editor/viewer soft wrapping instead, so this option allows you to opt out.
  proseWrap: 'preserve',
  // Include parentheses around a sole arrow function parameter.
  arrowParens: 'always',
  // Provide ability to support new languages to prettier.
  plugins: ['prettier-plugin-tailwindcss'],
  // How to handle whitespaces in HTML.
  htmlWhitespaceSensitivity: 'css',
  // Whether or not to indent the code inside <script> and <style> tags in Vue files.
  vueIndentScriptAndStyle: true,
  // Enforce single attribute per line in HTML, Vue and JSX.
  singleAttributePerLine: true,
};
