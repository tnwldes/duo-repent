/* ================= "My Shot": user's own screenshot under Duo constraints =================
 * The image never leaves the browser: it is read with an object URL, downscaled on a
 * <canvas> and kept only in memory (S.lab / S.shots). Nothing is uploaded or persisted.
 */
const OUTER_RATIO = 1.46, INNER_RATIO = 1 / 1.422; // height / width of the Duo screens

function labVisiblePct(ratio) { // how much of the screenshot fits on one Duo screen at full width
  const r = S.lab.h / S.lab.w;
  return r <= ratio ? 100 : Math.round(ratio / r * 100);
}
function labCutView(ratio, tag) {
  const pct = labVisiblePct(ratio);
  const cut = pct < 100 ? `<div class="cut" style="top:${pct}%"><span>${t('shot.cut')} · ${pct}%</span></div>` : '';
  return `<div class="stage scroll" data-keep="lab"><div class="tag">${tag}</div><div style="position:relative"><img src="${S.lab.src}" alt="" style="display:block;width:100%">${cut}</div></div>`;
}
RENDER.shot = function () {
  const file = `<input id="labfile" type="file" accept="image/*" class="sr-only" tabindex="-1">`;
  if (!S.lab) {
    return `<div class="lab">${hdr(t('shot.title'))}<div class="stage"><div class="empty">
      <b style="font-size:15px">${t('shot.emptyT')}</b>
      <p>${t('shot.emptyD')}</p>
      <label class="pick" for="labfile">${t('shot.pick')}</label>${file}
      <p class="note">🔒 ${t('shot.privacy')}</p>
      <p class="note">${t('shot.note')}</p></div></div></div>`;
  }
  let stage;
  if (S.folded) stage = labCutView(OUTER_RATIO, t('shot.tagFolded'));
  else if (S.labMode === 'bars') stage = `<div class="stage" style="background:#000"><div class="tag">${t('shot.tagBars')}</div><img src="${S.lab.src}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain"></div>`;
  else stage = labCutView(INNER_RATIO, t('shot.tagFit'));
  const modes = S.folded ? '' : ['bars', 'fit'].map(m => `<button data-act="labmode" data-m="${m}" aria-pressed="${S.labMode === m}" class="${S.labMode === m ? 'on' : ''}">${t(m === 'bars' ? 'shot.mBars' : 'shot.mFit')}</button>`).join('');
  return `<div class="lab">${hdr(t('shot.title'))}${stage}<div class="tools">${modes}<span style="flex:1"></span><label for="labfile">${t('shot.another')}</label>${file}<button data-act="labclear">${t('shot.clear')}</button><button data-act="home">⌂</button></div></div>`;
};

function loadScreenshot(file) {
  if (!file) return;
  if (file.type && !/^image\//.test(file.type)) { toast(t('shot.err'), 3400); return; }
  toast(t('shot.loading'), 1200);
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    try {
      const MAX = 1600, k = Math.min(1, MAX / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement('canvas');
      c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      const src = c.toDataURL('image/jpeg', 0.88);
      if (S.lab && S.lab.src) { const i = S.shots.indexOf(S.lab.src); if (i >= 0) S.shots.splice(i, 1); }
      S.lab = { src, w: c.width, h: c.height };
      S.shots.push(src); // also usable in Photos and chat ＋ (stacking-bars loop)
      render();
      toast(t('shot.added'), 3200);
    } catch (e) { toast(t('shot.err'), 3400); }
    URL.revokeObjectURL(url);
  };
  img.onerror = () => { URL.revokeObjectURL(url); toast(t('shot.err'), 3400); };
  img.src = url;
}
function clearScreenshot() {
  if (S.lab) { const i = S.shots.indexOf(S.lab.src); if (i >= 0) S.shots.splice(i, 1); }
  S.lab = null; render();
}
