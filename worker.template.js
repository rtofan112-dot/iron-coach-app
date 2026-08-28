const BOT_TOKEN = "8582243470:AAERh_CDG__0aB1YLZQ_n5KN2MggwoWtYuY";
const API_URL = "https://api.telegram.org/bot" + BOT_TOKEN;
const B64_APP = "__B64_APP_PLACEHOLDER__";

// Реальная таблица лидеров и хранилище состояния
let globalLeaderboard = [];
let athleteStateStore = {};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Сохранение состояния атлета в облаке Cloudflare
    if (url.pathname === "/api/save-state" && request.method === "POST") {
      try {
        const body = await request.json();
        if (body.tgId && body.state) {
          athleteStateStore[body.tgId] = {
            state: body.state,
            updatedAt: Date.now()
          };
          return new Response(JSON.stringify({ ok: true, savedAt: Date.now() }), {
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Access-Control-Allow-Origin": "*"
            }
          });
        }
      } catch(e) {
        return new Response(JSON.stringify({ ok: false, error: e.message }), {
          status: 500,
          headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
        });
      }
    }

    // Загрузка состояния атлета из облака Cloudflare
    if (url.pathname === "/api/load-state" && request.method === "GET") {
      const tgId = url.searchParams.get("tgId");
      if (tgId && athleteStateStore[tgId]) {
        return new Response(JSON.stringify({ ok: true, state: athleteStateStore[tgId].state }), {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
      return new Response(JSON.stringify({ ok: false, message: "No state found" }), {
        status: 404,
        headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
      });
    }

    // Получение информации о версии и актуальной ревизии
    if (url.pathname === "/api/version") {
      return new Response(JSON.stringify({
        ok: true,
        version: "v2.10.0 PRO",
        buildTimestamp: Date.now(),
        changelog: [
          "Персональные занятия: График на Вторник / Четверг с целевым сплитом",
          "Интерактивный трекер Витаминов & Добавок с контролем насыщения и ИИ-врачом",
          "Динамический расчет КБЖУ, дефицита/профицита и нормы воды под любую цель",
          "Премиальный аудиодвижок 3.0: Боксерский гонг ринга, аккорд финиша, 3 режима",
          "Интерактивный выбор цели карточками при онбординге и яркая дата в календаре"
        ]
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0"
        }
      });
    }

    // Получение таблицы лидеров
    if (url.pathname === "/api/leaderboard" && request.method === "GET") {
      return new Response(JSON.stringify(globalLeaderboard), {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
    }

    // Синхронизация прогресса реального участника
    if (url.pathname === "/api/sync-leaderboard" && request.method === "POST") {
      try {
        const body = await request.json();
        if (body.tgId) {
          const idx = globalLeaderboard.findIndex(u => u.id === body.tgId);
          const userData = {
            id: body.tgId,
            name: body.name || "Атлет",
            xp: body.xp || 0,
            tonnage: body.tonnage || 0,
            streak: body.streak || 0,
            lastActive: "Сегодня"
          };

          if (idx >= 0) {
            globalLeaderboard[idx] = userData;
          } else {
            globalLeaderboard.push(userData);
          }
        }
        return new Response(JSON.stringify({ ok: true, leaderboard: globalLeaderboard }), {
          status: 200,
          headers: { "Content-Type": "application/json; charset=utf-8" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json; charset=utf-8" }
        });
      }
    }

    // Отправка персонального пуш-уведомления и отчетов в чат Telegram
    if ((url.pathname === "/api/send-push" || url.pathname === "/api/sync-report") && request.method === "POST") {
      try {
        const body = await request.json();
        let chatId = body.chatId || body.userId;
        if (!chatId && body.tgId) {
          const m = String(body.tgId).match(/\d+/);
          if (m) chatId = m[0];
        }

        if (chatId && body.text) {
          const payload = {
            chat_id: chatId,
            text: body.text,
            parse_mode: "HTML",
            reply_markup: body.withButton ? {
              inline_keyboard: [
                [{ text: "⚡ ОТКРЫТЬ IRON COACH ⚡", web_app: { url: `${url.origin}/?v=${Date.now()}` } }]
              ]
            } : undefined
          };

          const tgRes = await fetch(API_URL + "/sendMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });

          // Если парсер HTML Telegram вернул ошибку, отправляем очищенный plain text
          if (!tgRes.ok) {
            const plainText = body.text.replace(/<[^>]*>/g, '');
            await fetch(API_URL + "/sendMessage", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text: plainText,
                reply_markup: payload.reply_markup
              })
            });
          }
        }
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json; charset=utf-8" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json; charset=utf-8" }
        });
      }
    }

    if (request.method === "POST") {
      try {
        const update = await request.json();
        if (update.message) {
          await handleTelegramMessage(update.message, url.origin);
        }
      } catch (err) {}
      return new Response("OK", { status: 200 });
    }

    // 1. Попытка отдать свежайший бандл с GitHub (Live Zero-Cache Auto-Sync)
    try {
      let fetchUrl = "https://raw.githubusercontent.com/rtofan112-dot/iron-coach-app/main/bundle.html?v=" + Date.now();
      try {
        const commitRes = await fetch("https://api.github.com/repos/rtofan112-dot/iron-coach-app/commits/main", {
          headers: { "User-Agent": "Cloudflare-Worker" }
        });
        if (commitRes.ok) {
          const commitData = await commitRes.json();
          if (commitData && commitData.sha) {
            fetchUrl = `https://raw.githubusercontent.com/rtofan112-dot/iron-coach-app/${commitData.sha}/bundle.html`;
          }
        }
      } catch(ce) {}

      const ghRes = await fetch(fetchUrl, {
        headers: { "User-Agent": "Cloudflare-Worker" },
        cf: { cacheTtl: 0 }
      });
      if (ghRes.ok) {
        const ghHtml = await ghRes.text();
        if (ghHtml && ghHtml.includes("<!DOCTYPE html>")) {
          return new Response(ghHtml, {
            status: 200,
            headers: { 
              "Content-Type": "text/html; charset=utf-8",
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0",
              "Pragma": "no-cache",
              "Expires": "0",
              "Surrogate-Control": "no-store"
            }
          });
        }
      }
    } catch (e) {}

    // 2. Фолбэк на встроенный base64
    const binary = atob(B64_APP);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const html = new TextDecoder("utf-8").decode(bytes);

    return new Response(html, {
      status: 200,
      headers: { 
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0",
        "Pragma": "no-cache",
        "Expires": "0",
        "Surrogate-Control": "no-store"
      }
    });
  }
};

async function handleTelegramMessage(msg, origin) {
  const chatId = msg.chat.id;
  const fromUser = msg.from || {};
  const text = msg.text || "";
  const v = Date.now();
  const webAppUrl = `${origin}/?v=${v}`;
  const firstName = fromUser.first_name || "Атлет";
  const username = fromUser.username ? `@${fromUser.username}` : `ID: ${fromUser.id || chatId}`;

  // Регистрация в глобальном списке участников
  if (fromUser.id) {
    const existingIdx = globalLeaderboard.findIndex(u => u.id === fromUser.id);
    if (existingIdx === -1) {
      globalLeaderboard.push({
        id: fromUser.id,
        name: firstName,
        username: fromUser.username || "",
        xp: 0,
        tonnage: 0,
        streak: 0,
        lastActive: "Только что"
      });
    }
  }

  // Команда админской рассылки пуш-уведомлений: /broadcast <текст>
  if (text.startsWith("/broadcast") && text.length > 11) {
    const broadcastText = text.substring(11).trim();
    let sentCount = 0;
    for (const u of globalLeaderboard) {
      try {
        await fetch(API_URL + "/sendMessage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: u.id,
            text: `🔔 <b>УВЕДОМЛЕНИЕ ОТ ТРЕНЕРА</b>\n\n${broadcastText}\n\n👇 <i>Открыть приложение:</i>`,
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [{ text: "⚡ ОТКРЫТЬ IRON COACH ⚡", web_app: { url: webAppUrl } }]
              ]
            }
          })
        });
        sentCount++;
      } catch(e) {}
    }
    await fetch(API_URL + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `✅ Рассылка успешно отправлена ${sentCount} атлетам!`,
        parse_mode: "HTML"
      })
    });
    return;
  }

  if (text.startsWith("/update") || text.startsWith("/news") || text.startsWith("/changelog") || text.startsWith("/start") || text.startsWith("/app") || text.startsWith("/help")) {
    const isUpdateQuery = text.startsWith("/update") || text.startsWith("/news") || text.startsWith("/changelog");
    
    const caption = isUpdateQuery 
      ? `🚀 <b>ОФИЦИАЛЬНЫЙ РЕЛИЗ IRON COACH v2.8.26 PRO!</b>\n\n` +
        `🏛 <b>Главные обновления системы:</b>\n\n` +
        `📚 <b>1. База доказательной науки (Evidence-Based Sports Science):</b>\n` +
        `• В каждое упражнение подключены рецензируемые исследования (PubMed / JSCR / Sports Medicine / RP).\n` +
        `• <b>Maeo et al. (2022/2023):</b> Научно доказанная стретч-гипертрофия (+40% роста длинной головки трицепса из-за головы vs блочные жимы вниз!).\n` +
        `• <b>Pedrosa et al. (2022):</b> Угол 30° для максимальной гипертрофии ключичной части груди.\n` +
        `• <b>Brad Schoenfeld & Mike Israetel:</b> ЭМГ-активация волокон (% MVC) и расчет оптимального RIR.\n\n` +
        `📐 <b>2. 100% Уникальные векторные чертежи (Engine 4.0):</b>\n` +
        `• Индивидуальная геометрия оборудования, скамей и векторов движения для всех 48+ упражнений.\n\n` +
        `🔬 <b>3. 3-вкладочный модальный экран упражнения:</b>\n` +
        `• <code>[📐 Биомеханика]</code> — Векторный чертеж, 3 фазы движения (Спуск/Пауза/Выжим), анатомическая карта.\n` +
        `• <code>[📚 Наука & PubMed]</code> — Стретч-гипертрофия, таблица ЭМГ (% MVC) и цитаты с DOI-ссылками.\n` +
        `• <code>[✅ Чек-лист PRO]</code> — Ключи идеальной техники и опасные ошибки.\n\n` +
        `🔔 <b>4. Аутентичный боксерский колокол ринга:</b>\n` +
        `• Чистый трехкратный звон (Динь-Динь-Диинь) при окончании отдыха без вибрации.\n\n` +
        `⚡ <b>5. Мгновенная проверка ревизий и кэша:</b>\n` +
        `• Прямой Edge Worker API (0 мс задержка) и обновление билда в 1 клик.\n\n` +
        `👇 <b>Нажми кнопку ниже, чтобы открыть обновленный IRON COACH:</b>`
      : `🔥 <b>Привет, ${firstName}!</b> (${username})\n\n` +
        `Добро пожаловать в <b>IRON COACH ELITE v2.8.26 PRO</b> — твою персональную био-интеллектуальную систему тренировок и гипертрофии.\n\n` +
        `🏛 <b>Что внутри релиза v2.8.26 PRO:</b>\n` +
        `• <b>Доказательная наука (PubMed & JSCR):</b> ЭМГ-активация (% MVC), исследования Maeo, Schoenfeld, Pedrosa и расчет стретч-гипертрофии\n` +
        `• <b>3-вкладочный визуализатор:</b> Индивидуальные векторные чертежи оборудования, степпер фаз движения и чек-листы техники\n` +
        `• <b>Научный тренинг RP & MAV:</b> Защита ЦНС, адаптивная прогрессия нагрузок и умная замена упражнений\n` +
        `• <b>Боксерский таймер ринга:</b> Аутентичный трехкратный гонг окончания отдыха\n` +
        `• <b>Telegram CloudStorage:</b> Неубиваемое облачное сохранение всех замеров и тоннажа\n\n` +
        `👨‍💻 <b>Разработчик & Архитектор:</b>\n` +
        `<b>Роман Тофан</b> (@rtofan112)\n\n` +
        `👇 <b>Нажми кнопку ниже, чтобы войти:</b>`;

    const photoUrl = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop";

    try {
      const res = await fetch(API_URL + "/sendPhoto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          photo: photoUrl,
          caption: caption,
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [{ text: "⚡ ВОЙТИ В IRON COACH PRO ⚡", web_app: { url: webAppUrl } }]
            ]
          }
        })
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.description);
    } catch(err) {
      await fetch(API_URL + "/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: caption,
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [{ text: "⚡ ВОЙТИ В IRON COACH PRO ⚡", web_app: { url: webAppUrl } }]
            ]
          }
        })
      });
    }
  }
}
