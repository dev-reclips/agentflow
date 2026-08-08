# Marketplace Screenshots

**Required:** 5 screenshots at 1280×640 or larger (PNG or JPEG)  
**Source:** Convert existing HTML mockups from `docs/product-hunt/screenshots/` or capture from the live app

To generate from HTML mockups:
```bash
for f in ../product-hunt/screenshots/*.html; do
  name=$(basename "$f" .html)
  npx playwright screenshot --width=1280 --height=640 "$f" "${name}.png"
done
```

Or open each HTML file in Chrome, set viewport to 1280×640 via DevTools → Device Toolbar, then Capture Screenshot.

---

## Screenshot 1 — Dashboard Overview (`01-dashboard-overview.png`)

**Source:** `docs/product-hunt/screenshots/01-dashboard-overview.html`

**What to show:**
- Full dashboard with agent roster (3–4 agents visible)
- Stats bar: issues closed this week, active agents, PRs opened
- Sidebar with navigation: Dashboard, Issues, Agents, Analytics
- At least one agent shown as "active" with a green indicator

**GitHub Marketplace caption:**
> "The AgentFlow dashboard shows all your AI agents, their status, and how many issues they've closed this week."

---

## Screenshot 2 — Issue Assignment Flow (`02-issue-assignment.png`)

**Source:** `docs/product-hunt/screenshots/02-issue-assignment.html`

**What to show:**
- Issue detail panel on the right: title, description, labels
- Agent assignment dropdown open — showing available agents to assign
- "Assign to Agent" button prominently visible
- Issue status showing "Open" before assignment

**GitHub Marketplace caption:**
> "Assign any GitHub issue to an AI agent in one click. The agent reads the full issue, explores the codebase, and starts working."

---

## Screenshot 3 — Agent Working — Live Activity Log (`03-agent-working.png`)

**Source:** `docs/product-hunt/screenshots/03-agent-working.html`

**What to show:**
- Real-time activity log with timestamped entries:
  - "Reading issue #47..."
  - "Exploring codebase — found 3 relevant files"
  - "Writing fix in `src/auth/middleware.ts`"
  - "Running tests..."
- Agent status: "Working" with animated green dot
- Issue title visible at the top

**GitHub Marketplace caption:**
> "Watch the agent work in real time. Every step is logged — what files it read, what code it wrote, what tests it ran."

---

## Screenshot 4 — Completed Issue with PR Link (`04-pr-opened.png`)

**Source:** `docs/product-hunt/screenshots/04-pr-opened.html`

**What to show:**
- Issue status changed to "Done"
- PR link visible: "Pull request #52 opened by agentflow-bot"
- Commit list: 1–3 commits with descriptive messages
- "View PR on GitHub" button
- Time elapsed: "Completed in 4m 32s"

**GitHub Marketplace caption:**
> "The agent opens a pull request with a full description. You review, you merge. The issue closes automatically."

---

## Screenshot 5 — Analytics View (`05-analytics.png`)

**What to show** (capture from `/analytics` in the live app or build a mockup):
- Weekly bar chart: issues closed per day
- Key stats: "23 issues closed this week", "Avg. 6m per issue", "4 PRs merged"
- Agent breakdown table: which agent closed the most issues
- Month-over-month comparison if available

**GitHub Marketplace caption:**
> "Track output across all your agents. See issues closed, time per issue, and PR merge rates — all in one dashboard."

---

## Upload order on GitHub Marketplace

Upload in this order — GitHub shows them left-to-right in the gallery:

1. `01-dashboard-overview.png` — hero shot
2. `02-issue-assignment.png` — core UX
3. `03-agent-working.png` — most compelling
4. `04-pr-opened.png` — end-to-end outcome
5. `05-analytics.png` — value proof
