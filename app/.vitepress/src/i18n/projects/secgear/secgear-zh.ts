export default {
  SECGEAR_BANNER_TEXT: [
    'secGear',
    'secGear是一款供开发者开发安全应用的机密计算框架',
  ],
  SECGEAR_DESC: [
    'secGear是面向计算产业的机密计算安全应用开发套件，旨在方便开发者在不同的硬件设备上提供统一开发框架，让用户不感知底层各种机密计算架构和接口的差异，目前secGear支持Intel SGX硬件和ARM Trustzone(安全os支持iTrustee)。',
    'secGear同时在中间件层和服务层提供丰富的扩展能力，让开发者能够方便得调用安全组件，乃至直接使用机密计算安全服务。',
  ],
  SECGEAR_ANCHOR_DATA: [
    { id: 'architecture', name: '架构' },
    { id: 'docs', name: '文档' },
  ],
  SECGEAR_FRAMEWORK: {
    TITLE_OUTSIDE: '架构',
    TITLE_INSIDE: 'ARCHITECTURE ',
    DESC_LIST: [
      '如图所示，secGear 主题包含三个层级（当前仅开源基础层 Base Layer，服务层和中间件层逐步开源）：',
      '服务层：提供完整的基于机密计算的安全服务，用户直接使用相关服务，享受机密计算带来的安全性。',
      '中间件层：提供常见的安全协议组件以及各种安全函数库，用户可以直接在安全及非安全侧调用相关接口，不必从头造轮子，当前构建中的有pkcs11、pake等',
      '基础层：提供丰富的 enclave 开发接口或工具，包含代码生成工具和enclave声明周期管理等接口，并且在安全侧支持POSIX APIs 和标准 OpenSSL 接口，用户基于这些接口可以自由开发安全应用程序 。',
    ],
    DESC_BACKGROUND: '/img/projects/share/card-shading.png',
    FRAMEWORK_IMG: '/img/projects/secgear/framework-hight-en.png',
    FRAMEWORK_IMG_DARK: '/img/projects/secgear/framework-dark-en.png',
  },
  SECGEAR_DOCUMENT: {
    TITLE_OUTSIDE: '文档',
    TITLE_INSIDE: 'DOCUMENTATION',
    DATA_LIST: [
      {
        IMG: '/img/projects/share/illustration-arrow.png',
        THEME: '整体介绍',
        DESC: '查看secGear整体介绍',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E8%AE%A4%E8%AF%86secGear.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-file.png',
        THEME: '安装',
        DESC: '学习如何安装secGear',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E5%AE%89%E8%A3%85secGear.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-book.png',
        THEME: '开发指南',
        DESC: 'secGear的开发指南',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E5%BC%80%E5%8F%91secGear%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-glass.png',
        THEME: '工具使用文档',
        DESC: '学习secGear的工具使用',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E4%BD%BF%E7%94%A8secGear%E5%B7%A5%E5%85%B7.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-newspapper.png',
        THEME: 'API接口文档',
        DESC: '查看secGear API接口文档',
        LINK: [
          {
            TEXT: '了解更多',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E6%8E%A5%E5%8F%A3%E5%8F%82%E8%80%83.md',
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
