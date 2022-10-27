import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import importToCDN from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/km-wangeditor',
  plugins: [
    vue(),
    importToCDN({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: 'https://unpkg.com/vue@3/dist/vue.global.js',
        },
        {
          name: 'km-wangeditor',
          var: 'kmEditor',
          path: 'https://unpkg.com/km-wangeditor@latest/dist/index.umd.js',
          css: 'https://unpkg.com/km-wangeditor@latest/dist/css/style.css',
        },
      ],
    }),
  ],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      'km-wangeditor': resolve(__dirname, '../src'),
    },
  },
  build: {
    rollupOptions: {
      external: ['km-wangeditor'],
    },
  },
})
