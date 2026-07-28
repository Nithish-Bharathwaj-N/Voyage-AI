const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.user.findFirst().then(console.log).catch(console.error).finally(() => prisma.$disconnect());
