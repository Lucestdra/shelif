import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  role: z.string().min(1).max(50),
  message: z.string().min(10).max(4000),
  locale: z.enum(["tr", "en"]).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.warn("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL not set; logging payload only.");
    console.log("[contact]", parsed.data);
    return NextResponse.json({ ok: true, mode: "log" });
  }

  const { name, email, role, message } = parsed.data;
  const subject = `[Shelif] ${role} · ${name}`;
  const html = `
    <h2>New Shelif inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Role:</strong> ${escapeHtml(role)}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Shelif <noreply@shelif.com>",
        to: [to],
        reply_to: email,
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("[contact] resend error", text);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "network" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
