// GitHub API helpers for agent-driven push/PR operations
// Uses installation token stored per company (no per-user OAuth needed)

const GITHUB_API = "https://api.github.com";

async function ghFetch(token: string, path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${GITHUB_API}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
}

async function ghJson<T>(token: string, path: string, init?: RequestInit): Promise<T> {
  const res = await ghFetch(token, path, init);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API ${res.status} on ${path}: ${body}`);
  }
  return res.json() as Promise<T>;
}

export interface CreatePROptions {
  owner: string;
  repo: string;
  title: string;
  head: string;
  base: string;
  body?: string;
}

export interface PRResult {
  number: number;
  html_url: string;
  state: string;
  title: string;
}

export async function createPullRequest(token: string, opts: CreatePROptions): Promise<PRResult> {
  return ghJson<PRResult>(token, `/repos/${opts.owner}/${opts.repo}/pulls`, {
    method: "POST",
    body: JSON.stringify({
      title: opts.title,
      head: opts.head,
      base: opts.base,
      body: opts.body ?? "",
    }),
  });
}

export async function getPullRequest(token: string, owner: string, repo: string, prNumber: number): Promise<PRResult> {
  return ghJson<PRResult>(token, `/repos/${owner}/${repo}/pulls/${prNumber}`);
}

export interface RepoInfo {
  full_name: string;
  default_branch: string;
  private: boolean;
}

export async function listInstallationRepos(token: string): Promise<RepoInfo[]> {
  const data = await ghJson<{ repositories: RepoInfo[] }>(token, "/installation/repositories?per_page=100");
  return data.repositories;
}

export async function postIssueComment(token: string, repoFullName: string, issueNumber: number, body: string): Promise<void> {
  const [owner, repo] = repoFullName.split("/");
  await ghJson<unknown>(token, `/repos/${owner}/${repo}/issues/${issueNumber}/comments`, {
    method: "POST",
    body: JSON.stringify({ body }),
  });
}
