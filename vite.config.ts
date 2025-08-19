import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@babel/runtime/helpers/esm/extends'],
      onwarn(warning, warn) {
        // Suppress the specific warning about @babel/runtime
        if (warning.code === 'UNRESOLVED_IMPORT' && 
            warning.message.includes('@babel/runtime/helpers/esm/extends')) {
          return;
        }
        warn(warning);
      }
    }
  }
})
