import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc'
import autoprefixer from 'autoprefixer'
import pxtorem from 'postcss-pxtorem'
import { nanoid } from 'nanoid';
import path from 'path'

const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
    cors: true
  },
  resolve: {
    alias: {
      // src: path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, '.'), // replace '@' as the root directory，make the project compile valid
    }
  },
  css: {
    modules: {
      generateScopedName: '[hash:base64:8]'
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'ie >= 8',
            'last 10 versions'
          ]
        }),
        pxtorem({
          rootValue: 75,
          propList: ['*'],
          unitPrecision: 5
        })
      ]
    }
  },
  build: {
    rollupOptions: { // use rollup to build the project and faster the building
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: `static/[ext]/[name]-${nanoid(16)}-[hash].[ext]`
      }
    }
  }
}));
