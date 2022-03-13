/* eslint-disable */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:json/recommended'
  ],
  globals: {
    atom: "readonly",
    require: true
  },
  ignorePatterns: [
    'test/**/*'
  ],
  "overrides": [
    {
      "files": ["tsconfig.json"],
      "rules": {
        "json/*": ["error", "allowComments"]
      }
    }
  ],
  rules: {
    // temporary
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off"

  }
};

