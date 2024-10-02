module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
    "plugin:typescript-sort-keys/recommended",
  ],
  plugins: [
    "react",
    "eslint:recommended",
    "simple-import-sort",
    "sort-destructure-keys",
    "typescript-sort-keys",
  ],
  env: {
    jest: true,
  },
  rules: {
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Packages `react` related packages come first.
          ["^react", "^@?\\w"],
          // Internal packages.
          ["^(@)(/.*|$)"],
          // Side effect imports.
          ["^\\u0000"],
          // App parts
          [
            "^@api/*",
            "^@helpers/*",
            "^@components/*",
            "^@redux/*",
            "^@routes/*",
            "^@store/*",
            "^@views/*",
          ],
          // Parent imports. Put `..` last.
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          // Style imports.
          ["^.+\\.?(scss)$"],
        ],
      },
    ],
    "@typescript-eslint/no-var-requires": 0,
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "prettier/prettier": 0,
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-namespace": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "arrow-body-style": [2, "as-needed"],
    "no-use-before-define": 0,
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "import/no-default-export": 2,
    "import/no-extraneous-dependencies": 0,
    "import/namespace": "off",
    "simple-import-sort/exports": "error",
    "max-len": [
      2,
      140,
      {
        ignorePattern: "^(import|export)\\s.+\\sfrom\\s.+;$",
        ignoreUrls: true,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    quotes: [2, "double"],
    "react/prop-types": 0,
    "react/display-name": 0,
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@api/*", "./src/api/*"],
          ["@assets/*", "./src/assets/*"],
          ["@locales/*", "./src/locales/*"],
          ["@mocks/*", "./src/mocks/*"],
          ["@utils/*", "./src/utils/*"],
          ["@helpers/*", "./src/helpers/*"],
          ["@components/*", "./src/components/*"],
          ["@hooks/*", "./src/hooks/*"],
          ["@models/*", "./src/models/*"],
          ["@pages/*", "./src/pages/*"],
          ["@redux/*", "./src/redux/*"],
          ["@routes/*", "./src/routes/*"],
          ["@store/*", "./src/store/*"],
          ["@tools/*", "./src/tools/*"],
          ["@views/*", "src/views/*"],
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
    },
    react: {
      version: "detect",
    },
  },
};
