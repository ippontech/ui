import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'cobertura', 'json'],
      clean: true,
      include: ['src/**/*'],
      thresholds: {
        'src/**/domain/**/*.{ts,tsx}': {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
      },
    },
  },
});
