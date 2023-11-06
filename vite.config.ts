import { fileURLToPath, URL } from 'node:url';
import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { wrapperEnv } from './build/utils';
import { createProxy } from './build/proxy';
import { getPluginsList } from './build/plugin/index';

// https://vitejs.dev/config/

export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  console.log(env, '222222');
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
  return {
    base: VITE_PUBLIC_PATH,
    plugins: getPluginsList(mode),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url)),
      },
    },
    // css: {
    //   preprocessorOptions: {
    //     less: {
    //       modifyVars: {
    //         'arcoblue-6': '#066E48',
    //       },
    //       javascriptEnabled: true,
    //     },
    //   },
    // },
    server: {
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            arco: ['@arco-design/web-vue'],
            // chart: ['echarts', 'vue-echarts'],
            vue: ['vue', 'vue-router', 'pinia'],
          },
        },
      },
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
    },
  };
};
