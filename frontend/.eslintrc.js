module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'unused-imports',
    'simple-import-sort',
    'jest',
    'react-native',
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
    'react-native/react-native': true,
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*/tests/**/*'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    'no-underscore-dangle': 'off',
    'no-else-return': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'unused-imports/no-unused-imports-ts': 'warn',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-console': 'warn',
    'react/no-children-prop': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [['^react', '^@?\\w']],
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'no-param-reassign': 'off',
    'import/order': 'warn',
    'no-case-declarations': 'off',
    'import/extensions': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'react/require-default-props': 'off',
    'consistent-return': 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-unstable-nested-components': [
      'error',
      {
        allowAsProps: true,
      },
    ],
    'react/function-component-definition': [
      'off',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false,
        jsxSingleQuote: false,
      },
    ],
  },
}
