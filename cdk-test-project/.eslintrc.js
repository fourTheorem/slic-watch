module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: [
    '@typescript-eslint'
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018
  },
  rules: {
    'no-new': 0
  },
  extends: [
    'standard-with-typescript'
  ]
}
