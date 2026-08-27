const BOT_TOKEN = "8582243470:AAERh_CDG__0aB1YLZQ_n5KN2MggwoWtYuY";
const API_URL = "https://api.telegram.org/bot" + BOT_TOKEN;
const B64_APP = "__B64_APP_PLACEHOLDER__";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // AI Coach Live Endpoint
    if (url.pathname === "/api/ai-coach" && request.method === "POST") {
      try {
        const { prompt, athleteProfile } = await request.json();
        const aiResponse = await generateAICoachResponse(prompt, athleteProfile, env);
        return new Response(JSON.stringify({ ok: true, response: aiResponse }), {
          status: 200,
          headers: { 
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
          }
        });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json; charset=utf-8" }
        });
      }
    }

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
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
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

async function generateAICoachResponse(prompt, athlete, env) {
  const p = (prompt || "").trim();
  const name = athlete ? (athlete.name || "Роман") : "Роман";
  const age = athlete ? (athlete.age || 32) : 32;
  const weight = (athlete && athlete.currentMetrics && athlete.currentMetrics.weight) ? athlete.currentMetrics.weight : 83;
  const waist = (athlete && athlete.currentMetrics && athlete.currentMetrics.waist) ? athlete.currentMetrics.waist : 91.5;
  const height = (athlete && athlete.height) ? athlete.height : 178;
  const whtr = (waist / height).toFixed(2);
  const goal = athlete ? (athlete.goal || "Рекомпозиция") : "Рекомпозиция";
  const injuries = athlete ? (athlete.injuries || "Резекция левого легкого, спазм m. levator scapulae") : "Резекция левого легкого, спазм m. levator scapulae";
  const mesoWeek = athlete ? (athlete.mesocycleWeek || 3) : 3;
  const history = athlete && athlete.history ? athlete.history : [];
  const totalTonnage = history.reduce((sum, h) => sum + (h.tonnage || 0), 0);

  // Try Cloudflare Workers AI if available
  if (env && env.AI) {
    try {
      const systemPrompt = `Ты — элитный спортивный врач, биомеханик и тренер высшей категории IRON COACH.
Профиль атлета:
- Имя: ${name}, Возраст: ${age} лет, Рост: ${height} см, Вес: ${weight} кг, Талия: ${waist} см (WHtR: ${whtr})
- Цель: ${goal}
- Ограничения и травмы: ${injuries}
- Текущая неделя мезоцикла: ${mesoWeek}/8
- Суммарный тоннаж: ${totalTonnage} кг, Сессий: ${history.length}
Отвечай авторитетно, научно, доказательно, по делу, с четкими рекомендациями (упражнения, сеты, повторы, градусы наклона, дозировки добавок). Форматируй ответ в красивом HTML (с тегами <b>, <i>, <ul>, <li>).`;

      const aiRes = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: p }
        ]
      });
      if (aiRes && aiRes.response) {
        return aiRes.response;
      }
    } catch (e) {}
  }

  // Deep Dynamic Sports Intelligence Engine
  const qLower = p.toLowerCase();

  if (qLower.includes("аудит") || qLower.includes("анализ") || qLower.includes("прогресс") || qLower.includes("форма")) {
    const targetProtein = Math.round(weight * 1.8);
    const targetCal = Math.round(weight * 24 * 1.15);
    return `<b>📊 ПОЛНЫЙ ИИ-АУДИТ АТЛЕТА (${name}, ${age} года):</b><br><br>` +
      `<b>1. Биометрический статус:</b><br>` +
      `• Вес: <b>${weight} кг</b>, Талия: <b>${waist} см</b><br>` +
      `• Индекс WHtR = <b>${whtr}</b> (${whtr >= 0.50 ? '⚠️ Умеренно повышенный висцеральный жир. Обязательно кардио Зоны 2' : '🟢 Отличная норма'}).<br>` +
      `• Суммарный поднятый тоннаж: <b>${Math.round(totalTonnage).toLocaleString()} кг</b> за ${history.length} тренировок.<br><br>` +
      `<b>2. Ограничения и биомеханика:</b><br>` +
      `• Учитывая <i>${injuries}</i>, приоритет — депрессия левой лопатки во всех жимах и отказ от тяг за голову.<br><br>` +
      `<b>3. План прогрессии (Неделя ${mesoWeek}/8):</b><br>` +
      `• Силовые: Линейное повышение весов +2.5 кг в наклонном жиме (30°) и горизонтальной тяге.<br>` +
      `• Питание: <b>${targetProtein}г белка</b>, дефицит 200 ккал (калораж ~<b>${targetCal} ккал</b>).<br>` +
      `• Восстановление: 400 мг магния глицината перед сном + 5 сессий утреннего вакуума.`;
  }

  if (qLower.includes("замен") || qLower.includes("брусь") || qLower.includes("плеч") || qLower.includes("упражнен")) {
    return `<b>🔄 БИОМЕХАНИЧЕСКИЙ ПОДБОР ЗАМЕН:</b><br><br>` +
      `Если упражнение вызывает дискомфорт в плечевом поясе или спазм <i>m. levator scapulae</i>:<br><br>` +
      `<b>1. Замена отжиманий на брусьях:</b><br>` +
      `• <i>Вариант А (Безопасно):</i> <b>Жим в Хаммере на нижнюю часть груди</b> (4 подхода × 8–10 повторов). Снимает компрессию вращательной манжеты плеча.<br>` +
      `• <i>Вариант Б:</i> <b>Жим гантелей на наклонной скамье головой вниз (-15°)</b> с паузой 1 сек в нижней точке.<br><br>` +
      `<b>2. Замена наклонного жима при боли в плече:</b><br>` +
      `• Уменьши угол скамьи с 45° до <b>20–30°</b>.<br>` +
      `• Разверни гантели под углом 45° (нейтрально-пронационный хват), локти держи 60° к корпусу.`;
  }

  if (qLower.includes("ше") || qLower.includes("лопатк") || qLower.includes("спазм") || qLower.includes("травм") || qLower.includes("легк")) {
    return `<b>🩺 ПРОТОКОЛ ЗАЩИТЫ ШЕИ И ЛОПАТКИ (${injuries}):</b><br><br>` +
      `<b>1. Биомеханическая причина:</b><br>` +
      `Из-за резекции компенсаторно перегружается <i>мышца, поднимающая лопатку (m. levator scapulae)</i> и верх трапеции.<br><br>` +
      `<b>2. Правила на тренировке:</b><br>` +
      `• В тягах верхнего блока использовать <b>двуручный нейтральный V-образный хват</b> и тянуть строго к верху груди, опуская лопатки вниз.<br>` +
      `• Исключить жимы из-за головы, тяги штанги к подбородку и шраги.<br>` +
      `• В начале каждого занятия выполнять <b>Face Pulls с канатом</b> (4 подхода × 15–20 повторов) с паузой 2 секунды в сокращении.<br><br>` +
      `<b>3. Снятие спазма дома:</b><br>` +
      `• Магний глицинат 400 мг за 40 мин до сна.<br>` +
      `• МФР-массаж теннисным мячом триггерной точки верхнего угла лопатки.`;
  }

  if (qLower.includes("калор") || qLower.includes("белок") || qLower.includes("бжу") || qLower.includes("питан") || qLower.includes("диет")) {
    const pGrams = Math.round(weight * 1.8);
    const fatGrams = Math.round(weight * 0.9);
    const calTarget = Math.round(weight * 24 * 1.15);
    const carbGrams = Math.round((calTarget - (pGrams * 4 + fatGrams * 9)) / 4);
    return `<b>🥩 ТОЧНЫЙ РАСЧЕТ БЖУ ДЛЯ РЕКОМПОЗИЦИИ (${weight} кг):</b><br><br>` +
      `<b>• Калораж:</b> ~<b>${calTarget} ккал</b> (небольшой дефицит -10% для сжигания висцерального жира при росте мышц).<br>` +
      `<b>• Белок (1.8 г/кг):</b> <b>${pGrams} г</b> (~720 ккал). Источники: куриное филе, творог 5%, яйца, изолят протеина.<br>` +
      `<b>• Жиры (0.9 г/кг):</b> <b>${fatGrams} г</b> (~675 ккал). Омега-3, оливковое масло, желтки, орехи для синтеза тестостерона.<br>` +
      `<b>• Углеводы:</b> <b>${carbGrams} г</b> (~600 ккал). Гречка, овсянка, рис, овощи.<br>` +
      `<b>• Вода:</b> не менее <b>${(weight * 0.032).toFixed(1)} литра</b> в день.`;
  }

  if (qLower.includes("кардио") || qLower.includes("дорожк") || qLower.includes("жир") || qLower.includes("живот")) {
    return `<b>🏃 ПРОТОКОЛ КАРДИО ЗОНЫ 2 ДЛЯ УТИЛИЗАЦИИ ЖИРА:</b><br><br>` +
      `<b>1. Физиология:</b><br>` +
      `При WHtR ${whtr} жировые клетки живота расщепляются в митохондриях только при окислительном метаболизме (лактат < 2 ммоль/л).<br><br>` +
      `<b>2. Параметры кардио:</b><br>` +
      `• <b>Пульсовая зона:</b> <b>115–128 уд/мин</b> (тест разговора: можешь говорить фразами без одышки).<br>` +
      `• <b>Формат:</b> Ходьба в горку на беговой дорожке (<b>уклон 8–10%, скорость 5.5 км/ч</b>).<br>` +
      `• <b>Длительность:</b> 25–30 минут сразу после силовой тренировки или в воскресный день.`;
  }

  if (qLower.includes("креатин") || qLower.includes("добавк") || qLower.includes("витамин")) {
    return `<b>💊 ПЕРСОНАЛЬНЫЙ ДОКАЗАТЕЛЬНЫЙ СТЕК ДОБАВОК:</b><br><br>` +
      `1. <b>Креатин моногидрат (5 г/день):</b> Принимать утром или после тренировки. Насыщает мышцы фосфокреатином, повышает силовые на 10-15%.<br>` +
      `2. <b>Магний глицинат (400 мг):</b> За 40 мин до сна. Снимает мышечные зажимы шеи и улучшает фазу глубокого сна.<br>` +
      `3. <b>Омега-3 (2000 мг EPA+DHA):</b> Во время завтрака. Снижает воспаление связок локтей и плеч.<br>` +
      `4. <b>Витамин D3 (4000 IU) + K2:</b> Утром с жирной пищей. Поддержка синтеза тестостерона при офисной работе.<br>` +
      `5. <b>Цинк хелат (25 мг):</b> Вечером после еды.`;
  }

  return `<b>🦾 РЕКОМЕНДАЦИЯ ИИ-ТРЕНЕРА ПО ТВОЕМУ ЗАПРОСУ:</b><br><br>` +
    `По твоему вопросу <i>"${p}"</i> с учетом текущих данных (${weight} кг, талия ${waist} см, ${mesoWeek}-я неделя мезоцикла):<br><br>` +
    `• <b>В тренировках:</b> Придерживайся принципа прогрессивной перегрузки в диапазоне 8–12 повторений с запасом 1–2 повтора (RIR 1-2). Обязательно контролируй эксцентрическую фазу (2-3 сек).<br>` +
    `• <b>В восстановлении:</b> Соблюдай 48 часов отдыха между тренировками Full Body и закрывай суточную норму белка (${Math.round(weight*1.8)}г).<br><br>` +
    `Если нужен расчет конкретного упражнения или замена — уточни название движения!`;
}

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
      text: "🦾 <b>Приветствую, коллега!</b>\n\nТвое персональное фитнес-приложение <b>IRON COACH CYBER-PRO</b> готово к работе!\n\n👇 <b>Нажми на кнопку ниже, чтобы открыть приложение:</b>",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🚀 Открыть Iron Coach App", web_app: { url: webAppUrl } }]
        ]
      }
    })
  });
}
