import { test, expect } from '@playwright/test';

// Адаптивність (HANDOFF §8): 0 горизонтального скролу на нижній межі 320px і на
// десктопі 1280px. Критерій — documentElement.scrollWidth <= clientWidth.
// Це той самий діагноз, яким у §8 ловили піксельні заголовки, що малюються поза
// боксом (getBoundingClientRect їх не бачить, а scrollWidth — бачить).
const PATHS = ['/', '/history/', '/models/', '/exhibits/', '/software/', '/peripherals/', '/contacts/', '/search/'];
const WIDTHS = [320, 1280];

for (const width of WIDTHS) {
  for (const path of PATHS) {
    test(`без горизонтального скролу: ${path} @ ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      // <= (не ===): допускаємо субпіксельне округлення, але не реальний оверфлоу.
      expect(scrollWidth, `${path} @ ${width}px переповнює по горизонталі`).toBeLessThanOrEqual(clientWidth + 1);
    });
  }
}
