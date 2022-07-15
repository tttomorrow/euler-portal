import { createI18n } from 'vue-i18n';

const messages = {
  zh: {
    button1: '点击换肤',
    button2: '点击切换中英文',
    button3: '可以在函数中或者dom加载完后使用window相关属性',
    listName: ['SIG名称', 'Gitee主页', '邮件', 'IRC频道'],
    listMember: [
      {
        name: '小明',
        gitee: 'https://gitee.com/openeuler/community/tree/master/sig/A-Tune',
        email: 'a-tuneopeneuler.org',
      },
      {
        name: '小红',
        gitee: 'https://gitee.com/openeuler/community/tree/master/sig/A-Tune',
        email: 'a-tuneopeneuler.org',
      },
    ],
  },
  en: {
    button1: 'change theme',
    button2: 'change language',
    button3: 'you can use window in functions or dom is ready',
    listName: ['SIG', 'Gitee', 'E-mail', 'IRC Channel'],
    listMember: [
      {
        name: 'xiaoming',
        gitee: 'https://gitee.com/openeuler/community/tree/master/sig/A-Tune',
        email: 'a-tuneopeneuler.org',
      },
      {
        name: 'xiaohong',
        gitee: 'https://gitee.com/openeuler/community/tree/master/sig/A-Tune',
        email: 'a-tuneopeneuler.org',
      },
    ],
  },
  ru: {
    listName: ['S俄文', 'Gitee主页', '邮件', 'IRC频道'],
    listMember: [
      {
        name: '小明',
        gitee: 'https://gitee.com/openeuler/community/tree/master/sig/A-Tune',
        email: 'a-tuneopeneuler.org',
      },
      {
        name: '小红',
        gitee: 'https://gitee.com/openeuler/community/tree/master/sig/A-Tune',
        email: 'a-tuneopeneuler.org',
      },
    ],
  },
};

const i18n = createI18n({
  locale: 'zh',
  allowComposition: true,
  messages,
});

export default i18n;
