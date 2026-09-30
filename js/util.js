/* Shared maths, formatting, answer-checking and SVG helpers. */
const U = (() => {
  // ---------- random ----------
  const rnd = (a, b) => a + Math.random() * (b - a);
  const int = (a, b) => Math.floor(rnd(a, b + 1));
  const nz = (a, b) => { let v; do { v = int(a, b); } while (v === 0); return v; };
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  /** Random value on a step grid, e.g. step(2, 20, 0.5). */
  const step = (a, b, s) => +(a + s * int(0, Math.round((b - a) / s))).toFixed(6);

  // ---------- trig in degrees ----------
  const rad = d => d * Math.PI / 180;
  const deg = r => r * 180 / Math.PI;
  const sin = d => Math.sin(rad(d));
  const cos = d => Math.cos(rad(d));
  const tan = d => Math.tan(rad(d));
  const clamp1 = x => Math.max(-1, Math.min(1, x));
  const asin = x => deg(Math.asin(clamp1(x)));
  const acos = x => deg(Math.acos(clamp1(x)));
  const atan = x => deg(Math.atan(x));
  /** Angle anticlockwise from +x, 0 <= a < 360. */
  const ang360 = (x, y) => {
    let a = deg(Math.atan2(y, x));
    if (a < 0) a += 360;
    if (a >= 359.95) a = 0;
    return a;
  };
  /** Bearing (clockwise from north) of a vector with east e and north n. */
  const bearing = (e, n) => ang360(n, e);

  // ---------- vectors ----------
  const mag = v => Math.hypot(...v);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  const scale = (k, a) => a.map(x => k * x);
  const det3 = (a, b, c) => dot(a, cross(b, c));

  // ---------- number formatting ----------
  const clean = x => (Math.abs(x) < 1e-9 ? 0 : x);
  /** Format to n significant figures, keeping trailing zeros (e.g. 0.500). */
  function sf(x, n = 3) {
    x = clean(x);
    if (x === 0) return '0';
    const ax = Math.abs(x);
    if (ax >= 1e6 || ax < 1e-3) {
      const [m, e] = x.toExponential(n - 1).split('e');
      return `${m}\\times10^{${parseInt(e, 10)}}`;
    }
    let s = x.toPrecision(n);
    if (s.includes('e')) s = String(Math.round(parseFloat(s)));
    return s;
  }
  /** Scientific notation for genuinely tiny/huge physical values (no zero-snapping). */
  function sci(x, n = 3) {
    if (x === 0) return '0';
    const [m, e] = x.toExponential(n - 1).split('e');
    return `${m}\\times10^{${parseInt(e, 10)}}`;
  }
  /** Exact integers shown as integers, otherwise 3 s.f. */
  function num(x, n = 3) {
    x = clean(x);
    if (Math.abs(x - Math.round(x)) < 1e-9) return String(Math.round(x));
    const r = Math.round(x * 100) / 100;
    if (Math.abs(x - r) < 1e-9 && Math.abs(x) < 1000) return String(r);
    return sf(x, n);
  }
  /** Angle to 1 decimal place. */
  const ang = x => (Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : clean(x).toFixed(1));
  /** Three-figure bearing, e.g. 053.1° */
  function brg(x) {
    x = ((x % 360) + 360) % 360;
    if (x >= 359.95) x = 0;
    const whole = Math.abs(x - Math.round(x)) < 1e-9;
    const s = whole ? String(Math.round(x)) : x.toFixed(1);
    const [i, d] = s.split('.');
    return i.padStart(3, '0') + (d ? '.' + d : '') + '^\\circ';
  }
  /** Component (bracket) form, e.g. (3, -4) or (2, 0, 5). CAPE does not use unit-vector notation. */
  const ijk = (v, fmt = num) => tup(v, fmt);
  const col = (v, fmt = num) => `\\begin{pmatrix}${v.map(x => fmt(x)).join('\\\\')}\\end{pmatrix}`;
  const tup = (v, fmt = num) => `(${v.map(x => fmt(x)).join(',\\ ')})`;
  /** Wrap negatives in brackets for substitution lines. */
  const br = (x, fmt = num) => (clean(x) < 0 ? `(${fmt(x)})` : fmt(x));

  // ---------- parsing & checking ----------
  /** Parse a student's typed number. Accepts 12.5, -3/5, 2sqrt(3), √2, 1.6e-19, 1.6x10^-19, pi. */
  function parseNum(raw) {
    if (raw == null) return NaN;
    let s = String(raw).trim().toLowerCase();
    if (s === '') return NaN;
    s = s.replace(/[−–]/g, '-').replace(/[°º]/g, '').replace(/deg$/, '').replace(/\s+/g, '');
    s = s.replace(/(\d)\s*[x×*]\s*10\^?\(?(-?\d+)\)?/g, '$1e$2');
    s = s.replace(/×/g, '*').replace(/\^/g, '**');
    s = s.replace(/√\(/g, 'sqrt(').replace(/√(\d+(?:\.\d+)?)/g, 'sqrt($1)');
    s = s.replace(/π/g, 'pi');
    s = s.replace(/(^|[^\d.])0+(\d)/g, '$1$2'); // strip leading zeros, e.g. bearings like 053.1
    s = s.replace(/(\d|\))(sqrt|pi|\()/g, '$1*$2');
    const probe = s.replace(/sqrt/g, '').replace(/pi/g, '');
    if (!/^[0-9+\-*/().e]*$/.test(probe)) return NaN;
    s = s.replace(/sqrt/g, 'Math.sqrt').replace(/pi/g, 'Math.PI');
    try {
      const v = Function(`"use strict";return (${s});`)();
      return typeof v === 'number' && isFinite(v) ? v : NaN;
    } catch (e) { return NaN; }
  }
  /** Is a typed value close enough to the answer? */
  function close(user, ans, f = {}) {
    if (f.angle) {
      let d = Math.abs(((user - ans) % 360 + 540) % 360 - 180);
      return d <= (f.abs ?? 0.6);
    }
    const rel = f.rel ?? 0.01;
    const abs = f.abs ?? 0.011;
    return Math.abs(user - ans) <= Math.max(rel * Math.abs(ans), abs);
  }

  // ---------- SVG ----------
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  function arrowSVG(x1, y1, x2, y2, cls = 'v1', opts = {}) {
    const len = Math.hypot(x2 - x1, y2 - y1);
    if (len < 1) return '';
    const hl = Math.min(11, len * 0.45), hw = hl * 0.45;
    const ux = (x2 - x1) / len, uy = (y2 - y1) / len;
    const bx = x2 - ux * hl, by = y2 - uy * hl;
    const p1 = `${bx - uy * hw},${by + ux * hw}`, p2 = `${bx + uy * hw},${by - ux * hw}`;
    const w = opts.width ?? 2.5;
    return `<line x1="${x1}" y1="${y1}" x2="${bx}" y2="${by}" class="${cls}${opts.dash ? ' dash' : ''}" stroke-width="${w}" fill="none"/>` +
      `<polygon points="${x2},${y2} ${p1} ${p2}" class="${cls}" stroke-width="1"/>`;
  }
  /**
   * Draw 2-D vectors. items: {from:[x,y], v:[x,y], cls, label, dash}
   * opts: {size, north, axes, xlabel, ylabel}
   */
  function vectors(items, opts = {}) {
    const W = opts.size ?? 280, H = opts.height ?? W, pad = 34;
    const pts = [[0, 0]];
    items.forEach(it => { const f = it.from || [0, 0]; pts.push(f, [f[0] + it.v[0], f[1] + it.v[1]]); });
    let minX = Math.min(...pts.map(p => p[0])), maxX = Math.max(...pts.map(p => p[0]));
    let minY = Math.min(...pts.map(p => p[1])), maxY = Math.max(...pts.map(p => p[1]));
    const span = Math.max(maxX - minX, maxY - minY, 1e-6);
    minX -= span * 0.12; maxX += span * 0.12; minY -= span * 0.12; maxY += span * 0.12;
    const s = Math.min((W - 2 * pad) / (maxX - minX), (H - 2 * pad) / (maxY - minY));
    const cx = W / 2 - s * (minX + maxX) / 2, cy = H / 2 + s * (minY + maxY) / 2;
    const X = x => +(cx + s * x).toFixed(1), Y = y => +(cy - s * y).toFixed(1);
    let g = '';
    if (opts.axes !== false) {
      g += `<line x1="${pad / 2}" y1="${Y(0)}" x2="${W - pad / 2}" y2="${Y(0)}" class="ax"/>`;
      g += `<line x1="${X(0)}" y1="${pad / 2}" x2="${X(0)}" y2="${H - pad / 2}" class="ax"/>`;
      g += `<text x="${W - pad / 2 - 4}" y="${Y(0) - 6}" class="lbl-sm" text-anchor="end">${esc(opts.xlabel ?? (opts.north ? 'E' : 'x'))}</text>`;
      g += `<text x="${X(0) + 6}" y="${pad / 2 + 10}" class="lbl-sm">${esc(opts.ylabel ?? (opts.north ? 'N' : 'y'))}</text>`;
    }
    items.forEach(it => {
      const f = it.from || [0, 0];
      const x1 = X(f[0]), y1 = Y(f[1]), x2 = X(f[0] + it.v[0]), y2 = Y(f[1] + it.v[1]);
      g += arrowSVG(x1, y1, x2, y2, it.cls || 'v1', { dash: it.dash });
      if (it.label) {
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, len = Math.hypot(x2 - x1, y2 - y1) || 1;
        const off = it.labelSide === 'left' ? -14 : 14;
        const lx = mx + (-(y2 - y1) / len) * off * -1, ly = my + ((x2 - x1) / len) * off * -1;
        g += `<text x="${lx.toFixed(1)}" y="${(ly + 5).toFixed(1)}" class="lbl" text-anchor="middle">${esc(it.label)}</text>`;
      }
    });
    return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(opts.alt || 'Vector diagram')}">${g}</svg>`;
  }
  /** Block on a slope of angle theta with weight and its components. */
  function slope(theta, opts = {}) {
    const W = 300, H = 210;
    const x0 = 20, y0 = 190, L = 260;
    const x1 = x0 + L, y1 = y0 - L * Math.tan(rad(theta));
    const topY = Math.max(y1, 20);
    const run = (y0 - topY) / Math.tan(rad(theta));
    const xr = x0 + run;
    let g = `<polygon points="${x0},${y0} ${xr},${y0} ${xr},${topY}" class="shape"/>`;
    // block at middle of slope
    const t = 0.55, bx = x0 + run * t, by = y0 - (y0 - topY) * t;
    const ux = Math.cos(rad(theta)), uy = -Math.sin(rad(theta));
    const nx = uy, ny = -ux; // outward normal (up-left)
    const bw = 34, bh = 22;
    const c = [bx + nx * bh / 2, by + ny * bh / 2];
    const corners = [[-bw / 2, 0], [bw / 2, 0], [bw / 2, bh], [-bw / 2, bh]].map(([a, b]) => `${(bx + ux * a + nx * b).toFixed(1)},${(by + uy * a + ny * b).toFixed(1)}`);
    g += `<polygon points="${corners.join(' ')}" class="shape" style="fill:var(--surface)"/>`;
    const Wl = 70;
    g += arrowSVG(c[0], c[1], c[0], c[1] + Wl, 'vk');
    g += `<text x="${c[0] + 6}" y="${c[1] + Wl + 4}" class="lbl">mg</text>`;
    if (opts.components !== false) {
      const along = Wl * Math.sin(rad(theta)), perp = Wl * Math.cos(rad(theta));
      g += arrowSVG(c[0], c[1], c[0] - ux * along, c[1] - uy * along, 'v2', { dash: true, width: 2 });
      g += arrowSVG(c[0], c[1], c[0] - nx * perp, c[1] - ny * perp, 'v1', { dash: true, width: 2 });
      g += `<text x="${(c[0] - ux * along - 8).toFixed(1)}" y="${(c[1] - uy * along + 16).toFixed(1)}" class="lbl-sm" text-anchor="end">mg sinθ</text>`;
      g += `<text x="${(c[0] - nx * perp + 8).toFixed(1)}" y="${(c[1] - ny * perp + 14).toFixed(1)}" class="lbl-sm">mg cosθ</text>`;
    }
    g += `<text x="${xr - 38}" y="${y0 - 8}" class="lbl-sm">θ = ${theta}°</text>`;
    return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Block on a slope">${g}</svg>`;
  }

  return { rnd, int, nz, pick, shuffle, step, rad, deg, sin, cos, tan, asin, acos, atan, ang360, bearing,
    mag, dot, cross, add, sub, scale, det3, sf, sci, num, ang, brg, ijk, col, tup, br, parseNum, close,
    esc, arrowSVG, vectors, slope };
})();
