export default {
  ATUNE_BANNER_TEXT: ['A-Tune', '一款基于AI开发的智能优化引擎'],
  ATUNE_BANNER_IMG: '/img/projects/atune/illustration-banner.png',
  ATUNE_DESC: [
    'A-Tune是一款基于openEuler开发的，自动化、智能化性能调优引擎。它利用人工智能技术，对运行在操作系统上的业务建立精准模型，动态感知业务特征并推理出具体应用，根据业务负载情况动态调节并给出最佳的参数配置组合，从而使业务处于最佳运行状态。',
  ],
  ATUNE_MAIL: 'mail to:a-tune@openeuler.org',
  ATUNE_ANCHOR_DATA: [
    { id: 'architecture', name: '架构' },
    { id: 'docs', name: '文档' },
  ],
  ATUNE_LINK: [
    {
      IMG: '/img/projects/share/cards-work.png',
      DARK_IMG: '/img/projects/share/cards-work.png',
      TITLE: '开始A-Tune调优之旅',
      LINK_LIST: ['https://gitee.com/openeuler/A-Tune'],
      SHOW: false,
    },
    {
      IMG: '/img/projects/share/cards-letter.png',
      DARK_IMG: '/img/projects/share/cards-letter.png',
      TITLE: '想对我说',
      LINK_LIST: ['mail to:a-tune@openeuler.org'],
      SHOW: true,
    },
    {
      IMG: '/img/projects/share/cards-tv.png',
      DARK_IMG: '/img/projects/share/cards-tv.png',
      TITLE: 'Web UI',
      LINK_LIST: ['https://gitee.com/openeuler/A-Tune-UI'],
      SHOW: false,
    },
  ],
  ATUNE_FRAMEWORK: {
    TITLE_OUTSIDE: '架构',
    TITLE_INSIDE: 'ARCHITECTURE',
    DESC_LIST: [
      'A-Tune主要包括在线时静态调优和离线时动态调优两大核心能力，整体架构包括智能决策、系统画像和交互系统三层。',
      '智能决策层：包含感知和决策两个子系统，分别完成对应用的智能感知和对系统的调优决策。',
      '系统画像层：主要包括自动特征工程和两层分类模型，自动特征工程用于业务特征的自动选择，两层分类模型用于业务模型的学习和分类。',
      '交互系统层：用于各类系统资源的监控和配置，调优策略执行在本层进行。',
      '优化模型库：包含10大类20+款应用场景的优化配置',
    ],
    FRAMEWORK_IMG: '/img/projects/atune/framework-hight-zh.png',
    FRAMEWORK_IMG_DARK: '/img/projects/atune/framework-dark-zh.png',
  },
  ATUNE_DOCUMENT: {
    TITLE_OUTSIDE: '文档',
    TITLE_INSIDE: 'DOCUMENTATION',
    DATA_LIST: [
      {
        IMG: '/img/projects/share/illustration-arrow.png',
        THEME: '认识A-Tune',
        DESC: '查看A-Tune的简介、架构。了解其支持特性与业务模型。',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E8%AE%A4%E8%AF%86A-Tune.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-file.png',
        THEME: '安装与部署',
        DESC: '了解安装A-Tune的软硬件要求与环境准备，学习安装、部署和启动A-Tune。',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E5%AE%89%E8%A3%85%E4%B8%8E%E9%83%A8%E7%BD%B2.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-book.png',
        THEME: '使用方法',
        DESC: '本章介绍A-Tune客户端包含的功能和使用方法。学习用命令行使用A-Tune。',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-glass.png',
        THEME: '常见问题',
        DESC: '点击查看A-Tune常见问题，在这里您可以获取解决方案。',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
    ],
  },
};
