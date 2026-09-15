import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 2000;

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  details?: string;
  /** Hidden honeypot field — real visitors never fill this in. */
  website?: string;
  visitorId?: string;
  sessionId?: string;
};

// Best-effort, in-memory abuse throttle. Resets on cold start and is not
// shared across serverless instances — a real defense-in-depth measure for
// a low-traffic site, not a guarantee. If this site ever needs a durable
// limit, back it with a Supabase table instead of adding IP storage here.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (recentSubmissions.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  recentSubmissions.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function badRequest(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid request body.");
  }

  // Silently accept-and-drop honeypot hits so bots get no signal that they were caught.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const projectType = body.projectType?.trim() ?? "";
  const company = body.company?.trim() || null;
  const details = body.details?.trim() || null;

  if (!name) return badRequest("Name is required.");
  if (!email || !EMAIL_PATTERN.test(email)) return badRequest("A valid email is required.");
  if (!projectType) return badRequest("Tell us what you're looking to build.");
  if ([name, email, company, projectType, details].some((v) => (v?.length ?? 0) > MAX_FIELD_LENGTH)) {
    return badRequest("One of the fields is too long.");
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  const db = getSupabaseServerClient();
  if (!db) {
    // Supabase isn't configured yet — fail loudly server-side, but don't leak
    // infra details to the client.
    console.error("[contact] Supabase server client unavailable — check SUPABASE_SERVICE_ROLE_KEY / NEXT_PUBLIC_SUPABASE_URL.");
    return NextResponse.json({ ok: false, error: "Message service is temporarily unavailable." }, { status: 503 });
  }

  const { error: insertError } = await db.from("contact_messages").insert({
    name,
    email,
    company,
    project_type: projectType,
    details,
    visitor_id: body.visitorId ?? null,
    session_id: body.sessionId ?? null,
    source: req.headers.get("referer") ?? null,
  });

  if (insertError) {
    console.error("[contact] failed to store message:", insertError.message);
    return NextResponse.json({ ok: false, error: "Could not save your message. Please try again." }, { status: 500 });
  }

  await sendNotificationEmail({ name, email, company, projectType, details });

  return NextResponse.json({ ok: true });
}

async function sendNotificationEmail(fields: { name: string; email: string; company: string | null; projectType: string; details: string | null }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_EMAIL;
  if (!apiKey || !to) return; // Optional — message is already durably stored regardless.

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Novus Labs Site <onboarding@resend.dev>",
      to,
      replyTo: fields.email,
      subject: `New inquiry: ${fields.name}${fields.company ? ` (${fields.company})` : ""}`,
      text: [
        `Name: ${fields.name}`,
        `Email: ${fields.email}`,
        fields.company ? `Company: ${fields.company}` : null,
        `Looking to build: ${fields.projectType}`,
        fields.details ? `\nAdditional details:\n${fields.details}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (err) {
    // Notification email is a convenience layer — never fail the request over it.
    console.error("[contact] notification email failed (non-fatal):", err);
  }
}
