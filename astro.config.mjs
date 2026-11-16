// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The public address of the site. Used for canonical links and the sitemap.
// Change it if the site is served from a different domain.
export default defineConfig({
  site: 'https://www.datavis.com.au',
  // A fully static site: plain HTML/CSS files, no server code to attack.
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Writes sitemap-index.xml listing every published page (drafts and the 404 page are left out).
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
