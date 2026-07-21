import { defineConfig, devices } from '@playwright/test';

// E2E-тести (HANDOFF §9) ганяються проти ЗІБРАНОГО сайту через `astro preview`,
// а не dev: інакше Pagefind-пошук порожній (індекс будує postbuild). webServer
// сам робить build+preview, тож `npx playwright test` працює з чистого дерева.
//
// Порт 4321 — той самий, що dev/preview Astro (HANDOFF §0). trailingSlash:'always'
// у astro.config → усі шляхи в тестах із хвостовим слешем.
const PORT = 4321;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run build && npm run preview',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
