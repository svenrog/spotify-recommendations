module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],

  extends: [
    'plugin:@typescript-eslint/recommended',
    // If you use Prettier, uncomment the next line:
    // 'prettier',
  ],

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },

  rules: {
    // '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
  },
};