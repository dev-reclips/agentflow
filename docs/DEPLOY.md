# Production Deployment Runbook

**Goal:** Get agentflow.ai live. The marketing site is a static Next.js export deployed via GitHub Pages with a custom domain. Estimated one-time setup: 45–60 min.

---

## Architecture

| Component | Host | Workflow |
|-----------|------|----------|
| Marketing site (agentflow.ai) | GitHub Pages | `.github/workflows/deploy-pages.yml` |
| API (future) | Railway | `.github/workflows/deploy.yml` |

For now, only the marketing site matters for outreach traffic.

---

## One-Time Setup (do this once, then CI handles everything)

### Step 1 — Enable GitHub Pages

1. Go to [github.com/dev-reclips/agentflow](https://github.com/dev-reclips/agentflow) → **Settings → Pages**.
2. Under **Source**, select **GitHub Actions** (not "Deploy from a branch").
3. Save.

### Step 2 — Add GitHub Secret: Formspree

The email capture form on the site requires a Formspree form ID.

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form — name it "AgentFlow Waitlist".
3. Copy the form ID (looks like `xdoqpwkr`).
4. Go to GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**:
   - Name: `FORMSPREE_FORM_ID`
   - Value: the form ID

### Step 3 — Configure DNS for agentflow.ai

Log in to your domain registrar (wherever agentflow.ai is registered) and add:

**A records (apex domain):**
```
agentflow.ai  A  185.199.108.153
agentflow.ai  A  185.199.109.153
agentflow.ai  A  185.199.110.153
agentflow.ai  A  185.199.111.153
```

**AAAA records (IPv6):**
```
agentflow.ai  AAAA  2606:50c0:8000::153
agentflow.ai  AAAA  2606:50c0:8001::153
agentflow.ai  AAAA  2606:50c0:8002::153
agentflow.ai  AAAA  2606:50c0:8003::153
```

**CNAME for www redirect:**
```
www.agentflow.ai  CNAME  dev-reclips.github.io
```

DNS propagation: 5 min to 48 h depending on registrar. Use `dig agentflow.ai` to confirm.

### Step 4 — Set Custom Domain in GitHub Pages

1. After DNS propagates, go back to GitHub **Settings → Pages**.
2. Under **Custom domain**, enter `agentflow.ai` and click Save.
3. Check **Enforce HTTPS** (may take a few minutes after domain is verified).

### Step 5 — Trigger First Deploy

```bash
# Push any commit to main, or manually trigger:
gh workflow run deploy-pages.yml
```

Or go to **Actions → Deploy Marketing Site to GitHub Pages → Run workflow**.

---

## How CI Handles Everything After Setup

Every push to `main` automatically:
1. Installs deps, builds the static site with `NEXT_PUBLIC_SITE_URL=https://agentflow.ai`
2. Uploads the `packages/web/out/` artifact
3. Deploys to GitHub Pages

The `CNAME` file in `packages/web/public/CNAME` tells GitHub Pages to serve the custom domain — do not delete it.

---

## Verification Checklist

After setup:

- [ ] `curl -I https://agentflow.ai` returns `HTTP/2 200`
- [ ] `https://agentflow.ai` loads the marketing site
- [ ] `https://www.agentflow.ai` redirects to `https://agentflow.ai`
- [ ] OG image shows in Slack/Twitter preview (use [opengraph.xyz](https://www.opengraph.xyz))
- [ ] Email form submission reaches Formspree inbox

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Site still 404 after deploy | Check Actions tab — did the deploy workflow run and succeed? |
| HTTPS cert not issued | Custom domain must be set in GitHub Pages settings *after* DNS propagates |
| `CNAME` resets to empty in GitHub settings | The `CNAME` file in `public/` prevents this — it sets the domain on every deploy |
| Email form silently fails | Verify `FORMSPREE_FORM_ID` secret is set in GitHub repo secrets |
| OG image broken | Run a fresh build; `NEXT_PUBLIC_SITE_URL` must be set at build time |

---

## Future: API Deployment (Railway)

When ready to deploy the API backend:

1. Create a Railway project at [railway.app](https://railway.app).
2. Add a PostgreSQL service in Railway.
3. Add these secrets to GitHub:
   - `RAILWAY_TOKEN` — from Railway account settings
   - `DATABASE_URL` — from Railway PostgreSQL service
4. The `deploy.yml` workflow handles API deploys automatically on push to `main`.
