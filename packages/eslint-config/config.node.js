const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");
module.exports = {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  ignorePatterns: "**/*.d.ts",
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  parserOptions: {
    project: project,
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: project,
      },
      node: true,
    },
  },
  root: true,
  rules: {
    // Disallow legacy globals like `length`: https://github.com/microsoft/TypeScript/issues/18433
    "no-restricted-globals": [
      "error",
      "closed",
      "event",
      "fdescribe",
      "name",
      "length",
      "location",
      "parent",
      "top",
    ],
    "no-empty-pattern": "off",
    "no-debugger": "error",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: ["variableLike"],
        format: ["UPPER_CASE", "StrictPascalCase", "strictCamelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: ["typeLike"],
        format: ["StrictPascalCase"],
      },
    ],

    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        fixStyle: "inline-type-imports",
      },
    ],

    "import/default": "off",
    "import/no-self-import": "error",
    "import/no-cycle": [
      "warn",
      {
        maxDepth: 1,
        ignoreExternal: true,
      },
    ],

    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "use-local-storage-state",
            message:
              "Please use useLocalStorage form ~/hooks/use-local-storage instead",
            allowTypeImports: true,
          },
          {
            name: "dayjs",
            message: "Please use dayjs from ~/util/dayjs instead.",
            allowTypeImports: true,
          },
        ],
      },
    ],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/restrict-plus-operands": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-misused-promises": "warn",
    "@typescript-eslint/require-await": "warn",
    "@typescript-eslint/unbound-method": "off", // we don't use "this" anyway in the codebase. this adds unnecessary eslint warnings
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/triple-slash-reference": "warn",
    "no-multi-assign": "warn",
    "no-useless-escape": "warn",
    "max-statements-per-line": [
      "warn",
      {
        max: 1,
      },
    ],
    "import/no-named-as-default": "error",
    "import/no-named-as-default-member": "error",
    "no-case-declarations": "warn",
    "no-extra-boolean-cast": "warn",
    "prefer-const": "warn",
    "no-constant-condition": "warn",
    "no-inner-declarations": "warn",
    "no-alert": "warn",

    // ! turn it on later
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
  },
};
