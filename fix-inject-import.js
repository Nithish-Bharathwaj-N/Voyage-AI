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

  // If Inject is not in the file, add it to the @nestjs/common import
  if (!content.includes('Inject,')) {
    content = content.replace("import { Controller", "import { Inject, Controller");
  }

  fs.writeFileSync(filePath, content);
  console.log(`Checked import for ${relPath}`);
}
