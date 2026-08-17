import { Resend } from "resend";

export interface SendEmailParams {
  to: string;
  subject: string;
  body_html: string;
  from_name?: string;
}

export type SendEmailResult =
  | { success: true; message_id: string }
  | { success: false; error: string };

// Resolved at call-time so callers can set RESEND_API_KEY after module load.
function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY env var is not set");
  return new Resend(key);
}

const DEFAULT_FROM_DOMAIN = process.env.EMAIL_FROM_DOMAIN ?? "agentflow.ai";

export async function sendOutreachEmail(params: SendEmailParams): Promise<SendEmailResult> {
  const { to, subject, body_html, from_name = "AgentFlow" } = params;

  const fromAddress = `${from_name} <hello@${DEFAULT_FROM_DOMAIN}>`;

  try {
    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to,
      subject,
      html: body_html,
    });

    if (error || !data) {
      return { success: false, error: error?.message ?? "Unknown Resend error" };
    }

    return { success: true, message_id: data.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}
