/**
 * IRON COACH ELITE - High-Performance Hypertrophy, Focus Workout & Calendar Hub
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
// S-TIER TRAINING PROTOCOLS
// ========================================================
const DEFAULT_PROGRAMS = {
  a: {
    name: "Вторник: Full Body A (Верх базы + Жим + Квадры + Спина)",
    exercises: [
      { id: "ex1", name: "Жим гантелей на наклонной скамье 30°", sets: 4, min: 8, max: 10, w: 22, calRate: 12, tip: "Локти 60-70° к телу, лопатки сведены и опущены вниз (депрессия лопатки).", substitutes: ["Жим штанги на наклонной 30°", "Жим в наклонном Хаммере"] },
      { id: "ex2", name: "Жим гантелей / штанги на горизонтальной скамье", sets: 4, min: 8, max: 10, w: 24, calRate: 12, tip: "Мощный подконтрольный выжим, микропауза 1 сек в нижней точке растяжения.", substitutes: ["Жим штанги лежа", "Жим в горизонтальном Хаммере"] },
      { id: "ex3", name: "Жим ногами под углом 45° в тренажере", sets: 4, min: 10, max: 12, w: 90, calRate: 16, tip: "Колени вверху не вставляй, упор в середину стопы и пятки.", substitutes: ["Приседания со штангой", "Гакк-приседания"] },
      { id: "ex4", name: "Тяга горизонтального блока к поясу (нейтрально)", sets: 4, min: 10, max: 12, w: 45, calRate: 11, tip: "Локти скользят вдоль ребер назад, плечи зафиксированы внизу.", substitutes: ["Тяга Т-грифа", "Тяга гантели в упоре"] },
      { id: "ex5", name: "Сгибания ног сидя/лежа в тренажере", sets: 3, min: 12, max: 15, w: 35, calRate: 8, tip: "Медленный негатив 2-3 сек, акцент на растяжение бицепса бедра.", substitutes: ["Румынская тяга на 1 ноге"] },
      { id: "ex6", name: "Махи гантелями в стороны стоя", sets: 4, min: 12, max: 15, w: 8, calRate: 7, tip: "Подъем через стороны локтями до параллели, кисть не задирай выше локтя.", substitutes: ["Махи на нижнем блоке"] },
      { id: "ex7", name: "Разгибания рук на блоке с канатом", sets: 3, min: 12, max: 15, w: 20, calRate: 6, tip: "Локти прижаты к корпусу, разводи канат в нижней точке.", substitutes: ["Французский жим с гантелями"] },
      { id: "ex8", name: "Скручивания на блоке с канатом («Молитва»)", sets: 3, min: 12, max: 15, w: 35, calRate: 8, tip: "Скручивай грудную клетку к тазу силой пресса, а не наклоном бедер.", substitutes: ["Подъем ног на наклонной скамье", "Скручивания на фитболе"] }
    ]
  },
  b: {
    name: "Четверг: Full Body B (Бабочка + Брусья + Румынка + V-Тяга)",
    exercises: [
      { id: "ex1", name: "Сведения в бабочке / кроссовере (Pec-Deck)", sets: 4, min: 10, max: 12, w: 25, calRate: 9, tip: "Глубокая растяжка фасций в негативе и пауза 2 сек в пиковом сведении.", substitutes: ["Разводка гантелей на наклонной скамье"] },
      { id: "ex2", name: "Отжимания на брусьях (наклон) / Жим в Хаммере", sets: 4, min: 8, max: 10, w: 0, calRate: 11, tip: "Корпус наклонен вперед под 30°, локти под 45° к корпусу.", substitutes: ["Жим гантелей головой вниз"] },
      { id: "ex3", name: "Румынская тяга с гантелями", sets: 4, min: 10, max: 12, w: 22, calRate: 15, tip: "Таз максимально назад, колени мягкие, спина ровная.", substitutes: ["Гиперэкстензия с весом", "Тяга сумо"] },
      { id: "ex4", name: "Тяга верхнего блока нейтральным (V-образным) хватом", sets: 4, min: 10, max: 12, w: 50, calRate: 12, tip: "Двуручная симметричная тяга к ключицам, лопатки опущены вниз.", substitutes: ["Подтягивания нейтральным хватом", "Тяга широким хватом"] },
      { id: "ex5", name: "Гакк-приседания в тренажере / Шагающие выпады", sets: 3, min: 10, max: 12, w: 35, calRate: 13, tip: "Глубокая амплитуда, колени по направлению носков.", substitutes: ["Болгарские сплит-приседания"] },
      { id: "ex6", name: "Жим гантелей сидя на скамье 75°", sets: 4, min: 8, max: 10, w: 16, calRate: 9, tip: "Плавный жим над головой без резких рывков поясницей.", substitutes: ["Армейский жим стоя", "Жим в Хаммере"] },
      { id: "ex7", name: "Подъем гантелей на бицепс с супинацией", sets: 3, min: 10, max: 12, w: 12, calRate: 6, tip: "Разворот кисти наружу в верхней трети амплитуды.", substitutes: ["Подъем штанги на бицепс EZ"] },
      { id: "ex8", name: "Подъем ног / коленей в висе на брусьях", sets: 3, min: 12, max: 15, isTime: false, w: 0, calRate: 7, tip: "Подкручивай таз вверх на выдохе для активации нижнего пресса.", substitutes: ["Складка на скамье"] }
    ]
  },
  c: {
    name: "Воскресенье: День В [ОПЦИОНАЛЬНО] (Recharge + Шея/Лопатка + Зона 2)",
    exercises: [
      { id: "ex1", name: "Face Pulls (Тяга каната к лицу)", sets: 4, min: 15, max: 20, w: 15, calRate: 8, tip: "Канат к глазам, локти разводи назад, пауза 2 сек (разгрузка шеи и лопатки).", substitutes: ["Разводка на заднюю дельту"] },
      { id: "ex2", name: "Жим гантелей на наклонной скамье 15-30° (пампинг)", sets: 3, min: 12, max: 15, w: 16, calRate: 8, tip: "Чистая накачка кровью в запасе 3-4 повтора без отказа.", substitutes: ["Сведения в кроссовере"] },
      { id: "ex3", name: "Суперсет на руки: Бицепс молот + Французский жим", sets: 3, min: 12, max: 15, w: 22, calRate: 11, tip: "Пампинг рук, закачка локтевых сухожилий.", substitutes: ["Памп на блоке"] },
      { id: "ex4", name: "Подъем на носки стоя на платформе", sets: 4, min: 15, max: 20, w: 50, calRate: 8, tip: "Полная амплитуда с растяжкой икр внизу 2 сек.", substitutes: ["Подъем на носки сидя"] },
      { id: "ex5", name: "Ходьба в горку на дорожке (Зона 2)", sets: 1, min: 25, max: 30, isTime: true, w: 0, calRate: 200, tip: "Уклон 8-10%, скорость 5.5 км/ч. Сжигание висцерального жира.", substitutes: ["Эллипс Зона 2"] }
    ]
  }
};

// ========================================================
// 18+ TIERED ACHIEVEMENTS DATA
// ========================================================
const ACHIEVEMENTS = [
  // STRENGTH (5)
  { id: "ach_first", cat: "strength", title: "🥉 Первый импульс", desc: "Заверши 1-ю тренировку", target: 1, current: (s) => (s.history || []).length, xp: 100 },
  { id: "ach_ton_10", cat: "strength", title: "🏋️ Клуб 10 Тонн", desc: "Подними суммарно 10 000 кг", target: 10000, current: (s) => getTotalTonnage(s), xp: 200 },
  { id: "ach_ton_50", cat: "strength", title: "🏋️ Клуб 50 Тонн", desc: "Подними суммарно 50 000 кг", target: 50000, current: (s) => getTotalTonnage(s), xp: 500 },
  { id: "ach_ton_100", cat: "strength", title: "🏛️ Титан 100 Тонн", desc: "Подними суммарно 100 000 кг", target: 10000, current: (s) => getTotalTonnage(s), xp: 1000 },
  { id: "ach_ton_250", cat: "strength", title: "👑 Легенда 250 Тонн", desc: "Подними суммарно 250 000 кг", target: 250000, current: (s) => getTotalTonnage(s), xp: 2500 },

  // STREAKS (4)
  { id: "ach_strk_3", cat: "streak", title: "🔥 Три в ряд", desc: "Серия из 3 тренировок подряд", target: 3, current: (s) => (s.streak || 0), xp: 250 },
  { id: "ach_strk_7", cat: "streak", title: "⚡ Железная неделя", desc: "Серия из 7 тренировок подряд", target: 7, current: (s) => (s.streak || 0), xp: 450 },
  { id: "ach_strk_10", cat: "streak", title: "🛡️ Стальная декада", desc: "Серия из 10 тренировок подряд", target: 10, current: (s) => (s.streak || 0), xp: 700 },
  { id: "ach_strk_30", cat: "streak", title: "🗿 Кремень 30", desc: "Серия из 30 регулярных занятий", target: 30, current: (s) => (s.streak || 0), xp: 2000 },

  // BODY & VACUUM (3)
  { id: "ach_vac_1", cat: "body", title: "🌬️ Первое втягивание", desc: "Выполни 1-ю утреннюю сессию вакуума", target: 1, current: (s) => (s.vacDaysCount || 0), xp: 100 },
  { id: "ach_vac_5", cat: "body", title: "🌬️ Вакуумный монолит", desc: "Выполни 5 дней утреннего вакуума", target: 5, current: (s) => (s.vacDaysCount || 0), xp: 300 },
  { id: "ach_vac_14", cat: "body", title: "🛡️ Стальной корсет", desc: "Выполни 14 дней утреннего вакуума", target: 14, current: (s) => (s.vacDaysCount || 0), xp: 800 },

  // NUTRITION (4)
  { id: "ach_prot_3", cat: "nutrition", title: "🥩 Белковый старт", desc: "Закрой норму 150г белка 3 дня", target: 3, current: (s) => (s.protDaysCount || 0), xp: 200 },
  { id: "ach_prot_7", cat: "nutrition", title: "🥩 Белковый баланс", desc: "Закрой норму 150г белка 7 дней", target: 7, current: (s) => (s.protDaysCount || 0), xp: 400 },
  { id: "ach_prot_21", cat: "nutrition", title: "🥩 Мастер рекомпозиции", desc: "Закрой норму белка 21 день", target: 21, current: (s) => (s.protDaysCount || 0), xp: 1200 },
  { id: "ach_water_14", cat: "nutrition", title: "💧 Водный баланс", desc: "Выпей норму воды 14 дней подряд", target: 14, current: (s) => (s.waterDaysCount || 0), xp: 500 },

  // MESOCYCLES (2)
  { id: "ach_meso_1", cat: "meso", title: "🏆 Мастер мезоцикла", desc: "Заверши 8-недельный цикл", target: 8, current: (s) => (s.mesocycleWeek || 1), xp: 1000 },
  { id: "ach_meso_3", cat: "meso", title: "🔬 Профессор периодизации", desc: "Заверши 3 полных мезоцикла (24 нед)", target: 24, current: (s) => (s.totalMesoWeeks || s.mesocycleWeek || 1), xp: 3000 }
];

function getTotalTonnage(s) {
  return (s.history || []).reduce((sum, h) => sum + (h.tonnage || 0), 0);
}

// ========================================================
// TELEGRAM ACCOUNT STATE
// ========================================================
function getInitialAccount() {
  return {
    tgId: "asutp_iron_account_default",
    name: "Роман",
    age: 32,
    height: 178,
    injuries: "Резекция левого легкого, спазм m. levator scapulae",
    goal: "Рекомпозиция (Сушка жира + Мышечный тонус)",
    mesocycleWeek: 3,
    totalMesoWeeks: 3,
    xp: 0,
    streak: 0,
    vacDaysCount: 0,
    protDaysCount: 0,
    waterDaysCount: 0,
    currentMetrics: { weight: 83.0, waist: 91.5, biceps: 38.5, chest: 104.0, thigh: 59.0, neck: 39.5 },
    metrics: [
      { id: "m_init", date: new Date().toISOString().split("T")[0], weight: 83.0, waist: 91.5, biceps: 38.5, chest: 104.0, thigh: 59.0, neck: 39.5 }
    ],
    nutrition: { protein: 0, waterMl: 0, calories: 0, caloriesBurned: 0, date: new Date().toISOString().split("T")[0] },
    history: [],
    activeWorkout: null,
    unlockedAchievements: []
  };
}

let appState = getInitialAccount();
let pendingWorkoutPlanKey = 'a';
let currentAchFilter = 'all';

// CALENDAR STATE
let calYear = 2026;
let calMonth = 7; // August (0-indexed)
let selectedCalDateStr = "2026-08-27";

const MONTH_NAMES = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];
const MONTH_SHORT = [
  "Янв", "Фев", "Мар", "Апр", "Май", "Июн",
  "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
];

function loadState() {
  let tgKey = "asutp_iron_account_default";
  let tgName = "Роман";
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

  const elName = document.getElementById("tg-user-name");
  const elAvatar = document.getElementById("tg-user-avatar");
  if (elName) elName.textContent = appState.name;
  if (elAvatar) elAvatar.textContent = tgAvatar;

  saveState();
  checkAchievements();
  renderPersonalizedVitamins();
  updateProfileDisplay();
  renderMonthlyCalendar();
  render12MonthsAnnualBreakdown();
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
// PROFILE DRAWER & ACTIONS
// ========================================================
function openProfileDrawer() {
  updateProfileDisplay();
  openModal('modal-profile-drawer');
}

function updateProfileDisplay() {
  const nameEl = document.getElementById("prof-disp-name");
  const ageEl = document.getElementById("prof-disp-age");
  const goalEl = document.getElementById("prof-disp-goal");
  const injEl = document.getElementById("prof-disp-injuries");

  if (nameEl) nameEl.textContent = appState.name;
  if (ageEl) ageEl.textContent = `${appState.age || 32} г • ${appState.height || 178} см`;
  if (goalEl) goalEl.textContent = appState.goal || "Рекомпозиция";
  if (injEl) injEl.textContent = appState.injuries || "Нет";
}

// ========================================================
// ONBOARDING WIZARD & 15-SECOND SAFE ACCOUNT RESET
// ========================================================
let resetTimerInterval = null;
let resetSecondsLeft = 15;

function openSafeResetModal() {
  closeModal('modal-profile-drawer');
  resetSecondsLeft = 15;
  clearInterval(resetTimerInterval);

  const btn = document.getElementById("btn-confirm-safe-reset");
  const txt = document.getElementById("reset-countdown-text");

  btn.disabled = true;
  btn.className = "flex-1 py-3 bg-slate-800 text-slate-500 font-black uppercase rounded-xl cursor-not-allowed transition-all";
  btn.textContent = `Сбросить (${resetSecondsLeft}с)`;
  txt.textContent = `Подождите ${resetSecondsLeft} сек...`;

  openModal('modal-safe-reset');

  resetTimerInterval = setInterval(() => {
    resetSecondsLeft--;
    if (resetSecondsLeft > 0) {
      btn.textContent = `Сбросить (${resetSecondsLeft}с)`;
      txt.textContent = `Подождите ${resetSecondsLeft} сек...`;
    } else {
      clearInterval(resetTimerInterval);
      btn.disabled = false;
      btn.className = "flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-black uppercase rounded-xl cursor-pointer transition-all";
      btn.textContent = "🗑️ Подтвердить полный сброс";
      txt.textContent = "✓ Защита снята: можно выполнить сброс";
      txt.className = "text-sm font-black text-rose-400 font-mono";
      Sound.beep(880, 0.2);
      Haptic.impact('heavy');
    }
  }, 1000);
}

function executeSafeResetAndReOnboard() {
  clearInterval(resetTimerInterval);
  closeModal('modal-safe-reset');

  const currentTgId = appState.tgId;
  const currentName = appState.name;

  appState = getInitialAccount();
  appState.tgId = currentTgId;
  appState.name = currentName;

  saveState();
  Sound.finish();
  Haptic.success();

  alert("✓ Профиль успешно сброшен!");
  openOnboardingModal();
}

function openOnboardingModal() {
  closeModal('modal-profile-drawer');
  document.getElementById("onboard-name").value = appState.name || "Роман";
  document.getElementById("onboard-age").value = appState.age || 32;
  document.getElementById("onboard-height").value = appState.height || 178;
  document.getElementById("onboard-weight").value = appState.currentMetrics ? appState.currentMetrics.weight : 83;
  document.getElementById("onboard-waist").value = appState.currentMetrics ? appState.currentMetrics.waist : 91.5;
  document.getElementById("onboard-goal").value = appState.goal || "Рекомпозиция (Сушка жира + Мышечный тонус)";
  document.getElementById("onboard-injuries").value = appState.injuries || "";

  openModal('modal-onboarding');
}

function saveOnboardingProfile(e) {
  e.preventDefault();

  const name = document.getElementById("onboard-name").value.trim();
  const age = parseInt(document.getElementById("onboard-age").value) || 32;
  const height = parseInt(document.getElementById("onboard-height").value) || 178;
  const weight = parseFloat(document.getElementById("onboard-weight").value) || 83.0;
  const waist = parseFloat(document.getElementById("onboard-waist").value) || 91.5;
  const goal = document.getElementById("onboard-goal").value;
  const injuries = document.getElementById("onboard-injuries").value.trim();

  appState.name = name;
  appState.age = age;
  appState.height = height;
  appState.goal = goal;
  appState.injuries = injuries;

  if (!appState.currentMetrics) {
    appState.currentMetrics = { weight, waist, biceps: 38.5, chest: 104, thigh: 59, neck: 39.5 };
  } else {
    appState.currentMetrics.weight = weight;
    appState.currentMetrics.waist = waist;
  }

  const today = new Date().toISOString().split("T")[0];
  appState.metrics = [
    { id: "m_init_" + Date.now(), date: today, weight, waist, biceps: 38.5, chest: 104, thigh: 59, neck: 39.5 }
  ];

  const elName = document.getElementById("tg-user-name");
  const elAvatar = document.getElementById("tg-user-avatar");
  if (elName) elName.textContent = name;
  if (elAvatar) elAvatar.textContent = (name[0] || "Р").toUpperCase();

  saveState();
  closeModal('modal-onboarding');
  Sound.finish();
  Haptic.success();

  renderMetrics();
  renderNutrition();
  renderPersonalizedVitamins();
  calculateScheduleCompliance();
}

// ========================================================
// MOBILE-FIRST MONTHLY CALENDAR ENGINE
// ========================================================
function changeCalendarMonth(delta) {
  calMonth += delta;
  if (calMonth < 0) {
    calMonth = 11;
    calYear--;
  } else if (calMonth > 11) {
    calMonth = 0;
    calYear++;
  }
  Sound.beep(650, 0.05);
  Haptic.impact('light');
  renderMonthlyCalendar();
  render12MonthsAnnualBreakdown();
}

function jumpToMonth(mIndex) {
  calMonth = mIndex;
  calYear = 2026;
  Sound.beep(650, 0.05);
  Haptic.impact('light');
  renderMonthlyCalendar();
  render12MonthsAnnualBreakdown();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderMonthlyCalendar() {
  const monthNameEl = document.getElementById("cal-month-name");
  const summaryTagEl = document.getElementById("cal-month-summary-tag");
  const gridEl = document.getElementById("cal-days-grid");
  if (!monthNameEl || !gridEl) return;

  monthNameEl.textContent = `${MONTH_NAMES[calMonth]} ${calYear}`;
  gridEl.innerHTML = "";

  const hist = appState.history || [];
  const histMap = new Map();
  hist.forEach(h => histMap.set(h.date, h));

  const firstDay = new Date(calYear, calMonth, 1);
  const totalDaysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  
  // Calculate starting blank days (Monday = 0, Sunday = 6)
  let startDayOfWeek = firstDay.getDay() - 1;
  if (startDayOfWeek === -1) startDayOfWeek = 6;

  for (let i = 0; i < startDayOfWeek; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "cal-day-cell empty";
    gridEl.appendChild(emptyCell);
  }

  let doneCount = 0;
  let plannedCount = 0;
  let missedCount = 0;
  const currentTodayDate = 27; // Aug 27, 2026

  for (let day = 1; day <= totalDaysInMonth; day++) {
    const curDate = new Date(calYear, calMonth, day);
    const dayOfWeek = curDate.getDay();
    const isScheduled = (dayOfWeek === 2 || dayOfWeek === 4); // Tue, Thu
    const dStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    const woData = histMap.get(dStr);
    const isDone = !!woData;
    const isToday = (calYear === 2026 && calMonth === 7 && day === currentTodayDate);
    const isPast = (calYear < 2026) || (calYear === 2026 && calMonth < 7) || (calYear === 2026 && calMonth === 7 && day < currentTodayDate);
    const isMissed = isScheduled && isPast && !isDone;
    const isFuturePlan = isScheduled && !isPast && !isDone;

    if (isDone) doneCount++;
    if (isMissed) missedCount++;
    if (isScheduled || isDone) plannedCount++;

    const cell = document.createElement("button");
    let cls = "cal-day-cell";

    if (isDone) cls += " done";
    else if (isMissed) cls += " missed";
    else if (isFuturePlan) cls += " scheduled";

    if (isToday) cls += " today";
    if (dStr === selectedCalDateStr) cls += " selected";

    cell.className = cls;
    cell.innerHTML = `<span>${day}</span>`;
    cell.onclick = () => selectCalendarDay(dStr, isDone ? 'done' : isMissed ? 'missed' : isFuturePlan ? 'plan' : 'rest', woData);

    gridEl.appendChild(cell);
  }

  if (summaryTagEl) {
    summaryTagEl.textContent = `${doneCount} закрыто • ${missedCount > 0 ? missedCount + ' пропуск' : '100% дисциплина'}`;
  }

  selectCalendarDay(selectedCalDateStr, histMap.get(selectedCalDateStr) ? 'done' : 'rest', histMap.get(selectedCalDateStr));
}

function selectCalendarDay(dateStr, status, woData) {
  selectedCalDateStr = dateStr;

  document.querySelectorAll(".cal-day-cell").forEach(el => el.classList.remove("selected"));

  const inspDate = document.getElementById("cal-insp-date");
  const inspBadge = document.getElementById("cal-insp-badge");
  const inspContent = document.getElementById("cal-insp-content");
  if (!inspDate || !inspBadge || !inspContent) return;

  const dateObj = new Date(dateStr);
  const formatted = dateObj.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  inspDate.textContent = formatted;

  if (status === 'done' && woData) {
    inspBadge.textContent = "✅ ВЫПОЛНЕНО";
    inspBadge.className = "px-2.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-lg text-xs font-bold font-mono";
    inspContent.innerHTML = `
      <p><b>${woData.name}</b></p>
      <p class="text-[11px] text-slate-400 font-mono">Тоннаж: <b class="text-emerald-400">${woData.tonnage} кг</b> • Сожжено: <b class="text-amber-400">~${woData.calories || 350} ккал</b> • Готовность: <b>${woData.readiness || 90}%</b></p>
    `;
  } else if (status === 'missed') {
    inspBadge.textContent = "❌ ПРОПУСК";
    inspBadge.className = "px-2.5 py-0.5 bg-rose-950 text-rose-400 border border-rose-800 rounded-lg text-xs font-bold font-mono";
    inspContent.innerHTML = `<p class="text-slate-300">Запланированная тренировка (Full Body) была пропущена.</p>`;
  } else if (status === 'plan') {
    inspBadge.textContent = "⏳ ПЛАН";
    inspBadge.className = "px-2.5 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-lg text-xs font-bold font-mono";
    inspContent.innerHTML = `<p class="text-slate-300">Запланированный день тренировки по графику. Готовься к линейной прогрессии весов!</p>`;
  } else {
    inspBadge.textContent = "⚪ ОТДЫХ";
    inspBadge.className = "px-2.5 py-0.5 bg-slate-900 text-slate-400 border border-white/10 rounded-lg text-xs font-bold font-mono";
    inspContent.innerHTML = `<p class="text-slate-300">Восстановление ЦНС, суперкомпенсация мышечных волокон, утренний вакуум и сон 8 часов.</p>`;
  }
}

// ========================================================
// 12-MONTH ANNUAL BREAKDOWN & HIGHLIGHTS
// ========================================================
function render12MonthsAnnualBreakdown() {
  const container = document.getElementById("annual-months-grid");
  const tonEl = document.getElementById("year-stat-tonnage");
  const sessEl = document.getElementById("year-stat-sessions");
  const strkEl = document.getElementById("year-stat-streak");
  const compEl = document.getElementById("year-stat-compliance");
  if (!container) return;

  const hist = appState.history || [];
  const totalTonnage = getTotalTonnage(appState);
  const totalSessions = hist.length;

  if (tonEl) tonEl.textContent = `${(totalTonnage / 1000).toFixed(1)} т`;
  if (sessEl) sessEl.textContent = `${totalSessions}`;
  if (strkEl) strkEl.textContent = `🔥${appState.streak || 0} дн`;
  if (compEl) compEl.textContent = "100%";

  container.innerHTML = "";

  for (let m = 0; m < 12; m++) {
    const monthStr = String(m + 1).padStart(2, '0');
    const monthHist = hist.filter(h => h.date && h.date.startsWith(`2026-${monthStr}`));
    const monthTon = monthHist.reduce((s, h) => s + (h.tonnage || 0), 0);
    const isActiveMonth = (m === calMonth && calYear === 2026);

    const pill = document.createElement("div");
    pill.className = `annual-month-pill ${isActiveMonth ? 'active-month' : ''} text-center space-y-1`;
    pill.onclick = () => jumpToMonth(m);

    pill.innerHTML = `
      <div class="flex justify-between items-center text-[10px] font-mono">
        <b class="${isActiveMonth ? 'text-cyan-400' : 'text-white'}">${MONTH_SHORT[m]}</b>
        <span class="text-slate-400">${monthHist.length} сесс.</span>
      </div>
      <div class="text-[11px] font-mono font-black ${monthTon > 0 ? 'text-emerald-400' : 'text-slate-600'}">
        ${monthTon > 0 ? (monthTon / 1000).toFixed(1) + ' т' : '—'}
      </div>
    `;

    container.appendChild(pill);
  }
}

// ========================================================
// PERSONALIZED EVIDENCE-BASED VITAMIN & MINERAL ENGINE
// ========================================================
function renderPersonalizedVitamins() {
  const container = document.getElementById("personalized-vitamins-container");
  const reasonLabel = document.getElementById("vitamin-calc-reason");
  if (!container) return;

  const age = appState.age || 32;
  const weight = appState.currentMetrics ? appState.currentMetrics.weight : 83;
  const waist = appState.currentMetrics ? appState.currentMetrics.waist : 91.5;
  const height = appState.height || 178;
  const whtr = (waist / height).toFixed(2);
  const injuries = (appState.injuries || "").toLowerCase();

  if (reasonLabel) {
    reasonLabel.textContent = `Под профиль: ${age} года, ${weight} кг, WHtR ${whtr}, ${appState.goal || 'Рекомпозиция'}`;
  }

  const stack = [
    {
      name: "1. Магний (Глицинат) — перед сном",
      dose: "400 мг",
      badgeColor: "text-violet-400",
      reason: injuries.includes("ше") || injuries.includes("лопатк") || injuries.includes("спазм")
        ? `Снимает спазм <i>m. levator scapulae</i>, восстанавливает фазы глубокого сна и ЦНС.`
        : `Восстановление нервно-мышечной проводимости и глубокий сон.`
    },
    {
      name: "2. Витамин D3 + K2 — утром",
      dose: "4000 IU",
      badgeColor: "text-amber-400",
      reason: `Стимулирует синтез тестостерона для возраста 30+ и офисного режима 5/2.`
    },
    {
      name: "3. Омега-3 (EPA/DHA) — с едой",
      dose: "2000 мг",
      badgeColor: "text-cyan-400",
      reason: `Защита суставов и связок плеча при тяжелых жимах.`
    },
    {
      name: "4. Креатин Моногидрат — в любое время",
      dose: "5 г",
      badgeColor: "text-emerald-400",
      reason: `Ресинтез АТФ, повышение силовой выносливости на 12-15% и защита мышечной массы.`
    },
    {
      name: "5. Цинк Хелат — вечером",
      dose: "25 мг",
      badgeColor: "text-slate-300",
      reason: `Синтез анаболических гормонов и иммунитет.`
    }
  ];

  if (whtr >= 0.50) {
    stack.push({
      name: "6. L-Карнитин — перед ходьбой Зона 2",
      dose: "1500 мг",
      badgeColor: "text-rose-400",
      reason: `Транспорт жирных кислот в митохондрии при повышенном висцеральном жире (WHtR ${whtr}).`
    });
  }

  container.innerHTML = stack.map(item => `
    <div class="p-3.5 bg-slate-950 rounded-2xl border border-white/[0.06] space-y-1">
      <div class="flex justify-between items-center font-mono">
        <b class="text-white text-xs">${item.name}</b>
        <span class="${item.badgeColor} font-black text-xs">${item.dose}</span>
      </div>
      <p class="text-[11px] text-slate-300 leading-relaxed font-sans">${item.reason}</p>
    </div>
  `).join("");
}

// ========================================================
// 18+ ACHIEVEMENTS HUB & CATEGORY FILTERING
// ========================================================
function filterAchievements(cat) {
  currentAchFilter = cat;
  ['all', 'strength', 'streak', 'body', 'nutrition', 'meso'].forEach(c => {
    const btn = document.getElementById("btn-ach-" + c);
    if (btn) {
      if (c === cat) {
        btn.className = "px-3 py-1 rounded-lg bg-cyan-400 text-slate-950 font-bold whitespace-nowrap shadow-sm";
      } else {
        btn.className = "px-3 py-1 rounded-lg bg-slate-900 text-slate-400 border border-white/10 font-bold whitespace-nowrap";
      }
    }
  });
  renderAchievementsList();
}

function checkAchievements() {
  if (!appState.unlockedAchievements) appState.unlockedAchievements = [];

  ACHIEVEMENTS.forEach(ach => {
    if (!appState.unlockedAchievements.includes(ach.id)) {
      const curVal = ach.current(appState);
      if (curVal >= ach.target) {
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
  if (countEl) countEl.textContent = `${unlocked.length}/${ACHIEVEMENTS.length}`;

  const filtered = ACHIEVEMENTS.filter(a => currentAchFilter === 'all' || a.cat === currentAchFilter);

  filtered.forEach(ach => {
    const isUnlocked = unlocked.includes(ach.id);
    const curVal = ach.current(appState);
    const pct = Math.min(100, Math.round((curVal / ach.target) * 100));

    const card = document.createElement("div");
    card.className = `p-3.5 rounded-2xl border space-y-2 transition-all ${isUnlocked ? 'bg-[#101b33] border-cyan-500/80 text-white' : 'bg-slate-950 border-white/[0.06] text-slate-400 opacity-75'}`;

    card.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <h4 class="font-bold text-xs ${isUnlocked ? 'text-cyan-300' : 'text-slate-300'} font-sans">${ach.title}</h4>
          <p class="text-[11px] text-slate-400 font-sans mt-0.5">${ach.desc}</p>
        </div>
        <span class="px-2.5 py-1 rounded-lg text-[10px] font-black font-mono ${isUnlocked ? 'bg-cyan-400 text-slate-950' : 'bg-slate-900 text-slate-500 border border-white/5'}">
          ${isUnlocked ? '✓ ОТКРЫТО' : `+${ach.xp} XP`}
        </span>
      </div>

      <div class="space-y-1 font-mono text-[10px]">
        <div class="flex justify-between text-slate-400">
          <span>Прогресс: <b class="${isUnlocked ? 'text-cyan-300' : 'text-slate-300'}">${curVal.toLocaleString()} / ${ach.target.toLocaleString()}</b></span>
          <span>${pct}%</span>
        </div>
        <div class="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
          <div class="h-full ${isUnlocked ? 'bg-gradient-to-r from-cyan-400 to-emerald-400' : 'bg-slate-700'}" style="width: ${pct}%"></div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// ========================================================
// MESOCYCLE ROTATION SYSTEM
// ========================================================
function renderMesocycleBanner() {
  const w = appState.mesocycleWeek || 1;
  const badgeHeader = document.getElementById("meso-header-badge");
  const weekDisp = document.getElementById("meso-week-display");
  const descEl = document.getElementById("meso-desc-text");

  if (badgeHeader) badgeHeader.textContent = `Неделя ${w}/8`;
  if (weekDisp) weekDisp.textContent = w;

  if (!descEl) return;

  if (w <= 3) {
    descEl.innerHTML = `<b>Фаза 1 (Накопление):</b> Линейная прогрессия рабочих весов (+2.5 кг в базе). 48 часов отдыха между Full-Body днями.`;
  } else if (w <= 6) {
    descEl.innerHTML = `<b>Фаза 2 (Интенсификация):</b> Выход на рабочие веса в диапазоне 8–10 повторений. Высокий мышечный стимул.`;
  } else if (w === 7) {
    descEl.innerHTML = `<b>Фаза 3 (Пик суперкомпенсации):</b> Фиксация максимальных рабочих весов перед разгрузкой.`;
  } else {
    descEl.innerHTML = `<span class="text-amber-400 font-bold">⚠️ Периодизация:</span> 8-недельный цикл завершен. <b>Рекомендуется 1 неделя Deload (-40% объема) для преодоления адаптационного плато.</b>`;
  }
}

function advanceMesocycleWeek() {
  let w = (appState.mesocycleWeek || 1) + 1;
  appState.totalMesoWeeks = (appState.totalMesoWeeks || 1) + 1;

  if (w > 8) {
    if (confirm("Начать новый 8-недельный мезоцикл с Недели 1?")) {
      w = 1;
      addXP(500);
      Sound.finish();
      Haptic.success();
      alert("🎉 Мезоцикл успешно закрыт! Запущен новый цикл (+500 XP).");
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
    badge.textContent = `${scorePct}% • Высокая готовность (100% веса)`;
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
// FOCUS WORKOUT EXECUTION MODE (LARGE TOUCH TARGETS)
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
    card.className = "p-4 bg-[#0e1422] rounded-2xl border border-white/[0.08] space-y-3";

    const setsRows = ex.sets.map((s, sIdx) => `
      <div class="grid grid-cols-12 gap-2 items-center bg-slate-950 p-2.5 rounded-xl border ${s.done ? 'border-emerald-500/80 bg-emerald-950/20' : 'border-white/[0.06]'} font-mono text-xs">
        <div class="col-span-1 text-center font-bold ${s.done ? 'text-emerald-400' : 'text-slate-400'}">#${s.set}</div>
        
        <!-- WEIGHT STEPPER -->
        <div class="col-span-5 flex items-center bg-slate-900 px-1 py-1 rounded-xl border border-white/10 justify-between">
          <button type="button" onclick="stepWeight(${exIdx}, ${sIdx}, -2.5)" class="stepper-btn">-</button>
          <input type="number" step="any" inputmode="decimal" value="${s.weight}" class="w-12 bg-transparent text-white font-black text-center text-xs outline-none"
            onclick="this.select()" oninput="updateSet(${exIdx}, ${sIdx}, 'weight', this.value)">
          <span class="text-[9px] text-slate-400 pr-0.5">${ex.isTime ? 'с' : 'кг'}</span>
          <button type="button" onclick="stepWeight(${exIdx}, ${sIdx}, 2.5)" class="stepper-btn text-cyan-400">+</button>
        </div>

        <!-- REPS STEPPER -->
        <div class="col-span-4 flex items-center bg-slate-900 px-1 py-1 rounded-xl border border-white/10 justify-between">
          <button type="button" onclick="stepReps(${exIdx}, ${sIdx}, -1)" class="stepper-btn">-</button>
          <input type="number" step="1" inputmode="numeric" value="${s.reps}" class="w-10 bg-transparent text-white font-black text-center text-xs outline-none"
            onclick="this.select()" oninput="updateSet(${exIdx}, ${sIdx}, 'reps', this.value)">
          <span class="text-[9px] text-slate-400 pr-0.5">раз</span>
          <button type="button" onclick="stepReps(${exIdx}, ${sIdx}, 1)" class="stepper-btn text-emerald-400">+</button>
        </div>

        <!-- CHECKBOX -->
        <div class="col-span-2 flex justify-center">
          <input type="checkbox" class="custom-checkbox" ${s.done ? 'checked' : ''}
            onchange="toggleSet(${exIdx}, ${sIdx}, this.checked)">
        </div>
      </div>
    `).join('');

    card.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-extrabold text-white text-sm">${ex.name}</h3>
          <span class="text-xs font-mono text-cyan-400 font-bold">${ex.sets.length} подхода × ${ex.min}-${ex.max} раз</span>
        </div>
        <div class="flex items-center space-x-1.5 font-mono text-xs">
          <button onclick="resetExerciseSets(${exIdx})" class="px-2.5 py-1 bg-slate-900 text-rose-300 rounded-lg border border-white/10">↺</button>
          ${ex.substitutes.length > 0 ? `<button onclick="swapExercisePrompt(${exIdx})" class="px-2.5 py-1 bg-slate-900 text-slate-300 rounded-lg border border-white/10">Замена</button>` : ''}
        </div>
      </div>
      <p class="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-white/[0.06] leading-relaxed">${ex.tip}</p>
      <div class="space-y-2">${setsRows}</div>
      <div class="flex justify-between items-center pt-1 text-xs font-mono">
        <button onclick="addSetToExercise(${exIdx})" class="text-cyan-400 font-bold">➕ Добавить подход</button>
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

  alert(`🎉 ТРЕНИРОВКА ЗАВЕРШЕНА!\n\nТоннаж: ${Math.round(tonnage)} кг.\nСожжено: ~${caloriesBurned} ккал 🔥\n+150 XP получено!`);
  document.getElementById("workout-active").classList.add("hidden");
  document.getElementById("workout-selector").classList.remove("hidden");
  switchTab("progress");
  switchProgressSubtab("archive");
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
// METRICS & TREND GRAPH
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
  renderPersonalizedVitamins();
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
    badge.className = "px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800";
  } else if (whtr < 0.54) {
    badge.textContent = `🟡 Умеренный (${whtr})`;
    badge.className = "px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-amber-950 text-amber-300 border border-amber-800";
  } else {
    badge.textContent = `🔴 Риск (${whtr})`;
    badge.className = "px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-rose-950 text-rose-300 border border-rose-800";
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
  ['all', 'weight', 'waist'].forEach(f => {
    const btn = document.getElementById("btn-chart-" + f);
    if (btn) {
      if (f === filter) {
        btn.className = "px-2 py-0.5 font-bold rounded-md bg-cyan-400 text-slate-950";
      } else {
        btn.className = "px-2 py-0.5 font-bold rounded-md text-slate-400";
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
  const h = canvas.height = 160;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, w, h);

  const logs = (appState.metrics || []).filter(m => m && (m.weight > 0 || m.waist > 0));
  if (logs.length < 2) {
    ctx.fillStyle = "#64748b";
    ctx.font = "11px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Добавь минимум 2 замера для графика", w / 2, h / 2);
    return;
  }

  const weights = logs.map(l => l.weight || 0).filter(v => v > 0);
  const waists = logs.map(l => l.waist || 0).filter(v => v > 0);

  let activeSeries = [];
  if (currentChartFilter === 'all') activeSeries = [...weights, ...waists];
  else if (currentChartFilter === 'weight') activeSeries = weights;
  else if (currentChartFilter === 'waist') activeSeries = waists;

  if (activeSeries.length === 0) activeSeries = [50, 100];

  const min = Math.min(...activeSeries) - 1.5;
  const max = Math.max(...activeSeries) + 1.5;

  function getY(v) { return 20 + (1 - (v - min) / (max - min)) * (h - 40); }
  function getX(i) { return 35 + (i / (logs.length - 1)) * (w - 55); }

  ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 3; i++) {
    const y = 20 + (i / 3) * (h - 40);
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
    drawLine(logs.map(l => l.weight || 0), "#00f0ff");
  }
  if (currentChartFilter === 'all' || currentChartFilter === 'waist') {
    drawLine(logs.map(l => l.waist || 0), "#10b981");
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

  if (circle) circle.className = "w-20 h-20 rounded-full bg-cyan-950/40 border-4 border-cyan-400 flex flex-col items-center justify-center shadow-lg";
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
// NUTRITION
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
// ARCHIVE
// ========================================================
function renderHistory() {
  const container = document.getElementById("history-container");
  if (!container) return;
  container.innerHTML = "";

  const hist = appState.history || [];
  if (hist.length === 0) {
    container.innerHTML = `
      <div class="p-6 bg-slate-950 rounded-2xl border border-white/[0.06] text-center text-slate-400 space-y-2 font-mono">
        <span class="text-2xl block">📋</span>
        <p class="text-xs font-bold text-slate-200">Журнал тренировок пуст</p>
        <p class="text-[11px] text-slate-400">Начни тренировку во вкладке «Тренинг» или нажми «➕ Добавить» выше.</p>
      </div>
    `;
    return;
  }

  hist.forEach((h, idx) => {
    const card = document.createElement("div");
    card.className = "p-4 bg-[#0e1422] rounded-2xl border border-white/[0.08] space-y-2.5 font-mono text-xs";

    const exList = (h.exercises || []).map(e => `
      <div class="flex justify-between items-center text-[11px] py-1 border-b border-white/[0.04] last:border-0 font-sans">
        <span class="text-slate-300 font-medium">${e.name}</span>
        <div class="text-right font-mono">
          <span class="text-emerald-400 font-bold block">${e.sets}</span>
          <span class="text-[10px] text-amber-400">${e.prog || ''}</span>
        </div>
      </div>
    `).join("");

    card.innerHTML = `
      <div class="flex justify-between items-start pb-2 border-b border-white/[0.08]">
        <div>
          <h4 class="font-bold text-white text-xs font-sans">${h.name}</h4>
          <span class="text-[10px] text-slate-400">${h.timeStr || h.date} • Готовность ${h.readiness || 90}%</span>
        </div>
        <div class="flex items-center space-x-2 text-right">
          <div>
            <span class="text-xs text-emerald-400 font-black">${h.tonnage} кг</span>
            <span class="text-[9px] text-slate-400 block">тоннаж</span>
          </div>
          <div class="border-l border-white/10 pl-2">
            <span class="text-xs text-amber-400 font-black">${h.calories || 350} ккал</span>
            <span class="text-[9px] text-slate-400 block">сожжено 🔥</span>
          </div>
        </div>
      </div>
      <div class="space-y-0.5 pt-1">${exList}</div>
      <div class="flex justify-end space-x-2 pt-2 border-t border-white/[0.08] text-[10px]">
        <button onclick="openEditHistoryModal(${idx})" class="px-2.5 py-1 bg-slate-800 text-cyan-300 rounded-lg border border-white/10">✏️ Редактировать</button>
        <button onclick="deleteHistoryItemDirect(${idx})" class="px-2.5 py-1 bg-rose-950 text-rose-300 rounded-lg border border-rose-900">🗑️ Удалить</button>
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
  exContainer.innerHTML = '<span class="text-[10px] text-slate-400 block mb-1">Упражнения:</span>';

  (h.exercises || []).forEach((e, eIdx) => {
    const row = document.createElement("div");
    row.className = "grid grid-cols-12 gap-1.5 items-center";
    row.innerHTML = `
      <input type="text" value="${e.name}" id="edit-ex-name-${eIdx}" class="col-span-6 bg-slate-900 border border-white/10 px-2 py-1 rounded-lg text-white text-xs outline-none">
      <input type="text" value="${e.sets}" id="edit-ex-sets-${eIdx}" class="col-span-6 bg-slate-900 border border-white/10 px-2 py-1 rounded-lg text-cyan-400 font-mono text-xs outline-none">
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
  renderMonthlyCalendar();
  render12MonthsAnnualBreakdown();
  Sound.success();
  Haptic.success();
}

function deleteCurrentEditingHistoryItem() {
  if (currentEditingHistoryIndex === null) return;
  if (confirm("Точно удалить эту запись из архива?")) {
    appState.history.splice(currentEditingHistoryIndex, 1);
    saveState();
    closeModal("modal-edit-history");
    renderHistory();
    renderMonthlyCalendar();
    render12MonthsAnnualBreakdown();
    Sound.beep(400, 0.1);
  }
}

function deleteHistoryItemDirect(idx) {
  if (confirm("Удалить эту тренировку из архива?")) {
    appState.history.splice(idx, 1);
    saveState();
    renderHistory();
    renderMonthlyCalendar();
    render12MonthsAnnualBreakdown();
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
  renderMonthlyCalendar();
  render12MonthsAnnualBreakdown();
  Sound.success();
}

function copyCoachSummary() {
  const m = appState.currentMetrics || {};
  const hist = appState.history || [];

  let lastWosText = "";
  if (hist.length === 0) {
    lastWosText = "Тренировок в архиве пока нет.";
  } else {
    lastWosText = hist.slice(0, 3).map((h, i) => 
      `${i + 1}) ${h.timeStr || h.date} — ${h.name} (Тоннаж: ${h.tonnage}кг, Сожжено: ~${h.calories || 350}ккал)`
    ).join("\n");
  }

  const summary = `📊 [IRON COACH — СВОДКА АТЛЕТА]:
• Атлет: ${appState.name} | Возраст: ${appState.age || 32} | Рост: ${appState.height || 178} см
• Цель: ${appState.goal || 'Рекомпозиция'}
• Фаза мезоцикла: Неделя ${appState.mesocycleWeek || 1} из 8
• Текущий вес: ${m.weight || 83} кг
• Талия по пупку: ${m.waist || 91.5} см (WHtR: ${((m.waist || 91.5) / (appState.height || 178)).toFixed(2)})
• Бицепс: ${m.biceps || 38.5} см | Грудь: ${m.chest || 104} см | Бедро: ${m.thigh || 59} см | Шея: ${m.neck || 39.5} см
• Стрик: 🔥${appState.streak || 0} | Общий тоннаж: ${getTotalTonnage(appState).toLocaleString()} кг
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

// ========================================================
// 3-TAB NAVIGATION & SUBTAB SWITCHER
// ========================================================
function switchTab(tabId) {
  Sound.beep(500, 0.05);
  Haptic.impact('light');

  document.querySelectorAll(".tab-pane").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));

  const targetPane = document.getElementById("tab-" + tabId);
  const targetNav = document.getElementById("nav-" + tabId);

  if (targetPane) targetPane.classList.add("active");
  if (targetNav) targetNav.classList.add("active");

  if (tabId === "progress") {
    switchProgressSubtab('calendar');
  }
  if (tabId === "nutrition") {
    renderNutrition();
    renderPersonalizedVitamins();
  }
}

function switchProgressSubtab(subtabId) {
  Sound.beep(550, 0.05);
  Haptic.impact('light');

  ['calendar', 'metrics', 'achievements', 'archive'].forEach(st => {
    const pane = document.getElementById("subtab-" + st);
    const btn = document.getElementById("btn-sub-" + st);
    if (st === subtabId) {
      if (pane) pane.classList.remove("hidden");
      if (btn) btn.className = "flex-1 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold transition-all shadow-sm";
    } else {
      if (pane) pane.classList.add("hidden");
      if (btn) btn.className = "flex-1 py-2 rounded-xl text-slate-400 font-bold transition-all";
    }
  });

  if (subtabId === 'calendar') {
    renderMonthlyCalendar();
    render12MonthsAnnualBreakdown();
  }
  if (subtabId === 'metrics') {
    setTimeout(() => {
      renderMetrics();
      drawTrendChart();
    }, 50);
  }
  if (subtabId === 'achievements') {
    renderAchievementsList();
  }
  if (subtabId === 'archive') {
    renderHistory();
  }
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
    <div class="flex justify-between items-center pb-1 border-b border-white/[0.08]">
      <span class="text-slate-400">Одноповторный максимум (1ПМ):</span>
      <span class="text-sm font-bold text-cyan-300 font-mono">${oneRM} кг</span>
    </div>
    <div class="flex justify-between text-[11px] pt-1 font-mono">
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
  renderPersonalizedVitamins();
  renderMonthlyCalendar();
  render12MonthsAnnualBreakdown();
});
