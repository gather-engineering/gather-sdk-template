import path from 'path';
import { defineConfig } from 'vite';
import { loadEnv } from 'vite';
import dts from 'vite-plugin-dts';
import packageJson from './package.json';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.warn('=== Building with mode: ', mode, '===');
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  console.log('=== using VITE_NODE_ENV: ', process.env.VITE_NODE_ENV, '===');

  const plugins = [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ];

  const sentryMode = mode === 'sentry';

  sentryMode &&
    plugins.push(
      sentryVitePlugin({
        org: process.env.VITE_SENTRY_ORG,
        project: process.env.VITE_SENTRY_PROJECT,
        authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
        sourcemaps: {
          assets: './dist/**',
        },
        release: process.env.npm_package_version,
      })
    );

  return {
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      lib: {
        entry: 'src/packageExports/index.ts',
        name: 'gatherSdk',
        formats: ['cjs', 'es', 'umd', 'iife'],
      },
      rollupOptions: {
        external: Object.keys(packageJson.peerDependencies || {}),
        output: {
          interop: 'auto',
        },
        plugins: [],
      },
      sourcemap: sentryMode,
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      __APP_NAME__: JSON.stringify(process.env.npm_package_name),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  };
});
