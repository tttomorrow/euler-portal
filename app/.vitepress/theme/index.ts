import type { App } from 'vue';
import { createPinia } from 'pinia';
import 'aos/dist/aos.css';

import Layout from '@/App.vue';
import NotFound from '@/NotFound.vue';

import OpenDesign from 'opendesign';
import ElementPlus from 'element-plus';
import '@/shared/styles/index.scss';
import '@/shared/styles/element-plus/index.scss';

import { isBrowser } from '@/shared/utils';

export default {
  Layout,
  NotFound,
  enhanceApp({ app }: { app: App }) {
    if (typeof global !== 'undefined') {
      // @ts-ignore
      global.window = {};
    }
    app.use(OpenDesign);
    app.use(ElementPlus);
    app.use(createPinia());
  },
};
