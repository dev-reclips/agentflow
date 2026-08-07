# Demo Script — 20-Minute AgentFlow Demo

*CEO | 2026-08-07 | Use this the moment a prospect says "yes" to a call*

---

## Before the Call (10 min prep)

1. Open the demo account at `https://[prod-url]/demo` (seeded account with synthetic data — ANI-22)
2. Load the prospect's GitHub repo in another tab
3. Have their personalized landing page open: `https://anirudhekbote.github.io/agentflow/lp/[slug]/`
4. Know their pain: open issue count, main bottleneck from their public GitHub/LinkedIn

**Per-prospect prep:**

| Prospect | Open Issues | Pain Hook | LP URL |
|----------|-------------|-----------|--------|
| Trigger.dev (James) | 800+ | Job queue edge cases, maintainer bandwidth | `/lp/trigger-dev/` |
| Mintlify (Han) | 100+ | Doc sync drift, PR reviews for docs PRs | `/lp/mintlify/` |
| Cal.com (Peer) | 500+ | Community issues going stale, integration bugs | `/lp/cal/` |
| Resend (Zeno) | 200+ | API edge cases, SDK maintenance | `/lp/resend/` |
| Loops (Chris) | 50+ | Customer-reported bugs, backlog velocity | `/lp/loops/` |

---

## The Call (20 min total)

### Min 0–3: Discovery (talk less, listen more)

Open with:
> "Before I walk you through anything, I want to make sure this is relevant to you. What does your current workflow look like for handling GitHub issues — who triages them, who closes them, what falls through the cracks?"

Let them talk. Listen for:
- **Volume pain** → "We have 200 open issues and 3 engineers"
- **Triage pain** → "Half our time is just figuring out what to work on"
- **Repeat work pain** → "Same kinds of bugs keep coming in"
- **Velocity pressure** → "We're behind roadmap because of maintenance work"

If they mention one of these, flag it: *"That's exactly what we built AgentFlow to solve."*

**If they seem skeptical about AI closing real issues:** Don't over-explain. Say *"I'll show you a real example in 2 minutes."*

---

### Min 3–15: Product Walk (show, don't tell)

**Step 1: Connect GitHub (30 sec)**
> "AgentFlow connects to your GitHub org with a single OAuth click. One permission, read-write on issues and PRs. Takes 30 seconds."

Show the GitHub connect flow on screen.

**Step 2: The Backlog View (1 min)**
> "Once connected, AgentFlow pulls in your open issues and classifies them automatically — bug, feature request, dependency update, documentation gap. This is the work queue."

Show the demo account's backlog. Point out the labels and priority scores.

**Step 3: Agent closes an issue — live (5 min)**
> "Watch this. I'm going to pick an open issue and have an agent close it."

Pick a small, concrete demo issue (pre-staged in the demo account — a missing type annotation or a simple bug). Click "Assign to Agent."

Walk them through:
1. Agent reads the issue → surfaces context from codebase
2. Agent writes a diff → shows them the code change
3. Agent opens a PR → linked to the original issue
4. PR passes CI → ready to merge

Say: *"That took 90 seconds. Your engineer would have spent 45 minutes on that — reading the issue, finding the right file, writing the fix, opening the PR, waiting for CI."*

**Step 4: The ROI framing (2 min)**
> "If your team closes 10 issues a week manually, and each takes an average of 1.5 hours, that's 15 engineer-hours a week. At fully-loaded $200/hr, that's $3,000/week in engineering time on backlog maintenance alone. AgentFlow at $1,499/mo pays for itself in 2 weeks."

Show the ROI calculator on the pricing page (ANI-28).

**Step 5: Safety controls (1 min)**
> "Agents never merge without a human approval step — you configure whether PRs auto-merge or require review. Full audit trail on every action."

Show the agent activity log.

---

### Min 15–18: Handle Objections

**"Will it mess up our codebase?"**
> "Every change is a PR — you review it before it merges. Agents can't push directly to main. Think of it as a very fast, very tireless junior engineer who always opens PRs."

**"What kinds of issues can it actually close?"**
> "Best fit: bug fixes with clear reproduction steps, documentation updates, dependency bumps, type errors, test coverage gaps. Not a fit yet: architectural decisions, new features requiring product thinking. That's ~60% of most backlogs."

**"How does it know our codebase?"**
> "It indexes your repo on connect. Every file, every function. When it reads an issue, it knows exactly which files are relevant — it doesn't guess."

**"We're on [other tool] already."**
> "Those tools suggest what to type. AgentFlow closes the ticket. The output is a merged PR, not a code suggestion."

**"How secure is it?"**
> "GitHub OAuth, read-write scoped only to your org. We never store your source code permanently. Full privacy policy at [url]/security."

---

### Min 18–20: Close

**If it went well:**
> "Based on what you told me — [their pain] — I think you'd see results in week one. We can start with a 14-day free trial on the Growth plan. No credit card upfront. Want to start now while we're on the call?"

**Trial setup:** Walk them through sign-up live. Takes 5 minutes.

**If they're unsure:**
> "What would need to be true for you to try this for two weeks?"

Let them name the objection. Address it. Then reclose.

**If they want to talk to the team:**
> "Happy to set that up. Who else needs to be in the room? I'll send you a calendar link."

---

## After the Call (within 24 hours)

1. **Send a follow-up email** (use the drip sequence from `docs/gtm-sales-materials.md`)
2. **Update `docs/prospect-pipeline.md`** — move status from "Target" to "Demo Done"
3. **Comment on ANI-17** with the outcome so I can track and advise next steps

---

## Closing Benchmarks

| Outcome | What to do |
|---------|-----------|
| Trial started on call | Win. Monitor activation for 48 hours. |
| "Send me more info" | Send follow-up email within 1 hour + a 3-day drip |
| "Talk to [other person]" | Schedule next call within 48 hours |
| "Not now" | Ask "what would change?" + add to 90-day drip |
| "Not for us" | Disqualify. Ask for referral. |

**Close rate target:** 20% of demos → trial. 50% of trials → paid. At 5 demos: 1 trial starter, 0.5 paid. Need 14 demos for 3 customers → need 70 outreach contacts (assuming 20% reply rate to get demos).
