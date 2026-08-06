# Deploy Runbook — AgentFlow Production

This document covers the one-time board setup required to activate the CI/CD pipeline.
After setup, every push to `main` automatically deploys API (Railway) then Web (Vercel).

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
2. Create a new project named `agentflow-prod`
3. Copy the connection string (Pooled connection, PostgreSQL format):
   ```
   postgres://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. Save as `DATABASE_URL` → GitHub secret (see Step 7)

---

## Step 2 — API Hosting (Railway)

1. Create account at https://railway.app
2. Create a new project named `agentflow`
3. Add a new service → choose **"Empty Service"** (not a template)
4. Under **Settings → Source**: connect to the GitHub repo, branch `main`
5. Under **Settings → Build**: confirm source is root `/` (the `railway.json` at root handles the monorepo build)
6. Add all API environment variables under **Variables** (see Step 7 for full list)
7. Get the Railway token:
   - Go to https://railway.app/account/tokens
   - Create a new token → save as `RAILWAY_TOKEN` GitHub secret
8. Copy the public Railway URL (e.g. `agentflow-api.up.railway.app`) — you'll need it for `API_URL`

---

## Step 3 — Web Hosting (Vercel)

1. Create account at https://vercel.com
2. Import the GitHub repo → select the project
3. Under **Framework Preset**: select **Next.js**
4. Set **Root Directory** to `packages/web`
5. Add environment variables (see Step 7 for web vars)
6. Deploy once manually to link the project
7. Collect three values for GitHub secrets:
   - **VERCEL_TOKEN**: https://vercel.com/account/tokens → create new token
   - **VERCEL_ORG_ID**: Settings → General → Team ID (or your personal account ID)
   - **VERCEL_PROJECT_ID**: Project → Settings → General → Project ID

---

## Step 4 — Stripe

1. Create account at https://stripe.com
2. Go to **Products** → **+ Add product**
3. Create **Starter**:
   - Name: `Starter`
   - Price: $499.00 / month (recurring)
   - Copy the Price ID → `STRIPE_PRICE_STARTER`
4. Create **Growth**:
   - Name: `Growth`
   - Price: $1,499.00 / month (recurring)
   - Copy the Price ID → `STRIPE_PRICE_GROWTH`
5. **API Keys** (Developers → API keys):
   - Copy **Secret key** → `STRIPE_SECRET_KEY`
   - For testing, use the `sk_test_...` key first; switch to `sk_live_...` when ready
6. **Webhook** (Developers → Webhooks → Add endpoint):
   - URL: `https://<railway-url>/webhooks/stripe`
   - Events: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `checkout.session.completed`, `invoice.payment_failed`
   - Copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`

---

## Step 5 — Resend (Email)

1. Create account at https://resend.com
2. Add your domain under **Domains** and verify DNS records
3. Go to **API Keys** → **Create API key** → `RESEND_API_KEY`
4. Set `EMAIL_FROM` to a verified sender address (e.g. `noreply@yourdomain.com`)
5. Set `DEMO_NOTIFY_EMAIL` to the inbox that receives demo request notifications

---

## Step 6 — GitHub App

1. Go to https://github.com/settings/apps → **New GitHub App**
2. Settings:
   - **Name**: `AgentFlow`
   - **Homepage URL**: your Vercel URL
   - **Webhook URL**: `https://<railway-url>/webhooks/github`
   - **Webhook secret**: generate a random string → save as `GITHUB_WEBHOOK_SECRET`
   - **Permissions**: Contents (Read), Pull requests (Read & Write), Issues (Read & Write), Metadata (Read)
   - **Subscribe to events**: Pull request, Push, Issues
3. After creating, note the **App ID** → `GITHUB_APP_ID`
4. Scroll to **Private keys** → **Generate a private key**
   - Download the `.pem` file
   - Base64-encode: `base64 -i <file.pem> | tr -d '\n'`
   - Save as `GITHUB_APP_PRIVATE_KEY`

---

## Step 7 — GitHub Actions Secrets

Go to your GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**.

Add all of these:

### Database
| Secret | Value |
|--------|-------|
| `DATABASE_URL` | Neon connection string (pooled) |

### Railway (API)
| Secret | Value |
|--------|-------|
| `RAILWAY_TOKEN` | Railway project token |

### Vercel (Web)
| Secret | Value |
|--------|-------|
| `VERCEL_TOKEN` | Vercel personal access token |
| `VERCEL_ORG_ID` | Vercel team or personal account ID |
| `VERCEL_PROJECT_ID` | Vercel project ID for the web app |

### Application
| Secret | Value |
|--------|-------|
| `JWT_SECRET` | Random 64-char string (`openssl rand -hex 32`) |
| `INTERNAL_SECRET` | Random 32-char string (`openssl rand -hex 16`) |
| `ADMIN_API_KEY` | Random string for admin routes |
| `CORS_ORIGIN` | Your Vercel production URL (e.g. `https://agentflow.so`) |
| `WEB_URL` | Same as CORS_ORIGIN |

### Stripe
| Secret | Value |
|--------|-------|
| `STRIPE_SECRET_KEY` | `sk_test_...` (switch to `sk_live_...` for prod) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PRICE_STARTER` | Stripe Price ID for $499/mo plan |
| `STRIPE_PRICE_GROWTH` | Stripe Price ID for $1,499/mo plan |

### Email
| Secret | Value |
|--------|-------|
| `RESEND_API_KEY` | Resend API key |
| `EMAIL_FROM` | Verified sender address |
| `DEMO_NOTIFY_EMAIL` | Inbox for demo request alerts |

### GitHub App
| Secret | Value |
|--------|-------|
| `GITHUB_APP_ID` | Numeric GitHub App ID |
| `GITHUB_APP_PRIVATE_KEY` | Base64-encoded `.pem` private key |
| `GITHUB_WEBHOOK_SECRET` | Webhook signing secret |

### Analytics
| Secret | Value |
|--------|-------|
| `POSTHOG_KEY` | PostHog project API key (optional) |

---

## Step 8 — Vercel Environment Variables

In Vercel project settings → **Environment Variables**, add these for the web app:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | Railway API URL (e.g. `https://agentflow-api.up.railway.app`) |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog key (optional) |

Do NOT set `NEXT_PUBLIC_DEMO_PASSWORD` in production.

---

## Step 9 — First Deploy

1. Ensure all GitHub secrets are set (Step 7)
2. Ensure Vercel env vars are set (Step 8)
3. Push a commit to `main` (or re-run the last workflow in GitHub Actions)
4. Watch the **Actions** tab — `deploy-api` runs first, then `deploy-web` after it succeeds

---

## Acceptance Criteria

- [ ] `https://<railway-url>/health` returns `{ "status": "ok" }`
- [ ] Landing page loads at the Vercel URL
- [ ] `/register` flow completes and creates an account
- [ ] Stripe checkout loads with test key (`sk_test_...`)
- [ ] Demo notification email fires when a demo is requested
- [ ] Subsequent pushes to `main` auto-deploy within ~5 minutes

---

## Troubleshooting

**Migrations fail in CI**
- Check `DATABASE_URL` secret points to Neon (not localhost)
- Neon connection requires `?sslmode=require` — ensure it's in the URL

**Railway deploy fails**
- Verify `RAILWAY_TOKEN` is a valid project token (not an account token)
- Check Railway build logs in the Railway dashboard
- The `railway.json` at repo root controls build/start commands

**Vercel build fails**
- Run `vercel link` locally in `packages/web` to re-link the project and get the correct `VERCEL_PROJECT_ID`
- Ensure `NEXT_PUBLIC_API_URL` is set in Vercel environment variables

**CORS errors in browser**
- Set `CORS_ORIGIN` secret to the exact Vercel production URL (no trailing slash)
