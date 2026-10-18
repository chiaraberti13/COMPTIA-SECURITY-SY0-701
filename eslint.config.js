import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  { ignores: [".vercel/**", "dist/**", "node_modules/**", "src/data.ts", "src/data.en.ts"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/offline/service-worker.js"],
    languageOptions: { globals: { ...globals.serviceworker, __OFFLINE_REVISION__: "readonly", __OFFLINE_FILES__: "readonly" } },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // The codebase leans on inference; an unused name is worth flagging, an
      // explicit `any` at an API boundary is not.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrors: "none" },
      ],
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  }
);
