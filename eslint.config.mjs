import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    {
        languageOptions: {
            parserOptions: { project: './tsconfig.json' }
        }
    },
    {
        files: ['eslint.config.mjs'],
        ...tseslint.configs.disableTypeChecked
    },
    prettierConfig,
    prettierPlugin
);
