// @ts-check
import { defineConfig } from 'astro/config'

// Served from https://patsypppe.github.io/ — the user-site repo, so no `base`.
export default defineConfig({
  site: 'https://patsypppe.github.io',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
})
