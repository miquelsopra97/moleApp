import { defineConfig } from 'vite';

export default defineConfig({
  base: '/moleApp/',
  build: {
    outDir: 'docs',
  },
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'html'],
      reportsDirectory: './coverage',
    },
  },
});
