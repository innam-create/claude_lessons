import { test, expect, type Page } from '@playwright/test';

// Структуровані дані Schema.org / JSON-LD (ТЗ §9, PR #4). Перевіряємо не лише
// присутність, а й валідність JSON і правильність значень — бо саме тут легко
// тихо зламати розмітку, якої не видно на сторінці.
//
// Абсолютні URL у розмітці беруться з Astro.site (не з localhost preview), тож
// в очікуваннях — продакшн-origin.
const SITE = 'https://spectrum.sncmuseum.org';

/** Усі блоки JSON-LD сторінки, розпарсені (кине, якщо JSON невалідний). */
async function jsonLd(page: Page): Promise<any[]> {
  const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
  return raw.map((r) => JSON.parse(r));
}

const byType = (nodes: any[], type: string) => nodes.find((n) => n['@type'] === type);

test('головна (uk): Museum + WebSite, валідний JSON, без BreadcrumbList', async ({ page }) => {
  await page.goto('/');
  const nodes = await jsonLd(page);
  const types = nodes.map((n) => n['@type']);
  expect(types).toContain('Museum');
  expect(types).toContain('WebSite');
  expect(types).not.toContain('BreadcrumbList'); // на головній крихт немає

  const museum = byType(nodes, 'Museum');
  expect(museum['@id']).toBe(`${SITE}/#museum`);
  expect(museum.name).toBe('Software & Computer Museum');
  expect(museum.address['@type']).toBe('PostalAddress');
  expect(museum.address.addressCountry).toBe('UA');
  expect(museum.openingHours).toMatch(/Tu-Sa/);

  const site = byType(nodes, 'WebSite');
  expect(site.inLanguage).toBe('uk');
  expect(site.publisher['@id']).toBe(`${SITE}/#museum`); // звʼязок із музеєм
  expect(site.potentialAction['@type']).toBe('SearchAction');
  expect(site.potentialAction.target.urlTemplate).toBe(`${SITE}/search/?q={search_term_string}`);
});

test('головна (en): WebSite локалізований (inLanguage + пошук під /en/)', async ({ page }) => {
  await page.goto('/en/');
  const nodes = await jsonLd(page);
  const site = byType(nodes, 'WebSite');
  expect(site.inLanguage).toBe('en');
  expect(site.potentialAction.target.urlTemplate).toBe(`${SITE}/en/search/?q={search_term_string}`);
  // Музей — той самий @id, опис англійською.
  const museum = byType(nodes, 'Museum');
  expect(museum['@id']).toBe(`${SITE}/#museum`);
  expect(museum.description).toMatch(/first permanent museum/i);
});

test('Museum присутній site-wide (внутрішня сторінка теж має видавця)', async ({ page }) => {
  await page.goto('/contacts/');
  const nodes = await jsonLd(page);
  expect(nodes.map((n) => n['@type'])).toContain('Museum');
});

test('внутрішня сторінка: BreadcrumbList із коректними позиціями й абсолютними URL', async ({ page }) => {
  await page.goto('/models/');
  const nodes = await jsonLd(page);
  const bc = byType(nodes, 'BreadcrumbList');
  expect(bc, 'BreadcrumbList має бути на /models/').toBeTruthy();

  const items = bc.itemListElement;
  expect(items).toHaveLength(2);
  expect(items[0]).toMatchObject({ '@type': 'ListItem', position: 1, name: 'Головна', item: `${SITE}/` });
  expect(items[1]).toMatchObject({ position: 2, name: 'Моделі', item: `${SITE}/models/` });
});

test('картка моделі: BreadcrumbList на 3 рівні (Головна › Моделі › назва)', async ({ page }) => {
  await page.goto('/models/zx-spectrum-48k/');
  const nodes = await jsonLd(page);
  const bc = byType(nodes, 'BreadcrumbList');
  const items = bc.itemListElement;
  expect(items).toHaveLength(3);
  expect(items.map((i: any) => i.position)).toEqual([1, 2, 3]);
  expect(items[2].item).toBe(`${SITE}/models/zx-spectrum-48k/`);
  expect(items[2].name).toMatch(/48K/);
});

test('усі блоки JSON-LD на ключових сторінках — валідний JSON', async ({ page }) => {
  for (const path of ['/', '/en/', '/models/', '/contacts/', '/history/', '/models/zx-spectrum-48k/']) {
    await page.goto(path);
    const nodes = await jsonLd(page); // JSON.parse кине на будь-якому битому блоці
    expect(nodes.length, `${path} має хоч один JSON-LD`).toBeGreaterThan(0);
    for (const n of nodes) expect(n['@context']).toBe('https://schema.org');
  }
});
