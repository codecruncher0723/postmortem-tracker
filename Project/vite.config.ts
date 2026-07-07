import { defineConfig } from 'vite';

export default defineConfig({
  // This helps Vite handle the subfolder structure correctly
  base: './', 
  build: {
    // This tells Vite to output the build files to a 'docs' folder 
    // located at the root of your repository (PostMortem/docs)
    outDir: 'docs', 
    emptyOutDir: true,
  },
});
