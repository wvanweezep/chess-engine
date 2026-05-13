import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "eslint-config-prettier",
    ),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        "no-constructor-return": "error",
        "no-self-compare": "error",
        "no-unreachable-loop": "error",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "error",
        "no-duplicate-imports": "warn",
        "no-template-curly-in-string": "warn",
        "no-unused-private-class-members": "off",
        "@typescript-eslint/no-unused-vars": ["warn"],
        "block-scoped-var": "error",
        "no-var": "error",
        "no-throw-literal": "off",
        "@typescript-eslint/only-throw-error": "error",
        "no-sequences": "error",
        "no-return-assign": "error",
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": "error",
        "no-array-constructor": "off",
        "@typescript-eslint/no-array-constructor": "error",
        "no-delete-var": "error",
        "no-eq-null": "error",
        "no-extra-boolean-cast": "error",
        eqeqeq: "error",

        complexity: ["warn", {
            max: 10,
        }],

        "prefer-const": "warn",
        "no-useless-return": "warn",
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": "warn",
        "no-useless-catch": "warn",
        "no-unneeded-ternary": "warn",
        "max-depth": "warn",

        "max-params": ["warn", {
            max: 6,
        }],

        "no-empty": ["warn", {
            allowEmptyCatch: true,
        }],

        "no-lone-blocks": "warn",
        "no-nested-ternary": "warn",
    },
}]);