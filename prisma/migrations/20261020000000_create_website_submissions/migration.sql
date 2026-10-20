CREATE TABLE "website_submissions" (
    "id" BIGSERIAL NOT NULL,
    "kind" VARCHAR(20) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "normalized_email" VARCHAR(254),
    "payload" JSONB NOT NULL DEFAULT '{}',
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "website_submissions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "website_waitlist_email_unique"
    ON "website_submissions"("kind", "normalized_email");

CREATE INDEX "website_submissions_kind_created_idx"
    ON "website_submissions"("kind", "created_at" DESC);
