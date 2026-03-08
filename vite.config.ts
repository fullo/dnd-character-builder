import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

export default defineConfig({
  base: '/dnd-character-builder/',
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'pwa-192x192.svg', 'pwa-512x512.svg'],
      manifest: {
        name: 'D&D Character Builder',
        short_name: 'DnD Builder',
        description: 'Create and manage your D&D 5e, Brancalonia, and Apocalisse characters',
        theme_color: '#292524',
        background_color: '#1c1917',
        display: 'standalone',
        scope: '/dnd-character-builder/',
        start_url: '/dnd-character-builder/',
        icons: [
          {
            src: 'pwa-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /\.(?:pdf)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'pdf-templates',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'pdf-lib': ['pdf-lib'],
          // WSG 3.3: Modularize bandwidth-heavy components — split game data per variant
          'game-data-dnd5e': [
            './src/data/dnd5e/classes.ts',
            './src/data/dnd5e/races.ts',
            './src/data/dnd5e/spells.ts',
            './src/data/dnd5e/equipment.ts',
            './src/data/dnd5e/backgrounds.ts',
            './src/data/dnd5e/rules.ts',
          ],
          'game-data-brancalonia': [
            './src/data/brancalonia/races.ts',
            './src/data/brancalonia/classes.ts',
            './src/data/brancalonia/backgrounds.ts',
            './src/data/brancalonia/rules.ts',
          ],
          'game-data-apocalisse': [
            './src/data/apocalisse/races.ts',
            './src/data/apocalisse/classes.ts',
            './src/data/apocalisse/backgrounds.ts',
            './src/data/apocalisse/rules.ts',
          ],
        },
      },
    },
  },
})
