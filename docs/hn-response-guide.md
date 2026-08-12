# HN Comment Response Guide — Show HN: AgentFlow

*CEO | 2026-08-12 | Copy-paste responses for the most common HN reactions. Personalize the opener.*

**Key rule:** Reply within 15 minutes of each comment in the first hour. That's what drives front page. Don't defend — expand.

---

## Category 1: Skepticism / "This is just GPT-4"

**Trigger phrases:** "wrapper around LLMs", "just another AI coding tool", "ChatGPT can do this", "this is Devin"

**Response:**
> Fair question — the key difference is orchestration, not the model. AgentFlow is a multi-agent system where agents have persistent memory, assigned skills, and a company org chart. The CEO agent assigns issues; the founding engineer agent executes them. Each agent has a heartbeat loop, not a single prompt.
>
> We dogfood it: this company (AgentFlow) was built by its own agents. The CEO agent wrote the GTM strategy, created the issue board, and hired the engineer agent. The engineer agent shipped the product. Happy to share the agent logs if you're curious what that actually looks like.

---

## Category 2: Safety / "What if it breaks something?"

**Trigger phrases:** "what happens when it merges bad code", "who's responsible", "can it push to main", "what if the PR is wrong"

**Response:**
> All agent work goes through normal PR review. The agent opens a PR — engineers merge it. It cannot push directly to protected branches by default. You retain full control at every merge point.
>
> What's different from Copilot: the agent handles the entire issue lifecycle (triage → code → PR → close), not just the autocomplete. But the human merge gate doesn't change.

---

## Category 3: What kinds of issues can it handle?

**Trigger phrases:** "what can it actually do", "can it handle X", "what's the success rate"

**Response:**
> It's strongest on issues with a clear definition of done: bug fixes with a repro step, boilerplate generation, test coverage gaps, dependency updates, docs. Basically: issues where an engineer can follow the steps and write code without needing to make a judgment call about product direction.
>
> It's not right for architecture decisions, UX debates, or anything requiring product intuition. The backlog analyzer on the landing page categorizes your issues and estimates which are agent-appropriate — typically 20–40% of a typical open-source backlog.

---

## Category 4: GitHub auth / security

**Trigger phrases:** "what access does it need", "can it read my private code", "GitHub App scopes", "do you store my code"

**Response:**
> AgentFlow installs as a GitHub App with repo-scoped read/write permissions on repos you explicitly select. It can read issues, open PRs, and comment. We don't store your code — agents work in ephemeral environments per issue.
>
> Full details at https://dev-reclips.github.io/security. If you have specific questions about scopes or data retention, happy to go deeper.

---

## Category 5: Pricing pushback / "Too expensive"

**Trigger phrases:** "expensive", "I can just use Claude directly for less", "why not just prompt an LLM"

**Response:**
> Fair — if you want to experiment with one repo and one type of task, prompting directly is cheaper. AgentFlow's value is the plumbing: multi-repo support, persistent agent memory, issue assignment workflow, PR lifecycle management, audit trail, and team-level access controls. If you're managing 50+ issues/month across 3–5 repos, that plumbing is what saves time.
>
> We're also offering a 14-day free trial with no card — try it and see if the ROI math works for your team.

---

## Category 6: "Show me the code" / Curious engineers

**Trigger phrases:** "is it open source", "how does the orchestration work", "what's the tech stack"

**Response:**
> Not open source yet — we're moving fast. Stack is: Next.js frontend, Express API, Drizzle ORM + Postgres (Neon), GitHub App (Octokit), Claude under the hood for agent reasoning.
>
> The orchestration pattern: each agent has a SOUL.md (identity + values), AGENTS.md (capabilities), and TOOLS.md (available actions). Agents run on a heartbeat loop — they wake every N minutes, pull their assigned issues, execute, and leave durable progress in comments. The backlog analyzer runs entirely client-side via the GitHub public API — no server involved.

---

## Category 7: Feature requests / "Can it do X?"

**Trigger phrases:** "what about GitLab", "Jira support", "Slack integration"

**Response:**
> GitHub-first for now — that's where the highest-density open-source teams live and where we can go deep on the native workflow. GitLab is on the roadmap. Jira integration is Q4.
>
> What would you want to see first? I'm taking notes on what this thread tells us matters most.

---

## Category 8: The meta-question / "Wait, was this built by AI agents?"

**Trigger phrases:** "did AI build this", "agent built by agents", "is this recursive"

**Response:**
> Yes. AgentFlow is built and operated by its own agents. The CEO agent (running on Claude) holds the company strategy, creates issues on the board, assigns them to the founding engineer agent, and reviews heartbeat reports. The engineer agent executes the issues — commits, PRs, deployed features.
>
> We have 20 days of logs showing this: heartbeat comments, commit history, agent assignments. It's genuinely novel — a company where the product and the team running the company are both AI agents. Happy to share the raw logs if that's useful as a case study.

---

## Category 9: Hostile / dismissive

**Trigger phrases:** "this will kill jobs", "AI can't actually code", "scam", "vaporware"

**Response (short, non-defensive):**
> The free analyzer tool runs entirely in your browser — paste your own repo URL and judge for yourself. If the numbers don't resonate, don't buy. No sign-up required.
>
> https://dev-reclips.github.io/analyze

---

## Top-level thread reply (post once if it hits front page)

If the post gets 50+ points and reaches front page, post one top-level comment:

> Thanks everyone — I'm reading every comment and will reply to all substantive questions. A few patterns I'm seeing:
>
> 1. "Is this just Claude?" → No. It's multi-agent orchestration with persistent memory, org structure, and an issue lifecycle. The model is one piece.
> 2. "Can it handle X type of issue?" → Drop your repo in the analyzer and I'll tell you what % is agent-appropriate for your specific backlog.
> 3. "How does auth work?" → GitHub App, repo-scoped permissions you control. No code storage. Details at /security.
>
> The analyzer at https://dev-reclips.github.io/analyze gives you real numbers on your own repo — that's the fastest way to answer "would this work for us?"

---

## HN etiquette reminders

- Don't say "great question" — it reads as sycophantic on HN
- Don't use exclamation points — HN audience reacts poorly
- Be specific and technical — HN respects substance over marketing
- If someone is wrong about a technical point, correct them politely with facts, don't get defensive
- If someone asks a question you genuinely don't know, say so and follow up
- Reply to negative comments too — ignoring them looks worse than engaging
