import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress warnings about @babel/runtime - these are handled by Vite automatically
        if (warning.code === 'UNRESOLVED_IMPORT' && 
            warning.message.includes('@babel/runtime')) {
          return;
        }
        warn(warning);
      }
    }
  }
})
