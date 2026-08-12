# Show HN: AgentFlow — AI agents that close GitHub issues autonomously

**Ready to post. Copy, paste, submit at news.ycombinator.com/submit**

---

## RECOMMENDED: Lead with the free tool (Option D)

The `/analyze` free tool (shipped 2026-08-06) is a stronger HN hook than the product itself.
HN users can try it in 30 seconds on any public repo — no sign-up required. The trial CTA
appears after they see their own repo's data. Use Option D first.

**Note:** The analyze tool runs entirely in the browser against GitHub's public API. It works
at dev-reclips.github.io right now — no backend required.

**Title:**
> Show HN: Free tool — paste any GitHub repo URL and see what your backlog costs in engineer hours

**Body text:**
```
We built a free GitHub backlog cost estimator to understand where engineering time actually goes.

Try it: https://dev-reclips.github.io/analyze

Paste any public GitHub repo URL. It fetches your open issues, maps them to categories (bugs,
docs, enhancements, dependencies, tests), applies per-category hour estimates, and shows:
- Total open issues
- Issues an AI agent could handle autonomously
- Hours and cost per month you're spending on backlog toil

No sign-up. Works on any public repo. Results in a few seconds.

---

We built this because we kept watching good engineering teams spend 30–40% of time on mechanical
work — bugs, boilerplate, docs, dependencies — that doesn't actually require their judgment.

AgentFlow connects to your GitHub repos and runs AI agents that close those issues. You assign
an issue to an agent the same way you'd assign it to an engineer. The agent writes the fix,
opens a PR, and closes the ticket. Engineers review PRs, not write them.

Starter plan is $499/mo (3 agents), Growth is $1,499/mo (10 agents). 14-day free trial, no card.

Happy to answer questions about how we handle auth, safety guardrails, and what kinds of issues
agents handle well vs. poorly.

[link: https://dev-reclips.github.io/analyze]
```

---

## Alternative titles (if Option D doesn't feel right)

**Option A (product-first):**
> Show HN: AgentFlow – AI agents that autonomously close your GitHub issues

**Option B (value-first):**
> Show HN: We built AI agents that close GitHub issues — your engineers review, not write

**Option C (pain-first):**
> Show HN: The true cost of an engineering backlog ($2.4M/yr for a 20-person team) — we built a fix

---

## Original body text (for Options A–C)

```
We built AgentFlow because we kept watching good engineers spend 30–40% of their time on
mechanical work: triage bugs, write boilerplate, respond to issues, update docs.

AgentFlow connects to your GitHub repos and runs AI agents that:
- Pick up assigned issues from your board
- Write the fix or feature
- Open a PR with tests
- Comment the result back on the original issue

Engineers review PRs, not write them. The agent closes the issue.

We're targeting teams where engineering time costs more than it should — typically 10–50 person
eng orgs where a senior engineer spends 15+ hours/week on work that doesn't require their judgment.

At a blended eng cost of $150/hr, that's $2.4M/year in reclaimed capacity for a 20-person team.
AgentFlow Growth plan is $1,499/mo.

We've shipped:
- Multi-tenant SaaS (sign up at https://dev-reclips.github.io/)
- GitHub App integration (reads issues, opens PRs)
- Role-based agents (each with memory, skills, and a charter)
- Full audit trail + agent activity dashboard
- 14-day free trial, no credit card

Happy to answer questions about how we handle auth/scoping, agent safety guardrails, and what
kinds of tasks agents handle well vs. poorly.

[link: https://dev-reclips.github.io/]
```

---

## Timing guidance

- **Best window**: Tuesday–Thursday, 9–11am US Eastern (hits HN morning peak)
- **Avoid**: Monday, Friday, weekends
- **Expected engagement**: 50–200 points if it resonates; 5–15 sign-ups per 100 points

## What to expect

**Common questions — analyzer tool (will dominate since that's the hook):**
1. "How does the analyzer work technically?" → Fetches open issues from GitHub's public API (no auth needed), maps issue labels to standard categories (bug, enhancement, documentation, etc.), applies per-category hour estimates, shows total cost at $100/hr. All runs in the browser — no server involved, no data stored.
2. "Why does my repo show 0 or very few issues?" → Your repo may not use standard GitHub labels (bug, enhancement, documentation). The tool falls back to estimating ~30% of open issues as agentable. Add standard labels and rerun for exact numbers.
3. "I'm getting a rate limit error" → GitHub's unauthenticated API allows 60 requests/hour per IP. Under high traffic or if you ran it several times quickly, you'll hit this. Try again in a minute, or sign up (free trial) to use authenticated requests.
4. "Can it analyze private repos?" → The free tool is public repos only (GitHub's unauthenticated API). AgentFlow itself works with private repos via GitHub App installation.
5. "The issue count looks wrong / too high" → For repos with 300+ open issues, the tool estimates the total using the GitHub pagination header and scales the category breakdown proportionally. The estimate is within ~10-20% of the true count.

**Common questions — product:**
6. "How do you handle agent mistakes / bad PRs?" → All PRs go through normal review. Agent opens PR, human merges.
7. "What kinds of issues can it handle?" → Bug fixes with clear repro steps, boilerplate, docs, test coverage gaps. Not architecture decisions.
8. "How does the GitHub auth work?" → GitHub App with repo-scoped read/write. Agents can't push to protected branches by default.
9. "Is this just another wrapper around GPT-4?" → No. Multi-agent orchestration, memory, skills system, company-level isolation.
10. "What's the pricing?" → Starter $499/mo (3 agents), Growth $1,499/mo (10 agents). Free 14-day trial.

## Post-HN actions (first 2 hours)

- Watch comments and reply within 15 min of each question
- Reply to every comment in first hour
- Don't defend, expand: "Good question — here's how we handle that"
- If it hits front page: have someone monitoring for 6 hours
