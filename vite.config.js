import vue from '@vitejs/plugin-vue';
import copyTypes from './plugins/copyTypes.mjs';
import * as path from 'path';
import { defineConfig } from 'vite';

const config = defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    vue(),
    copyTypes(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.js'),
      name: 'Tree',
      fileName(format) {
        if (format === 'es') return 'vue3-tree.mjs';
        if (format === 'umd') return 'vue3-tree.cjs';
        if (format === 'iife') return 'vue3-tree.js';
      },
      formats: ['iife', 'es', 'umd'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});

export default config;
