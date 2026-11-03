# Verification: close #30 and #36 (main @ 2026-11-02)

## #36 lint-banks window isolation
Fixed in PR #51: per-track bank loading uses track-scoped globals, not a single OCI window leak.
CI: `node scripts/lint-banks.js --ci` — aws_genai reports **300** questions (129 main + 12 scenario + 159 ramp; not OCI 200).

## #30 RHCSA10 SW / gap
- Single gap bank: `data/rhcsa10-gap-questions.js` (wired in `rhcsa10_quiz.html` + `sw.js` PRECACHE).
- `rhcsa10_quiz.html`, migration script, and rhcsa10 banks in precache (no rhcsa9 assets after #35).
