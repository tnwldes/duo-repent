/* ================= layout (real-keyboard aware) + orientation ================= */
let baseH = 0, baseW = 0, inputFocused = false;
function vvp() { const v = window.visualViewport; return v ? { w: v.width, h: v.height, top: v.offsetTop } : { w: innerWidth, h: innerHeight, top: 0 }; }
function cssPx(name) { return parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0; }
const isDuo = () => document.body.classList.contains('duo');

/* physical orientation of the browser window. Uses the layout viewport (matchMedia),
   which does not change when the on-screen keyboard opens. */
const landMQ = window.matchMedia ? matchMedia('(orientation: landscape)') : null;
const isLand = () => {
  // while the keyboard is open, older Android browsers may resize the layout viewport;
  // screen.orientation reports the physical orientation reliably there
  if (inputFocused && screen.orientation && screen.orientation.type) return screen.orientation.type.startsWith('landscape');
  return landMQ ? landMQ.matches : innerWidth > innerHeight;
};

function layout() {
  if (!isDuo()) return;
  const v = vvp(), duo = $('duo'), rail = $('rail'), scr = $('scr'), mb = $('mbar');
  if (Math.abs(v.w - baseW) > 2) { // rotated (or resized): the old base height is meaningless now
    baseW = v.w; baseH = inputFocused ? Math.max(v.h, window.innerHeight) : v.h;
  } else if (!inputFocused) baseH = v.h;
  const kb = inputFocused ? Math.max(0, baseH - v.h) : 0;
  duo.style.top = v.top + 'px'; duo.style.height = v.h + 'px'; duo.style.width = v.w + 'px';
  const land = v.w > baseH, vw = v.w, vh = v.h;
  const st = cssPx('--st'), sb = cssPx('--sb'), sl = cssPx('--sl'), sr = cssPx('--sr');
  const MB = kb ? 0 : (land ? 42 : 64); // space reserved for the mission bar
  mb.style.display = kb ? 'none' : 'flex';
  duo.classList.toggle('compact', land);
  let W, H, L, T;
  if (!land) { // rail on top
    Object.assign(rail.style, { left: (sl + 8) + 'px', right: (sr + 8) + 'px', top: (st + 6) + 'px', bottom: '', width: '', height: '46px', flexDirection: 'row' });
    const top = st + 60, availH = baseH - top - 6 - MB - sb;
    if (S.folded) { W = Math.min(vw - 8, availH / 1.46, 460); H = W * 1.46; }
    else { W = Math.min(vw - 8, 900); H = W / 1.422; if (H > availH) { H = availH; W = H * 1.422; } }
    L = (vw - W) / 2;
    const Hv = Math.max(110, H - kb);
    T = kb ? vh - Hv - 4 : top + Math.max(0, (availH - H) / 2);
    H = Hv;
    Object.assign(mb.style, { left: (sl + 8) + 'px', right: (sr + 8) + 'px', top: (T + H + 10) + 'px', bottom: '' });
  } else { // rail on right
    Object.assign(rail.style, { top: (st + 8) + 'px', bottom: (sb + 8) + 'px', right: (sr + 8) + 'px', left: '', width: '46px', height: '', flexDirection: 'column' });
    const availW = vw - 70 - sl - sr, availH = baseH - 12 - MB - Math.max(0, sb - 6);
    if (S.folded) { H = Math.min(availH, 680); W = H / 1.46; }
    else { H = Math.min(availH, (availW - 16) / 1.422, 640); W = H * 1.422; }
    L = sl + Math.max(6, (availW - W) / 2);
    const Hv = Math.max(110, H - kb);
    T = kb ? vh - Hv - 4 : Math.max(6, (baseH - MB - H) / 2);
    H = Hv;
    Object.assign(mb.style, { left: (sl + 8) + 'px', right: (sr + 62) + 'px', top: (T + H + 6) + 'px', bottom: '' });
  }
  Object.assign(scr.style, { left: L + 'px', top: T + 'px', width: W + 'px', height: H + 'px' });
  updateFoldBtn();
  if (land && S.folded && S.orient === 'manual' && !layout._warned) { layout._warned = 1; toast(t('toast.foldedLand')); }
}

/* auto mode: portrait = folded, landscape = unfolded. Never the only way — the 📖 button always works. */
let lastLand = null;
function syncOrientation(announce) {
  const land = isLand();
  const changed = lastLand !== null && land !== lastLand;
  lastLand = land;
  if (S.orient !== 'auto') return false;
  if (inputFocused && !(screen.orientation && screen.orientation.type)) return false;
  const want = !land;
  if (S.folded === want) return false;
  S.folded = want; S.sheet = false;
  if (isDuo()) {
    layout(); render();
    if (announce && changed) toast(t(want ? 'toast.autoFold' : 'toast.autoUnfold'), 1600);
    if (!want && S.app) firstHints(S.app);
  }
  return true;
}
function onViewportChange() { syncOrientation(true); layout(); renderMbar(); }
window.addEventListener('resize', onViewportChange);
window.addEventListener('orientationchange', () => setTimeout(onViewportChange, 120));
landMQ && (landMQ.addEventListener ? landMQ.addEventListener('change', onViewportChange) : landMQ.addListener(onViewportChange));
window.visualViewport && visualViewport.addEventListener('resize', layout);
window.visualViewport && visualViewport.addEventListener('scroll', layout);
