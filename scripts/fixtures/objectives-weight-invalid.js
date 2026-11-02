/** Fixture for #33 — weights sum to 0.9 (must fail lint). */
window.OBJECTIVES_SOURCE = 'https://example.com/cert-outline';
window.OBJECTIVES_VERIFIED = '2026-11-02';
window.OBJECTIVES = [
  { id: 'x', domain: 1, title: 'X', weight: 0.45 },
  { id: 'y', domain: 2, title: 'Y', weight: 0.45 }
];
