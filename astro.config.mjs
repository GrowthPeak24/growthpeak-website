import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Update this to the production domain.
const SITE = 'https://growthpeakdigital.com';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [tailwind(), sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
