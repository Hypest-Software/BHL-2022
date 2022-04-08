import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  try {
    console.log(`Start seeding ...`);
    console.log(`Seeding finished.`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
