/* ================= shared visual-effect layer =================
 * Every effect is defined once here and used by every simulated app.
 *  scope: 'u' = unfolded only, 'b' = both modes
 *  cap:   whether it shows up in in-app screenshots (overlays marked data-ig are skipped)
 */
const FX = (() => {
  const DEFS = [
    { id: 'bars', scope: 'u', cap: true },
    { id: 'rightui', scope: 'u', cap: true },
    { id: 'crease', scope: 'u', cap: false },
    { id: 'distort', scope: 'u', cap: false },
    { id: 'haze', scope: 'u', cap: false },
    { id: 'crack', scope: 'u', cap: false },
    { id: 'reach', scope: 'u', cap: false },
    { id: 'heat', scope: 'b', cap: true }
  ];
  const on = id => !!S.fx[id];
  const active = id => on(id) && (DEFS.find(d => d.id === id).scope === 'b' || !S.folded);
  function set(id, v) { S.fx[id] = !!v; S.fxByExp = S.fxByExp.filter(k => k !== id); savePrefs(); }
  function toggle(id) { set(id, !on(id)); }

  function crackSVG() {
    return `<svg data-ig class="fx-crack" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
 <polyline points="50,22 50.6,28 49.5,34 50.8,40 49.6,46 50.7,52 49.6,58 50.5,63 50.2,67" fill="none" stroke="rgba(0,0,0,.7)" stroke-width="4" vector-effect="non-scaling-stroke"/>
 <polyline points="50,22 50.6,28 49.5,34 50.8,40 49.6,46 50.7,52 49.6,58 50.5,63 50.2,67" fill="none" stroke="#fff" stroke-width="1.6" vector-effect="non-scaling-stroke"/>
 <polyline points="50.8,40 52.6,38.6 54,39.5" fill="none" stroke="#fff" stroke-width="1" vector-effect="non-scaling-stroke"/>
 <polyline points="49.6,58 47.6,59.8 46.4,59" fill="none" stroke="#fff" stroke-width="1" vector-effect="non-scaling-stroke"/>
 <rect x="50.2" y="66.2" width="49.8" height="1.4" fill="#fff"/><rect x="50.2" y="67.6" width="49.8" height=".6" fill="#ff3df0" opacity=".85"/><rect x="50.2" y="65.6" width="49.8" height=".6" fill="#3dffb0" opacity=".75"/></svg>`;
  }

  /* thumb reach: ellipse anchored at the bottom corner of the holding hand,
     in normalized screen coordinates (works for any rendered size) */
  function reachEllipse() {
    return { cx: S.hand === 'right' ? 0.97 : 0.03, cy: 0.97, rx: 0.46, ry: 0.70 };
  }
  function reachOverlay() {
    const e = reachEllipse();
    const bg = `radial-gradient(ellipse ${e.rx * 100}% ${e.ry * 100}% at ${e.cx * 100}% ${e.cy * 100}%, rgba(50,213,131,.13) 0 98%, rgba(255,40,60,.18) 100%)`;
    const side = S.hand === 'right' ? 'left:8px' : 'right:8px';
    const okSide = S.hand === 'right' ? 'right:8px' : 'left:8px';
    return `<div data-ig class="fx-reach" style="background:${bg}" aria-hidden="true"><span class="lbl" style="${side}">${t('fx.deadL')}</span><span class="lbl2" style="${okSide}">${t('fx.okL')}</span></div>`;
  }
  /* true when a tap at client (x,y) on the screen element is out of thumb reach */
  function outOfReach(x, y, rect) {
    if (!active('reach')) return false;
    const nx = (x - rect.left) / rect.width, ny = (y - rect.top) / rect.height;
    const e = reachEllipse();
    return ((nx - e.cx) / e.rx) ** 2 + ((ny - e.cy) / e.ry) ** 2 > 1;
  }

  /* overlay effects drawn on top of the whole simulated screen */
  function overlays() {
    if (S.folded) return '';
    return (on('crease') ? '<div data-ig class="fx-crease"></div>' : '')
      + (on('distort') ? '<div data-ig class="fx-distort"></div>' : '')
      + (on('haze') ? '<div data-ig class="fx-haze"></div>' : '')
      + (on('crack') ? crackSVG() : '')
      + (on('reach') ? reachOverlay() : '');
  }

  /* app compatibility wrapper (black bars) */
  function wrap(app, inner) {
    if (S.folded || app.opt === 'full' || app.opt === 'lab' || !on('bars')) return inner;
    if (app.opt === 'none') return `<div style="position:absolute;inset:0;background:#000"><div class="col">${inner}</div></div>`;
    if (app.opt === 'half') return `<div style="position:absolute;inset:0;background:#000"><div style="position:absolute;top:0;bottom:0;left:0;width:78%">${inner}</div></div>`;
    return inner;
  }

  /* right-heavy tool bar (unfolded). With the effect off, the same buttons go to a bottom row. */
  function sideUI(main, buttons, o = {}) {
    const dark = o.dark ? ' dark' : '';
    const style = o.style ? ` style="${o.style}"` : '';
    if (on('rightui')) return `<div class="app horiz"${style}>${main}<div class="side${o.wide ? ' wide' : ''}${dark}">${buttons}</div></div>`;
    return `<div class="app"${style}>${main}<div class="bot${dark}">${buttons}</div></div>`;
  }

  return { DEFS, on, active, set, toggle, overlays, wrap, sideUI, outOfReach };
})();
