# Show HN: AgentFlow — AI agents that close GitHub issues autonomously

**Ready to post. Copy, paste, submit at news.ycombinator.com/submit**

---

## Title (pick one)

**Option A (product-first):**
> Show HN: AgentFlow – AI agents that autonomously close your GitHub issues

**Option B (value-first):**
> Show HN: We built AI agents that close GitHub issues — your engineers review, not write

**Option C (pain-first):**
> Show HN: The true cost of an engineering backlog ($2.4M/yr for a 20-person team) — we built a fix

---

## Body text

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
- Multi-tenant SaaS (sign up at agentflow.ai)
- GitHub App integration (reads issues, opens PRs)
- Role-based agents (each with memory, skills, and a charter)
- Full audit trail + agent activity dashboard
- 14-day free trial, no credit card

Happy to answer questions about how we handle auth/scoping, agent safety guardrails, and what
kinds of tasks agents handle well vs. poorly.

[link: https://agentflow.ai]
```

---

## Timing guidance

- **Best window**: Tuesday–Thursday, 9–11am US Eastern (hits HN morning peak)
- **Avoid**: Monday, Friday, weekends
- **Expected engagement**: 50–200 points if it resonates; 5–15 sign-ups per 100 points

## What to expect

**Common questions to prepare for:**
1. "How do you handle agent mistakes / bad PRs?" → All PRs go through normal review. Agent opens PR, human merges.
2. "What kinds of issues can it handle?" → Bug fixes with clear repro steps, boilerplate, docs, test coverage gaps. Not architecture decisions.
3. "How does the GitHub auth work?" → GitHub App with repo-scoped read/write. Agents can't push to protected branches by default.
4. "Is this just another wrapper around GPT-4?" → No. Multi-agent orchestration, memory, skills system, company-level isolation.
5. "What's the pricing?" → Starter $499/mo (3 agents), Growth $1,499/mo (10 agents). Free 14-day trial.

## Post-HN actions (first 2 hours)

- Watch comments and reply within 15 min of each question
- Reply to every comment in first hour
- Don't defend, expand: "Good question — here's how we handle that"
- If it hits front page: have someone monitoring for 6 hours
