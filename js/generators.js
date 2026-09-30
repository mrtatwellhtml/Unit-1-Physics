/* Randomised question generators with worked solutions, one set per workbook section.
 * A generator returns { q, fields, steps, svg? }.
 * Numeric field:  { label, ans, unit, angle?, rel?, abs? }
 * Choice field:   { label, options: [...], ans }   (options may contain LaTeX)
 */
const G = (() => {
  const {
    int, nz, pick, shuffle, step, sin, cos, tan, asin, acos, atan, ang360, bearing,
    mag, dot, cross, add, sub, scale, det3, sf, num, ang, brg, ijk, tup, br
  } = U;
  const g = 9.81;
  const N = (label, ans, unit = '', o = {}) => ({ label, ans, unit, ...o });
  const A = (label, ans, o = {}) => ({ label, ans, unit: '°', angle: true, ...o });
  const C = (label, options, ans) => ({ label, options, ans });
  const m = s => `\\(${s}\\)`; // inline maths
  const D = s => `\\[${s}\\]`; // display maths

  const quadName = (x, y) => (x >= 0 ? (y >= 0 ? 'first quadrant (+, +)' : 'fourth quadrant (+, −)') : (y >= 0 ? 'second quadrant (−, +)' : 'third quadrant (−, −)'));
  function angleFromAcute(x, y) {
    const a = atan(Math.abs(y) / Math.abs(x || 1e-12));
    if (x >= 0 && y >= 0) return [a, `${m(`\\theta = ${ang(a)}^\\circ`)} (Q1)`];
    if (x < 0 && y >= 0) return [180 - a, `${m(`\\theta = 180^\\circ - ${ang(a)}^\\circ = ${ang(180 - a)}^\\circ`)} (Q2)`];
    if (x < 0 && y < 0) return [180 + a, `${m(`\\theta = 180^\\circ + ${ang(a)}^\\circ = ${ang(180 + a)}^\\circ`)} (Q3)`];
    return [360 - a, `${m(`\\theta = 360^\\circ - ${ang(a)}^\\circ = ${ang(360 - a)}^\\circ`)} (Q4)`];
  }
  function bearingSteps(e, n) {
    const b = bearing(e, n);
    const acute = atan(Math.abs(e) / Math.abs(n || 1e-12));
    let how;
    if (e >= 0 && n >= 0) how = `North-east quadrant: bearing = ${m(`\\tan^{-1}(|E|/|N|) = ${ang(acute)}^\\circ`)}`;
    else if (e >= 0 && n < 0) how = `South-east quadrant: bearing = ${m(`180^\\circ - ${ang(acute)}^\\circ`)}`;
    else if (e < 0 && n < 0) how = `South-west quadrant: bearing = ${m(`180^\\circ + ${ang(acute)}^\\circ`)}`;
    else how = `North-west quadrant: bearing = ${m(`360^\\circ - ${ang(acute)}^\\circ`)}`;
    return [b, `${how} = ${m(brg(b))}`];
  }
  const COMPASS = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'];

  // ======================================================================
  const V1 = [
    { name: 'Scalar or vector?', level: 1, fn() {
      const Q = [
        ['mass', 'Scalar', 'Mass has size only.'], ['weight', 'Vector', 'Weight is a force — it acts vertically downwards.'],
        ['speed', 'Scalar', 'Speed is the rate of change of distance.'], ['velocity', 'Vector', 'Velocity is the rate of change of displacement.'],
        ['distance', 'Scalar', 'Distance has no direction.'], ['displacement', 'Vector', 'Displacement is distance in a stated direction from a fixed point.'],
        ['temperature', 'Scalar', 'Temperature has no direction.'], ['acceleration', 'Vector', 'Acceleration is the rate of change of velocity.'],
        ['kinetic energy', 'Scalar', 'All forms of energy are scalars.'], ['momentum', 'Vector', 'Momentum = mass × velocity, so it has the direction of the velocity.'],
        ['time', 'Scalar', 'Time has size only.'], ['pressure', 'Scalar', 'Pressure acts equally in all directions at a point in a fluid; it is force per area (a scalar).'],
        ['power', 'Scalar', 'Power = rate of doing work; work is a scalar.'], ['impulse', 'Vector', 'Impulse = force × time = change in momentum.'],
        ['electric current', 'Scalar', 'Currents meeting at a junction add as numbers, not by the triangle law, so current is a scalar.'],
        ['gravitational field strength', 'Vector', 'Field strength is force per unit mass — it has a direction.'], ['density', 'Scalar', 'Mass per unit volume.'],
        ['work', 'Scalar', 'W = F·s is a scalar (dot) product.'], ['moment of a force (torque)', 'Vector', 'Torque τ = r × F has a direction (along the axis).'],
        ['electric charge', 'Scalar', 'Charge can be + or − but has no direction.'], ['tension', 'Vector', 'Tension is a force.'],
        ['friction', 'Vector', 'Friction is a force that opposes motion.'], ['upthrust', 'Vector', 'Upthrust is a force acting upwards.'],
        ['potential difference', 'Scalar', 'Energy per unit charge — a scalar.'], ['gravitational potential energy', 'Scalar', 'All energies are scalars.'],
        ['electric field strength', 'Vector', 'Force per unit positive charge — it has a direction.'], ['volume', 'Scalar', 'Size only.']
      ];
      const [name, a, why] = pick(Q);
      return { q: `Is <strong>${name}</strong> a scalar or a vector quantity?`, fields: [C('Answer', ['Scalar', 'Vector'], a)], steps: [why] };
    } },
    { name: 'Range of a resultant', level: 1, fn() {
      const a = int(2, 20); let b; do { b = int(2, 20); } while (b === a);
      const lo = Math.abs(a - b), hi = a + b;
      const c = pick([lo - 1, lo + 0.5, int(lo, hi), hi, hi + 1, (lo + hi) / 2]).valueOf();
      const cc = Math.max(0.5, c);
      const ok = cc >= lo && cc <= hi ? 'Yes' : 'No';
      return {
        q: `Two forces of ${a} N and ${b} N act on a particle. Find the largest and smallest possible resultant. Could the resultant be ${num(cc)} N?`,
        fields: [N('Largest resultant', hi, 'N'), N('Smallest resultant', lo, 'N'), C(`Could it be ${num(cc)} N?`, ['Yes', 'No'], ok)],
        steps: [`Largest when the forces point the same way: ${m(`${a} + ${b} = ${hi}`)} N.`,
          `Smallest when they point opposite ways: ${m(`|${a} - ${b}| = ${lo}`)} N.`,
          `Any value from ${lo} N to ${hi} N is possible, so ${num(cc)} N is ${ok === 'Yes' ? '' : '<strong>not</strong> '}possible.`]
      };
    } },
    { name: 'Distance vs displacement', level: 1, fn() {
      const d1 = int(10, 80), d2 = int(5, 90);
      const disp = d1 - d2;
      const dir = disp > 0 ? 'East' : disp < 0 ? 'West' : 'No direction (zero)';
      return {
        q: `A student walks ${d1} m due east and then ${d2} m due west. Find the distance walked and the displacement.`,
        fields: [N('Distance', d1 + d2, 'm'), N('Magnitude of displacement', Math.abs(disp), 'm'), C('Direction of displacement', ['East', 'West', 'No direction (zero)'], dir)],
        steps: [`Distance is a scalar — just add: ${m(`${d1} + ${d2} = ${d1 + d2}`)} m.`,
          `Displacement: take east as positive: ${m(`${d1} - ${d2} = ${disp}`)} m.`,
          disp === 0 ? 'The displacement is zero — the student is back at the start.' : `So the displacement is ${Math.abs(disp)} m due ${dir.toLowerCase()}.`]
      };
    } },
    { name: 'Scalar multiples and negatives', level: 1, fn() {
      const mg = int(2, 12), i = int(0, 7), k = pick([-3, -2, -1, -0.5, 0.5, 2, 3, 1.5]);
      const dirIdx = k > 0 ? i : (i + 4) % 8;
      const kTex = k === -1 ? '-' : k === -0.5 ? '-\\tfrac12' : k === 0.5 ? '\\tfrac12' : k === 1.5 ? '\\tfrac32' : String(k);
      return {
        q: `${m('\\vec{a}')} has magnitude ${mg} units and points ${COMPASS[i]}. Describe ${m(`${kTex}\\vec{a}`)}.`,
        fields: [N('Magnitude', Math.abs(k) * mg, 'units'), C('Direction', COMPASS.map(s => s[0].toUpperCase() + s.slice(1)), COMPASS[dirIdx][0].toUpperCase() + COMPASS[dirIdx].slice(1))],
        steps: [`Multiplying by a scalar ${m('k')} multiplies the magnitude by ${m('|k|')}: ${m(`${num(Math.abs(k))} \\times ${mg} = ${num(Math.abs(k) * mg)}`)}.`,
          k > 0 ? 'A positive scalar keeps the direction.' : `A negative scalar reverses the direction: ${COMPASS[i]} becomes ${COMPASS[dirIdx]}.`]
      };
    } },
    { name: 'Could three forces be in equilibrium?', level: 2, fn() {
      const f = [int(2, 15), int(2, 15), int(2, 20)];
      const s = f.slice().sort((a, b) => a - b);
      const ok = s[2] <= s[0] + s[1] ? 'Yes' : 'No';
      return {
        q: `Three forces of magnitudes ${f[0]} N, ${f[1]} N and ${f[2]} N act on a particle. Could the particle be in equilibrium?`,
        fields: [C('Equilibrium possible?', ['Yes', 'No'], ok)],
        steps: ['For equilibrium the three forces must form a closed triangle, so the largest force must be balanced by the resultant of the other two.',
          `The other two can give any resultant from ${m(`${s[1] - s[0]}`)} N to ${m(`${s[0] + s[1]}`)} N.`,
          `The largest force is ${s[2]} N, which ${ok === 'Yes' ? 'lies' : 'does <strong>not</strong> lie'} in that range → ${ok}.`]
      };
    } }
  ];

  // ======================================================================
  const V2 = [
    { name: 'Two perpendicular displacements', level: 1, fn() {
      const a = step(1.5, 12, 0.5), b = step(1.5, 12, 0.5);
      const ew = pick(['east', 'west']), ns = pick(['north', 'south']);
      const e = ew === 'east' ? a : -a, n = ns === 'north' ? b : -b;
      const R = Math.hypot(a, b);
      const [bb, bstep] = bearingSteps(e, n);
      return {
        q: `A student walks ${num(a)} m due ${ew} and then ${num(b)} m due ${ns}. Find the magnitude and bearing of the resultant displacement.`,
        svg: U.vectors([{ v: [e, 0], cls: 'v1', label: `${num(a)} m` }, { from: [e, 0], v: [0, n], cls: 'v2', label: `${num(b)} m` }, { v: [e, n], cls: 'v3', label: 'R', labelSide: 'left' }], { north: true, size: 240 }),
        fields: [N('Magnitude', R, 'm'), A('Bearing', bb)],
        steps: [`Tip-to-tail gives a right-angled triangle: ${m(`R = \\sqrt{${num(a)}^2 + ${num(b)}^2} = ${sf(R)}\\ \\text{m}`)}.`,
          `Take east and north as positive: ${m(`E = ${num(e)},\\ N = ${num(n)}`)}.`, bstep]
      };
    } },
    { name: 'Resultant of collinear forces', level: 1, fn() {
      const f = [int(2, 20), int(2, 20), int(2, 20)], d = [pick([1, -1]), pick([1, -1]), pick([1, -1])];
      const R = f[0] * d[0] + f[1] * d[1] + f[2] * d[2];
      const w = i => `${f[i]} N ${d[i] > 0 ? 'east' : 'west'}`;
      return {
        q: `Find the resultant of ${w(0)}, ${w(1)} and ${w(2)}. Give your answer as a signed number with <strong>east positive</strong>.`,
        fields: [N('Resultant (east +)', R, 'N')],
        steps: [`Along one line, just add with signs: ${m(f.map((x, i) => (i && d[i] > 0 ? '+' : '') + (d[i] > 0 ? x : -x)).join(' ') + ` = ${R}`)} N.`,
          R === 0 ? 'The resultant is zero.' : `So the resultant is ${Math.abs(R)} N due ${R > 0 ? 'east' : 'west'}.`]
      };
    } },
    { name: 'Change in velocity & average acceleration', level: 2, fn() {
      const u = int(5, 30), v = int(5, 30), b1 = 15 * int(0, 23);
      let b2; do { b2 = 15 * int(0, 23); } while (b2 === b1 || Math.abs(b2 - b1) === 180);
      const t = step(0.5, 5, 0.5);
      const U1 = [u * sin(b1), u * cos(b1)], V1 = [v * sin(b2), v * cos(b2)];
      const dv = sub(V1, U1), M = mag(dv);
      const [bb, bstep] = bearingSteps(dv[0], dv[1]);
      return {
        q: `A car's velocity changes from ${u} m s⁻¹ on a bearing of ${m(brg(b1))} to ${v} m s⁻¹ on a bearing of ${m(brg(b2))} in ${num(t)} s. Find the change in velocity and the magnitude of the average acceleration.`,
        svg: U.vectors([{ v: U1, cls: 'v1', label: 'u' }, { v: V1, cls: 'v2', label: 'v' }, { from: U1, v: dv, cls: 'v3', label: 'Δv', dash: true }], { north: true, size: 240 }),
        fields: [N(`${m('|\\Delta\\vec{v}|')}`, M, 'm s⁻¹'), A(`Bearing of ${m('\\Delta\\vec{v}')}`, bb), N('Average acceleration', M / t, 'm s⁻²')],
        steps: [`${m('\\Delta\\vec{v} = \\vec{v} - \\vec{u}')} (final − initial). Use east (${m('\\hat{\\imath}')}) and north (${m('\\hat{\\jmath}')}) components, ${m('d\\sin\\beta\\,\\hat{\\imath} + d\\cos\\beta\\,\\hat{\\jmath}')}.`,
          `${m(`\\vec{u} = ${ijk(U1, sf)}`)}, ${m(`\\vec{v} = ${ijk(V1, sf)}`)}.`,
          `${m(`\\Delta\\vec{v} = ${ijk(dv, sf)}`)}, so ${m(`|\\Delta\\vec{v}| = ${sf(M)}\\ \\text{m s}^{-1}`)}.`, bstep,
          `${m(`a = \\dfrac{|\\Delta\\vec{v}|}{t} = \\dfrac{${sf(M)}}{${num(t)}} = ${sf(M / t)}\\ \\text{m s}^{-2}`)}.`]
      };
    } }
  ];

  // ======================================================================
  const V3 = [
    { name: 'Resolve a vector (angle to an axis)', level: 1, fn() {
      const F = pick([int(5, 150), step(1.5, 60, 0.5)]), th = 5 * int(1, 17);
      const axis = pick(['+x', '-x']), side = pick(['above', 'below']);
      const A0 = axis === '+x' ? (side === 'above' ? th : 360 - th) : (side === 'above' ? 180 - th : 180 + th);
      const fx = F * cos(A0), fy = F * sin(A0);
      const qty = pick([['force', 'N'], ['velocity', 'm s⁻¹'], ['displacement', 'km']]);
      return {
        q: `Find the ${m('x')}- and ${m('y')}-components of a ${qty[0]} of ${num(F)} ${qty[1]} at ${th}° ${side} the ${m(axis.replace('-', '-'))} axis. (${m('+x')} right, ${m('+y')} up.)`,
        svg: U.vectors([{ v: [fx, fy], cls: 'v1', label: `${num(F)}` }], { size: 220 }),
        fields: [N(m('x') + '-component', fx, qty[1]), N(m('y') + '-component', fy, qty[1])],
        steps: [`Sizes using the acute angle ${th}° to the ${m('x')}-axis: ${m(`${num(F)}\\cos${th}^\\circ = ${sf(Math.abs(fx))}`)} and ${m(`${num(F)}\\sin${th}^\\circ = ${sf(Math.abs(fy))}`)}.`,
          `Signs from the sketch: it points ${fx < 0 ? 'left (−)' : 'right (+)'} and ${fy < 0 ? 'down (−)' : 'up (+)'}.`,
          `So ${m(`(${sf(fx)},\\ ${sf(fy)})`)} ${qty[1]}. Check with the angle from ${m('+x')}: ${A0}°, ${m(`${num(F)}\\cos${A0}^\\circ = ${sf(fx)}`)} ✓.`]
      };
    } },
    { name: 'Resolve with the angle to the vertical', level: 1, fn() {
      const F = int(10, 100), th = 5 * int(1, 17), ud = pick(['up', 'down']), lr = pick(['left', 'right']);
      const fx = (lr === 'right' ? 1 : -1) * F * sin(th), fy = (ud === 'up' ? 1 : -1) * F * cos(th);
      return {
        q: `A force of ${F} N acts at ${th}° to the vertical, pointing ${ud} and to the ${lr}. Find its ${m('x')}- (right) and ${m('y')}- (up) components.`,
        svg: U.vectors([{ v: [fx, fy], cls: 'v1', label: `${F} N` }], { size: 220 }),
        fields: [N(m('F_x'), fx, 'N'), N(m('F_y'), fy, 'N')],
        steps: ['The angle is next to the <strong>vertical</strong>, so the vertical component uses cos and the horizontal uses sin.',
          `${m(`|F_y| = ${F}\\cos${th}^\\circ = ${sf(Math.abs(fy))}`)} N, ${m(`|F_x| = ${F}\\sin${th}^\\circ = ${sf(Math.abs(fx))}`)} N.`,
          `Signs: ${lr} → ${lr === 'right' ? '+' : '−'}, ${ud} → ${ud === 'up' ? '+' : '−'}. So ${m(`F_x = ${sf(fx)}`)} N, ${m(`F_y = ${sf(fy)}`)} N.`]
      };
    } },
    { name: 'Weight on an inclined plane', level: 1, fn() {
      const mm = pick([step(0.5, 30, 0.5), int(1, 25)]), th = int(10, 60);
      const W = mm * g;
      return {
        q: `A block of mass ${num(mm)} kg rests on a slope inclined at ${th}° to the horizontal. Find the components of its weight (a) parallel to the slope, (b) perpendicular to the slope. (${m('g = 9.81\\ \\text{m s}^{-2}')})`,
        svg: U.slope(th),
        fields: [N('(a) Parallel', W * sin(th), 'N'), N('(b) Perpendicular', W * cos(th), 'N')],
        steps: [`${m(`mg = ${num(mm)} \\times 9.81 = ${sf(W, 4)}`)} N.`,
          `Down the slope: ${m(`mg\\sin\\theta = ${sf(W, 4)}\\sin${th}^\\circ = ${sf(W * sin(th))}`)} N.`,
          `Into the slope: ${m(`mg\\cos\\theta = ${sf(W, 4)}\\cos${th}^\\circ = ${sf(W * cos(th))}`)} N.`,
          'Check: if θ were 0 the parallel component would be 0 — so it must be the sin one.']
      };
    } },
    { name: 'Bearing → east/north components', level: 1, fn() {
      const d = pick([int(3, 150), step(1.5, 40, 0.5)]), b = 5 * int(0, 71);
      const e = d * sin(b), n = d * cos(b);
      return {
        q: `Write a displacement of ${num(d)} km on a bearing of ${m(brg(b))} in the form ${m('e\\hat{\\imath} + n\\hat{\\jmath}')}, where ${m('\\hat{\\imath}')} is 1 km east and ${m('\\hat{\\jmath}')} is 1 km north.`,
        svg: U.vectors([{ v: [e, n], cls: 'v1', label: `${num(d)} km` }], { north: true, size: 220 }),
        fields: [N(m('e') + ' (east)', e, 'km'), N(m('n') + ' (north)', n, 'km')],
        steps: [`For a bearing ${m('\\beta')}: east ${m('= d\\sin\\beta')}, north ${m('= d\\cos\\beta')} (note the swap compared with angles from ${m('+x')}).`,
          `${m(`e = ${num(d)}\\sin${b}^\\circ = ${sf(e)}`)}, ${m(`n = ${num(d)}\\cos${b}^\\circ = ${sf(n)}`)}.`,
          `${m(`\\vec{d} = ${ijk([e, n], sf)}\\ \\text{km}`)}.`]
      };
    } },
    { name: 'Angle from one component', level: 2, fn() {
      const F = int(20, 120), H = int(5, F - 3);
      const th = acos(H / F), V = Math.sqrt(F * F - H * H);
      return {
        q: `A ${F} N force has a horizontal component of ${H} N. Find (a) the angle the force makes with the horizontal, (b) its vertical component.`,
        fields: [A('(a) Angle', th), N('(b) Vertical component', V, 'N')],
        steps: [`${m(`F\\cos\\theta = ${H}`)} → ${m(`\\cos\\theta = ${H}/${F}`)} → ${m(`\\theta = ${ang(th)}^\\circ`)}.`,
          `${m(`F_y = \\sqrt{${F}^2 - ${H}^2} = ${sf(V)}`)} N (or ${m(`${F}\\sin${ang(th)}^\\circ`)}).`]
      };
    } },
    { name: 'Sliding down a slope with friction', level: 2, fn() {
      const W = 10 * int(10, 80), th = int(20, 50);
      const along = W * sin(th);
      const f = 5 * int(1, Math.floor(along * 0.8 / 5));
      const R = along - f, mm = W / g;
      return {
        q: `A child of weight ${W} N sits on a slide inclined at ${th}°. The friction force on the child is ${f} N up the slide. Find the resultant force along the slide and the child's acceleration.`,
        fields: [N('Resultant force (down slide)', R, 'N'), N('Acceleration', R / mm, 'm s⁻²')],
        steps: [`Weight component down the slide: ${m(`${W}\\sin${th}^\\circ = ${sf(along)}`)} N.`,
          `Resultant: ${m(`${sf(along)} - ${f} = ${sf(R)}`)} N down the slide.`,
          `Mass ${m(`= ${W}/9.81 = ${sf(mm)}`)} kg, so ${m(`a = F/m = ${sf(R / mm)}\\ \\text{m s}^{-2}`)}.`]
      };
    } }
  ];

  // ======================================================================
  function randXY() {
    const triples = [[3, 4], [5, 12], [8, 15], [7, 24], [20, 21], [9, 40], [6, 8], [12, 16], [24, 7]];
    if (Math.random() < 0.5) { const [a, b] = pick(triples); const s = Math.random() < 0.5; return [(s ? a : b) * pick([1, -1]), (s ? b : a) * pick([1, -1])]; }
    return [nz(-30, 30), nz(-30, 30)];
  }
  function legsProblem(nLegs) {
    const legs = [];
    for (let i = 0; i < nLegs; i++) legs.push([pick([int(2, 20), int(20, 400), step(1.5, 15, 0.5)]), 10 * int(0, 35)]);
    let E = 0, Nn = 0; legs.forEach(([d, b]) => { E += d * sin(b); Nn += d * cos(b); });
    const R = Math.hypot(E, Nn);
    const [bb, bstep] = bearingSteps(E, Nn);
    let from = [0, 0]; const items = legs.map(([d, b], i) => { const v = [d * sin(b), d * cos(b)]; const it = { from, v, cls: ['v1', 'v2', 'v4'][i] }; from = add(from, v); return it; });
    items.push({ v: [E, Nn], cls: 'v3', label: 'R', dash: true });
    return {
      q: `A boat sails ${legs.map(([d, b]) => `${num(d)} km on a bearing of ${m(brg(b))}`).join(', then ')}. Find its final distance and bearing from the starting point.`,
      svg: U.vectors(items, { north: true, size: 240 }),
      fields: [N('Distance', R, 'km'), A('Bearing', bb)],
      steps: [`Resolve each leg: east ${m('= d\\sin\\beta')}, north ${m('= d\\cos\\beta')}.`,
        `${m(`E = ${legs.map(([d, b]) => `${num(d)}\\sin${b}^\\circ`).join(' + ')} = ${sf(E)}`)} km`,
        `${m(`N = ${legs.map(([d, b]) => `${num(d)}\\cos${b}^\\circ`).join(' + ')} = ${sf(Nn)}`)} km`,
        `${m(`R = \\sqrt{E^2 + N^2} = ${sf(R)}`)} km.`, bstep]
    };
  }
  const V4 = [
    { name: 'Magnitude and angle from components', level: 1, fn() {
      const [x, y] = randXY();
      const R = Math.hypot(x, y), [th, st] = angleFromAcute(x, y);
      return {
        q: `Find the magnitude of the vector ${m(`(${x},\\ ${y})`)} and the angle it makes with the ${m('+x')} axis (anticlockwise, 0° to 360°).`,
        svg: U.vectors([{ v: [x, y], cls: 'v1', label: 'a' }], { size: 220 }),
        fields: [N('Magnitude', R), A('Angle from +x', th)],
        steps: [`${m(`|\\vec{a}| = \\sqrt{${br(x)}^2 + ${br(y)}^2} = ${sf(R)}`)}.`,
          `Acute angle: ${m(`\\alpha = \\tan^{-1}(${Math.abs(y)}/${Math.abs(x)}) = ${ang(atan(Math.abs(y / x)))}^\\circ`)}.`,
          `Sketch: the vector is in the ${quadName(x, y)}. ${st}.`]
      };
    } },
    { name: 'Speed and direction of a projectile', level: 1, fn() {
      const vx = int(3, 25), vy = int(1, 25), up = pick([true, false]);
      const s = Math.hypot(vx, vy), a = atan(vy / vx);
      return {
        q: `A projectile's velocity has a horizontal component of ${vx} m s⁻¹ and a vertical component of ${vy} m s⁻¹ ${up ? 'upwards' : 'downwards'}. Find its speed and the angle its motion makes with the horizontal.`,
        fields: [N('Speed', s, 'm s⁻¹'), A(`Angle ${up ? 'above' : 'below'} horizontal`, a)],
        steps: [`${m(`v = \\sqrt{${vx}^2 + ${vy}^2} = ${sf(s)}\\ \\text{m s}^{-1}`)}.`, `${m(`\\theta = \\tan^{-1}(${vy}/${vx}) = ${ang(a)}^\\circ`)} ${up ? 'above' : 'below'} the horizontal.`]
      };
    } },
    { name: 'Two-leg journey (bearings)', level: 2, fn: () => legsProblem(2) },
    { name: 'Three-leg journey (bearings)', level: 2, fn: () => legsProblem(3) },
    { name: 'Back bearings', level: 2, fn() {
      const d = int(10, 120), b = 5 * int(1, 71);
      const e = d * sin(b), n = d * cos(b), back = (b + 180) % 360;
      return {
        q: `Town ${m('B')} is ${d} km from town ${m('A')} on a bearing of ${m(brg(b))}. Find how far east and how far north ${m('B')} is from ${m('A')} (negative for west/south), and the bearing of ${m('A')} from ${m('B')}.`,
        fields: [N('East (+) / west (−)', e, 'km'), N('North (+) / south (−)', n, 'km'), A(`Bearing of A from B`, back)],
        steps: [`${m(`E = ${d}\\sin${b}^\\circ = ${sf(e)}`)} km, ${m(`N = ${d}\\cos${b}^\\circ = ${sf(n)}`)} km.`,
          `The back bearing differs by 180°: ${m(`${b}^\\circ ${b < 180 ? '+' : '-'} 180^\\circ = ${brg(back)}`)}.`]
      };
    } }
  ];

  // ======================================================================
  function forcesProblem(n, equilibrant) {
    const fs = [];
    for (let i = 0; i < n; i++) fs.push([int(3, 60), 5 * int(0, 71)]);
    let Rx = 0, Ry = 0; fs.forEach(([F, t]) => { Rx += F * cos(t); Ry += F * sin(t); });
    if (Math.hypot(Rx, Ry) < 1) return forcesProblem(n, equilibrant);
    const R = Math.hypot(Rx, Ry), [th, st] = angleFromAcute(Rx, Ry);
    const rows = fs.map(([F, t]) => `<tr><td>${F} N at ${t}°</td><td>${m(`${F}\\cos${t}^\\circ = ${sf(F * cos(t))}`)}</td><td>${m(`${F}\\sin${t}^\\circ = ${sf(F * sin(t))}`)}</td></tr>`).join('');
    const table = `<div class="table-wrap"><table><tr><th>Force</th><th>x</th><th>y</th></tr>${rows}<tr><th>Sum</th><th>${m(`R_x = ${sf(Rx)}`)}</th><th>${m(`R_y = ${sf(Ry)}`)}</th></tr></table></div>`;
    const steps = [`Resolve every force (angle from ${m('+x')} gives the signs automatically):${table}`,
      `${m(`R = \\sqrt{R_x^2 + R_y^2} = ${sf(R)}`)} N.`, `Quadrant: ${quadName(Rx, Ry)}. ${st}.`];
    let items = []; let from = [0, 0];
    fs.forEach(([F, t], i) => { const v = [F * cos(t), F * sin(t)]; items.push({ from, v, cls: ['v1', 'v2', 'v4', 'vk'][i] }); from = add(from, v); });
    items.push({ v: [Rx, Ry], cls: 'v3', label: 'R', dash: true });
    if (equilibrant) {
      const e = (th + 180) % 360;
      steps.push(`The equilibrant is equal and opposite to the resultant: ${sf(R)} N at ${m(`${ang(th)}^\\circ ${th < 180 ? '+' : '-'} 180^\\circ = ${ang(e)}^\\circ`)}.`);
      return { q: `Find the single extra force (the equilibrant) that keeps a particle in equilibrium under these forces (angles anticlockwise from ${m('+x')}): ${fs.map(([F, t]) => `${F} N at ${t}°`).join(', ')}.`,
        svg: U.vectors(items, { size: 240 }), fields: [N('Magnitude', R, 'N'), A('Angle from +x', e)], steps };
    }
    return { q: `Find the magnitude and direction of the resultant of these coplanar forces (angles anticlockwise from ${m('+x')}): ${fs.map(([F, t]) => `${F} N at ${t}°`).join(', ')}.`,
      svg: U.vectors(items, { size: 240 }), fields: [N('Magnitude', R, 'N'), A('Angle from +x', th)], steps };
  }
  const V5 = [
    { name: 'Resultant of two forces', level: 1, fn: () => forcesProblem(2) },
    { name: 'Add / subtract in component form', level: 1, fn() {
      const a = [nz(-9, 9), nz(-9, 9)], b = [nz(-9, 9), nz(-9, 9)], op = pick(['+', '-', 'b-a']);
      const r = op === '+' ? add(a, b) : op === '-' ? sub(a, b) : sub(b, a);
      const expr = op === '+' ? '\\vec{a} + \\vec{b}' : op === '-' ? '\\vec{a} - \\vec{b}' : '\\vec{b} - \\vec{a}';
      return {
        q: `${m(`\\vec{a} = (${a[0]},\\ ${a[1]})`)} and ${m(`\\vec{b} = (${b[0]},\\ ${b[1]})`)}. Find ${m(expr)} and its magnitude.`,
        fields: [N(m('x') + '-component', r[0]), N(m('y') + '-component', r[1]), N('Magnitude', mag(r))],
        steps: [`Work component by component: ${m(`${expr} = (${r[0]},\\ ${r[1]})`)}.`, `${m(`|${expr}| = \\sqrt{${br(r[0])}^2 + ${br(r[1])}^2} = ${sf(mag(r))}`)}.`]
      };
    } },
    { name: 'Resultant of three or four forces', level: 2, fn: () => forcesProblem(pick([3, 4])) },
    { name: 'Find the equilibrant', level: 2, fn: () => forcesProblem(pick([2, 3]), true) },
    { name: 'Find a force for a vertical resultant', level: 2, fn() {
      const F1 = int(20, 100), t = 5 * int(19, 34);
      const P = -F1 / cos(t), R = P * sin(t);
      return {
        q: `Two forces act on a hook: ${F1} N at 0° and a force ${m('P')} at ${t}° (anticlockwise from ${m('+x')}). Find ${m('P')} so that the resultant is vertical, and the size of the resultant.`,
        fields: [N(m('P'), P, 'N'), N('Resultant', R, 'N')],
        steps: [`Vertical resultant means ${m('R_x = 0')}: ${m(`${F1} + P\\cos${t}^\\circ = 0`)} → ${m(`P = ${sf(P)}`)} N.`,
          `${m(`R = R_y = P\\sin${t}^\\circ = ${sf(R)}`)} N.`]
      };
    } }
  ];

  // ======================================================================
  const V6 = [
    { name: 'Resultant of two forces at an angle', level: 1, fn() {
      const P = int(3, 50), Q = int(3, 50), th = 5 * int(3, 34);
      const R = Math.sqrt(P * P + Q * Q + 2 * P * Q * cos(th));
      const phi = ang360(P + Q * cos(th), Q * sin(th));
      return {
        q: `Two forces of ${P} N and ${Q} N act at a point with an angle of ${th}° between them. Find the magnitude of the resultant and the angle it makes with the ${P} N force.`,
        svg: U.vectors([{ v: [P, 0], cls: 'v1', label: `${P} N` }, { v: [Q * cos(th), Q * sin(th)], cls: 'v2', label: `${Q} N`, labelSide: 'left' }, { v: [P + Q * cos(th), Q * sin(th)], cls: 'v3', label: 'R', dash: true }], { axes: false, size: 240 }),
        fields: [N('Resultant', R, 'N'), A('Angle with the ' + P + ' N force', phi)],
        steps: [`${m(`R^2 = P^2 + Q^2 + 2PQ\\cos\\theta = ${P}^2 + ${Q}^2 + 2(${P})(${Q})\\cos${th}^\\circ = ${sf(R * R, 4)}`)}`,
          `${m(`R = ${sf(R)}`)} N.`,
          `${m(`\\tan\\phi = \\dfrac{Q\\sin\\theta}{P + Q\\cos\\theta} = \\dfrac{${sf(Q * sin(th))}}{${sf(P + Q * cos(th))}}`)} → ${m(`\\phi = ${ang(phi)}^\\circ`)}${P + Q * cos(th) < 0 ? ' (the denominator is negative, so φ is obtuse: 180° minus the calculator value)' : ''}.`]
      };
    } },
    { name: 'Equal forces: R = 2F cos(θ/2)', level: 2, fn() {
      const F = int(5, 60), th = 10 * int(2, 16);
      const R = 2 * F * cos(th / 2);
      return {
        q: `Two forces, each of magnitude ${F} N, act at a point with ${th}° between them. Find the magnitude of the resultant.`,
        fields: [N('Resultant', R, 'N')],
        steps: [`For equal forces the resultant bisects the angle: ${m(`R = 2F\\cos(\\theta/2) = 2(${F})\\cos${th / 2}^\\circ = ${sf(R)}`)} N.`]
      };
    } },
    { name: 'Angle between two forces from the resultant', level: 2, fn() {
      const P = int(3, 20), Q = int(3, 20), th0 = 5 * int(3, 33);
      const R = +sf(Math.sqrt(P * P + Q * Q + 2 * P * Q * cos(th0)));
      const th = acos((R * R - P * P - Q * Q) / (2 * P * Q));
      return {
        q: `Two forces of ${P} N and ${Q} N have a resultant of ${R} N. Find the angle between the two forces.`,
        fields: [A('Angle between forces', th)],
        steps: [`${m(`R^2 = P^2 + Q^2 + 2PQ\\cos\\theta`)} → ${m(`\\cos\\theta = \\dfrac{R^2 - P^2 - Q^2}{2PQ} = \\dfrac{${sf(R * R, 4)} - ${P * P} - ${Q * Q}}{${2 * P * Q}} = ${sf((R * R - P * P - Q * Q) / (2 * P * Q))}`)}`,
          `${m(`\\theta = ${ang(th)}^\\circ`)}.`]
      };
    } },
    { name: 'Resolve along two non-perpendicular directions', level: 2, fn() {
      const R = int(20, 100), a = 5 * int(2, 12), b = 5 * int(2, 12);
      const F1 = R * sin(b) / sin(a + b), F2 = R * sin(a) / sin(a + b);
      return {
        q: `A force of ${R} N is to be replaced by two components, one at ${a}° to it on one side (${m('F_1')}) and the other at ${b}° to it on the other side (${m('F_2')}). Find the two components.`,
        fields: [N(m('F_1') + ` (at ${a}°)`, F1, 'N'), N(m('F_2') + ` (at ${b}°)`, F2, 'N')],
        steps: [`The force is the diagonal of a parallelogram with sides along the two directions. One triangle has angles ${a}°, ${b}° and ${m(`180^\\circ - ${a}^\\circ - ${b}^\\circ = ${180 - a - b}^\\circ`)}.`,
          `Sine rule: ${m(`\\dfrac{F_1}{\\sin${b}^\\circ} = \\dfrac{F_2}{\\sin${a}^\\circ} = \\dfrac{${R}}{\\sin${180 - a - b}^\\circ}`)}.`,
          `${m(`F_1 = ${sf(F1)}`)} N, ${m(`F_2 = ${sf(F2)}`)} N. (The component at the <em>smaller</em> angle is the larger one.)`]
      };
    } }
  ];

  // ======================================================================
  const rv3 = (lo = -9, hi = 9) => { let v; do { v = [int(lo, hi), int(lo, hi), int(lo, hi)]; } while (v.filter(x => x !== 0).length < 2); return v; };
  const V7 = [
    { name: 'Magnitude and unit vector (3-D)', level: 1, fn() {
      const v = rv3(), M = mag(v), u = scale(1 / M, v);
      return {
        q: `For ${m(`\\vec{a} = ${ijk(v)}`)}, find ${m('|\\vec{a}|')} and the unit vector ${m('\\hat{a}')}.`,
        fields: [N(m('|\\vec{a}|'), M), N(m('\\hat{a}') + ' — ' + m('\\hat{\\imath}') + ' part', u[0]), N(m('\\hat{\\jmath}') + ' part', u[1]), N(m('\\hat{k}') + ' part', u[2])],
        steps: [`${m(`|\\vec{a}| = \\sqrt{${v.map(x => br(x) + '^2').join(' + ')}} = \\sqrt{${dot(v, v)}} = ${sf(M)}`)}.`,
          `${m(`\\hat{a} = \\dfrac{\\vec{a}}{|\\vec{a}|} = ${ijk(u, sf)}`)}. You may type fractions, e.g. ${m(`${v[0]}/${Number.isInteger(M) ? M : `\\sqrt{${dot(v, v)}}`}`)} → <code>${v[0]}/${Number.isInteger(M) ? M : `sqrt(${dot(v, v)})`}</code>.`]
      };
    } },
    { name: 'Angles with the axes (direction cosines)', level: 1, fn() {
      const v = rv3(), M = mag(v), [a, b, c] = v.map(x => acos(x / M));
      return {
        q: `Find the angles ${m('\\alpha, \\beta, \\gamma')} that ${m(`\\vec{a} = ${ijk(v)}`)} makes with the ${m('x')}-, ${m('y')}- and ${m('z')}-axes.`,
        fields: [A(m('\\alpha'), a), A(m('\\beta'), b), A(m('\\gamma'), c)],
        steps: [`${m(`|\\vec{a}| = \\sqrt{${dot(v, v)}} = ${sf(M)}`)}.`,
          `${m(`\\cos\\alpha = ${v[0]}/${sf(M)}`)} → ${m(`\\alpha = ${ang(a)}^\\circ`)}; ${m(`\\cos\\beta = ${v[1]}/${sf(M)}`)} → ${m(`\\beta = ${ang(b)}^\\circ`)}; ${m(`\\cos\\gamma = ${v[2]}/${sf(M)}`)} → ${m(`\\gamma = ${ang(c)}^\\circ`)}.`,
          `Check: ${m('\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1')}.`]
      };
    } },
    { name: 'Vector of given magnitude in a direction', level: 1, fn() {
      const nice = [[2, 1, 2], [1, 2, 2], [2, 3, 6], [1, 4, 8], [4, 4, 7], [2, 6, 9], [6, 2, 3], [3, 4, 12], [2, 10, 11], [12, 4, 3]];
      const base = pick(nice).map(x => x * pick([1, -1]));
      const d = shuffle([0, 1, 2]); const v = d.map(i => base[i]);
      const M = mag(v), K = int(2, 5) * Math.round(M), r = scale(K / M, v);
      return {
        q: `Find the vector of magnitude ${K} in the direction of ${m(ijk(v))}.`,
        fields: [N(m('\\hat{\\imath}') + ' component', r[0]), N(m('\\hat{\\jmath}') + ' component', r[1]), N(m('\\hat{k}') + ' component', r[2])],
        steps: [`${m(`|\\vec{v}| = \\sqrt{${dot(v, v)}} = ${num(M)}`)}.`, `Required vector ${m(`= ${K}\\hat{v} = \\dfrac{${K}}{${num(M)}}(${ijk(v)}) = ${ijk(r)}`)}.`]
      };
    } },
    { name: 'Linear combinations', level: 1, fn() {
      const a = rv3(-5, 5), b = rv3(-5, 5), p = nz(-3, 3), q = nz(-3, 3);
      const r = add(scale(p, a), scale(q, b));
      const coef = (c, s, first) => (c === 1 ? (first ? '' : '+') : c === -1 ? '-' : (c > 0 && !first ? '+' : '') + c) + s;
      const expr = coef(p, '\\vec{a}', true) + ' ' + coef(q, '\\vec{b}', false);
      return {
        q: `Given ${m(`\\vec{a} = ${ijk(a)}`)} and ${m(`\\vec{b} = ${ijk(b)}`)}, find ${m(expr)} and its magnitude.`,
        fields: [N(m('\\hat{\\imath}'), r[0]), N(m('\\hat{\\jmath}'), r[1]), N(m('\\hat{k}'), r[2]), N('Magnitude', mag(r))],
        steps: [`Component by component: ${m(`${expr} = ${ijk(r)}`)}.`, `Magnitude ${m(`= \\sqrt{${r.map(x => br(x) + '^2').join(' + ')}} = ${sf(mag(r))}`)}. Remember Pythagoras — never just add the components!`]
      };
    } },
    { name: 'Parallel vectors: find k', level: 2, fn() {
      const b = rv3(-8, 8).map(x => x || 2), lam = pick([-2, -0.5, 0.5, 2, 3, -3, 1.5]);
      const a = scale(lam, b), i = int(0, 2), k = a[i];
      const aTex = ['\\hat{\\imath}', '\\hat{\\jmath}', '\\hat{k}'].map((u, j) => (j === i ? `k${u}` : `${num(a[j])}${u}`)).join(' + ').replace(/\+ -/g, '- ');
      return {
        q: `Find the value of ${m('k')} for which ${m(`\\vec{a} = ${aTex}`)} is parallel to ${m(`\\vec{b} = ${ijk(b)}`)}.`,
        fields: [N(m('k'), k)],
        steps: [`Parallel means ${m('\\vec{a} = \\lambda\\vec{b}')}. Use a known component: ${m(`\\lambda = ${num(a[(i + 1) % 3])}/${br(b[(i + 1) % 3])} = ${num(lam)}`)}.`,
          `Then ${m(`k = \\lambda \\times ${br(b[i])} = ${num(k)}`)}.`]
      };
    } }
  ];

  // ======================================================================
  const V8 = [
    { name: 'Vector AB and distance', level: 1, fn() {
      const A_ = rv3(-6, 8), B_ = rv3(-6, 8), ab = sub(B_, A_);
      return {
        q: `${m(`A${tup(A_)}`)} and ${m(`B${tup(B_)}`)}. Find ${m('\\overrightarrow{AB}')} and the distance ${m('AB')}.`,
        fields: [N(m('x'), ab[0]), N(m('y'), ab[1]), N(m('z'), ab[2]), N('Distance ' + m('AB'), mag(ab))],
        steps: [`"End minus start": ${m(`\\overrightarrow{AB} = \\vec{b} - \\vec{a} = ${tup(ab)}`)}.`, `${m(`AB = \\sqrt{${ab.map(x => br(x) + '^2').join(' + ')}} = ${sf(mag(ab))}`)}.`]
      };
    } },
    { name: 'Midpoint', level: 1, fn() {
      const A_ = rv3(-9, 9), B_ = rv3(-9, 9), M_ = scale(0.5, add(A_, B_));
      return {
        q: `Find the coordinates of the midpoint of ${m(`A${tup(A_)}`)} and ${m(`B${tup(B_)}`)}.`,
        fields: [N(m('x'), M_[0]), N(m('y'), M_[1]), N(m('z'), M_[2])],
        steps: [`${m(`\\vec{m} = \\tfrac12(\\vec{a} + \\vec{b}) = \\tfrac12${tup(add(A_, B_))} = ${tup(M_)}`)}.`]
      };
    } },
    { name: 'Section (ratio) formula', level: 2, fn() {
      const mm = int(1, 4); let n; do { n = int(1, 4); } while (n === mm);
      const A_ = rv3(-6, 6), d = rv3(-3, 3).map(x => x * (mm + n)), B_ = add(A_, d);
      const P = scale(1 / (mm + n), add(scale(n, A_), scale(mm, B_)));
      return {
        q: `${m(`A${tup(A_)}`)} and ${m(`B${tup(B_)}`)}. Find the point ${m('P')} on ${m('AB')} such that ${m(`AP : PB = ${mm} : ${n}`)}.`,
        fields: [N(m('x'), P[0]), N(m('y'), P[1]), N(m('z'), P[2])],
        steps: [`${m(`\\vec{p} = \\dfrac{n\\vec{a} + m\\vec{b}}{m + n} = \\dfrac{${n}${tup(A_)} + ${mm}${tup(B_)}}{${mm + n}}`)}`,
          `${m(`= \\dfrac{${tup(add(scale(n, A_), scale(mm, B_)))}}{${mm + n}} = ${tup(P)}`)}.`,
          `Check: ${m('P')} should be ${mm}/${mm + n} of the way from ${m('A')} to ${m('B')}.`]
      };
    } },
    { name: 'Fourth vertex of a parallelogram', level: 1, fn() {
      const A_ = [int(-5, 5), int(-5, 5)], B_ = add(A_, [int(2, 6), int(-2, 3)]), C_ = add(B_, [int(-1, 4), int(2, 6)]);
      const D_ = sub(add(A_, C_), B_);
      return {
        q: `${m('ABCD')} is a parallelogram (vertices in order) with ${m(`A${tup(A_)}`)}, ${m(`B${tup(B_)}`)} and ${m(`C${tup(C_)}`)}. Find ${m('D')}.`,
        fields: [N(m('x'), D_[0]), N(m('y'), D_[1])],
        steps: [`Opposite sides are equal vectors: ${m('\\overrightarrow{AD} = \\overrightarrow{BC}')}, so ${m('\\vec{d} = \\vec{a} + \\vec{c} - \\vec{b}')}.`, `${m(`\\vec{d} = ${tup(D_)}`)}.`]
      };
    } },
    { name: 'Collinear points: find k', level: 2, fn() {
      const B_ = [int(-4, 4), int(-4, 8)], d = [int(1, 3), nz(-4, 4)], s = int(1, 3), t = int(1, 3);
      const A_ = sub(B_, scale(s, d)), C_ = add(B_, scale(t, d));
      return {
        q: `Find ${m('k')} such that ${m(`A(${A_[0]},\\ k)`)}, ${m(`B${tup(B_)}`)} and ${m(`C${tup(C_)}`)} are collinear.`,
        fields: [N(m('k'), A_[1])],
        steps: [`${m(`\\overrightarrow{BC} = ${tup(sub(C_, B_))}`)}. For collinearity ${m('\\overrightarrow{BA} = \\lambda\\overrightarrow{BC}')}.`,
          `${m('x')}: ${m(`${A_[0] - B_[0]} = \\lambda(${C_[0] - B_[0]})`)} → ${m(`\\lambda = ${num((A_[0] - B_[0]) / (C_[0] - B_[0]))}`)}.`,
          `${m('y')}: ${m(`k - ${br(B_[1])} = ${num((A_[0] - B_[0]) / (C_[0] - B_[0]))}(${C_[1] - B_[1]})`)} → ${m(`k = ${A_[1]}`)}.`]
      };
    } }
  ];

  // ======================================================================
  const V9 = [
    { name: 'Dot product and angle', level: 1, fn() {
      const three = Math.random() < 0.6;
      const a = three ? rv3(-6, 7) : [nz(-9, 9), nz(-9, 9), 0], b = three ? rv3(-6, 7) : [nz(-9, 9), nz(-9, 9), 0];
      const d = dot(a, b), th = acos(d / (mag(a) * mag(b)));
      return {
        q: `For ${m(`\\vec{a} = ${ijk(a)}`)} and ${m(`\\vec{b} = ${ijk(b)}`)}, find ${m('\\vec{a}\\cdot\\vec{b}')} and the angle between the vectors.`,
        fields: [N(m('\\vec{a}\\cdot\\vec{b}'), d), A('Angle', th)],
        steps: [`${m(`\\vec{a}\\cdot\\vec{b} = ${a.map((x, i) => `${br(x)}(${b[i]})`).join(' + ')} = ${d}`)}.`,
          `${m(`|\\vec{a}| = \\sqrt{${dot(a, a)}}`)}, ${m(`|\\vec{b}| = \\sqrt{${dot(b, b)}}`)}.`,
          `${m(`\\cos\\theta = \\dfrac{${d}}{\\sqrt{${dot(a, a)}}\\sqrt{${dot(b, b)}}} = ${sf(d / (mag(a) * mag(b)))}`)} → ${m(`\\theta = ${ang(th)}^\\circ`)}.`,
          d === 0 ? 'The dot product is zero, so the vectors are perpendicular.' : '']
      };
    } },
    { name: 'Work done W = F·s', level: 1, fn() {
      const three = Math.random() < 0.5;
      const F = three ? rv3(-20, 20) : [int(-50, 50), int(-50, 50), 0], s = three ? rv3(-10, 10) : [int(-12, 12), int(-12, 12), 0];
      if (!mag(F) || !mag(s)) return this.fn();
      const W = dot(F, s);
      return {
        q: `Find the work done by the constant force ${m(`\\vec{F} = (${ijk(F)})\\ \\text{N}`)} during the displacement ${m(`\\vec{s} = (${ijk(s)})\\ \\text{m}`)}.`,
        fields: [N(m('W'), W, 'J')],
        steps: [`${m(`W = \\vec{F}\\cdot\\vec{s} = ${F.map((x, i) => `${br(x)}(${s[i]})`).join(' + ')} = ${W}\\ \\text{J}`)}.`, 'Work is a scalar — no ' + m('\\hat{\\imath},\\hat{\\jmath},\\hat{k}') + ' in the answer.']
      };
    } },
    { name: 'Perpendicular vectors: find k', level: 1, fn() {
      const i = int(0, 2), a = rv3(-6, 6), b = rv3(-6, 6);
      if (b[i] === 0) b[i] = nz(-5, 5);
      const rest = a.reduce((s, x, j) => (j === i ? s : s + x * b[j]), 0), k = -rest / b[i];
      const aTex = tup(a.map((x, j) => (j === i ? 'k' : x)), x => (x === 'k' ? 'k' : num(x)));
      return {
        q: `Find ${m('k')} so that ${m(aTex)} and ${m(tup(b))} are perpendicular.`,
        fields: [N(m('k'), k)],
        steps: [`Perpendicular ⟺ dot product = 0: ${m(a.map((x, j) => (j === i ? `${br(b[j])}k` : `${br(x)}(${b[j]})`)).join(' + ') + ' = 0')}.`,
          `${m(`${b[i]}k + ${br(rest)} = 0`)} → ${m(`k = ${num(k)}`)}${Number.isInteger(k) ? '' : ` (you can type <code>${-rest}/${b[i]}</code>)`}.`]
      };
    } },
    { name: 'Projection of a onto b', level: 2, fn() {
      const a = rv3(-6, 8), b = pick([[1, 2, 2], [2, 1, -2], [3, 4, 0], [0, 3, 4], [2, -3, 6], [1, -1, 1], [1, 1, 0]]);
      const p = dot(a, b) / mag(b), vp = scale(dot(a, b) / dot(b, b), b);
      return {
        q: `Find (i) the scalar component (projection) of ${m(`\\vec{a} = ${ijk(a)}`)} in the direction of ${m(`\\vec{b} = ${ijk(b)}`)}, and (ii) the vector projection of ${m('\\vec{a}')} onto ${m('\\vec{b}')}.`,
        fields: [N('(i) Scalar projection', p), N('(ii) ' + m('\\hat{\\imath}'), vp[0]), N(m('\\hat{\\jmath}'), vp[1]), N(m('\\hat{k}'), vp[2])],
        steps: [`${m(`\\vec{a}\\cdot\\vec{b} = ${dot(a, b)}`)}, ${m(`|\\vec{b}| = ${sf(mag(b))}`)}.`,
          `(i) ${m(`\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|} = ${sf(p)}`)}.`,
          `(ii) ${m(`\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|^2}\\vec{b} = \\dfrac{${dot(a, b)}}{${dot(b, b)}}(${ijk(b)}) = ${ijk(vp, sf)}`)}.`]
      };
    } },
    { name: 'Power P = F·v', level: 2, fn() {
      const F = [100 * int(5, 30), 50 * nz(-10, 10), 0], v = [int(5, 30), nz(-5, 5), 0];
      const P = dot(F, v);
      return {
        q: `A car engine delivers ${m(`\\vec{F} = (${ijk(F)})\\ \\text{N}`)} while the car moves with ${m(`\\vec{v} = (${ijk(v)})\\ \\text{m s}^{-1}`)}. Find the power delivered.`,
        fields: [N('Power', P, 'W')],
        steps: [`${m(`P = \\vec{F}\\cdot\\vec{v} = ${F[0]}(${v[0]}) + ${br(F[1])}(${v[1]}) = ${P}\\ \\text{W}`)} (${m(sf(P / 1000) + '\\ \\text{kW}')}).`, 'Only the component of the force along the velocity does work.']
      };
    } }
  ];

  // ======================================================================
  const UNIT = ['\\hat{\\imath}', '\\hat{\\jmath}', '\\hat{k}'];
  const UNIT_OPTS = [`\\(\\hat{\\imath}\\)`, `\\(-\\hat{\\imath}\\)`, `\\(\\hat{\\jmath}\\)`, `\\(-\\hat{\\jmath}\\)`, `\\(\\hat{k}\\)`, `\\(-\\hat{k}\\)`, `\\(\\vec{0}\\)`];
  const unitOpt = v => { const i = v.findIndex(x => x !== 0); if (i < 0) return UNIT_OPTS[6]; return UNIT_OPTS[i * 2 + (v[i] < 0 ? 1 : 0)]; };
  const V10 = [
    { name: 'Cross product in components', level: 1, fn() {
      const a = rv3(-5, 5), b = rv3(-5, 5), c = cross(a, b);
      return {
        q: `Find ${m('\\vec{a}\\times\\vec{b}')} for ${m(`\\vec{a} = ${ijk(a)}`)} and ${m(`\\vec{b} = ${ijk(b)}`)}.`,
        fields: [N(m('\\hat{\\imath}'), c[0]), N(m('\\hat{\\jmath}'), c[1]), N(m('\\hat{k}'), c[2])],
        steps: [`${m(`\\begin{vmatrix}\\hat{\\imath} & \\hat{\\jmath} & \\hat{k}\\\\ ${a.join(' & ')}\\\\ ${b.join(' & ')}\\end{vmatrix}`)}`,
          `${m('\\hat{\\imath}')}: ${m(`(${a[1]})(${b[2]}) - (${a[2]})(${b[1]}) = ${c[0]}`)}`,
          `${m('\\hat{\\jmath}')}: ${m(`-[(${a[0]})(${b[2]}) - (${a[2]})(${b[0]})] = ${c[1]}`)} ← don't forget the minus!`,
          `${m('\\hat{k}')}: ${m(`(${a[0]})(${b[1]}) - (${a[1]})(${b[0]}) = ${c[2]}`)}`,
          `${m(`\\vec{a}\\times\\vec{b} = ${ijk(c)}`)}. Check: ${m(`(\\vec{a}\\times\\vec{b})\\cdot\\vec{a} = ${dot(c, a)}`)} ✓.`]
      };
    } },
    { name: 'Unit vector cross products', level: 1, fn() {
      const i = int(0, 2), j = int(0, 2);
      const e = k => [0, 1, 2].map(x => (x === k ? 1 : 0));
      const c = cross(e(i), e(j));
      return {
        q: `Evaluate ${m(`${UNIT[i]}\\times${UNIT[j]}`)}.`,
        fields: [C('Answer', UNIT_OPTS, unitOpt(c))],
        steps: [i === j ? 'A vector crossed with itself is the zero vector (sin 0° = 0).' : `Cyclic order ${m('\\hat{\\imath}\\to\\hat{\\jmath}\\to\\hat{k}\\to\\hat{\\imath}')} gives +; reversed order gives −. So ${m(`${UNIT[i]}\\times${UNIT[j]} = ${unitOpt(c).slice(2, -2)}`)}.`]
      };
    } },
    { name: 'Area of a triangle', level: 1, fn() {
      const A_ = rv3(-4, 5), B_ = rv3(-4, 5), C_ = rv3(-4, 5);
      const ab = sub(B_, A_), ac = sub(C_, A_), c = cross(ab, ac);
      if (mag(c) === 0) return this.fn();
      return {
        q: `Find the area of triangle ${m('ABC')} with ${m(`A${tup(A_)}`)}, ${m(`B${tup(B_)}`)}, ${m(`C${tup(C_)}`)} (metres).`,
        fields: [N('Area', mag(c) / 2, 'm²')],
        steps: [`${m(`\\overrightarrow{AB} = ${tup(ab)}`)}, ${m(`\\overrightarrow{AC} = ${tup(ac)}`)}.`,
          `${m(`\\overrightarrow{AB}\\times\\overrightarrow{AC} = ${tup(c)}`)}, magnitude ${m(`\\sqrt{${dot(c, c)}} = ${sf(mag(c))}`)}.`,
          `Area ${m(`= \\tfrac12 \\times ${sf(mag(c))} = ${sf(mag(c) / 2)}\\ \\text{m}^2`)}.`]
      };
    } },
    { name: 'Torque τ = r × F', level: 2, fn() {
      const r = rv3(-3, 3).map(x => x / pick([1, 10, 2])), F = rv3(-8, 8), t = cross(r, F);
      if (mag(t) === 0) return this.fn();
      return {
        q: `A force ${m(`\\vec{F} = (${ijk(F)})\\ \\text{N}`)} acts at ${m(`\\vec{r} = (${ijk(r)})\\ \\text{m}`)} relative to a pivot. Find the torque ${m('\\vec{\\tau} = \\vec{r}\\times\\vec{F}')} and its magnitude.`,
        fields: [N(m('\\tau_x'), t[0], 'N m'), N(m('\\tau_y'), t[1], 'N m'), N(m('\\tau_z'), t[2], 'N m'), N(m('|\\vec{\\tau}|'), mag(t), 'N m')],
        steps: [`${m(`\\vec{\\tau} = \\begin{vmatrix}\\hat{\\imath} & \\hat{\\jmath} & \\hat{k}\\\\ ${r.map(x => num(x)).join(' & ')}\\\\ ${F.join(' & ')}\\end{vmatrix} = ${ijk(t)}\\ \\text{N m}`)}`,
          `${m(`|\\vec{\\tau}| = ${sf(mag(t))}\\ \\text{N m}`)}.`]
      };
    } },
    { name: 'Spanner: τ = rF sin θ', level: 2, fn() {
      const r = step(0.1, 0.6, 0.05), F = int(10, 120), th = 5 * int(3, 17);
      return {
        q: `A spanner of length ${num(r)} m is pushed with a force of ${F} N at its end, the force making ${th}° with the spanner. Find the magnitude of the torque, and the maximum possible torque.`,
        fields: [N('Torque', r * F * sin(th), 'N m'), N('Maximum torque', r * F, 'N m')],
        steps: [`${m(`\\tau = rF\\sin\\theta = ${num(r)}(${F})\\sin${th}^\\circ = ${sf(r * F * sin(th))}\\ \\text{N m}`)}.`,
          `Maximum when θ = 90° (force perpendicular to the spanner): ${m(`${num(r)}\\times${F} = ${sf(r * F)}\\ \\text{N m}`)}.`]
      };
    } },
    { name: 'Magnetic force F = qv × B', level: 2, fn() {
      const q = 1.6e-19 * pick([1, -1]), vs = int(1, 9) * 1e5, Bs = step(0.1, 0.9, 0.1);
      let i = int(0, 2), j; do { j = int(0, 2); } while (j === i);
      const v = [0, 1, 2].map(x => (x === i ? vs : 0)), B = [0, 1, 2].map(x => (x === j ? Bs : 0));
      const Fv = scale(q, cross(v, B));
      return {
        q: `A ${q > 0 ? 'proton' : 'electron'} (${m(`q = ${q > 0 ? '' : '-'}1.60\\times10^{-19}\\ \\text{C}`)}) moves with ${m(`\\vec{v} = ${vs / 1e5}\\times10^{5}\\,${UNIT[i]}\\ \\text{m s}^{-1}`)} through ${m(`\\vec{B} = ${num(Bs)}${UNIT[j]}\\ \\text{T}`)}. Find the magnitude and direction of ${m('\\vec{F} = q\\vec{v}\\times\\vec{B}')}.`,
        fields: [N('Magnitude', mag(Fv), 'N', { abs: 1e-30, sci: true }), C('Direction', UNIT_OPTS.slice(0, 6), unitOpt(Fv))],
        steps: [`${m(`${UNIT[i]}\\times${UNIT[j]} = ${unitOpt(cross(v, B)).slice(2, -2)}`)}.`,
          `${m(`|\\vec{F}| = |q|vB = (1.60\\times10^{-19})(${vs / 1e5}\\times10^{5})(${num(Bs)}) = ${U.sci(mag(Fv))}\\ \\text{N}`)}. (To type ${m('4.80\\times10^{-14}')} write <code>4.80e-14</code>.)`,
          q < 0 ? 'The charge is negative, so the force is reversed: ' + m(unitOpt(Fv).slice(2, -2)) + '.' : 'Positive charge: direction ' + m(unitOpt(Fv).slice(2, -2)) + '.']
      };
    } }
  ];

  // ======================================================================
  const V11 = [
    { name: 'Scalar triple product and volume', level: 1, fn() {
      const a = rv3(-4, 4), b = rv3(-4, 4), c = rv3(-4, 4), v = det3(a, b, c);
      const bc = cross(b, c);
      return {
        q: `For ${m(`\\vec{a} = ${ijk(a)}`)}, ${m(`\\vec{b} = ${ijk(b)}`)}, ${m(`\\vec{c} = ${ijk(c)}`)}, evaluate ${m('\\vec{a}\\cdot(\\vec{b}\\times\\vec{c})')}, and find the volume of the tetrahedron with these edges (0 if coplanar).`,
        fields: [N(m('\\vec{a}\\cdot(\\vec{b}\\times\\vec{c})'), v), N('Tetrahedron volume', Math.abs(v) / 6)],
        steps: [`${m(`\\vec{b}\\times\\vec{c} = ${tup(bc)}`)}.`, `${m(`\\vec{a}\\cdot(\\vec{b}\\times\\vec{c}) = ${a.map((x, i) => `${br(x)}(${bc[i]})`).join(' + ')} = ${v}`)}.`,
          v === 0 ? 'Zero → the vectors are coplanar; no volume.' : `Parallelepiped volume ${Math.abs(v)}; tetrahedron ${m(`\\tfrac16 \\times ${Math.abs(v)} = ${sf(Math.abs(v) / 6)}`)}.`]
      };
    } },
    { name: 'Coplanar vectors: find k', level: 2, fn() {
      const a = rv3(-4, 4), b = rv3(-4, 4), i = int(0, 2), c0 = rv3(-4, 4);
      const f = k => det3(a, b, c0.map((x, j) => (j === i ? k : x)));
      const f0 = f(0), f1 = f(1);
      if (f1 === f0) return this.fn();
      const k = -f0 / (f1 - f0);
      return {
        q: `Find ${m('k')} so that ${m(ijk(a))}, ${m(ijk(b))} and ${m(tup(c0.map((x, j) => (j === i ? 'k' : x)), x => (x === 'k' ? 'k' : num(x))))} are coplanar.`,
        fields: [N(m('k'), k)],
        steps: ['Coplanar ⟺ scalar triple product = 0.', `Expanding the determinant gives ${m(`${f1 - f0}k + ${br(f0)} = 0`)}.`, `${m(`k = ${num(k)}`)}${Number.isInteger(k) ? '' : ` (= <code>${-f0}/${f1 - f0}</code>)`}.`]
      };
    } }
  ];

  // ======================================================================
  const V12 = [
    { name: 'Points on a line', level: 1, fn() {
      const a = rv3(-5, 5), d = rv3(-4, 4), l = nz(-3, 3), p = add(a, scale(l, d));
      return {
        q: `The line ${m(`\\vec{r} = ${tup(a)} + \\lambda${tup(d)}`)}. Find the point with ${m(`\\lambda = ${l}`)}.`,
        fields: [N(m('x'), p[0]), N(m('y'), p[1]), N(m('z'), p[2])],
        steps: [`${m(`\\vec{r} = ${tup(a)} + ${br(l)}${tup(d)} = ${tup(p)}`)}.`]
      };
    } },
    { name: 'Does a point lie on the line?', level: 1, fn() {
      const A_ = rv3(-4, 4), d = rv3(-3, 3), B_ = add(A_, d), on = Math.random() < 0.5, t = nz(-2, 3);
      let C_ = add(A_, scale(t, d)); if (!on) C_ = add(C_, [0, 1, 2].map(() => int(-1, 1))); const really = mag(cross(sub(C_, A_), d)) === 0;
      const di = d.findIndex(x => x !== 0), lam = really ? (C_[di] - A_[di]) / d[di] : 0;
      return {
        q: `Does ${m(`C${tup(C_)}`)} lie on the line through ${m(`A${tup(A_)}`)} and ${m(`B${tup(B_)}`)}?`,
        fields: [C('Answer', ['Yes', 'No'], really ? 'Yes' : 'No')],
        steps: [`${m(`\\vec{r} = ${tup(A_)} + \\lambda${tup(d)}`)}.`, `${m(`\\overrightarrow{AC} = ${tup(sub(C_, A_))}`)}. ${really ? `This is ${m(`${num(lam)}\\times${tup(d)}`)}, so yes (λ = ${num(lam)}).` : 'This is not a multiple of the direction vector (the component ratios differ), so no.'}`]
      };
    } },
    { name: 'Distance from a point to a plane', level: 2, fn() {
      const n = rv3(-6, 6), d = int(-12, 12), P = rv3(-5, 5);
      const dist = Math.abs(dot(P, n) - d) / mag(n);
      const pl = ['x', 'y', 'z'].map((s, i) => (n[i] === 0 ? '' : `${n[i] > 0 ? '+' : '-'}${Math.abs(n[i]) === 1 ? '' : Math.abs(n[i])}${s}`)).join('').replace(/^\+/, '');
      return {
        q: `Find the perpendicular distance from ${m(`P${tup(P)}`)} to the plane ${m(`${pl} = ${d}`)}.`,
        fields: [N('Distance', dist)],
        steps: [`${m(`\\vec{n} = ${tup(n)}`)}, ${m(`|\\vec{n}| = \\sqrt{${dot(n, n)}}`)}.`, `${m(`\\vec{p}\\cdot\\vec{n} = ${dot(P, n)}`)}.`, `Distance ${m(`= \\dfrac{|${dot(P, n)} - ${br(d)}|}{\\sqrt{${dot(n, n)}}} = ${sf(dist)}`)}.`]
      };
    } },
    { name: 'Plane through three points', level: 2, fn() {
      const A_ = rv3(-3, 4), B_ = rv3(-3, 4), C_ = rv3(-3, 4), n = cross(sub(B_, A_), sub(C_, A_));
      if (mag(n) === 0) return this.fn();
      return {
        q: `Using ${m('\\vec{n} = \\overrightarrow{AB}\\times\\overrightarrow{AC}')}, find the equation of the plane through ${m(`A${tup(A_)}`)}, ${m(`B${tup(B_)}`)}, ${m(`C${tup(C_)}`)} in the form ${m('n_xx + n_yy + n_zz = d')}.`,
        fields: [N(m('n_x'), n[0]), N(m('n_y'), n[1]), N(m('n_z'), n[2]), N(m('d'), dot(n, A_))],
        steps: [`${m(`\\overrightarrow{AB} = ${tup(sub(B_, A_))}`)}, ${m(`\\overrightarrow{AC} = ${tup(sub(C_, A_))}`)}.`, `${m(`\\vec{n} = ${tup(n)}`)}.`, `${m(`d = \\vec{a}\\cdot\\vec{n} = ${dot(n, A_)}`)}, so the plane is ${m(`${n[0]}x + ${br(n[1])}y + ${br(n[2])}z = ${dot(n, A_)}`)}.`]
      };
    } },
    { name: 'Where a line meets a plane', level: 2, fn() {
      const a = rv3(-4, 4), d = rv3(-3, 3), n = rv3(-3, 3);
      const nd = dot(n, d); if (nd === 0) return this.fn();
      const l = nz(-3, 3), P = add(a, scale(l, d)), k = dot(n, P);
      const pl = ['x', 'y', 'z'].map((s, i) => (n[i] === 0 ? '' : `${n[i] > 0 ? '+' : '-'}${Math.abs(n[i]) === 1 ? '' : Math.abs(n[i])}${s}`)).join('').replace(/^\+/, '');
      return {
        q: `Find where the line ${m(`\\vec{r} = ${tup(a)} + \\lambda${tup(d)}`)} meets the plane ${m(`${pl} = ${k}`)}.`,
        fields: [N(m('\\lambda'), l), N(m('x'), P[0]), N(m('y'), P[1]), N(m('z'), P[2])],
        steps: [`Substitute the line into the plane: ${m(`${tup(n)}\\cdot[${tup(a)} + \\lambda${tup(d)}] = ${k}`)}.`, `${m(`${dot(n, a)} + ${br(nd)}\\lambda = ${k}`)} → ${m(`\\lambda = ${l}`)}.`, `Point ${m(tup(P))}.`]
      };
    } }
  ];

  // ======================================================================
  const V13 = [
    { name: 'Load on two symmetrical strings', level: 1, fn() {
      const W = pick([int(5, 60), 10 * int(5, 60)]), th = 5 * int(1, 14);
      const T = W / (2 * sin(th));
      return {
        q: `A load of weight ${W} N hangs symmetrically from two strings, each at ${th}° to the horizontal. Find the tension in each string.`,
        fields: [N(m('T'), T, 'N')],
        steps: ['Horizontal components cancel by symmetry.', `Vertical: ${m(`2T\\sin${th}^\\circ = ${W}`)} → ${m(`T = \\dfrac{${W}}{2\\sin${th}^\\circ} = ${sf(T)}\\ \\text{N}`)}.`,
          th <= 15 ? 'Notice how large T is for a shallow angle — a loaded string can never be perfectly horizontal.' : '']
      };
    } },
    { name: 'Held on a smooth slope (force parallel to slope)', level: 1, fn() {
      const mm = pick([step(0.5, 30, 0.5), int(1, 25)]), th = int(10, 60), W = mm * g;
      return {
        q: `A block of mass ${num(mm)} kg is held at rest on a smooth slope inclined at ${th}° by a rope parallel to the slope. Find the tension and the normal reaction.`,
        svg: U.slope(th),
        fields: [N('Tension', W * sin(th), 'N'), N('Normal reaction', W * cos(th), 'N')],
        steps: [`Along the slope: ${m(`T = mg\\sin\\theta = ${sf(W, 4)}\\sin${th}^\\circ = ${sf(W * sin(th))}\\ \\text{N}`)}.`, `Perpendicular: ${m(`R = mg\\cos\\theta = ${sf(W * cos(th))}\\ \\text{N}`)}.`]
      };
    } },
    { name: 'Pulled aside by a horizontal force', level: 1, fn() {
      const W = int(5, 80), th = 5 * int(2, 12);
      return {
        q: `A small ball of weight ${W} N hangs on a string. A horizontal force ${m('F')} pulls it aside until the string makes ${th}° with the vertical. Find ${m('F')} and the tension ${m('T')}.`,
        fields: [N(m('F'), W * tan(th), 'N'), N(m('T'), W / cos(th), 'N')],
        steps: [`Vertical: ${m(`T\\cos${th}^\\circ = ${W}`)} → ${m(`T = ${sf(W / cos(th))}\\ \\text{N}`)}.`, `Horizontal: ${m(`F = T\\sin${th}^\\circ = ${W}\\tan${th}^\\circ = ${sf(W * tan(th))}\\ \\text{N}`)}.`]
      };
    } },
    { name: 'Two cables at different angles', level: 2, fn() {
      const W = 10 * int(3, 30), a = 5 * int(2, 14); let b; do { b = 5 * int(2, 14); } while (b === a);
      const T1 = W * cos(b) / sin(a + b), T2 = W * cos(a) / sin(a + b);
      return {
        q: `A lamp of weight ${W} N hangs from two cables. Cable 1 makes ${a}° with the horizontal and cable 2 makes ${b}° with the horizontal, on the opposite side. Find the tensions.`,
        svg: U.vectors([{ v: [-T1 * cos(a), T1 * sin(a)], cls: 'v1', label: 'T₁', labelSide: 'left' }, { v: [T2 * cos(b), T2 * sin(b)], cls: 'v2', label: 'T₂' }, { v: [0, -W], cls: 'vk', label: `${W} N` }], { axes: false, size: 230 }),
        fields: [N(m('T_1'), T1, 'N'), N(m('T_2'), T2, 'N')],
        steps: [`Horizontal: ${m(`T_1\\cos${a}^\\circ = T_2\\cos${b}^\\circ`)}.`, `Vertical: ${m(`T_1\\sin${a}^\\circ + T_2\\sin${b}^\\circ = ${W}`)}.`,
          `Solving (or by Lami's theorem): ${m(`T_1 = \\dfrac{${W}\\cos${b}^\\circ}{\\sin${a + b}^\\circ} = ${sf(T1)}\\ \\text{N}`)}, ${m(`T_2 = \\dfrac{${W}\\cos${a}^\\circ}{\\sin${a + b}^\\circ} = ${sf(T2)}\\ \\text{N}`)}.`,
          'Check: the cable nearer the vertical carries the larger tension.']
      };
    } },
    { name: 'Rough ramp: push up / stop sliding', level: 2, fn() {
      const mm = int(2, 40), th = int(20, 45), mu = step(0.1, 0.5, 0.05);
      const W = mm * g, up = W * (sin(th) + mu * cos(th)), hold = W * (sin(th) - mu * cos(th));
      if (hold <= 0) return this.fn();
      return {
        q: `A ${mm} kg crate is on a rough ramp inclined at ${th}°; the coefficient of friction is ${num(mu)}. Find the force parallel to the ramp needed (a) to push the crate up at constant velocity, (b) just to stop it sliding down.`,
        fields: [N('(a) Up at constant velocity', up, 'N'), N('(b) Just stop sliding', hold, 'N')],
        steps: [`${m(`R = mg\\cos\\theta = ${sf(W * cos(th))}\\ \\text{N}`)}, limiting friction ${m(`\\mu R = ${sf(mu * W * cos(th))}\\ \\text{N}`)}.`,
          `(a) Friction acts down the slope: ${m(`P = mg\\sin\\theta + \\mu R = ${sf(W * sin(th))} + ${sf(mu * W * cos(th))} = ${sf(up)}\\ \\text{N}`)}.`,
          `(b) Friction acts up the slope: ${m(`P = mg\\sin\\theta - \\mu R = ${sf(hold)}\\ \\text{N}`)}.`]
      };
    } },
    { name: 'Horizontal force on a smooth slope', level: 2, fn() {
      const mm = step(0.5, 20, 0.5), th = int(10, 55), W = mm * g;
      return {
        q: `A ${num(mm)} kg block is held at rest on a smooth ${th}° slope by a <strong>horizontal</strong> force ${m('P')}. Find ${m('P')} and the normal reaction.`,
        fields: [N(m('P'), W * tan(th), 'N'), N(m('R'), W / cos(th), 'N')],
        steps: [`Along the slope: ${m(`P\\cos\\theta = mg\\sin\\theta`)} → ${m(`P = mg\\tan\\theta = ${sf(W * tan(th))}\\ \\text{N}`)}.`, `Perpendicular: ${m(`R = mg\\cos\\theta + P\\sin\\theta = \\dfrac{mg}{\\cos\\theta} = ${sf(W / cos(th))}\\ \\text{N}`)}.`]
      };
    } },
    { name: 'Equilibrant of a set of forces', level: 1, fn: () => forcesProblem(pick([2, 3]), true) }
  ];

  // ======================================================================
  const V14 = [
    { name: 'Cars on the same road', level: 1, fn() {
      const a = int(10, 35), b = int(5, 30), dir = pick(['east', 'west']);
      const r = a - (dir === 'east' ? b : -b);
      return {
        q: `Car ${m('A')} travels at ${a} m s⁻¹ east and car ${m('B')} at ${b} m s⁻¹ ${dir} on the same straight road. Find the velocity of ${m('A')} relative to ${m('B')} (east positive).`,
        fields: [N(m('v_{AB}') + ' (east +)', r, 'm s⁻¹')],
        steps: [`${m(`\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B = ${a} - (${dir === 'east' ? b : -b}) = ${r}\\ \\text{m s}^{-1}`)}.`, `So ${Math.abs(r)} m s⁻¹ ${r >= 0 ? 'east' : 'west'}.`]
      };
    } },
    { name: 'Rain and umbrella', level: 1, fn() {
      const vr = step(2, 12, 0.5), vw = step(1, 6, 0.5);
      return {
        q: `Rain falls vertically at ${num(vr)} m s⁻¹. A person walks east at ${num(vw)} m s⁻¹. Find the speed of the rain relative to the person, and the angle to the vertical at which they should tilt the umbrella.`,
        fields: [N('Relative speed', Math.hypot(vr, vw), 'm s⁻¹'), A('Angle to vertical', atan(vw / vr))],
        steps: [`${m(`\\vec{v}_{\\text{rain, person}} = \\vec{v}_{\\text{rain}} - \\vec{v}_{\\text{person}} = -${num(vw)}\\hat{\\imath} - ${num(vr)}\\hat{\\jmath}`)}.`,
          `Speed ${m(`= \\sqrt{${num(vr)}^2 + ${num(vw)}^2} = ${sf(Math.hypot(vr, vw))}\\ \\text{m s}^{-1}`)}.`,
          `Angle ${m(`= \\tan^{-1}(${num(vw)}/${num(vr)}) = ${ang(atan(vw / vr))}^\\circ`)} to the vertical — tilt the umbrella forwards (towards the east).`]
      };
    } },
    { name: 'Relative velocity of perpendicular cars', level: 1, fn() {
      const a = int(5, 30), b = int(5, 30);
      const r = [-b, a];
      const [bb, bstep] = bearingSteps(r[0], r[1]);
      return {
        q: `Car ${m('A')} drives north at ${a} m s⁻¹; car ${m('B')} drives east at ${b} m s⁻¹. Find the velocity of ${m('A')} relative to ${m('B')}.`,
        svg: U.vectors([{ v: [0, a], cls: 'v1', label: 'vA' }, { from: [0, a], v: [-b, 0], cls: 'v2', label: '−vB' }, { v: r, cls: 'v3', label: 'vAB', dash: true, labelSide: 'left' }], { north: true, size: 220 }),
        fields: [N('Magnitude', Math.hypot(a, b), 'm s⁻¹'), A('Bearing', bb)],
        steps: [`${m(`\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B = ${a}\\hat{\\jmath} - ${b}\\hat{\\imath}`)}.`, `Magnitude ${m(`\\sqrt{${a}^2 + ${b}^2} = ${sf(Math.hypot(a, b))}\\ \\text{m s}^{-1}`)}.`, bstep]
      };
    } },
    { name: 'River crossing', level: 2, fn() {
      const w = 10 * int(3, 30), u = step(0.5, 3, 0.1), v = +(u + step(0.4, 3, 0.1)).toFixed(1);
      const tmin = w / v, drift = u * tmin, al = asin(u / v), tstr = w / Math.sqrt(v * v - u * u);
      return {
        q: `A river ${w} m wide flows at ${num(u)} m s⁻¹. A boat can move at ${num(v)} m s⁻¹ relative to the water. (a) Find the least time to cross and how far downstream the boat lands. (b) Find the angle upstream (from the straight-across direction) needed to land directly opposite, and the time taken.`,
        fields: [N('(a) Least time', tmin, 's'), N('(a) Drift downstream', drift, 'm'), A('(b) Angle upstream', al), N('(b) Time', tstr, 's')],
        steps: [`(a) Point straight across: ${m(`t = w/v = ${w}/${num(v)} = ${sf(tmin)}\\ \\text{s}`)}. Drift ${m(`= ut = ${num(u)}\\times${sf(tmin)} = ${sf(drift)}\\ \\text{m}`)}.`,
          `(b) The upstream part of the boat's velocity must cancel the current: ${m(`\\sin\\alpha = u/v = ${num(u)}/${num(v)}`)} → ${m(`\\alpha = ${ang(al)}^\\circ`)}.`,
          `Speed across ${m(`= \\sqrt{v^2 - u^2} = ${sf(Math.sqrt(v * v - u * u))}\\ \\text{m s}^{-1}`)}, so ${m(`t = ${sf(tstr)}\\ \\text{s}`)}.`]
      };
    } },
    { name: 'Aircraft in a crosswind', level: 2, fn() {
      const V = 10 * int(10, 50), W = 5 * int(4, 20), from = pick(['west', 'east']);
      const a = asin(W / V), head = from === 'west' ? 360 - a : a, gs = Math.sqrt(V * V - W * W);
      return {
        q: `An aircraft with airspeed ${V} km h⁻¹ must fly due north. A wind blows from the ${from} at ${W} km h⁻¹. Find the heading (as a bearing) and the ground speed.`,
        fields: [A('Heading', head), N('Ground speed', gs, 'km h⁻¹')],
        steps: [`A wind from the ${from} blows towards the ${from === 'west' ? 'east' : 'west'}, so the aircraft must point into it (${from === 'west' ? 'west' : 'east'} of north).`,
          `air velocity + wind = ground velocity (due north). The eastward parts cancel: ${m(`${V}\\sin\\alpha = ${W}`)} → ${m(`\\alpha = ${ang(a)}^\\circ`)}.`,
          `Heading ${m(brg(head))}. Ground speed ${m(`= \\sqrt{${V}^2 - ${W}^2} = ${sf(gs)}\\ \\text{km h}^{-1}`)}.`]
      };
    } },
    { name: 'Relative velocity from bearings', level: 2, fn() {
      const a = int(5, 30), b = int(5, 30), ba = 15 * int(0, 23); let bb0; do { bb0 = 15 * int(0, 23); } while (bb0 === ba && a === b);
      const vA = [a * sin(ba), a * cos(ba)], vB = [b * sin(bb0), b * cos(bb0)], r = sub(vA, vB);
      if (mag(r) < 0.5) return this.fn();
      const [bb, bstep] = bearingSteps(r[0], r[1]);
      return {
        q: `${m('A')} moves at ${a} km h⁻¹ on ${m(brg(ba))}; ${m('B')} moves at ${b} km h⁻¹ on ${m(brg(bb0))}. Find the velocity of ${m('A')} relative to ${m('B')} (magnitude and bearing).`,
        fields: [N('Magnitude', mag(r), 'km h⁻¹'), A('Bearing', bb)],
        steps: [`${m(`\\vec{v}_A = ${ijk(vA, sf)}`)}, ${m(`\\vec{v}_B = ${ijk(vB, sf)}`)}.`, `${m(`\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B = ${ijk(r, sf)}`)}, magnitude ${m(sf(mag(r)))} km h⁻¹.`, bstep]
      };
    } },
    { name: 'Closest approach', level: 3, fn() {
      const r0 = [int(5, 30), int(-20, 20)], v = [int(-15, -3), nz(-10, 10)];
      const t = -dot(r0, v) / dot(v, v); if (t <= 0) return this.fn();
      const rc = add(r0, scale(t, v));
      return {
        q: `At noon ship ${m('Q')} is at ${m(`(${ijk(r0)})`)} km relative to ship ${m('P')}, and its velocity relative to ${m('P')} is ${m(`(${ijk(v)})`)} km h⁻¹. Find the time (hours after noon) of closest approach and the least distance.`,
        fields: [N('Time', t, 'h'), N('Least distance', mag(rc), 'km')],
        steps: [`${m(`\\vec{r}(t) = ${tup(r0)} + t${tup(v)}`)}.`, `Closest when ${m('\\vec{r}\\cdot\\vec{v} = 0')}: ${m(`t = -\\dfrac{\\vec{r}_0\\cdot\\vec{v}}{|\\vec{v}|^2} = \\dfrac{${-dot(r0, v)}}{${dot(v, v)}} = ${sf(t)}\\ \\text{h}`)}.`,
          `${m(`\\vec{r} = ${tup(rc, sf)}`)}, distance ${m(`= ${sf(mag(rc))}\\ \\text{km}`)}.`]
      };
    } }
  ];

  // ======================================================================
  const V15 = [
    { name: 'Constant velocity', level: 1, fn() {
      const r0 = [int(-5, 5), int(-5, 5)], v = [nz(-6, 6), nz(-6, 6)], t = step(1, 10, 0.5);
      const r = add(r0, scale(t, v));
      return {
        q: `A particle starts at ${m(`\\vec{r}_0 = (${ijk(r0)})\\ \\text{m}`)} and moves with constant velocity ${m(`(${ijk(v)})\\ \\text{m s}^{-1}`)}. Find its position after ${num(t)} s and its distance from its starting point.`,
        fields: [N(m('x'), r[0], 'm'), N(m('y'), r[1], 'm'), N('Distance from start', t * mag(v), 'm')],
        steps: [`${m(`\\vec{r} = \\vec{r}_0 + \\vec{v}t = ${tup(r0)} + ${num(t)}${tup(v)} = ${tup(r)}`)} m.`, `Distance from start ${m(`= |\\vec{v}t| = ${num(t)}\\sqrt{${dot(v, v)}} = ${sf(t * mag(v))}\\ \\text{m}`)}.`]
      };
    } },
    { name: 'Constant acceleration (vector suvat)', level: 1, fn() {
      const u = [nz(-8, 8), nz(-8, 8)], a = [int(-3, 3), int(-3, 3)], t = int(2, 6);
      const v = add(u, scale(t, a)), r = add(scale(t, u), scale(0.5 * t * t, a));
      return {
        q: `A particle starts at the origin with ${m(`\\vec{u} = (${ijk(u)})\\ \\text{m s}^{-1}`)} and constant acceleration ${m(`\\vec{a} = (${ijk(a)})\\ \\text{m s}^{-2}`)}. Find its velocity and position after ${t} s.`,
        fields: [N(m('v_x'), v[0], 'm s⁻¹'), N(m('v_y'), v[1], 'm s⁻¹'), N(m('x'), r[0], 'm'), N(m('y'), r[1], 'm')],
        steps: [`${m(`\\vec{v} = \\vec{u} + \\vec{a}t = ${tup(u)} + ${t}${tup(a)} = ${tup(v)}`)}.`, `${m(`\\vec{r} = \\vec{u}t + \\tfrac12\\vec{a}t^2 = ${t}${tup(u)} + ${num(0.5 * t * t)}${tup(a)} = ${tup(r)}`)}.`]
      };
    } },
    { name: 'Projectile in vector form', level: 2, fn() {
      const ux = int(5, 25), uy = int(5, 25);
      const T = 2 * uy / g, Rg = ux * T, H = uy * uy / (2 * g);
      return {
        q: `A ball is projected from ground level with ${m(`\\vec{u} = (${ux}\\hat{\\imath} + ${uy}\\hat{\\jmath})\\ \\text{m s}^{-1}`)} (${m('\\hat{\\jmath}')} vertically up, ${m('g = 9.81\\ \\text{m s}^{-2}')}). Find the time of flight, the range and the maximum height.`,
        fields: [N('Time of flight', T, 's'), N('Range', Rg, 'm'), N('Max height', H, 'm')],
        steps: [`${m(`\\vec{r} = ${ux}t\\,\\hat{\\imath} + (${uy}t - 4.905t^2)\\hat{\\jmath}`)}.`, `Lands when ${m(`${uy}t - 4.905t^2 = 0`)} → ${m(`t = ${sf(T)}\\ \\text{s}`)}.`,
          `Range ${m(`= ${ux}\\times${sf(T)} = ${sf(Rg)}\\ \\text{m}`)}.`, `Max height when ${m('v_y = 0')}: ${m(`H = \\dfrac{${uy}^2}{2(9.81)} = ${sf(H)}\\ \\text{m}`)}.`]
      };
    } },
    { name: 'Force from rest: F = ma', level: 1, fn() {
      const mm = step(0.5, 5, 0.5), F = [nz(-8, 8), nz(-8, 8)], t = int(2, 6);
      const a = scale(1 / mm, F), r = scale(0.5 * t * t, a);
      return {
        q: `A ${num(mm)} kg particle starts from rest at the origin under a constant force ${m(`\\vec{F} = (${ijk(F)})\\ \\text{N}`)}. Find its acceleration and its position after ${t} s.`,
        fields: [N(m('a_x'), a[0], 'm s⁻²'), N(m('a_y'), a[1], 'm s⁻²'), N(m('x'), r[0], 'm'), N(m('y'), r[1], 'm')],
        steps: [`${m(`\\vec{a} = \\vec{F}/m = ${tup(a, sf)}\\ \\text{m s}^{-2}`)}.`, `${m(`\\vec{r} = \\tfrac12\\vec{a}t^2 = ${num(0.5 * t * t)}${tup(a, sf)} = ${tup(r, sf)}\\ \\text{m}`)}.`]
      };
    } },
    { name: 'Average velocity from two positions', level: 1, fn() {
      const r1 = [int(-10, 20), int(-10, 20)], r2 = [int(-10, 20), int(-10, 20)], t1 = int(0, 4), t2 = t1 + int(2, 6);
      const av = scale(1 / (t2 - t1), sub(r2, r1));
      return {
        q: `A robot is at ${m(`(${ijk(r1)})`)} m at ${m(`t = ${t1}`)} s and at ${m(`(${ijk(r2)})`)} m at ${m(`t = ${t2}`)} s. Find its average velocity and the magnitude of the average velocity.`,
        fields: [N(m('\\hat{\\imath}'), av[0], 'm s⁻¹'), N(m('\\hat{\\jmath}'), av[1], 'm s⁻¹'), N('Magnitude', mag(av), 'm s⁻¹')],
        steps: [`${m(`\\Delta\\vec{r} = ${tup(sub(r2, r1))}`)} m, ${m(`\\Delta t = ${t2 - t1}`)} s.`, `${m(`\\vec{v}_{\\text{avg}} = \\Delta\\vec{r}/\\Delta t = ${tup(av, sf)}\\ \\text{m s}^{-1}`)}, magnitude ${m(sf(mag(av)))} m s⁻¹.`, 'You cannot find the average speed — the path length is unknown.']
      };
    } }
  ];

  // ======================================================================
  const V16 = [
    { name: 'Rotate a vector', level: 2, fn() {
      const v = [nz(-6, 6), nz(-6, 6)], th = pick([30, 45, 60, 90, 120, 135, 180, 270]);
      const r = [v[0] * cos(th) - v[1] * sin(th), v[0] * sin(th) + v[1] * cos(th)];
      return {
        q: `Rotate ${m(ijk(v))} anticlockwise through ${th}°.`,
        fields: [N(m('x'), r[0]), N(m('y'), r[1])],
        steps: [`${m(`(x, y) \\mapsto (x\\cos\\theta - y\\sin\\theta,\\ x\\sin\\theta + y\\cos\\theta)`)}.`, `${m(`= ${tup(r, sf)}`)}. Length unchanged: ${m(sf(mag(v)))} ✓.`]
      };
    } },
    { name: 'Express a vector in a new basis', level: 2, fn() {
      const a = [nz(-3, 3), nz(-3, 3)]; let b; do { b = [nz(-3, 3), nz(-3, 3)]; } while (a[0] * b[1] - a[1] * b[0] === 0);
      const l = nz(-4, 4), mu = nz(-4, 4), v = add(scale(l, a), scale(mu, b));
      return {
        q: `Express ${m(`\\vec{v} = ${ijk(v)}`)} as ${m('\\lambda\\vec{a} + \\mu\\vec{b}')} where ${m(`\\vec{a} = ${ijk(a)}`)} and ${m(`\\vec{b} = ${ijk(b)}`)}.`,
        fields: [N(m('\\lambda'), l), N(m('\\mu'), mu)],
        steps: [`${m('x')}: ${m(`${a[0]}\\lambda + ${br(b[0])}\\mu = ${v[0]}`)}; ${m('y')}: ${m(`${a[1]}\\lambda + ${br(b[1])}\\mu = ${v[1]}`)}.`, `Solving simultaneously: ${m(`\\lambda = ${l},\\ \\mu = ${mu}`)}.`]
      };
    } },
    { name: 'Is it a basis?', level: 2, fn() {
      const a = rv3(-3, 3), b = rv3(-3, 3), dep = Math.random() < 0.5;
      const c = dep ? add(scale(nz(-2, 2), a), scale(nz(-2, 2), b)) : rv3(-3, 3);
      const d = det3(a, b, c);
      return {
        q: `Is ${m(`\\{${tup(a)},\\ ${tup(b)},\\ ${tup(c)}\\}`)} a basis of 3-D space?`,
        fields: [C('Answer', ['Yes', 'No'], d !== 0 ? 'Yes' : 'No')],
        steps: [`Scalar triple product ${m(`= ${d}`)}.`, d !== 0 ? 'Non-zero → linearly independent → a basis.' : 'Zero → the vectors are coplanar (dependent) → not a basis.']
      };
    } }
  ];

  // ======================================================================
  const NQ = [
    ['In print a vector is written in bold, \\(\\mathbf{v}\\). How must you write it by hand?', ['\\(\\vec{v}\\) or \\(\\underline{v}\\)', '\\(v\\)', '\\(|v|\\)', '\\(\\hat{v}\\)'], 'You cannot write bold by hand, so add an arrow or underline. A plain \\(v\\) means the magnitude.'],
    ['What does \\(|\\vec{a}|\\) represent?', ['The magnitude of \\(\\vec{a}\\) (a scalar)', 'The unit vector along \\(\\vec{a}\\)', 'The direction of \\(\\vec{a}\\)', 'The vector \\(-\\vec{a}\\)'], 'The modulus bars mean "size of" — always ≥ 0.'],
    ['\\(\\overrightarrow{PQ}\\) means…', ['The displacement from \\(P\\) to \\(Q\\)', 'The displacement from \\(Q\\) to \\(P\\)', 'The distance \\(PQ\\) (a scalar)', 'The midpoint of \\(PQ\\)'], 'Start letter first, end letter second.'],
    ['\\(\\overrightarrow{BA}\\) is equal to…', ['\\(-\\overrightarrow{AB}\\)', '\\(\\overrightarrow{AB}\\)', '\\(|\\overrightarrow{AB}|\\)', '\\(\\vec{0}\\)'], 'Reversing the letters reverses the direction.'],
    ['\\(\\hat{a}\\) ("a-hat") is…', ['The unit vector in the direction of \\(\\vec{a}\\)', '\\(\\vec{a}\\) rotated by 90°', 'The magnitude of \\(\\vec{a}\\)', 'The \\(x\\)-component of \\(\\vec{a}\\)'], '\\(\\hat{a} = \\vec{a}/|\\vec{a}|\\), magnitude 1.'],
    ['\\(\\hat{\\jmath}\\) is the unit vector along…', ['\\(+y\\)', '\\(+x\\)', '\\(+z\\)', '\\(-y\\)'], '\\(\\hat{\\imath}, \\hat{\\jmath}, \\hat{k}\\) point along \\(+x, +y, +z\\).'],
    ['Which is the same vector as \\(4\\hat{\\imath} - 3\\hat{\\jmath}\\)?', ['\\(\\begin{pmatrix}4\\\\-3\\end{pmatrix}\\)', '\\(\\begin{pmatrix}-3\\\\4\\end{pmatrix}\\)', '\\(\\begin{pmatrix}4\\\\3\\end{pmatrix}\\)', '\\(1\\)'], 'Top number = \\(\\hat{\\imath}\\) coefficient, bottom = \\(\\hat{\\jmath}\\) coefficient.'],
    ['The result of \\(\\vec{a}\\cdot\\vec{b}\\) is…', ['A scalar', 'A vector perpendicular to both', 'A unit vector', 'A vector along \\(\\vec{a}\\)'], 'Dot product → scalar (e.g. work).'],
    ['The result of \\(\\vec{a}\\times\\vec{b}\\) is…', ['A vector perpendicular to both \\(\\vec{a}\\) and \\(\\vec{b}\\)', 'A scalar', 'A vector parallel to \\(\\vec{a}\\)', 'Always zero'], 'Cross product → vector, direction by the right-hand rule.'],
    ['\\(\\vec{v}_{AB}\\) (velocity of A relative to B) equals…', ['\\(\\vec{v}_A - \\vec{v}_B\\)', '\\(\\vec{v}_B - \\vec{v}_A\\)', '\\(\\vec{v}_A + \\vec{v}_B\\)', '\\(|\\vec{v}_A| - |\\vec{v}_B|\\)'], 'What A appears to do, seen by an observer moving with B.'],
    ['\\(\\Delta\\vec{v}\\) is calculated as…', ['final − initial', 'initial − final', 'final + initial', '|final| − |initial|'], 'Change is always final minus initial — as vectors.'],
    ['Which is the correct three-figure bearing for due west?', ['270°', '090°', '180°', '−90°'], 'Clockwise from north: E 090°, S 180°, W 270°.'],
    ['A bearing of 045° points…', ['North-east', 'South-east', 'North-west', 'East'], 'Halfway between north (000°) and east (090°).'],
    ['An angle of 210° measured anticlockwise from \\(+x\\) points into which quadrant?', ['Third (−, −)', 'Second (−, +)', 'Fourth (+, −)', 'First (+, +)'], '180° to 270° is the third quadrant.'],
    ['\\(a_x = -5\\) means…', ['The \\(x\\)-component is 5 units in the \\(-x\\) direction', 'The magnitude of \\(\\vec{a}\\) is −5', '\\(\\vec{a}\\) points along \\(+x\\)', 'An error — components cannot be negative'], 'Components carry signs; magnitudes do not.'],
    ['How do you test whether \\(\\vec{a}\\perp\\vec{b}\\)?', ['\\(\\vec{a}\\cdot\\vec{b} = 0\\)', '\\(\\vec{a}\\times\\vec{b} = \\vec{0}\\)', '\\(|\\vec{a}| = |\\vec{b}|\\)', '\\(\\vec{a} = \\lambda\\vec{b}\\)'], 'cos 90° = 0.'],
    ['\\(\\vec{a}\\parallel\\vec{b}\\) means…', ['\\(\\vec{a} = \\lambda\\vec{b}\\) for some scalar \\(\\lambda\\)', '\\(\\vec{a}\\cdot\\vec{b} = 0\\)', '\\(|\\vec{a}| = |\\vec{b}|\\)', '\\(\\vec{a} + \\vec{b} = \\vec{0}\\) only'], 'Parallel vectors are scalar multiples.'],
    ['In \\(\\vec{r} = \\vec{a} + \\lambda\\vec{d}\\), \\(\\lambda\\) is…', ['A scalar parameter', 'A vector', 'A wavelength', 'The length of the line'], 'Each value of \\(\\lambda\\) gives one point on the line.'],
    ['\\(\\sum\\vec{F} = \\vec{0}\\) tells you the particle is…', ['In equilibrium (at rest or constant velocity)', 'Acted on by no forces', 'Accelerating', 'Weightless'], 'Zero resultant force → no acceleration.'],
    ['Which is the correct CAPE way to write the unit of velocity?', ['\\(\\text{m s}^{-1}\\)', '\\(\\text{ms}^{-1}\\)', '\\(\\text{m s}\\)', '\\(\\text{s m}^{-1}\\)'], 'Leave a space: "ms⁻¹" would mean per millisecond!'],
    ['A wind "from the north" blows towards…', ['The south', 'The north', 'The east', 'The west'], 'Winds are named by where they come from.'],
    ['\\(\\vec{a} = \\vec{b}\\) means the vectors have…', ['The same magnitude and the same direction', 'The same magnitude only', 'The same starting point', 'The same direction only'], 'Where they are drawn does not matter.'],
    ['An aircraft\'s <em>heading</em> is…', ['The direction it points (its velocity relative to the air)', 'Its actual path over the ground', 'The direction of the wind', 'Its ground speed'], 'The actual path is the track.'],
    ['\\(\\hat{\\imath}\\times\\hat{\\jmath} = \\)', ['\\(\\hat{k}\\)', '\\(-\\hat{k}\\)', '\\(0\\)', '\\(1\\)'], 'Cyclic order i → j → k.'],
    ['\\(\\hat{\\imath}\\cdot\\hat{\\jmath} = \\)', ['\\(0\\)', '\\(1\\)', '\\(\\hat{k}\\)', '\\(-1\\)'], 'Perpendicular unit vectors: cos 90° = 0.'],
    ['Which symbol means "sum of"?', ['\\(\\Sigma\\)', '\\(\\Delta\\)', '\\(\\lambda\\)', '\\(\\theta\\)'], 'Capital sigma. \\(\\Delta\\) means "change in".'],
    ['Which of these is written correctly as a vector answer?', ['\\(12\\ \\text{N}\\) at 30° above the horizontal', '\\(12\\ \\text{N}\\)', '\\(\\vec{F} = 12\\ \\text{N}\\)', '\\(30^\\circ\\)'], 'A vector answer needs magnitude and a referenced direction.']
  ];
  const N0 = [{ name: 'Notation quiz', level: 1, fn() {
    const [q, opts, why] = pick(NQ);
    return { q, fields: [C('Answer', shuffle(opts), opts[0])], steps: [why] };
  } }];

  return { V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13, V14, V15, V16, N: N0 };
})();
