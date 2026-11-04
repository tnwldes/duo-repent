/* ================= render ================= */
function clock() { return new Date().toLocaleTimeString(I18N.loc(), { hour: 'numeric', minute: '2-digit', hour12: false }); }
function statusRight() {
  const hot = FX.on('heat') && S.heat >= 40;
  return `${hot ? `<span style="color:${S.heat >= 70 ? '#ff5a5f' : '#ff9f0a'}">🌡️ ${Math.round(36 + S.heat * 0.09)}°</span> ` : ''}eSIM ▮▮▮ 🔋`;
}
function render() {
  const scr = $('scr');
  // keep scroll positions + focus across re-renders (fold/unfold, language, toggles)
  const keep = {};
  scr.querySelectorAll('[data-keep]').forEach(el => { keep[el.dataset.keep] = { top: el.scrollTop, max: el.scrollHeight - el.clientHeight, frac: el.scrollHeight > el.clientHeight ? el.scrollTop / (el.scrollHeight - el.clientHeight) : 0 }; });
  const focusedId = document.activeElement && scr.contains(document.activeElement) ? document.activeElement.id : null;

  let main;
  if (!S.app) {
    const cols = S.folded ? 4 : 6;
    main = `<div class="home" style="grid-template-columns:repeat(${cols},1fr)">${APPS.map(a => `<button class="ico" data-act="open" data-app="${a.id}"><i style="background:${a.bg}" aria-hidden="true">${a.ic}</i>${esc(appName(a.id))}</button>`).join('')}</div>`;
  } else { const a = appById(S.app); main = FX.wrap(a, RENDER[a.id]()); }
  const lock = S.locked ? `<div class="lock" id="lockL"><div style="margin-top:14%;font-size:13px;opacity:.85">${new Date().toLocaleDateString(I18N.loc(), { month: 'long', day: 'numeric', weekday: 'long' })}</div><div style="font-size:${S.folded ? 54 : 60}px;font-weight:700;letter-spacing:-2px;line-height:1.1">${clock()}</div><div id="lmsg" role="status" style="margin-top:16px;font-size:13px;line-height:1.6;padding:0 20px;opacity:.95">${t('lock.hint')}</div></div>` : '';
  scr.innerHTML = `<div class="view"><div class="sb"><span>${clock()}</span><span>${statusRight()}</span></div>
    <div class="content">${main}</div></div>
    ${S.app ? `<div class="homebar"></div><div class="homebar-hit" data-act="home" aria-label="${esc(t('rail.homeLabel'))}"></div>` : ''}
    ${lock}${S.off ? `<div class="off">${t('lock.off')}</div>` : ''}${FX.overlays()}`;
  bindApp();
  scr.querySelectorAll('[data-keep]').forEach(el => {
    const k = keep[el.dataset.keep]; if (!k) return;
    // same size → same position; after fold/unfold the content reflows, so keep the relative position
    const max = el.scrollHeight - el.clientHeight;
    el.scrollTop = k.max === max ? k.top : k.frac * max;
  });
  if (focusedId && $(focusedId)) try { $(focusedId).focus({ preventScroll: true }); } catch (e) {}
  updateFoldBtn(); renderMbar();
}
function bindApp() {
  const tm = $('tmsgs'); if (tm) tm.scrollTop = tm.scrollHeight;
  const f = $('tform');
  if (f) {
    f.onsubmit = e => { e.preventDefault(); const i = $('tin'), v = i.value.trim(); if (!v) return; i.value = ''; S.draft = ''; addMsg({ me: 1, t: v }); setTimeout(() => addMsg(randomReply()), 900 + Math.random() * 900); };
    $('tin').oninput = e => { S.draft = e.target.value; };
  }
  const wf = $('wform'); if (wf) wf.onsubmit = e => { e.preventDefault(); document.activeElement.blur(); toast(t('toast.web')); };
  const dl = $('dl'); if (dl) dl.oninput = e => { S.delay = +e.target.value; savePrefs(); e.target.nextElementSibling.textContent = t('settings.sec', { v: S.delay }); };
  const ph = $('ph'); if (ph) ph.onchange = () => { S.myW = ph.value ? +ph.value : null; savePrefs(); render(); };
  const lf = $('labfile'); if (lf) lf.onchange = () => { loadScreenshot(lf.files && lf.files[0]); lf.value = ''; };
  document.querySelectorAll('#scr input:not([type=file]):not([type=range])').forEach(inp => {
    inp.onfocus = () => { inputFocused = true; setTimeout(layout, 50); setTimeout(layout, 400); };
    inp.onblur = () => { inputFocused = false; setTimeout(layout, 50); setTimeout(() => { layout(); syncOrientation(true); }, 400); };
  });
}
function updateFoldBtn() {
  const b = $('fold'); if (!b) return;
  b.innerHTML = S.folded ? `📖<small>${t('rail.unfold')}</small>` : `📕<small>${t('rail.fold')}</small>`;
  b.setAttribute('aria-label', t(S.folded ? 'rail.foldLabelU' : 'rail.foldLabelF'));
}

/* ================= one-handed reach: block taps outside the thumb zone ================= */
let blockNextClick = false, reachToastAt = 0;
$('scr').addEventListener('pointerdown', e => {
  if (S.locked || S.off) return;
  const r = $('scr').getBoundingClientRect();
  if (!FX.outOfReach(e.clientX, e.clientY, r)) return;
  e.preventDefault(); e.stopPropagation(); blockNextClick = true;
  const ring = document.createElement('div'); ring.className = 'fx-tap'; ring.setAttribute('data-ig', '');
  ring.style.left = (e.clientX - r.left) + 'px'; ring.style.top = (e.clientY - r.top) + 'px';
  $('scr').appendChild(ring); setTimeout(() => ring.remove(), 550);
  if (Date.now() - reachToastAt > 2500) { reachToastAt = Date.now(); toast(t('toast.reach'), 2200); }
  navigator.vibrate && navigator.vibrate(30);
}, true);
$('scr').addEventListener('click', e => { if (blockNextClick) { blockNextClick = false; e.preventDefault(); e.stopPropagation(); } }, true);
$('scr').addEventListener('focusin', e => { if (blockNextClick && e.target.blur) e.target.blur(); });

/* ================= actions ================= */
$('scr').addEventListener('click', e => {
  if (S.off) return;
  if (S.locked) {
    const m = $('lmsg');
    if (m) { m.innerHTML = t('lock.noFace'); $('pwr').animate([{ transform: 'scale(1)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }], { duration: 500, iterations: 2 }); }
    return;
  }
  const el = e.target.closest('[data-act]'); if (!el) return;
  const a = el.dataset.act, i = +el.dataset.i;
  if (a === 'open') { S.app = el.dataset.app; S.viewer = null; S.sheet = false; const ex = S.exp && expById(S.exp); if (ex && ex.app !== S.app) S.exp = null; render(); firstHints(S.app); }
  else if (a === 'home') goHome();
  else if (a === 'sheet') { S.sheet = !S.sheet; render(); }
  else if (a === 'sendshot') { S.sheet = false; S.msgs.push({ me: 1, img: S.shots[i] }); render(); setTimeout(() => addMsg({ me: 0, r: 7 }), 1000); toast(t('toast.sendHint')); }
  else if (a === 'view') { S.viewer = i; render(); }
  else if (a === 'closeview') { S.viewer = null; render(); }
  else if (a === 'vshot') { S.viewer = i; render(); }
  else if (a === 'delshot') { const s = S.shots[S.viewer]; S.shots.splice(S.viewer, 1); if (S.lab && S.lab.src === s) S.lab = null; S.viewer = null; render(); }
  else if (a === 'play') { S.playing = !S.playing; render(); }
  else if (a === 'zoom') { const z = +el.dataset.z; if (z > 2) { toast(t('toast.zoom')); return; } S.zoom = z; render(); }
  else if (a === 'shutter') { const f = document.createElement('div'); f.style.cssText = 'position:absolute;inset:0;background:#000;z-index:80'; $('scr').appendChild(f); setTimeout(() => f.remove(), 120); }
  else if (a === 'tg') { S[el.dataset.k] = !S[el.dataset.k]; savePrefs(); render(); }
  else if (a === 'fx') { FX.toggle(el.dataset.k); render(); }
  else if (a === 'hand') { S.hand = el.dataset.h; savePrefs(); render(); }
  else if (a === 'rightui') { toast(!S.folded && FX.on('rightui') ? t('toast.rightui') : t('toast.nope')); }
  else if (a === 'nope') { toast(t('toast.nope')); }
  else if (a === 'labmode') { S.labMode = el.dataset.m; render(); }
  else if (a === 'labclear') { clearScreenshot(); }
  else if (a === 'reset') {
    S.shots = []; S.msgs = initialMsgs(); S.app = null; S.locked = true; S.heat = 0; S.heatWarned = false; S.lab = null; S.exp = null; S.draft = '';
    S.fx = Object.assign({}, FX_DEFAULTS); S.fxByExp = []; savePrefs(); hinted = {}; render();
  }
});
function goHome() { S.app = null; S.viewer = null; S.sheet = false; S.playing = false; const ex = S.exp && expById(S.exp); if (ex && ex.app) S.exp = null; render(); }

let hinted = {};
function firstHints(id) {
  const a = appById(id); if (!a || S.folded || hinted[id + 'u']) return; hinted[id + 'u'] = 1;
  if (FX.on('bars') && a.opt === 'none') toast(t('toast.hintNone', { name: appName(a.id) }), 3200);
  else if (FX.on('bars') && a.opt === 'half') toast(t('toast.hintHalf'), 3000);
  else if (FX.on('rightui') && a.opt === 'safari') toast(t('toast.hintSafari'), 3000);
}

/* ---- power / touch id ---- */
let pTimer = null, pRaf = null, pStart = 0;
const pwr = $('pwr'), fill = $('pwrFill');
function pReset() { clearTimeout(pTimer); pTimer = null; cancelAnimationFrame(pRaf); fill.style.height = '0'; }
pwr.addEventListener('contextmenu', e => e.preventDefault());
pwr.addEventListener('pointerdown', e => {
  e.preventDefault(); pStart = performance.now();
  if (S.off) { S.off = false; render(); pStart = 0; return; }
  if (!S.locked) return;
  const m = $('lmsg'); if (m) m.innerHTML = t('lock.reading');
  const anim = () => { const p = Math.min(1, (performance.now() - pStart) / (S.delay * 1000)); fill.style.height = (p * 100) + '%'; if (p < 1) pRaf = requestAnimationFrame(anim); }; anim();
  pTimer = setTimeout(() => {
    pReset();
    if (S.wet && Math.random() < 0.6) { const m = $('lmsg'); if (m) m.innerHTML = t('lock.fail'); navigator.vibrate && navigator.vibrate(120); }
    else { S.locked = false; render(); }
  }, S.delay * 1000);
});
['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => pwr.addEventListener(ev, () => {
  if (pTimer) { pReset(); const m = $('lmsg'); if (m) m.innerHTML = t('lock.tooFast'); return; }
  if (ev === 'pointerup' && pStart && !S.locked && !S.off && performance.now() - pStart < 450) { S.locked = true; S.off = true; S.playing = false; render(); }
  pStart = 0;
}));
// keyboard: Space/Enter held on the side button = finger on the sensor
pwr.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); pwr.dispatchEvent(new PointerEvent('pointerdown')); } });
pwr.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); pwr.dispatchEvent(new PointerEvent('pointerup')); } });

/* ---- fold / orientation ---- */
function toggleFold() {
  if (S.orient === 'auto') setOrient('manual', true);
  S.folded = !S.folded; S.sheet = false; layout(); render();
  if (!S.folded && !hinted.unfold) { hinted.unfold = 1; toast(t(isLand() ? 'toast.unfoldLand' : 'toast.unfoldPortrait'), 3000); }
  if (S.app) firstHints(S.app);
}
function setOrient(mode, quiet) {
  S.orient = mode; savePrefs();
  if (mode === 'auto') { syncOrientation(false); layout(); render(); toast(t('toast.autoOn'), 2200); }
  else { renderMbar(); if (!quiet || !hinted.manual) { hinted.manual = 1; toast(t('toast.manualOn'), 3200); } }
}

/* ---- rail buttons ---- */
$('fold').onclick = toggleFold;
$('snap').onclick = snap;
$('homeB').onclick = () => { if (S.locked || S.off) { toast(t('toast.unlockFirst')); return; } goHome(); };
$('wB').onclick = () => {
  const d = S.myW ? DUO_W - S.myW : 0;
  toast(S.myW ? (d > 0 ? t('toast.weightHeavier', { g: d, coins: Math.round(d / COIN) }) : t('toast.weightLighter')) : t('toast.weightPick'), 3200);
};
$('menuB').onclick = () => openPanel();
$('exitB').onclick = () => { document.body.classList.remove('duo'); try { document.fullscreenElement && document.exitFullscreen(); } catch (e) {} S.playing = false; closePanel(); window.scrollTo(0, 0); $('start').focus(); };
$('start').onclick = () => {
  document.body.classList.add('duo');
  try { const r = document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); r && r.catch && r.catch(() => {}); } catch (e) {}
  syncOrientation(false); layout(); render(); setTimeout(layout, 300);
  setTimeout(() => toast(t(S.folded ? 'toast.start' : 'toast.startU'), 3000), 400);
  const pre = () => ensureH2C().catch(() => {});
  window.requestIdleCallback ? requestIdleCallback(pre, { timeout: 4000 }) : setTimeout(pre, 1500);
};

/* ---- language ---- */
document.addEventListener('click', e => { const b = e.target.closest('[data-setlang]'); if (b) I18N.setLang(b.dataset.setlang); });
document.addEventListener('duo:lang', () => {
  renderIntro(); renderPriceIntro();
  if (isDuo()) render();
  if ($('panel').classList.contains('on')) renderPanel();
});

/* ---- heat loop ---- */
setInterval(() => {
  if (!isDuo()) return;
  const before = Math.floor(S.heat / 10);
  if (FX.on('heat') && S.playing && S.app === 'video' && !S.off) S.heat = Math.min(100, S.heat + (S.folded ? 2 : 3));
  else S.heat = Math.max(0, S.heat - 1);
  if (FX.on('heat') && S.heat >= 60 && !S.heatWarned) { S.heatWarned = true; toast(t('toast.heat'), 3600); }
  if (Math.floor(S.heat / 10) !== before) { const sb = document.querySelector('#scr .sb span:last-child'); if (sb) sb.innerHTML = statusRight(); }
}, 1000);
setInterval(() => { if (isDuo()) document.querySelectorAll('#scr .sb span:first-child').forEach(s => s.textContent = clock()); }, 20000);

/* ================= intro ================= */
function renderIntro() {
  const l = $('introList');
  if (l) l.innerHTML = L('intro.list').map(([ic, b, s]) => `<div>${ic} <b>${esc(b)}</b> <span>— ${esc(s)}</span></div>`).join('');
}

/* ================= boot ================= */
I18N.applyStatic();
renderIntro();
renderPriceIntro();
lastLand = isLand();

/* PWA: offline cache + "Add to Home Screen". Only on http(s); never registers on file://. */
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
