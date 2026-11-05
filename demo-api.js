'use strict';
// User-testing demo only. Stands in for the Lab Helper server so the real page
// (app.js, unchanged) can run on a static site. Responses were recorded from the
// real helper code for a simulated 16 GiB Windows laptop with Ollama running.
// Nothing is downloaded and no model runs: the Auto job below is a simulation.
(function () {
  if (!/t=/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search + '#t=demo');

  const D = window.DEMO_DATA;
  const clone = o => JSON.parse(JSON.stringify(o));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const sim = { installed: null, pending: null, jobs: {}, n: 0, hwRead: false };
  const CONFIRM_MS = 300 * 1000;

  const reply = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
  const bad = msg => reply(400, { error: msg });

  function status() {
    return clone(sim.installed && D.status_after[sim.installed] ? D.status_after[sim.installed] : D.status);
  }

  function newJob(action, args, steps, result) {
    const id = (++sim.n).toString(16).padStart(12, '0');
    const job = { id, action, args, status: 'running', progress: null, detail: '', log: [], result: null,
                  error: null, diagnosis: null, warning: null };
    sim.jobs[id] = job;
    (async () => {
      for (const s of steps) {
        await wait(s.ms || 600);
        if (s.log) job.log.push(s.log);
        if (s.detail !== undefined) job.detail = s.detail;
        if (s.progress !== undefined) job.progress = s.progress;
        if (s.then) s.then();
      }
      job.result = typeof result === 'function' ? result() : result;
      job.status = 'done';
    })();
    return clone(job);
  }

  function autoPlan(goal) {
    if (typeof goal !== 'string' || !D.auto_plan[goal]) return bad('Choose one of the listed goals.');
    const p = clone(D.auto_plan[goal]);
    if (sim.installed === p.model.name) {
      p.already_installed = true;
      p.download_gib_estimate = 0;
      p.steps = p.steps.slice(1);
    }
    p.confirm_code = 'demo' + Math.random().toString(36).slice(2, 14);
    sim.pending = { code: p.confirm_code, model: p.model.name, expires: Date.now() + CONFIRM_MS };
    return reply(200, p);
  }

  function autoStart(code) {
    if (typeof code !== 'string' || code.length < 8 || code.length > 64) return bad('Confirm the Auto plan first.');
    const pending = sim.pending;
    sim.pending = null;
    if (!pending || Date.now() > pending.expires || pending.code !== code) {
      return bad('This confirmation is missing, expired or already used. Press Auto again to review a fresh plan.');
    }
    const model = pending.model;
    const already = sim.installed === model;
    const steps = [];
    if (!already) {
      steps.push({ ms: 300, log: `Downloading ${model} through the local Ollama runtime (confirmed by you).`, detail: 'Download: pulling manifest', progress: 0 });
      for (let i = 1; i <= 10; i++) steps.push({ ms: 450, detail: 'Download: pulling model layer (simulated)', progress: Math.round(i / 10 * 0.8 * 1000) / 1000 });
      steps.push({ ms: 400, detail: 'Download: verifying sha256 digest' });
      steps.push({ ms: 300, detail: 'Download: success', log: 'Download finished.' });
    }
    steps.push({ ms: 500, detail: 'Verifying the runtime, model digest and project budget', progress: 0.85, log: 'Verifying the setup.',
                 then: () => { sim.installed = model; } });
    steps.push({ ms: 700, detail: 'Running a short first prompt', progress: 0.92, log: 'Running a bounded first prompt after provenance and project-budget checks.' });
    steps.push({ ms: 600, detail: 'Ready', progress: 1.0, log: 'Ready. The model answered on this laptop.' });
    return reply(200, newJob('auto', { model }, steps, { model, pulled: !already, reply: 'Hello there, friend!', seconds: 1.38 }));
  }

  function startJob(action, args) {
    args = args || {};
    if (action === 'check_hardware') {
      return reply(200, newJob(action, args, [{ ms: 500, log: "Reading this laptop's hardware and account privilege level." }], () => clone(D.hardware)));
    }
    if (action === 'check_install') {
      if (!sim.installed) return reply(200, failJob(action, args, 'The selected model is not downloaded yet. Run the download command shown above in a terminal, then check again. (Demo: use Auto setup to simulate the download.)'));
      return reply(200, newJob(action, args, [{ ms: 600 }], { steps: [] }));
    }
    if (action === 'first_prompt') {
      return reply(200, newJob(action, args, [{ ms: 900, log: 'Running a bounded first prompt after provenance and project-budget checks.' }], { reply: 'Hello there, friend!', seconds: 1.38 }));
    }
    if (action === 'benchmark') {
      const gt = args.guess_tps ?? 20, gr = args.guess_ram_gb ?? 2, tps = 14.2, ram = 3.1;
      const pct = (g, a) => Math.round((g - a) / a * 100);
      const steps = [{ ms: 400, log: 'Warm-up, then three fixed prompts and three measured repetitions per prompt by default.' }];
      for (let i = 1; i <= 9; i++) steps.push({ ms: 350, progress: i / 9, detail: `Run ${i} of 9 (simulated)` });
      return reply(200, newJob(action, args, steps, {
        model: args.model, runs: 9, valid_runs: 9, partial_runs: 0, failed_runs: 0, median_tps: tps, median_ttft_ms: 640,
        warmup_round_trip_s: 4.1, median_cpu_percent: 61, peak_ram_mb: ram * 1024,
        prediction_check: { tps: { guess: gt, actual: tps, off_by_percent: pct(gt, tps) }, ram_gb: { guess: gr, actual: ram, off_by_percent: pct(gr, ram) } },
        note: 'Demo: these numbers are simulated, not measured on your device.' }));
    }
    return bad('That action is not available.');
  }

  function failJob(action, args, error) {
    const id = (++sim.n).toString(16).padStart(12, '0');
    const job = { id, action, args, status: 'failed', progress: null, detail: '', log: [], result: null, error, diagnosis: null, warning: null };
    sim.jobs[id] = job;
    return clone(job);
  }

  function plan(model) {
    const p = D.plan[model];
    if (!p) return bad('Choose a model from the approved list.');
    const out = clone(p);
    out.steps.forEach(s => { if (s.id === 'pull_model') s.done = sim.installed === model; });
    return reply(200, out);
  }

  async function handle(path, body) {
    await wait(250);
    if (path === 'status') return reply(200, status());
    if (path === 'recommend') return D.recommend[body.goal] ? reply(200, clone(D.recommend[body.goal])) : bad('Choose one of the listed goals.');
    if (path === 'plan') return plan(body.model);
    if (path === 'auto/plan') return autoPlan(body.goal ?? 'study');
    if (path === 'auto/start') return autoStart(body.confirm_code);
    if (path === 'jobs') return startJob(body.action, body.args);
    if (path.startsWith('jobs/')) {
      const j = sim.jobs[path.slice(5)];
      return j ? reply(200, clone(j)) : reply(404, { error: 'Unknown job.' });
    }
    if (path === 'try') {
      return reply(200, { text: 'RAM is your computer\'s short-term working memory. It holds the data and programs in use right now, so the processor can reach them quickly.\n\n(Demo reply: no model runs on this page.)',
                          ttft_s: 0.62, tps: 14.2, tokens: 38 });
    }
    if (path === 'chat') {
      return reply(200, { text: 'This is the user-testing demo, so the lab assistant is not connected to a model here. On a real laptop it answers using the local model you set up.',
                          trace: [], mode: 'static_bootstrap', guardrails: true, flagged: [], guardrail_intervened: false });
    }
    if (path === 'results') return reply(200, { models: [], rows: 0 });
    if (path === 'results.json') return reply(404, { error: 'No measured results in the demo.' });
    return reply(404, { error: 'Not found.' });
  }

  const realFetch = window.fetch.bind(window);
  window.fetch = function (input, opts) {
    const url = typeof input === 'string' ? input : input.url;
    const m = /^\/api\/(.+)$/.exec(url);
    if (!m) return realFetch(input, opts);
    let body = {};
    try { body = opts && opts.body ? JSON.parse(opts.body) : {}; } catch (_) { return Promise.resolve(bad('Invalid JSON.')); }
    return handle(m[1], body || {});
  };
})();
