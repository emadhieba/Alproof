import { cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'dist', 'prof-barbershop', 'browser');
const target = join(root, 'netlify-publish');

if (!existsSync(source)) {
  console.error(
    'Build output not found at dist/prof-barbershop/browser.\nRun: npm run build:netlify'
  );
  process.exit(1);
}

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });

console.log('Netlify publish folder ready: netlify-publish/');
