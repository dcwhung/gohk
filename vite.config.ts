import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// GitHub Pages 會喺 /<repo-name>/ 下面 serve，所以 production（build / preview）base 要對應 repo 名。
const GITHUB_PAGES_BASE = '/gohk/';
const LOCAL_BASE = '/';
// Phaser 本身約 1.2 MB，單一 chunk 係正常，調高警告門檻避免每次 build 都嘈。
const CHUNK_SIZE_WARNING_LIMIT_KB = 1500;

export default defineConfig(({ mode }) => ({
    base: mode === 'production' ? GITHUB_PAGES_BASE : LOCAL_BASE,
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        target: 'es2022',
        sourcemap: false,
        chunkSizeWarningLimit: CHUNK_SIZE_WARNING_LIMIT_KB,
    },
    server: {
        port: 5173,
        open: false,
    },
}));
