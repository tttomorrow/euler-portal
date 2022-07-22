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
      LINK_LIST: ['mail'],
      SHOW: true,
    },
    {
      IMG: '/img/projects/isula/isula-logo.png',
      TITLE: 'iSula logo',
      LINK_LIST: [''],
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
      FRAMEWORK_TITLE: 'iSulad 系统架构如下：',
      FRAMEWORK_IMG: '/img/projects/isula/framework-isulad.png',
    },
    ISULAD_BUILD: {
      DESC_LIST: [
        'isula-build 通常运行于构建侧环境，为运行侧环境提供构建好的容器镜像。',
        '构建时，isula-build读取Dockerfile作为输入，快速构建符合Docker镜像和OCI镜像规范的容器镜像，最后将镜像分发至同节点的iSulad/docker、本地tar包或远端容器镜像仓库。',
      ],
      FRAMEWORK_TITLE: 'isula-build的架构图如下：',
      FRAMEWORK_IMG: '/img/projects/secgear/framework.png',
    },
    ISULAD_TRANSFORM: {
      DESC_LIST: [
        'isula-transform 配合 iSulad 2.0 推出，支持将 Docker 容器引擎管理的容器转换、迁移给 iSulad 引擎进行管理。迁移完成后，就可以通过 iSulad 完成容器的生命周期管理功能。',
      ],
      FRAMEWORK_IMG: '/img/projects/atune/framework.png',
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
          LINK: [
            {
              TEXT: 'README',
              LINK: 'https://gitee.com/openeuler/iSulad/blob/master/README.md',
            },
          ],
          BACKGROUND: {
            IMG: '/img/projects/isula/isula-grain.png',
            TYPE: 2,
          },
        },
        {
          IMG: '/img/projects/share/illustration-file.png',
          THEME: '架构说明',
          DESC: '了解iSula的架构说明',
          LINK: [
            {
              TEXT: '架构说明',
              LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/architecture_zh.md',
            },
          ],
          BACKGROUND: {
            IMG: '/img/projects/isula/isula-grain.png',
            TYPE: 2,
          },
        },
        {
          IMG: '/img/projects/share/illustration-book.png',
          THEME: '编译手册',
          DESC: '学习isula编译手册',
          LINK: [
            {
              TEXT: '编译手册',
              LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/build_guide_zh.md',
            },
            {
              TEXT: '在risc-v上面',
              LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/build_guide_riscv.md',
            },
            {
              TEXT: '与k8s/CNI集成',
              LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/integration.md',
            },
          ],
          BACKGROUND: {
            IMG: '/img/projects/isula/isula-grain.png',
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
          DESC: 'xxxdx',
          LINK: [
            {
              TEXT: 'README',
              LINK: 'https://gitee.com/openeuler/isula-build/blob/master/README.zh.md',
            },
          ],
          BACKGROUND: {
            IMG: '/img/projects/isula/isula-grain.png',
            TYPE: 2,
          },
        },
        {
          IMG: '/img/projects/share/illustration-book.png',
          THEME: '使用手册',
          DESC: 'aaaaa',
          LINK: [
            {
              TEXT: '使用手册',
              LINK: 'https://gitee.com/openeuler/isula-build/blob/master/doc/manual_zh.md',
            },
          ],
          BACKGROUND: {
            IMG: '/img/projects/isula/isula-grain.png',
            TYPE: 2,
          },
        },
      ],
    },
    ISULAD_TRANSFORM: {
      DATA_LIST: [
        {
          IMG: '/img/projects/share/illustration-book.png',
          THEME: 'README',
          DESC: 'ccccc',
          LINK: [
            {
              TEXT: 'README',
              LINK: 'https://gitee.com/openeuler/isula-transform/blob/master/README.md',
            },
          ],
          BACKGROUND: {
            IMG: '/img/projects/isula/isula-grain.png',
            TYPE: 2,
          },
        },
      ],
    },
  },
};
