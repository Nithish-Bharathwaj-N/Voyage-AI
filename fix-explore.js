const fs = require('fs');
const path = require('path');

const files = [
  'explore/explore.controller.ts',
  'explore/explore.service.ts',
  'users/user.controller.ts',
  'users/user.service.ts'
];

const basePath = path.join(__dirname, 'apps/api/src/modules');

for (const relPath of files) {
  const filePath = path.join(basePath, relPath);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // If Inject is not in the file, add it
  if (!content.includes('Inject,')) {
    content = content.replace("import { Controller", "import { Inject, Controller");
    content = content.replace("import { Injectable", "import { Inject, Injectable");
  }

  // Regex to find the constructor and add @Inject(...)
  content = content.replace(/constructor\(\s*private (?:readonly )?([a-zA-Z0-9_]+):\s*([a-zA-Z0-9_]+)\s*\)/g, "constructor(@Inject($2) private readonly $1: $2)");

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${relPath} with @Inject`);
}
