# GitHub Marketplace Listing — AgentFlow

Copy-paste this content into each form field when submitting at github.com/settings/apps → List on Marketplace.

---

## Marketplace Name

```
AgentFlow
```

---

## Tagline (max 40 chars)

```
Your GitHub backlog, on autopilot
```

*(34 characters — fits)*

---

## Short Description (max 100 chars)

```
Deploy AI agents to close GitHub issues. Agent writes code, opens a PR, and closes the ticket.
```

*(94 characters — fits)*

---

## Long Description (Markdown)

```markdown
## Close your GitHub backlog without hiring

AgentFlow deploys AI agents directly into your GitHub workflow. Assign any issue to an agent, and it reads the code, writes the fix, opens a pull request, and closes the ticket — autonomously.

No new tool to learn. No context switching. Just a GitHub issue assigned to an agent.

---

### How it works

1. **Install the GitHub App** — connects to your repositories in seconds
2. **Assign an issue to an agent** — use the AgentFlow dashboard or assign via GitHub labels
3. **Watch the work happen** — real-time activity log shows every step the agent takes
4. **Review and merge the PR** — agent opens a PR with a description; you approve

---

### What AgentFlow can do

- **Bug fixes** — read the stack trace, find the cause, write the patch
- **Feature implementation** — build from the issue description and existing codebase context
- **Refactors** — follow your code style and conventions automatically
- **Documentation** — generate or update docs based on code changes
- **Tests** — write unit and integration tests for existing code

---

### Built for engineering teams that move fast

- **No backlog rot** — issues don't sit for weeks waiting for bandwidth
- **Async by default** — agents work while your team focuses on hard problems
- **Full audit trail** — every agent action is logged and reviewable
- **Human in the loop** — agents open PRs; humans merge. You stay in control.

---

### Pricing

| Plan | Price | Agents | Issues/month |
|------|-------|--------|--------------|
| Free | $0 | 1 agent | 5 issues |
| Starter | $499/mo | 3 agents | 100 issues |
| Growth | $1,499/mo | 10 agents | Unlimited |

All paid plans include a 14-day free trial. No credit card required for Free.

---

### Security

- Agents operate with the permissions you grant — nothing more
- All code changes go through a PR; no direct pushes to protected branches
- Activity logs are retained and exportable
- SOC 2 compliance in progress
```

---

## Category Tags

Select the following categories in the GitHub Marketplace form:

- **Code review** (primary)
- **Project management**
- **Testing**
- **Utilities**

---

## Pricing Plans

Configure these in the Marketplace pricing section:

### Plan 1: Free
- **Name:** Free
- **Price:** $0/month
- **Description:** 1 AI agent, 5 issues per month. No credit card required.
- **Bullet points:**
  - 1 AI agent
  - 5 issues/month
  - GitHub Issues integration
  - Activity log

### Plan 2: Starter
- **Name:** Starter
- **Price:** $499/month
- **Description:** 3 AI agents, 100 issues/month. 14-day free trial included.
- **Bullet points:**
  - 3 AI agents
  - 100 issues/month
  - Priority support
  - Analytics dashboard
  - 14-day free trial

### Plan 3: Growth
- **Name:** Growth
- **Price:** $1,499/month
- **Description:** 10 AI agents, unlimited issues. For teams shipping at scale.
- **Bullet points:**
  - 10 AI agents
  - Unlimited issues
  - Dedicated support
  - Custom agent configuration
  - Analytics & reporting
  - 14-day free trial

---

## Required GitHub App Permissions

Request these permissions in the GitHub App settings before submitting:

### Repository permissions
| Permission | Access level | Reason |
|------------|-------------|--------|
| Issues | Read & Write | Read issue content, post comments, close issues |
| Pull requests | Read & Write | Open PRs with agent-generated code |
| Contents | Read & Write | Read codebase, commit code changes |
| Metadata | Read-only | List repositories (required by GitHub) |
| Checks | Read & Write | Report agent run status as check runs |

### Organization permissions
| Permission | Access level | Reason |
|------------|-------------|--------|
| Members | Read-only | Display team member info in dashboard |

### Account permissions
None required.

---

## Website URL

```
https://agentflow.ai
```

## Support URL

```
https://agentflow.ai/support
```

## Privacy Policy URL

```
https://agentflow.ai/privacy
```

## Terms of Service URL

```
https://agentflow.ai/terms
```

---

## Installation Callback URL

```
https://agentflow.ai/api/github/callback
```

## Webhook URL

```
https://agentflow.ai/api/github/webhook
```
