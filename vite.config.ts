import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/scripts/app.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: true,
        port: 5180,
        hmr: {
            host: 'localhost',
        },
    },
    resolve: {
        alias: {
            '@': '/resources'
        }
    },
});
