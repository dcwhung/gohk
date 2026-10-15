import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

const MAX_FUNCTION_LINES = 30;
const ALLOWED_MAGIC_NUMBERS = [-1, 0, 1, 2];

export default tseslint.config(
    { ignores: ['dist/**', 'coverage/**', 'node_modules/**', 'public/**'] },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
        },
        rules: {
            'max-lines-per-function': [
                'warn',
                { max: MAX_FUNCTION_LINES, skipBlankLines: true, skipComments: true },
            ],
            'no-magic-numbers': [
                'warn',
                {
                    ignore: ALLOWED_MAGIC_NUMBERS,
                    ignoreArrayIndexes: true,
                    enforceConst: true,
                    detectObjects: false,
                },
            ],
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        },
    },
    {
        files: ['tests/**/*.ts', '*.config.{ts,js}'],
        rules: {
            'no-magic-numbers': 'off',
            'max-lines-per-function': 'off',
        },
    },
    prettier,
);
