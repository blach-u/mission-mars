import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      'max-len': ['error', { code: 160 }],
      'no-unused-vars': ['warn'],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-single'],
      'eol-last': ['error', 'always'],
      'indent': ['error', 2],
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
