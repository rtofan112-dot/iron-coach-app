const BOT_TOKEN = "8582243470:AAERh_CDG__0aB1YLZQ_n5KN2MggwoWtYuY";
const API_URL = "https://api.telegram.org/bot" + BOT_TOKEN;
const B64_APP = "__B64_APP_PLACEHOLDER__";

// Реальная таблица лидеров (только зарегистрированные атлеты)
let globalLeaderboard = [];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

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

    // Отправка отчета тренеру
    if (url.pathname === "/api/sync-report" && request.method === "POST") {
      try {
        const body = await request.json();
        const chatId = body.chatId || body.userId;
        if (chatId && body.text) {
          await fetch(API_URL + "/sendMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: body.text,
              parse_mode: "HTML"
            })
          });
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

    // 1. Попытка отдать свежайший бандл с GitHub (Live Auto-Sync)
    try {
      const ghRes = await fetch("https://raw.githubusercontent.com/rtofan112-dot/iron-coach-app/main/bundle.html?v=" + Date.now(), {
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
  const text = msg.text || "";
  const v = Date.now();
  const webAppUrl = `${origin}/?v=${v}`;

  if (text.startsWith("/start") || text.startsWith("/app")) {
    const welcome = `🏋️‍♂️ <b>IRON COACH ELITE 2.0</b>\n\nТвой персональный научный AI-тренер и био-аналитическая система.\n\n• Программы А, Б, В и Свободный тренинг\n• Анатомический атлас и видео-траектории\n• Умная замена упражнений\n• Интерактивный календарь и зал рекордов\n• BMR/TDEE расчет и персональные нутрицевтики\n\n👇 <i>Нажми кнопку ниже для входа:</i>`;
    
    await fetch(API_URL + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: welcome,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⚡ ОТКРЫТЬ IRON COACH 2.0 ⚡", web_app: { url: webAppUrl } }]
          ]
        }
      })
    });
  }
}
