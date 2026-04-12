/**
 * [BlackBoxSystem] VITE CONFIGURATION
 * Security Level: Alpha Floor | Deployed for TIFFANY
*/

import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    // Tối ưu hóa cho việc deployment nhanh trước 23/2
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false, // Giảm tải bộ nhớ cho Studio
  }
});
