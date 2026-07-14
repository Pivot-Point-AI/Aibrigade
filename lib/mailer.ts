import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP is not configured — set SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local");
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 465),
    secure: SMTP_SECURE !== "false",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

export async function sendMail(options: { subject: string; html: string; replyTo?: string }) {
  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  await getTransporter().sendMail({
    from: `"AI Brigade Website" <${process.env.SMTP_USER}>`,
    to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
  });
}
