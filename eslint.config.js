// eslint.config.js
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    ignores: ['dist/', 'node_modules/'], // Игнорируем скомпилированные файлы
  },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Браузерные глобальные объекты
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        DOMParser: 'readonly',
        MutationObserver: 'readonly',
        Element: 'readonly',
        HTMLElement: 'readonly',
        Node: 'readonly',
        Event: 'readonly',
        CSS: 'readonly',
        getComputedStyle: 'readonly',
        navigator: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        Blob: 'readonly',
        AbortController: 'readonly',
        ReadableStream: 'readonly',
        XMLHttpRequest: 'readonly',
        IntersectionObserver: 'readonly',
        ShadowRoot: 'readonly',
        btoa: 'readonly',
        self: 'readonly',
        global: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        Intl: 'readonly',
        setImmediate: 'readonly',
        queueMicrotask: 'readonly',
        WorkerGlobalScope: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
    },
  },
]
