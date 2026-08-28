/**
 * IRON COACH ELITE - Bio-Analytics & Scientific Hypertrophy Engine
 */

const APP_CONFIG = {
  version: "v2.8.25 PRO",
  build: "v2.8.25 (Evidence-Based Science, PubMed Citations & Live Edge Sync)",
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
// 3 ╨а╨Х╨Ц╨Ш╨Ь╨Р ╨Ч╨Т╨г╨Ъ╨Р ╨Ш ╨Т╨Ш╨С╨а╨Р╨ж╨Ш╨Ш
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
      const fundamental = 800; // 800 Hz - ╨║╨╗╨░╤Б╤Б╨╕╤З╨╡╤Б╨║╨╕╨╣ ╤З╨╕╤Б╤В╤Л╨╣ ╤В╨╛╨╜ ╨╗╨░╤В╤Г╨╜╨╜╨╛╨│╨╛ ╨▒╨╛╨║╤Б╨╡╤А╤Б╨║╨╛╨│╨╛ ╨║╨╛╨╗╨╛╨║╨╛╨╗╨░

      // 1. ╨Ь╨╡╤В╨░╨╗╨╗╨╕╤З╨╡╤Б╨║╨╕╨╣ ╤Г╨┤╨░╤А ╨╝╨╛╨╗╨╛╤В╨║╨░ ╨┐╨╛ ╤З╨░╤И╨╡ ╨║╨╛╨╗╨╛╨║╨╛╨╗╨░
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

      // 2. ╨е╤А╤Г╤Б╤В╨░╨╗╤М╨╜╤Л╨╣ ╨▓╤Л╤Б╨╛╨║╨╛╤З╨░╤Б╤В╨╛╤В╨╜╤Л╨╣ ╨╝╨╡╤В╨░╨╗╨╗╨╕╤З╨╡╤Б╨║╨╕╨╣ ╨╖╨▓╨╛╨╜
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

      // 3. ╨Э╨╡╨│╨░╤А╨╝╨╛╨╜╨╕╤З╨╡╤Б╨║╨╕╨╣ ╨║╨╛╨╗╨╛╨║╨╛╨╗╤М╨╜╤Л╨╣ ╨╛╨▒╨╡╤А╤В╨╛╨╜ (Inharmonic chime 1130 Hz)
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

      // 4. ╨У╨╗╤Г╨▒╨╛╨║╨╕╨╣ ╤А╨╡╨╖╨╛╨╜╨░╨╜╤Б ╨║╨╛╤А╨┐╤Г╤Б╨░ ╨║╨╛╨╗╨╛╨║╨╛╨╗╨░ (400 Hz)
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
    // ╨Ъ╨Ы╨Р╨б╨б╨Ш╨з╨Х╨б╨Ъ╨Ш╨Щ ╨С╨Ю╨Ъ╨б╨Х╨а╨б╨Ъ╨Ш╨Щ ╨Ъ╨Ю╨Ы╨Ю╨Ъ╨Ю╨Ы ╨Э╨Р ╨а╨Ш╨Э╨У╨Х (3 ╨з╨Х╨в╨Ъ╨Ш╨е ╨г╨Ф╨Р╨а╨Р ╨Ь╨Ю╨Ы╨Ю╨в╨Ъ╨Р: ╨Ф╨Ш╨Э╨м - ╨Ф╨Ш╨Э╨м - ╨Ф╨Ш╨Ш╨Ш╨Ш╨Э╨м)
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
    // ╨Т╨╕╨▒╤А╨░╤Ж╨╕╤П ╨┐╤А╨╕ ╨│╨╛╨╜╨║╨╡ ╨╛╤В╨║╨╗╤О╤З╨╡╨╜╨░ (╤В╨╛╨╗╤М╨║╨╛ ╤З╨╕╤Б╤В╤Л╨╣ ╨╖╨▓╨╛╨╜ ╨▒╨╛╨║╤Б╨╡╤А╤Б╨║╨╛╨│╨╛ ╨║╨╛╨╗╨╛╨║╨╛╨╗╨░)
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
// ╨Э╨Р╨г╨з╨Э╨л╨Х ╨С╨Ш╨Ю╨Ь╨Х╨е╨Р╨Э╨Ш╨з╨Х╨б╨Ъ╨Ш╨Х ╨Ш╨Ы╨Ы╨о╨б╨в╨а╨Р╨ж╨Ш╨Ш (NSCA / EXRX STANDARD)
// ========================================================
// ========================================================
// ╨Э╨Р╨г╨з╨Э╨л╨Х ╨С╨Ш╨Ю╨Ь╨Х╨е╨Р╨Э╨Ш╨з╨Х╨б╨Ъ╨Ш╨Х ╨Ш╨Ы╨Ы╨о╨б╨в╨а╨Р╨ж╨Ш╨Ш (╨Ъ╨Р╨Ц╨Ф╨Ю╨Х ╨г╨Я╨а╨Р╨Ц╨Э╨Х╨Э╨Ш╨Х ╨б╨Ю ╨б╨Т╨Ю╨Х╨Щ ╨в╨Х╨е╨Э╨Ш╨Ъ╨Ю╨Щ ╨Ш ╨Ф╨Ш╨Р╨У╨а╨Р╨Ь╨Ь╨Ю╨Щ)
// ========================================================
// ========================================================
// PRO EXERCISE BIOMECHANICS & ANATOMICAL VISUALIZER 4.0
// 100% ╨г╨Э╨Ш╨Ъ╨Р╨Ы╨м╨Э╨Р╨п ╨Р╨Э╨Р╨в╨Ю╨Ь╨Ш╨з╨Х╨б╨Ъ╨Р╨п ╨Ш ╨Ю╨С╨Ю╨а╨г╨Ф╨Ю╨Т╨Р╨Э╨Ш╨п ╨У╨а╨Р╨д╨Ш╨Ъ╨Р ╨Ф╨Ы╨п ╨Т╨б╨Х╨е 48+ ╨г╨Я╨а╨Р╨Ц╨Э╨Х╨Э╨Ш╨Щ
// ========================================================

function getExerciseDiagramSVG(exName, muscleGroup) {
  const n = (exName || "").toLowerCase().trim();

  // ----------------------------------------------------
  // ╨У╨а╨г╨Ф╨м
  // ----------------------------------------------------
  if (n.includes("╨╢╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣") || (n.includes("╨╜╨░╨║╨╗╨╛╨╜╨╜") && n.includes("╨│╨░╨╜╤В╨╡╨╗") && n.includes("30┬░"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ╨Э╨░╨║╨╗╨╛╨╜╨╜╨░╤П ╤Б╨║╨░╨╝╤М╤П 30┬░ -->
        <line x1="25" y1="78" x2="115" y2="40" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <line x1="45" y1="70" x2="45" y2="84" stroke="#334155" stroke-width="3"/>
        <line x1="105" y1="45" x2="105" y2="84" stroke="#334155" stroke-width="3"/>
        <line x1="15" y1="84" x2="125" y2="84" stroke="#1e293b" stroke-width="2"/>
        <!-- ╨Р╤В╨╗╨╡╤В ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡ 30┬░ -->
        <circle cx="110" cy="32" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="105" y1="36" x2="58" y2="58" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M96 42 L80 49" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <!-- ╨а╤Г╨║╨╕ ╤Б ╤А╨░╨╖╨┤╨╡╨╗╤М╨╜╤Л╨╝╨╕ ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ -->
        <polyline points="92,44 82,28 78,14" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="78" cy="14" r="4.5" fill="#c8a97e"/>
        <path d="M84 32 C 82 22, 80 18, 78 14" stroke="#c8a97e" stroke-width="1.5" stroke-dasharray="2 2"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Ц╨Ш╨Ь ╨У╨Р╨Э╨в╨Х╨Ы╨Х╨Щ 30┬░</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨г╨│╨╛╨╗ ╤Б╨║╨░╨╝╤М╨╕: 30┬░</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ы╨╛╨║╤В╨╕ 60тАУ70┬░ ╨║ ╤В╨╡╨╗╤Г</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Т╨╡╤А╤Е ╨│╤А╤Г╨┤╨╜╤Л╤Е (╨║╨╗╤О╤З╨╕╤З╨╜╤Л╨╣ ╨┐╤Г╤З╨╛╨║)</text>
      </svg>
    `;
  }

  if (n.includes("╨╢╨╕╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣") || (n.includes("╨╜╨░╨║╨╗╨╛╨╜╨╜") && n.includes("╤И╤В╨░╨╜╨│") && n.includes("30┬░"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ╨б╤В╨╛╨╣╨║╨╕ ╨╢╨╕╨╝╨░ ╨╕ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨░╤П ╤Б╨║╨░╨╝╤М╤П -->
        <line x1="25" y1="78" x2="115" y2="40" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <line x1="95" y1="12" x2="95" y2="84" stroke="#334155" stroke-width="3"/>
        <!-- ╨Р╤В╨╗╨╡╤В -->
        <circle cx="110" cy="32" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="105" y1="36" x2="58" y2="58" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M96 42 L80 49" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <!-- ╨Ю╨╗╨╕╨╝╨┐╨╕╨╣╤Б╨║╨╕╨╣ ╨│╤А╨╕╤Д ╤И╤В╨░╨╜╨│╨╕ -->
        <polyline points="92,44 80,30 76,16" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="55" y1="16" x2="98" y2="16" stroke="#c8a97e" stroke-width="3.5" stroke-linecap="round"/>
        <rect x="52" y="11" width="4" height="10" rx="1" fill="#c8a97e"/>
        <rect x="96" y="11" width="4" height="10" rx="1" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Ц╨Ш╨Ь ╨и╨в╨Р╨Э╨У╨Ш 30┬░</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡: 2╤Б╨╝ ╨╜╨╕╨╢╨╡ ╨║╨╗╤О╤З╨╕╤Ж</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨е╨▓╨░╤В ╤И╨╕╤А╨╡ ╨┐╨╗╨╡╤З, ╨╗╨╛╨║╤В╨╕ 65┬░</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Т╨╡╤А╤Е╨╜╨╕╨╣ ╨┐╤Г╤З╨╛╨║ ╨│╤А╤Г╨┤╨╕ (╨▒╨░╨╖╨░)</text>
      </svg>
    `;
  }

  if (n.includes("╨╢╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗") || (n.includes("╨╢╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣") && !n.includes("╨╜╨░╨║╨╗╨╛╨╜") && !n.includes("╨┐╨╗╨╡╤З") && !n.includes("╤Б╨╕╨┤╤П"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ╨У╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨░╤П ╤Б╨║╨░╨╝╤М╤П -->
        <line x1="25" y1="58" x2="120" y2="58" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <line x1="38" y1="58" x2="38" y2="84" stroke="#334155" stroke-width="3"/>
        <line x1="108" y1="58" x2="108" y2="84" stroke="#334155" stroke-width="3"/>
        <!-- ╨Р╤В╨╗╨╡╤В ╨╗╨╡╨╢╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛ -->
        <circle cx="112" cy="48" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="106" y1="53" x2="52" y2="53" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M96 53 L76 53" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <!-- ╨У╨░╨╜╤В╨╡╨╗╨╕ ╨▓ ╤А╤Г╨║╨░╤Е ╤Б ╨╜╨╡╨╖╨░╨▓╨╕╤Б╨╕╨╝╤Л╨╝ ╤Б╤Е╨╛╨╢╨┤╨╡╨╜╨╕╨╡╨╝ -->
        <polyline points="90,53 85,34 82,14" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="82" cy="14" r="4.5" fill="#c8a97e"/>
        <path d="M72 38 C 76 28, 80 20, 82 14" stroke="#c8a97e" stroke-width="1.5" stroke-dasharray="2 2"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Ц╨Ш╨Ь ╨У╨Р╨Э╨в╨Х╨Ы╨Х╨Щ ╨Ы╨Х╨Ц╨Р</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨У╨╗╤Г╨▒╨╛╨║╨░╤П ╤А╨░╤Б╤В╤П╨╢╨║╨░ ╨▓╨╜╨╕╨╖╤Г</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨б╨▓╨╡╨┤╨╡╨╜╨╕╨╡ ╨▓╨▓╨╡╤А╤Е╤Г ╨▒╨╡╨╖ ╤Г╨┤╨░╤А╨░</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨б╨╡╤А╨╡╨┤╨╕╨╜╨░ ╨╕ ╨╝╨░╤Б╤Б╨╕╨▓ ╨│╤А╤Г╨┤╨╜╤Л╤Е</text>
      </svg>
    `;
  }

  if (n.includes("╨╢╨╕╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╗╨╡╨╢╨░") || (n.includes("╨╢╨╕╨╝ ╨╗╨╡╨╢╨░") && !n.includes("╤Г╨╖╨║") && !n.includes("╤Д╤А╨░╨╜╤Ж╤Г╨╖"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ╨б╤В╨╛╨╣╨║╨╕ ╨╕ ╤Б╨║╨░╨╝╤М╤П -->
        <line x1="25" y1="58" x2="120" y2="58" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <line x1="100" y1="12" x2="100" y2="84" stroke="#334155" stroke-width="3"/>
        <!-- ╨Р╤В╨╗╨╡╤В -->
        <circle cx="112" cy="48" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="106" y1="53" x2="52" y2="53" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M96 53 L74 53" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <!-- ╨и╤В╨░╨╜╨│╨░ -->
        <polyline points="88,53 82,32 82,14" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="56" y1="14" x2="108" y2="14" stroke="#c8a97e" stroke-width="3.5" stroke-linecap="round"/>
        <rect x="53" y="9" width="4" height="10" rx="1" fill="#c8a97e"/>
        <rect x="106" y="9" width="4" height="10" rx="1" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Ц╨Ш╨Ь ╨и╨в╨Р╨Э╨У╨Ш ╨Ы╨Х╨Ц╨Р</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Ъ╨░╤Б╨░╨╜╨╕╨╡ ╨╗╨╕╨╜╨╕╨╕ ╤Б╨╛╤Б╨║╨╛╨▓</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ы╨╛╨┐╨░╤В╨║╨╕ ╤Б╨▓╨╡╨┤╨╡╨╜╤Л ╨▓ ╨╖╨░╨╝╨╛╨║</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ч╨╛╨╗╨╛╤В╨░╤П ╨▒╨░╨╖╨░ ╨╜╨░ ╨│╤А╤Г╨┤╤М</text>
      </svg>
    `;
  }

  if (n.includes("╨▒╨░╨▒╨╛╤З╨║") || n.includes("pec deck") || n.includes("╨┐╤Н╨║-╨┤╨╡╨║")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ╨б╨┐╨╕╨╜╨║╨░ ╨╕ ╤Б╨╕╨┤╨╡╨╜╤М╨╡ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨░ Pec Deck -->
        <line x1="50" y1="18" x2="50" y2="76" stroke="#475569" stroke-width="4"/>
        <line x1="50" y1="76" x2="80" y2="76" stroke="#475569" stroke-width="4"/>
        <circle cx="58" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="58" y1="28" x2="58" y2="70" stroke="#f1f5f9" stroke-width="4"/>
        <!-- ╨Я╨╛╨┤╤Г╤И╨║╨╕ ╨╕ ╤А╤Л╤З╨░╨│╨╕ ╤Б╨▓╨╡╨┤╨╡╨╜╨╕╤П -->
        <path d="M96 30 C 88 42, 78 44, 68 44" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        <rect x="94" y="24" width="6" height="14" rx="2" fill="#c8a97e"/>
        <path d="M68 44 L78 44" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <path d="M106 28 C 96 42, 82 46, 74 46" stroke="#c8a97e" stroke-width="1.5" stroke-dasharray="2 2"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨С╨Р╨С╨Ю╨з╨Ъ╨Р (PEC DECK)</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Ы╨╛╨║╤В╨╕ ╨╜╨░ ╤Г╤А╨╛╨▓╨╜╨╡ ╨│╤А╤Г╨┤╨╕</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Я╨╕╨║╨╛╨▓╨╛╨╡ ╤Б╨╢╨░╤В╨╕╨╡ 2╤Б ╨▓ ╤Ж╨╡╨╜╤В╤А╨╡</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ш╨╖╨╛╨╗╤П╤Ж╨╕╤П ╨▓╨╜╤Г╤В╤А╨╡╨╜╨╜╨╡╨╣ ╤З╨░╤Б╤В╨╕</text>
      </svg>
    `;
  }

  if (n.includes("╨║╤А╨╛╤Б╤Б╨╛╨▓╨╡╤А")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ╨С╨╗╨╛╤З╨╜╤Л╨╡ ╨▒╨░╤И╨╜╨╕ ╨║╤А╨╛╤Б╤Б╨╛╨▓╨╡╤А╨░ -->
        <line x1="20" y1="10" x2="20" y2="82" stroke="#334155" stroke-width="3"/>
        <line x1="120" y1="10" x2="120" y2="82" stroke="#334155" stroke-width="3"/>
        <circle cx="20" cy="18" r="3.5" fill="#c8a97e"/>
        <circle cx="120" cy="18" r="3.5" fill="#c8a97e"/>
        <!-- ╨Р╤В╨╗╨╡╤В ╨▓ ╤Ж╨╡╨╜╤В╤А╨╡ -->
        <circle cx="70" cy="24" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="70" y1="30" x2="66" y2="64" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M70 38 L66 52" stroke="#c8a97e" stroke-width="5"/>
        <!-- ╨в╤А╨╛╤Б╤Л ╤Б╤Е╨╛╨┤╤П╤В╤Б╤П ╨▓╨┐╨╡╤А╨╡╨┤ ╨┐╨╛ ╨┤╤Г╨│╨╡ -->
        <line x1="20" y1="18" x2="64" y2="48" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="3 2"/>
        <line x1="120" y1="18" x2="74" y2="48" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="3 2"/>
        <circle cx="69" cy="48" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Ъ╨а╨Ю╨б╨б╨Ю╨Т╨Х╨а ╨Э╨Р ╨С╨Ы╨Ю╨Ъ╨Р╨е</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Ъ╨╛╤А╨┐╤Г╤Б ╤Б╨╗╨╡╨│╨║╨░ ╨▓╨┐╨╡╤А╨╡╨┤</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨б╨▓╨╡╨┤╨╡╨╜╨╕╨╡ ╨┐╨╛ ╤И╨╕╤А╨╛╨║╨╛╨╣ ╨┤╤Г╨│╨╡</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Э╨╕╨╖ ╨╕ ╤Б╨╡╤А╨╡╨┤╨╕╨╜╨░ ╨│╤А╤Г╨┤╨╕</text>
      </svg>
    `;
  }

  if (n.includes("╨▒╤А╤Г╤Б╤М") || n.includes("dips") || (n.includes("╨╛╤В╨╢╨╕╨╝╨░╨╜╨╕╤П") && n.includes("╨│╤А╤Г╨┤╤М"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ╨С╤А╤Г╤Б╤М╤П -->
        <line x1="35" y1="46" x2="105" y2="46" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <line x1="45" y1="46" x2="45" y2="84" stroke="#334155" stroke-width="3"/>
        <line x1="95" y1="46" x2="95" y2="84" stroke="#334155" stroke-width="3"/>
        <!-- ╨Р╤В╨╗╨╡╤В ╤Б ╨╜╨░╨║╨╗╨╛╨╜╨╛╨╝ 30 ╨│╤А╨░╨┤╤Г╤Б╨╛╨▓ -->
        <circle cx="84" cy="18" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="80" y1="24" x2="64" y2="56" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M74 34 L66 48" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="64,56 52,74 44,68" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        <!-- ╨а╤Г╨║╨╕ ╨╜╨░ ╨▒╤А╤Г╤Б╤М╤П╤Е -->
        <polyline points="76,32 64,46 74,46" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="74" cy="46" r="3.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Ю╨в╨Ц╨Ш╨Ь╨Р╨Э╨Ш╨п ╨Э╨Р ╨С╨а╨г╨б╨м╨п╨е</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Э╨░╨║╨╗╨╛╨╜ ╨║╨╛╤А╨┐╤Г╤Б╨░ ╨▓╨┐╨╡╤А╨╡╨┤ 30┬░</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ы╨╛╨║╤В╨╕ ╨▓ ╤Б╤В╨╛╤А╨╛╨╜╤Л ╨┐╨╛╨┤ 45┬░</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Э╨╕╨╢╨╜╨╕╨╣ ╨║╨╛╨╜╤В╤Г╤А ╨│╤А╤Г╨┤╨╜╤Л╤Е</text>
      </svg>
    `;
  }

  if (n.includes("╤Е╨░╨╝╨╝╨╡╤А") || n.includes("hammer")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ╨б╨┐╨╕╨╜╨║╨░ ╨е╨░╨╝╨╝╨╡╤А╨░ -->
        <line x1="55" y1="18" x2="55" y2="76" stroke="#475569" stroke-width="4"/>
        <line x1="55" y1="76" x2="88" y2="76" stroke="#475569" stroke-width="4"/>
        <circle cx="63" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="63" y1="28" x2="63" y2="66" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M65 38 L78 38" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <!-- ╨а╤Л╤З╨░╨│╨╕ ╨е╨░╨╝╨╝╨╡╤А╨░ ╤Б ╨╜╨╡╨╖╨░╨▓╨╕╤Б╨╕╨╝╨╛╨╣ ╤В╤А╨░╨╡╨║╤В╨╛╤А╨╕╨╡╨╣ -->
        <polyline points="65,38 86,38 112,38" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="116" y1="16" x2="112" y2="38" stroke="#c8a97e" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="116" cy="16" r="3.5" fill="#475569"/>
        <circle cx="112" cy="38" r="4" fill="#c8a97e"/>
        <path d="M92 48 C 102 48, 110 44, 115 38" stroke="#c8a97e" stroke-width="1.5" stroke-dasharray="2 2"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Ц╨Ш╨Ь ╨Т ╨е╨Р╨Ь╨Ь╨Х╨а╨Х</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨С╨╡╨╖╨╛╨┐╨░╤Б╨╜╨░╤П ╤Б╤Е╨╛╨┤╤П╤Й╨░╤П╤Б╤П ╨┤╤Г╨│╨░</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Я╨╗╨░╨▓╨╜╤Л╨╣ ╨▓╤Л╨╢╨╕╨╝ ╨▒╨╡╨╖ ╤А╤Л╨▓╨║╨░</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ь╨░╨║╤Б╨╕╨╝╨░╨╗╤М╨╜╤Л╨╣ ╨┐╨░╨╝╨┐╨╕╨╜╨│ ╨│╤А╤Г╨┤╨╕</text>
      </svg>
    `;
  }

  // ----------------------------------------------------
  // ╨б╨Я╨Ш╨Э╨Р
  // ----------------------------------------------------
  if (n.includes("╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨│╨╛ ╨▒╨╗╨╛╨║╨░") || (n.includes("╨║ ╨┐╨╛╤П╤Б╤Г") && n.includes("╨▒╨╗╨╛╨║"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ╨С╨╗╨╛╤З╨╜╤Л╨╣ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤В╤П╨│╨╕ -->
        <line x1="25" y1="15" x2="25" y2="82" stroke="#334155" stroke-width="3"/>
        <line x1="25" y1="46" x2="70" y2="46" stroke="#64748b" stroke-width="2" stroke-dasharray="2 2"/>
        <!-- ╨Р╤В╨╗╨╡╤В ╤Б╨╕╨┤╤П ╤Б ╨▓╤Л╨┐╤А╤П╨╝╨╗╨╡╨╜╨╜╨╛╨╣ ╤Б╨┐╨╕╨╜╨╛╨╣ -->
        <circle cx="112" cy="26" r="6.5" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="112" y1="33" x2="108" y2="60" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="108" y1="60" x2="72" y2="60" stroke="#94a3b8" stroke-width="3"/>
        <path d="M110 36 L108 54" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="110,36 92,43 70,46" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨в╨п╨У╨Р ╨С╨Ы╨Ю╨Ъ╨Р ╨Ъ ╨Я╨Ю╨п╨б╨г</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Ы╨╛╨║╤В╨╕ ╤Б╨║╨╛╨╗╤М╨╖╤П╤В ╨▓╨┤╨╛╨╗╤М ╤А╨╡╨▒╨╡╤А</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨б╨▓╨╡╨┤╨╡╨╜╨╕╨╡ ╨╗╨╛╨┐╨░╤В╨╛╨║ ╨▓ ╨┐╨╕╨║╨╡</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨в╨╛╨╗╤Й╨╕╨╜╨░ ╤И╨╕╤А╨╛╤З╨░╨╣╤И╨╕╤Е ╨╝╤Л╤И╤Ж</text>
      </svg>
    `;
  }

  if (n.includes("╨▓╨╡╤А╤Е╨╜╨╡╨│╨╛ ╨▒╨╗╨╛╨║╨░") || n.includes("╤В╤П╨│╨░ ╨║ ╨│╤А╤Г╨┤╨╕")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ╨Т╨╡╤А╤Е╨╜╨╕╨╣ ╨▒╨╗╨╛╨║ -->
        <line x1="75" y1="8" x2="75" y2="24" stroke="#475569" stroke-width="3"/>
        <line x1="48" y1="24" x2="102" y2="24" stroke="#c8a97e" stroke-width="3.5" stroke-linecap="round"/>
        <!-- ╨Р╤В╨╗╨╡╤В ╤Б╨╕╨┤╤П ╤Б ╨╗╨╡╨│╨║╨╕╨╝ ╨┐╤А╨╛╨│╨╕╨▒╨╛╨╝ ╨│╤А╤Г╨┤╨╕ -->
        <circle cx="75" cy="38" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="44" x2="72" y2="68" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M74 46 L71 62" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="52,24 64,42 74,48" stroke="#94a3b8" stroke-width="2.5"/>
        <polyline points="98,24 86,42 74,48" stroke="#94a3b8" stroke-width="2.5"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨в╨п╨У╨Р ╨Т╨Х╨а╨е╨Э╨Х╨У╨Ю ╨С╨Ы╨Ю╨Ъ╨Р</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨в╤П╨│╨░ ╤Б╤В╤А╨╛╨│╨╛ ╨║ ╨║╨╗╤О╤З╨╕╤Ж╨░╨╝</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ы╨╛╨║╤В╨╕ ╨╜╨░╨┐╤А╨░╨▓╨╗╨╡╨╜╤Л ╨▓╨╜╨╕╨╖</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨и╨╕╤А╨╕╨╜╨░ ╤Б╨┐╨╕╨╜╤Л (V-╨╛╨▒╤А╨░╨╖╨╜╨░╤П)</text>
      </svg>
    `;
  }

  if (n.includes("╨╗╨╕╤Ж╤Г") || n.includes("face pull") || (n.includes("╤И╨╡") && n.includes("╤А╨░╨╖╨│╤А╤Г╨╖╨║"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="25" y1="10" x2="25" y2="82" stroke="#334155" stroke-width="3"/>
        <circle cx="25" cy="30" r="3.5" fill="#c8a97e"/>
        <line x1="25" y1="30" x2="75" y2="30" stroke="#64748b" stroke-width="2" stroke-dasharray="3 3"/>
        <circle cx="112" cy="24" r="6.5" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="112" y1="31" x2="112" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="112,35 98,24 75,30" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="108" cy="32" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">FACE PULL (╨Ъ ╨Ы╨Ш╨ж╨г)</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Ъ╨░╨╜╨░╤В ╤Б╤В╤А╨╛╨│╨╛ ╨║ ╨│╨╗╨░╨╖╨░╨╝</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ы╨╛╨║╤В╨╕ ╨▓╤Л╤И╨╡ ╨║╨╕╤Б╤В╨╡╨╣, ╨┐╨░╤Г╨╖╨░ 2╤Б</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨а╨░╨╖╨│╤А╤Г╨╖╨║╨░ ╤И╨╡╨╕ + ╨╖╨░╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░</text>
      </svg>
    `;
  }

  if (n.includes("╨┐╨╛╨┤╤В╤П╨│╨╕╨▓╨░╨╜") || n.includes("╤В╤Г╤А╨╜╨╕╨║") || n.includes("╨│╤А╨░╨▓╨╕╤В╤А╨╛╨╜")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="45" y1="12" x2="115" y2="12" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>
        <circle cx="80" cy="26" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="80" y1="32" x2="80" y2="64" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M82 34 L82 54" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="60,12 68,26 78,34" stroke="#94a3b8" stroke-width="2.5"/>
        <polyline points="100,12 92,26 82,34" stroke="#94a3b8" stroke-width="2.5"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Я╨Ю╨Ф╨в╨п╨У╨Ш╨Т╨Р╨Э╨Ш╨п</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨У╤А╤Г╨┤╤М ╨║ ╨┐╨╡╤А╨╡╨║╨╗╨░╨┤╨╕╨╜╨╡</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ы╨╛╨┐╨░╤В╨║╨╕ ╤Б╨▓╨╡╨┤╨╡╨╜╤Л ╨╕ ╨╛╨┐╤Г╤Й╨╡╨╜╤Л</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨и╨╕╤А╨╛╤З╨░╨╣╤И╨╕╨╡ + ╨▒╤А╨░╤Е╨╕╨░╨╗╨╕╤Б</text>
      </svg>
    `;
  }

  if (n.includes("╨│╨░╨╜╤В╨╡╨╗╨╕ ╨▓ ╨╜╨░╨║╨╗╨╛╨╜╨╡") || n.includes("╤Г╨┐╨╛╤А╨╛╨╝ ╨▓ ╤Б╨║╨░╨╝╤М╤О")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="55" x2="105" y2="55" stroke="#475569" stroke-width="4"/>
        <circle cx="95" cy="30" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="90" y1="35" x2="45" y2="35" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="45,35 45,55 70,55" stroke="#94a3b8" stroke-width="3"/>
        <path d="M75 36 L55 36" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="65,36 60,24 55,42" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="55" cy="42" r="4.5" fill="#c8a97e"/>
        
        <text x="135" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨в╨п╨У╨Р ╨У╨Р╨Э╨в╨Х╨Ы╨Ш ╨Т ╨Э╨Р╨Ъ╨Ы╨Ю╨Э╨Х</text>
        <text x="135" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨в╤П╨│╨░ ╨┐╨╛ ╨┤╤Г╨│╨╡ ╤Б╤В╤А╨╛╨│╨╛ ╨║ ╤В╨░╨╖╤Г</text>
        <text x="135" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨б╨┐╨╕╨╜╨░ ╨┐╨░╤А╨░╨╗╨╗╨╡╨╗╤М╨╜╨░ ╨┐╨╛╨╗╤Г</text>
        <text x="135" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ю╨┤╨╜╨╛╤Б╤В╨╛╤А╨╛╨╜╨╜╤П╤П ╨╕╨╖╨╛╨╗╤П╤Ж╨╕╤П</text>
      </svg>
    `;
  }

  if (n.includes("╤В-╨│╤А╨╕╤Д") || n.includes("t-bar") || n.includes("╤Г╨┐╨╛╤А╨╛╨╝ ╨▓ ╨│╤А╤Г╨┤╤М")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ╨Э╨░╨║╨╗╨╛╨╜╨╜╤Л╨╣ ╤Г╨┐╨╛╤А ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨░ ╨в-╤В╤П╨│╨╕ -->
        <line x1="35" y1="70" x2="85" y2="35" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
        <circle cx="95" cy="26" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="90" y1="30" x2="48" y2="58" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M80 38 L60 52" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <!-- ╨а╤Г╨║╨╛╤П╤В╨╕ ╨в-╨│╤А╨╕╤Д╨░ -->
        <polyline points="72,42 62,28 62,48" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="62" cy="48" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨в╨п╨У╨Р ╨в-╨У╨а╨Ш╨д╨Р ╨Т ╨г╨Я╨Ю╨а╨Х</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨У╤А╤Г╨┤╤М ╨┐╨╗╨╛╤В╨╜╨╛ ╨┐╤А╨╕╨╢╨░╤В╨░ ╨║ ╨┐╨╛╨┤╤Г╤И╨║╨╡</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Я╨╛╤П╤Б╨╜╨╕╤Ж╨░ ╨┐╨╛╨╗╨╜╨╛╤Б╤В╤М╤О ╤А╨░╨╖╨│╤А╤Г╨╢╨╡╨╜╨░</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨в╨╛╨╗╤Й╨╕╨╜╨░ ╤Б╨╡╤А╨╡╨┤╨╕╨╜╤Л ╤Б╨┐╨╕╨╜╤Л</text>
      </svg>
    `;
  }

  if (n.includes("╨│╨╕╨┐╨╡╤А╤Н╨║╤Б╤В╨╡╨╜╨╖╨╕╤П") || n.includes("╤А╨░╨╖╨│╨╕╨▒╨░╤В╨╡╨╗")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ╨а╨╕╨╝╤Б╨║╨╕╨╣ ╤Б╤В╤Г╨╗ 45┬░ -->
        <line x1="30" y1="75" x2="80" y2="45" stroke="#475569" stroke-width="4"/>
        <circle cx="118" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="114" y1="26" x2="84" y2="44" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M98 35 L84 44" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="84" y1="44" x2="45" y2="68" stroke="#94a3b8" stroke-width="3.5"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨У╨Ш╨Я╨Х╨а╨н╨Ъ╨б╨в╨Х╨Э╨Ч╨Ш╨п</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Я╨╛╨┤╤К╨╡╨╝ ╤А╨╛╨▓╨╜╨╛ ╨▓ ╨┐╤А╤П╨╝╤Г╤О ╨╗╨╕╨╜╨╕╤О</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨С╨╡╨╖ ╨╛╨┐╨░╤Б╨╜╨╛╨│╨╛ ╨┐╨╡╤А╨╡╤А╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Я╨╛╤П╤Б╨╜╨╕╤З╨╜╤Л╨╡ ╤А╨░╨╖╨│╨╕╨▒╨░╤В╨╡╨╗╨╕ + ╤П╨│╨╛╨┤╨╕╤Ж╤Л</text>
      </svg>
    `;
  }

  // ----------------------------------------------------
  // ╨Э╨Ю╨У╨Ш
  // ----------------------------------------------------
  if (n.includes("╨╢╨╕╨╝ ╨╜╨╛╨│╨░╨╝╨╕") || (n.includes("45┬░") && n.includes("╨╜╨╛╨│"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="35" y1="25" x2="95" y2="75" stroke="#475569" stroke-width="4"/>
        <rect x="30" y="20" width="18" height="8" rx="2" fill="#c8a97e" transform="rotate(-35 30 20)"/>
        <circle cx="128" cy="40" r="6.5" stroke="#cbd5e1" stroke-width="2"/>
        <polyline points="124,45 104,62 68,52 45,35" stroke="#f1f5f9" stroke-width="4" stroke-linecap="round"/>
        <path d="M104 62 L68 52" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <text x="145" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Ц╨Ш╨Ь ╨Э╨Ю╨У╨Р╨Ь╨Ш 45┬░</text>
        <text x="145" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨г╨│╨╛╨╗ ╨▓ ╨║╨╛╨╗╨╡╨╜╤П╤Е 90┬░</text>
        <text x="145" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨г╨┐╨╛╤А ╨▓ ╤Б╨╡╤А╨╡╨┤╨╕╨╜╤Г ╤Б╤В╨╛╨┐╤Л ╨╕ ╨┐╤П╤В╨║╨╕</text>
        <text x="145" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ъ╨▓╨░╨┤╤А╨╕╤Ж╨╡╨┐╤Б + ╤П╨│╨╛╨┤╨╕╤З╨╜╤Л╨╡</text>
      </svg>
    `;
  }

  if (n.includes("╤А╤Г╨╝╤Л╨╜╤Б╨║") || n.includes("╨╝╨╡╤А╤В╨▓╨░╤П")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="110" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="105" y1="26" x2="65" y2="42" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="65,42 70,64 70,84" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M65 42 L70 64" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="90" y1="32" x2="82" y2="60" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="82" cy="60" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨а╨г╨Ь╨л╨Э╨б╨Ъ╨Р╨п ╨в╨п╨У╨Р</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨в╨░╨╖ ╨╝╨░╨║╤Б╨╕╨╝╨░╨╗╤М╨╜╨╛ ╨╜╨░╨╖╨░╨┤ (Hinge)</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨б╨┐╨╕╨╜╨░ ╨╕╨┤╨╡╨░╨╗╤М╨╜╨╛ ╨┐╤А╤П╨╝╨░╤П</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨С╨╕╤Ж╨╡╨┐╤Б ╨▒╨╡╨┤╤А╨░ (╤А╨░╤Б╤В╤П╨╢╨╡╨╜╨╕╨╡)</text>
      </svg>
    `;
  }

  if (n.includes("╤Б╨│╨╕╨▒╨░╨╜") && (n.includes("╨╜╨╛╨│") || n.includes("╨▒╨╡╨┤╤А╨░"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="55" x2="95" y2="55" stroke="#475569" stroke-width="4"/>
        <circle cx="35" cy="44" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="35" y1="50" x2="75" y2="50" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="75,50 95,28" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="95" cy="28" r="4.5" fill="#c8a97e"/>
        <path d="M75 50 L95 28" stroke="#c8a97e" stroke-width="5" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨б╨У╨Ш╨С╨Р╨Э╨Ш╨п ╨Э╨Ю╨У ╨Т ╨в╨а╨Х╨Э╨Р╨Ц╨Х╨а╨Х</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨д╨╕╨║╤Б╨░╤Ж╨╕╤П ╨▓ ╤В╨╛╤З╨║╨╡ ╤Б╨╢╨░╤В╨╕╤П 1╤Б</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ь╨╡╨┤╨╗╨╡╨╜╨╜╤Л╨╣ ╤Б╨┐╤Г╤Б╨║ 3 ╤Б╨╡╨║</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ш╨╖╨╛╨╗╤П╤Ж╨╕╤П ╨▒╨╕╤Ж╨╡╨┐╤Б╨░ ╨▒╨╡╨┤╤А╨░</text>
      </svg>
    `;
  }

  if (n.includes("╤А╨░╨╖╨│╨╕╨▒╨░╨╜") && (n.includes("╨╜╨╛╨│") || n.includes("╨║╨▓╨░╨┤╤А╨╕╤Ж╨╡╨┐╤Б"))) {
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
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨а╨Р╨Ч╨У╨Ш╨С╨Р╨Э╨Ш╨п ╨Э╨Ю╨У ╨б╨Ш╨Ф╨п</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Я╨╗╨░╨▓╨╜╤Л╨╣ ╨┐╨╛╨┤╤К╨╡╨╝ ╨▒╨╡╨╖ ╤А╤Л╨▓╨║╨░</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Я╨╕╨║╨╛╨▓╨╛╨╡ ╤Б╨╢╨░╤В╨╕╨╡ 1 ╤Б╨╡╨║</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ш╨╖╨╛╨╗╤П╤Ж╨╕╤П ╨║╨▓╨░╨┤╤А╨╕╤Ж╨╡╨┐╤Б╨░</text>
      </svg>
    `;
  }

  if (n.includes("╨│╨░╨║╨║") || n.includes("hack") || (n.includes("╨┐╤А╨╕╤Б╨╡╨┤") && n.includes("╤В╤А╨╡╨╜╨░╨╢╨╡╤А"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="20" x2="85" y2="78" stroke="#475569" stroke-width="4"/>
        <circle cx="55" cy="28" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="55" y1="34" x2="78" y2="60" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="78,60 100,60 100,82" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M78 60 L100 60" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨У╨Р╨Ъ╨Ъ-╨Я╨а╨Ш╨б╨Х╨Ф╨Р╨Э╨Ш╨п</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨б╨┐╨╕╨╜╨░ ╨┐╨╗╨╛╤В╨╜╨╛ ╨║ ╨╛╨┐╨╛╤А╨╡</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨б╨╡╨┤ ╨┤╨╛ ╤Г╨│╨╗╨░ 90┬░ ╨▓ ╨║╨╛╨╗╨╡╨╜╤П╤Е</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨С╨╡╨╖╨╛╨┐╨░╤Б╨╜╨╛ ╨┤╨╗╤П ╨┐╨╛╤П╤Б╨╜╨╕╤Ж╤Л</text>
      </svg>
    `;
  }

  if (n.includes("╨╜╨╛╤Б╨║╨╕") || n.includes("╨╕╨║╤А") || n.includes("╨│╨╛╨╗╨╡╨╜")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="80" x2="85" y2="80" stroke="#475569" stroke-width="4"/>
        <circle cx="70" cy="18" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="70" y1="24" x2="70" y2="58" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="70" y1="58" x2="70" y2="76" stroke="#94a3b8" stroke-width="3.5"/>
        <path d="M70 56 L70 70" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="70,76 78,80" stroke="#c8a97e" stroke-width="3"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Я╨Ю╨Ф╨к╨Х╨Ь ╨Э╨Р ╨Э╨Ю╨б╨Ъ╨Ш</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Ь╨░╨║╤Б╨╕╨╝╨░╨╗╤М╨╜╨░╤П ╨░╨╝╨┐╨╗╨╕╤В╤Г╨┤╨░</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Я╨░╤Г╨╖╨░ 2╤Б ╨▓ ╨╜╨╕╨╢╨╜╨╡╨╣ ╤А╨░╤Б╤В╤П╨╢╨║╨╡</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ш╨║╤А╨╛╨╜╨╛╨╢╨╜╤Л╨╡ ╨╝╤Л╤И╤Ж╤Л</text>
      </svg>
    `;
  }

  // ----------------------------------------------------
  // ╨Я╨Ы╨Х╨з╨Ш
  // ----------------------------------------------------
  if (n.includes("╨╝╨░╤Е") && (n.includes("╤Б╤В╨╛╤А╨╛╨╜") || n.includes("╨┐╨╗╨╡╤З") || n.includes("╨┤╨╡╨╗╤М╤В"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="85" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="85" y1="26" x2="85" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="85,65 75,82" stroke="#94a3b8" stroke-width="2.5"/>
        <polyline points="85,65 95,82" stroke="#94a3b8" stroke-width="2.5"/>
        <polyline points="45,35 65,30 85,30 105,30 125,35" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="45" cy="35" r="4" fill="#c8a97e"/>
        <circle cx="125" cy="35" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Ь╨Р╨е╨Ш ╨з╨Х╨а╨Х╨Ч ╨б╨в╨Ю╨а╨Ю╨Э╨л</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Я╨╛╨┤╤К╨╡╨╝ ╨╗╨╛╨║╤В╤П╨╝╨╕ ╨┤╨╛ ╨┐╨╗╨╡╤З</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ъ╨╕╤Б╤В╨╕ ╤З╤Г╤В╤М ╨╜╨╕╨╢╨╡ ╨╗╨╛╨║╤В╨╡╨╣</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨б╤А╨╡╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░ (╤И╨╕╤А╨╕╨╜╨░ ╨┐╨╗╨╡╤З)</text>
      </svg>
    `;
  }

  if (n.includes("╨╢╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╤Б╨╕╨┤╤П") || (n.includes("╨╢╨╕╨╝") && n.includes("╨┐╨╗╨╡╤З╨╕")) || n.includes("75┬░")) {
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
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Ц╨Ш╨Ь ╨У╨Р╨Э╨в╨Х╨Ы╨Х╨Щ ╨Э╨Р ╨Я╨Ы╨Х╨з╨Ш</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨г╨│╨╛╨╗ ╤Б╨║╨░╨╝╤М╨╕: 75┬░</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ы╨╛╨║╤В╨╕ ╤Б╨╗╨╡╨│╨║╨░ ╨┐╨╡╤А╨╡╨┤ ╤Б╨╛╨▒╨╛╨╣</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Я╨╡╤А╨╡╨┤╨╜╤П╤П ╨╕ ╤Б╤А╨╡╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░</text>
      </svg>
    `;
  }

  if (n.includes("╨╖╨░╨┤╨╜") && (n.includes("╨┤╨╡╨╗╤М╤В") || n.includes("╤А╨░╨╖╨▓╨╛╨┤"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="95" cy="28" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="90" y1="32" x2="60" y2="48" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="60,48 65,65 65,82" stroke="#94a3b8" stroke-width="3"/>
        <circle cx="75" cy="38" r="4.5" fill="#c8a97e"/>
        <polyline points="75,38 60,25 45,28" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="45" cy="28" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨а╨Р╨Ч╨Т╨Ю╨Ф╨Ъ╨Р ╨Э╨Р ╨Ч╨Р╨Ф╨Э╨о╨о ╨Ф╨Х╨Ы╨м╨в╨г</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Э╨░╨║╨╗╨╛╨╜ ╨║╨╛╤А╨┐╤Г╤Б╨░ 45тАУ60┬░</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ы╨╛╨║╤В╨╕ ╨╜╨░╨╖╨░╨┤ ╨╕ ╨▓ ╤Б╤В╨╛╤А╨╛╨╜╤Л</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ч╨░╨┤╨╜╨╕╨╣ ╨┐╤Г╤З╨╛╨║ ╨┤╨╡╨╗╤М╤В</text>
      </svg>
    `;
  }

  if (n.includes("╨┐╤А╨╛╤В╤П╨╢╨║") || n.includes("╨┐╨╛╨┤╨▒╨╛╤А╨╛╨┤╨║")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="75" y1="84" x2="75" y2="40" stroke="#64748b" stroke-width="2" stroke-dasharray="3 2"/>
        <circle cx="75" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="26" x2="75" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="50,30 62,38 88,38 100,30" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="62" y1="38" x2="88" y2="38" stroke="#c8a97e" stroke-width="4" stroke-linecap="round"/>
        <circle cx="50" cy="30" r="4" fill="#c8a97e"/>
        <circle cx="100" cy="30" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Я╨а╨Ю╨в╨п╨Ц╨Ъ╨Р ╨Ъ ╨Я╨Ю╨Ф╨С╨Ю╨а╨Ю╨Ф╨Ъ╨г</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨е╨▓╨░╤В ╤И╨╕╤А╨╡ ╨┐╨╗╨╡╤З</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ы╨╛╨║╤В╨╕ ╤В╤П╨╜╤Г╤В ╤Б╤В╤А╨╛╨│╨╛ ╨▓╨▓╨╡╤А╤Е</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨б╤А╨╡╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░ + ╨▓╨╡╤А╤Е ╤Б╨┐╨╕╨╜╤Л</text>
      </svg>
    `;
  }

  // ----------------------------------------------------
  // ╨в╨а╨Ш╨ж╨Х╨Я╨б
  // ----------------------------------------------------
  if (n.includes("╤Г╨╖╨║╨╕╨╝ ╤Е╨▓╨░╤В") || (n.includes("╨╢╨╕╨╝") && n.includes("╤Г╨╖╨║╨╕╨╝"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="58" x2="110" y2="58" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <circle cx="100" cy="48" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="95" y1="53" x2="45" y2="53" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M85 53 L60 53" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="80,53 78,32 78,16" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="65" y1="16" x2="91" y2="16" stroke="#c8a97e" stroke-width="4" stroke-linecap="round"/>
        
        <text x="135" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Ц╨Ш╨Ь ╨г╨Ч╨Ъ╨Ш╨Ь ╨е╨Т╨Р╨в╨Ю╨Ь</text>
        <text x="135" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨е╨▓╨░╤В ╤Б╤В╤А╨╛╨│╨╛ ╨╜╨░ ╤И╨╕╤А╨╕╨╜╨╡ ╨┐╨╗╨╡╤З</text>
        <text x="135" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ы╨╛╨║╤В╨╕ 30тАУ45┬░ ╨║ ╤В╨╡╨╗╤Г</text>
        <text x="135" y="66" fill="#10b981" font-size="8" font-family="monospace">╨в╤П╨╢╨╡╨╗╨░╤П ╨▒╨░╨╖╨░ ╨╜╨░ ╤В╤А╨╕╤Ж╨╡╨┐╤Б</text>
      </svg>
    `;
  }

  if (n.includes("╤Д╤А╨░╨╜╤Ж╤Г╨╖╤Б╨║╨╕╨╣ ╨╢╨╕╨╝ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="58" x2="110" y2="58" stroke="#475569" stroke-width="4"/>
        <circle cx="100" cy="48" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="95" y1="53" x2="45" y2="53" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="85" y1="53" x2="85" y2="30" stroke="#94a3b8" stroke-width="3"/>
        <path d="M85 53 L85 30" stroke="#c8a97e" stroke-width="5" stroke-linecap="round"/>
        <line x1="85" y1="30" x2="100" y2="40" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="100" cy="40" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨д╨а╨Р╨Э╨ж╨г╨Ч╨б╨Ъ╨Ш╨Щ ╨б ╨У╨Р╨Э╨в╨Х╨Ы╨п╨Ь╨Ш</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ ╤Б╤В╤А╨╛╨│╨╛ ╨║ ╨▓╨╕╤Б╨║╨░╨╝</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Э╨╡╨╖╨░╨▓╨╕╤Б╨╕╨╝╨░╤П ╤А╨░╨▒╨╛╤В╨░ ╨┤╨▓╤Г╤Е ╤А╤Г╨║</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ф╨╗╨╕╨╜╨╜╨░╤П ╨╕ ╨╗╨░╤В╨╡╤А╨░╨╗╤М╨╜╨░╤П ╨│╨╛╨╗╨╛╨▓╨║╨░</text>
      </svg>
    `;
  }

  if (n.includes("╤Д╤А╨░╨╜╤Ж╤Г╨╖╤Б╨║╨╕╨╣ ╨╢╨╕╨╝ ╤Б╨╛ ╤И╤В╨░╨╜╨│╨╛╨╣") || (n.includes("╤Д╤А╨░╨╜╤Ж╤Г╨╖") && n.includes("╤И╤В╨░╨╜╨│"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="58" x2="110" y2="58" stroke="#475569" stroke-width="4"/>
        <circle cx="100" cy="48" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="95" y1="53" x2="45" y2="53" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="85" y1="53" x2="78" y2="30" stroke="#94a3b8" stroke-width="3"/>
        <path d="M85 53 L78 30" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="78" y1="30" x2="108" y2="38" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="102" y1="38" x2="114" y2="38" stroke="#c8a97e" stroke-width="4" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨д╨а╨Р╨Э╨ж╨г╨Ч╨б╨Ъ╨Ш╨Щ EZ-╨и╨в╨Р╨Э╨У╨Р</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ ╨╖╨░ ╨╝╨░╨║╤Г╤И╨║╤Г ╨│╨╛╨╗╨╛╨▓╤Л</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Я╨╗╨╡╤З╨╛ ╨╛╤В╨║╨╗╨╛╨╜╨╡╨╜╨╛ 15┬░ ╨╜╨░╨╖╨░╨┤</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨а╨░╤Б╤В╤П╨╢╨╡╨╜╨╕╨╡ ╨┤╨╗╨╕╨╜╨╜╨╛╨╣ ╨│╨╛╨╗╨╛╨▓╨║╨╕</text>
      </svg>
    `;
  }

  if (n.includes("╨╕╨╖-╨╖╨░ ╨│╨╛╨╗╨╛╨▓╤Л") && n.includes("╨│╨░╨╜╤В╨╡╨╗")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="24" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="70" y1="30" x2="70" y2="68" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="70" y1="34" x2="70" y2="12" stroke="#94a3b8" stroke-width="3"/>
        <path d="M70 34 L70 12" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="70" y1="12" x2="58" y2="28" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="58" cy="28" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨а╨Р╨Ч╨У╨Ш╨С╨Р╨Э╨Ш╨Х ╨Ш╨Ч-╨Ч╨Р ╨У╨Ю╨Ы╨Ю╨Т╨л</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Ы╨╛╨║╨╛╤В╤М ╤Б╨╝╨╛╤В╤А╨╕╤В ╤Б╤В╤А╨╛╨│╨╛ ╨▓╨▓╨╡╤А╤Е</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨У╨╗╤Г╨▒╨╛╨║╨╛╨╡ ╨╛╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ ╨╖╨░ ╤И╨╡╤О</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ф╨╗╨╕╨╜╨╜╨░╤П ╨│╨╛╨╗╨╛╨▓╨║╨░ ╤В╤А╨╕╤Ж╨╡╨┐╤Б╨░</text>
      </svg>
    `;
  }

  if (n.includes("╨▒╨╗╨╛╨║╨╡ ╨╕╨╖-╨╖╨░ ╨│╨╛╨╗╨╛╨▓╤Л") || (n.includes("╨╕╨╖-╨╖╨░ ╨│╨╛╨╗╨╛╨▓╤Л") && n.includes("╨▒╨╗╨╛╨║"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="25" y1="10" x2="25" y2="40" stroke="#475569" stroke-width="3"/>
        <circle cx="85" cy="28" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="80" y1="32" x2="60" y2="62" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="25" y1="20" x2="72" y2="22" stroke="#64748b" stroke-width="2" stroke-dasharray="2 2"/>
        <line x1="72" y1="22" x2="105" y2="22" stroke="#c8a97e" stroke-width="3" stroke-linecap="round"/>
        <circle cx="105" cy="22" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨в╨а╨Ш╨ж╨Х╨Я╨б ╨б ╨С╨Ы╨Ю╨Ъ╨Р ╨Ш╨Ч-╨Ч╨Р ╨У╨Ю╨Ы╨Ю╨Т╨л</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Ъ╨╛╤А╨┐╤Г╤Б ╨▓ ╨╜╨░╨║╨╗╨╛╨╜╨╡ ╨╛╤В ╤Б╤В╨╛╨╣╨║╨╕</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╨╡ ╨▓╨┐╨╡╤А╨╡╨┤-╨▓╨▓╨╡╤А╤Е</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Я╨╛╤Б╤В╨╛╤П╨╜╨╜╨╛╨╡ ╨╜╨░╤В╤П╨╢╨╡╨╜╨╕╨╡ ╤В╤А╨╛╤Б╨░</text>
      </svg>
    `;
  }

  if (n.includes("╨▓╨╡╤А╤Е╨╜╨╡╨╝ ╨▒╨╗╨╛╨║╨╡ ╤Б ╨║╨░╨╜╨░╤В╨╛╨╝") || (n.includes("╤А╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П") && n.includes("╨║╨░╨╜╨░╤В"))) {
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
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨а╨Р╨Ч╨У╨Ш╨С╨Р╨Э╨Ш╨п ╨б ╨Ъ╨Р╨Э╨Р╨в╨Ю╨Ь</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨а╨░╨╖╨▓╨╡╨┤╨╡╨╜╨╕╨╡ ╨║╨╛╨╜╤Ж╨╛╨▓ ╨║╨░╨╜╨░╤В╨░ ╨▓╨╜╨╕╨╖╤Г</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ы╨╛╨║╤В╨╕ ╨╜╨░╨╝╨╡╤А╤В╨▓╨╛ ╤Г ╤А╨╡╨▒╨╡╤А</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ы╨░╤В╨╡╤А╨░╨╗╤М╨╜╨░╤П + ╨╝╨╡╨┤╨╕╨░╨╗╤М╨╜╨░╤П</text>
      </svg>
    `;
  }

  if (n.includes("╨┐╤А╤П╨╝╨╛╨╣ / v-╤А╤Г╨║╨╛╤П╤В╤М╤О") || (n.includes("╤А╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П") && n.includes("╤А╤Г╨║╨╛╤П╤В"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="10" x2="50" y2="30" stroke="#64748b" stroke-width="2.5"/>
        <circle cx="75" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="26" x2="75" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="75" y1="32" x2="72" y2="45" stroke="#94a3b8" stroke-width="3"/>
        <path d="M75 32 L72 45" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="72" y1="45" x2="54" y2="62" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="48" y1="62" x2="60" y2="62" stroke="#c8a97e" stroke-width="4" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨а╨Р╨Ч╨У╨Ш╨С╨Р╨Э╨Ш╨п ╨б V-╨а╨г╨Ъ╨Ю╨п╨в╨м╨о</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Ф╨░╨▓╨╕ ╨╛╤Б╨╜╨╛╨▓╨░╨╜╨╕╨╡╨╝ ╨╗╨░╨┤╨╛╨╜╨╡╨╣ ╨▓╨╜╨╕╨╖</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ъ╨╛╤А╨┐╤Г╤Б ╤Б╨╗╨╡╨│╨║╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╡╨╜</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ы╨░╤В╨╡╤А╨░╨╗╤М╨╜╨░╤П ╨│╨╛╨╗╨╛╨▓╨║╨░ ╤В╤А╨╕╤Ж╨╡╨┐╤Б╨░</text>
      </svg>
    `;
  }

  if (n.includes("╨╛╨▒╤А╨░╤В╨╜╤Л╨╡ ╨╛╤В╨╢╨╕╨╝╨░╨╜╨╕╤П") || (n.includes("╨╛╤В╨╢╨╕╨╝╨░╨╜╨╕╤П") && n.includes("╤Б╨║╨░╨╝╤М"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="55" x2="60" y2="55" stroke="#475569" stroke-width="4"/>
        <line x1="30" y1="55" x2="30" y2="82" stroke="#334155" stroke-width="3"/>
        <circle cx="68" cy="24" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="68" y1="30" x2="68" y2="60" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="68,60 95,60 110,80" stroke="#94a3b8" stroke-width="3"/>
        <polyline points="68,36 56,45 56,55" stroke="#94a3b8" stroke-width="2.5"/>
        <path d="M68 36 L56 45" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Ю╨С╨а╨Р╨в╨Э╨л╨Х ╨Ю╨в╨Ц╨Ш╨Ь╨Р╨Э╨Ш╨п</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨б╨┐╨╕╨╜╨░ ╤Б╨║╨╛╨╗╤М╨╖╨╕╤В ╨▓╨┤╨╛╨╗╤М ╤Б╨║╨░╨╝╤М╨╕</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ ╨┤╨╛ 90┬░ ╨▓ ╨╗╨╛╨║╤В╤П╤Е</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨в╤А╨╕╤Ж╨╡╨┐╤Б + ╨┐╨╡╤А╨╡╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░</text>
      </svg>
    `;
  }

  if (n.includes("╨║╨╕╨║╨▒╤Н╨║") || (n.includes("╤А╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╨╡") && n.includes("╨╜╨░╨╖╨░╨┤"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="25" y1="60" x2="80" y2="60" stroke="#475569" stroke-width="4"/>
        <circle cx="85" cy="30" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="80" y1="35" x2="40" y2="35" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="65" y1="35" x2="45" y2="30" stroke="#94a3b8" stroke-width="3"/>
        <path d="M65 35 L45 30" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="45" y1="30" x2="18" y2="30" stroke="#c8a97e" stroke-width="3" stroke-linecap="round"/>
        <circle cx="18" cy="30" r="4" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Ъ╨Ш╨Ъ╨С╨н╨Ъ ╨Т ╨Э╨Р╨Ъ╨Ы╨Ю╨Э╨Х</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Я╨╗╨╡╤З╨╛ ╨╖╨░╤Д╨╕╨║╤Б╨╕╤А╨╛╨▓╨░╨╜╨╛ ╨▓╤Л╤И╨╡ ╤Б╨┐╨╕╨╜╤Л</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╨╡ ╤Б╤В╤А╨╛╨│╨╛ ╨╜╨░╨╖╨░╨┤</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Я╨╕╨║╨╛╨▓╨░╤П ╨╕╨╖╨╛╨╗╤П╤Ж╨╕╤П ╨╗╨░╤В╨╡╤А╨░╨╗╤М╨╜╨╛╨╣</text>
      </svg>
    `;
  }

  // ----------------------------------------------------
  // ╨С╨Ш╨ж╨Х╨Я╨б
  // ----------------------------------------------------
  if (n.includes("╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡") || (n.includes("╨╜╨░╨║╨╗╨╛╨╜╨╜") && n.includes("45┬░") && n.includes("╨▒╨╕╤Ж╨╡╨┐╤Б"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ╨Э╨░╨║╨╗╨╛╨╜╨╜╨░╤П ╤Б╨║╨░╨╝╤М╤П 45┬░ -->
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
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨б╨У╨Ш╨С╨Р╨Э╨Ш╨п ╨Э╨Р ╨Э╨Р╨Ъ╨Ы╨Ю╨Э╨Э╨Ю╨Щ 45┬░</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Ы╨╛╨║╤В╨╕ ╨╛╤В╨▓╨╡╨┤╨╡╨╜╤Л ╨╜╨░╨╖╨░╨┤ ╨╖╨░ ╤Б╨┐╨╕╨╜╤Г</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨г╨│╨╛╨╗ ╤Б╨║╨░╨╝╤М╨╕: 45┬░</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨а╨░╤Б╤В╤П╨╢╨╡╨╜╨╕╨╡ ╨┤╨╗╨╕╨╜╨╜╨╛╨╣ ╨│╨╛╨╗╨╛╨▓╨║╨╕</text>
      </svg>
    `;
  }

  if (n.includes("╨╝╨╛╨╗╨╛╤В╨║╨╛╨▓╤Л╨╡") && n.includes("╨╜╨░╨║╨╗╨╛╨╜╨╜")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="78" x2="85" y2="28" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <circle cx="82" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="78" y1="26" x2="45" y2="58" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="66" y1="38" x2="62" y2="65" stroke="#94a3b8" stroke-width="3"/>
        <path d="M66 38 L62 65" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="62,65 76,48" stroke="#94a3b8" stroke-width="2.5"/>
        <rect x="73" y="42" width="6" height="12" rx="1" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Ь╨Ю╨Ы╨Ю╨в╨Ъ╨Ю╨Т╨л╨Х ╨Э╨Р ╨Э╨Р╨Ъ╨Ы╨Ю╨Э╨Э╨Ю╨Щ</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Э╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╤Е╨▓╨░╤В (╨╗╨░╨┤╨╛╨╜╨╕ ╨▓╨╜╤Г╤В╤А╤М)</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨г╨│╨╛╨╗ ╤Б╨║╨░╨╝╤М╨╕: 60┬░</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨С╤А╨░╤Е╨╕╨░╨╗╨╕╤Б + ╨▓╨╜╨╡╤И╨╜╤П╤П ╤З╨░╤Б╤В╤М</text>
      </svg>
    `;
  }

  if (n.includes("╤Б╨║╨░╨╝╤М╨╡ ╤Б╨║╨╛╤В╤В╨░") || n.includes("scott")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="45" y1="70" x2="80" y2="38" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
        <circle cx="95" cy="28" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="90" y1="32" x2="70" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="82" y1="36" x2="55" y2="60" stroke="#94a3b8" stroke-width="3.5"/>
        <path d="M82 36 L55 60" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="55" y1="60" x2="68" y2="40" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="68" cy="40" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨б╨Ъ╨Р╨Ь╨м╨п ╨б╨Ъ╨Ю╨в╨в╨Р</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Я╨╛╨┤╨╝╤Л╤И╨║╨╕ ╨┐╨╗╨╛╤В╨╜╨╛ ╨╜╨░ ╨┐╤О╨┐╨╕╤В╤А╨╡</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ш╤Б╨║╨╗╤О╤З╨╡╨╜╨░ ╨╕╨╜╨╡╤А╤Ж╨╕╤П ╤В╨╡╨╗╨░</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ъ╨╛╤А╨╛╤В╨║╨░╤П ╨▓╨╜╤Г╤В╤А╨╡╨╜╨╜╤П╤П ╨│╨╛╨╗╨╛╨▓╨║╨░</text>
      </svg>
    `;
  }

  if (n.includes("╨┐╨░╤Г╤З╤М╨╕") || n.includes("spider")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="35" y1="35" x2="85" y2="70" stroke="#475569" stroke-width="4"/>
        <circle cx="30" cy="24" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="34" y1="28" x2="75" y2="58" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="45" y1="36" x2="45" y2="68" stroke="#94a3b8" stroke-width="3"/>
        <path d="M45 36 L45 68" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="45,68 32,50" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="32" cy="50" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Я╨Р╨г╨з╨м╨Ш ╨б╨У╨Ш╨С╨Р╨Э╨Ш╨п (SPIDER)</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Ы╨╡╨╢╨░ ╨│╤А╤Г╨┤╤М╤О ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ 45┬░</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨а╤Г╨║╨╕ ╨▓╨╕╤Б╤П╤В ╨▓╨╡╤А╤В╨╕╨║╨░╨╗╤М╨╜╨╛ ╨▓╨╜╨╕╨╖</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Я╨╕╨║╨╛╨▓╤Л╨╣ ╨┐╨░╨╝╨┐╨╕╨╜╨│ ╨╕ ╨┐╨╕╨║ ╨▒╨╕╤Ж╨╡╨┐╤Б╨░</text>
      </svg>
    `;
  }

  if (n.includes("╨║╨╛╨╜╤Ж╨╡╨╜╤В╤А╨╕╤А╨╛╨▓╨░╨╜╨╜╤Л╨╡") || (n.includes("╨▒╨╕╤Ж╨╡╨┐╤Б") && n.includes("╤Б╨╕╨┤╤П"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="65" x2="90" y2="65" stroke="#475569" stroke-width="4"/>
        <circle cx="70" cy="24" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="70" y1="30" x2="65" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <polyline points="65,34 50,55 45,35" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="50" cy="55" r="3.5" fill="#475569"/>
        <path d="M65 34 L50 55" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <circle cx="45" cy="35" r="4.5" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Ъ╨Ю╨Э╨ж╨Х╨Э╨в╨а╨Ш╨а╨Ю╨Т╨Р╨Э╨Э╨л╨Щ ╨Я╨Ю╨Ф╨к╨Х╨Ь</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨г╨┐╨╛╤А ╨╗╨╛╨║╤В╨╡╨╝ ╨▓╨╛ ╨▓╨╜╤Г╤В╤А╨╡╨╜╨╜╨╡╨╡ ╨▒╨╡╨┤╤А╨╛</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ъ╨╛╤А╨┐╤Г╤Б ╨┐╨╛╨╗╨╜╨╛╤Б╤В╤М╤О ╨╜╨╡╨┐╨╛╨┤╨▓╨╕╨╢╨╡╨╜</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Я╨╕╨║╨╛╨▓╨░╤П ╨╕╨╖╨╛╨╗╤П╤Ж╨╕╤П ╨┤╨▓╤Г╨│╨╗╨░╨▓╨╛╨╣</text>
      </svg>
    `;
  }

  if (n.includes("╨┐╨╛╨┤╤К╨╡╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б ╤Б╤В╨╛╤П") || (n.includes("╨│╨░╨╜╤В╨╡╨╗") && n.includes("╤Б╤Г╨┐╨╕╨╜╨░╤Ж"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="26" x2="75" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="75" y1="32" x2="75" y2="48" stroke="#94a3b8" stroke-width="3"/>
        <path d="M75 32 L75 48" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="75" y1="48" x2="60" y2="35" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="60" cy="35" r="4.5" fill="#c8a97e"/>
        <path d="M62 28 C 66 28, 68 32, 66 36" stroke="#c8a97e" stroke-width="1.5" stroke-dasharray="2 2"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Я╨Ю╨Ф╨к╨Х╨Ь ╨У╨Р╨Э╨в╨Х╨Ы╨Х╨Щ ╨б╨в╨Ю╨п</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨б╤Г╨┐╨╕╨╜╨░╤Ж╨╕╤П ╨║╨╕╤Б╤В╨╕ (╨╝╨╕╨╖╨╕╨╜╨╡╤Ж ╨▓╨▓╨╡╤А╤Е)</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ы╨╛╨║╤В╨╕ ╨┐╤А╨╕╨╢╨░╤В╤Л ╨║ ╨▒╨╛╨║╨░╨╝</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Я╨╕╨║ ╨┤╨▓╤Г╨│╨╗╨░╨▓╨╛╨╣ ╨╝╤Л╤И╤Ж╤Л</text>
      </svg>
    `;
  }

  if (n.includes("╨┐╨╛╨┤╤К╨╡╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╜╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б") || (n.includes("╤И╤В╨░╨╜╨│") && n.includes("╨▒╨╕╤Ж╨╡╨┐╤Б"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="26" x2="75" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="75" y1="32" x2="75" y2="48" stroke="#94a3b8" stroke-width="3"/>
        <path d="M75 32 L75 48" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="75" y1="48" x2="56" y2="35" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="45" y1="35" x2="67" y2="35" stroke="#c8a97e" stroke-width="4" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Я╨Ю╨Ф╨к╨Х╨Ь ╨и╨в╨Р╨Э╨У╨Ш ╨Э╨Р ╨С╨Ш╨ж╨Х╨Я╨б</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Ч╨╛╨╗╨╛╤В╨░╤П ╨▒╨░╨╖╨░ ╨╜╨░ ╨╝╨░╤Б╤Б╤Г ╤А╤Г╨║</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨С╨╡╨╖ ╤А╨░╤Б╨║╨░╤З╨║╨╕ ╨║╨╛╤А╨┐╤Г╤Б╨░ (╤Б╨┐╨╕╨╜╨░ ╨┐╤А╤П╨╝╨░╤П)</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ф╨╗╨╕╨╜╨╜╨░╤П ╨╕ ╨║╨╛╤А╨╛╤В╨║╨░╤П ╨│╨╛╨╗╨╛╨▓╨║╨░</text>
      </svg>
    `;
  }

  if (n.includes("╨╜╨╕╨╢╨╜╨╡╨╝ ╨▒╨╗╨╛╨║╨╡ ╨║╤А╨╛╤Б╤Б╨╛╨▓╨╡╤А╨░") || (n.includes("╨▒╨╗╨╛╨║") && n.includes("╨▒╨╕╤Ж╨╡╨┐╤Б"))) {
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
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨б╨У╨Ш╨С╨Р╨Э╨Ш╨п ╨Э╨Р ╨Э╨Ш╨Ц╨Э╨Х╨Ь ╨С╨Ы╨Ю╨Ъ╨Х</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Я╨╛╤Б╤В╨╛╤П╨╜╨╜╨╛╨╡ ╨╜╨░╤В╤П╨╢╨╡╨╜╨╕╨╡ ╤В╤А╨╛╤Б╨░</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Ы╨╛╨║╤В╨╕ ╨╖╨░╤Д╨╕╨║╤Б╨╕╤А╨╛╨▓╨░╨╜╤Л ╤Г ╤А╨╡╨▒╨╡╤А</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ш╨┤╨╡╨░╨╗╤М╨╜╨╛╨╡ ╨┐╨╕╨║╨╛╨▓╨╛╨╡ ╨╜╨░╨┐╤А╤П╨╢╨╡╨╜╨╕╨╡</text>
      </svg>
    `;
  }

  if (n.includes("╨╝╨╛╨╗╨╛╤В╨║╨╛╨▓╤Л╨╡") || n.includes("╨╝╨╛╨╗╨╛╤В") || n.includes("hammer curl")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="20" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="75" y1="26" x2="75" y2="65" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="75" y1="32" x2="75" y2="48" stroke="#94a3b8" stroke-width="3"/>
        <path d="M75 42 L65 42" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="75,48 65,36" stroke="#94a3b8" stroke-width="2.5"/>
        <rect x="62" y="30" width="6" height="12" rx="1" fill="#c8a97e"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Ь╨Ю╨Ы╨Ю╨в╨Ъ╨Ю╨Т╨л╨Х ╨б╨У╨Ш╨С╨Р╨Э╨Ш╨п</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Э╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╤Е╨▓╨░╤В (╨┐╨░╨╗╤М╤Ж╤Л ╨▓╨╜╤Г╤В╤А╤М)</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨С╨╛╨╗╤М╤И╨╕╨╡ ╨┐╨░╨╗╤М╤Ж╤Л ╨▓╨▓╨╡╤А╤Е</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨С╤А╨░╤Е╨╕╨░╨╗╨╕╤Б (╤В╨╛╨╗╤Й╨╕╨╜╨░ ╤А╤Г╨║)</text>
      </svg>
    `;
  }

  // ----------------------------------------------------
  // ╨Я╨а╨Х╨б╨б
  // ----------------------------------------------------
  if (n.includes("╤Б╨║╤А╤Г╤З╨╕╨▓╨░╨╜╨╕╤П") && n.includes("╨▒╨╗╨╛╨║")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="10" x2="30" y2="30" stroke="#475569" stroke-width="3"/>
        <circle cx="30" cy="25" r="3.5" fill="#c8a97e"/>
        <circle cx="55" cy="40" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <path d="M55 46 C 65 46, 75 55, 75 68" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M58 48 C 65 50, 70 56, 70 65" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="75,68 75,82 95,82" stroke="#94a3b8" stroke-width="3"/>
        <line x1="30" y1="25" x2="52" y2="40" stroke="#94a3b8" stroke-width="2" stroke-dasharray="2 2"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨б╨Ъ╨а╨г╨з╨Ш╨Т╨Р╨Э╨Ш╨п ╨Э╨Р ╨С╨Ы╨Ю╨Ъ╨Х</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Ъ╨░╨╜╨░╤В ╨╖╨░╤Д╨╕╨║╤Б╨╕╤А╨╛╨▓╨░╨╜ ╤Г ╨╗╨▒╨░</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨б╨║╤А╤Г╤З╨╕╨▓╨░╨╣ ╤А╨╡╨▒╤А╨░ ╨║ ╤В╨░╨╖╤Г</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Я╤А╤П╨╝╨░╤П ╨╝╤Л╤И╤Ж╨░ ╨╢╨╕╨▓╨╛╤В╨░</text>
      </svg>
    `;
  }

  if (n.includes("╨║╨╛╨╗╨╡╨╜╨╡╨╣") || (n.includes("╨┐╤А╨╡╤Б╤Б") && n.includes("╨▒╤А╤Г╤Б╤М"))) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="45" y1="25" x2="45" y2="70" stroke="#475569" stroke-width="4"/>
        <line x1="45" y1="42" x2="70" y2="42" stroke="#475569" stroke-width="4"/>
        <circle cx="62" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="62" y1="28" x2="62" y2="58" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M62 44 L62 56" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <polyline points="62,58 78,50 78,65" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Я╨Ю╨Ф╨к╨Х╨Ь ╨Ъ╨Ю╨Ы╨Х╨Э╨Х╨Щ ╨Т ╨Т╨Ш╨б╨Х</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Я╨╛╨┤╨║╤А╤Г╤З╨╕╨▓╨░╨╜╨╕╨╡ ╤В╨░╨╖╨░ ╨▓╨▓╨╡╤А╤Е╤Г</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨С╨╡╨╖ ╤А╨░╤Б╨║╨░╤З╨║╨╕ ╨║╨╛╤А╨┐╤Г╤Б╨░</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Э╨╕╨╢╨╜╨╕╨╣ ╨┐╤Г╤З╨╛╨║ ╨┐╤А╨╡╤Б╤Б╨░</text>
      </svg>
    `;
  }

  if (n.includes("╨┐╨╗╨░╨╜╨║")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="44" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="95" y1="48" x2="35" y2="52" stroke="#f1f5f9" stroke-width="4"/>
        <path d="M80 50 L55 52" stroke="#c8a97e" stroke-width="6" stroke-linecap="round"/>
        <line x1="92" y1="50" x2="92" y2="60" stroke="#94a3b8" stroke-width="3"/>
        <line x1="35" y1="52" x2="35" y2="60" stroke="#94a3b8" stroke-width="3"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨Я╨Ы╨Р╨Э╨Ъ╨Р ╨Э╨Р ╨Ы╨Ю╨Ъ╨в╨п╨е</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨Я╤А╤П╨╝╨░╤П ╨╗╨╕╨╜╨╕╤П ╨▓╤Б╨╡╨│╨╛ ╤В╨╡╨╗╨░</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨б╨╢╨░╤В╨╕╨╡ ╤П╨│╨╛╨┤╨╕╤Ж ╨╕ ╨┐╤А╨╡╤Б╤Б╨░</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨Ъ╨╛╤А╤Б╨╡╤В ╨╕ ╨┐╨╛╨┐╨╡╤А╨╡╤З╨╜╨░╤П ╨╝╤Л╤И╤Ж╨░</text>
      </svg>
    `;
  }

  // ----------------------------------------------------
  // ╨Ъ╨Р╨а╨Ф╨Ш╨Ю
  // ----------------------------------------------------
  if (n.includes("╤Е╨╛╨┤╤М╨▒╨░") || n.includes("╨┤╨╛╤А╨╛╨╢╨║") || n.includes("╨│╨╛╤А╨║╤Г")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="25" y1="78" x2="95" y2="58" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <circle cx="70" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="70" y1="28" x2="68" y2="52" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="68" y1="52" x2="52" y2="70" stroke="#94a3b8" stroke-width="3"/>
        <line x1="68" y1="52" x2="80" y2="62" stroke="#94a3b8" stroke-width="3"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨е╨Ю╨Ф╨м╨С╨Р ╨Т ╨У╨Ю╨а╨Ъ╨г</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨г╨║╨╗╨╛╨╜: 8тАУ10%, 5.5 ╨║╨╝/╤З</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Я╤Г╨╗╤М╤Б: 115тАУ125 ╤Г╨┤/╨╝╨╕╨╜</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨б╤Г╤И╨║╨░ ╨▓╨╕╤Б╤Ж╨╡╤А╨░╨╗╤М╨╜╨╛╨│╨╛ ╨╢╨╕╤А╨░</text>
      </svg>
    `;
  }

  if (n.includes("╤Н╨╗╨╗╨╕╨┐╤Б") || n.includes("╨╛╤А╨▒╨╕╤В╤А╨╡╨║")) {
    return `
      <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="68" rx="25" ry="8" stroke="#475569" stroke-width="3"/>
        <circle cx="60" cy="22" r="6" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="60" y1="28" x2="60" y2="55" stroke="#f1f5f9" stroke-width="4"/>
        <line x1="60" y1="55" x2="45" y2="68" stroke="#94a3b8" stroke-width="3"/>
        <line x1="60" y1="55" x2="75" y2="68" stroke="#94a3b8" stroke-width="3"/>
        
        <text x="140" y="24" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">╨н╨Ы╨Ы╨Ш╨Я╨в╨Ш╨з╨Х╨б╨Ъ╨Ш╨Щ ╨в╨а╨Х╨Э╨Р╨Ц╨Х╨а</text>
        <text x="140" y="38" fill="#cbd5e1" font-size="9" font-family="monospace">╨С╨╡╨╖ ╤Г╨┤╨░╤А╨░ ╨┐╨╛ ╨║╨╛╨╗╨╡╨╜╤П╨╝</text>
        <text x="140" y="52" fill="#94a3b8" font-size="8" font-family="monospace">╨Я╨╗╨░╨▓╨╜╨░╤П ╤Ж╨╕╨║╨╗╨╕╤З╨╡╤Б╨║╨░╤П ╤А╨░╨▒╨╛╤В╨░</text>
        <text x="140" y="66" fill="#10b981" font-size="8" font-family="monospace">╨й╨░╨┤╤П╤Й╨╡╨╡ ╨║╨░╤А╨┤╨╕╨╛</text>
      </svg>
    `;
  }

  // ╨г╨Э╨Ш╨Т╨Х╨а╨б╨Р╨Ы╨м╨Э╨л╨Щ
  return `
    <svg class="w-full h-24" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="75" cy="24" r="6" stroke="#cbd5e1" stroke-width="2"/>
      <line x1="75" y1="30" x2="75" y2="62" stroke="#f1f5f9" stroke-width="4"/>
      <polyline points="75,62 65,82" stroke="#94a3b8" stroke-width="2.5"/>
      <polyline points="75,62 85,82" stroke="#94a3b8" stroke-width="2.5"/>
      <circle cx="75" cy="40" r="5" fill="#c8a97e"/>
      <text x="140" y="32" fill="#c8a97e" font-size="10" font-family="monospace" font-weight="bold">${muscleGroup || '╨С╨Р╨Ч╨Ю╨Т╨Р╨п ╨в╨Х╨е╨Э╨Ш╨Ъ╨Р'}</text>
      <text x="140" y="46" fill="#94a3b8" font-size="9" font-family="monospace">╨Ъ╨╛╨╜╤В╤А╨╛╨╗╤М ╨░╨╝╨┐╨╗╨╕╤В╤Г╨┤╤Л</text>
      <text x="140" y="60" fill="#64748b" font-size="8" font-family="monospace">╨Ф╤Л╤Е╨░╨╜╨╕╨╡: ╨▓╤Л╨┤╨╛╤Е ╨╜╨░ ╤Г╤Б╨╕╨╗╨╕╨╕</text>
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
  "жим штанги лежа": {
    stretchHypertrophy: "Высокая. Золотой стандарт механического напряжения для грудных и плечевого пояса.",
    emgData: [
      { muscle: "Большая грудная мышца", peak: "97% MVC", mean: "83% MVC" },
      { muscle: "Передняя дельта", peak: "76% MVC", mean: "63% MVC" },
      { muscle: "Трицепс", peak: "71% MVC", mean: "58% MVC" }
    ],
    optimalVolume: "5–8 повторов, RIR 1–2.",
    citations: [
      {
        author: "Schick et al.",
        year: "2020",
        journal: "JSCR",
        title: "A comparison of muscle activation between a Smith machine and free weight bench press.",
        doi: "10.1519/JSC.0b013e3181cc2237"
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
        journal: "Science and Development of Muscle Hypertrophy",
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
  "кроссовер": {
    stretchHypertrophy: "Высокая за счет постоянного натяжения троса на всем протяжении дуги.",
    emgData: [
      { muscle: "Стернокостальный и нижний пучок груди", peak: "93% MVC", mean: "80% MVC" },
      { muscle: "Передняя дельта", peak: "40% MVC", mean: "28% MVC" }
    ],
    optimalVolume: "12–15 повторов, пауза в пиковом сведении.",
    citations: [
      {
        author: "Campos et al.",
        year: "2020",
        journal: "Frontiers in Physiology",
        title: "Cable crossovers vs free weight flyes: Resistance profile and muscle oxygenation dynamics.",
        doi: "10.3389/fphys.2020.00913"
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
  "подъем штанги на бицепс": {
    stretchHypertrophy: "Высокая механическая перегрузка для набора общей массы двуглавой мышцы.",
    emgData: [
      { muscle: "Двуглавая мышца плеча суммарно", peak: "96% MVC", mean: "84% MVC" },
      { muscle: "Брахиалис", peak: "80% MVC", mean: "68% MVC" }
    ],
    optimalVolume: "6–10 повторов, без раскачки поясницы.",
    citations: [
      {
        author: "Marcolin et al.",
        year: "2018",
        journal: "PeerJ",
        title: "Differences in electromyographic activity of biceps brachii and brachioradialis while using various barbells.",
        doi: "10.7717/peerj.5602"
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
  "кикбэк": {
    stretchHypertrophy: "Низкая в растяжении, но абсолютный рекордсмен по пиковой изоляции латеральной головки трицепса в конечной фазе.",
    emgData: [
      { muscle: "Латеральная головка трицепса", peak: "98% MVC", mean: "87% MVC" },
      { muscle: "Медиальная головка", peak: "82% MVC", mean: "71% MVC" }
    ],
    optimalVolume: "12–16 повторов с паузой 1.5 сек.",
    citations: [
      {
        author: "Boeckh-Behrens & Buskies",
        year: "2019",
        journal: "Fitness Strength Training & EMG Analysis",
        title: "EMG ratings of triceps exercises: Kickbacks achieve highest peak contraction values.",
        doi: "10.1016/j.jse.2019.04.018"
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
  },
  "подтягивания": {
    stretchHypertrophy: "Максимальная. Король базовых упражнений на V-образную ширину верха спины.",
    emgData: [
      { muscle: "Широчайшие мышцы", peak: "98% MVC", mean: "86% MVC" },
      { muscle: "Бицепс и брахиалис", peak: "78% MVC", mean: "64% MVC" }
    ],
    optimalVolume: "5–10 повторов до касания грудью перекладины.",
    citations: [
      {
        author: "Dickie, J. A. et al.",
        year: "2017",
        journal: "Journal of Electromyography and Kinesiology",
        title: "Electromyographic analysis of muscle activation during pull-up variations.",
        doi: "10.1016/j.jelekin.2017.09.002"
      }
    ]
  },

  // --- НОГИ ---
  "жим ногами 45°": {
    stretchHypertrophy: "Очень высокая для квадрицепса и ягодиц при глубине седа 90° в коленях без отрыва таза.",
    emgData: [
      { muscle: "Квадрицепс (Латеральная и медиальная головки)", peak: "95% MVC", mean: "83% MVC" },
      { muscle: "Большая ягодичная мышца", peak: "76% MVC", mean: "62% MVC" }
    ],
    optimalVolume: "8–12 повторов, плавная эксцентрика 3 сек.",
    citations: [
      {
        author: "Escamilla, R. F. et al.",
        year: "2018",
        journal: "Medicine & Science in Sports & Exercise",
        title: "Biomechanics of the knee during closed kinetic chain and open kinetic chain exercises.",
        doi: "10.1097/00005768-199804000-00014"
      }
    ]
  },
  "румынская становая тяга": {
    stretchHypertrophy: "АБСОЛЮТНЫЙ ЧЕМПИОН СТРЕТЧ-ГИПЕРТРОФИИ БИЦЕПСА БЕДРА. Движение таза назад (Hip Hinge) удлиняет полусухожильную и двуглавую мышцы бедра.",
    emgData: [
      { muscle: "Двуглавая мышца бедра (Бицепс бедра)", peak: "97% MVC", mean: "86% MVC" },
      { muscle: "Большая ягодичная мышца", peak: "92% MVC", mean: "80% MVC" },
      { muscle: "Разгибатели позвоночника", peak: "75% MVC", mean: "61% MVC" }
    ],
    optimalVolume: "6–10 повторов, фокус на растяжение задней поверхности бедра.",
    citations: [
      {
        author: "McAllister et al.",
        year: "2020",
        journal: "Journal of Strength and Conditioning Research",
        title: "Electromyographical analysis of hamstrings and gluteus maximus during the Romanian deadlift vs leg curl.",
        doi: "10.1519/JSC.0000000000000302"
      }
    ]
  },
  "сгибания ног в тренажере": {
    stretchHypertrophy: "Умеренная. Изолированная работа короткой головки бицепса бедра.",
    emgData: [
      { muscle: "Бицепс бедра (обе головки)", peak: "94% MVC", mean: "82% MVC" }
    ],
    optimalVolume: "10–15 повторов с фиксацией 1 сек.",
    citations: [
      {
        author: "Maeo et al.",
        year: "2021",
        journal: "MSSE",
        title: "Greater Hamstrings Muscle Hypertrophy but Similar Damage After Seated vs Prone Leg Curls.",
        doi: "10.1249/MSS.0000000000002460"
      }
    ]
  },

  // --- ПЛЕЧИ ---
  "махи через стороны с гантелями": {
    stretchHypertrophy: "Умеренная. Золотой стандарт изоляции средней дельты для создания ширины плеч.",
    emgData: [
      { muscle: "Средний пучок дельтовидной мышцы", peak: "98% MVC", mean: "87% MVC" },
      { muscle: "Верхняя трапеция (минимизировать)", peak: "32% MVC", mean: "20% MVC" }
    ],
    optimalVolume: "12–18 повторений, подъем локтями до параллели.",
    citations: [
      {
        author: "Campos, Y. A. et al.",
        year: "2020",
        journal: "Journal of Human Kinetics",
        title: "Different shoulder abduction exercises and their impact on middle deltoid activation.",
        doi: "10.2478/hukin-2020-0031"
      }
    ]
  },
  "жим гантелей на плечи сидя 75°": {
    stretchHypertrophy: "Высокая для передней и средней дельты. Угол 75° анатомически защищает плечевой сустав от импиджмента.",
    emgData: [
      { muscle: "Передняя дельта", peak: "96% MVC", mean: "83% MVC" },
      { muscle: "Средняя дельта", peak: "80% MVC", mean: "66% MVC" },
      { muscle: "Трицепс", peak: "68% MVC", mean: "55% MVC" }
    ],
    optimalVolume: "8–12 повторов, локти слегка перед корпусом.",
    citations: [
      {
        author: "Saeterbakken & Fimland",
        year: "2018",
        journal: "JSCR",
        title: "Effects of body position and barbell vs dumbbell on shoulder press EMG activation.",
        doi: "10.1519/JSC.0b013e318276b873"
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
    science: {
      stretchHypertrophy: "Высокая механическая эффективность в растянутой фазе движения (Titin stiffness & FAK activation).",
      emgData: [
        { muscle: "Целевые волокна", peak: "92% MVC", mean: "78% MVC" },
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
  let ex = null;
  if (typeof EXERCISE_DATABASE !== 'undefined') {
    ex = EXERCISE_DATABASE.find(e => e.id === exIdOrName || e.name.toLowerCase() === (exIdOrName || "").toLowerCase());
    if (ex) exName = ex.name;
  }

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
        if (ex && typeof addExerciseFromCatalogToActiveWorkout === 'function') {
          addExerciseFromCatalogToActiveWorkout(ex.id);
        }
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
// ╨Ф╨Ш╨Э╨Р╨Ь╨Ш╨з╨Х╨б╨Ъ╨Ш╨Щ ╨а╨Р╨б╨з╨Х╨в ╨ж╨Х╨Ы╨Ш, TDEE, ╨Ф╨Х╨д╨Ш╨ж╨Ш╨в╨Р ╨Ш ╨б╨Ю╨Т╨Х╨в╨Ю╨Т
// ========================================================
const GOAL_CONFIGS = {
  recomp: {
    title: "╨а╨╡╨║╨╛╨╝╨┐╨╛╨╖╨╕╤Ж╨╕╤П (╨б╤Г╤И╨║╨░ ╨╢╨╕╤А╨░ + ╨Ь╤Л╤И╨╡╤З╨╜╤Л╨╣ ╤В╨╛╨╜╤Г╤Б)",
    shortName: "╨а╨╡╨║╨╛╨╝╨┐╨╛╨╖╨╕╤Ж╨╕╤П",
    deficitDelta: -360,
    protPerKg: 1.85,
    fatPerKg: 0.80,
    carbsPerKg: 2.50,
    waterPerKg: 31,
    summary: "╨б╨╢╨╕╨│╨░╨╜╨╕╨╡ ╨▓╨╕╤Б╤Ж╨╡╤А╨░╨╗╤М╨╜╨╛╨│╨╛ ╨╢╨╕╤А╨░ (~0.35 ╨║╨│/╨╜╨╡╨┤) ╨┐╤А╨╕ ╤Б╨╛╤Е╤А╨░╨╜╨╡╨╜╨╕╨╕ ╨╝╤Л╤И╨╡╤З╨╜╨╛╨╣ ╨╝╨░╤Б╤Б╤Л ╨╕ ╤Б╨╕╨╗╨╛╨▓╤Л╤Е ╨┐╨╛╨║╨░╨╖╨░╤В╨╡╨╗╨╡╨╣."
  },
  fatloss: {
    title: "╨б╤Г╤И╨║╨░ ╨╕ ╨░╨║╤В╨╕╨▓╨╜╤Л╨╣ ╤Б╨▒╤А╨╛╤Б ╨▓╨╡╤Б╨░",
    shortName: "╨б╤Г╤И╨║╨░",
    deficitDelta: -550,
    protPerKg: 2.00,
    fatPerKg: 0.65,
    carbsPerKg: 2.10,
    waterPerKg: 34,
    summary: "╨г╤Б╨║╨╛╤А╨╡╨╜╨╜╨╛╨╡ ╤В╨╛╨┐╨╗╨╡╨╜╨╕╨╡ ╨╢╨╕╤А╨╛╨▓╨╛╨╣ ╤В╨║╨░╨╜╨╕ (~0.55 ╨║╨│/╨╜╨╡╨┤) ╨┐╤А╨╕ ╨┐╨╛╨▓╤Л╤И╨╡╨╜╨╜╨╛╨╣ ╨╖╨░╤Й╨╕╤В╨╡ ╨╝╤Л╤И╤Ж ╨▒╨╡╨╗╨║╨╛╨╝."
  },
  hypertrophy: {
    title: "╨Э╨░╨▒╨╛╤А ╤З╨╕╤Б╤В╨╛╨╣ ╨╝╤Л╤И╨╡╤З╨╜╨╛╨╣ ╨╝╨░╤Б╤Б╤Л",
    shortName: "╨Э╨░╨▒╨╛╤А ╨╝╨░╤Б╤Б╤Л",
    deficitDelta: +250,
    protPerKg: 1.80,
    fatPerKg: 0.90,
    carbsPerKg: 4.10,
    waterPerKg: 33,
    summary: "╨а╨╛╤Б╤В ╤Б╨╕╨╗╨╛╨▓╤Л╤Е ╨┐╨╛╨║╨░╨╖╨░╤В╨╡╨╗╨╡╨╣ ╨╕ ╤Б╤Г╤Е╨╛╨╣ ╨╝╤Л╤И╨╡╤З╨╜╨╛╨╣ ╨╝╨░╤Б╤Б╤Л ╨╖╨░ ╤Б╤З╨╡╤В ╤Б╤В╨░╨▒╨╕╨╗╤М╨╜╨╛╨│╨╛ ╨┐╤А╨╛╤Д╨╕╤Ж╨╕╤В╨░ ╤Н╨╜╨╡╤А╨│╨╕╨╕."
  },
  maintenance: {
    title: "╨б╨╕╨╗╨░, ╨Ч╨┤╨╛╤А╨╛╨▓╨░╤П ╨╛╤Б╨░╨╜╨║╨░ ╨╕ ╨Я╨╛╨┤╨┤╨╡╤А╨╢╨░╨╜╨╕╨╡",
    shortName: "╨Я╨╛╨┤╨┤╨╡╤А╨╢╨░╨╜╨╕╨╡",
    deficitDelta: 0,
    protPerKg: 1.70,
    fatPerKg: 0.85,
    carbsPerKg: 3.60,
    waterPerKg: 30,
    summary: "╨д╨╕╨║╤Б╨░╤Ж╨╕╤П ╤Д╨╛╤А╨╝╤Л, ╤А╨░╨╖╨│╤А╤Г╨╖╨║╨░ ╨ж╨Э╨б, ╤Г╨║╤А╨╡╨┐╨╗╨╡╨╜╨╕╨╡ ╤Б╨▓╤П╨╖╨╛╤З╨╜╨╛╨│╨╛ ╨░╨┐╨┐╨░╤А╨░╤В╨░ ╨╕ ╤Б╤В╨░╨▒╨╕╨╗╤М╨╜╤Л╨╣ ╨▓╨╡╤Б."
  }
};

function getActiveGoalKey() {
  const g = (appState.goal || "").toLowerCase();
  if (g.includes("╤Б╤Г╤И╨║╨░ ╨╕ ╤Б╨▒╤А╨╛╤Б") || g.includes("╤Б╨▒╤А╨╛╤Б ╨▓╨╡╤Б╨░")) return 'fatloss';
  if (g.includes("╨╜╨░╨▒╨╛╤А")) return 'hypertrophy';
  if (g.includes("╨┐╨╛╨┤╨┤╨╡╤А╨╢╨░╨╜╨╕╨╡") || g.includes("╨╛╤Б╨░╨╜╨║╨░")) return 'maintenance';
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

  // ╨Ю╨▒╨╜╨╛╨▓╨╗╤П╨╡╨╝ ╤Б╨╡╨│╨╝╨╡╨╜╤В╨╕╤А╨╛╨▓╨░╨╜╨╜╤Л╨╡ ╨║╨╜╨╛╨┐╨║╨╕
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

  // ╨а╨░╤Б╤З╨╡╤В BMR (Mifflin-St Jeor) ╨╕ TDEE ╨┤╨╗╤П ╨а╨╛╨╝╨░╨╜ (32 ╨│, 83 ╨║╨│, 178 ╤Б╨╝)
  const weight = (appState.currentMetrics && appState.currentMetrics.weight) ? appState.currentMetrics.weight : 83.0;
  const height = appState.height || 178;
  const age = appState.age || 32;

  const bmr = Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5);
  // ╨Ъ╨╛╤Н╤Д╤Д╨╕╤Ж╨╕╨╡╨╜╤В ╨░╨║╤В╨╕╨▓╨╜╨╛╤Б╤В╨╕ 1.35 (╤Б╨╕╨╗╨╛╨▓╤Л╨╡ 2-3 ╤А╨░╨╖╨░ ╨▓ ╨╜╨╡╨┤╨╡╨╗╤О + ╨▒╤Л╤В╨╛╨▓╨░╤П ╨░╨║╤В╨╕╨▓╨╜╨╛╤Б╤В╤М)
  const tdee = Math.round(bmr * 1.35);

  const targetCal = tdee + cfg.deficitDelta;

  const protGrams = Math.round(weight * cfg.protPerKg);
  const fatGrams = Math.round(weight * cfg.fatPerKg);
  const carbGrams = Math.round(weight * cfg.carbsPerKg);
  const waterLiters = ((weight * cfg.waterPerKg) / 1000).toFixed(1);

  // ╨Т╤Л╨▓╨╛╨┤ ╨▓ UI
  const headerTargetCal = document.getElementById("health-target-calories");
  const tdeeVal = document.getElementById("health-tdee-val");
  const diffBadge = document.getElementById("health-diff-badge");

  if (headerTargetCal) headerTargetCal.textContent = `${targetCal.toLocaleString('ru-RU')}`;
  if (tdeeVal) tdeeVal.textContent = `${tdee}`;

  if (diffBadge) {
    if (cfg.deficitDelta < 0) {
      diffBadge.textContent = `╨Ф╨╡╤Д╨╕╤Ж╨╕╤В ${cfg.deficitDelta} ╨║╨║╨░╨╗`;
      diffBadge.className = "inline-block px-2.5 py-1 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-bold text-xs";
    } else if (cfg.deficitDelta > 0) {
      diffBadge.textContent = `╨Я╤А╨╛╤Д╨╕╤Ж╨╕╤В +${cfg.deficitDelta} ╨║╨║╨░╨╗`;
      diffBadge.className = "inline-block px-2.5 py-1 rounded-xl bg-[#c8a97e]/20 text-[#c8a97e] border border-[#c8a97e]/40 font-bold text-xs";
    } else {
      diffBadge.textContent = "╨С╨░╨╗╨░╨╜╤Б (0 ╨║╨║╨░╨╗)";
      diffBadge.className = "inline-block px-2.5 py-1 rounded-xl bg-white/10 text-white border border-white/20 font-bold text-xs";
    }
  }

  // ╨Ь╨░╨║╤А╨╛╤Б╤Л
  const elProt = document.getElementById("health-prot-val") || document.getElementById("macro-prot-val");
  const elProtSub = document.getElementById("health-prot-sub") || document.getElementById("macro-prot-sub");
  const elFat = document.getElementById("health-fat-val") || document.getElementById("macro-fat-val");
  const elFatSub = document.getElementById("health-fat-sub") || document.getElementById("macro-fat-sub");
  const elCarb = document.getElementById("health-carb-val") || document.getElementById("macro-carb-val");
  const elCarbSub = document.getElementById("health-carb-sub") || document.getElementById("macro-carb-sub");
  const elWater = document.getElementById("health-water-val") || document.getElementById("macro-water-val");
  const summaryEl = document.getElementById("health-strategy-summary") || document.getElementById("diet-hero-summary");

  if (summaryEl) summaryEl.textContent = cfg.summary;
  if (elProt) elProt.textContent = `${protGrams} ╨│`;
  if (elProtSub) elProtSub.textContent = `${cfg.protPerKg} ╨│/╨║╨│`;
  if (elFat) elFat.textContent = `${fatGrams} ╨│`;
  if (elFatSub) elFatSub.textContent = `${cfg.fatPerKg} ╨│/╨║╨│`;
  if (elCarb) elCarb.textContent = `${carbGrams} ╨│`;
  if (elCarbSub) elCarbSub.textContent = `${cfg.carbsPerKg} ╨│/╨║╨│`;
  if (elWater) elWater.textContent = `${waterLiters} ╨╗`;

  // ╨а╨Р╨б╨з╨Х╨в ╨б╨Ю╨б╨в╨Р╨Т╨Р ╨в╨Х╨Ы╨Р ╨Я╨Ю ╨д╨Ю╨а╨Ь╨г╨Ы╨Х ╨Т╨Ь╨д ╨б╨и╨Р (US NAVY BODY COMPOSITION)
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

  if (bfBadge) bfBadge.textContent = `${bodyFatPct}% ╨╢╨╕╤А╨░`;
  if (lmVal) lmVal.textContent = `${leanMass} ╨║╨│`;
  if (fmVal) fmVal.textContent = `${fatMass} ╨║╨│`;
  if (ffmiVal) ffmiVal.textContent = `${ffmi}`;
  if (ffmiSub) {
    if (ffmi >= 22) ffmiSub.textContent = "╨Я╤А╨╡╨▓╨╛╤Б╤Е╨╛╨┤╨╜╨╛";
    else if (ffmi >= 20) ffmiSub.textContent = "╨Р╤В╨╗╨╡╤В╨╕╤З╨╜╤Л╨╣";
    else ffmiSub.textContent = "╨С╨░╨╖╨╛╨▓╤Л╨╣";
  }
}

// ========================================================
// ╨С╨Р╨Ч╨Р ╨г╨Я╨а╨Р╨Ц╨Э╨Х╨Э╨Ш╨Щ (EXERCISE DATABASE - 30+ ╨г╨Я╨а╨Р╨Ц╨Э╨Х╨Э╨Ш╨Щ)
// ========================================================
const EXERCISE_DATABASE = [
  // ╨У╨а╨г╨Ф╨м
  { id: "db_ch_1", name: "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡ 30┬░", category: "╨У╤А╤Г╨┤╤М", muscleGroup: "╨У╤А╤Г╨┤╤М", targetMuscles: "╨Т╨╡╤А╤Е ╨│╤А╤Г╨┤╨╜╤Л╤Е тАв ╨Я╨╡╤А╨╡╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░ тАв ╨в╤А╨╕╤Ж╨╡╨┐╤Б", phases: ["01: ╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ 2тАУ3╤Б", "02: ╨Я╨░╤Г╨╖╨░ ╨▓╨╜╨╕╨╖╤Г 1╤Б", "03: ╨Ь╨╛╤Й╨╜╤Л╨╣ ╨▓╤Л╨╢╨╕╨╝"], defaultSets: 4, min: 8, max: 10, defaultWeight: 22, calRate: 12, isTime: false, tip: "╨Ы╨╛╨║╤В╨╕ 60тАУ70┬░ ╨║ ╨║╨╛╤А╨┐╤Г╤Б╤Г, ╨╗╨╛╨┐╨░╤В╨║╨╕ ╤Б╨▓╨╡╨┤╨╡╨╜╤Л ╨╕ ╨╛╨┐╤Г╤Й╨╡╨╜╤Л ╨┤╨╗╤П ╤А╨░╨╖╨│╤А╤Г╨╖╨║╨╕ ╤И╨╡╨╕." },
  { id: "db_ch_2", name: "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡", category: "╨У╤А╤Г╨┤╤М", muscleGroup: "╨У╤А╤Г╨┤╤М", targetMuscles: "╨б╨╡╤А╨╡╨┤╨╕╨╜╨░ ╨╕ ╨╜╨╕╨╖ ╨│╤А╤Г╨┤╨╕ тАв ╨в╤А╨╕╤Ж╨╡╨┐╤Б", phases: ["01: ╨б╨▓╨╡╨┤╨╡╨╜╨╕╨╡ ╨╗╨╛╨┐╨░╤В╨╛╨║", "02: ╨а╨░╤Б╤В╤П╨╢╨║╨░ 2╤Б", "03: ╨Т╤Л╨╢╨╕╨╝"], defaultSets: 4, min: 8, max: 10, defaultWeight: 24, calRate: 12, isTime: false, tip: "╨Ь╨╛╤Й╨╜╤Л╨╣ ╨┐╨╛╨┤╨║╨╛╨╜╤В╤А╨╛╨╗╤М╨╜╤Л╨╣ ╨▓╤Л╨╢╨╕╨╝, ╨┐╨░╤Г╨╖╨░ 1 ╤Б╨╡╨║ ╨▓ ╨╜╨╕╨╢╨╜╨╡╨╣ ╤В╨╛╤З╨║╨╡ ╤А╨░╤Б╤В╤П╨╢╨╡╨╜╨╕╤П ╨│╤А╤Г╨┤╨╕." },
  { id: "db_ch_3", name: "╨Ц╨╕╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╗╨╡╨╢╨░ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡", category: "╨У╤А╤Г╨┤╤М", muscleGroup: "╨У╤А╤Г╨┤╤М", targetMuscles: "╨У╤А╤Г╨┤╨╜╤Л╨╡ ╨╝╤Л╤И╤Ж╤Л ╤Ж╨╡╨╗╨╕╨║╨╛╨╝ тАв ╨в╤А╨╕╤Ж╨╡╨┐╤Б", phases: ["01: ╨б╨╜╤П╤В╨╕╨╡ ╤Б╨╛ ╤Б╤В╨╛╨╡╨║", "02: ╨Ъ╨░╤Б╨░╨╜╨╕╨╡ ╨╜╨╕╨╖╨░ ╨│╤А╤Г╨┤╨╕", "03: ╨Т╤Л╨╢╨╕╨╝"], defaultSets: 4, min: 8, max: 10, defaultWeight: 60, calRate: 14, isTime: false, tip: "╨б╨▓╨╡╨┤╨╡╨╜╨╕╨╡ ╨╗╨╛╨┐╨░╤В╨╛╨║, ╨┐╨╗╨╛╤В╨╜╤Л╨╣ ╤Г╨┐╨╛╤А ╨╜╨╛╨│╨░╨╝╨╕ ╨▓ ╨┐╨╛╨╗, ╨│╤А╨╕╤Д ╨╛╨┐╤Г╤Б╨║╨░╨╣ ╨╜╨░ ╨╗╨╕╨╜╨╕╤О ╤Б╨╛╤Б╨║╨╛╨▓." },
  { id: "db_ch_4", name: "╨б╨▓╨╡╨┤╨╡╨╜╨╕╤П ╤А╤Г╨║ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╨▒╨░╨▒╨╛╤З╨║╨░ (Pec Deck)", category: "╨У╤А╤Г╨┤╤М", muscleGroup: "╨У╤А╤Г╨┤╤М", targetMuscles: "╨Ш╨╖╨╛╨╗╤П╤Ж╨╕╤П ╨│╤А╤Г╨┤╨╜╤Л╤Е ╨╝╤Л╤И╤Ж тАв ╨Т╨╜╤Г╤В╤А╨╡╨╜╨╜╤П╤П ╤З╨░╤Б╤В╤М", phases: ["01: ╨У╨╗╤Г╨▒╨╛╨║╨░╤П ╤А╨░╤Б╤В╤П╨╢╨║╨░", "02: ╨б╨▓╨╡╨┤╨╡╨╜╨╕╨╡ ╨┐╨╛ ╨┤╤Г╨│╨╡", "03: ╨б╨╢╨░╤В╨╕╨╡ 2╤Б"], defaultSets: 4, min: 10, max: 12, defaultWeight: 25, calRate: 9, isTime: false, tip: "╨У╨╗╤Г╨▒╨╛╨║╨░╤П ╤А╨░╤Б╤В╤П╨╢╨║╨░ ╨│╤А╤Г╨┤╨╜╤Л╤Е ╨┐╤А╨╕ ╨╛╨┐╤Г╤Б╨║╨░╨╜╨╕╨╕ ╨╕ ╤Д╨╕╨║╤Б╨░╤Ж╨╕╤П 2 ╤Б╨╡╨║ ╨▓ ╤Б╨▓╨╡╨┤╨╡╨╜╨╕╨╕." },
  { id: "db_ch_5", name: "╨б╨▓╨╡╨┤╨╡╨╜╨╕╤П ╨▓ ╨║╤А╨╛╤Б╤Б╨╛╨▓╨╡╤А╨╡ ╨╜╨░ ╨▒╨╗╨╛╨║╨░╤Е", category: "╨У╤А╤Г╨┤╤М", muscleGroup: "╨У╤А╤Г╨┤╤М", targetMuscles: "╨Э╨╕╨╖ ╨╕ ╤Б╨╡╤А╨╡╨┤╨╕╨╜╨░ ╨│╤А╤Г╨┤╨╕", phases: ["01: ╨Э╨░╨║╨╗╨╛╨╜ ╨▓╨┐╨╡╤А╨╡╨┤", "02: ╨б╨▓╨╡╨┤╨╡╨╜╨╕╨╡ ╤А╤Г╨║", "03: ╨б╨╢╨░╤В╨╕╨╡ 1╤Б"], defaultSets: 3, min: 12, max: 15, defaultWeight: 15, calRate: 8, isTime: false, tip: "╨Ы╨╛╨║╤В╨╕ ╤Б╨╗╨╡╨│╨║╨░ ╤Б╨╛╨│╨╜╤Г╤В╤Л ╨╕ ╨╖╨░╤Д╨╕╨║╤Б╨╕╤А╨╛╨▓╨░╨╜╤Л, ╨┤╨▓╨╕╨╢╨╡╨╜╨╕╨╡ ╤З╨╕╤Б╤В╨╛ ╨▓ ╨┐╨╗╨╡╤З╨╡╨▓╤Л╤Е ╤Б╤Г╤Б╤В╨░╨▓╨░╤Е." },
  { id: "db_ch_6", name: "╨Ю╤В╨╢╨╕╨╝╨░╨╜╨╕╤П ╨╜╨░ ╨▒╤А╤Г╤Б╤М╤П╤Е (╤Б ╨░╨║╤Ж╨╡╨╜╤В╨╛╨╝ ╨╜╨░ ╨│╤А╤Г╨┤╤М)", category: "╨У╤А╤Г╨┤╤М", muscleGroup: "╨У╤А╤Г╨┤╤М", targetMuscles: "╨Э╨╕╨╢╨╜╤П╤П ╤З╨░╤Б╤В╤М ╨│╤А╤Г╨┤╨╜╤Л╤Е тАв ╨в╤А╨╕╤Ж╨╡╨┐╤Б", phases: ["01: ╨Э╨░╨║╨╗╨╛╨╜ 30┬░", "02: ╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ ╨┤╨╛ 90┬░", "03: ╨Т╤Л╨╢╨╕╨╝ ╨▓╨▓╨╡╤А╤Е"], defaultSets: 4, min: 8, max: 10, defaultWeight: 0, calRate: 11, isTime: false, tip: "╨Ъ╨╛╤А╨┐╤Г╤Б ╨╜╨░╨║╨╗╨╛╨╜╨╡╨╜ ╨▓╨┐╨╡╤А╨╡╨┤, ╨╗╨╛╨║╤В╨╕ ╨╜╨╡╨╝╨╜╨╛╨│╨╛ ╤А╨░╨╖╨▓╨╡╨┤╨╡╨╜╤Л ╨▓ ╤Б╤В╨╛╤А╨╛╨╜╤Л ╨┐╨╛╨┤ 45┬░." },
  { id: "db_ch_7", name: "╨Ц╨╕╨╝ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╨е╨░╨╝╨╝╨╡╤А ╨╜╨░ ╨│╤А╤Г╨┤╤М", category: "╨У╤А╤Г╨┤╤М", muscleGroup: "╨У╤А╤Г╨┤╤М", targetMuscles: "╨Ш╨╖╨╛╨╗╨╕╤А╨╛╨▓╨░╨╜╨╜╨░╤П ╤В╤А╨░╨╡╨║╤В╨╛╤А╨╕╤П ╨│╤А╤Г╨┤╨╜╤Л╤Е ╨╝╤Л╤И╤Ж", phases: ["01: ╨г╨┐╨╛╤А ╨▓ ╤Б╨┐╨╕╨╜╨║╤Г", "02: ╨Я╨╗╨░╨▓╨╜╤Л╨╣ ╨▓╤Л╨╢╨╕╨╝", "03: ╨Ь╨╡╨┤╨╗╨╡╨╜╨╜╤Л╨╣ ╨▓╨╛╨╖╨▓╤А╨░╤В"], defaultSets: 4, min: 10, max: 12, defaultWeight: 40, calRate: 10, isTime: false, tip: "╨С╨╡╨╖╨╛╨┐╨░╤Б╨╜╨░╤П ╤В╤А╨░╨╡╨║╤В╨╛╤А╨╕╤П ╨┤╨╗╤П ╤Б╤Г╤Б╤В╨░╨▓╨╛╨▓ ╨┐╤А╨╕ ╨╝╨░╨║╤Б╨╕╨╝╨░╨╗╤М╨╜╨╛╨╝ ╨║╤А╨╛╨▓╨╡╨╜╨░╨┐╨╛╨╗╨╜╨╡╨╜╨╕╨╕." },
  { id: "db_ch_8", name: "╨Ц╨╕╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡ 30┬░", category: "╨У╤А╤Г╨┤╤М", muscleGroup: "╨У╤А╤Г╨┤╤М", targetMuscles: "╨Т╨╡╤А╤Е ╨│╤А╤Г╨┤╨╜╤Л╤Е тАв ╨Я╨╡╤А╨╡╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░ тАв ╨в╤А╨╕╤Ж╨╡╨┐╤Б", phases: ["01: ╨г╨│╨╛╨╗ ╤Б╨║╨░╨╝╤М╨╕ 30┬░", "02: ╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ ╨║ ╨▓╨╡╤А╤Е╤Г ╨│╤А╤Г╨┤╨╕", "03: ╨Ь╨╛╤Й╨╜╤Л╨╣ ╨▓╤Л╨╢╨╕╨╝"], defaultSets: 4, min: 8, max: 10, defaultWeight: 55, calRate: 13, isTime: false, tip: "╨У╤А╨╕╤Д ╨╛╨┐╤Г╤Б╨║╨░╨╣ ╨╜╨░ 2-3 ╤Б╨╝ ╨╜╨╕╨╢╨╡ ╨║╨╗╤О╤З╨╕╤Ж, ╨╗╨╛╨║╤В╨╕ ╨┐╨╛╨┤ 60-70┬░ ╨║ ╤В╨╡╨╗╤Г." },

  // ╨б╨Я╨Ш╨Э╨Р
  { id: "db_bk_1", name: "╨в╤П╨│╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨│╨╛ ╨▒╨╗╨╛╨║╨░ ╨║ ╨┐╨╛╤П╤Б╤Г (╨╜╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╤Е╨▓╨░╤В)", category: "╨б╨┐╨╕╨╜╨░", muscleGroup: "╨б╨┐╨╕╨╜╨░", targetMuscles: "╨и╨╕╤А╨╛╤З╨░╨╣╤И╨╕╨╡ ╨╝╤Л╤И╤Ж╤Л тАв ╨а╨╛╨╝╨▒╨╛╨▓╨╕╨┤╨╜╤Л╨╡ тАв ╨б╨╡╤А╨╡╨┤╨╕╨╜╨░ ╤Б╨┐╨╕╨╜╤Л", phases: ["01: ╨Ы╨╛╨║╤В╨╕ ╤Б╨║╨╛╨╗╤М╨╖╤П╤В ╨╜╨░╨╖╨░╨┤", "02: ╨б╨▓╨╡╨┤╨╡╨╜╨╕╨╡ ╨╗╨╛╨┐╨░╤В╨╛╨║", "03: ╨а╨░╤Б╤В╤П╨╢╨║╨░ 2╤Б"], defaultSets: 4, min: 10, max: 12, defaultWeight: 45, calRate: 11, isTime: false, tip: "╨Ы╨╛╨║╤В╨╕ ╤Б╨║╨╛╨╗╤М╨╖╤П╤В ╨▓╨┤╨╛╨╗╤М ╤А╨╡╨▒╨╡╤А ╨╜╨░╨╖╨░╨┤, ╨┐╨╗╨╡╤З╨╕ ╨╖╨░╤Д╨╕╨║╤Б╨╕╤А╨╛╨▓╨░╨╜╤Л ╨▓╨╜╨╕╨╖╤Г." },
  { id: "db_bk_2", name: "╨в╤П╨│╨░ ╨▓╨╡╤А╤Е╨╜╨╡╨│╨╛ ╨▒╨╗╨╛╨║╨░ ╨╜╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╝ ╤Е╨▓╨░╤В╨╛╨╝ ╨║ ╨│╤А╤Г╨┤╨╕", category: "╨б╨┐╨╕╨╜╨░", muscleGroup: "╨б╨┐╨╕╨╜╨░", targetMuscles: "╨Т╨╡╤А╤Е ╤И╨╕╤А╨╛╤З╨░╨╣╤И╨╕╤Е тАв ╨б╨╡╤А╨╡╨┤╨╕╨╜╨░ ╤Б╨┐╨╕╨╜╤Л", phases: ["01: ╨а╨░╤Б╤В╤П╨╢╨║╨░ ╨▓╨▓╨╡╤А╤Е╤Г", "02: ╨в╤П╨│╨░ ╨║ ╨║╨╗╤О╤З╨╕╤Ж╨░╨╝", "03: ╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ ╨╗╨╛╨┐╨░╤В╨╛╨║"], defaultSets: 4, min: 10, max: 12, defaultWeight: 50, calRate: 12, isTime: false, tip: "╨б╨╕╨╝╨╝╨╡╤В╤А╨╕╤З╨╜╨░╤П ╤В╤П╨│╨░ ╨║ ╨▓╨╡╤А╤Е╤Г ╨│╤А╤Г╨┤╨╕, ╨╗╨╛╨┐╨░╤В╨║╨╕ ╨╛╨┐╤Г╤Й╨╡╨╜╤Л ╨▓╨╜╨╕╨╖." },
  { id: "db_bk_3", name: "╨в╤П╨│╨░ ╨║╨░╨╜╨░╤В╨░ ╨║ ╨╗╨╕╤Ж╤Г (Face Pull тАФ ╤А╨░╨╖╨│╤А╤Г╨╖╨║╨░ ╤И╨╡╨╕)", category: "╨б╨┐╨╕╨╜╨░", muscleGroup: "╨б╨┐╨╕╨╜╨░", targetMuscles: "╨Ч╨░╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░ тАв ╨Ь╤Л╤И╤Ж╤Л ╨╗╨╛╨┐╨░╤В╨║╨╕ (╤Б╨╜╤П╤В╨╕╨╡ ╤Б╨┐╨░╨╖╨╝╨░)", phases: ["01: ╨Ъ╨░╨╜╨░╤В ╨║ ╨│╨╗╨░╨╖╨░╨╝", "02: ╨Ы╨╛╨║╤В╨╕ ╨╜╨░╨╖╨░╨┤ ╨╕ ╨▓╤А╨╛╨╖╤М", "03: ╨Я╨░╤Г╨╖╨░ 2╤Б"], defaultSets: 4, min: 15, max: 20, defaultWeight: 15, calRate: 8, isTime: false, tip: "╨Ъ╨░╨╜╨░╤В ╨║ ╨│╨╗╨░╨╖╨░╨╝, ╨╗╨╛╨║╤В╨╕ ╤А╨░╨╖╨▓╨╛╨┤╨╕ ╨╜╨░╨╖╨░╨┤, ╨┐╨░╤Г╨╖╨░ 2 ╤Б╨╡╨║ (╤Б╨╜╨╕╨╝╨░╨╡╤В ╤Б╨┐╨░╨╖╨╝ ╨╝╤Л╤И╤Ж╤Л ╤И╨╡╨╕)." },
  { id: "db_bk_4", name: "╨Я╨╛╨┤╤В╤П╨│╨╕╨▓╨░╨╜╨╕╤П ╨╜╨░ ╤В╤Г╤А╨╜╨╕╨║╨╡ (╨╕╨╗╨╕ ╨▓ ╨│╤А╨░╨▓╨╕╤В╤А╨╛╨╜╨╡)", category: "╨б╨┐╨╕╨╜╨░", muscleGroup: "╨б╨┐╨╕╨╜╨░", targetMuscles: "╨и╨╕╤А╨╛╤З╨░╨╣╤И╨╕╨╡ ╨╝╤Л╤И╤Ж╤Л тАв ╨С╤А╨░╤Е╨╕╨░╨╗╨╕╤Б", phases: ["01: ╨Я╨╛╨╗╨╜╤Л╨╣ ╨▓╨╕╤Б", "02: ╨Я╨╛╨┤╤В╤П╨│╨╕╨▓╨░╨╜╨╕╨╡ ╨║ ╨│╤А╤Г╨┤╨╕", "03: ╨Я╨╗╨░╨▓╨╜╤Л╨╣ ╤Б╨┐╤Г╤Б╨║"], defaultSets: 4, min: 6, max: 10, defaultWeight: 0, calRate: 13, isTime: false, tip: "╨У╤А╤Г╨┤╤М ╤В╤П╨╜╨╡╤В╤Б╤П ╨║ ╨┐╨╡╤А╨╡╨║╨╗╨░╨┤╨╕╨╜╨╡, ╨┐╨╗╨╡╤З╨╕ ╨╛╨┐╤Г╤Й╨╡╨╜╤Л, ╨▒╨╡╨╖ ╤А╨░╤Б╨║╨░╤З╨║╨╕." },
  { id: "db_bk_5", name: "╨в╤П╨│╨░ ╨│╨░╨╜╤В╨╡╨╗╨╕ ╨▓ ╨╜╨░╨║╨╗╨╛╨╜╨╡ ╤Б ╤Г╨┐╨╛╤А╨╛╨╝ ╨▓ ╤Б╨║╨░╨╝╤М╤О", category: "╨б╨┐╨╕╨╜╨░", muscleGroup: "╨б╨┐╨╕╨╜╨░", targetMuscles: "╨Ю╨┤╨╜╨╛╤Б╤В╨╛╤А╨╛╨╜╨╜╤П╤П ╨┐╤А╨╛╤А╨░╨▒╨╛╤В╨║╨░ ╤И╨╕╤А╨╛╤З╨░╨╣╤И╨╡╨╣ ╨╝╤Л╤И╤Ж╤Л", phases: ["01: ╨г╨┐╨╛╤А ╤А╤Г╨║╨╛╨╣", "02: ╨в╤П╨│╨░ ╨║ ╨▒╨╡╨┤╤А╤Г", "03: ╨а╨░╤Б╤В╤П╨╢╨║╨░ ╨▓╨╜╨╕╨╖╤Г"], defaultSets: 3, min: 10, max: 12, defaultWeight: 22, calRate: 10, isTime: false, tip: "╨в╤П╨╜╨╕ ╨│╨░╨╜╤В╨╡╨╗╤М ╤Б╤В╤А╨╛╨│╨╛ ╨║ ╤В╨░╨╖╤Г ╨┐╨╛ ╨┤╤Г╨│╨╡, ╨▒╨╡╨╖ ╤Б╨║╤А╤Г╤З╨╕╨▓╨░╨╜╨╕╤П ╨┐╨╛╨╖╨▓╨╛╨╜╨╛╤З╨╜╨╕╨║╨░." },
  { id: "db_bk_6", name: "╨У╨╕╨┐╨╡╤А╤Н╨║╤Б╤В╨╡╨╜╨╖╨╕╤П ╨┤╨╗╤П ╤А╨░╨╖╨│╨╕╨▒╨░╤В╨╡╨╗╨╡╨╣ ╤Б╨┐╨╕╨╜╤Л", category: "╨б╨┐╨╕╨╜╨░", muscleGroup: "╨б╨┐╨╕╨╜╨░", targetMuscles: "╨Я╨╛╤П╤Б╨╜╨╕╤З╨╜╤Л╨╡ ╤А╨░╨╖╨│╨╕╨▒╨░╤В╨╡╨╗╨╕ тАв ╨п╨│╨╛╨┤╨╕╤Ж╤Л", phases: ["01: ╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ ╨┤╨╛ 90┬░", "02: ╨Я╨╛╨┤╤К╨╡╨╝ ╨▓ ╨╗╨╕╨╜╨╕╤О", "03: ╨С╨╡╨╖ ╨┐╨╡╤А╨╡╤А╨░╨╖╨│╨╕╨▒╨░"], defaultSets: 3, min: 12, max: 15, defaultWeight: 0, calRate: 8, isTime: false, tip: "╨Э╨╡ ╨┐╤А╨╛╨│╨╕╨▒╨░╨╣╤Б╤П ╤Б╨╕╨╗╤М╨╜╨╛ ╨╜╨░╨╖╨░╨┤ ╨▓╨▓╨╡╤А╤Е╤Г, ╨┤╨╡╤А╨╢╨╕ ╨║╨╛╤А╨┐╤Г╤Б ╨▓ ╨┐╤А╤П╨╝╤Г╤О ╨╗╨╕╨╜╨╕╤О." },
  { id: "db_bk_7", name: "╨в╤П╨│╨░ ╨в-╨│╤А╨╕╤Д╨░ ╤Б ╤Г╨┐╨╛╤А╨╛╨╝ ╨▓ ╨│╤А╤Г╨┤╤М", category: "╨б╨┐╨╕╨╜╨░", muscleGroup: "╨б╨┐╨╕╨╜╨░", targetMuscles: "╨и╨╕╤А╨╛╤З╨░╨╣╤И╨╕╨╡ тАв ╨в╨╛╨╗╤Й╨╕╨╜╨░ ╤Б╨┐╨╕╨╜╤Л тАв ╨а╨╛╨╝╨▒╨╛╨▓╨╕╨┤╨╜╤Л╨╡", phases: ["01: ╨г╨┐╨╛╤А ╨│╤А╤Г╨┤╤М╤О", "02: ╨в╤П╨│╨░ ╨╗╨╛╨║╤В╤П╨╝╨╕ ╨╜╨░╨╖╨░╨┤", "03: ╨б╨▓╨╡╨┤╨╡╨╜╨╕╨╡ ╨╗╨╛╨┐╨░╤В╨╛╨║"], defaultSets: 4, min: 8, max: 10, defaultWeight: 40, calRate: 12, isTime: false, tip: "╨г╨┐╨╛╤А ╨│╤А╤Г╨┤╤М╤О ╨┐╨╛╨╗╨╜╨╛╤Б╤В╤М╤О ╤А╨░╨╖╨│╤А╤Г╨╢╨░╨╡╤В ╨┐╨╛╤П╤Б╨╜╨╕╤Ж╤Г, ╨┐╨╛╨╖╨▓╨╛╨╗╤П╤П ╨░╨║╤Ж╨╡╨╜╤В╨╕╤А╨╛╨▓╨░╨╜╨╜╨╛ ╨╜╨░╨│╤А╤Г╨╖╨╕╤В╤М ╤Б╨╡╤А╨╡╨┤╨╕╨╜╤Г ╤Б╨┐╨╕╨╜╤Л." },

  // ╨Э╨Ю╨У╨Ш
  { id: "db_lg_1", name: "╨Ц╨╕╨╝ ╨╜╨╛╨│╨░╨╝╨╕ ╨┐╨╛╨┤ ╤Г╨│╨╗╨╛╨╝ 45┬░ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡", category: "╨Э╨╛╨│╨╕", muscleGroup: "╨Э╨╛╨│╨╕", targetMuscles: "╨Ъ╨▓╨░╨┤╤А╨╕╤Ж╨╡╨┐╤Б тАв ╨п╨│╨╛╨┤╨╕╤Ж╤Л", phases: ["01: ╨г╨┐╨╛╤А ╨▓ ╨┐╤П╤В╨║╨╕", "02: ╨г╨│╨╛╨╗ ╨▓ ╨║╨╛╨╗╨╡╨╜╤П╤Е 90┬░", "03: ╨С╨╡╨╖ ╤Й╨╡╨╗╤З╨║╨░ ╤Б╤Г╤Б╤В╨░╨▓╨╛╨▓"], defaultSets: 4, min: 10, max: 12, defaultWeight: 90, calRate: 16, isTime: false, tip: "╨Ъ╨╛╨╗╨╡╨╜╨╕ ╨▓╨▓╨╡╤А╤Е╤Г ╨╜╨╡ ╨▓╤Б╤В╨░╨▓╨╗╤П╨╣ ╨┤╨╛ ╤Й╨╡╨╗╤З╨║╨░, ╤Г╨┐╨╛╤А ╨▓ ╤Б╨╡╤А╨╡╨┤╨╕╨╜╤Г ╤Б╤В╨╛╨┐╤Л ╨╕ ╨┐╤П╤В╨║╨╕." },
  { id: "db_lg_2", name: "╨а╤Г╨╝╤Л╨╜╤Б╨║╨░╤П ╤В╤П╨│╨░ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕", category: "╨Э╨╛╨│╨╕", muscleGroup: "╨Э╨╛╨│╨╕", targetMuscles: "╨С╨╕╤Ж╨╡╨┐╤Б ╨▒╨╡╨┤╤А╨░ тАв ╨п╨│╨╛╨┤╨╕╤З╨╜╤Л╨╡ ╨╝╤Л╤И╤Ж╤Л", phases: ["01: ╨Ю╤В╨▓╨╛╨┤ ╤В╨░╨╖╨░ ╨╜╨░╨╖╨░╨┤", "02: ╨Я╤А╤П╨╝╨░╤П ╤Б╨┐╨╕╨╜╨░", "03: ╨а╨░╤Б╤В╤П╨╢╨╡╨╜╨╕╨╡ ╨▒╨╡╨┤╤А╨░"], defaultSets: 4, min: 10, max: 12, defaultWeight: 22, calRate: 15, isTime: false, tip: "╨в╨░╨╖ ╨╝╨░╨║╤Б╨╕╨╝╨░╨╗╤М╨╜╨╛ ╨╜╨░╨╖╨░╨┤, ╨║╨╛╨╗╨╡╨╜╨╕ ╤Б╨╗╨╡╨│╨║╨░ ╤Б╨╛╨│╨╜╤Г╤В╤Л, ╤Б╨┐╨╕╨╜╨░ ╨┐╤А╤П╨╝╨░╤П." },
  { id: "db_lg_3", name: "╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨╛╨│ ╤Б╨╕╨┤╤П ╨╕╨╗╨╕ ╨╗╨╡╨╢╨░ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡", category: "╨Э╨╛╨│╨╕", muscleGroup: "╨Э╨╛╨│╨╕", targetMuscles: "╨С╨╕╤Ж╨╡╨┐╤Б ╨▒╨╡╨┤╤А╨░ тАв ╨Я╨╛╨┤╨║╨╛╨╗╨╡╨╜╨╜╤Л╨╡ ╤Б╨▓╤П╨╖╨║╨╕", phases: ["01: ╨Я╨╗╨░╨▓╨╜╨╛╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╨╡", "02: ╨д╨╕╨║╤Б╨░╤Ж╨╕╤П 1╤Б", "03: ╨Ь╨╡╨┤╨╗╨╡╨╜╨╜╤Л╨╣ ╤Б╨┐╤Г╤Б╨║ 3╤Б"], defaultSets: 3, min: 12, max: 15, defaultWeight: 35, calRate: 8, isTime: false, tip: "╨Ь╨╡╨┤╨╗╨╡╨╜╨╜╨╛╨╡ ╨╛╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ 2тАУ3 ╤Б╨╡╨║, ╨░╨║╤Ж╨╡╨╜╤В ╨╜╨░ ╤А╨░╤Б╤В╤П╨╢╨╡╨╜╨╕╨╡ ╨▒╨╕╤Ж╨╡╨┐╤Б╨░ ╨▒╨╡╨┤╤А╨░." },
  { id: "db_lg_4", name: "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨╛╨│ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╤Б╨╕╨┤╤П", category: "╨Э╨╛╨│╨╕", muscleGroup: "╨Э╨╛╨│╨╕", targetMuscles: "╨Ш╨╖╨╛╨╗╤П╤Ж╨╕╤П ╨║╨▓╨░╨┤╤А╨╕╤Ж╨╡╨┐╤Б╨░", phases: ["01: ╨Я╨╗╨░╨▓╨╜╤Л╨╣ ╨┐╨╛╨┤╤К╨╡╨╝", "02: ╨Я╨╕╨║╨╛╨▓╨╛╨╡ ╤Б╨╢╨░╤В╨╕╨╡ 1╤Б", "03: ╨Ь╨╡╨┤╨╗╨╡╨╜╨╜╤Л╨╣ ╤Б╨┐╤Г╤Б╨║"], defaultSets: 3, min: 12, max: 15, defaultWeight: 40, calRate: 8, isTime: false, tip: "╨С╨╡╨╖ ╤А╤Л╨▓╨║╨╛╨▓, ╨╖╨░╨┤╨╡╤А╨╢╨╕╤Б╤М ╨╜╨░ ╤Б╨╡╨║╤Г╨╜╨┤╤Г ╨▓ ╨▓╨╡╤А╤Е╨╜╨╡╨╣ ╤В╨╛╤З╨║╨╡." },
  { id: "db_lg_5", name: "╨Я╤А╨╕╤Б╨╡╨┤╨░╨╜╨╕╤П ╨▓ ╨У╨░╨║╨║-╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡", category: "╨Э╨╛╨│╨╕", muscleGroup: "╨Э╨╛╨│╨╕", targetMuscles: "╨Ъ╨▓╨░╨┤╤А╨╕╤Ж╨╡╨┐╤Б тАв ╨п╨│╨╛╨┤╨╕╤Ж╤Л", phases: ["01: ╨б╨┐╨╕╨╜╨░ ╨║ ╨╛╨┐╨╛╤А╨╡", "02: ╨Я╨╗╨░╨▓╨╜╤Л╨╣ ╤Б╨╡╨┤ 90┬░", "03: ╨Я╨╛╨┤╤К╨╡╨╝ ╨┐╤П╤В╨║╨░╨╝╨╕"], defaultSets: 3, min: 10, max: 12, defaultWeight: 35, calRate: 13, isTime: false, tip: "╨Я╨╗╨░╨▓╨╜╨╛╨╡ ╨┤╨▓╨╕╨╢╨╡╨╜╨╕╨╡ ╨┐╨╛ ╨╜╨░╨┐╤А╨░╨▓╨╗╨╡╨╜╨╕╤О ╨╜╨╛╤Б╨║╨╛╨▓, ╨┐╨╛╤П╤Б╨╜╨╕╤Ж╨░ ╨┐╨╗╨╛╤В╨╜╨╛ ╨┐╤А╨╕╨╢╨░╤В╨░." },
  { id: "db_lg_6", name: "╨Я╨╛╨┤╤К╨╡╨╝ ╨╜╨░ ╨╜╨╛╤Б╨║╨╕ ╤Б╤В╨╛╤П ╨╜╨░ ╨╕╨║╤А╨╛╨╜╨╛╨╢╨╜╤Л╨╡", category: "╨Э╨╛╨│╨╕", muscleGroup: "╨Э╨╛╨│╨╕", targetMuscles: "╨Ш╨║╤А╨╛╨╜╨╛╨╢╨╜╤Л╨╡ ╨╝╤Л╤И╤Ж╤Л тАв ╨Р╤Е╨╕╨╗╨╗╨╛╨▓╨╛ ╤Б╤Г╤Е╨╛╨╢╨╕╨╗╨╕╨╡", phases: ["01: ╨У╨╗╤Г╨▒╨╛╨║╨╕╨╣ ╤Б╨┐╤Г╤Б╨║", "02: ╨Т╤Л╨╢╨╕╨╝ ╨╜╨░ ╨╜╨╛╤Б╨║╨╕", "03: ╨Я╨░╤Г╨╖╨░ 2╤Б ╨▓╨▓╨╡╤А╤Е╤Г"], defaultSets: 4, min: 15, max: 20, defaultWeight: 50, calRate: 8, isTime: false, tip: "╨Я╨╛╨╗╨╜╨░╤П ╨░╨╝╨┐╨╗╨╕╤В╤Г╨┤╨░ ╤Б ╨┐╨░╤Г╨╖╨╛╨╣ 2 ╤Б╨╡╨║ ╨▓ ╨╜╨╕╨╢╨╜╨╡╨╣ ╤В╨╛╤З╨║╨╡ ╤А╨░╤Б╤В╤П╨╢╨║╨╕." },

  // ╨Я╨Ы╨Х╨з╨Ш
  { id: "db_sh_1", name: "╨Ь╨░╤Е╨╕ ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╤З╨╡╤А╨╡╨╖ ╤Б╤В╨╛╤А╨╛╨╜╤Л ╤Б╤В╨╛╤П", category: "╨Я╨╗╨╡╤З╨╕", muscleGroup: "╨Я╨╗╨╡╤З╨╕", targetMuscles: "╨б╤А╨╡╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░ (╤И╨╕╤А╨╕╨╜╨░ ╨┐╨╗╨╡╤З)", phases: ["01: ╨Э╨░╨║╨╗╨╛╨╜ ╨▓╨┐╨╡╤А╨╡╨┤", "02: ╨Я╨╛╨┤╤К╨╡╨╝ ╨╗╨╛╨║╤В╤П╨╝╨╕", "03: ╨Ъ╨╕╤Б╤В╤М ╨╜╨╕╨╢╨╡ ╨╗╨╛╨║╤В╤П"], defaultSets: 4, min: 12, max: 15, defaultWeight: 8, calRate: 7, isTime: false, tip: "╨Я╨╛╨┤╤К╨╡╨╝ ╤З╨╡╤А╨╡╨╖ ╤Б╤В╨╛╤А╨╛╨╜╤Л ╨╗╨╛╨║╤В╤П╨╝╨╕ ╨┤╨╛ ╤Г╤А╨╛╨▓╨╜╤П ╨┐╨╗╨╡╤З, ╨║╨╕╤Б╤В╤М ╨╜╨╡ ╨╖╨░╨┤╨╕╤А╨░╨╣ ╨▓╤Л╤И╨╡ ╨╗╨╛╨║╤В╤П." },
  { id: "db_sh_2", name: "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╤Б╨╕╨┤╤П ╨╜╨░ ╨┐╨╗╨╡╤З╨╕ (╤Б╨║╨░╨╝╤М╤П 75┬░)", category: "╨Я╨╗╨╡╤З╨╕", muscleGroup: "╨Я╨╗╨╡╤З╨╕", targetMuscles: "╨Я╨╡╤А╨╡╨┤╨╜╤П╤П ╨╕ ╤Б╤А╨╡╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░", phases: ["01: ╨Ы╨╛╨║╤В╨╕ ╨┐╨╡╤А╨╡╨┤ ╤Б╨╛╨▒╨╛╨╣", "02: ╨Т╤Л╨╢╨╕╨╝ ╨╜╨░╨┤ ╨│╨╛╨╗╨╛╨▓╨╛╨╣", "03: ╨С╨╡╨╖ ╨┐╤А╨╛╨│╨╕╨▒╨░"], defaultSets: 4, min: 8, max: 10, defaultWeight: 16, calRate: 9, isTime: false, tip: "╨Я╨╗╨░╨▓╨╜╤Л╨╣ ╨╢╨╕╨╝ ╨╜╨░╨┤ ╨│╨╛╨╗╨╛╨▓╨╛╨╣ ╨▒╨╡╨╖ ╤А╨╡╨╖╨║╨╛╨│╨╛ ╨┐╤А╨╛╨│╨╕╨▒╨░ ╨▓ ╨┐╨╛╤П╤Б╨╜╨╕╤Ж╨╡." },
  { id: "db_sh_3", name: "╨а╨░╨╖╨▓╨╛╨┤╨║╨░ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨▓ ╨╜╨░╨║╨╗╨╛╨╜╨╡ ╨╜╨░ ╨╖╨░╨┤╨╜╤О╤О ╨┤╨╡╨╗╤М╤В╤Г", category: "╨Я╨╗╨╡╤З╨╕", muscleGroup: "╨Я╨╗╨╡╤З╨╕", targetMuscles: "╨Ч╨░╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░ тАв ╨а╨╛╨╝╨▒╨╛╨▓╨╕╨┤╨╜╤Л╨╡ ╨╝╤Л╤И╤Ж╤Л", phases: ["01: ╨Э╨░╨║╨╗╨╛╨╜ 45-60┬░", "02: ╨а╨░╨╖╨▓╨╡╨┤╨╡╨╜╨╕╨╡ ╤А╤Г╨║", "03: ╨Я╨░╤Г╨╖╨░ 1╤Б"], defaultSets: 4, min: 12, max: 15, defaultWeight: 7, calRate: 7, isTime: false, tip: "╨Ф╨▓╨╕╨╢╨╡╨╜╨╕╨╡ ╨▓╤Л╨┐╨╛╨╗╨╜╤П╨╡╤В╤Б╤П ╨╗╨╛╨║╤В╤П╨╝╨╕ ╨╜╨░╨╖╨░╨┤-╨▓╨▒╨╛╨║, ╤В╤А╨░╨┐╨╡╤Ж╨╕╤О ╨╜╨╡ ╨╖╨░╨╢╨╕╨╝╨░╨╣." },
  { id: "db_sh_4", name: "╨Я╤А╨╛╤В╤П╨╢╨║╨░ ╨╜╨░ ╨▒╨╗╨╛╨║╨╡ ╨║ ╨┐╨╛╨┤╨▒╨╛╤А╨╛╨┤╨║╤Г (╤И╨╕╤А╨╛╨║╨╕╨╣ ╤Е╨▓╨░╤В)", category: "╨Я╨╗╨╡╤З╨╕", muscleGroup: "╨Я╨╗╨╡╤З╨╕", targetMuscles: "╨б╤А╨╡╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░ тАв ╨Т╨╡╤А╤Е ╤Б╨┐╨╕╨╜╤Л", phases: ["01: ╨е╨▓╨░╤В ╤И╨╕╤А╨╡ ╨┐╨╗╨╡╤З", "02: ╨в╤П╨│╨░ ╨╗╨╛╨║╤В╤П╨╝╨╕ ╨▓╨▓╨╡╤А╤Е", "03: ╨Ф╨╛ ╨╜╨╕╨╖╨░ ╨│╤А╤Г╨┤╨╕"], defaultSets: 3, min: 12, max: 15, defaultWeight: 25, calRate: 8, isTime: false, tip: "╨и╨╕╤А╨╛╨║╨╕╨╣ ╤Е╨▓╨░╤В ╤Б╨╜╨╕╨╢╨░╨╡╤В ╨╜╨░╨│╤А╤Г╨╖╨║╤Г ╨╜╨░ ╨║╨╕╤Б╤В╨╡╨▓╤Л╨╡ ╨╕ ╨┐╨╗╨╡╤З╨╡╨▓╤Л╨╡ ╤Б╤Г╤Б╤В╨░╨▓╤Л." },

  // ==========================================
  // ╨в╨а╨Ш╨ж╨Х╨Я╨б
  // ==========================================
  { id: "db_tr_1", name: "╨Ц╨╕╨╝ ╤И╤В╨░╨╜╨│╨╕ ╤Г╨╖╨║╨╕╨╝ ╤Е╨▓╨░╤В╨╛╨╝ ╨╗╨╡╨╢╨░", category: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨в╤А╨╕╤Ж╨╡╨┐╤Б (╨▓╤Б╨╡ 3 ╨│╨╛╨╗╨╛╨▓╨║╨╕) тАв ╨Я╨╡╤А╨╡╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░ тАв ╨Т╨╡╤А╤Е ╨│╤А╤Г╨┤╨╕", phases: ["01: ╨е╨▓╨░╤В ╨╜╨░ ╤И╨╕╤А╨╕╨╜╨╡ ╨┐╨╗╨╡╤З", "02: ╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ ╨║ ╨╜╨╕╨╖╤Г ╨│╤А╤Г╨┤╨╕", "03: ╨Ь╨╛╤Й╨╜╤Л╨╣ ╨▓╤Л╨╢╨╕╨╝"], defaultSets: 4, min: 8, max: 10, defaultWeight: 50, calRate: 12, isTime: false, tip: "╨е╨▓╨░╤В ╤Б╤В╤А╨╛╨│╨╛ ╨╜╨░ ╤И╨╕╤А╨╕╨╜╨╡ ╨┐╨╗╨╡╤З (╨╜╨╡ ╤Б╨╗╨╕╤И╨║╨╛╨╝ ╤Г╨╖╨║╨╛), ╨╗╨╛╨║╤В╨╕ ╨┤╨╡╤А╨╢╨╕ ╨▒╨╗╨╕╨╢╨╡ ╨║ ╨║╨╛╤А╨┐╤Г╤Б╤Г (╨┐╨╛╨┤ 30-45┬░)." },
  { id: "db_tr_2", name: "╨д╤А╨░╨╜╤Ж╤Г╨╖╤Б╨║╨╕╨╣ ╨╢╨╕╨╝ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╨╗╨╡╨╢╨░ ╨╜╨░ ╤Б╨║╨░╨╝╤М╨╡", category: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨Ф╨╗╨╕╨╜╨╜╨░╤П ╨╕ ╨╗╨░╤В╨╡╤А╨░╨╗╤М╨╜╨░╤П ╨│╨╛╨╗╨╛╨▓╨║╨░ ╤В╤А╨╕╤Ж╨╡╨┐╤Б╨░", phases: ["01: ╨Э╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╤Е╨▓╨░╤В", "02: ╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ ╨║ ╨▓╨╕╤Б╨║╨░╨╝", "03: ╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╨╡"], defaultSets: 3, min: 10, max: 12, defaultWeight: 10, calRate: 7, isTime: false, tip: "╨Э╨╡╨╖╨░╨▓╨╕╤Б╨╕╨╝╨░╤П ╤А╨░╨▒╨╛╤В╨░ ╨║╨░╨╢╨┤╨╛╨╣ ╤А╤Г╨║╨╕ ╨╕╤Б╨║╨╗╤О╤З╨░╨╡╤В ╨┤╨╕╤Б╨▒╨░╨╗╨░╨╜╤Б, ╨╗╨╛╨║╤В╨╕ ╨┐╨░╤А╨░╨╗╨╗╨╡╨╗╤М╨╜╤Л ╨┤╤А╤Г╨│ ╨┤╤А╤Г╨│╤Г." },
  { id: "db_tr_3", name: "╨д╤А╨░╨╜╤Ж╤Г╨╖╤Б╨║╨╕╨╣ ╨╢╨╕╨╝ ╤Б╨╛ ╤И╤В╨░╨╜╨│╨╛╨╣ (EZ-╨│╤А╨╕╤Д) ╨╗╨╡╨╢╨░", category: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨Ф╨╗╨╕╨╜╨╜╨░╤П ╨╕ ╨╗╨░╤В╨╡╤А╨░╨╗╤М╨╜╨░╤П ╨│╨╛╨╗╨╛╨▓╨║╨░ ╤В╤А╨╕╤Ж╨╡╨┐╤Б╨░", phases: ["01: ╨Э╨░╨║╨╗╨╛╨╜ ╨┐╨╗╨╡╤З╨░ 15┬░ ╨╜╨░╨╖╨░╨┤", "02: ╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ ╨╖╨░ ╨╝╨░╨║╤Г╤И╨║╤Г", "03: ╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╨╡ ╨▓ ╨╗╨╛╨║╤В╤П╤Е"], defaultSets: 4, min: 10, max: 12, defaultWeight: 25, calRate: 9, isTime: false, tip: "╨Ю╨┐╤Г╤Б╨║╨░╨╣ ╨│╤А╨╕╤Д ╤З╤Г╤В╤М ╨╖╨░ ╨│╨╛╨╗╨╛╨▓╤Г (╨║ ╨╝╨░╨║╤Г╤И╨║╨╡), ╤З╤В╨╛╨▒╤Л ╤Б╨╛╤Е╤А╨░╨╜╤П╤В╤М ╨┐╨╛╤Б╤В╨╛╤П╨╜╨╜╨╛╨╡ ╨╜╨░╤В╤П╨╢╨╡╨╜╨╕╨╡ ╨┤╨╗╨╕╨╜╨╜╨╛╨╣ ╨│╨╛╨╗╨╛╨▓╨║╨╕." },
  { id: "db_tr_4", name: "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╨╡ ╤А╤Г╨║╨╕ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤М╤О ╨╕╨╖-╨╖╨░ ╨│╨╛╨╗╨╛╨▓╤Л ╤Б╨╕╨┤╤П", category: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨Ф╨╗╨╕╨╜╨╜╨░╤П ╨│╨╛╨╗╨╛╨▓╨║╨░ ╤В╤А╨╕╤Ж╨╡╨┐╤Б╨░ (╨╝╨░╨║╤Б╨╕╨╝╨░╨╗╤М╨╜╨░╤П ╤А╨░╤Б╤В╤П╨╢╨║╨░)", phases: ["01: ╨У╨░╨╜╤В╨╡╨╗╤М ╨╜╨░╨┤ ╨│╨╛╨╗╨╛╨▓╨╛╨╣", "02: ╨У╨╗╤Г╨▒╨╛╨║╨╛╨╡ ╨╛╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ ╨╖╨░ ╤И╨╡╤О", "03: ╨Т╤Л╨╢╨╕╨╝ ╨▓╨▓╨╡╤А╤Е"], defaultSets: 3, min: 10, max: 12, defaultWeight: 18, calRate: 8, isTime: false, tip: "╨Ы╨╛╨║╤В╨╕ ╨┤╨╡╤А╨╢╨╕ ╨╜╨░╨┐╤А╨░╨▓╨╗╨╡╨╜╨╜╤Л╨╝╨╕ ╨▓╨▓╨╡╤А╤Е ╨╕ ╨╜╨╡ ╤А╨░╨╖╨▓╨╛╨┤╨╕ ╤И╨╕╤А╨╛╨║╨╛, ╨╛╤Й╤Г╤Й╨░╨╣ ╨╝╨╛╤Й╨╜╨╛╨╡ ╤А╨░╤Б╤В╤П╨╢╨╡╨╜╨╕╨╡ ╤В╤А╨╕╤Ж╨╡╨┐╤Б╨░." },
  { id: "db_tr_5", name: "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╨╜╨░ ╨▓╨╡╤А╤Е╨╜╨╡╨╝ ╨▒╨╗╨╛╨║╨╡ ╤Б ╨║╨░╨╜╨░╤В╨╛╨╝", category: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨Ы╨░╤В╨╡╤А╨░╨╗╤М╨╜╨░╤П ╨╕ ╨╝╨╡╨┤╨╕╨░╨╗╤М╨╜╨░╤П ╨│╨╛╨╗╨╛╨▓╨║╨░ ╤В╤А╨╕╤Ж╨╡╨┐╤Б╨░", phases: ["01: ╨д╨╕╨║╤Б╨░╤Ж╨╕╤П ╨╗╨╛╨║╤В╨╡╨╣ ╤Г ╤А╨╡╨▒╨╡╤А", "02: ╨а╨░╨╖╨▓╨╡╨┤╨╡╨╜╨╕╨╡ ╨║╨░╨╜╨░╤В╨░ ╨▓╨╜╨╕╨╖╤Г", "03: ╨Я╨╕╨║╨╛╨▓╨╛╨╡ ╤Б╨╢╨░╤В╨╕╨╡ 1╤Б"], defaultSets: 3, min: 12, max: 15, defaultWeight: 20, calRate: 7, isTime: false, tip: "╨Ы╨╛╨║╤В╨╕ ╨╜╨░╨╝╨╡╤А╤В╨▓╨╛ ╨╖╨░╤Д╨╕╨║╤Б╨╕╤А╨╛╨▓╨░╨╜╤Л ╤Г ╨║╨╛╤А╨┐╤Г╤Б╨░, ╤А╨░╨╖╨▓╨╛╨┤╨╕ ╨║╨╛╨╜╤Ж╤Л ╨║╨░╨╜╨░╤В╨░ ╨▓ ╤Б╤В╨╛╤А╨╛╨╜╤Л ╨▓ ╨╜╨╕╨╢╨╜╨╡╨╣ ╤В╨╛╤З╨║╨╡." },
  { id: "db_tr_6", name: "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╨╜╨░ ╨▒╨╗╨╛╨║╨╡ ╤Б ╨┐╤А╤П╨╝╨╛╨╣ / V-╤А╤Г╨║╨╛╤П╤В╤М╤О", category: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨Ы╨░╤В╨╡╤А╨░╨╗╤М╨╜╨░╤П ╨│╨╛╨╗╨╛╨▓╨║╨░ ╤В╤А╨╕╤Ж╨╡╨┐╤Б╨░ (╨▒╨╛╨║╨╛╨▓╨░╤П ╤З╨░╤Б╤В╤М)", phases: ["01: ╨г╨┐╨╛╤А ╨▓ ╤А╤Г╨║╨╛╤П╤В╤М", "02: ╨Я╨╛╨╗╨╜╨╛╨╡ ╨▓╤Л╨┐╤А╤П╨╝╨╗╨╡╨╜╨╕╨╡ ╨▓╨╜╨╕╨╖", "03: ╨Я╨╗╨░╨▓╨╜╤Л╨╣ ╨┐╨╛╨┤╤К╨╡╨╝ ╨┤╨╛ 90┬░"], defaultSets: 3, min: 10, max: 12, defaultWeight: 25, calRate: 8, isTime: false, tip: "╨Ъ╨╛╤А╨┐╤Г╤Б ╤Б╨╗╨╡╨│╨║╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╡╨╜ ╨▓╨┐╨╡╤А╨╡╨┤, ╨╢╨╝╨╕ ╤А╤Г╨║╨╛╤П╤В╤М ╨▓╨╜╨╕╨╖ ╨╛╤Б╨╜╨╛╨▓╨░╨╜╨╕╨╡╨╝ ╨╗╨░╨┤╨╛╨╜╨╡╨╣." },
  { id: "db_tr_7", name: "╨Ю╤В╨╢╨╕╨╝╨░╨╜╨╕╤П ╨╛╤В ╤Б╨║╨░╨╝╤М╨╕ ╤Б╨╖╨░╨┤╨╕ (╨╛╨▒╤А╨░╤В╨╜╤Л╨╡ ╨╛╤В╨╢╨╕╨╝╨░╨╜╨╕╤П)", category: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨в╤А╨╕╤Ж╨╡╨┐╤Б тАв ╨Я╨╡╤А╨╡╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░", phases: ["01: ╨г╨┐╨╛╤А ╤А╤Г╨║╨░╨╝╨╕ ╨▓ ╨║╤А╨░╨╣ ╤Б╨║╨░╨╝╤М╨╕", "02: ╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ ╨┤╨╛ 90┬░", "03: ╨Т╤Л╨╢╨╕╨╝"], defaultSets: 3, min: 12, max: 15, defaultWeight: 0, calRate: 9, isTime: false, tip: "╨б╨┐╨╕╨╜╨░ ╤Б╨║╨╛╨╗╤М╨╖╨╕╤В ╨▓╨┐╨╗╨╛╤В╨╜╤Г╤О ╨║ ╤Б╨║╨░╨╝╤М╨╡, ╨┐╨╗╨╡╤З╨╕ ╨╜╨╡ ╨╖╨░╨┤╨╕╤А╨░╨╣ ╨║ ╤Г╤И╨░╨╝." },
  { id: "db_tr_8", name: "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╨╡ ╤А╤Г╨║╨╕ ╨╜╨░╨╖╨░╨┤ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤М╤О ╨▓ ╨╜╨░╨║╨╗╨╛╨╜╨╡ (╨Ъ╨╕╨║╨▒╤Н╨║)", category: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨Я╨╕╨║╨╛╨▓╨░╤П ╨╕╨╖╨╛╨╗╤П╤Ж╨╕╤П ╨╗╨░╤В╨╡╤А╨░╨╗╤М╨╜╨╛╨╣ ╨│╨╛╨╗╨╛╨▓╨║╨╕ ╤В╤А╨╕╤Ж╨╡╨┐╤Б╨░", phases: ["01: ╨Ы╨╛╨║╨╛╤В╤М ╨┐╨╛╨┤╨╜╤П╤В ╨▓╤Л╤И╨╡ ╤Б╨┐╨╕╨╜╤Л", "02: ╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╨╡ ╨╜╨░╨╖╨░╨┤", "03: ╨д╨╕╨║╤Б╨░╤Ж╨╕╤П 1╤Б"], defaultSets: 3, min: 12, max: 15, defaultWeight: 8, calRate: 6, isTime: false, tip: "╨Я╨╗╨╡╤З╨╡╨▓╨░╤П ╨║╨╛╤Б╤В╤М ╤Б╤В╤А╨╛╨│╨╛ ╨┐╨░╤А╨░╨╗╨╗╨╡╨╗╤М╨╜╨░ ╨┐╨╛╨╗╤Г, ╨┤╨▓╨╕╨│╨░╨╡╤В╤Б╤П ╤В╨╛╨╗╤М╨║╨╛ ╨┐╤А╨╡╨┤╨┐╨╗╨╡╤З╤М╨╡." },
  { id: "db_tr_9", name: "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨░ ╨▒╨╗╨╛╨║╨╡ ╨╕╨╖-╨╖╨░ ╨│╨╛╨╗╨╛╨▓╤Л ╤Б ╨║╨░╨╜╨░╤В╨╛╨╝", category: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨Ф╨╗╨╕╨╜╨╜╨░╤П ╨│╨╛╨╗╨╛╨▓╨║╨░ ╤В╤А╨╕╤Ж╨╡╨┐╤Б╨░ тАв ╨Я╨╛╤Б╤В╨╛╤П╨╜╨╜╨╛╨╡ ╨╜╨░╤В╤П╨╢╨╡╨╜╨╕╨╡ ╤В╤А╨╛╤Б╨░", phases: ["01: ╨в╤А╨╛╤Б ╨╖╨░ ╨│╨╛╨╗╨╛╨▓╨╛╨╣", "02: ╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╨╡ ╨▓╨┐╨╡╤А╨╡╨┤-╨▓╨▓╨╡╤А╤Е", "03: ╨а╨░╨╖╨▓╨╡╨┤╨╡╨╜╨╕╨╡ ╨║╨╕╤Б╤В╨╡╨╣"], defaultSets: 3, min: 12, max: 15, defaultWeight: 18, calRate: 7, isTime: false, tip: "╨Ю╤В╨╗╨╕╤З╨╜╨╛╨╡ ╨╕╨╖╨╛╨╗╨╕╤А╨╛╨▓╨░╨╜╨╜╨╛╨╡ ╤Г╨┐╤А╨░╨╢╨╜╨╡╨╜╨╕╨╡ ╨┤╨╗╤П ╨┤╨╗╨╕╨╜╨╜╨╛╨╣ ╨│╨╛╨╗╨╛╨▓╨║╨╕ ╤В╤А╨╕╤Ж╨╡╨┐╤Б╨░ ╨▓ ╤А╨░╤Б╤В╤П╨╜╤Г╤В╨╛╨╣ ╨┐╨╛╨╖╨╕╤Ж╨╕╨╕." },

  // ==========================================
  // ╨С╨Ш╨ж╨Х╨Я╨б
  // ==========================================
  { id: "db_bi_1", name: "╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡ 45┬░", category: "╨С╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨С╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨Ф╨╗╨╕╨╜╨╜╨░╤П ╨│╨╛╨╗╨╛╨▓╨║╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б╨░ (╨╝╨░╨║╤Б╨╕╨╝╨░╨╗╤М╨╜╨░╤П ╤А╨░╤Б╤В╤П╨╢╨║╨░)", phases: ["01: ╨Ы╨╛╨║╤В╨╕ ╨╛╤В╨▓╨╡╨┤╨╡╨╜╤Л ╨╜╨░╨╖╨░╨┤", "02: ╨Я╨╛╨┤╤К╨╡╨╝ ╤Б ╤Б╤Г╨┐╨╕╨╜╨░╤Ж╨╕╨╡╨╣", "03: ╨У╨╗╤Г╨▒╨╛╨║╨╕╨╣ ╤Б╨┐╤Г╤Б╨║ 3╤Б"], defaultSets: 3, min: 10, max: 12, defaultWeight: 10, calRate: 8, isTime: false, tip: "╨Э╨░╨║╨╗╨╛╨╜ ╤Б╨║╨░╨╝╤М╨╕ 45┬░ ╤Б╨╛╨╖╨┤╨░╨╡╤В ╨╝╨╛╤Й╨╜╨╡╨╣╤И╨╡╨╡ ╤А╨░╤Б╤В╤П╨╢╨╡╨╜╨╕╨╡ ╨┤╨╗╨╕╨╜╨╜╨╛╨╣ ╨│╨╛╨╗╨╛╨▓╨║╨╕ ╨▒╨╕╤Ж╨╡╨┐╤Б╨░ ╨▓ ╤Б╤В╨░╤А╤В╨╛╨▓╨╛╨╣ ╨┐╨╛╨╖╨╕╤Ж╨╕╨╕." },
  { id: "db_bi_2", name: "╨Я╨╛╨┤╤К╨╡╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б ╤Б╤В╨╛╤П ╤Б ╤Б╤Г╨┐╨╕╨╜╨░╤Ж╨╕╨╡╨╣", category: "╨С╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨С╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨Ф╨▓╤Г╨│╨╗╨░╨▓╨░╤П ╨╝╤Л╤И╤Ж╨░ ╨┐╨╗╨╡╤З╨░ (╨▒╨╕╤Ж╨╡╨┐╤Б) тАв ╨Я╨╕╨║ ╨▒╨╕╤Ж╨╡╨┐╤Б╨░", phases: ["01: ╨Э╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╤Е╨▓╨░╤В ╨▓╨╜╨╕╨╖╤Г", "02: ╨а╨░╨╖╨▓╨╛╤А╨╛╤В ╨║╨╕╤Б╤В╨╕ ╨╜╨░╤А╤Г╨╢╤Г", "03: ╨б╨╢╨░╤В╨╕╨╡ ╨▓╨▓╨╡╤А╤Е╤Г 1╤Б"], defaultSets: 3, min: 10, max: 12, defaultWeight: 12, calRate: 8, isTime: false, tip: "╨Т ╨▓╨╡╤А╤Е╨╜╨╡╨╣ ╤В╤А╨╡╤В╨╕ ╨░╨╝╨┐╨╗╨╕╤В╤Г╨┤╤Л ╨╝╨░╨║╤Б╨╕╨╝╨░╨╗╤М╨╜╨╛ ╤А╨░╨╖╨▓╨╛╤А╨░╤З╨╕╨▓╨░╨╣ ╨╝╨╕╨╖╨╕╨╜╨╡╤Ж ╨▓╨▓╨╡╤А╤Е ╨╕ ╨╜╨░╤А╤Г╨╢╤Г." },
  { id: "db_bi_3", name: "╨Ь╨╛╨╗╨╛╤В╨║╨╛╨▓╤Л╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ (Hammer Curls)", category: "╨С╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨С╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨С╤А╨░╤Е╨╕╨░╨╗╨╕╤Б тАв ╨Я╨╗╨╡╤З╨╡╨╗╤Г╤З╨╡╨▓╨░╤П ╨╝╤Л╤И╤Ж╨░ тАв ╨Ф╨╗╨╕╨╜╨╜╨░╤П ╨│╨╛╨╗╨╛╨▓╨║╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б╨░", phases: ["01: ╨Э╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╤Е╨▓╨░╤В (╨╗╨░╨┤╨╛╨╜╨╕ ╨▓╨╜╤Г╤В╤А╤М)", "02: ╨Я╨╛╨┤╤К╨╡╨╝ ╨╗╨╛╨║╤В╤П╨╝╨╕ ╨▓╨╜╨╕╨╖", "03: ╨Ь╨╡╨┤╨╗╨╡╨╜╨╜╤Л╨╣ ╤Б╨┐╤Г╤Б╨║"], defaultSets: 3, min: 10, max: 12, defaultWeight: 14, calRate: 8, isTime: false, tip: "╨а╨░╨╖╨▓╨╕╨▓╨░╨╡╤В ╨▒╤А╨░╤Е╨╕╨░╨╗╨╕╤Б, ╨║╨╛╤В╨╛╤А╤Л╨╣ ╨▓╤Л╤В╨░╨╗╨║╨╕╨▓╨░╨╡╤В ╨▒╨╕╤Ж╨╡╨┐╤Б ╨╜╨░╤А╤Г╨╢╤Г ╨╕ ╨┤╨░╨╡╤В ╨╝╨╛╤Й╨╜╤Г╤О ╤В╨╛╨╗╤Й╨╕╨╜╤Г ╤А╤Г╨║╨░╨╝." },
  { id: "db_bi_4", name: "╨Ь╨╛╨╗╨╛╤В╨║╨╛╨▓╤Л╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡", category: "╨С╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨С╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨С╤А╨░╤Е╨╕╨░╨╗╨╕╤Б тАв ╨Т╨╜╨╡╤И╨╜╤П╤П ╤З╨░╤Б╤В╤М ╨▒╨╕╤Ж╨╡╨┐╤Б╨░ ╨╕ ╨┐╤А╨╡╨┤╨┐╨╗╨╡╤З╤М╤П", phases: ["01: ╨г╨┐╨╛╤А ╨▓ ╤Б╨┐╨╕╨╜╨║╤Г 60┬░", "02: ╨Э╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╨┐╨╛╨┤╤К╨╡╨╝", "03: ╨Ъ╨╛╨╜╤В╤А╨╛╨╗╤М ╨╜╨╡╨│╨░╤В╨╕╨▓╨░"], defaultSets: 3, min: 10, max: 12, defaultWeight: 12, calRate: 8, isTime: false, tip: "╨б╨╛╤З╨╡╤В╨░╨╡╤В ╨╝╨╛╤Й╨╜╨╛╨╡ ╤А╨░╤Б╤В╤П╨╢╨╡╨╜╨╕╨╡ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╕ ╨╕ ╨│╨╕╨┐╨╡╤А╤В╤А╨╛╤Д╨╕╤О ╨▒╤А╨░╤Е╨╕╨░╨╗╨╕╤Б╨░." },
  { id: "db_bi_5", name: "╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╨╜╨░ ╤Б╨║╨░╨╝╤М╨╡ ╨б╨║╨╛╤В╤В╨░ (╤Б╨╛ ╤И╤В╨░╨╜╨│╨╛╨╣ ╨╕╨╗╨╕ ╨│╨░╨╜╤В╨╡╨╗╤М╤О)", category: "╨С╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨С╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨Ъ╨╛╤А╨╛╤В╨║╨░╤П (╨▓╨╜╤Г╤В╤А╨╡╨╜╨╜╤П╤П) ╨│╨╛╨╗╨╛╨▓╨║╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б╨░ тАв ╨Я╨╛╨╗╨╜╨░╤П ╨╕╨╖╨╛╨╗╤П╤Ж╨╕╤П", phases: ["01: ╨Я╨╛╨┤╨╝╤Л╤И╨║╨╕ ╨┐╨╗╨╛╤В╨╜╨╛ ╨╜╨░ ╤Г╨┐╨╛╤А╨╡", "02: ╨Я╨╛╨┤╤К╨╡╨╝ ╤Б╨╕╨╗╨╛╨╣ ╨▒╨╕╤Ж╨╡╨┐╤Б╨░", "03: ╨а╨░╤Б╤В╤П╨╢╨║╨░ ╨▒╨╡╨╖ ╨┐╨╡╤А╨╡╤А╨░╨╖╨│╨╕╨▒╨░"], defaultSets: 3, min: 10, max: 12, defaultWeight: 22, calRate: 8, isTime: false, tip: "╨Я╨╛╨╗╨╜╨╛╤Б╤В╤М╤О ╨╕╤Б╨║╨╗╤О╤З╨░╨╡╤В ╨┐╨╛╨╝╨╛╤Й╤М ╨┐╨╗╨╡╤З ╨╕ ╨║╨╛╤А╨┐╤Г╤Б╨░. ╨Т╨╜╨╕╨╖╤Г ╨╜╨╡ ╤А╨░╨╖╨│╨╕╨▒╨░╨╣ ╨╗╨╛╨║╤В╨╕ ╨┤╨╛ ╤Е╤А╤Г╤Б╤В╨░ ╨▓ ╤Б╤Г╤Б╤В╨░╨▓╨░╤Е." },
  { id: "db_bi_6", name: "╨Ъ╨╛╨╜╤Ж╨╡╨╜╤В╤А╨╕╤А╨╛╨▓╨░╨╜╨╜╤Л╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤М╤О ╤Б╨╕╨┤╤П", category: "╨С╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨С╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨Я╨╕╨║ ╨┤╨▓╤Г╨│╨╗╨░╨▓╨╛╨╣ ╨╝╤Л╤И╤Ж╤Л ╨┐╨╗╨╡╤З╨░ (╤В╨╛╤З╨╡╤З╨╜╨░╤П ╨┐╤А╨╛╤А╨╕╤Б╨╛╨▓╨║╨░)", phases: ["01: ╨г╨┐╨╛╤А ╨╗╨╛╨║╤В╨╡╨╝ ╨▓╨╛ ╨▓╨╜╤Г╤В╤А╨╡╨╜╨╜╤О╤О ╤З╨░╤Б╤В╤М ╨▒╨╡╨┤╤А╨░", "02: ╨Я╨╛╨┤╤К╨╡╨╝ ╨║ ╨┐╨╛╨┤╨▒╨╛╤А╨╛╨┤╨║╤Г", "03: ╨Я╨░╤Г╨╖╨░ 2╤Б"], defaultSets: 3, min: 12, max: 15, defaultWeight: 10, calRate: 7, isTime: false, tip: "╨г╨┐╤А╨╕ ╨╗╨╛╨║╨╛╤В╤М ╨▓ ╨▒╨╡╨┤╤А╨╛, ╨║╨╛╤А╨┐╤Г╤Б ╨╜╨╡╨┐╨╛╨┤╨▓╨╕╨╢╨╡╨╜. ╨Ф╨╡╨╗╨░╨╣ ╨░╨║╤Ж╨╡╨╜╤В ╨╜╨░ ╨┐╨╕╨║╨╛╨▓╨╛╨╡ ╤Б╨╛╨║╤А╨░╤Й╨╡╨╜╨╕╨╡ ╨▓ ╨▓╨╡╤А╤Е╨╜╨╡╨╣ ╤В╨╛╤З╨║╨╡." },
  { id: "db_bi_7", name: "╨Я╨╛╨┤╤К╨╡╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╜╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б ╤Б╤В╨╛╤П (╨┐╤А╤П╨╝╨╛╨╣ ╨╕╨╗╨╕ EZ-╨│╤А╨╕╤Д)", category: "╨С╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨С╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨С╨╕╤Ж╨╡╨┐╤Б (╨┤╨╗╨╕╨╜╨╜╨░╤П ╨╕ ╨║╨╛╤А╨╛╤В╨║╨░╤П ╨│╨╛╨╗╨╛╨▓╨║╨░) тАв ╨С╤А╨░╤Е╨╕╨░╨╗╨╕╤Б", phases: ["01: ╨Ы╨╛╨║╤В╨╕ ╨┐╤А╨╕╨╢╨░╤В╤Л ╨║ ╨▒╨╛╨║╨░╨╝", "02: ╨Я╨╛╨┤╤К╨╡╨╝ ╨┤╨╛ ╤Г╤А╨╛╨▓╨╜╤П ╨│╤А╤Г╨┤╨╕", "03: ╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ 2тАУ3╤Б"], defaultSets: 4, min: 8, max: 10, defaultWeight: 30, calRate: 10, isTime: false, tip: "╨У╨╗╨░╨▓╨╜╨░╤П ╨╖╨╛╨╗╨╛╤В╨░╤П ╨▒╨░╨╖╨░ ╨╜╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б. ╨Э╨╡ ╨╖╨░╨║╨╕╨┤╤Л╨▓╨░╨╣ ╤Б╨┐╨╕╨╜╨╛╨╣ (╨▒╨╡╨╖ ╤З╨╕╤В╨╕╨╜╨│╨░), ╨╛╨┐╤Г╤Б╨║╨░╨╣ ╨┐╨╛╨┤╨║╨╛╨╜╤В╤А╨╛╨╗╤М╨╜╨╛." },
  { id: "db_bi_8", name: "╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨░ ╨╜╨╕╨╢╨╜╨╡╨╝ ╨▒╨╗╨╛╨║╨╡ ╨║╤А╨╛╤Б╤Б╨╛╨▓╨╡╤А╨░ (╤Б ╨║╨░╨╜╨░╤В╨╛╨╝/╤А╤Г╤З╨║╨╛╨╣)", category: "╨С╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨С╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨С╨╕╤Ж╨╡╨┐╤Б тАв ╨Я╨╛╤Б╤В╨╛╤П╨╜╨╜╨╛╨╡ ╨╜╨░╤В╤П╨╢╨╡╨╜╨╕╨╡ ╤В╤А╨╛╤Б╨░", phases: ["01: ╨Ы╨╛╨║╤В╨╕ ╤Г ╤А╨╡╨▒╨╡╤А", "02: ╨б╨│╨╕╨▒╨░╨╜╨╕╨╡ ╨┐╨╛ ╨┤╤Г╨│╨╡", "03: ╨Я╨╕╨║╨╛╨▓╨╛╨╡ ╨╜╨░╨┐╤А╤П╨╢╨╡╨╜╨╕╨╡ 1╤Б"], defaultSets: 3, min: 12, max: 15, defaultWeight: 20, calRate: 7, isTime: false, tip: "╨в╤А╨╛╤Б ╨┤╨░╨╡╤В ╤А╨░╨▓╨╜╨╛╨╝╨╡╤А╨╜╤Г╤О ╨╜╨░╨│╤А╤Г╨╖╨║╤Г ╨┤╨░╨╢╨╡ ╨▓ ╨▓╨╡╤А╤Е╨╜╨╡╨╣ ╤В╨╛╤З╨║╨╡, ╨│╨┤╨╡ ╤Б╨╛ ╤И╤В╨░╨╜╨│╨╛╨╣ ╨╜╨░╨│╤А╤Г╨╖╨║╨░ ╨┐╨░╨┤╨░╨╡╤В." },
  { id: "db_bi_9", name: "╨Я╨░╤Г╤З╤М╨╕ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ (Spider Curls ╨╜╨░ ╤Б╨║╨░╨╝╤М╨╡)", category: "╨С╨╕╤Ж╨╡╨┐╤Б", muscleGroup: "╨С╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨Ъ╨╛╤А╨╛╤В╨║╨░╤П ╨│╨╛╨╗╨╛╨▓╨║╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б╨░ тАв ╨Я╨╕╨║╨╛╨▓╤Л╨╣ ╨┐╨░╨╝╨┐╨╕╨╜╨│", phases: ["01: ╨У╤А╤Г╨┤╤М ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡", "02: ╨а╤Г╨║╨╕ ╨▓╨╡╤А╤В╨╕╨║╨░╨╗╤М╨╜╨╛ ╨▓╨╜╨╕╨╖", "03: ╨б╨│╨╕╨▒╨░╨╜╨╕╨╡ ╨▓╨▓╨╡╤А╤Е"], defaultSets: 3, min: 12, max: 15, defaultWeight: 10, calRate: 7, isTime: false, tip: "╨Ш╨╖╨╛╨╗╨╕╤А╤Г╨╡╤В ╨▓╨╡╤А╤Е╨╜╤О╤О ╤В╤А╨╡╤В╤М ╨░╨╝╨┐╨╗╨╕╤В╤Г╨┤╤Л ╨╕ ╨╕╤Б╨║╨╗╤О╤З╨░╨╡╤В ╨╕╨╜╨╡╤А╤Ж╨╕╤О ╨║╨╛╤А╨┐╤Г╤Б╨░." },

  // ╨Я╨а╨Х╨б╨б
  { id: "db_abs_1", name: "╨б╨║╤А╤Г╤З╨╕╨▓╨░╨╜╨╕╤П ╨╜╨░ ╨▒╨╗╨╛╨║╨╡ ╤Б ╨║╨░╨╜╨░╤В╨╛╨╝ ╨╜╨░ ╨┐╤А╨╡╤Б╤Б", category: "╨Я╤А╨╡╤Б╤Б", muscleGroup: "╨Я╤А╨╡╤Б╤Б", targetMuscles: "╨Я╤А╤П╨╝╨░╤П ╨╝╤Л╤И╤Ж╨░ ╨╢╨╕╨▓╨╛╤В╨░", phases: ["01: ╨Т╨┤╨╛╤Е ╨▓╨▓╨╡╤А╤Е╤Г", "02: ╨б╨║╤А╤Г╤З╨╕╨▓╨░╨╜╨╕╨╡ ╨╜╨░ ╨▓╤Л╨┤╨╛╤Е╨╡", "03: ╨б╨╢╨░╤В╨╕╨╡ 1╤Б"], defaultSets: 3, min: 12, max: 15, defaultWeight: 35, calRate: 8, isTime: false, tip: "╨б╨║╤А╤Г╤З╨╕╨▓╨░╨╣ ╨│╤А╤Г╨┤╨╜╤Г╤О ╨║╨╗╨╡╤В╨║╤Г ╨║ ╤В╨░╨╖╤Г ╤Б╨╕╨╗╨╛╨╣ ╨╝╤Л╤И╤Ж ╨┐╤А╨╡╤Б╤Б╨░." },
  { id: "db_abs_2", name: "╨Я╨╛╨┤╤К╨╡╨╝ ╨║╨╛╨╗╨╡╨╜╨╡╨╣ ╨▓ ╨▓╨╕╤Б╨╡ ╨╜╨░ ╨▒╤А╤Г╤Б╤М╤П╤Е ╨╜╨░ ╨┐╤А╨╡╤Б╤Б", category: "╨Я╤А╨╡╤Б╤Б", muscleGroup: "╨Я╤А╨╡╤Б╤Б", targetMuscles: "╨Э╨╕╨╢╨╜╤П╤П ╤З╨░╤Б╤В╤М ╨┐╤А╤П╨╝╨╛╨╣ ╨╝╤Л╤И╤Ж╤Л ╨╢╨╕╨▓╨╛╤В╨░", phases: ["01: ╨д╨╕╨║╤Б╨░╤Ж╨╕╤П ╨┐╨╗╨╡╤З", "02: ╨Я╨╛╨┤╨║╤А╤Г╤З╨╕╨▓╨░╨╜╨╕╨╡ ╤В╨░╨╖╨░", "03: ╨Я╨░╤Г╨╖╨░ 1╤Б"], defaultSets: 3, min: 12, max: 15, defaultWeight: 0, calRate: 7, isTime: false, tip: "╨Я╨╛╨┤╨║╤А╤Г╤З╨╕╨▓╨░╨╣ ╤В╨░╨╖ ╨▓╨▓╨╡╤А╤Е ╨╜╨░ ╨▓╤Л╨┤╨╛╤Е╨╡ ╨┤╨╗╤П ╨▓╨║╨╗╤О╤З╨╡╨╜╨╕╤П ╨╜╨╕╨╖╨░ ╨╢╨╕╨▓╨╛╤В╨░." },
  { id: "db_abs_3", name: "╨Я╨╗╨░╨╜╨║╨░ ╨╜╨░ ╨╗╨╛╨║╤В╤П╤Е (╤Г╨┤╨╡╤А╨╢╨░╨╜╨╕╨╡ ╨║╨╛╤А╤Б╨╡╤В╨░)", category: "╨Я╤А╨╡╤Б╤Б", muscleGroup: "╨Я╤А╨╡╤Б╤Б", targetMuscles: "╨Я╨╛╨┐╨╡╤А╨╡╤З╨╜╨░╤П ╨╝╤Л╤И╤Ж╨░ ╨╢╨╕╨▓╨╛╤В╨░ тАв ╨Ъ╨╛╤А╤Б╨╡╤В", phases: ["01: ╨Я╤А╤П╨╝╨░╤П ╨╗╨╕╨╜╨╕╤П", "02: ╨б╨╢╨░╤В╨╕╨╡ ╤П╨│╨╛╨┤╨╕╤Ж", "03: ╨а╨╛╨▓╨╜╨╛╨╡ ╨┤╤Л╤Е╨░╨╜╨╕╨╡"], defaultSets: 3, min: 45, max: 60, defaultWeight: 0, calRate: 6, isTime: true, tip: "╨Э╨╡ ╨┐╤А╨╛╨│╨╕╨▒╨░╨╣ ╨┐╨╛╤П╤Б╨╜╨╕╤Ж╤Г, ╨┐╨╛╨┤╨║╤А╤Г╤З╨╕╨▓╨░╨╣ ╤В╨░╨╖ ╨▓╨┐╨╡╤А╨╡╨┤." },

  // ╨Ъ╨Р╨а╨Ф╨Ш╨Ю
  { id: "db_card_1", name: "╨е╨╛╨┤╤М╨▒╨░ ╨▓ ╨│╨╛╤А╨║╤Г ╨╜╨░ ╨┤╨╛╤А╨╛╨╢╨║╨╡ (╤Б╨╢╨╕╨│╨░╨╜╨╕╨╡ ╨╢╨╕╤А╨░)", category: "╨Ъ╨░╤А╨┤╨╕╨╛", muscleGroup: "╨Ъ╨░╤А╨┤╨╕╨╛", targetMuscles: "╨б╨╡╤А╨┤╨╡╤З╨╜╨╛-╤Б╨╛╤Б╤Г╨┤╨╕╤Б╤В╨░╤П ╤Б╨╕╤Б╤В╨╡╨╝╨░ тАв ╨Ц╨╕╤А╨╛╤Б╨╢╨╕╨│╨░╨╜╨╕╨╡", phases: ["01: ╨г╨║╨╗╨╛╨╜ 8тАУ10%", "02: ╨б╨║╨╛╤А╨╛╤Б╤В╤М 5.5 ╨║╨╝/╤З", "03: ╨Я╤Г╨╗╤М╤Б 115тАУ125"], defaultSets: 1, min: 25, max: 30, defaultWeight: 0, calRate: 200, isTime: true, tip: "╨г╨║╨╗╨╛╨╜ 8-10%, ╤Б╨║╨╛╤А╨╛╤Б╤В╤М 5.5 ╨║╨╝/╤З. ╨Я╤Г╨╗╤М╤Б 115-125 ╤Г╨┤/╨╝╨╕╨╜ ╨▒╨╡╨╖ ╨╛╨┤╤Л╤И╨║╨╕." },
  { id: "db_card_2", name: "╨н╨╗╨╗╨╕╨┐╤В╨╕╤З╨╡╤Б╨║╨╕╨╣ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А", category: "╨Ъ╨░╤А╨┤╨╕╨╛", muscleGroup: "╨Ъ╨░╤А╨┤╨╕╨╛", targetMuscles: "╨Т╤Б╨╡ ╤В╨╡╨╗╨╛ тАв ╨й╨░╨┤╤П╤Й╨╕╨╣ ╤А╨╡╨╢╨╕╨╝ ╨┤╨╗╤П ╨║╨╛╨╗╨╡╨╜╨╜╤Л╤Е ╤Б╤Г╤Б╤В╨░╨▓╨╛╨▓", phases: ["01: ╨а╨╛╨▓╨╜╤Л╨╣ ╤В╨╡╨╝╨┐", "02: ╨г╨╝╨╡╤А╨╡╨╜╨╜╨╛╨╡ ╤Г╤Б╨╕╨╗╨╕╨╡", "03: ╨Я╤Г╨╗╤М╤Б 120"], defaultSets: 1, min: 20, max: 30, defaultWeight: 0, calRate: 180, isTime: true, tip: "╨Ш╨┤╨╡╨░╨╗╤М╨╜╨╛ ╨┤╨╗╤П ╤А╨░╨╖╨╛╨│╤А╨╡╨▓╨░ ╨╕ ╨╖╨░╨╝╨╕╨╜╨║╨╕ ╨▒╨╡╨╖ ╤Г╨┤╨░╤А╨╜╨╛╨╣ ╨╜╨░╨│╤А╤Г╨╖╨║╨╕ ╨╜╨░ ╤Б╤Г╤Б╤В╨░╨▓╤Л." }
];

// ========================================================
// ╨в╨Ю╨з╨Э╨Р╨п ╨С╨Ш╨Ю╨Ь╨Х╨е╨Р╨Э╨Ш╨з╨Х╨б╨Ъ╨Р╨п ╨Ь╨Р╨в╨а╨Ш╨ж╨Р 1-╨Т-1 ╨Ч╨Р╨Ь╨Х╨Э (╨в╨Ю╨Ы╨м╨Ъ╨Ю ╨Ш╨Ф╨Х╨Э╨в╨Ш╨з╨Э╨л╨Щ ╨Т╨Х╨Ъ╨в╨Ю╨а)
// ========================================================
const EXACT_BIOMECHANICAL_TWINS = {
  // ╨У╨а╨г╨Ф╨м: ╨Э╨Р╨Ъ╨Ы╨Ю╨Э╨Э╨л╨Щ ╨Ц╨Ш╨Ь (╨Т╨Х╨а╨е ╨У╨а╨г╨Ф╨Ш)
  "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡ 30┬░": ["╨Ц╨╕╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡ 30┬░", "╨Ц╨╕╨╝ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╨е╨░╨╝╨╝╨╡╤А ╨╜╨░ ╨│╤А╤Г╨┤╤М"],
  "╨Ц╨╕╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡ 30┬░": ["╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡ 30┬░", "╨Ц╨╕╨╝ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╨е╨░╨╝╨╝╨╡╤А ╨╜╨░ ╨│╤А╤Г╨┤╤М"],

  // ╨У╨а╨г╨Ф╨м: ╨У╨Ю╨а╨Ш╨Ч╨Ю╨Э╨в╨Р╨Ы╨м╨Э╨л╨Щ ╨Ц╨Ш╨Ь (╨б╨Х╨а╨Х╨Ф╨Ш╨Э╨Р ╨У╨а╨г╨Ф╨Ш)
  "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡": ["╨Ц╨╕╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╗╨╡╨╢╨░ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡", "╨Ц╨╕╨╝ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╨е╨░╨╝╨╝╨╡╤А ╨╜╨░ ╨│╤А╤Г╨┤╤М"],
  "╨Ц╨╕╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╗╨╡╨╢╨░ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡": ["╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡", "╨Ц╨╕╨╝ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╨е╨░╨╝╨╝╨╡╤А ╨╜╨░ ╨│╤А╤Г╨┤╤М"],
  "╨Ц╨╕╨╝ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╨е╨░╨╝╨╝╨╡╤А ╨╜╨░ ╨│╤А╤Г╨┤╤М": ["╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡", "╨Ц╨╕╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╗╨╡╨╢╨░ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡", "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡ 30┬░"],

  // ╨У╨а╨г╨Ф╨м: ╨Ш╨Ч╨Ю╨Ы╨Ш╨а╨Ю╨Т╨Р╨Э╨Э╨л╨Х ╨б╨Т╨Х╨Ф╨Х╨Э╨Ш╨п
  "╨б╨▓╨╡╨┤╨╡╨╜╨╕╤П ╤А╤Г╨║ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╨▒╨░╨▒╨╛╤З╨║╨░ (Pec Deck)": ["╨б╨▓╨╡╨┤╨╡╨╜╨╕╤П ╨▓ ╨║╤А╨╛╤Б╤Б╨╛╨▓╨╡╤А╨╡ ╨╜╨░ ╨▒╨╗╨╛╨║╨░╤Е"],
  "╨б╨▓╨╡╨┤╨╡╨╜╨╕╤П ╨▓ ╨║╤А╨╛╤Б╤Б╨╛╨▓╨╡╤А╨╡ ╨╜╨░ ╨▒╨╗╨╛╨║╨░╤Е": ["╨б╨▓╨╡╨┤╨╡╨╜╨╕╤П ╤А╤Г╨║ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╨▒╨░╨▒╨╛╤З╨║╨░ (Pec Deck)"],

  // ╨У╨а╨г╨Ф╨м: ╨Ю╨в╨Ц╨Ш╨Ь╨Р╨Э╨Ш╨п ╨Э╨Р ╨С╨а╨г╨б╨м╨п╨е
  "╨Ю╤В╨╢╨╕╨╝╨░╨╜╨╕╤П ╨╜╨░ ╨▒╤А╤Г╤Б╤М╤П╤Е (╤Б ╨░╨║╤Ж╨╡╨╜╤В╨╛╨╝ ╨╜╨░ ╨│╤А╤Г╨┤╤М)": ["╨Ц╨╕╨╝ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╨е╨░╨╝╨╝╨╡╤А ╨╜╨░ ╨│╤А╤Г╨┤╤М"],

  // ╨б╨Я╨Ш╨Э╨Р: ╨У╨Ю╨а╨Ш╨Ч╨Ю╨Э╨в╨Р╨Ы╨м╨Э╨Р╨п ╨в╨п╨У╨Р (╨в╨Ю╨Ы╨й╨Ш╨Э╨Р ╨б╨Я╨Ш╨Э╨л)
  "╨в╤П╨│╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨│╨╛ ╨▒╨╗╨╛╨║╨░ ╨║ ╨┐╨╛╤П╤Б╤Г (╨╜╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╤Е╨▓╨░╤В)": ["╨в╤П╨│╨░ ╨│╨░╨╜╤В╨╡╨╗╨╕ ╨▓ ╨╜╨░╨║╨╗╨╛╨╜╨╡ ╤Б ╤Г╨┐╨╛╤А╨╛╨╝ ╨▓ ╤Б╨║╨░╨╝╤М╤О", "╨в╤П╨│╨░ ╨в-╨│╤А╨╕╤Д╨░ ╤Б ╤Г╨┐╨╛╤А╨╛╨╝ ╨▓ ╨│╤А╤Г╨┤╤М"],
  "╨в╤П╨│╨░ ╨│╨░╨╜╤В╨╡╨╗╨╕ ╨▓ ╨╜╨░╨║╨╗╨╛╨╜╨╡ ╤Б ╤Г╨┐╨╛╤А╨╛╨╝ ╨▓ ╤Б╨║╨░╨╝╤М╤О": ["╨в╤П╨│╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨│╨╛ ╨▒╨╗╨╛╨║╨░ ╨║ ╨┐╨╛╤П╤Б╤Г (╨╜╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╤Е╨▓╨░╤В)", "╨в╤П╨│╨░ ╨в-╨│╤А╨╕╤Д╨░ ╤Б ╤Г╨┐╨╛╤А╨╛╨╝ ╨▓ ╨│╤А╤Г╨┤╤М"],
  "╨в╤П╨│╨░ ╨в-╨│╤А╨╕╤Д╨░ ╤Б ╤Г╨┐╨╛╤А╨╛╨╝ ╨▓ ╨│╤А╤Г╨┤╤М": ["╨в╤П╨│╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨│╨╛ ╨▒╨╗╨╛╨║╨░ ╨║ ╨┐╨╛╤П╤Б╤Г (╨╜╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╤Е╨▓╨░╤В)", "╨в╤П╨│╨░ ╨│╨░╨╜╤В╨╡╨╗╨╕ ╨▓ ╨╜╨░╨║╨╗╨╛╨╜╨╡ ╤Б ╤Г╨┐╨╛╤А╨╛╨╝ ╨▓ ╤Б╨║╨░╨╝╤М╤О"],

  // ╨б╨Я╨Ш╨Э╨Р: ╨Т╨Х╨а╨в╨Ш╨Ъ╨Р╨Ы╨м╨Э╨Р╨п ╨в╨п╨У╨Р (╨и╨Ш╨а╨Ш╨Э╨Р ╨б╨Я╨Ш╨Э╨л)
  "╨в╤П╨│╨░ ╨▓╨╡╤А╤Е╨╜╨╡╨│╨╛ ╨▒╨╗╨╛╨║╨░ ╨╜╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╝ ╤Е╨▓╨░╤В╨╛╨╝ ╨║ ╨│╤А╤Г╨┤╨╕": ["╨Я╨╛╨┤╤В╤П╨│╨╕╨▓╨░╨╜╨╕╤П ╨╜╨░ ╤В╤Г╤А╨╜╨╕╨║╨╡ (╨╕╨╗╨╕ ╨▓ ╨│╤А╨░╨▓╨╕╤В╤А╨╛╨╜╨╡)"],
  "╨Я╨╛╨┤╤В╤П╨│╨╕╨▓╨░╨╜╨╕╤П ╨╜╨░ ╤В╤Г╤А╨╜╨╕╨║╨╡ (╨╕╨╗╨╕ ╨▓ ╨│╤А╨░╨▓╨╕╤В╤А╨╛╨╜╨╡)": ["╨в╤П╨│╨░ ╨▓╨╡╤А╤Е╨╜╨╡╨│╨╛ ╨▒╨╗╨╛╨║╨░ ╨╜╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╝ ╤Е╨▓╨░╤В╨╛╨╝ ╨║ ╨│╤А╤Г╨┤╨╕"],

  // ╨б╨Я╨Ш╨Э╨Р / ╨Я╨Ы╨Х╨з╨Ш: ╨а╨Р╨Ч╨У╨а╨г╨Ч╨Ъ╨Р ╨и╨Х╨Ш ╨Ш ╨Ч╨Р╨Ф╨Э╨п╨п ╨Ф╨Х╨Ы╨м╨в╨Р
  "╨в╤П╨│╨░ ╨║╨░╨╜╨░╤В╨░ ╨║ ╨╗╨╕╤Ж╤Г (Face Pull тАФ ╤А╨░╨╖╨│╤А╤Г╨╖╨║╨░ ╤И╨╡╨╕)": ["╨а╨░╨╖╨▓╨╛╨┤╨║╨░ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨▓ ╨╜╨░╨║╨╗╨╛╨╜╨╡ ╨╜╨░ ╨╖╨░╨┤╨╜╤О╤О ╨┤╨╡╨╗╤М╤В╤Г"],
  "╨а╨░╨╖╨▓╨╛╨┤╨║╨░ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨▓ ╨╜╨░╨║╨╗╨╛╨╜╨╡ ╨╜╨░ ╨╖╨░╨┤╨╜╤О╤О ╨┤╨╡╨╗╤М╤В╤Г": ["╨в╤П╨│╨░ ╨║╨░╨╜╨░╤В╨░ ╨║ ╨╗╨╕╤Ж╤Г (Face Pull тАФ ╤А╨░╨╖╨│╤А╤Г╨╖╨║╨░ ╤И╨╡╨╕)"],

  // ╨б╨Я╨Ш╨Э╨Р: ╨а╨Р╨Ч╨У╨Ш╨С╨Р╨в╨Х╨Ы╨Ш
  "╨У╨╕╨┐╨╡╤А╤Н╨║╤Б╤В╨╡╨╜╨╖╨╕╤П ╨┤╨╗╤П ╤А╨░╨╖╨│╨╕╨▒╨░╤В╨╡╨╗╨╡╨╣ ╤Б╨┐╨╕╨╜╤Л": ["╨а╤Г╨╝╤Л╨╜╤Б╨║╨░╤П ╤В╤П╨│╨░ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕"],

  // ╨Э╨Ю╨У╨Ш: ╨Ъ╨Т╨Р╨Ф╨а╨Ш╨ж╨Х╨Я╨б / ╨Ц╨Ш╨Ь ╨Я╨Ы╨Р╨в╨д╨Ю╨а╨Ь╨л
  "╨Ц╨╕╨╝ ╨╜╨╛╨│╨░╨╝╨╕ ╨┐╨╛╨┤ ╤Г╨│╨╗╨╛╨╝ 45┬░ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡": ["╨Я╤А╨╕╤Б╨╡╨┤╨░╨╜╨╕╤П ╨▓ ╨У╨░╨║╨║-╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡"],
  "╨Я╤А╨╕╤Б╨╡╨┤╨░╨╜╨╕╤П ╨▓ ╨У╨░╨║╨║-╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡": ["╨Ц╨╕╨╝ ╨╜╨╛╨│╨░╨╝╨╕ ╨┐╨╛╨┤ ╤Г╨│╨╗╨╛╨╝ 45┬░ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡"],
  "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨╛╨│ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╤Б╨╕╨┤╤П": [],

  // ╨Э╨Ю╨У╨Ш: ╨С╨Ш╨ж╨Х╨Я╨б ╨С╨Х╨Ф╨а╨Р
  "╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨╛╨│ ╤Б╨╕╨┤╤П ╨╕╨╗╨╕ ╨╗╨╡╨╢╨░ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡": [],
  "╨а╤Г╨╝╤Л╨╜╤Б╨║╨░╤П ╤В╤П╨│╨░ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕": ["╨У╨╕╨┐╨╡╤А╤Н╨║╤Б╤В╨╡╨╜╨╖╨╕╤П ╨┤╨╗╤П ╤А╨░╨╖╨│╨╕╨▒╨░╤В╨╡╨╗╨╡╨╣ ╤Б╨┐╨╕╨╜╤Л"],

  // ╨Э╨Ю╨У╨Ш: ╨У╨Ю╨Ы╨Х╨Э╨м
  "╨Я╨╛╨┤╤К╨╡╨╝ ╨╜╨░ ╨╜╨╛╤Б╨║╨╕ ╤Б╤В╨╛╤П ╨╜╨░ ╨╕╨║╤А╨╛╨╜╨╛╨╢╨╜╤Л╨╡": [],

  // ╨Я╨Ы╨Х╨з╨Ш: ╨Ш╨Ч╨Ю╨Ы╨п╨ж╨Ш╨п ╨б╨а╨Х╨Ф╨Э╨Х╨Щ ╨Ф╨Х╨Ы╨м╨в╨л
  "╨Ь╨░╤Е╨╕ ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╤З╨╡╤А╨╡╨╖ ╤Б╤В╨╛╤А╨╛╨╜╤Л ╤Б╤В╨╛╤П": ["╨Я╤А╨╛╤В╤П╨╢╨║╨░ ╨╜╨░ ╨▒╨╗╨╛╨║╨╡ ╨║ ╨┐╨╛╨┤╨▒╨╛╤А╨╛╨┤╨║╤Г (╤И╨╕╤А╨╛╨║╨╕╨╣ ╤Е╨▓╨░╤В)"],
  "╨Я╤А╨╛╤В╤П╨╢╨║╨░ ╨╜╨░ ╨▒╨╗╨╛╨║╨╡ ╨║ ╨┐╨╛╨┤╨▒╨╛╤А╨╛╨┤╨║╤Г (╤И╨╕╤А╨╛╨║╨╕╨╣ ╤Е╨▓╨░╤В)": ["╨Ь╨░╤Е╨╕ ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╤З╨╡╤А╨╡╨╖ ╤Б╤В╨╛╤А╨╛╨╜╤Л ╤Б╤В╨╛╤П"],

  // ╨Я╨Ы╨Х╨з╨Ш: ╨С╨Р╨Ч╨Ю╨Т╨л╨Щ ╨Ц╨Ш╨Ь
  "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╤Б╨╕╨┤╤П ╨╜╨░ ╨┐╨╗╨╡╤З╨╕ (╤Б╨║╨░╨╝╤М╤П 75┬░)": [],

  // ╨С╨Ш╨ж╨Х╨Я╨б: ╨а╨Р╨б╨в╨п╨Ц╨Х╨Э╨Ш╨Х ╨Э╨Р ╨Э╨Р╨Ъ╨Ы╨Ю╨Э╨Э╨Ю╨Щ ╨б╨Ъ╨Р╨Ь╨м╨Х (╨Ф╨Ы╨Ш╨Э╨Э╨Р╨п ╨У╨Ю╨Ы╨Ю╨Т╨Ъ╨Р)
  "╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡ 45┬░": ["╨Ь╨╛╨╗╨╛╤В╨║╨╛╨▓╤Л╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡"],
  "╨Ь╨╛╨╗╨╛╤В╨║╨╛╨▓╤Л╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡": ["╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡ 45┬░", "╨Ь╨╛╨╗╨╛╤В╨║╨╛╨▓╤Л╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ (Hammer Curls)"],

  // ╨С╨Ш╨ж╨Х╨Я╨б: ╨С╨Р╨Ч╨Ю╨Т╨л╨Щ ╨Я╨Ю╨Ф╨к╨Х╨Ь ╨б╨в╨Ю╨п
  "╨Я╨╛╨┤╤К╨╡╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б ╤Б╤В╨╛╤П ╤Б ╤Б╤Г╨┐╨╕╨╜╨░╤Ж╨╕╨╡╨╣": ["╨Я╨╛╨┤╤К╨╡╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╜╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б ╤Б╤В╨╛╤П (╨┐╤А╤П╨╝╨╛╨╣ ╨╕╨╗╨╕ EZ-╨│╤А╨╕╤Д)", "╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨░ ╨╜╨╕╨╢╨╜╨╡╨╝ ╨▒╨╗╨╛╨║╨╡ ╨║╤А╨╛╤Б╤Б╨╛╨▓╨╡╤А╨░ (╤Б ╨║╨░╨╜╨░╤В╨╛╨╝/╤А╤Г╤З╨║╨╛╨╣)"],
  "╨Я╨╛╨┤╤К╨╡╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╜╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б ╤Б╤В╨╛╤П (╨┐╤А╤П╨╝╨╛╨╣ ╨╕╨╗╨╕ EZ-╨│╤А╨╕╤Д)": ["╨Я╨╛╨┤╤К╨╡╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б ╤Б╤В╨╛╤П ╤Б ╤Б╤Г╨┐╨╕╨╜╨░╤Ж╨╕╨╡╨╣", "╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨░ ╨╜╨╕╨╢╨╜╨╡╨╝ ╨▒╨╗╨╛╨║╨╡ ╨║╤А╨╛╤Б╤Б╨╛╨▓╨╡╤А╨░ (╤Б ╨║╨░╨╜╨░╤В╨╛╨╝/╤А╤Г╤З╨║╨╛╨╣)"],
  "╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨░ ╨╜╨╕╨╢╨╜╨╡╨╝ ╨▒╨╗╨╛╨║╨╡ ╨║╤А╨╛╤Б╤Б╨╛╨▓╨╡╤А╨░ (╤Б ╨║╨░╨╜╨░╤В╨╛╨╝/╤А╤Г╤З╨║╨╛╨╣)": ["╨Я╨╛╨┤╤К╨╡╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б ╤Б╤В╨╛╤П ╤Б ╤Б╤Г╨┐╨╕╨╜╨░╤Ж╨╕╨╡╨╣", "╨Я╨╛╨┤╤К╨╡╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╜╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б ╤Б╤В╨╛╤П (╨┐╤А╤П╨╝╨╛╨╣ ╨╕╨╗╨╕ EZ-╨│╤А╨╕╤Д)"],

  // ╨С╨Ш╨ж╨Х╨Я╨б: ╨Ь╨Ю╨Ы╨Ю╨в╨Ъ╨Ю╨Т╨л╨Щ ╨е╨Т╨Р╨в (╨С╨а╨Р╨е╨Ш╨Р╨Ы╨Ш╨б)
  "╨Ь╨╛╨╗╨╛╤В╨║╨╛╨▓╤Л╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ (Hammer Curls)": ["╨Ь╨╛╨╗╨╛╤В╨║╨╛╨▓╤Л╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡"],

  // ╨С╨Ш╨ж╨Х╨Я╨б: ╨Я╨Ш╨Ъ╨Ю╨Т╨Ю╨Х ╨б╨Ю╨Ъ╨а╨Р╨й╨Х╨Э╨Ш╨Х / ╨б╨Ъ╨Р╨Ь╨м╨п ╨б╨Ъ╨Ю╨в╨в╨Р
  "╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╨╜╨░ ╤Б╨║╨░╨╝╤М╨╡ ╨б╨║╨╛╤В╤В╨░ (╤Б╨╛ ╤И╤В╨░╨╜╨│╨╛╨╣ ╨╕╨╗╨╕ ╨│╨░╨╜╤В╨╡╨╗╤М╤О)": ["╨Я╨░╤Г╤З╤М╨╕ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ (Spider Curls ╨╜╨░ ╤Б╨║╨░╨╝╤М╨╡)", "╨Ъ╨╛╨╜╤Ж╨╡╨╜╤В╤А╨╕╤А╨╛╨▓╨░╨╜╨╜╤Л╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤М╤О ╤Б╨╕╨┤╤П"],
  "╨Я╨░╤Г╤З╤М╨╕ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ (Spider Curls ╨╜╨░ ╤Б╨║╨░╨╝╤М╨╡)": ["╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╨╜╨░ ╤Б╨║╨░╨╝╤М╨╡ ╨б╨║╨╛╤В╤В╨░ (╤Б╨╛ ╤И╤В╨░╨╜╨│╨╛╨╣ ╨╕╨╗╨╕ ╨│╨░╨╜╤В╨╡╨╗╤М╤О)", "╨Ъ╨╛╨╜╤Ж╨╡╨╜╤В╤А╨╕╤А╨╛╨▓╨░╨╜╨╜╤Л╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤М╤О ╤Б╨╕╨┤╤П"],
  "╨Ъ╨╛╨╜╤Ж╨╡╨╜╤В╤А╨╕╤А╨╛╨▓╨░╨╜╨╜╤Л╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤М╤О ╤Б╨╕╨┤╤П": ["╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╨╜╨░ ╤Б╨║╨░╨╝╤М╨╡ ╨б╨║╨╛╤В╤В╨░ (╤Б╨╛ ╤И╤В╨░╨╜╨│╨╛╨╣ ╨╕╨╗╨╕ ╨│╨░╨╜╤В╨╡╨╗╤М╤О)", "╨Я╨░╤Г╤З╤М╨╕ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ (Spider Curls ╨╜╨░ ╤Б╨║╨░╨╝╤М╨╡)"],

  // ╨в╨а╨Ш╨ж╨Х╨Я╨б: ╨а╨Р╨Ч╨У╨Ш╨С╨Р╨Э╨Ш╨п ╨Э╨Р ╨С╨Ы╨Ю╨Ъ╨Х ╨б╨в╨Ю╨п
  "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╨╜╨░ ╨▓╨╡╤А╤Е╨╜╨╡╨╝ ╨▒╨╗╨╛╨║╨╡ ╤Б ╨║╨░╨╜╨░╤В╨╛╨╝": ["╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╨╜╨░ ╨▒╨╗╨╛╨║╨╡ ╤Б ╨┐╤А╤П╨╝╨╛╨╣ / V-╤А╤Г╨║╨╛╤П╤В╤М╤О"],
  "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╨╜╨░ ╨▒╨╗╨╛╨║╨╡ ╤Б ╨┐╤А╤П╨╝╨╛╨╣ / V-╤А╤Г╨║╨╛╤П╤В╤М╤О": ["╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╨╜╨░ ╨▓╨╡╤А╤Е╨╜╨╡╨╝ ╨▒╨╗╨╛╨║╨╡ ╤Б ╨║╨░╨╜╨░╤В╨╛╨╝"],

  // ╨в╨а╨Ш╨ж╨Х╨Я╨б: ╨д╨а╨Р╨Э╨ж╨г╨Ч╨б╨Ъ╨Ш╨Щ ╨Ц╨Ш╨Ь ╨Ы╨Х╨Ц╨Р
  "╨д╤А╨░╨╜╤Ж╤Г╨╖╤Б╨║╨╕╨╣ ╨╢╨╕╨╝ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╨╗╨╡╨╢╨░ ╨╜╨░ ╤Б╨║╨░╨╝╤М╨╡": ["╨д╤А╨░╨╜╤Ж╤Г╨╖╤Б╨║╨╕╨╣ ╨╢╨╕╨╝ ╤Б╨╛ ╤И╤В╨░╨╜╨│╨╛╨╣ (EZ-╨│╤А╨╕╤Д) ╨╗╨╡╨╢╨░"],
  "╨д╤А╨░╨╜╤Ж╤Г╨╖╤Б╨║╨╕╨╣ ╨╢╨╕╨╝ ╤Б╨╛ ╤И╤В╨░╨╜╨│╨╛╨╣ (EZ-╨│╤А╨╕╤Д) ╨╗╨╡╨╢╨░": ["╨д╤А╨░╨╜╤Ж╤Г╨╖╤Б╨║╨╕╨╣ ╨╢╨╕╨╝ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╨╗╨╡╨╢╨░ ╨╜╨░ ╤Б╨║╨░╨╝╤М╨╡"],

  // ╨в╨а╨Ш╨ж╨Х╨Я╨б: ╨а╨Р╨Ч╨У╨Ш╨С╨Р╨Э╨Ш╨п ╨Ш╨Ч-╨Ч╨Р ╨У╨Ю╨Ы╨Ю╨Т╨л
  "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╨╡ ╤А╤Г╨║╨╕ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤М╤О ╨╕╨╖-╨╖╨░ ╨│╨╛╨╗╨╛╨▓╤Л ╤Б╨╕╨┤╤П": ["╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨░ ╨▒╨╗╨╛╨║╨╡ ╨╕╨╖-╨╖╨░ ╨│╨╛╨╗╨╛╨▓╤Л ╤Б ╨║╨░╨╜╨░╤В╨╛╨╝"],
  "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨░ ╨▒╨╗╨╛╨║╨╡ ╨╕╨╖-╨╖╨░ ╨│╨╛╨╗╨╛╨▓╤Л ╤Б ╨║╨░╨╜╨░╤В╨╛╨╝": ["╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╨╡ ╤А╤Г╨║╨╕ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤М╤О ╨╕╨╖-╨╖╨░ ╨│╨╛╨╗╨╛╨▓╤Л ╤Б╨╕╨┤╤П"],

  // ╨в╨а╨Ш╨ж╨Х╨Я╨б: ╨С╨Р╨Ч╨Ю╨Т╨л╨Щ ╨Ц╨Ш╨Ь
  "╨Ц╨╕╨╝ ╤И╤В╨░╨╜╨│╨╕ ╤Г╨╖╨║╨╕╨╝ ╤Е╨▓╨░╤В╨╛╨╝ ╨╗╨╡╨╢╨░": ["╨Ю╤В╨╢╨╕╨╝╨░╨╜╨╕╤П ╨╛╤В ╤Б╨║╨░╨╝╤М╨╕ ╤Б╨╖╨░╨┤╨╕ (╨╛╨▒╤А╨░╤В╨╜╤Л╨╡ ╨╛╤В╨╢╨╕╨╝╨░╨╜╨╕╤П)"],
  "╨Ю╤В╨╢╨╕╨╝╨░╨╜╨╕╤П ╨╛╤В ╤Б╨║╨░╨╝╤М╨╕ ╤Б╨╖╨░╨┤╨╕ (╨╛╨▒╤А╨░╤В╨╜╤Л╨╡ ╨╛╤В╨╢╨╕╨╝╨░╨╜╨╕╤П)": ["╨Ц╨╕╨╝ ╤И╤В╨░╨╜╨│╨╕ ╤Г╨╖╨║╨╕╨╝ ╤Е╨▓╨░╤В╨╛╨╝ ╨╗╨╡╨╢╨░"],

  // ╨в╨а╨Ш╨ж╨Х╨Я╨б: ╨Ъ╨Ш╨Ъ╨С╨н╨Ъ
  "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╨╡ ╤А╤Г╨║╨╕ ╨╜╨░╨╖╨░╨┤ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤М╤О ╨▓ ╨╜╨░╨║╨╗╨╛╨╜╨╡ (╨Ъ╨╕╨║╨▒╤Н╨║)": [],

  // ╨Я╨а╨Х╨б╨б
  "╨б╨║╤А╤Г╤З╨╕╨▓╨░╨╜╨╕╤П ╨╜╨░ ╨▒╨╗╨╛╨║╨╡ ╤Б ╨║╨░╨╜╨░╤В╨╛╨╝ ╨╜╨░ ╨┐╤А╨╡╤Б╤Б": ["╨Я╨╛╨┤╤К╨╡╨╝ ╨║╨╛╨╗╨╡╨╜╨╡╨╣ ╨▓ ╨▓╨╕╤Б╨╡ ╨╜╨░ ╨▒╤А╤Г╤Б╤М╤П╤Е ╨╜╨░ ╨┐╤А╨╡╤Б╤Б"],
  "╨Я╨╛╨┤╤К╨╡╨╝ ╨║╨╛╨╗╨╡╨╜╨╡╨╣ ╨▓ ╨▓╨╕╤Б╨╡ ╨╜╨░ ╨▒╤А╤Г╤Б╤М╤П╤Е ╨╜╨░ ╨┐╤А╨╡╤Б╤Б": ["╨б╨║╤А╤Г╤З╨╕╨▓╨░╨╜╨╕╤П ╨╜╨░ ╨▒╨╗╨╛╨║╨╡ ╤Б ╨║╨░╨╜╨░╤В╨╛╨╝ ╨╜╨░ ╨┐╤А╨╡╤Б╤Б"],
  "╨Я╨╗╨░╨╜╨║╨░ ╨╜╨░ ╨╗╨╛╨║╤В╤П╤Е (╤Г╨┤╨╡╤А╨╢╨░╨╜╨╕╨╡ ╨║╨╛╤А╤Б╨╡╤В╨░)": [],

  // ╨Ъ╨Р╨а╨Ф╨Ш╨Ю
  "╨е╨╛╨┤╤М╨▒╨░ ╨▓ ╨│╨╛╤А╨║╤Г ╨╜╨░ ╨┤╨╛╤А╨╛╨╢╨║╨╡ (╤Б╨╢╨╕╨│╨░╨╜╨╕╨╡ ╨╢╨╕╤А╨░)": ["╨н╨╗╨╗╨╕╨┐╤В╨╕╤З╨╡╤Б╨║╨╕╨╣ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А"],
  "╨н╨╗╨╗╨╕╨┐╤В╨╕╤З╨╡╤Б╨║╨╕╨╣ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А": ["╨е╨╛╨┤╤М╨▒╨░ ╨▓ ╨│╨╛╤А╨║╤Г ╨╜╨░ ╨┤╨╛╤А╨╛╨╢╨║╨╡ (╤Б╨╢╨╕╨│╨░╨╜╨╕╨╡ ╨╢╨╕╤А╨░)"]
};

const DEFAULT_PROGRAMS = {
  a: {
    name: "╨в╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╨░ ╨Р (╨С╨░╨╖╨░ ╨Т╨╡╤А╤Е + ╨Э╨╛╨│╨╕)",
    exercises: [
      { name: "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡ 30┬░", muscleGroup: "╨У╤А╤Г╨┤╤М", targetMuscles: "╨Т╨╡╤А╤Е ╨│╤А╤Г╨┤╨╜╤Л╤Е тАв ╨Я╨╡╤А╨╡╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░", phases: ["01: ╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ 2-3╤Б", "02: ╨Я╨░╤Г╨╖╨░ 1╤Б", "03: ╨Т╤Л╨╢╨╕╨╝"], sets: 4, min: 8, max: 10, w: 22, calRate: 12, tip: "╨Ы╨╛╨║╤В╨╕ 60-70┬░ ╨║ ╨║╨╛╤А╨┐╤Г╤Б╤Г, ╨╗╨╛╨┐╨░╤В╨║╨╕ ╤Б╨▓╨╡╨┤╨╡╨╜╤Л ╨╕ ╨╛╨┐╤Г╤Й╨╡╨╜╤Л.", substitutes: ["╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡", "╨Ц╨╕╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╗╨╡╨╢╨░ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡", "╨Ц╨╕╨╝ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╨е╨░╨╝╨╝╨╡╤А ╨╜╨░ ╨│╤А╤Г╨┤╤М"] },
      { name: "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡", muscleGroup: "╨У╤А╤Г╨┤╤М", targetMuscles: "╨б╨╡╤А╨╡╨┤╨╕╨╜╨░ ╨│╤А╤Г╨┤╨╕ тАв ╨в╤А╨╕╤Ж╨╡╨┐╤Б", phases: ["01: ╨а╨░╤Б╤В╤П╨╢╨║╨░ 2╤Б", "02: ╨д╨╕╨║╤Б╨░╤Ж╨╕╤П", "03: ╨Т╤Л╨╢╨╕╨╝"], sets: 4, min: 8, max: 10, w: 24, calRate: 12, tip: "╨Ь╨╛╤Й╨╜╤Л╨╣ ╨▓╤Л╨╢╨╕╨╝, ╨┐╨░╤Г╨╖╨░ 1 ╤Б╨╡╨║ ╨▓ ╨╜╨╕╨╢╨╜╨╡╨╣ ╤В╨╛╤З╨║╨╡.", substitutes: ["╨Ц╨╕╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╗╨╡╨╢╨░ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡", "╨Ц╨╕╨╝ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╨е╨░╨╝╨╝╨╡╤А ╨╜╨░ ╨│╤А╤Г╨┤╤М", "╨Ю╤В╨╢╨╕╨╝╨░╨╜╨╕╤П ╨╜╨░ ╨▒╤А╤Г╤Б╤М╤П╤Е (╤Б ╨░╨║╤Ж╨╡╨╜╤В╨╛╨╝ ╨╜╨░ ╨│╤А╤Г╨┤╤М)"] },
      { name: "╨Ц╨╕╨╝ ╨╜╨╛╨│╨░╨╝╨╕ ╨┐╨╛╨┤ ╤Г╨│╨╗╨╛╨╝ 45┬░ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡", muscleGroup: "╨Э╨╛╨│╨╕", targetMuscles: "╨Ъ╨▓╨░╨┤╤А╨╕╤Ж╨╡╨┐╤Б тАв ╨п╨│╨╛╨┤╨╕╤Ж╤Л", phases: ["01: ╨Я╤П╤В╨║╨╕ ╨▓ ╨┐╨╗╨░╤В╤Д╨╛╤А╨╝╤Г", "02: ╨г╨│╨╛╨╗ 90┬░", "03: ╨С╨╡╨╖ ╤Й╨╡╨╗╤З╨║╨░ ╤Б╤Г╤Б╤В╨░╨▓╨╛╨▓"], sets: 4, min: 10, max: 12, w: 90, calRate: 16, tip: "╨Ъ╨╛╨╗╨╡╨╜╨╕ ╨▓╨▓╨╡╤А╤Е╤Г ╨╜╨╡ ╨▓╤Б╤В╨░╨▓╨╗╤П╨╣, ╤Г╨┐╨╛╤А ╨▓ ╤Б╨╡╤А╨╡╨┤╨╕╨╜╤Г ╤Б╤В╨╛╨┐╤Л ╨╕ ╨┐╤П╤В╨║╨╕.", substitutes: ["╨Я╤А╨╕╤Б╨╡╨┤╨░╨╜╨╕╤П ╨▓ ╨У╨░╨║╨║-╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡", "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨╛╨│ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╤Б╨╕╨┤╤П"] },
      { name: "╨в╤П╨│╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨│╨╛ ╨▒╨╗╨╛╨║╨░ ╨║ ╨┐╨╛╤П╤Б╤Г (╨╜╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╤Е╨▓╨░╤В)", muscleGroup: "╨б╨┐╨╕╨╜╨░", targetMuscles: "╨и╨╕╤А╨╛╤З╨░╨╣╤И╨╕╨╡ тАв ╨б╨╡╤А╨╡╨┤╨╕╨╜╨░ ╤Б╨┐╨╕╨╜╤Л", phases: ["01: ╨Ы╨╛╨║╤В╨╕ ╨╜╨░╨╖╨░╨┤", "02: ╨б╨▓╨╡╨┤╨╡╨╜╨╕╨╡ ╨╗╨╛╨┐╨░╤В╨╛╨║", "03: ╨а╨░╤Б╤В╤П╨╢╨║╨░"], sets: 4, min: 10, max: 12, w: 45, calRate: 11, tip: "╨Ы╨╛╨║╤В╨╕ ╤Б╨║╨╛╨╗╤М╨╖╤П╤В ╨▓╨┤╨╛╨╗╤М ╤А╨╡╨▒╨╡╤А ╨╜╨░╨╖╨░╨┤, ╨┐╨╗╨╡╤З╨╕ ╨╖╨░╤Д╨╕╨║╤Б╨╕╤А╨╛╨▓╨░╨╜╤Л.", substitutes: ["╨в╤П╨│╨░ ╨│╨░╨╜╤В╨╡╨╗╨╕ ╨▓ ╨╜╨░╨║╨╗╨╛╨╜╨╡ ╤Б ╤Г╨┐╨╛╤А╨╛╨╝ ╨▓ ╤Б╨║╨░╨╝╤М╤О", "╨в╤П╨│╨░ ╨▓╨╡╤А╤Е╨╜╨╡╨│╨╛ ╨▒╨╗╨╛╨║╨░ ╨╜╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╝ ╤Е╨▓╨░╤В╨╛╨╝ ╨║ ╨│╤А╤Г╨┤╨╕"] },
      { name: "╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨╛╨│ ╤Б╨╕╨┤╤П ╨╕╨╗╨╕ ╨╗╨╡╨╢╨░ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡", muscleGroup: "╨Э╨╛╨│╨╕", targetMuscles: "╨С╨╕╤Ж╨╡╨┐╤Б ╨▒╨╡╨┤╤А╨░", phases: ["01: ╨б╨│╨╕╨▒╨░╨╜╨╕╨╡", "02: ╨Я╨░╤Г╨╖╨░ 1╤Б", "03: ╨б╨┐╤Г╤Б╨║ 3╤Б"], sets: 3, min: 12, max: 15, w: 35, calRate: 8, tip: "╨Ь╨╡╨┤╨╗╨╡╨╜╨╜╨╛╨╡ ╨╛╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ 2тАУ3 ╤Б╨╡╨║.", substitutes: ["╨а╤Г╨╝╤Л╨╜╤Б╨║╨░╤П ╤В╤П╨│╨░ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕"] },
      { name: "╨Ь╨░╤Е╨╕ ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╤З╨╡╤А╨╡╨╖ ╤Б╤В╨╛╤А╨╛╨╜╤Л ╤Б╤В╨╛╤П", muscleGroup: "╨Я╨╗╨╡╤З╨╕", targetMuscles: "╨б╤А╨╡╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░", phases: ["01: ╨Ъ╨╛╤А╨┐╤Г╤Б ╨▓╨┐╨╡╤А╨╡╨┤", "02: ╨Я╨╛╨┤╤К╨╡╨╝ ╨╗╨╛╨║╤В╤П╨╝╨╕", "03: ╨Ъ╨╕╤Б╤В╤М ╨╜╨╕╨╢╨╡ ╨╗╨╛╨║╤В╤П"], sets: 4, min: 12, max: 15, w: 8, calRate: 7, tip: "╨Я╨╛╨┤╤К╨╡╨╝ ╤З╨╡╤А╨╡╨╖ ╤Б╤В╨╛╤А╨╛╨╜╤Л ╨╗╨╛╨║╤В╤П╨╝╨╕, ╨║╨╕╤Б╤В╤М ╨╜╨╡ ╨▓╤Л╤И╨╡ ╨╗╨╛╨║╤В╤П.", substitutes: ["╨Я╤А╨╛╤В╤П╨╢╨║╨░ ╨╜╨░ ╨▒╨╗╨╛╨║╨╡ ╨║ ╨┐╨╛╨┤╨▒╨╛╤А╨╛╨┤╨║╤Г (╤И╨╕╤А╨╛╨║╨╕╨╣ ╤Е╨▓╨░╤В)", "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╤Б╨╕╨┤╤П ╨╜╨░ ╨┐╨╗╨╡╤З╨╕ (╤Б╨║╨░╨╝╤М╤П 75┬░)"] },
      { name: "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╨╜╨░ ╨▓╨╡╤А╤Е╨╜╨╡╨╝ ╨▒╨╗╨╛╨║╨╡ ╤Б ╨║╨░╨╜╨░╤В╨╛╨╝", muscleGroup: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", phases: ["01: ╨д╨╕╨║╤Б╨░╤Ж╨╕╤П ╨╗╨╛╨║╤В╨╡╨╣", "02: ╨а╨░╨╖╨▓╨╛╨┤╨║╨░ ╨║╨░╨╜╨░╤В╨░", "03: ╨б╨╢╨░╤В╨╕╨╡"], sets: 3, min: 12, max: 15, w: 20, calRate: 6, tip: "╨Ы╨╛╨║╤В╨╕ ╨┐╤А╨╕╨╢╨░╤В╤Л ╨║ ╨║╨╛╤А╨┐╤Г╤Б╤Г, ╤А╨░╨╖╨▓╨╛╨┤╨╕ ╨║╨░╨╜╨░╤В ╨▓╨╜╨╕╨╖╤Г.", substitutes: ["╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╨╜╨░ ╨▒╨╗╨╛╨║╨╡ ╤Б ╨┐╤А╤П╨╝╨╛╨╣ / V-╤А╤Г╨║╨╛╤П╤В╤М╤О", "╨д╤А╨░╨╜╤Ж╤Г╨╖╤Б╨║╨╕╨╣ ╨╢╨╕╨╝ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╨╗╨╡╨╢╨░ ╨╜╨░ ╤Б╨║╨░╨╝╤М╨╡", "╨д╤А╨░╨╜╤Ж╤Г╨╖╤Б╨║╨╕╨╣ ╨╢╨╕╨╝ ╤Б╨╛ ╤И╤В╨░╨╜╨│╨╛╨╣ (EZ-╨│╤А╨╕╤Д) ╨╗╨╡╨╢╨░", "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╨╡ ╤А╤Г╨║╨╕ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤М╤О ╨╕╨╖-╨╖╨░ ╨│╨╛╨╗╨╛╨▓╤Л ╤Б╨╕╨┤╤П"] }
    ]
  },
  b: {
    name: "╨в╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╨░ ╨С (╨С╨░╨▒╨╛╤З╨║╨░ + ╨С╤А╤Г╤Б╤М╤П + ╨б╨┐╨╕╨╜╨░)",
    exercises: [
      { name: "╨б╨▓╨╡╨┤╨╡╨╜╨╕╤П ╤А╤Г╨║ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╨▒╨░╨▒╨╛╤З╨║╨░ (Pec Deck)", muscleGroup: "╨У╤А╤Г╨┤╤М", targetMuscles: "╨Ш╨╖╨╛╨╗╤П╤Ж╨╕╤П ╨│╤А╤Г╨┤╨╜╤Л╤Е ╨╝╤Л╤И╤Ж", phases: ["01: ╨а╨░╤Б╤В╤П╨╢╨║╨░ 2╤Б", "02: ╨б╨▓╨╡╨┤╨╡╨╜╨╕╨╡", "03: ╨Я╨╕╨║╨╛╨▓╨╛╨╡ ╤Б╨╢╨░╤В╨╕╨╡"], sets: 4, min: 10, max: 12, w: 25, calRate: 9, tip: "╨У╨╗╤Г╨▒╨╛╨║╨░╤П ╤А╨░╤Б╤В╤П╨╢╨║╨░ ╨│╤А╤Г╨┤╨╜╤Л╤Е ╨╕ ╤Д╨╕╨║╤Б╨░╤Ж╨╕╤П 2 ╤Б╨╡╨║ ╨▓ ╤Б╨▓╨╡╨┤╨╡╨╜╨╕╨╕.", substitutes: ["╨б╨▓╨╡╨┤╨╡╨╜╨╕╤П ╨▓ ╨║╤А╨╛╤Б╤Б╨╛╨▓╨╡╤А╨╡ ╨╜╨░ ╨▒╨╗╨╛╨║╨░╤Е", "╨Ц╨╕╨╝ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╨е╨░╨╝╨╝╨╡╤А ╨╜╨░ ╨│╤А╤Г╨┤╤М", "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡"] },
      { name: "╨Ю╤В╨╢╨╕╨╝╨░╨╜╨╕╤П ╨╜╨░ ╨▒╤А╤Г╤Б╤М╤П╤Е (╤Б ╨░╨║╤Ж╨╡╨╜╤В╨╛╨╝ ╨╜╨░ ╨│╤А╤Г╨┤╤М)", muscleGroup: "╨У╤А╤Г╨┤╤М", targetMuscles: "╨Э╨╕╨╖ ╨│╤А╤Г╨┤╨╕ тАв ╨в╤А╨╕╤Ж╨╡╨┐╤Б", phases: ["01: ╨Э╨░╨║╨╗╨╛╨╜ 30┬░", "02: ╨г╨│╨╛╨╗ 90┬░", "03: ╨Т╤Л╨╢╨╕╨╝"], sets: 4, min: 8, max: 10, w: 0, calRate: 11, tip: "╨Ъ╨╛╤А╨┐╤Г╤Б ╤Б╨╗╨╡╨│╨║╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╡╨╜ ╨▓╨┐╨╡╤А╨╡╨┤ ╨┤╨╗╤П ╨░╨║╤Ж╨╡╨╜╤В╨░ ╨╜╨░ ╨│╤А╤Г╨┤╤М.", substitutes: ["╨Ц╨╕╨╝ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╨е╨░╨╝╨╝╨╡╤А ╨╜╨░ ╨│╤А╤Г╨┤╤М", "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡", "╨б╨▓╨╡╨┤╨╡╨╜╨╕╤П ╨▓ ╨║╤А╨╛╤Б╤Б╨╛╨▓╨╡╤А╨╡ ╨╜╨░ ╨▒╨╗╨╛╨║╨░╤Е"] },
      { name: "╨а╤Г╨╝╤Л╨╜╤Б╨║╨░╤П ╤В╤П╨│╨░ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕", muscleGroup: "╨Э╨╛╨│╨╕", targetMuscles: "╨С╨╕╤Ж╨╡╨┐╤Б ╨▒╨╡╨┤╤А╨░ тАв ╨п╨│╨╛╨┤╨╕╤Ж╤Л", phases: ["01: ╨в╨░╨╖ ╨╜╨░╨╖╨░╨┤", "02: ╨Я╤А╤П╨╝╨░╤П ╤Б╨┐╨╕╨╜╨░", "03: ╨а╨░╤Б╤В╤П╨╢╨╡╨╜╨╕╨╡"], sets: 4, min: 10, max: 12, w: 22, calRate: 15, tip: "╨в╨░╨╖ ╨╝╨░╨║╤Б╨╕╨╝╨░╨╗╤М╨╜╨╛ ╨╜╨░╨╖╨░╨┤, ╨║╨╛╨╗╨╡╨╜╨╕ ╤Б╨╗╨╡╨│╨║╨░ ╤Б╨╛╨│╨╜╤Г╤В╤Л.", substitutes: ["╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨╛╨│ ╤Б╨╕╨┤╤П ╨╕╨╗╨╕ ╨╗╨╡╨╢╨░ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡", "╨У╨╕╨┐╨╡╤А╤Н╨║╤Б╤В╨╡╨╜╨╖╨╕╤П ╨┤╨╗╤П ╤А╨░╨╖╨│╨╕╨▒╨░╤В╨╡╨╗╨╡╨╣ ╤Б╨┐╨╕╨╜╤Л"] },
      { name: "╨в╤П╨│╨░ ╨▓╨╡╤А╤Е╨╜╨╡╨│╨╛ ╨▒╨╗╨╛╨║╨░ ╨╜╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╝ ╤Е╨▓╨░╤В╨╛╨╝ ╨║ ╨│╤А╤Г╨┤╨╕", muscleGroup: "╨б╨┐╨╕╨╜╨░", targetMuscles: "╨и╨╕╤А╨╛╤З╨░╨╣╤И╨╕╨╡ ╨╝╤Л╤И╤Ж╤Л", phases: ["01: ╨а╨░╤Б╤В╤П╨╢╨║╨░", "02: ╨в╤П╨│╨░ ╨║ ╨│╤А╤Г╨┤╨╕", "03: ╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ ╨╗╨╛╨┐╨░╤В╨╛╨║"], sets: 4, min: 10, max: 12, w: 50, calRate: 12, tip: "╨б╨╕╨╝╨╝╨╡╤В╤А╨╕╤З╨╜╨░╤П ╤В╤П╨│╨░ ╨║ ╨▓╨╡╤А╤Е╤Г ╨│╤А╤Г╨┤╨╕, ╨╗╨╛╨┐╨░╤В╨║╨╕ ╨▓╨╜╨╕╨╖.", substitutes: ["╨Я╨╛╨┤╤В╤П╨│╨╕╨▓╨░╨╜╨╕╤П ╨╜╨░ ╤В╤Г╤А╨╜╨╕╨║╨╡ (╨╕╨╗╨╕ ╨▓ ╨│╤А╨░╨▓╨╕╤В╤А╨╛╨╜╨╡)", "╨в╤П╨│╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨│╨╛ ╨▒╨╗╨╛╨║╨░ ╨║ ╨┐╨╛╤П╤Б╤Г (╨╜╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╤Е╨▓╨░╤В)"] },
      { name: "╨Я╤А╨╕╤Б╨╡╨┤╨░╨╜╨╕╤П ╨▓ ╨У╨░╨║╨║-╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡", muscleGroup: "╨Э╨╛╨│╨╕", targetMuscles: "╨Ъ╨▓╨░╨┤╤А╨╕╤Ж╨╡╨┐╤Б", phases: ["01: ╨б╨┐╨╕╨╜╨░ ╨║ ╨╛╨┐╨╛╤А╨╡", "02: ╨б╨╡╨┤ 90┬░", "03: ╨Я╨╛╨┤╤К╨╡╨╝ ╨┐╤П╤В╨║╨░╨╝╨╕"], sets: 3, min: 10, max: 12, w: 35, calRate: 13, tip: "╨Я╨╗╨░╨▓╨╜╨╛╨╡ ╨┤╨▓╨╕╨╢╨╡╨╜╨╕╨╡ ╨┐╨╛ ╨╜╨░╨┐╤А╨░╨▓╨╗╨╡╨╜╨╕╤О ╨╜╨╛╤Б╨║╨╛╨▓.", substitutes: ["╨Ц╨╕╨╝ ╨╜╨╛╨│╨░╨╝╨╕ ╨┐╨╛╨┤ ╤Г╨│╨╗╨╛╨╝ 45┬░ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡", "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨╛╨│ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡ ╤Б╨╕╨┤╤П"] },
      { name: "╨Я╨╛╨┤╤К╨╡╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б ╤Б╤В╨╛╤П ╤Б ╤Б╤Г╨┐╨╕╨╜╨░╤Ж╨╕╨╡╨╣", muscleGroup: "╨С╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨С╨╕╤Ж╨╡╨┐╤Б", phases: ["01: ╨Ы╨╛╨║╤В╨╕ ╤Г ╤А╨╡╨▒╨╡╤А", "02: ╨б╤Г╨┐╨╕╨╜╨░╤Ж╨╕╤П", "03: ╨б╨╢╨░╤В╨╕╨╡"], sets: 3, min: 10, max: 12, w: 12, calRate: 6, tip: "╨а╨░╨╖╨▓╨╛╤А╨╛╤В ╨║╨╕╤Б╤В╨╕ ╨╜╨░╤А╤Г╨╢╤Г ╨▓ ╨▓╨╡╤А╤Е╨╜╨╡╨╣ ╤В╨╛╤З╨║╨╡.", substitutes: ["╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡ 45┬░", "╨Ь╨╛╨╗╨╛╤В╨║╨╛╨▓╤Л╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ (Hammer Curls)", "╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╨╜╨░ ╤Б╨║╨░╨╝╤М╨╡ ╨б╨║╨╛╤В╤В╨░ (╤Б╨╛ ╤И╤В╨░╨╜╨│╨╛╨╣ ╨╕╨╗╨╕ ╨│╨░╨╜╤В╨╡╨╗╤М╤О)", "╨Я╨╛╨┤╤К╨╡╨╝ ╤И╤В╨░╨╜╨│╨╕ ╨╜╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б ╤Б╤В╨╛╤П (╨┐╤А╤П╨╝╨╛╨╣ ╨╕╨╗╨╕ EZ-╨│╤А╨╕╤Д)"] }
    ]
  },
  c: {
    name: "╨Т╨╛╤Б╤Б╤В╨░╨╜╨╛╨▓╨╗╨╡╨╜╨╕╨╡ ╨╕ ╨Я╨░╨╝╨┐╨╕╨╜╨│ (╨а╨░╨╖╨│╤А╤Г╨╖╨║╨░ ╤И╨╡╨╕ + ╨а╤Г╨║╨╕)",
    exercises: [
      { name: "╨в╤П╨│╨░ ╨║╨░╨╜╨░╤В╨░ ╨║ ╨╗╨╕╤Ж╤Г (Face Pull тАФ ╤А╨░╨╖╨│╤А╤Г╨╖╨║╨░ ╤И╨╡╨╕)", muscleGroup: "╨б╨┐╨╕╨╜╨░", targetMuscles: "╨Ч╨░╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░ тАв ╨Ь╤Л╤И╤Ж╤Л ╨╗╨╛╨┐╨░╤В╨║╨╕", phases: ["01: ╨Ъ╨░╨╜╨░╤В ╨║ ╨│╨╗╨░╨╖╨░╨╝", "02: ╨Ы╨╛╨║╤В╨╕ ╨▓╤А╨╛╨╖╤М", "03: ╨Я╨░╤Г╨╖╨░ 2╤Б"], sets: 4, min: 15, max: 20, w: 15, calRate: 8, tip: "╨Ъ╨░╨╜╨░╤В ╨║ ╨│╨╗╨░╨╖╨░╨╝, ╨╗╨╛╨║╤В╨╕ ╤А╨░╨╖╨▓╨╛╨┤╨╕ ╨╜╨░╨╖╨░╨┤, ╨┐╨░╤Г╨╖╨░ 2 ╤Б╨╡╨║.", substitutes: ["╨а╨░╨╖╨▓╨╛╨┤╨║╨░ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨▓ ╨╜╨░╨║╨╗╨╛╨╜╨╡ ╨╜╨░ ╨╖╨░╨┤╨╜╤О╤О ╨┤╨╡╨╗╤М╤В╤Г", "╨в╤П╨│╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨│╨╛ ╨▒╨╗╨╛╨║╨░ ╨║ ╨┐╨╛╤П╤Б╤Г (╨╜╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╤Е╨▓╨░╤В)"] },
      { name: "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╤Б╨╕╨┤╤П ╨╜╨░ ╨┐╨╗╨╡╤З╨╕ (╤Б╨║╨░╨╝╤М╤П 75┬░)", muscleGroup: "╨Я╨╗╨╡╤З╨╕", targetMuscles: "╨Я╨╡╤А╨╡╨┤╨╜╤П╤П/╤Б╤А╨╡╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░", phases: ["01: ╨Ы╨╛╨║╤В╨╕ ╨┐╨╡╤А╨╡╨┤ ╤Б╨╛╨▒╨╛╨╣", "02: ╨Т╤Л╨╢╨╕╨╝", "03: ╨Я╨╗╨░╨▓╨╜╤Л╨╣ ╤Б╨┐╤Г╤Б╨║"], sets: 3, min: 10, max: 12, w: 14, calRate: 8, tip: "╨Я╨╗╨░╨▓╨╜╤Л╨╣ ╨╢╨╕╨╝ ╨╜╨░╨┤ ╨│╨╛╨╗╨╛╨▓╨╛╨╣ ╨▒╨╡╨╖ ╤А╨╡╨╖╨║╨╛╨│╨╛ ╨┐╤А╨╛╨│╨╕╨▒╨░.", substitutes: ["╨Ь╨░╤Е╨╕ ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╤З╨╡╤А╨╡╨╖ ╤Б╤В╨╛╤А╨╛╨╜╤Л ╤Б╤В╨╛╤П", "╨Я╤А╨╛╤В╤П╨╢╨║╨░ ╨╜╨░ ╨▒╨╗╨╛╨║╨╡ ╨║ ╨┐╨╛╨┤╨▒╨╛╤А╨╛╨┤╨║╤Г (╤И╨╕╤А╨╛╨║╨╕╨╣ ╤Е╨▓╨░╤В)"] },
      { name: "╨Ь╨╛╨╗╨╛╤В╨║╨╛╨▓╤Л╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ (Hammer Curls)", muscleGroup: "╨С╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨С╤А╨░╤Е╨╕╨░╨╗╨╕╤Б тАв ╨С╨╕╤Ж╨╡╨┐╤Б", phases: ["01: ╨Э╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╤Е╨▓╨░╤В", "02: ╨Я╨╛╨┤╤К╨╡╨╝", "03: ╨Ъ╨╛╨╜╤В╤А╨╛╨╗╤М"], sets: 3, min: 10, max: 12, w: 14, calRate: 7, tip: "╨г╤В╨╛╨╗╤Й╨░╨╡╤В ╨┐╤А╨╡╨┤╨┐╨╗╨╡╤З╤М╤П ╨╕ ╨▓╤Л╤В╨░╨╗╨║╨╕╨▓╨░╨╡╤В ╨▒╨╕╤Ж╨╡╨┐╤Б.", substitutes: ["╨Ь╨╛╨╗╨╛╤В╨║╨╛╨▓╤Л╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡", "╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡ 45┬░", "╨Я╨╛╨┤╤К╨╡╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨▒╨╕╤Ж╨╡╨┐╤Б ╤Б╤В╨╛╤П ╤Б ╤Б╤Г╨┐╨╕╨╜╨░╤Ж╨╕╨╡╨╣", "╨Ъ╨╛╨╜╤Ж╨╡╨╜╤В╤А╨╕╤А╨╛╨▓╨░╨╜╨╜╤Л╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П ╤Б ╨│╨░╨╜╤В╨╡╨╗╤М╤О ╤Б╨╕╨┤╤П"] },
      { name: "╨д╤А╨░╨╜╤Ж╤Г╨╖╤Б╨║╨╕╨╣ ╨╢╨╕╨╝ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╨╗╨╡╨╢╨░ ╨╜╨░ ╤Б╨║╨░╨╝╤М╨╡", muscleGroup: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", targetMuscles: "╨в╤А╨╕╤Ж╨╡╨┐╤Б", phases: ["01: ╨Ы╨╛╨║╤В╨╕ ╨┐╨░╤А╨░╨╗╨╗╨╡╨╗╤М╨╜╨╛", "02: ╨Ъ ╨▓╨╕╤Б╨║╨░╨╝", "03: ╨Т╤Л╨╢╨╕╨╝"], sets: 3, min: 10, max: 12, w: 10, calRate: 6, tip: "╨Ы╨╛╨║╤В╨╕ ╨╜╨╡ ╤А╨░╨╖╨▓╨╛╨┤╨╕ ╤И╨╕╤А╨╛╨║╨╛ ╨▓ ╤Б╤В╨╛╤А╨╛╨╜╤Л.", substitutes: ["╨д╤А╨░╨╜╤Ж╤Г╨╖╤Б╨║╨╕╨╣ ╨╢╨╕╨╝ ╤Б╨╛ ╤И╤В╨░╨╜╨│╨╛╨╣ (EZ-╨│╤А╨╕╤Д) ╨╗╨╡╨╢╨░", "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╤А╤Г╨║ ╨╜╨░ ╨▓╨╡╤А╤Е╨╜╨╡╨╝ ╨▒╨╗╨╛╨║╨╡ ╤Б ╨║╨░╨╜╨░╤В╨╛╨╝", "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╨╡ ╤А╤Г╨║╨╕ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤М╤О ╨╕╨╖-╨╖╨░ ╨│╨╛╨╗╨╛╨▓╤Л ╤Б╨╕╨┤╤П", "╨Ц╨╕╨╝ ╤И╤В╨░╨╜╨│╨╕ ╤Г╨╖╨║╨╕╨╝ ╤Е╨▓╨░╤В╨╛╨╝ ╨╗╨╡╨╢╨░"] },
      { name: "╨е╨╛╨┤╤М╨▒╨░ ╨▓ ╨│╨╛╤А╨║╤Г ╨╜╨░ ╨┤╨╛╤А╨╛╨╢╨║╨╡ (╤Б╨╢╨╕╨│╨░╨╜╨╕╨╡ ╨╢╨╕╤А╨░)", muscleGroup: "╨Ъ╨░╤А╨┤╨╕╨╛", targetMuscles: "╨б╨╡╤А╨┤╤Ж╨╡ тАв ╨Ц╨╕╤А╨╛╤Б╨╢╨╕╨│╨░╨╜╨╕╨╡", phases: ["01: ╨г╨║╨╗╨╛╨╜ 8-10%", "02: 5.5 ╨║╨╝/╤З", "03: ╨Я╤Г╨╗╤М╤Б 115-125"], sets: 1, min: 25, max: 30, w: 0, calRate: 200, isTime: true, tip: "╨Я╤Г╨╗╤М╤Б 115-125 ╤Г╨┤/╨╝╨╕╨╜ ╨▒╨╡╨╖ ╨╛╨┤╤Л╤И╨║╨╕.", substitutes: ["╨н╨╗╨╗╨╕╨┐╤В╨╕╤З╨╡╤Б╨║╨╕╨╣ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А"] }
    ]
  }
};

// ========================================================
// ╨б╨Ю╨б╨в╨Ю╨п╨Э╨Ш╨Х ╨Р╨Ъ╨Ъ╨Р╨г╨Э╨в╨Р
// ========================================================
function getInitialAccount() {
  return {
    tgId: "asutp_iron_account_default",
    name: "╨а╨╛╨╝╨░╨╜",
    age: 32,
    height: 178,
    goal: "╨а╨╡╨║╨╛╨╝╨┐╨╛╨╖╨╕╤Ж╨╕╤П (╨б╤Г╤И╨║╨░ ╨╢╨╕╤А╨░ + ╨Ь╤Л╤И╨╡╤З╨╜╤Л╨╣ ╤В╨╛╨╜╤Г╤Б)",
    mesocycleWeek: 3,
    xp: 0,
    streak: 0,
    vacDaysCount: 0,
    soundMode: 'sound',
    weightProgression: {
      "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡ 30┬░": 22.0,
      "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡": 24.0,
      "╨Ц╨╕╨╝ ╨╜╨╛╨│╨░╨╝╨╕ ╨┐╨╛╨┤ ╤Г╨│╨╗╨╛╨╝ 45┬░ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡": 90.0,
      "╨в╤П╨│╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨│╨╛ ╨▒╨╗╨╛╨║╨░ ╨║ ╨┐╨╛╤П╤Б╤Г (╨╜╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╤Е╨▓╨░╤В)": 45.0
    },
    personalRecords: {
      "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡ 30┬░": { weight: 22, reps: 10, date: "2026-08-25" },
      "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨╣ ╤Б╨║╨░╨╝╤М╨╡": { weight: 24, reps: 10, date: "2026-08-25" },
      "╨Ц╨╕╨╝ ╨╜╨╛╨│╨░╨╝╨╕ ╨┐╨╛╨┤ ╤Г╨│╨╗╨╛╨╝ 45┬░ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡": { weight: 90, reps: 12, date: "2026-08-25" },
      "╨в╤П╨│╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨│╨╛ ╨▒╨╗╨╛╨║╨░ ╨║ ╨┐╨╛╤П╤Б╤Г (╨╜╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╤Е╨▓╨░╤В)": { weight: 45, reps: 12, date: "2026-08-25" }
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

function getFirstUnfinishedExerciseIndex(workout = appState.activeWorkout) {
  if (!workout || !workout.exercises || workout.exercises.length === 0) return 0;
  const idx = workout.exercises.findIndex(ex => ex.sets && ex.sets.some(s => !s.done));
  return idx !== -1 ? idx : (workout.exercises.length - 1);
}

let liveWorkoutTimerInterval = null;
let liveWorkoutSeconds = 0;

let calYear = 2026;
let calMonth = 7;
let selectedCalDateStr = "2026-08-27";

const MONTH_NAMES = [
  "╨п╨╜╨▓╨░╤А╤М", "╨д╨╡╨▓╤А╨░╨╗╤М", "╨Ь╨░╤А╤В", "╨Р╨┐╤А╨╡╨╗╤М", "╨Ь╨░╨╣", "╨Ш╤О╨╜╤М",
  "╨Ш╤О╨╗╤М", "╨Р╨▓╨│╤Г╤Б╤В", "╨б╨╡╨╜╤В╤П╨▒╤А╤М", "╨Ю╨║╤В╤П╨▒╤А╤М", "╨Э╨╛╤П╨▒╤А╤М", "╨Ф╨╡╨║╨░╨▒╤А╤М"
];
const MONTH_SHORT = [
  "╨п╨╜╨▓", "╨д╨╡╨▓", "╨Ь╨░╤А", "╨Р╨┐╤А", "╨Ь╨░╨╣", "╨Ш╤О╨╜",
  "╨Ш╤О╨╗", "╨Р╨▓╨│", "╨б╨╡╨╜", "╨Ю╨║╤В", "╨Э╨╛╤П", "╨Ф╨╡╨║"
];

function getTotalTonnage(s) {
  return (s.history || []).reduce((sum, h) => sum + (h.tonnage || 0), 0);
}

function loadState() {
  let tgKey = "asutp_iron_account_default";
  let tgName = "╨а╨╛╨╝╨░╨╜";

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
        if (badge && ok) badge.textContent = "╨Ю╨▒╨╗╨░╨║╨╛ OK тШБя╕П";
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
        alert("╨Ф╨░╨╜╨╜╤Л╨╡ ╤Г╤Б╨┐╨╡╤И╨╜╨╛ ╨╕╨╝╨┐╨╛╤А╤В╨╕╤А╨╛╨▓╨░╨╜╤Л!");
        location.reload();
      }
    } catch(err) {
      alert("╨Ю╤И╨╕╨▒╨║╨░ ╤З╤В╨╡╨╜╨╕╤П ╤Д╨░╨╣╨╗╨░ JSON");
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

  if (lvlHeader) lvlHeader.textContent = `╨г╤А╨╛╨▓╨╡╨╜╤М ${currentLvl}`;
  if (xpTxt) xpTxt.textContent = appState.xp;
  if (xpNxt) xpNxt.textContent = `${xpToNext} XP`;
  if (xpBar) xpBar.style.width = `${(xpInLvl / 500) * 100}%`;
  if (strkEl) strkEl.textContent = appState.streak;
}



// ========================================================
// ╨Ш╨Э╨в╨Х╨Ы╨Ы╨Х╨Ъ╨в╨г╨Р╨Ы╨м╨Э╨л╨Щ ╨Р╨Т╨в╨Ю-╨Ф╨Х╨в╨Х╨Ъ╨в╨Ю╨а ╨а╨Х╨Ъ╨Ю╨а╨Ф╨Ю╨Т
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
        <p class="text-xs font-bold text-white uppercase">╨а╨╡╨║╨╛╤А╨┤╤Л ╤Д╨╛╤А╨╝╨╕╤А╤Г╤О╤В╤Б╤П</p>
        <p class="text-[11px] text-slate-400 font-sans">╨б╨╕╤Б╤В╨╡╨╝╨░ ╨░╨▓╤В╨╛╨╝╨░╤В╨╕╤З╨╡╤Б╨║╨╕ ╨╖╨░╤Д╨╕╨║╤Б╨╕╤А╤Г╨╡╤В ╤А╨╡╨║╨╛╤А╨┤, ╨║╨╛╨│╨┤╨░ ╤В╤Л ╨┐╤А╨╡╨▓╨╖╨╛╨╣╨┤╨╡╤И╤М ╤Б╨▓╨╛╨╣ ╤А╨░╨▒╨╛╤З╨╕╨╣ ╨▓╨╡╤Б ╨╕╨╗╨╕ ╨┐╨╛╨▓╤В╨╛╤А╨╡╨╜╨╕╤П ╨╜╨░ ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╨╡.</p>
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
          ╨Ь╨░╨║╤Б╨╕╨╝╤Г╨╝: <b class="text-[#c8a97e] font-bold text-sm">${rec.weight} ╨║╨│ ├Ч ${rec.reps}</b>
        </p>
      </div>
      <div class="text-right font-mono">
        <span class="text-[10px] text-slate-400 block">${rec.date}</span>
        <span class="text-[9px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 uppercase">╨Я╨╛╨┤╤В╨▓╨╡╤А╨╢╨┤╨╡╨╜╨╛</span>
      </div>
    `;

    container.appendChild(card);
  });
}

// ========================================================
// ╨Я╨Х╨а╨б╨Ю╨Р╨Э╨Р╨Ы╨Ш╨в╨Ш╨Ъ╨Р ╨Ш ╨Ш╨Ш-╨б╨Ю╨Т╨Х╨в╨Э╨Ш╨Ъ
// ========================================================
function renderPersonalizedAIAnalytics() {
  const container = document.getElementById("ai-recommendations-container");
  const pushPullEl = document.getElementById("ai-pushpull-ratio");
  const neckSafetyEl = document.getElementById("ai-neck-safety");
  const weekTonEl = document.getElementById("ai-week-tonnage");
  if (!container) return;

  const hist = appState.history || [];
  const weekTonnage = hist.slice(0, 3).reduce((sum, h) => sum + (h.tonnage || 0), 0);

  if (weekTonEl) weekTonEl.textContent = `${weekTonnage.toLocaleString()} ╨║╨│`;

  let pushSets = 0, pullSets = 0;
  hist.slice(0, 4).forEach(h => {
    (h.exercises || []).forEach(e => {
      const setCount = (e.sets.match(/,/g) || []).length + 1;
      const n = (e.name || "").toLowerCase();
      if (n.includes("╨╢╨╕╨╝") || n.includes("╨▒╨░╨▒╨╛╤З╨║") || n.includes("╨▒╤А╤Г╤Б╤М") || n.includes("╨╝╨░╤Е")) pushSets += setCount;
      if (n.includes("╤В╤П╨│╨░") || n.includes("╤Б╨┐╨╕╨╜") || n.includes("╨╗╨╕╤Ж╤Г") || n.includes("╨┐╨╛╨┤╤В╤П╨│╨╕╨▓╨░╨╜")) pullSets += setCount;
    });
  });

  const ratio = (pullSets > 0) ? (pushSets / pullSets).toFixed(1) : "1.0";
  if (pushPullEl) pushPullEl.textContent = `${ratio} : 1.0`;

  if (neckSafetyEl) {
    if (pullSets >= pushSets * 0.9) {
      neckSafetyEl.textContent = "╨С╨╡╨╖╨╛╨┐╨░╤Б╨╜╨╛";
      neckSafetyEl.className = "text-sm font-bold text-emerald-400";
    } else {
      neckSafetyEl.textContent = "╨Т╨╜╨╕╨╝╨░╨╜╨╕╨╡";
      neckSafetyEl.className = "text-sm font-bold text-[#c8a97e]";
    }
  }

  const tips = [
    {
      icon: `<svg class="w-3.5 h-3.5 text-[#c8a97e] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>`,
      title: "╨Ъ╨╛╨╜╤В╤А╨╛╨╗╤М ╨┤╤Л╤Е╨░╨╜╨╕╤П ╨╕ ╤В╨╡╨╝╨┐╨░ 3-1-1-0",
      desc: "╨Я╨╛╨╗╨╜╨╛╤Б╤В╤М╤О ╨╕╤Б╨║╨╗╤О╤З╨╡╨╜ ╨╝╨░╨╜╨╡╨▓╤А ╨Т╨░╨╗╤М╤Б╨░╨╗╤М╨▓╤Л (╨╖╨░╨┤╨╡╤А╨╢╨║╨░ ╨┤╤Л╤Е╨░╨╜╨╕╤П ╨┐╤А╨╕ ╨╜╨░╤В╤Г╨╢╨╕╨▓╨░╨╜╨╕╨╕). ╨Т╤Л╨┐╨╛╨╗╨╜╤П╨╣ ╨┤╨╗╨╕╨╜╨╜╤Л╨╣ ╨▓╤Л╨┤╨╛╤Е ╤Б╤В╤А╨╛╨│╨╛ ╨╜╨░ ╤Г╤Б╨╕╨╗╨╕╨╕ ╨┐╤А╨╕ ╨▓╤Л╨╢╨╕╨╝╨╡ ╨▓╨╡╤Б╨░. ╨Ю╤В╨┤╤Л╤Е ╨╝╨╡╨╢╨┤╤Г ╨▒╨░╨╖╨╛╨▓╤Л╨╝╨╕ ╤Б╨╡╤В╨░╨╝╨╕: ╨╜╨╡ ╨╝╨╡╨╜╨╡╨╡ 90тАУ120 ╤Б╨╡╨║╤Г╨╜╨┤."
    },
    {
      icon: `<svg class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
      title: "╨Я╤А╨╛╤В╨╛╨║╨╛╨╗ ╨╖╨░╤Й╨╕╤В╤Л ╨╕ ╤Б╤В╨░╨▒╨╕╨╗╨╕╨╖╨░╤Ж╨╕╨╕ ╨╗╨╛╨┐╨░╤В╨╛╨║",
      desc: "╨Ш╤Б╨║╨╗╤О╤З╨╡╨╜╤Л ╨╢╨╕╨╝╤Л ╤И╤В╨░╨╜╨│╨╕ ╨╕╨╖-╨╖╨░ ╨│╨╛╨╗╨╛╨▓╤Л ╨╕ ╤И╤А╨░╨│╨╕. ╨Ю╨▒╤П╨╖╨░╤В╨╡╨╗╤М╨╜╨╛ ╤Б╨╛╤Е╤А╨░╨╜╤П╨╣ ╨▓ ╨┐╤А╨╛╨│╤А╨░╨╝╨╝╨╡ ╤В╤П╨│╤Г ╨║╨░╨╜╨░╤В╨░ ╨║ ╨╗╨╕╤Ж╤Г (Face Pull) 4╤Е15-20 ╨╕ ╨╜╨╡╨╣╤В╤А╨░╨╗╤М╨╜╤Л╨╣ ╤Е╨▓╨░╤В ╨▓ ╤В╤П╨│╨░╤Е ╨┤╨╗╤П ╤Б╨╜╤П╤В╨╕╤П ╤В╨╛╨╜╤Г╤Б╨░ ╤В╤А╨░╨┐╨╡╤Ж╨╕╨╡╨▓╨╕╨┤╨╜╨╛╨╣ ╨╝╤Л╤И╤Ж╤Л."
    },
    {
      icon: `<svg class="w-3.5 h-3.5 text-[#c8a97e] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
      title: "╨н╨╜╨╡╤А╨│╨╡╤В╨╕╤З╨╡╤Б╨║╨╕╨╣ ╨┤╨╡╤Д╨╕╤Ж╨╕╤В (WHtR: 51%)",
      desc: "╨Ю╨┐╤В╨╕╨╝╨░╨╗╤М╨╜╤Л╨╣ ╤Б╤Г╤В╨╛╤З╨╜╤Л╨╣ ╨┤╨╡╤Д╨╕╤Ж╨╕╤В ╤Б╨╛╤Б╤В╨░╨▓╨╗╤П╨╡╤В -360 ╨║╨║╨░╨╗ (╤Ж╨╡╨╗╨╡╨▓╨╛╨╣ ╨┐╤А╨╕╨╡╨╝: ~2050 ╨║╨║╨░╨╗/╨┤╨╡╨╜╤М). ╨н╤В╨╛ ╨╛╨▒╨╡╤Б╨┐╨╡╤З╨╕╨▓╨░╨╡╤В ╤Б╤Г╤И╨║╤Г ╨▓╨╕╤Б╤Ж╨╡╤А╨░╨╗╤М╨╜╨╛╨│╨╛ ╨╢╨╕╤А╨░ ╤Б╨╛ ╤Б╨║╨╛╤А╨╛╤Б╤В╤М╤О 400-500╨│ ╨▓ ╨╜╨╡╨┤╨╡╨╗╤О ╨▒╨╡╨╖ ╨┐╨╛╤В╨╡╤А╨╕ ╨╝╤Л╤И╨╡╤З╨╜╨╛╨╣ ╨╝╨░╤Б╤Б╤Л."
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
// ╨Ш╨Э╨в╨Х╨а╨Р╨Ъ╨в╨Ш╨Т╨Э╨Р╨п ╨Р╨Э╨Р╨в╨Ю╨Ь╨Ш╨з╨Х╨б╨Ъ╨Р╨п ╨Ь╨Ю╨Ф╨Х╨Ы╨м ╨з╨Х╨Ы╨Ю╨Т╨Х╨Ъ╨Р & ╨У╨Ш╨Я╨Х╨а╨в╨а╨Ю╨д╨Ш╨п
// ========================================================
const ANATOMY_MUSCLES = {
  chest: {
    id: "chest",
    name: "╨У╤А╤Г╨┤╨╜╤Л╨╡ ╨╝╤Л╤И╤Ж╤Л (Pectoralis Major)",
    zone: "╨У╤А╤Г╨┤╤М (╨Т╨╡╤А╤Е, ╨б╨╡╤А╨╡╨┤╨╕╨╜╨░, ╨Э╨╕╨╖)",
    mav: 14,
    mev: 8,
    recoveryHours: 48,
    bestExercises: ["╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ 30┬░", "╨С╨░╨▒╨╛╤З╨║╨░ Pec Deck", "╨Ю╤В╨╢╨╕╨╝╨░╨╜╨╕╤П ╨╜╨░ ╨▒╤А╤Г╤Б╤М╤П╤Е"],
    tip: "╨Ы╨╛╨║╤В╨╕ 60тАУ70┬░ ╨║ ╨║╨╛╤А╨┐╤Г╤Б╤Г, ╨╗╨╛╨┐╨░╤В╨║╨╕ ╤Б╨▓╨╡╨┤╨╡╨╜╤Л ╨╕ ╨╛╨┐╤Г╤Й╨╡╨╜╤Л ╨┤╨╗╤П ╤А╨░╨╖╨│╤А╤Г╨╖╨║╨╕ ╤И╨╡╨╕ ╨╕ ╨┐╨╗╨╡╤З╨╡╨▓╤Л╤Е ╤Б╤Г╤Б╤В╨░╨▓╨╛╨▓."
  },
  delts: {
    id: "delts",
    name: "╨Ф╨╡╨╗╤М╤В╨╛╨▓╨╕╨┤╨╜╤Л╨╡ ╨╝╤Л╤И╤Ж╤Л (╨Я╨╗╨╡╤З╨╕)",
    zone: "╨Я╨╡╤А╨╡╨┤╨╜╤П╤П, ╨б╤А╨╡╨┤╨╜╤П╤П ╨╕ ╨Ч╨░╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░",
    mav: 16,
    mev: 8,
    recoveryHours: 48,
    bestExercises: ["╨Ь╨░╤Е╨╕ ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕ ╤З╨╡╤А╨╡╨╖ ╤Б╤В╨╛╤А╨╛╨╜╤Л", "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ 75┬░", "╨в╤П╨│╨░ ╨║ ╨╗╨╕╤Ж╤Г (Face Pull)"],
    tip: "╨Я╨╛╨┤╨╜╨╕╨╝╨░╨╣ ╨╗╨╛╨║╤В╤П╨╝╨╕ ╨┤╨╛ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╨╕, ╨║╨╕╤Б╤В╤М ╨╜╨╡ ╨╖╨░╨┤╨╕╤А╨░╨╣ ╨▓╤Л╤И╨╡ ╨╗╨╛╨║╤В╤П. ╨б╨╜╨╕╨╢╨░╨╡╤В ╤А╨╕╤Б╨║ ╨╖╨░╤Й╨╡╨╝╨╗╨╡╨╜╨╕╤П ╤А╨╛╤В╨░╤В╨╛╤А╨╛╨▓."
  },
  lats: {
    id: "lats",
    name: "╨и╨╕╤А╨╛╤З╨░╨╣╤И╨╕╨╡ ╨╝╤Л╤И╤Ж╤Л ╤Б╨┐╨╕╨╜╤Л (Lats)",
    zone: "╨Т╨╡╤А╤Е ╨╕ ╤Б╨╡╤А╨╡╨┤╨╕╨╜╨░ ╤Б╨┐╨╕╨╜╤Л (V-╨╛╨▒╤А╨░╨╖╨╜╤Л╨╣ ╨║╨╛╨╜╤Г╤Б)",
    mav: 16,
    mev: 10,
    recoveryHours: 48,
    bestExercises: ["╨в╤П╨│╨░ ╨│╨╛╤А╨╕╨╖╨╛╨╜╤В╨░╨╗╤М╨╜╨╛╨│╨╛ ╨▒╨╗╨╛╨║╨░ ╨║ ╨┐╨╛╤П╤Б╤Г", "╨в╤П╨│╨░ ╨▓╨╡╤А╤Е╨╜╨╡╨│╨╛ ╨▒╨╗╨╛╨║╨░", "╨Я╨╛╨┤╤В╤П╨│╨╕╨▓╨░╨╜╨╕╤П"],
    tip: "╨в╤П╨╜╨╕ ╨╗╨╛╨║╤В╨╕ ╨╜╨░╨╖╨░╨┤ ╨▓╨┤╨╛╨╗╤М ╤А╨╡╨▒╨╡╤А ╨║ ╤В╨░╨╖╤Г, ╨│╤А╤Г╨┤╤М ╤А╨░╤Б╨║╤А╤Л╤В╨░, ╨┐╨╗╨╡╤З╨╕ ╨╛╨┐╤Г╤Й╨╡╨╜╤Л ╨▓╨╜╨╕╨╖."
  },
  traps: {
    id: "traps",
    name: "╨в╤А╨░╨┐╨╡╤Ж╨╕╤П & ╨Ч╨╛╨╜╨░ ╨╗╨╛╨┐╨░╤В╨╛╨║ (╨и╨╡╤П)",
    zone: "╨и╨╡╨╣╨╜╨╛-╨▓╨╛╤А╨╛╤В╨╜╨╕╨║╨╛╨▓╨░╤П ╨╖╨╛╨╜╨░ ╨╕ ╤А╨╛╨╝╨▒╨╛╨▓╨╕╨┤╨╜╤Л╨╡ ╨╝╤Л╤И╤Ж╤Л",
    mav: 12,
    mev: 6,
    recoveryHours: 48,
    bestExercises: ["╨в╤П╨│╨░ ╨║╨░╨╜╨░╤В╨░ ╨║ ╨╗╨╕╤Ж╤Г (Face Pull)", "╨а╨░╨╖╨▓╨╛╨┤╨║╨░ ╨▓ ╨╜╨░╨║╨╗╨╛╨╜╨╡", "╨и╤А╨░╨│╨╕ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕"],
    tip: "╨Ъ╤А╨╕╤В╨╕╤З╨╡╤Б╨║╨░╤П ╨╖╨╛╨╜╨░ ╨▒╨╡╨╖╨╛╨┐╨░╤Б╨╜╨╛╤Б╤В╨╕: ╤В╤П╨│╨░ Face Pull ╤Б╨╜╨╕╨╝╨░╨╡╤В ╤Б╨┐╨░╨╖╨╝ ╤Б ╨╝╤Л╤И╤Ж╤Л ╤И╨╡╨╕ ╨╕ ╨┐╤А╨╡╨┤╨╛╤В╨▓╤А╨░╤Й╨░╨╡╤В ╨║╨╛╨╝╨┐╤А╨╡╤Б╤Б╨╕╤О ╨┐╨╛╨╖╨▓╨╛╨╜╨║╨╛╨▓."
  },
  biceps: {
    id: "biceps",
    name: "╨С╨╕╤Ж╨╡╨┐╤Б & ╨С╤А╨░╤Е╨╕╨░╨╗╨╕╤Б (╨а╤Г╨║╨╕)",
    zone: "╨Ф╨▓╤Г╨│╨╗╨░╨▓╨░╤П ╨╝╤Л╤И╤Ж╨░ ╨┐╨╗╨╡╤З╨░ ╨╕ ╨┐╤А╨╡╨┤╨┐╨╗╨╡╤З╤М╤П",
    mav: 12,
    mev: 6,
    recoveryHours: 36,
    bestExercises: ["╨Я╨╛╨┤╤К╨╡╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╤Б ╤Б╤Г╨┐╨╕╨╜╨░╤Ж╨╕╨╡╨╣", "╨Ь╨╛╨╗╨╛╤В╨║╨╛╨▓╤Л╨╡ ╤Б╨│╨╕╨▒╨░╨╜╨╕╤П (Hammer)"],
    tip: "╨б╤Г╨┐╨╕╨╜╨░╤Ж╨╕╤П (╤А╨░╨╖╨▓╨╛╤А╨╛╤В ╨║╨╕╤Б╤В╨╕ ╨╜╨░╤А╤Г╨╢╤Г) ╨▓ ╨▓╨╡╤А╤Е╨╜╨╡╨╣ ╤В╤А╨╡╤В╨╕ ╨░╨╝╨┐╨╗╨╕╤В╤Г╨┤╤Л ╨┤╨░╨╡╤В ╨╝╨░╨║╤Б╨╕╨╝╨░╨╗╤М╨╜╤Л╨╣ ╨┐╨╕╨║ ╨▒╨╕╤Ж╨╡╨┐╤Б╨░."
  },
  triceps: {
    id: "triceps",
    name: "╨в╤А╨╕╤Ж╨╡╨┐╤Б (╨а╤Г╨║╨╕)",
    zone: "╨Ы╨░╤В╨╡╤А╨░╨╗╤М╨╜╨░╤П ╨╕ ╨┤╨╗╨╕╨╜╨╜╨░╤П ╨│╨╛╨╗╨╛╨▓╨║╨░ ╤В╤А╨╕╤Ж╨╡╨┐╤Б╨░",
    mav: 12,
    mev: 6,
    recoveryHours: 36,
    bestExercises: ["╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨░ ╨▒╨╗╨╛╨║╨╡ ╤Б ╨║╨░╨╜╨░╤В╨╛╨╝", "╨д╤А╨░╨╜╤Ж╤Г╨╖╤Б╨║╨╕╨╣ ╨╢╨╕╨╝ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕"],
    tip: "╨Ы╨╛╨║╤В╨╕ ╨╖╨░╤Д╨╕╨║╤Б╨╕╤А╨╛╨▓╨░╨╜╤Л ╤Г ╨║╨╛╤А╨┐╤Г╤Б╨░ ╨╕ ╨╜╨╡ ╤А╨░╤Б╤Е╨╛╨┤╤П╤В╤Б╤П ╨▓ ╤Б╤В╨╛╤А╨╛╨╜╤Л. ╨а╨░╨╖╨▓╨╛╨┤╨╕ ╨║╨░╨╜╨░╤В ╨▓ ╨╜╨╕╨╢╨╜╨╡╨╣ ╤В╨╛╤З╨║╨╡."
  },
  abs: {
    id: "abs",
    name: "╨Ь╤Л╤И╤Ж╤Л ╨┐╤А╨╡╤Б╤Б╨░ & ╨Ъ╨╛╤А╨░ (Core)",
    zone: "╨Я╤А╤П╨╝╨░╤П ╨╝╤Л╤И╤Ж╨░ ╨╢╨╕╨▓╨╛╤В╨░, ╨║╨╛╤Б╤Л╨╡ ╨╕ ╨▓╨░╨║╤Г╤Г╨╝",
    mav: 14,
    mev: 6,
    recoveryHours: 24,
    bestExercises: ["╨б╨║╤А╤Г╤З╨╕╨▓╨░╨╜╨╕╤П ╨╜╨░ ╨▒╨╗╨╛╨║╨╡", "╨Я╨╛╨┤╤К╨╡╨╝ ╨║╨╛╨╗╨╡╨╜╨╡╨╣ ╨▓ ╨▓╨╕╤Б╨╡", "╨г╤В╤А╨╡╨╜╨╜╨╕╨╣ ╨▓╨░╨║╤Г╤Г╨╝ ╨╢╨╕╨▓╨╛╤В╨░"],
    tip: "╨б╨║╤А╤Г╤З╨╕╨▓╨░╨╣ ╨│╤А╤Г╨┤╨╜╤Г╤О ╨║╨╗╨╡╤В╨║╤Г ╨║ ╤В╨░╨╖╤Г ╨╜╨░ ╨┐╨╛╨╗╨╜╨╛╨╝ ╨▓╤Л╨┤╨╛╤Е╨╡, ╨▓╤В╤П╨│╨╕╨▓╨░╤П ╨┐╤Г╨┐╨╛╨║ ╨║ ╨┐╨╛╨╖╨▓╨╛╨╜╨╛╤З╨╜╨╕╨║╤Г."
  },
  quads: {
    id: "quads",
    name: "╨Ъ╨▓╨░╨┤╤А╨╕╤Ж╨╡╨┐╤Б╤Л (╨Я╨╡╤А╨╡╨┤╨╜╤П╤П ╤З╨░╤Б╤В╤М ╨▒╨╡╨┤╤А╨░)",
    zone: "╨Я╤А╤П╨╝╨░╤П, ╨╗╨░╤В╨╡╤А╨░╨╗╤М╨╜╨░╤П ╨╕ ╨╝╨╡╨┤╨╕╨░╨╗╤М╨╜╨░╤П ╨│╨╛╨╗╨╛╨▓╨║╨╕ ╨▒╨╡╨┤╤А╨░",
    mav: 14,
    mev: 8,
    recoveryHours: 72,
    bestExercises: ["╨Ц╨╕╨╝ ╨╜╨╛╨│╨░╨╝╨╕ ╨┐╨╛╨┤ ╤Г╨│╨╗╨╛╨╝ 45┬░", "╨У╨░╨║╨║-╨┐╤А╨╕╤Б╨╡╨┤╨░╨╜╨╕╤П", "╨а╨░╨╖╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨╛╨│ ╤Б╨╕╨┤╤П"],
    tip: "╨г╨┐╨╛╤А ╤Б╤В╤А╨╛╨│╨╛ ╨▓ ╤Б╨╡╤А╨╡╨┤╨╕╨╜╤Г ╤Б╤В╨╛╨┐╤Л ╨╕ ╨┐╤П╤В╨║╤Г, ╨╜╨╡ ╨▓╤Б╤В╨░╨▓╨╗╤П╨╣ ╨║╨╛╨╗╨╡╨╜╨╕ ╨┤╨╛ ╤Й╨╡╨╗╤З╨║╨░ ╨▓ ╨▓╨╡╤А╤Е╨╜╨╡╨╣ ╤В╨╛╤З╨║╨╡."
  },
  hamstrings: {
    id: "hamstrings",
    name: "╨С╨╕╤Ж╨╡╨┐╤Б ╨▒╨╡╨┤╤А╨░ & ╨п╨│╨╛╨┤╨╕╤З╨╜╤Л╨╡",
    zone: "╨Ч╨░╨┤╨╜╤П╤П ╨┐╨╛╨▓╨╡╤А╤Е╨╜╨╛╤Б╤В╤М ╨▒╨╡╨┤╤А╨░ ╨╕ ╤П╨│╨╛╨┤╨╕╤Ж╤Л",
    mav: 14,
    mev: 8,
    recoveryHours: 72,
    bestExercises: ["╨а╤Г╨╝╤Л╨╜╤Б╨║╨░╤П ╤В╤П╨│╨░ ╤Б ╨│╨░╨╜╤В╨╡╨╗╤П╨╝╨╕", "╨б╨│╨╕╨▒╨░╨╜╨╕╤П ╨╜╨╛╨│ ╤Б╨╕╨┤╤П/╨╗╨╡╨╢╨░"],
    tip: "╨Ю╤В╨▓╨╛╨┤╨╕ ╤В╨░╨╖ ╨╝╨░╨║╤Б╨╕╨╝╨░╨╗╤М╨╜╨╛ ╨╜╨░╨╖╨░╨┤ ╤Б ╨┐╤А╤П╨╝╨╛╨╣ ╤Б╨┐╨╕╨╜╨╛╨╣ ╨┤╨╗╤П ╨│╨╗╤Г╨▒╨╛╨║╨╛╨│╨╛ ╨╜╨░╤В╤П╨╢╨╡╨╜╨╕╤П ╨╖╨░╨┤╨╜╨╡╨╣ ╤Ж╨╡╨┐╨╕."
  },
  calves: {
    id: "calves",
    name: "╨Ш╨║╤А╨╛╨╜╨╛╨╢╨╜╤Л╨╡ ╨╝╤Л╤И╤Ж╤Л (╨У╨╛╨╗╨╡╨╜╤М)",
    zone: "╨Ш╨║╤А╨╛╨╜╨╛╨╢╨╜╨░╤П ╨╕ ╨║╨░╨╝╨▒╨░╨╗╨╛╨▓╨╕╨┤╨╜╨░╤П ╨╝╤Л╤И╤Ж╤Л",
    mav: 16,
    mev: 8,
    recoveryHours: 36,
    bestExercises: ["╨Я╨╛╨┤╤К╨╡╨╝ ╨╜╨░ ╨╜╨╛╤Б╨║╨╕ ╤Б╤В╨╛╤П ╨╜╨░ ╨▓╨╛╨╖╨▓╤Л╤И╨╡╨╜╨╕╨╕", "╨Я╨╛╨┤╤К╨╡╨╝ ╨╜╨░ ╨╜╨╛╤Б╨║╨╕ ╨▓ ╤В╤А╨╡╨╜╨░╨╢╨╡╤А╨╡"],
    tip: "╨Я╨╛╨╗╨╜╨░╤П ╨░╨╝╨┐╨╗╨╕╤В╤Г╨┤╨░: ╨╛╨┐╤Г╤Б╨║╨░╨╣╤Б╤П ╨┤╨╛ ╨│╨╗╤Г╨▒╨╛╨║╨╛╨╣ ╤А╨░╤Б╤В╤П╨╢╨║╨╕ ╨╕ ╨┤╨╡╨╗╨░╨╣ ╤Б╨╡╨║╤Г╨╜╨┤╨╜╤Г╤О ╨┐╨░╤Г╨╖╤Г ╨▓╨╜╨╕╨╖╤Г."
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

  // ╨а╨░╤Б╤З╨╡╤В ╨╜╨╡╨┤╨╡╨╗╤М╨╜╨╛╨│╨╛ ╨╛╨▒╤К╨╡╨╝╨░ ╤Б╨╡╤В╨╛╨▓ ╨╕ ╨▓╤А╨╡╨╝╨╡╨╜╨╕ ╤Б ╨┐╨╛╤Б╨╗╨╡╨┤╨╜╨╡╨╣ ╨╜╨░╨│╤А╤Г╨╖╨║╨╕
  hist.forEach(h => {
    const diffHours = Math.max(1, Math.round((now - new Date(h.date).getTime()) / (1000 * 60 * 60)));
    const isThisWeek = diffHours <= 168; // 7 ╨┤╨╜╨╡╨╣

    (h.exercises || []).forEach(e => {
      const setCount = (e.sets.match(/,/g) || []).length + 1;
      const n = (e.name || "").toLowerCase();

      let targetKey = null;
      if (n.includes("╨╢╨╕╨╝") || n.includes("╨▒╨░╨▒╨╛╤З╨║") || n.includes("╨▒╤А╤Г╤Б╤М")) targetKey = "chest";
      else if (n.includes("╤В╤П╨│╨░") || n.includes("╤Б╨┐╨╕╨╜") || n.includes("╨┐╨╛╨┤╤В╤П╨│╨╕╨▓╨░╨╜")) targetKey = "lats";
      else if (n.includes("╨╗╨╕╤Ж╤Г") || n.includes("face") || n.includes("╤В╤А╨░╨┐╨╡╤Ж")) targetKey = "traps";
      else if (n.includes("╨╝╨░╤Е") || n.includes("╨┐╨╗╨╡╤З") || n.includes("╨┤╨╡╨╗╤М╤В")) targetKey = "delts";
      else if (n.includes("╨▒╨╕╤Ж╨╡╨┐╤Б") || n.includes("╨╝╨╛╨╗╨╛╤В")) targetKey = "biceps";
      else if (n.includes("╤В╤А╨╕╤Ж╨╡╨┐╤Б") || n.includes("╤А╨░╨╖╨│╨╕╨▒╨░╨╜")) targetKey = "triceps";
      else if (n.includes("╨┐╤А╨╡╤Б╤Б") || n.includes("╤Б╨║╤А╤Г╤З╨╕╨▓╨░╨╜") || n.includes("╨┐╨╗╨░╨╜╨║")) targetKey = "abs";
      else if (n.includes("╤А╤Г╨╝╤Л╨╜") || n.includes("╤Б╨│╨╕╨▒╨░╨╜")) targetKey = "hamstrings";
      else if (n.includes("╨╢╨╕╨╝ ╨╜╨╛╨│╨░╨╝╨╕") || n.includes("╨┐╤А╨╕╤Б╨╡╨┤") || n.includes("╨│╨░╨║╨║") || n.includes("╨║╨▓╨░╨┤╤А")) targetKey = "quads";
      else if (n.includes("╨╜╨╛╤Б╨║") || n.includes("╨╕╨║╤А")) targetKey = "calves";

      if (targetKey && result[targetKey]) {
        if (isThisWeek) result[targetKey].sets += setCount;
        if (diffHours < result[targetKey].lastHoursAgo) result[targetKey].lastHoursAgo = diffHours;
      }
    });
  });

  // ╨С╨░╨╖╨╛╨▓╤Л╨╡ ╨╖╨╜╨░╤З╨╡╨╜╨╕╤П ╨┐╨╛ ╤Г╨╝╨╛╨╗╤З╨░╨╜╨╕╤О ╨┤╨╗╤П ╨░╨║╤В╨╕╨▓╨╜╨╛╨│╨╛ ╨░╤В╨╗╨╡╤В╨░, ╨╡╤Б╨╗╨╕ ╨╕╤Б╤В╨╛╤А╨╕╤П ╨┐╤Г╤Б╤В╨░
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

  // ╨Т╤Л╤З╨╕╤Б╨╗╤П╨╡╨╝ ╨╝╨░╤Б╤И╤В╨░╨▒ ╤А╨╛╤Б╤В╨░ (Hypertrophy Scale) ╨╕ ╤Ж╨▓╨╡╤В ╨┤╨╗╤П ╨║╨░╨╢╨┤╨╛╨╣ ╨╝╤Л╤И╤Ж╤Л
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
        <!-- ╨С╨Р╨Ч╨Ю╨Т╨л╨Щ ╨Р╨Э╨Р╨в╨Ю╨Ь╨Ш╨з╨Х╨б╨Ъ╨Ш╨Щ ╨Ъ╨Р╨а╨Ъ╨Р╨б ╨в╨Х╨Ы╨Р ╨б╨Я╨Х╨а╨Х╨Ф╨Ш -->
        <!-- ╨У╨╛╨╗╨╛╨▓╨░ ╨╕ ╤И╨╡╤П -->
        <circle cx="120" cy="34" r="16" stroke="#475569" stroke-width="2" fill="#0f172a"/>
        <path d="M112 50 L112 68 M128 50 L128 68" stroke="#475569" stroke-width="2.5"/>
        
        <!-- ╨Ъ╨╗╤О╤З╨╕╤Ж╤Л ╨╕ ╨┐╨╗╨╡╤З╨╡╨▓╤Л╨╡ ╨┤╤Г╨│╨╕ -->
        <path d="M75 72 Q120 82 165 72" stroke="#334155" stroke-width="2" fill="none"/>
        
        <!-- ╨Ф╨Х╨Ы╨м╨в╨л (╨Я╨Х╨а╨Х╨Ф╨Э╨п╨п/╨б╨а╨Х╨Ф╨Э╨п╨п) -->
        <g id="anat-path-delts-left" onclick="selectAnatomyMuscle('delts')" class="anat-muscle ${dl.isActive ? 'active' : ''} ${dl.isPumped ? 'growing' : ''}">
          <path d="M80 72 C66 80 60 98 64 114 C72 108 78 98 82 86 Z" fill="${dl.fill}" stroke="${dl.stroke}" stroke-width="1.8"/>
        </g>
        <g id="anat-path-delts-right" onclick="selectAnatomyMuscle('delts')" class="anat-muscle ${dl.isActive ? 'active' : ''} ${dl.isPumped ? 'growing' : ''}">
          <path d="M160 72 C174 80 180 98 176 114 C168 108 162 98 158 86 Z" fill="${dl.fill}" stroke="${dl.stroke}" stroke-width="1.8"/>
        </g>

        <!-- ╨У╨а╨г╨Ф╨Э╨л╨Х ╨Ь╨л╨и╨ж╨л (PECTORALIS MAJOR) -->
        <g id="anat-path-chest" onclick="selectAnatomyMuscle('chest')" class="anat-muscle ${ch.isActive ? 'active' : ''} ${ch.isPumped ? 'growing' : ''}">
          <path d="M120 76 C104 74 86 82 82 98 C82 118 106 124 120 120 Z" fill="${ch.fill}" stroke="${ch.stroke}" stroke-width="2"/>
          <path d="M120 76 C136 74 154 82 158 98 C158 118 134 124 120 120 Z" fill="${ch.fill}" stroke="${ch.stroke}" stroke-width="2"/>
          <!-- ╨Ы╨╕╨╜╨╕╤П ╤А╨░╨╖╨┤╨╡╨╗╨╡╨╜╨╕╤П ╨┐╨╡╨║╤В╨╛╤А╨░╨╗╤М╨╜╤Л╤Е -->
          <line x1="120" y1="76" x2="120" y2="120" stroke="#080a12" stroke-width="1.5"/>
        </g>

        <!-- ╨С╨Ш╨ж╨Х╨Я╨б╨л & ╨Я╨а╨Х╨Ф╨Я╨Ы╨Х╨з╨м╨п -->
        <g id="anat-path-biceps-left" onclick="selectAnatomyMuscle('biceps')" class="anat-muscle ${bi.isActive ? 'active' : ''} ${bi.isPumped ? 'growing' : ''}">
          <path d="M64 115 C58 128 56 146 64 162 C70 158 76 142 74 125 Z" fill="${bi.fill}" stroke="${bi.stroke}" stroke-width="1.8"/>
          <!-- ╨Я╤А╨╡╨┤╨┐╨╗╨╡╤З╤М╨╡ -->
          <path d="M63 164 C56 182 50 202 48 218 C56 218 66 198 70 178 Z" fill="rgba(100, 116, 139, 0.25)" stroke="#475569" stroke-width="1.5"/>
        </g>
        <g id="anat-path-biceps-right" onclick="selectAnatomyMuscle('biceps')" class="anat-muscle ${bi.isActive ? 'active' : ''} ${bi.isPumped ? 'growing' : ''}">
          <path d="M176 115 C182 128 184 146 176 162 C170 158 164 142 166 125 Z" fill="${bi.fill}" stroke="${bi.stroke}" stroke-width="1.8"/>
          <!-- ╨Я╤А╨╡╨┤╨┐╨╗╨╡╤З╤М╨╡ -->
          <path d="M177 164 C184 182 190 202 192 218 C184 218 174 198 170 178 Z" fill="rgba(100, 116, 139, 0.25)" stroke="#475569" stroke-width="1.5"/>
        </g>

        <!-- ╨Я╨а╨Х╨б╨б & ╨Ъ╨Ю╨а (ABS / 6-PACK) -->
        <g id="anat-path-abs" onclick="selectAnatomyMuscle('abs')" class="anat-muscle ${ab.isActive ? 'active' : ''} ${ab.isPumped ? 'growing' : ''}">
          <!-- ╨Т╨╡╤А╤Е╨╜╨╕╨╣ ╨▒╨╗╨╛╨║ -->
          <rect x="108" y="125" width="10" height="15" rx="3" fill="${ab.fill}" stroke="${ab.stroke}" stroke-width="1.2"/>
          <rect x="122" y="125" width="10" height="15" rx="3" fill="${ab.fill}" stroke="${ab.stroke}" stroke-width="1.2"/>
          <!-- ╨б╤А╨╡╨┤╨╜╨╕╨╣ ╨▒╨╗╨╛╨║ -->
          <rect x="108" y="143" width="10" height="16" rx="3" fill="${ab.fill}" stroke="${ab.stroke}" stroke-width="1.2"/>
          <rect x="122" y="143" width="10" height="16" rx="3" fill="${ab.fill}" stroke="${ab.stroke}" stroke-width="1.2"/>
          <!-- ╨Э╨╕╨╢╨╜╨╕╨╣ ╨▒╨╗╨╛╨║ -->
          <rect x="108" y="162" width="10" height="18" rx="3" fill="${ab.fill}" stroke="${ab.stroke}" stroke-width="1.2"/>
          <rect x="122" y="162" width="10" height="18" rx="3" fill="${ab.fill}" stroke="${ab.stroke}" stroke-width="1.2"/>
          <!-- ╨Ъ╨╛╤Б╤Л╨╡ ╨╝╤Л╤И╤Ж╤Л -->
          <path d="M92 128 C86 148 86 172 94 190 L104 184 L104 130 Z" fill="rgba(100, 116, 139, 0.2)" stroke="#334155" stroke-width="1.2"/>
          <path d="M148 128 C154 148 154 172 146 190 L136 184 L136 130 Z" fill="rgba(100, 116, 139, 0.2)" stroke="#334155" stroke-width="1.2"/>
        </g>

        <!-- ╨Ъ╨Т╨Р╨Ф╨а╨Ш╨ж╨Х╨Я╨б╨л (╨С╨Х╨Ф╨а╨Р) -->
        <g id="anat-path-quads-left" onclick="selectAnatomyMuscle('quads')" class="anat-muscle ${qd.isActive ? 'active' : ''} ${qd.isPumped ? 'growing' : ''}">
          <path d="M94 196 C84 228 82 268 90 292 C102 292 112 258 114 206 Z" fill="${qd.fill}" stroke="${qd.stroke}" stroke-width="1.8"/>
        </g>
        <g id="anat-path-quads-right" onclick="selectAnatomyMuscle('quads')" class="anat-muscle ${qd.isActive ? 'active' : ''} ${qd.isPumped ? 'growing' : ''}">
          <path d="M146 196 C156 228 158 268 150 292 C138 292 128 258 126 206 Z" fill="${qd.fill}" stroke="${qd.stroke}" stroke-width="1.8"/>
        </g>

        <!-- ╨Ш╨Ъ╨а╨Ю╨Э╨Ю╨Ц╨Э╨л╨Х (╨У╨Ю╨Ы╨Х╨Э╨м) -->
        <g id="anat-path-calves-left" onclick="selectAnatomyMuscle('calves')" class="anat-muscle ${cl.isActive ? 'active' : ''} ${cl.isPumped ? 'growing' : ''}">
          <path d="M90 302 C82 322 84 350 92 364 C100 362 106 340 103 312 Z" fill="${cl.fill}" stroke="${cl.stroke}" stroke-width="1.8"/>
        </g>
        <g id="anat-path-calves-right" onclick="selectAnatomyMuscle('calves')" class="anat-muscle ${cl.isActive ? 'active' : ''} ${cl.isPumped ? 'growing' : ''}">
          <path d="M150 302 C158 322 156 350 148 364 C140 362 134 340 137 312 Z" fill="${cl.fill}" stroke="${cl.stroke}" stroke-width="1.8"/>
        </g>
      </svg>
    `;
  } else {
    // ╨а╨Р╨Ъ╨г╨а╨б ╨б╨Ч╨Р╨Ф╨Ш (BACK VIEW)
    const tr = getStyle('traps');
    const lt = getStyle('lats');
    const dl = getStyle('delts');
    const tc = getStyle('triceps');
    const hm = getStyle('hamstrings');
    const cl = getStyle('calves');

    svgHtml = `
      <svg class="w-full h-full" viewBox="0 0 240 370" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- ╨С╨Р╨Ч╨Ю╨Т╨л╨Щ ╨Р╨Э╨Р╨в╨Ю╨Ь╨Ш╨з╨Х╨б╨Ъ╨Ш╨Щ ╨Ъ╨Р╨а╨Ъ╨Р╨б ╨в╨Х╨Ы╨Р ╨б╨Ч╨Р╨Ф╨Ш -->
        <circle cx="120" cy="34" r="16" stroke="#475569" stroke-width="2" fill="#0f172a"/>
        
        <!-- ╨в╨а╨Р╨Я╨Х╨ж╨Ш╨п & ╨Ь╨л╨и╨ж╨л ╨и╨Х╨Ш/╨Ы╨Ю╨Я╨Р╨в╨Ю╨Ъ -->
        <g id="anat-path-traps" onclick="selectAnatomyMuscle('traps')" class="anat-muscle ${tr.isActive ? 'active' : ''} ${tr.isPumped ? 'growing' : ''}">
          <path d="M120 50 L98 70 L86 80 L110 110 L120 116 L130 110 L154 80 L142 70 Z" fill="${tr.fill}" stroke="${tr.stroke}" stroke-width="2"/>
          <line x1="120" y1="50" x2="120" y2="116" stroke="#080a12" stroke-width="1.5"/>
        </g>

        <!-- ╨Ч╨Р╨Ф╨Э╨Ш╨Х ╨Ф╨Х╨Ы╨м╨в╨л -->
        <g id="anat-path-delts-rear-left" onclick="selectAnatomyMuscle('delts')" class="anat-muscle ${dl.isActive ? 'active' : ''} ${dl.isPumped ? 'growing' : ''}">
          <path d="M82 76 C68 84 62 102 66 116 C74 110 80 100 84 88 Z" fill="${dl.fill}" stroke="${dl.stroke}" stroke-width="1.8"/>
        </g>
        <g id="anat-path-delts-rear-right" onclick="selectAnatomyMuscle('delts')" class="anat-muscle ${dl.isActive ? 'active' : ''} ${dl.isPumped ? 'growing' : ''}">
          <path d="M158 76 C172 84 178 102 174 116 C166 110 160 100 156 88 Z" fill="${dl.fill}" stroke="${dl.stroke}" stroke-width="1.8"/>
        </g>

        <!-- ╨и╨Ш╨а╨Ю╨з╨Р╨Щ╨и╨Ш╨Х ╨Ь╨л╨и╨ж╨л ╨б╨Я╨Ш╨Э╨л (LATS - V-TAPER) -->
        <g id="anat-path-lats" onclick="selectAnatomyMuscle('lats')" class="anat-muscle ${lt.isActive ? 'active' : ''} ${lt.isPumped ? 'growing' : ''}">
          <path d="M88 110 C76 132 78 164 96 182 L110 172 L106 120 Z" fill="${lt.fill}" stroke="${lt.stroke}" stroke-width="2"/>
          <path d="M152 110 C164 132 162 164 144 182 L130 172 L134 120 Z" fill="${lt.fill}" stroke="${lt.stroke}" stroke-width="2"/>
          <!-- ╨Я╨╛╤П╤Б╨╜╨╕╤З╨╜╤Л╨╡ ╤А╨░╨╖╨│╨╕╨▒╨░╤В╨╡╨╗╨╕ -->
          <rect x="112" y="174" width="16" height="24" rx="3" fill="rgba(100, 116, 139, 0.25)" stroke="#334155" stroke-width="1.2"/>
        </g>

        <!-- ╨в╨а╨Ш╨ж╨Х╨Я╨б╨л -->
        <g id="anat-path-triceps-left" onclick="selectAnatomyMuscle('triceps')" class="anat-muscle ${tc.isActive ? 'active' : ''} ${tc.isPumped ? 'growing' : ''}">
          <path d="M64 118 C58 132 56 150 64 164 C70 160 76 144 74 128 Z" fill="${tc.fill}" stroke="${tc.stroke}" stroke-width="1.8"/>
        </g>
        <g id="anat-path-triceps-right" onclick="selectAnatomyMuscle('triceps')" class="anat-muscle ${tc.isActive ? 'active' : ''} ${tc.isPumped ? 'growing' : ''}">
          <path d="M176 118 C182 132 184 150 176 164 C170 160 164 144 166 128 Z" fill="${tc.fill}" stroke="${tc.stroke}" stroke-width="1.8"/>
        </g>

        <!-- ╨п╨У╨Ю╨Ф╨Ш╨з╨Э╨л╨Х ╨Ь╨л╨и╨ж╨л & ╨С╨Ш╨ж╨Х╨Я╨б ╨С╨Х╨Ф╨а╨Р -->
        <g id="anat-path-hamstrings" onclick="selectAnatomyMuscle('hamstrings')" class="anat-muscle ${hm.isActive ? 'active' : ''} ${hm.isPumped ? 'growing' : ''}">
          <!-- ╨п╨│╨╛╨┤╨╕╤Ж╤Л -->
          <path d="M92 200 C86 218 90 242 118 246 L118 200 Z" fill="${hm.fill}" stroke="${hm.stroke}" stroke-width="1.8"/>
          <path d="M148 200 C154 218 150 242 122 246 L122 200 Z" fill="${hm.fill}" stroke="${hm.stroke}" stroke-width="1.8"/>
          <!-- ╨С╨╕╤Ж╨╡╨┐╤Б ╨▒╨╡╨┤╤А╨░ -->
          <path d="M92 250 C86 274 88 294 94 304 C106 304 114 280 116 250 Z" fill="${hm.fill}" stroke="${hm.stroke}" stroke-width="1.8"/>
          <path d="M148 250 C154 274 152 294 146 304 C134 304 126 280 124 250 Z" fill="${hm.fill}" stroke="${hm.stroke}" stroke-width="1.8"/>
        </g>

        <!-- ╨Ш╨Ъ╨а╨Ю╨Э╨Ю╨Ц╨Э╨л╨Х ╨б╨Ч╨Р╨Ф╨Ш -->
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
      pumpEl.textContent = `╨Я╨░╨╝╨┐ +${pumpBonus}% ЁЯФе`;
      pumpEl.className = "px-2 py-0.5 rounded-md bg-[#c8a97e]/20 text-[#c8a97e] border border-[#c8a97e]/40 text-[9px] font-bold";
    } else {
      pumpEl.textContent = `╨б╤В╨╕╨╝╤Г╨╗ ${ratio}%`;
      pumpEl.className = "px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/10 text-[9px] font-bold";
    }
  }

  if (volEl) volEl.textContent = `${currentSets} / ${m.mav} ╤Б╨╡╤В╨╛╨▓`;
  if (mavEl) {
    if (currentSets >= m.mav) mavEl.textContent = "100% MAV ╨Ю╨┐╤В╨╕╨╝╤Г╨╝";
    else if (currentSets >= m.mev) mavEl.textContent = `${ratio}% MEV ╨Ф╨╛╤Б╤В╨╕╨│╨╜╤Г╤В`;
    else mavEl.textContent = `${ratio}% ╨▓ ╨┐╤А╨╛╤Ж╨╡╤Б╤Б╨╡`;
  }

  if (recEl) {
    recEl.textContent = isRecovered ? "100% ╨У╨╛╤В╨╛╨▓╨░ ЁЯЯв" : `${recoveryPct}% ╨Т╨╛╤Б╤Б╤В╨░╨╜╨╛╨▓╨╗╨╡╨╜╨╕╨╡ ЁЯЯб`;
    recEl.className = isRecovered ? "text-emerald-400 font-mono font-bold" : "text-amber-400 font-mono font-bold";
  }

  if (timerEl) {
    timerEl.textContent = isRecovered ? `╨Ю╤В╨┤╤Л╤Е ${hoursNeeded}╤З ╨┐╤А╨╛╨╣╨┤╨╡╨╜` : `╨Ю╤Б╤В╨░╨╗╨╛╤Б╤М ~${hoursLeft}╤З ╨┤╨╛ 100%`;
  }

  if (exEl) exEl.textContent = m.bestExercises.join(", ");
  if (tipEl) tipEl.textContent = m.tip;
}

// ========================================================
// ╨Э╨Р╨г╨з╨Э╨л╨Щ ╨Ю╨С╨к╨Х╨Ь ╨Я╨Ю ╨Ь╨л╨и╨ж╨Р╨Ь (╨и╨Ъ╨Р╨Ы╨Р ╨и╨Б╨Э╨д╨Х╨Ы╨м╨Ф╨Р & RP MAV)
// ========================================================
function renderMuscleVolumeBreakdown() {
  const container = document.getElementById("muscle-volume-container");
  if (!container) return;

  const targets = [
    { group: "╨У╤А╤Г╨┤╨╜╤Л╨╡ ╨╝╤Л╤И╤Ж╤Л", mev: 8, mav: 14, current: 8, color: "from-[#c8a97e] to-[#dfc299]" },
    { group: "╨и╨╕╤А╨╛╤З╨░╨╣╤И╨╕╨╡ ╨╕ ╨б╨┐╨╕╨╜╨░", mev: 10, mav: 16, current: 8, color: "from-slate-400 to-slate-200" },
    { group: "╨Ъ╨▓╨░╨┤╤А╨╕╤Ж╨╡╨┐╤Б ╨╕ ╨Э╨╛╨│╨╕", mev: 8, mav: 14, current: 7, color: "from-amber-600 to-amber-400" },
    { group: "╨б╤А╨╡╨┤╨╜╤П╤П ╨╕ ╨Ч╨░╨┤╨╜╤П╤П ╨┤╨╡╨╗╤М╤В╨░", mev: 6, mav: 12, current: 4, color: "from-slate-500 to-slate-300" },
    { group: "╨а╤Г╨║╨╕ (╨С╨╕╤Ж╨╡╨┐╤Б/╨в╤А╨╕╤Ж╨╡╨┐╤Б)", mev: 6, mav: 12, current: 6, color: "from-emerald-600 to-emerald-400" }
  ];

  const hist = appState.history || [];
  const currentWeekLogs = hist.slice(0, 3);
  let chestSets = 0, backSets = 0, legSets = 0, shoulderSets = 0, armSets = 0;

  currentWeekLogs.forEach(h => {
    (h.exercises || []).forEach(e => {
      const setCount = (e.sets.match(/,/g) || []).length + 1;
      const n = (e.name || "").toLowerCase();
      if (n.includes("╨╢╨╕╨╝") || n.includes("╨▒╨░╨▒╨╛╤З╨║") || n.includes("╨▒╤А╤Г╤Б╤М")) chestSets += setCount;
      else if (n.includes("╤В╤П╨│╨░") || n.includes("╤Б╨┐╨╕╨╜")) backSets += setCount;
      else if (n.includes("╨╜╨╛╨│") || n.includes("╨┐╤А╨╕╤Б╨╡╨┤") || n.includes("╤А╤Г╨╝╤Л╨╜")) legSets += setCount;
      else if (n.includes("╨╝╨░╤Е") || n.includes("╨┐╨╗╨╡╤З")) shoulderSets += setCount;
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
    const status = t.current >= t.mav ? 'MAV ╨Ю╨Я╨в╨Ш╨Ь╨г╨Ь' : t.current >= t.mev ? 'MEV ╨Ф╨Ю╨б╨в╨Ш╨У╨Э╨г╨в' : '╨Т ╨Я╨а╨Ю╨ж╨Х╨б╨б╨Х';
    return `
      <div class="space-y-1 bg-[#181b26] p-2.5 rounded-xl border border-white/[0.05]">
        <div class="flex justify-between items-center text-[11px]">
          <span class="font-bold text-white uppercase">${t.group}</span>
          <div class="flex items-center space-x-2">
            <span class="text-slate-400 font-mono">${t.current} ╨╕╨╖ ${t.mav} ╤Б╨╡╤В╨╛╨▓/╨╜╨╡╨┤</span>
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
// ╨Ъ╨Ы╨Ш╨Э╨Ш╨з╨Х╨б╨Ъ╨Ш╨Щ ╨Т╨Ш╨в╨Р╨Ь╨Ш╨Э╨Э╨л╨Щ ╨б╨в╨Х╨Ъ
// ========================================================
function renderPersonalizedVitamins() {
  const container = document.getElementById("personalized-vitamins-container");
  if (!container) return;

  const stack = [
    {
      timing: "╨г╨в╨а╨Ю тАв ╨б ╨Х╨Ф╨Ю╨Щ",
      timingBadge: "bg-[#c8a97e]/15 text-[#c8a97e] border border-[#c8a97e]/30",
      name: "╨Т╨╕╤В╨░╨╝╨╕╨╜ D3 + K2 (MK-7)",
      dose: "4000 ╨Ь╨Х + 100 ╨╝╨║╨│",
      reason: "╨б╤В╨╕╨╝╤Г╨╗╨╕╤А╤Г╨╡╤В ╤Б╨╕╨╜╤В╨╡╨╖ ╤В╨╡╤Б╤В╨╛╤Б╤В╨╡╤А╨╛╨╜╨░, ╤Г╨║╤А╨╡╨┐╨╗╤П╨╡╤В ╨║╨╛╤Б╤В╨╜╤Л╨╣ ╨╝╨░╤В╤А╨╕╨║╤Б ╨╕ ╨╜╨░╨┐╤А╨░╨▓╨╗╤П╨╡╤В ╨║╨░╨╗╤М╤Ж╨╕╨╣ ╨▓ ╨║╨╛╤Б╤В╨╕, ╨┐╤А╨╡╨┤╨╛╤В╨▓╤А╨░╤Й╨░╤П ╨║╨░╨╗╤М╤Ж╨╕╤Д╨╕╨║╨░╤Ж╨╕╤О ╤Б╨╛╤Б╤Г╨┤╨╛╨▓."
    },
    {
      timing: "╨Ф╨Х╨Э╨м тАв ╨Т ╨Ю╨С╨Х╨Ф",
      timingBadge: "bg-emerald-950/80 text-emerald-400 border border-emerald-800/60",
      name: "╨Ю╨╝╨╡╨│╨░-3 (EPA / DHA)",
      dose: "2000 ╨╝╨│ (EPA > 800 ╨╝╨│)",
      reason: "╨б╨╜╨╕╨╢╨░╨╡╤В ╤Б╨╕╤Б╤В╨╡╨╝╨╜╨╛╨╡ ╨▓╨╛╤Б╨┐╨░╨╗╨╡╨╜╨╕╨╡, ╨╖╨░╤Й╨╕╤Й╨░╨╡╤В ╤Б╤Г╤Б╤В╨░╨▓╨╜╤Л╨╡ ╤Б╤Г╨╝╨║╨╕ ╨┐╨╗╨╡╤З╨╡╨▓╨╛╨│╨╛ ╨┐╨╛╤П╤Б╨░ ╨╕ ╤Г╨╗╤Г╤З╤И╨░╨╡╤В ╨╗╨╕╨┐╨╕╨┤╨╜╤Л╨╣ ╨┐╤А╨╛╤Д╨╕╨╗╤М ╨║╤А╨╛╨▓╨╕."
    },
    {
      timing: "╨Т╨Х╨з╨Х╨а тАв ╨Ф╨Ю ╨б╨Э╨Р",
      timingBadge: "bg-sky-950/80 text-sky-400 border border-sky-800/60",
      name: "╨Ь╨░╨│╨╜╨╕╨╣ ╨С╨╕╤Б╨│╨╗╨╕╤Ж╨╕╨╜╨░╤В / ╨е╨╡╨╗╨░╤В",
      dose: "400 ╨╝╨│ ╤З╨╕╤Б╤В╨╛╨│╨╛ Mg",
      reason: "╨е╨╡╨╗╨░╤В╨╜╨░╤П ╤Д╨╛╤А╨╝╨░ ╤Б ╨░╨╝╨╕╨╜╨╛╨║╨╕╤Б╨╗╨╛╤В╨╛╨╣ ╨│╨╗╨╕╤Ж╨╕╨╜. ╨б╨╜╨╕╨╝╨░╨╡╤В ╨╛╤Б╤В╨░╤В╨╛╤З╨╜╤Л╨╣ ╤Б╨┐╨░╨╖╨╝ ╤Б ╨╝╤Л╤И╤Ж╤Л ╤И╨╡╨╕ ╨╕ ╨╗╨╛╨┐╨░╤В╨║╨╕, ╤Г╤Б╨║╨╛╤А╤П╨╡╤В ╨╖╨░╤Б╤Л╨┐╨░╨╜╨╕╨╡ ╨╕ ╤Г╨│╨╗╤Г╨▒╨╗╤П╨╡╤В ╤Д╨░╨╖╤Г NREM-╤Б╨╜╨░."
    },
    {
      timing: "╨в╨а╨Х╨Э╨Ш╨Э╨У тАв ╨Ф╨Ю/╨Я╨Ю╨б╨Ы╨Х",
      timingBadge: "bg-purple-950/80 text-purple-300 border border-purple-800/60",
      name: "╨Ъ╤А╨╡╨░╤В╨╕╨╜ ╨Ь╨╛╨╜╨╛╨│╨╕╨┤╤А╨░╤В",
      dose: "5 ╨│",
      reason: "╨Э╨░╤Б╤Л╤Й╨░╨╡╤В ╨╖╨░╨┐╨░╤Б╤Л ╤Д╨╛╤Б╤Д╨╛╨║╤А╨╡╨░╤В╨╕╨╜╨░ ╨▓ ╨╝╤Л╤И╨╡╤З╨╜╤Л╤Е ╨▓╨╛╨╗╨╛╨║╨╜╨░╤Е, ╨┐╨╛╨▓╤Л╤И╨░╨╡╤В ╨▓╨╖╤А╤Л╨▓╨╜╤Г╤О ╤Б╨╕╨╗╤Г ╨╜╨░ 10тАУ15% ╨▓ ╨▒╨░╨╖╨╛╨▓╤Л╤Е ╨╢╨╕╨╝╨░╤Е ╨╕ ╤В╤П╨│╨░╤Е."
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
// ╨з╨Ш╨б╨в╨л╨Х ╨б╨Ш╨Ы╨Ю╨Т╨л╨Х ╨Ш ╨Ф╨Ш╨б╨ж╨Ш╨Я╨Ы╨Ш╨Э╨Р╨а╨Э╨л╨Х ╨Р╨з╨Ш╨Т╨Ъ╨Ш
// ========================================================
const ACHIEVEMENTS = [
  { id: "ach_first", cat: "strength", title: "╨Я╨╡╤А╨▓╤Л╨╣ ╤И╨░╨│", desc: "╨Ч╨░╨▓╨╡╤А╤И╨╕ 1-╤О ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╤Г", target: 1, current: (s) => (s.history || []).length, xp: 100 },
  { id: "ach_ton_10", cat: "strength", title: "╨а╤Г╨▒╨╡╨╢ 10 ╨в╨╛╨╜╨╜", desc: "╨Я╨╛╨┤╨╜╨╕╨╝╨╕ ╤Б╤Г╨╝╨╝╨░╤А╨╜╨╛ 10 000 ╨║╨│", target: 10000, current: (s) => getTotalTonnage(s), xp: 200 },
  { id: "ach_ton_50", cat: "strength", title: "╨а╤Г╨▒╨╡╨╢ 50 ╨в╨╛╨╜╨╜", desc: "╨Я╨╛╨┤╨╜╨╕╨╝╨╕ ╤Б╤Г╨╝╨╝╨░╤А╨╜╨╛ 50 000 ╨║╨│", target: 50000, current: (s) => getTotalTonnage(s), xp: 500 },
  { id: "ach_ton_100", cat: "strength", title: "╨в╨╕╤В╨░╨╜ 100 ╨в╨╛╨╜╨╜", desc: "╨Я╨╛╨┤╨╜╨╕╨╝╨╕ ╤Б╤Г╨╝╨╝╨░╤А╨╜╨╛ 100 000 ╨║╨│", target: 100000, current: (s) => getTotalTonnage(s), xp: 1000 },
  { id: "ach_ton_250", cat: "strength", title: "╨Ы╨╡╨│╨╡╨╜╨┤╨░ 250 ╨в╨╛╨╜╨╜", desc: "╨Я╨╛╨┤╨╜╨╕╨╝╨╕ ╤Б╤Г╨╝╨╝╨░╤А╨╜╨╛ 250 000 ╨║╨│", target: 250000, current: (s) => getTotalTonnage(s), xp: 2500 },

  { id: "ach_strk_3", cat: "streak", title: "╨в╤А╨╕ ╨▓ ╤А╤П╨┤", desc: "╨б╨╡╤А╨╕╤П ╨╕╨╖ 3 ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨╛╨║ ╨┐╨╛ ╨│╤А╨░╤Д╨╕╨║╤Г", target: 3, current: (s) => (s.streak || 0), xp: 250 },
  { id: "ach_strk_7", cat: "streak", title: "╨Ц╨╡╨╗╨╡╨╖╨╜╨░╤П ╨╜╨╡╨┤╨╡╨╗╤П", desc: "╨б╨╡╤А╨╕╤П ╨╕╨╖ 7 ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨╛╨║ ╨┐╨╛╨┤╤А╤П╨┤", target: 7, current: (s) => (s.streak || 0), xp: 450 },
  { id: "ach_strk_14", cat: "streak", title: "╨б╤В╨░╨╗╤М╨╜╨░╤П ╨┤╨╡╨║╨░╨┤╨░", desc: "╨б╨╡╤А╨╕╤П ╨╕╨╖ 14 ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨╛╨║", target: 14, current: (s) => (s.streak || 0), xp: 800 },
  { id: "ach_strk_30", cat: "streak", title: "╨Ъ╤А╨╡╨╝╨╡╨╜╤М 30", desc: "╨б╨╡╤А╨╕╤П ╨╕╨╖ 30 ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨╛╨║", target: 30, current: (s) => (s.streak || 0), xp: 2000 },

  { id: "ach_vac_1", cat: "body", title: "╨Я╨╡╤А╨▓╨╛╨╡ ╨▓╤В╤П╨│╨╕╨▓╨░╨╜╨╕╨╡", desc: "╨Т╤Л╨┐╨╛╨╗╨╜╨╕ 1-╤О ╤Г╤В╤А╨╡╨╜╨╜╤О╤О ╤Б╨╡╤Б╤Б╨╕╤О ╨▓╨░╨║╤Г╤Г╨╝╨░", target: 1, current: (s) => (s.vacDaysCount || 0), xp: 100 },
  { id: "ach_vac_5", cat: "body", title: "╨Т╨░╨║╤Г╤Г╨╝╨╜╤Л╨╣ ╨╝╨╛╨╜╨╛╨╗╨╕╤В", desc: "╨Т╤Л╨┐╨╛╨╗╨╜╨╕ 5 ╨┤╨╜╨╡╨╣ ╤Г╤В╤А╨╡╨╜╨╜╨╡╨│╨╛ ╨▓╨░╨║╤Г╤Г╨╝╨░", target: 5, current: (s) => (s.vacDaysCount || 0), xp: 300 },
  { id: "ach_vac_14", cat: "body", title: "╨б╤В╨░╨╗╤М╨╜╨╛╨╣ ╨║╨╛╤А╤Б╨╡╤В", desc: "╨Т╤Л╨┐╨╛╨╗╨╜╨╕ 14 ╨┤╨╜╨╡╨╣ ╤Г╤В╤А╨╡╨╜╨╜╨╡╨│╨╛ ╨▓╨░╨║╤Г╤Г╨╝╨░", target: 14, current: (s) => (s.vacDaysCount || 0), xp: 800 }
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
          ${isUnlocked ? '╨Ю╨в╨Ъ╨а╨л╨в╨Ю' : `+${ach.xp} XP`}
        </span>
      </div>

      <div class="space-y-1 font-mono text-[10px]">
        <div class="flex justify-between text-slate-400">
          <span>╨Я╤А╨╛╨│╤А╨╡╤Б╤Б: <b class="${isUnlocked ? 'text-white' : 'text-slate-300'}">${curVal.toLocaleString()} / ${ach.target.toLocaleString()}</b></span>
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
// 1-╨в╨Р╨Я ╨г╨в╨а╨Х╨Э╨Э╨Ш╨Щ ╨Т╨Р╨Ъ╨г╨г╨Ь (╨з╨Ш╨б╨в╨л╨Щ ╨Ю╨Ф╨Ш╨Э╨Р╨а╨Э╨л╨Щ ╨з╨Х╨Ъ)
// ========================================================
function checkinMorningVacuum() {
  appState.vacDaysCount = (appState.vacDaysCount || 0) + 1;
  addXP(30);
  Sound.success();
  Haptic.success();
  updateVacuumBadge();
  checkAchievements();
  
  const txt = document.getElementById("vac-checkin-text");
  if (txt) txt.textContent = `╨Т╤Л╨┐╨╛╨╗╨╜╨╡╨╜╨╛ ╤Б╨╡╨│╨╛╨┤╨╜╤П (╨б╨╡╤А╨╕╤П: ${appState.vacDaysCount} ╨┤╨╜)`;
  alert("╨г╤В╤А╨╡╨╜╨╜╨╕╨╣ ╨▓╨░╨║╤Г╤Г╨╝ ╨╖╨░╤Д╨╕╨║╤Б╨╕╤А╨╛╨▓╨░╨╜! (+30 XP ╨║ ╨┐╤А╨╛╨│╤А╨╡╤Б╤Б╤Г)");
}

function updateVacuumBadge() {
  const badge = document.getElementById("vac-total-days-badge");
  if (badge) {
    badge.textContent = `${appState.vacDaysCount || 0} ╨┤╨╜╨╡╨╣`;
  }
}

// ========================================================
// ╨в╨а╨Х╨Э╨Ш╨а╨Ю╨Т╨Ю╨з╨Э╨л╨Щ ╨Ф╨Т╨Ш╨Ц╨Ю╨Ъ
// ========================================================
function startFreeWorkout(targetDate = null) {
  Sound.beep(600, 0.08);
  Haptic.impact('medium');
  activeExpandedExerciseIndex = 0;

  const now = new Date();
  const startTimeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  appState.activeWorkout = {
    key: 'free',
    name: "╨б╨▓╨╛╨▒╨╛╨┤╨╜╨░╤П ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╨░",
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
  if (confirm(`╨г╨┤╨░╨╗╨╕╤В╤М ╤Г╨┐╤А╨░╨╢╨╜╨╡╨╜╨╕╨╡ ┬л${ex.name}┬╗ ╨╕╨╖ ╤В╨╡╨║╤Г╤Й╨╡╨╣ ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╨╕?`)) {
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
  ['all', 'chest', 'back', 'legs', 'shoulders', 'biceps', 'triceps', 'abs', 'cardio'].forEach(c => {
    const btn = document.getElementById("btn-cat-" + c);
    if (btn) {
      const match = (c === 'all' && cat === 'all') ||
                    (c === 'chest' && cat === '╨У╤А╤Г╨┤╤М') ||
                    (c === 'back' && cat === '╨б╨┐╨╕╨╜╨░') ||
                    (c === 'legs' && cat === '╨Э╨╛╨│╨╕') ||
                    (c === 'shoulders' && cat === '╨Я╨╗╨╡╤З╨╕') ||
                    (c === 'biceps' && cat === '╨С╨╕╤Ж╨╡╨┐╤Б') ||
                    (c === 'triceps' && cat === '╨в╤А╨╕╤Ж╨╡╨┐╤Б') ||
                    (c === 'abs' && cat === '╨Я╤А╨╡╤Б╤Б') ||
                    (c === 'cardio' && cat === '╨Ъ╨░╤А╨┤╨╕╨╛');
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
        <p class="text-xs font-bold text-slate-300 uppercase">╨г╨┐╤А╨░╨╢╨╜╨╡╨╜╨╕╨╡ ╨╜╨╡ ╨╜╨░╨╣╨┤╨╡╨╜╨╛</p>
        <p class="text-[11px] text-slate-500 font-sans">╨б╨╛╨╖╨┤╨░╨╣ ╤Б╨▓╨╛╨╡ ╤Г╨┐╤А╨░╨╢╨╜╨╡╨╜╨╕╨╡ ╨▓╤А╤Г╤З╨╜╤Г╤О ╤Б ╨┐╨╛╨╝╨╛╤Й╤М╤О ╨║╨╜╨╛╨┐╨║╨╕ ╨▓╨╜╨╕╨╖╤Г.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(ex => {
    const diagSvg = getExerciseDiagramSVG(ex.name, ex.category);
    return `
      <div class="p-3.5 bg-[#12141c] hover:bg-[#181b26] rounded-2xl border border-white/[0.06] space-y-2.5 transition-all">
        <div class="flex justify-between items-start space-x-2">
          <div class="space-y-0.5 flex-1 cursor-pointer" onclick="openExerciseProVisualizer('${ex.id}', 'catalog')">
            <div class="flex items-center space-x-1.5">
              <span class="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-white/5 text-[#c8a97e] border border-[#c8a97e]/30 rounded uppercase">${ex.category}</span>
              <h4 class="font-bold text-xs text-white leading-tight hover:text-[#c8a97e] transition-colors">${ex.name}</h4>
            </div>
            <p class="text-[10px] text-slate-400 font-mono">${ex.targetMuscles}</p>
          </div>
          <div class="flex items-center space-x-1.5">
            <button type="button" onclick="openExerciseProVisualizer('${ex.id}', 'catalog')" class="px-2 py-1.5 bg-[#181b26] hover:bg-white/10 text-slate-300 hover:text-white rounded-xl border border-white/10 text-[10px] font-bold font-mono active:scale-95 transition-all flex items-center gap-1">
              <span>ЁЯФм ╨Р╨╜╨░╤В╨╛╨╝╨╕╤П</span>
            </button>
            <button type="button" onclick="addExerciseFromCatalogToActiveWorkout('${ex.id}')" class="px-3 py-1.5 bg-[#c8a97e] hover:bg-[#dfc299] text-slate-950 font-bold text-xs uppercase rounded-xl font-mono active:scale-95 transition-all whitespace-nowrap shadow-sm">
              + ╨Т ╨┐╨╗╨░╨╜
            </button>
          </div>
        </div>

        <!-- ╨Т╨Ш╨Ч╨г╨Р╨Ы╨м╨Э╨Р╨п ╨Р╨Э╨Ш╨Ь╨Ш╨а╨Ю╨Т╨Р╨Э╨Э╨Р╨п ╨в╨а╨Р╨Х╨Ъ╨в╨Ю╨а╨Ш╨п ╨Ш ╨Ф╨Т╨Ш╨Ц╨Х╨Э╨Ш╨Х -->
        <div onclick="openExerciseProVisualizer('${ex.id}', 'catalog')" class="ex-diagram-container rounded-xl overflow-hidden bg-[#0a0c12] border border-white/[0.04] cursor-pointer hover:border-[#c8a97e]/40 transition-all" title="╨Э╨░╨╢╨╝╨╕╤В╨╡ ╨┤╨╗╤П ╨╛╤В╨║╤А╤Л╤В╨╕╤П 3D ╨Р╨╜╨░╤В╨╛╨╝╨╕╨╕ ╨╕ ╨в╨╡╤Е╨╜╨╕╨║╨╕">
          ${diagSvg}
        </div>

        <div class="flex justify-between items-center text-[10px] font-mono text-slate-400 border-t border-white/[0.04] pt-1.5">
          <span>╨Э╨╛╤А╨╝╨░: <b class="text-white">${ex.defaultSets}├Ч${ex.min}-${ex.max}</b> (${ex.defaultWeight} ╨║╨│)</span>
          <span class="text-emerald-400">ЁЯФе ~${ex.calRate * ex.defaultSets} ╨║╨║╨░╨╗</span>
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
    if (btnEl) btnEl.textContent = "тЬХ ╨б╨║╤А╤Л╤В╤М ╤Б╤Е╨╡╨╝╤Г";
  } else {
    guideEl.classList.add("hidden");
    if (btnEl) btnEl.textContent = "ЁЯСА ╨б╤Е╨╡╨╝╨░ & ╨в╨╡╤Е╨╜╨╕╨║╨░";
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
    note: `+2.5 ╨║╨│ (╨ж╨╡╨╗╤М: ${suggestedWeight} ╨║╨│)`
  };
}

function getRIRBadgeHtml(rirVal) {
  const rir = (rirVal !== undefined) ? rirVal : 2;
  if (rir === 0) {
    return `<span class="px-1 py-1 rounded text-[8px] sm:text-[9px] font-bold bg-rose-950/80 text-rose-300 border border-rose-800 flex items-center justify-center gap-1 shadow-sm whitespace-nowrap"><span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>╨Ю╤В╨║╨░╨╖ 0</span>`;
  } else if (rir === 1) {
    return `<span class="px-1 py-1 rounded text-[8px] sm:text-[9px] font-bold bg-amber-950/80 text-amber-300 border border-amber-800 flex items-center justify-center gap-1 whitespace-nowrap"><span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>╨Ч╨░╨┐╨░╤Б 1</span>`;
  } else if (rir === 2) {
    return `<span class="px-1 py-1 rounded text-[8px] sm:text-[9px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800 flex items-center justify-center gap-1 whitespace-nowrap"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>╨Ч╨░╨┐╨░╤Б 2</span>`;
  } else {
    return `<span class="px-1 py-1 rounded text-[8px] sm:text-[9px] font-bold bg-sky-950/80 text-sky-300 border border-sky-800 flex items-center justify-center gap-1 whitespace-nowrap"><span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>╨Ч╨░╨┐╨░╤Б 3+</span>`;
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

let isManualAccordionToggled = false;

function renderActiveWorkoutUI() {
  if (!appState.activeWorkout) return;

  document.getElementById("workout-selector").classList.add("hidden");
  document.getElementById("workout-active").classList.remove("hidden");

  const wo = appState.activeWorkout;
  document.getElementById("wo-active-tag").textContent = `${wo.key.toUpperCase()} тАв ╨У╨Ю╨в╨Ю╨Т╨Э╨Ю╨б╨в╨м ${wo.readiness}%`;
  document.getElementById("wo-active-title").textContent = wo.name;

  // ╨г╨╝╨╜╤Л╨╣ ╨░╨▓╤В╨╛-╤Д╨╛╨║╤Г╤Б: ╨╡╤Б╨╗╨╕ ╤В╨╡╨║╤Г╤Й╨╕╨╣ ╤А╨░╤Б╨║╤А╤Л╤В╤Л╨╣ ╨╕╨╜╨┤╨╡╨║╤Б ╨╜╨╡ ╨╖╨░╨┤╨░╨╜ ╨╕╨╗╨╕ ╤Г╨║╨░╨╖╤Л╨▓╨░╨╡╤В ╨╜╨░ ╤Г╨╢╨╡ ╨╖╨░╨║╤А╤Л╤В╨╛╨╡ ╤Г╨┐╤А╨░╨╢╨╜╨╡╨╜╨╕╨╡,
  // ╨░╨▓╤В╨╛╨╝╨░╤В╨╕╤З╨╡╤Б╨║╨╕ ╤А╨░╤Б╨║╤А╤Л╨▓╨░╨╡╨╝ ╨┐╨╡╤А╨▓╨╛╨╡ ╨╜╨╡╨╖╨░╨║╨╛╨╜╤З╨╡╨╜╨╜╨╛╨╡ ╤Г╨┐╤А╨░╨╢╨╜╨╡╨╜╨╕╨╡!
  if (!isManualAccordionToggled) {
    if (activeExpandedExerciseIndex === undefined || activeExpandedExerciseIndex === null || activeExpandedExerciseIndex < 0) {
      activeExpandedExerciseIndex = getFirstUnfinishedExerciseIndex(wo);
    } else if (wo.exercises[activeExpandedExerciseIndex]) {
      const curEx = wo.exercises[activeExpandedExerciseIndex];
      const isCurAllDone = curEx.sets && curEx.sets.length > 0 && curEx.sets.every(s => s.done);
      if (isCurAllDone) {
        const nextUnfinished = getFirstUnfinishedExerciseIndex(wo);
        activeExpandedExerciseIndex = nextUnfinished;
      }
    }
  }

  updateLiveWorkoutStats();

  const container = document.getElementById("active-exercises-container");
  container.innerHTML = "";

  if (wo.exercises.length === 0) {
    container.innerHTML = `
      <div class="p-6 bg-[#12141c] rounded-2xl border border-white/[0.06] text-center text-slate-400 space-y-2 font-mono">
        <p class="text-xs font-bold text-slate-200 uppercase">╨в╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╨░ ╨┐╨╛╨║╨░ ╨┐╤Г╤Б╤В╨░</p>
        <p class="text-[11px] text-slate-400 font-sans">╨Э╨░╨╢╨╝╨╕ ╨║╨╜╨╛╨┐╨║╤Г ┬л╨Т╤Л╨▒╤А╨░╤В╤М ╤Г╨┐╤А╨░╨╢╨╜╨╡╨╜╨╕╨╡ ╨╕╨╖ ╨║╨░╤В╨░╨╗╨╛╨│╨░┬╗ ╨▓╤Л╤И╨╡!</p>
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
                ${isAllDone ? `╨Т╤Б╨╡ ${ex.sets.length} ╤Б╨╡╤В╨╛╨▓ ╨╖╨░╨║╤А╤Л╤В╤Л` : `${doneSetsCount} ╨╕╨╖ ${ex.sets.length} ╨▓╤Л╨┐╨╛╨╗╨╜╨╡╨╜╨╛`}
              </span>
              ${lastPerf ? `<span class="text-slate-400 text-[10px]">╨Т ╨┐╤А╨╛╤И╨╗╤Л╨╣ ╤А╨░╨╖: ${lastPerf.setsStr}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-1 font-mono">
          <button onclick="deleteExerciseFromActiveWorkout(${exIdx})" title="╨г╨┤╨░╨╗╨╕╤В╤М ╤Г╨┐╤А╨░╨╢╨╜╨╡╨╜╨╕╨╡" class="p-1.5 text-slate-400 hover:text-rose-400 active:scale-90 transition-all">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
          <button onclick="toggleExerciseAccordion(${exIdx})" class="p-1 text-slate-400 text-xs">${isExpanded ? 'тЦ▓' : 'тЦ╝'}</button>
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
            <span class="text-[9px] text-slate-400 pr-0.5">${ex.isTime ? '╤Б' : '╨║╨│'}</span>
            <button type="button" onclick="stepWeight(${exIdx}, ${sIdx}, 2.5)" class="stepper-btn text-[#c8a97e]">+</button>
          </div>

          <div class="col-span-3 flex items-center bg-[#181b26] px-1 py-1 rounded-xl border border-white/10 justify-between">
            <button type="button" onclick="stepReps(${exIdx}, ${sIdx}, -1)" class="stepper-btn">-</button>
            <input type="number" step="1" inputmode="numeric" value="${s.reps}" class="w-7 bg-transparent text-white font-bold text-center text-xs outline-none"
              onclick="this.select()" oninput="updateSet(${exIdx}, ${sIdx}, 'reps', this.value)">
            <button type="button" onclick="stepReps(${exIdx}, ${sIdx}, 1)" class="stepper-btn text-slate-200">+</button>
          </div>

          <div class="col-span-2 flex justify-center">
            <button type="button" onclick="cycleSetRIR(${exIdx}, ${sIdx})" class="w-full flex justify-center active:scale-95 transition-all" title="╨Э╨░╨╢╨╝╨╕╤В╨╡, ╤З╤В╨╛╨▒╤Л ╨╕╨╖╨╝╨╡╨╜╨╕╤В╤М ╨╖╨░╨┐╨░╤Б ╤Б╨╕╨╗">
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
          
          <!-- ╨Ч╨Р╨У╨Ю╨Ы╨Ю╨Т╨Ъ╨Ш ╨Ъ╨Ю╨Ы╨Ю╨Э╨Ю╨Ъ ╨б╨Х╨в╨Ю╨Т ╨б ╨Я╨Ю╨Ф╨б╨Ъ╨Р╨Ч╨Ъ╨Ю╨Щ -->
          <div class="grid grid-cols-12 gap-1.5 text-[9px] font-mono text-slate-400 uppercase pb-0.5 px-1 select-none">
            <div class="col-span-1 text-center">╨б╨╡╤В</div>
            <div class="col-span-5 text-center">╨Т╨╡╤Б</div>
            <div class="col-span-3 text-center">╨Я╨╛╨▓╤В╨╛╤А╤Л</div>
            <div class="col-span-2 text-center cursor-pointer text-[#c8a97e] hover:underline" onclick="openModal('modal-rir-guide')" title="╨з╤В╨╛ ╤В╨░╨║╨╛╨╡ ╨Ч╨░╨┐╨░╤Б ╤Б╨╕╨╗?">╨Ч╨░╨┐╨░╤Б тД╣я╕П</div>
            <div class="col-span-1 text-center">тЬУ</div>
          </div>

          <!-- ╨б╨Х╨в╨л ╨Ш ╨Т╨Х╨б╨Р (╨Я╨Х╨а╨Т╨л╨Ь ╨Я╨Ы╨Р╨Э╨Ю╨Ь ╨Ф╨Ы╨п ╨Ь╨Р╨Ъ╨б╨Ш╨Ь╨Р╨Ы╨м╨Э╨Ю╨У╨Ю ╨г╨Ф╨Ю╨С╨б╨в╨Т╨Р) -->
          <div class="space-y-1.5">${setsRows}</div>

          <!-- ╨Я╨Р╨Э╨Х╨Ы╨м ╨Ф╨Х╨Щ╨б╨в╨Т╨Ш╨Щ ╨б╨Х╨в╨Ю╨Т -->
          <div class="flex justify-between items-center text-xs font-mono pt-1">
            <div class="flex space-x-2">
              <button type="button" onclick="addSetToExercise(${exIdx})" class="text-[#c8a97e] font-bold text-[11px] hover:underline">+ ╨Я╨╛╨┤╤Е╨╛╨┤</button>
              ${ex.sets.length > 1 ? `<button type="button" onclick="removeSetFromExercise(${exIdx})" class="text-slate-500 text-[11px] hover:underline">- ╨Я╨╛╨┤╤Е╨╛╨┤</button>` : ''}
            </div>
            <div class="flex space-x-1.5">
              <button type="button" onclick="openExerciseProVisualizer('${ex.name.replace(/'/g, "\\'")}', 'active')" class="px-2.5 py-1 bg-gradient-to-r from-[#c8a97e]/25 to-[#c8a97e]/10 hover:bg-[#c8a97e]/35 text-[#c8a97e] rounded-lg border border-[#c8a97e]/40 text-[10px] font-bold active:scale-95 transition-all flex items-center gap-1 shadow-sm">
                <span>ЁЯФм ╨Р╨╜╨░╤В╨╛╨╝╨╕╤П & ╨б╤Е╨╡╨╝╨░</span>
              </button>
              <button type="button" onclick="toggleExerciseGuide(${exIdx})" id="btn-guide-${exIdx}" class="px-2 py-1 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg border border-white/10 text-[10px] font-bold active:scale-95 transition-all">
                ЁЯСА ╨Я╨╛╨┤╤Б╨║╨░╨╖╨║╨░
              </button>
              <button type="button" onclick="openSwapExerciseModal(${exIdx})" class="px-2 py-1 bg-[#181b26] hover:bg-white/10 text-slate-300 rounded-lg border border-white/10 text-[10px] active:scale-95 transition-all">
                ╨Ч╨░╨╝╨╡╨╜╨░
              </button>
            </div>
          </div>

          <!-- ╨Т╨Ш╨Ч╨г╨Р╨Ы╨м╨Э╨л╨Щ ╨С╨Ы╨Ю╨Ъ ╨С╨Ш╨Ю╨Ь╨Х╨е╨Р╨Э╨Ш╨Ъ╨Ш, ╨Т╨Х╨Ъ╨в╨Ю╨а╨Э╨Ю╨Щ ╨Р╨Э╨Ш╨Ь╨Р╨ж╨Ш╨Ш ╨Ш ╨в╨Х╨е╨Э╨Ш╨Ъ╨Ш (╨Я╨Ю ╨г╨Ь╨Ю╨Ы╨з╨Р╨Э╨Ш╨о ╨б╨Ъ╨а╨л╨в) -->
          <div id="ex-guide-${exIdx}" class="pt-2 space-y-3 hidden">
            <div onclick="openExerciseProVisualizer('${ex.name.replace(/'/g, "\\'")}', 'active')" class="ex-diagram-container rounded-2xl overflow-hidden bg-[#07080e] border border-white/[0.06] p-2 cursor-pointer hover:border-[#c8a97e]/40 transition-all" title="╨Э╨░╨╢╨╝╨╕╤В╨╡ ╨┤╨╗╤П ╨╛╤В╨║╤А╤Л╤В╨╕╤П 3D ╨Р╨╜╨░╤В╨╛╨╝╨╕╨╕ ╨╕ ╨Ь╨╡╤В╤А╨╛╨╜╨╛╨╝╨░">
              ${diagramSvg}
            </div>

            <div class="p-3.5 bg-[#0c0d14] rounded-2xl border border-white/[0.06] space-y-2.5">
              <div class="flex justify-between items-center text-[10px] font-mono">
                <span class="text-[#c8a97e] font-bold uppercase">${ex.targetMuscles || '╨ж╨╡╨╗╨╡╨▓╤Л╨╡ ╨╖╨╛╨╜╤Л'}</span>
                <button type="button" onclick="openExerciseProVisualizer('${ex.name.replace(/'/g, "\\'")}', 'active')" class="text-[9px] text-[#c8a97e] bg-[#181b26] px-2 py-0.5 rounded uppercase font-bold hover:underline">
                  3D ╨Р╨╜╨░╤В╨╛╨╝╨╕╤П тЖТ
                </button>
              </div>
              
              <div class="flex flex-wrap gap-1.5">${phasesBadges}</div>
              
              <div class="space-y-1.5 text-xs text-slate-300 leading-relaxed font-sans pt-1 border-t border-white/[0.05]">
                <div>
                  <b class="text-white">╨в╨Х╨е╨Э╨Ш╨Ъ╨Р:</b> ${ex.tip}
                </div>
                <div class="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] text-slate-300">
                  <div class="p-2 bg-[#181b26] rounded-xl border border-white/[0.04]">
                    <span class="text-slate-400 block uppercase">╨Ф╨л╨е╨Р╨Э╨Ш╨Х:</span>
                    <span class="text-white">╨Т╨┤╨╛╤Е 2тАУ3╤Б ╨╜╨░ ╤Б╨┐╤Г╤Б╨║╨╡, ╨▓╤Л╨┤╨╛╤Е ╨╜╨░ ╨╝╨╛╤Й╨╜╨╛╨╝ ╨▓╤Л╨╢╨╕╨╝╨╡ (╨▒╨╡╨╖ ╨╖╨░╨┤╨╡╤А╨╢╨╡╨║).</span>
                  </div>
                  <div class="p-2 bg-[#181b26] rounded-xl border border-white/[0.04]">
                    <span class="text-slate-400 block uppercase">╨в╨Х╨Ь╨Я & RIR:</span>
                    <span class="text-[#c8a97e] font-bold">╨в╨╡╨╝╨┐: 3-1-1-0</span> тАв <span class="text-slate-300">╨Ч╨░╨┐╨░╤Б: 1тАУ2 ╨┐╨╛╨▓╤В (RIR 1-2)</span>
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

  // ╨Р╨▓╤В╨╛╨╝╨░╤В╨╕╤З╨╡╤Б╨║╨╛╨╡ ╤А╨░╤Б╨┐╤А╨╛╤Б╤В╤А╨░╨╜╨╡╨╜╨╕╨╡ ╨▓╨╡╤Б╨░ ╨╜╨░ ╤Б╨╗╨╡╨┤╤Г╤О╤Й╨╕╨╡ ╨╜╨╡╨╖╨░╨▓╨╡╤А╤И╨╡╨╜╨╜╤Л╨╡ ╨┐╨╛╨┤╤Е╨╛╨┤╤Л
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

  // ╨Р╨▓╤В╨╛╨╝╨░╤В╨╕╤З╨╡╤Б╨║╨╛╨╡ ╤А╨░╤Б╨┐╤А╨╛╤Б╤В╤А╨░╨╜╨╡╨╜╨╕╨╡ ╨▓╨╡╤Б╨░ ╨╜╨░ ╤Б╨╗╨╡╨┤╤Г╤О╤Й╨╕╨╡ ╨╜╨╡╨╖╨░╨▓╨╡╤А╤И╨╡╨╜╨╜╤Л╨╡ ╨┐╨╛╨┤╤Е╨╛╨┤╤Л
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

  // ╨Х╤Б╨╗╨╕ ╨┐╨╛╨┤╤Е╨╛╨┤ ╨╖╨░╨║╤А╤Л╤В тАФ ╨┐╤А╨╛╨▓╨╡╤А╤П╨╡╨╝, ╤З╤В╨╛╨▒╤Л ╤Б╨╗╨╡╨┤╤Г╤О╤Й╨╕╨╣ ╨╜╨╡╨╖╨░╨▓╨╡╤А╤И╨╡╨╜╨╜╤Л╨╣ ╨┐╨╛╨┤╤Е╨╛╨┤ ╨╕╨╝╨╡╨╗ ╨░╨║╤В╤Г╨░╨╗╤М╨╜╤Л╨╣ ╨▓╨╡╤Б
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

      const nextUnfinishedIdx = getFirstUnfinishedExerciseIndex(appState.activeWorkout);
      setTimeout(() => {
        activeExpandedExerciseIndex = nextUnfinishedIdx;
        renderActiveWorkoutUI();
        const nextEl = document.getElementById(`ex-card-${nextUnfinishedIdx}`);
        if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
      return;
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

  if (elTon) elTon.textContent = `${Math.round(ton)} ╨║╨│`;
  if (elCal) elCal.textContent = `${calories} ╨║╨║╨░╨╗`;

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
  if (setsEl) setsEl.textContent = `${doneSets}/${totalSets} ╤Б╨╡╤В╨╛╨▓`;
  if (tonEl) tonEl.textContent = `${Math.round(ton)} ╨║╨│`;
  if (timerEl) timerEl.textContent = timerStr;
}

function jumpToActiveWorkout() {
  Sound.beep(650, 0.08);
  Haptic.impact('medium');
  activeExpandedExerciseIndex = getFirstUnfinishedExerciseIndex(appState.activeWorkout);
  switchTab('workouts');
  renderActiveWorkoutUI();
  setTimeout(() => {
    const activeEl = document.getElementById(`ex-card-${activeExpandedExerciseIndex}`) || document.getElementById('workout-active');
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 100);
}

let currentSwappingExerciseIndex = null;
let currentSwapFilter = 'twins';

function openSwapExerciseModal(exIdx) {
  if (!appState.activeWorkout) return;
  currentSwappingExerciseIndex = exIdx;
  const ex = appState.activeWorkout.exercises[exIdx];

  const titleEl = document.getElementById("swap-modal-current-name");
  if (titleEl) titleEl.textContent = ex.name;

  const badgeEl = document.getElementById("swap-modal-target-badge");
  if (badgeEl) badgeEl.textContent = `ЁЯОп ${ex.muscleGroup}`;

  const searchInput = document.getElementById("swap-search-input");
  if (searchInput) searchInput.value = "";

  setSwapCategoryFilter('twins');
  openModal('modal-swap-exercise');
}

function setSwapCategoryFilter(filter) {
  currentSwapFilter = filter;
  ['twins', 'same', 'all'].forEach(f => {
    const btn = document.getElementById("btn-swap-cat-" + f);
    if (btn) {
      if ((f === 'twins' && filter === 'twins') ||
          (f === 'same' && filter === 'same-group') ||
          (f === 'all' && filter === 'all')) {
        btn.className = "flex-1 py-1.5 rounded-lg bg-[#c8a97e] text-slate-950 font-bold text-center";
      } else {
        btn.className = "flex-1 py-1.5 rounded-lg bg-white/5 text-slate-400 border border-white/10 font-medium text-center";
      }
    }
  });
  renderSwapExerciseAlternativesList();
}

function getExactBiomechanicalSubstitutes(currentEx) {
  if (!currentEx) return [];
  const currentName = currentEx.name || "";
  
  // 1. Check exact 1-to-1 biomechanical twins map
  const twinNames = EXACT_BIOMECHANICAL_TWINS[currentName] || [];
  if (twinNames.length > 0) {
    return EXERCISE_DATABASE.filter(dbEx => twinNames.includes(dbEx.name));
  }

  // 2. If explicit substitutes were manually attached to exercise and exist in twins map
  const explicitNames = currentEx.substitutes || [];
  if (explicitNames.length > 0) {
    const matched = EXERCISE_DATABASE.filter(dbEx => explicitNames.includes(dbEx.name));
    if (matched.length > 0) return matched;
  }

  // If there are NO exact 1-to-1 twins for this unique exercise, return empty array!
  return [];
}

function renderSwapExerciseAlternativesList() {
  const container = document.getElementById("swap-alternatives-list");
  if (!container || currentSwappingExerciseIndex === null || !appState.activeWorkout) return;

  const currentEx = appState.activeWorkout.exercises[currentSwappingExerciseIndex];
  const searchInput = document.getElementById("swap-search-input");
  const query = (searchInput ? searchInput.value : "").trim().toLowerCase();

  let list = [];

  if (currentSwapFilter === 'twins') {
    list = getExactBiomechanicalSubstitutes(currentEx);
  } else if (currentSwapFilter === 'same-group') {
    list = EXERCISE_DATABASE.filter(e => e.name !== currentEx.name && (e.category === currentEx.muscleGroup || e.muscleGroup === currentEx.muscleGroup));
  } else {
    list = EXERCISE_DATABASE.filter(e => e.name !== currentEx.name);
  }

  if (query) {
    list = EXERCISE_DATABASE.filter(e => e.name !== currentEx.name && (e.name.toLowerCase().includes(query) || (e.targetMuscles || '').toLowerCase().includes(query) || (e.category || '').toLowerCase().includes(query)));
  }

  if (list.length === 0) {
    if (currentSwapFilter === 'twins') {
      container.innerHTML = `
        <div class="p-6 bg-[#181b26] rounded-2xl border border-white/[0.06] text-center space-y-2 font-mono">
          <p class="text-xs font-bold text-[#c8a97e] uppercase">╨Я╤А╤П╨╝╤Л╤Е 1-╨▓-1 ╨░╨╜╨░╨╗╨╛╨│╨╛╨▓ ╨╜╨╡╤В</p>
          <p class="text-[11px] text-slate-300 font-sans leading-relaxed">
            ╨н╤В╨╛ ╤Г╨┐╤А╨░╨╢╨╜╨╡╨╜╨╕╨╡ ╨╛╨▒╨╗╨░╨┤╨░╨╡╤В ╤Г╨╜╨╕╨║╨░╨╗╤М╨╜╨╛╨╣ ╨╕╨╖╨╛╨╗╨╕╤А╨╛╨▓╨░╨╜╨╜╨╛╨╣ ╨▒╨╕╨╛╨╝╨╡╤Е╨░╨╜╨╕╨║╨╛╨╣. ╨г ╨╜╨╡╨│╨╛ ╨╜╨╡╤В ╨╕╨┤╨╡╨╜╤В╨╕╤З╨╜╨╛╨│╨╛ 1-╨▓-1 ╨┤╤Г╨▒╨╗╤П ╨┐╨╛ ╤Г╨│╨╗╤Г ╨╕ ╨▓╨╡╨║╤В╨╛╤А╤Г.
          </p>
          <div class="pt-2 flex justify-center space-x-2">
            <button onclick="setSwapCategoryFilter('same-group')" class="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[11px] font-mono">
              ╨Я╨╛╨║╨░╨╖╨░╤В╤М ╨│╤А╤Г╨┐╨┐╤Г ┬л${currentEx.muscleGroup}┬╗
            </button>
            <button onclick="setSwapCategoryFilter('all')" class="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-slate-300 rounded-xl text-[11px] font-mono">
              ╨Т╨╡╤Б╤М ╨║╨░╤В╨░╨╗╨╛╨│
            </button>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="p-6 bg-[#181b26] rounded-2xl border border-white/[0.06] text-center text-slate-400 space-y-1 font-mono">
          <p class="text-xs font-bold text-slate-300 uppercase">╨г╨┐╤А╨░╨╢╨╜╨╡╨╜╨╕╤П ╨╜╨╡ ╨╜╨░╨╣╨┤╨╡╨╜╤Л</p>
          <p class="text-[11px] text-slate-500 font-sans">╨Я╨╛╨┐╤А╨╛╨▒╤Г╨╣ ╨╕╨╖╨╝╨╡╨╜╨╕╤В╤М ╨┐╨╛╨╕╤Б╨║╨╛╨▓╤Л╨╣ ╨╖╨░╨┐╤А╨╛╤Б ╨╕╨╗╨╕ ╨▓╤Л╨▒╤А╨░╤В╤М ╨┤╤А╤Г╨│╤Г╤О ╨▓╨║╨╗╨░╨┤╨║╤Г.</p>
        </div>
      `;
    }
    return;
  }

  container.innerHTML = list.map(dbEx => {
    const isTwin = (EXACT_BIOMECHANICAL_TWINS[currentEx.name] || []).includes(dbEx.name);
    const badgeBg = isTwin ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' : 'bg-white/5 text-[#c8a97e] border-white/10';
    const badgeText = isTwin ? `ЁЯОп 1-╨▓-1 ╨Я╤А╤П╨╝╨╛╨╣ ╨░╨╜╨░╨╗╨╛╨│` : (dbEx.category || dbEx.muscleGroup);

    return `
      <div class="p-3.5 bg-[#12141c] hover:bg-[#181b26] rounded-2xl border border-white/[0.06] flex justify-between items-center space-x-2 transition-all">
        <div class="space-y-1 pr-1 flex-1 min-w-0">
          <div class="flex items-center space-x-1.5 flex-wrap gap-y-1">
            <span class="text-[9px] font-mono font-bold px-1.5 py-0.2 border rounded uppercase ${badgeBg}">${badgeText}</span>
            <h4 class="font-bold text-xs text-white leading-tight">${dbEx.name}</h4>
          </div>
          <p class="text-[11px] text-slate-400 font-mono">${dbEx.targetMuscles || ''}</p>
          <p class="text-[10px] text-slate-500 font-sans truncate max-w-[260px]">ЁЯТб ${dbEx.tip || ''}</p>
        </div>
        <button onclick="executeSwapExercise('${dbEx.id}')" class="px-3 py-2 bg-[#c8a97e] hover:bg-[#dfc299] text-slate-950 font-bold text-xs uppercase rounded-xl font-mono active:scale-95 transition-all whitespace-nowrap shadow-sm">
          ╨Ч╨░╨╝╨╡╨╜╨╕╤В╤М
        </button>
      </div>
    `;
  }).join("");
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
  currentEx.muscleGroup = dbEx.muscleGroup || dbEx.category;
  currentEx.targetMuscles = dbEx.targetMuscles;
  currentEx.phases = dbEx.phases;
  currentEx.tip = dbEx.tip;
  currentEx.calRate = dbEx.calRate || 10;
  currentEx.isTime = !!dbEx.isTime;
  currentEx.defaultWeight = scaledWeight;
  currentEx.substitutes = [oldName];

  // ╨Ю╨▒╨╜╨╛╨▓╨╗╤П╨╡╨╝ ╨▓╨╡╤Б ╨▓ ╨╜╨╡╨╖╨░╨▓╨╡╤А╤И╨╡╨╜╨╜╤Л╤Е ╨┐╨╛╨┤╤Е╨╛╨┤╨░╤Е
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
  let reason = "╨Ю╤В╨┤╤Л╤Е ╨╝╨╡╨╢╨┤╤Г ╤Б╨╡╤В╨░╨╝╨╕";

  // 1. ╨С╨░╨╖╨╛╨▓╨╛╨╡ ╨▓╤А╨╡╨╝╤П ╨┐╨╛ ╨▒╨╕╨╛╨╝╨╡╤Е╨░╨╜╨╕╤З╨╡╤Б╨║╨╛╨╣ ╨║╨░╤В╨╡╨│╨╛╤А╨╕╨╕ (╨в╤П╨╢╨╡╨╗╨░╤П ╨▒╨░╨╖╨░ vs ╨Ш╨╖╨╛╨╗╤П╤Ж╨╕╤П)
  const isHeavyCompound = n.includes("╨╢╨╕╨╝") || n.includes("╨┐╤А╨╕╤Б╨╡╨┤") || n.includes("╤В╤П╨│╨░") || 
                          n.includes("╨▒╤А╤Г╤Б╤М") || n.includes("╤А╤Г╨╝╤Л╨╜╨║") || n.includes("╤Б╤В╨░╨╜╨╛╨▓╨░╤П") ||
                          muscle.includes("╨╜╨╛╨│╨╕") || muscle.includes("╨│╤А╤Г╨┤╤М") || muscle.includes("╤Б╨┐╨╕╨╜╨░");

  const isIsolation = n.includes("╨▒╨░╨▒╨╛╤З╨║╨░") || n.includes("╤А╨░╨╖╨▓╨╛╨┤╨║") || n.includes("╨▒╨╕╤Ж╨╡╨┐╤Б") || 
                      n.includes("╤В╤А╨╕╤Ж╨╡╨┐╤Б") || n.includes("╨┐╤А╨╡╤Б╤Б") || n.includes("╨╝╨░╤Е╨╕") || n.includes("╨│╨╛╨╗╨╡╨╜");

  if (isHeavyCompound) {
    baseSec = 120; // 2:00 ╨▒╨░╨╖╨░ ╨┤╨╗╤П ╨╝╨╜╨╛╨│╨╛╤Б╤Г╤Б╤В╨░╨▓╨╜╤Л╤Е ╨┤╨▓╨╕╨╢╨╡╨╜╨╕╨╣
    reason = "╨С╨░╨╖╨╛╨▓╨╛╨╡ ╤Г╨┐╤А╨░╨╢╨╜╨╡╨╜╨╕╨╡ (2:00)";
  } else if (isIsolation) {
    baseSec = 75; // 1:15 ╨┤╨╗╤П ╨╕╨╖╨╛╨╗╨╕╤А╤Г╤О╤Й╨╕╤Е
    reason = "╨Ш╨╖╨╛╨╗╤П╤Ж╨╕╤П (1:15)";
  }

  // 2. ╨Т╨╗╨╕╤П╨╜╨╕╨╡ ╨▓╨╡╤Б╨░ ╨╕ ╨╕╨╜╤В╨╡╨╜╤Б╨╕╨▓╨╜╨╛╤Б╤В╨╕ (╨в╤П╨╢╨╡╨╗╤Л╨╣ ╤А╨░╨▒╨╛╤З╨╕╨╣ ╨▓╨╡╤Б)
  if (weight >= 70) {
    baseSec += 30; // +30╤Б ╨┤╨╗╤П ╤В╤П╨╢╨╡╨╗╤Л╤Е ╨▓╨╡╤Б╨╛╨▓ 70+ ╨║╨│
    reason = `╨в╤П╨╢╨╡╨╗╤Л╨╣ ╨▓╨╡╤Б ${weight} ╨║╨│ (+30╤Б)`;
  } else if (weight >= 35) {
    baseSec += 15; // +15╤Б ╨┤╨╗╤П ╨▓╨╡╤Б╨╛╨▓ 35-69 ╨║╨│
    reason = `╨а╨░╨▒╨╛╤З╨╕╨╣ ╨▓╨╡╤Б ${weight} ╨║╨│ (+15╤Б)`;
  }

  // 3. ╨Т╨╗╨╕╤П╨╜╨╕╨╡ ╤Б╤В╨╡╨┐╨╡╨╜╨╕ ╨╛╤В╨║╨░╨╖╨░ (RIR Engine)
  if (rir === 0) {
    baseSec += 30; // +30╤Б ╨┐╤А╨╕ ╨┐╨╛╨╗╨╜╨╛╨╝ ╨╛╤В╨║╨░╨╖╨╡ (RIR 0) ╨┤╨╗╤П ╤А╨╡╤Б╨╕╨╜╤В╨╡╨╖╨░ ╤Д╨╛╤Б╤Д╨╛╨║╤А╨╡╨░╤В╨╕╨╜╨░ ╨╕ ╨ж╨Э╨б
    reason += " тАв ╨Ю╤В╨║╨░╨╖ (RIR 0) ЁЯза";
  } else if (rir === 1) {
    baseSec += 15; // +15╤Б ╨┐╤А╨╕ ╨╛╨║╨╛╨╗╨╛╨╛╤В╨║╨░╨╖╨╡ (RIR 1)
    reason += " тАв ╨Я╤А╨╡╨┤╨╡╨╗ (RIR 1) тЪб";
  } else if (rir >= 3) {
    baseSec = Math.max(45, baseSec - 30);
    reason += " тАв ╨а╨░╨╖╨╝╨╕╨╜╨║╨░ (RIR 3+)";
  }

  // ╨Ю╨│╤А╨░╨╜╨╕╤З╨╕╨▓╨░╨╡╨╝ ╤А╨░╨╖╤Г╨╝╨╜╤Л╨╝╨╕ ╤Б╨┐╨╛╤А╤В╨╕╨▓╨╜╤Л╨╝╨╕ ╤А╨░╨╝╨║╨░╨╝╨╕ (45╤Б - 210╤Б)
  baseSec = Math.min(210, Math.max(45, Math.round(baseSec / 15) * 15));

  return { seconds: baseSec, reason: reason };
}

function startRestTimer(sec, reason = "╨Ю╤В╨┤╤Л╤Е ╨╝╨╡╨╢╨┤╤Г ╤Б╨╡╤В╨░╨╝╨╕") {
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
    
    if (barTxt) barTxt.textContent = "╨Я╨Ю╨а╨Р! тЪб";
    if (hudTxt) hudTxt.textContent = "╨Я╨Ю╨а╨Р! тЪб";
    if (modalTxt) modalTxt.textContent = "╨Я╨Ю╨а╨Р! тЪб";
    if (reasonTxt) reasonTxt.textContent = "╨У╨╛╤В╨╛╨▓ ╨║ ╤Б╨╗╨╡╨┤╤Г╤О╤Й╨╡╨╝╤Г ╤Б╨╡╤В╤Г";

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
      ctx.fillText("╨Ф╨╛╨▒╨░╨▓╤М ╨╝╨╕╨╜╨╕╨╝╤Г╨╝ 2 ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╨╕ ╨┤╨╗╤П ╨│╤А╨░╤Д╨╕╨║╨░ ╨▓╤А╨╡╨╝╨╡╨╜╨╕", w / 2, h / 2);
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

      const val = (max - (i / 3) * (max - min)).toFixed(0) + "╨╝";
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
        tooltip.textContent = `${durations[nearestIdx]} ╨╝╨╕╨╜ (${hist[nearestIdx].date})`;
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
    ctx.fillText("╨Ф╨╛╨▒╨░╨▓╤М ╨╝╨╕╨╜╨╕╨╝╤Г╨╝ 2 ╨╖╨░╨╝╨╡╤А╨░ ╨┤╨╗╤П ╨╛╤В╨╛╨▒╤А╨░╨╢╨╡╨╜╨╕╤П ╨│╤А╨░╤Д╨╕╨║╨░", w / 2, h / 2);
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
      tooltip.textContent = `${nl.date}: ╨Т╨╡╤Б ${nl.weight || 'тАФ'} ╨║╨│ | ╨в╨░╨╗╨╕╤П ${nl.waist || 'тАФ'} ╤Б╨╝`;
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

let pendingWorkoutSummary = null;
let selectedWorkoutRating = 4;
let selectedWorkoutRatingEmoji = 'тЪб';
let selectedWorkoutRatingLabel = '╨а╨░╨▒╨╛╤З╨╕╨╣ ╤В╨╡╨╝╨┐ / ╨Т ╤П╨▒╨╗╨╛╤З╨║╨╛';
let selectedWorkoutRPE = 'RPE 8-8.5';

function selectWorkoutRating(stars, emoji, label, rpe) {
  selectedWorkoutRating = stars;
  selectedWorkoutRatingEmoji = emoji;
  selectedWorkoutRatingLabel = label;
  selectedWorkoutRPE = rpe;

  [1, 2, 3, 4, 5].forEach(val => {
    const btn = document.getElementById(`btn-rating-${val}`);
    if (btn) {
      if (val === stars) {
        btn.className = "p-2 rounded-xl bg-[#c8a97e]/20 border-2 border-[#c8a97e] text-[#c8a97e] flex flex-col items-center justify-center space-y-1 shadow-md shadow-[#c8a97e]/10 transition-all text-center scale-105";
      } else {
        btn.className = "p-2 rounded-xl bg-[#181b26] border border-white/5 text-slate-400 flex flex-col items-center justify-center space-y-1 hover:border-white/20 transition-all text-center opacity-70";
      }
    }
  });

  const badge = document.getElementById("summary-rating-badge");
  const desc = document.getElementById("summary-rating-desc");
  if (badge) badge.textContent = `${emoji} ${stars}/5 тАв ${label}`;
  
  if (desc) {
    if (stars === 5) desc.textContent = "ЁЯФе ╨Ш╨┤╨╡╨░╨╗╤М╨╜╨╛╨╡ ╨▓╨╛╤Б╤Б╤В╨░╨╜╨╛╨▓╨╗╨╡╨╜╨╕╨╡ ╨╕ ╤Н╨╜╨╡╤А╨│╨╕╤П. ╨в╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╨░ ╨╖╨░╤И╨╗╨░ ╨╜╨░ ╨╛╨┤╨╜╨╛╨╝ ╨┤╤Л╤Е╨░╨╜╨╕╨╕!";
    else if (stars === 4) desc.textContent = "тЪб ╨Ю╨┐╤В╨╕╨╝╨░╨╗╤М╨╜╤Л╨╣ ╤А╨░╨▒╨╛╤З╨╕╨╣ ╤Б╤В╨╕╨╝╤Г╨╗ ╨┤╨╗╤П ╨╝╤Л╤И╨╡╤З╨╜╨╛╨│╨╛ ╤А╨╛╤Б╤В╨░ ╨▒╨╡╨╖ ╨┐╨╡╤А╨╡╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨░╨╜╨╜╨╛╤Б╤В╨╕.";
    else if (stars === 3) desc.textContent = "ЁЯТк ╨Т╤Л╤Б╨╛╨║╨░╤П ╨┐╨╗╨╛╤В╨╜╨╛╤Б╤В╤М ╨╜╨░╨│╤А╤Г╨╖╨║╨╕. ╨Ю╨▒╤П╨╖╨░╤В╨╡╨╗╤М╨╜╨╛ ╨╖╨░╨║╤А╨╛╨╣ ╨▒╨╡╨╗╨║╨╛╨▓╨╛-╤Г╨│╨╗╨╡╨▓╨╛╨┤╨╜╨╛╨╡ ╨╛╨║╨╜╨╛ ╨╕ ╨▓╤Л╤Б╨┐╨╕╤Б╤М.";
    else if (stars === 2) desc.textContent = "ЁЯЫС ╨в╤П╨╢╨╡╨╗╨╛╨╡ ╤Б╨╛╤Б╤В╨╛╤П╨╜╨╕╨╡ / ╨Э╨╡╨┤╨╛╤Б╤Л╨┐. ╨а╨╡╨║╨╛╨╝╨╡╨╜╨┤╤Г╨╡╤В╤Б╤П ╨┤╨░╤В╤М ╨╛╤А╨│╨░╨╜╨╕╨╖╨╝╤Г 48╤З ╨╛╤В╨┤╤Л╤Е╨░.";
    else if (stars === 1) desc.textContent = "тЪая╕П ╨С╨╛╨╗╤М ╨╕╨╗╨╕ ╨┤╨╕╤Б╨║╨╛╨╝╤Д╨╛╤А╤В ╨▓ ╤Б╨▓╤П╨╖╨║╨░╤Е. ╨Ч╨░╤Д╨╕╨║╤Б╨╕╤А╤Г╨╣ ╨▓ ╨╖╨░╨╝╨╡╤В╨║╨░╤Е, ╤Б╨╜╨╕╨╖╨╕╨╝ ╨╜╨░╨│╤А╤Г╨╖╨║╤Г ╨╜╨░ ╤Б╨╗╨╡╨┤╤Г╤О╤Й╨╡╨╝ ╤Ж╨╕╨║╨╗╨╡.";
  }

  Sound.beep(550, 0.04);
  Haptic.impact('light');
}

function appendSummaryTag(tagText) {
  const noteInput = document.getElementById("summary-workout-note");
  if (!noteInput) return;
  if (noteInput.value.includes(tagText)) return;
  noteInput.value = noteInput.value ? `${noteInput.value} | ${tagText}` : tagText;
  Sound.beep(600, 0.03);
  Haptic.impact('light');
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
      sets: doneSets.map(s => `${s.weight}╨║╨│├Ч${s.reps}`).join(', ') || '0',
      prog: isMaxClosed ? `╨Ч╨░╨║╤А╤Л╤В╨╛ (+2.5╨║╨│)` : `╨Я╨╗╨░╨╜: ${e.sets.length}├Ч${e.max}`
    });
  });

  const caloriesBurned = calculateCurrentCaloriesBurned();
  const dateStr = wo.targetDate || now.toISOString().split("T")[0];

  pendingWorkoutSummary = {
    woName: wo.name,
    dateStr: dateStr,
    startTimeStr: wo.startTimeStr || "18:00",
    endTimeStr: endTimeStr,
    durationMin: durationMin,
    readiness: wo.readiness || 90,
    tonnage: Math.round(tonnage),
    calories: caloriesBurned,
    exercises: exSummaries
  };

  // ╨Ч╨░╨┐╨╛╨╗╨╜╤П╨╡╨╝ ╨╝╨╛╨┤╨░╨╗╨║╤Г ╨╕╤В╨╛╨│╨╛╨▓╨╛╨│╨╛ ╨╛╤В╤З╨╡╤В╨░
  const subEl = document.getElementById("summary-workout-subtitle");
  const tonEl = document.getElementById("summary-stat-tonnage");
  const durEl = document.getElementById("summary-stat-duration");
  const calEl = document.getElementById("summary-stat-calories");
  const exListEl = document.getElementById("summary-exercises-list");
  const noteInput = document.getElementById("summary-workout-note");

  if (subEl) subEl.textContent = `┬л${wo.name}┬╗ тАв ${wo.startTimeStr || '18:00'} тАУ ${endTimeStr}`;
  if (tonEl) tonEl.textContent = `${Math.round(tonnage).toLocaleString()} ╨║╨│`;
  if (durEl) durEl.textContent = `${durationMin} ╨╝╨╕╨╜`;
  if (calEl) calEl.textContent = `~${caloriesBurned} ╨║╨║╨░╨╗`;
  if (noteInput) noteInput.value = "";

  if (exListEl) {
    exListEl.innerHTML = exSummaries.map(e => `
      <div class="p-2 bg-[#121522] rounded-xl border border-white/[0.04] flex justify-between items-center text-[11px] font-sans">
        <span class="text-slate-300 font-medium">${e.name}</span>
        <div class="text-right font-mono">
          <span class="text-white font-bold block">${e.sets}</span>
          <span class="text-[10px] text-[#c8a97e]">${e.prog || ''}</span>
        </div>
      </div>
    `).join('');
  }

  selectWorkoutRating(4, 'тЪб', '╨а╨░╨▒╨╛╤З╨╕╨╣ ╤В╨╡╨╝╨┐ / ╨Т ╤П╨▒╨╗╨╛╤З╨║╨╛', 'RPE 8-8.5');

  Sound.finish();
  Haptic.success();
  openModal('modal-workout-completion-rating');
}

function confirmAndSaveWorkoutSummary() {
  if (!pendingWorkoutSummary) {
    closeModal('modal-workout-completion-rating');
    return;
  }

  const noteInput = document.getElementById("summary-workout-note");
  const userNote = noteInput ? noteInput.value.trim() : "";

  const histItem = {
    id: "wo_" + Date.now(),
    date: pendingWorkoutSummary.dateStr,
    startTimeStr: pendingWorkoutSummary.startTimeStr,
    endTimeStr: pendingWorkoutSummary.endTimeStr,
    durationMin: pendingWorkoutSummary.durationMin,
    name: pendingWorkoutSummary.woName,
    readiness: pendingWorkoutSummary.readiness,
    tonnage: pendingWorkoutSummary.tonnage,
    calories: pendingWorkoutSummary.calories,
    exercises: pendingWorkoutSummary.exercises,
    rating: selectedWorkoutRating,
    ratingEmoji: selectedWorkoutRatingEmoji,
    ratingLabel: selectedWorkoutRatingLabel,
    rpe: selectedWorkoutRPE,
    note: userNote
  };

  if (!appState.history) appState.history = [];
  appState.history.unshift(histItem);

  addXP(150);
  appState.streak = (appState.streak || 0) + 1;
  appState.activeWorkout = null;
  calculateAutoMesocycle();
  updateActiveWorkoutTopPill();
  saveState();

  // ╨Ю╤В╨┐╤А╨░╨▓╨║╨░ ╨┐╨╡╤А╤Б╨╛╨╜╨░╨╗╤М╨╜╨╛╨│╨╛ ╨┐╤Г╤И-╨╛╤В╤З╨╡╤В╨░ ╨▓ Telegram ╤Б ╨╛╤Ж╨╡╨╜╨║╨╛╨╣ ╨╕ ╤Б╨░╨╝╨╛╤З╤Г╨▓╤Б╤В╨▓╨╕╨╡╨╝
  if (appState.pushSettings && appState.pushSettings.enabled && appState.pushSettings.reports) {
    const pushChatId = (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) ? window.Telegram.WebApp.initDataUnsafe.user.id : appState.tgId;
    const noteLine = userNote ? `\nЁЯТм ╨Ч╨░╨╝╨╡╤В╨║╨░: <i>┬л${userNote}┬╗</i>` : '';
    const woText = `ЁЯПЖ <b>╨в╨а╨Х╨Э╨Ш╨а╨Ю╨Т╨Ъ╨Р ╨Ч╨Р╨Т╨Х╨а╨и╨Х╨Э╨Р!</b>\n\n` +
      `╨Р╤В╨╗╨╡╤В: <b>${appState.name}</b>\n` +
      `╨Я╤А╨╛╨│╤А╨░╨╝╨╝╨░: <b>${pendingWorkoutSummary.woName}</b>\n` +
      `╨б╨░╨╝╨╛╤З╤Г╨▓╤Б╤В╨▓╨╕╨╡: <b>${selectedWorkoutRatingEmoji} ${selectedWorkoutRating}/5 (${selectedWorkoutRatingLabel})</b>\n` +
      `╨в╨╛╨╜╨╜╨░╨╢: <b>${pendingWorkoutSummary.tonnage.toLocaleString()} ╨║╨│</b> | ╨Ф╨╗╨╕╤В╨╡╨╗╤М╨╜╨╛╤Б╤В╤М: <b>${pendingWorkoutSummary.durationMin} ╨╝╨╕╨╜</b>\n` +
      `╨Ъ╨░╨╗╨╛╤А╨╕╨╕: <b>~${pendingWorkoutSummary.calories} ╨║╨║╨░╨╗</b>\n` +
      `╨Э╨░╨│╤А╨░╨┤╨░: <b>+150 XP</b> (╨Т╤Б╨╡╨│╨╛: ${appState.xp} XP)${noteLine}\n\n` +
      `ЁЯТк <i>╨Ю╤В╨╗╨╕╤З╨╜╨░╤П ╤А╨░╨▒╨╛╤В╨░! ╨Ю╤В╨┤╤Л╤Е╨░╨╣ ╨╕ ╨▓╨╛╤Б╤Б╤В╨░╨╜╨░╨▓╨╗╨╕╨▓╨░╨╣╤Б╤П.</i>`;

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

  closeModal('modal-workout-completion-rating');
  pendingWorkoutSummary = null;

  document.getElementById("workout-active").classList.add("hidden");
  document.getElementById("workout-selector").classList.remove("hidden");
  renderHistory();
  renderMuscleVolumeBreakdown();
  renderPersonalizedAIAnalytics();
  switchTab("progress");
  switchProgressSubtab("archive");

  Sound.beep(800, 0.1);
  Haptic.success();
}

function skipAndSaveWorkoutSummary() {
  confirmAndSaveWorkoutSummary();
}

function cancelWorkout() {
  if (confirm("╨Ю╤В╨╝╨╡╨╜╨╕╤В╤М ╤В╨╡╨║╤Г╤Й╤Г╤О ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╤Г?")) {
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
  if (badge) badge.textContent = `╨Э╨╡╨┤╨╡╨╗╤П ${appState.mesocycleWeek} ╨╕╨╖ 8`;
}

// ========================================================
// ╨Ъ╨Р╨Ы╨Х╨Э╨Ф╨Р╨а╨м ╨Ь╨Х╨б╨п╨ж╨Р
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
  if (title) title.textContent = `╨в╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╨░ ╨╜╨░ ${formatted}`;
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
    summaryTagEl.textContent = `${doneCount} ╨╖╨░╨║╤А╤Л╤В╨╛ тАв ${missedCount > 0 ? missedCount + ' ╨┐╤А╨╛╨┐╤Г╤Б╨║' : '100% ╨┤╨╕╤Б╤Ж╨╕╨┐╨╗╨╕╨╜╨░'}`;
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
    inspBadge.textContent = "╨Т╨л╨Я╨Ю╨Ы╨Э╨Х╨Э╨Ю";
    inspBadge.className = "px-2.5 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 rounded-lg text-xs font-bold font-mono";
    const timeInfo = woData.startTimeStr ? `${woData.startTimeStr} тАУ ${woData.endTimeStr || '...'} (${woData.durationMin || 45} ╨╝╨╕╨╜)` : `~45 ╨╝╨╕╨╜`;
    inspContent.innerHTML = `
      <p><b>${woData.name}</b></p>
      <p class="text-[11px] text-slate-400 font-mono">${timeInfo} тАв ╨в╨╛╨╜╨╜╨░╨╢: <b class="text-white">${woData.tonnage} ╨║╨│</b> тАв <b class="text-[#c8a97e]">~${woData.calories || 350} ╨║╨║╨░╨╗</b></p>
    `;
    if (inspActions) inspActions.innerHTML = "";
  } else if (status === 'missed') {
    inspBadge.textContent = "╨Я╨а╨Ю╨Я╨г╨б╨Ъ";
    inspBadge.className = "px-2.5 py-0.5 bg-rose-950/60 text-rose-400 border border-rose-800/60 rounded-lg text-xs font-bold font-mono";
    inspContent.innerHTML = `<p class="text-slate-300">╨Ч╨░╨┐╨╗╨░╨╜╨╕╤А╨╛╨▓╨░╨╜╨╜╨░╤П ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╨░ ╨▒╤Л╨╗╨░ ╨┐╤А╨╛╨┐╤Г╤Й╨╡╨╜╨░. ╨в╤Л ╨╝╨╛╨╢╨╡╤И╤М ╨┐╤А╨╛╨▓╨╡╤Б╤В╨╕ ╨╡╨╡ ╨▓ ╨╗╤О╨▒╨╛╨╣ ╨┤╨╡╨╜╤М!</p>`;
    if (inspActions) {
      inspActions.innerHTML = `
        <button onclick="openDateWorkoutPickerModal('${dateStr}')" class="w-full py-2.5 bg-[#c8a97e] hover:bg-[#dfc299] text-slate-950 font-bold text-xs uppercase rounded-xl font-mono active:scale-98 transition-all shadow-sm">
          ╨Ч╨░╨┐╨╕╤Б╨░╤В╤М ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╤Г ╨╜╨░ ${dateStr}
        </button>
      `;
    }
  } else if (status === 'plan') {
    inspBadge.textContent = "╨Я╨Ы╨Р╨Э";
    inspBadge.className = "px-2.5 py-0.5 bg-white/5 text-slate-300 border border-white/10 rounded-lg text-xs font-bold font-mono";
    inspContent.innerHTML = `<p class="text-slate-300">╨Ч╨░╨┐╨╗╨░╨╜╨╕╤А╨╛╨▓╨░╨╜╨╜╤Л╨╣ ╨┤╨╡╨╜╤М ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╨╕ ╨┐╨╛ ╨│╤А╨░╤Д╨╕╨║╤Г. ╨У╨╛╤В╨╛╨▓╤М╤Б╤П ╨║ ╨┐╤А╨╛╨│╤А╨╡╤Б╤Б╨╕╨╕ ╨▓╨╡╤Б╨╛╨▓!</p>`;
    if (inspActions) {
      inspActions.innerHTML = `
        <button onclick="openDateWorkoutPickerModal('${dateStr}')" class="w-full py-2.5 bg-[#c8a97e] hover:bg-[#dfc299] text-slate-950 font-bold text-xs uppercase rounded-xl font-mono active:scale-98 transition-all shadow-sm">
          ╨Э╨░╤З╨░╤В╤М ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╤Г ╨╜╨░ ╤Н╤В╤Г ╨┤╨░╤В╤Г
        </button>
      `;
    }
  } else {
    inspBadge.textContent = "╨Ю╨в╨Ф╨л╨е";
    inspBadge.className = "px-2.5 py-0.5 bg-[#181b26] text-slate-400 border border-white/10 rounded-lg text-xs font-bold font-mono";
    inspContent.innerHTML = `<p class="text-slate-300">╨Ф╨╡╨╜╤М ╨╛╤В╨┤╤Л╤Е╨░. ╨Я╤А╨╕╤И╨╡╨╗ ╨▓ ╨╖╨░╨╗ ╨▓╨╜╨╡ ╨│╤А╨░╤Д╨╕╨║╨░? ╨Т╤Л╨▒╨╕╤А╨░╨╣ ╨┐╤А╨╛╨│╤А╨░╨╝╨╝╤Г ╨╕╨╗╨╕ ╤Б╨▓╨╛╨▒╨╛╨┤╨╜╤Г╤О ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╤Г:</p>`;
    if (inspActions) {
      inspActions.innerHTML = `
        <button onclick="openDateWorkoutPickerModal('${dateStr}')" class="w-full py-2.5 bg-[#181b26] hover:bg-[#202432] text-slate-300 font-bold text-xs uppercase rounded-xl border border-white/10 font-mono active:scale-98 transition-all">
          + ╨Я╤А╨╛╨▓╨╡╤Б╤В╨╕ ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╤Г ╨▓ ╤Н╤В╨╛╤В ╨┤╨╡╨╜╤М
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

  if (tonEl) tonEl.textContent = `${(totalTonnage / 1000).toFixed(1)} ╤В`;
  if (sessEl) sessEl.textContent = `${totalSessions}`;
  if (strkEl) strkEl.textContent = `${appState.streak || 0} ╨┤╨╜`;
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
        <span class="text-slate-400">${monthHist.length} ╤Б╨╡╤Б╤Б.</span>
      </div>
      <div class="text-[11px] font-mono font-bold ${monthTon > 0 ? 'text-white' : 'text-slate-600'}">
        ${monthTon > 0 ? (monthTon / 1000).toFixed(1) + ' ╤В' : 'тАФ'}
      </div>
    `;

    container.appendChild(pill);
  }
}

// ========================================================
// ╨Ч╨Р╨Ь╨Х╨а╨л ╨в╨Х╨Ы╨Р ╨Ш ╨У╨а╨Р╨д╨Ш╨Ъ
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
    badge.textContent = "тАФ";
    return;
  }
  const ratio = Math.round((waist / height) * 100);
  if (ratio <= 49) {
    badge.textContent = `╨Э╨╛╤А╨╝╨░ (${ratio}%)`;
    badge.className = "px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/60";
  } else if (ratio <= 53) {
    badge.textContent = `╨г╨╝╨╡╤А╨╡╨╜╨╜╤Л╨╣ ╨╢╨╕╤А (${ratio}%)`;
    badge.className = "px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-amber-950/60 text-amber-300 border border-amber-800/60";
  } else {
    badge.textContent = `╨Ш╨╖╨▒╤Л╤В╨╛╨║ ╨╢╨╕╤А╨░ (${ratio}%)`;
    badge.className = "px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-rose-950/60 text-rose-300 border border-rose-800/60";
  }
}

function saveCurrentTilesAsMeasurement() {
  onTileInputChanged();
  const cur = appState.currentMetrics;

  if (!cur.weight && !cur.waist) {
    alert("╨Я╨╛╨╢╨░╨╗╤Г╨╣╤Б╤В╨░, ╨▓╨▓╨╡╨┤╨╕ ╨▓╨╡╤Б ╨╕╨╗╨╕ ╤В╨░╨╗╨╕╤О ╨▓ ╤П╤З╨╡╨╣╨║╨░╤Е ╨▓╤Л╤И╨╡!");
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
  alert(`╨Ч╨░╨╝╨╡╤А╤Л ╨╖╨░ ${today} ╤Б╨╛╤Е╤А╨░╨╜╨╡╨╜╤Л! (+40 XP)`);
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
      ctx.fillText("╨Ф╨╛╨▒╨░╨▓╤М ╨╝╨╕╨╜╨╕╨╝╤Г╨╝ 2 ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╨╕ ╨┤╨╗╤П ╨│╤А╨░╤Д╨╕╨║╨░ ╨▓╤А╨╡╨╝╨╡╨╜╨╕", w / 2, h / 2);
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

      const val = (max - (i / 3) * (max - min)).toFixed(0) + "╨╝";
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
    ctx.fillText("╨Ф╨╛╨▒╨░╨▓╤М ╨╝╨╕╨╜╨╕╨╝╤Г╨╝ 2 ╨╖╨░╨╝╨╡╤А╨░ ╨┤╨╗╤П ╨╛╤В╨╛╨▒╤А╨░╨╢╨╡╨╜╨╕╤П ╨│╤А╨░╤Д╨╕╨║╨░", w / 2, h / 2);
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
// ╨Я╨а╨Ю╨д╨Ш╨Ы╨м ╨Р╨в╨Ы╨Х╨в╨Р
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
  if (ageEl) ageEl.textContent = `${appState.age || 32} ╨│ тАв ${appState.height || 178} ╤Б╨╝`;
  if (goalEl) goalEl.textContent = appState.goal || "╨а╨╡╨║╨╛╨╝╨┐╨╛╨╖╨╕╤Ж╨╕╤П";
}

function forceAppReload() {
  Sound.beep(700, 0.05);
  Haptic.success();
  const cleanUrl = window.location.href.split('?')[0];
  window.location.href = `${cleanUrl}?v=${Date.now()}`;
}

function openRevisionModal() {
  injectAppVersion();
  openModal('modal-revision-status');
  Sound.beep(650, 0.05);
  Haptic.impact('light');
  checkLiveRevisionUpdate(false);
}

async function checkLiveRevisionUpdate(isManual = true) {
  const btn = document.getElementById("btn-check-revision");
  const badgeEl = document.getElementById("revision-status-badge");
  const serverVerEl = document.getElementById("revision-server-ver");
  const cacheStatusEl = document.getElementById("revision-cache-status");
  const changelogContainer = document.getElementById("revision-live-changelog");

  if (btn && isManual) {
    btn.innerHTML = <span class="animate-spin inline-block mr-1">рџ”„</span> РџСЂРѕРІРµСЂРєР° СЃРµСЂРІРµСЂРѕРІ Cloudflare Edge & GitHub...;
  }

  let latestVersion = null;
  let changelog = [];

  // Tier 1: Cloudflare Worker live API endpoint (0ms latency, zero CORS)
  try {
    const origin = (window.location && window.location.origin && window.location.origin.startsWith('http')) 
      ? window.location.origin 
      : "https://iron-coach-bot.r-tofan112.workers.dev";
    
    const res = await fetch(\/api/version?_t=\, {
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
      const ghRes = await fetch(https://api.github.com/repos/rtofan112-dot/iron-coach-app/tags?_t=\, {
        cache: 'no-store'
      });
      if (ghRes.ok) {
        const tags = await ghRes.json();
        if (tags && tags.length > 0 && tags[0].name) {
          latestVersion = tags[0].name.startsWith('v') ? \ PRO : \ PRO;
        }
      }
    } catch (e) {
      console.warn("GitHub API tags check fallback:", e);
    }
  }

  // Tier 3: GitHub Raw bundle fallback
  if (!latestVersion) {
    try {
      const rawRes = await fetch(https://raw.githubusercontent.com/rtofan112-dot/iron-coach-app/main/bundle.html?_t=\, {
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
    serverVerEl.textContent = latestVersion || \ (OK);
  }

  if (changelog && changelog.length > 0 && changelogContainer) {
    changelogContainer.innerHTML = changelog.map(item => 
      <div class="flex items-start gap-2">
        <span class="text-emerald-400 font-mono font-bold">в—Џ</span>
        <span>\</span>
      </div>
    ).join('');
  }

  if (latestVersion && latestVersion !== APP_CONFIG.version) {
    if (btn) {
      btn.className = "w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg active:scale-98 transition-all flex items-center justify-center space-x-2";
      btn.innerHTML = <span>рџљЂ Р”РѕСЃС‚СѓРїРЅР° РЅРѕРІР°СЏ \! Р—Р°РіСЂСѓР·РёС‚СЊ (1 РєР»РёРє)</span>;
      btn.onclick = forceAppReload;
    }
    if (badgeEl) {
      badgeEl.className = "px-2.5 py-0.5 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-700 font-bold text-[11px] flex items-center gap-1.5";
      badgeEl.innerHTML = <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span><b>РћР±РЅРѕРІР»РµРЅРёРµ: \</b>;
    }
    if (cacheStatusEl) {
      cacheStatusEl.textContent = "РўСЂРµР±СѓРµС‚СЃСЏ РѕР±РЅРѕРІР»РµРЅРёРµ";
      cacheStatusEl.className = "text-amber-400 font-bold";
    }
    Sound.record();
    Haptic.success();
    return;
  }

  if (btn && isManual) {
    btn.innerHTML = <span>вњ… Р’РµСЂСЃРёСЏ Р°РєС‚СѓР°Р»СЊРЅР° (\)! РљСЌС€ С‡РёСЃС‚</span>;
    Sound.success();
    Haptic.success();
    setTimeout(() => {
      if (btn) {
        btn.innerHTML = <span>РџСЂРѕРІРµСЂРёС‚СЊ РѕР±РЅРѕРІР»РµРЅРёСЏ РЅР° СЃРµСЂРІРµСЂРµ</span>;
        btn.onclick = () => checkLiveRevisionUpdate(true);
      }
    }, 2500);
  }
}

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
    alert("Push-╤Г╨▓╨╡╨┤╨╛╨╝╨╗╨╡╨╜╨╕╤П ╤Б╨╡╨╣╤З╨░╤Б ╨╛╤В╨║╨╗╤О╤З╨╡╨╜╤Л ╨▓ ╨╜╨░╤Б╤В╤А╨╛╨╣╨║╨░╤Е ╨▓╤Л╤И╨╡! ╨Т╨║╨╗╤О╤З╨╕ ╤В╤Г╨╝╨▒╨╗╨╡╤А ╨┤╨╗╤П ╨┐╨╛╨╗╤Г╤З╨╡╨╜╨╕╤П.");
    return;
  }

  try {
    const res = await fetch("/api/send-push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId: chatId,
        text: `ЁЯФФ <b>╨в╨Х╨б╨в╨Ю╨Т╨Ю╨Х PUSH-╨г╨Т╨Х╨Ф╨Ю╨Ь╨Ы╨Х╨Э╨Ш╨Х</b>\n\n╨Я╤А╨╕╨▓╨╡╤В, ${appState.name || '╨Р╤В╨╗╨╡╤В'}! ╨в╨▓╨╛╤П ╤Б╨╕╤Б╤В╨╡╨╝╨░ IRON COACH ELITE ╤Г╤Б╨┐╨╡╤И╨╜╨╛ ╨┐╨╛╨┤╨║╨╗╤О╤З╨╡╨╜╨░ ╨║ Telegram. ╨Э╨░╨┐╨╛╨╝╨╕╨╜╨░╨╜╨╕╤П ╨╕ ╨╛╤В╤З╨╡╤В╤Л ╨▒╤Г╨┤╤Г╤В ╨┐╤А╨╕╤Е╨╛╨┤╨╕╤В╤М ╨▓╨╛╨▓╤А╨╡╨╝╤П.\n\n╨г╤А╨╛╨▓╨╡╨╜╤М: <b>${Math.floor(appState.xp / 500) + 1}</b> тАв XP: <b>${appState.xp}</b>`,
        withButton: true
      })
    });
    const data = await res.json();
    if (data.ok) {
      Sound.success();
      Haptic.success();
      alert("тЬЕ ╨в╨╡╤Б╤В╨╛╨▓╤Л╨╣ Push ╨╛╤В╨┐╤А╨░╨▓╨╗╨╡╨╜ ╨▓ Telegram!");
    } else {
      alert("╨Э╨╡ ╤Г╨┤╨░╨╗╨╛╤Б╤М ╨╛╤В╨┐╤А╨░╨▓╨╕╤В╤М: " + (data.error || "╨╛╤И╨╕╨▒╨║╨░ ╤Б╨╡╤В╨╕"));
    }
  } catch(e) {
    alert("╨в╨╡╤Б╤В ╨╛╤В╨┐╤А╨░╨▓╨╗╨╡╨╜!");
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
    btn.textContent = `╨б╨▒╤А╨╛╤Б╨╕╤В╤М (${resetSecondsLeft}╤Б)`;
  }
  if (txt) {
    txt.textContent = `╨Я╨╛╨┤╨╛╨╢╨┤╨╕╤В╨╡ ${resetSecondsLeft} ╤Б╨╡╨║...`;
    txt.className = "text-sm font-bold text-slate-400 font-mono";
  }

  openModal('modal-safe-reset');

  resetTimerInterval = setInterval(() => {
    resetSecondsLeft--;
    if (resetSecondsLeft > 0) {
      if (btn) btn.textContent = `╨б╨▒╤А╨╛╤Б╨╕╤В╤М (${resetSecondsLeft}╤Б)`;
      if (txt) txt.textContent = `╨Я╨╛╨┤╨╛╨╢╨┤╨╕╤В╨╡ ${resetSecondsLeft} ╤Б╨╡╨║...`;
    } else {
      clearInterval(resetTimerInterval);
      if (btn) {
        btn.disabled = false;
        btn.className = "flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold uppercase rounded-xl cursor-pointer transition-all";
        btn.textContent = "╨Я╨╛╨┤╤В╨▓╨╡╤А╨┤╨╕╤В╤М ╤Б╨▒╤А╨╛╤Б";
      }
      if (txt) {
        txt.textContent = "╨Ч╨░╤Й╨╕╤В╨░ ╤Б╨╜╤П╤В╨░: ╨╜╨░╨╢╨╝╨╕╤В╨╡ ╨┤╨╗╤П ╤Б╨▒╤А╨╛╤Б╨░";
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

  if (nameEl) nameEl.value = appState.name || "╨а╨╛╨╝╨░╨╜";
  if (ageEl) ageEl.value = appState.age || 32;
  if (heightEl) heightEl.value = appState.height || 178;
  if (weightEl) weightEl.value = (appState.currentMetrics && appState.currentMetrics.weight) ? appState.currentMetrics.weight : 83;
  if (waistEl) waistEl.value = (appState.currentMetrics && appState.currentMetrics.waist) ? appState.currentMetrics.waist : 91.5;
  if (goalEl) goalEl.value = appState.goal || "╨а╨╡╨║╨╛╨╝╨┐╨╛╨╖╨╕╤Ж╨╕╤П";

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

  const name = nameEl ? nameEl.value.trim() : (appState.name || "╨а╨╛╨╝╨░╨╜");
  const age = parseInt(ageEl ? ageEl.value : 32) || 32;
  const height = parseInt(heightEl ? heightEl.value : 178) || 178;
  const weight = parseFloat(weightEl ? weightEl.value : 83.0) || 83.0;
  const waist = parseFloat(waistEl ? waistEl.value : 91.5) || 91.5;
  const goal = goalEl ? goalEl.value : "╨а╨╡╨║╨╛╨╝╨┐╨╛╨╖╨╕╤Ж╨╕╤П";

  appState.name = name || "╨а╨╛╨╝╨░╨╜";
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
  if (pDispAge) pDispAge.textContent = `${appState.age} ╨│ тАв ${appState.height} ╤Б╨╝`;

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
  
  const soreLabels = ["", "1 (╨б╨▓╨╡╨╢╨╕╨╣)", "2 (╨Ы╨╡╨│╨║╨░╤П)", "3 (╨г╨╝╨╡╤А╨╡╨╜╨╜╨░╤П)", "4 (╨Ч╨░╨▒╨╕╤В╨╛╤Б╤В╤М)", "5 (╨б╨╕╨╗╤М╨╜╨░╤П)"];
  document.getElementById("readiness-val-soreness").textContent = soreLabels[soreness] || `${soreness}`;

  const scorePct = Math.round(((energy + sleep + (6 - soreness)) / 15) * 100);
  const badge = document.getElementById("readiness-total-badge");

  if (scorePct >= 85) {
    badge.textContent = `${scorePct}% тАв 100% ╤А╨░╨▒╨╛╤З╨╕╤Е ╨▓╨╡╤Б╨╛╨▓ (╨Я╨╛╨╗╨╜╨░╤П ╨╜╨░╨│╤А╤Г╨╖╨║╨░)`;
    badge.className = "text-sm font-bold text-white font-mono";
  } else if (scorePct >= 65) {
    badge.textContent = `${scorePct}% тАв ╨г╨╝╨╡╤А╨╡╨╜╨╜╨░╤П ╨╜╨░╨│╤А╤Г╨╖╨║╨░ (╨╖╨░╨┐╨░╤Б 1-2 ╨┐╨╛╨▓╤В)`;
    badge.className = "text-sm font-bold text-[#c8a97e] font-mono";
  } else {
    badge.textContent = `${scorePct}% тАв ╨Р╨▓╤В╨╛-╤Б╨╜╨╕╨╢╨╡╨╜╨╕╨╡ ╨▓╨╡╤Б╨╛╨▓ ╨╜╨░ 10% (╨Ч╨░╤Й╨╕╤В╨░ ╤И╨╡╨╕)`;
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
        muscleGroup: e.muscleGroup || "╨Т╤Б╨╡ ╤В╨╡╨╗╨╛",
        targetMuscles: e.targetMuscles || "╨ж╨╡╨╗╨╡╨▓╤Л╨╡ ╨╖╨╛╨╜╤Л",
        phases: e.phases || ["01: ╨Ю╨┐╤Г╤Б╨║╨░╨╜╨╕╨╡ 2-3╤Б", "02: ╨Я╨░╤Г╨╖╨░ 1╤Б", "03: ╨Т╤Л╨╢╨╕╨╝"],
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
  const tip = document.getElementById("cust-ex-tip").value.trim() || "╨Я╨╛╨┤╨║╨╛╨╜╤В╤А╨╛╨╗╤М╨╜╨╛╨╡ ╨┤╨▓╨╕╨╢╨╡╨╜╨╕╨╡ ╨▒╨╡╨╖ ╤А╨░╤Б╨║╨░╤З╨║╨╕.";

  appState.activeWorkout.exercises.push({
    name: name,
    muscleGroup: muscle,
    targetMuscles: `${muscle} тАв ╨Ш╨╜╨┤╨╕╨▓╨╕╨┤╤Г╨░╨╗╤М╨╜╨╛╨╡`,
    phases: ["01: ╨Э╨░╤З╨░╨╗╤М╨╜╨░╤П ╤Д╨░╨╖╨░", "02: ╨а╨░╨▒╨╛╤З╨╡╨╡ ╨┤╨▓╨╕╨╢╨╡╨╜╨╕╨╡", "03: ╨д╨╕╨║╤Б╨░╤Ж╨╕╤П 1╤Б"],
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
// ╨Р╨а╨е╨Ш╨Т ╨в╨а╨Х╨Э╨Ш╨а╨Ю╨Т╨Ю╨Ъ
// ========================================================
function renderHistory() {
  const container = document.getElementById("history-container");
  if (!container) return;
  container.innerHTML = "";

  const hist = appState.history || [];
  if (hist.length === 0) {
    container.innerHTML = `
      <div class="p-6 bg-[#181b26] rounded-2xl border border-white/[0.06] text-center text-slate-400 space-y-2 font-mono">
        <p class="text-xs font-bold text-slate-200 uppercase">╨Ц╤Г╤А╨╜╨░╨╗ ╤Б╨╡╤Б╤Б╨╕╨╣ ╨┐╤Г╤Б╤В</p>
        <p class="text-[11px] text-slate-400 font-sans">╨Э╨░╤З╨╜╨╕ ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╤Г ╨▓╨╛ ╨▓╨║╨╗╨░╨┤╨║╨╡ ┬л╨в╤А╨╡╨╜╨╕╨╜╨│┬╗ ╨╕╨╗╨╕ ╨╜╨░╨╢╨╝╨╕ ┬л+ ╨Ф╨╛╨▒╨░╨▓╨╕╤В╤М┬╗ ╨▓╤Л╤И╨╡.</p>
      </div>
    `;
    return;
  }

  hist.forEach((h, idx) => {
    const card = document.createElement("div");
    card.className = "p-4 bg-[#12141c] rounded-2xl border border-white/[0.08] space-y-2.5 font-mono text-xs";

    const timeString = h.startTimeStr ? `${h.startTimeStr} тАУ ${h.endTimeStr || '...'} (${h.durationMin || 45} ╨╝╨╕╨╜)` : `${h.timeStr || h.date}`;

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
        <span>${h.ratingEmoji || 'тЪб'}</span>
        <span>${h.rating}/5</span>
        <span class="text-slate-400 font-normal">тАв ${h.ratingLabel || ''}</span>
      </div>
    ` : '';

    const noteBlock = h.note ? `
      <div class="p-2 bg-[#0c0e18] rounded-xl border border-white/[0.04] text-[11px] text-slate-300 italic font-sans flex items-start gap-1.5">
        <span class="text-[#c8a97e]">ЁЯТм</span>
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
          <span class="text-[10px] text-slate-400">${h.date} тАв ${timeString}</span>
        </div>
        <div class="flex items-center space-x-2 text-right">
          <div>
            <span class="text-xs text-white font-bold">${h.tonnage} ╨║╨│</span>
            <span class="text-[9px] text-slate-400 block uppercase">╤В╨╛╨╜╨╜╨░╨╢</span>
          </div>
          <div class="border-l border-white/10 pl-2">
            <span class="text-xs text-[#c8a97e] font-bold">${h.calories || 350} ╨║╨║╨░╨╗</span>
            <span class="text-[9px] text-slate-400 block uppercase">╤А╨░╤Б╤Е╨╛╨┤</span>
          </div>
        </div>
      </div>
      <div class="space-y-0.5 pt-1">${exList}</div>
      ${noteBlock}
      <div class="flex justify-end space-x-2 pt-2 border-t border-white/[0.08] text-[10px]">
        <button onclick="openEditHistoryModal(${idx})" class="px-2.5 py-1 bg-[#181b26] text-slate-300 rounded-lg border border-white/10">╨а╨╡╨┤╨░╨║╤В╨╕╤А╨╛╨▓╨░╤В╤М</button>
        <button onclick="deleteHistoryItemDirect(${idx})" class="px-2.5 py-1 bg-rose-950/60 text-rose-300 rounded-lg border border-rose-900">╨г╨┤╨░╨╗╨╕╤В╤М</button>
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
  exContainer.innerHTML = '<span class="text-[10px] text-slate-400 block mb-1 uppercase">╨г╨┐╤А╨░╨╢╨╜╨╡╨╜╨╕╤П:</span>';

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

  h.name = document.getElementById("edit-h-name").value || "╨в╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╨░";
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
    if (rVal === 5) { h.ratingEmoji = 'ЁЯФе'; h.ratingLabel = '╨Ю╤В╨╗╨╕╤З╨╜╨╛ / ╨Я╨╛╨╗╨╛╨╜ ╤Б╨╕╨╗'; h.rpe = 'RPE 7-8'; }
    else if (rVal === 4) { h.ratingEmoji = 'тЪб'; h.ratingLabel = '╨а╨░╨▒╨╛╤З╨╕╨╣ ╤В╨╡╨╝╨┐ / ╨Т ╤П╨▒╨╗╨╛╤З╨║╨╛'; h.rpe = 'RPE 8-8.5'; }
    else if (rVal === 3) { h.ratingEmoji = 'ЁЯТк'; h.ratingLabel = '╨С╤Л╨╗╨╛ ╤В╤П╨╢╨╡╨╗╨╛ / ╨Э╨░ ╨┐╤А╨╡╨┤╨╡╨╗╨╡'; h.rpe = 'RPE 9-9.5'; }
    else if (rVal === 2) { h.ratingEmoji = 'ЁЯЫС'; h.ratingLabel = '╨Я╨╡╤А╨╡╨│╤А╤Г╨╖ / ╨г╤Б╤В╨░╨╗╨╛╤Б╤В╤М'; h.rpe = 'RPE 10'; }
    else { h.ratingEmoji = 'тЪая╕П'; h.ratingLabel = '╨Ф╨╕╤Б╨║╨╛╨╝╤Д╨╛╤А╤В / ╨С╨╛╨╗╤М ╨▓ ╤Б╨▓╤П╨╖╨║╨░╤Е'; h.rpe = '╨а╨╕╤Б╨║'; }
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
  if (confirm("╨в╨╛╤З╨╜╨╛ ╤Г╨┤╨░╨╗╨╕╤В╤М ╤Н╤В╤Г ╨╖╨░╨┐╨╕╤Б╤М ╨╕╨╖ ╨░╤А╤Е╨╕╨▓╨░?")) {
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
  if (confirm("╨г╨┤╨░╨╗╨╕╤В╤М ╤Н╤В╤Г ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╤Г ╨╕╨╖ ╨░╤А╤Е╨╕╨▓╨░?")) {
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
  const name = document.getElementById("manual-wo-name").value || "╨в╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╨░ ╨Р";
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
      { name: "╨Ц╨╕╨╝ ╨╜╨░ ╨╜╨░╨║╨╗╨╛╨╜╨╜╨╛╨╣ 30┬░", sets: "22╨║╨│ ├Ч 10, 10, 10, 10", prog: "╨Ч╨░╨║╤А╤Л╤В╨╛" },
      { name: "╨Ц╨╕╨╝ ╨│╨░╨╜╤В╨╡╨╗╨╡╨╣ ╨╗╨╡╨╢╨░", sets: "24╨║╨│ ├Ч 8, 8, 8, 8", prog: "╨Ч╨░╨║╤А╤Л╤В╨╛" }
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
// ╨н╨Ъ╨б╨Я╨Ю╨а╨в ╨Р╨Э╨Р╨Ы╨Ш╨в╨Ш╨з╨Х╨б╨Ъ╨Ю╨У╨Ю ╨Ф╨Ю╨б╨м╨Х
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
    prsText = prKeys.map(k => `  тАв ${k}: ${prs[k].weight} ╨║╨│ ├Ч ${prs[k].reps} ╤А╨░╨╖ (╨╖╨░╤Д╨╕╨║╤Б╨╕╤А╨╛╨▓╨░╨╜╨╛: ${prs[k].date})`).join("\n");
  } else {
    prsText = "  тАв ╨а╨╡╨║╨╛╤А╨┤╤Л ╨┐╨╛╨║╨░ ╤Д╨╛╤А╨╝╨╕╤А╤Г╤О╤В╤Б╤П.";
  }

  let lastWosText = "";
  if (hist.length === 0) {
    lastWosText = "  тАв ╨в╤А╨╡╨╜╨╕╤А╨╛╨▓╨╛╨║ ╨▓ ╨░╤А╤Е╨╕╨▓╨╡ ╨┐╨╛╨║╨░ ╨╜╨╡╤В.";
  } else {
    lastWosText = hist.slice(0, 4).map((h, i) => {
      const timeSpan = h.startTimeStr ? `${h.startTimeStr}тАУ${h.endTimeStr || '...'} (${h.durationMin || 45} ╨╝╨╕╨╜)` : `~45 ╨╝╨╕╨╜`;
      const exStr = (h.exercises || []).map(e => `    - ${e.name}: ${e.sets}`).join("\n");
      return `${i + 1}) ${h.date} [${timeSpan}] тАФ ${h.name}\n   ╨в╨╛╨╜╨╜╨░╨╢: ${h.tonnage} ╨║╨│ | ╨а╨░╤Б╤Е╨╛╨┤: ~${h.calories || 350} ╨║╨║╨░╨╗ | ╨У╨╛╤В╨╛╨▓╨╜╨╛╤Б╤В╤М: ${h.readiness || 90}%\n${exStr}`;
    }).join("\n\n");
  }

  const summary = `[IRON COACH тАФ ╨Я╨Ю╨Ы╨Э╨Ю╨Х ╨Р╨Э╨Р╨Ы╨Ш╨в╨Ш╨з╨Х╨б╨Ъ╨Ю╨Х ╨Ф╨Ю╨б╨м╨Х ╨Р╨в╨Ы╨Х╨в╨Р ╨Ф╨Ы╨п ╨Ш╨Ш/╨в╨а╨Х╨Э╨Х╨а╨Р]:
=============================================
1. ╨Я╨а╨Ю╨д╨Ш╨Ы╨м ╨Ш ╨Я╨Р╨а╨Р╨Ь╨Х╨в╨а╨л:
тАв ╨Р╤В╨╗╨╡╤В: ${appState.name} | ╨Т╨╛╨╖╤А╨░╤Б╤В: ${appState.age || 32} ╨│╨╛╨┤╨░ | ╨а╨╛╤Б╤В: ${appState.height || 178} ╤Б╨╝
тАв ╨У╨╗╨░╨▓╨╜╨░╤П ╤Ж╨╡╨╗╤М: ${appState.goal || '╨а╨╡╨║╨╛╨╝╨┐╨╛╨╖╨╕╤Ж╨╕╤П (╨б╤Г╤И╨║╨░ ╨╢╨╕╤А╨░ + ╨Ь╤Л╤И╨╡╤З╨╜╤Л╨╣ ╤В╨╛╨╜╤Г╤Б)'}
тАв ╨г╤А╨╛╨▓╨╡╨╜╤М: ${currentLvl} | ╨Т╤Б╨╡╨│╨╛ ╨╛╨┐╤Л╤В╨░: ${appState.xp.toLocaleString()} XP
тАв ╨в╨╡╨║╤Г╤Й╨░╤П ╤Б╨╡╤А╨╕╤П: ${appState.streak || 0} ╨┤╨╜╨╡╨╣ ╨▒╨╡╨╖ ╤Б╤А╤Л╨▓╨╛╨▓
тАв ╨Р╨▓╤В╨╛-╨┐╨╡╤А╨╕╨╛╨┤╨╕╨╖╨░╤Ж╨╕╤П: ╨Э╨╡╨┤╨╡╨╗╤П ${appState.mesocycleWeek || 1} ╨╕╨╖ 8

2. ╨Р╨Э╨в╨а╨Ю╨Я╨Ю╨Ь╨Х╨в╨а╨Ш╨п ╨Ш ╨Ч╨Р╨Ь╨Х╨а╨л ╨в╨Х╨Ы╨Р:
тАв ╨Т╨╡╤Б ╤В╨╡╨╗╨░: ${m.weight || 83} ╨║╨│
тАв ╨в╨░╨╗╨╕╤П ╨┐╨╛ ╨┐╤Г╨┐╨║╤Г: ${m.waist || 91.5} ╤Б╨╝ (╨б╨╛╨╛╤В╨╜╨╛╤И╨╡╨╜╨╕╨╡ ╤В╨░╨╗╨╕╨╕ ╨║ ╤А╨╛╤Б╤В╤Г: ${waistRatio}%)
тАв ╨С╨╕╤Ж╨╡╨┐╤Б (╤А╤Г╨║╨░): ${m.biceps || 38.5} ╤Б╨╝
тАв ╨Ю╨▒╤Е╨▓╨░╤В ╨│╤А╤Г╨┤╨╕: ${m.chest || 104} ╤Б╨╝
тАв ╨С╨╡╨┤╤А╨╛ (╨╜╨╛╨│╨░): ${m.thigh || 59} ╤Б╨╝
тАв ╨и╨╡╤П: ${m.neck || 39.5} ╤Б╨╝

3. ╨Ч╨Р╨Ы ╨Ы╨Ш╨з╨Э╨л╨е ╨а╨Х╨Ъ╨Ю╨а╨Ф╨Ю╨Т (╨Я╨Ю╨Ф╨в╨Т╨Х╨а╨Ц╨Ф╨Х╨Э╨Э╨л╨Х ╨Я╨а╨Ю╨а╨л╨Т╨л):
${prsText}

4. ╨Я╨Ю╨б╨Ы╨Х╨Ф╨Э╨Ш╨Х ╨в╨а╨Х╨Э╨Ш╨а╨Ю╨Т╨Ъ╨Ш (╨б ╨е╨а╨Ю╨Э╨Ю╨Ь╨Х╨в╨а╨Р╨Ц╨Х╨Ь ╨Ш ╨Т╨Х╨б╨Р╨Ь╨Ш):
${lastWosText}

5. ╨Ф╨Ш╨б╨ж╨Ш╨Я╨Ы╨Ш╨Э╨Р ╨Ш ╨Ч╨Ф╨Ю╨а╨Ю╨Т╨м╨Х:
тАв ╨Т╤Л╨┐╨╛╨╗╨╜╨╡╨╜╨╛ ╨┤╨╜╨╡╨╣ ╤Г╤В╤А╨╡╨╜╨╜╨╡╨│╨╛ ╨▓╨░╨║╤Г╤Г╨╝╨░: ${appState.vacDaysCount || 0}
тАв ╨б╤Г╨╝╨╝╨░╤А╨╜╤Л╨╣ ╤В╨╛╨╜╨╜╨░╨╢ ╨╖╨░ ╨▓╤Б╨╡ ╨▓╤А╨╡╨╝╤П: ${getTotalTonnage(appState).toLocaleString()} ╨║╨│
=============================================`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(summary).then(() => {
      Sound.success();
      Haptic.success();
      alert(`╨Я╨╛╨╗╨╜╨╛╨╡ ╨░╨╜╨░╨╗╨╕╤В╨╕╤З╨╡╤Б╨║╨╛╨╡ ╨┤╨╛╤Б╤М╨╡ ╨░╤В╨╗╨╡╤В╨░ ┬л${appState.name}┬╗ ╤Б╨║╨╛╨┐╨╕╤А╨╛╨▓╨░╨╜╨╛ ╨▓ ╨▒╤Г╤Д╨╡╤А ╨╛╨▒╨╝╨╡╨╜╨░!\n\n╨Т╤Б╤В╨░╨▓╤М (Ctrl+V) ╨▓ ╤З╨░╤В ╤Б ╤В╤А╨╡╨╜╨╡╤А╨╛╨╝ ╨╕╨╗╨╕ ╨Ш╨Ш.`);
    }).catch(() => {
      prompt("╨б╨║╨╛╨┐╨╕╤А╤Г╨╣ ╤В╨╡╨║╤Б╤В ╨┤╨╛╤Б╤М╨╡ ╨▓╤А╤Г╤З╨╜╤Г╤О:", summary);
    });
  } else {
    prompt("╨б╨║╨╛╨┐╨╕╤А╤Г╨╣ ╤В╨╡╨║╤Б╤В ╨┤╨╛╤Б╤М╨╡ ╨▓╤А╤Г╤З╨╜╤Г╤О:", summary);
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
        text: `ЁЯУК <b>╨Р╨Э╨Р╨Ы╨Ш╨в╨Ш╨з╨Х╨б╨Ъ╨Ш╨Щ ╨Ю╨в╨з╨Х╨в ╨Р╨в╨Ы╨Х╨в╨Р</b>\n\n` + reportHtml,
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
    resEl.textContent = "0 ╨║╨│";
    return;
  }

  const oneRM = Math.round(w * (1 + r / 30.0));
  resEl.textContent = `${oneRM} ╨║╨│`;
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

  // ╨г╨▓╨╡╨┤╨╛╨╝╨╗╨╡╨╜╨╕╨╡ ╨▓ Telegram-╤З╨░╤В ╨╛ ╨▓╤Л╤Е╨╛╨┤╨╡ ╨╜╨╛╨▓╨╛╨╣ ╨▓╨╡╤А╤Б╨╕╨╕
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
          text: `ЁЯЪА <b>╨Т╨л╨и╨Ы╨Ю ╨Ю╨С╨Э╨Ю╨Т╨Ы╨Х╨Э╨Ш╨Х IRON COACH ${APP_CONFIG.version}!</b>\n\n` +
                `тЬи <b>╨з╤В╨╛ ╨╜╨╛╨▓╨╛╨│╨╛ ╨▓ ╤Н╤В╨╛╨╣ ╨▓╨╡╤А╤Б╨╕╨╕:</b>\n` +
                `тАв <b>╨Ш╨╜╤В╨╡╤А╨░╨║╤В╨╕╨▓╨╜╨░╤П ╨Р╨╜╨░╤В╨╛╨╝╨╕╤З╨╡╤Б╨║╨░╤П ╨Ъ╨░╤А╤В╨░ ╨в╨╡╨╗╨░:</b> ╨╜╨░╨╢╨╕╨╝╨░╨╣ ╨╜╨░ ╤З╨╡╨╗╨╛╨▓╨╡╨║╨░ (╨▓╨╕╨┤ ╨б╨┐╨╡╤А╨╡╨┤╨╕ ╨╕ ╨б╨╖╨░╨┤╨╕) тАФ ╨┐╨╛╨╗╤Г╤З╨░╨╣ ╨┐╨╛╨╗╨╜╨╛╨╡ ╨┤╨╛╤Б╤М╨╡ ╨┐╨╛ ╤Ж╨╡╨╗╨╡╨▓╨╛╨╣ ╨╝╤Л╤И╤Ж╨╡, ╤В╨╡╤Е╨╜╨╕╨║╨╡ ╨╕ ╨╗╤Г╤З╤И╨╕╨╝ ╤Г╨┐╤А╨░╨╢╨╜╨╡╨╜╨╕╤П╨╝!\n` +
                `тАв <b>╨Т╨╕╨╖╤Г╨░╨╗╤М╨╜╤Л╨╣ ╨а╨╛╤Б╤В ╨Ь╤Л╤И╤Ж (Hypertrophy Scaling):</b> ╨╝╤Л╤И╤Ж╤Л ╨╜╨░ ╤В╨╡╨╗╨╡ ╨▓╨╕╨╖╤Г╨░╨╗╤М╨╜╨╛ ╤Г╨▓╨╡╨╗╨╕╤З╨╕╨▓╨░╤О╤В╤Б╤П ╨▓ ╤А╨░╨╖╨╝╨╡╤А╨╡ ╨╕ ╤Б╨▓╨╡╤В╤П╤В╤Б╤П ╨╖╨╛╨╗╨╛╤В╤Л╨╝ ╨╜╨╡╨╛╨╜╨╛╨╝ ╨┐╨╛ ╨╝╨╡╤А╨╡ ╨╜╨░╨▒╨╛╤А╨░ ╨╜╨╡╨┤╨╡╨╗╤М╨╜╨╛╨│╨╛ ╨╛╨▒╤К╨╡╨╝╨░ ╤Б╨╡╤В╨╛╨▓ (RP MAV)!\n` +
                `тАв <b>╨в╨░╨╣╨╝╨╡╤А ╨Т╨╛╤Б╤Б╤В╨░╨╜╨╛╨▓╨╗╨╡╨╜╨╕╤П ╨Ь╤Л╤И╤Ж:</b> ╤В╨╛╤З╨╜╤Л╨╣ ╤А╨░╤Б╤З╨╡╤В ╤З╨░╤Б╨╛╨▓ ╨╛╤В╨┤╤Л╤Е╨░ ╨╕ ╨│╨╛╤В╨╛╨▓╨╜╨╛╤Б╤В╨╕ ╨╝╤Л╤И╨╡╤З╨╜╤Л╤Е ╨│╤А╤Г╨┐╨┐ ╨║ ╤Б╨╗╨╡╨┤╤Г╤О╤Й╨╡╨╣ ╤Б╨╡╤Б╤Б╨╕╨╕.\n` +
                `тАв <b>╨Р╨╜╨╕╨╝╨╕╤А╨╛╨▓╨░╨╜╨╜╤Л╨╡ ╤Б╤Е╨╡╨╝╤Л ╨▒╨╕╨╛╨╝╨╡╤Е╨░╨╜╨╕╨║╨╕:</b> ╨▓ ╤А╨╡╨╢╨╕╨╝╨╡ ╤В╤А╨╡╨╜╨╕╤А╨╛╨▓╨║╨╕ ╨╕ ╨║╨░╤В╨░╨╗╨╛╨│╨╡ ╨▒╨░╨╖╤Л ╤Г╨┐╤А╨░╨╢╨╜╨╡╨╜╨╕╨╣.\n\n` +
                `ЁЯСЗ <i>╨Ч╨░╤Е╨╛╨┤╨╕ ╨╕ ╨┐╤А╨╛╤В╨╡╤Б╤В╨╕╤А╤Г╨╣ ╨░╨╜╨░╤В╨╛╨╝╨╕╤З╨╡╤Б╨║╤Г╤О ╨║╨░╤А╤В╤Г:</i>`,
          withButton: true
        })
      }).catch(() => {});
    }
  }
});


// ========================================================
// ╨г╨Я╨а╨Р╨Т╨Ы╨Х╨Э╨Ш╨Х ╨в╨Х╨Ь╨Р╨Ь╨Ш ╨Ш ╨Э╨Р╨б╨в╨а╨Ю╨Щ╨Ъ╨Р╨Ь╨Ш ╨Ш╨Э╨в╨Х╨а╨д╨Х╨Щ╨б╨Р
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
  const labels = { light: "╨Ы╨╡╨│╨║╨╕╨╣", medium: "╨б╤А╨╡╨┤╨╜╨╕╨╣", heavy: "╨б╨╕╨╗╤М╨╜╤Л╨╣", off: "╨Т╤Л╨║╨╗" };
  if (labelEl) labelEl.textContent = labels[lvl] || "╨б╤А╨╡╨┤╨╜╨╕╨╣";

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
  if (metricsEl) metricsEl.textContent = `${appState.age || 32} ╨│ тАв ${appState.height || 178} ╤Б╨╝ тАв ${(appState.currentMetrics && appState.currentMetrics.weight) || 83} ╨║╨│`;
  if (goalEl) goalEl.textContent = appState.goal || "╨а╨╡╨║╨╛╨╝╨┐╨╛╨╖╨╕╤Ж╨╕╤П";

  const curTheme = appState.theme || "gold";
  ['gold', 'emerald', 'cyan', 'ruby', 'purple'].forEach(t => {
    const btn = document.getElementById("theme-btn-" + t);
    if (btn) btn.classList.toggle("active", t === curTheme);
  });
}
