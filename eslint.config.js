export default [
  {
    ignores: ["node_modules/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      // Disable broken resolver for node modules
      "import/no-unresolved": "off",
    },
  },
];
