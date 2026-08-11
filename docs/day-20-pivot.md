# Day 20 Pivot Activation — 2026-08-17

*CEO | 2026-08-10 | If you're reading this on 2026-08-17 with $0 MRR and 0 outreach sent*

---

## The situation on Day 20

- 60-day clock: 40 days remain
- B2B sales cycle: 3–4 weeks minimum
- Conclusion: we need a signed customer by 2026-09-07 to hit $10K MRR in 60 days

If zero outreach has been sent, the primary path (board-led LinkedIn DMs) has effectively failed. Activate one of the three pivots below. Pick one and execute today. Don't plan — execute.

---

## Pivot A — GitHub Marketplace (recommended, highest leverage)

**Time: 45 minutes. One-time. No ongoing effort.**

AgentFlow is already built and deployed as a GitHub App. GitHub Marketplace surfaces it organically to engineers who are already on GitHub looking for backlog help. No cold outreach needed after submission.

### What's already done

- GitHub App is created (see docs/github-marketplace-listing.md)
- Listing copy is written
- Screenshots are in docs/marketplace-screenshots/
- OG image is at packages/web/public/og-image.png

### Exact steps (45 minutes)

1. Go to [github.com/settings/apps](https://github.com/settings/apps)
2. Find the AgentFlow app
3. Click **"List on Marketplace"**
4. Fill in:
   - **Name:** AgentFlow — AI agents that close GitHub issues
   - **Description:** (use the copy from docs/github-marketplace-listing.md, section "Short description")
   - **Category:** Code review → Automation
   - **Pricing:** Free trial (14 days), then $499/mo (Starter) or $1,499/mo (Growth)
   - **Homepage URL:** https://dev-reclips.github.io/ (until agentflow.ai is live)
   - **Screenshots:** upload from docs/marketplace-screenshots/
5. Submit for review
6. GitHub reviews in 3–5 business days

**Expected outcome:** 5–20 organic trials/month. Zero ongoing effort.

---

## Pivot B — Send 5 LinkedIn DMs right now (10 minutes)

**Time: 10 minutes. Works today. DMs are already written.**

The DMs are written and have live URLs. The site is live at dev-reclips.github.io.

Go to LinkedIn. Open each profile. Hit Message. Paste. Send.

### James Hawkins — CEO, PostHog ⭐ (send first — 6,084 issues)
LinkedIn: search "James Hawkins PostHog"

> Hey James — PostHog has 6,084 open GitHub issues. We built AgentFlow to close engineering backlogs automatically: reads issues, writes code, opens PRs, merges them. Made you a page: https://dev-reclips.github.io/lp/posthog/ — 14-day trial, no card. Worth 20 min?

### Raj Dutt — CEO, Grafana
LinkedIn: search "Raj Dutt Grafana Labs"

> Hey Raj — Grafana has 820+ open GitHub issues. We built AgentFlow to close engineering backlogs automatically: reads issues, writes code, opens PRs, merges them. Made you a page: https://dev-reclips.github.io/lp/grafana/ — 14-day trial, no card. Worth 20 min?

### Steven Tey — Founder, Dub.co
LinkedIn: search "Steven Tey Dub.co"

> Hey Steven — Dub.co opened 3 Playwright test migration issues this week (#4298, #4299, #4300). These are exactly what AgentFlow closes automatically — agent reads the issue, writes the tests, opens a PR. You review and merge.
>
> Made you a personalized page: https://dev-reclips.github.io/lp/dub/
>
> Worth a 20-min demo?

### James Ritchie — CTO, Trigger.dev
LinkedIn: search "James Ritchie Trigger.dev"

> Hey James — Trigger.dev has 800+ open GitHub issues. We built AgentFlow to close engineering backlogs automatically: reads issues, writes code, opens PRs, merges them.
>
> Made you a personalized page: https://dev-reclips.github.io/lp/trigger-dev/
>
> Worth a 20-minute demo?

### Han Wang — Co-founder, Mintlify
LinkedIn: search "Han Wang Mintlify"

> Hey Han — Mintlify has 100+ open GitHub issues. We built AgentFlow to close them automatically: reads issues, writes code, opens PRs, merges them.
>
> Made you a personalized page: https://dev-reclips.github.io/lp/mintlify/
>
> Worth a 20-minute demo?

### Chris Frantz — Co-founder, Loops.so
LinkedIn: search "Chris Frantz Loops"

> Hey Chris — Loops has 50+ open GitHub issues. We built AgentFlow to close backlogs automatically: reads issues, writes code, opens PRs, merges them. No new hires required.
>
> Made you a personalized page: https://dev-reclips.github.io/lp/loops/
>
> Worth a 20-minute demo?

### Zeno Rocha — CEO, Resend
LinkedIn: search "Zeno Rocha Resend"

> Hey Zeno — Resend has 200+ open GitHub issues. We built AgentFlow to close them automatically: reads issues, writes code, opens PRs, merges them.
>
> Made you a personalized page: https://dev-reclips.github.io/lp/resend/
>
> Worth a 20-minute demo?

### Peer Richelsen — Co-founder, Cal.com
LinkedIn: search "Peer Richelsen Cal.com"

> Hey Peer — Cal.com has 500+ open GitHub issues. We built AgentFlow to automatically close engineering backlogs: reads issues, writes code, opens PRs, merges them.
>
> Made you a personalized page: https://dev-reclips.github.io/lp/cal/
>
> Worth a 20-minute demo?

---

## Pivot C — Send 5 newsletter pitches (30 minutes)

**Time: 30 minutes. Works today. Emails are already written. No product URL needed.**

Go to docs/newsletter-pitches.md. Copy each email. Send from dev@reclips.ai or your personal email.

| To | Subject |
|----|---------|
| dan@tldr.tech | Story pitch: We built and ran a SaaS company with AI agents in 10 days |
| editorial@console.dev | New tool worth reviewing: autonomous GitHub issue agents |
| editors@changelog.com | Pitch: "We're running a software company with AI agents" — and have the receipts |
| courtland@indiehackers.com | How we built a SaaS company with AI agents in 10 days (with real logs) |
| tyler@bytes.dev | (see docs/newsletter-pitches.md for full text) |

Expected turnaround: 1–2 weeks. Expected outcome: 1–2 features → 200–2,000 sign-ups per feature.

---

## Pivot D — Show HN post (30 minutes, requires agentflow.ai live)

**Blocked on production deploy (ANI-56). Do this only if agentflow.ai is live.**

Full draft at docs/show-hn-draft.md. Post at news.ycombinator.com/submit.
Best window: Tuesday–Thursday, 9–11am US Eastern.

If agentflow.ai is NOT live, substitute the URL with https://dev-reclips.github.io/ and note
it's the marketing site (not the live product). This is a weaker pitch but still works.

---

## Decision tree

```
Is agentflow.ai live?
  YES → Do Pivot D (Show HN) + Pivot A (Marketplace) + Pivot B (LinkedIn DMs)
  NO  → Do Pivot A (Marketplace, 45 min) + Pivot B (LinkedIn DMs, 10 min) + Pivot C (newsletter pitches, 30 min)
```

If you have 85 minutes total: do A + B + C. That's the maximum first-contact surface area without a live product URL.

---

## What I do after you activate a pivot

Reply on ANI-17 with:
- Which pivot you activated
- Any responses received

I'll handle everything from there: demo scheduling, follow-up tracking, objection handling prep.

---

*The difference between Day 20 with $0 and Day 20 with a demo scheduled is one hour of board time.*
