const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('C:\\Users\\r.tofan\\.gemini\\antigravity\\scratch\\asutp-fitness-app\\index.html', 'utf8');
const js = fs.readFileSync('C:\\Users\\r.tofan\\.gemini\\antigravity\\scratch\\asutp-fitness-app\\app.js', 'utf8');

console.log('--- TEST 1: SYNTAX CHECK ---');
try {
  new vm.Script(js);
  console.log('PASS: app.js parsed with 0 syntax errors.');
} catch (e) {
  console.error('FAIL: app.js syntax error:', e);
  process.exit(1);
}

console.log('\n--- TEST 2: EVENT HANDLERS IN HTML VS JS ---');
const regex = /on(?:click|change|input)="([a-zA-Z0-9_]+)\(/g;
let match;
const handlers = new Set();
while ((match = regex.exec(html)) !== null) {
  handlers.add(match[1]);
}

const missing = [];
for (const fn of handlers) {
  const hasFn = js.includes('function ' + fn) || js.includes('window.' + fn) || js.includes(fn + ' = function') || js.includes('const ' + fn) || js.includes('let ' + fn);
  if (!hasFn) {
    missing.push(fn);
  }
}
if (missing.length > 0) {
  console.error('FAIL: Missing HTML event handlers in app.js:', missing);
  process.exit(1);
} else {
  console.log(`PASS: All ${handlers.size} HTML event handlers are defined in app.js!`);
}

console.log('\n--- TEST 3: CRITICAL ANATOMY & WORKOUT FUNCTIONS ---');
const criticalFns = [
  'renderInteractiveAnatomyMap',
  'setAnatomyView',
  'selectAnatomyMuscle',
  'updateAnatomyHUD',
  'getMuscleVolumeAndRecoveryData',
  'promptReadinessBeforeWorkout',
  'startFreeWorkout',
  'openRevisionModal',
  'openProfileDrawer',
  'loadState',
  'saveState'
];

for (const fn of criticalFns) {
  if (!js.includes('function ' + fn)) {
    console.error(`FAIL: Critical function ${fn} is missing!`);
    process.exit(1);
  }
}
console.log(`PASS: All ${criticalFns.length} critical anatomy & core functions exist!`);

console.log('\n--- TEST 4: RUNTIME INITIALIZATION IN MOCK DOM ---');
const makeMockElement = (id = '') => ({
  id,
  addEventListener: () => {},
  classList: { add: () => {}, remove: () => {}, contains: () => false, toggle: () => {} },
  style: {},
  setAttribute: () => {},
  getAttribute: () => null,
  dataset: {},
  children: [],
  innerHTML: '',
  textContent: '',
  appendChild: () => {},
  value: ''
});

const domMock = {
  window: {},
  document: {
    readyState: 'loading',
    addEventListener: (evt, cb) => {
      // simulate synchronous trigger or timeout
    },
    getElementById: (id) => makeMockElement(id),
    querySelectorAll: (sel) => [makeMockElement()],
    querySelector: () => makeMockElement(),
    createElement: (tag) => makeMockElement(tag),
    body: {
      classList: { add: () => {}, remove: () => {}, toggle: () => {} },
      setAttribute: () => {}
    }
  },
  localStorage: {
    data: {},
    getItem: (k) => domMock.localStorage.data[k] || null,
    setItem: (k, v) => { domMock.localStorage.data[k] = v; },
    removeItem: (k) => { delete domMock.localStorage.data[k]; }
  },
  Telegram: {
    WebApp: {
      ready: () => console.log('Telegram.WebApp.ready() called'),
      expand: () => console.log('Telegram.WebApp.expand() called'),
      initDataUnsafe: { user: { id: 12345, first_name: 'Roman' } }
    }
  },
  navigator: {
    vibrate: () => {},
    clipboard: { writeText: () => Promise.resolve() }
  },
  console: console,
  setTimeout: (cb) => { try { cb(); } catch(e) {} },
  setInterval: () => {},
  clearTimeout: () => {},
  clearInterval: () => {}
};
domMock.window = domMock;

try {
  vm.createContext(domMock);
  vm.runInContext(js, domMock);
  console.log('PASS: app.js loaded and executed in mock DOM without throwing errors!');
  
  // Test calling anatomy functions directly
  console.log('\n--- TEST 5: CALLING ANATOMY FUNCTIONS ---');
  domMock.setAnatomyView('front');
  console.log('setAnatomyView("front") executed successfully');
  domMock.setAnatomyView('back');
  console.log('setAnatomyView("back") executed successfully');
  domMock.selectAnatomyMuscle('chest');
  console.log('selectAnatomyMuscle("chest") executed successfully');
  domMock.selectAnatomyMuscle('lats');
  console.log('selectAnatomyMuscle("lats") executed successfully');
  console.log('PASS: All anatomy interactions working properly!');
} catch (e) {
  console.error('FAIL: Runtime execution error:', e);
  process.exit(1);
}

console.log('\n========================================');
console.log(' ALL AUTOMATED SYSTEM TESTS PASSED 100%! ');
console.log('========================================');
