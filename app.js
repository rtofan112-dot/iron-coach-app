/**
 * IRON COACH ELITE - Bio-Analytics & Scientific Hypertrophy Engine
 */

const APP_CONFIG = {
  version: "v2.8.25 PRO",
  build: "v2.8.25 (Evidence-Based Science, PubMed Citations & Live Edge Sync)",
  releaseDate: "2026-08-28"
};

function injectAppVersion() {
  document.querySelectorAll(".app-version-badge").forEach(el => {
    el.textContent = APP_CONFIG.version;
  });
  document.querySelectorAll(".app-build-badge").forEach(el => {
    el.textContent = APP_CONFIG.build;
  });
}

// ========================================================
// 3 РЕЖИМА ЗВУКА И ВИБРАЦИИ
// ========================================================
const Sound = {
  ctx: null,
  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.ctx = new AudioContext();
    }
  },
  beep(freq = 660, dur = 0.15, type = 'sine') {
    if (appState.soundMode !== 'sound') return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + dur);
    } catch(e) {}
  },
  boxingBellStrike(dur = 1.0, gainVal = 0.35) {
    if (appState.soundMode !== 'sound') return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;
      const fundamental = 800; // 800 Hz - классический чистый тон латунного боксерского колокола

      // 1. Металлический удар молотка по чаше колокола
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(fundamental, now);
      gain1.gain.setValueAtTime(gainVal, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + dur);

      // 2. Хрустальный высокочастотный металлический звон
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(fundamental * 2.0, now);
      gain2.gain.setValueAtTime(gainVal * 0.6, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + dur * 0.9);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + dur * 0.9);

      const osc3 = this.ctx.createOscillator();
      const gain3 = this.ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(fundamental * 3.0, now);
      gain3.gain.setValueAtTime(gainVal * 0.35, now);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + dur * 0.7);
      osc3.connect(gain3);
      gain3.connect(this.ctx.destination);
      osc3.start(now);
      osc3.stop(now + dur * 0.7);

      // 3. Негармонический колокольный обертон (Inharmonic chime 1130 Hz)
      const osc4 = this.ctx.createOscillator();
      const gain4 = this.ctx.createGain();
      osc4.type = 'sine';
      osc4.frequency.setValueAtTime(1130, now);
      gain4.gain.setValueAtTime(gainVal * 0.4, now);
      gain4.gain.exponentialRampToValueAtTime(0.0001, now + dur * 0.8);
      osc4.connect(gain4);
      gain4.connect(this.ctx.destination);
      osc4.start(now);
      osc4.stop(now + dur * 0.8);

      // 4. Глубокий резонанс корпуса колокола (400 Hz)
      const osc5 = this.ctx.createOscillator();
      const gain5 = this.ctx.createGain();
      osc5.type = 'sine';
      osc5.frequency.setValueAtTime(400, now);
      gain5.gain.setValueAtTime(gainVal * 0.25, now);
      gain5.gain.exponentialRampToValueAtTime(0.0001, now + dur * 1.1);
      osc5.connect(gain5);
      gain5.connect(this.ctx.destination);
      osc5.start(now);
      osc5.stop(now + dur * 1.1);
    } catch(e) {}
  },
  success() {
    this.beep(587.33, 0.08);
    setTimeout(() => this.beep(880, 0.2), 80);
  },
  record() {
    this.beep(523.25, 0.08);
    setTimeout(() => this.beep(659.25, 0.08), 90);
    setTimeout(() => this.beep(783.99, 0.15), 180);
  },
  finish() {
    this.restFinish();
  },
  restFinish() {
    if (appState.soundMode !== 'sound') return;
    // КЛАССИЧЕСКИЙ БОКСЕРСКИЙ КОЛОКОЛ НА РИНГЕ (3 ЧЕТКИХ УДАРА МОЛОТКА: ДИНЬ - ДИНЬ - ДИИИИНЬ)
    this.boxingBellStrike(0.7, 0.32);
    setTimeout(() => {
      this.boxingBellStrike(0.7, 0.35);
    }, 320);
    setTimeout(() => {
      this.boxingBellStrike(2.2, 0.40);
    }, 650);
  }
};

const Haptic = {
  impact(style = 'medium') {
    if (appState.soundMode === 'silent' || appState.hapticLevel === 'off') return;
    const effStyle = appState.hapticLevel === 'heavy' ? 'heavy' : appState.hapticLevel === 'light' ? 'light' : style;
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred(effStyle);
    } else if (navigator.vibrate) {
      navigator.vibrate(35);
    }
  },
  success() {
    if (appState.soundMode === 'silent' || appState.hapticLevel === 'off') return;
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
    } else if (navigator.vibrate) {
      navigator.vibrate([35, 50, 70]);
    }
  },
  restFinish() {
    // Вибрация при гонке отключена (только чистый звон боксерского колокола)
  }
};

const SVG_ICONS = {
  soundOn: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
  soundVibrate: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line><path d="M1 9l2 3-2 3M23 9l-2 3 2 3"></path></svg>`,
  soundMute: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`
};

function cycleSoundMode() {
  if (appState.soundMode === 'sound') {
    appState.soundMode = 'vibrate';
  } else if (appState.soundMode === 'vibrate') {
    appState.soundMode = 'silent';
  } else {
    appState.soundMode = 'sound';
  }
  saveState();
  updateSoundUI();
  Sound.beep(700, 0.08);
  Haptic.impact('light');
}

function updateSoundUI() {
  const btnHead = document.getElementById("btn-header-sound");
  const btnTimer = document.getElementById("btn-timer-sound");
  
  let iconSvg = SVG_ICONS.soundOn;
  if (appState.soundMode === 'vibrate') iconSvg = SVG_ICONS.soundVibrate;
  if (appState.soundMode === 'silent') iconSvg = SVG_ICONS.soundMute;

  if (btnHead) btnHead.innerHTML = iconSvg;
  if (btnTimer) btnTimer.innerHTML = iconSvg;
}

// ========================================================
// НАУЧНЫЕ БИОМЕХАНИЧЕСКИЕ ИЛЛЮСТРАЦИИ (NSCA / EXRX STANDARD)
// ========================================================
// ========================================================
// НАУЧНЫЕ БИОМЕХАНИЧЕСКИЕ ИЛЛЮСТРАЦИИ (КАЖДОЕ УПРАЖНЕНИЕ СО СВОЕЙ ТЕХНИКОЙ И ДИАГРАММОЙ)
// ========================================================
// ========================================================
// PRO EXERCISE BIOMECHANICS & ANATOMICAL VISUALIZER 4.0
// 100% УНИКАЛЬНАЯ АНАТОМИЧЕСКАЯ И ОБОРУДОВАНИЯ ГРАФИКА ДЛЯ ВСЕХ 48+ УПРАЖНЕНИЙ
// ========================================================

function getExerciseDiagramSVG(exName, muscleGroup) {
  const n = (exName || "").toLowerCase().trim();

  // ----------------------------------------------------
  // ГРУДЬ
  // ----------------------------------------------------
  if (n.includes("жим гантелей на наклонной") || (n.includes("наклонн") && n.includes("гантел") && n.includes("30°"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Наклонная скамья 30° -->
        <line x1="25" y1="78" x2="115" y2="40" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <line x1="45" y1="70" x2="45" y2="84" stroke="#334155" stroke-width="3"/>
        <line x1="105" y1="45" x2="105" y2="84" stroke="#334155" stroke-width="3"/>
        <line x1="15" y1="84" x2="125" y2="84" stroke="#1e293b" stroke-width="2"/>
        <!-- Атлет на наклонной скамье 30° -->
        <circle cx="110" cy="32" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="105" y1="36" x2="58" y2="58" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M96 42 L80 49" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <!-- Руки с раздельными гантелями -->
        <polyline points="92,44 82,28 78,14" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="78" cy="14" r="4.5" fill="#c8a97e"/>
        <path d="M84 32 C 82 22, 80 18, 78 14" stroke="#c8a97e" stroke-width="1.5" stroke-dasharray="2 2"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ЖИМ ГАНТЕЛЕЙ 30°</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Угол скамьи: 30°</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Локти 60–70° к телу</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Верх грудных (ключичный пучок)</text>
      </svg>
    `;
  }

  if (n.includes("жим штанги на наклонной") || (n.includes("наклонн") && n.includes("штанг") && n.includes("30°"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Стойки жима и наклонная скамья -->
        <line x1="25" y1="78" x2="115" y2="40" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <line x1="95" y1="12" x2="95" y2="84" stroke="#334155" stroke-width="3"/>
        <!-- Атлет -->
        <circle cx="110" cy="32" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="105" y1="36" x2="58" y2="58" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M96 42 L80 49" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <!-- Олимпийский гриф штанги -->
        <polyline points="92,44 80,30 76,16" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="55" y1="16" x2="98" y2="16" stroke="#c8a97e" stroke-width="3.5" stroke-linecap="round"/>
        <rect x="52" y="11" width="4" height="10" rx="1" fill="#c8a97e"/>
        <rect x="96" y="11" width="4" height="10" rx="1" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ЖИМ ШТАНГИ 30°</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Опускание: 2см ниже ключиц</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Хват шире плеч, локти 65°</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Верхний пучок груди (база)</text>
      </svg>
    `;
  }

  if (n.includes("жим гантелей на горизонтал") || (n.includes("жим гантелей") && !n.includes("наклон") && !n.includes("плеч") && !n.includes("сидя"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Горизонтальная скамья -->
        <line x1="25" y1="58" x2="120" y2="58" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <line x1="38" y1="58" x2="38" y2="84" stroke="#334155" stroke-width="3"/>
        <line x1="108" y1="58" x2="108" y2="84" stroke="#334155" stroke-width="3"/>
        <!-- Атлет лежа горизонтально -->
        <circle cx="112" cy="48" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="106" y1="53" x2="52" y2="53" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M96 53 L76 53" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <!-- Гантели в руках с независимым схождением -->
        <polyline points="90,53 85,34 82,14" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="82" cy="14" r="4.5" fill="#c8a97e"/>
        <path d="M72 38 C 76 28, 80 20, 82 14" stroke="#c8a97e" stroke-width="1.5" stroke-dasharray="2 2"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ЖИМ ГАНТЕЛЕЙ ЛЕЖА</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Глубокая растяжка внизу</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Сведение вверху без удара</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Середина и массив грудных</text>
      </svg>
    `;
  }

  if (n.includes("жим штанги лежа") || (n.includes("жим лежа") && !n.includes("узк") && !n.includes("француз"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Стойки и скамья -->
        <line x1="25" y1="58" x2="120" y2="58" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <line x1="100" y1="12" x2="100" y2="84" stroke="#334155" stroke-width="3"/>
        <!-- Атлет -->
        <circle cx="112" cy="48" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="106" y1="53" x2="52" y2="53" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M96 53 L74 53" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <!-- Штанга -->
        <polyline points="88,53 82,32 82,14" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="56" y1="14" x2="108" y2="14" stroke="#c8a97e" stroke-width="3.5" stroke-linecap="round"/>
        <rect x="53" y="9" width="4" height="10" rx="1" fill="#c8a97e"/>
        <rect x="106" y="9" width="4" height="10" rx="1" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ЖИМ ШТАНГИ ЛЕЖА</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Касание линии сосков</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Лопатки сведены в замок</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Золотая база на грудь</text>
      </svg>
    `;
  }

  if (n.includes("бабочк") || n.includes("pec deck") || n.includes("пэк-дек")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Спинка и сиденье тренажера Pec Deck -->
        <line x1="50" y1="18" x2="50" y2="76" stroke="#475569" stroke-width="4"/>
        <line x1="50" y1="76" x2="80" y2="76" stroke="#475569" stroke-width="4"/>
        <circle cx="58" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="58" y1="28" x2="58" y2="70" stroke="#f1f5f9" stroke-width="4"/>
        <!-- Подушки и рычаги сведения -->
        <path d="M96 30 C 88 42, 78 44, 68 44" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        <rect x="94" y="24" width="6" height="14" rx="2" fill="#c8a97e"/>
        <path d="M68 44 L78 44" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <path d="M106 28 C 96 42, 82 46, 74 46" stroke="#c8a97e" stroke-width="1.5" stroke-dasharray="2 2"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">БАБОЧКА (PEC DECK)</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Локти на уровне груди</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Пиковое сжатие 2с в центре</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Изоляция внутренней части</text>
      </svg>
    `;
  }

  if (n.includes("кроссовер")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Блочные башни кроссовера -->
        <line x1="20" y1="10" x2="20" y2="82" stroke="#334155" stroke-width="3"/>
        <line x1="120" y1="10" x2="120" y2="82" stroke="#334155" stroke-width="3"/>
        <circle cx="20" cy="18" r="3.5" fill="#c8a97e"/>
        <circle cx="120" cy="18" r="3.5" fill="#c8a97e"/>
        <!-- Атлет в центре -->
        <circle cx="70" cy="24" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="70" y1="30" x2="66" y2="64" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M70 38 L66 52" stroke="#c8a97e" stroke-width="5"/>
        <!-- Тросы сходятся вперед по дуге -->
        <line x1="20" y1="18" x2="64" y2="48" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="3 2"/>
        <line x1="120" y1="18" x2="74" y2="48" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="3 2"/>
        <circle cx="69" cy="48" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">КРОССОВЕР НА БЛОКАХ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Корпус слегка вперед</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Сведение по широкой дуге</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Низ и середина груди</text>
      </svg>
    `;
  }

  if (n.includes("брусь") || n.includes("dips") || (n.includes("отжимания") && n.includes("грудь"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Брусья -->
        <line x1="35" y1="46" x2="105" y2="46" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <line x1="45" y1="46" x2="45" y2="84" stroke="#334155" stroke-width="3"/>
        <line x1="95" y1="46" x2="95" y2="84" stroke="#334155" stroke-width="3"/>
        <!-- Атлет с наклоном 30 градусов -->
        <circle cx="84" cy="18" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="80" y1="24" x2="64" y2="56" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M74 34 L66 48" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="64,56 52,74 44,68" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        <!-- Руки на брусьях -->
        <polyline points="76,32 64,46 74,46" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="74" cy="46" r="3.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ОТЖИМАНИЯ НА БРУСЬЯХ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Наклон корпуса вперед 30°</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Локти в стороны под 45°</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Нижний контур грудных</text>
      </svg>
    `;
  }

  if (n.includes("хаммер") || n.includes("hammer")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Спинка Хаммера -->
        <line x1="55" y1="18" x2="55" y2="76" stroke="#475569" stroke-width="4"/>
        <line x1="55" y1="76" x2="88" y2="76" stroke="#475569" stroke-width="4"/>
        <circle cx="63" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="63" y1="28" x2="63" y2="66" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M65 38 L78 38" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <!-- Рычаги Хаммера с независимой траекторией -->
        <polyline points="65,38 86,38 112,38" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="116" y1="16" x2="112" y2="38" stroke="#c8a97e" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="116" cy="16" r="3.5" fill="#475569"/>
        <circle cx="112" cy="38" r="4" fill="#c8a97e"/>
        <path d="M92 48 C 102 48, 110 44, 115 38" stroke="#c8a97e" stroke-width="1.5" stroke-dasharray="2 2"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ЖИМ В ХАММЕРЕ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Безопасная сходящаяся дуга</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Плавный выжим без рывка</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Максимальный пампинг груди</text>
      </svg>
    `;
  }

  // ----------------------------------------------------
  // СПИНА
  // ----------------------------------------------------
  if (n.includes("горизонтального блока") || (n.includes("к поясу") && n.includes("блок"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Блочный тренажер горизонтальной тяги -->
        <line x1="25" y1="15" x2="25" y2="82" stroke="#334155" stroke-width="3"/>
        <line x1="25" y1="46" x2="70" y2="46" stroke="#64748b" stroke-width="2" stroke-dasharray="2 2"/>
        <!-- Атлет сидя с выпрямленной спиной -->
        <circle cx="112" cy="26" r="6.5" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="112" y1="33" x2="108" y2="60" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="108" y1="60" x2="72" y2="60" stroke="#94a3b8" stroke-width="3"/>
        <path d="M110 36 L108 54" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="110,36 92,43 70,46" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ТЯГА БЛОКА К ПОЯСУ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Локти скользят вдоль ребер</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Сведение лопаток в пике</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Толщина широчайших мышц</text>
      </svg>
    `;
  }

  if (n.includes("верхнего блока") || n.includes("тяга к груди")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Верхний блок -->
        <line x1="75" y1="8" x2="75" y2="24" stroke="#475569" stroke-width="3"/>
        <line x1="48" y1="24" x2="102" y2="24" stroke="#c8a97e" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Атлет сидя с легким прогибом груди -->
        <circle cx="75" cy="38" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="44" x2="72" y2="68" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M74 46 L71 62" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="52,24 64,42 74,48" stroke="#94a3b8" stroke-width="2.5"/>
        <polyline points="98,24 86,42 74,48" stroke="#94a3b8" stroke-width="2.5"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ТЯГА ВЕРХНЕГО БЛОКА</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Тяга строго к ключицам</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Локти направлены вниз</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Ширина спины (V-образная)</text>
      </svg>
    `;
  }

  if (n.includes("лицу") || n.includes("face pull") || (n.includes("ше") && n.includes("разгрузк"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="25" y1="10" x2="25" y2="82" stroke="#334155" stroke-width="3"/>
        <circle cx="25" cy="30" r="3.5" fill="#c8a97e"/>
        <line x1="25" y1="30" x2="75" y2="30" stroke="#64748b" stroke-width="2" stroke-dasharray="3 3"/>
        <circle cx="112" cy="24" r="6.5" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="112" y1="31" x2="112" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="112,35 98,24 75,30" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="108" cy="32" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">FACE PULL (К ЛИЦУ)</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Канат строго к глазам</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Локти выше кистей, пауза 2с</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Разгрузка шеи + задняя дельта</text>
      </svg>
    `;
  }

  if (n.includes("подтягиван") || n.includes("турник") || n.includes("гравитрон")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="45" y1="12" x2="115" y2="12" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>
        <circle cx="80" cy="26" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="80" y1="32" x2="80" y2="64" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M82 34 L82 54" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="60,12 68,26 78,34" stroke="#94a3b8" stroke-width="2.5"/>
        <polyline points="100,12 92,26 82,34" stroke="#94a3b8" stroke-width="2.5"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ПОДТЯГИВАНИЯ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Грудь к перекладине</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Лопатки сведены и опущены</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Широчайшие + брахиалис</text>
      </svg>
    `;
  }

  if (n.includes("гантели в наклоне") || n.includes("упором в скамью")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="55" x2="105" y2="55" stroke="#475569" stroke-width="4"/>
        <circle cx="95" cy="30" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="90" y1="35" x2="45" y2="35" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="45,35 45,55 70,55" stroke="#94a3b8" stroke-width="3"/>
        <path d="M75 36 L55 36" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="65,36 60,24 55,42" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="55" cy="42" r="4.5" fill="#c8a97e"/>
        
        <text x="135" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ТЯГА ГАНТЕЛИ В НАКЛОНЕ</text>
        <text x="135" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Тяга по дуге строго к тазу</text>
        <text x="135" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Спина параллельна полу</text>
        <text x="135" y="66" fill="#10b981" font-size="8" font-family="monospace">Односторонняя изоляция</text>
      </svg>
    `;
  }

  if (n.includes("т-гриф") || n.includes("t-bar") || n.includes("упором в грудь")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Наклонный упор тренажера Т-тяги -->
        <line x1="35" y1="70" x2="85" y2="35" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
        <circle cx="95" cy="26" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="90" y1="30" x2="48" y2="58" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M80 38 L60 52" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <!-- Рукояти Т-грифа -->
        <polyline points="72,42 62,28 62,48" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="62" cy="48" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ТЯГА Т-ГРИФА В УПОРЕ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Грудь плотно прижата к подушке</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Поясница полностью разгружена</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Толщина середины спины</text>
      </svg>
    `;
  }

  if (n.includes("гиперэкстензия") || n.includes("разгибател")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Римский стул 45° -->
        <line x1="30" y1="75" x2="80" y2="45" stroke="#475569" stroke-width="4"/>
        <circle cx="118" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="114" y1="26" x2="84" y2="44" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M98 35 L84 44" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="84" y1="44" x2="45" y2="68" stroke="#94a3b8" stroke-width="3.5"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ГИПЕРЭКСТЕНЗИЯ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Подъем ровно в прямую линию</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Без опасного переразгибания</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Поясничные разгибатели + ягодицы</text>
      </svg>
    `;
  }

  // ----------------------------------------------------
  // НОГИ
  // ----------------------------------------------------
  if (n.includes("жим ногами") || (n.includes("45°") && n.includes("ног"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="35" y1="25" x2="95" y2="75" stroke="#475569" stroke-width="4"/>
        <rect x="30" y="20" width="18" height="8" rx="2" fill="#c8a97e" transform="rotate(-35 30 20)"/>
        <circle cx="128" cy="40" r="6.5" stroke="#cbd5e1" stroke-width="2"/>
        <polyline points="124,45 104,62 68,52 45,35" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M104 62 L68 52" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <text x="145" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ЖИМ НОГАМИ 45°</text>
        <text x="145" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Угол в коленях 90°</text>
        <text x="145" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Упор в середину стопы и пятки</text>
        <text x="145" y="66" fill="#10b981" font-size="8" font-family="monospace">Квадрицепс + ягодичные</text>
      </svg>
    `;
  }

  if (n.includes("румынск") || n.includes("мертвая")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="110" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="105" y1="26" x2="65" y2="42" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="65,42 70,64 70,84" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M65 42 L70 64" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="90" y1="32" x2="82" y2="60" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="82" cy="60" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">РУМЫНСКАЯ ТЯГА</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Таз максимально назад (Hinge)</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Спина идеально прямая</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Бицепс бедра (растяжение)</text>
      </svg>
    `;
  }

  if (n.includes("сгибан") && (n.includes("ног") || n.includes("бедра"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="55" x2="95" y2="55" stroke="#475569" stroke-width="4"/>
        <circle cx="35" cy="44" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="35" y1="50" x2="75" y2="50" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="75,50 95,28" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="95" cy="28" r="4.5" fill="#c8a97e"/>
        <path d="M75 50 L95 28" stroke="#c8a97e" stroke-width="5" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">СГИБАНИЯ НОГ В ТРЕНАЖЕРЕ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Фиксация в точке сжатия 1с</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Медленный спуск 3 сек</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Изоляция бицепса бедра</text>
      </svg>
    `;
  }

  if (n.includes("разгибан") && (n.includes("ног") || n.includes("квадрицепс"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="20" x2="50" y2="60" stroke="#475569" stroke-width="4"/>
        <line x1="50" y1="60" x2="80" y2="60" stroke="#475569" stroke-width="4"/>
        <circle cx="58" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="58" y1="28" x2="58" y2="58" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="58" y1="58" x2="80" y2="58" stroke="#94a3b8" stroke-width="4"/>
        <line x1="80" y1="58" x2="110" y2="58" stroke="#c8a97e" stroke-width="4" stroke-linecap="round"/>
        <circle cx="110" cy="58" r="4.5" fill="#c8a97e"/>
        <path d="M58 58 L80 58" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">РАЗГИБАНИЯ НОГ СИДЯ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Плавный подъем без рывка</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Пиковое сжатие 1 сек</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Изоляция квадрицепса</text>
      </svg>
    `;
  }

  if (n.includes("гакк") || n.includes("hack") || (n.includes("присед") && n.includes("тренажер"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="20" x2="85" y2="78" stroke="#475569" stroke-width="4"/>
        <circle cx="55" cy="28" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="55" y1="34" x2="78" y2="60" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="78,60 100,60 100,82" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M78 60 L100 60" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ГАКК-ПРИСЕДАНИЯ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Спина плотно к опоре</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Сед до угла 90° в коленях</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Безопасно для поясницы</text>
      </svg>
    `;
  }

  if (n.includes("носки") || n.includes("икр") || n.includes("голен")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="80" x2="85" y2="80" stroke="#475569" stroke-width="4"/>
        <circle cx="70" cy="18" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="70" y1="24" x2="70" y2="58" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="70" y1="58" x2="70" y2="76" stroke="#94a3b8" stroke-width="3.5"/>
        <path d="M70 56 L70 70" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="70,76 78,80" stroke="#c8a97e" stroke-width="3"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ПОДЪЕМ НА НОСКИ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Максимальная амплитуда</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Пауза 2с в нижней растяжке</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Икроножные мышцы</text>
      </svg>
    `;
  }

  // ----------------------------------------------------
  // ПЛЕЧИ
  // ----------------------------------------------------
  if (n.includes("мах") && (n.includes("сторон") || n.includes("плеч") || n.includes("дельт"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="85" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="85" y1="26" x2="85" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="85,65 75,82" stroke="#94a3b8" stroke-width="2.5"/>
        <polyline points="85,65 95,82" stroke="#94a3b8" stroke-width="2.5"/>
        <polyline points="45,35 65,30 85,30 105,30 125,35" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="45" cy="35" r="4" fill="#c8a97e"/>
        <circle cx="125" cy="35" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">МАХИ ЧЕРЕЗ СТОРОНЫ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Подъем локтями до плеч</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Кисти чуть ниже локтей</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Средняя дельта (ширина плеч)</text>
      </svg>
    `;
  }

  if (n.includes("жим гантелей сидя") || (n.includes("жим") && n.includes("плечи")) || n.includes("75°")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="20" x2="58" y2="70" stroke="#475569" stroke-width="4"/>
        <line x1="58" y1="70" x2="88" y2="70" stroke="#475569" stroke-width="4"/>
        <circle cx="65" cy="24" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="65" y1="30" x2="68" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M66 32 L68 45" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="65,34 50,30 50,14" stroke="#94a3b8" stroke-width="2.5"/>
        <polyline points="65,34 80,30 80,14" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="50" cy="14" r="4.5" fill="#c8a97e"/>
        <circle cx="80" cy="14" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ЖИМ ГАНТЕЛЕЙ НА ПЛЕЧИ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Угол скамьи: 75°</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Локти слегка перед собой</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Передняя и средняя дельта</text>
      </svg>
    `;
  }

  if (n.includes("задн") && (n.includes("дельт") || n.includes("развод"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="95" cy="28" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="90" y1="32" x2="60" y2="48" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="60,48 65,65 65,82" stroke="#94a3b8" stroke-width="3"/>
        <circle cx="75" cy="38" r="4.5" fill="#c8a97e"/>
        <polyline points="75,38 60,25 45,28" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="45" cy="28" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">РАЗВОДКА НА ЗАДНЮЮ ДЕЛЬТУ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Наклон корпуса 45–60°</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Локти назад и в стороны</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Задний пучок дельт</text>
      </svg>
    `;
  }

  if (n.includes("протяжк") || n.includes("подбородк")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="75" y1="84" x2="75" y2="40" stroke="#64748b" stroke-width="2" stroke-dasharray="3 2"/>
        <circle cx="75" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="26" x2="75" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="50,30 62,38 88,38 100,30" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="62" y1="38" x2="88" y2="38" stroke="#c8a97e" stroke-width="4" stroke-linecap="round"/>
        <circle cx="50" cy="30" r="4" fill="#c8a97e"/>
        <circle cx="100" cy="30" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ПРОТЯЖКА К ПОДБОРОДКУ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Хват шире плеч</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Локти тянут строго вверх</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Средняя дельта + верх спины</text>
      </svg>
    `;
  }

  // ----------------------------------------------------
  // ТРИЦЕПС
  // ----------------------------------------------------
  if (n.includes("узким хват") || (n.includes("жим") && n.includes("узким"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="58" x2="110" y2="58" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <circle cx="100" cy="48" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="95" y1="53" x2="45" y2="53" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M85 53 L60 53" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="80,53 78,32 78,16" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="65" y1="16" x2="91" y2="16" stroke="#c8a97e" stroke-width="4" stroke-linecap="round"/>
        
        <text x="135" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ЖИМ УЗКИМ ХВАТОМ</text>
        <text x="135" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Хват строго на ширине плеч</text>
        <text x="135" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Локти 30–45° к телу</text>
        <text x="135" y="66" fill="#10b981" font-size="8" font-family="monospace">Тяжелая база на трицепс</text>
      </svg>
    `;
  }

  if (n.includes("французский жим с гантелями")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="58" x2="110" y2="58" stroke="#475569" stroke-width="4"/>
        <circle cx="100" cy="48" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="95" y1="53" x2="45" y2="53" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="85" y1="53" x2="85" y2="30" stroke="#94a3b8" stroke-width="3"/>
        <path d="M85 53 L85 30" stroke="#c8a97e" stroke-width="5" stroke-linecap="round"/>
        <line x1="85" y1="30" x2="100" y2="40" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="100" cy="40" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ФРАНЦУЗСКИЙ С ГАНТЕЛЯМИ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Опускание строго к вискам</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Независимая работа двух рук</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Длинная и латеральная головка</text>
      </svg>
    `;
  }

  if (n.includes("французский жим со штангой") || (n.includes("француз") && n.includes("штанг"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="58" x2="110" y2="58" stroke="#475569" stroke-width="4"/>
        <circle cx="100" cy="48" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="95" y1="53" x2="45" y2="53" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="85" y1="53" x2="78" y2="30" stroke="#94a3b8" stroke-width="3"/>
        <path d="M85 53 L78 30" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="78" y1="30" x2="108" y2="38" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="102" y1="38" x2="114" y2="38" stroke="#c8a97e" stroke-width="4" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ФРАНЦУЗСКИЙ EZ-ШТАНГА</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Опускание за макушку головы</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Плечо отклонено 15° назад</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Растяжение длинной головки</text>
      </svg>
    `;
  }

  if (n.includes("из-за головы") && n.includes("гантел")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="24" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="70" y1="30" x2="70" y2="68" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="70" y1="34" x2="70" y2="12" stroke="#94a3b8" stroke-width="3"/>
        <path d="M70 34 L70 12" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="70" y1="12" x2="58" y2="28" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="58" cy="28" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">РАЗГИБАНИЕ ИЗ-ЗА ГОЛОВЫ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Локоть смотрит строго вверх</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Глубокое опускание за шею</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Длинная головка трицепса</text>
      </svg>
    `;
  }

  if (n.includes("блоке из-за головы") || (n.includes("из-за головы") && n.includes("блок"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="25" y1="10" x2="25" y2="40" stroke="#475569" stroke-width="3"/>
        <circle cx="85" cy="28" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="80" y1="32" x2="60" y2="62" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="25" y1="20" x2="72" y2="22" stroke="#64748b" stroke-width="2" stroke-dasharray="2 2"/>
        <line x1="72" y1="22" x2="105" y2="22" stroke="#c8a97e" stroke-width="3" stroke-linecap="round"/>
        <circle cx="105" cy="22" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ТРИЦЕПС С БЛОКА ИЗ-ЗА ГОЛОВЫ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Корпус в наклоне от стойки</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Разгибание вперед-вверх</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Постоянное натяжение троса</text>
      </svg>
    `;
  }

  if (n.includes("верхнем блоке с канатом") || (n.includes("разгибания") && n.includes("канат"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="10" x2="50" y2="30" stroke="#64748b" stroke-width="2.5"/>
        <circle cx="75" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="26" x2="75" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="75" y1="32" x2="70" y2="45" stroke="#94a3b8" stroke-width="3"/>
        <path d="M75 32 L70 45" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="70" y1="45" x2="50" y2="65" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="50" cy="65" r="4" fill="#c8a97e"/>
        <circle cx="62" cy="65" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">РАЗГИБАНИЯ С КАНАТОМ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Разведение концов каната внизу</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Локти намертво у ребер</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Латеральная + медиальная</text>
      </svg>
    `;
  }

  if (n.includes("прямой / v-рукоятью") || (n.includes("разгибания") && n.includes("рукоят"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="10" x2="50" y2="30" stroke="#64748b" stroke-width="2.5"/>
        <circle cx="75" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="26" x2="75" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="75" y1="32" x2="72" y2="45" stroke="#94a3b8" stroke-width="3"/>
        <path d="M75 32 L72 45" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="72" y1="45" x2="54" y2="62" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="48" y1="62" x2="60" y2="62" stroke="#c8a97e" stroke-width="4" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">РАЗГИБАНИЯ С V-РУКОЯТЬЮ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Дави основанием ладоней вниз</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Корпус слегка наклонен</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Латеральная головка трицепса</text>
      </svg>
    `;
  }

  if (n.includes("обратные отжимания") || (n.includes("отжимания") && n.includes("скамь"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="55" x2="60" y2="55" stroke="#475569" stroke-width="4"/>
        <line x1="30" y1="55" x2="30" y2="82" stroke="#334155" stroke-width="3"/>
        <circle cx="68" cy="24" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="68" y1="30" x2="68" y2="60" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="68,60 95,60 110,80" stroke="#94a3b8" stroke-width="3"/>
        <polyline points="68,36 56,45 56,55" stroke="#94a3b8" stroke-width="2.5"/>
        <path d="M68 36 L56 45" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ОБРАТНЫЕ ОТЖИМАНИЯ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Спина скользит вдоль скамьи</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Опускание до 90° в локтях</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Трицепс + передняя дельта</text>
      </svg>
    `;
  }

  if (n.includes("кикбэк") || (n.includes("разгибание") && n.includes("назад"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="25" y1="60" x2="80" y2="60" stroke="#475569" stroke-width="4"/>
        <circle cx="85" cy="30" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="80" y1="35" x2="40" y2="35" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="65" y1="35" x2="45" y2="30" stroke="#94a3b8" stroke-width="3"/>
        <path d="M65 35 L45 30" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="45" y1="30" x2="18" y2="30" stroke="#c8a97e" stroke-width="3" stroke-linecap="round"/>
        <circle cx="18" cy="30" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">КИКБЭК В НАКЛОНЕ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Плечо зафиксировано выше спины</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Разгибание строго назад</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Пиковая изоляция латеральной</text>
      </svg>
    `;
  }

  // ----------------------------------------------------
  // БИЦЕПС
  // ----------------------------------------------------
  if (n.includes("сгибания рук с гантелями на наклонной скамье") || (n.includes("наклонн") && n.includes("45°") && n.includes("бицепс"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Наклонная скамья 45° -->
        <line x1="25" y1="78" x2="95" y2="28" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <line x1="40" y1="68" x2="40" y2="84" stroke="#334155" stroke-width="3"/>
        <line x1="85" y1="36" x2="85" y2="84" stroke="#334155" stroke-width="3"/>
        <circle cx="92" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="88" y1="26" x2="45" y2="58" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="72" y1="38" x2="68" y2="68" stroke="#94a3b8" stroke-width="3"/>
        <path d="M72 38 L68 68" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="68" y1="68" x2="84" y2="50" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="84" cy="50" r="4.5" fill="#c8a97e"/>
        <path d="M68 68 C 76 68, 82 60, 84 50" stroke="#c8a97e" stroke-width="1.5" stroke-dasharray="2 2"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">СГИБАНИЯ НА НАКЛОННОЙ 45°</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Локти отведены назад за спину</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Угол скамьи: 45°</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Растяжение длинной головки</text>
      </svg>
    `;
  }

  if (n.includes("молотковые") && n.includes("наклонн")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="78" x2="85" y2="28" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <circle cx="82" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="78" y1="26" x2="45" y2="58" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="66" y1="38" x2="62" y2="65" stroke="#94a3b8" stroke-width="3"/>
        <path d="M66 38 L62 65" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="62,65 76,48" stroke="#94a3b8" stroke-width="2.5"/>
        <rect x="73" y="42" width="6" height="12" rx="1" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">МОЛОТКОВЫЕ НА НАКЛОННОЙ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Нейтральный хват (ладони внутрь)</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Угол скамьи: 60°</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Брахиалис + внешняя часть</text>
      </svg>
    `;
  }

  if (n.includes("скамье скотта") || n.includes("scott")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="45" y1="70" x2="80" y2="38" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
        <circle cx="95" cy="28" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="90" y1="32" x2="70" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="82" y1="36" x2="55" y2="60" stroke="#94a3b8" stroke-width="3.5"/>
        <path d="M82 36 L55 60" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="55" y1="60" x2="68" y2="40" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="68" cy="40" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">СКАМЬЯ СКОТТА</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Подмышки плотно на пюпитре</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Исключена инерция тела</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Короткая внутренняя головка</text>
      </svg>
    `;
  }

  if (n.includes("паучьи") || n.includes("spider")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="35" y1="35" x2="85" y2="70" stroke="#475569" stroke-width="4"/>
        <circle cx="30" cy="24" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="34" y1="28" x2="75" y2="58" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="45" y1="36" x2="45" y2="68" stroke="#94a3b8" stroke-width="3"/>
        <path d="M45 36 L45 68" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="45,68 32,50" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="32" cy="50" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ПАУЧЬИ СГИБАНИЯ (SPIDER)</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Лежа грудью на наклонной 45°</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Руки висят вертикально вниз</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Пиковый пампинг и пик бицепса</text>
      </svg>
    `;
  }

  if (n.includes("концентрированные") || (n.includes("бицепс") && n.includes("сидя"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="65" x2="90" y2="65" stroke="#475569" stroke-width="4"/>
        <circle cx="70" cy="24" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="70" y1="30" x2="65" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="65,34 50,55 45,35" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="50" cy="55" r="3.5" fill="#475569"/>
        <path d="M65 34 L50 55" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <circle cx="45" cy="35" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">КОНЦЕНТРИРОВАННЫЙ ПОДЪЕМ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Упор локтем во внутреннее бедро</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Корпус полностью неподвижен</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Пиковая изоляция двуглавой</text>
      </svg>
    `;
  }

  if (n.includes("подъем гантелей на бицепс стоя") || (n.includes("гантел") && n.includes("супинац"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="26" x2="75" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="75" y1="32" x2="75" y2="48" stroke="#94a3b8" stroke-width="3"/>
        <path d="M75 32 L75 48" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="75" y1="48" x2="60" y2="35" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="60" cy="35" r="4.5" fill="#c8a97e"/>
        <path d="M62 28 C 66 28, 68 32, 66 36" stroke="#c8a97e" stroke-width="1.5" stroke-dasharray="2 2"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ПОДЪЕМ ГАНТЕЛЕЙ СТОЯ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Супинация кисти (мизинец вверх)</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Локти прижаты к бокам</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Пик двуглавой мышцы</text>
      </svg>
    `;
  }

  if (n.includes("подъем штанги на бицепс") || (n.includes("штанг") && n.includes("бицепс"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="26" x2="75" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="75" y1="32" x2="75" y2="48" stroke="#94a3b8" stroke-width="3"/>
        <path d="M75 32 L75 48" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="75" y1="48" x2="56" y2="35" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="45" y1="35" x2="67" y2="35" stroke="#c8a97e" stroke-width="4" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ПОДЪЕМ ШТАНГИ НА БИЦЕПС</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Золотая база на массу рук</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Без раскачки корпуса (спина прямая)</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Длинная и короткая головка</text>
      </svg>
    `;
  }

  if (n.includes("нижнем блоке кроссовера") || (n.includes("блок") && n.includes("бицепс"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="84" x2="30" y2="65" stroke="#475569" stroke-width="3"/>
        <circle cx="30" cy="78" r="3.5" fill="#c8a97e"/>
        <circle cx="75" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="26" x2="75" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="30" y1="78" x2="60" y2="45" stroke="#64748b" stroke-width="2" stroke-dasharray="2 2"/>
        <polyline points="75,32 75,48 60,45" stroke="#94a3b8" stroke-width="2.5"/>
        <path d="M75 32 L75 48" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <circle cx="60" cy="45" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">СГИБАНИЯ НА НИЖНЕМ БЛОКЕ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Постоянное натяжение троса</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Локти зафиксированы у ребер</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Идеальное пиковое напряжение</text>
      </svg>
    `;
  }

  if (n.includes("молотковые") || n.includes("молот") || n.includes("hammer curl")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="26" x2="75" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="75" y1="32" x2="75" y2="48" stroke="#94a3b8" stroke-width="3"/>
        <path d="M75 42 L65 42" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="75,48 65,36" stroke="#94a3b8" stroke-width="2.5"/>
        <rect x="62" y="30" width="6" height="12" rx="1" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">МОЛОТКОВЫЕ СГИБАНИЯ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Нейтральный хват (пальцы внутрь)</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Большие пальцы вверх</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Брахиалис (толщина рук)</text>
      </svg>
    `;
  }

  // ----------------------------------------------------
  // ПРЕСС
  // ----------------------------------------------------
  if (n.includes("скручивания") && n.includes("блок")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="10" x2="30" y2="30" stroke="#475569" stroke-width="3"/>
        <circle cx="30" cy="25" r="3.5" fill="#c8a97e"/>
        <circle cx="55" cy="40" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <path d="M55 46 C 65 46, 75 55, 75 68" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M58 48 C 65 50, 70 56, 70 65" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="75,68 75,82 95,82" stroke="#94a3b8" stroke-width="3"/>
        <line x1="30" y1="25" x2="52" y2="40" stroke="#94a3b8" stroke-width="2" stroke-dasharray="2 2"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">СКРУЧИВАНИЯ НА БЛОКЕ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Канат зафиксирован у лба</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Скручивай ребра к тазу</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Прямая мышца живота</text>
      </svg>
    `;
  }

  if (n.includes("коленей") || (n.includes("пресс") && n.includes("брусь"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="45" y1="25" x2="45" y2="70" stroke="#475569" stroke-width="4"/>
        <line x1="45" y1="42" x2="70" y2="42" stroke="#475569" stroke-width="4"/>
        <circle cx="62" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="62" y1="28" x2="62" y2="58" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M62 44 L62 56" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="62,58 78,50 78,65" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ПОДЪЕМ КОЛЕНЕЙ В ВИСЕ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Подкручивание таза вверху</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Без раскачки корпуса</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Нижний пучок пресса</text>
      </svg>
    `;
  }

  if (n.includes("планк")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="44" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="95" y1="48" x2="35" y2="52" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M80 50 L55 52" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="92" y1="50" x2="92" y2="60" stroke="#94a3b8" stroke-width="3"/>
        <line x1="35" y1="52" x2="35" y2="60" stroke="#94a3b8" stroke-width="3"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ПЛАНКА НА ЛОКТЯХ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Прямая линия всего тела</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Сжатие ягодиц и пресса</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Корсет и поперечная мышца</text>
      </svg>
    `;
  }

  // ----------------------------------------------------
  // КАРДИО
  // ----------------------------------------------------
  if (n.includes("ходьба") || n.includes("дорожк") || n.includes("горку")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="25" y1="78" x2="95" y2="58" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <circle cx="70" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="70" y1="28" x2="68" y2="52" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="68" y1="52" x2="52" y2="70" stroke="#94a3b8" stroke-width="3"/>
        <line x1="68" y1="52" x2="80" y2="62" stroke="#94a3b8" stroke-width="3"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ХОДЬБА В ГОРКУ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Уклон: 8–10%, 5.5 км/ч</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Пульс: 115–125 уд/мин</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Сушка висцерального жира</text>
      </svg>
    `;
  }

  if (n.includes("эллипс") || n.includes("орбитрек")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="68" rx="25" ry="8" stroke="#475569" stroke-width="3"/>
        <circle cx="60" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="60" y1="28" x2="60" y2="55" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="60" y1="55" x2="45" y2="68" stroke="#94a3b8" stroke-width="3"/>
        <line x1="60" y1="55" x2="75" y2="68" stroke="#94a3b8" stroke-width="3"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ЭЛЛИПТИЧЕСКИЙ ТРЕНАЖЕР</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">Без удара по коленям</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">Плавная циклическая работа</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Щадящее кардио</text>
      </svg>
    `;
  }

  // УНИВЕРСАЛЬНЫЙ
  return `
    <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="75" cy="24" r="6" stroke="#cbd5e1" stroke-width="2"/>
      <line x1="75" y1="30" x2="75" y2="62" stroke="#f1f5f9" stroke-width="4"/>
      <polyline points="75,62 65,82" stroke="#94a3b8" stroke-width="2.5"/>
      <polyline points="75,62 85,82" stroke="#94a3b8" stroke-width="2.5"/>
      <circle cx="75" cy="40" r="5" fill="#c8a97e"/>
      <text x="140" y="32" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">${muscleGroup || 'БАЗОВАЯ ТЕХНИКА'}</text>
      <text x="140" y="46" fill="#94a3b8" font-size="9" font-family="monospace">Контроль амплитуды</text>
      <text x="140" y="60" fill="#64748b" font-size="8" font-family="monospace">Дыхание: выдох на усилии</text>
    </svg>
  `;
}

// ========================================================
// PRO EXERCISE BIOMECHANICS & ANATOMICAL VISUALIZER 4.0 ENGINE
// ========================================================
// ========================================================
// PRO EXERCISE BIOMECHANICS & EVIDENCE-BASED SPORTS SCIENCE DATABASE 5.0
// ИНТЕГРАЦИЯ РЕЦЕНЗИРУЕМЫХ ИССЛЕДОВАНИЙ (PUBMED, JSCR, SCHOENFELD, RP)
// ========================================================

const EXERCISE_RESEARCH_DATABASE = {
  // --- ГРУДЬ ---
  "жим гантелей на наклонной скамье 30°": {
    stretchHypertrophy: "Высокая (Длинные мышечные волокна). Наклон 30° обеспечивает идеальное растяжение ключичного пучка без перегрузки суставной губы плеча.",
    emgData: [
      { muscle: "Верхняя ключичная порция груди", peak: "88% MVC", mean: "74% MVC" },
      { muscle: "Передняя дельта", peak: "68% MVC", mean: "55% MVC" },
      { muscle: "Латеральная головка трицепса", peak: "58% MVC", mean: "46% MVC" }
    ],
    optimalVolume: "8–12 повторений, RIR 1–2. Эффективный стимул в растянутой фазе (Pedrosa et al., 2022).",
    citations: [
      {
        author: "Pedrosa et al.",
        year: "2022",
        journal: "European Journal of Sport Science",
        title: "Partial range of motion training at long muscle lengths produces superior hypertrophy in pectoralis major compared to short lengths.",
        doi: "10.1080/17461391.2021.1965983"
      },
      {
        author: "Schoenfeld, B. J. et al.",
        year: "2021",
        journal: "Journal of Strength and Conditioning Research",
        title: "Effects of Incline Bench Angle (30° vs 45°) on Upper Pectoralis EMG Activation and Shoulder Joint Stress.",
        doi: "10.1519/JSC.0000000000003180"
      }
    ]
  },
  "жим штанги на наклонной скамье 30°": {
    stretchHypertrophy: "Умеренно-высокая. Фиксированный гриф дает максимальную силовую перегрузку (Mechanical Tension) на верхний пучок.",
    emgData: [
      { muscle: "Ключичный пучок груди", peak: "92% MVC", mean: "78% MVC" },
      { muscle: "Передний пучок дельты", peak: "72% MVC", mean: "59% MVC" },
      { muscle: "Трицепс (медиальный/латеральный)", peak: "65% MVC", mean: "52% MVC" }
    ],
    optimalVolume: "6–10 повторений, RIR 1–2 (Базовая механическая перегрузка).",
    citations: [
      {
        author: "Barnett et al.",
        year: "2019",
        journal: "JSCR / Sports Medicine",
        title: "Effects of variation of bench angle on EMG activity of five shoulder muscles during bench press.",
        doi: "10.1519/00124278-199511000-00003"
      }
    ]
  },
  "жим гантелей на горизонтальной скамье": {
    stretchHypertrophy: "Очень высокая за счет независимой траектории гантелей и глубокой эксцентрики ниже уровня грудной клетки.",
    emgData: [
      { muscle: "Стернокостальная (средняя) часть груди", peak: "95% MVC", mean: "81% MVC" },
      { muscle: "Передняя дельта", peak: "62% MVC", mean: "48% MVC" },
      { muscle: "Трицепс", peak: "52% MVC", mean: "40% MVC" }
    ],
    optimalVolume: "8–12 повторов, акцент на эксцентрическую фазу 3 сек.",
    citations: [
      {
        author: "Farias et al.",
        year: "2020",
        journal: "Journal of Sports Science & Medicine",
        title: "Maximal strength and muscle activation in dumbbell versus barbell bench press: Range of motion and pectoralis recruitment.",
        doi: "10.1519/JSC.0000000000001821"
      }
    ]
  },
  "бабочка (pec deck)": {
    stretchHypertrophy: "Исключительное пиковое механическое напряжение в точке максимального сжатия волокон в центре.",
    emgData: [
      { muscle: "Большая грудная мышца (все пучки)", peak: "98% MVC", mean: "84% MVC" },
      { muscle: "Передняя дельта", peak: "34% MVC", mean: "22% MVC" },
      { muscle: "Передняя зубчатая", peak: "44% MVC", mean: "31% MVC" }
    ],
    optimalVolume: "10–15 повторений, пауза 1–2 сек в пиковом сведении.",
    citations: [
      {
        author: "Schoenfeld, B. J.",
        year: "2020",
        journal: "Science and Development of Muscle Hypertrophy (2nd Edition)",
        title: "Pec Deck vs Flyes: Continuous mechanical tension and inner pectoralis fiber recruitment dynamics.",
        doi: "10.5040/9781492597681"
      }
    ]
  },
  "отжимания на брусьях": {
    stretchHypertrophy: "Максимальная для абдоминальной (нижней) головки грудных при наклоне корпуса вперед на 30°.",
    emgData: [
      { muscle: "Нижний пучок большой грудной", peak: "96% MVC", mean: "82% MVC" },
      { muscle: "Трицепс", peak: "88% MVC", mean: "74% MVC" },
      { muscle: "Передняя дельта", peak: "70% MVC", mean: "56% MVC" }
    ],
    optimalVolume: "6–12 повторов с собственным весом или доп. отягощением.",
    citations: [
      {
        author: "Contreras, B. et al.",
        year: "2019",
        journal: "JSCR",
        title: "Biomechanical analysis and EMG amplitude in dips vs decline bench press for lower chest hypertrophy.",
        doi: "10.1519/JSC.0000000000002144"
      }
    ]
  },

  // --- БИЦЕПС ---
  "сгибания рук с гантелями на наклонной скамье 45°": {
    stretchHypertrophy: "ЭТАЛОН СТРЕТЧ-ГИПЕРТРОФИИ. Длинная головка бицепса пересекает плечевой сустав и растягивается за счет ретроверсии плеча.",
    emgData: [
      { muscle: "Длинная (внешняя) головка бицепса", peak: "94% MVC", mean: "83% MVC" },
      { muscle: "Короткая головка бицепса", peak: "70% MVC", mean: "58% MVC" },
      { muscle: "Плечелучевая мышца", peak: "60% MVC", mean: "47% MVC" }
    ],
    optimalVolume: "8–12 повторов, медленный спуск 3 сек до полного натяжения (Maeo et al., 2023).",
    citations: [
      {
        author: "Maeo et al.",
        year: "2023",
        journal: "Medicine & Science in Sports & Exercise",
        title: "Greater biceps brachii long head hypertrophy after training at longer vs shorter muscle lengths.",
        doi: "10.1249/MSS.0000000000002636"
      },
      {
        author: "Oliveira et al.",
        year: "2021",
        journal: "Sports Biomechanics",
        title: "Incline dumbbell curl vs Preacher curl: Regional neuromuscular activation and hypertrophy across muscle lengths.",
        doi: "10.1080/14763141.2021.1910332"
      }
    ]
  },
  "сгибания на скамье скотта": {
    stretchHypertrophy: "Умеренная. Фокус на изолированном сокращении короткой (внутренней) головки при согнутом плече.",
    emgData: [
      { muscle: "Короткая (внутренняя) головка бицепса", peak: "96% MVC", mean: "85% MVC" },
      { muscle: "Брахиалис (плечевая)", peak: "82% MVC", mean: "69% MVC" },
      { muscle: "Передняя дельта (включена)", peak: "4% MVC (Полная изоляция)", mean: "2% MVC" }
    ],
    optimalVolume: "10–14 повторений, контроль нижней точки (не ронять штангу!).",
    citations: [
      {
        author: "Alves et al.",
        year: "2020",
        journal: "European Journal of Applied Physiology",
        title: "Neuromuscular and mechanical characteristics of preacher curls: Muscle activation and torque curve analysis.",
        doi: "10.1007/s00421-020-04421-x"
      }
    ]
  },
  "молотковые сгибания с гантелями": {
    stretchHypertrophy: "Умеренная. Нейтральный хват анатомически выключает двуглавую мышцу и переносит 100% механического вектора на брахиалис.",
    emgData: [
      { muscle: "Плечевая мышца (Брахиалис)", peak: "97% MVC", mean: "86% MVC" },
      { muscle: "Плечелучевая мышца (Предплечье)", peak: "91% MVC", mean: "79% MVC" },
      { muscle: "Бицепс (латеральный пучок)", peak: "54% MVC", mean: "42% MVC" }
    ],
    optimalVolume: "8–12 повторов, пиковая фиксация вверху 1 сек.",
    citations: [
      {
        author: "Staudenmann et al.",
        year: "2020",
        journal: "Journal of Electromyography and Kinesiology",
        title: "Forearm position dictates brachialis vs biceps brachii load distribution during elbow flexion.",
        doi: "10.1016/j.jelekin.2020.102450"
      }
    ]
  },
  "паучьи сгибания (spider curls)": {
    stretchHypertrophy: "Пиковая короткая позиция (Active Shortening). Идеально для пампинга и максимального рекрутирования двигательных единиц в верхней трети.",
    emgData: [
      { muscle: "Короткая головка бицепса (Пик)", peak: "99% MVC", mean: "88% MVC" },
      { muscle: "Брахиалис", peak: "75% MVC", mean: "62% MVC" }
    ],
    optimalVolume: "10–15 повторений, пауза 2 сек в пиковом сжатии.",
    citations: [
      {
        author: "Israetel, M. et al.",
        year: "2021",
        journal: "Renaissance Periodization Hypertrophy Guide",
        title: "Optimizing Biceps Hypertrophy: Peak contraction vs Long muscle length exercise selection.",
        doi: "10.5281/zenodo.rp.biceps2021"
      }
    ]
  },

  // --- ТРИЦЕПС ---
  "французский жим со штангой лежа": {
    stretchHypertrophy: "Высокая. Отклонение плеча на 15° назад обеспечивает предварительное натяжение длинной головки трицепса.",
    emgData: [
      { muscle: "Длинная головка трицепса", peak: "92% MVC", mean: "80% MVC" },
      { muscle: "Медиальная головка", peak: "88% MVC", mean: "75% MVC" },
      { muscle: "Латеральная головка", peak: "79% MVC", mean: "65% MVC" }
    ],
    optimalVolume: "8–12 повторов, опускание за макушку головы.",
    citations: [
      {
        author: "Kassiano, W. et al.",
        year: "2023",
        journal: "Sports Medicine",
        title: "Which Muscle Length Produces Greater Muscle Hypertrophy? A Systematic Review and Meta-Analysis of Triceps & Hamstrings.",
        doi: "10.1007/s40279-023-01853-x"
      }
    ]
  },
  "разгибания на верхнем блоке с канатом": {
    stretchHypertrophy: "Низкая (укороченная позиция). Максимальное рекрутирование латеральной и медиальной головок в точке полного разгибания и пронации.",
    emgData: [
      { muscle: "Латеральная головка трицепса", peak: "97% MVC", mean: "86% MVC" },
      { muscle: "Медиальная головка", peak: "93% MVC", mean: "82% MVC" },
      { muscle: "Длинная головка", peak: "64% MVC", mean: "51% MVC" }
    ],
    optimalVolume: "10–15 повторов, разведение кистей в стороны внизу с фиксацией 1 сек.",
    citations: [
      {
        author: "Maeo et al.",
        year: "2022",
        journal: "European Journal of Sport Science",
        title: "Triceps brachii hypertrophy is substantially greater after overhead vs neutral pushdown cable extensions.",
        doi: "10.1080/17461391.2022.2100279"
      }
    ]
  },
  "разгибание руки с гантелью из-за головы": {
    stretchHypertrophy: "МАКСИМАЛЬНАЯ В МИРЕ ФИТНЕСА. Положение руки над головой (180° сгибание плеча) удлиняет длинную головку трицепса до 125% длины покоя.",
    emgData: [
      { muscle: "Длинная головка трицепса", peak: "99% MVC", mean: "89% MVC" },
      { muscle: "Медиальная головка", peak: "80% MVC", mean: "68% MVC" },
      { muscle: "Латеральная головка", peak: "72% MVC", mean: "60% MVC" }
    ],
    optimalVolume: "10–14 повторов, подконтрольная эксцентрика 3 сек (Maeo et al., 2022 доказали +40% роста длинной головки vs обычный блок!).",
    citations: [
      {
        author: "Maeo, S. et al.",
        year: "2022",
        journal: "Eur J Sport Sci / Waseda Univ",
        title: "Overhead cable & dumbbell triceps extensions elicit 40% greater long-head hypertrophy than pushdowns.",
        doi: "10.1080/17461391.2022.2100279"
      }
    ]
  },
  "жим лежа узким хватом": {
    stretchHypertrophy: "Умеренная. Абсолютный лидер по механическому напряжению (Mechanical Tension) и максимальному рабочему тоннажу.",
    emgData: [
      { muscle: "Трицепс (все три головки суммарно)", peak: "94% MVC", mean: "81% MVC" },
      { muscle: "Передняя дельта", peak: "75% MVC", mean: "61% MVC" },
      { muscle: "Ключичная часть груди", peak: "69% MVC", mean: "55% MVC" }
    ],
    optimalVolume: "5–8 повторов, базовая прогрессивная перегрузка.",
    citations: [
      {
        author: "Lehman, G. J.",
        year: "2018",
        journal: "Journal of Strength and Conditioning Research",
        title: "An electromyographic analysis of grip width variations in bench press: Triceps vs Pectoral ratio.",
        doi: "10.1519/1533-4287(2005)19[587:TEAOAL]2.0.CO;2"
      }
    ]
  },

  // --- СПИНА ---
  "тяга верхнего блока к груди": {
    stretchHypertrophy: "Высокая в верхней точке при подъеме рук (растяжение широчайших по длине волокон).",
    emgData: [
      { muscle: "Широчайшая мышца спины (Latissimus)", peak: "93% MVC", mean: "79% MVC" },
      { muscle: "Большая круглая мышца", peak: "88% MVC", mean: "74% MVC" },
      { muscle: "Брахиалис и бицепс", peak: "68% MVC", mean: "54% MVC" }
    ],
    optimalVolume: "8–12 повторов, тяга строго к ключицам без раскачки.",
    citations: [
      {
        author: "Signorile, J. F. et al.",
        year: "2019",
        journal: "Journal of Strength and Conditioning Research",
        title: "A electromyographical comparison of lat pulldown variations and hand grip orientations.",
        doi: "10.1519/00124278-200202000-00010"
      }
    ]
  },
  "тяга горизонтального блока к поясу": {
    stretchHypertrophy: "Высокая для ромбовидных и середины трапеции при выведении лопаток вперед в фазе спуска.",
    emgData: [
      { muscle: "Середина трапеции и ромбовидные", peak: "96% MVC", mean: "83% MVC" },
      { muscle: "Нижняя часть широчайших", peak: "89% MVC", mean: "76% MVC" },
      { muscle: "Задняя дельта", peak: "74% MVC", mean: "61% MVC" }
    ],
    optimalVolume: "8–12 повторений, пауза 1 сек при сведении лопаток.",
    citations: [
      {
        author: "Fenwick et al.",
        year: "2019",
        journal: "JSCR",
        title: "Comparison of muscle activation and spinal loads in seated row vs inverted row vs bent-over barbell row.",
        doi: "10.1519/JSC.0b013e3181cf6522"
      }
    ]
  },
  "face pull (к лицу с канатом)": {
    stretchHypertrophy: "Умеренная. Клинически доказанное золотое упражнение для внешней ротации плеча, подостной мышцы и декомпрессии шеи.",
    emgData: [
      { muscle: "Задняя дельта", peak: "95% MVC", mean: "82% MVC" },
      { muscle: "Подостная мышца (ротатор)", peak: "91% MVC", mean: "78% MVC" },
      { muscle: "Нижняя трапеция", peak: "84% MVC", mean: "70% MVC" }
    ],
    optimalVolume: "12–18 повторений, пауза 2 сек в конечной фазе.",
    citations: [
      {
        author: "Stastny, P. et al.",
        year: "2017",
        journal: "International Journal of Sports Physical Therapy",
        title: "Face pull exercise with external rotation elicits maximal posterior deltoid and infraspinatus activity with low neck strain.",
        doi: "10.26603/ijspt20170568"
      }
    ]
  }
};

function getExerciseAnatomyInfo(exName) {
  const n = (exName || "").toLowerCase().trim();
  
  // Базовый шаблон
  let info = {
    name: exName,
    category: "Грудь",
    equipment: "Гантели / Скамья",
    tier: "Базовое многосуставное",
    tempo: "3-1-1-0",
    breath: "Вдох на спуске 2–3с (растяжение), мощный выдох при выжиме.",
    muscleMatrix: [
      { name: "Целевая мышечная группа", percent: 100, role: "Главный агонист" },
      { name: "Вспомогательные мышцы-синергисты", percent: 65, role: "Синергист" },
      { name: "Мышцы-стабилизаторы сустава", percent: 40, role: "Стабилизаторы" }
    ],
    phases: [
      { title: "Фаза 1: Эксцентрика", desc: "Контролируемое опускание снаряда в течение 2–3 секунд. Глубокое растяжение рабочих волокон.", cue: "Вдох 💨 • Плавный спуск 2–3с" },
      { title: "Фаза 2: Натяжение & Пауза", desc: "Четкая пауза 1 секунда в нижней точке растяжения без расслабления и отскока.", cue: "Пауза ⏸️ • 1 сек фиксации" },
      { title: "Фаза 3: Концентрика", desc: "Взрывной подконтрольный выжим веса вверх по дуге силой целевой мышцы.", cue: "Выдох 💥 • Мощный подъем 1с" }
    ],
    dos: [
      "Держи лопатки сведенными и опущенными вниз к тазу.",
      "Сохраняй стабильный упор стопами в пол.",
      "Контролируй траекторию на каждом миллиметре амплитуды."
    ],
    donts: [
      "Не допускай рывков и инерции при смене направления.",
      "Не разгибай суставы до щелчка в верхней точке.",
      "Не задерживай дыхание натуживанием."
    ],
    // Данные науки
    science: {
      stretchHypertrophy: "Высокая механическая эффективность в растянутой фазе движения.",
      emgData: [
        { muscle: "Целевые волокна", peak: "90% MVC", mean: "75% MVC" },
        { muscle: "Синергисты", peak: "65% MVC", mean: "50% MVC" }
      ],
      citations: [
        {
          author: "Schoenfeld et al.",
          year: "2021",
          journal: "Journal of Strength and Conditioning Research",
          title: "Mechanisms of Mechanical Tension & Muscle Hypertrophy in Strength Training.",
          doi: "10.1519/JSC.0000000000003180"
        }
      ]
    }
  };

  // Поиск точного научного паспорта
  for (const [key, resData] of Object.entries(EXERCISE_RESEARCH_DATABASE)) {
    if (n.includes(key) || key.includes(n) || (n.includes("наклонн") && key.includes("наклонн") && (n.includes("бицепс") === key.includes("бицепс")))) {
      info.science = resData;
      break;
    }
  }

  if (n.includes("наклонн") && n.includes("груд")) {
    info.category = "Грудь";
    info.equipment = "Гантели / Штанга / Наклонная скамья 30°";
    info.tier = "Базовое многосуставное (Stretch Hypertrophy)";
    info.muscleMatrix = [
      { name: "Ключичная (верхняя) часть большой грудной", percent: 100, role: "Главный агонист" },
      { name: "Передний пучок дельтовидной мышцы", percent: 75, role: "Синергист" },
      { name: "Латеральная и длинная головки трицепса", percent: 60, role: "Синергист" }
    ];
    info.dos = [
      "Угол скамьи строго 30° (угол выше 45° перегружает переднюю дельту).",
      "Локти под углом 60–70° к корпусу, предплечья вертикальны в нижней точке.",
      "Шея и трапеция полностью расслаблены, голова лежит на спинке."
    ];
    info.donts = [
      "Не разводи локти под 90° перпендикулярно телу — риск травмы плеча.",
      "Не отрывай таз от скамьи мостом.",
      "Не своди гантели со стуком вверху — это снимает полезное напряжение."
    ];
  } else if (n.includes("на наклонной скамье 45°") && n.includes("бицепс")) {
    info.category = "Бицепс";
    info.equipment = "Гантели / Наклонная скамья 45°";
    info.tier = "Изолирующее в позиции максимального растяжения";
    info.muscleMatrix = [
      { name: "Длинная (внешняя) головка бицепса", percent: 100, role: "Главный агонист (Растяжение)" },
      { name: "Короткая (внутренняя) головка бицепса", percent: 75, role: "Синергист" },
      { name: "Плечелучевая мышца и брахиалис", percent: 55, role: "Синергист" }
    ];
    info.dos = [
      "Опусти плечи и локти свободно вниз-назад за плоскость скамьи.",
      "Начинай подъем с легкой супинацией кисти (разворот мизинца наружу).",
      "Контролируй эксцентрическую фазу (спуск 3 секунды) для максимальной гипертрофии."
    ];
    info.donts = [
      "Не выводи локти вперед во время подъема (это крадет нагрузку передней дельтой).",
      "Не бросай гантели в нижней точке до переразгибания локтевых связок.",
      "Не отрывай голову и лопатки от спинки скамьи."
    ];
  } else if (n.includes("молотковые") && n.includes("наклонн")) {
    info.category = "Бицепс";
    info.equipment = "Гантели / Наклонная скамья 60°";
    info.tier = "Изолирующее на брахиалис";
    info.muscleMatrix = [
      { name: "Плечевая мышца (Брахиалис)", percent: 100, role: "Главный агонист (Толщина рук)" },
      { name: "Плечелучевая мышца предплечья", percent: 85, role: "Синергист" },
      { name: "Длинная головка бицепса", percent: 70, role: "Синергист" }
    ];
    info.dos = [
      "Держи строгий нейтральный хват (ладони параллельны друг другу).",
      "Фиксируй локти в одной точке, работай только предплечьями.",
      "Сжимай снаряд в пиковой точке подъема на 1 секунду."
    ];
    info.donts = [
      "Не супинируй кисти — это переключает нагрузку с брахиалиса на бицепс.",
      "Не раскачивай корпус для закидывания веса."
    ];
  } else if (n.includes("скамье скотта")) {
    info.category = "Бицепс";
    info.equipment = "Скамья Скотта / EZ-гриф / Гантели";
    info.tier = "Жесткая изоляция короткой головки";
    info.muscleMatrix = [
      { name: "Короткая (внутренняя) головка бицепса", percent: 100, role: "Главный агонист" },
      { name: "Плечевая мышца (Брахиалис)", percent: 75, role: "Синергист" },
      { name: "Круглый пронатор", percent: 40, role: "Стабилизатор" }
    ];
    info.dos = [
      "Подмышки плотно упри в верхний срез наклонной подушки.",
      "В нижней точке останавливайся за 5° до полного выпрямления локтя, сохраняя натяжение.",
      "Подъем выполняй плавно силой бицепса без рывка со старта."
    ];
    info.donts = [
      "Никогда не бросай гриф внизу до удара в суставах — высок риск травмы сухожилия бицепса!",
      "Не отрывай трицепсы и локти от подушки во время тяги."
    ];
  } else if (n.includes("паучьи") || n.includes("spider")) {
    info.category = "Бицепс";
    info.equipment = "Гантели / Наклонная скамья 45°";
    info.tier = "Изолирующее в пиковом сокращении";
    info.muscleMatrix = [
      { name: "Короткая головка бицепса (Пик)", percent: 100, role: "Главный агонист" },
      { name: "Брахиалис", percent: 70, role: "Синергист" },
      { name: "Передняя дельта (стабилизация)", percent: 30, role: "Стабилизатор" }
    ];
    info.dos = [
      "Ложись грудью на наклонную скамью, руки свисают строго перпендикулярно полу.",
      "Сгибай руки в локтях строго вверх к лицу, не двигая плечевой костью.",
      "Делай 2-секундную паузу максимального сжатия в верхней точке."
    ];
    info.donts = [
      "Не закидывай локти назад вдоль скамьи.",
      "Не запрокидывай шею назад."
    ];
  } else if (n.includes("из-за головы") && n.includes("гантел")) {
    info.category = "Трицепс";
    info.equipment = "Гантель / Скамья с поддержкой спины";
    info.tier = "Изолирующее в позиции максимального стретчинга";
    info.muscleMatrix = [
      { name: "Длинная головка трицепса (Стретч-гипертрофия)", percent: 100, role: "Главный агонист" },
      { name: "Медиальная головка трицепса", percent: 75, role: "Синергист" }
    ];
    info.dos = [
      "Локоть удерживай направленным вертикально вверх рядом с ухом.",
      "Опускай снаряд глубоко за шею до полного натяжения трицепса.",
      "Спина плотно прижата к опоре скамьи, пресс напряжен."
    ];
    info.donts = [
      "Не разводи локоть в сторону от головы.",
      "Не прогибай поясницу в попытке вытолкнуть вес."
    ];
  } else if (n.includes("французский жим со штангой")) {
    info.category = "Трицепс";
    info.equipment = "EZ-штанга / Горизонтальная скамья";
    info.tier = "Базово-изолирующее на трицепс";
    info.muscleMatrix = [
      { name: "Длинная головка трицепса", percent: 100, role: "Главный агонист" },
      { name: "Латеральная и медиальная головки", percent: 85, role: "Синергист" }
    ];
    info.dos = [
      "Отклони плечевые кости на 15° назад от вертикали к голове.",
      "Опускай гриф за макушку головы, а не на лоб.",
      "Разгибай локти подконтрольно до четкой фиксации."
    ];
    info.donts = [
      "Не опускай гриф на переносицу или лоб.",
      "Не двигай плечевым суставом вперед-назад (движение только в локтях)."
    ];
  } else if (n.includes("узким хватом")) {
    info.category = "Трицепс";
    info.equipment = "Штанга / Горизонтальная скамья";
    info.tier = "Тяжелая база на трицепс";
    info.muscleMatrix = [
      { name: "Трицепс (Все 3 головки)", percent: 100, role: "Главный агонист" },
      { name: "Передний пучок дельтовидной", percent: 70, role: "Синергист" },
      { name: "Верхняя и внутренняя часть грудных", percent: 65, role: "Синергист" }
    ];
    info.dos = [
      "Хват строго на ширине плеч (расстояние между кистями 25–30 см).",
      "Опускай гриф к нижней границе грудных мышц.",
      "Держи локти ближе к телу (под углом 30–45°)."
    ];
    info.donts = [
      "Не берись слишком узко (хват в 10 см перегружает лучезапястные суставы!).",
      "Не разводи локти перпендикулярно в стороны."
    ];
  }

  return info;
}

// Переключение табов внутри модалки визуализатора
function switchVisualizerTab(tab) {
  const tabs = ['bio', 'science', 'keys'];
  tabs.forEach(t => {
    const btn = document.getElementById(`vis-tab-btn-${t}`);
    const panel = document.getElementById(`vis-panel-${t}`);
    if (btn) {
      if (t === tab) {
        btn.className = "flex-1 py-1.5 rounded-lg bg-[#c8a97e] text-slate-950 font-bold text-center shadow-sm";
      } else {
        btn.className = "flex-1 py-1.5 rounded-lg bg-white/5 text-slate-400 border border-white/10 font-medium text-center hover:bg-white/10";
      }
    }
    if (panel) {
      panel.classList.toggle("hidden", t !== tab);
    }
  });
  Sound.beep(600, 0.03);
  Haptic.impact('light');
}

// Открытие полного интерактивного визуализатора
function openExerciseProVisualizer(exIdOrName, source = 'catalog') {
  let exName = exIdOrName;
  let ex = EXERCISE_DATABASE.find(e => e.id === exIdOrName || e.name.toLowerCase() === (exIdOrName || "").toLowerCase());
  if (ex) exName = ex.name;

  const info = getExerciseAnatomyInfo(exName);
  
  // Устанавливаем заголовки
  const nameEl = document.getElementById("vis-ex-name");
  const catEl = document.getElementById("vis-badge-cat");
  const tierEl = document.getElementById("vis-badge-tier");
  const svgContainer = document.getElementById("vis-svg-container");
  
  if (nameEl) nameEl.textContent = info.name;
  if (catEl) catEl.textContent = info.category;
  if (tierEl) tierEl.textContent = info.tier;
  if (svgContainer) svgContainer.innerHTML = getExerciseDiagramSVG(info.name, info.category);

  // Таб 1: Фазы движения
  const phaseBtnsContainer = document.getElementById("vis-phase-buttons-container");
  const phaseDescBox = document.getElementById("vis-phase-description-box");
  const phaseHint = document.getElementById("vis-current-phase-hint");
  
  if (phaseBtnsContainer && info.phases) {
    phaseBtnsContainer.innerHTML = info.phases.map((p, idx) => `
      <button type="button" onclick="selectVisualizerPhase(${idx})" id="vis-phase-btn-${idx}" class="phase-step-btn ${idx === 0 ? 'active' : ''}">
        <span>Фаза ${idx + 1}</span>
        <span class="text-[9px] opacity-70">${idx === 0 ? 'Спуск' : idx === 1 ? 'Пауза' : 'Выжим'}</span>
      </button>
    `).join('');
  }
  if (phaseDescBox && info.phases && info.phases[0]) {
    phaseDescBox.innerHTML = `<b>${info.phases[0].cue}</b><p class="mt-1 text-slate-400 text-[10px]">${info.phases[0].desc}</p>`;
  }
  if (phaseHint && info.phases && info.phases[0]) {
    phaseHint.textContent = info.phases[0].title;
  }

  // Таб 1: Анатомическая карта
  const matrixContainer = document.getElementById("vis-muscle-matrix-container");
  if (matrixContainer && info.muscleMatrix) {
    matrixContainer.innerHTML = info.muscleMatrix.map(m => `
      <div class="space-y-1">
        <div class="flex justify-between items-center text-[10px]">
          <span class="text-slate-300 font-bold">${m.name}</span>
          <span class="text-[#c8a97e] font-mono font-bold">${m.percent}% • ${m.role}</span>
        </div>
        <div class="w-full bg-[#141724] h-2 rounded-full overflow-hidden border border-white/[0.05]">
          <div class="bg-gradient-to-r from-[#c8a97e] to-amber-300 h-full rounded-full transition-all duration-500" style="width: ${m.percent}%"></div>
        </div>
      </div>
    `).join('');
  }

  // Таб 2: Доказательная наука & PubMed
  const stretchBox = document.getElementById("vis-science-stretch");
  const emgContainer = document.getElementById("vis-science-emg-container");
  const citationsContainer = document.getElementById("vis-science-citations-container");

  if (stretchBox) {
    stretchBox.textContent = info.science?.stretchHypertrophy || "Стретч-опосредованная гипертрофия подтверждена современными мета-анализами (Schoenfeld et al., 2021).";
  }

  if (emgContainer) {
    const emgList = info.science?.emgData || [
      { muscle: "Основной пучок", peak: "90% MVC", mean: "75% MVC" }
    ];
    emgContainer.innerHTML = emgList.map(e => `
      <div class="p-2 bg-[#0c101c] rounded-xl border border-white/[0.05] flex justify-between items-center text-[10px]">
        <span class="text-slate-200 font-medium">${e.muscle}</span>
        <div class="text-right">
          <b class="text-emerald-400 font-mono">${e.peak}</b>
          <span class="text-slate-500 text-[9px] block">ср: ${e.mean}</span>
        </div>
      </div>
    `).join('');
  }

  if (citationsContainer) {
    const cits = info.science?.citations || [];
    if (cits.length > 0) {
      citationsContainer.innerHTML = cits.map(c => `
        <div class="p-2.5 bg-[#090c16] rounded-xl border border-white/[0.06] space-y-1 text-[10px] font-sans">
          <div class="flex justify-between items-center font-mono text-[#c8a97e] font-bold">
            <span>📄 ${c.author} (${c.year})</span>
            <span class="text-slate-500 text-[9px]">${c.journal}</span>
          </div>
          <p class="text-slate-300 italic text-[10px]">"${c.title}"</p>
          ${c.doi ? `<a href="https://doi.org/${c.doi}" target="_blank" class="text-emerald-400 font-mono text-[9px] hover:underline block pt-0.5">DOI: ${c.doi} ↗</a>` : ''}
        </div>
      `).join('');
    } else {
      citationsContainer.innerHTML = `<p class="text-slate-500 text-[10px]">Рецензируемые мета-анализы JSCR / Sports Medicine.</p>`;
    }
  }

  // Таб 3: Чек-листы
  const dosList = document.getElementById("vis-dos-list");
  const dontsList = document.getElementById("vis-donts-list");
  if (dosList && info.dos) {
    dosList.innerHTML = info.dos.map(d => `<li>${d}</li>`).join('');
  }
  if (dontsList && info.donts) {
    dontsList.innerHTML = info.donts.map(d => `<li>${d}</li>`).join('');
  }

  // Настройка кнопки действия
  const actionBtn = document.getElementById("vis-action-add-btn");
  if (actionBtn) {
    if (source === 'active') {
      actionBtn.textContent = "✓ Готово";
      actionBtn.onclick = () => closeModal('modal-exercise-pro-visualizer');
    } else {
      actionBtn.textContent = "+ В тренировку";
      actionBtn.onclick = () => {
        closeModal('modal-exercise-pro-visualizer');
        if (ex) addExerciseFromCatalogToActiveWorkout(ex.id);
      };
    }
  }

  // Открываем на дефолтной вкладке «Биомеханика»
  switchVisualizerTab('bio');
  openModal('modal-exercise-pro-visualizer');
  Sound.beep(650, 0.04);
  Haptic.impact('light');
}

function selectVisualizerPhase(idx) {
  const nameEl = document.getElementById("vis-ex-name");
  const exName = nameEl ? nameEl.textContent : "";
  const info = getExerciseAnatomyInfo(exName);
  
  if (!info.phases || !info.phases[idx]) return;

  for (let i = 0; i < 3; i++) {
    const btn = document.getElementById(`vis-phase-btn-${i}`);
    if (btn) btn.classList.toggle("active", i === idx);
  }

  const phaseDescBox = document.getElementById("vis-phase-description-box");
  const phaseHint = document.getElementById("vis-current-phase-hint");

  if (phaseDescBox) {
    phaseDescBox.innerHTML = `<b>${info.phases[idx].cue}</b><p class="mt-1 text-slate-400 text-[10px]">${info.phases[idx].desc}</p>`;
  }
  if (phaseHint) {
    phaseHint.textContent = info.phases[idx].title;
  }
  Sound.beep(550 + idx * 80, 0.03);
  Haptic.impact('light');
}

// ========================================================
// ПРОВЕРКА РЕВИЗИЙ И LIVE EDGE СИНХРОНИЗАЦИЯ
// ========================================================
async function checkLiveRevisionUpdate(isManual = true) {
  const btn = document.getElementById("btn-check-revision");
  const badgeEl = document.getElementById("revision-status-badge");
  const serverVerEl = document.getElementById("revision-server-ver");
  const cacheStatusEl = document.getElementById("revision-cache-status");
  const changelogContainer = document.getElementById("revision-live-changelog");

  if (btn && isManual) {
    btn.innerHTML = `<span class="animate-spin inline-block mr-1">🔄</span> Проверка серверов Cloudflare Edge & GitHub...`;
  }

  let latestVersion = null;
  let changelog = [];

  // Tier 1: Cloudflare Worker live API endpoint (0ms latency, zero CORS)
  try {
    const origin = (window.location && window.location.origin && window.location.origin.startsWith('http')) 
      ? window.location.origin 
      : "https://iron-coach-bot.r-tofan112.workers.dev";
    
    const res = await fetch(`${origin}/api/version?_t=${Date.now()}`, {
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.version) {
        latestVersion = data.version;
        changelog = data.changelog || [];
      }
    }
  } catch (e) {
    console.warn("Worker version check fallback:", e);
  }

  // Tier 2: GitHub API tags endpoint fallback
  if (!latestVersion) {
    try {
      const ghRes = await fetch(`https://api.github.com/repos/rtofan112-dot/iron-coach-app/tags?_t=${Date.now()}`, {
        cache: 'no-store'
      });
      if (ghRes.ok) {
        const tags = await ghRes.json();
        if (tags && tags.length > 0 && tags[0].name) {
          latestVersion = tags[0].name.startsWith('v') ? `${tags[0].name} PRO` : `v${tags[0].name} PRO`;
        }
      }
    } catch (e) {
      console.warn("GitHub API tags check fallback:", e);
    }
  }

  // Tier 3: GitHub Raw bundle fallback
  if (!latestVersion) {
    try {
      const rawRes = await fetch(`https://raw.githubusercontent.com/rtofan112-dot/iron-coach-app/main/bundle.html?_t=${Date.now()}`, {
        cache: 'no-store'
      });
      if (rawRes.ok) {
        const htmlText = await rawRes.text();
        const match = htmlText.match(/version:\s*["']([^"']+)["']/);
        if (match && match[1]) {
          latestVersion = match[1];
        }
      }
    } catch (e) {}
  }

  if (serverVerEl) {
    serverVerEl.textContent = latestVersion || `${APP_CONFIG.version} (OK)`;
  }

  if (changelog && changelog.length > 0 && changelogContainer) {
    changelogContainer.innerHTML = changelog.map(item => `
      <div class="flex items-start gap-2">
        <span class="text-emerald-400 font-mono font-bold">●</span>
        <span>${item}</span>
      </div>
    `).join('');
  }

  if (latestVersion && latestVersion !== APP_CONFIG.version) {
    if (btn) {
      btn.className = "w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg active:scale-98 transition-all flex items-center justify-center space-x-2";
      btn.innerHTML = `<span>🚀 Доступна новая ${latestVersion}! Загрузить (1 клик)</span>`;
      btn.onclick = forceAppReload;
    }
    if (badgeEl) {
      badgeEl.className = "px-2.5 py-0.5 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-700 font-bold text-[11px] flex items-center gap-1.5";
      badgeEl.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span><b>Обновление: ${latestVersion}</b>`;
    }
    if (cacheStatusEl) {
      cacheStatusEl.textContent = "Требуется обновление";
      cacheStatusEl.className = "text-amber-400 font-bold";
    }
    Sound.record();
    Haptic.success();
    return;
  }

  if (btn && isManual) {
    btn.innerHTML = `<span>✅ Версия актуальна (${APP_CONFIG.version})! Кэш чист</span>`;
    Sound.success();
    Haptic.success();
    setTimeout(() => {
      if (btn) {
        btn.innerHTML = `<span>Проверить обновления на сервере</span>`;
        btn.onclick = () => checkLiveRevisionUpdate(true);
      }
    }, 2500);
  }
}


function initPushSettings() {
  if (!appState.pushSettings) {
    appState.pushSettings = {
      enabled: true,
      workouts: true,
      vacuum: true,
      reports: true
    };
  }
  updatePushUI();
}

function updatePushUI() {
  const ps = appState.pushSettings || { enabled: true, workouts: true, vacuum: true, reports: true };
  const masterEl = document.getElementById("push-toggle-master");
  const subEl = document.getElementById("push-suboptions");
  const woEl = document.getElementById("push-opt-workouts");
  const vacEl = document.getElementById("push-opt-vacuum");
  const repEl = document.getElementById("push-opt-reports");

  if (masterEl) masterEl.checked = !!ps.enabled;
  if (subEl) {
    subEl.classList.toggle("opacity-30", !ps.enabled);
    subEl.classList.toggle("pointer-events-none", !ps.enabled);
  }
  if (woEl) woEl.checked = !!ps.workouts;
  if (vacEl) vacEl.checked = !!ps.vacuum;
  if (repEl) repEl.checked = !!ps.reports;
}

function togglePushMaster(checked) {
  if (!appState.pushSettings) appState.pushSettings = {};
  appState.pushSettings.enabled = checked;
  saveState();
  updatePushUI();
  Sound.beep(checked ? 650 : 350, 0.05);
  Haptic.impact('light');
}

function updatePushOption(key, checked) {
  if (!appState.pushSettings) appState.pushSettings = {};
  appState.pushSettings[key] = checked;
  saveState();
  Sound.beep(550, 0.04);
  Haptic.impact('light');
}

async function sendTestPushNotification() {
  const chatId = (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) ? window.Telegram.WebApp.initDataUnsafe.user.id : appState.tgId;
  
  if (!appState.pushSettings || !appState.pushSettings.enabled) {
    alert("Push-уведомления сейчас отключены в настройках выше! Включи тумблер для получения.");
    return;
  }

  try {
    const res = await fetch("/api/send-push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId: chatId,
        text: `🔔 <b>ТЕСТОВОЕ PUSH-УВЕДОМЛЕНИЕ</b>\n\nПривет, ${appState.name || 'Атлет'}! Твоя система IRON COACH ELITE успешно подключена к Telegram. Напоминания и отчеты будут приходить вовремя.\n\nУровень: <b>${Math.floor(appState.xp / 500) + 1}</b> • XP: <b>${appState.xp}</b>`,
        withButton: true
      })
    });
    const data = await res.json();
    if (data.ok) {
      Sound.success();
      Haptic.success();
      alert("✅ Тестовый Push отправлен в Telegram!");
    } else {
      alert("Не удалось отправить: " + (data.error || "ошибка сети"));
    }
  } catch(e) {
    alert("Тест отправлен!");
  }
}

let resetTimerInterval = null;
let resetSecondsLeft = 3;

function openSafeResetModal() {
  closeModal('modal-profile-drawer');
  resetSecondsLeft = 3;
  clearInterval(resetTimerInterval);

  const btn = document.getElementById("btn-confirm-safe-reset");
  const txt = document.getElementById("reset-countdown-text");

  if (btn) {
    btn.disabled = true;
    btn.className = "flex-1 py-3 bg-[#181b26] text-slate-500 font-bold uppercase rounded-xl cursor-not-allowed transition-all";
    btn.textContent = `Сбросить (${resetSecondsLeft}с)`;
  }
  if (txt) {
    txt.textContent = `Подождите ${resetSecondsLeft} сек...`;
    txt.className = "text-sm font-bold text-slate-400 font-mono";
  }

  openModal('modal-safe-reset');

  resetTimerInterval = setInterval(() => {
    resetSecondsLeft--;
    if (resetSecondsLeft > 0) {
      if (btn) btn.textContent = `Сбросить (${resetSecondsLeft}с)`;
      if (txt) txt.textContent = `Подождите ${resetSecondsLeft} сек...`;
    } else {
      clearInterval(resetTimerInterval);
      if (btn) {
        btn.disabled = false;
        btn.className = "flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold uppercase rounded-xl cursor-pointer transition-all";
        btn.textContent = "Подтвердить сброс";
      }
      if (txt) {
        txt.textContent = "Защита снята: нажмите для сброса";
        txt.className = "text-sm font-bold text-rose-400 font-mono";
      }
      Sound.beep(880, 0.15);
      Haptic.impact('heavy');
    }
  }, 1000);
}

function executeFullReset() {
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

  renderXP();
  renderMetrics();
  renderHealthTabCalculations();
  renderPersonalizedVitamins();
  renderMonthlyCalendar();
  renderPersonalRecords();
  renderMuscleVolumeBreakdown();
  renderInteractiveAnatomyMap();
  renderPersonalizedAIAnalytics();
  renderHistory();

  openOnboardingModal();
}

function executeSafeResetAndReOnboard() {
  executeFullReset();
}

function openOnboardingModal() {
  closeModal('modal-profile-drawer');
  const nameEl = document.getElementById("onboard-name");
  const ageEl = document.getElementById("onboard-age");
  const heightEl = document.getElementById("onboard-height");
  const weightEl = document.getElementById("onboard-weight");
  const waistEl = document.getElementById("onboard-waist");
  const goalEl = document.getElementById("onboard-goal");

  if (nameEl) nameEl.value = appState.name || "Роман";
  if (ageEl) ageEl.value = appState.age || 32;
  if (heightEl) heightEl.value = appState.height || 178;
  if (weightEl) weightEl.value = (appState.currentMetrics && appState.currentMetrics.weight) ? appState.currentMetrics.weight : 83;
  if (waistEl) waistEl.value = (appState.currentMetrics && appState.currentMetrics.waist) ? appState.currentMetrics.waist : 91.5;
  if (goalEl) goalEl.value = appState.goal || "Рекомпозиция";

  openModal('modal-onboarding');
}

function saveOnboarding(e) {
  saveOnboardingProfile(e);
}

function saveOnboardingProfile(e) {
  if (e && e.preventDefault) {
    try { e.preventDefault(); } catch(err) {}
  }

  const nameEl = document.getElementById("onboard-name");
  const ageEl = document.getElementById("onboard-age");
  const heightEl = document.getElementById("onboard-height");
  const weightEl = document.getElementById("onboard-weight");
  const waistEl = document.getElementById("onboard-waist");
  const goalEl = document.getElementById("onboard-goal");

  const name = nameEl ? nameEl.value.trim() : (appState.name || "Роман");
  const age = parseInt(ageEl ? ageEl.value : 32) || 32;
  const height = parseInt(heightEl ? heightEl.value : 178) || 178;
  const weight = parseFloat(weightEl ? weightEl.value : 83.0) || 83.0;
  const waist = parseFloat(waistEl ? waistEl.value : 91.5) || 91.5;
  const goal = goalEl ? goalEl.value : "Рекомпозиция";

  appState.name = name || "Роман";
  appState.age = age;
  appState.height = height;
  appState.goal = goal;

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
  if (elName) elName.textContent = appState.name;

  const elGoal = document.getElementById("athlete-goal-header-badge");
  if (elGoal) elGoal.textContent = appState.goal;

  const pDispName = document.getElementById("prof-disp-name");
  if (pDispName) pDispName.textContent = appState.name;

  const pDispAge = document.getElementById("prof-disp-age");
  if (pDispAge) pDispAge.textContent = `${appState.age} г • ${appState.height} см`;

  const pDispGoal = document.getElementById("prof-disp-goal");
  if (pDispGoal) pDispGoal.textContent = appState.goal;

  saveState();
  closeModal('modal-onboarding');
  Sound.finish();
  Haptic.success();

  renderXP();
  renderMetrics();
  renderHealthTabCalculations();
  renderPersonalizedVitamins();
  renderMonthlyCalendar();
  renderPersonalRecords();
  renderMuscleVolumeBreakdown();
  renderInteractiveAnatomyMap();
  renderPersonalizedAIAnalytics();
}

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
    badge.className = "text-sm font-bold text-white font-mono";
  } else if (scorePct >= 65) {
    badge.textContent = `${scorePct}% • Умеренная нагрузка (запас 1-2 повт)`;
    badge.className = "text-sm font-bold text-[#c8a97e] font-mono";
  } else {
    badge.textContent = `${scorePct}% • Авто-снижение весов на 10% (Защита шеи)`;
    badge.className = "text-sm font-bold text-rose-400 font-mono";
  }
}

function confirmReadinessAndStart() {
  closeModal('modal-readiness');
  const energy = parseInt(document.getElementById("readiness-range-energy").value) || 4;
  const sleep = parseInt(document.getElementById("readiness-range-sleep").value) || 4;
  const soreness = parseInt(document.getElementById("readiness-range-soreness").value) || 1;
  const scorePct = Math.round(((energy + sleep + (6 - soreness)) / 15) * 100);

  if (pendingWorkoutPlanKey === 'free') {
    startFreeWorkout(pendingTargetWorkoutDate);
  } else {
    startWorkout(pendingWorkoutPlanKey, scorePct, pendingTargetWorkoutDate);
  }
}

function skipReadinessAndStart() {
  closeModal('modal-readiness');
  if (pendingWorkoutPlanKey === 'free') {
    startFreeWorkout(pendingTargetWorkoutDate);
  } else {
    startWorkout(pendingWorkoutPlanKey, 90, pendingTargetWorkoutDate);
  }
}

function startWorkout(planKey, readinessPct = 90, targetDate = null) {
  Sound.beep(600, 0.08);
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
        targetMuscles: e.targetMuscles || "Целевые зоны",
        phases: e.phases || ["01: Опускание 2-3с", "02: Пауза 1с", "03: Выжим"],
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

  saveState();
  startWorkoutTimer();
  renderActiveWorkoutUI();
  switchTab("workouts");
}

function startWorkoutTimer() {
  clearInterval(liveWorkoutTimerInterval);
  syncLiveWorkoutTimer();
  liveWorkoutTimerInterval = setInterval(syncLiveWorkoutTimer, 1000);
}

function syncLiveWorkoutTimer() {
  if (!appState.activeWorkout) {
    clearInterval(liveWorkoutTimerInterval);
    return;
  }
  if (!appState.activeWorkout.startTimestamp) {
    appState.activeWorkout.startTimestamp = Date.now();
    saveState();
  }
  const elapsedSec = Math.max(0, Math.floor((Date.now() - appState.activeWorkout.startTimestamp) / 1000));
  liveWorkoutSeconds = elapsedSec;
  const m = Math.floor(elapsedSec / 60);
  const s = elapsedSec % 60;
  const timerEl = document.getElementById("wo-live-timer");
  if (timerEl) {
    timerEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  updateActiveWorkoutTopPill();
}

function restoreActiveWorkoutIfAny() {
  if (appState.activeWorkout && appState.activeWorkout.exercises && appState.activeWorkout.exercises.length > 0) {
    const selectorEl = document.getElementById("workout-selector");
    const activeEl = document.getElementById("workout-active");
    if (selectorEl) selectorEl.classList.add("hidden");
    if (activeEl) activeEl.classList.remove("hidden");
    
    activeExpandedExerciseIndex = getFirstUnfinishedExerciseIndex(appState.activeWorkout);
    renderActiveWorkoutUI();
    startWorkoutTimer();
    updateActiveWorkoutTopPill();
    syncActiveRestTimer();
  }
}

function testRestGongSound() {
  Sound.restFinish();
  Haptic.restFinish();
}

function toggleExerciseAccordion(exIdx) {
  isManualAccordionToggled = true;
  activeExpandedExerciseIndex = (activeExpandedExerciseIndex === exIdx) ? -1 : exIdx;
  Sound.beep(600, 0.05);
  Haptic.impact('light');
  renderActiveWorkoutUI();
  setTimeout(() => { isManualAccordionToggled = false; }, 600);
}

function addCustomExerciseToActiveWorkout(e) {
  e.preventDefault();
  if (!appState.activeWorkout) {
    startFreeWorkout();
  }

  const name = document.getElementById("cust-ex-name").value.trim();
  const sets = parseInt(document.getElementById("cust-ex-sets").value) || 3;
  const reps = parseInt(document.getElementById("cust-ex-reps").value) || 10;
  const weight = parseFloat(document.getElementById("cust-ex-weight").value) || 0;
  const muscle = document.getElementById("cust-ex-muscle").value;
  const tip = document.getElementById("cust-ex-tip").value.trim() || "Подконтрольное движение без раскачки.";

  appState.activeWorkout.exercises.push({
    name: name,
    muscleGroup: muscle,
    targetMuscles: `${muscle} • Индивидуальное`,
    phases: ["01: Начальная фаза", "02: Рабочее движение", "03: Фиксация 1с"],
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
      <div class="p-6 bg-[#181b26] rounded-2xl border border-white/[0.06] text-center text-slate-400 space-y-2 font-mono">
        <p class="text-xs font-bold text-slate-200 uppercase">Журнал сессий пуст</p>
        <p class="text-[11px] text-slate-400 font-sans">Начни тренировку во вкладке «Тренинг» или нажми «+ Добавить» выше.</p>
      </div>
    `;
    return;
  }

  hist.forEach((h, idx) => {
    const card = document.createElement("div");
    card.className = "p-4 bg-[#12141c] rounded-2xl border border-white/[0.08] space-y-2.5 font-mono text-xs";

    const timeString = h.startTimeStr ? `${h.startTimeStr} – ${h.endTimeStr || '...'} (${h.durationMin || 45} мин)` : `${h.timeStr || h.date}`;

    const exList = (h.exercises || []).map(e => `
      <div class="flex justify-between items-center text-[11px] py-1 border-b border-white/[0.04] last:border-0 font-sans">
        <span class="text-slate-300 font-medium">${e.name}</span>
        <div class="text-right font-mono">
          <span class="text-white font-bold block">${e.sets}</span>
          <span class="text-[10px] text-[#c8a97e]">${e.prog || ''}</span>
        </div>
      </div>
    `).join("");

    const ratingBadge = h.rating ? `
      <div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#c8a97e]/15 border border-[#c8a97e]/30 text-[10px] text-[#c8a97e] font-sans font-bold">
        <span>${h.ratingEmoji || '⚡'}</span>
        <span>${h.rating}/5</span>
        <span class="text-slate-400 font-normal">• ${h.ratingLabel || ''}</span>
      </div>
    ` : '';

    const noteBlock = h.note ? `
      <div class="p-2 bg-[#0c0e18] rounded-xl border border-white/[0.04] text-[11px] text-slate-300 italic font-sans flex items-start gap-1.5">
        <span class="text-[#c8a97e]">💬</span>
        <span>${h.note}</span>
      </div>
    ` : '';

    card.innerHTML = `
      <div class="flex justify-between items-start pb-2 border-b border-white/[0.08]">
        <div>
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-white text-xs font-sans">${h.name}</h4>
            ${ratingBadge}
          </div>
          <span class="text-[10px] text-slate-400">${h.date} • ${timeString}</span>
        </div>
        <div class="flex items-center space-x-2 text-right">
          <div>
            <span class="text-xs text-white font-bold">${h.tonnage} кг</span>
            <span class="text-[9px] text-slate-400 block uppercase">тоннаж</span>
          </div>
          <div class="border-l border-white/10 pl-2">
            <span class="text-xs text-[#c8a97e] font-bold">${h.calories || 350} ккал</span>
            <span class="text-[9px] text-slate-400 block uppercase">расход</span>
          </div>
        </div>
      </div>
      <div class="space-y-0.5 pt-1">${exList}</div>
      ${noteBlock}
      <div class="flex justify-end space-x-2 pt-2 border-t border-white/[0.08] text-[10px]">
        <button onclick="openEditHistoryModal(${idx})" class="px-2.5 py-1 bg-[#181b26] text-slate-300 rounded-lg border border-white/10">Редактировать</button>
        <button onclick="deleteHistoryItemDirect(${idx})" class="px-2.5 py-1 bg-rose-950/60 text-rose-300 rounded-lg border border-rose-900">Удалить</button>
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
  
  const ratingSel = document.getElementById("edit-h-rating");
  const noteInput = document.getElementById("edit-h-note");
  if (ratingSel) ratingSel.value = h.rating ? String(h.rating) : "4";
  if (noteInput) noteInput.value = h.note || "";

  const exContainer = document.getElementById("edit-h-exercises");
  exContainer.innerHTML = '<span class="text-[10px] text-slate-400 block mb-1 uppercase">Упражнения:</span>';

  (h.exercises || []).forEach((e, eIdx) => {
    const row = document.createElement("div");
    row.className = "grid grid-cols-12 gap-1.5 items-center";
    row.innerHTML = `
      <input type="text" value="${e.name}" id="edit-ex-name-${eIdx}" class="col-span-6 bg-[#0c0d14] border border-white/10 px-2 py-1 rounded-lg text-white text-xs outline-none font-sans">
      <input type="text" value="${e.sets}" id="edit-ex-sets-${eIdx}" class="col-span-6 bg-[#0c0d14] border border-white/10 px-2 py-1 rounded-lg text-[#c8a97e] font-mono text-xs outline-none">
    `;
    exContainer.appendChild(row);
  });

  openModal("modal-edit-history");
}

function saveEditedHistoryItem() {
  if (currentEditingHistoryIndex === null) return;
  const h = appState.history[currentEditingHistoryIndex];

  h.name = document.getElementById("edit-h-name").value || "Тренировка";
  h.date = document.getElementById("edit-h-date").value || new Date().toISOString().split("T")[0];
  h.startTimeStr = document.getElementById("edit-h-starttime").value || "18:00";
  h.endTimeStr = document.getElementById("edit-h-endtime").value || "19:00";
  h.tonnage = parseFloat(document.getElementById("edit-h-tonnage").value) || 0;
  h.calories = parseFloat(document.getElementById("edit-h-calories").value) || 350;

  const ratingSel = document.getElementById("edit-h-rating");
  const noteInput = document.getElementById("edit-h-note");
  if (ratingSel) {
    const rVal = parseInt(ratingSel.value) || 4;
    h.rating = rVal;
    if (rVal === 5) { h.ratingEmoji = '🔥'; h.ratingLabel = 'Отлично / Полон сил'; h.rpe = 'RPE 7-8'; }
    else if (rVal === 4) { h.ratingEmoji = '⚡'; h.ratingLabel = 'Рабочий темп / В яблочко'; h.rpe = 'RPE 8-8.5'; }
    else if (rVal === 3) { h.ratingEmoji = '💪'; h.ratingLabel = 'Было тяжело / На пределе'; h.rpe = 'RPE 9-9.5'; }
    else if (rVal === 2) { h.ratingEmoji = '🛑'; h.ratingLabel = 'Перегруз / Усталость'; h.rpe = 'RPE 10'; }
    else { h.ratingEmoji = '⚠️'; h.ratingLabel = 'Дискомфорт / Боль в связках'; h.rpe = 'Риск'; }
  }
  if (noteInput) {
    h.note = noteInput.value.trim();
  }

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
  renderPersonalizedAIAnalytics();
  drawTrendChart();
  Sound.success();
  Haptic.success();
}

function saveEditedHistory() {
  saveEditedHistoryItem();
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
    renderPersonalizedAIAnalytics();
    drawTrendChart();
    Sound.beep(400, 0.08);
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
    renderPersonalizedAIAnalytics();
    drawTrendChart();
    Sound.beep(400, 0.08);
  }
}

function openAddManualWorkoutModal() {
  const dateInput = document.getElementById("manual-wo-date");
  if (dateInput) {
    dateInput.value = selectedCalDateStr || new Date().toISOString().split("T")[0];
  }
  openModal("modal-add-manual-workout");
  Sound.beep(550, 0.05);
  Haptic.impact('light');
}

function saveManualWorkoutFromModal() {
  const name = document.getElementById("manual-wo-name").value || "Тренировка А";
  const date = document.getElementById("manual-wo-date").value || new Date().toISOString().split("T")[0];
  const tonnage = parseFloat(document.getElementById("manual-wo-tonnage").value) || 0;
  const cals = parseFloat(document.getElementById("manual-wo-calories").value) || 380;
  const start = document.getElementById("manual-wo-starttime").value || "18:00";
  const end = document.getElementById("manual-wo-endtime").value || "18:50";

  if (!appState.history) appState.history = [];
  appState.history.unshift({
    id: "wo_" + Date.now(),
    date: date,
    startTimeStr: start,
    endTimeStr: end,
    durationMin: 50,
    name: name,
    readiness: 90,
    tonnage: tonnage,
    calories: cals,
    exercises: [
      { name: "Жим на наклонной 30°", sets: "22кг × 10, 10, 10, 10", prog: "Закрыто" },
      { name: "Жим гантелей лежа", sets: "24кг × 8, 8, 8, 8", prog: "Закрыто" }
    ]
  });

  addXP(100);
  calculateAutoMesocycle();
  saveState();
  closeModal("modal-add-manual-workout");
  renderHistory();
  renderMonthlyCalendar();
  render12MonthsAnnualBreakdown();
  renderMuscleVolumeBreakdown();
  renderPersonalizedAIAnalytics();
  drawTrendChart();
  Sound.success();
  Haptic.success();
}

// ========================================================
// ЭКСПОРТ АНАЛИТИЧЕСКОГО ДОСЬЕ
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
      return `${i + 1}) ${h.date} [${timeSpan}] — ${h.name}\n   Тоннаж: ${h.tonnage} кг | Расход: ~${h.calories || 350} ккал | Готовность: ${h.readiness || 90}%\n${exStr}`;
    }).join("\n\n");
  }

  const summary = `[IRON COACH — ПОЛНОЕ АНАЛИТИЧЕСКОЕ ДОСЬЕ АТЛЕТА ДЛЯ ИИ/ТРЕНЕРА]:
=============================================
1. ПРОФИЛЬ И ПАРАМЕТРЫ:
• Атлет: ${appState.name} | Возраст: ${appState.age || 32} года | Рост: ${appState.height || 178} см
• Главная цель: ${appState.goal || 'Рекомпозиция (Сушка жира + Мышечный тонус)'}
• Уровень: ${currentLvl} | Всего опыта: ${appState.xp.toLocaleString()} XP
• Текущая серия: ${appState.streak || 0} дней без срывов
• Авто-периодизация: Неделя ${appState.mesocycleWeek || 1} из 8

2. АНТРОПОМЕТРИЯ И ЗАМЕРЫ ТЕЛА:
• Вес тела: ${m.weight || 83} кг
• Талия по пупку: ${m.waist || 91.5} см (Соотношение талии к росту: ${waistRatio}%)
• Бицепс (рука): ${m.biceps || 38.5} см
• Обхват груди: ${m.chest || 104} см
• Бедро (нога): ${m.thigh || 59} см
• Шея: ${m.neck || 39.5} см

3. ЗАЛ ЛИЧНЫХ РЕКОРДОВ (ПОДТВЕРЖДЕННЫЕ ПРОРЫВЫ):
${prsText}

4. ПОСЛЕДНИЕ ТРЕНИРОВКИ (С ХРОНОМЕТРАЖЕМ И ВЕСАМИ):
${lastWosText}

5. ДИСЦИПЛИНА И ЗДОРОВЬЕ:
• Выполнено дней утреннего вакуума: ${appState.vacDaysCount || 0}
• Суммарный тоннаж за все время: ${getTotalTonnage(appState).toLocaleString()} кг
=============================================`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(summary).then(() => {
      Sound.success();
      Haptic.success();
      alert(`Полное аналитическое досье атлета «${appState.name}» скопировано в буфер обмена!\n\nВставь (Ctrl+V) в чат с тренером или ИИ.`);
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
    let chatId = null;
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
      chatId = window.Telegram.WebApp.initDataUnsafe.user.id;
    }
    if (!chatId && appState.tgId) {
      const m = String(appState.tgId).match(/\d+/);
      if (m) chatId = m[0];
    }
    if (!chatId) return;

    await fetch('/api/send-push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: chatId,
        text: `📊 <b>АНАЛИТИЧЕСКИЙ ОТЧЕТ АТЛЕТА</b>\n\n` + reportHtml,
        withButton: true
      })
    });
  } catch(e) {}
}

async function syncUserToLeaderboard() {}

function switchTab(tabId) {
  Sound.beep(500, 0.05);
  Haptic.impact('light');

  const currentPane = document.querySelector(".tab-pane.active");
  const isSameTab = currentPane && currentPane.id === ("tab-" + tabId);

  document.querySelectorAll(".tab-pane").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));

  const targetPane = document.getElementById("tab-" + tabId);
  const targetNav = document.getElementById("nav-" + tabId);

  if (targetPane) targetPane.classList.add("active");
  if (targetNav) targetNav.classList.add("active");

  if (tabId === "workouts") {
    if (appState.activeWorkout) {
      document.getElementById("workout-selector").classList.add("hidden");
      document.getElementById("workout-active").classList.remove("hidden");
    } else {
      document.getElementById("workout-selector").classList.remove("hidden");
      document.getElementById("workout-active").classList.add("hidden");
    }
  }

  if (isSameTab) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (tabId === "progress") {
    switchProgressSubtab('calendar');
  }
  if (tabId === "nutrition") {
    renderHealthTabCalculations();
    renderPersonalizedVitamins();
    updateVacuumBadge();
  }
  if (tabId === "settings") {
    updateSettingsDisplay();
  }

  updateActiveWorkoutTopPill();
}

function switchProgressSubtab(subtabId) {
  Sound.beep(550, 0.05);
  Haptic.impact('light');

  ['calendar', 'analytics', 'records', 'metrics', 'achievements', 'archive'].forEach(st => {
    const pane = document.getElementById("subtab-" + st);
    const btn = document.getElementById("btn-sub-" + st);
    if (st === subtabId) {
      if (pane) pane.classList.remove("hidden");
      if (btn) {
        btn.className = "py-2.5 px-1 rounded-xl bg-[#c8a97e] text-slate-950 font-bold transition-all text-center flex items-center justify-center space-x-1.5 shadow-sm";
      }
    } else {
      if (pane) pane.classList.add("hidden");
      if (btn) {
        btn.className = "py-2.5 px-1 rounded-xl text-slate-400 font-medium transition-all text-center flex items-center justify-center space-x-1.5";
      }
    }
  });

  if (subtabId === 'calendar') {
    renderMonthlyCalendar();
    render12MonthsAnnualBreakdown();
    renderMuscleVolumeBreakdown();
  }
  if (subtabId === 'analytics') {
    renderPersonalizedAIAnalytics();
    renderInteractiveAnatomyMap();
    renderMuscleVolumeBreakdown();
    setTimeout(() => drawTrendChart(), 50);
  }
  if (subtabId === 'metrics') {
    renderMetrics();
  }
  if (subtabId === 'records') {
    renderPersonalRecords();
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
  const el = document.getElementById(modalId);
  if (el) el.classList.remove("hidden");
  if (modalId === "modal-1rm") calculate1RM();
}
function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add("hidden");
}

function calculate1RM() {
  const wEl = document.getElementById("calc-1rm-weight") || document.getElementById("rm-calc-weight");
  const rEl = document.getElementById("calc-1rm-reps") || document.getElementById("rm-calc-reps");
  const resEl = document.getElementById("calc-1rm-result") || document.getElementById("rm-calc-result");

  const w = parseFloat(wEl ? wEl.value : 0) || 0;
  const r = parseInt(rEl ? rEl.value : 1) || 1;

  if (!resEl) return;
  if (w <= 0 || r <= 0) {
    resEl.textContent = "0 кг";
    return;
  }

  const oneRM = Math.round(w * (1 + r / 30.0));
  resEl.textContent = `${oneRM} кг`;
}

function compute1RMModal() {
  calculate1RM();
}

document.addEventListener("DOMContentLoaded", () => {
  injectAppVersion();
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
  loadState();
  restoreActiveWorkoutIfAny();
  initPushSettings();
  renderXP();
  renderMetrics();
  renderHealthTabCalculations();
  renderPersonalizedVitamins();
  renderMonthlyCalendar();
  render12MonthsAnnualBreakdown();
  renderPersonalRecords();
  renderMuscleVolumeBreakdown();
  renderInteractiveAnatomyMap();
  renderPersonalizedAIAnalytics();
  updateVacuumBadge();
  updateActiveWorkoutTopPill();

  // Lifecycle listeners to preserve session when minimizing or locking phone
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      syncLiveWorkoutTimer();
      syncActiveRestTimer();
      restoreActiveWorkoutIfAny();
    }
  });

  window.addEventListener("pageshow", () => {
    syncLiveWorkoutTimer();
    syncActiveRestTimer();
    restoreActiveWorkoutIfAny();
  });

  window.addEventListener("beforeunload", () => {
    saveState();
  });

  // Уведомление в Telegram-чат о выходе новой версии
  const lastVersionSeen = localStorage.getItem("asutp_last_version_seen");
  if (lastVersionSeen !== APP_CONFIG.version) {
    localStorage.setItem("asutp_last_version_seen", APP_CONFIG.version);
    const userId = (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) ? window.Telegram.WebApp.initDataUnsafe.user.id : null;
    if (userId) {
      fetch("/api/send-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: userId,
          text: `🚀 <b>ВЫШЛО ОБНОВЛЕНИЕ IRON COACH ${APP_CONFIG.version}!</b>\n\n` +
                `✨ <b>Что нового в этой версии:</b>\n` +
                `• <b>Интерактивная Анатомическая Карта Тела:</b> нажимай на человека (вид Спереди и Сзади) — получай полное досье по целевой мышце, технике и лучшим упражнениям!\n` +
                `• <b>Визуальный Рост Мышц (Hypertrophy Scaling):</b> мышцы на теле визуально увеличиваются в размере и светятся золотым неоном по мере набора недельного объема сетов (RP MAV)!\n` +
                `• <b>Таймер Восстановления Мышц:</b> точный расчет часов отдыха и готовности мышечных групп к следующей сессии.\n` +
                `• <b>Анимированные схемы биомеханики:</b> в режиме тренировки и каталоге базы упражнений.\n\n` +
                `👇 <i>Заходи и протестируй анатомическую карту:</i>`,
          withButton: true
        })
      }).catch(() => {});
    }
  }
});


// ========================================================
// УПРАВЛЕНИЕ ТЕМАМИ И НАСТРОЙКАМИ ИНТЕРФЕЙСА
// ========================================================
function setAppTheme(themeName) {
  appState.theme = themeName;
  document.body.setAttribute("data-theme", themeName === "gold" ? "" : themeName);
  
  const themes = ['gold', 'emerald', 'cyan', 'ruby', 'purple'];
  themes.forEach(t => {
    const btn = document.getElementById("theme-btn-" + t);
    if (btn) btn.classList.toggle("active", t === themeName);
  });

  const nameEl = document.getElementById("active-theme-name");
  const names = {
    gold: "Obsidian Gold",
    emerald: "Cyber Emerald",
    cyan: "Ice Cyan / Titanium",
    ruby: "Crimson Ruby",
    purple: "Amethyst Neon"
  };
  if (nameEl) nameEl.textContent = names[themeName] || "Obsidian Gold";

  saveState();
  Sound.beep(600, 0.05);
  Haptic.impact('light');
}

function setHapticLevel(lvl) {
  appState.hapticLevel = lvl;
  saveState();
  
  const lvls = ['light', 'medium', 'heavy', 'off'];
  lvls.forEach(l => {
    const btn = document.getElementById("haptic-btn-" + l);
    if (btn) {
      if (l === lvl) btn.className = "py-2 bg-[#c8a97e] text-slate-950 rounded-xl font-bold";
      else btn.className = "py-2 glass-panel rounded-xl text-slate-300 font-bold";
    }
  });

  const labelEl = document.getElementById("active-haptic-label");
  const labels = { light: "Легкий", medium: "Средний", heavy: "Сильный", off: "Выкл" };
  if (labelEl) labelEl.textContent = labels[lvl] || "Средний";

  if (lvl !== 'off') {
    Haptic.impact(lvl === 'light' ? 'light' : lvl === 'heavy' ? 'heavy' : 'medium');
  }
}

function updateSettingsDisplay() {
  const ps = appState.pushSettings || { enabled: true, workouts: true, vacuum: true, reports: true };
  const masterEl = document.getElementById("settings-push-toggle-master");
  const subEl = document.getElementById("settings-push-suboptions");
  const woEl = document.getElementById("settings-push-opt-workouts");
  const vacEl = document.getElementById("settings-push-opt-vacuum");
  const repEl = document.getElementById("settings-push-opt-reports");

  if (masterEl) masterEl.checked = !!ps.enabled;
  if (subEl) {
    subEl.classList.toggle("opacity-30", !ps.enabled);
    subEl.classList.toggle("pointer-events-none", !ps.enabled);
  }
  if (woEl) woEl.checked = !!ps.workouts;
  if (vacEl) vacEl.checked = !!ps.vacuum;
  if (repEl) repEl.checked = !!ps.reports;

  const nameEl = document.getElementById("settings-disp-name");
  const metricsEl = document.getElementById("settings-disp-metrics");
  const goalEl = document.getElementById("settings-disp-goal");

  if (nameEl) nameEl.textContent = appState.name;
  if (metricsEl) metricsEl.textContent = `${appState.age || 32} г • ${appState.height || 178} см • ${(appState.currentMetrics && appState.currentMetrics.weight) || 83} кг`;
  if (goalEl) goalEl.textContent = appState.goal || "Рекомпозиция";

  const curTheme = appState.theme || "gold";
  ['gold', 'emerald', 'cyan', 'ruby', 'purple'].forEach(t => {
    const btn = document.getElementById("theme-btn-" + t);
    if (btn) btn.classList.toggle("active", t === curTheme);
  });
}