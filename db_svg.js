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