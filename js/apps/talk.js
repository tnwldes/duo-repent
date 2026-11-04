/* ---- chat (unoptimized: black bars when unfolded) ---- */
function msgText(m) {
  if (m.t != null) return esc(m.t);
  if (m.k != null) return esc(L('talk.msgs')[m.k]);
  return esc(L('talk.replies')[m.r]);
}
function msgHTML(m, i) {
  return m.img
    ? `<div class="bub img ${m.me ? 'r' : 'l'}"><img src="${m.img}" alt="${esc(t('talk.photo'))}" data-act="view" data-i="${i}"></div>`
    : `<div class="bub ${m.me ? 'r' : 'l'}">${msgText(m)}</div>`;
}
RENDER.talk = function () {
  const viewer = S.viewer !== null && S.msgs[S.viewer] && S.msgs[S.viewer].img
    ? `<div style="position:absolute;inset:0;background:#000;z-index:5;display:flex;flex-direction:column"><div class="hdr" style="background:#111;color:#fff;border-color:#222"><button class="bk" data-act="closeview" style="color:#fff" aria-label="${esc(t('common.close'))}">✕</button><span>${t('talk.photo')}</span></div><div style="flex:1;display:grid;place-items:center;overflow:hidden"><img src="${S.msgs[S.viewer].img}" alt="" style="max-width:100%;max-height:100%"></div></div>` : '';
  const sheet = S.sheet ? `<div style="position:absolute;left:0;right:0;bottom:0;z-index:6;background:#fff;border-radius:14px 14px 0 0;box-shadow:0 -4px 16px #0003;padding:10px 10px 22px;max-height:60%;overflow:auto">
     <div style="display:flex;justify-content:space-between;font-weight:700;font-size:13px;margin-bottom:8px"><span>${t('talk.shots')}</span><button data-act="sheet">${t('common.close')}</button></div>
     ${S.shots.length ? `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">${S.shots.map((s, i) => `<img src="${s}" alt="${esc(t('photos.shot', { n: i + 1 }))}" data-act="sendshot" data-i="${i}" style="width:100%;border-radius:6px;border:1px solid #ddd">`).join('')}</div>` : `<p style="font-size:12.5px;color:#666;line-height:1.6">${t('talk.noShots')}</p>`}</div>` : '';
  return `<div class="app" style="background:#b2c7d9">${hdr(`${t('talk.title')} <span style="color:#888;font-weight:400">4</span>`)}
    <div id="tmsgs" class="scroll" style="flex:1;padding:8px;display:flex;flex-direction:column;gap:6px">${S.msgs.map(msgHTML).join('')}</div>
    <form class="ibar" id="tform" autocomplete="off"><button type="button" class="tbtn" data-act="sheet" aria-label="${esc(t('talk.attach'))}">＋</button><input id="tin" placeholder="${esc(t('talk.placeholder'))}" aria-label="${esc(t('talk.placeholder'))}" enterkeyhint="send" value="${esc(S.draft)}"><button style="background:#ffd43b;color:#111">${t('talk.send')}</button></form>
    ${sheet}${viewer}</div>`;
};
function addMsg(m) {
  S.msgs.push(m);
  const tm = $('tmsgs');
  if (S.app === 'talk' && tm && S.viewer === null) { tm.insertAdjacentHTML('beforeend', msgHTML(m, S.msgs.length - 1)); tm.scrollTop = tm.scrollHeight; }
}
const randomReply = () => ({ me: 0, r: Math.floor(Math.random() * L('talk.replies').length) });
