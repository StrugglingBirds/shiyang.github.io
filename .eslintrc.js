module.exports = {
  parser: "babel-eslint",
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-debugger': 0,
    'vue/no-unused-components': 'off',
    // 其他所有规则都设置为"off"
  },
  extends: ['eslint:recommended']
};