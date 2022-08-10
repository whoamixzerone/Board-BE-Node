module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  Plugin: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
  },
};
