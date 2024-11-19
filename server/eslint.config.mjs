import globals from 'globals';
import pluginJs from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],
    rules: {
      'max-len': ['error', { code: 160 }],
      'eol-last': ['error', 'always'],
      'jsx-quotes': ['error', 'prefer-single'],
      'indent': ['error', 4],
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/semi': ['error', 'always'],
      '@typescript-eslint/quotes': ['error', 'single'],
      '@typescript-eslint/no-explicit-any': ['warn'],
      '@typescript-eslint/explicit-module-boundary-types': ['warn'],
    },
  },

  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
    rules: {
      'no-unused-vars': ['warn'],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
    },
  },

  {
    languageOptions: {
      globals: globals.browser,
    },
  },

  pluginJs.configs.recommended,
];
