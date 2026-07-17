// ТЗ §7.2 (тверде правило): жодне зображення не потрапляє в репозиторій без
// заповнених license, author, source_url, accessed. Збірка падає, якщо в
// будь-якому записі images[] бракує хоча б одного поля.
//
// Zod-схема (src/content.config.ts) — перша лінія: вона валить `astro build`,
// якщо поле відсутнє або має неправильний тип. Цей скрипт ловить те, чого схема
// побачити не може, і дає музею читабельний звіт замість стектрейсу Zod:
//
//   · зображення вказане в даних, але файлу немає на диску (і навпаки — сироти)
//   · джерело поза ієрархією ТЗ §7.1
//   · accessed із майбутнього або синтаксично неможлива дата (2026-02-31)
//
// ТЗ §2: CI не оцінює достовірність — він блокує технічні порушення.
// Чи справді автор той, кого вказано, вирішує відповідальна особа музею в ревʼю.
//
// Запуск: npm run check:licenses

import { readFileSync, readdirSync } from 'node:fs';
import { LICENSES, ALLOWED_SOURCES } from '../src/lib/licenses.ts';

const DATA = 'src/data/models.json';
const ASSETS = 'src/assets/models';
const REQUIRED = ['src', 'alt', 'license', 'author', 'source_url', 'accessed'];

const problems: string[] = [];
const used = new Set<string>();

function fail(where: string, msg: string) {
  problems.push(`  ${where}\n    → ${msg}`);
}

const models = JSON.parse(readFileSync(DATA, 'utf8'));
const onDisk = new Set(readdirSync(ASSETS));
const today = new Date().toISOString().slice(0, 10);

for (const model of models) {
  const images = model.images ?? [];

  if (!Array.isArray(images)) {
    fail(model.id, 'images має бути масивом (порожній = «Шукаємо фотографію»)');
    continue;
  }

  images.forEach((img: Record<string, unknown>, i: number) => {
    const where = `${model.id} › images[${i}]`;

    // 1. Обов'язкові поля (ТЗ §7.2). Порожній рядок = відсутнє поле.
    for (const field of REQUIRED) {
      const v = img[field];
      if (v === undefined || v === null || (typeof v === 'string' && !v.trim())) {
        fail(where, `бракує обов'язкового поля «${field}» (ТЗ §7.2)`);
      }
    }

    // 2. Alt обома мовами (ТЗ §10: змістовний alt для всіх зображень).
    const alt = img.alt as Record<string, string> | undefined;
    for (const lang of ['uk', 'en']) {
      if (alt && !alt[lang]?.trim()) fail(where, `порожній alt.${lang} (ТЗ §10)`);
    }

    // 3. Ліцензія з дозволеного переліку (ТЗ §14).
    if (img.license && !(LICENSES as readonly string[]).includes(img.license as string)) {
      fail(
        where,
        `ліцензія «${img.license}» не з переліку ТЗ §14.\n` +
          `      Дозволені: ${LICENSES.join(', ')}.\n` +
          `      Якщо ліцензія легітимна, але її немає в переліку — це рішення музею,\n` +
          `      а не привід підігнати значення. Див. src/lib/licenses.ts.`,
      );
    }

    // 4. Файл існує (інакше картка мовчки з'їде в стан «без фото»).
    if (typeof img.src === 'string' && img.src) {
      used.add(img.src);
      if (!onDisk.has(img.src)) fail(where, `файлу ${ASSETS}/${img.src} немає на диску`);
    }

    // 5. Джерело з ієрархії ТЗ §7.1.
    if (typeof img.source_url === 'string' && img.source_url) {
      let host = '';
      try {
        host = new URL(img.source_url).hostname;
      } catch {
        fail(where, `source_url не є валідним URL: ${img.source_url}`);
      }
      if (host && !(host in ALLOWED_SOURCES)) {
        fail(
          where,
          `джерело ${host} поза ієрархією ТЗ §7.1.\n` +
            `      Дозволені: ${Object.keys(ALLOWED_SOURCES).join(', ')}.\n` +
            `      World of Spectrum, Speccy.info тощо — джерела фактів, не зображень (§7.1).`,
        );
      }
    }

    // 6. accessed — реальна дата, не з майбутнього.
    const accessed = img.accessed as string | undefined;
    if (typeof accessed === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(accessed)) {
      // Date приймає 2026-02-31 і тихо зсуває на 03-03 — тому звіряємо назад.
      const parsed = new Date(accessed);
      if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== accessed) {
        fail(where, `accessed «${accessed}» — неіснуюча дата`);
      } else if (accessed > today) {
        fail(where, `accessed «${accessed}» у майбутньому (сьогодні ${today})`);
      }
    }
  });
}

// 7. Файли-сироти: лежать у репозиторії, але не згадані в даних — отже, їхня
// ліцензія ніде не задокументована. Для ТЗ §7.2 це те саме порушення.
for (const file of onDisk) {
  if (file.startsWith('.')) continue;
  if (!used.has(file)) {
    fail(`${ASSETS}/${file}`, 'файл не згадується в models.json — ліцензія не задокументована');
  }
}

const imageCount = models.reduce(
  (n: number, m: { images?: unknown[] }) => n + (m.images?.length ?? 0),
  0,
);

if (problems.length) {
  console.error(`\n✗ Перевірка ліцензій не пройдена (${problems.length}):\n`);
  console.error(problems.join('\n\n'));
  console.error('\nТЗ §7.2: жодне зображення не потрапляє в репозиторій без');
  console.error('license, author, source_url, accessed.\n');
  process.exit(1);
}

const withoutPhoto = models.filter((m: { images?: unknown[] }) => !m.images?.length).length;
console.log(
  `✓ Ліцензії: ${imageCount} зображень у ${models.length} моделях — усі поля заповнені.`,
);
if (withoutPhoto) {
  console.log(`  ${withoutPhoto} моделей без фото — стан «Шукаємо фотографію» (ТЗ §15).`);
}
