module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'standard'
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 0, // todo remove later complains for all js modules
    'no-undef': 0, // todo remove later
    '@typescript-eslint/ban-ts-comment': 0, // todo remove ts-ignore in modules and remove this rule
    '@typescript-eslint/no-explicit-any': 0 // used for dimensions value
  },
  ignorePatterns: ['core/coverage',
    'serverless-plugin/dist/index.js',
    'cf-macro/dist/index.js'
  ]
}
