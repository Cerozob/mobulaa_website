import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'
import eslint from 'vite-plugin-eslint'
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig(({ command, mode, ssrBuild }) => {

    let configs = {
        base: "/mobulaa_website/",
        server: {
            open: true,
        },
        build: {
            outDir: 'build',
        },
        plugins: [react({ jsxImportSource: '@emotion/react' }), svgr(),
        VitePWA({
            registerType: 'autoUpdate', devOptions: {
                enabled: true, type: 'module',

            },
            strategies: 'generateSW',
        }),
        eslint(
            {
                cache: true,
                include: ['src/**/*.jsx', 'src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx'],
                exclude: ['node_modules/**', 'build/**', '.git/**', 'public/**'],
                fix: true
            }
        )
        ],
    };

    return configs
});