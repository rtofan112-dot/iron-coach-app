/**
 * ASU-TP Iron Coach ENTERPRISE - Strict Engineering & Hypertrophy Engine
 */

const Sound = {
  ctx: null,
  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.ctx = new AudioContext();
    }
  },
  beep(freq = 660, dur = 0.15, type = 'sine') {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + dur);
    } catch(e) {}
  },
  success() {
    this.beep(587.33, 0.1);
    setTimeout(() => this.beep(880, 0.25), 100);
  },
  finish() {
    this.beep(523.25, 0.12);
    setTimeout(() => this.beep(659.25, 0.12), 120);
    setTimeout(() => this.beep(783.99, 0.12), 240);
    setTimeout(() => this.beep(1046.50, 0.35), 360);
  }
};

const Haptic = {
  impact(style = 'medium') {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
    } else if (navigator.vibrate) {
      navigator.vibrate(40);
    }
  },
  success() {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
    } else if (navigator.vibrate) {
      navigator.vibrate([40, 60, 80]);
    }
  }
};

// ========================================================
// S-TIER FULL-BODY PROTOCOLS
// ========================================================
const DEFAULT_PROGRAMS = {
  a: {
    name: "Вторник: Full Body A (Верх Груди + Жим лежа + Квадры + Спина)",
    exercises: [
      { id: "ex1", name: "Жим гантелей на наклонной скамье 30°", sets: 4, min: 8, max: 10, w: 22, calRate: 12, tip: "🔥 ВЕРХ ГРУДИ: Локти 60-70° к телу, лопатки сведены и опущены вниз.", substitutes: ["Жим штанги на наклонной 30°", "Жим в наклонном Хаммере"] },
      { id: "ex2", name: "Жим гантелей / штанги на горизонтальной скамье", sets: 4, min: 8, max: 10, w: 24, calRate: 12, tip: "🔥 МАССИВ ГРУДИ: Мощный выжим грудными, пауза 1 сек в нижней точке.", substitutes: ["Жим штанги лежа", "Жим в горизонтальном Хаммере"] },
      { id: "ex3", name: "Жим ногами под углом 45° в тренажере", sets: 4, min: 10, max: 12, w: 90, calRate: 16, tip: "🦵 КВАДРИЦЕПСЫ: Колени вверху не вставляй, пятки плотно к платформе.", substitutes: ["Приседания со штангой", "Гакк-приседания"] },
      { id: "ex4", name: "Тяга горизонтального блока к поясу (нейтрально)", sets: 4, min: 10, max: 12, w: 45, calRate: 11, tip: "🔥 ТОЛЩИНА СПИНЫ: Локти в карманы джинсов, опусти плечи вниз!", substitutes: ["Тяга Т-грифа", "Тяга гантели в упоре"] },
      { id: "ex5", name: "Сгибания ног сидя/лежа в тренажере", sets: 3, min: 12, max: 15, w: 35, calRate: 8, tip: "🍗 БИЦЕПС БЕДРА: Плавно опускай 2-3 сек, задержка в сокращении 1 сек.", substitutes: ["Румынская тяга на 1 ноге"] },
      { id: "ex6", name: "Махи гантелями в стороны стоя", sets: 4, min: 12, max: 15, w: 8, calRate: 7, tip: "🥥 ШИРИНА ПЛЕЧ: Локти до параллели, кисть не задирай выше локтя.", substitutes: ["Махи на нижнем блоке"] },
      { id: "ex7", name: "Разгибания рук на блоке с канатом", sets: 3, min: 12, max: 15, w: 20, calRate: 6, tip: "💣 ТРИЦЕПС: Локти прижаты к ребрам, разводи канат внизу.", substitutes: ["Французский жим с гантелями"] },
      { id: "ex8", name: "Скручивания на блоке с канатом («Молитва»)", sets: 3, min: 12, max: 15, w: 35, calRate: 8, tip: "🛡️ ПРЕСС: Скручивай ребра к тазу усилием пресса, а не сгибанием бедер!", substitutes: ["Подъем ног на наклонной скамье", "Скручивания на фитболе"] }
    ]
  },
  b: {
    name: "Четверг: Full Body B (Бабочка + Брусья + Румынка + Тяга блока)",
    exercises: [
      { id: "ex1", name: "Сведения в бабочке / кроссовере (Pec-Deck)", sets: 4, min: 10, max: 12, w: 25, calRate: 9, tip: "🔥 СЕРЕДИНА И РАЗВОДКА ГРУДИ: Пауза в пиковом сведении 2 сек!", substitutes: ["Разводка гантелей на наклонной скамье"] },
      { id: "ex2", name: "Отжимания на брусьях (наклон) / Жим в Хаммере", sets: 4, min: 8, max: 10, w: 0, calRate: 11, tip: "🔥 НИЖНИЙ ПОДРЕЗ ГРУДИ: Наклон корпуса вперед, локти 45°.", substitutes: ["Жим гантелей головой вниз"] },
      { id: "ex3", name: "Румынская тяга с гантелями", sets: 4, min: 10, max: 12, w: 22, calRate: 15, tip: "🍗 ЗАДНЯЯ ПОВЕРХНОСТЬ: Таз назад, колени мягкие, растягивай бицепс бедра.", substitutes: ["Гиперэкстензия с весом", "Тяга сумо"] },
      { id: "ex4", name: "Тяга верхнего блока нейтральным (V-образным) хватом", sets: 4, min: 10, max: 12, w: 50, calRate: 12, tip: "🔥 ШИРИНА СПИНЫ: Двуручная мощная тяга к верху груди, плечи вниз!", substitutes: ["Подтягивания нейтральным хватом", "Тяга широким хватом"] },
      { id: "ex5", name: "Гакк-приседания в тренажере / Шагающие выпады", sets: 3, min: 10, max: 12, w: 35, calRate: 13, tip: "🦵 КВАДРИЦЕПСЫ: Глубокий стретч, плавный подконтрольный негатив.", substitutes: ["Болгарские сплит-приседания"] },
      { id: "ex6", name: "Жим гантелей сидя на скамье 75°", sets: 4, min: 8, max: 10, w: 16, calRate: 9, tip: "🥥 ПЛЕЧИ: Чистый жим над головой, без сильного прогиба в пояснице.", substitutes: ["Армейский жим стоя", "Жим в Хаммере"] },
      { id: "ex7", name: "Подъем гантелей на бицепс с супинацией", sets: 3, min: 10, max: 12, w: 12, calRate: 6, tip: "💪 БИЦЕПС: Разворот кисти наружу вверху, локти зафиксированы.", substitutes: ["Подъем штанги на бицепс EZ"] },
      { id: "ex8", name: "Подъем ног / коленей в висе на брусьях", sets: 3, min: 12, max: 15, isTime: false, w: 0, calRate: 7, tip: "🛡️ НИЖНИЙ ПРЕСС: Подкручивай таз вверх на выдохе.", substitutes: ["Складка на скамье"] }
    ]
  },
  c: {
    name: "Воскресенье: День В [ОПЦИОНАЛЬНО] (Recharge + Шея/Лопатка + Кардио)",
    exercises: [
      { id: "ex1", name: "Face Pulls (Тяга каната к лицу)", sets: 4, min: 15, max: 20, w: 15, calRate: 8, tip: "🔥 СПАСЕНИЕ ШЕИ И ЛОПАТКИ: Канат к глазам, локти назад, пауза 2 сек.", substitutes: ["Разводка на заднюю дельту"] },
      { id: "ex2", name: "Жим гантелей на наклонной скамье 15-30° (пампинг)", sets: 3, min: 12, max: 15, w: 16, calRate: 8, tip: "🔥 ПАМП ГРУДИ: Чистая накачка кровью без отказа.", substitutes: ["Сведения в кроссовере"] },
      { id: "ex3", name: "Суперсет на руки: Бицепс молот + Французский жим", sets: 3, min: 12, max: 15, w: 22, calRate: 11, tip: "Пампинг рук, закачка локтевых связок.", substitutes: ["Памп на блоке"] },
      { id: "ex4", name: "Подъем на носки стоя на платформе", sets: 4, min: 15, max: 20, w: 50, calRate: 8, tip: "🦵 ИКРЫ: Полная амплитуда, пауза в нижней растяжке 2 сек.", substitutes: ["Подъем на носки сидя"] },
      { id: "ex5", name: "Ходьба в горку на дорожке (Зона 2)", sets: 1, min: 25, max: 30, isTime: true, w: 0, calRate: 200, tip: "Уклон 8-10%, скорость 5.5-6 км/ч. Сжигание висцерального жира.", substitutes: ["Эллипс Зона 2"] }
    ]
  }
};

// ========================================================
// ACHIEVEMENTS DATA DEFINITIONS
// ========================================================
const ACHIEVEMENTS = [
  { id: "ach_first", title: "🥉 Первый импульс", desc: "Заверши 1-ю тренировку", xp: 100, check: (s) => (s.history || []).length >= 1 },
  { id: "ach_streak_3", title: "🔥 Три в ряд", desc: "Выполни 3 тренировки подряд без срывов", xp: 250, check: (s) => (s.streak || 0) >= 3 },
  { id: "ach_streak_10", title: "⚡ Стальная декада", desc: "Серия из 10 регулярных тренировок", xp: 600, check: (s) => (s.streak || 0) >= 10 },
  { id: "ach_tonnage_50", title: "🏋️ Клуб 50 Тонн", desc: "Суммарный поднятый тоннаж превысил 50 000 кг", xp: 500, check: (s) => getTotalTonnage(s) >= 50000 },
  { id: "ach_vac_5", title: "🌬️ Вакуумный монолит", desc: "Выполни 5 дней утреннего вакуума", xp: 300, check: (s) => (s.vacDaysCount || 0) >= 5 },
  { id: "ach_prot_7", title: "🥩 Белковый баланс", desc: "Закрой норму 150г белка 7 дней", xp: 400, check: (s) => (s.protDaysCount || 0) >= 7 },
  { id: "ach_meso", title: "🏆 Мастер мезоцикла", desc: "Заверши полный 8-недельный тренировочный мезоцикл", xp: 1000, check: (s) => (s.mesocycleWeek || 1) >= 8 }
];

function getTotalTonnage(s) {
  return (s.history || []).reduce((sum, h) => sum + (h.tonnage || 0), 0);
}

// ========================================================
// TELEGRAM SECURE AUTHENTICATION STATE
// ========================================================
function getInitialAccount() {
  return {
    tgId: "tg_roman_asutp",
    name: "Роман",
    role: "Инженер АСУ ТП",
    age: 32,
    height: 178,
    injuries: "Резекция левого легкого >10 лет назад, спазм m. levator scapulae",
    goal: "Рекомпозиция (Сушка жира + Мышечный тонус)",
    mesocycleWeek: 3,
    xp: 0,
    streak: 0,
    vacDaysCount: 0,
    protDaysCount: 0,
    currentMetrics: { weight: 83.0, waist: 91.5, biceps: 38.5, chest: 104.0, thigh: 59.0, neck: 39.5 },
    metrics: [
      { id: "m_init", date: new Date().toISOString().split("T")[0], weight: 83.0, waist: 91.5, biceps: 38.5, chest: 104.0, thigh: 59.0, neck: 39.5 }
    ],
    nutrition: { protein: 0, waterMl: 0, calories: 0, caloriesBurned: 0, date: new Date().toISOString().split("T")[0] },
    checklist: { vac: false, steps: false, prot: false, water: false, sleep: false },
    history: [],
    activeWorkout: null,
    unlockedAchievements: []
  };
}

let appState = getInitialAccount();
let pendingWorkoutPlanKey = 'a';

function loadState() {
  // 1. Identify Telegram User securely
  let tgKey = "asutp_iron_account_default";
  let tgName = "Роман (АСУ ТП)";
  let tgAvatar = "РТ";

  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
    const u = window.Telegram.WebApp.initDataUnsafe.user;
    tgKey = "asutp_iron_account_" + u.id;
    tgName = u.first_name + (u.last_name ? ` ${u.last_name}` : "");
    tgAvatar = (u.first_name[0] + (u.last_name ? u.last_name[0] : "")).toUpperCase();
  }

  const raw = localStorage.getItem(tgKey);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      Object.assign(appState, parsed);
    } catch(e) {}
  }

  appState.tgId = tgKey;
  if (!raw) {
    appState.name = tgName;
  }

  // Update Top Auth Badge
  const elName = document.getElementById("tg-user-name");
  const elAvatar = document.getElementById("tg-user-avatar");
  if (elName) elName.textContent = appState.name;
  if (elAvatar) elAvatar.textContent = tgAvatar;

  saveState();
  checkAchievements();
}

function saveState() {
  localStorage.setItem(appState.tgId, JSON.stringify(appState));
  renderXP();
  renderMesocycleBanner();
}

function addXP(amount) {
  appState.xp += amount;
  saveState();
  checkAchievements();
}

function renderXP() {
  const currentLvl = Math.floor(appState.xp / 500) + 1;
  const xpInLvl = appState.xp % 500;
  const xpToNext = 500 - xpInLvl;

  const lvlHeader = document.getElementById("header-level-badge");
  const xpTxt = document.getElementById("xp-text");
  const xpNxt = document.getElementById("xp-next");
  const xpBar = document.getElementById("xp-bar");
  const strkEl = document.getElementById("streak-count");

  if (lvlHeader) lvlHeader.textContent = `LVL ${currentLvl}`;
  if (xpTxt) xpTxt.textContent = appState.xp;
  if (xpNxt) xpNxt.textContent = `${xpToNext} XP`;
  if (xpBar) xpBar.style.width = `${(xpInLvl / 500) * 100}%`;
  if (strkEl) strkEl.textContent = appState.streak;
}

// ========================================================
// MESOCYCLE ROTATION SYSTEM (8-12 WEEKS PERIODIZATION)
// ========================================================
function renderMesocycleBanner() {
  const w = appState.mesocycleWeek || 1;
  const badgeHeader = document.getElementById("meso-header-badge");
  const weekDisp = document.getElementById("meso-week-display");
  const descEl = document.getElementById("meso-desc-text");

  if (badgeHeader) badgeHeader.textContent = `МЕЗОЦИКЛ: НЕДЕЛЯ ${w}/8`;
  if (weekDisp) weekDisp.textContent = w;

  if (!descEl) return;

  if (w <= 3) {
    descEl.innerHTML = `<b>Фаза 1 (Накопление нагрузки):</b> Линейное увеличение весов (+2.5 кг в жимах и тягах). Фокус на плотность верхнего массива груди и технику депрессии левой лопатки.`;
  } else if (w <= 6) {
    descEl.innerHTML = `<b>Фаза 2 (Интенсификация):</b> Выход на рабочие веса в диапазоне 8–10 повторений. Высокий стимул мышечной гипертрофии грудных и широчайших.`;
  } else if (w === 7) {
    descEl.innerHTML = `<b>Фаза 3 (Пиковая суперкомпенсация):</b> Максимальная силовая работа перед разгрузкой. Держи идеальный тайминг отдыха (90-120с).`;
  } else {
    descEl.innerHTML = `<span class="text-amber-400 font-bold">⚠️ ВНИМАНИЕ (Научная периодизация):</span> Мезоцикл 8 недель завершен! По исследованиям Schoenfeld/Helms наступила адаптация рецепторов. <b>Рекомендуется провести 1 неделю Deload (-40% объема) и сменить углы жимов/хваты!</b>`;
  }
}

function advanceMesocycleWeek() {
  let w = (appState.mesocycleWeek || 1) + 1;
  if (w > 8) {
    if (confirm("Перезапустить тренировочный мезоцикл на новый 8-недельный цикл (Неделя 1)?")) {
      w = 1;
      addXP(500);
      Sound.finish();
      Haptic.success();
      alert("🎉 Поздравляем с закрытием мезоцикла! Запущен новый цикл прогрессии (+500 XP).");
    } else {
      return;
    }
  } else {
    Sound.beep(700, 0.1);
    Haptic.impact('light');
  }
  appState.mesocycleWeek = w;
  saveState();
  checkAchievements();
}

// ========================================================
// PRE-WORKOUT READINESS CHECK-IN
// ========================================================
function promptReadinessBeforeWorkout(planKey) {
  pendingWorkoutPlanKey = planKey;
  updateReadinessScore();
  openModal('modal-readiness');
}

function updateReadinessScore() {
  const energy = parseInt(document.getElementById("readiness-range-energy").value) || 4;
  const sleep = parseInt(document.getElementById("readiness-range-sleep").value) || 4;
  const soreness = parseInt(document.getElementById("readiness-range-soreness").value) || 1;

  document.getElementById("readiness-val-energy").textContent = `${energy} / 5`;
  document.getElementById("readiness-val-sleep").textContent = `${sleep} / 5`;
  
  const soreLabels = ["", "1 (Свежий)", "2 (Легкая)", "3 (Умеренная)", "4 (Забитость)", "5 (Сильная)"];
  document.getElementById("readiness-val-soreness").textContent = soreLabels[soreness] || `${soreness}`;

  const scorePct = Math.round(((energy + sleep + (6 - soreness)) / 15) * 100);
  const badge = document.getElementById("readiness-total-badge");

  if (scorePct >= 85) {
    badge.textContent = `${scorePct}% • Максимальная готовность (100% веса)`;
    badge.className = "text-sm font-black text-emerald-400 font-mono";
  } else if (scorePct >= 65) {
    badge.textContent = `${scorePct}% • Умеренная готовность (запас 1-2 повт)`;
    badge.className = "text-sm font-black text-amber-400 font-mono";
  } else {
    badge.textContent = `${scorePct}% • Утомление (снизь веса на 10%)`;
    badge.className = "text-sm font-black text-rose-400 font-mono";
  }
}

function confirmReadinessAndStart() {
  closeModal('modal-readiness');
  const energy = parseInt(document.getElementById("readiness-range-energy").value) || 4;
  const sleep = parseInt(document.getElementById("readiness-range-sleep").value) || 4;
  const soreness = parseInt(document.getElementById("readiness-range-soreness").value) || 1;
  const scorePct = Math.round(((energy + sleep + (6 - soreness)) / 15) * 100);

  startWorkout(pendingWorkoutPlanKey, scorePct);
}

// ========================================================
// WORKOUT ENGINE
// ========================================================
function startWorkout(planKey, readinessPct = 90) {
  Sound.beep(600, 0.1);
  Haptic.impact('medium');
  const plan = DEFAULT_PROGRAMS[planKey];

  appState.activeWorkout = {
    key: planKey,
    name: plan.name,
    readiness: readinessPct,
    exercises: plan.exercises.map(e => ({
      name: e.name,
      min: e.min,
      max: e.max,
      defaultWeight: e.w,
      calRate: e.calRate || 10,
      isTime: !!e.isTime,
      tip: e.tip,
      substitutes: e.substitutes || [],
      sets: Array.from({ length: e.sets }, (_, i) => ({
        set: i + 1,
        weight: e.w,
        reps: e.min,
        done: false
      }))
    }))
  };

  renderActiveWorkoutUI();
}

function renderActiveWorkoutUI() {
  if (!appState.activeWorkout) return;

  document.getElementById("workout-selector").classList.add("hidden");
  document.getElementById("workout-active").classList.remove("hidden");

  const wo = appState.activeWorkout;
  document.getElementById("wo-active-tag").textContent = `${wo.key.toUpperCase()} • ГОТОВНОСТЬ ${wo.readiness}%`;
  document.getElementById("wo-active-title").textContent = wo.name;

  updateLiveWorkoutStats();

  const container = document.getElementById("active-exercises-container");
  container.innerHTML = "";

  wo.exercises.forEach((ex, exIdx) => {
    const card = document.createElement("div");
    card.className = "glass-strict p-3.5 rounded-xl space-y-2.5 border border-slate-800";

    const setsRows = ex.sets.map((s, sIdx) => `
      <div class="grid grid-cols-12 gap-1.5 items-center bg-slate-950 p-1.5 rounded-lg border ${s.done ? 'border-emerald-500/60 bg-emerald-950/20' : 'border-slate-800'} font-mono text-xs">
        <div class="col-span-1 text-center font-bold text-slate-400">#${s.set}</div>
        
        <div class="col-span-5 flex items-center bg-slate-900 px-1 py-1 rounded border border-slate-800 justify-between">
          <button type="button" onclick="stepWeight(${exIdx}, ${sIdx}, -2.5)" class="w-5 h-6 flex items-center justify-center bg-slate-800 text-slate-300 font-bold rounded text-xs touch-press">-</button>
          <input type="number" step="any" inputmode="decimal" value="${s.weight}" class="w-12 bg-transparent text-white font-bold text-center text-xs outline-none px-0.5"
            onclick="this.select()" oninput="updateSet(${exIdx}, ${sIdx}, 'weight', this.value)">
          <span class="text-[8px] text-slate-400 pr-0.5">${ex.isTime ? 'с' : 'кг'}</span>
          <button type="button" onclick="stepWeight(${exIdx}, ${sIdx}, 2.5)" class="w-5 h-6 flex items-center justify-center bg-slate-800 text-emerald-400 font-bold rounded text-xs touch-press">+</button>
        </div>

        <div class="col-span-4 flex items-center bg-slate-900 px-1 py-1 rounded border border-slate-800 justify-between">
          <button type="button" onclick="stepReps(${exIdx}, ${sIdx}, -1)" class="w-5 h-6 flex items-center justify-center bg-slate-800 text-slate-300 font-bold rounded text-xs touch-press">-</button>
          <input type="number" step="1" inputmode="numeric" value="${s.reps}" class="w-10 bg-transparent text-white font-bold text-center text-xs outline-none px-0.5"
            onclick="this.select()" oninput="updateSet(${exIdx}, ${sIdx}, 'reps', this.value)">
          <span class="text-[8px] text-slate-400 pr-0.5">раз</span>
          <button type="button" onclick="stepReps(${exIdx}, ${sIdx}, 1)" class="w-5 h-6 flex items-center justify-center bg-slate-800 text-cyan-400 font-bold rounded text-xs touch-press">+</button>
        </div>

        <div class="col-span-2 flex justify-center">
          <input type="checkbox" class="custom-checkbox" ${s.done ? 'checked' : ''}
            onchange="toggleSet(${exIdx}, ${sIdx}, this.checked)">
        </div>
      </div>
    `).join('');

    card.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-extrabold text-white text-xs font-sans">${ex.name}</h3>
          <span class="text-[10px] font-mono text-emerald-400 font-bold">${ex.sets.length} подхода × ${ex.min}-${ex.max} раз</span>
        </div>
        <div class="flex items-center space-x-1 font-mono text-[10px]">
          <button onclick="resetExerciseSets(${exIdx})" class="px-2 py-0.5 bg-slate-900 text-rose-300 rounded border border-slate-800 touch-press">↺</button>
          ${ex.substitutes.length > 0 ? `<button onclick="swapExercisePrompt(${exIdx})" class="px-2 py-0.5 bg-slate-900 text-slate-300 rounded border border-slate-800 touch-press">Замена</button>` : ''}
        </div>
      </div>
      <p class="text-[11px] text-slate-300 bg-slate-950 p-2 rounded-lg border border-slate-800/80 font-sans">${ex.tip}</p>
      <div class="space-y-1">${setsRows}</div>
      <div class="flex justify-between items-center pt-1 text-[10px] font-mono">
        <button onclick="addSetToExercise(${exIdx})" class="text-emerald-400 font-bold">➕ Подход</button>
        ${ex.sets.length > 1 ? `<button onclick="removeSetFromExercise(${exIdx})" class="text-slate-500">➖ Убрать</button>` : ''}
      </div>
    `;

    container.appendChild(card);
  });
}

function updateSet(exIdx, sIdx, field, val) {
  if (!appState.activeWorkout) return;
  const num = parseFloat(val);
  appState.activeWorkout.exercises[exIdx].sets[sIdx][field] = isNaN(num) ? 0 : num;
  saveState();
  updateLiveWorkoutStats();
}

function stepWeight(exIdx, sIdx, delta) {
  if (!appState.activeWorkout) return;
  const current = appState.activeWorkout.exercises[exIdx].sets[sIdx].weight || 0;
  appState.activeWorkout.exercises[exIdx].sets[sIdx].weight = Math.max(0, current + delta);
  saveState();
  renderActiveWorkoutUI();
  Sound.beep(600, 0.05);
  Haptic.impact('light');
}

function stepReps(exIdx, sIdx, delta) {
  if (!appState.activeWorkout) return;
  const current = appState.activeWorkout.exercises[exIdx].sets[sIdx].reps || 0;
  appState.activeWorkout.exercises[exIdx].sets[sIdx].reps = Math.max(0, current + delta);
  saveState();
  renderActiveWorkoutUI();
  Sound.beep(600, 0.05);
  Haptic.impact('light');
}

function toggleSet(exIdx, sIdx, done) {
  if (!appState.activeWorkout) return;
  appState.activeWorkout.exercises[exIdx].sets[sIdx].done = done;
  saveState();
  updateLiveWorkoutStats();

  if (done) {
    Sound.success();
    Haptic.success();
    addXP(25);
    startRestTimer(90);
  }
}

function resetExerciseSets(exIdx) {
  if (!appState.activeWorkout) return;
  const ex = appState.activeWorkout.exercises[exIdx];
  ex.sets.forEach(s => {
    s.done = false;
    s.weight = ex.defaultWeight;
    s.reps = ex.min;
  });
  saveState();
  renderActiveWorkoutUI();
  Sound.beep(400, 0.1);
}

function addSetToExercise(exIdx) {
  if (!appState.activeWorkout) return;
  const ex = appState.activeWorkout.exercises[exIdx];
  const lastSet = ex.sets[ex.sets.length - 1];
  ex.sets.push({
    set: ex.sets.length + 1,
    weight: lastSet ? lastSet.weight : ex.defaultWeight,
    reps: lastSet ? lastSet.reps : ex.min,
    done: false
  });
  saveState();
  renderActiveWorkoutUI();
}

function removeSetFromExercise(exIdx) {
  if (!appState.activeWorkout) return;
  const ex = appState.activeWorkout.exercises[exIdx];
  if (ex.sets.length > 1) {
    ex.sets.pop();
    saveState();
    renderActiveWorkoutUI();
  }
}

function calculateCurrentCaloriesBurned() {
  if (!appState.activeWorkout) return 0;
  const userWeight = (appState.currentMetrics && appState.currentMetrics.weight) ? appState.currentMetrics.weight : 83;
  const weightFactor = userWeight / 83.0;

  let calories = 0;
  appState.activeWorkout.exercises.forEach(e => {
    const doneSets = e.sets.filter(s => s.done);
    if (e.isTime) {
      doneSets.forEach(s => {
        calories += (s.reps * (e.calRate / 30.0)) * weightFactor;
      });
    } else {
      doneSets.forEach(s => {
        const tonnageSet = (s.weight * s.reps);
        calories += ((e.calRate || 10) + (tonnageSet * 0.008)) * weightFactor;
      });
    }
  });
  return Math.round(calories);
}

function updateLiveWorkoutStats() {
  if (!appState.activeWorkout) return;
  let ton = 0;
  appState.activeWorkout.exercises.forEach(e => {
    e.sets.filter(s => s.done).forEach(s => {
      ton += (s.weight * s.reps);
    });
  });
  const calories = calculateCurrentCaloriesBurned();

  const elTon = document.getElementById("wo-live-tonnage");
  const elCal = document.getElementById("wo-live-calories");

  if (elTon) elTon.textContent = `${Math.round(ton)} кг`;
  if (elCal) elCal.textContent = `${calories} ккал`;
}

function swapExercisePrompt(exIdx) {
  if (!appState.activeWorkout) return;
  const ex = appState.activeWorkout.exercises[exIdx];
  if (!ex.substitutes || ex.substitutes.length === 0) return;
  const choice = confirm(`Заменить «${ex.name}» на «${ex.substitutes[0]}»?`);
  if (choice) {
    const oldName = ex.name;
    ex.name = ex.substitutes[0];
    ex.substitutes[0] = oldName;
    renderActiveWorkoutUI();
    Sound.beep(700, 0.1);
  }
}

let timerInt = null, timerLeft = 0;
function startRestTimer(sec) {
  clearInterval(timerInt);
  timerLeft = sec;
  document.getElementById("timer-bar").classList.remove("hidden");
  updateTimerHUD();

  timerInt = setInterval(() => {
    if (timerLeft > 0) {
      timerLeft--;
      updateTimerHUD();
      if (timerLeft === 0) {
        Sound.finish();
        Haptic.impact('heavy');
        clearInterval(timerInt);
        setTimeout(() => document.getElementById("timer-bar").classList.add("hidden"), 3500);
      }
    }
  }, 1000);
}

function updateTimerHUD() {
  const m = Math.floor(timerLeft / 60);
  const s = timerLeft % 60;
  document.getElementById("timer-text").textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
}

function addTimer(sec) {
  timerLeft += sec;
  updateTimerHUD();
  Sound.beep(750, 0.08);
}

function stopTimer() {
  clearInterval(timerInt);
  document.getElementById("timer-bar").classList.add("hidden");
}

function finishActiveWorkout() {
  const wo = appState.activeWorkout;
  if (!wo) return;

  let tonnage = 0;
  const exSummaries = [];

  wo.exercises.forEach(e => {
    const doneSets = e.sets.filter(s => s.done);
    doneSets.forEach(s => { tonnage += (s.weight * s.reps); });
    const isMaxClosed = doneSets.length === e.sets.length && doneSets.every(s => s.reps >= e.max);
    exSummaries.push({
      name: e.name,
      sets: doneSets.map(s => `${s.weight}кг×${s.reps}`).join(', ') || '0',
      prog: isMaxClosed ? `🚀 Закрыто! +2.5кг` : `План: ${e.sets.length}×${e.max}`
    });
  });

  const caloriesBurned = calculateCurrentCaloriesBurned();
  const nowStr = new Date().toLocaleString('ru-RU', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

  if (!appState.history) appState.history = [];
  appState.history.unshift({
    id: "wo_" + Date.now(),
    date: new Date().toISOString().split("T")[0],
    timeStr: nowStr,
    name: wo.name,
    readiness: wo.readiness || 90,
    tonnage: Math.round(tonnage),
    calories: caloriesBurned,
    exercises: exSummaries
  });

  if (!appState.nutrition) appState.nutrition = {};
  if (!appState.nutrition.caloriesBurned) appState.nutrition.caloriesBurned = 0;
  appState.nutrition.caloriesBurned += caloriesBurned;

  addXP(150);
  appState.streak = (appState.streak || 0) + 1;
  appState.activeWorkout = null;
  saveState();

  Sound.finish();
  Haptic.success();

  alert(`🎉 ТРЕНИРОВКА ЗАВЕРШЕНА!\n\nТоннаж: ${Math.round(tonnage)} кг.\nСожжено: ~${caloriesBurned} ккал 🔥\nГотовность: ${wo.readiness}%\n+150 XP получено!`);
  document.getElementById("workout-active").classList.add("hidden");
  document.getElementById("workout-selector").classList.remove("hidden");
  switchTab("history");
}

function cancelWorkout() {
  if (confirm("Отменить текущую тренировку?")) {
    appState.activeWorkout = null;
    saveState();
    document.getElementById("workout-active").classList.add("hidden");
    document.getElementById("workout-selector").classList.remove("hidden");
  }
}

// ========================================================
// SCHEDULE: WEEK / MONTH / YEAR HEATMAP
// ========================================================
function setScheduleView(view) {
  ['week', 'month', 'year'].forEach(v => {
    const el = document.getElementById("sch-view-" + v);
    const btn = document.getElementById("btn-sch-" + v);
    if (v === view) {
      if (el) el.classList.remove("hidden");
      if (btn) {
        btn.className = "px-2 py-1 rounded bg-emerald-500 text-slate-950 font-bold";
      }
    } else {
      if (el) el.classList.add("hidden");
      if (btn) {
        btn.className = "px-2 py-1 rounded bg-slate-900 text-slate-400 font-bold border border-slate-800";
      }
    }
  });

  if (view === 'month') renderMonthMatrix();
  if (view === 'year') renderYearHeatmap();
}

function renderMonthMatrix() {
  const container = document.getElementById("month-matrix-container");
  if (!container) return;
  container.innerHTML = "";

  const histDates = new Set((appState.history || []).map(h => h.date));
  const today = new Date();
  const daysInMonth = 31;

  for (let d = 1; d <= daysInMonth; d++) {
    const dStr = `2026-08-${d < 10 ? '0' + d : d}`;
    const isDone = histDates.has(dStr);
    const isToday = d === 27;

    const cell = document.createElement("div");
    cell.className = `p-2 rounded-lg border ${isDone ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 font-bold' : isToday ? 'bg-slate-800 border-cyan-400 text-white font-bold' : 'bg-slate-950 border-slate-800 text-slate-500'}`;
    cell.innerHTML = `<span>${d}</span><span class="block text-[8px]">${isDone ? '✓' : ''}</span>`;
    container.appendChild(cell);
  }
}

function renderYearHeatmap() {
  const container = document.getElementById("year-heatmap");
  const totalEl = document.getElementById("year-total-sessions");
  if (!container) return;
  container.innerHTML = "";

  const hist = appState.history || [];
  if (totalEl) totalEl.textContent = `${hist.length} тренировок за год`;

  // Render 52 weeks (26 columns x 7 rows = 182 cells for 6 months representation)
  for (let i = 0; i < 182; i++) {
    const cell = document.createElement("div");
    let level = "heatmap-cell";
    if (i % 7 === 1 || i % 7 === 3) {
      if (i < 80) level += " level-3";
      else level += " level-1";
    }
    cell.className = level;
    container.appendChild(cell);
  }
}

// ========================================================
// LEADERBOARD & PRIVACY (PUBLIC VS PRIVATE)
// ========================================================
function renderLeaderboard() {
  const tbody = document.getElementById("leaderboard-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  const myTonnage = getTotalTonnage(appState);
  const lastWo = (appState.history && appState.history.length > 0) ? appState.history[0] : null;
  const lastActiveStr = lastWo ? (lastWo.timeStr || lastWo.date) : "Сегодня, 10:45";

  const athletes = [
    { rank: 1, name: appState.name || "Роман (АСУ ТП)", streak: appState.streak || 0, tonnage: myTonnage || 42500, lastActive: lastActiveStr, isMe: true },
    { rank: 2, name: "Алексей (АСУ ТП)", streak: 6, tonnage: 38200, lastActive: "Вчера, 19:20", isMe: false },
    { rank: 3, name: "Дмитрий (Энергетик)", streak: 4, tonnage: 31400, lastActive: "25 авг, 18:30", isMe: false },
    { rank: 4, name: "Иван (КИПиА)", streak: 2, tonnage: 24800, lastActive: "24 авг, 20:00", isMe: false }
  ];

  athletes.sort((a, b) => (b.tonnage + b.streak * 1000) - (a.tonnage + a.streak * 1000));

  athletes.forEach((a, idx) => {
    const tr = document.createElement("tr");
    tr.className = `border-b border-slate-800/60 ${a.isMe ? 'bg-emerald-950/30 text-emerald-300 font-bold' : 'text-slate-300'}`;
    tr.innerHTML = `
      <td class="py-2.5 px-1">${idx + 1 === 1 ? '🥇' : idx + 1 === 2 ? '🥈' : idx + 1 === 3 ? '🥉' : idx + 1}</td>
      <td class="py-2.5 px-2">
        <span class="block truncate max-w-[120px]">${a.name}</span>
        ${a.isMe ? '<span class="text-[8px] text-emerald-400 font-mono">🔒 Твои замеры скрыты</span>' : ''}
      </td>
      <td class="py-2.5 px-1 text-center font-bold text-amber-400">🔥${a.streak}</td>
      <td class="py-2.5 px-2 text-right font-bold text-white">${Math.round(a.tonnage).toLocaleString()} кг</td>
      <td class="py-2.5 px-2 text-right text-[10px] text-slate-400">${a.lastActive}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ========================================================
// ACHIEVEMENTS ENGINE
// ========================================================
function checkAchievements() {
  if (!appState.unlockedAchievements) appState.unlockedAchievements = [];

  ACHIEVEMENTS.forEach(ach => {
    if (!appState.unlockedAchievements.includes(ach.id)) {
      if (ach.check(appState)) {
        appState.unlockedAchievements.push(ach.id);
        appState.xp += ach.xp;
        Sound.finish();
        Haptic.success();
      }
    }
  });

  renderAchievementsList();
}

function renderAchievementsList() {
  const container = document.getElementById("achievements-list");
  const countEl = document.getElementById("achievements-unlocked-count");
  if (!container) return;
  container.innerHTML = "";

  const unlocked = appState.unlockedAchievements || [];
  if (countEl) countEl.textContent = `${unlocked.length}/${ACHIEVEMENTS.length} Открыто`;

  ACHIEVEMENTS.forEach(ach => {
    const isUnlocked = unlocked.includes(ach.id);
    const card = document.createElement("div");
    card.className = `p-3 rounded-lg border flex justify-between items-center ${isUnlocked ? 'bg-emerald-950/40 border-emerald-500/80 text-white' : 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'}`;

    card.innerHTML = `
      <div>
        <h4 class="font-bold text-xs ${isUnlocked ? 'text-emerald-300' : 'text-slate-400'}">${ach.title}</h4>
        <p class="text-[10px] text-slate-400 font-sans">${ach.desc}</p>
      </div>
      <span class="px-2 py-1 rounded text-[10px] font-bold font-mono ${isUnlocked ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-600'}">
        ${isUnlocked ? '✓ ОТКРЫТО' : `+${ach.xp} XP`}
      </span>
    `;

    container.appendChild(card);
  });
}

// ========================================================
// METRICS, WHtR & GRAPH
// ========================================================
let currentChartFilter = 'all';

function renderMetrics() {
  if (!appState.currentMetrics) {
    appState.currentMetrics = { weight: 83.0, waist: 91.5, biceps: 38.5, chest: 104.0, thigh: 59.0, neck: 39.5 };
  }

  const cur = appState.currentMetrics;
  setInputValue("tile-weight", cur.weight);
  setInputValue("tile-waist", cur.waist);
  setInputValue("tile-biceps", cur.biceps);
  setInputValue("tile-chest", cur.chest);
  setInputValue("tile-thigh", cur.thigh);
  setInputValue("tile-neck", cur.neck);

  updateWHtRBadge(cur.waist, appState.height || 178);
  drawTrendChart();
}

function setInputValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = (val !== undefined && val !== null) ? val : "";
}

function onTileInputChanged() {
  const cur = appState.currentMetrics || {};
  cur.weight = parseFloat(document.getElementById("tile-weight").value) || 0;
  cur.waist = parseFloat(document.getElementById("tile-waist").value) || 0;
  cur.biceps = parseFloat(document.getElementById("tile-biceps").value) || 0;
  cur.chest = parseFloat(document.getElementById("tile-chest").value) || 0;
  cur.thigh = parseFloat(document.getElementById("tile-thigh").value) || 0;
  cur.neck = parseFloat(document.getElementById("tile-neck").value) || 0;

  appState.currentMetrics = cur;
  updateWHtRBadge(cur.waist, appState.height || 178);
  saveState();
}

function updateWHtRBadge(waist, height = 178) {
  const badge = document.getElementById("whtr-status-badge");
  if (!badge) return;
  if (!waist) {
    badge.textContent = "—";
    return;
  }
  const whtr = (waist / height).toFixed(2);
  if (whtr < 0.49) {
    badge.textContent = `🟢 Норма (${whtr})`;
    badge.className = "px-2 py-0.5 text-xs font-mono font-bold rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800";
  } else if (whtr < 0.54) {
    badge.textContent = `🟡 Умеренный (${whtr})`;
    badge.className = "px-2 py-0.5 text-xs font-mono font-bold rounded-lg bg-amber-950 text-amber-300 border border-amber-800";
  } else {
    badge.textContent = `🔴 Риск (${whtr})`;
    badge.className = "px-2 py-0.5 text-xs font-mono font-bold rounded-lg bg-rose-950 text-rose-300 border border-rose-800";
  }
}

function saveCurrentTilesAsMeasurement() {
  onTileInputChanged();
  const cur = appState.currentMetrics;

  if (!cur.weight && !cur.waist) {
    alert("Пожалуйста, введи вес или талию в ячейках выше!");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  const existingIdx = (appState.metrics || []).findIndex(m => m.date === today);

  const entry = {
    id: "m_" + Date.now(),
    date: today,
    weight: cur.weight || 0,
    waist: cur.waist || 0,
    biceps: cur.biceps || 0,
    chest: cur.chest || 0,
    thigh: cur.thigh || 0,
    neck: cur.neck || 0
  };

  if (existingIdx >= 0) {
    appState.metrics[existingIdx] = entry;
  } else {
    if (!appState.metrics) appState.metrics = [];
    appState.metrics.push(entry);
  }

  addXP(40);
  saveState();
  drawTrendChart();

  Sound.success();
  Haptic.success();
  alert(`✓ Замеры за ${today} сохранены! (+40 XP)`);
}

function setChartFilter(filter) {
  currentChartFilter = filter;
  ['all', 'weight', 'waist', 'biceps'].forEach(f => {
    const btn = document.getElementById("btn-chart-" + f);
    if (btn) {
      if (f === filter) {
        btn.className = "px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500 text-slate-950";
      } else {
        btn.className = "px-2 py-0.5 text-[10px] font-bold rounded text-slate-400";
      }
    }
  });
  drawTrendChart();
}

function drawTrendChart() {
  const canvas = document.getElementById("chart-canvas");
  if (!canvas) return;

  const parentWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 0;
  const w = canvas.width = (parentWidth > 50 ? parentWidth : (window.innerWidth ? window.innerWidth - 48 : 320));
  const h = canvas.height = 170;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, w, h);

  const logs = (appState.metrics || []).filter(m => m && (m.weight > 0 || m.waist > 0));
  if (logs.length < 2) {
    ctx.fillStyle = "#64748b";
    ctx.font = "11px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Добавь минимум 2 замера для отображения графика", w / 2, h / 2);
    return;
  }

  const weights = logs.map(l => l.weight || 0).filter(v => v > 0);
  const waists = logs.map(l => l.waist || 0).filter(v => v > 0);
  const biceps = logs.map(l => l.biceps || 0).filter(v => v > 0);

  let activeSeries = [];
  if (currentChartFilter === 'all') activeSeries = [...weights, ...waists, ...biceps];
  else if (currentChartFilter === 'weight') activeSeries = weights;
  else if (currentChartFilter === 'waist') activeSeries = waists;
  else if (currentChartFilter === 'biceps') activeSeries = biceps;

  if (activeSeries.length === 0) activeSeries = [50, 100];

  const min = Math.min(...activeSeries) - 1.5;
  const max = Math.max(...activeSeries) + 1.5;

  function getY(v) { return 20 + (1 - (v - min) / (max - min)) * (h - 42); }
  function getX(i) { return 35 + (i / (logs.length - 1)) * (w - 60); }

  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 3; i++) {
    const y = 20 + (i / 3) * (h - 42);
    ctx.beginPath();
    ctx.moveTo(35, y);
    ctx.lineTo(w - 20, y);
    ctx.stroke();

    const val = (max - (i / 3) * (max - min)).toFixed(0);
    ctx.fillStyle = "#475569";
    ctx.font = "10px monospace";
    ctx.textAlign = "right";
    ctx.fillText(val, 30, y + 3);
  }

  function drawLine(data, color) {
    if (data.length < 2) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = getX(i), y = getY(v);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    data.forEach((v, i) => {
      const x = getX(i), y = getY(v);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  if (currentChartFilter === 'all' || currentChartFilter === 'weight') {
    drawLine(logs.map(l => l.weight || 0), "#10b981");
  }
  if (currentChartFilter === 'all' || currentChartFilter === 'waist') {
    drawLine(logs.map(l => l.waist || 0), "#06b6d4");
  }
  if (currentChartFilter === 'all' || currentChartFilter === 'biceps') {
    drawLine(logs.map(l => l.biceps || 0), "#8b5cf6");
  }
}

// ========================================================
// 3-PHASE VACUUM TRAINER
// ========================================================
let vacuumState = {
  active: false,
  phase: 'idle',
  duration: 15,
  currentSet: 1,
  maxSets: 5,
  timeLeft: 15,
  interval: null
};

function setVacuumDuration(sec) {
  if (vacuumState.active) return;
  vacuumState.duration = sec;
  vacuumState.timeLeft = sec;
  document.getElementById("vac-timer-text").textContent = sec;
}

function toggleVacuumSession() {
  if (vacuumState.active) {
    resetVacuumSession();
    return;
  }
  startVacuumPhase('inhale');
}

function resetVacuumSession() {
  clearInterval(vacuumState.interval);
  vacuumState.active = false;
  vacuumState.phase = 'idle';
  vacuumState.timeLeft = vacuumState.duration;

  const circle = document.getElementById("vac-circle");
  const txt = document.getElementById("vac-timer-text");
  const phaseEl = document.getElementById("vac-phase");
  const instr = document.getElementById("vac-instruction");
  const btn = document.getElementById("btn-vac-start");

  if (circle) circle.className = "w-20 h-20 rounded-full bg-cyan-950/40 border-4 border-cyan-400 flex flex-col items-center justify-center shadow-lg shadow-cyan-500/20";
  if (txt) txt.textContent = vacuumState.duration;
  if (phaseEl) phaseEl.textContent = "Готов к старту";
  if (instr) instr.textContent = "Нажми «Старт», сделай вдох грудью, выдох и втяни живот.";
  if (btn) btn.textContent = "▶️ Старт подхода";
}

function startVacuumPhase(phase) {
  clearInterval(vacuumState.interval);
  vacuumState.active = true;
  vacuumState.phase = phase;

  const circle = document.getElementById("vac-circle");
  const txt = document.getElementById("vac-timer-text");
  const phaseEl = document.getElementById("vac-phase");
  const instr = document.getElementById("vac-instruction");
  const btn = document.getElementById("btn-vac-start");
  const setEl = document.getElementById("vac-set-counter");

  if (setEl) setEl.textContent = `${vacuumState.currentSet}/${vacuumState.maxSets}`;
  if (btn) btn.textContent = "⏹️ Стоп";

  if (phase === 'inhale') {
    vacuumState.timeLeft = 4;
    circle.className = "w-20 h-20 rounded-full bg-emerald-950/50 border-4 border-emerald-400 flex flex-col items-center justify-center shadow-lg scale-110";
    phaseEl.textContent = "1. ВДОХ ГРУДЬЮ";
    instr.textContent = "Медленно наполняй легкие...";
    txt.textContent = vacuumState.timeLeft;
    Sound.beep(440, 0.2);
  } else if (phase === 'exhale') {
    vacuumState.timeLeft = 4;
    circle.className = "w-20 h-20 rounded-full bg-amber-950/50 border-4 border-amber-400 flex flex-col items-center justify-center shadow-lg scale-95";
    phaseEl.textContent = "2. ПОЛНЫЙ ВЫДОХ";
    instr.textContent = "Выдохни весь воздух до конца!";
    txt.textContent = vacuumState.timeLeft;
    Sound.beep(550, 0.2);
  } else if (phase === 'hold') {
    vacuumState.timeLeft = vacuumState.duration;
    circle.className = "w-20 h-20 rounded-full bg-cyan-950/60 border-4 border-cyan-300 flex flex-col items-center justify-center shadow-2xl scale-90";
    phaseEl.textContent = "3. ДЕРЖИ ВАКУУМ!";
    instr.textContent = "Втяни живот под ребра и держи.";
    txt.textContent = vacuumState.timeLeft;
    Sound.finish();
  } else if (phase === 'rest') {
    vacuumState.timeLeft = 25;
    circle.className = "w-20 h-20 rounded-full bg-slate-900 border-4 border-slate-700 flex flex-col items-center justify-center";
    phaseEl.textContent = `ПОДХОД ${vacuumState.currentSet} ЗАВЕРШЕН`;
    instr.textContent = "Отдых между подходами...";
    txt.textContent = vacuumState.timeLeft;
    addXP(20);
    Sound.success();
  }

  vacuumState.interval = setInterval(() => {
    if (vacuumState.timeLeft > 1) {
      vacuumState.timeLeft--;
      if (txt) txt.textContent = vacuumState.timeLeft;
    } else {
      clearInterval(vacuumState.interval);
      if (vacuumState.phase === 'inhale') startVacuumPhase('exhale');
      else if (vacuumState.phase === 'exhale') startVacuumPhase('hold');
      else if (vacuumState.phase === 'hold') {
        if (vacuumState.currentSet < vacuumState.maxSets) {
          startVacuumPhase('rest');
        } else {
          resetVacuumSession();
          appState.vacDaysCount = (appState.vacDaysCount || 0) + 1;
          addXP(50);
          Sound.finish();
          Haptic.success();
          alert("🎉 Все 5 подходов вакуума выполнены! (+50 XP).");
        }
      } else if (vacuumState.phase === 'rest') {
        vacuumState.currentSet++;
        startVacuumPhase('inhale');
      }
    }
  }, 1000);
}

// ========================================================
// NUTRITION & MACROS
// ========================================================
function addProtein(p, cal) {
  if (!appState.nutrition) appState.nutrition = { protein: 0, waterMl: 0, calories: 0, caloriesBurned: 0 };
  appState.nutrition.protein = (appState.nutrition.protein || 0) + p;
  appState.nutrition.calories = (appState.nutrition.calories || 0) + (cal || p * 4);
  if (appState.nutrition.protein >= 150) {
    appState.protDaysCount = (appState.protDaysCount || 0) + 1;
  }
  addXP(10);
  saveState();
  renderNutrition();
  Sound.beep(700, 0.08);
  Haptic.impact('light');
}

function renderNutrition() {
  const nut = appState.nutrition || {};
  const weight = (appState.currentMetrics && appState.currentMetrics.weight) ? appState.currentMetrics.weight : 83;
  const targetProtein = Math.round(weight * 1.8);
  const targetWater = (weight * 0.032).toFixed(1);

  const p = nut.protein || 0;
  const w = nut.waterMl || 0;
  const calEaten = nut.calories || 0;
  const calBurned = nut.caloriesBurned || 0;

  const pVal = document.getElementById("nut-p-val");
  const pBar = document.getElementById("nut-p-bar");
  const wVal = document.getElementById("nut-w-val");
  const wBar = document.getElementById("nut-w-bar");
  const elEaten = document.getElementById("nut-cal-eaten");
  const elBurned = document.getElementById("nut-cal-burned");

  if (pVal) pVal.textContent = `${p} / ${targetProtein} г`;
  if (pBar) pBar.style.width = `${Math.min(100, (p / targetProtein) * 100)}%`;

  if (wVal) wVal.textContent = `${(w / 1000).toFixed(2)} / ${targetWater} л`;
  if (wBar) wBar.style.width = `${Math.min(100, (w / (targetWater * 1000)) * 100)}%`;

  if (elEaten) elEaten.textContent = `${calEaten} ккал`;
  if (elBurned) elBurned.textContent = `${calBurned} ккал 🔥`;
}

// ========================================================
// ARCHIVE & HISTORY
// ========================================================
function renderHistory() {
  const container = document.getElementById("history-container");
  if (!container) return;
  container.innerHTML = "";

  const hist = appState.history || [];
  if (hist.length === 0) {
    container.innerHTML = `
      <div class="glass-strict p-6 rounded-xl text-center text-slate-400 space-y-2 border border-slate-800 font-mono">
        <span class="text-2xl block">📋</span>
        <p class="text-xs font-bold text-slate-200">Журнал тренировок пуст</p>
        <p class="text-[10px] text-slate-400">Начни тренировку во вкладке «Тренинг» или нажми «➕ Добавить» выше.</p>
      </div>
    `;
    return;
  }

  hist.forEach((h, idx) => {
    const card = document.createElement("div");
    card.className = "glass-strict p-3.5 rounded-xl space-y-2 border border-slate-800 font-mono text-xs";

    const exList = (h.exercises || []).map(e => `
      <div class="flex justify-between items-center text-[11px] py-1 border-b border-slate-800/50 last:border-0 font-sans">
        <span class="text-slate-300 font-medium">${e.name}</span>
        <div class="text-right font-mono">
          <span class="text-emerald-400 font-bold block">${e.sets}</span>
          <span class="text-[9px] text-amber-400">${e.prog || ''}</span>
        </div>
      </div>
    `).join("");

    card.innerHTML = `
      <div class="flex justify-between items-start pb-1.5 border-b border-slate-800">
        <div>
          <h4 class="font-bold text-white text-xs font-sans">${h.name}</h4>
          <span class="text-[10px] text-slate-400">${h.timeStr || h.date} • Готовность ${h.readiness || 90}%</span>
        </div>
        <div class="flex items-center space-x-2 text-right">
          <div>
            <span class="text-xs text-emerald-400 font-black">${h.tonnage} кг</span>
            <span class="text-[8px] text-slate-400 block">тоннаж</span>
          </div>
          <div class="border-l border-slate-800 pl-2">
            <span class="text-xs text-amber-400 font-black">${h.calories || 350} ккал</span>
            <span class="text-[8px] text-slate-400 block">сожжено 🔥</span>
          </div>
        </div>
      </div>
      <div class="space-y-0.5 pt-1">${exList}</div>
      <div class="flex justify-end space-x-2 pt-1.5 border-t border-slate-800/60 text-[10px]">
        <button onclick="openEditHistoryModal(${idx})" class="px-2 py-0.5 bg-slate-800 text-cyan-300 rounded border border-slate-700 touch-press">✏️ Редактировать</button>
        <button onclick="deleteHistoryItemDirect(${idx})" class="px-2 py-0.5 bg-rose-950 text-rose-300 rounded border border-rose-900 touch-press">🗑️ Удалить</button>
      </div>
    `;

    container.appendChild(card);
  });
}

let currentEditingHistoryIndex = null;

function openEditHistoryModal(idx) {
  currentEditingHistoryIndex = idx;
  const h = appState.history[idx];

  document.getElementById("edit-h-name").value = h.name;
  document.getElementById("edit-h-date").value = h.date;
  document.getElementById("edit-h-tonnage").value = h.tonnage;
  document.getElementById("edit-h-calories").value = h.calories || 350;

  const exContainer = document.getElementById("edit-h-exercises");
  exContainer.innerHTML = '<span class="text-[9px] text-slate-400 block mb-1">Упражнения:</span>';

  (h.exercises || []).forEach((e, eIdx) => {
    const row = document.createElement("div");
    row.className = "grid grid-cols-12 gap-1.5 items-center";
    row.innerHTML = `
      <input type="text" value="${e.name}" id="edit-ex-name-${eIdx}" class="col-span-6 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-white text-xs outline-none">
      <input type="text" value="${e.sets}" id="edit-ex-sets-${eIdx}" class="col-span-6 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-emerald-400 font-mono text-xs outline-none">
    `;
    exContainer.appendChild(row);
  });

  openModal("modal-edit-history");
}

function saveEditedHistoryItem() {
  if (currentEditingHistoryIndex === null) return;
  const h = appState.history[currentEditingHistoryIndex];

  h.name = document.getElementById("edit-h-name").value;
  h.date = document.getElementById("edit-h-date").value;
  h.tonnage = parseFloat(document.getElementById("edit-h-tonnage").value) || 0;
  h.calories = parseFloat(document.getElementById("edit-h-calories").value) || 350;

  (h.exercises || []).forEach((e, eIdx) => {
    const nameInput = document.getElementById(`edit-ex-name-${eIdx}`);
    const setsInput = document.getElementById(`edit-ex-sets-${eIdx}`);
    if (nameInput) e.name = nameInput.value;
    if (setsInput) e.sets = setsInput.value;
  });

  saveState();
  closeModal("modal-edit-history");
  renderHistory();
  Sound.success();
  Haptic.success();
}

function deleteCurrentEditingHistoryItem() {
  if (currentEditingHistoryIndex === null) return;
  if (confirm("Удалить эту запись из архива?")) {
    appState.history.splice(currentEditingHistoryIndex, 1);
    saveState();
    closeModal("modal-edit-history");
    renderHistory();
    Sound.beep(400, 0.1);
  }
}

function deleteHistoryItemDirect(idx) {
  if (confirm("Удалить эту тренировку из архива?")) {
    appState.history.splice(idx, 1);
    saveState();
    renderHistory();
    Sound.beep(400, 0.1);
  }
}

function openAddManualWorkoutModal() {
  const name = prompt("Название тренировки:", "Вторник: Full Body A");
  if (!name) return;
  const tonnage = prompt("Общий тоннаж (кг):", "4000");
  const cals = prompt("Сожжено калорий (ккал):", "380");

  if (!appState.history) appState.history = [];
  appState.history.unshift({
    id: "wo_" + Date.now(),
    date: new Date().toISOString().split("T")[0],
    timeStr: new Date().toLocaleString('ru-RU', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
    name: name,
    readiness: 90,
    tonnage: parseFloat(tonnage) || 0,
    calories: parseFloat(cals) || 380,
    exercises: [
      { name: "Жим на наклонной 30°", sets: "22кг × 10, 10, 10, 10", prog: "🚀 Закрыто!" },
      { name: "Жим гантелей лежа", sets: "24кг × 8, 8, 8, 8", prog: "🚀 Закрыто!" }
    ]
  });

  addXP(100);
  saveState();
  renderHistory();
  Sound.success();
}

function copyCoachSummary() {
  const m = appState.currentMetrics || {};
  const hist = appState.history || [];
  const nut = appState.nutrition || {};

  let lastWosText = "";
  if (hist.length === 0) {
    lastWosText = "Тренировок в архиве пока нет.";
  } else {
    lastWosText = hist.slice(0, 3).map((h, i) => 
      `${i + 1}) ${h.timeStr || h.date} — ${h.name} (Тоннаж: ${h.tonnage}кг, Сожжено: ~${h.calories || 350}ккал, Готовность: ${h.readiness || 90}%)`
    ).join("\n");
  }

  const summary = `📊 [АСУ ТП IRON COACH — СВОДКА АТЛЕТА]:
• Атлет: ${appState.name} | Возраст: ${appState.age || 32} | Рост: ${appState.height || 178} см
• Фаза мезоцикла: Неделя ${appState.mesocycleWeek || 1} из 8
• Особенности/Ограничения: ${appState.injuries || 'Резекция левого легкого, спазм m. levator scapulae'}
• Текущий вес: ${m.weight || 83} кг
• Талия по пупку: ${m.waist || 91.5} см (WHtR: ${((m.waist || 91.5) / (appState.height || 178)).toFixed(2)})
• Бицепс: ${m.biceps || 38.5} см | Грудь: ${m.chest || 104} см | Бедро: ${m.thigh || 59} см | Шея: ${m.neck || 39.5} см
• Стрик тренировок: 🔥${appState.streak || 0} | Общий тоннаж: ${getTotalTonnage(appState).toLocaleString()} кг
• Последние тренировки:
${lastWosText}`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(summary).then(() => {
      Sound.success();
      Haptic.success();
      alert(`✓ Сводка атлета «${appState.name}» скопирована в буфер обмена!\n\nПросто вставь (Ctrl+V) в чат с тренером.`);
    }).catch(() => {
      prompt("Скопируй текст сводки вручную:", summary);
    });
  } else {
    prompt("Скопируй текст сводки вручную:", summary);
  }

  sendCoachReportToTelegram(`<pre>${summary}</pre>`);
}

async function sendCoachReportToTelegram(reportHtml) {
  try {
    const user = window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user;
    const chatId = user ? user.id : null;
    if (!chatId) return;

    await fetch('/api/sync-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, text: reportHtml })
    });
  } catch(e) {}
}

function switchTab(tabId) {
  Sound.beep(500, 0.05);
  Haptic.impact('light');

  document.querySelectorAll(".tab-pane").forEach(el => el.classList.remove("active"));
  document.querySelectorAll("nav button").forEach(el => {
    el.classList.remove("text-emerald-400");
    el.classList.add("text-slate-400");
  });

  const targetPane = document.getElementById("tab-" + tabId);
  const targetNav = document.getElementById("nav-" + tabId);

  if (targetPane) targetPane.classList.add("active");
  if (targetNav) {
    targetNav.classList.remove("text-slate-400");
    targetNav.classList.add("text-emerald-400");
  }

  if (tabId === "schedule") setScheduleView('week');
  if (tabId === "leaderboard") {
    renderLeaderboard();
    renderAchievementsList();
  }
  if (tabId === "metrics") {
    setTimeout(() => {
      renderMetrics();
      drawTrendChart();
    }, 50);
  }
  if (tabId === "nutrition") renderNutrition();
  if (tabId === "history") renderHistory();
}

function openModal(modalId) {
  Sound.beep(600, 0.08);
  Haptic.impact('light');
  document.getElementById(modalId).classList.remove("hidden");
  if (modalId === "modal-1rm") calculate1RM();
}
function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}

function calculate1RM() {
  const w = parseFloat(document.getElementById("rm-calc-weight").value) || 0;
  const r = parseInt(document.getElementById("rm-calc-reps").value) || 1;
  const resEl = document.getElementById("rm-calc-result");

  if (w <= 0 || r <= 0) {
    resEl.innerHTML = `<span>Введи корректные данные</span>`;
    return;
  }

  const oneRM = Math.round(w * (1 + r / 30.0));
  const eightyPct = Math.round(oneRM * 0.80);
  const seventyPct = Math.round(oneRM * 0.70);

  resEl.innerHTML = `
    <div class="flex justify-between items-center pb-1 border-b border-slate-800">
      <span class="text-slate-400">Одноповторный максимум (1ПМ):</span>
      <span class="text-sm font-bold text-violet-300">${oneRM} кг</span>
    </div>
    <div class="flex justify-between text-[10px] pt-1">
      <span>80% (Рабочий 8-10): <b>${eightyPct} кг</b></span>
      <span>70% (12-15): <b>${seventyPct} кг</b></span>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
  loadState();
  renderXP();
  renderMesocycleBanner();
  renderMetrics();
  renderNutrition();
});
