# Ampza website

Next.js App Router, React, TypeScript, and custom CSS implement the supplied Ampza mockups. PostgreSQL stores website form submissions through Prisma ORM.

## Build sequence

1. Shared responsive app shell and homepage.
2. Mockup pages for charging, pricing, business, about, FAQs, contact, privacy, terms, refunds, and cookies.
3. One validated server endpoint stores waitlist, contact, partner, and grievance submissions in PostgreSQL.
4. Add email or CRM notifications once Ampza chooses a provider and supplies credentials.
5. Review mobile layouts, accessibility, SEO, and deployment settings.

The mockup changelog and future-enhancement notes are reference material. Planned features and illustrative figures remain labelled as such. The four policy pages follow draft mockup copy and need legal review before publication.

## Run locally

Requires Node.js 22.12+ and PostgreSQL.

1. Install dependencies with `pnpm install` (Prisma Client generates during install).
2. Copy `.env.example` to `.env.local` and set `DATABASE_URL` to your PostgreSQL connection string.
3. Apply migrations with `pnpm db:migrate`.
4. Start the website with `pnpm dev`.

`pnpm db:migrate:dev` creates a development migration after schema edits. Never commit `.env.local` or a database password.

## Source and database files

- `app/` contains all page routes and the `/api/submissions` endpoint.
- `components/` contains the shared layout, forms, calculators, and FAQ accordion.
- `prisma/schema.prisma` defines the `WebsiteSubmission` model and PostgreSQL table.
- `prisma/migrations/` contains the versioned SQL migration.
- `lib/db.ts` creates the Prisma/PostgreSQL client.
- `.env.local` (create locally; never commit) holds `DATABASE_URL`. `.env.example` shows its format.

The table stores a submission type, email, normalized email for duplicate waitlist prevention, form details in JSONB, consent, and creation time.
