module.exports = {
	root: true,
	env: { browser: true, es2020: true, jest: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"google",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh", "react", "@typescript-eslint"],
	rules: {
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
		"@typescript-eslint/explicit-function-return-type": 0,
		"@typescript-eslint/explicit-module-boundary-types": 0,
		"react/react-in-jsx-scope": 0,
		"import/no-anonymous-default-export": "off",
		"no-tabs": 0,
		indent: ["error", "tab"],
		"react/jsx-indent": ["error", "tab"],
		"react/jsx-indent-props": ["error", "tab"],
		"max-len": [
			"error",
			{
				code: 100,
				ignoreComments: true, //"comments": 80
				ignoreUrls: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
			},
		],
		"linebreak-style": "off",
	},
	settings: {
		react: {
			pragma: "React",
			version: "detect",
		},
	},
};