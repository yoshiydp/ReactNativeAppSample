module.exports = {
  plugins: ["stylelint-scss"],
  syntax: "scss",
  customSyntax: "postcss-scss",
  rules: {
    "scss/dollar-variable-pattern": "^[a-z]+([a-z0-9-]+[a-z0-9]+)?$",
    "scss/at-function-pattern": "^[a-z]+([a-z0-9-]+[a-z0-9]+)?$",
    "scss/at-mixin-pattern": "^[a-z]+([a-z0-9-]+[a-z0-9]+)?$",
    "selector-pseudo-element-colon-notation": "double",
    "scss/selector-no-union-class-name": true,
  },
  ignoreFiles: ["**/node_modules/**"],
};
