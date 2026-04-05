import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/web-research-project/',      // назва репозиторію
  build: {
    outDir: 'docs'     // <- сюди збираємо
    // emptyOutDir: true // (не обов’язково) Vite і так чистить docs, якщо воно в корені
  }
})
