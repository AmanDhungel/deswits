import { Resend } from "resend";

import { COMPANY } from "@/lib/constants";

let resendClient: Resend | null | undefined;

function getResend(): Resend | null {
  if (resendClient !== undefined) return resendClient;
  const key = process.env.RESEND_API_KEY;
  resendClient = key ? new Resend(key) : null;
  return resendClient;
}

function otpEmailTemplate(code: string, fullName?: string) {
  const greetingName = fullName?.split(" ")[0];
  const digits = code.split("");

  const html = `<!doctype html>
<html>
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Deswits sign-in code</title>
  </head>
  <body style="margin:0;padding:0;background:#07100c;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      Your Deswits sign-in code is ${code}. It expires in 5 minutes.
    </div>
    <div style="background:#07100c;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" width="100%" style="max-width:480px;margin:0 auto;background:#0c1712;border:1px solid rgba(217,178,76,0.25);border-radius:16px;overflow:hidden;">
        <tr>
          <td style="padding:28px 32px 0 32px;">
            <span style="font-size:20px;font-weight:700;letter-spacing:0.08em;color:#d9b24c;">DESWITS</span>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px 8px 32px;">
            <p style="color:#f4efe1;font-size:16px;margin:0 0 8px 0;">
              ${greetingName ? `Hi ${greetingName},` : "Hi,"}
            </p>
            <p style="color:#94a39a;font-size:14px;line-height:1.6;margin:0 0 24px 0;">
              Use the code below to sign in to your Deswits account. This code expires in 5 minutes and can only be used once.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 24px 32px;">
            <table role="presentation" align="center" style="margin:0 auto;border-collapse:separate;border-spacing:8px 0;">
              <tr>
                ${digits
                  .map(
                    (d) => `<td style="width:44px;height:56px;background:#101c17;border:1px solid rgba(23,201,131,0.35);border-radius:10px;text-align:center;vertical-align:middle;">
                  <span style="font-size:26px;font-weight:700;color:#17c983;font-family:'Courier New',monospace;">${d}</span>
                </td>`
                  )
                  .join("")}
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 28px 32px;">
            <p style="color:#94a39a;font-size:12px;line-height:1.6;margin:0;">
              If you didn't request this code, you can safely ignore this email — no one can access your account without it.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.08);">
            <p style="color:#5b665f;font-size:11px;margin:0;">
              ${COMPANY.address.full} &middot; ${COMPANY.phone}
            </p>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>`;

  const text = `Hi${greetingName ? " " + greetingName : ""},\n\nYour Deswits sign-in code is: ${code}\n\nThis code expires in 5 minutes and can only be used once. If you didn't request this, you can ignore this email.\n\n${COMPANY.address.full} · ${COMPANY.phone}`;

  return { html, text };
}

export async function sendOtpEmail({
  to,
  code,
  fullName,
}: {
  to: string;
  code: string;
  fullName?: string;
}) {
  const resend = getResend();

  if (!resend) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email is not configured. Set RESEND_API_KEY to send OTP emails.");
    }
    // Local dev without Resend configured — surface the code in the server
    // log instead of failing, so the sign-in flow stays testable end to end.
    console.warn(`\n[dev email] OTP for ${to}: ${code}\n`);
    return;
  }

  const { html, text } = otpEmailTemplate(code, fullName);
  const from = process.env.EMAIL_FROM || "Deswits <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to,
    subject: "Your Deswits sign-in code",
    html,
    text,
  });

  if (error) {
    throw new Error(
      typeof error === "string" ? error : error.message || "Failed to send email via Resend."
    );
  }
}
