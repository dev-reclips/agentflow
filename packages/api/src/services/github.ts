// GitHub App auth: JWT → installation token, with in-memory cache and 401 refresh.
// Requires env: GITHUB_APP_ID, GITHUB_APP_PRIVATE_KEY (PEM, PKCS1 or PKCS8).

import { createPrivateKey } from "node:crypto";
import { SignJWT } from "jose";

const GITHUB_API = "https://api.github.com";

// installationId → { token, expiresAt (epoch ms) }
const tokenCache = new Map<number, { token: string; expiresAt: number }>();

async function generateAppJwt(): Promise<string> {
  const appId = process.env.GITHUB_APP_ID;
  const rawKey = process.env.GITHUB_APP_PRIVATE_KEY;
  if (!appId || !rawKey) {
    throw new Error("GITHUB_APP_ID and GITHUB_APP_PRIVATE_KEY env vars must be set");
  }
  const pem = rawKey.replace(/\\n/g, "\n");
  const privateKey = createPrivateKey(pem); // handles both PKCS1 and PKCS8
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({})
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt(now - 60) // back-date 60 s to tolerate clock skew
    .setExpirationTime(now + 600)
    .setIssuer(appId)
    .sign(privateKey);
}

async function fetchInstallationToken(installationId: number): Promise<{ token: string; expiresAt: number }> {
  const jwt = await generateAppJwt();
  const res = await fetch(`${GITHUB_API}/app/installations/${installationId}/access_tokens`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${jwt}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub App: installation token fetch failed for ${installationId}: ${res.status} ${body}`);
  }
  const data = await res.json() as { token: string; expires_at: string };
  return {
    token: data.token,
    // Expire 1 min early to avoid using a token right as it expires
    expiresAt: new Date(data.expires_at).getTime() - 60_000,
  };
}

export async function getInstallationToken(installationId: number): Promise<string> {
  const cached = tokenCache.get(installationId);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.token;
  }
  const fresh = await fetchInstallationToken(installationId);
  tokenCache.set(installationId, fresh);
  return fresh.token;
}

async function ghFetch(installationId: number, path: string, init?: RequestInit): Promise<Response> {
  const token = await getInstallationToken(installationId);
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

async function ghJson<T>(installationId: number, path: string, init?: RequestInit): Promise<T> {
  let res = await ghFetch(installationId, path, init);
  if (res.status === 401) {
    // Token expired before our TTL — evict and retry once with a fresh token
    tokenCache.delete(installationId);
    res = await ghFetch(installationId, path, init);
  }
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
  body?: string | undefined;
}

export interface PRResult {
  number: number;
  html_url: string;
  state: string;
  title: string;
}

export async function createPullRequest(installationId: number, opts: CreatePROptions): Promise<PRResult> {
  return ghJson<PRResult>(installationId, `/repos/${opts.owner}/${opts.repo}/pulls`, {
    method: "POST",
    body: JSON.stringify({
      title: opts.title,
      head: opts.head,
      base: opts.base,
      body: opts.body ?? "",
    }),
  });
}

export async function getPullRequest(installationId: number, owner: string, repo: string, prNumber: number): Promise<PRResult> {
  return ghJson<PRResult>(installationId, `/repos/${owner}/${repo}/pulls/${prNumber}`);
}

export interface RepoInfo {
  full_name: string;
  default_branch: string;
  private: boolean;
}

export async function listInstallationRepos(installationId: number): Promise<RepoInfo[]> {
  const data = await ghJson<{ repositories: RepoInfo[] }>(installationId, "/installation/repositories?per_page=100");
  return data.repositories;
}

export async function postIssueComment(installationId: number, repoFullName: string, issueNumber: number, body: string): Promise<void> {
  const [owner, repo] = repoFullName.split("/");
  await ghJson<unknown>(installationId, `/repos/${owner}/${repo}/issues/${issueNumber}/comments`, {
    method: "POST",
    body: JSON.stringify({ body }),
  });
}
