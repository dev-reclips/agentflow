const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((body as { error?: string }).error ?? `Request failed: ${res.status}`);
  return body as T;
}

export interface RegisterResult {
  token: string;
  apiKey: string;
  user: { id: string; email: string; role: string };
  company: { id: string; name: string; slug: string };
}

export interface LoginResult {
  token: string;
  user: { id: string; email: string; role: string };
}

export interface MeResult {
  user: { id: string; email: string; role: string };
  company: { id: string; name: string; slug: string };
}

export const api = {
  register(email: string, password: string, companyName: string): Promise<RegisterResult> {
    return request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, companyName }),
    });
  },

  login(email: string, password: string): Promise<LoginResult> {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  me(token: string): Promise<MeResult> {
    return request("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
