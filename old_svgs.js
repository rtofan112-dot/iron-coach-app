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
function getExerciseAnatomyInfo(exName) {
  const n = (exName || "").toLowerCase().trim();
  
  let info = {
    name: exName,
    category: "Грудь",
    equipment: "Гантели / Скамья",
    tier: "Базовое упражнение",
    tempo: "3-1-1-0",
    breath: "Вдох на спуске 2–3с (растяжение), мощный выдох при выжиме.",
    muscleMatrix: [
      { name: "Целевой мышечный пучок", percent: 100, role: "Агонист (Основная)" },
      { name: "Вспомогательные мышцы", percent: 65, role: "Синергист" },
      { name: "Мышцы-стабилизаторы", percent: 40, role: "Стабилизаторы" }
    ],
    phases: [
      { title: "Фаза 1: Эксцентрика", desc: "Контролируемое опускание снаряда в течение 2–3 секунд. Глубокое растяжение рабочих волокон.", cue: "Вдох 💨 • Плавный спуск 2–3с" },
      { title: "Фаза 2: Натяжение & Пауза", desc: "Четкая пауза 1 секунда в нижней точке растяжения без расслабления и отскока.", cue: "Пауза ⏸️ • 1 сек фиксации" },
      { title: "Фаза 3: Концентрика", desc: "Взрывной подконтрольный выжим веса вверх по дуге силой целевой мышцы.", cue: "Выдох 💥 • Мощный подъем 1с" }
    ],
    dos: [
      "Держи лопатки сведенными и опущенными вниз.",
      "Сохраняй стабильный упор стопами в пол.",
      "Контролируй траекторию на каждом миллиметре амплитуды."
    ],
    donts: [
      "Не допускай рывков и инерции при смене направления.",
      "Не разгибай суставы до щелчка в верхней точке.",
      "Не задерживай дыхание натуживанием."
    ]
  };

  if (n.includes("наклонн") && n.includes("груд")) {
    info.category = "Грудь";
    info.equipment = "Гантели / Штанга / Наклонная скамья 30°";
    info.tier = "Базовое многосуставное";
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
  } else if (n.includes("концентрированные")) {
    info.category = "Бицепс";
    info.equipment = "Гантель / Горизонтальная скамья";
    info.tier = "Точечная пиковая изоляция";
    info.muscleMatrix = [
      { name: "Двуглавая мышца плеча (Пик сокращения)", percent: 100, role: "Главный агонист" },
      { name: "Плечевая мышца (Брахиалис)", percent: 70, role: "Синергист" }
    ];
    info.dos = [
      "Упри локоть рабочей руки в нижнюю треть внутренней поверхности бедра.",
      "Корпус слегка наклонен вперед и абсолютно неподвижен.",
      "Выполняй мощную супинацию в верхней точке амплитуды."
    ];
    info.donts = [
      "Не упирай локоть в верхнюю часть бедра или колено сверху.",
      "Не помогай себе раскачкой плеча или спины."
    ];
  } else if (n.includes("подъем гантелей на бицепс стоя")) {
    info.category = "Бицепс";
    info.equipment = "Гантели / Стойка";
    info.tier = "Базовое с супинацией";
    info.muscleMatrix = [
      { name: "Двуглавая мышца плеча (Оба пучка)", percent: 100, role: "Главный агонист" },
      { name: "Брахиалис", percent: 75, role: "Синергист" },
      { name: "Мышцы кора и предплечья", percent: 45, role: "Стабилизаторы" }
    ];
    info.dos = [
      "Стартуй из нейтрального хвата, начинай плавную супинацию с середины амплитуды.",
      "Локти зафиксированы строго у ребер.",
      "Опускай гантели подконтрольно за 2–3 секунды."
    ];
    info.donts = [
      "Не отклоняй корпус назад при подъеме веса (читинг).",
      "Не бросай руки вниз по инерции."
    ];
  } else if (n.includes("подъем штанги на бицепс")) {
    info.category = "Бицепс";
    info.equipment = "Штанга (Прямой или EZ-гриф)";
    info.tier = "Золотая база на бицепс";
    info.muscleMatrix = [
      { name: "Двуглавая мышца плеча целиком", percent: 100, role: "Главный агонист" },
      { name: "Брахиалис", percent: 80, role: "Синергист" },
      { name: "Мышцы кора и поясница", percent: 50, role: "Стабилизаторы" }
    ];
    info.dos = [
      "Хват на ширине плеч, локти плотно прижаты к бокам.",
      "Подъем выполняется исключительно силой сгибания локтевых суставов.",
      "В верхней точке сжимай бицепсы без выведения локтей вперед."
    ];
    info.donts = [
      "Не забрасывай штангу спиной и тазом.",
      "Не сгибай запястья внутрь (держи кисть в нейтральной линии)."
    ];
  } else if (n.includes("нижнем блоке кроссовера")) {
    info.category = "Бицепс";
    info.equipment = "Нижний блок кроссовера / Прямая рукоять или канат";
    info.tier = "Изолирующее с постоянным натяжением";
    info.muscleMatrix = [
      { name: "Двуглавая мышца плеча", percent: 100, role: "Главный агонист" },
      { name: "Брахиалис", percent: 70, role: "Синергист" }
    ];
    info.dos = [
      "Сделай полшага назад от блока для создания стартового натяжения троса.",
      "Сгибай руки по дуге к плечам, чувствуя постоянное сопротивление.",
      "Задерживайся на 1 секунду в верхней точке максимального сокращения."
    ];
    info.donts = [
      "Не допускай соприкосновения весовых плиток в нижней точке.",
      "Не раскачивайся корпусом."
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
  } else if (n.includes("французский жим с гантелями")) {
    info.category = "Трицепс";
    info.equipment = "Гантели / Горизонтальная скамья";
    info.tier = "Изолирующее на длинную и латеральную головки";
    info.muscleMatrix = [
      { name: "Длинная и латеральная головки трицепса", percent: 100, role: "Главный агонист" },
      { name: "Медиальная головка трицепса", percent: 80, role: "Синергист" }
    ];
    info.dos = [
      "Опускай гантели параллельно по бокам от головы к вискам.",
      "Локти удерживай направленными строго в потолок параллельно друг другу.",
      "В нижней точке получай глубокое растяжение трицепса."
    ];
    info.donts = [
      "Не разводи локти широко в стороны во время сгибания.",
      "Не делай рывков из нижней точки растяжения."
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
  } else if (n.includes("блоке из-за головы") || (n.includes("из-за головы") && n.includes("блок"))) {
    info.category = "Трицепс";
    info.equipment = "Верхний блок / Канатная рукоять";
    info.tier = "Изолирующее с постоянной растяжкой";
    info.muscleMatrix = [
      { name: "Длинная головка трицепса", percent: 100, role: "Главный агонист" },
      { name: "Латеральная головка", percent: 80, role: "Синергист" }
    ];
    info.dos = [
      "Наклони корпус вперед на 30–45°, стоя спиной к верхнему блоку.",
      "Разгибай руки вперед-вверх, разводя концы каната в стороны.",
      "Ощущай постоянное непрерывное растяжение троса в стартовой точке."
    ];
    info.donts = [
      "Не поднимай корпус вверх во время разгибания.",
      "Не своди локти слишком узко к шее."
    ];
  } else if (n.includes("верхнем блоке с канатом")) {
    info.category = "Трицепс";
    info.equipment = "Верхний блок / Канатная рукоять";
    info.tier = "Изолирующее на пиковое сокращение";
    info.muscleMatrix = [
      { name: "Латеральная и медиальная головки трицепса", percent: 100, role: "Главный агонист" },
      { name: "Длинная головка трицепса", percent: 70, role: "Синергист" }
    ];
    info.dos = [
      "Локти зафиксируй намертво по бокам у ребер.",
      "В нижней точке полностью выпрями руки и разводи кисти в стороны.",
      "Удерживай пиковое сокращение 1 секунду на каждом повторении."
    ];
    info.donts = [
      "Не выводи локти вперед и не помогай весом корпуса.",
      "Не поднимай плечи к ушам."
    ];
  } else if (n.includes("прямой / v-рукоятью") || (n.includes("разгибания") && n.includes("v-рукоят"))) {
    info.category = "Трицепс";
    info.equipment = "Верхний блок / V-образная рукоять";
    info.tier = "Изолирующее силовое на латеральную головку";
    info.muscleMatrix = [
      { name: "Латеральная (внешняя) головка трицепса", percent: 100, role: "Главный агонист" },
      { name: "Медиальная головка", percent: 85, role: "Синергист" }
    ];
    info.dos = [
      "Жми на V-рукоять основанием ладоней, сохраняя легкий наклон корпуса.",
      "Локти зафиксированы строго у талии.",
      "Плавно поднимай рукоять до угла 90° в локтях без потери натяжения."
    ];
    info.donts = [
      "Не закидывай рукоять слишком высоко к подбородку.",
      "Не наваливайся грудью на снаряд."
    ];
  } else if (n.includes("обратные отжимания")) {
    info.category = "Трицепс";
    info.equipment = "Горизонтальная скамья / Собственный вес";
    info.tier = "Базовое с собственным весом";
    info.muscleMatrix = [
      { name: "Трицепс плеча целиком", percent: 100, role: "Главный агонист" },
      { name: "Передний пучок дельтовидной", percent: 65, role: "Синергист" },
      { name: "Мышцы кора", percent: 40, role: "Стабилизаторы" }
    ];
    info.dos = [
      "Ладони на краю скамьи строго на ширине плеч.",
      "Спина скользит вниз вплотную к скамье (не удаляй таз вперед!).",
      "Опускайся до угла 90° в локтевых суставах."
    ];
    info.donts = [
      "Не опускайся слишком глубоко (острее 90°) — это перегружает суставную капсулу плеча.",
      "Не отводи таз далеко от края скамьи."
    ];
  } else if (n.includes("кикбэк")) {
    info.category = "Трицепс";
    info.equipment = "Гантель / Скамья для упора";
    info.tier = "Пиковая изоляция латеральной головки";
    info.muscleMatrix = [
      { name: "Латеральная головка трицепса", percent: 100, role: "Главный агонист" },
      { name: "Длинная головка трицепса", percent: 75, role: "Синергист" }
    ];
    info.dos = [
      "Корпус параллелен полу, плечевая кость зафиксирована параллельно полу чуть выше спины.",
      "Разгибай предплечье строго назад до идеальной прямой линии.",
      "Задерживайся в пиковом напряжении на 1 секунду."
    ];
    info.donts = [
      "Не опускай локоть вниз во время движения.",
      "Не раскачивай гантель маятником."
    ];
  } else if (n.includes("мах") && n.includes("сторон")) {
    info.category = "Плечи";
    info.equipment = "Гантели / Стоя";
    info.tier = "Изолирующее на ширину плеч";
    info.muscleMatrix = [
      { name: "Средний пучок дельтовидной мышцы", percent: 100, role: "Главный агонист" },
      { name: "Надостная мышца", percent: 75, role: "Синергист" },
      { name: "Трапециевидная мышца (минимизировать)", percent: 30, role: "Стабилизатор" }
    ];
    info.dos = [
      "Наклони корпус слегка вперед на 5–10°.",
      "Движение ведут локти, кисти всегда чуть ниже локтей.",
      "Поднимай снаряд строго до параллели с полом."
    ];
    info.donts = [
      "Не поджимай плечи к ушам (нагрузка забирается верхней трапецией).",
      "Не задирай кисти выше локтей."
    ];
  }

  return info;
}


// ========================================================
// МОДУЛЬ ТЕХНИКИ УПРАЖНЕНИЙ И СЕКРЕТОВ PRO (ЧИСТЫЙ РУССКИЙ ЯЗЫК)
// ========================================================

function switchVisualizerTab(tab) {
  const tabs = ['bio', 'keys'];
  tabs.forEach(t => {
    const btn = document.getElementById(`vis-tab-btn-${t}`);
    const panel = document.getElementById(`vis-panel-${t}`);
    if (btn) {
      if (t === tab) {
        btn.className = "flex-1 py-2 rounded-xl bg-[#c8a97e] text-slate-950 font-bold text-center shadow-sm";
      } else {
        btn.className = "flex-1 py-2 rounded-xl bg-white/5 text-slate-400 border border-white/10 font-medium text-center hover:bg-white/10";
      }
    }
    if (panel) {
      panel.classList.toggle("hidden", t !== tab);
    }
  });
  Sound.click();
  Haptic.selection();
}

function openExerciseProVisualizer(exIdOrName, source = 'catalog') {
  let exName = exIdOrName;
  let ex = null;
  if (typeof EXERCISE_DATABASE !== 'undefined') {
    ex = EXERCISE_DATABASE.find(e => e.id === exIdOrName || e.name.toLowerCase() === (exIdOrName || "").toLowerCase());
    if (ex) exName = ex.name;
  }

  const info = getExerciseAnatomyInfo(exName);
  
  // Установка заголовков
  const nameEl = document.getElementById("vis-ex-name");
  const catEl = document.getElementById("vis-badge-cat");
  const tierEl = document.getElementById("vis-badge-tier");
  const svgContainer = document.getElementById("vis-svg-container");
  
  if (nameEl) nameEl.textContent = info.name;
  if (catEl) catEl.textContent = info.category;
  if (tierEl) tierEl.textContent = info.tier;
  if (svgContainer) svgContainer.innerHTML = getExerciseDiagramSVG(info.name, info.category);

  // Таб 1: Распределение нагрузки по мышцам
  const matrixContainer = document.getElementById("vis-muscle-matrix-container");
  if (matrixContainer && info.muscleMatrix) {
    matrixContainer.innerHTML = info.muscleMatrix.map(m => `
      <div class="space-y-1">
        <div class="flex justify-between items-center text-[10px]">
          <span class="text-slate-200 font-bold">${m.name}</span>
          <span class="text-[#c8a97e] font-mono font-bold">${m.percent}% • ${m.role}</span>
        </div>
        <div class="w-full bg-[#141724] h-2 rounded-full overflow-hidden border border-white/[0.05]">
          <div class="bg-gradient-to-r from-[#c8a97e] to-amber-300 h-full rounded-full transition-all duration-500" style="width: ${m.percent}%"></div>
        </div>
      </div>
    `).join('');
  }

  // Таб 2: Секреты техники и частые ошибки
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

  // Открываем на дефолтной вкладке «Техника и Схема»
  switchVisualizerTab('bio');
  openModal('modal-exercise-pro-visualizer');
  Sound.click();
  Haptic.selection();
}

function actionFromVisualizer() {
  closeModal('modal-exercise-pro-visualizer');
}

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
  { id: "db_ch_8", name: "Жим штанги на наклонной скамье 30°", category: "Грудь", muscleGroup: "Грудь", targetMuscles: "Верх грудных • Передняя дельта • Трицепс", phases: ["01: Угол скамьи 30°", "02: Опускание к верху груди", "03: Мощный выжим"], defaultSets: 4, min: 8, max: 10, defaultWeight: 55, calRate: 13, isTime: false, tip: "Гриф опускай на 2-3 см ниже ключиц, локти под 60-70° к телу." },

  // СПИНА
  { id: "db_bk_1", name: "Тяга горизонтального блока к поясу (нейтральный хват)", category: "Спина", muscleGroup: "Спина", targetMuscles: "Широчайшие мышцы • Ромбовидные • Середина спины", phases: ["01: Локти скользят назад", "02: Сведение лопаток", "03: Растяжка 2с"], defaultSets: 4, min: 10, max: 12, defaultWeight: 45, calRate: 11, isTime: false, tip: "Локти скользят вдоль ребер назад, плечи зафиксированы внизу." },
  { id: "db_bk_2", name: "Тяга верхнего блока нейтральным хватом к груди", category: "Спина", muscleGroup: "Спина", targetMuscles: "Верх широчайших • Середина спины", phases: ["01: Растяжка вверху", "02: Тяга к ключицам", "03: Опускание лопаток"], defaultSets: 4, min: 10, max: 12, defaultWeight: 50, calRate: 12, isTime: false, tip: "Симметричная тяга к верху груди, лопатки опущены вниз." },
  { id: "db_bk_3", name: "Тяга каната к лицу (Face Pull — разгрузка шеи)", category: "Спина", muscleGroup: "Спина", targetMuscles: "Задняя дельта • Мышцы лопатки (снятие спазма)", phases: ["01: Канат к глазам", "02: Локти назад и врозь", "03: Пауза 2с"], defaultSets: 4, min: 15, max: 20, defaultWeight: 15, calRate: 8, isTime: false, tip: "Канат к глазам, локти разводи назад, пауза 2 сек (снимает спазм мышцы шеи)." },
  { id: "db_bk_4", name: "Подтягивания на турнике (или в гравитроне)", category: "Спина", muscleGroup: "Спина", targetMuscles: "Широчайшие мышцы • Брахиалис", phases: ["01: Полный вис", "02: Подтягивание к груди", "03: Плавный спуск"], defaultSets: 4, min: 6, max: 10, defaultWeight: 0, calRate: 13, isTime: false, tip: "Грудь тянется к перекладине, плечи опущены, без раскачки." },
  { id: "db_bk_5", name: "Тяга гантели в наклоне с упором в скамью", category: "Спина", muscleGroup: "Спина", targetMuscles: "Односторонняя проработка широчайшей мышцы", phases: ["01: Упор рукой", "02: Тяга к бедру", "03: Растяжка внизу"], defaultSets: 3, min: 10, max: 12, defaultWeight: 22, calRate: 10, isTime: false, tip: "Тяни гантель строго к тазу по дуге, без скручивания позвоночника." },
  { id: "db_bk_6", name: "Гиперэкстензия для разгибателей спины", category: "Спина", muscleGroup: "Спина", targetMuscles: "Поясничные разгибатели • Ягодицы", phases: ["01: Опускание до 90°", "02: Подъем в линию", "03: Без переразгиба"], defaultSets: 3, min: 12, max: 15, defaultWeight: 0, calRate: 8, isTime: false, tip: "Не прогибайся сильно назад вверху, держи корпус в прямую линию." },
  { id: "db_bk_7", name: "Тяга Т-грифа с упором в грудь", category: "Спина", muscleGroup: "Спина", targetMuscles: "Широчайшие • Толщина спины • Ромбовидные", phases: ["01: Упор грудью", "02: Тяга локтями назад", "03: Сведение лопаток"], defaultSets: 4, min: 8, max: 10, defaultWeight: 40, calRate: 12, isTime: false, tip: "Упор грудью полностью разгружает поясницу, позволяя акцентированно нагрузить середину спины." },

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

  // ==========================================
  // ТРИЦЕПС
  // ==========================================
  { id: "db_tr_1", name: "Жим штанги узким хватом лежа", category: "Трицепс", muscleGroup: "Трицепс", targetMuscles: "Трицепс (все 3 головки) • Передняя дельта • Верх груди", phases: ["01: Хват на ширине плеч", "02: Опускание к низу груди", "03: Мощный выжим"], defaultSets: 4, min: 8, max: 10, defaultWeight: 50, calRate: 12, isTime: false, tip: "Хват строго на ширине плеч (не слишком узко), локти держи ближе к корпусу (под 30-45°)." },
  { id: "db_tr_2", name: "Французский жим с гантелями лежа на скамье", category: "Трицепс", muscleGroup: "Трицепс", targetMuscles: "Длинная и латеральная головка трицепса", phases: ["01: Нейтральный хват", "02: Опускание к вискам", "03: Разгибание"], defaultSets: 3, min: 10, max: 12, defaultWeight: 10, calRate: 7, isTime: false, tip: "Независимая работа каждой руки исключает дисбаланс, локти параллельны друг другу." },
  { id: "db_tr_3", name: "Французский жим со штангой (EZ-гриф) лежа", category: "Трицепс", muscleGroup: "Трицепс", targetMuscles: "Длинная и латеральная головка трицепса", phases: ["01: Наклон плеча 15° назад", "02: Опускание за макушку", "03: Разгибание в локтях"], defaultSets: 4, min: 10, max: 12, defaultWeight: 25, calRate: 9, isTime: false, tip: "Опускай гриф чуть за голову (к макушке), чтобы сохранять постоянное натяжение длинной головки." },
  { id: "db_tr_4", name: "Разгибание руки с гантелью из-за головы сидя", category: "Трицепс", muscleGroup: "Трицепс", targetMuscles: "Длинная головка трицепса (максимальная растяжка)", phases: ["01: Гантель над головой", "02: Глубокое опускание за шею", "03: Выжим вверх"], defaultSets: 3, min: 10, max: 12, defaultWeight: 18, calRate: 8, isTime: false, tip: "Локти держи направленными вверх и не разводи широко, ощущай мощное растяжение трицепса." },
  { id: "db_tr_5", name: "Разгибания рук на верхнем блоке с канатом", category: "Трицепс", muscleGroup: "Трицепс", targetMuscles: "Латеральная и медиальная головка трицепса", phases: ["01: Фиксация локтей у ребер", "02: Разведение каната внизу", "03: Пиковое сжатие 1с"], defaultSets: 3, min: 12, max: 15, defaultWeight: 20, calRate: 7, isTime: false, tip: "Локти намертво зафиксированы у корпуса, разводи концы каната в стороны в нижней точке." },
  { id: "db_tr_6", name: "Разгибания рук на блоке с прямой / V-рукоятью", category: "Трицепс", muscleGroup: "Трицепс", targetMuscles: "Латеральная головка трицепса (боковая часть)", phases: ["01: Упор в рукоять", "02: Полное выпрямление вниз", "03: Плавный подъем до 90°"], defaultSets: 3, min: 10, max: 12, defaultWeight: 25, calRate: 8, isTime: false, tip: "Корпус слегка наклонен вперед, жми рукоять вниз основанием ладоней." },
  { id: "db_tr_7", name: "Отжимания от скамьи сзади (обратные отжимания)", category: "Трицепс", muscleGroup: "Трицепс", targetMuscles: "Трицепс • Передняя дельта", phases: ["01: Упор руками в край скамьи", "02: Опускание до 90°", "03: Выжим"], defaultSets: 3, min: 12, max: 15, defaultWeight: 0, calRate: 9, isTime: false, tip: "Спина скользит вплотную к скамье, плечи не задирай к ушам." },
  { id: "db_tr_8", name: "Разгибание руки назад с гантелью в наклоне (Кикбэк)", category: "Трицепс", muscleGroup: "Трицепс", targetMuscles: "Пиковая изоляция латеральной головки трицепса", phases: ["01: Локоть поднят выше спины", "02: Разгибание назад", "03: Фиксация 1с"], defaultSets: 3, min: 12, max: 15, defaultWeight: 8, calRate: 6, isTime: false, tip: "Плечевая кость строго параллельна полу, двигается только предплечье." },
  { id: "db_tr_9", name: "Разгибания на блоке из-за головы с канатом", category: "Трицепс", muscleGroup: "Трицепс", targetMuscles: "Длинная головка трицепса • Постоянное натяжение троса", phases: ["01: Трос за головой", "02: Разгибание вперед-вверх", "03: Разведение кистей"], defaultSets: 3, min: 12, max: 15, defaultWeight: 18, calRate: 7, isTime: false, tip: "Отличное изолированное упражнение для длинной головки трицепса в растянутой позиции." },

  // ==========================================
  // БИЦЕПС
  // ==========================================
  { id: "db_bi_1", name: "Сгибания рук с гантелями на наклонной скамье 45°", category: "Бицепс", muscleGroup: "Бицепс", targetMuscles: "Длинная головка бицепса (максимальная растяжка)", phases: ["01: Локти отведены назад", "02: Подъем с супинацией", "03: Глубокий спуск 3с"], defaultSets: 3, min: 10, max: 12, defaultWeight: 10, calRate: 8, isTime: false, tip: "Наклон скамьи 45° создает мощнейшее растяжение длинной головки бицепса в стартовой позиции." },
  { id: "db_bi_2", name: "Подъем гантелей на бицепс стоя с супинацией", category: "Бицепс", muscleGroup: "Бицепс", targetMuscles: "Двуглавая мышца плеча (бицепс) • Пик бицепса", phases: ["01: Нейтральный хват внизу", "02: Разворот кисти наружу", "03: Сжатие вверху 1с"], defaultSets: 3, min: 10, max: 12, defaultWeight: 12, calRate: 8, isTime: false, tip: "В верхней трети амплитуды максимально разворачивай мизинец вверх и наружу." },
  { id: "db_bi_3", name: "Молотковые сгибания с гантелями (Hammer Curls)", category: "Бицепс", muscleGroup: "Бицепс", targetMuscles: "Брахиалис • Плечелучевая мышца • Длинная головка бицепса", phases: ["01: Нейтральный хват (ладони внутрь)", "02: Подъем локтями вниз", "03: Медленный спуск"], defaultSets: 3, min: 10, max: 12, defaultWeight: 14, calRate: 8, isTime: false, tip: "Развивает брахиалис, который выталкивает бицепс наружу и дает мощную толщину рукам." },
  { id: "db_bi_4", name: "Молотковые сгибания с гантелями на наклонной скамье", category: "Бицепс", muscleGroup: "Бицепс", targetMuscles: "Брахиалис • Внешняя часть бицепса и предплечья", phases: ["01: Упор в спинку 60°", "02: Нейтральный подъем", "03: Контроль негатива"], defaultSets: 3, min: 10, max: 12, defaultWeight: 12, calRate: 8, isTime: false, tip: "Сочетает мощное растяжение наклонной скамьи и гипертрофию брахиалиса." },
  { id: "db_bi_5", name: "Сгибания рук на скамье Скотта (со штангой или гантелью)", category: "Бицепс", muscleGroup: "Бицепс", targetMuscles: "Короткая (внутренняя) головка бицепса • Полная изоляция", phases: ["01: Подмышки плотно на упоре", "02: Подъем силой бицепса", "03: Растяжка без переразгиба"], defaultSets: 3, min: 10, max: 12, defaultWeight: 22, calRate: 8, isTime: false, tip: "Полностью исключает помощь плеч и корпуса. Внизу не разгибай локти до хруста в суставах." },
  { id: "db_bi_6", name: "Концентрированные сгибания с гантелью сидя", category: "Бицепс", muscleGroup: "Бицепс", targetMuscles: "Пик двуглавой мышцы плеча (точечная прорисовка)", phases: ["01: Упор локтем во внутреннюю часть бедра", "02: Подъем к подбородку", "03: Пауза 2с"], defaultSets: 3, min: 12, max: 15, defaultWeight: 10, calRate: 7, isTime: false, tip: "Упри локоть в бедро, корпус неподвижен. Делай акцент на пиковое сокращение в верхней точке." },
  { id: "db_bi_7", name: "Подъем штанги на бицепс стоя (прямой или EZ-гриф)", category: "Бицепс", muscleGroup: "Бицепс", targetMuscles: "Бицепс (длинная и короткая головка) • Брахиалис", phases: ["01: Локти прижаты к бокам", "02: Подъем до уровня груди", "03: Опускание 2–3с"], defaultSets: 4, min: 8, max: 10, defaultWeight: 30, calRate: 10, isTime: false, tip: "Главная золотая база на бицепс. Не закидывай спиной (без читинга), опускай подконтрольно." },
  { id: "db_bi_8", name: "Сгибания на нижнем блоке кроссовера (с канатом/ручкой)", category: "Бицепс", muscleGroup: "Бицепс", targetMuscles: "Бицепс • Постоянное натяжение троса", phases: ["01: Локти у ребер", "02: Сгибание по дуге", "03: Пиковое напряжение 1с"], defaultSets: 3, min: 12, max: 15, defaultWeight: 20, calRate: 7, isTime: false, tip: "Трос дает равномерную нагрузку даже в верхней точке, где со штангой нагрузка падает." },
  { id: "db_bi_9", name: "Паучьи сгибания с гантелями (Spider Curls на скамье)", category: "Бицепс", muscleGroup: "Бицепс", targetMuscles: "Короткая головка бицепса • Пиковый пампинг", phases: ["01: Грудь на наклонной скамье", "02: Руки вертикально вниз", "03: Сгибание вверх"], defaultSets: 3, min: 12, max: 15, defaultWeight: 10, calRate: 7, isTime: false, tip: "Изолирует верхнюю треть амплитуды и исключает инерцию корпуса." },

  // ПРЕСС
  { id: "db_abs_1", name: "Скручивания на блоке с канатом на пресс", category: "Пресс", muscleGroup: "Пресс", targetMuscles: "Прямая мышца живота", phases: ["01: Вдох вверху", "02: Скручивание на выдохе", "03: Сжатие 1с"], defaultSets: 3, min: 12, max: 15, defaultWeight: 35, calRate: 8, isTime: false, tip: "Скручивай грудную клетку к тазу силой мышц пресса." },
  { id: "db_abs_2", name: "Подъем коленей в висе на брусьях на пресс", category: "Пресс", muscleGroup: "Пресс", targetMuscles: "Нижняя часть прямой мышцы живота", phases: ["01: Фиксация плеч", "02: Подкручивание таза", "03: Пауза 1с"], defaultSets: 3, min: 12, max: 15, defaultWeight: 0, calRate: 7, isTime: false, tip: "Подкручивай таз вверх на выдохе для включения низа живота." },
  { id: "db_abs_3", name: "Планка на локтях (удержание корсета)", category: "Пресс", muscleGroup: "Пресс", targetMuscles: "Поперечная мышца живота • Корсет", phases: ["01: Прямая линия", "02: Сжатие ягодиц", "03: Ровное дыхание"], defaultSets: 3, min: 45, max: 60, defaultWeight: 0, calRate: 6, isTime: true, tip: "Не прогибай поясницу, подкручивай таз вперед." },

  // КАРДИО
  { id: "db_card_1", name: "Ходьба в горку на дорожке (сжигание жира)", category: "Кардио", muscleGroup: "Кардио", targetMuscles: "Сердечно-сосудистая система • Жиросжигание", phases: ["01: Уклон 8–10%", "02: Скорость 5.5 км/ч", "03: Пульс 115–125"], defaultSets: 1, min: 25, max: 30, defaultWeight: 0, calRate: 200, isTime: true, tip: "Уклон 8-10%, скорость 5.5 км/ч. Пульс 115-125 уд/мин без одышки." },
  { id: "db_card_2", name: "Эллиптический тренажер", category: "Кардио", muscleGroup: "Кардио", targetMuscles: "Все тело • Щадящий режим для коленных суставов", phases: ["01: Ровный темп", "02: Умеренное усилие", "03: Пульс 120"], defaultSets: 1, min: 20, max: 30, defaultWeight: 0, calRate: 180, isTime: true, tip: "Идеально для разогрева и заминки без ударной нагрузки на суставы." }
];

// ========================================================
// ТОЧНАЯ БИОМЕХАНИЧЕСКАЯ МАТРИЦА 1-В-1 ЗАМЕН (ТОЛЬКО ИДЕНТИЧНЫЙ ВЕКТОР)
// ========================================================
const EXACT_BIOMECHANICAL_TWINS = {
  // ГРУДЬ: НАКЛОННЫЙ ЖИМ (ВЕРХ ГРУДИ)
  "Жим гантелей на наклонной скамье 30°": ["Жим штанги на наклонной скамье 30°", "Жим в тренажере Хаммер на грудь"],
  "Жим штанги на наклонной скамье 30°": ["Жим гантелей на наклонной скамье 30°", "Жим в тренажере Хаммер на грудь"],

  // ГРУДЬ: ГОРИЗОНТАЛЬНЫЙ ЖИМ (СЕРЕДИНА ГРУДИ)
  "Жим гантелей на горизонтальной скамье": ["Жим штанги лежа на горизонтальной скамье", "Жим в тренажере Хаммер на грудь"],
  "Жим штанги лежа на горизонтальной скамье": ["Жим гантелей на горизонтальной скамье", "Жим в тренажере Хаммер на грудь"],
  "Жим в тренажере Хаммер на грудь": ["Жим гантелей на горизонтальной скамье", "Жим штанги лежа на горизонтальной скамье", "Жим гантелей на наклонной скамье 30°"],

  // ГРУДЬ: ИЗОЛИРОВАННЫЕ СВЕДЕНИЯ
  "Сведения рук в тренажере бабочка (Pec Deck)": ["Сведения в кроссовере на блоках"],
  "Сведения в кроссовере на блоках": ["Сведения рук в тренажере бабочка (Pec Deck)"],

  // ГРУДЬ: ОТЖИМАНИЯ НА БРУСЬЯХ
  "Отжимания на брусьях (с акцентом на грудь)": ["Жим в тренажере Хаммер на грудь"],

  // СПИНА: ГОРИЗОНТАЛЬНАЯ ТЯГА (ТОЛЩИНА СПИНЫ)
  "Тяга горизонтального блока к поясу (нейтральный хват)": ["Тяга гантели в наклоне с упором в скамью", "Тяга Т-грифа с упором в грудь"],
  "Тяга гантели в наклоне с упором в скамью": ["Тяга горизонтального блока к поясу (нейтральный хват)", "Тяга Т-грифа с упором в грудь"],
  "Тяга Т-грифа с упором в грудь": ["Тяга горизонтального блока к поясу (нейтральный хват)", "Тяга гантели в наклоне с упором в скамью"],

  // СПИНА: ВЕРТИКАЛЬНАЯ ТЯГА (ШИРИНА СПИНЫ)
  "Тяга верхнего блока нейтральным хватом к груди": ["Подтягивания на турнике (или в гравитроне)"],
  "Подтягивания на турнике (или в гравитроне)": ["Тяга верхнего блока нейтральным хватом к груди"],

  // СПИНА / ПЛЕЧИ: РАЗГРУЗКА ШЕИ И ЗАДНЯЯ ДЕЛЬТА
  "Тяга каната к лицу (Face Pull — разгрузка шеи)": ["Разводка гантелей в наклоне на заднюю дельту"],
  "Разводка гантелей в наклоне на заднюю дельту": ["Тяга каната к лицу (Face Pull — разгрузка шеи)"],

  // СПИНА: РАЗГИБАТЕЛИ
  "Гиперэкстензия для разгибателей спины": ["Румынская тяга с гантелями"],

  // НОГИ: КВАДРИЦЕПС / ЖИМ ПЛАТФОРМЫ
  "Жим ногами под углом 45° в тренажере": ["Приседания в Гакк-тренажере"],
  "Приседания в Гакк-тренажере": ["Жим ногами под углом 45° в тренажере"],
  "Разгибания ног в тренажере сидя": [],

  // НОГИ: БИЦЕПС БЕДРА
  "Сгибания ног сидя или лежа в тренажере": [],
  "Румынская тяга с гантелями": ["Гиперэкстензия для разгибателей спины"],

  // НОГИ: ГОЛЕНЬ
  "Подъем на носки стоя на икроножные": [],

  // ПЛЕЧИ: ИЗОЛЯЦИЯ СРЕДНЕЙ ДЕЛЬТЫ
  "Махи гантелями через стороны стоя": ["Протяжка на блоке к подбородку (широкий хват)"],
  "Протяжка на блоке к подбородку (широкий хват)": ["Махи гантелями через стороны стоя"],

  // ПЛЕЧИ: БАЗОВЫЙ ЖИМ
  "Жим гантелей сидя на плечи (скамья 75°)": [],

  // БИЦЕПС: РАСТЯЖЕНИЕ НА НАКЛОННОЙ СКАМЬЕ (ДЛИННАЯ ГОЛОВКА)
  "Сгибания рук с гантелями на наклонной скамье 45°": ["Молотковые сгибания с гантелями на наклонной скамье"],
  "Молотковые сгибания с гантелями на наклонной скамье": ["Сгибания рук с гантелями на наклонной скамье 45°", "Молотковые сгибания с гантелями (Hammer Curls)"],

  // БИЦЕПС: БАЗОВЫЙ ПОДЪЕМ СТОЯ
  "Подъем гантелей на бицепс стоя с супинацией": ["Подъем штанги на бицепс стоя (прямой или EZ-гриф)", "Сгибания на нижнем блоке кроссовера (с канатом/ручкой)"],
  "Подъем штанги на бицепс стоя (прямой или EZ-гриф)": ["Подъем гантелей на бицепс стоя с супинацией", "Сгибания на нижнем блоке кроссовера (с канатом/ручкой)"],
  "Сгибания на нижнем блоке кроссовера (с канатом/ручкой)": ["Подъем гантелей на бицепс стоя с супинацией", "Подъем штанги на бицепс стоя (прямой или EZ-гриф)"],

  // БИЦЕПС: МОЛОТКОВЫЙ ХВАТ (БРАХИАЛИС)
  "Молотковые сгибания с гантелями (Hammer Curls)": ["Молотковые сгибания с гантелями на наклонной скамье"],

  // БИЦЕПС: ПИКОВОЕ СОКРАЩЕНИЕ / СКАМЬЯ СКОТТА
  "Сгибания рук на скамье Скотта (со штангой или гантелью)": ["Паучьи сгибания с гантелями (Spider Curls на скамье)", "Концентрированные сгибания с гантелью сидя"],
  "Паучьи сгибания с гантелями (Spider Curls на скамье)": ["Сгибания рук на скамье Скотта (со штангой или гантелью)", "Концентрированные сгибания с гантелью сидя"],
  "Концентрированные сгибания с гантелью сидя": ["Сгибания рук на скамье Скотта (со штангой или гантелью)", "Паучьи сгибания с гантелями (Spider Curls на скамье)"],

  // ТРИЦЕПС: РАЗГИБАНИЯ НА БЛОКЕ СТОЯ
  "Разгибания рук на верхнем блоке с канатом": ["Разгибания рук на блоке с прямой / V-рукоятью"],
  "Разгибания рук на блоке с прямой / V-рукоятью": ["Разгибания рук на верхнем блоке с канатом"],

  // ТРИЦЕПС: ФРАНЦУЗСКИЙ ЖИМ ЛЕЖА
  "Французский жим с гантелями лежа на скамье": ["Французский жим со штангой (EZ-гриф) лежа"],
  "Французский жим со штангой (EZ-гриф) лежа": ["Французский жим с гантелями лежа на скамье"],

  // ТРИЦЕПС: РАЗГИБАНИЯ ИЗ-ЗА ГОЛОВЫ
  "Разгибание руки с гантелью из-за головы сидя": ["Разгибания на блоке из-за головы с канатом"],
  "Разгибания на блоке из-за головы с канатом": ["Разгибание руки с гантелью из-за головы сидя"],

  // ТРИЦЕПС: БАЗОВЫЙ ЖИМ
  "Жим штанги узким хватом лежа": ["Отжимания от скамьи сзади (обратные отжимания)"],
  "Отжимания от скамьи сзади (обратные отжимания)": ["Жим штанги узким хватом лежа"],

  // ТРИЦЕПС: КИКБЭК
  "Разгибание руки назад с гантелью в наклоне (Кикбэк)": [],

  // ПРЕСС
  "Скручивания на блоке с канатом на пресс": ["Подъем коленей в висе на брусьях на пресс"],
  "Подъем коленей в висе на брусьях на пресс": ["Скручивания на блоке с канатом на пресс"],
  "Планка на локтях (удержание корсета)": [],

  // КАРДИО
  "Ходьба в горку на дорожке (сжигание жира)": ["Эллиптический тренажер"],
  "Эллиптический тренажер": ["Ходьба в горку на дорожке (сжигание жира)"]
};

const DEFAULT_PROGRAMS = {
  a: {
    name: "Тренировка А (База Верх + Ноги)",
    exercises: [
      { name: "Жим гантелей на наклонной скамье 30°", muscleGroup: "Грудь", targetMuscles: "Верх грудных • Передняя дельта", phases: ["01: Опускание 2-3с", "02: Пауза 1с", "03: Выжим"], sets: 4, min: 8, max: 10, w: 22, calRate: 12, tip: "Локти 60-70° к корпусу, лопатки сведены и опущены.", substitutes: ["Жим гантелей на горизонтальной скамье", "Жим штанги лежа на горизонтальной скамье", "Жим в тренажере Хаммер на грудь"] },
      { name: "Жим гантелей на горизонтальной скамье", muscleGroup: "Грудь", targetMuscles: "Середина груди • Трицепс", phases: ["01: Растяжка 2с", "02: Фиксация", "03: Выжим"], sets: 4, min: 8, max: 10, w: 24, calRate: 12, tip: "Мощный выжим, пауза 1 сек в нижней точке.", substitutes: ["Жим штанги лежа на горизонтальной скамье", "Жим в тренажере Хаммер на грудь", "Отжимания на брусьях (с акцентом на грудь)"] },
      { name: "Жим ногами под углом 45° в тренажере", muscleGroup: "Ноги", targetMuscles: "Квадрицепс • Ягодицы", phases: ["01: Пятки в платформу", "02: Угол 90°", "03: Без щелчка суставов"], sets: 4, min: 10, max: 12, w: 90, calRate: 16, tip: "Колени вверху не вставляй, упор в середину стопы и пятки.", substitutes: ["Приседания в Гакк-тренажере", "Разгибания ног в тренажере сидя"] },
      { name: "Тяга горизонтального блока к поясу (нейтральный хват)", muscleGroup: "Спина", targetMuscles: "Широчайшие • Середина спины", phases: ["01: Локти назад", "02: Сведение лопаток", "03: Растяжка"], sets: 4, min: 10, max: 12, w: 45, calRate: 11, tip: "Локти скользят вдоль ребер назад, плечи зафиксированы.", substitutes: ["Тяга гантели в наклоне с упором в скамью", "Тяга верхнего блока нейтральным хватом к груди"] },
      { name: "Сгибания ног сидя или лежа в тренажере", muscleGroup: "Ноги", targetMuscles: "Бицепс бедра", phases: ["01: Сгибание", "02: Пауза 1с", "03: Спуск 3с"], sets: 3, min: 12, max: 15, w: 35, calRate: 8, tip: "Медленное опускание 2–3 сек.", substitutes: ["Румынская тяга с гантелями"] },
      { name: "Махи гантелями через стороны стоя", muscleGroup: "Плечи", targetMuscles: "Средняя дельта", phases: ["01: Корпус вперед", "02: Подъем локтями", "03: Кисть ниже локтя"], sets: 4, min: 12, max: 15, w: 8, calRate: 7, tip: "Подъем через стороны локтями, кисть не выше локтя.", substitutes: ["Протяжка на блоке к подбородку (широкий хват)", "Жим гантелей сидя на плечи (скамья 75°)"] },
      { name: "Разгибания рук на верхнем блоке с канатом", muscleGroup: "Трицепс", targetMuscles: "Трицепс", phases: ["01: Фиксация локтей", "02: Разводка каната", "03: Сжатие"], sets: 3, min: 12, max: 15, w: 20, calRate: 6, tip: "Локти прижаты к корпусу, разводи канат внизу.", substitutes: ["Разгибания рук на блоке с прямой / V-рукоятью", "Французский жим с гантелями лежа на скамье", "Французский жим со штангой (EZ-гриф) лежа", "Разгибание руки с гантелью из-за головы сидя"] }
    ]
  },
  b: {
    name: "Тренировка Б (Бабочка + Брусья + Спина)",
    exercises: [
      { name: "Сведения рук в тренажере бабочка (Pec Deck)", muscleGroup: "Грудь", targetMuscles: "Изоляция грудных мышц", phases: ["01: Растяжка 2с", "02: Сведение", "03: Пиковое сжатие"], sets: 4, min: 10, max: 12, w: 25, calRate: 9, tip: "Глубокая растяжка грудных и фиксация 2 сек в сведении.", substitutes: ["Сведения в кроссовере на блоках", "Жим в тренажере Хаммер на грудь", "Жим гантелей на горизонтальной скамье"] },
      { name: "Отжимания на брусьях (с акцентом на грудь)", muscleGroup: "Грудь", targetMuscles: "Низ груди • Трицепс", phases: ["01: Наклон 30°", "02: Угол 90°", "03: Выжим"], sets: 4, min: 8, max: 10, w: 0, calRate: 11, tip: "Корпус слегка наклонен вперед для акцента на грудь.", substitutes: ["Жим в тренажере Хаммер на грудь", "Жим гантелей на горизонтальной скамье", "Сведения в кроссовере на блоках"] },
      { name: "Румынская тяга с гантелями", muscleGroup: "Ноги", targetMuscles: "Бицепс бедра • Ягодицы", phases: ["01: Таз назад", "02: Прямая спина", "03: Растяжение"], sets: 4, min: 10, max: 12, w: 22, calRate: 15, tip: "Таз максимально назад, колени слегка согнуты.", substitutes: ["Сгибания ног сидя или лежа в тренажере", "Гиперэкстензия для разгибателей спины"] },
      { name: "Тяга верхнего блока нейтральным хватом к груди", muscleGroup: "Спина", targetMuscles: "Широчайшие мышцы", phases: ["01: Растяжка", "02: Тяга к груди", "03: Опускание лопаток"], sets: 4, min: 10, max: 12, w: 50, calRate: 12, tip: "Симметричная тяга к верху груди, лопатки вниз.", substitutes: ["Подтягивания на турнике (или в гравитроне)", "Тяга горизонтального блока к поясу (нейтральный хват)"] },
      { name: "Приседания в Гакк-тренажере", muscleGroup: "Ноги", targetMuscles: "Квадрицепс", phases: ["01: Спина к опоре", "02: Сед 90°", "03: Подъем пятками"], sets: 3, min: 10, max: 12, w: 35, calRate: 13, tip: "Плавное движение по направлению носков.", substitutes: ["Жим ногами под углом 45° в тренажере", "Разгибания ног в тренажере сидя"] },
      { name: "Подъем гантелей на бицепс стоя с супинацией", muscleGroup: "Бицепс", targetMuscles: "Бицепс", phases: ["01: Локти у ребер", "02: Супинация", "03: Сжатие"], sets: 3, min: 10, max: 12, w: 12, calRate: 6, tip: "Разворот кисти наружу в верхней точке.", substitutes: ["Сгибания рук с гантелями на наклонной скамье 45°", "Молотковые сгибания с гантелями (Hammer Curls)", "Сгибания рук на скамье Скотта (со штангой или гантелью)", "Подъем штанги на бицепс стоя (прямой или EZ-гриф)"] }
    ]
  },
  c: {
    name: "Восстановление и Пампинг (Разгрузка шеи + Руки)",
    exercises: [
      { name: "Тяга каната к лицу (Face Pull — разгрузка шеи)", muscleGroup: "Спина", targetMuscles: "Задняя дельта • Мышцы лопатки", phases: ["01: Канат к глазам", "02: Локти врозь", "03: Пауза 2с"], sets: 4, min: 15, max: 20, w: 15, calRate: 8, tip: "Канат к глазам, локти разводи назад, пауза 2 сек.", substitutes: ["Разводка гантелей в наклоне на заднюю дельту", "Тяга горизонтального блока к поясу (нейтральный хват)"] },
      { name: "Жим гантелей сидя на плечи (скамья 75°)", muscleGroup: "Плечи", targetMuscles: "Передняя/средняя дельта", phases: ["01: Локти перед собой", "02: Выжим", "03: Плавный спуск"], sets: 3, min: 10, max: 12, w: 14, calRate: 8, tip: "Плавный жим над головой без резкого прогиба.", substitutes: ["Махи гантелями через стороны стоя", "Протяжка на блоке к подбородку (широкий хват)"] },
      { name: "Молотковые сгибания с гантелями (Hammer Curls)", muscleGroup: "Бицепс", targetMuscles: "Брахиалис • Бицепс", phases: ["01: Нейтральный хват", "02: Подъем", "03: Контроль"], sets: 3, min: 10, max: 12, w: 14, calRate: 7, tip: "Утолщает предплечья и выталкивает бицепс.", substitutes: ["Молотковые сгибания с гантелями на наклонной скамье", "Сгибания рук с гантелями на наклонной скамье 45°", "Подъем гантелей на бицепс стоя с супинацией", "Концентрированные сгибания с гантелью сидя"] },
      { name: "Французский жим с гантелями лежа на скамье", muscleGroup: "Трицепс", targetMuscles: "Трицепс", phases: ["01: Локти параллельно", "02: К вискам", "03: Выжим"], sets: 3, min: 10, max: 12, w: 10, calRate: 6, tip: "Локти не разводи широко в стороны.", substitutes: ["Французский жим со штангой (EZ-гриф) лежа", "Разгибания рук на верхнем блоке с канатом", "Разгибание руки с гантелью из-за головы сидя", "Жим штанги узким хватом лежа"] },
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
  updateSoundModeUI();
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
  
  // Tier 2: Cloudflare Edge Persistent Cloud Storage
  try {
    const origin = (window.location && window.location.origin && window.location.origin.startsWith('http')) 
      ? window.location.origin 
      : "https://iron-coach-bot.r-tofan112.workers.dev";
    fetch(origin + "/api/save-state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tgId: appState.tgId, state: appState })
    }).then(res => {
      if (res.ok) {
        const badge = document.getElementById("cloud-sync-status-badge");
        if (badge) badge.textContent = "РћР±Р»Р°РєРѕ OK вЃпёЏ";
      }
    }).catch(() => {});
  } catch(e) {}

  // Tier 3: Telegram CloudStorage
  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.CloudStorage) {
    try {
      window.Telegram.WebApp.CloudStorage.setItem("iron_coach_" + appState.tgId, json, (err, ok) => {
        const badge = document.getElementById("cloud-sync-status-badge");
        if (badge && ok) badge.textContent = "РћР±Р»Р°РєРѕ OK вЃпёЏ";
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

// ========================================================
// PRO ANATOMICAL MAP & ATHLETIC VECTOR ATLAS 7.0 (LUXURY OBSIDIAN & GOLD)
// ВЫСОКОДЕТАЛИЗИРОВАННАЯ ВЕКТОРНАЯ МОДЕЛЬ (ПЛАВНЫЕ КРИВЫЕ БЕЗЬЕ)
// ========================================================

const ANATOMY_MUSCLES_DATA = {
  chest: {
    name: "Грудные мышцы",
    mev: 8,
    mav: 16,
    mrv: 22,
    recomExercises: "Жим гантелей 30°, Бабочка Pec Deck, Отжимания на брусьях",
    proTip: "Своди лопатки и опускай их вниз. Угол наклона скамьи 30° максимально включает ключичный пучок без боли в плечах."
  },
  delts: {
    name: "Дельтовидные мышцы (Плечи)",
    mev: 8,
    mav: 18,
    mrv: 26,
    recomExercises: "Махи гантелями в стороны, Жим гантелей сидя, Тяга к лицу (Face Pull)",
    proTip: "При махах держи кисти чуть ниже локтей и слегка наклоняй корпус вперед на 5°. Не подключай трапецию."
  },
  biceps: {
    name: "Двуглавая мышца (Бицепс & Брахиалис)",
    mev: 6,
    mav: 14,
    mrv: 20,
    recomExercises: "Сгибания на наклонной скамье 45°, Скамья Скотта, Молотковые сгибания",
    proTip: "Сгибания на наклонной скамье 45° растягивают длинную головку бицепса, ускоряя гипертрофию."
  },
  triceps: {
    name: "Трехглавая мышца (Трицепс)",
    mev: 6,
    mav: 14,
    mrv: 20,
    recomExercises: "Разгибание из-за головы, Французский жим, Разгибания на верхнем блоке",
    proTip: "Положение руки над головой максимально растягивает длинную головку трицепса."
  },
  traps: {
    name: "Трапециевидные мышцы",
    mev: 4,
    mav: 12,
    mrv: 18,
    recomExercises: "Тяга каната к лицу (Face Pull), Горизонтальная тяга к поясу, Шраги",
    proTip: "Делай упор на среднюю и нижнюю порции (Face Pulls) для исправления осанки и защиты шеи."
  },
  lats: {
    name: "Широчайшие мышцы (Спина V-taper)",
    mev: 8,
    mav: 16,
    mrv: 22,
    recomExercises: "Тяга верхнего блока к груди, Подтягивания, Тяга гантели к поясу",
    proTip: "Тяни снаряд строго к ключицам, ведя локти вниз и назад к поясу. Корпус не отклоняй больше 15°."
  },
  abs: {
    name: "Пресс и мышцы кора",
    mev: 4,
    mav: 12,
    mrv: 18,
    recomExercises: "Утренний вакуум живота, Скручивания на наклонной скамье, Планка",
    proTip: "Утренний вакуум тренирует глубокую поперечную мышцу живота, подтягивая талию."
  },
  quads: {
    name: "Квадрицепсы (Передняя часть бедра)",
    mev: 8,
    mav: 16,
    mrv: 22,
    recomExercises: "Жим ногами в тренажере 45°, Приседания Гакк, Разгибания ног",
    proTip: "Опускай платформу до угла 90° в коленях плавно за 3 секунды, не отрывая таз от спинки."
  },
  hamstrings: {
    name: "Бицепс бедра и ягодицы",
    mev: 6,
    mav: 14,
    mrv: 20,
    recomExercises: "Румынская становая тяга с гантелями, Сгибания ног лежа в тренажере",
    proTip: "Отводи таз назад и чувствуй растяжение задней поверхности бедра при нейтральной пояснице."
  },
  calves: {
    name: "Икроножные мышцы (Голень)",
    mev: 6,
    mav: 14,
    mrv: 20,
    recomExercises: "Подъемы на носки стоя в тренажере, Подъемы на носки сидя",
    proTip: "Делай паузу 2 секунды в нижней точке растяжения, чтобы исключить пружинящий эффект сухожилий."
  }
};

let currentAnatomyView = 'front';
let selectedAnatomyMuscleKey = 'chest';

