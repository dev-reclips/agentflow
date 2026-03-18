import { describe, it, expect, vi, beforeEach } from "vitest";
import { AgentFlowClient } from "./client.js";

const mockFetch = vi.fn();
global.fetch = mockFetch;

function mockResponse<T>(data: T, status = 200) {
  mockFetch.mockResolvedValueOnce({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  });
}

describe("AgentFlowClient", () => {
  let client: AgentFlowClient;

  beforeEach(() => {
    client = new AgentFlowClient({ baseUrl: "http://localhost:3000", apiKey: "test-key" });
    mockFetch.mockClear();
  });

  it("lists issues", async () => {
    const issues = [{ id: "1", title: "Test", status: "todo" }];
    mockResponse(issues);
    const result = await client.listIssues();
    expect(result).toEqual(issues);
    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/v1/issues",
      expect.objectContaining({ headers: expect.any(Object) }),
    );
  });

  it("creates an issue", async () => {
    const issue = { id: "2", title: "New issue", status: "backlog", priority: "medium" };
    mockResponse(issue, 201);
    const result = await client.createIssue({ title: "New issue" });
    expect(result).toEqual(issue);
  });

  it("throws on non-ok response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: () => Promise.resolve("Not found"),
    });
    await expect(client.getIssue("nonexistent")).rejects.toThrow("HTTP 404");
  });

  it("updates agent status", async () => {
    const agent = { id: "agent-1", status: "running" };
    mockResponse(agent);
    const result = await client.updateAgentStatus("agent-1", "running");
    expect(result).toEqual(agent);
  });
});
