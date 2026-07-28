const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.findMany({ select: { id: true, email: true } });
  console.log("Users:", users);
}
check().catch(console.error).finally(() => prisma.$disconnect());
