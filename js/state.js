/* ================= state ================= */
const FX_DEFAULTS = { bars: true, rightui: true, crease: true, distort: false, haze: true, crack: true, reach: false, heat: true };
const S = {
  folded: true, orient: 'auto',            // orient: 'auto' (follow rotation) | 'manual' (button)
  locked: true, off: false, app: null, viewer: null, sheet: false,
  wet: false, delay: 0.9, myW: null, hand: 'left',
  fx: Object.assign({}, FX_DEFAULTS), fxByExp: [],
  heat: 0, playing: false, zoom: 1, shots: [], heatWarned: false,
  exp: null, draft: '', lab: null, labMode: 'bars',
  msgs: initialMsgs()
};
function initialMsgs() { return [{ me: 0, k: 0 }, { me: 1, k: 1 }, { me: 0, k: 2 }, { me: 0, k: 3 }]; }

const PREF_KEY = 'duoPrefs';
try {
  const p = JSON.parse(localStorage.getItem(PREF_KEY) || '{}');
  ['wet', 'delay', 'myW', 'hand', 'orient'].forEach(k => { if (p[k] !== undefined) S[k] = p[k]; });
  if (p.fx && typeof p.fx === 'object') Object.keys(FX_DEFAULTS).forEach(k => { if (typeof p.fx[k] === 'boolean') S.fx[k] = p.fx[k]; });
  else if (p.crack !== undefined) S.fx.crack = !!p.crack; // pre-2.0 prefs
  if (S.orient !== 'manual') S.orient = 'auto';
} catch (e) {}
function savePrefs() {
  try {
    localStorage.setItem(PREF_KEY, JSON.stringify({
      crack: S.fx.crack, wet: S.wet, delay: S.delay, myW: S.myW, hand: S.hand, orient: S.orient, fx: S.fx
    }));
  } catch (e) {}
}

const $ = id => document.getElementById(id);
const esc = I18N.esc;
let toastTimer;
function toast(m, ms = 2600) {
  const el = $('toast');
  el.innerHTML = m; el.classList.add('on');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('on'), ms);
}
