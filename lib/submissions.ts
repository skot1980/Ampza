export type SubmissionKind = 'waitlist' | 'contact' | 'partner' | 'grievance';

export type SubmissionPayload = {
  name: string;
  phone: string;
  company: string;
  location: string;
  interest: string;
  category: string;
  transactionId: string;
  message: string;
  consent: boolean;
};

export const submissionKinds: readonly SubmissionKind[] = ['waitlist', 'contact', 'partner', 'grievance'];

export function isSubmissionKind(value: string): value is SubmissionKind {
  return submissionKinds.includes(value as SubmissionKind);
}
