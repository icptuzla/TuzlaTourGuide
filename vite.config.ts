import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    logOverride: {
      'unsupported-directive': 'silent',
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined;
          }

          if (id.includes('maplibre-gl')) {
            return 'maplibre';
          }

          if (id.includes('html5-qrcode')) {
            return 'qr-scanner';
          }

          if (id.includes('framer-motion')) {
            return 'motion';
          }

          if (id.includes('@vercel/analytics')) {
            return 'analytics';
          }

          return 'vendor';
        },
      },
    },
  },
});
