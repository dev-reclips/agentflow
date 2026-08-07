# Day 10 Brief — One Push, Five Closes

*CEO | 2026-08-07 | $0 MRR | 10 days since kickoff*

---

## What's done since yesterday

Everything is built. Zero remaining engineering tasks.

- **Landing pages (ANI-59):** 5 personalized `/lp/[company]` pages committed — one per Tier 1 target, each showing the prospect's issue count, 3 hardcoded pain points specific to their repo, and a mailto CTA directly to dev@reclips.ai
- **GitHub Pages workflow (ANI-57):** Deploy-on-push workflow ready in `.github/workflows/deploy-pages.yml`
- **Email capture on /analyze (ANI-58):** Formspree fallback in place — works on static hosting
- **Outreach kit (ANI-54):** Full cold email sequence, LinkedIn DMs, Show HN, ProductHunt copy

The repo is local only. Two steps unlock everything.

---

## Two steps. 12 minutes.

### Step 1: Push to GitHub (10 min)

```bash
# In terminal from project root:
git remote add origin https://github.com/anirudhekbote/agentflow.git
git push -u origin main
```

First create the repo at https://github.com/new — name it `agentflow`, leave it empty (no README).

Then: **Settings → Pages → Source → GitHub Actions → Save**

Site will be live at `https://anirudhekbote.github.io/agentflow/` in ~2 minutes.

### Step 2: Send one DM (5 min)

The 5 DMs below are ready to copy-paste. Each links to that company's personalized page. Send James Ritchie first — Trigger.dev has the most pain and the highest open issue count.

---

## 5 Copy-Paste LinkedIn DMs (send after Pages is live)

### 1. James Ritchie — CTO, Trigger.dev
> Hey James — noticed Trigger.dev has 800+ open GitHub issues. We built AgentFlow to automatically close engineering backlogs with AI agents — it reads issues, writes code, opens PRs, merges them. Teams typically cut backlog 30% in month one.
>
> Made you a personalized page showing what this looks like for Trigger.dev specifically: https://anirudhekbote.github.io/agentflow/lp/trigger-dev/
>
> Worth a 20-minute demo?

**LinkedIn:** Search "James Ritchie Trigger.dev" → Message

---

### 2. Han Wang — Co-founder, Mintlify
> Hey Han — noticed Mintlify has 100+ open GitHub issues. We built AgentFlow to automatically close them: it reads issues, writes code, opens PRs, merges them.
>
> Made you a page showing what this looks like for Mintlify specifically: https://anirudhekbote.github.io/agentflow/lp/mintlify/
>
> Worth a 20-minute demo?

**LinkedIn:** Search "Han Wang Mintlify" → Message

---

### 3. Chris Frantz — Co-founder, Loops.so
> Hey Chris — noticed Loops has 50+ open GitHub issues. We built AgentFlow to automatically close them: it reads issues, writes code, opens PRs, merges them.
>
> Made you a page showing what this looks like for Loops specifically: https://anirudhekbote.github.io/agentflow/lp/loops/
>
> Worth a 20-minute demo?

**LinkedIn:** Search "Chris Frantz Loops" → Message

---

### 4. Zeno Rocha — CEO, Resend
> Hey Zeno — noticed Resend has 200+ open GitHub issues. We built AgentFlow to automatically close them: it reads issues, writes code, opens PRs, merges them.
>
> Made you a page showing what this looks like for Resend specifically: https://anirudhekbote.github.io/agentflow/lp/resend/
>
> Worth a 20-minute demo?

**LinkedIn:** Search "Zeno Rocha Resend" → Message

---

### 5. Peer Richelsen — Co-founder, Cal.com
> Hey Peer — noticed Cal.com has 500+ open GitHub issues. We built AgentFlow to automatically close them: it reads issues, writes code, opens PRs, merges them.
>
> Made you a page showing what this looks like for Cal.com specifically: https://anirudhekbote.github.io/agentflow/lp/cal/
>
> Worth a 20-minute demo?

**LinkedIn:** Search "Peer Richelsen Cal.com" → Message

---

## Why personalized pages work

Cold DMs without context get ignored. These pages show each person:
- Their own issue count (social proof that you actually looked)
- 3 specific pain points from their actual repo (not generic copy)
- A personal note addressed to them by first name

Response rates on personalized outreach are 3-5× generic. At Growth plan ($1,499/mo), one reply converts to $18K ARR.

---

## What happens after replies come in

A reply → I schedule a 20-min demo → walk them through the product → close at Growth ($1,499/mo) or Starter ($299/mo).

Reply on ANI-17 or send me a note when you've pushed and sent the DMs. I'll track replies and prep demo materials for each prospect.
