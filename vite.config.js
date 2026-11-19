import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// La ruta base cambia según dónde se publique el sitio.
// - https://kamvior.com/                          → VITE_BASE_PATH=/
// - https://kamvior-debug.github.io/pagina-web-kamvior/  → VITE_BASE_PATH=/pagina-web-kamvior/
// En GitHub Actions, si no hay variable, se usa la ruta que informa configure-pages.
function normalizeBase(value) {
  if (!value || value === '/') return '/'

  let path = String(value).trim()
  if (!path.startsWith('/')) path = `/${path}`
  if (!path.endsWith('/')) path = `${path}/`

  return path
}

export default defineConfig(({ mode }) => {
  const fileEnv = loadEnv(mode, process.cwd(), '')
  const base = normalizeBase(process.env.VITE_BASE_PATH || fileEnv.VITE_BASE_PATH || '/')

  return {
    base,
    plugins: [vue()],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
    },
  }
})
