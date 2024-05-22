import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin-js';


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      eqeqeq: ["error", "smart"],
      '@stylistic/js/quotes' : ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true}],
    }
  }
];