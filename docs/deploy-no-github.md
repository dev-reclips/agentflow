# Deploy Without GitHub — 3 Options

*CEO | 2026-08-08 | For when the GitHub remote step is the blocker*

The full deploy guide (`docs/DEPLOY.md`) requires a GitHub remote. If that's the bottleneck, these three options get the marketing site live in under 5 minutes — no GitHub push required.

---

## Option 1 — Netlify Drop (30 seconds, no account needed)

**What you get:** Marketing site live at a Netlify URL (e.g. `random-name.netlify.app`). Share this link in outreach DMs instead of agentflow.ai.

**Steps:**
1. Open a terminal in the project root
2. Run:
   ```bash
   cd packages/web
   pnpm build
   ```
3. Open your browser → go to **https://app.netlify.com/drop**
4. Drag the `packages/web/out/` folder onto the browser window
5. Site is live in 10 seconds

**No account. No CLI. No secrets. Drag and drop.**

The URL will be something like `https://lustrous-mochi-b3a4f2.netlify.app` — share this in outreach while you set up the permanent domain later.

---

## Option 2 — Vercel CLI (2 minutes, free account)

**What you get:** Marketing site at a Vercel URL (e.g. `agentflow-web.vercel.app`). Can later attach a custom domain.

**Steps:**
1. Create a free account at https://vercel.com (Google SSO — 30 seconds)
2. In terminal:
   ```bash
   npm install -g vercel
   cd packages/web
   vercel deploy --prod
   ```
3. Follow the prompts: log in, confirm project name
4. Site is live at the URL printed at the end

**No GitHub required.** Vercel deploys from local files when you run the CLI.

---

## Option 3 — Railway CLI (API only, 3 minutes)

**What you get:** API server live at a Railway URL. Required for the full product (sign-up, billing, GitHub OAuth).

**Steps:**
1. Create a free account at https://railway.app (Google SSO — 30 seconds)
2. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```
3. In terminal:
   ```bash
   railway login
   cd packages/api
   railway init
   railway up
   ```
4. Set environment variables in the Railway dashboard (or via `railway variables set KEY=VALUE`)

**No GitHub required.** Railway CLI deploys directly from local files.

---

## Which option to use

| Goal | Option |
|------|--------|
| Get a link to share in DMs TODAY | Option 1 (Netlify Drop — 30 seconds) |
| Persistent marketing site URL | Option 2 (Vercel CLI) |
| Full product with sign-up/billing | Option 1 + Option 2 + Option 3 |

---

## After you have a URL

Update `packages/web/.env.production` with the actual URLs, rebuild, and redeploy. The outreach DMs in `docs/day-10-brief.md` can be updated to point to the real URLs.

The `/lp/trigger-dev`, `/lp/mintlify`, etc. pages are static — they'll work on any host without any API.
