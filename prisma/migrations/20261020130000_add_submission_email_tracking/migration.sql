ALTER TABLE "website_submissions"
    ADD COLUMN "notification_status" VARCHAR(20) NOT NULL DEFAULT 'not_required',
    ADD COLUMN "notification_error" VARCHAR(120),
    ADD COLUMN "notified_at" TIMESTAMPTZ(6);
