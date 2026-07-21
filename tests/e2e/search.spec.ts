import { test, expect } from '@playwright/test';

// Пошук Pagefind (ТЗ §5.2). Працює лише в зібраному сайті — тому webServer
// підіймає preview (HANDOFF §8). Індекс будує postbuild.

test('запит повертає результати', async ({ page }) => {
  await page.goto('/search/');
  await page.locator('#pf-input').fill('Spectrum');
  // Pagefind вантажиться й шукає асинхронно — web-first assertion сам дочекається.
  await expect(page.locator('a.pf-result').first()).toBeVisible();
  const count = await page.locator('a.pf-result').count();
  expect(count).toBeGreaterThan(0);
});

test('deep-link ?q= підхоплює запит і показує результати', async ({ page }) => {
  await page.goto('/search/?q=Sinclair');
  await expect(page.locator('#pf-input')).toHaveValue('Sinclair');
  await expect(page.locator('a.pf-result').first()).toBeVisible();
});

test('беззмістовний запит дає чесний стан «нічого не знайдено»', async ({ page }) => {
  await page.goto('/search/');
  await page.locator('#pf-input').fill('zzzxqwynotarealword');
  await expect(page.locator('#pf-status')).toContainText(/Нічого не знайдено/i);
  await expect(page.locator('a.pf-result')).toHaveCount(0);
});
