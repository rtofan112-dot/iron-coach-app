/**
 * IRON COACH ELITE - Честная система прогресса, реальные рекорды, 3x2 меню прогресса и голосовой таймер
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
  record() {
    this.beep(523.25, 0.1);
    setTimeout(() => this.beep(659.25, 0.1), 100);
    setTimeout(() => this.beep(783.99, 0.2), 200);
    setTimeout(() => this.beep(1046.50, 0.3), 300);
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

function speakVoice(text) {
  if (!appState.voiceAnnounce) return;
  try {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  } catch(e) {}
}

// ========================================================
// ПРОТОКОЛЫ ТРЕНИРОВОК С ВИЗУАЛИЗАЦИЕЙ И ФАЗАМИ
// ========================================================
const DEFAULT_PROGRAMS = {
  a: {
    name: "Тренировка А (Верх базы + Жим + Квадрицепс + Спина)",
    exercises: [
      {
        id: "ex1",
        name: "Жим гантелей на наклонной скамье 30°",
        muscleGroup: "Грудь",
        targetMuscles: "Верх грудных • Передняя дельта • Трицепс",
        phases: ["1. Опускание 2–3 сек", "2. Пауза внизу 1 сек", "3. Мощный выжим вверх"],
        sets: 4, min: 8, max: 10, w: 22, calRate: 12,
        tip: "Локти 60–70° к телу, лопатки сведены и опущены вниз для защиты шеи.",
        substitutes: ["Жим штанги на наклонной 30°", "Жим в наклонном Хаммере"]
      },
      {
        id: "ex2",
        name: "Жим гантелей на горизонтальной скамье",
        muscleGroup: "Грудь",
        targetMuscles: "Середина и низ груди • Трицепс",
        phases: ["1. Сведение лопаток", "2. Растяжка 2 сек", "3. Выжим без отрыва таза"],
        sets: 4, min: 8, max: 10, w: 24, calRate: 12,
        tip: "Мощный подконтрольный выжим, пауза 1 сек в нижней точке растяжения груди.",
        substitutes: ["Жим штанги лежа", "Жим в тренажере на грудь"]
      },
      {
        id: "ex3",
        name: "Жим ногами под углом 45° в тренажере",
        muscleGroup: "Ноги",
        targetMuscles: "Квадрицепс • Ягодицы",
        phases: ["1. Упор в пятки", "2. Угол в коленях 90°", "3. Без блокировки суставов вверху"],
        sets: 4, min: 10, max: 12, w: 90, calRate: 16,
        tip: "Колени вверху не вставляй до щелчка, упор в середину стопы и пятки.",
        substitutes: ["Приседания со штангой", "Приседания в Гакк-тренажере"]
      },
      {
        id: "ex4",
        name: "Тяга горизонтального блока к поясу (нейтральный хват)",
        muscleGroup: "Спина",
        targetMuscles: "Широчайшие • Ромбовидные мышцы",
        phases: ["1. Локти скользят назад", "2. Сведение лопаток", "3. Растяжка 2 сек"],
        sets: 4, min: 10, max: 12, w: 45, calRate: 11,
        tip: "Локти скользят вдоль ребер назад, плечи зафиксированы внизу.",
        substitutes: ["Тяга Т-грифа к поясу", "Тяга гантели в упоре"]
      },
      {
        id: "ex5",
        name: "Сгибания ног сидя или лежа в тренажере",
        muscleGroup: "Ноги",
        targetMuscles: "Бицепс бедра • Подколенные связки",
        phases: ["1. Плавное сгибание", "2. Фиксация 1 сек", "3. Медленное опускание 3 сек"],
        sets: 3, min: 12, max: 15, w: 35, calRate: 8,
        tip: "Медленное опускание 2–3 сек, акцент на растяжение бицепса бедра.",
        substitutes: ["Румынская тяга на одной ноге"]
      },
      {
        id: "ex6",
        name: "Махи гантелями через стороны стоя",
        muscleGroup: "Плечи",
        targetMuscles: "Средняя дельта (ширина плеч)",
        phases: ["1. Корпус чуть вперед", "2. Подъем локтями", "3. Кисть не выше локтя"],
        sets: 4, min: 12, max: 15, w: 8, calRate: 7,
        tip: "Подъем через стороны локтями до уровня плеч, кисть не задирай выше локтя.",
        substitutes: ["Махи на нижнем блоке"]
      },
      {
        id: "ex7",
        name: "Разгибания рук на верхнем блоке с канатом",
        muscleGroup: "Руки",
        targetMuscles: "Латеральная и длинная головка трицепса",
        phases: ["1. Локти зафиксированы", "2. Разводка каната внизу", "3. Пиковое сжатие 1 сек"],
        sets: 3, min: 12, max: 15, w: 20, calRate: 6,
        tip: "Локти прижаты к корпусу, разводи канат в нижней точке сокращения.",
        substitutes: ["Французский жим с гантелями"]
      },
      {
        id: "ex8",
        name: "Скручивания на блоке с канатом на пресс",
        muscleGroup: "Пресс",
        targetMuscles: "Прямая мышца живота",
        phases: ["1. Вдох вверху", "2. Скручивание на выдохе", "3. Фиксация пресса 1 сек"],
        sets: 3, min: 12, max: 15, w: 35, calRate: 8,
        tip: "Скручивай грудную клетку к тазу силой мышц пресса.",
        substitutes: ["Подъем ног на наклонной скамье", "Скручивания на коврике"]
      }
    ]
  },
  b: {
    name: "Тренировка Б (Бабочка + Брусья/Хаммер + Румынка + Тяга к груди)",
    exercises: [
      {
        id: "ex1",
        name: "Сведения рук в тренажере бабочка",
        muscleGroup: "Грудь",
        targetMuscles: "Изоляция грудных мышц • Внутренняя часть",
        phases: ["1. Глубокая растяжка", "2. Сведение по дуге", "3. Пиковое сжатие 2 сек"],
        sets: 4, min: 10, max: 12, w: 25, calRate: 9,
        tip: "Глубокая растяжка грудных при опускании и фиксация 2 сек в сведении.",
        substitutes: ["Разводка гантелей на скамье"]
      },
      {
        id: "ex2",
        name: "Отжимания на брусьях (наклон) или жим в Хаммере",
        muscleGroup: "Грудь",
        targetMuscles: "Низ груди • Передняя дельта • Трицепс",
        phases: ["1. Наклон корпуса 30°", "2. Опускание до угла 90°", "3. Выжим на выдохе"],
        sets: 4, min: 8, max: 10, w: 0, calRate: 11,
        tip: "Корпус наклонен вперед под 30°, локти под 45° к корпусу.",
        substitutes: ["Жим гантелей с наклоном вниз"]
      },
      {
        id: "ex3",
        name: "Румынская тяга с гантелями",
        muscleGroup: "Ноги",
        targetMuscles: "Бицепс бедра • Ягодичные мышцы",
        phases: ["1. Отвод таза назад", "2. Спина прямая", "3. Растяжение задней поверхности"],
        sets: 4, min: 10, max: 12, w: 22, calRate: 15,
        tip: "Таз максимально назад, колени слегка согнуты, спина прямая.",
        substitutes: ["Гиперэкстензия с весом"]
      },
      {
        id: "ex4",
        name: "Тяга верхнего блока нейтральным хватом к груди",
        muscleGroup: "Спина",
        targetMuscles: "Верх широчайших • Середина спины",
        phases: ["1. Растяжка вверху", "2. Тяга к ключицам", "3. Опускание лопаток"],
        sets: 4, min: 10, max: 12, w: 50, calRate: 12,
        tip: "Симметричная тяга к верху груди, лопатки опущены вниз.",
        substitutes: ["Подтягивания нейтральным хватом"]
      },
      {
        id: "ex5",
        name: "Приседания в Гакк-тренажере или выпады",
        muscleGroup: "Ноги",
        targetMuscles: "Квадрицепс • Ягодицы",
        phases: ["1. Спина прижата", "2. Плавное опускание", "3. Выжим пятками"],
        sets: 3, min: 10, max: 12, w: 35, calRate: 13,
        tip: "Плавное движение по направлению носков, без рывков.",
        substitutes: ["Болгарские выпады на скамье"]
      },
      {
        id: "ex6",
        name: "Жим гантелей сидя на плечи (скамья 75°)",
        muscleGroup: "Плечи",
        targetMuscles: "Передняя и средняя дельта",
        phases: ["1. Локти перед собой", "2. Выжим над головой", "3. Без прогиба в пояснице"],
        sets: 4, min: 8, max: 10, w: 16, calRate: 9,
        tip: "Плавный жим над головой без резкого прогиба в пояснице.",
        substitutes: ["Жим в тренажере на плечи"]
      },
      {
        id: "ex7",
        name: "Подъем гантелей на бицепс с разворотом кисти",
        muscleGroup: "Руки",
        targetMuscles: "Двуглавая мышца плеча (бицепс)",
        phases: ["1. Локти у ребер", "2. Супинация кисти", "3. Пиковое сжатие вверху"],
        sets: 3, min: 10, max: 12, w: 12, calRate: 6,
        tip: "Разворот кисти наружу в верхней трети подъема.",
        substitutes: ["Подъем изогнутой штанги на бицепс"]
      },
      {
        id: "ex8",
        name: "Подъем коленей в висе на брусьях на пресс",
        muscleGroup: "Пресс",
        targetMuscles: "Нижняя часть прямой мышцы живота",
        phases: ["1. Фиксация плеч", "2. Подкручивание таза", "3. Пауза 1 сек вверху"],
        sets: 3, min: 12, max: 15, isTime: false, w: 0, calRate: 7,
        tip: "Подкручивай таз вверх на выдохе для включения низа живота.",
        substitutes: ["Скручивания на скамье"]
      }
    ]
  },
  c: {
    name: "Тренировка В (Разгрузка шеи + Руки суперсет + Кардио)",
    exercises: [
      {
        id: "ex1",
        name: "Тяга каната к лицу (разгрузка шеи и лопатки)",
        muscleGroup: "Спина",
        targetMuscles: "Задняя дельта • Мышца лопатки (снятие спазма)",
        phases: ["1. Канат к глазам", "2. Локти назад и врозь", "3. Пауза 2 сек в сжатии"],
        sets: 4, min: 15, max: 20, w: 15, calRate: 8,
        tip: "Канат к глазам, локти разводи назад, пауза 2 сек (снимает спазм мышцы шеи).",
        substitutes: ["Разводка на заднюю дельту"]
      },
      {
        id: "ex2",
        name: "Жим гантелей на наклонной скамье (легкий пампинг)",
        muscleGroup: "Грудь",
        targetMuscles: "Капилляризация грудных мышц",
        phases: ["1. Плавный темп", "2. Запас 3-4 повтора", "3. Наполнение кровью"],
        sets: 3, min: 12, max: 15, w: 16, calRate: 8,
        tip: "Работа на наполнение мышц кровью, с запасом 3-4 повтора.",
        substitutes: ["Сведения в кроссовере"]
      },
      {
        id: "ex3",
        name: "Суперсет на руки: Бицепс молот + Разгибания трицепс",
        muscleGroup: "Руки",
        targetMuscles: "Брахиалис • Бицепс • Трицепс",
        phases: ["1. Молот без раскачки", "2. Сразу переход к трицепсу", "3. Отдых 60 сек"],
        sets: 3, min: 12, max: 15, w: 22, calRate: 11,
        tip: "Укрепление локтевых связок и мышечный тонус.",
        substitutes: ["Памп на блоке"]
      },
      {
        id: "ex4",
        name: "Подъем на носки стоя на икры",
        muscleGroup: "Ноги",
        targetMuscles: "Икроножные мышцы • Ахиллово сухожилие",
        phases: ["1. Глубокое опускание", "2. Выжим на носки", "3. Пауза 2 сек вверху"],
        sets: 4, min: 15, max: 20, w: 50, calRate: 8,
        tip: "Полная амплитуда с паузой 2 сек в нижней точке растяжки.",
        substitutes: ["Подъем на носки сидя"]
      },
      {
        id: "ex5",
        name: "Ходьба в горку на дорожке (сжигание жира)",
        muscleGroup: "Пресс",
        targetMuscles: "Сердечно-сосудистая система • Жиросжигание",
        phases: ["1. Уклон 8–10%", "2. Скорость 5.5 км/ч", "3. Пульс 115–125 уд/мин"],
        sets: 1, min: 25, max: 30, isTime: true, w: 0, calRate: 200,
        tip: "Уклон 8-10%, скорость 5.5 км/ч. Пульс 115-125 уд/мин без одышки.",
        substitutes: ["Эллиптический тренажер"]
      }
    ]
  }
};

// ========================================================
// 18 ДОСТИЖЕНИЙ
// ========================================================
const ACHIEVEMENTS = [
  { id: "ach_first", cat: "strength", title: "🥉 Первый шаг", desc: "Заверши 1-ю тренировку", target: 1, current: (s) => (s.history || []).length, xp: 100 },
  { id: "ach_ton_10", cat: "strength", title: "🏋️ Рубеж 10 Тонн", desc: "Подними суммарно 10 000 кг", target: 10000, current: (s) => getTotalTonnage(s), xp: 200 },
  { id: "ach_ton_50", cat: "strength", title: "🏋️ Рубеж 50 Тонн", desc: "Подними суммарно 50 000 кг", target: 50000, current: (s) => getTotalTonnage(s), xp: 500 },
  { id: "ach_ton_100", cat: "strength", title: "🏛️ Титан 100 Тонн", desc: "Подними суммарно 100 000 кг", target: 100000, current: (s) => getTotalTonnage(s), xp: 1000 },
  { id: "ach_ton_250", cat: "strength", title: "👑 Легенда 250 Тонн", desc: "Подними суммарно 250 000 кг", target: 250000, current: (s) => getTotalTonnage(s), xp: 2500 },

  { id: "ach_strk_3", cat: "streak", title: "🔥 Три в ряд", desc: "Серия из 3 тренировок без пропусков", target: 3, current: (s) => (s.streak || 0), xp: 250 },
  { id: "ach_strk_7", cat: "streak", title: "⚡ Железная неделя", desc: "Серия из 7 тренировок подряд", target: 7, current: (s) => (s.streak || 0), xp: 450 },
  { id: "ach_strk_10", cat: "streak", title: "🛡️ Стальная декада", desc: "Серия из 10 регулярных тренировок", target: 10, current: (s) => (s.streak || 0), xp: 700 },
  { id: "ach_strk_30", cat: "streak", title: "🗿 Кремень 30", desc: "Серия из 30 тренировок по графику", target: 30, current: (s) => (s.streak || 0), xp: 2000 },

  { id: "ach_vac_1", cat: "body", title: "🌬️ Первое втягивание", desc: "Выполни 1-ю утреннюю сессию вакуума", target: 1, current: (s) => (s.vacDaysCount || 0), xp: 100 },
  { id: "ach_vac_5", cat: "body", title: "🌬️ Вакуумный монолит", desc: "Выполни 5 дней утреннего вакуума", target: 5, current: (s) => (s.vacDaysCount || 0), xp: 300 },
  { id: "ach_vac_14", cat: "body", title: "🛡️ Стальной корсет", desc: "Выполни 14 дней утреннего вакуума", target: 14, current: (s) => (s.vacDaysCount || 0), xp: 800 },

  { id: "ach_prot_3", cat: "nutrition", title: "🥩 Белковый старт", desc: "Закрой норму 150г белка 3 дня", target: 3, current: (s) => (s.protDaysCount || 0), xp: 200 },
  { id: "ach_prot_7", cat: "nutrition", title: "🥩 Белковый баланс", desc: "Закрой норму 150г белка 7 дней", target: 7, current: (s) => (s.protDaysCount || 0), xp: 400 },
  { id: "ach_prot_21", cat: "nutrition", title: "🥩 Мастер питания", desc: "Закрой норму белка 21 день", target: 21, current: (s) => (s.protDaysCount || 0), xp: 1200 },
  { id: "ach_water_14", cat: "nutrition", title: "💧 Водный баланс", desc: "Выпей норму воды 14 дней подряд", target: 14, current: (s) => (s.waterDaysCount || 0), xp: 500 },

  { id: "ach_meso_1", cat: "meso", title: "🏆 Мастер цикла", desc: "Заверши 8-недельный цикл", target: 8, current: (s) => (s.mesocycleWeek || 1), xp: 1000 },
  { id: "ach_meso_3", cat: "meso", title: "🔬 Профессор периодизации", desc: "Заверши 3 полных цикла (24 недели)", target: 24, current: (s) => (s.totalMesoWeeks || s.mesocycleWeek || 1), xp: 3000 }
];

function getTotalTonnage(s) {
  return (s.history || []).reduce((sum, h) => sum + (h.tonnage || 0), 0);
}

// ========================================================
// СОСТОЯНИЕ АККАУНТА
// ========================================================
function getInitialAccount() {
  return {
    tgId: "asutp_iron_account_default",
    name: "Роман",
    age: 32,
    height: 178,
    injuries: "Резекция левого легкого, спазм мышцы шеи и лопатки",
    goal: "Рекомпозиция (Сушка жира + Мышечный тонус)",
    mesocycleWeek: 3,
    totalMesoWeeks: 3,
    xp: 0,
    streak: 0,
    vacDaysCount: 0,
    protDaysCount: 0,
    waterDaysCount: 0,
    voiceAnnounce: true,
    weightProgression: {
      "Жим гантелей на наклонной скамье 30°": 22.0,
      "Жим гантелей на горизонтальной скамье": 24.0,
      "Жим ногами под углом 45° в тренажере": 90.0,
      "Тяга горизонтального блока к поясу (нейтральный хват)": 45.0
    },
    personalRecords: {
      "Жим гантелей на наклонной скамье 30°": { weight: 22, reps: 10, date: "2026-08-25" },
      "Жим гантелей на горизонтальной скамье": { weight: 24, reps: 10, date: "2026-08-25" },
      "Жим ногами под углом 45° в тренажере": { weight: 90, reps: 12, date: "2026-08-25" },
      "Тяга горизонтального блока к поясу (нейтральный хват)": { weight: 45, reps: 12, date: "2026-08-25" },
      "Сведения рук в тренажере бабочка": { weight: 25, reps: 12, date: "2026-08-23" },
      "Румынская тяга с гантелями": { weight: 22, reps: 12, date: "2026-08-23" }
    },
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
let pendingTargetWorkoutDate = null;
let currentAchFilter = 'all';

// Аккордеон тренировки
let activeExpandedExerciseIndex = 0;

// Таймер длительности тренировки
let liveWorkoutTimerInterval = null;
let liveWorkoutSeconds = 0;

// Календарь
let calYear = 2026;
let calMonth = 7;
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

  if (appState.injuries && (appState.injuries.includes("levator") || appState.injuries.includes("scapulae"))) {
    appState.injuries = "Резекция левого легкого, спазм мышцы шеи и лопатки";
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
  renderPersonalRecords();
  renderMuscleVolumeBreakdown();
  fetchLeaderboard();
  updateVoiceUI();
}

function saveState() {
  localStorage.setItem(appState.tgId, JSON.stringify(appState));
  renderXP();
  renderMesocycleBanner();
  syncUserToLeaderboard();
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

  if (lvlHeader) lvlHeader.textContent = `УРОВЕНЬ ${currentLvl}`;
  if (xpTxt) xpTxt.textContent = appState.xp;
  if (xpNxt) xpNxt.textContent = `${xpToNext} очков`;
  if (xpBar) xpBar.style.width = `${(xpInLvl / 500) * 100}%`;
  if (strkEl) strkEl.textContent = appState.streak;
}

// ========================================================
// ГОЛОСОВЫЕ ОПОВЕЩЕНИЯ
// ========================================================
function toggleVoiceAnnounce() {
  appState.voiceAnnounce = !appState.voiceAnnounce;
  saveState();
  updateVoiceUI();
  Sound.beep(appState.voiceAnnounce ? 800 : 400, 0.1);
  Haptic.impact('light');
  if (appState.voiceAnnounce) {
    speakVoice("Голосовые оповещения включены");
  }
}

function updateVoiceUI() {
  const btnHead = document.getElementById("btn-header-voice");
  const btnTimer = document.getElementById("btn-timer-voice");
  const icon = appState.voiceAnnounce ? "🔊" : "🔇";
  if (btnHead) btnHead.textContent = icon;
  if (btnTimer) btnTimer.textContent = icon;
}

// ========================================================
// ЧИСТЫЙ ТРЕКЕР ВОДЫ (БЕЗ ФАРМА ОПЫТА)
// ========================================================
function addWater(ml) {
  if (!appState.nutrition) appState.nutrition = { protein: 0, waterMl: 0, calories: 0, caloriesBurned: 0 };
  appState.nutrition.waterMl = (appState.nutrition.waterMl || 0) + ml;
  if (appState.nutrition.waterMl >= 2600) {
    appState.waterDaysCount = (appState.waterDaysCount || 0) + 1;
  }
  saveState();
  renderNutrition();
  Sound.beep(750, 0.08);
  Haptic.impact('light');
}

// ========================================================
// ПОДСКАЗКА «В ПРОШЛЫЙ РАЗ БЫЛО» (GHOST SETS)
// ========================================================
function getLastExercisePerformance(exName) {
  const hist = appState.history || [];
  for (const h of hist) {
    if (h.exercises) {
      const match = h.exercises.find(e => e.name === exName);
      if (match && match.sets && match.sets !== '0') {
        return { setsStr: match.sets, date: h.date };
      }
    }
  }
  return null;
}

// ========================================================
// 👑 ЗАЛ РЕАЛЬНЫХ ЛИЧНЫХ РЕКОРДОВ (РЕАЛЬНЫЙ ВЕС И ПОВТОРЫ)
// ========================================================
function checkAndSavePersonalRecord(exName, weight, reps) {
  if (!appState.personalRecords) appState.personalRecords = {};
  const currentPR = appState.personalRecords[exName] || { weight: 0, reps: 0 };

  const isNewRecord = (weight > currentPR.weight) || (weight === currentPR.weight && reps > currentPR.reps);

  if (isNewRecord) {
    appState.personalRecords[exName] = {
      weight: weight,
      reps: reps,
      date: new Date().toISOString().split("T")[0]
    };
    addXP(50);
    Sound.record();
    Haptic.success();
    renderPersonalRecords();
    return true;
  }
  return false;
}

function renderPersonalRecords() {
  const container = document.getElementById("personal-records-container");
  if (!container) return;
  container.innerHTML = "";

  const prs = appState.personalRecords || {};
  const keys = Object.keys(prs);

  if (keys.length === 0) {
    container.innerHTML = `
      <div class="p-6 bg-slate-950 rounded-2xl border border-white/[0.06] text-center text-slate-400 space-y-1">
        <span class="text-2xl block">👑</span>
        <p class="text-xs font-bold text-slate-300">Рекордов пока нет</p>
        <p class="text-[11px] text-slate-500">Завершай тренировки — твои максимальные веса и повторения будут заноситься сюда!</p>
      </div>
    `;
    return;
  }

  keys.forEach((exName, idx) => {
    const r = prs[exName];
    const card = document.createElement("div");
    card.className = "p-3.5 bg-[#0e1422] rounded-2xl border border-amber-500/20 space-y-1.5";

    const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "👑";

    card.innerHTML = `
      <div class="flex justify-between items-start">
        <div class="flex items-center space-x-2">
          <span class="text-base">${medal}</span>
          <h4 class="font-bold text-white text-xs font-sans">${exName}</h4>
        </div>
        <span class="px-2.5 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded-lg text-xs font-bold font-mono">
          ${r.weight} кг × ${r.reps} раз
        </span>
      </div>
      <div class="flex justify-between items-center text-xs pt-1 border-t border-white/[0.04] font-mono">
        <span class="text-slate-400">Дата фиксации:</span>
        <span class="text-[11px] text-slate-300">${r.date}</span>
      </div>
    `;

    container.appendChild(card);
  });
}

// ========================================================
// НЕДЕЛЬНЫЙ ОБЪЕМ ПО ГРУППАМ МЫШЦ
// ========================================================
function renderMuscleVolumeBreakdown() {
  const container = document.getElementById("muscle-volume-container");
  if (!container) return;

  const targets = [
    { group: "Грудь", optimal: 12, current: 8, color: "from-cyan-400 to-blue-500" },
    { group: "Спина", optimal: 14, current: 8, color: "from-emerald-400 to-teal-500" },
    { group: "Ноги", optimal: 12, current: 7, color: "from-amber-400 to-orange-500" },
    { group: "Плечи", optimal: 8, current: 4, color: "from-violet-400 to-purple-500" },
    { group: "Руки & Кор", optimal: 10, current: 6, color: "from-rose-400 to-pink-500" }
  ];

  const hist = appState.history || [];
  const currentWeekLogs = hist.slice(0, 3);
  let chestSets = 0, backSets = 0, legSets = 0, shoulderSets = 0, armSets = 0;

  currentWeekLogs.forEach(h => {
    (h.exercises || []).forEach(e => {
      const setCount = (e.sets.match(/,/g) || []).length + 1;
      const n = (e.name || "").toLowerCase();
      if (n.includes("жим") || n.includes("бабочк") || n.includes("брусь")) chestSets += setCount;
      else if (n.includes("тяга") || n.includes("спин")) backSets += setCount;
      else if (n.includes("ног") || n.includes("присед") || n.includes("румын")) legSets += setCount;
      else if (n.includes("мах") || n.includes("плеч")) shoulderSets += setCount;
      else armSets += setCount;
    });
  });

  if (chestSets > 0) targets[0].current = chestSets;
  if (backSets > 0) targets[1].current = backSets;
  if (legSets > 0) targets[2].current = legSets;
  if (shoulderSets > 0) targets[3].current = shoulderSets;
  if (armSets > 0) targets[4].current = armSets;

  container.innerHTML = targets.map(t => {
    const pct = Math.min(100, Math.round((t.current / t.optimal) * 100));
    const status = pct >= 80 ? '🟢 Оптимум' : pct >= 50 ? '🟡 В процессе' : '⚪ Старт недели';
    return `
      <div class="space-y-1 bg-slate-950 p-2.5 rounded-xl border border-white/[0.06]">
        <div class="flex justify-between items-center text-[11px]">
          <span class="font-bold text-white">${t.group}</span>
          <div class="flex items-center space-x-2">
            <span class="text-slate-400 font-mono">${t.current} / ${t.optimal} сетов</span>
            <span class="text-[9px] font-bold text-cyan-400">${status}</span>
          </div>
        </div>
        <div class="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
          <div class="h-full bg-gradient-to-r ${t.color}" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  }).join("");
}

// ========================================================
// 🏆 РЕАЛЬНАЯ ТАБЛИЦА ЛИДЕРОВ (БЕЗ ДЕМО/БОТОВ)
// ========================================================
let cachedLeaderboard = [];

async function syncUserToLeaderboard() {
  try {
    const myTonnage = getTotalTonnage(appState);
    const myXP = appState.xp || 0;
    const myStreak = appState.streak || 0;

    await fetch('/api/sync-leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tgId: appState.tgId,
        name: appState.name,
        xp: myXP,
        tonnage: myTonnage,
        streak: myStreak,
        lastActive: "Сегодня"
      })
    });
  } catch(e) {}
}

async function fetchLeaderboard() {
  const container = document.getElementById("leaderboard-container");
  if (!container) return;

  const myTonnage = getTotalTonnage(appState);
  const myXP = appState.xp || 0;
  const myStreak = appState.streak || 0;

  // Инициализируем текущего пользователя
  let list = [
    { id: appState.tgId, name: `${appState.name} (Вы)`, xp: myXP, tonnage: myTonnage, streak: myStreak, lastActive: "Сегодня", isMe: true }
  ];

  try {
    const res = await fetch('/api/leaderboard');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        list = data.map(u => ({
          ...u,
          isMe: (u.id === appState.tgId)
        }));
        // Убедимся, что текущий пользователь всегда присутствует
        if (!list.some(u => u.isMe)) {
          list.push({ id: appState.tgId, name: `${appState.name} (Вы)`, xp: myXP, tonnage: myTonnage, streak: myStreak, lastActive: "Сегодня", isMe: true });
        }
      }
    }
  } catch(e) {}

  list.sort((a, b) => (b.xp || 0) - (a.xp || 0));
  list.forEach((u, i) => u.rank = i + 1);
  cachedLeaderboard = list;

  renderLeaderboard();
}

function renderLeaderboard() {
  const container = document.getElementById("leaderboard-container");
  if (!container) return;
  container.innerHTML = "";

  if (cachedLeaderboard.length === 0) {
    container.innerHTML = `
      <div class="p-6 bg-slate-950 rounded-2xl border border-white/[0.06] text-center text-slate-400 space-y-1">
        <span class="text-2xl block">🏆</span>
        <p class="text-xs font-bold text-slate-300">Таблица формируется</p>
        <p class="text-[11px] text-slate-500">Участники клуба будут появляться здесь по мере тренировок.</p>
      </div>
    `;
    return;
  }

  cachedLeaderboard.forEach(u => {
    const card = document.createElement("div");
    const isMe = u.isMe || (u.name && u.name.includes("(Вы)"));
    card.className = `p-3.5 rounded-2xl border transition-all ${isMe ? 'bg-[#101b33] border-cyan-500/80 shadow-md shadow-cyan-500/10' : 'bg-slate-950 border-white/[0.06]'}`;

    const rankBadge = u.rank === 1 ? '🥇' : u.rank === 2 ? '🥈' : u.rank === 3 ? '🥉' : `#${u.rank}`;

    card.innerHTML = `
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2.5">
          <span class="w-7 h-7 rounded-xl bg-slate-900 flex items-center justify-center font-black text-xs ${u.rank <= 3 ? 'text-amber-400' : 'text-slate-400'} border border-white/5">
            ${rankBadge}
          </span>
          <div>
            <div class="flex items-center space-x-1.5">
              <span class="font-bold text-xs ${isMe ? 'text-cyan-300' : 'text-white'} font-sans">${u.name}</span>
              ${isMe ? '<span class="text-[9px] font-mono px-1.5 py-0.2 bg-cyan-400 text-slate-950 font-black rounded">ВЫ</span>' : ''}
            </div>
            <span class="text-[10px] text-slate-400 font-mono">Тоннаж: <b class="text-emerald-400">${(u.tonnage / 1000).toFixed(1)} т</b> • 🔥${u.streak} дн</span>
          </div>
        </div>
        <div class="text-right font-mono">
          <span class="text-xs font-black text-cyan-400 block">${u.xp.toLocaleString()} XP</span>
          <span class="text-[9px] text-slate-500">Ур. ${Math.floor(u.xp / 500) + 1}</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// ========================================================
// ПРОФИЛЬ И СБРОС
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
  renderMonthlyCalendar();
  renderPersonalRecords();
  renderMuscleVolumeBreakdown();
}

// ========================================================
// ПЕРСОНАЛЬНЫЙ ВИТАМИННЫЙ КОМПЛЕКС
// ========================================================
function renderPersonalizedVitamins() {
  const container = document.getElementById("personalized-vitamins-container");
  const reasonLabel = document.getElementById("vitamin-calc-reason");
  if (!container) return;

  const age = appState.age || 32;
  const weight = appState.currentMetrics ? appState.currentMetrics.weight : 83;
  const waist = appState.currentMetrics ? appState.currentMetrics.waist : 91.5;
  const height = appState.height || 178;
  const waistRatioPct = Math.round((waist / height) * 100);
  const injuries = (appState.injuries || "").toLowerCase();

  if (reasonLabel) {
    reasonLabel.textContent = `Под параметры: ${age} года, ${weight} кг, талия/рост: ${waistRatioPct}%, ${appState.goal || 'Рекомпозиция'}`;
  }

  const stack = [
    {
      name: "1. Магний (Глицинат) — за 40 мин до сна",
      dose: "400 мг",
      badgeColor: "text-violet-400",
      reason: injuries.includes("ше") || injuries.includes("лопатк") || injuries.includes("спазм")
        ? `Снимает мышечный спазм шеи и лопатки, ускоряет фазу глубокого сна и восстановление нервной системы.`
        : `Восстановление нервной системы и глубокий сон.`
    },
    {
      name: "2. Витамин D3 + K2 — утром с едой",
      dose: "4000 МЕ",
      badgeColor: "text-amber-400",
      reason: `Поддерживает выработку мужских гормонов для возраста 30+ и компенсирует офисный режим.`
    },
    {
      name: "3. Омега-3 (жирные кислоты) — с едой",
      dose: "2000 мг",
      badgeColor: "text-cyan-400",
      reason: `Защита плечевых суставов и связок при жимовых нагрузках.`
    },
    {
      name: "4. Креатин моногидрат — в любое время",
      dose: "5 г",
      badgeColor: "text-emerald-400",
      reason: `Повышает силовую выносливость на 12–15% и защищает мышечную массу от разрушения.`
    },
    {
      name: "5. Цинк хелат — вечером после еды",
      dose: "25 мг",
      badgeColor: "text-slate-300",
      reason: `Синтез гормонов и укрепление иммунитета.`
    }
  ];

  if (waistRatioPct >= 50) {
    stack.push({
      name: "6. L-Карнитин — перед ходьбой в горку",
      dose: "1500 мг",
      badgeColor: "text-rose-400",
      reason: `Ускоряет сжигание жира на животе при кардио-нагрузке низкой интенсивности.`
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
// 18 ДОСТИЖЕНИЙ
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
          ${isUnlocked ? '✓ ОТКРЫТО' : `+${ach.xp} очков`}
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
// ЦИКЛ ПЕРИОДИЗАЦИИ
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
    descEl.innerHTML = `<b>Фаза 1 (Накопление):</b> Линейное повышение рабочих весов (+2.5 кг в базе). 48 часов отдыха между днями тренировок.`;
  } else if (w <= 6) {
    descEl.innerHTML = `<b>Фаза 2 (Интенсификация):</b> Выход на рабочие веса в диапазоне 8–10 повторений. Высокий стимул роста мышц.`;
  } else if (w === 7) {
    descEl.innerHTML = `<b>Фаза 3 (Пик суперкомпенсации):</b> Фиксация максимальных весов перед разгрузкой.`;
  } else {
    descEl.innerHTML = `<span class="text-amber-400 font-bold">⚠️ Разгрузка:</span> 8-недельный цикл завершен. <b>Рекомендуется 1 легкая неделя (-40% весов) для восстановления связок.</b>`;
  }
}

function advanceMesocycleWeek() {
  let w = (appState.mesocycleWeek || 1) + 1;
  appState.totalMesoWeeks = (appState.totalMesoWeeks || 1) + 1;

  if (w > 8) {
    if (confirm("Начать новый 8-недельный тренировочный цикл с Недели 1?")) {
      w = 1;
      addXP(500);
      Sound.finish();
      Haptic.success();
      alert("🎉 Цикл успешно завершен! Начат новый тренировочный блок (+500 очков).");
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
// САМОЧУВСТВИЕ И АВТОРЕГУЛЯЦИЯ
// ========================================================
function promptReadinessBeforeWorkout(planKey, targetDate = null) {
  pendingWorkoutPlanKey = planKey;
  pendingTargetWorkoutDate = targetDate;
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
    badge.textContent = `${scorePct}% • 100% рабочих весов (Полная нагрузка)`;
    badge.className = "text-sm font-black text-emerald-400 font-mono";
  } else if (scorePct >= 65) {
    badge.textContent = `${scorePct}% • Умеренная нагрузка (запас 1-2 повт)`;
    badge.className = "text-sm font-black text-amber-400 font-mono";
  } else {
    badge.textContent = `${scorePct}% • Авто-снижение весов на 10% (Защита шеи)`;
    badge.className = "text-sm font-black text-rose-400 font-mono";
  }
}

function confirmReadinessAndStart() {
  closeModal('modal-readiness');
  const energy = parseInt(document.getElementById("readiness-range-energy").value) || 4;
  const sleep = parseInt(document.getElementById("readiness-range-sleep").value) || 4;
  const soreness = parseInt(document.getElementById("readiness-range-soreness").value) || 1;
  const scorePct = Math.round(((energy + sleep + (6 - soreness)) / 15) * 100);

  startWorkout(pendingWorkoutPlanKey, scorePct, pendingTargetWorkoutDate);
}

function skipReadinessAndStart() {
  closeModal('modal-readiness');
  startWorkout(pendingWorkoutPlanKey, 90, pendingTargetWorkoutDate);
}

// ========================================================
// ПОШАГОВЫЙ РЕЖИМ ТРЕНИРОВКИ С ВИЗУАЛИЗАЦИЕЙ И СМАРТ-ПЕРЕХОДОМ
// ========================================================
function startWorkout(planKey, readinessPct = 90, targetDate = null) {
  Sound.beep(600, 0.1);
  Haptic.impact('medium');
  const plan = DEFAULT_PROGRAMS[planKey];
  activeExpandedExerciseIndex = 0;

  const weightMultiplier = (readinessPct < 65) ? 0.9 : 1.0;
  const now = new Date();
  const startTimeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  if (!appState.weightProgression) appState.weightProgression = {};

  appState.activeWorkout = {
    key: planKey,
    name: plan.name,
    targetDate: targetDate || now.toISOString().split("T")[0],
    startTimestamp: now.getTime(),
    startTimeStr: startTimeStr,
    readiness: readinessPct,
    exercises: plan.exercises.map(e => {
      const baseW = appState.weightProgression[e.name] !== undefined ? appState.weightProgression[e.name] : e.w;
      const scaledWeight = (baseW > 0) ? Math.round((baseW * weightMultiplier) * 2) / 2 : 0;
      return {
        name: e.name,
        muscleGroup: e.muscleGroup || "Все тело",
        targetMuscles: e.targetMuscles || "Целевые мышечные группы",
        phases: e.phases || ["1. Опускание 2-3с", "2. Пауза 1с", "3. Выжим вверх"],
        min: e.min,
        max: e.max,
        defaultWeight: scaledWeight,
        calRate: e.calRate || 10,
        isTime: !!e.isTime,
        tip: e.tip,
        substitutes: e.substitutes || [],
        sets: Array.from({ length: e.sets }, (_, i) => ({
          set: i + 1,
          weight: scaledWeight,
          reps: e.min,
          done: false
        }))
      };
    })
  };

  clearInterval(liveWorkoutTimerInterval);
  liveWorkoutSeconds = 0;
  liveWorkoutTimerInterval = setInterval(() => {
    liveWorkoutSeconds++;
    const m = Math.floor(liveWorkoutSeconds / 60);
    const s = liveWorkoutSeconds % 60;
    const timerEl = document.getElementById("wo-live-timer");
    if (timerEl) {
      timerEl.textContent = `⏱️ ${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
  }, 1000);

  renderActiveWorkoutUI();
  switchTab("workouts");
}

function toggleExerciseAccordion(exIdx) {
  activeExpandedExerciseIndex = (activeExpandedExerciseIndex === exIdx) ? -1 : exIdx;
  Sound.beep(600, 0.05);
  Haptic.impact('light');
  renderActiveWorkoutUI();
}

function addCustomExerciseToActiveWorkout(e) {
  e.preventDefault();
  if (!appState.activeWorkout) return;

  const name = document.getElementById("cust-ex-name").value.trim();
  const sets = parseInt(document.getElementById("cust-ex-sets").value) || 3;
  const reps = parseInt(document.getElementById("cust-ex-reps").value) || 10;
  const weight = parseFloat(document.getElementById("cust-ex-weight").value) || 0;
  const muscle = document.getElementById("cust-ex-muscle").value;
  const tip = document.getElementById("cust-ex-tip").value.trim() || "Подконтрольное движение без раскачки.";

  appState.activeWorkout.exercises.push({
    name: name,
    muscleGroup: muscle,
    targetMuscles: `${muscle} • Индивидуальное упражнение`,
    phases: ["1. Начальная фаза", "2. Рабочее движение", "3. Фиксация 1с"],
    min: reps,
    max: reps,
    defaultWeight: weight,
    calRate: 10,
    isTime: false,
    tip: tip,
    substitutes: [],
    sets: Array.from({ length: sets }, (_, i) => ({
      set: i + 1,
      weight: weight,
      reps: reps,
      done: false
    }))
  });

  saveState();
  closeModal('modal-add-custom-exercise');
  activeExpandedExerciseIndex = appState.activeWorkout.exercises.length - 1;
  renderActiveWorkoutUI();
  Sound.success();
  Haptic.success();
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
    const isExpanded = (activeExpandedExerciseIndex === exIdx);
    const doneSetsCount = ex.sets.filter(s => s.done).length;
    const isAllDone = (doneSetsCount === ex.sets.length && ex.sets.length > 0);
    const lastPerf = getLastExercisePerformance(ex.name);

    const card = document.createElement("div");
    card.id = `ex-card-${exIdx}`;
    card.className = `ex-card-accordion p-4 rounded-2xl border transition-all ${isExpanded ? 'active-focus' : isAllDone ? 'done-all' : 'bg-[#0e1422] border-white/[0.08]'}`;

    // ШАПКА АККОРДЕОНА
    const headerHtml = `
      <div onclick="toggleExerciseAccordion(${exIdx})" class="flex justify-between items-center cursor-pointer select-none">
        <div class="flex items-center space-x-2.5">
          <span class="w-6 h-6 rounded-lg ${isAllDone ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : isExpanded ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-slate-900 text-slate-400'} flex items-center justify-center font-mono font-bold text-xs">
            ${isAllDone ? '✓' : exIdx + 1}
          </span>
          <div>
            <h3 class="font-extrabold text-white text-xs sm:text-sm font-sans">${ex.name}</h3>
            <div class="flex items-center space-x-2 font-mono text-[11px] mt-0.5">
              <span class="${isAllDone ? 'text-emerald-400' : 'text-slate-400'} font-bold">
                ${isAllDone ? `Все ${ex.sets.length} подходов закрыты` : `${doneSetsCount} из ${ex.sets.length} выполнено`}
              </span>
              ${lastPerf ? `<span class="text-cyan-400/80 text-[10px]">⏱️ Прошлый: ${lastPerf.setsStr}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-2 font-mono">
          <span class="text-xs font-bold px-2 py-0.5 rounded-md ${isAllDone ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : isExpanded ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-900 text-slate-400'}">
            ${isAllDone ? '✅ Готово' : isExpanded ? '⚡ В работе' : '⏳ В очереди'}
          </span>
          <span class="text-slate-400 text-xs">${isExpanded ? '▲' : '▼'}</span>
        </div>
      </div>
    `;

    // ТЕЛО УПРАЖНЕНИЯ
    let bodyHtml = "";
    if (isExpanded) {
      const setsRows = ex.sets.map((s, sIdx) => `
        <div class="grid grid-cols-12 gap-2 items-center bg-slate-950 p-2.5 rounded-xl border ${s.done ? 'border-emerald-500/80 bg-emerald-950/20' : 'border-white/[0.06]'} font-mono text-xs">
          <div class="col-span-1 text-center font-bold ${s.done ? 'text-emerald-400' : 'text-slate-400'}">#${s.set}</div>
          
          <!-- ШАГ ВЕСА -->
          <div class="col-span-5 flex items-center bg-slate-900 px-1 py-1 rounded-xl border border-white/10 justify-between">
            <button type="button" onclick="stepWeight(${exIdx}, ${sIdx}, -2.5)" class="stepper-btn">-</button>
            <input type="number" step="any" inputmode="decimal" value="${s.weight}" class="w-12 bg-transparent text-white font-black text-center text-xs outline-none"
              onclick="this.select()" oninput="updateSet(${exIdx}, ${sIdx}, 'weight', this.value)">
            <span class="text-[9px] text-slate-400 pr-0.5">${ex.isTime ? 'с' : 'кг'}</span>
            <button type="button" onclick="stepWeight(${exIdx}, ${sIdx}, 2.5)" class="stepper-btn text-cyan-400">+</button>
          </div>

          <!-- ШАГ ПОВТОРЕНИЙ -->
          <div class="col-span-4 flex items-center bg-slate-900 px-1 py-1 rounded-xl border border-white/10 justify-between">
            <button type="button" onclick="stepReps(${exIdx}, ${sIdx}, -1)" class="stepper-btn">-</button>
            <input type="number" step="1" inputmode="numeric" value="${s.reps}" class="w-10 bg-transparent text-white font-black text-center text-xs outline-none"
              onclick="this.select()" oninput="updateSet(${exIdx}, ${sIdx}, 'reps', this.value)">
            <span class="text-[9px] text-slate-400 pr-0.5">раз</span>
            <button type="button" onclick="stepReps(${exIdx}, ${sIdx}, 1)" class="stepper-btn text-emerald-400">+</button>
          </div>

          <!-- ЧЕКБОКС -->
          <div class="col-span-2 flex justify-center">
            <input type="checkbox" class="custom-checkbox" ${s.done ? 'checked' : ''}
              onchange="toggleSet(${exIdx}, ${sIdx}, this.checked)">
          </div>
        </div>
      `).join('');

      const phasesBadges = (ex.phases || []).map(p => `
        <span class="ex-phase-badge">🔹 ${p}</span>
      `).join('');

      bodyHtml = `
        <div class="pt-3 space-y-3 border-t border-white/[0.06] mt-3">
          
          <!-- БЛОК ВИЗУАЛИЗАЦИИ И МЫШЕЧНЫХ АКЦЕНТОВ -->
          <div class="p-3 bg-slate-950 rounded-2xl border border-cyan-500/20 space-y-2">
            <div class="flex justify-between items-center text-[10px] font-mono">
              <span class="text-cyan-400 font-bold flex items-center gap-1">🎯 ${ex.targetMuscles || 'Целевые мышцы'}</span>
              <span class="text-slate-400 bg-slate-900 px-2 py-0.5 rounded">${ex.muscleGroup || 'Группа'}</span>
            </div>
            <div class="flex flex-wrap gap-1.5 pt-0.5">${phasesBadges}</div>
            <p class="text-xs text-slate-300 leading-relaxed font-sans pt-1 border-t border-white/[0.04]">
              💡 <b>Техника:</b> ${ex.tip}
            </p>
          </div>

          <div class="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Подходы и веса:</span>
            <div class="flex space-x-1.5">
              <button onclick="resetExerciseSets(${exIdx})" class="px-2 py-0.5 bg-slate-900 text-rose-300 rounded-lg border border-white/10">↺ Сброс</button>
              ${ex.substitutes && ex.substitutes.length > 0 ? `<button onclick="swapExercisePrompt(${exIdx})" class="px-2 py-0.5 bg-slate-900 text-slate-300 rounded-lg border border-white/10">Замена</button>` : ''}
            </div>
          </div>

          <div class="space-y-2">${setsRows}</div>

          <div class="flex justify-between items-center pt-1 text-xs font-mono">
            <button onclick="addSetToExercise(${exIdx})" class="text-cyan-400 font-bold">➕ Добавить подход</button>
            ${ex.sets.length > 1 ? `<button onclick="removeSetFromExercise(${exIdx})" class="text-slate-500">➖ Убрать подход</button>` : ''}
          </div>
        </div>
      `;
    }

    card.innerHTML = headerHtml + bodyHtml;
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
  const ex = appState.activeWorkout.exercises[exIdx];
  const s = ex.sets[sIdx];
  s.done = done;
  saveState();
  updateLiveWorkoutStats();

  if (done) {
    if (s.weight > 0 && s.reps > 0) {
      checkAndSavePersonalRecord(ex.name, s.weight, s.reps);
    }

    Sound.success();
    Haptic.success();
    addXP(25);
    startRestTimer(90);

    const allSetsClosed = ex.sets.every(setObj => setObj.done);
    if (allSetsClosed) {
      const allMaxClosed = ex.sets.every(setObj => setObj.reps >= ex.max);
      if (allMaxClosed) {
        if (!appState.weightProgression) appState.weightProgression = {};
        appState.weightProgression[ex.name] = (s.weight || ex.defaultWeight) + 2.5;
        saveState();
      }

      if (exIdx < appState.activeWorkout.exercises.length - 1) {
        setTimeout(() => {
          activeExpandedExerciseIndex = exIdx + 1;
          renderActiveWorkoutUI();
          const nextEl = document.getElementById(`ex-card-${exIdx + 1}`);
          if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
        return;
      }
    }
  }

  renderActiveWorkoutUI();
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
        speakVoice("Отдых окончен! Время для следующего подхода");
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

  clearInterval(liveWorkoutTimerInterval);
  const now = new Date();
  const endTimeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  const startTs = wo.startTimestamp || (now.getTime() - 45 * 60000);
  const durationMin = Math.max(1, Math.round((now.getTime() - startTs) / 60000));

  let tonnage = 0;
  const exSummaries = [];

  wo.exercises.forEach(e => {
    const doneSets = e.sets.filter(s => s.done);
    doneSets.forEach(s => {
      tonnage += (s.weight * s.reps);
      if (s.weight > 0 && s.reps > 0) {
        checkAndSavePersonalRecord(e.name, s.weight, s.reps);
      }
    });
    const isMaxClosed = doneSets.length === e.sets.length && doneSets.every(s => s.reps >= e.max);
    exSummaries.push({
      name: e.name,
      sets: doneSets.map(s => `${s.weight}кг×${s.reps}`).join(', ') || '0',
      prog: isMaxClosed ? `🚀 Закрыто! +2.5кг` : `План: ${e.sets.length}×${e.max}`
    });
  });

  const caloriesBurned = calculateCurrentCaloriesBurned();
  const dateStr = wo.targetDate || now.toISOString().split("T")[0];

  if (!appState.history) appState.history = [];
  appState.history.unshift({
    id: "wo_" + Date.now(),
    date: dateStr,
    startTimeStr: wo.startTimeStr || "18:00",
    endTimeStr: endTimeStr,
    durationMin: durationMin,
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
  speakVoice("Отличная работа, Роман! Тренировка завершена.");

  alert(`🎉 ТРЕНИРОВКА ЗАВЕРШЕНА!\n\n⏱️ Время: ${wo.startTimeStr} – ${endTimeStr} (${durationMin} мин)\n🏋️ Тоннаж: ${Math.round(tonnage)} кг\n🔥 Сожжено: ~${caloriesBurned} ккал\n+150 очков получено!`);
  document.getElementById("workout-active").classList.add("hidden");
  document.getElementById("workout-selector").classList.remove("hidden");
  renderMuscleVolumeBreakdown();
  switchTab("progress");
  switchProgressSubtab("archive");
}

function cancelWorkout() {
  if (confirm("Отменить текущую тренировку?")) {
    clearInterval(liveWorkoutTimerInterval);
    appState.activeWorkout = null;
    saveState();
    document.getElementById("workout-active").classList.add("hidden");
    document.getElementById("workout-selector").classList.remove("hidden");
  }
}

// ========================================================
// МОБИЛЬНЫЙ КАЛЕНДАРЬ МЕСЯЦА И ВЫБОР ДАТЫ
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

function openDateWorkoutPickerModal(dateStr) {
  selectedCalDateStr = dateStr;
  const dateObj = new Date(dateStr);
  const formatted = dateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  const title = document.getElementById("picker-modal-title");
  if (title) title.textContent = `📅 Тренировка на ${formatted}`;
  openModal('modal-date-workout-picker');
}

function launchWorkoutOnSelectedDate(planKey) {
  closeModal('modal-date-workout-picker');
  promptReadinessBeforeWorkout(planKey, selectedCalDateStr);
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
  const currentTodayDate = 27;

  for (let day = 1; day <= totalDaysInMonth; day++) {
    const curDate = new Date(calYear, calMonth, day);
    const dayOfWeek = curDate.getDay();
    const isScheduled = (dayOfWeek === 2 || dayOfWeek === 4);
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
  const inspActions = document.getElementById("cal-insp-actions");
  if (!inspDate || !inspBadge || !inspContent) return;

  const dateObj = new Date(dateStr);
  const formatted = dateObj.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  inspDate.textContent = formatted;

  if (status === 'done' && woData) {
    inspBadge.textContent = "✅ ВЫПОЛНЕНО";
    inspBadge.className = "px-2.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-lg text-xs font-bold font-mono";
    const timeInfo = woData.startTimeStr ? `⏱️ ${woData.startTimeStr} – ${woData.endTimeStr || '...'} (${woData.durationMin || 45} мин)` : `⏱️ ~45 мин`;
    inspContent.innerHTML = `
      <p><b>${woData.name}</b></p>
      <p class="text-[11px] text-slate-300 font-mono">${timeInfo} • Тоннаж: <b class="text-emerald-400">${woData.tonnage} кг</b> • <b class="text-amber-400">~${woData.calories || 350} ккал</b></p>
    `;
    if (inspActions) inspActions.innerHTML = "";
  } else if (status === 'missed') {
    inspBadge.textContent = "❌ ПРОПУСК";
    inspBadge.className = "px-2.5 py-0.5 bg-rose-950 text-rose-400 border border-rose-800 rounded-lg text-xs font-bold font-mono";
    inspContent.innerHTML = `<p class="text-slate-300">Запланированная тренировка была пропущена. Ты можешь восполнить ее в любой день!</p>`;
    if (inspActions) {
      inspActions.innerHTML = `
        <button onclick="openDateWorkoutPickerModal('${dateStr}')" class="w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase rounded-xl font-mono active:scale-98 transition-all shadow-md">
          ▶️ Записать тренировку на ${dateStr}
        </button>
      `;
    }
  } else if (status === 'plan') {
    inspBadge.textContent = "⏳ ПЛАН";
    inspBadge.className = "px-2.5 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-lg text-xs font-bold font-mono";
    inspContent.innerHTML = `<p class="text-slate-300">Запланированный день тренировки по графику. Готовься к прогрессии весов!</p>`;
    if (inspActions) {
      inspActions.innerHTML = `
        <button onclick="openDateWorkoutPickerModal('${dateStr}')" class="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-black text-xs uppercase rounded-xl font-mono active:scale-98 transition-all shadow-md">
          ▶️ Начать тренировку на эту дату
        </button>
      `;
    }
  } else {
    inspBadge.textContent = "⚪ ОТДЫХ";
    inspBadge.className = "px-2.5 py-0.5 bg-slate-900 text-slate-400 border border-white/10 rounded-lg text-xs font-bold font-mono";
    inspContent.innerHTML = `<p class="text-slate-300">День отдыха. Пришел в зал вне графика? Никаких проблем — жми кнопку ниже:</p>`;
    if (inspActions) {
      inspActions.innerHTML = `
        <button onclick="openDateWorkoutPickerModal('${dateStr}')" class="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 font-bold text-xs uppercase rounded-xl border border-cyan-500/40 font-mono active:scale-98 transition-all">
          ➕ Провести тренировку в этот день
        </button>
      `;
    }
  }
}

// ========================================================
// 12-МЕСЯЧНЫЙ ГОДОВОЙ ОБЗОР
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
// ЗАМЕРЫ ТЕЛА И ГРАФИК
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
  const ratio = Math.round((waist / height) * 100);
  if (ratio <= 49) {
    badge.textContent = `🟢 Норма (${ratio}%)`;
    badge.className = "px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800";
  } else if (ratio <= 53) {
    badge.textContent = `🟡 Умеренный жир (${ratio}%)`;
    badge.className = "px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-amber-950 text-amber-300 border border-amber-800";
  } else {
    badge.textContent = `🔴 Избыток жира (${ratio}%)`;
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
  alert(`✓ Замеры за ${today} сохранены! (+40 очков опыта)`);
}

function setChartFilter(filter) {
  currentChartFilter = filter;
  ['all', 'weight', 'waist', 'duration'].forEach(f => {
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

  if (currentChartFilter === 'duration') {
    const hist = (appState.history || []).slice().reverse().filter(item => (item.durationMin || 45) > 0);
    if (hist.length < 2) {
      ctx.fillStyle = "#64748b";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Добавь минимум 2 тренировки для графика времени", w / 2, h / 2);
      return;
    }
    const durations = hist.map(item => item.durationMin || 45);
    const min = Math.max(0, Math.min(...durations) - 5);
    const max = Math.max(...durations) + 10;

    function getY(v) { return 20 + (1 - (v - min) / (max - min)) * (h - 40); }
    function getX(i) { return 35 + (i / (hist.length - 1)) * (w - 55); }

    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const y = 20 + (i / 3) * (h - 40);
      ctx.beginPath();
      ctx.moveTo(35, y);
      ctx.lineTo(w - 20, y);
      ctx.stroke();

      const val = (max - (i / 3) * (max - min)).toFixed(0) + "м";
      ctx.fillStyle = "#475569";
      ctx.font = "10px monospace";
      ctx.textAlign = "right";
      ctx.fillText(val, 30, y + 3);
    }

    ctx.strokeStyle = "#00f0ff";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    durations.forEach((v, i) => {
      const x = getX(i), y = getY(v);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    durations.forEach((v, i) => {
      const x = getX(i), y = getY(v);
      ctx.fillStyle = "#00f0ff";
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    return;
  }

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
// УТРЕННИЙ ВАКУУМ
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
    instr.textContent = "Медленно наполняй легкие воздухом...";
    txt.textContent = vacuumState.timeLeft;
    Sound.beep(440, 0.2);
  } else if (phase === 'exhale') {
    vacuumState.timeLeft = 4;
    circle.className = "w-20 h-20 rounded-full bg-amber-950/50 border-4 border-amber-400 flex flex-col items-center justify-center shadow-lg scale-95";
    phaseEl.textContent = "2. ПОЛНЫЙ ВЫДОХ";
    instr.textContent = "Выдохни весь воздух до самого конца!";
    txt.textContent = vacuumState.timeLeft;
    Sound.beep(550, 0.2);
  } else if (phase === 'hold') {
    vacuumState.timeLeft = vacuumState.duration;
    circle.className = "w-20 h-20 rounded-full bg-cyan-950/60 border-4 border-cyan-300 flex flex-col items-center justify-center shadow-2xl scale-90";
    phaseEl.textContent = "3. ДЕРЖИ ВАКУУМ!";
    instr.textContent = "Втяни живот под ребра и удерживай.";
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
          speakVoice("Все пять подходов вакуума выполнены!");
          alert("🎉 Все 5 подходов вакуума выполнены! (+50 очков опыта).");
        }
      } else if (vacuumState.phase === 'rest') {
        vacuumState.currentSet++;
        startVacuumPhase('inhale');
      }
    }
  }, 1000);
}

// ========================================================
// ПИТАНИЕ
// ========================================================
function addProtein(p, cal) {
  if (!appState.nutrition) appState.nutrition = { protein: 0, waterMl: 0, calories: 0, caloriesBurned: 0 };
  appState.nutrition.protein = (appState.nutrition.protein || 0) + p;
  appState.nutrition.calories = (appState.nutrition.calories || 0) + (cal || p * 4);
  if (appState.nutrition.protein >= 150) {
    appState.protDaysCount = (appState.protDaysCount || 0) + 1;
  }
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
// АРХИВ ТРЕНИРОВОК
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

    const timeString = h.startTimeStr ? `⏱️ ${h.startTimeStr} – ${h.endTimeStr || '...'} (${h.durationMin || 45} мин)` : `⏱️ ${h.timeStr || h.date}`;

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
          <span class="text-[10px] text-slate-400">${h.date} • ${timeString}</span>
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
  document.getElementById("edit-h-starttime").value = h.startTimeStr || "18:00";
  document.getElementById("edit-h-endtime").value = h.endTimeStr || "19:00";
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
  h.startTimeStr = document.getElementById("edit-h-starttime").value;
  h.endTimeStr = document.getElementById("edit-h-endtime").value;
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
  renderMuscleVolumeBreakdown();
  drawTrendChart();
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
    renderMuscleVolumeBreakdown();
    drawTrendChart();
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
    renderMuscleVolumeBreakdown();
    drawTrendChart();
    Sound.beep(400, 0.1);
  }
}

function openAddManualWorkoutModal() {
  const name = prompt("Название тренировки:", "Тренировка А");
  if (!name) return;
  const tonnage = prompt("Общий тоннаж (кг):", "4000");
  const cals = prompt("Сожжено калорий (ккал):", "380");

  const now = new Date();
  const startTimeStr = "18:00";
  const endTimeStr = "18:50";

  if (!appState.history) appState.history = [];
  appState.history.unshift({
    id: "wo_" + Date.now(),
    date: selectedCalDateStr || now.toISOString().split("T")[0],
    startTimeStr: startTimeStr,
    endTimeStr: endTimeStr,
    durationMin: 50,
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
  renderMuscleVolumeBreakdown();
  drawTrendChart();
  Sound.success();
}

// ========================================================
// ПОЛНЫЙ АНАЛИТИЧЕСКИЙ ОТЧЕТ ДЛЯ ТРЕНЕРА И ИИ
// ========================================================
function copyCoachSummary() {
  const m = appState.currentMetrics || {};
  const hist = appState.history || [];
  const prs = appState.personalRecords || {};
  const currentLvl = Math.floor(appState.xp / 500) + 1;
  const waistRatio = Math.round(((m.waist || 91.5) / (appState.height || 178)) * 100);

  let prsText = "";
  const prKeys = Object.keys(prs);
  if (prKeys.length > 0) {
    prsText = prKeys.map(k => `  • ${k}: ${prs[k].weight} кг × ${prs[k].reps} раз (зафиксировано: ${prs[k].date})`).join("\n");
  } else {
    prsText = "  • Рекорды пока формируются.";
  }

  let lastWosText = "";
  if (hist.length === 0) {
    lastWosText = "  • Тренировок в архиве пока нет.";
  } else {
    lastWosText = hist.slice(0, 4).map((h, i) => {
      const timeSpan = h.startTimeStr ? `${h.startTimeStr}–${h.endTimeStr || '...'} (${h.durationMin || 45} мин)` : `~45 мин`;
      const exStr = (h.exercises || []).map(e => `    - ${e.name}: ${e.sets}`).join("\n");
      return `${i + 1}) ${h.date} [${timeSpan}] — ${h.name}\n   Тоннаж: ${h.tonnage} кг | Сожжено: ~${h.calories || 350} ккал | Готовность: ${h.readiness || 90}%\n${exStr}`;
    }).join("\n\n");
  }

  const summary = `📊 [IRON COACH — ПОЛНОЕ АНАЛИТИЧЕСКОЕ ДОСЬЕ АТЛЕТА ДЛЯ ИИ/ТРЕНЕРА]:
=============================================
👤 1. ПРОФИЛЬ И ПАРАМЕТРЫ:
• Атлет: ${appState.name} | Возраст: ${appState.age || 32} года | Рост: ${appState.height || 178} см
• Главная цель: ${appState.goal || 'Рекомпозиция (Сушка жира + Мышечный тонус)'}
• Ограничения/травмы: ${appState.injuries || 'Нет'}
• Уровень: ${currentLvl} | Всего опыта: ${appState.xp.toLocaleString()} XP
• Текущая серия: 🔥${appState.streak || 0} дней без срывов
• Периодизация: Неделя ${appState.mesocycleWeek || 1} из 8 (Фаза ${appState.mesocycleWeek <= 3 ? '1: Накопление (+2.5кг)' : appState.mesocycleWeek <= 6 ? '2: Интенсификация (8-10 повт)' : '3: Пик'})

📐 2. АНТРОПОМЕТРИЯ И ЗАМЕРЫ ТЕЛА:
• Вес тела: ${m.weight || 83} кг
• Талия по пупку: ${m.waist || 91.5} см (Соотношение талии к росту: ${waistRatio}%)
• Бицепс (рука): ${m.biceps || 38.5} см
• Обхват груди: ${m.chest || 104} см
• Бедро (нога): ${m.thigh || 59} см
• Шея: ${m.neck || 39.5} см

👑 3. ЗАЛ ЛИЧНЫХ РЕКОРДОВ (РЕАЛЬНЫЕ ВЕСА И ПОВТОРЕНИЯ):
${prsText}

📋 4. ПОСЛЕДНИЕ ТРЕНИРОВКИ (С ХРОНОМЕТРАЖЕМ И ВЕСАМИ):
${lastWosText}

💧 5. ДИСЦИПЛИНА И ЗДОРОВЬЕ:
• Выполнено сессий утреннего вакуума: ${appState.vacDaysCount || 0}
• Дней с закрытием нормы белка (150г+): ${appState.protDaysCount || 0}
• Суммарный тоннаж за все время: ${getTotalTonnage(appState).toLocaleString()} кг
=============================================`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(summary).then(() => {
      Sound.success();
      Haptic.success();
      alert(`✓ Полное аналитическое досье атлета «${appState.name}» скопировано в буфер обмена!\n\nПросто вставь (Ctrl+V) в чат с тренером или ИИ.`);
    }).catch(() => {
      prompt("Скопируй текст досье вручную:", summary);
    });
  } else {
    prompt("Скопируй текст досье вручную:", summary);
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
// НАВИГАЦИЯ МЕЖДУ 3 ВКЛАДКАМИ
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

// 3x2 СЕТКА ПОДВКЛАДОК ПРОГРЕССА
function switchProgressSubtab(subtabId) {
  Sound.beep(550, 0.05);
  Haptic.impact('light');

  ['calendar', 'metrics', 'records', 'leaderboard', 'achievements', 'archive'].forEach(st => {
    const pane = document.getElementById("subtab-" + st);
    const btn = document.getElementById("btn-sub-" + st);
    if (st === subtabId) {
      if (pane) pane.classList.remove("hidden");
      if (btn) {
        btn.className = "py-2.5 px-1 rounded-xl bg-cyan-400 text-slate-950 font-black transition-all text-center flex items-center justify-center space-x-1 shadow-sm";
      }
    } else {
      if (pane) pane.classList.add("hidden");
      if (btn) {
        btn.className = "py-2.5 px-1 rounded-xl text-slate-400 font-bold transition-all text-center flex items-center justify-center space-x-1";
      }
    }
  });

  if (subtabId === 'calendar') {
    renderMonthlyCalendar();
    render12MonthsAnnualBreakdown();
    renderMuscleVolumeBreakdown();
  }
  if (subtabId === 'metrics') {
    setTimeout(() => {
      renderMetrics();
      drawTrendChart();
    }, 50);
  }
  if (subtabId === 'records') {
    renderPersonalRecords();
  }
  if (subtabId === 'leaderboard') {
    fetchLeaderboard();
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
      <span class="text-slate-400">Максимум на 1 раз (1ПМ):</span>
      <span class="text-sm font-bold text-cyan-300 font-mono">${oneRM} кг</span>
    </div>
    <div class="flex justify-between text-[11px] pt-1 font-mono">
      <span>80% (Рабочий на 8-10): <b>${eightyPct} кг</b></span>
      <span>70% (Памп на 12-15): <b>${seventyPct} кг</b></span>
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
  renderPersonalRecords();
  renderMuscleVolumeBreakdown();
});
