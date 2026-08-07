# Strategy Pivot — What We Do If Outreach Doesn't Start

*CEO | 2026-08-07 | Trigger: Day 20 with zero customer contacts*

---

## The situation

Day 10. $0 MRR. Full product built. All distribution assets ready. Zero outreach sent.

Every brief, script, and checklist we've prepared requires one physical action: a human posting or sending something to a real person. That action has not happened in 10 days.

This memo defines the trigger conditions and pivot paths for each scenario. It's not a plan B — it's a decision framework for day 20 if the primary path (board-led outreach) hasn't started.

---

## Trigger: Day 20 with no customer contacts

If by 2026-08-17 we have zero outreach sent (no HN post, no LinkedIn DMs, no emails, no warm intros), activate **one** of the pivots below. Do not wait for day 30 — at that point we have only 30 days left and most B2B sales cycles are 3-4 weeks.

---

## Pivot A — GitHub Marketplace listing (recommended first)

**What:** Submit AgentFlow as a GitHub App to the [GitHub Marketplace](https://github.com/marketplace).

**Why this is different from everything else:** GitHub will surface the app organically to millions of developers. We don't write a cold DM — GitHub does the distribution. Developers browse Marketplace when they're already solving a GitHub problem (backlog management, automation).

**What it requires from the board:**
1. Go to github.com/settings/apps → select the AgentFlow GitHub App (already created)
2. Click "List on Marketplace" → fill the form (title, description, screenshots)
3. Submit for review — GitHub approves within 3-5 business days

**Assets already done:** OG image, screenshots, copy (`docs/product-hunt/README.md` has gallery images)

**Expected outcome:** 5-20 organic trials per month, zero ongoing effort after listing.

**Time investment:** 45 minutes, one time.

---

## Pivot B — Product-led free tier

**What:** Drop the credit card requirement. Make the Starter plan free for the first 30 days (not just 14). Or: launch a permanent free tier at 1 agent, 5 issues/month.

**Why:** If cold outreach is the bottleneck, the alternative is self-serve discovery. Engineers who find the product on HN or Google will convert at 10-20% on a free tier; cold outreach converts at 1-3%.

**What it requires:** One configuration change in Stripe to extend trial to 30 days (no code). Or: a product change to add a free tier (FE can ship in 1 day).

**Expected outcome:** 3x-5x trial sign-up rate once traffic arrives (still need HN post or similar for traffic).

**Tradeoff:** Foregoes $499/mo per Starter customer short-term. Worth it if it unlocks self-serve activation.

**Time investment:** 30 minutes for FE.

---

## Pivot C — Newsletter / media outreach (zero infrastructure required)

**What:** Pitch 5 developer-focused newsletters/podcasts for coverage. These require a written pitch, not a working URL.

**Target list:**

| Newsletter | Audience | Pitch angle |
|------------|----------|-------------|
| TLDR.tech | 500k+ engineers | "AI agents that close GitHub issues" |
| Console.dev | Dev tooling buyers | "New category: autonomous software agents" |
| Changelog podcast | Open source community | "Building a company with AI agents" |
| Indie Hackers | Founders + solopreneurs | "We built a SaaS company with AI agents in 10 days" |
| bytes.dev | JavaScript devs | "AI-powered GitHub automation for JS teams" |

**What it requires:** Board writes a 3-paragraph pitch email and sends it. I can pre-write all 5 pitches.

**Expected outcome:** 1-2 features → 200-2,000 sign-ups per feature. Higher quality traffic than cold outreach.

**Time investment:** 30 minutes to send 5 emails (I write the drafts).

Say the word and I'll write all 5 pitch emails in the next heartbeat.

---

## Pivot D — Raise a small pre-seed ($50K-$250K)

**What:** Approach 10 pre-seed angels for a small check to extend runway and fund a sales hire.

**Why:** If the current founders (board) can't execute distribution, the fastest fix is hiring someone who will. $100K buys 6 months of a part-time sales consultant.

**Pitch:** 10 days to build a full B2B SaaS with AI agents. Agents already running the company. First-mover in autonomous software development.

**Target investors:**
- Angels who have backed AI/dev tools: Levels.fio founder Pieter Levels, Guillermo Rauch (Vercel CEO), Zeno Rocha (Resend CEO — already on our outreach list)
- Pre-seed funds: Tiny Capital, Calm Company Fund, Basecamp Ventures

**What it requires:** 2-page deck + 5 warm emails. I can write the deck.

**Time investment:** 2 hours to write deck + 1 hour to send emails.

---

## Decision framework

```
Day 20 check:
  Have any outreach messages been sent?
    YES → Continue primary path. Update prospect-pipeline.md.
    NO  → Pick one pivot and activate today.

Which pivot?
  Can board spend 45 minutes on GitHub.com?
    YES → Pivot A (Marketplace listing). Highest leverage, zero ongoing effort.
    NO  → Are email drafts easier than DMs?
             YES → Pivot C (newsletter pitches — I write them, board sends)
             NO  → Are there investors in your network?
                      YES → Pivot D (fundraise for sales hire)
                      NO  → Pivot B (free tier, wait for organic HN traffic)
```

---

## What I'm NOT recommending

- **GitHub repo commenting** — flagging issues in other repos to pitch AgentFlow is spam and will get us banned
- **More SEO content** — SEO takes 3-6 months and won't move the needle in 50 days
- **More personalized landing pages** — we have 5 targets who haven't been contacted; building more pages without outreach is theater
- **Automated LinkedIn outreach (scraping)** — TOS violation, account risk

---

## If the board can respond to ONE thing today

Reply on ANI-17 with the answer to this question:

**What is actually blocking you from sending outreach?**

- Time constraint (when is 30 minutes available this week?)
- No LinkedIn account (let's use email instead)
- URL isn't live (use the no-URL DM from day-9-brief.md)
- Not confident in the product (let's do a dog-food run first)
- Different blocker (name it)

The answer unlocks the right path. Without it, I'm optimizing for the wrong constraint.
