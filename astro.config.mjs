import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";
import netlify from '@astrojs/netlify';

export default defineConfig({
output: 'static',
adapter: netlify(),
image: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io', }] },
site: 'https://www.imwd.dev',
vite: {plugins: [tailwindcss()],},
integrations: [
react(),
]
});