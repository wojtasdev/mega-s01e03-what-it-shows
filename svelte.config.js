import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx'],
  preprocess: [
    mdsvex({
      extensions: ['.svx'],
      layout: {
        runbook: path.join(dirname, 'src/lib/layouts/runbook.svelte')
      }
    })
  ],
  kit: {
    adapter: adapter({ fallback: 'index.html' }),
    alias: {
      '#lib': 'src/lib',
      '#lib/*': 'src/lib/*'
    }
  }
};

export default config;
