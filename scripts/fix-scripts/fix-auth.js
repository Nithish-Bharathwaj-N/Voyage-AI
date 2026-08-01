const fs = require('fs');
const path = require('path');

const controllers = [
  'trips/trips.controller.ts',
  'planner/planner.controller.ts',
  'dashboard/dashboard.controller.ts',
  'statistics/statistics.controller.ts',
  'activity/activity.controller.ts',
  'saved-places/saved-places.controller.ts',
  'collections/collections.controller.ts'
];

const basePath = path.join(__dirname, 'apps/api/src/modules');

for (const relPath of controllers) {
  const filePath = path.join(basePath, relPath);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add import if not present
  if (!content.includes('SupabaseGuard')) {
    content = content.replace(
      "import { Controller",
      "import { SupabaseGuard } from '../auth/supabase.guard';\nimport { Controller"
    );
  }
  
  // Make sure UseGuards is imported
  if (!content.includes('UseGuards')) {
    content = content.replace("import { Controller", "import { UseGuards, Controller");
  }

  // Add @UseGuards(SupabaseGuard) to the class
  if (!content.includes('@UseGuards(SupabaseGuard)')) {
    content = content.replace(
      /@Controller\(['"][^'"]+['"]\)/,
      "@UseGuards(SupabaseGuard)\n$&"
    );
  }

  // Replace req.user?.id || 'mock-user-id'
  content = content.replace(/const userId = req\.user\?\.id \|\| 'mock-user-id';(?: \/\/ Will be replaced by AuthGuard)?/g, "const userId = req.user.userId;");

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${relPath}`);
}
