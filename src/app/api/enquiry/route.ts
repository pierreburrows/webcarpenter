import { site } from "@/lib/site";

const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

function clean(v: FormDataEntryValue | null, max = 500) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return Response.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  // Honeypot: bots fill this hidden field.
  if (clean(fd.get("website"))) return Response.json({ ok: true, delivered: false });

  const data = {
    name: clean(fd.get("name"), 120),
    phone: clean(fd.get("phone"), 40),
    email: clean(fd.get("email"), 160),
    postcode: clean(fd.get("postcode"), 12),
    type: clean(fd.get("type"), 60),
    message: clean(fd.get("message"), 3000),
  };

  if (!data.name || !data.phone || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    return Response.json({ ok: false, error: "Please add your name, phone and a valid email." }, { status: 400 });
  }

  const photo = fd.get("photo");
  let attachment: { filename: string; content: Buffer } | null = null;
  if (photo instanceof File && photo.size > 0) {
    if (photo.size > MAX_PHOTO_BYTES) {
      return Response.json({ ok: false, error: "Photo is too large (max 8MB)." }, { status: 400 });
    }
    if (!photo.type.startsWith("image/")) {
      return Response.json({ ok: false, error: "Only image files are accepted." }, { status: 400 });
    }
    attachment = {
      filename: photo.name.replace(/[^\w.\-]/g, "_").slice(0, 80),
      content: Buffer.from(await photo.arrayBuffer()),
    };
  }

  const text = [
    "New enquiry from the website",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Postcode: ${data.postcode || "(not given)"}`,
    `For: ${data.type || "(not chosen)"}`,
    "",
    "Message:",
    data.message || "(none)",
    "",
    attachment ? `Photo attached: ${attachment.filename}` : "No photo attached",
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Set RESEND_API_KEY and ENQUIRY_FROM_EMAIL (verified Resend domain) in Vercel to deliver by email.
    console.log("[enquiry] RESEND_API_KEY not set. Logging instead:\n" + text);
    return Response.json({ ok: true, delivered: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const from = process.env.ENQUIRY_FROM_EMAIL ?? `${site.shortName} website <onboarding@resend.dev>`;
    const to = process.env.ENQUIRY_TO_EMAIL ?? site.email;
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Enquiry: ${data.type || "carpentry"} from ${data.name}`,
      text,
      attachments: attachment ? [attachment] : undefined,
    });
    if (error) throw error;
    return Response.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[enquiry] send failed", err);
    return Response.json({ ok: false, error: "Could not send just now. Please call or email instead." }, { status: 502 });
  }
}
