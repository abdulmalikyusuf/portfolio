import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    glsl(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
      include: '**/*.svg',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    watch: {
      ignored: ['**/.history/**'],
    },
  },
  build: {
    outDir: 'build',
  },
})
