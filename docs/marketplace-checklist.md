# GitHub Marketplace Submission Checklist

**Estimated time:** 45 minutes  
**Prerequisite:** GitHub App already created and live ✓  
**Reference doc:** `docs/github-marketplace-listing.md` — open it side by side

---

## Before you start

- [ ] Open `docs/github-marketplace-listing.md` in a text editor so you can copy-paste
- [ ] Have the AgentFlow GitHub App screenshots ready (see `docs/marketplace-screenshots/`)
- [ ] Log into GitHub as the account that owns the AgentFlow GitHub App
- [ ] Have your Stripe plan IDs handy (or use the listing doc's pricing details)

---

## Step 1 — Navigate to the GitHub App

1. Go to [github.com/settings/apps](https://github.com/settings/apps)
2. Find **AgentFlow** in the list and click **Edit**
3. In the left sidebar, click **"List on Marketplace"**

If you don't see "List on Marketplace", the app needs to meet GitHub's requirements first — see the Troubleshooting section at the bottom.

---

## Step 2 — Fill in the listing form

Work through each section. All copy is in `docs/github-marketplace-listing.md`.

### Basic info
- [ ] **App name:** `AgentFlow`
- [ ] **Tagline:** `Your GitHub backlog, on autopilot` *(paste from listing doc — max 40 chars)*
- [ ] **Short description:** paste the 100-char description from the listing doc
- [ ] **Long description:** paste the full Markdown block from the listing doc
- [ ] **Website URL:** `https://agentflow.ai`
- [ ] **Support URL:** `https://agentflow.ai/support`

### Categories
- [ ] Select **Code review** as primary category
- [ ] Add secondary categories: **Project management**, **Testing**, **Utilities**

### Pricing
- [ ] Click **"Set up a plan"**
- [ ] Add **Free** plan: $0/month, 1 agent, 5 issues/month
- [ ] Add **Starter** plan: $499/month, 14-day trial, copy bullets from listing doc
- [ ] Add **Growth** plan: $1,499/month, 14-day trial, copy bullets from listing doc

### Screenshots (upload in order)
Upload the 5 screenshots from `docs/marketplace-screenshots/`. GitHub accepts PNG or JPEG, 1280×640 minimum.

- [ ] Screenshot 1: Dashboard overview (hero shot)
- [ ] Screenshot 2: Issue assignment flow
- [ ] Screenshot 3: Agent working — live activity log
- [ ] Screenshot 4: Completed issue with PR link
- [ ] Screenshot 5: Analytics / metrics view

### Permissions review
GitHub will auto-detect the permissions from the app configuration. Verify these are listed:
- [ ] Issues: Read & Write
- [ ] Pull requests: Read & Write
- [ ] Contents: Read & Write
- [ ] Metadata: Read-only
- [ ] Checks: Read & Write

---

## Step 3 — Submit for review

- [ ] Review the preview of your listing — check for typos
- [ ] Click **"Submit for review"**
- [ ] GitHub will email confirmation within a few minutes

**Review timeline:** GitHub typically approves within **3–5 business days**. They may request changes to screenshots or description clarity.

---

## Step 4 — After approval

- [ ] GitHub will email when the listing goes live
- [ ] Visit [github.com/marketplace/agentflow](https://github.com/marketplace/agentflow) to confirm it's live
- [ ] Share the Marketplace URL in the team Slack / Paperclip board
- [ ] Monitor the GitHub App install webhook for new sign-ups

---

## Troubleshooting

### "List on Marketplace" option missing
The GitHub App must meet these requirements:
1. Must have a public homepage URL set
2. Must have a privacy policy URL
3. Must have a support email or URL
4. The app owner's email must be verified

Fix: Go to the app's basic settings and add any missing URLs.

### GitHub rejects the listing
Common rejection reasons:
- Screenshots don't show real app functionality (HTML mockups may be flagged — convert to actual screenshots)
- Description is too vague or sounds like marketing copy without substance
- App permissions requested exceed what the description explains

Fix: Address reviewer comments and resubmit — GitHub allows unlimited resubmits.

### Pricing not showing
GitHub Marketplace billing requires a verified payment account linked to your GitHub org.  
Fix: Go to github.com/settings/billing → add a payment method if missing.

---

## What to expect after listing

| Timeframe | Expected activity |
|-----------|-------------------|
| Week 1 | 0–5 organic installs (listing needs time to index) |
| Month 1 | 5–20 installs from search + GitHub's "Recommended" algorithm |
| Month 3 | Steady 10–30 installs/month if reviews are positive |

The listing compounds over time. One good review can drive installs for months.
