/* ================= experiences (central navigation) + menu panel ================= */
/* mode: 'u' = best on unfolded, 'f' = best on folded, null = either. fx: effects switched on for it. */
const EXPS = [
  { id: 'lock', app: null, mode: null },
  { id: 'keyboard', app: 'talk', mode: 'f' },
  { id: 'compat', app: 'bank', mode: 'u', fx: ['bars'] },
  { id: 'capture', app: 'talk', mode: 'u', fx: ['bars'] },
  { id: 'web', app: 'web', mode: 'u', fx: ['rightui'] },
  { id: 'video', app: 'video', mode: 'u', fx: ['bars', 'heat'] },
  { id: 'camera', app: 'camera', mode: null },
  { id: 'onehand', app: 'memo', mode: 'u', fx: ['reach', 'rightui'] },
  { id: 'crease', app: null, mode: 'u', fx: ['crease', 'crack', 'haze', 'distort'] },
  { id: 'shot', app: 'shot', mode: null },
  { id: 'weight', app: 'settings', mode: null },
  { id: 'price', app: 'price', mode: null }
];
const expById = id => EXPS.find(e => e.id === id);

function startExp(id) {
  const e = expById(id); if (!e) return;
  // turn off effects that only the previous experience had switched on
  S.fxByExp.forEach(k => { if (!(e.fx || []).includes(k)) S.fx[k] = false; });
  S.fxByExp = [];
  (e.fx || []).forEach(k => { if (!S.fx[k]) { S.fx[k] = true; S.fxByExp.push(k); } });
  savePrefs();
  S.exp = id; S.viewer = null; S.sheet = false; S.playing = false; S.off = false;
  if (id === 'lock') { S.locked = true; S.app = null; }
  else {
    if (S.locked) { S.locked = false; setTimeout(() => toast(t('toast.lockSkipped'), 2600), 2700); }
    S.app = e.app;
  }
  closePanel(); render();
  if (S.app) firstHints(S.app);
}
function expMismatch() {
  const e = S.exp && expById(S.exp);
  if (!e || !e.mode) return null;
  if (e.mode === 'u' && S.folded) return 'U';
  if (e.mode === 'f' && !S.folded) return 'F';
  return null;
}

/* ---- bottom mission bar: mode + what you're testing ---- */
function renderMbar() {
  const mb = $('mbar'); if (!mb) return;
  const e = S.exp && expById(S.exp);
  const ex = e ? L('exps.' + e.id) : null;
  const mm = expMismatch();
  let tip;
  if (mm) tip = t(mm === 'U' ? 'mbar.needU' : 'mbar.needF');
  else if (!S.folded && !isLand() && S.orient === 'manual') tip = t('mbar.rotate');
  else tip = ex ? esc(ex[3]) : t('mbar.freeTip');
  const title = ex ? `${ex[0]} ${esc(ex[1])}` : t('mbar.freeT');
  const orientChip = `<button class="chip ${S.orient === 'auto' ? 'on' : ''}" data-mb="orient" aria-label="${esc(t(S.orient === 'auto' ? 'mbar.autoLabel' : 'mbar.manualLabel'))}">${t(S.orient === 'auto' ? 'mbar.auto' : 'mbar.manual')}</button>`;
  const fixChip = mm ? `<button class="chip act" data-mb="fold">${mm === 'U' ? '📖 ' + t('rail.unfold') : '📕 ' + t('rail.fold')}</button>` : '';
  mb.innerHTML = `<span class="mode ${S.folded ? 'f' : 'u'}">${t(S.folded ? 'mbar.folded' : 'mbar.unfolded')}</span>
    <button class="txt" data-mb="menu" style="text-align:left"><b>${title}</b><span>${tip}</span></button>${fixChip}${orientChip}`;
}
document.addEventListener('click', ev => {
  const b = ev.target.closest('[data-mb]'); if (!b) return;
  const a = b.dataset.mb;
  if (a === 'menu') openPanel('exp');
  else if (a === 'fold') toggleFold();
  else if (a === 'orient') setOrient(S.orient === 'auto' ? 'manual' : 'auto');
});

/* ---- menu panel ---- */
let panelTab = 'exp', panelReturnFocus = null;
function openPanel(tab) {
  panelTab = tab || panelTab; panelReturnFocus = document.activeElement;
  renderPanel(); $('panel').classList.add('on');
  setTimeout(() => { const x = $('panel').querySelector('.x'); x && x.focus(); }, 30);
}
function closePanel() {
  $('panel').classList.remove('on');
  if (panelReturnFocus && panelReturnFocus.focus) try { panelReturnFocus.focus(); } catch (e) {}
}
function langSwitch() {
  return `<div class="lang" role="group" aria-label="${esc(t('lang.label'))}">${I18N.SUPPORTED.map(l => `<button data-setlang="${l}" aria-pressed="${I18N.lang === l}">${t('lang.' + l)}</button>`).join('')}</div>`;
}
function renderPanel() {
  const p = $('panel');
  const tabs = ['exp', 'fx', 'help'].map(k => `<button role="tab" id="tab-${k}" aria-selected="${panelTab === k}" aria-controls="ptab" data-ptab="${k}">${t('panel.tabs.' + k)}</button>`).join('');
  let body = '';
  if (panelTab === 'exp') {
    body = `<p class="panel-note">${t('panel.expIntro')}</p><div class="exps">${EXPS.map(e => {
      const [ic, n, d] = L('exps.' + e.id);
      const badge = e.mode ? `<em class="${e.mode}">${t(e.mode === 'u' ? 'mbar.unfolded' : 'mbar.folded')}</em>` : '';
      return `<button class="exp ${S.exp === e.id ? 'cur' : ''}" data-exp="${e.id}"><span class="e" aria-hidden="true">${ic}</span><span style="flex:1;min-width:0"><b>${esc(n)}</b><span>${esc(d)}</span>${badge}</span></button>`;
    }).join('')}</div>`;
  } else if (panelTab === 'fx') {
    body = `<p class="panel-note">${t('panel.fxIntro')}</p><div class="fxl">${FX.DEFS.map(d => {
      const [ic, n, desc] = L('fx.' + d.id);
      const meta = (d.scope === 'u' ? t('panel.scopeU') : t('panel.scopeB')) + (d.cap ? '' : ' · ' + t('panel.notCaptured'));
      return `<div class="fx"><span class="e" aria-hidden="true">${ic}</span><div><b>${esc(n)}</b><span>${esc(desc)}</span><span style="color:#6f6f80">${meta}</span></div>${sw(FX.on(d.id), `data-pfx="${d.id}"`, n)}</div>`;
    }).join('')}
      <div class="fx"><span class="e" aria-hidden="true">🤚</span><div><b>${t('fx.hand')}</b></div><span style="display:flex;gap:6px">${['left', 'right'].map(h => `<button data-phand="${h}" aria-pressed="${S.hand === h}" class="chip" style="padding:7px 12px;border-radius:9px;font-weight:700;font-size:12.5px;background:${S.hand === h ? 'var(--acc)' : '#2a2a38'};color:${S.hand === h ? '#000' : '#ddd'}">${t(h === 'left' ? 'fx.handL' : 'fx.handR')}</button>`).join('')}</span></div></div>`;
  } else {
    const links = arr => arr.map(([u, l]) => `<a href="${u}" target="_blank" rel="noopener">${esc(l)}</a>`).join('<br>');
    body = `<h3>${t('help.h')}</h3>${L('help.paras').map(x => `<p>${x}</p>`).join('')}
      <p style="color:#8a8a9c">${t('help.extra')}</p>
      <div class="limits"><h4>${t('help.limitsH')}</h4><ul>${L('help.limits').map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
      <p class="panel-note">${t('intro.disc')}</p>
      <div class="src"><b style="color:#ccc">${t('help.srcH')}</b><br>${links(L('help.sources'))}<br><b style="color:#ccc">${t('help.priceSrcH')}</b><br>${links(L('help.priceSources'))}</div>`;
  }
  p.innerHTML = `<div class="in"><div class="phead"><b style="font-size:16px">${t('panel.title')}</b>${langSwitch()}<button class="x" aria-label="${esc(t('common.close'))}">✕</button></div>
    <div class="tabs" role="tablist">${tabs}</div><div id="ptab" role="tabpanel" aria-labelledby="tab-${panelTab}">${body}</div></div>`;
}
$('panel').addEventListener('click', ev => {
  const g = sel => ev.target.closest(sel);
  let b;
  if (g('.x')) closePanel();
  else if ((b = g('[data-ptab]'))) { panelTab = b.dataset.ptab; renderPanel(); $('panel').scrollTop = 0; }
  else if ((b = g('[data-exp]'))) startExp(b.dataset.exp);
  else if ((b = g('[data-pfx]'))) { FX.toggle(b.dataset.pfx); renderPanel(); render(); }
  else if ((b = g('[data-phand]'))) { S.hand = b.dataset.phand; savePrefs(); renderPanel(); render(); }
  else if (ev.target === $('panel')) closePanel();
});
document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && $('panel').classList.contains('on')) closePanel(); });
