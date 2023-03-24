import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const apiUrl = isProduction ? 'https://mutudu.herokuapp.com' : 'http://localhost:4000';

  return {
  plugins: [react()],
  build: {
    outDir: '../public',
  },
  define: {
    'process.env': {
      VITE_API_BASE_URL: apiUrl,
  },
  },

}
});