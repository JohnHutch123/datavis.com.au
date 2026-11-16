// @ts-check
import { defineConfig } from 'astro/config';

// The public address of the site. Used for canonical links and the sitemap.
// Change it if the site is served from a different domain.
export default defineConfig({
  site: 'https://www.datavis.com.au',
  // A fully static site: plain HTML/CSS files, no server code to attack.
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
