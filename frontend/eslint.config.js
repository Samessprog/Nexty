import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettierConfig from 'eslint-config-prettier'
import importX from 'eslint-plugin-import-x'

export default tseslint.config(
  { ignores: ['dist', 'node_modules', '.vite'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked, 
      ...tseslint.configs.stylisticTypeChecked,   
    ],
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
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': react,
      'jsx-a11y': jsxA11y,
      'import-x': importX,
    },
    settings: {
      react: { version: '19.0' }, 
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs['recommended'].rules,
      ...react.configs['jsx-runtime'].rules,
      ...jsxA11y.configs.recommended.rules,

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/prop-types': 'off', 
      'react/jsx-no-leaked-render': ['error', { validStrategies: ['coerce', 'ternary'] }],

      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error', 
      '@typescript-eslint/no-explicit-any': 'warn',
      
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  prettierConfig, 
)