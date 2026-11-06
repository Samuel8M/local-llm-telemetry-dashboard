// Line figures (Hairline, MIT). They load only when one nears the screen, and mount one at a time so the page never stalls.
const FIGURES = { laptop: 1, loupe: 1, plug: 1, router: 1, drawer: 1, terminal: 1, terrain: 1, query: 1, padlock: 1, plot: 1 };
let library = null;
const queue = [];

function mountNext() {
  const slot = queue.shift();
  if (!slot) return;
  if (slot.isConnected) library[slot.dataset.figure](slot, { intensity: 0.5, theme: 'light', label: slot.dataset.label, play: 'play' in slot.dataset && !matchMedia('(prefers-reduced-motion: reduce)').matches });
  if (queue.length) setTimeout(mountNext, 40);
}

async function mount(slot) {
  queue.push(slot);
  if (queue.length > 1) return;
  try {
    library = library || await import('./vendor/hairline.js');
    mountNext();
  } catch (_) {
    // The page works without the drawings, so remove the gaps they would have left.
    queue.splice(0).forEach(s => s.remove());
  }
}

const watcher = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    watcher.unobserve(entry.target);
    mount(entry.target);
  }
}, { rootMargin: '200px' });

function watch() {
  document.querySelectorAll('[data-figure]:not([data-watched])').forEach(slot => {
    if (!FIGURES[slot.dataset.figure]) return;
    slot.dataset.watched = '';
    watcher.observe(slot);
  });
}
watch();
// The lab draws some pages after loading, including its empty states.
new MutationObserver(watch).observe(document.getElementById('main'), { childList: true, subtree: true });
