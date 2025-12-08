#!/usr/bin/env node

/**
 * Script to list all available components in the library
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Read the index.ts file
const indexPath = join(rootDir, 'src', 'index.ts');
const indexContent = readFileSync(indexPath, 'utf-8');

// Extract component exports
const componentExports = [];
const typeExports = [];
const hookExports = [];

// Match type exports: export type { Type1, Type2 } from './path';
const typeExportRegex = /export\s+type\s+{\s*([^}]+)\s*}\s+from\s+['"]([^'"]+)['"]/g;
let match;

while ((match = typeExportRegex.exec(indexContent)) !== null) {
  const exports = match[1].split(',').map(e => e.trim());
  exports.forEach(typeName => {
    typeExports.push({ name: typeName });
  });
}

// Match component exports: export { Component1, Component2 } from './path';
const componentExportRegex = /export\s+{\s*([^}]+)\s*}\s+from\s+['"]([^'"]+)['"]/g;

while ((match = componentExportRegex.exec(indexContent)) !== null) {
  const exports = match[1].split(',').map(e => e.trim());
  const path = match[2];
  
  exports.forEach(exp => {
    // Skip if it's a type export (already handled above)
    if (exp.startsWith('type ')) {
      return;
    }
    
    // Check if it's a hook (starts with 'use')
    if (exp.startsWith('use')) {
      hookExports.push({ name: exp, path });
    } else {
      componentExports.push({ name: exp, path });
    }
  });
}

// Categorize components
const categories = {
  'Common': ['Button', 'SearchBar'],
  'Forms': ['FormInput', 'FormTextarea', 'FormSelect', 'TagInput'],
  'Data Display': ['Card', 'Badge', 'DataTable'],
  'Feedback': ['LoadingSpinner', 'ToastProvider', 'useToast'],
  'Overlay': ['Modal'],
  'Navigation': ['Tabs']
};

function getCategory(componentName) {
  for (const [category, components] of Object.entries(categories)) {
    if (components.includes(componentName)) {
      return category;
    }
  }
  return 'Other';
}

// Display results
console.log('\n📦 Shared UI Components Library\n');
console.log('=' .repeat(50));
console.log('\n📋 COMPONENTS\n');
console.log('─'.repeat(50));

componentExports.forEach(comp => {
  const category = getCategory(comp.name);
  console.log(`  • ${comp.name.padEnd(20)} [${category}]`);
});

console.log('\n🔧 HOOKS\n');
console.log('─'.repeat(50));
hookExports.forEach(hook => {
  console.log(`  • ${hook.name.padEnd(20)}`);
});

console.log('\n📝 TYPES\n');
console.log('─'.repeat(50));
typeExports.forEach(type => {
  console.log(`  • ${type.name.padEnd(20)}`);
});

console.log('\n' + '='.repeat(50));
console.log(`\nTotal: ${componentExports.length} components, ${hookExports.length} hooks, ${typeExports.length} types\n`);

