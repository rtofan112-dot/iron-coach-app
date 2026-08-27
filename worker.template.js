const BOT_TOKEN = "8582243470:AAERh_CDG__0aB1YLZQ_n5KN2MggwoWtYuY";
const API_URL = "https://api.telegram.org/bot" + BOT_TOKEN;
const B64_APP = "__B64_APP_PLACEHOLDER__";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Endpoint for Mini App to send sync reports directly to Telegram Chat
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

    const binary = atob(B64_APP);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const html = new TextDecoder("utf-8").decode(bytes);

    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};

async function handleTelegramMessage(msg, appUrl) {
  const chatId = msg.chat.id;
  const webAppUrl = appUrl.endsWith("/") ? appUrl : appUrl + "/";

  try {
    await fetch(API_URL + "/setChatMenuButton", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        menu_button: {
          type: "web_app",
          text: "🚀 Приложение",
          web_app: { url: webAppUrl }
        }
      })
    });
  } catch(e) {}

  await fetch(API_URL + "/sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "🦾 <b>Приветствую, коллега!</b>\n\nТвое персональное фитнес-приложение <b>IRON COACH ELITE</b> готово к работе!\n\n👇 <b>Нажми на кнопку ниже, чтобы открыть приложение:</b>",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🚀 Открыть Iron Coach", web_app: { url: webAppUrl } }]
        ]
      }
    })
  });
}
