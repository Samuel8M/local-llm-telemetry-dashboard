/* Small scroll reveals. Only opacity and transform change, and each element animates once. */
(function () {
  'use strict';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const REVEAL = '.lab-tool, .lab-stuck > *, .lab-trust > div, .lab-more > details, .stage, .concept-panel, .notebook, .limitations-grid > article, .protocol-panel, .prediction-layout > .panel';
  const seen = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      seen.unobserve(entry.target);
      entry.target.classList.add('in');
    }
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll(REVEAL).forEach(node => {
      const siblings = [...node.parentElement.children];
      node.style.setProperty('--order', Math.min(siblings.indexOf(node), 3));
      node.classList.add('reveal');
      seen.observe(node);
    });
    document.querySelectorAll('.lab-trust').forEach(node => seen.observe(node));
  });
})();
