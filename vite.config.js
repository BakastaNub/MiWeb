import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import contentApi from './tools/vite-plugin-content.js';

export default defineConfig({
  plugins: [react(), contentApi()],
});
