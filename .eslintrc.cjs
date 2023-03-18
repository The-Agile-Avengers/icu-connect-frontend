module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", 'unused-imports'],
  root: true,
  rules: {
    "no-unused-vars": 0,
    'unused-imports/no-unused-imports-ts': 2,
  },
};
