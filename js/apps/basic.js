/* ---- bank (unoptimized) ---- */
RENDER.bank = function () {
  const names = L('bank.tx');
  const amt = v => (v > 0 ? '+' : '-') + I18N.won(Math.abs(v));
  return `<div class="app" style="background:#f2f4f8">${hdr(t('bank.title'))}<div class="scroll" data-keep="bank" style="flex:1;padding:14px">
  <div style="background:#2f6bff;color:#fff;border-radius:16px;padding:16px"><div style="font-size:12px;opacity:.8">${t('bank.account')}</div><div style="font-size:24px;font-weight:900;margin:6px 0">${I18N.won(BANK_BALANCE)}</div><div style="display:flex;gap:8px;margin-top:10px"><button data-act="nope" style="flex:1;background:#ffffff33;border-radius:10px;padding:8px;font-size:13px">${t('bank.transfer')}</button><button data-act="nope" style="flex:1;background:#ffffff33;border-radius:10px;padding:8px;font-size:13px">${t('bank.history')}</button></div></div>
  <div style="font-weight:700;margin:16px 0 6px;font-size:13px">${t('bank.recent')}</div>
  ${BANK_TX.map((v, i) => `<div class="row" style="background:#fff;border-radius:10px;margin-bottom:6px;border:0"><span>${esc(names[i])}</span><b style="color:${v > 0 ? '#2f6bff' : '#111'}">${amt(v)}</b></div>`).join('')}
  </div></div>`;
};

/* ---- video (half-optimized: black band, heat) ---- */
RENDER.video = function () {
  const p = S.playing;
  return `<div class="app" style="background:#0f0f0f;color:#fff">${hdr(`<span style="color:#111">${t('video.title')}</span>`)}
   <div role="button" aria-label="${esc(p ? t('video.playing') : t('video.idle'))}" style="position:relative;aspect-ratio:16/9;background:radial-gradient(ellipse at 70% 120%,#3a2a12 0,#0a0a0a 45%,#000 70%);overflow:hidden;flex:none" data-act="play">
     ${Array.from({ length: 30 }, (_, i) => `<i style="position:absolute;left:${(i * 37) % 100}%;top:${(i * 53) % 70}%;width:2px;height:2px;border-radius:50%;background:#fff;opacity:${.35 + (i % 5) / 9};${p ? `animation:tw ${2 + i % 3}s infinite` : ''}"></i>`).join('')}
     <div style="position:absolute;inset:0;display:grid;place-items:center;font-size:${p ? 0 : 36}px">▶</div>
     <div style="position:absolute;left:8px;bottom:6px;font-size:11px;opacity:.85">${p ? t('video.playing') : t('video.idle')}</div>
     ${p ? '<div style="position:absolute;left:0;bottom:0;height:3px;background:#f00;width:35%"></div>' : ''}</div>
   <div class="scroll" data-keep="video" style="flex:1;padding:10px;display:grid;gap:10px;align-content:start">
     ${L('video.list').map(x => `<div style="display:flex;gap:8px"><div style="width:42%;aspect-ratio:16/9;border-radius:8px;background:#222;flex:none"></div><div style="font-size:12.5px;line-height:1.4">${esc(x)}<div style="color:#888;font-size:11px;margin-top:3px">${t('video.views')}</div></div></div>`).join('')}
   </div></div>`;
};

/* ---- browser (fills screen, buttons pushed right) ---- */
RENDER.web = function () {
  const art = `<b style="font-size:17px;line-height:1.4;display:block;margin-bottom:8px">${t('web.headline')}</b><div style="color:#888;font-size:11px;margin-bottom:10px">${t('web.meta')}</div>${esc(t('web.body').repeat(6))}`;
  const addr = `<form id="wform" style="padding:6px 8px;background:#f2f2f7;flex:none"><input id="win" value="news.example.com" aria-label="URL" style="width:100%;height:32px;border-radius:9px;border:0;background:#e3e3e9;text-align:center;font-size:16px;color:#111;user-select:text;-webkit-user-select:text"></form>`;
  const icons = ['‹', '›', '⇪', '📖', '⧉'];
  if (S.folded) return `<div class="app">${addr}<div class="scroll" data-keep="web" style="flex:1;padding:14px;font-size:14px;line-height:1.75">${art}</div>
     <div class="bot">${icons.map(x => `<button data-act="nope" style="font-size:18px;color:#0a84ff">${x}</button>`).join('')}<button data-act="home" style="font-size:13px;color:#0a84ff">${t('web.home')}</button></div></div>`;
  const main = `<div style="${MAIN}">${addr}<div class="scroll" data-keep="web" style="flex:1;padding:14px 16px;font-size:14px;line-height:1.75">${art}</div></div>`;
  const btns = icons.map(x => `<button data-act="rightui" class="tbtn" style="color:#0a84ff">${x}</button>`).join('')
    + `<button data-act="home" class="tbtn" style="color:#0a84ff;font-size:11px">${t('web.home')}</button>` + (FX.on('rightui') ? '<div style="flex:1"></div>' : '');
  return FX.sideUI(main, btns, { wide: true });
};

/* ---- photos (Apple app: fills screen) ---- */
RENDER.photos = function () {
  if (S.viewer !== null && S.app === 'photos' && S.shots[S.viewer]) {
    const s = S.shots[S.viewer];
    const img = `<div style="flex:1;display:grid;place-items:center;overflow:hidden;min-height:0"><img src="${s}" alt="${esc(t('photos.shot', { n: S.viewer + 1 }))}" style="max-width:100%;max-height:100%"></div>`;
    if (S.folded) return `<div class="app" style="background:#000"><div class="hdr" style="background:#111;color:#fff;border-color:#222"><button class="bk" data-act="closeview" aria-label="${esc(t('common.back'))}">‹</button><span>${t('photos.shot', { n: S.viewer + 1 })}</span></div>${img}</div>`;
    return FX.sideUI(`<div style="${MAIN}">${img}</div>`,
      `<button class="tbtn" data-act="closeview" aria-label="${esc(t('common.back'))}">‹</button><button class="tbtn" data-act="nope" aria-label="${esc(t('photos.share'))}">⇪</button><button class="tbtn" data-act="delshot" aria-label="${esc(t('photos.del'))}">🗑</button>`,
      { dark: true, style: 'background:#000' });
  }
  const grid = S.shots.length
    ? `<div style="display:grid;grid-template-columns:repeat(${S.folded ? 3 : 5},1fr);gap:3px">${S.shots.map((s, i) => `<img src="${s}" alt="${esc(t('photos.shot', { n: i + 1 }))}" data-act="vshot" data-i="${i}" style="width:100%;aspect-ratio:1;object-fit:cover">`).join('')}</div>`
    : `<p style="padding:20px;color:#888;font-size:13px;line-height:1.6">${t('photos.empty')}</p>`;
  if (S.folded) return `<div class="app">${hdr(t('photos.title'))}<div class="scroll" data-keep="photos" style="flex:1">${grid}</div></div>`;
  return FX.sideUI(`<div class="scroll" data-keep="photos" style="flex:1;min-width:0;min-height:0">${grid}</div>`,
    `<button class="tbtn" data-act="home" aria-label="${esc(t('common.back'))}">‹</button><button class="tbtn" data-act="rightui">＋</button><button class="tbtn" data-act="rightui">⋯</button>`);
};

/* ---- notes (Apple app, menus on the right) ---- */
RENDER.memo = function () {
  const body = `<b style="font-size:17px">${t('memo.head')}</b><p style="margin-top:8px;line-height:1.7;font-size:13.5px;color:#333">${t('memo.body')}</p>`;
  if (S.folded) return `<div class="app">${hdr(t('memo.title'))}<div class="scroll" data-keep="memo" style="flex:1;padding:14px">${body}</div></div>`;
  const list = `<div style="width:30%;background:#f2f2f6;border-right:1px solid #ddd;padding:10px;flex:none">${L('memo.list').map((x, i) => `<div style="padding:9px;border-radius:8px;font-size:12.5px;${i ? '' : 'background:#ffe58f'}">${esc(x)}</div>`).join('')}</div>`;
  const main = `<div style="flex:1;min-width:0;min-height:0;display:flex">${list}<div class="scroll" data-keep="memo" style="flex:1;padding:16px;min-width:0">${body}</div></div>`;
  return FX.sideUI(main, `<button class="tbtn" data-act="home" aria-label="${esc(t('common.back'))}">‹</button><button class="tbtn" data-act="rightui">✎</button><button class="tbtn" data-act="rightui">⇪</button><button class="tbtn" data-act="rightui">🗑</button>`);
};

/* ---- camera (no telephoto) ---- */
RENDER.camera = function () {
  const z = S.zoom;
  return `<div class="app" style="background:#000;color:#fff">
   <div style="flex:1;position:relative;overflow:hidden"><div style="position:absolute;inset:0;transform:scale(${z === 0.5 ? 0.8 : z});filter:${z === 2 ? 'blur(.7px) saturate(.9)' : 'none'};background:linear-gradient(#7fb3e6,#cfe3f5 55%,#6b8f5a 56%,#4e6e40)">
     ${[12, 26, 44, 60, 78].map((x, i) => `<div style="position:absolute;left:${x}%;bottom:44%;width:${9 + i % 3 * 3}%;height:${18 + i * 5}%;background:#5b6b80;border:1px solid #4a596c"></div>`).join('')}
     <div style="position:absolute;left:46%;bottom:30%;width:8%;height:10%;border-radius:50% 50% 0 0;background:#2e4a22"></div></div>
     ${z === 2 ? `<div style="position:absolute;top:8px;left:50%;transform:translateX(-50%);font-size:11px;background:#0008;padding:4px 8px;border-radius:99px;white-space:nowrap">${t('camera.crop')}</div>` : ''}</div>
   <div style="display:flex;justify-content:center;gap:8px;padding:8px">${[0.5, 1, 2, 3, 5].map(v => `<button data-act="zoom" data-z="${v}" aria-pressed="${v === z}" style="width:38px;height:38px;border-radius:50%;font-size:12px;font-weight:700;background:${v === z ? '#ffd60a' : '#222'};color:${v === z ? '#000' : v > 2 ? '#555' : '#fff'}">${v}×</button>`).join('')}</div>
   <div style="display:flex;align-items:center;justify-content:space-around;padding:6px 0 16px"><button data-act="home" style="font-size:13px">${t('camera.home')}</button><button data-act="shutter" aria-label="${esc(t('camera.shutter'))}" style="width:58px;height:58px;border-radius:50%;background:#fff;box-shadow:0 0 0 4px #000,0 0 0 6px #fff"></button><span style="width:40px"></span></div></div>`;
};

/* ---- price table app (unoptimized) ---- */
RENDER.price = function () {
  return `<div class="app" style="background:#fff">${hdr(t('price.title'))}<div class="scroll" data-keep="price" style="flex:1;padding:10px 12px 20px">${priceHTML(false)}</div></div>`;
};
