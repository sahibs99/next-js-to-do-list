import { PrismaClient } from "@prisma/client";

// This was done because you cannot call Prisma Client multiple times while in development
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
