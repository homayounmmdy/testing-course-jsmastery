import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "plugin:prettier/recommended"),
  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          trailingComma: "es5",
          semi: true,
          tabWidth: 2,
          printWidth: 120,
          endOfLine: "auto",
          trailingComa: true,
          arrowParens: "always",
          plugins: ["prettier-plugin-tailwindcss"],
        },
      ],
    },
  },
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "components/ui/**"],
  },
];

export default eslintConfig;
