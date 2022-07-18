import { createI18n } from 'vue-i18n';

const messages = {
  zh: {
    ISULA_INTRODUCES: [
      {
        CONTENT: '开启iSula之旅',
        LINK: '',
      },
      {
        CONTENT: '想对iSula说',
        LINK: '',
      },
      {
        CONTENT: 'iSula Logo',
        LINK: '',
      },
    ],
    INTERPRETATION:
      'i.zu.la/，华为容器技术方案品牌。其原意是一种非常强大的蚂蚁，学术上称为“子弹蚁”，因为被它咬一口，犹如被子弹打到那般疼痛。iSula是世界上强大的昆虫之一。华为容器技术方案品牌因其“小个头、大能量”的含义而取名。',
    TAB_ITEMS: ['iSulad', 'isula-build', 'isula-transform'],
    FEAT_CONTENTS: [
      ' iSulad 是一个新的通用容器引擎，提供统一的架构设计来满足CT和IT领域的不同需求。它具有轻、快、 易、灵的特点，这与子弹蚂蚁"小个头、大能量"的形象不谋而合。',
      '轻量语言：C/C++，Rust on the way',
      'iSulad 的特点如下:',
      '北向接口：提供CRI接口，支持对接Kubernets;同时提供便捷使用的命令行 ',
      '南向接口：支持OCI runtime和镜像规范，支持平滑替换 ',
      '容器形态：支持系统容器、虚机容器等多种容器形态 ',
      '扩展能力：提供插件化架构，可根据用户需要开发定制化插件',
      '以上的特点使得 iSulad 可以不受硬件规格和架构的限制，更小的底噪开销也使得它的可应用领域更为广泛。',
    ],
    DOCUMENT_LISTS: [
      { TITLE: 'README', CAPTION: '阅读iSula基础信息', TEXT: '毕昇JDK8' },
      { TITLE: '架构说明', CAPTION: '了解iSula架构说明', TEXT: '毕昇JDK8' },
      { TITLE: '编译手册', CAPTION: '学习iSula编译手册', TEXT: '毕昇JDK8' },
    ],
  },
};

const i18n = createI18n({
  locale: 'zh',
  allowComposition: true,
  messages,
});

export default i18n;
