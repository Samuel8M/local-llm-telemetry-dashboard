'use strict';
// User-testing demo only. Stands in for the Lab Helper server so the real page
// (app.js, unchanged) can run on a static site. Laptop facts and plans were
// recorded from the real helper code for a simulated 16 GiB Windows laptop.
// Auto setup here is real but browser-based: it downloads a small model
// (Qwen2.5 0.5B, MLC build) with WebLLM and runs it on this device via WebGPU.
// On a real laptop the lab uses the learner's Ollama instead.
(function () {
  if (!/t=/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search + '#t=demo');

  const D = window.DEMO_DATA;
  const WEBLLM_URL = 'https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.86/lib/index.js';
  const MODEL = 'qwen2.5:0.5b';
  const SIZE_GIB = 0.3;
  const clone = o => JSON.parse(JSON.stringify(o));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const sim = { installed: null, pending: null, jobs: {}, n: 0, engine: null, history: [] };
  const CONFIRM_MS = 300 * 1000;

  const reply = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
  const bad = msg => reply(400, { error: msg });

  // ---------------------------------------------------------------- browser model
  let libPromise = null, idPromise = null, queue = Promise.resolve();
  const lib = () => (libPromise = libPromise || import(WEBLLM_URL));
  async function modelId() {
    idPromise = idPromise || (async () => {
      if (!navigator.gpu) return null;
      const adapter = await navigator.gpu.requestAdapter().catch(() => null);
      if (!adapter) return null;
      return adapter.features.has('shader-f16') ? 'Qwen2.5-0.5B-Instruct-q4f16_1-MLC' : 'Qwen2.5-0.5B-Instruct-q4f32_1-MLC';
    })();
    return idPromise;
  }
  async function inCache(id) {
    try { return await (await lib()).hasModelInCache(id); } catch (_) { return false; }
  }
  // WebLLM answers one request at a time; queue them.
  const serial = fn => (queue = queue.then(fn, fn));

  async function generate(messages, maxTokens) {
    return serial(async () => {
      const t0 = performance.now();
      let first = null, text = '', usage = null;
      const stream = await sim.engine.chat.completions.create({ messages, max_tokens: maxTokens, temperature: 0.7, stream: true, stream_options: { include_usage: true } });
      for await (const c of stream) {
        const d = c.choices && c.choices[0] && c.choices[0].delta && c.choices[0].delta.content;
        if (d) { if (first === null) first = performance.now(); text += d; }
        if (c.usage) usage = c.usage;
      }
      const secs = (performance.now() - t0) / 1000;
      const tokens = usage ? usage.completion_tokens : null;
      const tps = usage && usage.extra && usage.extra.decode_tokens_per_s ? Math.round(usage.extra.decode_tokens_per_s * 10) / 10 : null;
      return { text: text.trim(), seconds: Math.round(secs * 100) / 100, ttft_s: first === null ? null : Math.round((first - t0) / 10) / 100, tokens, tps };
    });
  }

  // ---------------------------------------------------------------- jobs
  function job(action, args, work) {
    const id = (++sim.n).toString(16).padStart(12, '0');
    const j = { id, action, args, status: 'running', progress: null, detail: '', log: [], result: null,
                error: null, diagnosis: null, warning: null };
    sim.jobs[id] = j;
    (async () => {
      try { j.result = await work(j); j.status = 'done'; }
      catch (e) { j.error = String((e && e.message) || e).slice(0, 400); j.status = 'failed'; }
    })();
    return clone(j);
  }

  function status() {
    const s = clone(D.status);
    if (sim.installed) {
      s.runtime.models = [sim.installed];
      s.runtime.lab_models = [sim.installed];
      s.assistant.ready = true;
      s.assistant.model = sim.installed;
    }
    return s;
  }

  // ---------------------------------------------------------------- Auto setup
  async function autoPlan(goal) {
    if (typeof goal !== 'string' || !D.auto_plan[goal]) return bad('Choose one of the listed goals.');
    const p = clone(D.auto_plan[goal]);
    const id = await modelId();
    if (!id) {
      sim.pending = null;
      return reply(200, { goal: p.goal, goal_label: p.goal_label, confirm_code: null, expires_in_s: null, manual_alternative: p.manual_alternative,
        stop: 'This demo runs the model inside your browser, which needs WebGPU. Open this page in a recent Chrome or Edge on a laptop or desktop computer, then press Auto again.' });
    }
    const already = sim.installed === MODEL || await inCache(id);
    p.model = { ...p.model, name: MODEL, params_billion: 0.5, download_file_size_gb: SIZE_GIB, needs_free_ram_gb: 1,
                hf_repo: 'mlc-ai/' + id, requires_license_acceptance: false };
    p.already_installed = already;
    p.download_gib_estimate = already ? 0 : SIZE_GIB;
    p.goal_why = (p.goal_why || '') + ' (Demo: every goal uses the same small model, which runs in your browser.)';
    p.steps = (already ? [] : [`Download ${MODEL} (about ${SIZE_GIB} GiB) into this browser's storage. On a real laptop, your local Ollama downloads the model instead.`]).concat([
      "Load the model onto this device's graphics chip (WebGPU).",
      'Run a short first prompt to confirm the model answers.',
      'Open a chat box for the model on this page.']);
    p.source = 'Demo: the MLC build of Qwen2.5-0.5B-Instruct from Hugging Face, run in your browser by WebLLM. The real lab downloads through your local Ollama, which verifies each file\'s digest.';
    p.license_note = 'Qwen2.5-0.5B-Instruct is released under the Apache 2.0 license.';
    p.confirm_code = 'demo' + Math.random().toString(36).slice(2, 14);
    p.expires_in_s = CONFIRM_MS / 1000;
    sim.pending = { code: p.confirm_code, model: MODEL, expires: Date.now() + CONFIRM_MS };
    return reply(200, p);
  }

  function autoStart(code) {
    if (typeof code !== 'string' || code.length < 8 || code.length > 64) return bad('Confirm the Auto plan first.');
    const pending = sim.pending;
    sim.pending = null;
    if (!pending || Date.now() > pending.expires || pending.code !== code) {
      return bad('This confirmation is missing, expired or already used. Press Auto again to review a fresh plan.');
    }
    return reply(200, job('auto', { model: MODEL }, async j => {
      const id = await modelId();
      const cached = await inCache(id);
      j.log.push(cached ? `${MODEL} is already in this browser's storage; loading it.` : `Downloading ${MODEL} into this browser (confirmed by you).`);
      j.progress = 0; j.detail = 'Download: starting';
      const webllm = await lib();
      if (!sim.engine) {
        try {
          sim.engine = await webllm.CreateMLCEngine(id, { initProgressCallback: r => {
            j.progress = Math.round(Math.min(0.8, (r.progress || 0) * 0.8) * 1000) / 1000;
            j.detail = (cached ? 'Loading: ' : 'Download: ') + String(r.text || 'working').slice(0, 120);
          } });
        } catch (e) {
          throw new Error('The model could not be downloaded or loaded in this browser. Check your connection and free disk space, close other heavy tabs, then press Auto again. (' + String((e && e.message) || e).slice(0, 160) + ')');
        }
      }
      if (!cached) j.log.push('Download finished.');
      j.progress = 0.85; j.detail = 'Checking the model runs on this device';
      j.log.push('Verifying the setup.');
      j.progress = 0.92; j.detail = 'Running a short first prompt';
      j.log.push('Running a short first prompt.');
      const first = await generate([{ role: 'user', content: 'Say hello in three words.' }], 12);
      if (!first.text) throw new Error('The model returned no text.');
      sim.installed = MODEL;
      j.progress = 1; j.detail = 'Ready';
      j.log.push('Ready. The model answered on this device.');
      return { model: MODEL, pulled: !cached, reply: first.text.slice(0, 200), seconds: first.seconds };
    }));
  }

  // ---------------------------------------------------------------- other lab actions
  function startJob(action, args) {
    args = args || {};
    if (action === 'check_hardware') {
      return reply(200, job(action, args, async j => { j.log.push("Reading this laptop's hardware and account privilege level."); await wait(500); return clone(D.hardware); }));
    }
    if (action === 'check_install') {
      return reply(200, job(action, args, async () => {
        await wait(400);
        throw new Error('Demo: the manual download path cannot run in a browser. Use Auto setup on the Learn page to try a real model here.');
      }));
    }
    if (action === 'first_prompt') {
      return reply(200, job(action, args, async j => {
        if (!sim.engine) throw new Error('Demo: use Auto setup first so a model is loaded in this browser.');
        j.log.push('Running a short first prompt.');
        const r = await generate([{ role: 'user', content: 'Say hello in three words.' }], 12);
        return { reply: r.text, seconds: r.seconds };
      }));
    }
    if (action === 'benchmark') {
      const gt = args.guess_tps ?? 20, gr = args.guess_ram_gb ?? 2, tps = 14.2, ram = 3.1;
      const pct = (g, a) => Math.round((g - a) / a * 100);
      return reply(200, job(action, args, async j => {
        j.log.push('Warm-up, then three fixed prompts and three measured repetitions per prompt by default.');
        for (let i = 1; i <= 9; i++) { await wait(350); j.progress = i / 9; j.detail = `Run ${i} of 9 (simulated)`; }
        return { model: args.model, runs: 9, valid_runs: 9, partial_runs: 0, failed_runs: 0, median_tps: tps, median_ttft_ms: 640,
          warmup_round_trip_s: 4.1, median_cpu_percent: 61, peak_ram_mb: ram * 1024,
          prediction_check: { tps: { guess: gt, actual: tps, off_by_percent: pct(gt, tps) }, ram_gb: { guess: gr, actual: ram, off_by_percent: pct(gr, ram) } },
          note: 'Demo: these numbers are simulated, not measured on your device.' };
      }));
    }
    return bad('That action is not available.');
  }

  function plan(model) {
    const p = D.plan[model];
    if (!p) return bad('Choose a model from the approved list.');
    const out = clone(p);
    out.steps.forEach(s => { if (s.id === 'pull_model') s.done = sim.installed === model; });
    return reply(200, out);
  }

  const SYSTEM = 'You are the lab assistant in a beginner course about running AI models locally on a laptop. '
    + 'Answer briefly and clearly in plain language. Never suggest disabling security protections or using administrator rights.';

  async function handle(path, body) {
    await wait(150);
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
      if (!sim.engine) return bad('Use Auto setup first so a model is loaded in this browser.');
      const msg = String(body.message || '').slice(0, 2000);
      try {
        const r = await generate([{ role: 'user', content: msg }], 300);
        return reply(200, { text: r.text || '(no text)', ttft_s: r.ttft_s, tps: r.tps, tokens: r.tokens });
      } catch (e) { return bad('The model stopped: ' + String((e && e.message) || e).slice(0, 200)); }
    }
    if (path === 'chat') {
      const msg = String(body.message || '').slice(0, 2000);
      if (!sim.engine) {
        return reply(200, { text: 'No model is loaded in this demo yet. Press **Auto setup** on the Learn page; once it finishes, I answer using that model right here in your browser.',
                            trace: [], mode: 'static_bootstrap', guardrails: true, flagged: [], guardrail_intervened: false });
      }
      try {
        const r = await generate([{ role: 'system', content: SYSTEM }, ...sim.history.slice(-6), { role: 'user', content: msg }], 300);
        sim.history.push({ role: 'user', content: msg }, { role: 'assistant', content: r.text });
        return reply(200, { text: r.text || '(no text)', trace: [], mode: 'model', guardrails: true, flagged: [], guardrail_intervened: false });
      } catch (e) { return bad('The model stopped: ' + String((e && e.message) || e).slice(0, 200)); }
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
