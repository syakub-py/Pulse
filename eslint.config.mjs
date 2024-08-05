import path from "node:path";
import globals from "globals";
import eslint from "@eslint/js";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: eslint.configs.recommended,
	allConfig: eslint.configs.all
});

export default [
	...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react/recommended"),
	{
		plugins: {
			"@typescript-eslint": typescriptEslint,
			react
		},
		languageOptions: {
			globals: {
				...globals.node,
			},
			ecmaVersion: "latest",
			sourceType: "module",
		},
		rules: {
			"indent": [
				"error",
				"tab"
			],
			"linebreak-style": ["error", "unix"],
			"quotes": [
				"error",
				"double"
			],
			"semi": [
				"error",
				"always"
			],
			"react/react-in-jsx-scope": "off",
		}
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: ["./tsconfig.json"]
			},
		},
		rules: {
			"@typescript-eslint/no-unnecessary-condition": "warn",
			"@typescript-eslint/no-floating-promises": "warn",
			"@typescript-eslint/no-require-imports": "off",
			"@typescript-eslint/no-unused-vars": "off"
		},
	},
];
