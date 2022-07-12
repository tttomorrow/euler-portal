import { createI18n } from 'vue-i18n';

const messages = {
  zh: {
    button1: '点击换肤',
    button2: '点击切换中英文',
    button3: '可以在函数中或者dom加载完后使用window相关属性',
    arr:['1','2']
  },
  en: {
    button1: 'change theme',
    button2: 'change language',
    button3: 'you can use window in functions or dom is ready',
  },
};

const i18n = createI18n({
  locale: 'zh',
  allowComposition: true,
  messages,
});

export default i18n;
