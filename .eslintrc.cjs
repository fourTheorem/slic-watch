module.exports = {
  root: true,
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'standard-with-typescript'
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018
  },
  rules: {
    'no-template-curly-in-string': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/consistent-type-assertions': 0,
    '@typescript-eslint/restrict-plus-operands': 0,
    '@typescript-eslint/explicit-function-return-type': 0, // when there is function they return object?
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-base-to-string': 0,
    '@typescript-eslint/no-confusing-void-expression': 0
  },
  ignorePatterns: ['core/coverage',
    'serverless-plugin/dist/index.js',
    'cf-macro/dist/index.js'
  ]
}
