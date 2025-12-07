import { defineConfig } from 'vite';

export default defineConfig({
  base: '/moleApp/',
  build: {
    outDir: 'docs',
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/test/mocks/open-cells-mock.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'html'],
      reportsDirectory: './coverage',
    },
  },
});
