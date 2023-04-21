module.exports = {
  extends: ["stylelint-config-recess-order"],
  rules: {
    "selector-pseudo-element-colon-notation": "double",
    "scss/selector-no-union-class-name": true,
  },
  ignoreFiles: ["**/node_modules/**"],
};
