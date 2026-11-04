/* ================= app registry + shared bits ================= */
const RENDER = {};
const appName = id => t('apps.' + id);
const hdr = (title, extra = '') => `<div class="hdr"><button class="bk" data-act="home" aria-label="${esc(t('common.back'))}">‹</button><span style="flex:1">${title}</span>${extra}</div>`;
const sw = (on, attrs, label) => `<button class="sw" role="switch" aria-checked="${on ? 'true' : 'false'}" aria-label="${esc(label)}" ${attrs}></button>`;
const MAIN = 'flex:1;min-width:0;min-height:0;display:flex;flex-direction:column';
