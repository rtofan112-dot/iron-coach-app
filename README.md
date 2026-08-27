# ASU-TP Iron Coach PRO (Telegram WebApp)

Персональное тренировочное Full-Body приложение для Telegram Mini Apps, оптимизированное для инженеров АСУ ТП.

## Особенности:
- **S-Tier Full-Body система:** 2 основных дня (Вторник / Четверг) + 1 опциональный Recharge-день (Воскресенье).
- **Прямой ввод замеров тела:** живой интерактивный ввод и графики динамики.
- **Интерактивный тренажер вакуума:** 3 фазы дыхания (вдох / выдох / удержание 15-25с) со звуком и виброоткликом.
- **Расчет калорий в реальном времени:** учет тоннажа и метаболического эквивалента (MET + EPOC).
- **Экспорт данных для тренера:** 1-клик сводка профиля для разбора тренировок в чате.
- **Cloudflare Pages / Telegram WebApp ready:** автономная работа на Edge без задержек.

## Стек:
- HTML5 / Vanilla JavaScript (ES6+)
- Tailwind CSS (CDN)
- Web Audio API + Telegram Haptic Engine
- Cloudflare Pages Functions (`/functions/api/sync-report.js`)
