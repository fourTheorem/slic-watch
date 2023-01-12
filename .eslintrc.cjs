module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 0, // todo remove later complains for all js modules
    '@typescript-eslint/no-unused-vars': 0, // todo rmeove later
    'no-undef':0, // todo remove later
    '@typescript-eslint/no-empty-function': 0, //todo remove later logging.test.ts is failing
    '@typescript-eslint/ban-ts-comment': 0
  },
  ignorePatterns: ['core/coverage'],
}
