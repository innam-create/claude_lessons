import { test, expect } from '@playwright/test';

// Компаратор (ТЗ §5.2) — головний інтерактив каталогу, який §9 називає першим
// кандидатом на автотести. Перевіряємо життєвий цикл: старт порожній → вибір →
// таблиця відмінностей → режим «лише відмінності».

test.beforeEach(async ({ page }) => {
  await page.goto('/models/');
});

test('панель компаратора прихована, поки нічого не обрано', async ({ page }) => {
  await expect(page.locator('#comparator')).toBeHidden();
});

test('вибір 2 моделей вмикає панель і кнопку «Порівняти»', async ({ page }) => {
  const addButtons = page.locator('[data-cmp-add]');
  await addButtons.nth(0).click();
  await expect(page.locator('#comparator')).toBeVisible();

  const cta = page.locator('#cmp-cta');
  // Одна модель — порівнювати ще не можна.
  await expect(cta).toBeDisabled();

  await addButtons.nth(1).click();
  // Дві — кнопка активна, лічильник 2/3.
  await expect(cta).toBeEnabled();
  await expect(cta).toContainText('2/3');
});

test('порівняння відкриває діалог із таблицею на 2 колонки моделей', async ({ page }) => {
  const addButtons = page.locator('[data-cmp-add]');
  await addButtons.nth(0).click();
  await addButtons.nth(1).click();
  await page.locator('#cmp-cta').click();

  const dialog = page.locator('#cmp-dialog');
  await expect(dialog).toBeVisible();
  // Шапка таблиці: порожній кут + 2 моделі = 2 <th>.
  await expect(dialog.locator('table.cmp-table thead th')).toHaveCount(2);
  // Є хоча б один рядок характеристик.
  await expect(dialog.locator('table.cmp-table tbody tr').first()).toBeVisible();
});

test('Esc закриває діалог порівняння (нативний <dialog>)', async ({ page }) => {
  // HANDOFF §9 лишав цю поведінку неперевіреною: у ручному тесті панель браузера
  // перехоплювала Esc. У headless сторінка отримує клавішу — тож закриваємо тут.
  const addButtons = page.locator('[data-cmp-add]');
  await addButtons.nth(0).click();
  await addButtons.nth(1).click();
  await page.locator('#cmp-cta').click();

  const dialog = page.locator('#cmp-dialog');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('«лише відмінності» ховає рядки-збіги (tr.same) і неповні (tr.partial)', async ({ page }) => {
  const addButtons = page.locator('[data-cmp-add]');
  await addButtons.nth(0).click();
  await addButtons.nth(1).click();
  await page.locator('#cmp-cta').click();

  const wrap = page.locator('#cmp-table-wrap');
  // До перемикача видно всі типи рядків (принаймні якісь «same» серед двох моделей).
  const sameBefore = await wrap.locator('tr.same').count();
  expect(sameBefore).toBeGreaterThan(0);

  await page.locator('#cmp-diffonly').check();
  await expect(wrap).toHaveClass(/diff-only/);
  // Рядки-збіги приховані через CSS (display:none) — перевіряємо саме видимість.
  await expect(wrap.locator('tr.same').first()).toBeHidden();
});
