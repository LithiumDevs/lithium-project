import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      '@config': resolve(__dirname, './config/'),
      '@': resolve(__dirname, './src/'),
      '@app-styles': resolve(__dirname, './src/styles/'),
    },
  },
});