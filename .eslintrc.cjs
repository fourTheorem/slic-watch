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
    'no-multiple-empty-lines': 0, // todo remove later
    '@typescript-eslint/no-var-requires': 0, // todo remove later
    '@typescript-eslint/no-unused-vars': 0 , // todo remove later
    'quotes': 0,
    'semi': 0,
    'no-undef':0, // todo remove later
    '@typescript-eslint/no-empty-function': 0, //todo remove later
  },
  ignorePatterns: ['core/coverage'],
}


// module.exports = {
//   env: {
//     es2021: true,
//     node: true
//   },
//   extends: [
//     'standard'
//   ],
//   parserOptions: {
//     ecmaVersion: 12,
//     sourceType: 'module'
//   },
//   rules: {
//     'no-multiple-empty-lines': 0,
//     'quotes': 0,
//     'semi': 0,
//   }
// }



// module.exports = {
//   root: true,
//   env: {
//     node: true
//   },
//   plugins: [
//     '@typescript-eslint'
//   ],
//   extends: [
//     'standard-with-typescript',
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended",
//     "plugin:@typescript-eslint/recommended-requiring-type-checking",
//   ],
//   parserOptions: {
//     ecmaVersion: 2018,
//     parser: "@typescript-eslint/parser",
//     project: './core/tsconfig.eslint.json',
//     tsconfigRootDir: __dirname,
//     // sourceType: 'module',
//   },
//   rules: {
//     "@typescript-eslint/strict-boolean-expressions": 0,
//     "@typescript-eslint/explicit-function-return-type": 0,
//     "@typescript-eslint/restrict-plus-operands": 0,
//     "@typescript-eslint/restrict-template-expressions": 0,
//     "@typescript-eslint/no-var-requires": 0,
//     "@typescript-eslint/require-array-sort-compare": 0,
//     "@typescript-eslint/prefer-nullish-coalescing": 0,
//     "@typescript-eslint/array-type": 0,
//     "@typescript-eslint/no-use-before-define": 0,
//     "@typescript-eslint/type-annotation-spacing": 0,
//     "@typescript-eslint/prefer-optional-chain": 0,
//     "@typescript-eslint/comma-spacing": 0,
//     "@typescript-eslint/indent": 0,
//     "quotes": 0,
//     "@typescript-eslint/space-before-function-paren": 0,
//     "@typescript-eslint/keyword-spacing": 0,
//     "@typescript-eslint/consistent-type-definitions": 0,
//     "@typescript-eslint/no-unused-vars": 0,
//     "@typescript-eslint/no-unused-expressions": 0,
//     "@typescript-eslint/semi": 0,
//     "no-multiple-empty-lines": 0,
//     "no-trailing-spaces": 0,
//     "space-in-parens": 0,
//     "quote-props": 0,
//     "object-curly-spacing": 0,
//     "no-multi-spaces": 0,
//     "semi": 0
//   }
// }
