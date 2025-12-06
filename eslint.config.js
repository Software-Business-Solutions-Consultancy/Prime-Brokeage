import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'no-unused-vars': 'off',
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      // Turn off base no-unused-vars rule (let TypeScript version handle it)
      // 'no-unused-vars': 'off',

      // Configure TypeScript unused vars rule to allow React hooks
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: 'React|use[A-Z].*',
        },
      ],

      // For SVG attributes in JSX
      'react/no-unknown-property': [
        'error',
        {
          ignore: ['strokeLinecap', 'strokeLinejoin', 'stroke-width'],
        },
      ],

      // Other rules you want to disable
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-var': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  }
);
