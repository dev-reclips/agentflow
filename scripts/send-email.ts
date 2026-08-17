/**
 * Agent-executable cold email tool via Resend API.
 *
 * Usage:
 *   npx tsx scripts/send-email.ts --to <email> --subject <subject> --body <html> [--from-name <name>]
 *
 * Environment:
 *   RESEND_API_KEY — required. Use re_test_* for test mode (no real sends).
 *   EMAIL_FROM_DOMAIN — optional, defaults to agentflow.ai
 *
 * Output:
 *   JSON to stdout: { success, message_id } | { success, error }
 */
import "dotenv/config";
import { sendOutreachEmail } from "../packages/api/src/tools/email.js";

function parseArgs(argv: string[]): Record<string, string> {
  const args: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg?.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith("--")) {
        args[key] = next;
        i++;
      } else {
        args[key] = "true";
      }
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));

const to = args["to"];
const subject = args["subject"];
const body = args["body"] ?? args["body-html"];
const fromName = args["from-name"];

if (!to || !subject || !body) {
  console.error(JSON.stringify({
    success: false,
    error: "Missing required args: --to, --subject, --body",
    usage: "npx tsx scripts/send-email.ts --to email@example.com --subject 'Hello' --body '<p>Hi</p>' [--from-name 'AgentFlow']",
  }));
  process.exit(1);
}

sendOutreachEmail({ to, subject, body_html: body, from_name: fromName })
  .then((result) => {
    console.log(JSON.stringify(result));
    process.exit(result.success ? 0 : 1);
  })
  .catch((err: unknown) => {
    const message = err instanceof Error ? err.message : String(err);
    console.error(JSON.stringify({ success: false, error: message }));
    process.exit(1);
  });
