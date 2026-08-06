# AgentFlow Outreach Kit

*Copy-paste ready. No sales experience required. Fill `{{tokens}}` before sending.*

---

## 1. Cold Email Sequence (3-email drip)

**Target:** VP Engineering / CTO at Series A–C startups with active GitHub repos.  
**Personalize before sending:** Run their repo through `/analyze?repo={{github_org}}/{{repo_name}}` first, then fill in `{{issue_count}}`, `{{agent_handled_pct}}`, and `{{toil_hours}}` from the output.

---

### Email 1 — Personal intro (Day 0)

**Subject:** {{Company}}'s {{repo_name}} — {{issue_count}} open issues

Hi {{First Name}},

Ran {{company_org}}/{{repo_name}} through our analyzer: {{issue_count}} open issues, ~{{agent_handled_pct}}% flagged as autonomous-agent-ready — roughly {{toil_hours}} engineering hours/month in pure backlog toil.

We built AgentFlow to close that gap. Connect your GitHub repo, assign an issue to an agent the same way you'd assign it to an engineer. It writes the fix, opens a PR, you review and merge.

Takes 10 minutes to connect your first repo.

See your numbers: https://agentflow.ai/analyze?repo={{github_org}}/{{repo_name}}

{{Your Name}}

> **Word count:** ~80 words

---

### Email 2 — Social proof (Day 3)

**Subject:** We built AgentFlow using AI agents — in 7 days

Hi {{First Name}},

Quick follow-up on the note I sent Monday about {{Company}}'s backlog.

A bit of context on us: we built AgentFlow itself using AI agents. Every feature, PR, and commit — agents wrote it. 7 days from idea to deployed product.

Full story: https://agentflow.ai/blog/how-we-built-agentflow

The point isn't the speed. It's that agents handle the mechanical 80% — bugs, docs, dependencies, boilerplate — so engineers own the 20% that actually requires judgment.

Still happy to walk through what this looks like on {{company_org}}'s repos specifically.

{{Your Name}}

> **Word count:** ~95 words

---

### Email 3 — Final ask (Day 7)

**Subject:** Last note — free 14-day trial for {{Company}}

Hi {{First Name}},

Last note — I know your inbox is busy.

We're offering a 14-day free trial, no card required. Connects to GitHub in 10 minutes. If agents don't close at least 5 issues in two weeks, you owe nothing and I won't follow up again.

If the timing's off, no problem — happy to reconnect next quarter.

https://agentflow.ai

{{Your Name}}

> **Word count:** ~65 words

---

## 2. LinkedIn DM Template

Hi {{First Name}} — noticed {{Company}} has {{issue_count}} open GitHub issues. Ran it through our free analyzer:
https://agentflow.ai/analyze?repo={{github_org}}/{{repo_name}}

AgentFlow deploys AI agents that close issues autonomously — they write the fix, open a PR, you review and merge. Starter plan is $499/mo; 14-day free trial, no card required.

Worth a 15-minute look?

> **Word count:** ~60 words

---

## 3. Show HN Submission

### Title (72 chars)

```
Show HN: Free tool — see what your GitHub backlog costs in engineer hours
```

### First Comment (238 words)

```
We built a free GitHub backlog cost analyzer because we kept seeing the same pattern: strong engineering teams spending 30–40% of their time on mechanical work — dependency bumps, small bug fixes, boilerplate documentation — that doesn't actually require their judgment.

Try it here: https://agentflow.ai/analyze

Paste any public GitHub repo URL. It fetches your open issues, maps them to categories (bugs, docs, enhancements, dependencies, tests), applies per-category hour estimates, and shows you:
- Total open issues
- Which issues an AI agent could handle autonomously
- Estimated hours/month burned on backlog toil

No sign-up. Works on any public repo. Results in a few seconds.

---

What sits behind this is AgentFlow — a platform that actually closes those issues. You assign an issue to an AI agent the same way you'd assign it to an engineer. The agent checks it out, writes the fix, opens a PR, and closes the ticket. Engineers review PRs, not write them.

Honest current state: it works well on bugs with clear reproduction steps, dependency updates, documentation, and small features with a tight spec. It struggles on vague issues, cross-repo changes, and anything requiring significant product judgment — those still need humans.

We built AgentFlow itself using agents. 7 days from blank repo to deployed product. Full story: https://agentflow.ai/blog/how-we-built-agentflow

Starter plan is $499/mo (3 agents). 14-day free trial, no card.

Happy to answer anything — especially questions about safety guardrails, auth model, and what kinds of issues agents handle well vs. poorly.
```

---

## 4. Product Hunt Listing Copy

### Tagline (34 chars)

```
Your GitHub backlog, on autopilot.
```

### Description (248 chars)

```
AgentFlow deploys AI agents that close your GitHub issues autonomously. Assign an issue to an agent the way you'd assign it to an engineer — it writes the fix, opens a PR, and you review and merge. Starter plan from $499/mo. 14-day free trial.
```

### First Comment (~500 words)

```
Hey Product Hunt 👋

We're the team behind AgentFlow, and we're genuinely excited to share this today.

**What it does**

AgentFlow connects to your GitHub repos and puts AI agents to work on your backlog. The core loop is intentionally simple: you assign an issue to an agent the same way you'd assign it to a human engineer. The agent checks out the repo, reads the issue and codebase context, writes a fix, runs the test suite, opens a PR, and closes the ticket. Your team reviews PRs and merges — they don't write them.

We focus on the category of work that's real engineering but not creative engineering: bugs with clear reproduction steps, dependency version bumps, documentation gaps, test coverage holes, boilerplate features with tight specs. This is typically 30–40% of a team's open issue backlog — mechanical work that matters but doesn't need a senior engineer's full attention.

**Why we built it**

Every engineering team we talked to had the same problem: a backlog that grows faster than it shrinks. Hiring more engineers moves the bottleneck but doesn't remove it. AI coding assistants help individual developers go faster, but the backlog keeps piling up because the work still needs to be picked up, understood, and submitted by a human.

We wanted to close issues, not just suggest what to type.

**How it was built**

Here's the part that surprised us: we built AgentFlow using AgentFlow. Our own AI agents wrote the features, opened the PRs, and closed the tickets. From blank repo to deployed product in 7 days. The full story is on our blog: https://agentflow.ai/blog/how-we-built-agentflow

**Honest current state**

Works well:
- Bugs with a clear description and repro steps
- Dependency version bumps (Dependabot-style, but with actual PR descriptions)
- Documentation updates and README improvements
- Test coverage additions when the code path is well-defined
- Small features with a tight spec in the issue

Doesn't work well yet:
- Vague issues ("make this faster", "improve UX")
- Changes that require understanding stakeholder intent
- Cross-repository changes
- Issues where the right solution is deleting the feature, not fixing it

We're honest about this because we'd rather you use it on the right issues and be delighted than overpromise and churn.

**Try the free analyzer first**

Before you sign up for anything, run your repo through our free backlog analyzer: https://agentflow.ai/analyze — no sign-up, works on any public GitHub repo. You'll see exactly how many of your open issues fall into agent-handleable categories and an estimate of the engineering hours you're spending on them monthly.

**Pricing**

- Starter: $499/mo — 3 agents, up to 50 issues/month
- Growth: $1,499/mo — 10 agents, up to 200 issues/month
- 14-day free trial, no card required

Excited to answer questions — especially about the safety model, how agents handle ambiguous specs, and what the PR review experience actually looks like. AMA 🙌
```

---

## 5. Prospect List Template

Fill this in before running any email sequence. One row per outreach target.

| Name | Company | GitHub Org | Repo | /analyze URL | Status |
|------|---------|------------|------|--------------|--------|
| {{First Last}} | {{Company}} | {{github_org}} | {{repo_name}} | https://agentflow.ai/analyze?repo={{github_org}}/{{repo_name}} | todo |
| | | | | | |
| | | | | | |

**Status values:** `todo` → `email-1-sent` → `email-2-sent` → `email-3-sent` → `replied` → `demo-booked` → `trialing` → `closed-won` / `closed-lost`

**Before sending Email 1:** Open the `/analyze` URL for their repo, capture `{{issue_count}}`, `{{agent_handled_pct}}`, and `{{toil_hours}}` from the output, then paste them into the email template.

**Pre-built target list:** See `docs/cold-outreach-targets.md` for 15 pre-researched ICP-matched prospects with GitHub orgs already identified.
