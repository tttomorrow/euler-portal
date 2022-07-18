import type { App } from 'vue';

import Layout from '@/App.vue';
import NotFound from '@/NotFound.vue';

import '@/shared/styles/index.scss';

// import i18n from '@/i18n';
import { createPinia } from 'pinia';

import OpenDesign from 'opendesign';
import ElementPlus from 'element-plus';
import '@/shared/styles/element-plus/index.scss';

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
    // app.use(i18n);
  },
};
