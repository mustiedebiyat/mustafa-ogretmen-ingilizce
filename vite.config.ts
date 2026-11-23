import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['apple-touch-icon.png', 'pwa-192x192.png'],
        manifest: {
          id: '/',
          name: 'Mustafa Öğretmenle İngilizce',
          short_name: 'İngilizce 3',
          description:
            'Hazırlayan: Mustafa ŞAHİN - Maarif Modele uygun 3. sınıf İngilizce çalışma programı.',
          theme_color: '#4C1D95',
          background_color: '#f8fafc',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,json}'],
          navigateFallbackDenylist: [/^\/\.well-known\//, /^\/privacy\.html$/],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
          const wellKnownDir = path.resolve(distDir, '.well-known');
          const distAssetLinks = path.resolve(wellKnownDir, 'assetlinks.json');
          if (fs.existsSync(distDir)) {
            fs.mkdirSync(wellKnownDir, {recursive: true});
            fs.writeFileSync(
              distAssetLinks,
              JSON.stringify(
                [
                  {
                    relation: ['delegate_permission/common.handle_all_urls'],
                    target: {
                      namespace: 'android_app',
                      package_name: 'com.mustafasahin.ingilizce3',
                      sha256_cert_fingerprints: [
                        '97:AE:C7:A4:2C:7A:2C:7E:D0:29:2C:72:78:F8:9F:F5:68:9D:43:F0:14:AF:4B:B2:FD:AC:9B:DD:18:83:60:E9',
                        'A5:02:A4:98:00:D0:E7:7D:29:39:DC:DB:23:98:1F:32:6C:3B:56:93:64:3E:52:DF:1B:55:7F:A7:51:31:C9:A2',
                      ],
                    },
                  },
                ],
                null,
                2,
              ) + '\n',
            );
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
