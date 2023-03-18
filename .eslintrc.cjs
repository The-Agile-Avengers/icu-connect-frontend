module.exports = {
  extends: [
    //"strict",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", 'unused-imports'],
  root: true,
  rules: {
    "no-unused-vars": 1,
    'unused-imports/no-unused-imports-ts': 1,
    "arrow-body-style": ["error", "as-needed"],
    "react/self-closing-comp": ["error", { "component": true, "html": true }],
    "indent": [2, 2]
  },
};
