import { type Config } from 'prettier';

export default {
  plugins: ['@prettier/plugin-pug'],
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
} satisfies Config;
