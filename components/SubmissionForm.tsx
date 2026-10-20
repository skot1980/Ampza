'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';

type Field = { name: string; label: string; type?: string; required?: boolean; options?: string[]; wide?: boolean };
type Props = { kind: 'waitlist' | 'contact' | 'partner' | 'grievance'; fields: Field[]; submitLabel: string; intro?: string };

export default function SubmissionForm({ kind, fields, submitLabel, intro }: Props) {
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setNotice('');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, kind, consent: data.consent === 'on' }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'We could not submit your form.');
      setNotice(kind === 'waitlist' ? 'Thanks — you’re on the early access list.' : 'Thanks — your message has been received.');
      form.reset();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'We could not submit your form. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return <form className="submission-form" onSubmit={submit}>
    {intro && <p className="form-intro">{intro}</p>}
    <div className="form-grid">
      {fields.map(field => <label className={field.wide ? 'field-wide' : ''} key={field.name}>{field.label}
        {field.options ? <select name={field.name} required={field.required}><option value="">Choose one</option>{field.options.map(option => <option key={option}>{option}</option>)}</select>
          : field.name === 'message' ? <textarea name={field.name} rows={5} required={field.required} maxLength={5000} />
          : <input name={field.name} type={field.type || 'text'} required={field.required} maxLength={field.name === 'email' ? 254 : 200} />}
      </label>)}
    </div>
    <label className="honeypot" aria-hidden="true">Website <input name="website" tabIndex={-1} autoComplete="off" /></label>
    <label className="consent-line"><input type="checkbox" name="consent" required /> <span>I agree to the <Link href="/privacy-policy">Privacy Policy</Link> and consent to Ampza using these details to respond.</span></label>
    <button className="button button-dark" type="submit" disabled={busy}>{busy ? 'Sending…' : submitLabel} <span>↗</span></button>
    {notice && <p role="status" className="form-notice">{notice}</p>}
  </form>;
}
