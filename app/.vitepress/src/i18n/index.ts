// import { createI18n } from 'vue-i18n';

import sig from './sig';
import download from './download';
import brand from './brand';
import security from './security';
import home from './home';
import common from './common';

const i18n = {
  zh: {
    sig: sig.zh,
    download: download.zh,
    brand: brand.zh,
    security: security.zh,
    home: home.zh,
    common: common.zh,
  },
  en: {
    sig: sig.en,
    download: download.en,
    brand: brand.en,
    security: security.en,
    home: home.en,
    common: common.en,
  },
  ru: {
    sig: sig.ru,
    download: download.ru,
    brand: brand.ru,
    security: security.ru,
    home: home.ru,
    common: common.ru,
  },
};

// const i18n = createI18n({
//   locale: 'zh',
//   allowComposition: true,
//   messages,
// });

export default i18n;
