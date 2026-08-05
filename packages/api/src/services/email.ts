import { Resend } from "resend";
import { eq, and } from "drizzle-orm";
import { db } from "../db/client.js";
import { emailLogs } from "../db/schema.js";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not set");
    _resend = new Resend(key);
  }
  return _resend;
}

const FROM = process.env.EMAIL_FROM ?? "AgentFlow <noreply@agentflow.com>";
const WEB_URL = process.env.WEB_URL ?? "http://localhost:3001";

type EmailType = "welcome" | "mid_trial" | "trial_ending";

async function alreadySent(companyId: string, emailType: EmailType): Promise<boolean> {
  const row = await db.query.emailLogs.findFirst({
    where: and(
      eq(emailLogs.companyId, companyId),
      eq(emailLogs.emailType, emailType),
    ),
  });
  return !!row;
}

async function markSent(companyId: string, emailType: EmailType): Promise<void> {
  await db
    .insert(emailLogs)
    .values({ companyId, emailType })
    .onConflictDoNothing();
}

export async function sendWelcomeEmail(
  companyId: string,
  email: string,
  companyName: string,
): Promise<void> {
  if (await alreadySent(companyId, "welcome")) return;

  if (!process.env.RESEND_API_KEY) {
    console.info("[email] RESEND_API_KEY not set — skipping welcome email to", email);
    return;
  }

  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: "Your AgentFlow trial has started",
    html: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;color:#1a1a1a">
  <h2 style="margin-top:0">Welcome to AgentFlow, ${companyName}!</h2>
  <p>Your 14-day free trial is now active. Here's what you can do:</p>
  <ul>
    <li>Create your first AI agent to handle GitHub issues automatically</li>
    <li>Connect your GitHub repository in Integrations</li>
    <li>Assign issues to agents and watch them work</li>
  </ul>
  <p style="margin-top:24px">
    <a href="${WEB_URL}/dashboard/agents" style="background:#6366f1;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600">
      Create your first agent →
    </a>
  </p>
  <p style="margin-top:24px;font-size:14px;color:#666">
    Questions? Reply to this email or visit our <a href="${WEB_URL}/docs" style="color:#6366f1">docs</a>.
  </p>
</div>
    `.trim(),
  });

  await markSent(companyId, "welcome");
}

export async function sendMidTrialEmail(
  companyId: string,
  email: string,
  companyName: string,
  trialEndDate: Date,
): Promise<void> {
  if (await alreadySent(companyId, "mid_trial")) return;

  if (!process.env.RESEND_API_KEY) {
    console.info("[email] RESEND_API_KEY not set — skipping mid-trial email to", email);
    return;
  }

  const endDateStr = trialEndDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: "7 days in — how's it going?",
    html: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;color:#1a1a1a">
  <h2 style="margin-top:0">You're halfway through your AgentFlow trial</h2>
  <p>Hi ${companyName} team — you've had 7 days to explore AgentFlow. Here are a few things worth trying before your trial ends on <strong>${endDateStr}</strong>:</p>
  <ul>
    <li><strong>Assign a real GitHub issue</strong> to an agent and review the PR it opens</li>
    <li><strong>Set a default agent</strong> in your GitHub integration to auto-triage new issues</li>
    <li><strong>Try Growth plan</strong> for up to 10 agents and priority support</li>
  </ul>
  <p style="margin-top:24px">
    <a href="${WEB_URL}/dashboard/settings/billing" style="background:#6366f1;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600">
      Upgrade before ${endDateStr} →
    </a>
  </p>
  <p style="margin-top:24px;font-size:14px;color:#666">
    Reply to this email if you have any questions — we read every response.
  </p>
</div>
    `.trim(),
  });

  await markSent(companyId, "mid_trial");
}

const NOTIFY_EMAIL = process.env.DEMO_NOTIFY_EMAIL ?? "dev@reclips.ai";

export async function sendDemoConfirmationEmail(name: string, email: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.info("[email] RESEND_API_KEY not set — skipping demo confirmation to", email);
    return;
  }

  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: "We got your demo request — talk soon",
    html: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;color:#1a1a1a">
  <h2 style="margin-top:0">Thanks, ${name}!</h2>
  <p>We received your demo request and will reach out within one business day to schedule a call.</p>
  <p>In the meantime, feel free to explore AgentFlow yourself:</p>
  <p style="margin-top:24px">
    <a href="${WEB_URL}/register" style="background:#6366f1;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600">
      Start your free trial →
    </a>
  </p>
  <p style="margin-top:24px;font-size:14px;color:#666">
    Questions before then? Just reply to this email.
  </p>
</div>
    `.trim(),
  });
}

export async function sendDemoNotificationEmail(data: {
  name: string;
  workEmail: string;
  company: string;
  role: string;
  teamSize: string;
  painPoint?: string | null;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.info("[email] RESEND_API_KEY not set — skipping demo notification");
    return;
  }

  await getResend().emails.send({
    from: FROM,
    to: NOTIFY_EMAIL,
    subject: `New demo request: ${data.name} @ ${data.company}`,
    html: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;color:#1a1a1a">
  <h2 style="margin-top:0">New demo request</h2>
  <table style="width:100%;border-collapse:collapse;font-size:15px">
    <tr><td style="padding:8px 0;color:#666;width:120px">Name</td><td style="padding:8px 0"><strong>${data.name}</strong></td></tr>
    <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${data.workEmail}" style="color:#6366f1">${data.workEmail}</a></td></tr>
    <tr><td style="padding:8px 0;color:#666">Company</td><td style="padding:8px 0">${data.company}</td></tr>
    <tr><td style="padding:8px 0;color:#666">Role</td><td style="padding:8px 0">${data.role}</td></tr>
    <tr><td style="padding:8px 0;color:#666">Team size</td><td style="padding:8px 0">${data.teamSize}</td></tr>
    ${data.painPoint ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top">Pain point</td><td style="padding:8px 0">${data.painPoint}</td></tr>` : ""}
  </table>
</div>
    `.trim(),
  });
}

export async function sendTrialEndingSoonEmail(
  companyId: string,
  email: string,
  companyName: string,
  trialEndDate: Date,
): Promise<void> {
  if (await alreadySent(companyId, "trial_ending")) return;

  if (!process.env.RESEND_API_KEY) {
    console.info("[email] RESEND_API_KEY not set — skipping trial-ending email to", email);
    return;
  }

  const endDateStr = trialEndDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: "Your trial ends in 3 days",
    html: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;color:#1a1a1a">
  <h2 style="margin-top:0">Your AgentFlow trial ends on ${endDateStr}</h2>
  <p>Hi ${companyName} team — your free trial ends in 3 days. To keep your agents running without interruption, upgrade now.</p>
  <table style="width:100%;border-collapse:collapse;margin-top:16px">
    <tr>
      <td style="padding:12px;border:1px solid #e5e7eb;border-radius:6px 0 0 6px">
        <strong>Starter</strong><br>
        <span style="font-size:20px;font-weight:700">$499/mo</span><br>
        <span style="font-size:13px;color:#666">3 agents · unlimited issues</span>
      </td>
      <td style="padding:12px;border:1px solid #6366f1;border-radius:0 6px 6px 0;background:#f5f3ff">
        <strong>Growth</strong><br>
        <span style="font-size:20px;font-weight:700">$1,499/mo</span><br>
        <span style="font-size:13px;color:#666">10 agents · priority support</span>
      </td>
    </tr>
  </table>
  <p style="margin-top:24px">
    <a href="${WEB_URL}/dashboard/settings/billing" style="background:#6366f1;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600">
      Upgrade now →
    </a>
  </p>
  <p style="margin-top:16px;font-size:14px;color:#666">
    Need a custom plan or have questions? <a href="mailto:hello@agentflow.com" style="color:#6366f1">Email us</a> and we'll sort you out.
  </p>
</div>
    `.trim(),
  });

  await markSent(companyId, "trial_ending");
}
