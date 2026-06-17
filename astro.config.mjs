import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';

// Tus custom elements: todo lo que tenga guion y no sea un componente de framework.
const esCustomElement = (tag) => tag.startsWith('mi-') || tag === 'campo-numerico';

export default defineConfig({
  integrations: [
    react(),
    svelte(),
    // GOTCHA #1: sin esto, Vue intenta resolver <mi-switch> como un
    // componente Vue y lanza "Failed to resolve component". Le decimos
    // explícitamente que esos tags son elementos nativos del navegador.
    vue({
      template: {
        compilerOptions: {
          isCustomElement: esCustomElement,
        },
      },
    }),
  ],
});
