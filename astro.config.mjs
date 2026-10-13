import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Update this to the production domain.
const SITE = 'https://growthpeakdigital.com';

// @astrojs/sitemap only writes sitemap-index.xml and sitemap-N.xml. robots.txt and
// Search Console use /sitemap.xml, so copy the index to that name as a real static
// file. It must be listed after sitemap(): build hooks run in the order the
// integrations are listed, and the index has to exist by the time this runs.
const sitemapXml = () => ({
  name: 'sitemap-xml-copy',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const out = fileURLToPath(dir);
      const index = join(out, 'sitemap-index.xml');
      if (!existsSync(index)) {
        throw new Error('sitemap-index.xml was not generated, so sitemap.xml cannot be created.');
      }
      copyFileSync(index, join(out, 'sitemap.xml'));
    },
  },
});

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [tailwind(), react(), sitemap(), sitemapXml()],
  build: {
    inlineStylesheets: 'auto',
  },
});
