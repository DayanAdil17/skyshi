import path from 'path';
import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': `${path.resolve(__dirname, './src')}/components/`,
      '@pages': `${path.resolve(__dirname, './src')}/pages/`,
      '@config': `${path.resolve(__dirname, './src')}/config/`,
      '@api': `${path.resolve(__dirname, './src')}/api/`,
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    React(),
    WindiCSS({
      scan: {
        dirs: ['src/components', 'src/pages'],
      },
    }),
  ],
});
