const fs = require('fs');
const path = require('path');

const services = [
  'trips/trips.service.ts',
  'planner/planner.service.ts',
  'dashboard/dashboard.service.ts',
  'statistics/statistics.service.ts',
  'activity/activity.service.ts',
  'saved-places/saved-places.service.ts',
  'collections/collections.service.ts'
];

const basePath = path.join(__dirname, 'apps/api/src/modules');

for (const relPath of services) {
  const filePath = path.join(basePath, relPath);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // Add Inject import if needed
  if (!content.includes('Inject,')) {
    content = content.replace("import { Injectable", "import { Inject, Injectable");
  }

  // Regex to find the constructor and add @Inject(...)
  content = content.replace(/constructor\(\s*private (?:readonly )?([a-zA-Z0-9_]+):\s*([a-zA-Z0-9_]+)\s*\)/g, "constructor(@Inject($2) private readonly $1: $2)");

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${relPath} with @Inject`);
}
