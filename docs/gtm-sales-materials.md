# GTM Sales Materials — Phase 3

*Prepared by CEO | 2026-08-04 | Ready for board outreach*

---

## 1. Ideal Customer Profile (ICP)

**Primary target:** Technical founders and engineering leaders at startups with 5–50 engineers.

| Dimension | Target |
|-----------|--------|
| **Role** | CTO, VP Engineering, Technical Founder |
| **Company size** | 5–50 engineers; Series A–B or well-funded seed |
| **GitHub usage** | Active GitHub org; backlogs with 50+ open issues |
| **Pain** | Engineers burning time on repetitive tasks — bug triaging, dependency updates, documentation, PR review, small fixes |
| **Budget authority** | Can approve $500–$1,500/mo without committee sign-off |
| **Signal** | Openly talking about "developer productivity" or "technical debt" on Twitter/LinkedIn |

**ICP in one sentence:** A technical founder who has 8 engineers but needs the throughput of 15 to hit their roadmap.

**Not a fit (for now):** Large enterprise (too slow), non-technical founders (wrong buyer), companies not on GitHub, solo founders (too small).

---

## 2. Positioning Statement

**For** engineering leaders at growth-stage startups  
**who** are bottlenecked by backlog toil and can't hire fast enough,  
**AgentFlow** is an AI-native development platform  
**that** deploys autonomous agents to work your GitHub backlog — triaging issues, writing code, opening PRs, and closing tickets — automatically.  
**Unlike** traditional project management tools or LLM coding assistants,  
**we** close tickets end-to-end, not just suggest what to type.

**One-liner:** *Your GitHub backlog, on autopilot.*

---

## 3. Cold Email Sequence (3-email drip)

Target: CTOs / VPs Eng / technical founders at 5–50 engineer companies on GitHub.

---

### Email 1 — Problem Hook (Day 0)

**Subject:** [Company]'s GitHub backlog

Hi [First Name],

Quick question: what percentage of your open GitHub issues are things your engineers *could* fix but haven't gotten to in weeks?

For most teams we talk to, it's 60–70%. The backlog grows faster than the team can clear it — and hiring more engineers just moves the bottleneck, it doesn't remove it.

We built AgentFlow to close that gap. Autonomous AI agents that work your GitHub backlog — triaging, writing code, opening PRs, and closing tickets — on their own.

Starter plan is $499/mo. Takes 10 minutes to connect your first repo.

Worth a 15-minute look?

[Your name]

---

### Email 2 — Product Demo (Day 3)

**Subject:** 2-minute demo of AgentFlow in action

Hi [First Name],

Wanted to show you what "agents on your backlog" actually looks like in practice.

The core loop:
1. Connect your GitHub repo (OAuth, 10 minutes)
2. Assign an issue to an agent — same as assigning it to a human
3. Agent checks it out, writes the code, opens a PR
4. You review and merge

It works on bug fixes, documentation, dependency bumps, test coverage, and small features. Anything that has a clear spec in the issue.

We're at $499/mo for Starter (3 agents) and $1,499/mo for Growth (10 agents, priority execution).

14-day free trial. No credit card upfront.

Would a 15-minute live demo be useful?

[Your name]

---

### Email 3 — Soft Close (Day 7)

**Subject:** Last note — AgentFlow

Hi [First Name],

Third and final note.

I know you're busy. So I'll be direct: if your backlog is a constant source of stress and you're not ready to hire your way out of it, AgentFlow is worth 15 minutes.

If timing is bad, no problem — just reply "later" and I'll check back in 60 days.

If you want to see it working: https://agentflow.ai

Either way, good luck with [something specific about their company or recent news].

[Your name]

---

## 4. Product One-Pager

---

**AgentFlow** | Your GitHub backlog, on autopilot.

**The problem**

Engineering teams spend 30–40% of their time on backlog toil — bug triage, dependency updates, documentation fixes, test coverage, small feature work. This is high-volume, low-complexity work that drains senior engineers and slows roadmap execution.

**What we do**

AgentFlow deploys autonomous AI agents directly into your GitHub workflow. Assign an issue to an agent the same way you'd assign it to a human. The agent checks it out, writes the code, opens a PR, and closes the ticket. You review and merge.

**What agents can handle today**
- Bug fixes with reproducible steps
- Dependency upgrades and security patches
- Documentation and inline comments
- Test coverage gaps
- Small, well-specified features

**How it works**
1. Connect your GitHub org (OAuth, 10 minutes)
2. Create an agent and assign it to your repo
3. Assign issues to the agent — it picks them up automatically
4. Review PRs and merge

**Pricing**

| Plan | Price | Agents | Best for |
|------|-------|--------|----------|
| Starter | $499/mo | 3 agents | 1–2 repos, small team |
| Growth | $1,499/mo | 10 agents | Multiple repos, full backlog automation |

14-day free trial. No credit card required to start.

**Why now**

AI coding models crossed a threshold in 2025 — they can write production-quality code on well-defined tasks with >80% accuracy. AgentFlow wraps that capability in a workflow your team already uses: GitHub issues.

**Get started:** https://agentflow.ai

---

## 5. Demo Script (15-Minute Live Demo)

**Goal:** Show the prospect the complete loop — issue to merged PR — and get them to say "I could see this working on our backlog."

**Setup (before the call):**
- Have a demo GitHub repo ready with 3–5 open issues (one bug, one doc task, one small feature)
- Log into AgentFlow with the demo account
- Have the landing page open in another tab

---

**[0:00–2:00] Set the stage**

"Before I show you the product, I want to make sure we're solving the right problem. Can you tell me — how many open GitHub issues does your team have right now? And roughly what percentage have been sitting there for more than 2 weeks?"

*[Let them answer — this primes them to feel the pain]*

"That's the exact problem AgentFlow is built for. Let me show you what we do with that backlog."

---

**[2:00–5:00] Connect and create an agent**

- Open AgentFlow dashboard
- "This is the main dashboard. You connect a GitHub org right here — it's OAuth, takes about 2 minutes."
- "Then you create an agent. Name it, give it a description of what it should handle. Think of it like writing a job description."
- "Once it's connected to a repo, it starts watching your issues."

---

**[5:00–10:00] Assign an issue and watch it work**

- Open the demo GitHub repo
- Find a bug issue ("TypeError when user has no email address")
- Assign it to the agent
- Switch to AgentFlow — show the agent picking it up
- Show the execution log: reading the issue, reading relevant files, writing the fix, opening the PR

"See how it's checking out the issue, reading the codebase, then writing the fix? This is the same thing your engineer would do — it just doesn't need to context-switch."

---

**[10:00–12:00] Show the PR**

- Go to GitHub
- Open the PR the agent opened
- Walk through the diff — point out that it's clean, readable, passes CI
- "Your engineer reviews this the same way they review any PR. If it's good, they merge. If not, they leave a comment and the agent iterates."

---

**[12:00–15:00] Talk pricing and next steps**

"So that's the core loop. Issue assigned → code written → PR opened → you review and merge."

"Where do you think this fits on your backlog? What type of issues do you have most of?"

*[Listen — this tells you their use case and whether they're a fit]*

"We're at $499/mo for Starter — 3 agents — and $1,499/mo for Growth with 10 agents. Both come with a 14-day free trial, no credit card."

"Would it make sense to start a trial on one repo this week? I can set it up with you in 10 minutes after this call."

---

## 6. Objection Handling Guide

**"How do I know the code quality is good enough to trust?"**

→ You don't merge anything the agent produces without review — same as any junior engineer. The agent opens PRs; you decide what ships. Start with low-risk issues (docs, test coverage) to build confidence, then expand to bug fixes.

**"This is too expensive for what it is."**

→ One engineer costs $15–20K/month fully loaded. AgentFlow at $1,499/mo is 10% of one headcount. If it clears 10 issues per month that would have taken an engineer 2 hours each, it's paying for itself several times over. Want to run the math together?

**"We already use GitHub Copilot."**

→ Copilot helps engineers write code faster. AgentFlow writes code without the engineer in the loop. They're complementary — Copilot for what your team actively works on; AgentFlow for the backlog your team never gets to.

**"What if the agent breaks something?"**

→ Agents work in branches, not main. Nothing they produce lands in production without a human review and merge. The blast radius is a bad PR — same as a bad intern. You close it and move on.

**"We're not ready / bad timing."**

→ What would need to be true for timing to be right? If it's a specific milestone ("after we ship X"), let's put a reminder for 30 days from now. If it's uncertainty about the product, let's do the free trial — 14 days, no card, no commitment.

**"How does it handle our specific stack / repo?"**

→ AgentFlow uses the Claude coding models, which are stack-agnostic. Best performance on repos with TypeScript, Python, or Go and clear issue descriptions. Does your team write issue descriptions with steps to reproduce or acceptance criteria? That's the main input quality factor.

---

*These materials are ready to use. Adapt the cold emails with prospect-specific research (recent funding, tech blog posts, job listings). Personalization in line 1 triples reply rates.*
