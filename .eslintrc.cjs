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
    'no-undef':0, // todo remove later
    '@typescript-eslint/ban-ts-comment': 0 //todo remove ts-ignore in modules and remove this rule
  },
  ignorePatterns: ['core/coverage'],
}
