import nodemailer from 'nodemailer';

import type { SubmissionKind, SubmissionPayload } from '@/lib/submissions';
type DeliveryStatus = 'not_required' | 'pending' | 'sent' | 'failed';

const inboxByKind: Partial<Record<SubmissionKind, string>> = {
  contact: 'support@ampza.in',
  grievance: 'grievance@ampza.in',
  partner: 'hello@ampza.in',
};

export function inboxForSubmission(kind: SubmissionKind) {
  return inboxByKind[kind] ?? null;
}

export async function sendSubmissionNotification(
  kind: SubmissionKind,
  email: string,
  payload: SubmissionPayload,
): Promise<{ status: DeliveryStatus; errorCode?: string }> {
  const to = inboxForSubmission(kind);
  if (!to) return { status: 'not_required' };

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || '587');
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!host || !from || !Number.isInteger(port) || port < 1 || port > 65535) {
    return { status: 'pending', errorCode: 'smtp_not_configured' };
  }

  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    ...(user && password ? { auth: { user, pass: password } } : {}),
  });

  const kindLabel = kind === 'contact' ? 'Support request' : kind === 'partner' ? 'Partner enquiry' : 'Grievance';
  const subjectDetail = kind === 'grievance' ? payload.category : kind === 'partner' ? payload.interest : payload.name;
  const lines = [
    `New ${kindLabel.toLowerCase()} from the Ampza website`,
    '',
    `Name: ${payload.name}`,
    `Email: ${email}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    ...(payload.company ? [`Company or property: ${payload.company}`] : []),
    ...(payload.location ? [`City / state: ${payload.location}`] : []),
    ...(payload.interest ? [`Interest: ${payload.interest}`] : []),
    ...(payload.category ? [`Topic: ${payload.category}`] : []),
    ...(payload.transactionId ? [`Session or transaction ID: ${payload.transactionId}`] : []),
    '',
    'Message:',
    payload.message,
  ];

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `[Ampza] ${kindLabel}${subjectDetail ? ` — ${subjectDetail}` : ''}`,
      text: lines.join('\n'),
    });
    return { status: 'sent' };
  } catch (error) {
    const errorCode = typeof error === 'object' && error !== null && 'code' in error && typeof error.code === 'string'
      ? error.code.slice(0, 120)
      : 'smtp_delivery_failed';
    console.error('Ampza notification email delivery failed', { kind, errorCode });
    return { status: 'failed', errorCode };
  }
}
