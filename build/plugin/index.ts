import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteCompression from 'vite-plugin-compression';
import path from 'path';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

import removeConsole from 'vite-plugin-remove-console';
import svgLoader from 'vite-svg-loader';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import configStyleImportPlugin from './styleImport';
// import configImageminPlugin from './imagemin';

export function getPluginsList(mode: string) {
  const plugins = [
    vue(),
    vueJsx(),
    svgLoader({ svgoConfig: {} }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',

      /**
       * 自定义插入位置
       * @default: body-last
       */
      // inject?: 'body-last' | 'body-first'

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      // customDomId: '__svg__icons__dom__',
    }),
    configStyleImportPlugin(),
    removeConsole(),
    viteCompression(),
    // configImageminPlugin()
  ];
  if (mode === 'production') {
    plugins.push(AutoImport({
      resolvers: [ArcoResolver()],
    }))
    plugins.push(
      Components({
        dirs: [], // Avoid parsing src/components.  避免解析到src/components
        deep: false,
        resolvers: [ArcoResolver()],
      }),
    );
  }
  return plugins;
}
