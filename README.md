# Ampza website

The website serves the supplied Ampza HTML mockups so their page content, layout, typography, color, interactions, and animated SVG logo stay aligned with the design files. Next.js maps the mockup pages to clean URLs and keeps the PostgreSQL submission API available.

## Run locally

Requires Node.js 22.12+ and PostgreSQL.

1. Install dependencies with `pnpm install` (Prisma Client generates during install).
2. Copy `.env.example` to `.env.local` and set `DATABASE_URL` to your PostgreSQL connection string.
3. Set the SMTP values in `.env.local` to the credentials for your mail provider. Use a sender address verified by that provider.
4. Apply migrations with `pnpm db:migrate`.
5. Start the site with `pnpm dev` and open `http://localhost:3000`.

If Corepack cannot create a system-wide `pnpm` link, run commands as `corepack pnpm install`, `corepack pnpm db:migrate`, and `corepack pnpm dev`.

Never commit `.env.local` or a database password.

## Source files

- `public/mockups/` contains the 11 supplied HTML pages. Page copy, page styles, calculators, accordions, and logo animation are in these files.
- `app/[[...slug]]/route.ts` serves each supplied page on the website's clean URL and rewrites mockup-to-mockup links to those URLs.
- `public/mockups/form-bridge.js` validates the mockup waitlist, support, grievance, and partner forms and posts to the website API.
- `app/api/submissions/route.ts` validates submissions and writes them to PostgreSQL. It sends support, grievance, and partner notifications to their configured Ampza inboxes; waitlist entries are stored without an inbox email.
- `lib/submission-email.ts` sends inbox notifications over SMTP. Delivery status is tracked in PostgreSQL so a failed email does not discard the submitted form.
- `prisma/schema.prisma` defines the `WebsiteSubmission` model; `prisma/migrations/` contains the SQL migration.
- `lib/db.ts` creates the Prisma/PostgreSQL client.
- `.env.local` (create locally; never commit) holds `DATABASE_URL`. `.env.example` shows its format.

The HTML mockups are preserved as supplied. Their embedded styles, scripts, copy, and inline SVG logo animation remain the page source. The four policy pages use draft copy and need legal review before publication.

Support, grievance, and partner records are saved before notification email is attempted. If SMTP is not configured or a mail server rejects delivery, the API keeps the submission and reports that inbox delivery is pending; the notification status and error code are stored with the row.
