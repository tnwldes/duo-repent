/* ================= in-app screenshot (📸) =================
 * html2canvas is vendored (vendor/) and loaded lazily so the first page load stays light.
 * Overlays marked data-ig (crack, crease, haze, reach map) are not captured — like a real screenshot.
 */
let h2cPromise = null;
function ensureH2C() {
  if (window.html2canvas) return Promise.resolve();
  if (!h2cPromise) h2cPromise = new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = 'vendor/html2canvas.min.js'; s.async = true;
    s.onload = res; s.onerror = () => { h2cPromise = null; rej(); };
    document.head.appendChild(s);
  });
  return h2cPromise;
}

async function snap() {
  if (S.off) { toast(t('toast.screenOff')); return; }
  const scr = $('scr');
  const f = document.createElement('div');
  f.style.cssText = 'position:fixed;inset:0;background:#fff;z-index:98;opacity:.85;transition:opacity .35s;pointer-events:none';
  document.body.appendChild(f); requestAnimationFrame(() => requestAnimationFrame(() => f.style.opacity = 0)); setTimeout(() => f.remove(), 450);
  let c;
  try {
    await ensureH2C();
    c = await html2canvas(scr, { backgroundColor: '#000', scale: Math.min(2, devicePixelRatio || 1), logging: false, useCORS: true, ignoreElements: n => n.hasAttribute && n.hasAttribute('data-ig') });
  } catch (e) { // fallback drawing
    const r = scr.getBoundingClientRect(); c = document.createElement('canvas'); c.width = r.width * 1.5; c.height = r.height * 1.5;
    const x = c.getContext('2d'); x.fillStyle = '#000'; x.fillRect(0, 0, c.width, c.height);
    const a = S.app && appById(S.app); let cx = 0, cw = c.width;
    if (a && !S.folded && FX.on('bars') && a.opt === 'none') { cw = c.height * 9 / 19.5; cx = (c.width - cw) / 2; }
    if (a && !S.folded && FX.on('bars') && a.opt === 'half') { cw = c.width * .78; }
    x.fillStyle = '#fff'; x.fillRect(cx, 0, cw, c.height); x.fillStyle = '#111'; x.font = `${c.height * .05}px sans-serif`; x.textAlign = 'center';
    x.fillText(a ? appName(a.id) : 'Home', cx + cw / 2, c.height / 2);
  }
  const url = c.toDataURL('image/jpeg', .85); S.shots.push(url);
  const th = document.createElement('img'); th.src = url; th.className = 'thumb'; th.alt = ''; th.setAttribute('data-ig', '');
  scr.appendChild(th); setTimeout(() => { th.style.opacity = 0; }, 1800); setTimeout(() => th.remove(), 2200);
  const a = S.app && appById(S.app);
  const viewingImg = S.app === 'talk' && S.viewer !== null;
  if (!S.folded && a && FX.on('bars') && (a.opt === 'none' || a.opt === 'half')) toast(t(viewingImg ? 'toast.capNested' : 'toast.capBars'), 3400);
  else if (!S.folded && FX.on('crack')) toast(t('toast.capCrack'), 2600);
  else toast(t('toast.capOk'), 2200);
}
