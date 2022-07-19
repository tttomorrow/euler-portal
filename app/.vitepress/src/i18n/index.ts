// import { createI18n } from 'vue-i18n';

import sig from './sig';
import download from './download';
import brand from './brand';

const i18n = {
  zh: {
    sig: sig.zh,
    download: download.zh,
    brand: brand.zh,
  },
  en: {
    sig: sig.en,
    download: download.en,
    brand: brand.en,
  },
  ru: {
    sig: sig.ru,
    download: download.ru,
    brand: brand.ru,
  },
};

// const i18n = createI18n({
//   locale: 'zh',
//   allowComposition: true,
//   messages,
// });

export default i18n;
