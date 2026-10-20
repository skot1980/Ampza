import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

const globalForPrisma = globalThis as unknown as { ampzaPrisma?: PrismaClient };

export function getPrisma() {
  if (!process.env.DATABASE_URL) return null;
  if (!globalForPrisma.ampzaPrisma) {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
    globalForPrisma.ampzaPrisma = new PrismaClient({ adapter });
  }
  return globalForPrisma.ampzaPrisma;
}
