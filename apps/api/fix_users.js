const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  const users = await prisma.user.findMany();
  console.log("Users in DB:", users.length);
  if (users.length === 0) {
    console.log("No users in DB. We need to sync them from Supabase or just create a dummy one for now...");
  }
}
fix().catch(console.error).finally(() => prisma.$disconnect());
