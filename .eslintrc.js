module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'import'],
	parserOptions: {
		project: [
			'./tsconfig.json',
			'./packages/wapi.js/tsconfig.json',
			'./packages/component-generator/tsconfig.json'
		],
		// eslint-disable-next-line no-undef
		tsconfigRootDir: __dirname,
		sourceType: 'module',
		ecmaVersion: 2022
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx']
		},
		'import/resolver': {
			typescript: {
				project: ['./tsconfig.json']
			},
			node: true
		}
	},
	root: true,
	rules: {
		// Disallow legacy globals like `length`: https://github.com/microsoft/TypeScript/issues/18433
		'no-restricted-globals': [
			'error',
			'closed',
			'event',
			'fdescribe',
			'name',
			'length',
			'location',
			'parent',
			'top'
		],
		'no-empty-pattern': 'off',
		'no-inner-declarations': 'off',
		'no-console': 'error',
		'no-debugger': 'error',
		'no-alert': 'error',
		'no-useless-escape': 'error',
		'@typescript-eslint/require-await': 'error',
		'@typescript-eslint/no-misused-promises': 'error',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: ['variableLike'],
				format: ['UPPER_CASE', 'StrictPascalCase', 'strictCamelCase'],
				leadingUnderscore: 'allow'
			},
			{
				selector: ['typeLike'],
				format: ['StrictPascalCase']
			}
		],
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				fixStyle: 'inline-type-imports'
			}
		],
		'import/default': 'error',
		'import/no-self-import': 'error',
		'import/no-cycle': [
			'error',
			{
				maxDepth: 10,
				ignoreExternal: true
			}
		],
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/ban-types': 'error',
		'@typescript-eslint/ban-ts-comment': 'error',
		'@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
		'@typescript-eslint/no-inferrable-types': 'error',
		'@typescript-eslint/no-unnecessary-type-assertion': 'error',
		'@typescript-eslint/restrict-plus-operands': 'error',
		'no-multi-assign': 'error',
		'max-statements-per-line': [
			'error',
			{
				max: 1
			}
		],
		'no-case-declarations': 'error',
		'no-extra-boolean-cast': 'error',
		'prefer-const': 'error',
		'no-constant-condition': 'error',
		'@typescript-eslint/no-unsafe-return': 'error',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-unsafe-argument': 'error',
		'import/no-named-as-default-member': 'warn',
		'import/no-named-as-default': 'warn',
		'@typescript-eslint/no-unsafe-assignment': 'error',
		'@typescript-eslint/restrict-template-expressions': 'error',
		'@typescript-eslint/no-unsafe-call': 'error',
		'@typescript-eslint/no-unsafe-member-access': 'error'
	}
}
