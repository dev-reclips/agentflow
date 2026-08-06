# /analyze Tool Distribution Strategy

The `/analyze` free tool is live at agentflow.dev/analyze. It shows any public GitHub repo's backlog cost estimate in seconds — no sign-up required.

This document is a ready-to-execute distribution plan. Each action is self-contained and can be done in 5-15 minutes.

---

## Why this tool distributes well

- Engineers value instant ROI clarity ("your backlog costs $47K/year")
- No sign-up friction → high completion rate
- Shareable result → viral loop (ANI-43 adds URL sharing)
- Relevant to any engineering team with a GitHub backlog

---

## Priority 1: Hacker News (Today, 9-11am EST)

**Show HN: GitHub Backlog Analyzer — paste a repo URL, see what your backlog costs**

Post to: https://news.ycombinator.com/submit

```
Title: Show HN: GitHub Backlog Analyzer – paste a repo URL, see what your backlog costs

URL: https://agentflow.dev/analyze

Text (optional):
Built a free tool that estimates the engineering cost of your GitHub backlog in seconds.

Paste any public repo URL → it pulls open issues, estimates resolution time by type, and shows you the annual cost of toil.

No sign-up. No install. Just paste and go.

Built this as a free add-on to AgentFlow (we automate issue resolution with AI agents). Happy to answer questions about the methodology.
```

Best time: 9am-11am EST on a weekday (Mon-Thu). Thursday works.

---

## Priority 2: Reddit — r/programming, r/devops, r/MachineLearning

**r/programming** (1.2M members):

```
Title: I built a free tool that estimates the engineering cost of your GitHub backlog

I was curious how much open GitHub issues actually cost teams in engineering time. Built a tool to find out.

Paste any public GitHub repo URL → it pulls all open issues, estimates resolution time by category (bug, feature, docs, etc.), and gives you an annual cost estimate.

Try it: agentflow.dev/analyze

Free, no sign-up. Built it as a companion to AgentFlow but the analyzer is standalone.
```

**r/devops** (1.1M members):

```
Title: Free tool: GitHub backlog cost analyzer — see what your open issues cost per year

Relevant for teams trying to justify automation spend or surface backlog debt to leadership.

agentflow.dev/analyze — paste a public repo, get a cost breakdown.

No auth required.
```

Post to both in the same session.

---

## Priority 3: LinkedIn post (Engineering Leaders)

Target audience: Engineering Managers, VPs of Engineering, CTOs

```
Most engineering teams have no idea what their GitHub backlog actually costs.

Not in technical debt terms. In dollars.

I built a free tool to find out: paste a public GitHub repo URL and get an estimate of your annual backlog cost in seconds.

→ agentflow.dev/analyze

No sign-up. Works on any public repo.

(Built this for AgentFlow — we're working on automating issue resolution with AI agents. The analyzer is standalone and free.)

What's your team's backlog cost? Share your repo and I'll post the result.
```

---

## Priority 4: Twitter/X thread

```
Tweet 1:
Most engineering teams have a GitHub backlog worth $40K-200K/year in engineering time. They just don't know it.

I built a free tool to find out. Thread 🧵

Tweet 2:
Paste any public GitHub repo URL → instant backlog cost estimate.

- Pulls all open issues
- Estimates resolution time by type  
- Converts to annual engineering cost

No login. No install. Just paste.

agentflow.dev/analyze

Tweet 3:
The insight that shocked me: the average GitHub repo with 200+ open issues has ~$80K/year in unresolved engineering work.

That's 1 mid-level engineer. Or ~$400/mo in AI automation (our product lol).

Tweet 4:
Try it on any popular OSS repo:
- facebook/react
- vercel/next.js
- microsoft/vscode

Then try it on your own work repo. The gap between the two is your backlog debt.

Tweet 5:
Built this as a free companion to AgentFlow (we automate GitHub issue resolution with AI agents).

The analyzer is standalone and free forever.

agentflow.dev/analyze
```

---

## Priority 5: Developer Slack/Discord communities

Communities to post in (use a genuine, non-spammy tone):

- **Rands Leadership Slack** (`#tools` channel) — engineering leaders
- **Software Engineering Daily Slack** (`#tools-and-resources`)
- **DevRel collective Discord** (`#tools`)
- **YC Alumni Slack** (if you have access) — `#tools`

Template:

```
Hey all — built a free tool that calculates what your GitHub backlog costs in engineering time/dollars. No sign-up, just paste a public repo URL.

agentflow.dev/analyze

Would love feedback on the cost model if anyone tries it.
```

---

## Tracking

After each post, watch:
- `/analyze` page sessions in PostHog
- Email captures (ANI-43, once shipped)
- Trial sign-ups

If HN post hits top 10: send immediate LinkedIn follow-up mentioning the HN traction.
