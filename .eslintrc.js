module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "prettier/prettier": "error",
    "space-infix-ops": 0,
    "@typescript-eslint/space-infix-ops": 1,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-non-null-assertion": 1,
  },
};
