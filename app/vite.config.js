import path from 'path';
import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';

import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

// import ElementPlus from 'unplugin-element-plus/vite';

// TODO:在vitepress使用该插件进行element-plus的按需导入会导致编译错误
// import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, '../dist'),
  },
  publicDir: path.resolve(__dirname, './.vitepress/public'),
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './.vitepress/src')}/`,
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@use "@/shared/styles/element-var.scss" as *;`,
  //     },
  //   },
  // },
  plugins: [
    vueJsx({}),
    Icons({
      compiler: 'vue3',
      customCollections: {
        app: FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src/assets/svg-icons')
        ),
        mooc: FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src/assets/category/mooc')
        ),
      },
    }),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),

    // ElementPlus({
    //   useSource: true,
    // }),
  ],
  server: {
    proxy: {
      '/api-cve': {
        target: 'https://www.openeuler.org/api-cve/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-cve/, ''),
      },
      '/compatibility': {
        target: 'https://api-proxy.openeuler.isrc.ac.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/compatibility/, ''),
      },
      '/showcase': {
        target: 'https://doc-search.test.osinfra.cn/showcase',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/showcase/, ''),
      },
      '/industry': {
        target: 'https://doc-search.test.osinfra.cn/industry',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/industry/, ''),
      },
      '/api': {
        target: 'https://api.openeuler.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/mail': {
        target: 'https://www.openeuler.org/api/mail',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mail/, ''),
      },
    },
  },
});
