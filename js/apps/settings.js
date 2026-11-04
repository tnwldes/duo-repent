/* ---- settings (Apple app) : experience prefs, shared effects, weight, specs ---- */
function fxRowsLight() {
  return FX.DEFS.map(d => {
    const [ic, name] = L('fx.' + d.id);
    return `<div class="row"><span>${ic} ${esc(name)} <small style="color:#999">${d.scope === 'u' ? '(' + esc(t('panel.scopeU')) + ')' : ''}</small></span>${sw(FX.on(d.id), `data-act="fx" data-k="${d.id}"`, name)}</div>`;
  }).join('')
    + `<div class="row"><span>🤚 ${t('fx.hand')}</span><span style="display:flex;gap:6px">${['left', 'right'].map(h => `<button data-act="hand" data-h="${h}" aria-pressed="${S.hand === h}" style="padding:5px 10px;border-radius:8px;font-size:12.5px;font-weight:700;background:${S.hand === h ? '#0a84ff' : '#e9e9ef'};color:${S.hand === h ? '#fff' : '#333'}">${t(h === 'left' ? 'fx.handL' : 'fx.handR')}</button>`).join('')}</span></div>`;
}
RENDER.settings = function () {
  const diff = S.myW ? DUO_W - S.myW : null;
  const coins = diff ? Math.round(diff / COIN) : 0;
  const wInfo = S.myW ? (diff > 0 ? t('settings.heavier', { g: diff, coins }) : t('settings.lighter')) : t('settings.pickHint');
  const nameIdx = I18N.lang === 'ko' ? 0 : 1;
  const sec = s => `<div style="padding:14px 14px 6px;font-size:12px;color:#888">${s}</div>`;
  const list = `<div class="scroll" data-keep="settings" style="flex:1;background:#f2f2f7;color:#111">
   ${sec(t('settings.secExp'))}
   <div style="background:#fff">
    <div class="row"><span>${t('settings.wet')} <small style="color:#999">${t('settings.wetSub')}</small></span>${sw(S.wet, 'data-act="tg" data-k="wet"', t('settings.wet'))}</div>
    <div class="row"><label for="dl">${t('settings.delay')}</label><span style="display:flex;align-items:center;gap:6px"><input id="dl" type="range" min="0.3" max="2" step="0.1" value="${S.delay}" style="width:90px"><b style="width:38px">${t('settings.sec', { v: S.delay })}</b></span></div>
   </div>
   ${sec(t('settings.secFx'))}
   <div style="background:#fff">${fxRowsLight()}</div>
   ${sec(t('settings.secWeight'))}
   <div style="background:#fff"><div class="row" style="flex-direction:column;align-items:stretch">
     <select id="ph" aria-label="${esc(t('settings.pick'))}" style="width:100%;padding:9px;border-radius:9px;border:1px solid #ddd;font-size:16px;background:#fafafa;color:#111"><option value="">${t('settings.pick')}</option>${PHONES.map(p => `<option value="${p[2]}" ${S.myW == p[2] ? 'selected' : ''}>${esc(p[nameIdx])} (${p[2]}g)</option>`).join('')}</select>
     <span style="font-size:12.5px;color:#444;line-height:1.5">${wInfo}</span>
     ${S.myW && diff > 0 ? `<span style="font-size:11.5px;color:#888;line-height:1.5">${t('settings.coinTip', { coins })}</span>` : ''}
     <span style="font-size:10.5px;color:#aaa">${t('settings.specNote')}</span></div></div>
   ${sec(t('settings.secAbout'))}
   <div style="background:#fff;font-size:13px">
    ${L('settings.specs').map(([a, b]) => `<div class="row"><span>${esc(a)}</span><span style="color:#888;text-align:right">${esc(b)}</span></div>`).join('')}
   </div>
   <div style="padding:16px;text-align:center"><button data-act="reset" style="color:#e5484d;font-size:13px">${t('settings.reset')}</button></div></div>`;
  if (S.folded) return `<div class="app">${hdr(t('settings.title'))}${list}</div>`;
  const side = `<div style="width:30%;background:#f7f7f9;border-right:1px solid #ddd;padding:10px;flex:none;color:#111">${L('settings.side').map((x, i) => `<div style="padding:9px;border-radius:8px;font-size:12.5px;${i ? '' : 'background:#0a84ff;color:#fff'}">${esc(x)}</div>`).join('')}</div>`;
  return FX.sideUI(`<div style="flex:1;min-width:0;min-height:0;display:flex">${side}<div style="${MAIN}">${list}</div></div>`,
    `<button class="tbtn" data-act="home" aria-label="${esc(t('common.back'))}">‹</button><button class="tbtn" data-act="rightui">🔍</button>`);
};
