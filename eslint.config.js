import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import html from 'eslint-plugin-html';
import lit from 'eslint-plugin-lit';

export default [
  // Reglas básicas de JS
  js.configs.recommended,

  {
    files: ['**/*.{js,ts}'],
    ignores: ['node_modules', 'dist', 'docs', 'coverage', 'public', 'vite.config.js.timestamp-*'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },

      globals: {
        window: 'readonly',
        document: 'readonly',
        CustomEvent: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLSelectElement: 'readonly',
        HTMLAudioElement: 'readonly',
        MouseEvent: 'readonly',
        PointerEvent: 'readonly',
        DocumentFragment: 'readonly',
        Audio: 'readonly',
        localStorage: 'readonly',
        navigator: 'readonly',
        CSSStyleSheet: 'readonly',
        MutationObserver: 'readonly',
        Event: 'readonly',
        customElements: 'readonly',
        CustomElementConstructor: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        history: 'readonly',
        location: 'readonly',
        self: 'readonly',
        caches: 'readonly',
        requestAnimationFrame: 'readonly',
        HTMLButtonElement: 'readonly',
      },
    },

    plugins: {
      '@typescript-eslint': tseslint,
      html,
      lit,
    },

    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'lit/no-invalid-html': 'warn',
      'lit/no-duplicate-template-bindings': 'error',
      'no-prototype-builtins': 'warn',
    },
  },
  prettier,
];
