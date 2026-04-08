#!/usr/bin/env node
/**
 * Design Style Matcher CLI
 *
 * Usage:
 *   design-style preview    # Open web preview
 *   design-style list       # List all designs
 *   design-style get <name> # Get design by name
 *   design-style validate  # Validate skill structure
 *   design-style package   # Package for distribution
 *   design-style publish   # Publish to git/hub
 */

import { existsSync, readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const COMMANDS = {
  preview: {
    description: 'Open web preview in browser',
    execute: () => {
      const previewPath = join(ROOT, 'assets', 'preview.html');
      if (!existsSync(previewPath)) {
        console.error('❌ preview.html not found');
        process.exit(1);
      }
      console.log(`📂 Opening: ${previewPath}`);
      // Open in default browser (platform-specific)
      const openCmd = process.platform === 'darwin' ? 'open' : 'xdg-open';
      import('child_process').then(({ execSync }) => {
        execSync(`${openCmd} "${previewPath}"`);
      });
    }
  },

  list: {
    description: 'List all 58 design systems',
    execute: () => {
      const designsPath = join(ROOT, 'references', 'designs');
      const designs = readdirSync(designsPath).filter(d =>
        existsSync(join(designsPath, d, 'DESIGN.md'))
      );

      console.log(`\n🎨 Design Style Matcher (${designs.length} designs)\n`);

      // Group by category
      const categories = {
        'AI/ML': ['anthropic', 'openai', 'midjourney', 'character.ai', 'cohere', 'elevenlabs', 'minimax', 'mistral.ai', 'ollama', 'replicate', 'together.ai', 'x.ai'],
        'Developer Tools': ['vercel', 'linear', 'raycast', 'fig', 'sentry', 'hashicorp', 'expo', 'clickhouse', 'mongodb', 'supabase', 'sanity', 'resend', 'mintlify', 'lovable', 'opencode.ai', 'voltagent'],
        'Design & Productivity': ['figma', 'framer', 'webflow', 'cal', 'miro', 'notion', 'cursor', 'superhuman', 'posthog', 'intercom', 'zapier', 'airtable', 'composio'],
        'Fintech': ['stripe', 'coinbase', 'kraken', 'revolut', 'wise'],
        'Enterprise': ['ibm', 'spacex', 'nvidia', 'uber'],
        'Car Brands': ['tesla', 'bmw', 'ferrari', 'lamborghini', 'renault'],
        'Consumer': ['airbnb', 'apple', 'pinterest', 'spotify', 'runwayml']
      };

      for (const [cat, names] of Object.entries(categories)) {
        console.log(`\n${cat}:`);
        names.filter(n => designs.includes(n)).forEach(n => console.log(`  • ${n}`));
      }
      console.log();
    }
  },

  get: {
    description: 'Get design by name',
    usage: '<name>',
    execute: (args) => {
      if (!args[0]) {
        console.error('❌ Usage: design-style get <name>');
        process.exit(1);
      }
      const name = args[0].toLowerCase();
      const designPath = join(ROOT, 'references', 'designs', name, 'DESIGN.md');

      if (!existsSync(designPath)) {
        console.error(`❌ Design "${name}" not found`);
        process.exit(1);
      }

      const content = readFileSync(designPath, 'utf-8');
      console.log(`\n${'='.repeat(60)}\n`);
      console.log(content);
      console.log(`\n${'='.repeat(60)}\n`);
    }
  },

  validate: {
    description: 'Validate skill structure',
    execute: () => {
      const skillPath = join(ROOT, 'SKILL.md');
      if (!existsSync(skillPath)) {
        console.error('❌ SKILL.md not found');
        process.exit(1);
      }

      const content = readFileSync(skillPath, 'utf-8');
      const errors = [];

      // Check frontmatter
      if (!content.startsWith('---')) {
        errors.push('Missing YAML frontmatter');
      }

      const frontmatterEnd = content.indexOf('---', 3);
      if (frontmatterEnd === -1) {
        errors.push('Invalid YAML frontmatter format');
      } else {
        const frontmatter = content.slice(3, frontmatterEnd).trim();
        if (!frontmatter.includes('name:')) errors.push('Missing name field');
        if (!frontmatter.includes('description:')) errors.push('Missing description field');
      }

      if (errors.length === 0) {
        console.log('✅ Skill structure valid');
      } else {
        console.log('❌ Validation errors:');
        errors.forEach(e => console.log(`  • ${e}`));
        process.exit(1);
      }
    }
  },

  package: {
    description: 'Package skill for distribution',
    execute: () => {
      const { execSync } = await import('child_process');
      console.log('📦 Packaging skill...');
      execSync(`python3 "${join(ROOT, 'scripts', 'package_skill.py')}" "${ROOT}" "${join(ROOT, 'dist')}"`);
    }
  },

  help: {
    description: 'Show this help message',
    execute: () => {
      console.log(`\n🎨 Design Style Matcher CLI

Usage: design-style <command> [options]

Commands:
  preview           Open web preview in browser
  list              List all 58 design systems
  get <name>        Get design by name
  validate          Validate skill structure
  package           Package skill for distribution

Examples:
  design-style list
  design-style get vercel
  design-style preview
  design-style validate

For more info, see: https://github.com/your-org/design-style-matcher
`);
    }
  }
};

// Main
const cmd = process.argv[2];
const args = process.argv.slice(3);

if (!cmd || cmd === 'help') {
  COMMANDS.help.execute();
} else if (COMMANDS[cmd]) {
  COMMANDS[cmd].execute(args);
} else {
  console.error(`❌ Unknown command: ${cmd}`);
  console.error('Run "design-style help" for usage');
  process.exit(1);
}
