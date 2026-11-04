/* ================= i18n =================
 * - Dictionaries live in /locales/<lang>.js (window.DUO_LOCALES[lang]).
 * - t('a.b.c', {var}) returns a string; {var} values are HTML-escaped.
 * - L('a.b') returns the raw value (array / object / function).
 * - To add a language: create locales/xx.js with the same keys, add a
 *   <script> tag in index.html and add 'xx' to SUPPORTED below.
 */
const I18N = (() => {
  const SUPPORTED = ['ko', 'en'];
  const FALLBACK = 'ko';
  const KEY = 'duoLang';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function detect() {
    try {
      const q = new URLSearchParams(location.search).get('lang');
      if (q && SUPPORTED.includes(q)) return q;
    } catch (e) {}
    try {
      const saved = localStorage.getItem(KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (e) {}
    const langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''])
      .map(l => String(l).toLowerCase());
    for (const l of langs) {
      const base = l.split('-')[0];
      if (SUPPORTED.includes(base)) return base;
    }
    return 'en'; // unsupported browser language → English
  }

  let lang = detect();

  function dig(obj, key) {
    return key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
  }
  function L(key) {
    const all = window.DUO_LOCALES || {};
    let v = dig(all[lang], key);
    if (v === undefined) v = dig(all[FALLBACK], key);
    return v;
  }
  function t(key, vars) {
    let v = L(key);
    if (v === undefined) { console.warn('[i18n] missing', key); return key; }
    if (typeof v !== 'string') return v;
    if (vars) v = v.replace(/\{(\w+)\}/g, (m, k) => (vars[k] === undefined ? m : esc(vars[k])));
    return v;
  }

  function applyStatic(root = document) {
    root.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    root.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    root.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); });
    root.querySelectorAll('[data-setlang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setlang === lang)));
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    const md = document.querySelector('meta[name="description"]');
    if (md) md.content = t('meta.desc');
  }

  function setLang(l) {
    if (!SUPPORTED.includes(l) || l === lang) return;
    lang = l;
    try { localStorage.setItem(KEY, l); } catch (e) {}
    applyStatic();
    document.dispatchEvent(new CustomEvent('duo:lang', { detail: l }));
  }

  const loc = () => t('meta.dateLocale');
  const num = n => Number(n).toLocaleString(loc());
  /* money in KRW, localized */
  function won(v) {
    if (lang === 'ko') return v.toLocaleString('ko-KR') + '원';
    return '₩' + v.toLocaleString('en-US');
  }
  /* short form used inside sentences */
  function wonShort(v) {
    if (lang === 'ko') {
      if (v < 10000) return v.toLocaleString('ko-KR') + '원';
      return v % 10000 === 0 ? (v / 10000).toLocaleString('ko-KR') + '만 원' : (Math.round(v / 1000) / 10).toLocaleString('ko-KR') + '만 원';
    }
    return '₩' + v.toLocaleString('en-US');
  }

  return { t, L, esc, setLang, applyStatic, won, wonShort, num, loc, SUPPORTED, get lang() { return lang; } };
})();
const t = I18N.t, L = I18N.L;
