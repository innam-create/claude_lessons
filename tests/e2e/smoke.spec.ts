import { test, expect } from '@playwright/test';

// Смоук: кожен розділ MVP-навігації віддається, має правильний заголовок і
// хлібні крихти (ТЗ §5.1). /clones/ навмисно НЕ включено — заблоковано музеєм
// (HANDOFF §7.1), сторінки ще немає.
// h1 як RegExp зі \s — стійко до nbsp у «ZX SPECTRUM» (HANDOFF §8).
const PAGES: { path: string; h1: RegExp }[] = [
  { path: '/', h1: /ZX\s*SPECTRUM/i },
  { path: '/history/', h1: /Історія/i },
  { path: '/models/', h1: /Моделі/i },
  { path: '/exhibits/', h1: /Експонати/i },
  { path: '/software/', h1: /Софт та ігри/i },
  { path: '/peripherals/', h1: /Периферія/i },
  { path: '/contacts/', h1: /Контакти/i },
  { path: '/search/', h1: /Пошук/i },
];

for (const { path, h1 } of PAGES) {
  test(`сторінка ${path} віддається з правильним h1`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status(), `HTTP-статус ${path}`).toBe(200);
    await expect(page.locator('h1').first()).toContainText(h1);
  });
}

test('внутрішні сторінки мають хлібні крихти з посиланням «Головна»', async ({ page }) => {
  await page.goto('/models/');
  const crumbs = page.locator('nav.crumbs');
  await expect(crumbs).toBeVisible();
  await expect(crumbs.getByRole('link', { name: 'Головна' })).toHaveAttribute('href', '/');
  // Останній елемент — поточна сторінка, aria-current="page", без посилання.
  await expect(crumbs.locator('.here')).toHaveText('Моделі');
});

test('EN-дзеркало працює: /en/ віддається англійською', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1').first()).toContainText('ZX SPECTRUM');
});

test('404 показує «R Tape loading error» і статус 404', async ({ page }) => {
  const res = await page.goto('/no-such-page-xyz/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('body')).toContainText(/R Tape loading error/i);
});
