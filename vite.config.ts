import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import postcssNesting from 'postcss-nesting'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [postcssNesting()],
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __LAST_UPDATE__: new Date(),
  },
  server: {
    host: '0.0.0.0',
  },
  base: '',
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
      {
        find: '$',
        replacement: resolve(__dirname, 'src/scripts'),
      },
    ],
  },
})
