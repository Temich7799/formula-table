import tseslint from 'typescript-eslint';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierRecommendedPlugin from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

export default tseslint.config(
  tseslint.configs.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  prettierRecommendedPlugin,
  { ignores: ['**/build/**', '**/node_modules/**'] },
  {
    files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}', '*.{js}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        JSX: 'writable',
        React: 'writable',
        ...Object.fromEntries(
          Object.entries(globals.browser).map(([key, value]) => [key.trim(), value]),
        ),
        ...Object.fromEntries(
          Object.entries(globals.node).map(([key, value]) => [key.trim(), value]),
        ),
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        projectService: true,
        sourceType: 'module',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      reactPlugin: reactPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'warn',
      'react/prop-types': 'off',
      'prettier/prettier': [
        'error',
        {
          parser: 'flow',
          singleQuote: true,
          trailingComma: 'none',
        },
      ],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          ignoreCase: true,
          reservedFirst: true,
          shorthandFirst: true,
        },
      ],
    },
  },
);
