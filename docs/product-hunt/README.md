# Product Hunt Launch Assets

All assets for the AgentFlow Product Hunt launch.

## Asset inventory

### OG / Social meta tags
Added to `packages/web/src/app/layout.tsx` via Next.js Metadata API. Generates:
- `og:title`, `og:description`, `og:image`, `og:url`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

All pointing to `/og-image.png` (1200×630).

### OG Image (`/og-image.png`)
**Source:** `docs/product-hunt/og-image-source.html`
**Dynamic route:** `packages/web/src/app/opengraph-image.tsx` (served by Next.js at `/opengraph-image`)

To generate the static PNG for `/public/og-image.png`:
1. Open `og-image-source.html` in Chrome at **exactly 1200×800** browser window
2. Use DevTools → rendering → set device size to 1200×630
3. Or run: `npx playwright screenshot --width=1200 --height=630 og-image-source.html /public/og-image.png`
4. Alternatively: deploy the Next.js app and `curl https://agentflow.ai/opengraph-image > packages/web/public/og-image.png`

### Gallery screenshots (1280×800)

| File | Screen | Intended use |
|------|--------|--------------|
| `screenshots/01-dashboard-overview.html` | Dashboard with agent roster and stats | First gallery image — shows the full product at a glance |
| `screenshots/02-issue-assignment.html` | Issue detail + agent assignment panel | Shows the core UX: "pick an issue, pick an agent" |
| `screenshots/03-agent-working.html` | Live agent activity log with real-time output | "AI doing real work" — most compelling for PH |
| `screenshots/04-pr-opened.html` | Completed issue with PR link and commit list | Shows the end-to-end outcome |
| `screenshots/05-onboarding-checklist.html` | New user setup checklist | Shows ease of getting started |

To convert HTML mockups to PNGs:
```bash
for f in screenshots/*.html; do
  name=$(basename "$f" .html)
  npx playwright screenshot --width=1280 --height=800 "$f" "screenshots/${name}.png"
done
```

Or open each file in Chrome, set viewport to 1280×800, and screenshot with DevTools → "Capture screenshot".

### Demo GIF (optional)
Not included in this run. To create:
1. Start local dev server: `pnpm --filter @agentflow/web dev`
2. Use a demo environment: navigate to `/demo` for auto-login with seed data
3. Record screen with [Kap](https://getkap.co/) or QuickTime
4. Core loop to record: Dashboard → open issue → assign to agent → watch activity log → PR appears
5. Convert to GIF: `ffmpeg -i demo.mp4 -vf "fps=15,scale=960:-1" -loop 0 demo.gif`
6. Keep under 5MB; trim aggressively

## Product Hunt submission checklist

- [ ] Upload screenshots 01–05 to the PH gallery (in order)
- [ ] Use the OG image as the thumbnail / first media item
- [ ] Product Hunt title: **AgentFlow**
- [ ] Tagline: **Your GitHub backlog, on autopilot**
- [ ] Description and first comment are drafted in `docs/launch-plan.md`
- [ ] Set launch URL to: `https://agentflow.ai`
- [ ] Schedule for Tuesday or Wednesday, 12:01 AM PT (peak PH traffic)

## Color reference

All mockups use the live app's CSS variables:

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg` | `#0a0a0f` | Page background |
| `--surface` | `#111118` | Cards, sidebar |
| `--border` | `#222230` | Borders |
| `--text` | `#e8e8f0` | Primary text |
| `--muted` | `#888899` | Secondary text |
| `--accent` | `#6366f1` | Indigo — primary CTA, active states |
| `--green` | `#22c55e` | Success, done states |
| `--red` | `#ef4444` | Error, blocked states |
