#!/usr/bin/env bash
#
# deploy.sh — локальний деплой spectrum.sncmuseum.org на VPS.
#
# Викочування rsync-over-SSH: збирає сайт локально й дзеркалить dist/ у
# /var/www/spectre на сервері. Запускається З ТВОГО боку (не з ефемерної
# сесії Claude Code, яка не має SSH-доступу до VPS).
#
# Що робить:
#   1. Перевіряє, що ти на чистій гілці main і синхронний з origin.
#   2. npm ci + npm run build (Astro + Pagefind-індекс у dist/).
#   3. Валідує, що dist/ зібрався коректно.
#   4. rsync dist/ → /var/www/spectre на сервері (дзеркалення з --delete).
#   5. Перевіряє живий домен (HTTPS, оновлений текст, редиректи, 404, sitemap).
#
# Запуск (з кореня репозиторію):
#   SSH_USER=твій_користувач bash scripts/deploy.sh
#
# Спершу безпечно прогнати «на суху» (нічого не запише на сервер):
#   SSH_USER=твій_користувач DRY_RUN=1 bash scripts/deploy.sh
#
# DNS, Caddyfile і редиректи /uk/*→/* тут НЕ чіпаються — вони на рівні хостингу.
#
set -euo pipefail

# ── Конфіг (усе перевизначається через env) ──────────────────────────────────
SSH_HOST="${SSH_HOST:-204.168.165.195}"
SSH_USER="${SSH_USER:?ВКАЖИ SSH-користувача: SSH_USER=... bash scripts/deploy.sh}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/spectre_deploy}"
SSH_PORT="${SSH_PORT:-22}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/spectre}"
DOMAIN="${DOMAIN:-https://spectrum.sncmuseum.org}"
BRANCH="${BRANCH:-main}"
DRY_RUN="${DRY_RUN:-0}"

say()  { printf '\n\033[1;36m▶ %s\033[0m\n' "$*"; }
ok()   { printf '\033[1;32m✅ %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m⚠️  %s\033[0m\n' "$*"; }
die()  { printf '\033[1;31m❌ %s\033[0m\n' "$*" >&2; exit 1; }

# Працюємо завжди з кореня репозиторію, звідки б скрипт не викликали.
cd "$(dirname "${BASH_SOURCE[0]}")/.."

# ── 0. Інструменти ───────────────────────────────────────────────────────────
say "0. Перевірка інструментів"
for c in git node npm rsync ssh curl; do
  command -v "$c" >/dev/null 2>&1 || die "не знайдено «$c» — встанови його"
done
[ -f "$SSH_KEY" ] || die "немає SSH-ключа: $SSH_KEY (вкажи інший через SSH_KEY=...)"
ok "усі інструменти й ключ на місці"

# ── 1. Стан репозиторію ──────────────────────────────────────────────────────
say "1. Перевірка гілки та робочого дерева"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || die "запусти з git-репозиторію"
current="$(git branch --show-current)"
[ "$current" = "$BRANCH" ] || die "ти на «$current», а треба «$BRANCH» (git checkout $BRANCH)"
[ -z "$(git status --porcelain)" ] || die "робоче дерево не чисте — закомить/сховай зміни перед деплоєм"
git fetch origin "$BRANCH"
git pull --ff-only origin "$BRANCH"
ok "гілка $BRANCH, чисто, синхронно з origin ($(git rev-parse --short HEAD))"

# ── 2. Збірка ────────────────────────────────────────────────────────────────
say "2. Збірка (npm ci + npm run build → dist/ з Pagefind)"
npm ci
npm run build
ok "збірку завершено"

# ── 3. Валідація dist/ ───────────────────────────────────────────────────────
say "3. Перевірка вмісту dist/"
[ -f dist/index.html ]        || die "dist/index.html відсутній — збірка неповна"
[ -f dist/clones/index.html ] || die "dist/clones/index.html відсутній"
[ -d dist/pagefind ]          || die "dist/pagefind/ відсутній — Pagefind-індекс не зібрався"
ok "dist/ валідний"

# ── 4. Rsync на сервер ───────────────────────────────────────────────────────
say "4. Викочування на $SSH_USER@$SSH_HOST:$REMOTE_DIR"
SSH_CMD="ssh -i $SSH_KEY -p $SSH_PORT -o StrictHostKeyChecking=accept-new"
RSYNC_FLAGS=(-az --delete --human-readable --info=stats1,progress2)
if [ "$DRY_RUN" = "1" ]; then
  RSYNC_FLAGS+=(--dry-run)
  warn "DRY-RUN: показую, що змінилось би, але НІЧОГО не записую на сервер"
fi
# Трейлінг-слеш у dist/ обов'язковий — синхронізуємо ВМІСТ теки, а не саму теку.
rsync "${RSYNC_FLAGS[@]}" -e "$SSH_CMD" dist/ "$SSH_USER@$SSH_HOST:$REMOTE_DIR/"
if [ "$DRY_RUN" = "1" ]; then
  warn "DRY-RUN завершено — перевірку живого домену пропускаю. Прибери DRY_RUN=1 для реального деплою."
  exit 0
fi
ok "rsync завершено"

# ── 5. Перевірка живого домену ───────────────────────────────────────────────
say "5. Перевірка $DOMAIN"
fail=0
check_code() { # url  очікуваний_код  опис
  local got; got="$(curl -fsS -o /dev/null -w '%{http_code}' -L --max-time 15 "$1" 2>/dev/null || true)"
  if [ "$got" = "$2" ]; then ok "$3 → $got"; else warn "$3 → отримано $got, очікував $2"; fail=1; fi
}
check_redirect() { # url  очікувана_ціль(підрядок)  опис
  local loc; loc="$(curl -fsSI --max-time 15 "$1" 2>/dev/null | awk 'tolower($1)=="location:"{print $2}' | tr -d '\r' || true)"
  if printf '%s' "$loc" | grep -q "$2"; then ok "$3 → $loc"; else warn "$3 → location «$loc», очікував ~«$2»"; fail=1; fi
}

check_code "$DOMAIN/"                  200 "головна (HTTPS)"
check_code "$DOMAIN/clones/"           200 "/clones/"
check_code "$DOMAIN/en/clones/"        200 "/en/clones/"
check_code "$DOMAIN/sitemap-index.xml" 200 "sitemap"
check_code "$DOMAIN/nonexistent-xyz/"  404 "неіснуюча сторінка → 404"
check_redirect "$DOMAIN/clones"        "/clones/" "trailingSlash (/clones → /clones/)"
check_redirect "$DOMAIN/uk/clones/"    "/clones/" "редирект /uk/* → /*"

echo
if [ "$fail" = "0" ]; then
  ok "ДЕПЛОЙ УСПІШНИЙ — усі перевірки пройдено"
else
  warn "Деплой виконано, але частина перевірок не зійшлася (див. ⚠️ вище). Перевір вручну (можливо, кеш CDN/Caddy)."
  exit 2
fi
