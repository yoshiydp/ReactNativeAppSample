module.exports = {
  extends: ["stylelint-config-recess-order", "stylelint-config-recommended-scss"],
  rules: {
    "selector-pseudo-element-colon-notation": "double",
    "scss/selector-no-union-class-name": true,
    "string-quotes": "double",
  },
  ignoreFiles: ["**/node_modules/**"],
};
