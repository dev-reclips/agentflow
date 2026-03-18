export default function HomePage() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>AgentFlow</h1>
      <p>AI-native development platform. Autonomous agents for software delivery.</p>
      <nav>
        <a href="/issues">Issues →</a>
        {"  "}
        <a href="/agents">Agents →</a>
      </nav>
    </main>
  );
}
