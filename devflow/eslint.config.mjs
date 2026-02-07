import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  // Next.js rules
  ...nextVitals,
  ...nextTs,

  // Disable formatting rules (Prettier owns formatting)
  prettier,

  // Ignore build output
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "components/ui/**/*",
    "**/*.css",
  ]),

  // Custom production rules
  {
    plugins: {
      import: importPlugin,
    },

    rules: {
      
      // Import order
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          pathGroups: [
            {
              pattern: "@app/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
        },
      ],

      // JS best practices
      eqeqeq: "error",
      "no-var": "error",
      "prefer-const": "error",
      "object-shorthand": "error",

      // Let TS handle these
      "no-unused-vars": "off",
      "no-undef": "off",

      // Prettier owns commas
      "comma-dangle": "off",
    },
  },

  // TS-specific overrides
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-undef": "off",
    },
  },
]);
