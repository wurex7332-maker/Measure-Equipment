import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

const vueFlat = pluginVue.configs['flat/essential'];
const vueConfigs = Array.isArray(vueFlat) ? vueFlat : [vueFlat];

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      'artifacts/**',
      '**/*.d.ts',
    ],
  },
  {
    ...js.configs.recommended,
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },
  ...tseslint.configs.recommended,
  ...vueConfigs,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: { ...globals.browser },
    },
  },
  {
    files: ['**/*.{ts,vue}'],
    rules: {
      // TypeScript 自身负责未定义标识符检查，避免与 vue 模板变量误报。
      'no-undef': 'off',
    },
  },
];
