import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  // Allows `prisma generate` before DATABASE_URL has been supplied.
  datasource: { url: process.env.DATABASE_URL ?? '' },
});
