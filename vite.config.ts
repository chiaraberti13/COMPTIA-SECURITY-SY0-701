import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        // import.meta.dirname rather than __dirname: Vite's native config loader,
      // planned as the default in a future major, supports only the former.
      '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      // Each dataset is ~2.1-2.4 MB once built (Italian is the larger). They are
      // split into their own chunks below, so the generic 500 kB warning would
      // fire on every build for something already handled. The limit sits just
      // above today's size, so an unexpected jump still warns.
      chunkSizeWarningLimit: 2600,
      // Small assets are normally inlined as data: URIs. Fonts never are, so the
      // Content-Security-Policy (server/app.ts) can keep font-src to 'self'.
      assetsInlineLimit: (file: string) => (/\.(woff2?|ttf|otf)$/.test(file) ? false : undefined),
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            // The datasets change far less often than the app code. Keeping them
            // in dedicated chunks means a UI change does not invalidate megabytes
            // of study material in the visitor's browser cache.
            if (id.includes('/src/data.ts')) return 'dataset-it';
            if (id.includes('/src/data.en.ts')) return 'dataset-en';
            if (id.includes('node_modules')) return 'vendor';
            return undefined;
          },
        },
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
