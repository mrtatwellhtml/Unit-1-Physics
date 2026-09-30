/* Router, pages and interactive components. */
(() => {
  const app = document.getElementById('app');
  const LEVEL = { 1: 'L1 Foundation', 2: 'L2 CAPE standard', 3: 'L3 College' };
  const CORE = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V13', 'V14', 'V15'];
  const topicById = id => TOPICS.find(t => t.id === id);

  // ---------------- storage (per-viewer progress) ----------------
  const KEY = 'capeVectors.v1';
  const Store = {
    data: { topics: {}, checklist: {}, mcq: {} },
    load() { try { const s = localStorage.getItem(KEY); if (s) this.data = Object.assign(this.data, JSON.parse(s)); } catch (e) { /* storage unavailable */ } },
    save() { try { localStorage.setItem(KEY, JSON.stringify(this.data)); } catch (e) { /* ignore */ } },
    record(topic, correct) {
      const t = this.data.topics[topic] || (this.data.topics[topic] = { att: 0, cor: 0 });
      t.att++; if (correct) t.cor++; this.save();
    },
    stats(topic) { return this.data.topics[topic] || { att: 0, cor: 0 }; }
  };
  Store.load();

  // ---------------- helpers ----------------
  function typeset(el) {
    if (window.renderMathInElement) {
      renderMathInElement(el, {
        delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }],
        throwOnError: false
      });
    }
  }
  function view(html) {
    app.innerHTML = `<div class="wrap">${html}</div>`;
    typeset(app);
    window.scrollTo(0, 0);
  }
  const pct = s => (s.att ? Math.round(100 * s.cor / s.att) : 0);
  const levelTag = l => `<span class="tag l${l}">${LEVEL[l]}</span>`;

  // ---------------- problem component ----------------
  /**
   * Render one generated problem into el.
   * opts: { topic, gen, onResult(correct), testMode, onNext }
   */
  function renderProblem(el, opts) {
    let prob;
    try { prob = opts.gen.fn(); } catch (e) { console.error(e); prob = opts.gen.fn(); }
    let scored = false;
    const fieldsHTML = prob.fields.map((f, i) => {
      if (f.options) {
        return `<div class="field" data-i="${i}"><label>${f.label}</label>
          <div class="choice-group">${f.options.map((o, j) => `<button type="button" class="choice" data-j="${j}">${o}</button>`).join('')}</div>
          <span class="mark"></span><span class="reveal"></span></div>`;
      }
      return `<div class="field" data-i="${i}"><label for="f${i}">${f.label}</label>
        <input id="f${i}" inputmode="decimal" autocomplete="off" spellcheck="false">
        <span class="unit">${f.unit || ''}</span><span class="mark"></span><span class="reveal"></span></div>`;
    }).join('');
    const t = topicById(opts.topic);
    el.innerHTML = `<div class="card problem">
      <div class="meta">${levelTag(opts.gen.level)}<span class="tag">${opts.topic === 'N' ? 'Notation' : opts.topic + (t ? ' · ' + t.title : '')}</span> <span class="muted small">${opts.gen.name}</span></div>
      <div class="q">${prob.q}</div>
      ${prob.svg ? `<div class="figure">${prob.svg}</div>` : ''}
      <div class="fields">${fieldsHTML}</div>
      <p class="hint-text">Give answers to 3 s.f. and angles in degrees to 1 d.p. You can type fractions or roots, e.g. <code>3/5</code>, <code>sqrt(2)/2</code>, <code>1.6e-19</code>.</p>
      <div class="btn-row">
        <button class="primary" data-act="check">${opts.testMode ? 'Submit answer' : 'Check'}</button>
        ${opts.testMode ? '' : '<button data-act="reveal">Show worked solution</button>'}
        <button data-act="next">${opts.testMode ? 'Next question →' : 'New question →'}</button>
      </div>
      <div class="feedback" aria-live="polite"></div>
      <div class="box example solution" hidden><h4>Worked solution</h4><ol class="steps">${prob.steps.filter(Boolean).map(s => `<li>${s}</li>`).join('')}</ol></div>
    </div>`;
    typeset(el);

    const card = el.querySelector('.problem');
    const fb = card.querySelector('.feedback');
    const sol = card.querySelector('.solution');
    const nextBtn = card.querySelector('[data-act="next"]');
    if (opts.testMode) nextBtn.disabled = true;

    card.querySelectorAll('.choice-group').forEach(gr => gr.addEventListener('click', e => {
      const b = e.target.closest('.choice'); if (!b || card.dataset.locked) return;
      gr.querySelectorAll('.choice').forEach(x => x.classList.toggle('selected', x === b));
    }));
    card.querySelectorAll('input').forEach(inp => inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); }));

    const answerText = f => (f.options ? f.ans : `\\(${f.angle ? U.ang(f.ans) + '^\\circ' : f.sci ? U.sci(f.ans) : U.num(f.ans)}\\)${f.unit && !f.angle ? ' ' + f.unit : ''}`);

    function reveal() {
      sol.hidden = false;
      card.querySelectorAll('.field').forEach(fe => {
        const f = prob.fields[+fe.dataset.i];
        const r = fe.querySelector('.reveal');
        r.innerHTML = 'Answer: ' + answerText(f);
      });
      typeset(sol.parentElement);
    }
    function check() {
      let all = true, blank = false, unreadable = false;
      card.querySelectorAll('.field').forEach(fe => {
        const f = prob.fields[+fe.dataset.i];
        let ok;
        if (f.options) {
          const s = fe.querySelector('.choice.selected');
          if (!s) { blank = true; ok = false; } else ok = f.options[+s.dataset.j] === f.ans;
        } else {
          const raw = fe.querySelector('input').value;
          if (raw.trim() === '') { blank = true; ok = false; } else {
            const v = U.parseNum(raw);
            if (isNaN(v)) { unreadable = true; ok = false; } else ok = U.close(v, f.ans, f);
          }
        }
        fe.classList.toggle('ok', ok); fe.classList.toggle('bad', !ok);
        fe.querySelector('.mark').textContent = ok ? '✓' : '✗';
        all = all && ok;
      });
      if (blank && !opts.testMode) { fb.className = 'feedback bad'; fb.textContent = 'Fill in every answer, then check.'; return; }
      if (unreadable && !opts.testMode) { fb.className = 'feedback bad'; fb.textContent = 'Couldn’t read one of your answers — type a number such as 12.5, -3/5 or 2sqrt(3).'; return; }
      if (!scored) { scored = true; Store.record(opts.topic, all); opts.onResult && opts.onResult(all); }
      fb.className = 'feedback ' + (all ? 'ok' : 'bad');
      fb.textContent = all ? 'Correct — well done!' : (opts.testMode ? 'Not quite — study the worked solution below.' : 'Not quite. Fix the red answers and check again, or open the worked solution.');
      if (opts.testMode) {
        card.dataset.locked = '1';
        card.querySelectorAll('input').forEach(i => (i.disabled = true));
        card.querySelector('[data-act="check"]').disabled = true;
        nextBtn.disabled = false;
        reveal();
      } else if (all) reveal();
    }
    card.querySelector('[data-act="check"]').addEventListener('click', check);
    const rv = card.querySelector('[data-act="reveal"]');
    if (rv) rv.addEventListener('click', () => {
      if (!scored) { scored = true; Store.record(opts.topic, false); opts.onResult && opts.onResult(false); }
      reveal();
    });
    nextBtn.addEventListener('click', () => (opts.onNext ? opts.onNext() : renderProblem(el, opts)));
    const first = card.querySelector('input');
    if (first && !('ontouchstart' in window)) first.focus({ preventScroll: true });
  }

  /** Practice widget for one topic, with a type selector and a session score. */
  function practiceWidget(host, topic) {
    const gens = G[topic];
    let sel = 'all', right = 0, total = 0;
    host.innerHTML = `<div class="practice-bar">
      <label for="genSel" class="small muted">Question type</label>
      <select id="genSel"><option value="all">Mixed — all types</option>${gens.map((g, i) => `<option value="${i}">[L${g.level}] ${g.name}</option>`).join('')}</select>
      <span class="score">This session: <span id="sc">0 / 0</span></span></div><div id="probHost"></div>`;
    const ph = host.querySelector('#probHost'), sc = host.querySelector('#sc');
    const next = () => {
      const gen = sel === 'all' ? U.pick(gens) : gens[+sel];
      renderProblem(ph, { topic, gen, onResult: ok => { total++; if (ok) right++; sc.textContent = `${right} / ${total}`; } });
    };
    host.querySelector('#genSel').addEventListener('change', e => { sel = e.target.value; next(); });
    next();
  }

  // ---------------- pages ----------------
  function home() {
    const cards = TOPICS.map(t => topicCard(t)).join('');
    view(`
      <section class="hero">
        <h1>Vectors, properly learned.</h1>
        <p>An interactive companion to the CAPE Physics Unit 1 Vectors workbook. Learn the notation, study each concept, then practise with questions that are marked instantly and come with full worked solutions — new numbers every time.</p>
        <div class="btn-row"><a class="btn primary" href="#/notation">Start with notation</a><a class="btn" href="#/topics">Browse lessons</a><a class="btn" href="#/test">Take a mixed test</a></div>
      </section>
      <h2>How to use this site</h2>
      <ol>
        <li><strong>Learn the language.</strong> Read the <a href="#/notation">notation guide</a> and pass the notation quiz.</li>
        <li><strong>One concept at a time.</strong> For each section V1–V16, read the lesson (What you need, worked examples, Examiner's traps).</li>
        <li><strong>Drill Level 1 until it's automatic</strong>, then Level 2. Aim for 80 % before moving on — the same rule as the printed workbook.</li>
        <li><strong>Mix it up.</strong> Use the <a href="#/test">mixed test</a> and the <a href="#/mcq">Paper 01 MCQ bank</a> under timed conditions.</li>
        <li><strong>Tick the <a href="#/checklist">self-assessment checklist</a></strong> only when you can do each item without help.</li>
      </ol>
      <div class="grid" style="margin:18px 0">
        <a class="card stretch" href="#/playground"><h3>Vector playground</h3><p class="muted">Drag two vectors and watch the sum, difference, components, dot and cross product update live.</p></a>
        <a class="card stretch" href="#/formulas"><h3>Formula sheet</h3><p class="muted">Every result in the topic on one page.</p></a>
        <a class="card stretch" href="#/mcq"><h3>MCQ bank (M2)</h3><p class="muted">30 Paper 01-style items with explanations of every distractor.</p></a>
      </div>
      <h2>Lessons and practice</h2>
      <div class="grid">${cards}</div>`);
  }
  function topicCard(t) {
    const s = Store.stats(t.id);
    return `<div class="card">
      <div class="lesson-head"><span class="tag">${t.id}</span>${t.beyond ? '<span class="tag beyond">Beyond CAPE</span>' : ''}</div>
      <h3 style="margin:.4em 0">${t.title}</h3>
      <p class="muted small">${t.cape}</p>
      <div class="btn-row"><a class="btn" href="#/learn/${t.id}">Lesson</a><a class="btn primary" href="#/practice/${t.id}">Practise (${G[t.id].length} types)</a></div>
      <div class="small muted">${s.att ? `${s.cor}/${s.att} correct (${pct(s)} %)` : 'Not started'}</div>
      <div class="progress"><span style="width:${pct(s)}%"></span></div></div>`;
  }
  function topics() {
    view(`<h1>Lessons</h1>
      <p class="muted">Part A of the workbook: sixteen sections, each drilling one idea. Sections marked <span class="tag beyond">Beyond CAPE</span> are university extensions.</p>
      <div class="table-wrap"><table>
        <tr><th>Section</th><th>Topic</th><th>Where it appears in CAPE Unit 1 Module 1</th></tr>
        ${TOPICS.map(t => `<tr><td><a href="#/learn/${t.id}">${t.id}</a></td><td>${t.title}</td><td>${t.cape}</td></tr>`).join('')}
      </table></div>
      <div class="grid">${TOPICS.map(topicCard).join('')}</div>`);
  }
  function lesson(id) {
    const t = topicById(id); if (!t) return notFound();
    const i = TOPICS.indexOf(t), prev = TOPICS[i - 1], next = TOPICS[i + 1];
    view(`<div class="crumbs"><a href="#/topics">Lessons</a> › ${t.id}</div>
      <div class="lesson-head"><h1>${t.id} — ${t.title}</h1></div>
      <p>${t.beyond ? '<span class="tag beyond">Beyond CAPE</span> ' : ''}<span class="muted small">CAPE link: ${t.cape} · Printed workbook: ${t.workbook}</span></p>
      ${t.html}
      <div class="box need"><h4>Now practise</h4><p>${G[id].length} question types for this section, each with new numbers every time and a full worked solution.</p>
        <div class="btn-row"><a class="btn primary" href="#/practice/${id}">Practise ${id} →</a></div></div>
      <div class="pager">${prev ? `<a class="btn" href="#/learn/${prev.id}">← ${prev.id} ${prev.title}</a>` : '<span></span>'}${next ? `<a class="btn" href="#/learn/${next.id}">${next.id} ${next.title} →</a>` : ''}</div>`);
    app.querySelectorAll('[data-fig]').forEach(el => { const f = FIGS[el.dataset.fig]; if (f) el.innerHTML = f(); });
  }
  function practice(id) {
    const t = topicById(id); if (!t || !G[id]) return notFound();
    view(`<div class="crumbs"><a href="#/topics">Lessons</a> › <a href="#/learn/${id}">${id}</a> › Practice</div>
      <h1>Practise ${id}: ${t.title}</h1>
      <p class="muted">Stuck? Re-read the <a href="#/learn/${id}">lesson</a> or open the worked solution. Then do the matching questions (${t.workbook}) in your printed workbook.</p>
      <div id="pw"></div>`);
    practiceWidget(app.querySelector('#pw'), id);
  }
  function notation() {
    view(`<h1>Vector notation</h1>${NOTATION_HTML}
      <h2 id="quiz">Notation quiz</h2><p class="muted">Keep going until you can get ten in a row.</p><div id="pw"></div>`);
    practiceWidget(app.querySelector('#pw'), 'N');
  }
  function formulas() { view(`<h1>Formula sheet</h1><p class="muted">Every key result in the topic. Section numbers match the lessons.</p>${FORMULAS_HTML}`); }

  function test() {
    view(`<h1>Mixed test</h1>
      <p>Ten questions drawn at random from across the topic — the way the exam mixes them. One attempt per question; the worked solution appears after you submit.</p>
      <div class="card">
        <label><input type="checkbox" id="ext"> Include beyond-CAPE sections (V11, V12, V16)</label>
        <p><label>Level: <select id="lvl" style="font:inherit;padding:4px 8px;border-radius:8px"><option value="0">All levels</option><option value="1">Level 1 only</option><option value="2">Level 2 and above</option></select></label></p>
        <div class="btn-row"><button class="primary" id="go">Start the test</button></div>
      </div><div id="tHost"></div>`);
    app.querySelector('#go').addEventListener('click', () => {
      const ext = app.querySelector('#ext').checked, lvl = +app.querySelector('#lvl').value;
      const ids = ext ? TOPICS.map(t => t.id) : CORE;
      let pool = []; ids.forEach(id => G[id].forEach(g => pool.push({ topic: id, gen: g })));
      if (lvl === 1) pool = pool.filter(p => p.gen.level === 1);
      if (lvl === 2) pool = pool.filter(p => p.gen.level >= 2);
      const qs = []; const used = new Set();
      while (qs.length < 10) { const p = U.pick(pool); const k = p.topic + p.gen.name; if (used.has(k) && used.size < pool.length) continue; used.add(k); qs.push(p); }
      runTest(qs);
    });
  }
  function runTest(qs) {
    const results = []; let n = 0;
    const host = app.querySelector('#tHost');
    app.querySelector('.card').remove();
    const step = () => {
      if (n >= qs.length) return summary();
      host.innerHTML = `<p class="small muted" style="margin-top:16px">Question ${n + 1} of ${qs.length}</p><div class="progress"><span style="width:${100 * n / qs.length}%"></span></div><div id="tq"></div>`;
      const q = qs[n];
      renderProblem(host.querySelector('#tq'), { topic: q.topic, gen: q.gen, testMode: true, onResult: ok => results.push({ ...q, ok }), onNext: () => { n++; step(); } });
    };
    const summary = () => {
      const score = results.filter(r => r.ok).length;
      const missed = [...new Set(results.filter(r => !r.ok).map(r => r.topic))];
      host.innerHTML = `<div class="card" style="margin-top:16px"><h2 style="margin-top:0">You scored ${score} / ${qs.length}</h2>
        <div class="table-wrap"><table><tr><th>#</th><th>Section</th><th>Question type</th><th>Result</th></tr>
        ${results.map((r, i) => `<tr><td>${i + 1}</td><td><a href="#/learn/${r.topic}">${r.topic}</a></td><td>${r.gen.name}</td><td>${r.ok ? '✓' : '✗'}</td></tr>`).join('')}</table></div>
        ${missed.length ? `<p><strong>Revise:</strong> ${missed.map(id => `<a href="#/practice/${id}">${id} ${topicById(id).title}</a>`).join(' · ')}</p>` : '<p><strong>Perfect score.</strong> Try Level 2 only, or add the extension sections.</p>'}
        <div class="btn-row"><button class="primary" id="again">Take another test</button></div></div>`;
      host.querySelector('#again').addEventListener('click', test);
    };
    step();
  }

  function mcq() {
    const state = MCQ.map(() => null);
    view(`<h1>M2 — Multiple-choice bank</h1>
      <p>Thirty items in the style of CAPE Paper 01. Allow about 2 minutes per item — 60 minutes for the set. Write a one-line calculation or sketch before you choose. After you answer, the explanation shows why the tempting wrong options are wrong.</p>
      <div class="practice-bar"><button id="reset">Reset</button><span class="score">Score: <span id="msc">0 / 0</span></span></div>
      ${MCQ.map((m, i) => `<div class="card problem" data-q="${i}"><div class="meta"><span class="tag">M2.${i + 1}</span></div><div class="q">${m.q}</div>
        <div class="mcq-opts">${m.o.map((o, j) => `<button data-j="${j}">(${'ABCD'[j]}) ${o}</button>`).join('')}</div><div class="feedback"></div><div class="why muted" hidden>${m.why}</div></div>`).join('')}`);
    const upd = () => { const a = state.filter(x => x !== null); app.querySelector('#msc').textContent = `${a.filter(Boolean).length} / ${a.length}`; };
    app.querySelectorAll('[data-q]').forEach(card => {
      const i = +card.dataset.q;
      card.querySelector('.mcq-opts').addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b || state[i] !== null) return;
        const j = +b.dataset.j, ok = j === MCQ[i].ans; state[i] = ok;
        card.querySelectorAll('.mcq-opts button').forEach(x => { const k = +x.dataset.j; if (k === MCQ[i].ans) x.classList.add('right'); else if (k === j) x.classList.add('wrong'); x.disabled = k !== j && k !== MCQ[i].ans; });
        const fb = card.querySelector('.feedback'); fb.className = 'feedback ' + (ok ? 'ok' : 'bad'); fb.textContent = ok ? 'Correct.' : `Answer: (${'ABCD'[MCQ[i].ans]})`;
        card.querySelector('.why').hidden = false; upd();
      });
    });
    app.querySelector('#reset').addEventListener('click', mcq);
  }

  function checklist() {
    const d = Store.data.checklist;
    const done = () => CHECKLIST.filter((_, i) => d[i]).length;
    view(`<h1>Self-assessment checklist</h1>
      <p>Tick each statement only when you can do it <strong>without help</strong>. Your ticks are saved in this browser.</p>
      <p><strong id="cc">${done()} / ${CHECKLIST.length}</strong> complete</p><div class="progress"><span id="cb" style="width:${100 * done() / CHECKLIST.length}%"></span></div>
      <div class="card" style="margin-top:14px">${CHECKLIST.map(([s, id], i) => `<label class="check-item"><input type="checkbox" data-i="${i}" ${d[i] ? 'checked' : ''}>
        <span>${s}<br><span class="small"><a href="#/learn/${id}">${id} lesson</a> · <a href="#/practice/${id}">practise</a></span></span></label>`).join('')}</div>`);
    app.querySelectorAll('.check-item input').forEach(c => c.addEventListener('change', () => {
      d[c.dataset.i] = c.checked; Store.save();
      app.querySelector('#cc').textContent = `${done()} / ${CHECKLIST.length}`;
      app.querySelector('#cb').style.width = `${100 * done() / CHECKLIST.length}%`;
    }));
  }

  // ---------------- playground ----------------
  function playground() {
    view(`<h1>Vector playground</h1>
      <p class="muted">Drag the tips of \\(\\vec{a}\\) (blue) and \\(\\vec{b}\\) (orange). Positions snap to 0.5 units. Try to make \\(\\vec{a}\\cdot\\vec{b} = 0\\), or \\(\\vec{a}\\times\\vec{b} = \\vec{0}\\), or \\(|\\vec{a}+\\vec{b}| = |\\vec{a}-\\vec{b}|\\).</p>
      <div class="pg"><div><svg id="pgsvg" viewBox="0 0 440 440" aria-label="Interactive vector diagram"></svg></div>
      <div><div class="card toggles">
        <label><input type="checkbox" id="tSum" checked> Show <b>a</b> + <b>b</b> (parallelogram)</label>
        <label><input type="checkbox" id="tDiff"> Show <b>a</b> − <b>b</b></label>
        <label><input type="checkbox" id="tComp"> Show components of <b>a</b></label>
        <label><input type="checkbox" id="tProj"> Show projection of <b>a</b> on <b>b</b></label>
      </div><div class="table-wrap"><table class="pg-readout" id="pgout"></table></div></div></div>`);
    const svg = app.querySelector('#pgsvg'), out = app.querySelector('#pgout');
    const S = 440, R = 8, sc = S / (2 * R + 1);
    const X = x => S / 2 + x * sc, Y = y => S / 2 - y * sc;
    const st = { a: [4, 2], b: [1, 3.5] };
    let drag = null;
    const f1 = x => (Math.abs(x) < 1e-9 ? '0' : (+x.toFixed(2)).toString());
    const f = x => U.sf(x).replace('\\times10^', 'e');
    function draw() {
      const { a, b } = st, s = U.add(a, b), d = U.sub(a, b);
      let gg = '';
      for (let i = -R; i <= R; i++) gg += `<line class="grid-line" x1="${X(i)}" y1="${Y(-R - .5)}" x2="${X(i)}" y2="${Y(R + .5)}"/><line class="grid-line" x1="${X(-R - .5)}" y1="${Y(i)}" x2="${X(R + .5)}" y2="${Y(i)}"/>`;
      gg += `<line class="ax" x1="${X(-R - .5)}" y1="${Y(0)}" x2="${X(R + .5)}" y2="${Y(0)}"/><line class="ax" x1="${X(0)}" y1="${Y(-R - .5)}" x2="${X(0)}" y2="${Y(R + .5)}"/>`;
      gg += `<text class="lbl-sm" x="${X(R) }" y="${Y(0) - 6}">x</text><text class="lbl-sm" x="${X(0) + 6}" y="${Y(R)}">y</text>`;
      if (app.querySelector('#tSum').checked) {
        gg += U.arrowSVG(X(a[0]), Y(a[1]), X(s[0]), Y(s[1]), 'v2', { dash: true, width: 1.5 });
        gg += U.arrowSVG(X(b[0]), Y(b[1]), X(s[0]), Y(s[1]), 'v1', { dash: true, width: 1.5 });
        gg += U.arrowSVG(X(0), Y(0), X(s[0]), Y(s[1]), 'v3');
        gg += `<text class="lbl" x="${X(s[0]) + 8}" y="${Y(s[1]) - 6}">a+b</text>`;
      }
      if (app.querySelector('#tDiff').checked) {
        gg += U.arrowSVG(X(b[0]), Y(b[1]), X(a[0]), Y(a[1]), 'v4');
        gg += `<text class="lbl" x="${(X(a[0]) + X(b[0])) / 2 + 8}" y="${(Y(a[1]) + Y(b[1])) / 2}">a−b</text>`;
      }
      if (app.querySelector('#tComp').checked) {
        gg += U.arrowSVG(X(0), Y(0), X(a[0]), Y(0), 'v1', { dash: true, width: 2 });
        gg += U.arrowSVG(X(a[0]), Y(0), X(a[0]), Y(a[1]), 'v1', { dash: true, width: 2 });
        gg += `<text class="lbl-sm" x="${X(a[0] / 2)}" y="${Y(0) + (a[1] >= 0 ? 16 : -8)}" text-anchor="middle">aₓ = ${f1(a[0])}</text><text class="lbl-sm" x="${X(a[0]) + 6}" y="${Y(a[1] / 2)}">a_y = ${f1(a[1])}</text>`;
      }
      const bb = U.dot(b, b);
      if (app.querySelector('#tProj').checked && bb > 0) {
        const p = U.scale(U.dot(a, b) / bb, b);
        gg += `<line class="ax dash" x1="${X(a[0])}" y1="${Y(a[1])}" x2="${X(p[0])}" y2="${Y(p[1])}"/>`;
        gg += U.arrowSVG(X(0), Y(0), X(p[0]), Y(p[1]), 'v3', { width: 4 });
      }
      gg += U.arrowSVG(X(0), Y(0), X(a[0]), Y(a[1]), 'v1', { width: 3 });
      gg += U.arrowSVG(X(0), Y(0), X(b[0]), Y(b[1]), 'v2', { width: 3 });
      gg += `<text class="lbl" x="${X(a[0]) + 10}" y="${Y(a[1]) + 4}">a</text><text class="lbl" x="${X(b[0]) + 10}" y="${Y(b[1]) + 4}">b</text>`;
      gg += `<circle class="handle v1" data-h="a" cx="${X(a[0])}" cy="${Y(a[1])}" r="11" fill-opacity=".25"/><circle class="handle v2" data-h="b" cx="${X(b[0])}" cy="${Y(b[1])}" r="11" fill-opacity=".25"/>`;
      svg.innerHTML = gg;
      const A3 = [a[0], a[1], 0], B3 = [b[0], b[1], 0];
      const ma = U.mag(a), mb = U.mag(b), dt = U.dot(a, b), cz = U.cross(A3, B3)[2];
      const between = ma && mb ? U.acos(dt / (ma * mb)) : NaN;
      const angStr = v => (U.mag(v) ? U.ang(U.ang360(v[0], v[1])) + '°' : '—');
      out.innerHTML = `<tr><th></th><th>components</th><th>magnitude</th><th>angle from +x</th></tr>
        <tr><td>a</td><td>(${f1(a[0])}, ${f1(a[1])})</td><td>${f(ma)}</td><td>${angStr(a)}</td></tr>
        <tr><td>b</td><td>(${f1(b[0])}, ${f1(b[1])})</td><td>${f(mb)}</td><td>${angStr(b)}</td></tr>
        <tr><td>a + b</td><td>(${f1(s[0])}, ${f1(s[1])})</td><td>${f(U.mag(s))}</td><td>${angStr(s)}</td></tr>
        <tr><td>a − b</td><td>(${f1(d[0])}, ${f1(d[1])})</td><td>${f(U.mag(d))}</td><td>${angStr(d)}</td></tr>
        <tr><td>a · b</td><td colspan="3">${f1(dt)} ${Math.abs(dt) < 1e-9 && ma && mb ? '← perpendicular!' : ''}</td></tr>
        <tr><td>angle between</td><td colspan="3">${isNaN(between) ? '—' : U.ang(between) + '°'}</td></tr>
        <tr><td>a × b</td><td colspan="3">${f1(cz)} (z-component; + = anticlockwise) ${Math.abs(cz) < 1e-9 && ma && mb ? '← parallel!' : ''} &nbsp; (|a × b| = parallelogram area ${f1(Math.abs(cz))})</td></tr>
        <tr><td>proj. of a on b</td><td colspan="3">${mb ? f(dt / mb) : '—'}</td></tr>`;
    }
    const toUnits = e => {
      const r = svg.getBoundingClientRect(); const px = (e.clientX - r.left) * S / r.width, py = (e.clientY - r.top) * S / r.height;
      const snap = v => Math.max(-R, Math.min(R, Math.round(((v) / sc) * 2) / 2));
      return [snap(px - S / 2), snap(S / 2 - py)];
    };
    svg.addEventListener('pointerdown', e => {
      const hEl = e.target.closest('[data-h]');
      if (hEl) drag = hEl.dataset.h;
      else { const p = toUnits(e); drag = U.mag(U.sub(p, st.a)) <= U.mag(U.sub(p, st.b)) ? 'a' : 'b'; st[drag] = p; draw(); }
      svg.setPointerCapture(e.pointerId);
    });
    svg.addEventListener('pointermove', e => { if (!drag) return; st[drag] = toUnits(e); draw(); });
    const end = () => { drag = null; };
    svg.addEventListener('pointerup', end); svg.addEventListener('pointercancel', end);
    app.querySelectorAll('.toggles input').forEach(c => c.addEventListener('change', draw));
    draw();
  }

  function notFound() { view('<h1>Page not found</h1><p><a href="#/">Go to the home page</a></p>'); }

  // ---------------- router ----------------
  function route() {
    const parts = (location.hash.replace(/^#\/?/, '') || '').split('/');
    const [p, arg] = parts;
    document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#/' + p));
    document.getElementById('nav').classList.remove('open');
    document.getElementById('menuBtn').setAttribute('aria-expanded', 'false');
    switch (p) {
      case '': return home();
      case 'topics': return topics();
      case 'learn': return lesson(arg);
      case 'practice': return practice(arg);
      case 'notation': return notation();
      case 'formulas': return formulas();
      case 'test': return test();
      case 'mcq': return mcq();
      case 'playground': return playground();
      case 'checklist': return checklist();
      default: return notFound();
    }
  }
  window.addEventListener('hashchange', route);

  // menu + theme
  document.getElementById('menuBtn').addEventListener('click', () => {
    const n = document.getElementById('nav'); const open = n.classList.toggle('open');
    document.getElementById('menuBtn').setAttribute('aria-expanded', String(open));
  });
  const root = document.documentElement;
  try { const th = localStorage.getItem('capeVectors.theme'); if (th) root.dataset.theme = th; } catch (e) { /* ignore */ }
  document.getElementById('themeBtn').addEventListener('click', () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('capeVectors.theme', root.dataset.theme); } catch (e) { /* ignore */ }
  });

  typeset(document.querySelector('.footer'));
  route();
})();
