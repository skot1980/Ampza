import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db';
import { inboxForSubmission, sendSubmissionNotification } from '@/lib/submission-email';
import { isSubmissionKind, type SubmissionPayload } from '@/lib/submissions';

export const runtime = 'nodejs';

const text = (value: unknown) => typeof value === 'string' ? value.trim() : '';
const limits = {
  name: 160,
  phone: 40,
  company: 200,
  location: 200,
  interest: 100,
  category: 100,
  transactionId: 120,
  message: 5000,
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 20_000) return NextResponse.json({ error: 'Submission is too large.' }, { status: 413 });
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return NextResponse.json({ error: 'Please submit a valid form.' }, { status: 400 });
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Please submit a valid form.' }, { status: 400 });
  }

  // Honeypot field used to catch basic bot submissions.
  if (text(body.website)) return NextResponse.json({ ok: true });
  const kindValue = text(body.kind);
  const email = text(body.email).toLowerCase();
  if (!isSubmissionKind(kindValue)) return NextResponse.json({ error: 'Unknown form type.' }, { status: 400 });
  const kind = kindValue;
  if (email.length > 254) return NextResponse.json({ error: 'Email address is too long.' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  if (body.consent !== true) return NextResponse.json({ error: 'Please agree to the privacy notice before submitting.' }, { status: 400 });

  const payload: SubmissionPayload = {
    name: text(body.name),
    phone: text(body.phone),
    company: text(body.company),
    location: text(body.location),
    interest: text(body.interest),
    category: text(body.category),
    transactionId: text(body.transactionId),
    message: text(body.message),
    consent: body.consent === true,
  };
  for (const [key, max] of Object.entries(limits)) {
    if (payload[key as keyof typeof limits].length > max) return NextResponse.json({ error: `The ${key} field is too long.` }, { status: 400 });
  }
  if (kind !== 'waitlist' && !payload.name) return NextResponse.json({ error: 'Enter your name.' }, { status: 400 });
  if (kind !== 'waitlist' && !payload.message) return NextResponse.json({ error: 'Add a short message.' }, { status: 400 });
  if (kind === 'grievance' && !payload.category) return NextResponse.json({ error: 'Choose a grievance category.' }, { status: 400 });
  if (kind === 'partner' && !payload.interest) return NextResponse.json({ error: 'Choose what you are interested in.' }, { status: 400 });

  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ error: 'Submissions are not connected to PostgreSQL yet. Set DATABASE_URL in .env.local and restart the website.' }, { status: 503 });

  try {
    const submission = await prisma.websiteSubmission.create({
      data: {
        kind,
        email,
        normalizedEmail: kind === 'waitlist' ? email : null,
        payload,
        consent: payload.consent,
        notificationStatus: kind === 'waitlist' ? 'not_required' : 'pending',
      },
    });

    if (kind === 'waitlist') {
      return NextResponse.json({ ok: true, delivery: 'not_required', message: "You're on the list. We'll be in touch when Ampza launches near you." }, { status: 201 });
    }

    const delivery = await sendSubmissionNotification(kind, email, payload);
    try {
      await prisma.websiteSubmission.update({
        where: { id: submission.id },
        data: {
          notificationStatus: delivery.status,
          notificationError: delivery.errorCode ?? null,
          notifiedAt: delivery.status === 'sent' ? new Date() : null,
        },
      });
    } catch {
      // The form itself is already safely stored; email delivery should not cause a retry/duplicate.
      console.error('Ampza notification status could not be updated', { kind });
      if (delivery.status !== 'sent') delivery.status = 'pending';
    }

    const recipient = inboxForSubmission(kind);
    const message = delivery.status === 'sent'
      ? 'Thanks. Your message has been sent to the Ampza team.'
      : `Your message was saved, but its email notification is pending. For a quicker response, email ${recipient}.`;
    return NextResponse.json({ ok: true, delivery: delivery.status, message }, { status: 201 });
  } catch (error) {
    if (kind === 'waitlist' && typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
      return NextResponse.json({ ok: true, delivery: 'not_required', message: "You're already on the Ampza waitlist." });
    }
    console.error('Website submission insert failed', error);
    return NextResponse.json({ error: 'We could not save this submission. Please try again or email hello@ampza.in.' }, { status: 500 });
  }
}
