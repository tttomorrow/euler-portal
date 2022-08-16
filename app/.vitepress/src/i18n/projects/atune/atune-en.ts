export default {
  ATUNE_BANNER_TEXT: ['A-Tune', 'AI-based Tuning Engine'],
  ATUNE_BANNER_IMG: '/img/projects/atune/illustration-banner.png',
  ATUNE_DESC: [
    'A-Tune is an automatic and intelligent performance tuning engine developed based on openEuler. It adopts AI technologies to ensure the optimal service running. A-Tune builds precise models for services running on the operating system, understands service features dynamically to infer specific applications. And it adjusts the parameters based on service loads to provide the optimal parameter configurations.',
  ],
  ATUNE_MAIL: 'mail to:a-tune@openeuler.org',
  NAV_TEXT: [
    {
      key: '#sourceDownload',
      name: '资源下载',
    },
    {
      key: '#framework',
      name: '背景',
    },
    {
      key: '#document',
      name: '方案介绍',
      children: [
        {
          name: '迁移面临的关键问题',
          key: '#h2-title-one',
        },
        {
          name: '迁移综合方案概述',
          key: '#h2-title-two',
        },
        {
          name: 'OS基础兼容性',
          key: '#h2-title-three',
        },
        {
          name: '兼容性评估',
          key: '#h2-title-four',
        },
        {
          name: '移植适配',
          key: '#h2-title-five',
        },
        {
          name: '搬迁实施',
          key: '#h2-title-six',
        },
        {
          name: '迁移调优',
          key: '#h2-title-seven',
        },
      ],
    },
    {
      key: '#caseGuidance',
      name: '案例指导',
    },
  ],
  ATUNE_LINK: [
    {
      IMG: '/img/projects/share/cards-work.png',
      TITLE: 'Try Now',
      LINK_LIST: ['https://gitee.com/openeuler/A-Tune'],
      SHOW: false,
    },
    {
      IMG: '/img/projects/share/cards-letter.png',
      TITLE: 'Feedback',
      LINK_LIST: ['mail to:a-tune@openeuler.org'],
      SHOW: true,
    },
    {
      IMG: '/img/projects/share/cards-tv.png',
      TITLE: 'Web UI',
      LINK_LIST: ['https://gitee.com/openeuler/A-Tune-UI'],
      SHOW: false,
    },
  ],
  ATUNE_FRAMEWORK: {
    TITLE_OUTSIDE: 'Architecture',
    TITLE_INSIDE: 'ARCHITECTURE',
    DESC_LIST: [
      'A-Tune provides two core capabilities: online static tuning and offline dynamic tuning. The overall architecture consists of three layers: intelligent decision-making, system profiling, and interaction system.',
      'The intelligent decision-making layer consists of the sensing and decision-making subsystems, which implement intelligent sensing of applications and decision-making of system tuning, respectively.',
      'The system profiling layer includes the automatic feature engineering and the two-layer classification model. The automatic feature engineering is used for automatic selection of service features, and the two-layer classification model helps learn and classify service models.',
      'The interaction system layer monitors and configures various system resources. The tuning policies are executed at this layer.',
      'The tuning model library contains the tuning configurations for 20+ application scenarios of 10 categories.',
    ],
    FRAMEWORK_IMG: '/img/projects/atune/framework-hight-zh.png',
    FRAMEWORK_IMG_DARK: '/img/projects/atune/framework-dark-zh.png',
  },
  ATUNE_DOCUMENT: {
    TITLE_OUTSIDE: 'Documentation',
    TITLE_INSIDE: 'DOCUMENTATION',
    DATA_LIST: [
      {
        IMG: '/img/projects/share/illustration-arrow.png',
        THEME: 'About A-Tune',
        DESC: '',
        LINK: [],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-file.png',
        THEME: 'Installation and Deployment',
        DESC: '',
        LINK: [],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-book.png',
        THEME: 'How to Use',
        DESC: '',
        LINK: [],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-glass.png',
        THEME: 'FAQs',
        DESC: '',
        LINK: [],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
    ],
  },
};
