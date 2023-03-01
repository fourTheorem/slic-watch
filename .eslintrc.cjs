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
    '@typescript-eslint/no-var-requires': 0, // todo remove later complains for all js modules
    'no-undef': 0, // todo remove later
    '@typescript-eslint/ban-ts-comment': 0, // todo remove ts-ignore in modules and remove this rule
    '@typescript-eslint/no-explicit-any': 0, // used for dimensions value
    '@typescript-eslint/no-base-to-string': 0,
    '@typescript-eslint/consistent-type-imports': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/prefer-nullish-coalescing': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/restrict-plus-operands': 0,
    '@typescript-eslint/type-annotation-spacing': 0,
    '@typescript-eslint/consistent-type-assertions': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/prefer-ts-expect-error': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    'no-template-curly-in-string': 0,
    '@typescript-eslint/require-array-sort-compare': 0,
    '@typescript-eslint/space-infix-ops': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/space-before-function-paren': 0,
    '@typescript-eslint/prefer-optional-chain': 0,
    '@typescript-eslint/consistent-indexed-object-style': 0,
    '@typescript-eslint/no-redeclare': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/array-type': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/promise-function-async': 0
  },
  ignorePatterns: ['core/coverage',
    'serverless-plugin/dist/index.js',
    'cf-macro/dist/index.js'
  ]
}
