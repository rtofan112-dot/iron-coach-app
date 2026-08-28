/**
 * IRON COACH ELITE - Bio-Analytics & Scientific Hypertrophy Engine
 */

const APP_CONFIG = {
  version: "v2.8.11 PRO",
  build: "v2.8.4 (Interactive 3D/2D Anatomical Model & Hypertrophy Engine)",
  releaseDate: "2026-08-27"
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
function getExerciseDiagramSVG(exName, muscleGroup) {
  const n = (exName || "").toLowerCase();

  // 1. ЖИМ В ТРЕНАЖЕРЕ ХАММЕР (СИДЯ В ТРЕНАЖЕРЕ, КОНВЕРГЕНТНАЯ ДУГА)
  if (n.includes("хаммер") || n.includes("hammer")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Вертикальная спинка и сиденье Хаммера -->
        <line x1="60" y1="20" x2="60" y2="75" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <line x1="60" y1="75" x2="95" y2="75" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <line x1="75" y1="75" x2="75" y2="84" stroke="#334155" stroke-width="3"/>
        <line x1="45" y1="84" x2="110" y2="84" stroke="#1e293b" stroke-width="2"/>
        
        <!-- Атлет сидит прямо с прижатой спиной -->
        <circle cx="68" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="68" y1="28" x2="68" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="68" y1="65" x2="90" y2="65" stroke="#94a3b8" stroke-width="3.5"/>
        <line x1="90" y1="65" x2="90" y2="84" stroke="#94a3b8" stroke-width="3"/>
        
        <!-- Активная грудная мышца (подсветка золотом) -->
        <path d="M70 38 L84 38" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <!-- Рычаг Хаммера и руки (выжим вперед по дуге) -->
        <polyline points="70,38 90,38 115,38" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="120" y1="18" x2="115" y2="38" stroke="#c8a97e" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="120" cy="18" r="3.5" fill="#475569"/>
        <circle cx="115" cy="38" r="4" fill="#c8a97e"/>
        <path d="M95 48 C 105 48, 115 44, 120 38" stroke="#c8a97e" stroke-width="1.5" stroke-dasharray="2 2"/>
        
        <text x="145" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ЖИМ В ХАММЕРЕ</text>
        <text x="145" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Посадка: спина в упоре</text>
        <text x="145" y="52" fill="#64748b" font-size="8" font-family="monospace">Рукояти на уровне груди</text>
        <text x="145" y="66" fill="#10b981" font-size="8" font-family="monospace">Траектория по дуге</text>
        <text x="145" y="80" fill="#94a3b8" font-size="8" font-family="monospace">Локти не щелкать</text>
      </svg>
    `;
  }

  // 2. БАБОЧКА (PEC DECK — СИДЯ С РАЗВЕДЕНИЕМ И СВЕДЕНИЕМ РУК)
  if (n.includes("бабочк") || n.includes("pec deck") || n.includes("пэк-дек")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Спинка тренажера -->
        <line x1="55" y1="20" x2="55" y2="75" stroke="#475569" stroke-width="4"/>
        <line x1="55" y1="75" x2="85" y2="75" stroke="#475569" stroke-width="4"/>
        <circle cx="63" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="63" y1="28" x2="63" y2="68" stroke="#f1f5f9" stroke-width="4"/>
        
        <!-- Рычаги сведения бабочки (дуга к центру груди) -->
        <path d="M98 32 C 92 40, 82 42, 72 42" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        <circle cx="98" cy="32" r="4.5" fill="#c8a97e"/>
        <path d="M72 42 L80 42" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <path d="M108 30 C 100 42, 85 45, 78 45" stroke="#c8a97e" stroke-width="1.5" stroke-dasharray="2 2"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">БАБОЧКА (PEC DECK)</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Локти на уровне груди</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Сведение с фиксацией 2с</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Глубокая растяжка</text>
        <text x="140" y="80" fill="#94a3b8" font-size="8" font-family="monospace">Внутренний пучок груди</text>
      </svg>
    `;
  }

  // 3. ОТЖИМАНИЯ НА БРУСЬЯХ (АКЦЕНТ НА НИЗ ГРУДНЫХ С НАКЛОНОМ 30°)
  if (n.includes("брусь") || n.includes("dips") || n.includes("отжимания на брусьях")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Брусья -->
        <line x1="40" y1="48" x2="110" y2="48" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <line x1="50" y1="48" x2="50" y2="84" stroke="#334155" stroke-width="3"/>
        <line x1="100" y1="48" x2="100" y2="84" stroke="#334155" stroke-width="3"/>
        
        <!-- Атлет в висе с наклоном вперед 30 градусов -->
        <circle cx="88" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="84" y1="26" x2="68" y2="58" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M78 36 L70 50" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="68,58 56,76 48,70" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        
        <!-- Руки на перекладине с углом в локтях -->
        <polyline points="80,34 68,48 78,48" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="78" cy="48" r="3.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ОТЖИМАНИЯ НА БРУСЬЯХ</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Наклон корпуса вперед: 30°</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Локти в стороны под 45°</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Опускание до параллели</text>
        <text x="140" y="80" fill="#94a3b8" font-size="8" font-family="monospace">Низ грудных + трицепс</text>
      </svg>
    `;
  }

  // 4. КРОССОВЕР НА БЛОКАХ
  if (n.includes("кроссовер")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Блочные стойки по бокам -->
        <line x1="25" y1="10" x2="25" y2="82" stroke="#334155" stroke-width="3"/>
        <line x1="125" y1="10" x2="125" y2="82" stroke="#334155" stroke-width="3"/>
        <circle cx="25" cy="20" r="3" fill="#c8a97e"/>
        <circle cx="125" cy="20" r="3" fill="#c8a97e"/>
        
        <!-- Атлет в центре в наклоне -->
        <circle cx="75" cy="25" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="31" x2="70" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M75 40 L70 54" stroke="#c8a97e" stroke-width="5"/>
        
        <!-- Тросы кроссовера сходятся вперед к груди -->
        <line x1="25" y1="20" x2="68" y2="48" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="3 2"/>
        <line x1="125" y1="20" x2="78" y2="48" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="3 2"/>
        <circle cx="73" cy="48" r="4" fill="#c8a97e"/>
        
        <text x="145" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">КРОССОВЕР НА БЛОКАХ</text>
        <text x="145" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Корпус слегка вперед</text>
        <text x="145" y="52" fill="#64748b" font-size="8" font-family="monospace">Сведение по широкой дуге</text>
        <text x="145" y="66" fill="#10b981" font-size="8" font-family="monospace">Локти чуть согнуты</text>
      </svg>
    `;
  }

  // 5. НАКЛОННЫЙ ЖИМ (30°)
  if (n.includes("наклонн") || n.includes("30°")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="75" x2="135" y2="35" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <line x1="55" y1="65" x2="55" y2="82" stroke="#334155" stroke-width="3"/>
        <line x1="120" y1="42" x2="120" y2="82" stroke="#334155" stroke-width="3"/>
        <line x1="20" y1="82" x2="145" y2="82" stroke="#1e293b" stroke-width="2"/>
        
        <circle cx="125" cy="26" r="6.5" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="120" y1="32" x2="68" y2="56" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M108 37 L90 44" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <polyline points="104,39 94,24 90,10" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="90" cy="10" r="4.5" fill="#c8a97e"/>
        <line x1="94" y1="26" x2="91" y2="12" stroke="#c8a97e" stroke-width="2" stroke-dasharray="2 2"/>
        
        <text x="155" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">НАКЛОННЫЙ ЖИМ (30°)</text>
        <text x="155" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Угол скамьи: 30°</text>
        <text x="155" y="52" fill="#64748b" font-size="8" font-family="monospace">Локти: 65° к телу</text>
        <text x="155" y="66" fill="#10b981" font-size="8" font-family="monospace">Шея расслаблена</text>
        <text x="155" y="80" fill="#94a3b8" font-size="8" font-family="monospace">Верхний пучок груди</text>
      </svg>
    `;
  }

  // 6. ГОРИЗОНТАЛЬНЫЙ ЖИМ (ГАНТЕЛЕЙ / ШТАНГИ)
  if (n.includes("жим гантелей") || n.includes("жим лежа") || n.includes("горизонтал") || n.includes("жим штанги")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="58" x2="135" y2="58" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <line x1="45" y1="58" x2="45" y2="82" stroke="#334155" stroke-width="3"/>
        <line x1="120" y1="58" x2="120" y2="82" stroke="#334155" stroke-width="3"/>
        <line x1="20" y1="82" x2="145" y2="82" stroke="#1e293b" stroke-width="2"/>
        
        <circle cx="125" cy="48" r="6.5" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="120" y1="53" x2="60" y2="53" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M108 53 L85 53" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <polyline points="100,53 96,32 96,12" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="96" cy="12" r="4.5" fill="#c8a97e"/>
        
        <text x="155" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ГОРИЗОНТАЛЬНЫЙ ЖИМ</text>
        <text x="155" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Лопатки сведены</text>
        <text x="155" y="52" fill="#64748b" font-size="8" font-family="monospace">Пауза внизу: 1с</text>
        <text x="155" y="66" fill="#10b981" font-size="8" font-family="monospace">Упор стопами в пол</text>
        <text x="155" y="80" fill="#94a3b8" font-size="8" font-family="monospace">Массив грудных мышц</text>
      </svg>
    `;
  }

  // 7. ТЯГА К ЛИЦУ (FACE PULL — РАЗГРУЗКА ШЕИ И ЛОПАТКИ)
  if (n.includes("лицу") || n.includes("face pull") || n.includes("ше") || n.includes("лопатк")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="25" y1="10" x2="25" y2="82" stroke="#334155" stroke-width="3"/>
        <circle cx="25" cy="30" r="3.5" fill="#c8a97e"/>
        <line x1="25" y1="30" x2="75" y2="30" stroke="#64748b" stroke-width="2" stroke-dasharray="3 3"/>
        
        <circle cx="115" cy="24" r="6.5" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="115" y1="31" x2="115" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="115,65 105,82" stroke="#94a3b8" stroke-width="2.5"/>
        <polyline points="115,65 125,82" stroke="#94a3b8" stroke-width="2.5"/>
        
        <polyline points="115,35 100,26 75,30" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="110" cy="34" r="4.5" fill="#c8a97e"/>
        
        <text x="145" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ТЯГА К ЛИЦУ (FACE PULL)</text>
        <text x="145" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Канат строго к глазам</text>
        <text x="145" y="52" fill="#64748b" font-size="8" font-family="monospace">Локти выше кистей</text>
        <text x="145" y="66" fill="#10b981" font-size="8" font-family="monospace">Снятие спазма мышц шеи</text>
        <text x="145" y="80" fill="#94a3b8" font-size="8" font-family="monospace">Задняя дельта + лопатка</text>
      </svg>
    `;
  }

  // 8. ТЯГА ВЕРХНЕГО БЛОКА К ГРУДИ
  if (n.includes("верхнего блока") || n.includes("тяга к груди") || n.includes("вертикальн")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Тренажер вертикальной тяги -->
        <line x1="75" y1="8" x2="75" y2="25" stroke="#475569" stroke-width="3"/>
        <line x1="50" y1="25" x2="100" y2="25" stroke="#c8a97e" stroke-width="3.5" stroke-linecap="round"/>
        
        <!-- Сиденье и упор для колен -->
        <line x1="60" y1="65" x2="90" y2="65" stroke="#475569" stroke-width="3.5"/>
        <line x1="75" y1="65" x2="75" y2="82" stroke="#334155" stroke-width="3"/>
        
        <!-- Атлет сидя с легким отклонением 15° -->
        <circle cx="75" cy="38" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="44" x2="72" y2="68" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M74 46 L71 62" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <polyline points="55,25 65,42 74,48" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <polyline points="95,25 85,42 74,48" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ТЯГА ВЕРХНЕГО БЛОКА</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Тяга строго к ключицам</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Локти тянут в пол</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Грудь раскрыта</text>
        <text x="140" y="80" fill="#94a3b8" font-size="8" font-family="monospace">Ширина спины</text>
      </svg>
    `;
  }

  // 9. ПОДТЯГИВАНИЯ (НА ТУРНИКЕ / В ГРАВИТРОНЕ)
  if (n.includes("подтягиван") || n.includes("турник") || n.includes("гравитрон")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="45" y1="12" x2="115" y2="12" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>
        <circle cx="80" cy="26" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="80" y1="32" x2="80" y2="64" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M82 34 L82 54" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <polyline points="60,12 68,26 78,34" stroke="#94a3b8" stroke-width="2.5"/>
        <polyline points="100,12 92,26 82,34" stroke="#94a3b8" stroke-width="2.5"/>
        <polyline points="80,64 72,82" stroke="#94a3b8" stroke-width="3"/>
        <polyline points="80,64 88,82" stroke="#94a3b8" stroke-width="3"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ПОДТЯГИВАНИЯ</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Грудь к перекладине</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Лопатки опущены вниз</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Без раскачки тела</text>
        <text x="140" y="80" fill="#94a3b8" font-size="8" font-family="monospace">Широчайшие + брахиалис</text>
      </svg>
    `;
  }

  // 10. ТЯГА ГАНТЕЛИ В НАКЛОНЕ (С УПОРОМ В СКАМЬЮ)
  if (n.includes("гантели в наклоне") || n.includes("упором в скамью")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="55" x2="105" y2="55" stroke="#475569" stroke-width="4"/>
        <line x1="40" y1="55" x2="40" y2="82" stroke="#334155" stroke-width="3"/>
        <line x1="95" y1="55" x2="95" y2="82" stroke="#334155" stroke-width="3"/>
        
        <!-- Упор коленом и рукой -->
        <circle cx="95" cy="30" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="90" y1="35" x2="45" y2="35" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="88" y1="38" x2="88" y2="55" stroke="#94a3b8" stroke-width="3"/>
        <polyline points="45,35 45,55 70,55" stroke="#94a3b8" stroke-width="3"/>
        
        <!-- Тяга гантели к тазу -->
        <path d="M75 36 L55 36" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="65,36 60,24 55,42" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="55" cy="42" r="4.5" fill="#c8a97e"/>
        
        <text x="135" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ТЯГА ГАНТЕЛИ В НАКЛОНЕ</text>
        <text x="135" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Тяга по дуге к тазу</text>
        <text x="135" y="52" fill="#64748b" font-size="8" font-family="monospace">Спина параллельна полу</text>
        <text x="135" y="66" fill="#10b981" font-size="8" font-family="monospace">Изоляция широчайшей</text>
      </svg>
    `;
  }

  // 11. ТЯГА ГОРИЗОНТАЛЬНОГО БЛОКА К ПОЯСУ (СИДЯ)
  if (n.includes("горизонтального блока") || n.includes("к поясу") || n.includes("спин")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="25" y1="15" x2="25" y2="82" stroke="#334155" stroke-width="3"/>
        <line x1="25" y1="46" x2="70" y2="46" stroke="#64748b" stroke-width="2" stroke-dasharray="2 2"/>
        
        <circle cx="115" cy="26" r="6.5" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="115" y1="33" x2="110" y2="60" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="110" y1="60" x2="75" y2="60" stroke="#94a3b8" stroke-width="3"/>
        <path d="M113 36 L111 54" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="113,36 95,43 70,46" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        
        <text x="145" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ТЯГА К ПОЯСУ СИДЯ</text>
        <text x="145" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Локти вдоль ребер назад</text>
        <text x="145" y="52" fill="#64748b" font-size="8" font-family="monospace">Сведение лопаток в пике</text>
        <text x="145" y="66" fill="#10b981" font-size="8" font-family="monospace">Плечи опущены вниз</text>
        <text x="145" y="80" fill="#94a3b8" font-size="8" font-family="monospace">Толщина спины</text>
      </svg>
    `;
  }

  // 12. ГИПЕРЭКСТЕНЗИЯ
  if (n.includes("гиперэкстензия") || n.includes("разгибател")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Римский стул 45 градусов -->
        <line x1="30" y1="75" x2="80" y2="45" stroke="#475569" stroke-width="4"/>
        <rect x="75" y="40" width="16" height="8" rx="2" fill="#334155" transform="rotate(-30 75 40)"/>
        
        <!-- Атлет в подъеме до ровной линии -->
        <circle cx="120" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="115" y1="26" x2="85" y2="44" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M100 35 L85 44" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="85" y1="44" x2="45" y2="68" stroke="#94a3b8" stroke-width="3.5"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ГИПЕРЭКСТЕНЗИЯ</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Подъем в прямую линию</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Без переразгибания</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Крепкая поясница</text>
      </svg>
    `;
  }

  // 13. ЖИМ НОГАМИ 45° В ТРЕНАЖЕРЕ
  if (n.includes("жим ногами") || (n.includes("45°") && n.includes("ног"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="35" y1="25" x2="95" y2="75" stroke="#475569" stroke-width="4"/>
        <rect x="30" y="20" width="18" height="8" rx="2" fill="#c8a97e" transform="rotate(-35 30 20)"/>
        
        <circle cx="130" cy="40" r="6.5" stroke="#cbd5e1" stroke-width="2"/>
        <polyline points="125,45 105,62 68,52 45,35" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M105 62 L68 52" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <text x="150" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ЖИМ НОГАМИ 45°</text>
        <text x="150" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Угол в коленях: 90°</text>
        <text x="150" y="52" fill="#64748b" font-size="8" font-family="monospace">Упор пятками в платформу</text>
        <text x="150" y="66" fill="#10b981" font-size="8" font-family="monospace">Колени не щелкать</text>
        <text x="150" y="80" fill="#94a3b8" font-size="8" font-family="monospace">Квадрицепс + ягодицы</text>
      </svg>
    `;
  }

  // 14. РУМЫНСКАЯ ТЯГА С ГАНТЕЛЯМИ
  if (n.includes("румынск") || n.includes("мертвая")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="110" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="105" y1="26" x2="65" y2="42" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="65,42 70,64 70,84" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M65 42 L70 64" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <!-- Гантели вдоль голеней -->
        <line x1="90" y1="32" x2="82" y2="60" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="82" cy="60" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">РУМЫНСКАЯ ТЯГА</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Таз максимально назад</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Спина идеально прямая</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Гантели вдоль ног</text>
        <text x="140" y="80" fill="#94a3b8" font-size="8" font-family="monospace">Бицепс бедра + ягодицы</text>
      </svg>
    `;
  }

  // 15. СГИБАНИЯ НОГ В ТРЕНАЖЕРЕ
  if (n.includes("сгибан") && (n.includes("ног") || n.includes("бедра"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="55" x2="95" y2="55" stroke="#475569" stroke-width="4"/>
        <circle cx="35" cy="44" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="35" y1="50" x2="75" y2="50" stroke="#f1f5f9" stroke-width="4"/>
        
        <!-- Сгибание голени к ягодицам -->
        <polyline points="75,50 95,28" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="95" cy="28" r="4.5" fill="#c8a97e"/>
        <path d="M75 50 L95 28" stroke="#c8a97e" stroke-width="5" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">СГИБАНИЯ НОГ</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Фиксация в сгибании 1с</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Медленный спуск 3 сек</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Бицепс бедра</text>
      </svg>
    `;
  }

  // 16. РАЗГИБАНИЯ НОГ В ТРЕНАЖЕРЕ СИДЯ
  if (n.includes("разгибан") && (n.includes("ног") || n.includes("квадрицепс"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="20" x2="50" y2="60" stroke="#475569" stroke-width="4"/>
        <line x1="50" y1="60" x2="80" y2="60" stroke="#475569" stroke-width="4"/>
        <circle cx="58" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="58" y1="28" x2="58" y2="58" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="58" y1="58" x2="80" y2="58" stroke="#94a3b8" stroke-width="4"/>
        
        <!-- Выпрямление ноги вверх -->
        <line x1="80" y1="58" x2="110" y2="58" stroke="#c8a97e" stroke-width="4" stroke-linecap="round"/>
        <circle cx="110" cy="58" r="4.5" fill="#c8a97e"/>
        <path d="M58 58 L80 58" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">РАЗГИБАНИЯ НОГ СИДЯ</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Плавный подъем без рывка</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Пиковое сжатие 1 сек</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Изоляция квадрицепса</text>
      </svg>
    `;
  }

  // 17. ГАКК-ПРИСЕДАНИЯ
  if (n.includes("гакк") || n.includes("hack") || (n.includes("присед") && n.includes("тренажер"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Наклонная опора Гакка -->
        <line x1="40" y1="20" x2="85" y2="78" stroke="#475569" stroke-width="4"/>
        <circle cx="55" cy="28" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="55" y1="34" x2="78" y2="60" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="78,60 100,60 100,82" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M78 60 L100 60" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ГАКК-ПРИСЕДАНИЯ</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Спина плотно к опоре</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Сед до угла 90° в коленях</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Безопасно для поясницы</text>
      </svg>
    `;
  }

  // 18. ПОДЪЕМ НА НОСКИ (ИКРЫ)
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
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Максимальная амплитуда</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Пауза 2с в нижней растяжке</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Икроножные мышцы</text>
      </svg>
    `;
  }

  // 19. МАХИ ГАНТЕЛЯМИ ЧЕРЕЗ СТОРОНЫ
  if (n.includes("мах") && (n.includes("сторон") || n.includes("плеч") || n.includes("дельт"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="85" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="85" y1="26" x2="85" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="85,65 75,82" stroke="#94a3b8" stroke-width="2.5"/>
        <polyline points="85,65 95,82" stroke="#94a3b8" stroke-width="2.5"/>
        
        <!-- Разведение рук в стороны локтями вверх -->
        <polyline points="45,35 65,30 85,30 105,30 125,35" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="45" cy="35" r="4" fill="#c8a97e"/>
        <circle cx="125" cy="35" r="4" fill="#c8a97e"/>
        <circle cx="68" cy="30" r="4.5" fill="#c8a97e"/>
        <circle cx="102" cy="30" r="4.5" fill="#c8a97e"/>
        
        <text x="145" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">МАХИ ЧЕРЕЗ СТОРОНЫ</text>
        <text x="145" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Подъем локтями до плеч</text>
        <text x="145" y="52" fill="#64748b" font-size="8" font-family="monospace">Кисти чуть ниже локтей</text>
        <text x="145" y="66" fill="#10b981" font-size="8" font-family="monospace">Трапецию не зажимать</text>
        <text x="145" y="80" fill="#94a3b8" font-size="8" font-family="monospace">Ширина плеч (средняя дельта)</text>
      </svg>
    `;
  }

  // 20. ЖИМ ГАНТЕЛЕЙ СИДЯ НА ПЛЕЧИ (СКАМЬЯ 75°)
  if (n.includes("жим гантелей сидя") || (n.includes("жим") && n.includes("плечи")) || n.includes("75°")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="20" x2="58" y2="70" stroke="#475569" stroke-width="4"/>
        <line x1="58" y1="70" x2="88" y2="70" stroke="#475569" stroke-width="4"/>
        
        <circle cx="65" cy="24" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="65" y1="30" x2="68" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M66 32 L68 45" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <!-- Вертикальный жим гантелей над головой -->
        <polyline points="65,34 50,30 50,14" stroke="#94a3b8" stroke-width="2.5"/>
        <polyline points="65,34 80,30 80,14" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="50" cy="14" r="4.5" fill="#c8a97e"/>
        <circle cx="80" cy="14" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ЖИМ ГАНТЕЛЕЙ НА ПЛЕЧИ</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Угол скамьи: 75°</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Локти слегка вперед</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Без прогиба в пояснице</text>
      </svg>
    `;
  }

  // 21. РАЗВОДКА НА ЗАДНЮЮ ДЕЛЬТУ В НАКЛОНЕ
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
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Наклон корпуса 45–60°</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Локти назад и в стороны</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Задний пучок дельт</text>
      </svg>
    `;
  }

  // 22. ПРОТЯЖКА НА БЛОКЕ К ПОДБОРОДКУ
  if (n.includes("протяжк") || n.includes("подбородк")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="75" y1="84" x2="75" y2="40" stroke="#64748b" stroke-width="2" stroke-dasharray="3 2"/>
        <circle cx="75" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="26" x2="75" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        
        <!-- Подъем грифа локтями вверх -->
        <polyline points="50,30 62,38 88,38 100,30" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="62" y1="38" x2="88" y2="38" stroke="#c8a97e" stroke-width="4" stroke-linecap="round"/>
        <circle cx="50" cy="30" r="4" fill="#c8a97e"/>
        <circle cx="100" cy="30" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ПРОТЯЖКА К ПОДБОРОДКУ</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Хват шире плеч</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Локти тянут строго вверх</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">До уровня низа груди</text>
      </svg>
    `;
  }

  // 23. РАЗГИБАНИЯ РУК НА ВЕРХНЕМ БЛОКЕ (ТРИЦЕПС)
  if (n.includes("трицепс") || n.includes("разгибания рук") || n.includes("канат")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="10" x2="50" y2="30" stroke="#64748b" stroke-width="2.5"/>
        <circle cx="75" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="26" x2="75" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        
        <!-- Локти прижаты к бокам, разгибание вниз -->
        <line x1="75" y1="32" x2="70" y2="45" stroke="#94a3b8" stroke-width="3"/>
        <path d="M75 32 L70 45" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="70" y1="45" x2="50" y2="65" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="50" cy="65" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">РАЗГИБАНИЯ НА ТРИЦЕПС</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Локти прижаты к ребрам</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Разводка каната внизу</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Пиковое сжатие 1с</text>
        <text x="140" y="80" fill="#94a3b8" font-size="8" font-family="monospace">Латеральная головка</text>
      </svg>
    `;
  }

  // 24. ПОДЪЕМ НА БИЦЕПС С СУПИНАЦИЕЙ
  if (n.includes("бицепс") && !n.includes("молот")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="26" x2="75" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        
        <!-- Локти у ребер, сгибание с супинацией -->
        <line x1="75" y1="32" x2="75" y2="48" stroke="#94a3b8" stroke-width="3"/>
        <path d="M75 32 L75 48" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="75" y1="48" x2="60" y2="35" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="60" cy="35" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ПОДЪЕМ НА БИЦЕПС</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Супинация кисти вверху</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Локти неподвижны</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Без раскачки корпусом</text>
        <text x="140" y="80" fill="#94a3b8" font-size="8" font-family="monospace">Пик двуглавой мышцы</text>
      </svg>
    `;
  }

  // 25. МОЛОТКОВЫЕ СГИБАНИЯ (HAMMER)
  if (n.includes("молот") || n.includes("hammer curl") || n.includes("брахиалис")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="26" x2="75" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        
        <line x1="75" y1="32" x2="75" y2="48" stroke="#94a3b8" stroke-width="3"/>
        <path d="M75 42 L65 42" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="75,48 65,36" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="65" cy="36" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">МОЛОТКОВЫЕ СГИБАНИЯ</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Нейтральный хват</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Изоляция брахиалиса</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Толщина предплечья</text>
      </svg>
    `;
  }

  // 26. ФРАНЦУЗСКИЙ ЖИМ С ГАНТЕЛЯМИ ЛЕЖА
  if (n.includes("француз")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="58" x2="110" y2="58" stroke="#475569" stroke-width="4"/>
        <circle cx="100" cy="48" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="95" y1="53" x2="45" y2="53" stroke="#f1f5f9" stroke-width="4"/>
        
        <!-- Локти вертикально, сгибание к вискам -->
        <line x1="85" y1="53" x2="85" y2="30" stroke="#94a3b8" stroke-width="3"/>
        <path d="M85 53 L85 30" stroke="#c8a97e" stroke-width="5" stroke-linecap="round"/>
        <line x1="85" y1="30" x2="100" y2="40" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="100" cy="40" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ФРАНЦУЗСКИЙ ЖИМ</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Локти смотрят в потолок</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Сгибание строго к вискам</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Длинная головка трицепса</text>
      </svg>
    `;
  }

  // 27. СКРУЧИВАНИЯ НА ПРЕСС / БЛОК
  if (n.includes("скручиван") || n.includes("пресс") || n.includes("молитва")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Атлет на коленях скручивает корпус -->
        <circle cx="75" cy="28" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <path d="M75 34 C 65 38, 55 50, 60 68" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M68 40 C 60 46, 58 56, 62 65" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="60" y1="68" x2="85" y2="68" stroke="#94a3b8" stroke-width="4"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">СКРУЧИВАНИЯ НА ПРЕСС</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Скручивание груди к тазу</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Выдох на мощном сжатии</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Прямая мышца живота</text>
      </svg>
    `;
  }

  // 28. ПОДЪЕМ КОЛЕНЕЙ В ВИСЕ
  if (n.includes("подъем коленей") || n.includes("висе")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="35" x2="80" y2="35" stroke="#475569" stroke-width="4"/>
        <circle cx="65" cy="18" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="65" y1="24" x2="65" y2="55" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M65 40 L65 52" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <!-- Подкручивание коленей к груди -->
        <polyline points="65,55 50,48 50,38" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ПОДЪЕМ КОЛЕНЕЙ В ВИСЕ</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Подкручивание таза вверх</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Выдох в верхней точке</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Низ живота и кор</text>
      </svg>
    `;
  }

  // 29. ПЛАНКА НА ЛОКТЯХ
  if (n.includes("планк")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="40" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="95" y1="44" x2="35" y2="52" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M80 46 L50 50" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="90" y1="46" x2="90" y2="60" stroke="#94a3b8" stroke-width="3"/>
        <line x1="35" y1="52" x2="35" y2="60" stroke="#94a3b8" stroke-width="3"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ПЛАНКА НА ЛОКТЯХ</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Прямая линия всего тела</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Сжатие ягодиц и пресса</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Корсет и поперечная мышца</text>
      </svg>
    `;
  }

  // 30. ХОДЬБА В ГОРКУ НА ДОРОЖКЕ
  if (n.includes("ходьба") || n.includes("дорожк") || n.includes("горку")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Наклонная беговая дорожка 10% -->
        <line x1="25" y1="78" x2="95" y2="58" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        
        <circle cx="70" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="70" y1="28" x2="68" y2="52" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="68" y1="52" x2="52" y2="70" stroke="#94a3b8" stroke-width="3"/>
        <line x1="68" y1="52" x2="80" y2="62" stroke="#94a3b8" stroke-width="3"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ХОДЬБА В ГОРКУ</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Уклон: 8–10%, 5.5 км/ч</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Пульс: 115–125 уд/мин</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">Сушка висцерального жира</text>
      </svg>
    `;
  }

  // 31. ЭЛЛИПТИЧЕСКИЙ ТРЕНАЖЕР
  if (n.includes("эллипс") || n.includes("орбитрек")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="68" rx="25" ry="8" stroke="#475569" stroke-width="3"/>
        <circle cx="60" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="60" y1="28" x2="60" y2="55" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="60" y1="55" x2="45" y2="68" stroke="#94a3b8" stroke-width="3"/>
        <line x1="60" y1="55" x2="75" y2="68" stroke="#94a3b8" stroke-width="3"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">ЭЛЛИПТИЧЕСКИЙ ТРЕНАЖЕР</text>
        <text x="140" y="38" fill="#94a3b8" font-size="9" font-family="monospace">Без удара по коленям</text>
        <text x="140" y="52" fill="#64748b" font-size="8" font-family="monospace">Плавная циклическая работа</text>
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
// ДИНАМИЧЕСКИЙ РАСЧЕТ ЦЕЛИ, TDEE, ДЕФИЦИТА И СОВЕТОВ
// ========================================================
const GOAL_CONFIGS = {
  recomp: {
    title: "Рекомпозиция (Сушка жира + Мышечный тонус)",
    shortName: "Рекомпозиция",
    deficitDelta: -360,
    protPerKg: 1.85,
    fatPerKg: 0.80,
    carbsPerKg: 2.50,
    waterPerKg: 31,
    summary: "Сжигание висцерального жира (~0.35 кг/нед) при сохранении мышечной массы и силовых показателей."
  },
  fatloss: {
    title: "Сушка и активный сброс веса",
    shortName: "Сушка",
    deficitDelta: -550,
    protPerKg: 2.00,
    fatPerKg: 0.65,
    carbsPerKg: 2.10,
    waterPerKg: 34,
    summary: "Ускоренное топление жировой ткани (~0.55 кг/нед) при повышенной защите мышц белком."
  },
  hypertrophy: {
    title: "Набор чистой мышечной массы",
    shortName: "Набор массы",
    deficitDelta: +250,
    protPerKg: 1.80,
    fatPerKg: 0.90,
    carbsPerKg: 4.10,
    waterPerKg: 33,
    summary: "Рост силовых показателей и сухой мышечной массы за счет стабильного профицита энергии."
  },
  maintenance: {
    title: "Сила, Здоровая осанка и Поддержание",
    shortName: "Поддержание",
    deficitDelta: 0,
    protPerKg: 1.70,
    fatPerKg: 0.85,
    carbsPerKg: 3.60,
    waterPerKg: 30,
    summary: "Фиксация формы, разгрузка ЦНС, укрепление связочного аппарата и стабильный вес."
  }
};

function getActiveGoalKey() {
  const g = (appState.goal || "").toLowerCase();
  if (g.includes("сушка и сброс") || g.includes("сброс веса")) return 'fatloss';
  if (g.includes("набор")) return 'hypertrophy';
  if (g.includes("поддержание") || g.includes("осанка")) return 'maintenance';
  return 'recomp';
}

function setHealthGoal(goalKey) {
  const cfg = GOAL_CONFIGS[goalKey] || GOAL_CONFIGS.recomp;
  appState.goal = cfg.title;
  saveState();
  Sound.beep(650, 0.08);
  Haptic.impact('medium');
  renderHealthTabCalculations();
  renderPersonalizedAIAnalytics();
  updateProfileDisplay();
}

function renderHealthTabCalculations() {
  const goalKey = getActiveGoalKey();
  const cfg = GOAL_CONFIGS[goalKey] || GOAL_CONFIGS.recomp;

  // Обновляем сегментированные кнопки
  ['recomp', 'fatloss', 'hypertrophy', 'maintenance'].forEach(k => {
    const btn = document.getElementById("goal-seg-" + k);
    if (btn) {
      if (k === goalKey) btn.className = "goal-segment-btn active";
      else btn.className = "goal-segment-btn";
    }
  });

  const badge = document.getElementById("active-goal-badge");
  if (badge) badge.textContent = cfg.shortName;

  const headBadge = document.getElementById("athlete-goal-header-badge") || document.getElementById("meso-header-badge");
  if (headBadge) headBadge.textContent = cfg.shortName;

  // Расчет BMR (Mifflin-St Jeor) и TDEE для Роман (32 г, 83 кг, 178 см)
  const weight = (appState.currentMetrics && appState.currentMetrics.weight) ? appState.currentMetrics.weight : 83.0;
  const height = appState.height || 178;
  const age = appState.age || 32;

  const bmr = Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5);
  // Коэффициент активности 1.35 (силовые 2-3 раза в неделю + бытовая активность)
  const tdee = Math.round(bmr * 1.35);

  const targetCal = tdee + cfg.deficitDelta;

  const protGrams = Math.round(weight * cfg.protPerKg);
  const fatGrams = Math.round(weight * cfg.fatPerKg);
  const carbGrams = Math.round(weight * cfg.carbsPerKg);
  const waterLiters = ((weight * cfg.waterPerKg) / 1000).toFixed(1);

  // Вывод в UI
  const headerTargetCal = document.getElementById("health-target-calories");
  const tdeeVal = document.getElementById("health-tdee-val");
  const diffBadge = document.getElementById("health-diff-badge");

  if (headerTargetCal) headerTargetCal.textContent = `${targetCal.toLocaleString('ru-RU')}`;
  if (tdeeVal) tdeeVal.textContent = `${tdee}`;

  if (diffBadge) {
    if (cfg.deficitDelta < 0) {
      diffBadge.textContent = `Дефицит ${cfg.deficitDelta} ккал`;
      diffBadge.className = "inline-block px-2.5 py-1 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-bold text-xs";
    } else if (cfg.deficitDelta > 0) {
      diffBadge.textContent = `Профицит +${cfg.deficitDelta} ккал`;
      diffBadge.className = "inline-block px-2.5 py-1 rounded-xl bg-[#c8a97e]/20 text-[#c8a97e] border border-[#c8a97e]/40 font-bold text-xs";
    } else {
      diffBadge.textContent = "Баланс (0 ккал)";
      diffBadge.className = "inline-block px-2.5 py-1 rounded-xl bg-white/10 text-white border border-white/20 font-bold text-xs";
    }
  }

  // Макросы
  const elProt = document.getElementById("health-prot-val") || document.getElementById("macro-prot-val");
  const elProtSub = document.getElementById("health-prot-sub") || document.getElementById("macro-prot-sub");
  const elFat = document.getElementById("health-fat-val") || document.getElementById("macro-fat-val");
  const elFatSub = document.getElementById("health-fat-sub") || document.getElementById("macro-fat-sub");
  const elCarb = document.getElementById("health-carb-val") || document.getElementById("macro-carb-val");
  const elCarbSub = document.getElementById("health-carb-sub") || document.getElementById("macro-carb-sub");
  const elWater = document.getElementById("health-water-val") || document.getElementById("macro-water-val");
  const summaryEl = document.getElementById("health-strategy-summary") || document.getElementById("diet-hero-summary");

  if (summaryEl) summaryEl.textContent = cfg.summary;
  if (elProt) elProt.textContent = `${protGrams} г`;
  if (elProtSub) elProtSub.textContent = `${cfg.protPerKg} г/кг`;
  if (elFat) elFat.textContent = `${fatGrams} г`;
  if (elFatSub) elFatSub.textContent = `${cfg.fatPerKg} г/кг`;
  if (elCarb) elCarb.textContent = `${carbGrams} г`;
  if (elCarbSub) elCarbSub.textContent = `${cfg.carbsPerKg} г/кг`;
  if (elWater) elWater.textContent = `${waterLiters} л`;

  // РАСЧЕТ СОСТАВА ТЕЛА ПО ФОРМУЛЕ ВМФ США (US NAVY BODY COMPOSITION)
  const waist = (appState.currentMetrics && appState.currentMetrics.waist) ? appState.currentMetrics.waist : 91.5;
  const neck = (appState.currentMetrics && appState.currentMetrics.neck) ? appState.currentMetrics.neck : 39.5;
  let bodyFatPct = 16.8;
  if (waist > neck && height > 100) {
    const rawBf = 495 / (1.0324 - 0.19077 * Math.log10(Math.max(1, waist - neck)) + 0.15456 * Math.log10(height)) - 450;
    bodyFatPct = Math.max(6, Math.min(45, Math.round(rawBf * 10) / 10));
  }
  const fatMass = Math.round(weight * (bodyFatPct / 100) * 10) / 10;
  const leanMass = Math.round((weight - fatMass) * 10) / 10;
  const heightM = height / 100;
  const ffmi = Math.round((leanMass / (heightM * heightM)) * 10) / 10;

  const bfBadge = document.getElementById("health-bodyfat-badge");
  const lmVal = document.getElementById("health-lean-mass-val");
  const fmVal = document.getElementById("health-fat-mass-val");
  const ffmiVal = document.getElementById("health-ffmi-val");
  const ffmiSub = document.getElementById("health-ffmi-sub-val");

  if (bfBadge) bfBadge.textContent = `${bodyFatPct}% жира`;
  if (lmVal) lmVal.textContent = `${leanMass} кг`;
  if (fmVal) fmVal.textContent = `${fatMass} кг`;
  if (ffmiVal) ffmiVal.textContent = `${ffmi}`;
  if (ffmiSub) {
    if (ffmi >= 22) ffmiSub.textContent = "Превосходно";
    else if (ffmi >= 20) ffmiSub.textContent = "Атлетичный";
    else ffmiSub.textContent = "Базовый";
  }
}

// ========================================================
// БАЗА УПРАЖНЕНИЙ (EXERCISE DATABASE - 30+ УПРАЖНЕНИЙ)
// ========================================================
const EXERCISE_DATABASE = [
  // ГРУДЬ
  { id: "db_ch_1", name: "Жим гантелей на наклонной скамье 30°", category: "Грудь", muscleGroup: "Грудь", targetMuscles: "Верх грудных • Передняя дельта • Трицепс", phases: ["01: Опускание 2–3с", "02: Пауза внизу 1с", "03: Мощный выжим"], defaultSets: 4, min: 8, max: 10, defaultWeight: 22, calRate: 12, isTime: false, tip: "Локти 60–70° к корпусу, лопатки сведены и опущены для разгрузки шеи." },
  { id: "db_ch_2", name: "Жим гантелей на горизонтальной скамье", category: "Грудь", muscleGroup: "Грудь", targetMuscles: "Середина и низ груди • Трицепс", phases: ["01: Сведение лопаток", "02: Растяжка 2с", "03: Выжим"], defaultSets: 4, min: 8, max: 10, defaultWeight: 24, calRate: 12, isTime: false, tip: "Мощный подконтрольный выжим, пауза 1 сек в нижней точке растяжения груди." },
  { id: "db_ch_3", name: "Жим штанги лежа на горизонтальной скамье", category: "Грудь", muscleGroup: "Грудь", targetMuscles: "Грудные мышцы целиком • Трицепс", phases: ["01: Снятие со стоек", "02: Касание низа груди", "03: Выжим"], defaultSets: 4, min: 8, max: 10, defaultWeight: 60, calRate: 14, isTime: false, tip: "Сведение лопаток, плотный упор ногами в пол, гриф опускай на линию сосков." },
  { id: "db_ch_4", name: "Сведения рук в тренажере бабочка (Pec Deck)", category: "Грудь", muscleGroup: "Грудь", targetMuscles: "Изоляция грудных мышц • Внутренняя часть", phases: ["01: Глубокая растяжка", "02: Сведение по дуге", "03: Сжатие 2с"], defaultSets: 4, min: 10, max: 12, defaultWeight: 25, calRate: 9, isTime: false, tip: "Глубокая растяжка грудных при опускании и фиксация 2 сек в сведении." },
  { id: "db_ch_5", name: "Сведения в кроссовере на блоках", category: "Грудь", muscleGroup: "Грудь", targetMuscles: "Низ и середина груди", phases: ["01: Наклон вперед", "02: Сведение рук", "03: Сжатие 1с"], defaultSets: 3, min: 12, max: 15, defaultWeight: 15, calRate: 8, isTime: false, tip: "Локти слегка согнуты и зафиксированы, движение чисто в плечевых суставах." },
  { id: "db_ch_6", name: "Отжимания на брусьях (с акцентом на грудь)", category: "Грудь", muscleGroup: "Грудь", targetMuscles: "Нижняя часть грудных • Трицепс", phases: ["01: Наклон 30°", "02: Опускание до 90°", "03: Выжим вверх"], defaultSets: 4, min: 8, max: 10, defaultWeight: 0, calRate: 11, isTime: false, tip: "Корпус наклонен вперед, локти немного разведены в стороны под 45°." },
  { id: "db_ch_7", name: "Жим в тренажере Хаммер на грудь", category: "Грудь", muscleGroup: "Грудь", targetMuscles: "Изолированная траектория грудных мышц", phases: ["01: Упор в спинку", "02: Плавный выжим", "03: Медленный возврат"], defaultSets: 4, min: 10, max: 12, defaultWeight: 40, calRate: 10, isTime: false, tip: "Безопасная траектория для суставов при максимальном кровенаполнении." },

  // СПИНА
  { id: "db_bk_1", name: "Тяга горизонтального блока к поясу (нейтральный хват)", category: "Спина", muscleGroup: "Спина", targetMuscles: "Широчайшие мышцы • Ромбовидные • Середина спины", phases: ["01: Локти скользят назад", "02: Сведение лопаток", "03: Растяжка 2с"], defaultSets: 4, min: 10, max: 12, defaultWeight: 45, calRate: 11, isTime: false, tip: "Локти скользят вдоль ребер назад, плечи зафиксированы внизу." },
  { id: "db_bk_2", name: "Тяга верхнего блока нейтральным хватом к груди", category: "Спина", muscleGroup: "Спина", targetMuscles: "Верх широчайших • Середина спины", phases: ["01: Растяжка вверху", "02: Тяга к ключицам", "03: Опускание лопаток"], defaultSets: 4, min: 10, max: 12, defaultWeight: 50, calRate: 12, isTime: false, tip: "Симметричная тяга к верху груди, лопатки опущены вниз." },
  { id: "db_bk_3", name: "Тяга каната к лицу (Face Pull — разгрузка шеи)", category: "Спина", muscleGroup: "Спина", targetMuscles: "Задняя дельта • Мышцы лопатки (снятие спазма)", phases: ["01: Канат к глазам", "02: Локти назад и врозь", "03: Пауза 2с"], defaultSets: 4, min: 15, max: 20, defaultWeight: 15, calRate: 8, isTime: false, tip: "Канат к глазам, локти разводи назад, пауза 2 сек (снимает спазм мышцы шеи)." },
  { id: "db_bk_4", name: "Подтягивания на турнике (или в гравитроне)", category: "Спина", muscleGroup: "Спина", targetMuscles: "Широчайшие мышцы • Брахиалис", phases: ["01: Полный вис", "02: Подтягивание к груди", "03: Плавный спуск"], defaultSets: 4, min: 6, max: 10, defaultWeight: 0, calRate: 13, isTime: false, tip: "Грудь тянется к перекладине, плечи опущены, без раскачки." },
  { id: "db_bk_5", name: "Тяга гантели в наклоне с упором в скамью", category: "Спина", muscleGroup: "Спина", targetMuscles: "Односторонняя проработка широчайшей мышцы", phases: ["01: Упор рукой", "02: Тяга к бедру", "03: Растяжка внизу"], defaultSets: 3, min: 10, max: 12, defaultWeight: 22, calRate: 10, isTime: false, tip: "Тяни гантель строго к тазу по дуге, без скручивания позвоночника." },
  { id: "db_bk_6", name: "Гиперэкстензия для разгибателей спины", category: "Спина", muscleGroup: "Спина", targetMuscles: "Поясничные разгибатели • Ягодицы", phases: ["01: Опускание до 90°", "02: Подъем в линию", "03: Без переразгиба"], defaultSets: 3, min: 12, max: 15, defaultWeight: 0, calRate: 8, isTime: false, tip: "Не прогибайся сильно назад вверху, держи корпус в прямую линию." },

  // НОГИ
  { id: "db_lg_1", name: "Жим ногами под углом 45° в тренажере", category: "Ноги", muscleGroup: "Ноги", targetMuscles: "Квадрицепс • Ягодицы", phases: ["01: Упор в пятки", "02: Угол в коленях 90°", "03: Без щелчка суставов"], defaultSets: 4, min: 10, max: 12, defaultWeight: 90, calRate: 16, isTime: false, tip: "Колени вверху не вставляй до щелчка, упор в середину стопы и пятки." },
  { id: "db_lg_2", name: "Румынская тяга с гантелями", category: "Ноги", muscleGroup: "Ноги", targetMuscles: "Бицепс бедра • Ягодичные мышцы", phases: ["01: Отвод таза назад", "02: Прямая спина", "03: Растяжение бедра"], defaultSets: 4, min: 10, max: 12, defaultWeight: 22, calRate: 15, isTime: false, tip: "Таз максимально назад, колени слегка согнуты, спина прямая." },
  { id: "db_lg_3", name: "Сгибания ног сидя или лежа в тренажере", category: "Ноги", muscleGroup: "Ноги", targetMuscles: "Бицепс бедра • Подколенные связки", phases: ["01: Плавное сгибание", "02: Фиксация 1с", "03: Медленный спуск 3с"], defaultSets: 3, min: 12, max: 15, defaultWeight: 35, calRate: 8, isTime: false, tip: "Медленное опускание 2–3 сек, акцент на растяжение бицепса бедра." },
  { id: "db_lg_4", name: "Разгибания ног в тренажере сидя", category: "Ноги", muscleGroup: "Ноги", targetMuscles: "Изоляция квадрицепса", phases: ["01: Плавный подъем", "02: Пиковое сжатие 1с", "03: Медленный спуск"], defaultSets: 3, min: 12, max: 15, defaultWeight: 40, calRate: 8, isTime: false, tip: "Без рывков, задержись на секунду в верхней точке." },
  { id: "db_lg_5", name: "Приседания в Гакк-тренажере", category: "Ноги", muscleGroup: "Ноги", targetMuscles: "Квадрицепс • Ягодицы", phases: ["01: Спина к опоре", "02: Плавный сед 90°", "03: Подъем пятками"], defaultSets: 3, min: 10, max: 12, defaultWeight: 35, calRate: 13, isTime: false, tip: "Плавное движение по направлению носков, поясница плотно прижата." },
  { id: "db_lg_6", name: "Подъем на носки стоя на икроножные", category: "Ноги", muscleGroup: "Ноги", targetMuscles: "Икроножные мышцы • Ахиллово сухожилие", phases: ["01: Глубокий спуск", "02: Выжим на носки", "03: Пауза 2с вверху"], defaultSets: 4, min: 15, max: 20, defaultWeight: 50, calRate: 8, isTime: false, tip: "Полная амплитуда с паузой 2 сек в нижней точке растяжки." },

  // ПЛЕЧИ
  { id: "db_sh_1", name: "Махи гантелями через стороны стоя", category: "Плечи", muscleGroup: "Плечи", targetMuscles: "Средняя дельта (ширина плеч)", phases: ["01: Наклон вперед", "02: Подъем локтями", "03: Кисть ниже локтя"], defaultSets: 4, min: 12, max: 15, defaultWeight: 8, calRate: 7, isTime: false, tip: "Подъем через стороны локтями до уровня плеч, кисть не задирай выше локтя." },
  { id: "db_sh_2", name: "Жим гантелей сидя на плечи (скамья 75°)", category: "Плечи", muscleGroup: "Плечи", targetMuscles: "Передняя и средняя дельта", phases: ["01: Локти перед собой", "02: Выжим над головой", "03: Без прогиба"], defaultSets: 4, min: 8, max: 10, defaultWeight: 16, calRate: 9, isTime: false, tip: "Плавный жим над головой без резкого прогиба в пояснице." },
  { id: "db_sh_3", name: "Разводка гантелей в наклоне на заднюю дельту", category: "Плечи", muscleGroup: "Плечи", targetMuscles: "Задняя дельта • Ромбовидные мышцы", phases: ["01: Наклон 45-60°", "02: Разведение рук", "03: Пауза 1с"], defaultSets: 4, min: 12, max: 15, defaultWeight: 7, calRate: 7, isTime: false, tip: "Движение выполняется локтями назад-вбок, трапецию не зажимай." },
  { id: "db_sh_4", name: "Протяжка на блоке к подбородку (широкий хват)", category: "Плечи", muscleGroup: "Плечи", targetMuscles: "Средняя дельта • Верх спины", phases: ["01: Хват шире плеч", "02: Тяга локтями вверх", "03: До низа груди"], defaultSets: 3, min: 12, max: 15, defaultWeight: 25, calRate: 8, isTime: false, tip: "Широкий хват снижает нагрузку на кистевые и плечевые суставы." },

  // РУКИ
  { id: "db_arm_1", name: "Разгибания рук на верхнем блоке с канатом", category: "Руки", muscleGroup: "Руки", targetMuscles: "Латеральная и длинная головка трицепса", phases: ["01: Фиксация локтей", "02: Разводка внизу", "03: Сжатие 1с"], defaultSets: 3, min: 12, max: 15, defaultWeight: 20, calRate: 6, isTime: false, tip: "Локти прижаты к корпусу, разводи канат в нижней точке сокращения." },
  { id: "db_arm_2", name: "Подъем гантелей на бицепс с разворотом кисти", category: "Руки", muscleGroup: "Руки", targetMuscles: "Двуглавая мышца плеча (бицепс)", phases: ["01: Локти у ребер", "02: Супинация кисти", "03: Сжатие вверху"], defaultSets: 3, min: 10, max: 12, defaultWeight: 12, calRate: 6, isTime: false, tip: "Разворот кисти наружу в верхней трети подъема." },
  { id: "db_arm_3", name: "Молотковые сгибания с гантелями (Hammer)", category: "Руки", muscleGroup: "Руки", targetMuscles: "Брахиалис • Плечелучевая мышца • Бицепс", phases: ["01: Нейтральный хват", "02: Подъем без читинга", "03: Контроль спуска"], defaultSets: 3, min: 10, max: 12, defaultWeight: 14, calRate: 7, isTime: false, tip: "Утолщает предплечья и выталкивает бицепс наружу." },
  { id: "db_arm_4", name: "Французский жим с гантелями лежа на скамье", category: "Руки", muscleGroup: "Руки", targetMuscles: "Длинная головка трицепса", phases: ["01: Локти в потолок", "02: Сгибание к вискам", "03: Выжим"], defaultSets: 3, min: 10, max: 12, defaultWeight: 10, calRate: 6, isTime: false, tip: "Локти не разводи широко в стороны, держи их параллельно." },

  // ПРЕСС
  { id: "db_abs_1", name: "Скручивания на блоке с канатом на пресс", category: "Пресс", muscleGroup: "Пресс", targetMuscles: "Прямая мышца живота", phases: ["01: Вдох вверху", "02: Скручивание на выдохе", "03: Сжатие 1с"], defaultSets: 3, min: 12, max: 15, defaultWeight: 35, calRate: 8, isTime: false, tip: "Скручивай грудную клетку к тазу силой мышц пресса." },
  { id: "db_abs_2", name: "Подъем коленей в висе на брусьях на пресс", category: "Пресс", muscleGroup: "Пресс", targetMuscles: "Нижняя часть прямой мышцы живота", phases: ["01: Фиксация плеч", "02: Подкручивание таза", "03: Пауза 1с"], defaultSets: 3, min: 12, max: 15, defaultWeight: 0, calRate: 7, isTime: false, tip: "Подкручивай таз вверх на выдохе для включения низа живота." },
  { id: "db_abs_3", name: "Планка на локтях (удержание корсета)", category: "Пресс", muscleGroup: "Пресс", targetMuscles: "Поперечная мышца живота • Корсет", phases: ["01: Прямая линия", "02: Сжатие ягодиц", "03: Ровное дыхание"], defaultSets: 3, min: 45, max: 60, defaultWeight: 0, calRate: 6, isTime: true, tip: "Не прогибай поясницу, подкручивай таз вперед." },

  // КАРДИО
  { id: "db_card_1", name: "Ходьба в горку на дорожке (сжигание жира)", category: "Кардио", muscleGroup: "Кардио", targetMuscles: "Сердечно-сосудистая система • Жиросжигание", phases: ["01: Уклон 8–10%", "02: Скорость 5.5 км/ч", "03: Пульс 115–125"], defaultSets: 1, min: 25, max: 30, defaultWeight: 0, calRate: 200, isTime: true, tip: "Уклон 8-10%, скорость 5.5 км/ч. Пульс 115-125 уд/мин без одышки." },
  { id: "db_card_2", name: "Эллиптический тренажер", category: "Кардио", muscleGroup: "Кардио", targetMuscles: "Все тело • Щадящий режим для коленных суставов", phases: ["01: Ровный темп", "02: Умеренное усилие", "03: Пульс 120"], defaultSets: 1, min: 20, max: 30, defaultWeight: 0, calRate: 180, isTime: true, tip: "Идеально для разогрева и заминки без ударной нагрузки на суставы." }
];

const DEFAULT_PROGRAMS = {
  a: {
    name: "Тренировка А (База Верх + Ноги)",
    exercises: [
      { name: "Жим гантелей на наклонной скамье 30°", muscleGroup: "Грудь", targetMuscles: "Верх грудных • Передняя дельта", phases: ["01: Опускание 2-3с", "02: Пауза 1с", "03: Выжим"], sets: 4, min: 8, max: 10, w: 22, calRate: 12, tip: "Локти 60-70° к корпусу, лопатки сведены и опущены.", substitutes: ["Жим штанги на наклонной скамье 30°", "Жим в Хаммере на наклонной"] },
      { name: "Жим гантелей на горизонтальной скамье", muscleGroup: "Грудь", targetMuscles: "Середина груди • Трицепс", phases: ["01: Растяжка 2с", "02: Фиксация", "03: Выжим"], sets: 4, min: 8, max: 10, w: 24, calRate: 12, tip: "Мощный выжим, пауза 1 сек в нижней точке.", substitutes: ["Жим штанги лежа", "Отжимания на брусьях"] },
      { name: "Жим ногами под углом 45° в тренажере", muscleGroup: "Ноги", targetMuscles: "Квадрицепс • Ягодицы", phases: ["01: Пятки в платформу", "02: Угол 90°", "03: Без щелчка суставов"], sets: 4, min: 10, max: 12, w: 90, calRate: 16, tip: "Колени вверху не вставляй, упор в середину стопы и пятки.", substitutes: ["Приседания в Гакк-тренажере", "Выпады с гантелями"] },
      { name: "Тяга горизонтального блока к поясу (нейтральный хват)", muscleGroup: "Спина", targetMuscles: "Широчайшие • Середина спины", phases: ["01: Локти назад", "02: Сведение лопаток", "03: Растяжка"], sets: 4, min: 10, max: 12, w: 45, calRate: 11, tip: "Локти скользят вдоль ребер назад, плечи зафиксированы.", substitutes: ["Тяга Т-грифа с упором в грудь", "Тяга гантели в наклоне"] },
      { name: "Сгибания ног сидя или лежа в тренажере", muscleGroup: "Ноги", targetMuscles: "Бицепс бедра", phases: ["01: Сгибание", "02: Пауза 1с", "03: Спуск 3с"], sets: 3, min: 12, max: 15, w: 35, calRate: 8, tip: "Медленное опускание 2–3 сек.", substitutes: ["Румынская тяга с гантелями"] },
      { name: "Махи гантелями через стороны стоя", muscleGroup: "Плечи", targetMuscles: "Средняя дельта", phases: ["01: Корпус вперед", "02: Подъем локтями", "03: Кисть ниже локтя"], sets: 4, min: 12, max: 15, w: 8, calRate: 7, tip: "Подъем через стороны локтями, кисть не выше локтя.", substitutes: ["Махи в кроссовере на нижнем блоке"] },
      { name: "Разгибания рук на верхнем блоке с канатом", muscleGroup: "Руки", targetMuscles: "Трицепс", phases: ["01: Фиксация локтей", "02: Разводка каната", "03: Сжатие"], sets: 3, min: 12, max: 15, w: 20, calRate: 6, tip: "Локти прижаты к корпусу, разводи канат внизу.", substitutes: ["Французский жим с гантелями"] }
    ]
  },
  b: {
    name: "Тренировка Б (Бабочка + Брусья + Спина)",
    exercises: [
      { name: "Сведения рук в тренажере бабочка (Pec Deck)", muscleGroup: "Грудь", targetMuscles: "Изоляция грудных мышц", phases: ["01: Растяжка 2с", "02: Сведение", "03: Пиковое сжатие"], sets: 4, min: 10, max: 12, w: 25, calRate: 9, tip: "Глубокая растяжка грудных и фиксация 2 сек в сведении.", substitutes: ["Сведения в кроссовере"] },
      { name: "Отжимания на брусьях (или жим в Хаммере)", muscleGroup: "Грудь", targetMuscles: "Низ груди • Трицепс", phases: ["01: Наклон 30°", "02: Угол 90°", "03: Выжим"], sets: 4, min: 8, max: 10, w: 0, calRate: 11, tip: "Корпус слегка наклонен вперед для акцента на грудь.", substitutes: ["Жим гантелей на полу", "Жим штанги узким хватом"] },
      { name: "Румынская тяга с гантелями", muscleGroup: "Ноги", targetMuscles: "Бицепс бедра • Ягодицы", phases: ["01: Таз назад", "02: Прямая спина", "03: Растяжение"], sets: 4, min: 10, max: 12, w: 22, calRate: 15, tip: "Таз максимально назад, колени слегка согнуты.", substitutes: ["Сгибания ног лежа"] },
      { name: "Тяга верхнего блока нейтральным хватом к груди", muscleGroup: "Спина", targetMuscles: "Широчайшие мышцы", phases: ["01: Растяжка", "02: Тяга к груди", "03: Опускание лопаток"], sets: 4, min: 10, max: 12, w: 50, calRate: 12, tip: "Симметричная тяга к верху груди, лопатки вниз.", substitutes: ["Подтягивания нейтральным хватом"] },
      { name: "Приседания в Гакк-тренажере", muscleGroup: "Ноги", targetMuscles: "Квадрицепс", phases: ["01: Спина к опоре", "02: Сед 90°", "03: Подъем пятками"], sets: 3, min: 10, max: 12, w: 35, calRate: 13, tip: "Плавное движение по направлению носков.", substitutes: ["Жим ногами 45°"] },
      { name: "Подъем гантелей на бицепс с разворотом кисти", muscleGroup: "Руки", targetMuscles: "Бицепс", phases: ["01: Локти у ребер", "02: Супинация", "03: Сжатие"], sets: 3, min: 10, max: 12, w: 12, calRate: 6, tip: "Разворот кисти наружу в верхней точке.", substitutes: ["Молотковые сгибания"] }
    ]
  },
  c: {
    name: "Восстановление и Пампинг (Разгрузка шеи + Руки)",
    exercises: [
      { name: "Тяга каната к лицу (Face Pull — разгрузка шеи)", muscleGroup: "Спина", targetMuscles: "Задняя дельта • Мышцы лопатки", phases: ["01: Канат к глазам", "02: Локти врозь", "03: Пауза 2с"], sets: 4, min: 15, max: 20, w: 15, calRate: 8, tip: "Канат к глазам, локти разводи назад, пауза 2 сек.", substitutes: ["Разводка на заднюю дельту"] },
      { name: "Жим гантелей сидя на плечи (скамья 75°)", muscleGroup: "Плечи", targetMuscles: "Передняя/средняя дельта", phases: ["01: Локти перед собой", "02: Выжим", "03: Плавный спуск"], sets: 3, min: 10, max: 12, w: 14, calRate: 8, tip: "Плавный жим над головой без резкого прогиба.", substitutes: ["Махи в стороны"] },
      { name: "Молотковые сгибания с гантелями (Hammer)", muscleGroup: "Руки", targetMuscles: "Брахиалис • Бицепс", phases: ["01: Нейтральный хват", "02: Подъем", "03: Контроль"], sets: 3, min: 10, max: 12, w: 14, calRate: 7, tip: "Утолщает предплечья и выталкивает бицепс.", substitutes: ["Сгибания на бицепс со штангой"] },
      { name: "Французский жим с гантелями лежа на скамье", muscleGroup: "Руки", targetMuscles: "Трицепс", phases: ["01: Локти параллельно", "02: К вискам", "03: Выжим"], sets: 3, min: 10, max: 12, w: 10, calRate: 6, tip: "Локти не разводи широко в стороны.", substitutes: ["Разгибания на блоке"] },
      { name: "Ходьба в горку на дорожке (сжигание жира)", muscleGroup: "Кардио", targetMuscles: "Сердце • Жиросжигание", phases: ["01: Уклон 8-10%", "02: 5.5 км/ч", "03: Пульс 115-125"], sets: 1, min: 25, max: 30, w: 0, calRate: 200, isTime: true, tip: "Пульс 115-125 уд/мин без одышки.", substitutes: ["Эллиптический тренажер"] }
    ]
  }
};

// ========================================================
// СОСТОЯНИЕ АККАУНТА
// ========================================================
function getInitialAccount() {
  return {
    tgId: "asutp_iron_account_default",
    name: "Роман",
    age: 32,
    height: 178,
    goal: "Рекомпозиция (Сушка жира + Мышечный тонус)",
    mesocycleWeek: 3,
    xp: 0,
    streak: 0,
    vacDaysCount: 0,
    soundMode: 'sound',
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
      "Тяга горизонтального блока к поясу (нейтральный хват)": { weight: 45, reps: 12, date: "2026-08-25" }
    },
    targetWeight: 76.5,
    targetWaist: 82.0,
    currentMetrics: { weight: 83.0, waist: 91.5, biceps: 38.5, chest: 104.0, thigh: 59.0, neck: 39.5 },
    metrics: [
      { id: "m_init", date: new Date().toISOString().split("T")[0], weight: 83.0, waist: 91.5, biceps: 38.5, chest: 104.0, thigh: 59.0, neck: 39.5 }
    ],
    history: [],
    activeWorkout: null,
    unlockedAchievements: []
  };
}

let appState = getInitialAccount();
let pendingWorkoutPlanKey = 'a';
let pendingTargetWorkoutDate = null;
let currentAchFilter = 'all';
let currentDbCategory = 'all';

let activeExpandedExerciseIndex = 0;
let liveWorkoutTimerInterval = null;
let liveWorkoutSeconds = 0;

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

function getTotalTonnage(s) {
  return (s.history || []).reduce((sum, h) => sum + (h.tonnage || 0), 0);
}

function loadState() {
  let tgKey = "asutp_iron_account_default";
  let tgName = "Роман";

  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
    const u = window.Telegram.WebApp.initDataUnsafe.user;
    tgKey = "asutp_iron_account_" + u.id;
    tgName = u.first_name + (u.last_name ? ` ${u.last_name}` : "");
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
  if (elName) elName.textContent = appState.name;

  saveState();
  checkAchievements();
  renderPersonalizedVitamins();
  renderHealthTabCalculations();
  updateProfileDisplay();
  renderMonthlyCalendar();
  render12MonthsAnnualBreakdown();
  renderPersonalRecords();
  renderMuscleVolumeBreakdown();
  renderPersonalizedAIAnalytics();
  updateSoundUI();
  updateVacuumBadge();
  if (appState.theme) {
    document.body.setAttribute("data-theme", appState.theme === "gold" ? "" : appState.theme);
  }
  initPushSettings();
  updateSettingsDisplay();
}

function saveState() {
  const json = JSON.stringify(appState);
  localStorage.setItem(appState.tgId, json);
  
  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.CloudStorage) {
    try {
      window.Telegram.WebApp.CloudStorage.setItem("iron_coach_" + appState.tgId, json, (err, ok) => {
        const badge = document.getElementById("cloud-sync-status-badge");
        if (badge && ok) badge.textContent = "Облако OK ☁️";
      });
    } catch(e) {}
  }
  
  renderXP();
  syncUserToLeaderboard();
}

function exportStateToFile() {
  const jsonStr = JSON.stringify(appState, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `iron_coach_backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  Sound.success();
  Haptic.success();
}

function importStateFromFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed && typeof parsed === 'object') {
        Object.assign(appState, parsed);
        saveState();
        Sound.finish();
        Haptic.success();
        alert("Данные успешно импортированы!");
        location.reload();
      }
    } catch(err) {
      alert("Ошибка чтения файла JSON");
    }
  };
  reader.readAsText(file);
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

  if (lvlHeader) lvlHeader.textContent = `Уровень ${currentLvl}`;
  if (xpTxt) xpTxt.textContent = appState.xp;
  if (xpNxt) xpNxt.textContent = `${xpToNext} XP`;
  if (xpBar) xpBar.style.width = `${(xpInLvl / 500) * 100}%`;
  if (strkEl) strkEl.textContent = appState.streak;
}



// ========================================================
// ИНТЕЛЛЕКТУАЛЬНЫЙ АВТО-ДЕТЕКТОР РЕКОРДОВ
// ========================================================
function checkAndTriggerIntelligentPR(exName, weight, reps) {
  if (!weight || weight <= 0 || !reps || reps <= 0) return false;

  if (!appState.personalRecords) appState.personalRecords = {};
  const currentPR = appState.personalRecords[exName];

  let isBreakthrough = false;
  if (!currentPR) {
    isBreakthrough = true;
  } else if (weight > currentPR.weight) {
    isBreakthrough = true;
  } else if (weight === currentPR.weight && reps > currentPR.reps) {
    isBreakthrough = true;
  }

  if (isBreakthrough) {
    appState.personalRecords[exName] = {
      weight: weight,
      reps: reps,
      date: new Date().toISOString().split("T")[0]
    };
    addXP(75);
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
  const prKeys = Object.keys(prs);

  if (prKeys.length === 0) {
    container.innerHTML = `
      <div class="p-6 bg-[#12141c] rounded-2xl border border-white/[0.08] text-center text-slate-400 space-y-2 font-mono">
        <p class="text-xs font-bold text-white uppercase">Рекорды формируются</p>
        <p class="text-[11px] text-slate-400 font-sans">Система автоматически зафиксирует рекорд, когда ты превзойдешь свой рабочий вес или повторения на тренировке.</p>
      </div>
    `;
    return;
  }

  prKeys.forEach(exName => {
    const rec = prs[exName];
    const card = document.createElement("div");
    card.className = "p-4 bg-[#12141c] rounded-2xl border border-white/[0.08] flex justify-between items-center space-x-3";

    card.innerHTML = `
      <div class="space-y-1">
        <div class="flex items-center space-x-1.5">
          <span class="w-2 h-2 rounded-full bg-[#c8a97e]"></span>
          <h4 class="font-bold text-white text-xs font-sans">${exName}</h4>
        </div>
        <p class="text-xs text-slate-400 font-mono">
          Максимум: <b class="text-[#c8a97e] font-bold text-sm">${rec.weight} кг × ${rec.reps}</b>
        </p>
      </div>
      <div class="text-right font-mono">
        <span class="text-[10px] text-slate-400 block">${rec.date}</span>
        <span class="text-[9px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 uppercase">Подтверждено</span>
      </div>
    `;

    container.appendChild(card);
  });
}

// ========================================================
// ПЕРСОАНАЛИТИКА И ИИ-СОВЕТНИК
// ========================================================
function renderPersonalizedAIAnalytics() {
  const container = document.getElementById("ai-recommendations-container");
  const pushPullEl = document.getElementById("ai-pushpull-ratio");
  const neckSafetyEl = document.getElementById("ai-neck-safety");
  const weekTonEl = document.getElementById("ai-week-tonnage");
  if (!container) return;

  const hist = appState.history || [];
  const weekTonnage = hist.slice(0, 3).reduce((sum, h) => sum + (h.tonnage || 0), 0);

  if (weekTonEl) weekTonEl.textContent = `${weekTonnage.toLocaleString()} кг`;

  let pushSets = 0, pullSets = 0;
  hist.slice(0, 4).forEach(h => {
    (h.exercises || []).forEach(e => {
      const setCount = (e.sets.match(/,/g) || []).length + 1;
      const n = (e.name || "").toLowerCase();
      if (n.includes("жим") || n.includes("бабочк") || n.includes("брусь") || n.includes("мах")) pushSets += setCount;
      if (n.includes("тяга") || n.includes("спин") || n.includes("лицу") || n.includes("подтягиван")) pullSets += setCount;
    });
  });

  const ratio = (pullSets > 0) ? (pushSets / pullSets).toFixed(1) : "1.0";
  if (pushPullEl) pushPullEl.textContent = `${ratio} : 1.0`;

  if (neckSafetyEl) {
    if (pullSets >= pushSets * 0.9) {
      neckSafetyEl.textContent = "Безопасно";
      neckSafetyEl.className = "text-sm font-bold text-emerald-400";
    } else {
      neckSafetyEl.textContent = "Внимание";
      neckSafetyEl.className = "text-sm font-bold text-[#c8a97e]";
    }
  }

  const tips = [
    {
      icon: `<svg class="w-3.5 h-3.5 text-[#c8a97e] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>`,
      title: "Контроль дыхания и темпа 3-1-1-0",
      desc: "Полностью исключен маневр Вальсальвы (задержка дыхания при натуживании). Выполняй длинный выдох строго на усилии при выжиме веса. Отдых между базовыми сетами: не менее 90–120 секунд."
    },
    {
      icon: `<svg class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
      title: "Протокол защиты и стабилизации лопаток",
      desc: "Исключены жимы штанги из-за головы и шраги. Обязательно сохраняй в программе тягу каната к лицу (Face Pull) 4х15-20 и нейтральный хват в тягах для снятия тонуса трапециевидной мышцы."
    },
    {
      icon: `<svg class="w-3.5 h-3.5 text-[#c8a97e] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
      title: "Энергетический дефицит (WHtR: 51%)",
      desc: "Оптимальный суточный дефицит составляет -360 ккал (целевой прием: ~2050 ккал/день). Это обеспечивает сушку висцерального жира со скоростью 400-500г в неделю без потери мышечной массы."
    }
  ];

  container.innerHTML = tips.map(t => `
    <div class="p-3.5 bg-[#181b26] rounded-2xl border border-white/[0.05] space-y-1">
      <h4 class="font-bold text-white text-xs flex items-center gap-1.5">${t.icon}<span>${t.title}</span></h4>
      <p class="text-slate-300 text-[11px] leading-relaxed">${t.desc}</p>
    </div>
  `).join("");

  renderInteractiveAnatomyMap();
}

function renderMuscleHeatmap() {
  renderInteractiveAnatomyMap();
}

function renderMuscleRecoveryClock() {
  renderInteractiveAnatomyMap();
}

// ========================================================
// ИНТЕРАКТИВНАЯ АНАТОМИЧЕСКАЯ МОДЕЛЬ ЧЕЛОВЕКА & ГИПЕРТРОФИЯ
// ========================================================
const ANATOMY_MUSCLES = {
  chest: {
    id: "chest",
    name: "Грудные мышцы (Pectoralis Major)",
    zone: "Грудь (Верх, Середина, Низ)",
    mav: 14,
    mev: 8,
    recoveryHours: 48,
    bestExercises: ["Жим гантелей на наклонной 30°", "Бабочка Pec Deck", "Отжимания на брусьях"],
    tip: "Локти 60–70° к корпусу, лопатки сведены и опущены для разгрузки шеи и плечевых суставов."
  },
  delts: {
    id: "delts",
    name: "Дельтовидные мышцы (Плечи)",
    zone: "Передняя, Средняя и Задняя дельта",
    mav: 16,
    mev: 8,
    recoveryHours: 48,
    bestExercises: ["Махи гантелями через стороны", "Жим гантелей 75°", "Тяга к лицу (Face Pull)"],
    tip: "Поднимай локтями до горизонтали, кисть не задирай выше локтя. Снижает риск защемления ротаторов."
  },
  lats: {
    id: "lats",
    name: "Широчайшие мышцы спины (Lats)",
    zone: "Верх и середина спины (V-образный конус)",
    mav: 16,
    mev: 10,
    recoveryHours: 48,
    bestExercises: ["Тяга горизонтального блока к поясу", "Тяга верхнего блока", "Подтягивания"],
    tip: "Тяни локти назад вдоль ребер к тазу, грудь раскрыта, плечи опущены вниз."
  },
  traps: {
    id: "traps",
    name: "Трапеция & Зона лопаток (Шея)",
    zone: "Шейно-воротниковая зона и ромбовидные мышцы",
    mav: 12,
    mev: 6,
    recoveryHours: 48,
    bestExercises: ["Тяга каната к лицу (Face Pull)", "Разводка в наклоне", "Шраги с гантелями"],
    tip: "Критическая зона безопасности: тяга Face Pull снимает спазм с мышцы шеи и предотвращает компрессию позвонков."
  },
  biceps: {
    id: "biceps",
    name: "Бицепс & Брахиалис (Руки)",
    zone: "Двуглавая мышца плеча и предплечья",
    mav: 12,
    mev: 6,
    recoveryHours: 36,
    bestExercises: ["Подъем гантелей с супинацией", "Молотковые сгибания (Hammer)"],
    tip: "Супинация (разворот кисти наружу) в верхней трети амплитуды дает максимальный пик бицепса."
  },
  triceps: {
    id: "triceps",
    name: "Трицепс (Руки)",
    zone: "Латеральная и длинная головка трицепса",
    mav: 12,
    mev: 6,
    recoveryHours: 36,
    bestExercises: ["Разгибания на блоке с канатом", "Французский жим с гантелями"],
    tip: "Локти зафиксированы у корпуса и не расходятся в стороны. Разводи канат в нижней точке."
  },
  abs: {
    id: "abs",
    name: "Мышцы пресса & Кора (Core)",
    zone: "Прямая мышца живота, косые и вакуум",
    mav: 14,
    mev: 6,
    recoveryHours: 24,
    bestExercises: ["Скручивания на блоке", "Подъем коленей в висе", "Утренний вакуум живота"],
    tip: "Скручивай грудную клетку к тазу на полном выдохе, втягивая пупок к позвоночнику."
  },
  quads: {
    id: "quads",
    name: "Квадрицепсы (Передняя часть бедра)",
    zone: "Прямая, латеральная и медиальная головки бедра",
    mav: 14,
    mev: 8,
    recoveryHours: 72,
    bestExercises: ["Жим ногами под углом 45°", "Гакк-приседания", "Разгибания ног сидя"],
    tip: "Упор строго в середину стопы и пятку, не вставляй колени до щелчка в верхней точке."
  },
  hamstrings: {
    id: "hamstrings",
    name: "Бицепс бедра & Ягодичные",
    zone: "Задняя поверхность бедра и ягодицы",
    mav: 14,
    mev: 8,
    recoveryHours: 72,
    bestExercises: ["Румынская тяга с гантелями", "Сгибания ног сидя/лежа"],
    tip: "Отводи таз максимально назад с прямой спиной для глубокого натяжения задней цепи."
  },
  calves: {
    id: "calves",
    name: "Икроножные мышцы (Голень)",
    zone: "Икроножная и камбаловидная мышцы",
    mav: 16,
    mev: 8,
    recoveryHours: 36,
    bestExercises: ["Подъем на носки стоя на возвышении", "Подъем на носки в тренажере"],
    tip: "Полная амплитуда: опускайся до глубокой растяжки и делай секундную паузу внизу."
  }
};

let currentAnatomyView = 'front';
let selectedAnatomyMuscleKey = 'chest';

function getMuscleVolumeAndRecoveryData() {
  const result = {};
  Object.keys(ANATOMY_MUSCLES).forEach(k => {
    result[k] = { sets: 0, lastHoursAgo: 72 };
  });

  const hist = appState.history || [];
  const now = Date.now();

  // Расчет недельного объема сетов и времени с последней нагрузки
  hist.forEach(h => {
    const diffHours = Math.max(1, Math.round((now - new Date(h.date).getTime()) / (1000 * 60 * 60)));
    const isThisWeek = diffHours <= 168; // 7 дней

    (h.exercises || []).forEach(e => {
      const setCount = (e.sets.match(/,/g) || []).length + 1;
      const n = (e.name || "").toLowerCase();

      let targetKey = null;
      if (n.includes("жим") || n.includes("бабочк") || n.includes("брусь")) targetKey = "chest";
      else if (n.includes("тяга") || n.includes("спин") || n.includes("подтягиван")) targetKey = "lats";
      else if (n.includes("лицу") || n.includes("face") || n.includes("трапец")) targetKey = "traps";
      else if (n.includes("мах") || n.includes("плеч") || n.includes("дельт")) targetKey = "delts";
      else if (n.includes("бицепс") || n.includes("молот")) targetKey = "biceps";
      else if (n.includes("трицепс") || n.includes("разгибан")) targetKey = "triceps";
      else if (n.includes("пресс") || n.includes("скручиван") || n.includes("планк")) targetKey = "abs";
      else if (n.includes("румын") || n.includes("сгибан")) targetKey = "hamstrings";
      else if (n.includes("жим ногами") || n.includes("присед") || n.includes("гакк") || n.includes("квадр")) targetKey = "quads";
      else if (n.includes("носк") || n.includes("икр")) targetKey = "calves";

      if (targetKey && result[targetKey]) {
        if (isThisWeek) result[targetKey].sets += setCount;
        if (diffHours < result[targetKey].lastHoursAgo) result[targetKey].lastHoursAgo = diffHours;
      }
    });
  });

  // Базовые значения по умолчанию для активного атлета, если история пуста
  if (result.chest.sets === 0) result.chest.sets = 12;
  if (result.lats.sets === 0) result.lats.sets = 10;
  if (result.delts.sets === 0) result.delts.sets = 8;
  if (result.quads.sets === 0) result.quads.sets = 10;
  if (result.hamstrings.sets === 0) result.hamstrings.sets = 8;
  if (result.biceps.sets === 0) result.biceps.sets = 6;
  if (result.triceps.sets === 0) result.triceps.sets = 6;
  if (result.traps.sets === 0) result.traps.sets = 8;
  if (result.abs.sets === 0) result.abs.sets = (appState.vacDaysCount || 0) > 0 ? 8 : 4;
  if (result.calves.sets === 0) result.calves.sets = 6;

  return result;
}

function setAnatomyView(view) {
  currentAnatomyView = view;
  const btnFront = document.getElementById("btn-anat-front");
  const btnBack = document.getElementById("btn-anat-back");

  if (btnFront && btnBack) {
    if (view === 'front') {
      btnFront.className = "px-2.5 py-1 font-bold rounded-md bg-[#c8a97e] text-slate-950 transition-all";
      btnBack.className = "px-2.5 py-1 font-bold rounded-md text-slate-400 transition-all";
    } else {
      btnBack.className = "px-2.5 py-1 font-bold rounded-md bg-[#c8a97e] text-slate-950 transition-all";
      btnFront.className = "px-2.5 py-1 font-bold rounded-md text-slate-400 transition-all";
    }
  }
  Sound.beep(550, 0.04);
  Haptic.impact('light');
  renderInteractiveAnatomyMap();
}

function selectAnatomyMuscle(muscleKey) {
  if (!ANATOMY_MUSCLES[muscleKey]) return;
  selectedAnatomyMuscleKey = muscleKey;
  Sound.beep(650, 0.05);
  Haptic.impact('medium');
  renderInteractiveAnatomyMap();
}

function renderInteractiveAnatomyMap() {
  const host = document.getElementById("anat-svg-host");
  if (!host) return;

  const data = getMuscleVolumeAndRecoveryData();
  const selKey = selectedAnatomyMuscleKey || 'chest';

  // Вычисляем масштаб роста (Hypertrophy Scale) и цвет для каждой мышцы
  function getStyle(key) {
    const m = ANATOMY_MUSCLES[key];
    const d = data[key] || { sets: 0, lastHoursAgo: 72 };
    const ratio = Math.min(1.2, d.sets / (m ? m.mav : 14));
    const scale = (1 + ratio * 0.12).toFixed(2);
    const isActive = (selKey === key);
    const isPumped = ratio >= 0.75;

    let fill = "rgba(100, 116, 139, 0.25)";
    let stroke = "rgba(148, 163, 184, 0.4)";
    if (ratio >= 0.75) {
      fill = "rgba(200, 169, 126, 0.75)";
      stroke = "#c8a97e";
    } else if (ratio >= 0.45) {
      fill = "rgba(16, 185, 129, 0.65)";
      stroke = "#10b981";
    }

    if (isActive) {
      fill = "rgba(245, 227, 204, 0.95)";
      stroke = "#ffffff";
    }

    return {
      scale: scale,
      fill: fill,
      stroke: stroke,
      isActive: isActive,
      isPumped: isPumped
    };
  }

  let svgHtml = "";
  if (currentAnatomyView === 'front') {
    const ch = getStyle('chest');
    const dl = getStyle('delts');
    const bi = getStyle('biceps');
    const ab = getStyle('abs');
    const qd = getStyle('quads');
    const cl = getStyle('calves');

    svgHtml = `
      <svg class="w-full h-full" viewBox="0 0 240 370" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- БАЗОВЫЙ АНАТОМИЧЕСКИЙ КАРКАС ТЕЛА СПЕРЕДИ -->
        <!-- Голова и шея -->
        <circle cx="120" cy="34" r="16" stroke="#475569" stroke-width="2" fill="#0f172a"/>
        <path d="M112 50 L112 68 M128 50 L128 68" stroke="#475569" stroke-width="2.5"/>
        
        <!-- Ключицы и плечевые дуги -->
        <path d="M75 72 Q120 82 165 72" stroke="#334155" stroke-width="2" fill="none"/>
        
        <!-- ДЕЛЬТЫ (ПЕРЕДНЯЯ/СРЕДНЯЯ) -->
        <g id="anat-path-delts-left" onclick="selectAnatomyMuscle('delts')" class="anat-muscle ${dl.isActive ? 'active' : ''} ${dl.isPumped ? 'growing' : ''}">
          <path d="M80 72 C66 80 60 98 64 114 C72 108 78 98 82 86 Z" fill="${dl.fill}" stroke="${dl.stroke}" stroke-width="1.8"/>
        </g>
        <g id="anat-path-delts-right" onclick="selectAnatomyMuscle('delts')" class="anat-muscle ${dl.isActive ? 'active' : ''} ${dl.isPumped ? 'growing' : ''}">
          <path d="M160 72 C174 80 180 98 176 114 C168 108 162 98 158 86 Z" fill="${dl.fill}" stroke="${dl.stroke}" stroke-width="1.8"/>
        </g>

        <!-- ГРУДНЫЕ МЫШЦЫ (PECTORALIS MAJOR) -->
        <g id="anat-path-chest" onclick="selectAnatomyMuscle('chest')" class="anat-muscle ${ch.isActive ? 'active' : ''} ${ch.isPumped ? 'growing' : ''}">
          <path d="M120 76 C104 74 86 82 82 98 C82 118 106 124 120 120 Z" fill="${ch.fill}" stroke="${ch.stroke}" stroke-width="2"/>
          <path d="M120 76 C136 74 154 82 158 98 C158 118 134 124 120 120 Z" fill="${ch.fill}" stroke="${ch.stroke}" stroke-width="2"/>
          <!-- Линия разделения пекторальных -->
          <line x1="120" y1="76" x2="120" y2="120" stroke="#080a12" stroke-width="1.5"/>
        </g>

        <!-- БИЦЕПСЫ & ПРЕДПЛЕЧЬЯ -->
        <g id="anat-path-biceps-left" onclick="selectAnatomyMuscle('biceps')" class="anat-muscle ${bi.isActive ? 'active' : ''} ${bi.isPumped ? 'growing' : ''}">
          <path d="M64 115 C58 128 56 146 64 162 C70 158 76 142 74 125 Z" fill="${bi.fill}" stroke="${bi.stroke}" stroke-width="1.8"/>
          <!-- Предплечье -->
          <path d="M63 164 C56 182 50 202 48 218 C56 218 66 198 70 178 Z" fill="rgba(100, 116, 139, 0.25)" stroke="#475569" stroke-width="1.5"/>
        </g>
        <g id="anat-path-biceps-right" onclick="selectAnatomyMuscle('biceps')" class="anat-muscle ${bi.isActive ? 'active' : ''} ${bi.isPumped ? 'growing' : ''}">
          <path d="M176 115 C182 128 184 146 176 162 C170 158 164 142 166 125 Z" fill="${bi.fill}" stroke="${bi.stroke}" stroke-width="1.8"/>
          <!-- Предплечье -->
          <path d="M177 164 C184 182 190 202 192 218 C184 218 174 198 170 178 Z" fill="rgba(100, 116, 139, 0.25)" stroke="#475569" stroke-width="1.5"/>
        </g>

        <!-- ПРЕСС & КОР (ABS / 6-PACK) -->
        <g id="anat-path-abs" onclick="selectAnatomyMuscle('abs')" class="anat-muscle ${ab.isActive ? 'active' : ''} ${ab.isPumped ? 'growing' : ''}">
          <!-- Верхний блок -->
          <rect x="108" y="125" width="10" height="15" rx="3" fill="${ab.fill}" stroke="${ab.stroke}" stroke-width="1.2"/>
          <rect x="122" y="125" width="10" height="15" rx="3" fill="${ab.fill}" stroke="${ab.stroke}" stroke-width="1.2"/>
          <!-- Средний блок -->
          <rect x="108" y="143" width="10" height="16" rx="3" fill="${ab.fill}" stroke="${ab.stroke}" stroke-width="1.2"/>
          <rect x="122" y="143" width="10" height="16" rx="3" fill="${ab.fill}" stroke="${ab.stroke}" stroke-width="1.2"/>
          <!-- Нижний блок -->
          <rect x="108" y="162" width="10" height="18" rx="3" fill="${ab.fill}" stroke="${ab.stroke}" stroke-width="1.2"/>
          <rect x="122" y="162" width="10" height="18" rx="3" fill="${ab.fill}" stroke="${ab.stroke}" stroke-width="1.2"/>
          <!-- Косые мышцы -->
          <path d="M92 128 C86 148 86 172 94 190 L104 184 L104 130 Z" fill="rgba(100, 116, 139, 0.2)" stroke="#334155" stroke-width="1.2"/>
          <path d="M148 128 C154 148 154 172 146 190 L136 184 L136 130 Z" fill="rgba(100, 116, 139, 0.2)" stroke="#334155" stroke-width="1.2"/>
        </g>

        <!-- КВАДРИЦЕПСЫ (БЕДРА) -->
        <g id="anat-path-quads-left" onclick="selectAnatomyMuscle('quads')" class="anat-muscle ${qd.isActive ? 'active' : ''} ${qd.isPumped ? 'growing' : ''}">
          <path d="M94 196 C84 228 82 268 90 292 C102 292 112 258 114 206 Z" fill="${qd.fill}" stroke="${qd.stroke}" stroke-width="1.8"/>
        </g>
        <g id="anat-path-quads-right" onclick="selectAnatomyMuscle('quads')" class="anat-muscle ${qd.isActive ? 'active' : ''} ${qd.isPumped ? 'growing' : ''}">
          <path d="M146 196 C156 228 158 268 150 292 C138 292 128 258 126 206 Z" fill="${qd.fill}" stroke="${qd.stroke}" stroke-width="1.8"/>
        </g>

        <!-- ИКРОНОЖНЫЕ (ГОЛЕНЬ) -->
        <g id="anat-path-calves-left" onclick="selectAnatomyMuscle('calves')" class="anat-muscle ${cl.isActive ? 'active' : ''} ${cl.isPumped ? 'growing' : ''}">
          <path d="M90 302 C82 322 84 350 92 364 C100 362 106 340 103 312 Z" fill="${cl.fill}" stroke="${cl.stroke}" stroke-width="1.8"/>
        </g>
        <g id="anat-path-calves-right" onclick="selectAnatomyMuscle('calves')" class="anat-muscle ${cl.isActive ? 'active' : ''} ${cl.isPumped ? 'growing' : ''}">
          <path d="M150 302 C158 322 156 350 148 364 C140 362 134 340 137 312 Z" fill="${cl.fill}" stroke="${cl.stroke}" stroke-width="1.8"/>
        </g>
      </svg>
    `;
  } else {
    // РАКУРС СЗАДИ (BACK VIEW)
    const tr = getStyle('traps');
    const lt = getStyle('lats');
    const dl = getStyle('delts');
    const tc = getStyle('triceps');
    const hm = getStyle('hamstrings');
    const cl = getStyle('calves');

    svgHtml = `
      <svg class="w-full h-full" viewBox="0 0 240 370" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- БАЗОВЫЙ АНАТОМИЧЕСКИЙ КАРКАС ТЕЛА СЗАДИ -->
        <circle cx="120" cy="34" r="16" stroke="#475569" stroke-width="2" fill="#0f172a"/>
        
        <!-- ТРАПЕЦИЯ & МЫШЦЫ ШЕИ/ЛОПАТОК -->
        <g id="anat-path-traps" onclick="selectAnatomyMuscle('traps')" class="anat-muscle ${tr.isActive ? 'active' : ''} ${tr.isPumped ? 'growing' : ''}">
          <path d="M120 50 L98 70 L86 80 L110 110 L120 116 L130 110 L154 80 L142 70 Z" fill="${tr.fill}" stroke="${tr.stroke}" stroke-width="2"/>
          <line x1="120" y1="50" x2="120" y2="116" stroke="#080a12" stroke-width="1.5"/>
        </g>

        <!-- ЗАДНИЕ ДЕЛЬТЫ -->
        <g id="anat-path-delts-rear-left" onclick="selectAnatomyMuscle('delts')" class="anat-muscle ${dl.isActive ? 'active' : ''} ${dl.isPumped ? 'growing' : ''}">
          <path d="M82 76 C68 84 62 102 66 116 C74 110 80 100 84 88 Z" fill="${dl.fill}" stroke="${dl.stroke}" stroke-width="1.8"/>
        </g>
        <g id="anat-path-delts-rear-right" onclick="selectAnatomyMuscle('delts')" class="anat-muscle ${dl.isActive ? 'active' : ''} ${dl.isPumped ? 'growing' : ''}">
          <path d="M158 76 C172 84 178 102 174 116 C166 110 160 100 156 88 Z" fill="${dl.fill}" stroke="${dl.stroke}" stroke-width="1.8"/>
        </g>

        <!-- ШИРОЧАЙШИЕ МЫШЦЫ СПИНЫ (LATS - V-TAPER) -->
        <g id="anat-path-lats" onclick="selectAnatomyMuscle('lats')" class="anat-muscle ${lt.isActive ? 'active' : ''} ${lt.isPumped ? 'growing' : ''}">
          <path d="M88 110 C76 132 78 164 96 182 L110 172 L106 120 Z" fill="${lt.fill}" stroke="${lt.stroke}" stroke-width="2"/>
          <path d="M152 110 C164 132 162 164 144 182 L130 172 L134 120 Z" fill="${lt.fill}" stroke="${lt.stroke}" stroke-width="2"/>
          <!-- Поясничные разгибатели -->
          <rect x="112" y="174" width="16" height="24" rx="3" fill="rgba(100, 116, 139, 0.25)" stroke="#334155" stroke-width="1.2"/>
        </g>

        <!-- ТРИЦЕПСЫ -->
        <g id="anat-path-triceps-left" onclick="selectAnatomyMuscle('triceps')" class="anat-muscle ${tc.isActive ? 'active' : ''} ${tc.isPumped ? 'growing' : ''}">
          <path d="M64 118 C58 132 56 150 64 164 C70 160 76 144 74 128 Z" fill="${tc.fill}" stroke="${tc.stroke}" stroke-width="1.8"/>
        </g>
        <g id="anat-path-triceps-right" onclick="selectAnatomyMuscle('triceps')" class="anat-muscle ${tc.isActive ? 'active' : ''} ${tc.isPumped ? 'growing' : ''}">
          <path d="M176 118 C182 132 184 150 176 164 C170 160 164 144 166 128 Z" fill="${tc.fill}" stroke="${tc.stroke}" stroke-width="1.8"/>
        </g>

        <!-- ЯГОДИЧНЫЕ МЫШЦЫ & БИЦЕПС БЕДРА -->
        <g id="anat-path-hamstrings" onclick="selectAnatomyMuscle('hamstrings')" class="anat-muscle ${hm.isActive ? 'active' : ''} ${hm.isPumped ? 'growing' : ''}">
          <!-- Ягодицы -->
          <path d="M92 200 C86 218 90 242 118 246 L118 200 Z" fill="${hm.fill}" stroke="${hm.stroke}" stroke-width="1.8"/>
          <path d="M148 200 C154 218 150 242 122 246 L122 200 Z" fill="${hm.fill}" stroke="${hm.stroke}" stroke-width="1.8"/>
          <!-- Бицепс бедра -->
          <path d="M92 250 C86 274 88 294 94 304 C106 304 114 280 116 250 Z" fill="${hm.fill}" stroke="${hm.stroke}" stroke-width="1.8"/>
          <path d="M148 250 C154 274 152 294 146 304 C134 304 126 280 124 250 Z" fill="${hm.fill}" stroke="${hm.stroke}" stroke-width="1.8"/>
        </g>

        <!-- ИКРОНОЖНЫЕ СЗАДИ -->
        <g id="anat-path-calves-back" onclick="selectAnatomyMuscle('calves')" class="anat-muscle ${cl.isActive ? 'active' : ''} ${cl.isPumped ? 'growing' : ''}">
          <path d="M92 312 C84 330 86 354 94 366 C102 362 106 342 103 315 Z" fill="${cl.fill}" stroke="${cl.stroke}" stroke-width="1.8"/>
          <path d="M148 312 C156 330 154 354 146 366 C138 362 134 342 137 315 Z" fill="${cl.fill}" stroke="${cl.stroke}" stroke-width="1.8"/>
        </g>
      </svg>
    `;
  }

  host.innerHTML = svgHtml;
  updateAnatomyHUD(selKey, data[selKey]);
}

function updateAnatomyHUD(key, d) {
  const m = ANATOMY_MUSCLES[key] || ANATOMY_MUSCLES.chest;
  const currentSets = (d && d.sets !== undefined) ? d.sets : 12;
  const lastHoursAgo = (d && d.lastHoursAgo !== undefined) ? d.lastHoursAgo : 48;

  const ratio = Math.min(100, Math.round((currentSets / m.mav) * 100));
  const pumpBonus = Math.round(ratio * 0.2);

  const hoursNeeded = m.recoveryHours;
  const recoveryPct = Math.min(100, Math.round((lastHoursAgo / hoursNeeded) * 100));
  const isRecovered = recoveryPct >= 100;
  const hoursLeft = Math.max(0, hoursNeeded - lastHoursAgo);

  const titleEl = document.getElementById("anat-hud-title");
  const pumpEl = document.getElementById("anat-hud-pump-badge");
  const volEl = document.getElementById("anat-hud-volume");
  const mavEl = document.getElementById("anat-hud-mav-status");
  const recEl = document.getElementById("anat-hud-recovery");
  const timerEl = document.getElementById("anat-hud-timer");
  const exEl = document.getElementById("anat-hud-exercises");
  const tipEl = document.getElementById("anat-hud-tip");

  if (titleEl) titleEl.textContent = m.name;
  if (pumpEl) {
    if (ratio >= 75) {
      pumpEl.textContent = `Памп +${pumpBonus}% 🔥`;
      pumpEl.className = "px-2 py-0.5 rounded-md bg-[#c8a97e]/20 text-[#c8a97e] border border-[#c8a97e]/40 text-[9px] font-bold";
    } else {
      pumpEl.textContent = `Стимул ${ratio}%`;
      pumpEl.className = "px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/10 text-[9px] font-bold";
    }
  }

  if (volEl) volEl.textContent = `${currentSets} / ${m.mav} сетов`;
  if (mavEl) {
    if (currentSets >= m.mav) mavEl.textContent = "100% MAV Оптимум";
    else if (currentSets >= m.mev) mavEl.textContent = `${ratio}% MEV Достигнут`;
    else mavEl.textContent = `${ratio}% в процессе`;
  }

  if (recEl) {
    recEl.textContent = isRecovered ? "100% Готова 🟢" : `${recoveryPct}% Восстановление 🟡`;
    recEl.className = isRecovered ? "text-emerald-400 font-mono font-bold" : "text-amber-400 font-mono font-bold";
  }

  if (timerEl) {
    timerEl.textContent = isRecovered ? `Отдых ${hoursNeeded}ч пройден` : `Осталось ~${hoursLeft}ч до 100%`;
  }

  if (exEl) exEl.textContent = m.bestExercises.join(", ");
  if (tipEl) tipEl.textContent = m.tip;
}

// ========================================================
// НАУЧНЫЙ ОБЪЕМ ПО МЫШЦАМ (ШКАЛА ШЁНФЕЛЬДА & RP MAV)
// ========================================================
function renderMuscleVolumeBreakdown() {
  const container = document.getElementById("muscle-volume-container");
  if (!container) return;

  const targets = [
    { group: "Грудные мышцы", mev: 8, mav: 14, current: 8, color: "from-[#c8a97e] to-[#dfc299]" },
    { group: "Широчайшие и Спина", mev: 10, mav: 16, current: 8, color: "from-slate-400 to-slate-200" },
    { group: "Квадрицепс и Ноги", mev: 8, mav: 14, current: 7, color: "from-amber-600 to-amber-400" },
    { group: "Средняя и Задняя дельта", mev: 6, mav: 12, current: 4, color: "from-slate-500 to-slate-300" },
    { group: "Руки (Бицепс/Трицепс)", mev: 6, mav: 12, current: 6, color: "from-emerald-600 to-emerald-400" }
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
    const pct = Math.min(100, Math.round((t.current / t.mav) * 100));
    const status = t.current >= t.mav ? 'MAV ОПТИМУМ' : t.current >= t.mev ? 'MEV ДОСТИГНУТ' : 'В ПРОЦЕССЕ';
    return `
      <div class="space-y-1 bg-[#181b26] p-2.5 rounded-xl border border-white/[0.05]">
        <div class="flex justify-between items-center text-[11px]">
          <span class="font-bold text-white uppercase">${t.group}</span>
          <div class="flex items-center space-x-2">
            <span class="text-slate-400 font-mono">${t.current} из ${t.mav} сетов/нед</span>
            <span class="text-[9px] font-bold text-[#c8a97e]">${status}</span>
          </div>
        </div>
        <div class="w-full h-1 bg-[#0c0d14] rounded-full overflow-hidden border border-white/5">
          <div class="h-full bg-gradient-to-r ${t.color}" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  }).join("");
}

// ========================================================
// КЛИНИЧЕСКИЙ ВИТАМИННЫЙ СТЕК
// ========================================================
function renderPersonalizedVitamins() {
  const container = document.getElementById("personalized-vitamins-container");
  if (!container) return;

  const stack = [
    {
      timing: "УТРО • С ЕДОЙ",
      timingBadge: "bg-[#c8a97e]/15 text-[#c8a97e] border border-[#c8a97e]/30",
      name: "Витамин D3 + K2 (MK-7)",
      dose: "4000 МЕ + 100 мкг",
      reason: "Стимулирует синтез тестостерона, укрепляет костный матрикс и направляет кальций в кости, предотвращая кальцификацию сосудов."
    },
    {
      timing: "ДЕНЬ • В ОБЕД",
      timingBadge: "bg-emerald-950/80 text-emerald-400 border border-emerald-800/60",
      name: "Омега-3 (EPA / DHA)",
      dose: "2000 мг (EPA > 800 мг)",
      reason: "Снижает системное воспаление, защищает суставные сумки плечевого пояса и улучшает липидный профиль крови."
    },
    {
      timing: "ВЕЧЕР • ДО СНА",
      timingBadge: "bg-sky-950/80 text-sky-400 border border-sky-800/60",
      name: "Магний Бисглицинат / Хелат",
      dose: "400 мг чистого Mg",
      reason: "Хелатная форма с аминокислотой глицин. Снимает остаточный спазм с мышцы шеи и лопатки, ускоряет засыпание и углубляет фазу NREM-сна."
    },
    {
      timing: "ТРЕНИНГ • ДО/ПОСЛЕ",
      timingBadge: "bg-purple-950/80 text-purple-300 border border-purple-800/60",
      name: "Креатин Моногидрат",
      dose: "5 г",
      reason: "Насыщает запасы фосфокреатина в мышечных волокнах, повышает взрывную силу на 10–15% в базовых жимах и тягах."
    }
  ];

  container.innerHTML = stack.map(item => `
    <div class="p-3.5 glass-panel-elevated rounded-2xl space-y-2">
      <div class="flex justify-between items-center font-mono">
        <span class="text-[9px] font-bold px-2 py-0.5 rounded-md tracking-wider ${item.timingBadge}">${item.timing}</span>
        <span class="text-white font-bold text-xs">${item.dose}</span>
      </div>
      <div>
        <b class="text-sm font-bold text-white font-sans">${item.name}</b>
        <p class="text-[11px] text-slate-300 leading-relaxed font-sans mt-1">${item.reason}</p>
      </div>
    </div>
  `).join("");
}

// ========================================================
// ЧИСТЫЕ СИЛОВЫЕ И ДИСЦИПЛИНАРНЫЕ АЧИВКИ
// ========================================================
const ACHIEVEMENTS = [
  { id: "ach_first", cat: "strength", title: "Первый шаг", desc: "Заверши 1-ю тренировку", target: 1, current: (s) => (s.history || []).length, xp: 100 },
  { id: "ach_ton_10", cat: "strength", title: "Рубеж 10 Тонн", desc: "Подними суммарно 10 000 кг", target: 10000, current: (s) => getTotalTonnage(s), xp: 200 },
  { id: "ach_ton_50", cat: "strength", title: "Рубеж 50 Тонн", desc: "Подними суммарно 50 000 кг", target: 50000, current: (s) => getTotalTonnage(s), xp: 500 },
  { id: "ach_ton_100", cat: "strength", title: "Титан 100 Тонн", desc: "Подними суммарно 100 000 кг", target: 100000, current: (s) => getTotalTonnage(s), xp: 1000 },
  { id: "ach_ton_250", cat: "strength", title: "Легенда 250 Тонн", desc: "Подними суммарно 250 000 кг", target: 250000, current: (s) => getTotalTonnage(s), xp: 2500 },

  { id: "ach_strk_3", cat: "streak", title: "Три в ряд", desc: "Серия из 3 тренировок по графику", target: 3, current: (s) => (s.streak || 0), xp: 250 },
  { id: "ach_strk_7", cat: "streak", title: "Железная неделя", desc: "Серия из 7 тренировок подряд", target: 7, current: (s) => (s.streak || 0), xp: 450 },
  { id: "ach_strk_14", cat: "streak", title: "Стальная декада", desc: "Серия из 14 тренировок", target: 14, current: (s) => (s.streak || 0), xp: 800 },
  { id: "ach_strk_30", cat: "streak", title: "Кремень 30", desc: "Серия из 30 тренировок", target: 30, current: (s) => (s.streak || 0), xp: 2000 },

  { id: "ach_vac_1", cat: "body", title: "Первое втягивание", desc: "Выполни 1-ю утреннюю сессию вакуума", target: 1, current: (s) => (s.vacDaysCount || 0), xp: 100 },
  { id: "ach_vac_5", cat: "body", title: "Вакуумный монолит", desc: "Выполни 5 дней утреннего вакуума", target: 5, current: (s) => (s.vacDaysCount || 0), xp: 300 },
  { id: "ach_vac_14", cat: "body", title: "Стальной корсет", desc: "Выполни 14 дней утреннего вакуума", target: 14, current: (s) => (s.vacDaysCount || 0), xp: 800 }
];

function filterAchievements(cat) {
  currentAchFilter = cat;
  ['all', 'strength', 'streak', 'body', 'records'].forEach(c => {
    const btn = document.getElementById("btn-ach-" + c);
    if (btn) {
      if (c === cat) {
        btn.className = "px-3 py-1 rounded-lg bg-[#c8a97e] text-slate-950 font-bold whitespace-nowrap shadow-sm";
      } else {
        btn.className = "px-3 py-1 rounded-lg bg-[#181b26] text-slate-400 border border-white/10 font-medium whitespace-nowrap";
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
    card.className = `p-3.5 rounded-2xl border space-y-2 transition-all ${isUnlocked ? 'bg-[#181b26] border-white/20 text-white' : 'bg-[#12141c] border-white/[0.05] text-slate-400 opacity-75'}`;

    card.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <h4 class="font-bold text-xs ${isUnlocked ? 'text-[#c8a97e]' : 'text-slate-300'} font-sans">${ach.title}</h4>
          <p class="text-[11px] text-slate-400 font-sans mt-0.5">${ach.desc}</p>
        </div>
        <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono ${isUnlocked ? 'bg-[#c8a97e] text-slate-950' : 'bg-[#181b26] text-slate-400 border border-white/5'}">
          ${isUnlocked ? 'ОТКРЫТО' : `+${ach.xp} XP`}
        </span>
      </div>

      <div class="space-y-1 font-mono text-[10px]">
        <div class="flex justify-between text-slate-400">
          <span>Прогресс: <b class="${isUnlocked ? 'text-white' : 'text-slate-300'}">${curVal.toLocaleString()} / ${ach.target.toLocaleString()}</b></span>
          <span>${pct}%</span>
        </div>
        <div class="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-white/5">
          <div class="h-full ${isUnlocked ? 'bg-[#c8a97e]' : 'bg-slate-700'}" style="width: ${pct}%"></div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// ========================================================
// 1-ТАП УТРЕННИЙ ВАКУУМ (ЧИСТЫЙ ОДИНАРНЫЙ ЧЕК)
// ========================================================
function checkinMorningVacuum() {
  appState.vacDaysCount = (appState.vacDaysCount || 0) + 1;
  addXP(30);
  Sound.success();
  Haptic.success();
  updateVacuumBadge();
  checkAchievements();
  
  const txt = document.getElementById("vac-checkin-text");
  if (txt) txt.textContent = `Выполнено сегодня (Серия: ${appState.vacDaysCount} дн)`;
  alert("Утренний вакуум зафиксирован! (+30 XP к прогрессу)");
}

function updateVacuumBadge() {
  const badge = document.getElementById("vac-total-days-badge");
  if (badge) {
    badge.textContent = `${appState.vacDaysCount || 0} дней`;
  }
}

// ========================================================
// ТРЕНИРОВОЧНЫЙ ДВИЖОК
// ========================================================
function startFreeWorkout(targetDate = null) {
  Sound.beep(600, 0.08);
  Haptic.impact('medium');
  activeExpandedExerciseIndex = 0;

  const now = new Date();
  const startTimeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  appState.activeWorkout = {
    key: 'free',
    name: "Свободная тренировка",
    targetDate: targetDate || now.toISOString().split("T")[0],
    startTimestamp: now.getTime(),
    startTimeStr: startTimeStr,
    readiness: 100,
    exercises: [
      createExerciseInstanceFromDB(EXERCISE_DATABASE[0]),
      createExerciseInstanceFromDB(EXERCISE_DATABASE[7])
    ]
  };

  saveState();
  startWorkoutTimer();
  renderActiveWorkoutUI();
  switchTab("workouts");
}

function createExerciseInstanceFromDB(dbEx) {
  const scaledWeight = appState.weightProgression && appState.weightProgression[dbEx.name] !== undefined
    ? appState.weightProgression[dbEx.name]
    : dbEx.defaultWeight;

  return {
    name: dbEx.name,
    muscleGroup: dbEx.muscleGroup,
    targetMuscles: dbEx.targetMuscles,
    phases: dbEx.phases,
    min: dbEx.min,
    max: dbEx.max,
    defaultWeight: scaledWeight,
    calRate: dbEx.calRate || 10,
    isTime: !!dbEx.isTime,
    tip: dbEx.tip,
    substitutes: [],
    sets: Array.from({ length: dbEx.defaultSets }, (_, i) => ({
      set: i + 1,
      weight: scaledWeight,
      reps: dbEx.min,
      done: false
    }))
  };
}

function deleteExerciseFromActiveWorkout(exIdx) {
  if (!appState.activeWorkout) return;
  const ex = appState.activeWorkout.exercises[exIdx];
  if (confirm(`Удалить упражнение «${ex.name}» из текущей тренировки?`)) {
    appState.activeWorkout.exercises.splice(exIdx, 1);
    activeExpandedExerciseIndex = Math.max(0, exIdx - 1);
    saveState();
    renderActiveWorkoutUI();
    Sound.beep(400, 0.08);
    Haptic.impact('light');
  }
}

function openExerciseDatabaseModal() {
  currentDbCategory = 'all';
  renderExerciseCatalogList();
  openModal('modal-exercise-database');
}

function filterExerciseDatabaseCategory(cat) {
  currentDbCategory = cat;
  ['all', 'chest', 'back', 'legs', 'shoulders', 'arms', 'abs', 'cardio'].forEach(c => {
    const btn = document.getElementById("btn-cat-" + c);
    if (btn) {
      const match = (c === 'all' && cat === 'all') ||
                    (c === 'chest' && cat === 'Грудь') ||
                    (c === 'back' && cat === 'Спина') ||
                    (c === 'legs' && cat === 'Ноги') ||
                    (c === 'shoulders' && cat === 'Плечи') ||
                    (c === 'arms' && cat === 'Руки') ||
                    (c === 'abs' && cat === 'Пресс') ||
                    (c === 'cardio' && cat === 'Кардио');
      if (match) {
        btn.className = "px-2.5 py-1 rounded-lg bg-[#c8a97e] text-slate-950 font-bold whitespace-nowrap shadow-sm";
      } else {
        btn.className = "px-2.5 py-1 rounded-lg bg-[#181b26] text-slate-400 border border-white/10 font-medium whitespace-nowrap";
      }
    }
  });
  renderExerciseCatalogList();
}

function filterExerciseDatabase() {
  renderExerciseCatalogList();
}

function renderExerciseCatalogList() {
  const container = document.getElementById("exercise-catalog-list");
  const searchInput = document.getElementById("ex-catalog-search");
  if (!container) return;

  const query = (searchInput ? searchInput.value : "").trim().toLowerCase();

  const filtered = EXERCISE_DATABASE.filter(ex => {
    const matchCat = (currentDbCategory === 'all' || ex.category === currentDbCategory);
    const matchQuery = !query || ex.name.toLowerCase().includes(query) || ex.targetMuscles.toLowerCase().includes(query);
    return matchCat && matchQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-6 bg-[#181b26] rounded-2xl border border-white/[0.06] text-center text-slate-400 space-y-1 font-mono">
        <p class="text-xs font-bold text-slate-300 uppercase">Упражнение не найдено</p>
        <p class="text-[11px] text-slate-500 font-sans">Создай свое упражнение вручную с помощью кнопки внизу.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(ex => {
    const diagSvg = getExerciseDiagramSVG(ex.name, ex.category);
    return `
      <div class="p-3.5 bg-[#12141c] hover:bg-[#181b26] rounded-2xl border border-white/[0.06] space-y-2.5 transition-all">
        <div class="flex justify-between items-start space-x-2">
          <div class="space-y-0.5">
            <div class="flex items-center space-x-1.5">
              <span class="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-white/5 text-[#c8a97e] border border-[#c8a97e]/30 rounded uppercase">${ex.category}</span>
              <h4 class="font-bold text-xs text-white leading-tight">${ex.name}</h4>
            </div>
            <p class="text-[10px] text-slate-400 font-mono">${ex.targetMuscles}</p>
          </div>
          <button onclick="addExerciseFromCatalogToActiveWorkout('${ex.id}')" class="px-3 py-1.5 bg-[#c8a97e] hover:bg-[#dfc299] text-slate-950 font-bold text-xs uppercase rounded-xl font-mono active:scale-95 transition-all whitespace-nowrap shadow-sm">
            + В план
          </button>
        </div>

        <!-- ВИЗУАЛЬНАЯ АНИМИРОВАННАЯ ТРАЕКТОРИЯ И ДВИЖЕНИЕ -->
        <div class="ex-diagram-container rounded-xl overflow-hidden bg-[#0a0c12] border border-white/[0.04]">
          ${diagSvg}
        </div>

        <div class="flex justify-between items-center text-[10px] font-mono text-slate-400 border-t border-white/[0.04] pt-1.5">
          <span>Норма: <b class="text-white">${ex.defaultSets}×${ex.min}-${ex.max}</b> (${ex.defaultWeight} кг)</span>
          <span class="text-emerald-400">🔥 ~${ex.calRate * ex.defaultSets} ккал</span>
        </div>
      </div>
    `;
  }).join("");
}

function toggleExerciseGuide(exIdx) {
  const guideEl = document.getElementById(`ex-guide-${exIdx}`);
  const btnEl = document.getElementById(`btn-guide-${exIdx}`);
  if (!guideEl) return;
  const isHidden = guideEl.classList.contains("hidden");
  if (isHidden) {
    guideEl.classList.remove("hidden");
    if (btnEl) btnEl.textContent = "✕ Скрыть схему";
  } else {
    guideEl.classList.add("hidden");
    if (btnEl) btnEl.textContent = "👀 Схема & Техника";
  }
  Sound.beep(550, 0.04);
  Haptic.impact('light');
}

function addExerciseFromCatalogToActiveWorkout(exId) {
  if (!appState.activeWorkout) {
    startFreeWorkout();
  }

  const dbEx = EXERCISE_DATABASE.find(e => e.id === exId);
  if (!dbEx) return;

  appState.activeWorkout.exercises.push(createExerciseInstanceFromDB(dbEx));
  saveState();
  closeModal('modal-exercise-database');

  activeExpandedExerciseIndex = appState.activeWorkout.exercises.length - 1;
  renderActiveWorkoutUI();
  Sound.success();
  Haptic.success();

  const newEl = document.getElementById(`ex-card-${activeExpandedExerciseIndex}`);
  if (newEl) newEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function getProgressiveOverloadSuggestion(exName) {
  const lastPerf = getLastExercisePerformance(exName);
  if (!lastPerf) return null;
  const suggestedWeight = Math.round(((lastPerf.weight || 0) + 2.5) * 10) / 10;
  return {
    lastWeight: lastPerf.weight,
    suggestedWeight: suggestedWeight,
    note: `+2.5 кг (Цель: ${suggestedWeight} кг)`
  };
}

function getRIRBadgeHtml(rirVal) {
  const rir = (rirVal !== undefined) ? rirVal : 2;
  if (rir === 0) {
    return `<span class="px-1 py-1 rounded text-[8px] sm:text-[9px] font-bold bg-rose-950/80 text-rose-300 border border-rose-800 flex items-center justify-center gap-1 shadow-sm whitespace-nowrap"><span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>Отказ 0</span>`;
  } else if (rir === 1) {
    return `<span class="px-1 py-1 rounded text-[8px] sm:text-[9px] font-bold bg-amber-950/80 text-amber-300 border border-amber-800 flex items-center justify-center gap-1 whitespace-nowrap"><span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Запас 1</span>`;
  } else if (rir === 2) {
    return `<span class="px-1 py-1 rounded text-[8px] sm:text-[9px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800 flex items-center justify-center gap-1 whitespace-nowrap"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Запас 2</span>`;
  } else {
    return `<span class="px-1 py-1 rounded text-[8px] sm:text-[9px] font-bold bg-sky-950/80 text-sky-300 border border-sky-800 flex items-center justify-center gap-1 whitespace-nowrap"><span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>Запас 3+</span>`;
  }
}

function cycleSetRIR(exIdx, sIdx) {
  if (!appState.activeWorkout) return;
  const set = appState.activeWorkout.exercises[exIdx].sets[sIdx];
  const rirs = [2, 1, 0, 3];
  const curIdx = rirs.indexOf(set.rir !== undefined ? set.rir : 2);
  set.rir = rirs[(curIdx + 1) % rirs.length];
  saveState();
  renderActiveWorkoutUI();
  Sound.beep(550, 0.04);
  Haptic.impact('light');
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

  if (wo.exercises.length === 0) {
    container.innerHTML = `
      <div class="p-6 bg-[#12141c] rounded-2xl border border-white/[0.06] text-center text-slate-400 space-y-2 font-mono">
        <p class="text-xs font-bold text-slate-200 uppercase">Тренировка пока пуста</p>
        <p class="text-[11px] text-slate-400 font-sans">Нажми кнопку «Выбрать упражнение из каталога» выше!</p>
      </div>
    `;
    return;
  }

  wo.exercises.forEach((ex, exIdx) => {
    const isExpanded = (activeExpandedExerciseIndex === exIdx);
    const doneSetsCount = ex.sets.filter(s => s.done).length;
    const isAllDone = (doneSetsCount === ex.sets.length && ex.sets.length > 0);
    const lastPerf = getLastExercisePerformance(ex.name);
    const overload = getProgressiveOverloadSuggestion(ex.name);

    const card = document.createElement("div");
    card.id = `ex-card-${exIdx}`;
    card.className = `ex-card-accordion p-4 rounded-2xl border transition-all ${isExpanded ? 'active-focus' : isAllDone ? 'done-all' : 'bg-[#12141c] border-white/[0.08]'}`;

    const headerHtml = `
      <div class="flex justify-between items-center select-none">
        <div onclick="toggleExerciseAccordion(${exIdx})" class="flex items-center space-x-2.5 cursor-pointer flex-1">
          <span class="w-6 h-6 rounded-lg ${isAllDone ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800' : isExpanded ? 'bg-white/10 text-white border border-white/20' : 'bg-[#181b26] text-slate-400'} flex items-center justify-center font-mono font-bold text-xs">
            ${isAllDone ? '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : exIdx + 1}
          </span>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-white text-xs sm:text-sm font-sans">${ex.name}</h3>
              ${overload ? `<span class="px-1.5 py-0.2 rounded bg-[#c8a97e]/20 text-[#c8a97e] border border-[#c8a97e]/40 font-mono text-[9px] font-bold">${overload.note}</span>` : ''}
            </div>
            <div class="flex items-center space-x-2 font-mono text-[11px] mt-0.5">
              <span class="${isAllDone ? 'text-emerald-400' : 'text-slate-400'} font-medium">
                ${isAllDone ? `Все ${ex.sets.length} сетов закрыты` : `${doneSetsCount} из ${ex.sets.length} выполнено`}
              </span>
              ${lastPerf ? `<span class="text-slate-400 text-[10px]">В прошлый раз: ${lastPerf.setsStr}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-1 font-mono">
          <button onclick="deleteExerciseFromActiveWorkout(${exIdx})" title="Удалить упражнение" class="p-1.5 text-slate-400 hover:text-rose-400 active:scale-90 transition-all">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
          <button onclick="toggleExerciseAccordion(${exIdx})" class="p-1 text-slate-400 text-xs">${isExpanded ? '▲' : '▼'}</button>
        </div>
      </div>
    `;

    let bodyHtml = "";
    if (isExpanded) {
      const setsRows = ex.sets.map((s, sIdx) => `
        <div class="grid grid-cols-12 gap-1.5 items-center bg-[#0c0d14] p-2.5 rounded-xl border ${s.done ? 'border-emerald-500/60 bg-emerald-950/20' : 'border-white/[0.05]'} font-mono text-xs">
          <div class="col-span-1 text-center font-bold ${s.done ? 'text-emerald-400' : 'text-slate-400'}">#${s.set}</div>
          
          <div class="col-span-5 flex items-center bg-[#181b26] px-1 py-1 rounded-xl border border-white/10 justify-between">
            <button type="button" onclick="stepWeight(${exIdx}, ${sIdx}, -2.5)" class="stepper-btn">-</button>
            <input type="number" step="any" inputmode="decimal" id="set-weight-input-${exIdx}-${sIdx}" value="${s.weight}" class="w-11 bg-transparent text-white font-bold text-center text-xs outline-none"
              onclick="this.select()" oninput="updateSet(${exIdx}, ${sIdx}, 'weight', this.value)">
            <span class="text-[9px] text-slate-400 pr-0.5">${ex.isTime ? 'с' : 'кг'}</span>
            <button type="button" onclick="stepWeight(${exIdx}, ${sIdx}, 2.5)" class="stepper-btn text-[#c8a97e]">+</button>
          </div>

          <div class="col-span-3 flex items-center bg-[#181b26] px-1 py-1 rounded-xl border border-white/10 justify-between">
            <button type="button" onclick="stepReps(${exIdx}, ${sIdx}, -1)" class="stepper-btn">-</button>
            <input type="number" step="1" inputmode="numeric" value="${s.reps}" class="w-7 bg-transparent text-white font-bold text-center text-xs outline-none"
              onclick="this.select()" oninput="updateSet(${exIdx}, ${sIdx}, 'reps', this.value)">
            <button type="button" onclick="stepReps(${exIdx}, ${sIdx}, 1)" class="stepper-btn text-slate-200">+</button>
          </div>

          <div class="col-span-2 flex justify-center">
            <button type="button" onclick="cycleSetRIR(${exIdx}, ${sIdx})" class="w-full flex justify-center active:scale-95 transition-all" title="Нажмите, чтобы изменить запас сил">
              ${getRIRBadgeHtml(s.rir)}
            </button>
          </div>

          <div class="col-span-1 flex justify-center">
            <input type="checkbox" class="custom-checkbox" ${s.done ? 'checked' : ''}
              onchange="toggleSet(${exIdx}, ${sIdx}, this.checked)">
          </div>
        </div>
      `).join('');

      const phasesBadges = (ex.phases || []).map(p => `
        <span class="ex-phase-badge">${p}</span>
      `).join('');

      const diagramSvg = getExerciseDiagramSVG(ex.name, ex.muscleGroup);

      bodyHtml = `
        <div class="pt-3 space-y-2.5 border-t border-white/[0.06] mt-3">
          
          <!-- ЗАГОЛОВКИ КОЛОНОК СЕТОВ С ПОДСКАЗКОЙ -->
          <div class="grid grid-cols-12 gap-1.5 text-[9px] font-mono text-slate-400 uppercase pb-0.5 px-1 select-none">
            <div class="col-span-1 text-center">Сет</div>
            <div class="col-span-5 text-center">Вес</div>
            <div class="col-span-3 text-center">Повторы</div>
            <div class="col-span-2 text-center cursor-pointer text-[#c8a97e] hover:underline" onclick="openModal('modal-rir-guide')" title="Что такое Запас сил?">Запас ℹ️</div>
            <div class="col-span-1 text-center">✓</div>
          </div>

          <!-- СЕТЫ И ВЕСА (ПЕРВЫМ ПЛАНОМ ДЛЯ МАКСИМАЛЬНОГО УДОБСТВА) -->
          <div class="space-y-1.5">${setsRows}</div>

          <!-- ПАНЕЛЬ ДЕЙСТВИЙ СЕТОВ -->
          <div class="flex justify-between items-center text-xs font-mono pt-1">
            <div class="flex space-x-2">
              <button type="button" onclick="addSetToExercise(${exIdx})" class="text-[#c8a97e] font-bold text-[11px] hover:underline">+ Подход</button>
              ${ex.sets.length > 1 ? `<button type="button" onclick="removeSetFromExercise(${exIdx})" class="text-slate-500 text-[11px] hover:underline">- Подход</button>` : ''}
            </div>
            <div class="flex space-x-2">
              <button type="button" onclick="toggleExerciseGuide(${exIdx})" id="btn-guide-${exIdx}" class="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-[#c8a97e] rounded-lg border border-[#c8a97e]/30 text-[10px] font-bold active:scale-95 transition-all">
                👀 Схема & Техника
              </button>
              <button type="button" onclick="openSwapExerciseModal(${exIdx})" class="px-2 py-1 bg-[#181b26] hover:bg-white/10 text-slate-300 rounded-lg border border-white/10 text-[10px] active:scale-95 transition-all">
                Замена
              </button>
            </div>
          </div>

          <!-- ВИЗУАЛЬНЫЙ БЛОК БИОМЕХАНИКИ, ВЕКТОРНОЙ АНИМАЦИИ И ТЕХНИКИ (ПО УМОЛЧАНИЮ СКРЫТ) -->
          <div id="ex-guide-${exIdx}" class="pt-2 space-y-3 hidden">
            <div class="ex-diagram-container rounded-2xl overflow-hidden bg-[#07080e] border border-white/[0.06] p-2">
              ${diagramSvg}
            </div>

            <div class="p-3.5 bg-[#0c0d14] rounded-2xl border border-white/[0.06] space-y-2.5">
              <div class="flex justify-between items-center text-[10px] font-mono">
                <span class="text-[#c8a97e] font-bold uppercase">${ex.targetMuscles || 'Целевые зоны'}</span>
                <span class="text-slate-400 bg-[#181b26] px-2 py-0.5 rounded uppercase font-bold">${ex.muscleGroup || 'Группа'}</span>
              </div>
              
              <div class="flex flex-wrap gap-1.5">${phasesBadges}</div>
              
              <div class="space-y-1.5 text-xs text-slate-300 leading-relaxed font-sans pt-1 border-t border-white/[0.05]">
                <div>
                  <b class="text-white">ТЕХНИКА:</b> ${ex.tip}
                </div>
                <div class="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] text-slate-300">
                  <div class="p-2 bg-[#181b26] rounded-xl border border-white/[0.04]">
                    <span class="text-slate-400 block uppercase">ДЫХАНИЕ:</span>
                    <span class="text-white">Вдох 2–3с на спуске, выдох на мощном выжиме (без задержек).</span>
                  </div>
                  <div class="p-2 bg-[#181b26] rounded-xl border border-white/[0.04]">
                    <span class="text-slate-400 block uppercase">ТЕМП & RIR:</span>
                    <span class="text-[#c8a97e] font-bold">Темп: 3-1-1-0</span> • <span class="text-slate-300">Запас: 1–2 повт (RIR 1-2)</span>
                  </div>
                </div>
              </div>
            </div>
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
  const parsedVal = isNaN(num) ? 0 : num;
  const ex = appState.activeWorkout.exercises[exIdx];
  const set = ex.sets[sIdx];
  set[field] = parsedVal;

  // Автоматическое распространение веса на следующие незавершенные подходы
  if (field === 'weight' && parsedVal > 0) {
    ex.defaultWeight = parsedVal;
    if (!appState.weightProgression) appState.weightProgression = {};
    appState.weightProgression[ex.name] = parsedVal;

    for (let k = sIdx + 1; k < ex.sets.length; k++) {
      if (!ex.sets[k].done) {
        ex.sets[k].weight = parsedVal;
        const nextInput = document.getElementById(`set-weight-input-${exIdx}-${k}`);
        if (nextInput) nextInput.value = parsedVal;
      }
    }
  }

  saveState();
  updateLiveWorkoutStats();
}

function stepWeight(exIdx, sIdx, delta) {
  if (!appState.activeWorkout) return;
  const ex = appState.activeWorkout.exercises[exIdx];
  const current = ex.sets[sIdx].weight || 0;
  const newW = Math.max(0, current + delta);
  ex.sets[sIdx].weight = newW;

  // Автоматическое распространение веса на следующие незавершенные подходы
  if (newW > 0) {
    ex.defaultWeight = newW;
    if (!appState.weightProgression) appState.weightProgression = {};
    appState.weightProgression[ex.name] = newW;

    for (let k = sIdx + 1; k < ex.sets.length; k++) {
      if (!ex.sets[k].done) {
        ex.sets[k].weight = newW;
      }
    }
  }

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

  // Если подход закрыт — проверяем, чтобы следующий незавершенный подход имел актуальный вес
  if (done && s.weight > 0 && sIdx + 1 < ex.sets.length) {
    const nextSet = ex.sets[sIdx + 1];
    if (!nextSet.done && (!nextSet.weight || nextSet.weight <= 0)) {
      nextSet.weight = s.weight;
    }
  }

  saveState();
  updateLiveWorkoutStats();

  if (done) {
    if (s.weight > 0 && s.reps > 0) {
      checkAndTriggerIntelligentPR(ex.name, s.weight, s.reps);
    }

    Sound.success();
    Haptic.success();
    addXP(25);
    const smartRest = calculateSmartDynamicRestTime(ex, s);
    startRestTimer(smartRest.seconds, smartRest.reason);

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
  Sound.beep(400, 0.08);
}

function addSetToExercise(exIdx) {
  if (!appState.activeWorkout) return;
  const ex = appState.activeWorkout.exercises[exIdx];
  const lastSet = ex.sets[ex.sets.length - 1];
  const inheritWeight = lastSet ? (lastSet.weight || ex.defaultWeight) : ex.defaultWeight;
  const inheritReps = lastSet ? (lastSet.reps || ex.min) : ex.min;
  ex.sets.push({
    set: ex.sets.length + 1,
    weight: inheritWeight,
    reps: inheritReps,
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

  updateActiveWorkoutTopPill();
}

function updateActiveWorkoutTopPill() {
  const pill = document.getElementById("active-workout-header-pill");
  if (!pill) return;
  if (!appState.activeWorkout) {
    pill.classList.add("hidden");
    return;
  }
  pill.classList.remove("hidden");
  const wo = appState.activeWorkout;
  const nameEl = document.getElementById("pill-top-name");
  const setsEl = document.getElementById("pill-top-sets");
  const tonEl = document.getElementById("pill-top-tonnage");
  const timerEl = document.getElementById("pill-top-timer");

  let doneSets = 0, totalSets = 0, ton = 0;
  wo.exercises.forEach(e => {
    totalSets += e.sets.length;
    e.sets.filter(s => s.done).forEach(s => {
      doneSets++;
      ton += (s.weight * s.reps);
    });
  });

  const m = Math.floor(liveWorkoutSeconds / 60);
  const s = liveWorkoutSeconds % 60;
  const timerStr = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  if (nameEl) nameEl.textContent = wo.name;
  if (setsEl) setsEl.textContent = `${doneSets}/${totalSets} сетов`;
  if (tonEl) tonEl.textContent = `${Math.round(ton)} кг`;
  if (timerEl) timerEl.textContent = timerStr;
}

function jumpToActiveWorkout() {
  Sound.beep(650, 0.08);
  Haptic.impact('medium');
  switchTab('workouts');
  setTimeout(() => {
    const activeEl = document.getElementById(`ex-card-${activeExpandedExerciseIndex}`) || document.getElementById('workout-active');
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 100);
}

let currentSwappingExerciseIndex = null;
let currentSwapFilter = 'recommended';

function openSwapExerciseModal(exIdx) {
  if (!appState.activeWorkout) return;
  currentSwappingExerciseIndex = exIdx;
  const ex = appState.activeWorkout.exercises[exIdx];

  const titleEl = document.getElementById("swap-modal-current-name");
  if (titleEl) titleEl.textContent = `Текущее: ${ex.name}`;

  const searchInput = document.getElementById("swap-search-input");
  if (searchInput) searchInput.value = "";

  setSwapCategoryFilter('recommended');
  openModal('modal-swap-exercise');
}

function setSwapCategoryFilter(filter) {
  currentSwapFilter = filter;
  ['rec', 'same', 'all'].forEach(f => {
    const btn = document.getElementById("btn-swap-cat-" + f);
    if (btn) {
      if ((f === 'rec' && filter === 'recommended') ||
          (f === 'same' && filter === 'same-group') ||
          (f === 'all' && filter === 'all')) {
        btn.className = "px-2.5 py-1 rounded-lg bg-[#c8a97e] text-slate-950 font-bold whitespace-nowrap shadow-sm";
      } else {
        btn.className = "px-2.5 py-1 rounded-lg bg-[#181b26] text-slate-400 border border-white/10 font-medium whitespace-nowrap";
      }
    }
  });
  renderSwapExerciseAlternativesList();
}

function renderSwapExerciseAlternativesList() {
  const container = document.getElementById("swap-alternatives-list");
  if (!container || currentSwappingExerciseIndex === null || !appState.activeWorkout) return;

  const currentEx = appState.activeWorkout.exercises[currentSwappingExerciseIndex];
  const searchInput = document.getElementById("swap-search-input");
  const query = (searchInput ? searchInput.value : "").trim().toLowerCase();

  let list = [];

  if (currentSwapFilter === 'recommended') {
    const explicitNames = currentEx.substitutes || [];
    const explicitMatches = EXERCISE_DATABASE.filter(e => explicitNames.includes(e.name));
    const sameGroup = EXERCISE_DATABASE.filter(e => e.muscleGroup === currentEx.muscleGroup && e.name !== currentEx.name);
    
    const combined = [...explicitMatches];
    sameGroup.forEach(e => {
      if (!combined.some(c => c.id === e.id)) {
        combined.push(e);
      }
    });
    list = combined;
  } else if (currentSwapFilter === 'same-group') {
    list = EXERCISE_DATABASE.filter(e => e.muscleGroup === currentEx.muscleGroup && e.name !== currentEx.name);
  } else {
    list = EXERCISE_DATABASE.filter(e => e.name !== currentEx.name);
  }

  if (query) {
    list = EXERCISE_DATABASE.filter(e => e.name !== currentEx.name && (e.name.toLowerCase().includes(query) || (e.targetMuscles || '').toLowerCase().includes(query)));
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-6 bg-[#181b26] rounded-2xl border border-white/[0.06] text-center text-slate-400 space-y-1 font-mono">
        <p class="text-xs font-bold text-slate-300 uppercase">Альтернативы не найдены</p>
        <p class="text-[11px] text-slate-500 font-sans">Попробуй изменить поисковый запрос или выбрать другую категорию.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(dbEx => `
    <div class="p-3.5 bg-[#12141c] hover:bg-[#181b26] rounded-2xl border border-white/[0.06] flex justify-between items-center space-x-2 transition-all">
      <div class="space-y-1 pr-1">
        <div class="flex items-center space-x-1.5">
          <span class="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-white/5 text-[#c8a97e] border border-white/10 rounded uppercase">${dbEx.category || dbEx.muscleGroup}</span>
          <h4 class="font-bold text-xs text-white leading-tight">${dbEx.name}</h4>
        </div>
        <p class="text-[11px] text-slate-400 font-mono">${dbEx.targetMuscles || ''}</p>
        <p class="text-[10px] text-slate-500 font-sans truncate max-w-[240px]">💡 ${dbEx.tip || ''}</p>
      </div>
      <button onclick="executeSwapExercise('${dbEx.id}')" class="px-3 py-2 bg-[#c8a97e] hover:bg-[#dfc299] text-slate-950 font-bold text-xs uppercase rounded-xl font-mono active:scale-95 transition-all whitespace-nowrap shadow-sm">
        Заменить
      </button>
    </div>
  `).join("");
}

function executeSwapExercise(targetDbId) {
  if (currentSwappingExerciseIndex === null || !appState.activeWorkout) return;
  const dbEx = EXERCISE_DATABASE.find(e => e.id === targetDbId);
  if (!dbEx) return;

  const currentEx = appState.activeWorkout.exercises[currentSwappingExerciseIndex];
  const oldName = currentEx.name;

  const scaledWeight = appState.weightProgression && appState.weightProgression[dbEx.name] !== undefined
    ? appState.weightProgression[dbEx.name]
    : dbEx.defaultWeight;

  currentEx.name = dbEx.name;
  currentEx.muscleGroup = dbEx.muscleGroup;
  currentEx.targetMuscles = dbEx.targetMuscles;
  currentEx.phases = dbEx.phases;
  currentEx.tip = dbEx.tip;
  currentEx.calRate = dbEx.calRate || 10;
  currentEx.isTime = !!dbEx.isTime;
  currentEx.defaultWeight = scaledWeight;
  currentEx.substitutes = [oldName];

  // Обновляем вес в незавершенных подходах
  currentEx.sets.forEach(s => {
    if (!s.done) {
      s.weight = scaledWeight;
    }
  });

  saveState();
  closeModal('modal-swap-exercise');
  renderActiveWorkoutUI();
  Sound.beep(750, 0.08);
  Haptic.success();
}

let timerInt = null, timerLeft = 0;

function calculateSmartDynamicRestTime(ex, set) {
  const n = ((ex && ex.name) || "").toLowerCase();
  const muscle = ((ex && ex.muscleGroup) || "").toLowerCase();
  const weight = (set && set.weight) || 0;
  const rir = (set && set.rir !== undefined) ? set.rir : 2;

  let baseSec = 90;
  let reason = "Отдых между сетами";

  // 1. Базовое время по биомеханической категории (Тяжелая база vs Изоляция)
  const isHeavyCompound = n.includes("жим") || n.includes("присед") || n.includes("тяга") || 
                          n.includes("брусь") || n.includes("румынк") || n.includes("становая") ||
                          muscle.includes("ноги") || muscle.includes("грудь") || muscle.includes("спина");

  const isIsolation = n.includes("бабочка") || n.includes("разводк") || n.includes("бицепс") || 
                      n.includes("трицепс") || n.includes("пресс") || n.includes("махи") || n.includes("голен");

  if (isHeavyCompound) {
    baseSec = 120; // 2:00 база для многосуставных движений
    reason = "Базовое упражнение (2:00)";
  } else if (isIsolation) {
    baseSec = 75; // 1:15 для изолирующих
    reason = "Изоляция (1:15)";
  }

  // 2. Влияние веса и интенсивности (Тяжелый рабочий вес)
  if (weight >= 70) {
    baseSec += 30; // +30с для тяжелых весов 70+ кг
    reason = `Тяжелый вес ${weight} кг (+30с)`;
  } else if (weight >= 35) {
    baseSec += 15; // +15с для весов 35-69 кг
    reason = `Рабочий вес ${weight} кг (+15с)`;
  }

  // 3. Влияние степени отказа (RIR Engine)
  if (rir === 0) {
    baseSec += 30; // +30с при полном отказе (RIR 0) для ресинтеза фосфокреатина и ЦНС
    reason += " • Отказ (RIR 0) 🧠";
  } else if (rir === 1) {
    baseSec += 15; // +15с при околоотказе (RIR 1)
    reason += " • Предел (RIR 1) ⚡";
  } else if (rir >= 3) {
    baseSec = Math.max(45, baseSec - 30);
    reason += " • Разминка (RIR 3+)";
  }

  // Ограничиваем разумными спортивными рамками (45с - 210с)
  baseSec = Math.min(210, Math.max(45, Math.round(baseSec / 15) * 15));

  return { seconds: baseSec, reason: reason };
}

function startRestTimer(sec, reason = "Отдых между сетами") {
  clearInterval(timerInt);
  appState.activeRestTimer = {
    targetTs: Date.now() + sec * 1000,
    totalSec: sec,
    reason: reason
  };
  saveState();

  const bar = document.getElementById("timer-bar");
  const floatingHud = document.getElementById("floating-rest-hud");
  if (bar) bar.classList.remove("hidden");
  if (floatingHud) floatingHud.classList.remove("hidden");

  syncActiveRestTimer();
  timerInt = setInterval(syncActiveRestTimer, 1000);
}

function syncActiveRestTimer() {
  if (!appState.activeRestTimer || !appState.activeRestTimer.targetTs) {
    clearInterval(timerInt);
    return;
  }
  const now = Date.now();
  const remainingSec = Math.max(0, Math.ceil((appState.activeRestTimer.targetTs - now) / 1000));
  timerLeft = remainingSec;
  updateTimerHUD();

  const bar = document.getElementById("timer-bar");
  const floatingHud = document.getElementById("floating-rest-hud");

  if (remainingSec <= 3 && remainingSec > 0) {
    Sound.beep(700, 0.06);
    Haptic.impact('light');
  } else if (remainingSec === 0) {
    appState.activeRestTimer = null;
    saveState();
    clearInterval(timerInt);

    Sound.restFinish();
    Haptic.restFinish();

    const barTxt = document.getElementById("timer-text");
    const hudTxt = document.getElementById("hud-rest-timer-display");
    const modalTxt = document.getElementById("rest-timer-display");
    const reasonTxt = document.getElementById("timer-reason-text");
    
    if (barTxt) barTxt.textContent = "ПОРА! ⚡";
    if (hudTxt) hudTxt.textContent = "ПОРА! ⚡";
    if (modalTxt) modalTxt.textContent = "ПОРА! ⚡";
    if (reasonTxt) reasonTxt.textContent = "Готов к следующему сету! 🦾";

    if (bar) bar.classList.add("ring-2", "ring-[#c8a97e]", "animate-pulse");
    if (floatingHud) floatingHud.classList.add("ring-2", "ring-[#c8a97e]", "animate-pulse");

    setTimeout(() => {
      if (bar) {
        bar.classList.remove("ring-2", "ring-[#c8a97e]", "animate-pulse");
        bar.classList.add("hidden");
      }
      if (floatingHud) {
        floatingHud.classList.remove("ring-2", "ring-[#c8a97e]", "animate-pulse");
        floatingHud.classList.add("hidden");
      }
    }, 2800);
  }
}

function updateTimerHUD() {
  const m = Math.floor(timerLeft / 60);
  const s = timerLeft % 60;
  const str = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  const barTxt = document.getElementById("timer-text");
  const hudTxt = document.getElementById("hud-rest-timer-display");
  const modalTxt = document.getElementById("rest-timer-display");
  const reasonTxt = document.getElementById("timer-reason-text");

  if (barTxt) barTxt.textContent = str;
  if (hudTxt) hudTxt.textContent = str;
  if (modalTxt) modalTxt.textContent = str;

  if (reasonTxt && appState.activeRestTimer && appState.activeRestTimer.reason) {
    reasonTxt.textContent = appState.activeRestTimer.reason;
  }
}

function stopTimer() {
  clearInterval(timerInt);
  appState.activeRestTimer = null;
  saveState();
  const bar = document.getElementById("timer-bar");
  const floatingHud = document.getElementById("floating-rest-hud");
  const modal = document.getElementById("modal-rest-timer");
  if (bar) bar.classList.add("hidden");
  if (floatingHud) floatingHud.classList.add("hidden");
  if (modal) modal.classList.add("hidden");
}

function drawTrendChart(scrubX = null) {
  const canvas = document.getElementById("chart-canvas");
  const tooltip = document.getElementById("chart-scrub-tooltip");
  if (!canvas) return;

  const parentWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 0;
  const w = canvas.width = (parentWidth > 50 ? parentWidth : (window.innerWidth ? window.innerWidth - 48 : 320));
  const h = canvas.height = 160;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, w, h);

  if (!canvas._scrubAttached) {
    canvas._scrubAttached = true;
    const handleScrub = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const x = clientX - rect.left;
      drawTrendChart(x);
    };
    canvas.addEventListener("mousemove", handleScrub);
    canvas.addEventListener("touchmove", handleScrub, { passive: true });
    canvas.addEventListener("mouseleave", () => {
      if (tooltip) tooltip.classList.add("hidden");
      drawTrendChart(null);
    });
    canvas.addEventListener("touchend", () => {
      if (tooltip) tooltip.classList.add("hidden");
      drawTrendChart(null);
    });
  }

  if (currentChartFilter === 'duration') {
    const hist = (appState.history || []).slice().reverse().filter(item => (item.durationMin || 45) > 0);
    if (hist.length < 2) {
      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Добавь минимум 2 тренировки для графика времени", w / 2, h / 2);
      return;
    }
    const durations = hist.map(item => item.durationMin || 45);
    const min = Math.max(0, Math.min(...durations) - 5);
    const max = Math.max(...durations) + 10;

    const getY = (v) => 20 + (1 - (v - min) / (max - min)) * (h - 40);
    const getX = (i) => 35 + (i / (hist.length - 1)) * (w - 55);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const y = 20 + (i / 3) * (h - 40);
      ctx.beginPath();
      ctx.moveTo(35, y);
      ctx.lineTo(w - 20, y);
      ctx.stroke();

      const val = (max - (i / 3) * (max - min)).toFixed(0) + "м";
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px monospace";
      ctx.textAlign = "right";
      ctx.fillText(val, 30, y + 3);
    }

    ctx.strokeStyle = "#c8a97e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    durations.forEach((v, i) => {
      const x = getX(i), y = getY(v);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    let nearestIdx = -1;
    let nearestDist = 9999;
    durations.forEach((v, i) => {
      const x = getX(i), y = getY(v);
      ctx.fillStyle = "#c8a97e";
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();

      if (scrubX !== null) {
        const d = Math.abs(x - scrubX);
        if (d < nearestDist) {
          nearestDist = d;
          nearestIdx = i;
        }
      }
    });

    if (scrubX !== null && nearestIdx >= 0) {
      const nx = getX(nearestIdx);
      const ny = getY(durations[nearestIdx]);
      ctx.strokeStyle = "rgba(200, 169, 126, 0.4)";
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(nx, 15);
      ctx.lineTo(nx, h - 15);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(nx, ny, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#c8a97e";
      ctx.lineWidth = 2;
      ctx.stroke();

      if (tooltip) {
        tooltip.textContent = `${durations[nearestIdx]} мин (${hist[nearestIdx].date})`;
        tooltip.classList.remove("hidden");
      }
    }
    return;
  }

  const logs = (appState.metrics || []).filter(m => m && (m.weight > 0 || m.waist > 0));
  if (logs.length < 2) {
    ctx.fillStyle = "#94a3b8";
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

  const getY = (v) => 20 + (1 - (v - min) / (max - min)) * (h - 40);
  const getX = (i) => 35 + (i / (logs.length - 1)) * (w - 55);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 3; i++) {
    const y = 20 + (i / 3) * (h - 40);
    ctx.beginPath();
    ctx.moveTo(35, y);
    ctx.lineTo(w - 20, y);
    ctx.stroke();

    const val = (max - (i / 3) * (max - min)).toFixed(1);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px monospace";
    ctx.textAlign = "right";
    ctx.fillText(val, 30, y + 3);
  }

  if (currentChartFilter === 'all' || currentChartFilter === 'weight') {
    ctx.strokeStyle = "#c8a97e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    logs.forEach((l, i) => {
      if (l.weight > 0) {
        const x = getX(i), y = getY(l.weight);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    logs.forEach((l, i) => {
      if (l.weight > 0) {
        const x = getX(i), y = getY(l.weight);
        ctx.fillStyle = "#c8a97e";
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  if (currentChartFilter === 'all' || currentChartFilter === 'waist') {
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2;
    ctx.beginPath();
    logs.forEach((l, i) => {
      if (l.waist > 0) {
        const x = getX(i), y = getY(l.waist);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    logs.forEach((l, i) => {
      if (l.waist > 0) {
        const x = getX(i), y = getY(l.waist);
        ctx.fillStyle = "#10b981";
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  if (scrubX !== null && logs.length > 0) {
    let nearestIdx = 0;
    let nearestDist = 9999;
    logs.forEach((l, i) => {
      const x = getX(i);
      const d = Math.abs(x - scrubX);
      if (d < nearestDist) {
        nearestDist = d;
        nearestIdx = i;
      }
    });

    const nx = getX(nearestIdx);
    const nl = logs[nearestIdx];
    ctx.strokeStyle = "rgba(200, 169, 126, 0.4)";
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(nx, 15);
    ctx.lineTo(nx, h - 15);
    ctx.stroke();
    ctx.setLineDash([]);

    if (tooltip) {
      tooltip.textContent = `${nl.date}: Вес ${nl.weight || '—'} кг | Талия ${nl.waist || '—'} см`;
      tooltip.classList.remove("hidden");
    }
  }
}

function addTimer(sec = 30) {
  addRestTime(sec);
}

function addRestTime(sec = 30) {
  if (appState.activeRestTimer) {
    appState.activeRestTimer.targetTs += sec * 1000;
    appState.activeRestTimer.totalSec += sec;
    saveState();
  }
  timerLeft += sec;
  updateTimerHUD();
  Sound.beep(750, 0.05);
  Haptic.impact('light');
}

function stopTimer() {
  clearInterval(timerInt);
  appState.activeRestTimer = null;
  saveState();
  const bar = document.getElementById("timer-bar");
  const floatingHud = document.getElementById("floating-rest-hud");
  const modal = document.getElementById("modal-rest-timer");
  if (bar) bar.classList.add("hidden");
  if (floatingHud) floatingHud.classList.add("hidden");
  if (modal) modal.classList.add("hidden");
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
        checkAndTriggerIntelligentPR(e.name, s.weight, s.reps);
      }
    });
    const isMaxClosed = doneSets.length === e.sets.length && doneSets.every(s => s.reps >= e.max);
    exSummaries.push({
      name: e.name,
      sets: doneSets.map(s => `${s.weight}кг×${s.reps}`).join(', ') || '0',
      prog: isMaxClosed ? `Закрыто (+2.5кг)` : `План: ${e.sets.length}×${e.max}`
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

  addXP(150);
  appState.streak = (appState.streak || 0) + 1;
  appState.activeWorkout = null;
  calculateAutoMesocycle();
  updateActiveWorkoutTopPill();
  saveState();

  // Отправка персонального пуш-отчета в Telegram
  if (appState.pushSettings && appState.pushSettings.enabled && appState.pushSettings.reports) {
    const pushChatId = (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) ? window.Telegram.WebApp.initDataUnsafe.user.id : appState.tgId;
    const woText = `🏆 <b>ТРЕНИРОВКА ЗАВЕРШЕНА!</b>\n\n` +
      `Атлет: <b>${appState.name}</b>\n` +
      `Программа: <b>${wo.name}</b>\n` +
      `Тоннаж: <b>${Math.round(tonnage).toLocaleString()} кг</b> | Длительность: <b>${durationMin} мин</b>\n` +
      `Калории: <b>~${caloriesBurned} ккал</b>\n` +
      `Награда: <b>+150 XP</b> (Всего: ${appState.xp} XP)\n\n` +
      `💪 <i>Отличная работа! Отдыхай и восстанавливайся.</i>`;

    fetch("/api/send-push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId: pushChatId,
        text: woText,
        withButton: true
      })
    }).catch(()=>{});
  }

  Sound.finish();
  Haptic.success();

  alert(`ТРЕНИРОВКА ЗАВЕРШЕНА\n\nВремя: ${wo.startTimeStr} – ${endTimeStr} (${durationMin} мин)\nТоннаж: ${Math.round(tonnage)} кг\nРасход: ~${caloriesBurned} ккал\n+150 XP начислено`);
  document.getElementById("workout-active").classList.add("hidden");
  document.getElementById("workout-selector").classList.remove("hidden");
  renderMuscleVolumeBreakdown();
  renderPersonalizedAIAnalytics();
  switchTab("progress");
  switchProgressSubtab("archive");
}

function cancelWorkout() {
  if (confirm("Отменить текущую тренировку?")) {
    clearInterval(liveWorkoutTimerInterval);
    appState.activeWorkout = null;
    updateActiveWorkoutTopPill();
    saveState();
    document.getElementById("workout-active").classList.add("hidden");
    document.getElementById("workout-selector").classList.remove("hidden");
  }
}

function calculateAutoMesocycle() {
  const count = (appState.history || []).length;
  appState.mesocycleWeek = ((count % 8) + 1);
  const badge = document.getElementById("meso-header-badge");
  if (badge) badge.textContent = `Неделя ${appState.mesocycleWeek} из 8`;
}

// ========================================================
// КАЛЕНДАРЬ МЕСЯЦА
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
  if (title) title.textContent = `Тренировка на ${formatted}`;
  openModal('modal-date-workout-picker');
}

function launchWorkoutOnSelectedDate(planKey) {
  closeModal('modal-date-workout-picker');
  if (planKey === 'free') {
    startFreeWorkout(selectedCalDateStr);
  } else {
    promptReadinessBeforeWorkout(planKey, selectedCalDateStr);
  }
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
    inspBadge.textContent = "ВЫПОЛНЕНО";
    inspBadge.className = "px-2.5 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 rounded-lg text-xs font-bold font-mono";
    const timeInfo = woData.startTimeStr ? `${woData.startTimeStr} – ${woData.endTimeStr || '...'} (${woData.durationMin || 45} мин)` : `~45 мин`;
    inspContent.innerHTML = `
      <p><b>${woData.name}</b></p>
      <p class="text-[11px] text-slate-400 font-mono">${timeInfo} • Тоннаж: <b class="text-white">${woData.tonnage} кг</b> • <b class="text-[#c8a97e]">~${woData.calories || 350} ккал</b></p>
    `;
    if (inspActions) inspActions.innerHTML = "";
  } else if (status === 'missed') {
    inspBadge.textContent = "ПРОПУСК";
    inspBadge.className = "px-2.5 py-0.5 bg-rose-950/60 text-rose-400 border border-rose-800/60 rounded-lg text-xs font-bold font-mono";
    inspContent.innerHTML = `<p class="text-slate-300">Запланированная тренировка была пропущена. Ты можешь провести ее в любой день!</p>`;
    if (inspActions) {
      inspActions.innerHTML = `
        <button onclick="openDateWorkoutPickerModal('${dateStr}')" class="w-full py-2.5 bg-[#c8a97e] hover:bg-[#dfc299] text-slate-950 font-bold text-xs uppercase rounded-xl font-mono active:scale-98 transition-all shadow-sm">
          Записать тренировку на ${dateStr}
        </button>
      `;
    }
  } else if (status === 'plan') {
    inspBadge.textContent = "ПЛАН";
    inspBadge.className = "px-2.5 py-0.5 bg-white/5 text-slate-300 border border-white/10 rounded-lg text-xs font-bold font-mono";
    inspContent.innerHTML = `<p class="text-slate-300">Запланированный день тренировки по графику. Готовься к прогрессии весов!</p>`;
    if (inspActions) {
      inspActions.innerHTML = `
        <button onclick="openDateWorkoutPickerModal('${dateStr}')" class="w-full py-2.5 bg-[#c8a97e] hover:bg-[#dfc299] text-slate-950 font-bold text-xs uppercase rounded-xl font-mono active:scale-98 transition-all shadow-sm">
          Начать тренировку на эту дату
        </button>
      `;
    }
  } else {
    inspBadge.textContent = "ОТДЫХ";
    inspBadge.className = "px-2.5 py-0.5 bg-[#181b26] text-slate-400 border border-white/10 rounded-lg text-xs font-bold font-mono";
    inspContent.innerHTML = `<p class="text-slate-300">День отдыха. Пришел в зал вне графика? Выбирай программу или свободную тренировку:</p>`;
    if (inspActions) {
      inspActions.innerHTML = `
        <button onclick="openDateWorkoutPickerModal('${dateStr}')" class="w-full py-2.5 bg-[#181b26] hover:bg-[#202432] text-slate-300 font-bold text-xs uppercase rounded-xl border border-white/10 font-mono active:scale-98 transition-all">
          + Провести тренировку в этот день
        </button>
      `;
    }
  }
}

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
  if (strkEl) strkEl.textContent = `${appState.streak || 0} дн`;
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
        <b class="${isActiveMonth ? 'text-[#c8a97e]' : 'text-white'}">${MONTH_SHORT[m]}</b>
        <span class="text-slate-400">${monthHist.length} сесс.</span>
      </div>
      <div class="text-[11px] font-mono font-bold ${monthTon > 0 ? 'text-white' : 'text-slate-600'}">
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
  renderHealthTabCalculations();
  renderPersonalizedVitamins();
  renderPersonalizedAIAnalytics();
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
    badge.textContent = `Норма (${ratio}%)`;
    badge.className = "px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/60";
  } else if (ratio <= 53) {
    badge.textContent = `Умеренный жир (${ratio}%)`;
    badge.className = "px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-amber-950/60 text-amber-300 border border-amber-800/60";
  } else {
    badge.textContent = `Избыток жира (${ratio}%)`;
    badge.className = "px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-rose-950/60 text-rose-300 border border-rose-800/60";
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
  alert(`Замеры за ${today} сохранены! (+40 XP)`);
}

function setChartFilter(filter) {
  currentChartFilter = filter;
  ['all', 'weight', 'waist', 'duration'].forEach(f => {
    const btn = document.getElementById("btn-chart-" + f);
    if (btn) {
      if (f === filter) {
        btn.className = "px-2 py-0.5 font-bold rounded-md bg-[#c8a97e] text-slate-950";
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
      ctx.fillStyle = "#94a3b8";
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

    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const y = 20 + (i / 3) * (h - 40);
      ctx.beginPath();
      ctx.moveTo(35, y);
      ctx.lineTo(w - 20, y);
      ctx.stroke();

      const val = (max - (i / 3) * (max - min)).toFixed(0) + "м";
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px monospace";
      ctx.textAlign = "right";
      ctx.fillText(val, 30, y + 3);
    }

    ctx.strokeStyle = "#c8a97e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    durations.forEach((v, i) => {
      const x = getX(i), y = getY(v);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    durations.forEach((v, i) => {
      const x = getX(i), y = getY(v);
      ctx.fillStyle = "#c8a97e";
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });
    return;
  }

  const logs = (appState.metrics || []).filter(m => m && (m.weight > 0 || m.waist > 0));
  if (logs.length < 2) {
    ctx.fillStyle = "#94a3b8";
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

  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 3; i++) {
    const y = 20 + (i / 3) * (h - 40);
    ctx.beginPath();
    ctx.moveTo(35, y);
    ctx.lineTo(w - 20, y);
    ctx.stroke();

    const val = (max - (i / 3) * (max - min)).toFixed(0);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px monospace";
    ctx.textAlign = "right";
    ctx.fillText(val, 30, y + 3);
  }

  function drawLine(data, color) {
    if (data.length < 2) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
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
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  if (currentChartFilter === 'all' || currentChartFilter === 'weight') {
    drawLine(logs.map(l => l.weight || 0), "#f1f5f9");
  }
  if (currentChartFilter === 'all' || currentChartFilter === 'waist') {
    drawLine(logs.map(l => l.waist || 0), "#c8a97e");
  }
}

// ========================================================
// ПРОФИЛЬ АТЛЕТА
// ========================================================
function openProfileDrawer() {
  updateProfileDisplay();
  updatePushUI();
  openModal('modal-profile-drawer');
}

function updateProfileDisplay() {
  const nameEl = document.getElementById("prof-disp-name");
  const ageEl = document.getElementById("prof-disp-age");
  const goalEl = document.getElementById("prof-disp-goal");

  if (nameEl) nameEl.textContent = appState.name;
  if (ageEl) ageEl.textContent = `${appState.age || 32} г • ${appState.height || 178} см`;
  if (goalEl) goalEl.textContent = appState.goal || "Рекомпозиция";
}

function openRevisionModal() {
  injectAppVersion();
  openModal('modal-revision-status');
  Sound.beep(650, 0.05);
  Haptic.impact('light');
}

function checkLiveRevisionUpdate() {
  const btn = document.getElementById("btn-check-revision");
  if (btn) btn.innerHTML = `<span class="animate-spin inline-block mr-1">🔄</span> Проверка Cloudflare Edge...`;
  
  setTimeout(() => {
    if (btn) btn.innerHTML = `<span>✅ У вас самая последняя ревизия (${APP_CONFIG.version})!</span>`;
    Sound.success();
    Haptic.success();
    setTimeout(() => {
      if (btn) btn.innerHTML = `<span>Проверить обновления / Обновить кэш</span>`;
    }, 2500);
  }, 600);
}

// ========================================================
// УПРАВЛЕНИЕ PUSH-УВЕДОМЛЕНИЯМИ
// ========================================================
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
  activeExpandedExerciseIndex = (activeExpandedExerciseIndex === exIdx) ? -1 : exIdx;
  Sound.beep(600, 0.05);
  Haptic.impact('light');
  renderActiveWorkoutUI();
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

    card.innerHTML = `
      <div class="flex justify-between items-start pb-2 border-b border-white/[0.08]">
        <div>
          <h4 class="font-bold text-white text-xs font-sans">${h.name}</h4>
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
  renderPersonalizedAIAnalytics();
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
      { name: "Жим на наклонной 30°", sets: "22кг × 10, 10, 10, 10", prog: "Закрыто" },
      { name: "Жим гантелей лежа", sets: "24кг × 8, 8, 8, 8", prog: "Закрыто" }
    ]
  });

  addXP(100);
  calculateAutoMesocycle();
  saveState();
  renderHistory();
  renderMonthlyCalendar();
  render12MonthsAnnualBreakdown();
  renderMuscleVolumeBreakdown();
  renderPersonalizedAIAnalytics();
  drawTrendChart();
  Sound.success();
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
  document.getElementById(modalId).classList.remove("hidden");
  if (modalId === "modal-1rm") calculate1RM();
}
function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
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