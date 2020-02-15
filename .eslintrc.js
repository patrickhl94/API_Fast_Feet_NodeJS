module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrauBuffer: 'readonly'
  },
  parseOptions: {
    ecmaVersion: 2018,
    surceType: 'module',
  },
  rules: {
    "prettier/prettier" : "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "camelcase": "off",
    "no-unused-vars" : ["error", { "argdIgnorePAtter": "next" }],
    "linebreak-style": 0,
    "global-require": 0,
  }

}