import path from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  const rootPath = path.resolve(process.cwd());
  const srcPath = `${rootPath}/src`;
  const assetsPath = `${srcPath}/assets`;
  const componentsPath = `${srcPath}/components`;

  return {
    plugins: [react(), tsconfigPaths()],
    base: './',
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
        assets: assetsPath,
        components: componentsPath,
      },
    },
  };
});
