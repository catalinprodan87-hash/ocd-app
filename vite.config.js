import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages serves a project site from a sub-path, e.g. https://user.github.io/ocd-app/
// In dev we serve from "/". Change this string if you rename the repo or deploy elsewhere.
const BASE = process.env.NODE_ENV === 'production' ? '/ocd-app/' : '/'

export default defineConfig({
  base: BASE,
  // host: true lets a phone on the same Wi-Fi open the dev server (dev only, not the published app)
  server: { port: 5175, host: true },
  preview: { port: 5176, host: true },
  // Empty inline PostCSS config stops Vite from picking up the parent folder's
  // Tailwind setup (romanian-guide). This app uses plain CSS only.
  css: { postcss: {} },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Aplicație OCD', // [DE COMPLETAT] — numele final al aplicației
        short_name: 'OCD',     // [DE COMPLETAT]
        description: 'Instrument de autoajutor pentru persoanele cu TOC.', // [DE COMPLETAT]
        lang: 'ro',
        start_url: BASE,
        scope: BASE,
        display: 'standalone',
        background_color: '#faf7f2',
        theme_color: '#5b8a86',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Cache the built app shell so it works offline. No network/runtime data here —
        // all user data lives in IndexedDB on the device.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
    }),
  ],
})
