module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:lit/recommended",
    "plugin:html/recommended",
    "prettier"
  ],
  rules: {
    "no-unused-vars": "warn",
    "no-console": "warn",
    "lit/no-invalid-html": "warn"
  }
};
