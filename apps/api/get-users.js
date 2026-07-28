const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ take: 5 });
  console.log("Users:", users.map(u => u.email));
}

main().finally(() => prisma.$disconnect());
