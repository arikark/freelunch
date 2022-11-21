module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'prettier',
    '@typescript-eslint',
    'unused-imports',
    'simple-import-sort',
    'jest',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
  ],
  rules: {
    'new-cap': 'off',
    'import/no-unresolved': 0,
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
