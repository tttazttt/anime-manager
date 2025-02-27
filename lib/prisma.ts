import { PrismaClient } from "@prisma/client";

// グローバルオブジェクトに `prisma` をキャッシュ
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// 既に `prisma` インスタンスが存在する場合はそれを使い、なければ新しく作成
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
