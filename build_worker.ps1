$htmlPath = 'C:\Users\r.tofan\.gemini\antigravity\scratch\asutp-fitness-app\index.html'
$workerPath = 'C:\Users\r.tofan\.gemini\antigravity\scratch\asutp-fitness-app\worker.js'

$bytes = [System.IO.File]::ReadAllBytes($htmlPath)
$b64 = [Convert]::ToBase64String($bytes)

$template = @"
const BOT_TOKEN = "8582243470:AAERh_CDG__0aB1YLZQ_n5KN2MggwoWtYuY";
const API_URL = "https://api.telegram.org/bot" + BOT_TOKEN;
const HTML_B64 = "###B64###";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "POST") {
      try {
        const update = await request.json();
        if (update.message) {
          await handleTelegramMessage(update.message, url.origin);
        }
      } catch (err) {}
      return new Response("OK", { status: 200 });
    }

    const binary = atob(HTML_B64);
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
      text: "🦾 <b>Приветствую, коллега!</b>\n\nТвое персональное фитнес-приложение <b>ASU-TP Iron Coach</b> готово!\n\n👇 <b>Нажми на большую кнопку ниже, чтобы открыть красивый интерфейс:</b>",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🚀 Открыть Iron Coach App", web_app: { url: webAppUrl } }]
        ]
      }
    })
  });
}
"@

$code = $template.Replace("###B64###", $b64)
[System.IO.File]::WriteAllText($workerPath, $code, [System.Text.Encoding]::UTF8)
Write-Host "Worker generated successfully! Size: " $code.Length
