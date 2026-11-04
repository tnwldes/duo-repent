/* ================= price comparison (intro + 가격표 app) ================= */
let priceTier = 0;
const usd = v => '$' + Math.round(v / USD_KRW).toLocaleString('en-US');
function unitOf(c) { return L('price.units')[c.u]; }
function cmpText(c, budget) {
  const F = L('price.fmt'), u = unitOf(c), q = budget / c.p;
  if (c.kind === 'months') { const m = Math.floor(q), y = Math.floor(m / 12), r = m % 12; return F.months(m, y, r); }
  if (c.kind === 'hours') { const h = Math.ceil(q); return F.hours(h, Math.round(h / 40 * 10) / 10); }
  if (q < 1) return F.under(Math.round(q * 100) / 100, u, Math.round(c.p / budget * 10) / 10);
  const n = Math.floor(q), left = budget - n * c.p;
  let sub = c.u === 'cup' ? F.daily(Math.floor(n / 365), Math.round((n % 365) / 30.4)) : (left >= 10000 ? F.left(I18N.wonShort(left)) : '');
  if (c.id === 'repair') sub = F.repair(Math.round(c.p / budget * 100));
  return [F.count(n, u), sub];
}
function priceHTML(dark) {
  const [label, budget] = DUO_PRICES[priceTier];
  const en = I18N.lang !== 'ko';
  const money = v => I18N.won(v) + (en ? ` (≈${usd(v)})` : '');
  return `<div class="ptabs" role="group">${DUO_PRICES.map(([l], i) => `<button data-tier="${i}" aria-pressed="${i === priceTier}" class="${i === priceTier ? 'on' : ''}" ${dark ? '' : 'style="background:' + (i === priceTier ? '#0a84ff' : '#e9e9ef') + ';color:' + (i === priceTier ? '#fff' : '#333') + '"'}>${l}</button>`).join('')}</div>
   <div style="font-size:13px;margin:4px 0 6px;${dark ? '' : 'color:#333'}">${t('price.head', { label, price: money(budget) }).replace('<b>', `<b style="${dark ? 'color:var(--acc)' : 'color:#e5484d'}">`)}</div>
   <table class="ptbl" ${dark ? '' : 'style="color:#111"'}><thead><tr><th>${t('price.th1')}</th><th style="text-align:right">${t('price.th2')}</th></tr></thead><tbody>
   ${COMPARE.map(c => { const [a, b] = cmpText(c, budget); const [n, d] = L('price.items')[c.id]; return `<tr><td>${c.ic} ${esc(n)}<small>${money(c.p)} · ${esc(d)}</small></td><td class="n" ${dark ? '' : 'style="color:#e5484d"'}>${esc(a)}<small>${esc(b)}</small></td></tr>`; }).join('')}
   </tbody></table>
   <p class="pnote">${t('price.note', { fx: USD_KRW.toLocaleString('en-US') })}</p>`;
}
function renderPriceIntro() { const el = $('priceIntro'); if (el) el.innerHTML = priceHTML(true); }
document.addEventListener('click', e => {
  const b = e.target.closest('[data-tier]'); if (!b) return;
  priceTier = +b.dataset.tier; renderPriceIntro(); if (S.app === 'price') render();
});
