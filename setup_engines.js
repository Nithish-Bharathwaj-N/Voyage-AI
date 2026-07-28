const fs = require('fs');
const path = require('path');

const packages = [
  'planner-engine',
  'knowledge-engine',
  'recommendation-engine',
  'search-engine',
  'budget-engine',
  'routing-engine',
  'weather-engine',
  'destination-engine',
  'preference-engine',
  'analytics-engine',
  'notification-engine',
  'application'
];

packages.forEach(pkg => {
  const dir = path.join(__dirname, 'packages', pkg);
  
  const packageJson = {
    name: `@voyageai/${pkg}`,
    version: "0.1.0",
    private: true,
    main: "./src/index.ts",
    types: "./src/index.ts",
    scripts: {
      "lint": "eslint src/",
      "typecheck": "tsc --noEmit"
    },
    dependencies: {
      "@voyageai/types": "workspace:*",
      "@voyageai/shared": "workspace:*"
    },
    devDependencies: {
      "typescript": "^5.5.3"
    }
  };
  
  // Application layer needs all engines
  if (pkg === 'application') {
    packages.filter(p => p !== 'application').forEach(p => {
      packageJson.dependencies[`@voyageai/${p}`] = "workspace:*";
    });
  }

  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify(packageJson, null, 2));
  fs.writeFileSync(path.join(dir, 'src', 'index.ts'), `export {};\n`);
  
  // Scaffold standard engine folders
  ['use-cases', 'strategies', 'policies'].forEach(sub => {
    fs.mkdirSync(path.join(dir, 'src', sub), { recursive: true });
  });
});

console.log('Successfully scaffolded 12 engine packages.');
