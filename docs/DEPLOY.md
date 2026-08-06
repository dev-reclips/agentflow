# Deploy Runbook — AgentFlow Production

This document covers the one-time setup required to deploy AgentFlow to the internet.
After setup, every push to `main` automatically deploys API (Railway) then Web (Vercel) — no engineering help needed.

**Estimated time:** 45–60 minutes on first run.

---

## Architecture

| Layer | Provider | Notes |
|-------|----------|-------|
| Web (Next.js) | Vercel | Auto-deploy from `packages/web` |
| API (Express) | Railway | Auto-deploy from repo root via CI |
| Database | Neon | Serverless PostgreSQL |
| Email | Resend | Transactional email |
| Payments | Stripe | Billing via Stripe |
| GitHub integration | GitHub App | Webhook + OAuth |

---

## Step 1 — Database (Neon)

1. Create account at https://neon.tech
2. Create a new project: **New Project → Name:** `agentflow-prod` → **Region:** US East
3. On the dashboard, copy the **Pooled connection string** (PostgreSQL format):
   ```
   postgres://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. Save this as `DATABASE_URL` — you'll add it as a GitHub secret in Step 7.

> **Migrations run automatically** during every CI deploy (`pnpm db:migrate`). No manual steps needed after the first push.

---

## Step 2 — API Hosting (Railway)

1. Create account at https://railway.app
2. **New Project → Empty Project** (do NOT use a template)
3. Click **+ New Service → Empty Service**
4. Under **Settings → Source**: connect to the GitHub repo, branch `main`
5. Under **Settings → General → Root Directory**: set to `packages/api`
6. Under **Settings → Variables**: add all API environment variables listed in Step 7
7. Get your Railway token:
   - Go to https://railway.app/account/tokens → **+ New Token**
   - Name it `github-actions` → copy the token → save as `RAILWAY_TOKEN` GitHub secret (Step 7)
8. Copy the public Railway URL from **Settings → Networking → Public Domain**
   (e.g. `agentflow-api.up.railway.app`) — you'll need it for `NEXT_PUBLIC_API_URL` and DNS

---

## Step 3 — Web Hosting (Vercel)

1. Create account at https://vercel.com
2. **Add New → Project → Import Git Repository** — select the GitHub repo
3. Set **Framework Preset** to **Next.js**
4. Set **Root Directory** to `packages/web`
5. Under **Environment Variables**, add the web vars from Step 8
6. Click **Deploy** — this first manual deploy links the project
7. Collect three values for GitHub secrets (Step 7):
   - **VERCEL_TOKEN**: https://vercel.com/account/tokens → **Create**
   - **VERCEL_ORG_ID**: Vercel dashboard → **Settings → General → Team ID**
     (For a personal account, go to **Account Settings → General → Your ID**)
   - **VERCEL_PROJECT_ID**: Vercel project → **Settings → General → Project ID**

---

## Step 4 — Stripe

1. Create account at https://stripe.com
2. **Products → + Add product**
3. Create **Starter**:
   - Name: `Starter`
   - Price: **$499.00 / month** (recurring)
   - Copy the **Price ID** (starts with `price_`) → `STRIPE_PRICE_STARTER`
4. Create **Growth**:
   - Name: `Growth`
   - Price: **$1,499.00 / month** (recurring)
   - Copy the **Price ID** → `STRIPE_PRICE_GROWTH`
5. **Developers → API keys**:
   - Copy **Secret key** → `STRIPE_SECRET_KEY`
   - Use `sk_test_...` for now; switch to `sk_live_...` when ready for real payments
6. **Developers → Webhooks → + Add endpoint**:
   - URL: `https://<railway-url>/webhooks/stripe`
   - Events to listen: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `checkout.session.completed`, `invoice.payment_failed`
   - Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`

---

## Step 5 — Resend (Email)

1. Create account at https://resend.com
2. **Domains → Add Domain** — enter your domain and add the DNS records it provides
3. Wait for domain verification (usually under 5 minutes)
4. **API Keys → Create API Key** → copy it → `RESEND_API_KEY`
5. Set `EMAIL_FROM` to a verified sender address (e.g. `noreply@agentflow.ai`)
6. Set `DEMO_NOTIFY_EMAIL` to the inbox that should receive demo request notifications

---

## Step 6 — GitHub App

1. Go to https://github.com/settings/apps → **New GitHub App**
2. Fill in the settings:
   - **GitHub App name**: `AgentFlow`
   - **Homepage URL**: your Vercel production URL
   - **Webhook URL**: `https://<railway-url>/webhooks/github`
   - **Webhook secret**: run `openssl rand -hex 20` → paste here → save as `GITHUB_WEBHOOK_SECRET`
   - **Permissions**: Contents (Read), Pull requests (Read & Write), Issues (Read & Write), Metadata (Read)
   - **Subscribe to events**: Pull request, Push, Issues
3. Click **Create GitHub App** — note the **App ID** at the top → `GITHUB_APP_ID`
4. Scroll to **Private keys** → **Generate a private key** → download the `.pem` file
5. Base64-encode the key (run this in Terminal):
   ```bash
   base64 -i <downloaded-file.pem> | tr -d '\n'
   ```
   Copy the output → `GITHUB_APP_PRIVATE_KEY`

---

## Step 7 — GitHub Actions Secrets

Go to your GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**.

Add every secret below. The CI pipeline will fail if any are missing.

### Database
| Secret | Where to get it |
|--------|----------------|
| `DATABASE_URL` | Neon pooled connection string (Step 1) |

### Railway (API)
| Secret | Where to get it |
|--------|----------------|
| `RAILWAY_TOKEN` | Railway account tokens page (Step 2) |

### Vercel (Web)
| Secret | Where to get it |
|--------|----------------|
| `VERCEL_TOKEN` | Vercel account tokens page (Step 3) |
| `VERCEL_ORG_ID` | Vercel Settings → General → Team/Account ID (Step 3) |
| `VERCEL_PROJECT_ID` | Vercel project Settings → General → Project ID (Step 3) |

### Application Secrets
| Secret | How to generate |
|--------|----------------|
| `JWT_SECRET` | `openssl rand -hex 32` |
| `INTERNAL_SECRET` | `openssl rand -hex 16` |
| `ADMIN_API_KEY` | `openssl rand -hex 20` |
| `CORS_ORIGIN` | Your Vercel production URL, e.g. `https://agentflow.ai` |
| `WEB_URL` | Same as `CORS_ORIGIN` |

### Stripe
| Secret | Where to get it |
|--------|----------------|
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys (Step 4) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (Step 4) |
| `STRIPE_PRICE_STARTER` | Stripe Price ID for $499/mo plan (Step 4) |
| `STRIPE_PRICE_GROWTH` | Stripe Price ID for $1,499/mo plan (Step 4) |

### Email
| Secret | Where to get it |
|--------|----------------|
| `RESEND_API_KEY` | Resend API keys page (Step 5) |
| `EMAIL_FROM` | Verified sender address (Step 5) |
| `DEMO_NOTIFY_EMAIL` | Inbox for demo alert emails (Step 5) |

### GitHub App
| Secret | Where to get it |
|--------|----------------|
| `GITHUB_APP_ID` | Numeric App ID from GitHub App settings (Step 6) |
| `GITHUB_APP_PRIVATE_KEY` | Base64-encoded `.pem` content (Step 6) |
| `GITHUB_WEBHOOK_SECRET` | Random string you set as webhook secret (Step 6) |

### Analytics (optional)
| Secret | Where to get it |
|--------|----------------|
| `POSTHOG_KEY` | PostHog project API key |

---

## Step 8 — Vercel Environment Variables

In Vercel → your project → **Settings → Environment Variables**, add:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | Railway public URL (e.g. `https://agentflow-api.up.railway.app`) |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog key (optional) |

> Do NOT set `NEXT_PUBLIC_DEMO_PASSWORD` in production.

---

## Step 9 — First Deploy

1. Confirm all GitHub secrets are set (Step 7) and Vercel env vars are set (Step 8)
2. Push any commit to `main` — or in **GitHub → Actions → Deploy → Run workflow**
3. The **Actions** tab shows two jobs: `deploy-api` runs first (includes DB migration), then `deploy-web` once the API is live
4. Total time: ~5–8 minutes

### Verify it worked

- `https://<railway-url>/health` → should return `{"status":"ok"}`
- `https://<vercel-url>` → landing page loads
- `/register` → complete sign-up flow
- Stripe checkout loads with test key (`sk_test_...`)

### Tail logs

**Railway (API logs)**
1. Railway dashboard → your service → **Deployments** tab → click the latest deployment → **View Logs**
2. Or via CLI: `railway logs --tail` (requires `npm install -g @railway/cli` and `railway login`)

**Vercel (Web logs)**
1. Vercel dashboard → your project → **Functions** tab for serverless function logs
2. Or: **Deployments → latest → View Build Logs**

**GitHub Actions (CI logs)**
1. GitHub repo → **Actions** tab → click the latest Deploy run → expand any step

---

## Step 10 — DNS / Custom Domain

### Point `agentflow.ai` → Vercel (web)

1. Vercel → project → **Settings → Domains → Add**
2. Enter `agentflow.ai` and also `www.agentflow.ai`
3. Vercel shows the DNS records to add — go to your DNS provider (Cloudflare, Namecheap, etc.) and add:
   | Type | Name | Value |
   |------|------|-------|
   | `A` | `@` | `76.76.21.21` *(Vercel's IP — use the value Vercel shows)* |
   | `CNAME` | `www` | `cname.vercel-dns.com` |
4. Wait for DNS propagation (2–10 minutes on Cloudflare; up to 48 hours elsewhere)
5. Vercel auto-provisions TLS — you'll see a green lock when it's live

### Point `api.agentflow.ai` → Railway (API)

1. Railway → your service → **Settings → Networking → Custom Domain → Add**
2. Enter `api.agentflow.ai`
3. Railway shows a CNAME record — add to your DNS:
   | Type | Name | Value |
   |------|------|-------|
   | `CNAME` | `api` | `<railway-cname>.railway.app` |
4. Railway auto-provisions TLS — check the **Networking** tab for the green status

### Update `CORS_ORIGIN` and `NEXT_PUBLIC_API_URL`

Once custom domains are live, update these values:
- GitHub secret `CORS_ORIGIN` → `https://agentflow.ai`
- GitHub secret `WEB_URL` → `https://agentflow.ai`
- Vercel env var `NEXT_PUBLIC_API_URL` → `https://api.agentflow.ai`

Then push a commit to `main` to redeploy with the updated config.

---

## Acceptance Checklist

- [ ] `https://api.agentflow.ai/health` returns `{"status":"ok"}`
- [ ] `https://agentflow.ai` loads the landing page
- [ ] `/register` flow creates an account successfully
- [ ] Stripe checkout loads (test mode: `sk_test_...`)
- [ ] Demo request triggers notification email
- [ ] Subsequent pushes to `main` auto-deploy within ~5 minutes

---

## Troubleshooting

**Migrations fail in CI**
- Check `DATABASE_URL` secret points to Neon (not `localhost`)
- Neon requires `?sslmode=require` — confirm it's in the connection string

**Railway deploy fails**
- Verify `RAILWAY_TOKEN` is a valid token (Railway → Account → Tokens)
- Check Railway build logs in the dashboard → Deployments → latest
- Confirm **Root Directory** is set to `packages/api` in Railway service settings

**Vercel build fails**
- Run `vercel link` locally inside `packages/web` to re-link and get the correct `VERCEL_PROJECT_ID`
- Ensure `NEXT_PUBLIC_API_URL` is set under Vercel → Settings → Environment Variables

**CORS errors in browser**
- Set `CORS_ORIGIN` GitHub secret to the exact production URL with no trailing slash
- Redeploy API after updating secrets (push a commit or re-run the workflow)

**Custom domain not resolving**
- Check DNS propagation at https://dnschecker.org using your domain
- On Cloudflare: disable proxy (orange cloud → grey cloud) while Railway/Vercel provisions TLS, then re-enable
