import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db';

export const runtime = 'nodejs';

const allowedKinds = new Set(['waitlist', 'contact', 'partner', 'grievance']);
const text = (value: unknown, max = 2000) => typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request) {
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ error: 'Submissions are not available yet. Please email hello@ampza.in.' }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    if (Number(request.headers.get('content-length') || 0) > 20_000) return NextResponse.json({ error: 'Submission is too large.' }, { status: 413 });
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Please submit a valid form.' }, { status: 400 });
  }

  // Honeypot field used to catch basic bot submissions.
  if (text(body.website)) return NextResponse.json({ ok: true });
  const kind = text(body.kind, 20);
  const email = text(body.email, 254).toLowerCase();
  if (!allowedKinds.has(kind)) return NextResponse.json({ error: 'Unknown form type.' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  if (body.consent !== true) return NextResponse.json({ error: 'Please agree to the privacy notice before submitting.' }, { status: 400 });

  const payload = {
    name: text(body.name, 160),
    phone: text(body.phone, 40),
    company: text(body.company, 200),
    interest: text(body.interest, 100),
    category: text(body.category, 100),
    transactionId: text(body.transactionId, 120),
    message: text(body.message, 5000),
    consent: body.consent === true,
  };
  if (kind !== 'waitlist' && !payload.name) return NextResponse.json({ error: 'Enter your name.' }, { status: 400 });
  if (kind !== 'waitlist' && !payload.message) return NextResponse.json({ error: 'Add a short message.' }, { status: 400 });
  if (kind === 'grievance' && !payload.category) return NextResponse.json({ error: 'Choose a grievance category.' }, { status: 400 });

  try {
    await prisma.websiteSubmission.create({
      data: {
        kind,
        email,
        normalizedEmail: kind === 'waitlist' ? email : null,
        payload,
        consent: payload.consent,
      },
    }).catch(async (error: unknown) => {
      // A repeated waitlist email is already safely recorded; report success without duplicating it.
      if (kind === 'waitlist' && typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') return;
      throw error;
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Website submission insert failed', error);
    return NextResponse.json({ error: 'We could not save this submission. Please try again or email hello@ampza.in.' }, { status: 500 });
  }
}
