/* ================= static data (no user-facing text here except proper nouns) ================= */
const DUO_W = 254, COIN = 7.7; // grams; ₩500 coin = 7.7 g

/* opt: how the app behaves when unfolded
 *  none   = not updated for Duo → phone-sized column + black bars
 *  half   = half-optimized → black band on one side
 *  safari = fills screen but buttons pushed right
 *  full   = Apple first-party, fills screen
 *  lab    = screenshot lab (handles its own constraints) */
const APPS = [
  { id: 'talk', ic: '💬', bg: '#ffd43b', opt: 'none' },
  { id: 'bank', ic: '🏦', bg: '#2f6bff', opt: 'none' },
  { id: 'video', ic: '▶️', bg: '#ff3b30', opt: 'half' },
  { id: 'web', ic: '🧭', bg: '#0a84ff', opt: 'safari' },
  { id: 'photos', ic: '🖼️', bg: '#ffffff', opt: 'full' },
  { id: 'memo', ic: '📝', bg: '#ffcc00', opt: 'full' },
  { id: 'camera', ic: '📷', bg: '#3a3a3c', opt: 'full' },
  { id: 'settings', ic: '⚙️', bg: '#8e8e93', opt: 'full' },
  { id: 'price', ic: '💸', bg: '#34c759', opt: 'none' },
  { id: 'shot', ic: '🪟', bg: '#ff9f0a', opt: 'lab' }
];
const appById = id => APPS.find(a => a.id === id);

/* [Korean name, English name, grams] — manufacturer specs without case */
const PHONES = [
  ['갤럭시 S25', 'Galaxy S25', 162], ['갤럭시 S25+', 'Galaxy S25+', 190], ['갤럭시 S25 울트라', 'Galaxy S25 Ultra', 218],
  ['갤럭시 S24', 'Galaxy S24', 167], ['갤럭시 S24 울트라', 'Galaxy S24 Ultra', 232],
  ['아이폰 에어', 'iPhone Air', 165], ['아이폰 17', 'iPhone 17', 177], ['아이폰 17 Pro', 'iPhone 17 Pro', 204], ['아이폰 17 Pro Max', 'iPhone 17 Pro Max', 231],
  ['아이폰 16', 'iPhone 16', 170], ['아이폰 16 Pro', 'iPhone 16 Pro', 199], ['아이폰 16 Pro Max', 'iPhone 16 Pro Max', 227],
  ['아이폰 15', 'iPhone 15', 171], ['아이폰 15 Pro', 'iPhone 15 Pro', 187]
];

/* Bank demo transactions: amounts in KRW (names come from locale bank.tx) */
const BANK_BALANCE = 1234000;
const BANK_TX = [-4500, -12300, 3000000, -6800, -55000, -23500];

/* ===== price comparison ===== */
// 확인 기준일 2026-11-03. 환율 1달러 = 1,325.93원 (2026-10-26 종가)
const USD_KRW = 1325.93;
const DUO_PRICES = [['256GB', 3290000], ['512GB', 3590000], ['1TB', 4190000], ['2TB', 5090000]];
const COMPARE = [
  { id: 'coffee', ic: '☕', p: 4700, u: 'cup', kind: 'count' },
  { id: 'jjm', ic: '🍜', p: 7577, u: 'bowl', kind: 'count' },
  { id: 'wage', ic: '⏱️', p: 10320, u: 'hour', kind: 'hours' },
  { id: 'netflix', ic: '🎬', p: 17000, u: 'month', kind: 'months' },
  { id: 'claude', ic: '🤖', p: Math.round(20 * USD_KRW), u: 'month', kind: 'months' },
  { id: 'cpu', ic: '🧠', p: 720000, u: 'ea', kind: 'count' },
  { id: 'gpu1', ic: '🎮', p: 1850000, u: 'card', kind: 'count' },
  { id: 'gpu2', ic: '🔥', p: 11190000, u: 'card', kind: 'count' },
  { id: 'ip18', ic: '📱', p: 1991000, u: 'phone', kind: 'count' },
  { id: 'fold8', ic: '📱', p: 2278100, u: 'phone', kind: 'count' },
  { id: 'repair', ic: '💥', p: Math.round(999 * USD_KRW), u: 'time', kind: 'count' }
];
