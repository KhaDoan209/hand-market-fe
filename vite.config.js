import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   base: '/hand-market/',
   server: {
      port: 3000,
      strictPort: true,
      open: true,
   },
   build: {
      cssCodeSplit: true,
   },
});
