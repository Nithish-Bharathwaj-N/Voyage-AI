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

  // Make sure Inject is imported
  if (!content.includes('Inject,')) {
    content = content.replace("import { UseGuards", "import { Inject, UseGuards");
  }

  // Regex to find the constructor and add @Inject(...)
  // Example: constructor(private readonly dashboardService: DashboardService)
  content = content.replace(/constructor\(\s*private (?:readonly )?([a-zA-Z0-9_]+):\s*([a-zA-Z0-9_]+)\s*\)/, "constructor(@Inject($2) private readonly $1: $2)");

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${relPath} with @Inject`);
}
