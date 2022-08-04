export default {
  ISULA_BANNER_TEXT: ['iSula', '小个头 大能量'],
  ISULA_BANNER_IMG: '/img/minisite/isula/mobile-banner.png',
  ISULA_LOGO: '/img/minisite/isula/isula-logo.png',
  ISULA_DESC_UP: [
    "iSula /'i.zu.la/，华为容器技术方案品牌。其原意是一种非常强大的蚂蚁，学术上称为“子弹蚁”，因为被它咬一口，犹如被子弹打到那般疼痛。iSula是世界上强大的昆虫之一。华为容器技术方案品牌因其“小个头、大能量”的含义而取名。",
  ],
  ISULA_DESC_DOWN: [
    '目前 iSula 家族提供了如下组件:',
    'iSulad：容器引擎，提供容器的全生命周期管理，北向兼容Kubernetes的CRI接口，南向兼容OCI 生态。',
    'isula-build：容器镜像构建工具，提供快速构建容器镜像的能力。',
    'isula-transform：容器迁移工具，提供Docker容器冷迁移至iSulad的能力。',
  ],
  ISULA_DESC_IMG: '/img/minisite/isula/zh-desc.png',
  ISULA_MAIL: 'mail to:isulad@openeuler.org',
  ISULA_LINK: [
    {
      IMG: '/img/projects/share/cards-work.png',
      TITLE: '开启iSula之旅',
      LINK_LIST: [
        'https://gitee.com/openeuler/community/tree/master/sig/iSulad',
      ],
      SHOW: false,
    },
    {
      IMG: '/img/projects/share/cards-letter.png',
      TITLE: '相对iSula说',
      LINK_LIST: ['mail to:isulad@openeuler.org'],
      SHOW: true,
    },
    {
      IMG: '/img/projects/isula/isula-logo.png',
      TITLE: 'iSula logo',
      LINK_LIST: ['/other/projects/isula/'],
      SHOW: false,
    },
  ],
  ISULA_FRAMEWORK: {
    TITLE_OUTSIDE: '架构',
    TITLE_INSIDE: 'ARCHITECTURE',
    TAB: [
      {
        KEY: 'ISULAD',
        VALUE: 'iSulad',
      },
      {
        KEY: 'ISULAD_BUILD',
        VALUE: 'isula-build',
      },
      {
        KEY: 'ISULAD_TRANSFORM',
        VALUE: 'isula-transform',
      },
    ],
    ISULAD: {
      DESC_LIST: [
        'iSulad 是一个新的通用容器引擎，提供统一的架构设计来满足CT和IT领域的不同需求。它具有轻、快、 易、灵的特点，这与子弹蚂蚁"小个头、大能量"的形象不谋而合。',
        'iSulad 的特点如下:',
        '轻量语言：C/C++，Rust on the way',
        '北向接口：提供CRI接口，支持对接Kubernets;同时提供便捷使用的命令行',
        '南向接口：支持OCI runtime和镜像规范，支持平滑替换',
        '容器形态：支持系统容器、虚机容器等多种容器形态',
        '扩展能力：提供插件化架构，可根据用户需要开发定制化插件',
        '以上的特点使得 iSulad 可以不受硬件规格和架构的限制，更小的底噪开销也使得它的可应用领域更为广泛。',
      ],
      FRAMEWORK_IMG: '/img/projects/isula/framework-isulad-hight-zh.png',
      FRAMEWORK_IMG_DARK: '/img/projects/isula/framework-isulad-dark-zh.png',
    },
    ISULAD_BUILD: {
      DESC_LIST: [
        'isula-build 通常运行于构建侧环境，为运行侧环境提供构建好的容器镜像。',
        '构建时，isula-build读取Dockerfile作为输入，快速构建符合Docker镜像和OCI镜像规范的容器镜像，最后将镜像分发至同节点的iSulad/docker、本地tar包或远端容器镜像仓库。',
      ],
      FRAMEWORK_TITLE: 'isula-build的架构图如下：',
      FRAMEWORK_IMG: '/img/projects/isula/framework-isula-build-hight-en.png',
      FRAMEWORK_IMG_DARK:
        '/img/projects/isula/framework-isula-build-dark-en.png',
    },
    ISULAD_TRANSFORM: {
      DESC_LIST: [
        'isula-transform 配合 iSulad 2.0 推出，支持将 Docker 容器引擎管理的容器转换、迁移给 iSulad 引擎进行管理。迁移完成后，就可以通过 iSulad 完成容器的生命周期管理功能。',
      ],
      FRAMEWORK_IMG:
        '/img/projects/isula/framework-isula-transform-hight-en.png',
      FRAMEWORK_IMG_DARK:
        '/img/projects/isula/framework-isula-transform-dark-en.png',
    },
  },
  ISULA_DOCUMENT: {
    TITLE_OUTSIDE: '文档',
    TITLE_INSIDE: 'DOCUMENTATION',
    TAB: [
      {
        KEY: 'ISULAD',
        VALUE: 'iSulad',
      },
      {
        KEY: 'ISULAD_BUILD',
        VALUE: 'isula-build',
      },
      {
        KEY: 'ISULAD_TRANSFORM',
        VALUE: 'isula-transform',
      },
    ],
    ISULAD: {
      DATA_LIST: [
        {
          IMG: '/img/projects/share/illustration-arrow.png',
          THEME: 'README',
          DESC: '阅读iSula的基础信息',
          LINK: [],
          BACKGROUND: {
            IMG: '/img/projects/share/group.png',
            TYPE: 2,
          },
        },
        {
          IMG: '/img/projects/share/illustration-file.png',
          THEME: '架构说明',
          DESC: '了解iSula的架构说明',
          LINK: [],
          BACKGROUND: {
            IMG: '/img/projects/share/group.png',
            TYPE: 2,
          },
        },
        {
          IMG: '/img/projects/share/illustration-book.png',
          THEME: '编译手册',
          DESC: '学习isula编译手册',
          LINK: [],
          BACKGROUND: {
            IMG: '/img/projects/share/group.png',
            TYPE: 2,
          },
        },
      ],
    },
    ISULAD_BUILD: {
      DATA_LIST: [
        {
          IMG: '/img/projects/share/illustration-arrow.png',
          THEME: 'README',
          DESC: '阅读iSula基础信息',
          LINK: [],
          BACKGROUND: {
            IMG: '/img/projects/share/group.png',
            TYPE: 2,
          },
        },
        {
          IMG: '/img/projects/share/illustration-newspapper.png',
          THEME: '使用手册',
          DESC: '',
          LINK: [],
          BACKGROUND: {
            IMG: '/img/projects/share/group.png',
            TYPE: 2,
          },
        },
      ],
    },
    ISULAD_TRANSFORM: {
      DATA_LIST: [
        {
          IMG: '/img/projects/share/illustration-arrow.png',
          THEME: 'README',
          DESC: '阅读iSula基础信息',
          LINK: [],
          BACKGROUND: {
            IMG: '/img/projects/share/group.png',
            TYPE: 2,
          },
        },
      ],
    },
  },
};
