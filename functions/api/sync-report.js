export async function onRequestPost(context) {
  const BOT_TOKEN = "8582243470:AAERh_CDG__0aB1YLZQ_n5KN2MggwoWtYuY";
  const API_URL = "https://api.telegram.org/bot" + BOT_TOKEN;

  try {
    const body = await context.request.json();
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
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}
