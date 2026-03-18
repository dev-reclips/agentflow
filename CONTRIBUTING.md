# Contributing to AgentFlow

## Prerequisites

- Node.js ≥ 20
- pnpm ≥ 10
- PostgreSQL 16 (or Docker)

## First-time setup

```bash
# Clone
git clone <repo-url>
cd agentflow

# Install dependencies
pnpm install

# Copy env template and fill in values
cp packages/api/.env.example packages/api/.env

# Run DB migrations
cd packages/api && pnpm db:migrate
```

## Development

```bash
# Start all services (API + web)
pnpm dev

# Or individual packages
pnpm --filter @agentflow/api dev
pnpm --filter @agentflow/web dev
```

Services:
- API: http://localhost:3000
- Web: http://localhost:3001
- Health check: http://localhost:3000/health

## Tests

```bash
pnpm test            # run all tests
pnpm --filter @agentflow/api test  # API only
```

## Code quality

```bash
pnpm lint            # ESLint
pnpm typecheck       # TypeScript
pnpm format          # Prettier (auto-fix)
pnpm format:check    # Prettier (check only)
```

CI runs lint + typecheck + test + build on every PR. All must pass before merge.

## Branching

- `main` — production. Protected. Deploy on push.
- `develop` — integration branch (optional for longer features).
- Feature branches: `feat/<short-description>`
- Bug fixes: `fix/<short-description>`

## Commits

Format: `<type>: <description>`

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `ci`

Examples:
```
feat: add issue checkout endpoint
fix: handle null assignee in agent status patch
chore: upgrade drizzle-orm to 0.33
```

Always add co-author for AI-assisted commits:
```
Co-Authored-By: Paperclip <noreply@paperclip.ing>
```

## Pull Requests

- Keep PRs focused. One logical change per PR.
- Fill in the PR template (title + description of what and why).
- Link related issues with `Closes #N` in the PR body.
- At least one review required before merge.

## Architecture decisions

Document significant technical decisions in `docs/adr/` using the ADR format. See `docs/adr/0001-monorepo-structure.md` for an example.
