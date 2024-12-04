import eslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintParser from '@typescript-eslint/parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: eslintParser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': eslintPlugin
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'spaced-comment': 'warn',
      'no-param-reassign': 'error',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'array-callback-return': 'error',
      'default-case': 'error',
      'dot-location': ['error', 'property'],
      'no-empty-function': 'error',
      eqeqeq: 'error',

      // Typescript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-inferrable-types': 'off'
    }
  },
  eslintPluginPrettierRecommended
];
