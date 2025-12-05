import { defineConfig } from 'vite';

export default defineConfig({
  base: '/moleApp/',
  build: {
    outDir: 'docs',
  },
  test: {
    environment: 'happy-dom',
  },
});
