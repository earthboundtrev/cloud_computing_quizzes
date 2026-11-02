# Ticket pipeline retro audits

When work merged **before** Cloud Agent Bugbot/Architect gates, each issue gets `issue-{N}-retro.md`:

1. Set pointer to **BUGBOT** on the ticket diff.
2. Run Bugbot + Architect Tasks (Grok 4.6 High, local VM).
3. Log results here; fix **blockers** on follow-up PRs.
4. **One Bugbot per diff** — see `.cursor/rules/cloud-agent-ticket-pipeline.mdc`.

| Issue | Retro doc | Merged PR(s) | Bugbot | Architect |
|-------|-----------|--------------|--------|-----------|
| #13 GenAI | [issue-13-retro.md](./issue-13-retro.md) | #49, #50, #51 | Findings → #51 | Phase merge-ready |
| #14 Terraform | [issue-14-retro.md](./issue-14-retro.md) | #44 | Findings | Increment merge-ready |
| #15 CISSP | [issue-15-retro.md](./issue-15-retro.md) | #48 | Findings | Blockers (merged) |
| #31 RHCSA10 | [issue-31-retro.md](./issue-31-retro.md) | #47 | Findings | Blockers (issue closed) |
